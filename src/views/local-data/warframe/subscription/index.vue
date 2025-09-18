<script lang="tsx" setup>
// 导入 Naive UI 组件
import { NButton, NCard, NDataTable } from 'naive-ui';
// 导入国际化翻译函数
import { $t } from '@/locales';
// 导入应用状态管理
import { useAppStore } from '@/store/modules/app';
// 导入表格相关的 hooks
import { useTable, useTableOperate } from '@/hooks/common/table';
// 导入 Warframe 订阅相关的 API 服务
import { fetchDeleteMissionSubscribe, fetchPostMissionSubscribeList } from '@/service/api/local-data';
// 导入 Warframe 订阅状态管理
import { useSubscriptionStore } from '@/store/modules/warframe/subscription';
// 导入用户订阅详情弹窗组件
import DetailOperateUserModal from './modules/subscription-user-list.vue';

// 初始化订阅状态管理
const subscriptionStore = useSubscriptionStore();

// 定义组件名称
defineOptions({
  name: 'SubscribeList'
});

// 初始化应用状态管理
const appStore = useAppStore();

// 使用表格 hooks 配置订阅列表
const {
  columns, // 表格列配置
  columnChecks, // 列显示状态控制
  data, // 表格数据
  getData, // 获取数据函数
  getDataByPage, // 分页获取数据函数
  loading, // 加载状态
  mobilePagination, // 移动端分页配置
  searchParams, // 搜索参数
  resetSearchParams // 重置搜索参数函数
} = useTable({
  // API 请求函数
  apiFn: fetchPostMissionSubscribeList,
  // 显示总数
  showTotal: true,
  // 初始请求参数
  apiParams: {
    current: 1, // 当前页码
    size: 10 // 每页条数
  },
  // 表格列定义
  columns: () => [
    {
      key: 'id', // 数据唯一标识
      title: $t('page.local-data.warframe.subscription.id'), // 国际化标题
      align: 'center', // 居中对齐
      width: 80 // 列宽
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

// 使用表格操作 hooks
const { onDeleted } = useTableOperate(data, getData);

// 查看详情函数
function detail(id: number) {
  // 调用订阅状态管理的 openModal 方法打开详情弹窗
  subscriptionStore.openModal('user', 'detail', { id });
}

// 删除订阅函数
function remove(id: number) {
  // 调用删除订阅的 API
  fetchDeleteMissionSubscribe(id).then(res => {
    if (Number(res.response.data.code) === 200) {
      // 删除成功后显示成功消息
      window.$message?.success(res.response.data.msg);
      // 触发删除后的回调，刷新数据
      onDeleted();
    }
  });
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <!-- 搜索组件 -->
    <CommandSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />

    <!-- 表格卡片 -->
    <NCard
      :title="$t('page.local-data.warframe.subscription.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
      <!-- 卡片头部右侧操作区 -->
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :show-add="false"
          :show-delete="false"
          @refresh="getData"
        />
      </template>

      <!-- 数据表格组件 -->
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

    <!-- 订阅用户详情弹窗组件 -->
    <DetailOperateUserModal />
  </div>
</template>

<style scoped></style>
