<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SelectOption } from 'naive-ui';
import { $t } from '@/locales';

interface Props {
  filterConfig: Api.Log.FilterConfig;
}

interface Emits {
  (e: 'update:filterConfig', value: Api.Log.FilterConfig): void;
  (e: 'apply'): void;
  (e: 'reset'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localConfig = ref<Api.Log.FilterConfig>({ ...props.filterConfig });

// 监听外部配置变化
watch(
  () => props.filterConfig,
  newConfig => {
    localConfig.value = { ...newConfig };
  },
  { deep: true }
);

// 日志级别选项
const levelOptions: SelectOption[] = [
  { label: 'TRACE', value: 'TRACE' },
  { label: 'DEBUG', value: 'DEBUG' },
  { label: 'INFO', value: 'INFO' },
  { label: 'WARN', value: 'WARN' },
  { label: 'ERROR', value: 'ERROR' }
];

// 更新配置
function updateConfig() {
  emit('update:filterConfig', { ...localConfig.value });
}

// 应用过滤
function handleApply() {
  updateConfig();
  emit('apply');
}

// 重置过滤
function handleReset() {
  emit('reset');
}
</script>

<template>
  <NCard :title="$t('page.log.realtime.filterPanel.title')" size="small">
    <NSpace vertical :size="16">
      <!-- 启用过滤 -->
      <NSpace align="center">
        <span>{{ $t('page.log.realtime.filterPanel.enable') }}:</span>
        <NSwitch v-model:value="localConfig.enabled" @update:value="updateConfig" />
      </NSpace>

      <!-- 最小日志级别 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.minLevel')">
        <NSelect
          v-model:value="localConfig.minLevel"
          :options="levelOptions"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
      </NFormItem>

      <!-- 包含关键词 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.includeKeywords')">
        <NDynamicTags
          v-model:value="localConfig.includeKeywords"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
        <template #feedback>
          <div class="mt-1 text-xs text-gray-500">
            {{ $t('page.log.realtime.filterPanel.keywordPlaceholder') }}
          </div>
        </template>
      </NFormItem>

      <!-- 排除关键词 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.excludeKeywords')">
        <NDynamicTags
          v-model:value="localConfig.excludeKeywords"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
        <template #feedback>
          <div class="mt-1 text-xs text-gray-500">
            {{ $t('page.log.realtime.filterPanel.keywordPlaceholder') }}
          </div>
        </template>
      </NFormItem>

      <!-- 包含包名 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.includePackages')">
        <NDynamicTags
          v-model:value="localConfig.includePackages"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
        <template #feedback>
          <div class="mt-1 text-xs text-gray-500">
            {{ $t('page.log.realtime.filterPanel.packagePlaceholder') }}
          </div>
        </template>
      </NFormItem>

      <!-- 排除包名 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.excludePackages')">
        <NDynamicTags
          v-model:value="localConfig.excludePackages"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
        <template #feedback>
          <div class="mt-1 text-xs text-gray-500">
            {{ $t('page.log.realtime.filterPanel.packagePlaceholder') }}
          </div>
        </template>
      </NFormItem>

      <!-- 包含线程 -->
      <NFormItem :label="$t('page.log.realtime.filterPanel.includeThreads')">
        <NDynamicTags
          v-model:value="localConfig.includeThreads"
          :disabled="!localConfig.enabled"
          @update:value="updateConfig"
        />
        <template #feedback>
          <div class="mt-1 text-xs text-gray-500">
            {{ $t('page.log.realtime.filterPanel.threadPlaceholder') }}
          </div>
        </template>
      </NFormItem>

      <!-- 使用正则表达式 -->
      <NSpace align="center">
        <span>{{ $t('page.log.realtime.filterPanel.useRegex') }}:</span>
        <NSwitch v-model:value="localConfig.useRegex" :disabled="!localConfig.enabled" @update:value="updateConfig" />
      </NSpace>

      <!-- 操作按钮 -->
      <NSpace justify="end">
        <NButton @click="handleReset">
          {{ $t('page.log.realtime.filterPanel.reset') }}
        </NButton>
        <NButton type="primary" @click="handleApply">
          {{ $t('page.log.realtime.filterPanel.apply') }}
        </NButton>
      </NSpace>
    </NSpace>
  </NCard>
</template>
