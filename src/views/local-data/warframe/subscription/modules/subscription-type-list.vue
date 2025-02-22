<script lang="tsx" setup>
import { NButton, NDataTable } from 'naive-ui';
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { $t } from '@/locales';
import { useSubscriptionStore } from '@/store/modules/warframe/subscription';
import { useTable, useTableOperate } from '@/hooks/common/table';
import {
  fetchDeleteMissionSubscribeCheckType,
  fetchGetSubscribeEnums,
  fetchPostMissionSubscribeUserTypeList
} from '@/service/api/local-data';

defineOptions({
  name: 'DetailOperateTypeModal'
});
const subscriptionStore = useSubscriptionStore();
const { currentId, data, loading } = storeToRefs(subscriptionStore);
const title = $t('page.local-data.warframe.subscription.typeDetail');
const visibleModel = computed({
  get: () => subscriptionStore.typeModalVisible && subscriptionStore.currentType === 'type',
  set: value => {
    if (!value) {
      subscriptionStore.closeModal();
    }
  }
});
const codesOption = ref<CommonType.Option<string>[]>([]);
onMounted(() => async () => {
  const d = await fetchGetSubscribeEnums();
  if (d) {
    codesOption.value = d.data?.data.map((item: { label: any; value: any }) => ({
      label: item.label,
      value: item.value
    }));
  }
});

const { columns, getData, mobilePagination } = useTable({
  apiFn: fetchPostMissionSubscribeUserTypeList,
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
      key: 'subscribe',
      title: $t('page.local-data.warframe.subscription.subscribe'),
      align: 'center',
      width: 120
    },
    {
      key: 'missionTypeEnum',
      title: $t('page.local-data.warframe.subscription.missionTypeEnum'),
      align: 'center',
      width: 120
    },
    {
      key: 'tierNum',
      title: $t('page.local-data.warframe.subscription.tierNum'),
      align: 'center',
      width: 120,
      render: row => <div class="flex-center gap-8px">{row.tierNum === 0 ? '不限' : row.tierNum}</div>
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
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
  fetchDeleteMissionSubscribeCheckType(id).then(res => {
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
</template>

<style scoped></style>
