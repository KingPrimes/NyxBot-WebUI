<script lang="tsx" setup>
import { NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable } from "@/hooks/common/table";
import { fetchPostWarframesList, fetchWarframesUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchPostWarframesList, showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { type: "expand", align: "center", width: 48, renderExpand: (row: any) => renderExpandContent(row) },
    { key: "name", title: $t("page.local-data.warframe.warframes.name"), align: "center"},
    { key: "description", title: $t("page.local-data.warframe.warframes.description"), ellipsis: { tooltip: true } },
    { key: "health", title: $t("page.local-data.warframe.warframes.health"), align: "center"},
    { key: "shield", title: $t("page.local-data.warframe.warframes.shield"), align: "center"},
    { key: "armor", title: $t("page.local-data.warframe.warframes.armor"), align: "center"},
    { key: "power", title: $t("page.local-data.warframe.warframes.power"), align: "center"},
    { key: "masteryReq", title: $t("page.local-data.warframe.warframes.masteryReq"), align: "center"},
    { key: "sprintSpeed", title: $t("page.local-data.warframe.warframes.sprintSpeed"), align: "center"},
  ],
});

function renderExpandContent(row: any) {
  const abilities = row.abilities;
  if (!abilities || abilities.length === 0) {
    return <div style="padding: 8px 16px; color: var(--n-text-color-3)">{$t("common.noData")}</div>;
  }
  const abilityColumns = [
    { key: "abilityName", title: $t("page.local-data.warframe.warframes.abilityName")},
    { key: "description", title: $t("page.local-data.warframe.warframes.abilityDesc"), ellipsis: { tooltip: true } },
  ];
  return (
    <div style="padding: 8px 16px; max-width: 600px;">
      <NDataTable columns={abilityColumns} data={abilities} size="small" bordered={false} />
    </div>
  );
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.warframes.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchWarframesUpdate"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="true"
            :loading="loading"
            :show-add="false"
            :show-delete="false"
            @refresh="getData"
          />
        </div>
      </template>
      <NDataTable
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
  </div>
</template>
