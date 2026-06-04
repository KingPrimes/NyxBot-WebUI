<script lang="tsx" setup>
import { NButton, NDataTable } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchAliasUpdate, fetchDeleteAlias, fetchPostAliasList } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';
import AliasSearch from './modules/alias-search.vue';
import AliasOperateDrawer from './modules/alias-operate-drawer.vue';

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
  apiFn: fetchPostAliasList,
  showTotal: true,
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,

    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center',

    },
    {
      key: 'en',
      title: $t('page.local-data.warframe.alias.englishName'),
      align: 'center',

    },
    {
      key: 'cn',
      title: $t('page.local-data.warframe.alias.chineseName'),
      align: 'center',

    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',

      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NButton type="error" ghost size="small" onClick={() => handleRowDelete(row.id)}>
            {$t('common.delete')}
          </NButton>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  for (const id of checkedRowKeys.value) {
    await fetchDeleteAlias(Number(id));
  }
  onBatchDeleted();
}

async function handleRowDelete(id: number) {
  const { error } = await fetchDeleteAlias(id);
  if (!error) {
    window.$message?.success($t("common.deleteSuccess"));
    getData();
  }
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <AliasSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :bordered="false"
      :title="$t('page.local-data.warframe.alias.title')"
      class="sm:flex-1-hidden card-wrapper"
      size="small"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchAliasUpdate"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            @add="handleAdd"
            @delete="handleBatchDelete"
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
        :row-key="(row) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <AliasOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
