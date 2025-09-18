<script lang="tsx" setup>
import { h } from 'vue';
import { NDataTable, NImage } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostMarketList, fetchPostUpdateMarket } from '@/service/api/local-data';
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
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.local-data.warframe.market.itemName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.market.imageUrl'),
      align: 'center',
      width: 120,
      render: row => {
        return h(NImage, {
          src: `https://warframe.market/static/assets/${row.thumb}`,
          width: 48,
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

async function updateData() {
  await fetchPostUpdateMarket().then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}
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
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          :show-update="true"
          @add="handleAdd"
          @refresh="getData"
          @update="updateData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
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
