<script lang="tsx" setup>
import { NButton, NCard, NDataTable, NSpace } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostRivenTrendList } from '@/service/api/local-data';
import { RivenTrendType } from '@/enum';
import RivenSearch from './modules/riven-search.vue';
import RivenOperateDrawer from './modules/riven-operate-drawer.vue';

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
  apiFn: fetchPostRivenTrendList,
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
      key: 'id',
      title: 'ID',
      align: 'center',
      width: 80
    },
    {
      key: 'traCh',
      title: $t('page.local-data.warframe.riven-trend.itemName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'trend_name',
      title: $t('page.local-data.warframe.riven-trend.itemEnName'),
      align: 'center',
      width: 100
    },
    {
      key: 'new_dot',
      title: $t('page.local-data.warframe.riven-trend.newDisposition'),
      align: 'center',
      width: 80
    },
    {
      key: 'new_num',
      title: $t('page.local-data.warframe.riven-trend.newDisposition'),
      align: 'center',
      width: 60
    },
    {
      key: 'old_dot',
      title: $t('page.local-data.warframe.riven-trend.oldDisposition'),
      align: 'center',
      width: 80
    },
    {
      key: 'old_num',
      title: $t('page.local-data.warframe.riven-trend.oldDisposition'),
      align: 'center',
      width: 60
    },
    {
      key: 'type',
      title: $t('page.local-data.warframe.riven-trend.weaponType'),
      align: 'center',
      width: 120,
      render: row => {
        return <span>{RivenTrendType[row.type as keyof typeof RivenTrendType]}</span>;
      }
    },
    {
      key: 'isDate',
      title: $t('page.local-data.warframe.riven-trend.updateTime'),
      align: 'center',
      width: 180
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 100,
      render: row => (
        <NSpace justify="center">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
        </NSpace>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  // console.log(checkedRowKeys.value);
  onBatchDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <RivenSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.local-data.warframe.riven-trend.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
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
      <RivenOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
