<script lang="tsx" setup>
import { NButton, NDataTable } from 'naive-ui';
import { ref } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import {
  fetchDeleteMissionSubscribe,
  fetchDeleteMissionSubscribeCheckType,
  fetchPostMissionSubscribeList,
  fetchPostMissionSubscribeUserList,
  fetchPostMissionSubscribeUserTypeList,
  fetchGetSubscribeEnums,
  fetchGetSubscribeTypeEnums,
  fetchGetSubscribeRewardEnums,
} from '@/service/api/local-data';

const appStore = useAppStore();

/** 展开行子表格数据 key=groupId, value=用户订阅扁平化列表 */
const expandedData = ref<Record<string, any[]>>({});

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchPostMissionSubscribeList,
  showTotal: true,
  columns: () => [
    { type: 'expand', align: 'center', width: 48, renderExpand: (row: any) => renderExpandContent(row) },
    { key: 'id', title: $t('page.local-data.warframe.subscription.id'), align: 'center' },
    { key: 'subGroup', title: $t('page.local-data.warframe.subscription.subGroup'), align: 'center' },
    { key: 'groupName', title: $t('page.local-data.warframe.subscription.groupName'), align: 'center' },
    { key: 'subBotUid', title: $t('page.local-data.warframe.subscription.subBotUid'), align: 'center' },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      render: (row: any) => (
        <div class="flex-center gap-8px">
          <NButton type="error" ghost size="small" onClick={() => remove(row.id)}>
            {$t('common.delete')}
          </NButton>
        </div>
      ),
    },
  ],
});

const { onDeleted } = useTableOperate(data, getData);

async function remove(id: number) {
  const { error } = await fetchDeleteMissionSubscribe(id);
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
    onDeleted();
  }
}

/** 处理展开状态变化，懒加载子表数据 */
async function handleExpandedChange(expandedKeys: (string | number)[]) {
  for (const groupId of expandedKeys) {
    const gid = Number(groupId);
    if (expandedData.value[gid]) continue;

    // 加载该组的用户
    const userRes = await fetchPostMissionSubscribeUserList({ id: gid, current: 1, size: 999 });
    const users = userRes.data?.records || [];

    // 并行加载每个用户的订阅类型
    const typePromises = users.map((u: any) =>
      fetchPostMissionSubscribeUserTypeList({ id: u.id, current: 1, size: 999 }).then(r => ({
        userId: u.userId,
        userName: u.userName,
        types: r.data?.records || [],
      }))
    );
    const userTypes = await Promise.all(typePromises);

    // 加载枚举翻译
    const [subRes, typeRes2, rewardRes] = await Promise.all([
      fetchGetSubscribeEnums(),
      fetchGetSubscribeTypeEnums(),
      fetchGetSubscribeRewardEnums(),
    ]);
    const subMap: Record<string, string> = (subRes.data as unknown as Record<string, string>) || {};
    const typeMap: Record<string, string> = (typeRes2.data as unknown as Record<string, string>) || {};
    const rewardMap: Record<string, string> = (rewardRes.data as unknown as Record<string, string>) || {};

    // 扁平化：每条订阅类型占一行
    const flat: any[] = [];
    for (const ut of userTypes) {
      if (ut.types.length > 0) {
        for (const t of ut.types) {
          const subKey = (t.subscribe || '').trim().toUpperCase();
          const typeKey = (t.missionTypeEnum || '').trim().toUpperCase();
          const rewardKey = (t.invasionReward || '').trim().toUpperCase();
          flat.push({
            userId: ut.userId,
            userName: ut.userName,
            typeId: t.id,
            subscribe: subMap[subKey] || t.subscribe,
            missionTypeEnum: typeMap[typeKey] || t.missionTypeEnum,
            tierNum: t.tierNum,
            invasionReward: rewardMap[rewardKey] || t.invasionReward,
          });
        }
      } else {
        flat.push({
          userId: ut.userId,
          userName: ut.userName,
          typeId: null,
          subscribe: '-',
          missionTypeEnum: '-',
          tierNum: '-',
          invasionReward: '-',
        });
      }
    }
    expandedData.value[gid] = flat;
  }

  // 收起时删除缓存
  for (const key of Object.keys(expandedData.value)) {
    const numKey = Number(key);
    if (!expandedKeys.some(k => Number(k) === numKey)) {
      Reflect.deleteProperty(expandedData.value, key);
    }
  }
}

/** 渲染展开行内容 */
function renderExpandContent(row: any) {
  const rows = expandedData.value[String(row.id)];
  if (!rows) {
    return <div style="padding: 16px; text-align: center; color: var(--n-text-color-3)">{$t('common.noData')}</div>;
  }

  const childColumns = [
    { key: 'userId', title: $t('page.local-data.warframe.subscription.userId'), width: 100, align: 'center' as const },
    { key: 'userName', title: $t('page.local-data.warframe.subscription.userName'), width: 120, align: 'center' as const },
    { key: 'subscribe', title: $t('page.local-data.warframe.subscription.subscribe'), align: 'center' as const },
    { key: 'missionTypeEnum', title: $t('page.local-data.warframe.subscription.missionTypeEnum'), align: 'center' as const },
    {
      key: 'tierNum',
      title: $t('page.local-data.warframe.subscription.tierNum'),
      width: 100,
      align: 'center' as const,
      render: (r: any) => r.tierNum === 0 || r.tierNum === '-' ? '-' : `T${r.tierNum}`,
    },
    { key: 'invasionReward', title: $t('page.local-data.warframe.subscription.invasionReward'), align: 'center' as const },
    {
      key: 'operate',
      title: $t('common.operate'),
      width: 160,
      align: 'center' as const,
      render: (r: any) => (
        <div class="flex-center gap-8px">
          <NButton type="error" ghost size="tiny" onClick={() => removeType(r.typeId)} disabled={!r.typeId}>
            {$t('common.delete')}
          </NButton>
        </div>
      ),
    },
  ];

  return (
    <div style="padding: 8px 16px">
      <NDataTable
        columns={childColumns}
        data={rows}
        size="small"
        bordered={false}
        singleLine={false}
        row-key={(r: any) => r.typeId || `user-${r.userId}`}
      />
    </div>
  );
}

async function removeType(typeId: number | null) {
  if (!typeId) return;
  const { error } = await fetchDeleteMissionSubscribeCheckType(typeId);
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
    // 清空展开缓存，下次展开重新加载
    Object.keys(expandedData.value).forEach(key => Reflect.deleteProperty(expandedData.value, key));
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
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
        :loading="loading"
        remote
        :row-key="(row) => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
        @update:expanded-row-keys="handleExpandedChange"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
