<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { NButton, NCard, NEmpty, NSpin, NTag } from "naive-ui";
import { $t } from "@/locales";

const props = defineProps<{
  title: string;
  apiFn: () => Promise<any>;
  translateMap?: Record<string, string>;
}>();

const loading = ref(false);
const error = ref("");
const rawData = ref<any>(null);
const now = ref(Date.now());

// ── time helpers ──

const TIME_KEYS = /(Expiry|Activation|End|Start|Time|Date|expiry|activation|end|start|time|date)$/;
const MS_THRESHOLD = 1e12; // values above this are ms, below are seconds

function toMs(v: number): number {
  return v > MS_THRESHOLD ? v : v * 1000;
}

interface Countdown {
  label: string;
  msRemaining: number;
}

const countdowns = computed<Countdown[]>(() => {
  if (!rawData.value) return [];
  return findTimeFields(rawData.value, "");
});

function findTimeFields(obj: any, prefix: string): Countdown[] {
  if (!obj || typeof obj !== "object") return [];
  const results: Countdown[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (typeof val === "number" && TIME_KEYS.test(key)) {
      results.push({ label: fullKey, msRemaining: toMs(val) - now.value });
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        results.push(...findTimeFields(item, `${fullKey}[${i}]`));
      });
    } else if (val && typeof val === "object") {
      results.push(...findTimeFields(val, fullKey));
    }
  }
  return results;
}

const minCountdown = computed(() => {
  const cds = countdowns.value.filter((c) => c.msRemaining > 0);
  if (cds.length === 0) return null;
  return cds.reduce((a, b) => (a.msRemaining < b.msRemaining ? a : b));
});

const minExpired = computed(() => {
  const cds = countdowns.value.filter((c) => c.msRemaining <= 0);
  return cds.length > 0 ? cds[0] : null;
});

// ── flat display ──

interface FlatEntry {
  key: string;
  value: string;
  isTime: boolean;
}

const flatData = computed<FlatEntry[]>(() => {
  if (!rawData.value) return [];
  return flatten(rawData.value, "");
});

function flatten(obj: any, prefix: string): FlatEntry[] {
  if (obj === null || obj === undefined) return [{ key: prefix, value: "-", isTime: false }];
  if (typeof obj !== "object") {
    return [{ key: prefix, value: String(obj), isTime: false }];
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return [{ key: prefix, value: "[]", isTime: false }];
    return obj.flatMap((item, i) => flatten(item, `${prefix}[${i}]`));
  }
  return Object.keys(obj).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val === null || val === undefined) return [{ key: fullKey, value: "-", isTime: false }];
    if (typeof val === "number" && TIME_KEYS.test(key)) {
      const ms = toMs(val);
      return [{ key: fullKey, value: formatDuration(ms - now.value), isTime: true }];
    }
    if (typeof val === "object") return flatten(val, fullKey);
    const display = props.translateMap?.[String(val)] ?? String(val);
    return [{ key: fullKey, value: display, isTime: false }];
  });
}

function formatDuration(ms: number): string {
  if (ms <= 0) return "已过期";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h ${m % 60}m ${s % 60}s`;
  if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

// ── fetch ──

async function fetchData() {
  loading.value = true;
  error.value = "";
  try {
    const result = await props.apiFn();
    if (!result.error && result.data) {
      rawData.value = result.data;
    } else {
      error.value = "请求失败";
      rawData.value = null;
    }
  } catch {
    error.value = "网络错误";
  }
  loading.value = false;
}

// ── timers ──

let clockTimer: ReturnType<typeof setInterval> | null = null;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

function scheduleRefresh() {
  if (refreshTimeout) clearTimeout(refreshTimeout);
  if (minCountdown.value) {
    const delay = Math.min(minCountdown.value.msRemaining + 1000, 600_000);
    refreshTimeout = setTimeout(() => fetchData(), delay);
  } else if (minExpired.value) {
    refreshTimeout = setTimeout(() => fetchData(), 5000);
  }
}

onMounted(() => {
  fetchData();
  clockTimer = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

defineExpose({ fetchData });

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer);
  if (refreshTimeout) clearTimeout(refreshTimeout);
});

import { watch } from "vue";
watch([minCountdown, minExpired], () => scheduleRefresh(), { immediate: true });
</script>

<template>
  <NCard :title="title" :bordered="false" size="small" class="game-data-card">
    <template #header-extra>
      <div class="flex-y-center gap-8px">
        <NTag v-if="minCountdown" type="info" size="small">
          {{ formatDuration(minCountdown.msRemaining) }}
        </NTag>
        <NTag v-else-if="minExpired" type="error" size="small">已过期</NTag>
        <NButton size="tiny" @click="fetchData">{{ $t("common.refresh") }}</NButton>
      </div>
    </template>
    <NSpin :show="loading">
      <div v-if="error" class="text-red py-16px text-center">{{ error }}</div>
      <NEmpty v-else-if="!rawData" class="py-16px" />
      <div v-else class="flex-col gap-4px max-h-300px overflow-auto">
        <div
          v-for="entry in flatData"
          :key="entry.key"
          class="flex-y-center gap-8px text-12px py-2px border-b border-gray-100 dark:border-gray-700"
        >
          <span class="text-gray-400 min-w-100px shrink-0">{{ entry.key }}</span>
          <span :class="{ 'text-blue font-bold': entry.isTime }">{{ entry.value }}</span>
        </div>
      </div>
    </NSpin>
  </NCard>
</template>
