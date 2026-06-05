<script lang="tsx" setup>
import { ref } from 'vue';
import { NCard, NDataTable, NImage } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { fetchPostPhantomList, fetchPostUpdatePhantom } from '@/service/api/local-data';
import DataUpdateButton from '@/components/common/data-update-button.vue';
import PhantomSearch from './modules/phantom-search.vue';

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
  apiFn: fetchPostPhantomList,
  showTotal: true,
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,

    },
    {
      key: 'name',
      title: $t('page.local-data.warframe.phantom.itemName'),
      align: 'center',
      ellipsis: { tooltip: true }
    },
    {
      key: 'slug',
      title: $t('page.local-data.warframe.phantom.urlName'),
      align: 'center',
      ellipsis: { tooltip: true }
    },
    {
      key: 'thumb',
      title: $t('page.local-data.warframe.phantom.imageThumb'),
      align: 'center',
      render: row => (
        row.thumb ? <NImage src={`https://warframe.market/static/assets/${row.thumb}`} width={48} height={48} objectFit="cover" previewDisabled={false} style="border-radius: 4px" /> : null
      )
    },
    {
      key: 'icon',
      title: $t('page.local-data.warframe.phantom.iconLink'),
      align: 'center',
      render: row => (
        row.icon ? <NImage src={`https://warframe.market/static/assets/${row.icon}`} width={48} height={48} objectFit="cover" previewDisabled={false} style="border-radius: 4px" /> : null
      )
    },
    {
      key: 'animation',
      title: $t('page.local-data.warframe.phantom.animation'),
      align: 'center',
      render: row => row.animation ? <NImage src={`https://warframe.market/static/assets/${row.animation}`} width={64} height={48} objectFit="cover" previewDisabled={false} style="border-radius: 4px" /> : null
    }
  ]
});

const checkedRowKeys = ref<string[]>([]);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <PhantomSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :bordered="false"
      :title="$t('page.local-data.warframe.phantom.title')"
      class="sm:flex-1-hidden card-wrapper"
      size="small"
    >
      <template #header-extra>
        <div class="flex-y-center gap-8px">
          <DataUpdateButton
            :api-fn="fetchPostUpdatePhantom"
            :button-text="$t('common.update')"
            :success-message="$t('common.updateSuccess')"
            @completed="getData"
          />
          <TableHeaderOperation
            v-model:columns="columnChecks"
            :disabled-delete="checkedRowKeys.length === 0"
            :loading="loading"
            :show-add="false"
            :show-delete="false"
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
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>
