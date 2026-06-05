<script lang="tsx" setup>
import { NCard, NDataTable } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { fetchPostRivenAnalyseList, fetchRivenAnalyseUpdate } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchPostRivenAnalyseList,
  showTotal: true,
  columns: () => [
    { type: 'selection', align: 'center', width: 48 },
    { key: 'index', title: $t('common.index'), align: 'center', width: 64 },
    { key: 'name', title: $t('page.local-data.warframe.riven-analyse.name'), align: 'center' },
    { key: 'prefix', title: $t('page.local-data.warframe.riven-analyse.prefix'), align: 'center' },
    { key: 'suffix', title: $t('page.local-data.warframe.riven-analyse.suffix'), align: 'center' },
    { key: 'rifle', title: $t('page.local-data.warframe.riven-analyse.rifle'), align: 'center' },
    {
      key: 'shotgun',
      title: $t('page.local-data.warframe.riven-analyse.shotgun'),
      align: 'center'
    },
    { key: 'pistol', title: $t('page.local-data.warframe.riven-analyse.pistol'), align: 'center' },
    { key: 'melle', title: $t('page.local-data.warframe.riven-analyse.melle'), align: 'center' },
    {
      key: 'archwing',
      title: $t('page.local-data.warframe.riven-analyse.archwing'),
      align: 'center'
    }
  ]
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.riven-analyse.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchRivenAnalyseUpdate"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="true"
            :loading="loading"
            :show-add="false"
            :show-delete="false"
            @refresh="getData"
          />
        </div>
      </template>
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        remote
        :row-key="(row: any) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>
