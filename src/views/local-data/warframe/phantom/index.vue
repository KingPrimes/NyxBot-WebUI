<script lang="tsx" setup>
import { ref } from 'vue';
import { NCard, NDataTable } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { fetchPostPhantomList } from '@/service/api/local-data';
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
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.local-data.warframe.phantom.itemName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'slug',
      title: $t('page.local-data.warframe.phantom.urlName'),
      align: 'center',
      width: 150
    },
    {
      key: 'icon',
      title: $t('page.local-data.warframe.phantom.iconLink'),
      align: 'center',
      width: 100,
      render: row => (
        row.icon ? <img src={row.icon} alt={row.name} style="width: 48px; height: 48px" /> : null
      )
    },
    {
      key: 'animation',
      title: $t('page.local-data.warframe.phantom.animation'),
      align: 'center',
      width: 120,
      render: row => row.animation ? <img src={row.animation} alt={row.name} style="width: 64px; height: 48px" /> : null
    }
  ]
});

const checkedRowKeys = ref<string[]>([]);
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <PhantomSearch
      v-model:model="searchParams"
      @reset="resetSearchParams"
      @search="getDataByPage"
    />
    <NCard
      :bordered="false"
      :title="$t('page.local-data.warframe.phantom.title')"
      class="sm:flex-1-hidden card-wrapper"
      size="small"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="(row) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>
