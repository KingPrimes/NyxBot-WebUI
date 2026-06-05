<script lang="tsx" setup>
import { NButton, NDataTable, NTag } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable, useTableOperate } from "@/hooks/common/table";
import { fetchDeleteRewardPool, fetchRewardPoolUpdate, fetchPostRewardPoolList } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";
import RewardPoolOperateDrawer from "./modules/reward-pool-operate-drawer.vue";

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams: _searchParams,
  resetSearchParams: _resetSearchParams,
} = useTable({
  apiFn: fetchPostRewardPoolList,
  showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "uniqueName", title: $t("page.local-data.warframe.reward-pool.uniqueName"), align: "center"},
    {
      key: "rewards",
      title: $t("page.local-data.warframe.reward-pool.rewards"),
      align: "center",

      render: (row: any) => {
        const list = row.rewards || [];
        if (list.length === 0) return "-";
        return (
          <div class="flex flex-wrap gap-4px">
            {list.map((r: any, i: number) => (
              <NTag key={i} size="small">{`${r.item}(${r.rarity}×${r.itemCount})`}</NTag>
            ))}
          </div>
        );
      },
    },
    {
      key: "operate",
      title: $t("common.operate"),
      align: "center",

      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row)}>
            {$t("common.edit")}
          </NButton>
          <NButton type="error" ghost size="small" onClick={() => handleDelete(row)}>
            {$t("common.delete")}
          </NButton>
        </div>
      ),
    },
  ],
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
} = useTableOperate(data, "uniqueName", getData);

async function handleBatchDelete() {
  for (const uniqueName of checkedRowKeys.value as string[]) {
    await fetchDeleteRewardPool(uniqueName);
  }
  onBatchDeleted();
}

async function handleDelete(row: Api.LocalData.RewardPool) {
  const { error } = await fetchDeleteRewardPool(row.uniqueName);
  if (!error) {
    window.$message?.success($t("common.deleteSuccess"));
    getData();
  }
}

function edit(row: Api.LocalData.RewardPool) {
  handleEdit(row.uniqueName);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.reward-pool.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchRewardPoolUpdate"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            :show-update="false"
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
        :row-key="(row: any) => row.uniqueName"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <RewardPoolOperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
