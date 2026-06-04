<script lang="tsx" setup>
import { NDataTable } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable } from "@/hooks/common/table";
import { fetchNightWaveUpdate, fetchPostNightWaveList } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  loading,
  mobilePagination,
  searchParams: _searchParams,
  resetSearchParams: _resetSearchParams,
} = useTable({
  apiFn: fetchPostNightWaveList,
  showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    {
      key: "uniqueName",
      title: $t("page.local-data.warframe.night-wave.uniqueName"),
      align: "center",
    },
    { key: "name", title: $t("page.local-data.warframe.night-wave.name"), align: "center" },
    {
      key: "description",
      title: $t("page.local-data.warframe.night-wave.description"),
      align: "center",
    },
    { key: "standing", title: $t("page.local-data.warframe.night-wave.standing"), align: "center" },
    { key: "required", title: $t("page.local-data.warframe.night-wave.required"), align: "center" },
  ],
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.night-wave.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchNightWaveUpdate"
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
