<script lang="tsx" setup>
import { NCard, NDataTable } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { fetchGetCommandLogList } from '@/service/api/system-log';
import CommandSearch from './modules/command-search.vue';

defineOptions({
  name: 'LogCommand'
});

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetCommandLogList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.log.command.id'),
      align: 'center',
      width: 80
    },
    {
      key: 'moduleName',
      title: $t('page.log.command.moduleName'),
      align: 'center',
      width: 120
    },
    {
      key: 'command',
      title: $t('page.log.command.command'),
      align: 'center',
      minWidth: 150
    },
    {
      key: 'botQQ',
      title: $t('page.log.command.botQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'groupQQ',
      title: $t('page.log.command.groupQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'triggerQQ',
      title: $t('page.log.command.triggerQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'operateTime',
      title: $t('page.log.command.operateTime'),
      align: 'center',
      width: 180
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CommandSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.log.command.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          @refresh="getData"
        />
      </template>
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
