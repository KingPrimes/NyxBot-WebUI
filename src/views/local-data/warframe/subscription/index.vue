<script lang="tsx" setup>
import { NButton, NCard, NDataTable } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteMissionSubscribe, fetchPostMissionSubscribeList } from '@/service/api/local-data';
import { useSubscriptionStore } from '@/store/modules/warframe/subscription';
import DetailOperateUserModal from './modules/subscription-user-list.vue';
const subscriptionStore = useSubscriptionStore();
defineOptions({
  name: 'SubscribeList'
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
  apiFn: fetchPostMissionSubscribeList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.local-data.warframe.subscription.id'),
      align: 'center',
      width: 80
    },
    {
      key: 'subGroup',
      title: $t('page.local-data.warframe.subscription.subGroup'),
      align: 'center',
      width: 120
    },
    {
      key: 'groupName',
      title: $t('page.local-data.warframe.subscription.groupName'),
      align: 'center',
      width: 120
    },
    {
      key: 'subBotUid',
      title: $t('page.local-data.warframe.subscription.subBotUid'),
      align: 'center',
      width: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => detail(row.id)}>
            {$t('common.detail')}
          </NButton>
          <NButton type="primary" ghost size="small" onClick={() => remove(row.id)}>
            {$t('common.delete')}
          </NButton>
        </div>
      )
    }
  ]
});
const { onDeleted } = useTableOperate(data, getData);
function detail(id: number) {
  subscriptionStore.openModal('user', 'detail', { id });
}
function remove(id: number) {
  fetchDeleteMissionSubscribe(id).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      onDeleted();
    }
  });
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <CommandSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="$t('page.local-data.warframe.subscription.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
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
    </NCard>
    <DetailOperateUserModal />
  </div>
</template>

<style scoped></style>
