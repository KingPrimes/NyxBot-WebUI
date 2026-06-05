<script lang="tsx" setup>
import { h } from 'vue';
import { NDataTable, NImage } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostMarketList, fetchPostUpdateMarket } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';
import MarketSearch from './modules/market-search.vue';

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
  apiFn: fetchPostMarketList,
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
      key: 'thumb',
      title: $t('page.local-data.warframe.market.imageUrl'),
      align: 'center',

      render: (row: any) => {
        return h(NImage, {
          src: `https://warframe.market/static/assets/${row.icon}`,

          height: 36,
          objectFit: 'cover',
          previewDisabled: false,
          style: {
            borderRadius: '4px'
          }
        });
      }
    },
    {
      key: 'name',
      title: $t('page.local-data.warframe.market.itemName'),
      align: 'center'
    },
    {
      key: 'slug',
      title: $t('page.local-data.warframe.market.slug'),
      align: 'center'
    },
    {
      key: 'ducats',
      title: $t('page.local-data.warframe.market.ducats'),
      align: 'center',

      render: row => {
        return row.ducats != null ? row.ducats : '-';
      }
    },
    {
      key: 'maxRank',
      title: $t('page.local-data.warframe.market.maxRank'),
      align: 'center',

      render: row => {
        return row.maxRank != null ? row.maxRank : '-';
      }
    },
    {
      key: 'vaulted',
      title: $t('page.local-data.warframe.market.vaulted'),
      align: 'center',

      render: row => {
        return row.vaulted ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no');
      }
    }
  ]
});

const { handleAdd, checkedRowKeys } = useTableOperate(data, getData);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <MarketSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.local-data.warframe.market.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchPostUpdateMarket"
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
