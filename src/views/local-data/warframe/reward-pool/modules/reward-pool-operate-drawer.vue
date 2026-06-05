<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchSaveRewardPool } from '@/service/api/local-data';

defineOptions({ name: 'RewardPoolOperateDrawer' });

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.LocalData.RewardPool | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', { default: false });

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.local-data.warframe.reward-pool.addRewardPool'),
    edit: $t('page.local-data.warframe.reward-pool.editRewardPool'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

interface RewardModel {
  item: string;
  rarity: string;
  itemCount: number;
}

interface Model {
  uniqueName: string;
  rewards: RewardModel[];
}

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return { uniqueName: '', rewards: [] };
}

const rules: Record<string, App.Global.FormRule> = {
  uniqueName: defaultRequiredRule
};

function handleInitModel() {
  model.value = createDefaultModel();
  if (props.operateType === 'edit' && props.rowData) {
    model.value.uniqueName = props.rowData.uniqueName;
    model.value.rewards = (props.rowData.rewards || []).map(r => ({
      item: r.item,
      rarity: r.rarity,
      itemCount: r.itemCount
    }));
  }
}

function addReward() {
  model.value.rewards.push({ item: '', rarity: '', itemCount: 0 });
}

function removeReward(index: number) {
  model.value.rewards.splice(index, 1);
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const { error } = await fetchSaveRewardPool(model.value as any);
  if (!error) {
    window.$message?.success($t('common.modifySuccess'));
    emit('submitted');
    closeDrawer();
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="480">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.reward-pool.uniqueName')" path="uniqueName">
          <NInput v-model:value="model.uniqueName" :disabled="operateType === 'edit'" />
        </NFormItem>
        <NFormItem label="Rewards">
          <div class="flex-col gap-8px">
            <NButton size="tiny" @click="addReward">+ 添加奖励</NButton>
            <div v-for="(reward, i) in model.rewards" :key="i" class="flex-y-center gap-8px">
              <NInput v-model:value="reward.item" placeholder="物品" style="flex: 1" />
              <NInput v-model:value="reward.rarity" placeholder="稀有度" style="width: 100px" />
              <NInputNumber v-model:value="reward.itemCount" placeholder="数量" style="width: 80px" />
              <NButton size="tiny" type="error" ghost @click="removeReward(i)">-</NButton>
            </div>
          </div>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
