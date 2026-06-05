<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { NButton, NCard, NEmpty, NSpin } from 'naive-ui';
import { $t } from '@/locales';

const props = defineProps<{
  title: string;
  apiFn: () => Promise<any>;
}>();

const loading = ref(false);
const error = ref('');
const rawData = ref<any>(null);
const now = ref(Date.now());

function parseTime(v: any): number | null {
  if (!v) return null;
  const d = typeof v === 'string' ? new Date(v) : new Date(v?.$date?.$numberLong || v);
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

interface CycleItem {
  label: string;
  state: string;
  expiry: number | null;
}

const cycles = computed<CycleItem[]>(() => {
  if (!rawData.value) return [];
  const list: CycleItem[] = [];
  const keys: Record<string, string> = {
    cetusCycle: '希图斯(地球)',
    vallisCycle: '福尔图娜(金星)',
    cambionCycle: '殁世幽都(火卫二)',
    zarimanCycle: '扎里曼号'
  };
  for (const [key, label] of Object.entries(keys)) {
    const c = rawData.value[key];
    if (c) {
      list.push({
        label,
        state: c.state || c.active || c.shortId || '-',
        expiry: parseTime(c.expiry)
      });
    }
  }
  return list;
});

async function fetchData(silent = false) {
  if (!silent) loading.value = true;
  error.value = '';
  try {
    const result = await props.apiFn();
    if (!result.error && result.data) {
      rawData.value = result.data;
    } else {
      if (!silent) error.value = '请求失败';
      rawData.value = null;
    }
  } catch {
    if (!silent) error.value = '网络错误';
  }
  if (!silent) loading.value = false;
}

const minExpiry = computed(() => {
  let min: number | null = null;
  for (const c of cycles.value) {
    if (c.expiry != null) min = min == null ? c.expiry : Math.min(min, c.expiry);
  }
  return min;
});

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

import { watch } from 'vue';
watch(
  minExpiry,
  () => {
    if (refreshTimeout) clearTimeout(refreshTimeout);
    if (minExpiry.value) {
      const delay = Math.min(Math.max(minExpiry.value - Date.now() + 1000, 0), 600_000);
      refreshTimeout = setTimeout(() => fetchData(true), delay);
    }
  },
  { immediate: true }
);

onMounted(() => fetchData());

let clockTimer: ReturnType<typeof setInterval> | null = null;
onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});
onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
  if (refreshTimeout) clearTimeout(refreshTimeout);
});
</script>

<template>
  <NCard :title="title" :bordered="false" size="small" content-style="padding:8px">
    <template #header-extra>
      <NButton size="tiny" @click="fetchData()">{{ $t('common.refresh') }}</NButton>
    </template>
    <NSpin :show="loading">
      <div v-if="error" class="text-red py-16px text-center">{{ error }}</div>
      <NEmpty v-else-if="cycles.length === 0" class="py-16px" />
      <div v-else class="flex flex-wrap gap-6px">
        <div
          v-for="item in cycles"
          :key="item.label"
          class="p-10px rounded-6px bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <div class="text-12px text-gray-400 mb-4px">{{ item.label }}</div>
          <div class="text-15px font-bold mb-2px">{{ item.state }}</div>
          <div class="text-12px text-blue font-medium">⏱ {{ item.expiry ? fmtDur(item.expiry - now) : '-' }}</div>
        </div>
      </div>
    </NSpin>
  </NCard>
</template>
