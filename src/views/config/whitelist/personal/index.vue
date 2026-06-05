<script lang="tsx" setup>
import { NButton, NDataTable, NPopconfirm } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchGetWhitelistProvelList, fetchRemoveWhiteProve } from '@/service/api/system-config-bot-white';
import WhiteSearch from './modules/white-search.vue';
import WhiteOperateDrawer from './modules/white-operate-drawer.vue';

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
  apiFn: fetchGetWhitelistProvelList,
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
      key: 'botUid',
      title: $t('page.config.admin.botAccount'),
      align: 'center',

    },
    {
      key: 'proveUid',
      title: $t('page.config.whitelist.personal.personalAccount'),
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
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  handleAdd,
  handleEdit,
  editingData,
  checkedRowKeys,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleDelete(id: number) {
  await fetchRemoveWhiteProve(id).then(res => {
    if (Number(res.response.data.code) === 200) {
      onDeleted();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <WhiteSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.config.whitelist.personal.title')"
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
          @refresh="getData"
        />
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
      <WhiteOperateDrawer
        v-model:visible="drawerVisible"
        :row-data="editingData"
        :operate-type="operateType"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
