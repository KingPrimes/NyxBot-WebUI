<script lang="tsx" setup>
import { NButton, NCard, NDataTable } from 'naive-ui';
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { useBoolean } from '@sa/hooks';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchGetCodesOption, fetchGetCommandLogList } from '@/service/api/system-log';
import CommandSearch from './modules/command-search.vue';
import DetailOperateModal, { type OperateType } from './modules/command-operate-modal.vue';

defineOptions({
  name: 'LogCommand'
});
const { bool: visible, setTrue: openModal } = useBoolean();
const codesOption = ref<CommonType.Option<string>[]>([]);
async function getCodes() {
  const { error, data } = await fetchGetCodesOption();

  if (!error) {
    codesOption.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}
onMounted(() => {
  getCodes();
});
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
  apiFn: fetchGetCommandLogList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.log.command.id'),
      align: 'center',
      width: 80
    },
    {
      key: 'title',
      title: $t('page.log.command.moduleName'),
      align: 'center',
      width: 120
    },
    {
      key: 'codes',
      title: $t('page.log.command.command'),
      align: 'center',
      minWidth: 150,
      render: row => (
        <div class="flex-center gap-8px">
          {codesOption.value.map((item: { value: string; label: any }) => {
            if (item.value === row.codes) {
              return <span>{item.label}</span>;
            }
            return null;
          })}
        </div>
      )
    },
    {
      key: 'botUid',
      title: $t('page.log.command.botQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'groupUid',
      title: $t('page.log.command.groupQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'userUid',
      title: $t('page.log.command.triggerQQ'),
      align: 'center',
      width: 120
    },
    {
      key: 'runTime',
      title: $t('page.log.command.operateTime'),
      align: 'center',
      width: 180,
      render: row => {
        return `${row.runTime} ms`;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => detail(row.id, codesOption.value)}>
            {$t('common.detail')}
          </NButton>
        </div>
      )
    }
  ]
});
useTableOperate(data, getData);
const editingData: Ref<{ id: number; codesOption: CommonType.Option<string>[] } | null> = ref(null);
const operateType = ref<OperateType>('detail');
function detail(id: number, options: CommonType.Option<string>[]) {
  editingData.value = { id, codesOption: options };
  openModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CommandSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.log.command.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          @refresh="getData"
        />
      </template>
      <NDataTable
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <DetailOperateModal v-model:visible="visible" :operate-type="operateType" :row-data="editingData" />
    </NCard>
  </div>
</template>

<style scoped></style>
