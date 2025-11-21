<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { SelectOption } from 'naive-ui';
import { useVirtualList } from '@vueuse/core';
import { $t } from '@/locales';
import { useLogWebSocket } from './composables/use-log-websocket';
import { useLogCache } from './composables/use-log-cache';
import { useLogFilter } from './composables/use-log-filter';
import LogStats from './components/log-stats.vue';
import LogFilterPanel from './components/log-filter-panel.vue';

defineOptions({
  name: 'LogRealTime'
});

// WebSocket 管理
const { connectionStatus, connect, disconnect } = useLogWebSocket();

// 缓存管理
const { logCache, stats, addLogs, addSystemLog, clearCache, clearSystemLogs, searchLogs, downloadLogs } = useLogCache();

// 过滤管理
const { filterConfig, hasActiveFilters, applyFilter, resetFilter, setMinLevel } = useLogFilter();

// UI 状态
const currentLevel = ref<Api.Log.Level>('INFO');
const searchKeyword = ref('');
const showFilterPanel = ref(false);
const showStats = ref(true);

// 日志级别选项
const levelOptions: SelectOption[] = [
  { label: 'TRACE', value: 'TRACE' },
  { label: 'DEBUG', value: 'DEBUG' },
  { label: 'INFO', value: 'INFO' },
  { label: 'WARN', value: 'WARN' },
  { label: 'ERROR', value: 'ERROR' }
];

// 连接状态显示
const connectionStatusText = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return $t('page.log.realtime.connected');
    case 'connecting':
      return $t('page.log.realtime.connecting');
    case 'disconnected':
      return $t('page.log.realtime.disconnected');
    case 'error':
      return $t('page.log.realtime.connectionError');
    default:
      return $t('page.log.realtime.disconnected');
  }
});

