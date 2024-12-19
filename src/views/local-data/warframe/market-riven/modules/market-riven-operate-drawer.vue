<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'MarketRivenOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.MarketRiven | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.local-data.warframe.market-riven.addMarketRiven'),
    edit: $t('page.local-data.warframe.market-riven.editMarketRiven')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.MarketRiven, 'itemName' | 'rivenType' | 'group' | 'rankLimit' | 'imageUrl'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    itemName: '',
    rivenType: '',
    group: '',
    rankLimit: '',
    imageUrl: ''
  };
}

type RuleKey = Extract<keyof Model, 'itemName' | 'rivenType' | 'group' | 'rankLimit' | 'imageUrl'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  itemName: defaultRequiredRule,
  rivenType: defaultRequiredRule,
  group: defaultRequiredRule,
  rankLimit: defaultRequiredRule,
  imageUrl: defaultRequiredRule
};

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.market-riven.itemName')" path="itemName">
          <NInput v-model:value="model.itemName" :placeholder="$t('page.local-data.warframe.market-riven.itemNamePlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.rivenType')" path="rivenType">
          <NInput v-model:value="model.rivenType" :placeholder="$t('page.local-data.warframe.market-riven.rivenTypePlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.group')" path="group">
          <NInput v-model:value="model.group" :placeholder="$t('page.local-data.warframe.market-riven.groupPlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.rankLimit')" path="rankLimit">
          <NInput v-model:value="model.rankLimit" :placeholder="$t('page.local-data.warframe.market-riven.rankLimitPlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.imageUrl')" path="imageUrl">
          <NInput v-model:value="model.imageUrl" :placeholder="$t('page.local-data.warframe.market-riven.imageUrlPlaceholder')" />
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

<style scoped></style>
