<script lang="tsx" setup>
import { h } from 'vue';
import { NDataTable, NImage } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchLichSisterUpdate, fetchPostLichSisterList } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage: _getDataByPage,
  loading,
  mobilePagination,
  searchParams: _searchParams,
  resetSearchParams: _resetSearchParams
} = useTable({
  apiFn: fetchPostLichSisterList,
  showTotal: true,
  columns: () => [
    { type: 'selection', align: 'center', width: 48 },
    { key: 'index', title: $t('common.index'), align: 'center', width: 64 },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.market.imageUrl'),
      align: 'center',

      render: (row: any) => {
        return h(NImage, {
          src: `https://warframe.market/static/assets/${row.icon}`,

          height: 36,
          objectFit: 'cover',
          previewDisabled: false,
          style: { borderRadius: '4px' }
        });
      }
    },
    { key: 'name', title: $t('page.local-data.warframe.lich-sister.name'), align: 'center' },
    { key: 'slug', title: $t('page.local-data.warframe.lich-sister.slug'), align: 'center' },
    {
      key: 'reqMasteryRank',
      title: $t('page.local-data.warframe.lich-sister.reqMasteryRank'),
      align: 'center',

      render: row => row.reqMasteryRank ?? '-'
    },
    { key: 'gameRef', title: $t('page.local-data.warframe.lich-sister.gameRef'), align: 'center' }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.lich-sister.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchLichSisterUpdate"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            :show-add="false"
            :show-delete="false"
            @refresh="getData"
          />
        </div>
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>
