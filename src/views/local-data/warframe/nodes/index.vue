<script lang="tsx" setup>
import { NButton, NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable, useTableOperate } from "@/hooks/common/table";
import { fetchDeleteNodes, fetchNodesUpdate, fetchPostNodesList } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";
import NodesOperateDrawer from "./modules/nodes-operate-drawer.vue";

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
  apiFn: fetchPostNodesList,
  showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "uniqueName", title: $t("page.local-data.warframe.nodes.uniqueName"), align: "center"},
    { key: "name", title: $t("page.local-data.warframe.nodes.name"), align: "center"},
    { key: "systemName", title: $t("page.local-data.warframe.nodes.systemName"), align: "center"},
    { key: "masteryReq", title: $t("page.local-data.warframe.nodes.masteryReq"), align: "center"},
    { key: "missionIndex", title: $t("page.local-data.warframe.nodes.missionIndex"), align: "center"},
    { key: "factionIndex", title: $t("page.local-data.warframe.nodes.factionIndex"), align: "center"},
    { key: "minEnemyLevel", title: $t("page.local-data.warframe.nodes.minEnemyLevel"), align: "center"},
    { key: "maxEnemyLevel", title: $t("page.local-data.warframe.nodes.maxEnemyLevel"), align: "center"},
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
  for (const row of checkedRowKeys.value as any) {
    await fetchDeleteNodes(row.uniqueName || row);
  }
  onBatchDeleted();
}

async function handleDelete(row: Api.LocalData.Nodes) {
  const { error } = await fetchDeleteNodes(row.uniqueName);
  if (!error) {
    window.$message?.success($t("common.deleteSuccess"));
    getData();
  }
}

function edit(row: Api.LocalData.Nodes) {
  handleEdit(row.uniqueName);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.nodes.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchNodesUpdate"
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
    <NodesOperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
