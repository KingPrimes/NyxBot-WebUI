<script lang="tsx" setup>
import { NButton, NCard, NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable, useTableOperate } from "@/hooks/common/table";
import { fetchDeleteRivenTion, fetchPostRivenTionList, fetchRivenTionUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";
import RivenTionOperateDrawer from "./modules/riven-tion-operate-drawer.vue";

const appStore = useAppStore();

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useTable({
  apiFn: fetchPostRivenTionList, showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "effect", title: $t("page.local-data.warframe.riven-tion.effect"), align: "center"},
    { key: "group", title: $t("page.local-data.warframe.riven-tion.group"), align: "center"},
    { key: "prefix", title: $t("page.local-data.warframe.riven-tion.prefix"), align: "center"},
    { key: "suffix", title: $t("page.local-data.warframe.riven-tion.suffix"), align: "center"},
    { key: "units", title: $t("page.local-data.warframe.riven-tion.units"), align: "center"},
    { key: "urlName", title: $t("page.local-data.warframe.riven-tion.urlName"), align: "center"},
    { key: "exclusiveTo", title: $t("page.local-data.warframe.riven-tion.exclusiveTo"), align: "center"},
    {
      key: "operate", title: $t("common.operate"), align: "center", width: 180,
      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.ids)}>{$t("common.edit")}</NButton>
          <NButton type="error" ghost size="small" onClick={() => handleRowDelete(row.ids)}>{$t("common.delete")}</NButton>
        </div>
      ),
    },
  ],
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } = useTableOperate(data, "ids", getData);

async function handleBatchDelete() { for (const id of checkedRowKeys.value) { await fetchDeleteRivenTion(Number(id)); } onBatchDeleted(); }
async function handleRowDelete(ids: number) { const { error } = await fetchDeleteRivenTion(ids); if (!error) { window.$message?.success($t("common.deleteSuccess")); getData(); } }
function edit(ids: number) { handleEdit(ids); }
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.riven-tion.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchRivenTionUpdate"
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
        :row-key="(row: any) => row.ids"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <RivenTionOperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
