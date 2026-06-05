<script lang="tsx" setup>
import { NCard, NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable } from "@/hooks/common/table";
import { fetchPostWeaponList, fetchWeaponUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchPostWeaponList,
  showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "name", title: $t("page.local-data.warframe.weapons.name"), align: "center" },
    {
      key: "uniqueName",
      title: $t("page.local-data.warframe.weapons.uniqueName"),
      align: "center",
    },
    {
      key: "totalDamage",
      title: $t("page.local-data.warframe.weapons.totalDamage"),
      align: "center",
      render: (row: any) => row.totalDamage ?? "-",
    },
    {
      key: "criticalChance",
      title: $t("page.local-data.warframe.weapons.criticalChance"),
      align: "center",
      render: (row: any) =>
        row.criticalChance != null ? `${(row.criticalChance * 100).toFixed(1)}%` : "-",
    },
    {
      key: "procChance",
      title: $t("page.local-data.warframe.weapons.procChance"),
      align: "center",
      render: (row: any) =>
        row.procChance != null ? `${(row.procChance * 100).toFixed(1)}%` : "-",
    },
    { key: "fireRate", title: $t("page.local-data.warframe.weapons.fireRate"), align: "center" },
    {
      key: "masteryReq",
      title: $t("page.local-data.warframe.weapons.masteryReq"),
      align: "center",
    },
    {
      key: "productCategory",
      title: $t("page.local-data.warframe.weapons.productCategory"),
      align: "center",
    },
  ],
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.weapons.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchWeaponUpdate"
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
