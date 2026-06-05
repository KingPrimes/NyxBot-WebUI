<script lang="tsx" setup>
import { h } from 'vue';
import { NCard, NDataTable, NImage } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostMarketRivenList, fetchPostUpdateMarketRiven } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';
import MarketRivenSearch from './modules/market-riven-search.vue';

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
  apiFn: fetchPostMarketRivenList,
  showTotal: true,
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'name',
      title: $t('page.local-data.warframe.market-riven.itemName'),
      align: 'center'
    },
    {
      key: 'rivenType',
      title: $t('page.local-data.warframe.market-riven.rivenType'),
      align: 'center'
    },
    {
      key: 'group',
      title: $t('page.local-data.warframe.market-riven.group'),
      align: 'center'
    },
    {
      key: 'reqMasteryRank',
      title: $t('page.local-data.warframe.market-riven.rankLimit'),
      align: 'center'
    },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.market-riven.imageUrl'),
      align: 'center',

      render: row => {
        return h(NImage, {
          src: `https://warframe.market/static/assets/${row.thumb}`,

          height: 48,
          objectFit: 'cover',
          previewDisabled: false,
          style: {
            borderRadius: '4px'
          }
        });
      }
    }
  ]
});

const { handleAdd, checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <MarketRivenSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.local-data.warframe.market-riven.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchPostUpdateMarketRiven"
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
            @add="handleAdd"
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

<style scoped></style>