const connectionStatusType = computed(() => {
  switch (connectionStatus.value) {
    case 'connected':
      return 'success';
    case 'connecting':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
});

// 过滤后的日志
const filteredLogs = computed(() => {
  let logs = logCache.value;

  // 应用过滤器
  if (filterConfig.value.enabled) {
    logs = applyFilter(logs);
  }

  // 应用搜索
  if (searchKeyword.value.trim()) {
    logs = searchLogs(searchKeyword.value, filterConfig.value.useRegex);
  }

  return logs;
});

// 更新统计信息中的显示数量
const displayStats = computed(() => ({
  ...stats.value,
  displayed: filteredLogs.value.length
}));

// 虚拟滚动
const {
  list: virtualList,
  containerProps,
  wrapperProps
} = useVirtualList(filteredLogs, {
  itemHeight: 80,
  overscan: 10
});

// 日志颜色配置
const logColors = {
  light: {
    TRACE: '#858585',
    DEBUG: '#4ec9b0',
    INFO: '#4fc1ff',
    WARN: '#dcdcaa',
    ERROR: '#f48771'
  },
  dark: {
    TRACE: '#6b6b6b',
    DEBUG: '#3ea88f',
    INFO: '#3a9fd9',
    WARN: '#c9b96f',
    ERROR: '#d45e4a'
  }
};

// 获取日志颜色
function getLogColor(level: Api.Log.Level, isDark: boolean = false): string {
  return isDark ? logColors.dark[level] : logColors.light[level];
}

// 处理 WebSocket 消息
function handleMessage(logs: Api.Log.Data[]) {
  addLogs(logs);
}

// 处理系统日志
function handleSystemLog(message: string) {
  addSystemLog(message);
}

// 切换日志级别
function handleLevelChange(level: Api.Log.Level) {
  currentLevel.value = level;
  setMinLevel(level);
  disconnect();
  connect(handleMessage, handleSystemLog, level);
}

// 清空日志
function handleClearLogs() {
  window.$dialog?.warning({
    title: $t('common.warning'),
    content: $t('page.log.realtime.clearConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      clearCache();
      clearSystemLogs();
      window.$message?.success($t('common.deleteSuccess'));
    }
  });
}

// 导出日志
function handleExportLogs() {
  const filename = `logs_${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
  downloadLogs(filteredLogs.value, filename);
  window.$message?.success($t('page.log.realtime.exportSuccess'));
}

// 应用过滤
function handleApplyFilter() {
  window.$message?.success($t('common.updateSuccess'));
}

// 重置过滤
function handleResetFilter() {
  resetFilter();
  window.$message?.success($t('common.updateSuccess'));
}

// 组件挂载时连接
onMounted(() => {
  connect(handleMessage, handleSystemLog, currentLevel.value);
});

// 组件卸载时断开连接
onBeforeUnmount(() => {
  disconnect();
});
</script>

<template>
  <div class="h-full flex flex-col gap-4 p-4">
    <!-- 头部操作栏 -->
    <NCard size="small" :bordered="false">
      <div class="flex items-center justify-between gap-4">
        <!-- 左侧：标题和状态 -->
        <div class="flex items-center gap-4">
          <h3 class="text-lg font-semibold">
            {{ $t('page.log.realtime.title') }}
          </h3>
          <NBadge :type="connectionStatusType" dot>
            <NTag :type="connectionStatusType" size="small">
              {{ connectionStatusText }}
            </NTag>
          </NBadge>
        </div>

        <!-- 右侧：操作按钮 -->
        <NSpace>
          <!-- 日志级别选择 -->
          <NSelect
            v-model:value="currentLevel"
            :options="levelOptions"
            class="w-120px"
            size="small"
            @update:value="handleLevelChange"
          />

          <!-- 搜索 -->
          <NInput
            v-model:value="searchKeyword"
            :placeholder="$t('page.log.realtime.searchPlaceholder')"
            clearable
            class="w-300px"
            size="small"
          >
            <template #prefix>
              <icon-mdi:magnify />
            </template>
          </NInput>

          <!-- 过滤按钮 -->
          <NButton size="small" @click="showFilterPanel = !showFilterPanel">
            <template #icon>
              <icon-mdi:filter-variant />
            </template>
            {{ $t('page.log.realtime.filterBtn') }}
            <NBadge v-if="hasActiveFilters" :value="1" dot />
          </NButton>

          <!-- 统计按钮 -->
          <NButton size="small" @click="showStats = !showStats">
            <template #icon>
              <icon-mdi:chart-bar />
            </template>
            {{ $t('page.log.realtime.stats') }}
          </NButton>

          <!-- 导出按钮 -->
          <NButton size="small" @click="handleExportLogs">
            <template #icon>
              <icon-mdi:download />
            </template>
            {{ $t('page.log.realtime.export') }}
          </NButton>

          <!-- 清空按钮 -->
          <NButton size="small" type="error" @click="handleClearLogs">
            <template #icon>
              <icon-mdi:delete-outline />
            </template>
            {{ $t('page.log.realtime.clear') }}
          </NButton>
        </NSpace>
      </div>
    </NCard>

    <!-- 统计信息 -->
    <LogStats v-if="showStats" :stats="displayStats" />

    <!-- 主内容区域 -->
    <div class="flex flex-1 gap-4 overflow-hidden">
      <!-- 过滤面板 -->
      <Transition name="slide-fade">
        <div v-if="showFilterPanel" class="w-350px">
          <LogFilterPanel v-model:filter-config="filterConfig" @apply="handleApplyFilter" @reset="handleResetFilter" />
        </div>
      </Transition>

      <!-- 日志显示区域 -->
      <NCard :bordered="false" class="flex-1" content-style="padding: 0; height: 100%;">
        <div v-if="filteredLogs.length === 0" class="h-full flex items-center justify-center text-gray-400">
          <div class="text-center">
            <icon-mdi:file-document-outline class="mb-4 text-6xl" />
            <div>{{ $t('page.log.realtime.noLogs') }}</div>
          </div>
        </div>

        <!-- 虚拟滚动列表 -->
        <div v-else v-bind="containerProps" class="h-full overflow-auto">
          <div v-bind="wrapperProps">
            <div
              v-for="{ index, data } in virtualList"
              :key="index"
              class="log-item border-b border-gray-200 p-3 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div class="flex items-start gap-3">
                <!-- 日志级别 -->
                <NTag
                  :type="data.live === 'ERROR' ? 'error' : data.live === 'WARN' ? 'warning' : 'default'"
                  size="small"
                  :style="{ backgroundColor: getLogColor(data.live), color: 'white' }"
                  class="flex-shrink-0"
                >
                  {{ data.live }}
                </NTag>

                <!-- 日志详情 -->
                <div class="min-w-0 flex-1">
                  <!-- 元信息 -->
                  <div class="mb-1 flex items-center gap-2 text-xs text-gray-500">
                    <span>{{ data.time }}</span>
                    <span class="text-purple-500">[{{ data.thread }}]</span>
                    <span class="text-blue-500">{{ data.pack }}</span>
                  </div>

                  <!-- 日志内容 -->
                  <div class="whitespace-pre-wrap break-words text-sm">
                    {{ data.log }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.w-120px {
  width: 120px;
}

.w-300px {
  width: 300px;
}

.w-350px {
  width: 350px;
}

/* 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.log-item {
  transition: background-color 0.2s ease;
}
</style>
