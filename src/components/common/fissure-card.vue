<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NButton, NCard, NEmpty, NSpin, NTag } from 'naive-ui';
import { $t } from '@/locales';

const props = defineProps<{
  title: string;
  apiFn: () => Promise<any>;
  translateMap: Record<string, string>;
}>();

const loading = ref(false);
const error = ref('');
const missions = ref<any[]>([]);
const now = ref(Date.now());

function parseTime(v: any): number | null {
  const raw = v?.$date?.$numberLong || v;
  if (!raw) return null;
  const d = new Date(raw);
  return isNaN(d.getTime()) ? null : d.getTime();
}

function fmtDur(ms: number): string {
  if (ms <= 0) return '已过期';
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

function t(key: string): string {
  return props.translateMap[key] || key;
}

async function fetchData(silent = false) {
  if (!silent) loading.value = true;
  error.value = '';
  try {
    const result = await props.apiFn();
    if (!result.error && Array.isArray(result.data)) {
      missions.value = result.data;
    } else {
      if (!silent) error.value = '请求失败';
      missions.value = [];
    }
  } catch {
    if (!silent) error.value = '网络错误';
  }
  if (!silent) loading.value = false;
}

const minExpiry = computed(() => {
  let min: number | null = null;
  for (const m of missions.value) {
    const exp = parseTime(m.Expiry);
    if (exp != null) {
      min = min == null ? exp : Math.min(min, exp);
    }
  }
  return min;
});

const countdown = computed(() => {
  if (!minExpiry.value) return '';
  return fmtDur(minExpiry.value - now.value);
});

const expired = computed(() => {
  if (!minExpiry.value) return false;
  return minExpiry.value <= now.value;
});

let clockTimer: ReturnType<typeof setInterval> | null = null;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

function scheduleRefresh() {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  if (minExpiry.value) {
    const ms = minExpiry.value - Date.now();
    const delay = Math.max(ms + 1000, 0);
    refreshTimeout = setTimeout(() => fetchData(true), Math.min(delay, 600_000));
  }
}

onMounted(() => {
  fetchData();
  clockTimer = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

import { watch } from 'vue';
watch([minExpiry], () => scheduleRefresh(), { immediate: true });

defineExpose({ fetchData });

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
  if (refreshTimeout) clearTimeout(refreshTimeout);
});
</script>

<template>
  <NCard :title="title" :bordered="false" size="small">
    <template #header-extra>
      <div class="flex-y-center gap-8px">
        <NTag v-if="expired" type="error" size="small">已过期</NTag>
        <NTag v-else-if="countdown" type="info" size="small">{{ countdown }}</NTag>
        <NButton size="tiny" @click="fetchData()">{{ $t('common.refresh') }}</NButton>
      </div>
    </template>
    <NSpin :show="loading">
      <div v-if="error" class="text-red py-16px text-center">{{ error }}</div>
      <NEmpty v-else-if="missions.length === 0" class="py-16px" />
      <div v-else class="grid grid-cols-3 gap-6px">
        <div
          v-for="(m, i) in missions"
          :key="i"
          class="p-10px rounded-6px bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <div class="text-12px text-gray-400 mb-4px">{{ m.Node || '-' }}</div>
          <div class="text-13px font-medium mb-2px">{{ t(m.MissionType) }}</div>
          <div class="flex-y-center gap-8px text-11px text-gray-500 mb-2px">
            <span>{{ t(m.Faction) }}</span>
            <NTag size="tiny" :bordered="false">{{ t(m.Modifier) }}</NTag>
          </div>
          <div class="text-11px text-blue font-medium">
            ⏱ {{ parseTime(m.Expiry) ? fmtDur(parseTime(m.Expiry)! - now) : '-' }}
          </div>
        </div>
      </div>
    </NSpin>
  </NCard>
</template>
