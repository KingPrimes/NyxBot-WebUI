<script lang="tsx" setup>
import { NCard, NDataTable, NTag } from "naive-ui";
import { $t } from "@/locales";
import { useAppStore } from "@/store/modules/app";
import { useTable } from "@/hooks/common/table";
import { fetchPostRelicList, fetchRelicUpdate } from "@/service/api/local-data";
import DataUpdateButton from "@/components/common/data-update-button.vue";

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchPostRelicList, showTotal: true,
  columns: () => [
    { type: "selection", align: "center", width: 48 },
    { key: "index", title: $t("common.index"), align: "center", width: 64 },
    { key: "name", title: $t("page.local-data.warframe.relics.name"), align: "center"},
    { key: "uniqueName", title: $t("page.local-data.warframe.relics.uniqueName"), align: "center"},
    {
      key: "relicRewards",
      title: $t("page.local-data.warframe.relics.rewards"),
      align: "center",

      render: (row: any) => {
        const rewards = row.relicRewards || [];
        if (rewards.length === 0) return "-";
        return (
          <div class="flex flex-wrap gap-4px">
            {rewards.map((r: any, i: number) => (
              <NTag key={i} size="small">{`${r.rewardName}(${r.rarity})`}</NTag>
            ))}
          </div>
        );
      },
    },
  ],
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard
      :title="$t('page.local-data.warframe.relics.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchRelicUpdate"
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
