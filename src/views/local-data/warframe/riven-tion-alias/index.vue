<script lang="tsx" setup>
import { NButton, NCard, NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable, useTableOperate } from "@/hooks/common/table";
import { fetchDeleteRivenTionAlias, fetchPostRivenTionAliasList, fetchRivenTionAliasUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";
import RivenTionAliasOperateDrawer from "./modules/riven-tion-alias-operate-drawer.vue";

const appStore = useAppStore();

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useTable({
  apiFn: fetchPostRivenTionAliasList, showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "en", title: $t("page.local-data.warframe.riven-tion-alias.en"), align: "center"},
    { key: "cn", title: $t("page.local-data.warframe.riven-tion-alias.cn"), align: "center"},
    {
      key: "operate", title: $t("common.operate"), align: "center", width: 180,
      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>{$t("common.edit")}</NButton>
          <NButton type="error" ghost size="small" onClick={() => handleRowDelete(row.id)}>{$t("common.delete")}</NButton>
        </div>
      ),
    },
  ],
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } = useTableOperate(data, "id", getData);

async function handleBatchDelete() { for (const id of checkedRowKeys.value) { await fetchDeleteRivenTionAlias(Number(id)); } onBatchDeleted(); }
async function handleRowDelete(id: number) { const { error } = await fetchDeleteRivenTionAlias(id); if (!error) { window.$message?.success($t("common.deleteSuccess")); getData(); } }
function edit(id: number) { handleEdit(id); }
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.riven-tion-alias.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchRivenTionAliasUpdate"
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
        :row-key="(row: any) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <RivenTionAliasOperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
