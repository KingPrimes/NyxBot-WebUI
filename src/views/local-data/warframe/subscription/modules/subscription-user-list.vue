<script lang="tsx" setup>
import { NButton, NDataTable } from 'naive-ui';
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { $t } from '@/locales';
import { useSubscriptionStore } from '@/store/modules/warframe/subscription';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteMissionSubscribeUser, fetchPostMissionSubscribeUserList } from '@/service/api/local-data';
import DetailOperateTypeModal from './subscription-type-list.vue';
defineOptions({
  name: 'DetailOperateUserModal'
});
const subscriptionStore = useSubscriptionStore();
const { currentId, data, loading } = storeToRefs(subscriptionStore);
const title = $t('page.local-data.warframe.subscription.userDetail');
const visibleModel = computed({
  get: () => subscriptionStore.userModalVisible && subscriptionStore.currentType === 'user',
  set: value => {
    if (!value) {
      subscriptionStore.closeModal();
    }
  }
});
function detail(id: number) {
  subscriptionStore.openModal('type', 'detail', { id });
}
const { columns, getData, mobilePagination } = useTable({
  apiFn: fetchPostMissionSubscribeUserList,
  showTotal: true,
  apiParams: {
    current: subscriptionStore.pagination.page,
    size: subscriptionStore.pagination.pageSize,
    id: currentId?.value || 0
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.local-data.warframe.subscription.id'),
      align: 'center',
      width: 80
    },
    {
      key: 'userId',
      title: $t('page.local-data.warframe.subscription.userId'),
      align: 'center',
      width: 120
    },
    {
      key: 'userName',
      title: $t('page.local-data.warframe.subscription.userName'),
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
function remove(id: number) {
  fetchDeleteMissionSubscribeUser(id).then(res => {
    if (Number(res.response.data.code) === 200) {
      onDeleted();
      subscriptionStore.handlePaginationChange(
        subscriptionStore.pagination.page,
        subscriptionStore.pagination.pageSize
      );
    }
  });
}
watch(
  () => subscriptionStore.pagination,
  newVal => {
    mobilePagination.value.page = newVal.page;
    mobilePagination.value.pageSize = newVal.pageSize;
    mobilePagination.value.itemCount = newVal.total;
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <NModal v-model:show="visibleModel" :title="title" preset="card" class="w-80%">
    <NDataTable
      :columns="columns"
      :data="data"
      size="small"
      :scroll-x="962"
      :loading="loading"
      remote
      :row-key="row => row.id"
      :pagination="{
        ...mobilePagination,
        page: subscriptionStore.pagination.page,
        pageSize: subscriptionStore.pagination.pageSize,
        itemCount: subscriptionStore.pagination.total
      }"
      class="sm:h-full"
      @update:page="page => subscriptionStore.handlePaginationChange(page, subscriptionStore.pagination.pageSize)"
      @update:page-size="size => subscriptionStore.handlePaginationChange(subscriptionStore.pagination.page, size)"
    />
  </NModal>
  <DetailOperateTypeModal />
</template>

<style scoped></style>
