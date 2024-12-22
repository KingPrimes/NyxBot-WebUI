<script lang="tsx" setup>
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostPhantomList } from '@/service/api/local-data';
import PhantomSearch from './modules/phantom-search.vue';
import PhantomOperateDrawer from './modules/phantom-operate-drawer.vue';

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
  apiFn: fetchPostPhantomList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    item_name: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 80
    },
    {
      key: 'item_name',
      title: $t('page.local-data.warframe.phantom.itemName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'url_name',
      title: $t('page.local-data.warframe.phantom.urlName'),
      align: 'center',
      width: 150
    },
    {
      key: 'icon',
      title: $t('page.local-data.warframe.phantom.iconLink'),
      align: 'center',
      width: 150
    },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.phantom.imageSource'),
      align: 'center',
      width: 150
    },
    {
      key: 'animation',
      title: $t('page.local-data.warframe.phantom.animation'),
      align: 'center',
      width: 150
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, checkedRowKeys, onBatchDeleted } = useTableOperate(
  data,
  getData
);

async function handleBatchDelete() {
  // request
  onBatchDeleted();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <PhantomSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.local-data.warframe.phantom.title')"
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
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
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
      <PhantomOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
