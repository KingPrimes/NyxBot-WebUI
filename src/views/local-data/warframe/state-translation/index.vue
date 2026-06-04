<script lang="tsx" setup>
import { onMounted, ref } from "vue";
import { NButton, NCard, NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable, useTableOperate } from "@/hooks/common/table";
import { fetchDeleteStateTranslation, fetchGetStateTranslationTypes, fetchPostStateTranslationList, fetchStateTranslationUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";
import StateTranslationOperateDrawer from "./modules/state-translation-operate-drawer.vue";

const appStore = useAppStore();
const typeMap = ref<Record<string, string>>({});

const { columns, columnChecks, data, getData, getDataByPage, loading, mobilePagination } = useTable({
  apiFn: fetchPostStateTranslationList, showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "uniqueName", title: $t("page.local-data.warframe.state-translation.uniqueName"), align: "center"},
    { key: "name", title: $t("page.local-data.warframe.state-translation.name"), align: "center"},
    { key: "type", title: $t("page.local-data.warframe.state-translation.type"), align: "center",
      render: (row: any) => typeMap.value[row.type] || row.type,
    },
    { key: "description", title: $t("page.local-data.warframe.state-translation.description"), align: "center", ellipsis: { tooltip: true } },
    { key: "parentName", title: $t("page.local-data.warframe.state-translation.parentName"), align: "center"},
    {
      key: "operate", title: $t("common.operate"), align: "center", width: 180,
      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.uniqueName)}>{$t("common.edit")}</NButton>
          <NButton type="error" ghost size="small" onClick={() => handleRowDelete(row.uniqueName)}>{$t("common.delete")}</NButton>
        </div>
      ),
    },
  ],
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted } = useTableOperate(data, "uniqueName", getData);

async function handleBatchDelete() { for (const uniqueName of checkedRowKeys.value) { await fetchDeleteStateTranslation(uniqueName); } onBatchDeleted(); }
async function handleRowDelete(uniqueName: string) { const { error } = await fetchDeleteStateTranslation(uniqueName); if (!error) { window.$message?.success($t("common.deleteSuccess")); getData(); } }
function edit(uniqueName: string) { handleEdit(uniqueName); }

onMounted(async () => {
  const { error, data: types } = await fetchGetStateTranslationTypes();
  if (!error && types) {
    types.forEach((t) => { typeMap.value[t.value] = t.label; });
  }
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.state-translation.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchStateTranslationUpdate"
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
        :row-key="(row: any) => row.uniqueName"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <StateTranslationOperateDrawer
      v-model:visible="drawerVisible"
      :operate-type="operateType"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
