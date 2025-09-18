<script lang="tsx" setup>
import { NButton, NDataTable } from 'naive-ui';
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { $t } from '@/locales';
import { useSubscriptionStore } from '@/store/modules/warframe/subscription';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteMissionSubscribeUser, fetchPostMissionSubscribeUserList } from '@/service/api/local-data';
import DetailOperateTypeModal from './subscription-type-list.vue';

// 定义组件名称
defineOptions({
  name: 'DetailOperateUserModal'
});

// 获取订阅状态管理实例
const subscriptionStore = useSubscriptionStore();
// 解构store中的响应式数据
const { currentId, data, loading } = storeToRefs(subscriptionStore);
// 模态框标题（国际化）
const title = $t('page.local-data.warframe.subscription.userDetail');

/** 计算模态框可见性状态 仅当用户模态框可见且当前类型为'user'时显示 */
const visibleModel = computed({
  get: () => subscriptionStore.userModalVisible && subscriptionStore.currentType === 'user',
  set: value => {
    if (!value) {
      subscriptionStore.closeModal();
    }
  }
});

/**
 * 查看用户详情
 *
 * @param id 用户ID
 */
function detail(id: number) {
  subscriptionStore.openModal('type', 'detail', { id });
}

/** 初始化表格配置 */
const { columns, getData, mobilePagination } = useTable({
  apiFn: fetchPostMissionSubscribeUserList, // 数据获取API
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
      // 自定义操作列渲染
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

// 获取表格操作相关方法
const { onDeleted } = useTableOperate(data, getData);

/**
 * 删除用户订阅
 *
 * @param id 订阅ID
 */
function remove(id: number) {
  fetchDeleteMissionSubscribeUser(id).then(res => {
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
  <!-- 用户订阅详情模态框 -->
  <NModal v-model:show="visibleModel" :title="title" preset="card" class="w-80%">
    <!-- 数据表格展示用户订阅列表 -->
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
  <!-- 引入类型详情模态框组件 -->
  <DetailOperateTypeModal />
</template>

<style scoped></style>
