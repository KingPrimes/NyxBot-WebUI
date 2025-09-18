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

// 定义组件名称
defineOptions({
  name: 'DetailOperateTypeModal'
});

// 获取订阅状态管理实例
const subscriptionStore = useSubscriptionStore();
// 解构store中的响应式数据
const { currentId, data, loading } = storeToRefs(subscriptionStore);
// 模态框标题（国际化）
const title = $t('page.local-data.warframe.subscription.typeDetail');

/** 计算模态框可见性状态 仅当类型模态框可见且当前类型为'type'时显示 */
const visibleModel = computed({
  get: () => subscriptionStore.typeModalVisible && subscriptionStore.currentType === 'type',
  set: value => {
    if (!value) {
      subscriptionStore.closeModal();
    }
  }
});

// 订阅枚举选项列表
const codesOption = ref<CommonType.Option<string>[]>([]);

/** 组件挂载时初始化数据 */
onMounted(() => async () => {
  const d = await fetchGetSubscribeEnums();
  if (d) {
    codesOption.value = d.data?.data.map((item: { label: any; value: any }) => ({
      label: item.label,
      value: item.value
    }));
  }
});

/** 初始化表格配置 */
const { columns, getData, mobilePagination } = useTable({
  apiFn: fetchPostMissionSubscribeUserTypeList, // 数据获取API
  showTotal: true, // 显示总数
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
      // 自定义渲染层级，0表示不限
      render: row => <div class="flex-center gap-8px">{row.tierNum === 0 ? '不限' : row.tierNum}</div>
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      // 自定义操作列渲染
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

// 获取表格操作相关方法
const { onDeleted } = useTableOperate(data, getData);

/**
 * 删除类型订阅
 *
 * @param id 订阅类型ID
 */
function remove(id: number) {
  fetchDeleteMissionSubscribeCheckType(id).then(res => {
    if (Number(res.response.data.code) === 200) {
      onDeleted(); // 处理删除后的表格更新
      // 重新加载当前页面数据
      subscriptionStore.handlePaginationChange(
        subscriptionStore.pagination.page,
        subscriptionStore.pagination.pageSize
      );
    }
  });
}

/** 监听分页变化，同步到移动端分页配置 */
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
  <!-- 类型订阅详情模态框 -->
  <NModal v-model:show="visibleModel" :title="title" preset="card" class="w-80%">
    <!-- 数据表格展示类型订阅列表 -->
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
