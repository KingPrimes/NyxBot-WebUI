<script lang="tsx" setup>
import { h } from 'vue';
import { NButton, NCard, NDataTable, NImage, NPopconfirm, NSpace } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchPostMarketRivenList } from '@/service/api/local-data';
import MarketRivenSearch from './modules/market-riven-search.vue';
import MarketRivenOperateDrawer from './modules/market-riven-operate-drawer.vue';

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
      key: 'item_name',
      title: $t('page.local-data.warframe.market-riven.itemName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'riven_type',
      title: $t('page.local-data.warframe.market-riven.rivenType'),
      align: 'center',
      width: 100
    },
    {
      key: 'group',
      title: $t('page.local-data.warframe.market-riven.group'),
      align: 'center',
      width: 100
    },
    {
      key: 'rank_limit',
      title: $t('page.local-data.warframe.market-riven.rankLimit'),
      align: 'center',
      width: 100
    },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.market-riven.imageUrl'),
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
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <NSpace justify="center">
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
        </NSpace>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);
  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  console.log(id);
  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}
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
      <MarketRivenOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
