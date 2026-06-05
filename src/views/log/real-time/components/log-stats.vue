<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';

interface Props {
  stats: Api.Log.Stats;
}

const props = defineProps<Props>();

const statsItems = computed(() => [
  {
    label: $t('page.log.realtime.total'),
    value: props.stats.total,
    color: '#18a058'
  },
  {
    label: 'TRACE',
    value: props.stats.trace,
    color: '#858585'
  },
  {
    label: 'DEBUG',
    value: props.stats.debug,
    color: '#4ec9b0'
  },
  {
    label: 'INFO',
    value: props.stats.info,
    color: '#4fc1ff'
  },
  {
    label: 'WARN',
    value: props.stats.warn,
    color: '#dcdcaa'
  },
  {
    label: 'ERROR',
    value: props.stats.error,
    color: '#f48771'
  },
  {
    label: $t('page.log.realtime.displayed'),
    value: props.stats.displayed,
    color: '#2080f0'
  },
  {
    label: $t('page.log.realtime.cacheSize'),
    value: props.stats.cacheSize,
    color: '#909399'
  }
]);
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <NCard v-for="item in statsItems" :key="item.label" size="small" :bordered="false" class="min-w-100px flex-1">
      <div class="flex flex-col items-center">
        <div class="mb-2 text-sm text-gray-500">{{ item.label }}</div>
        <div class="text-2xl font-bold" :style="{ color: item.color }">
          {{ item.value }}
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.min-w-100px {
  min-width: 100px;
}
</style>
