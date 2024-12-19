<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'AliasOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.Alias | null;
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
    add: $t('page.local-data.warframe.alias.addAlias'),
    edit: $t('page.local-data.warframe.alias.editAlias')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.LocalData.Alias, 'englishName' | 'chineseName'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    englishName: '',
    chineseName: ''
  };
}

type RuleKey = Extract<keyof Model, 'englishName' | 'chineseName'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  englishName: defaultRequiredRule,
  chineseName: defaultRequiredRule
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
        <NFormItem :label="$t('page.local-data.warframe.alias.englishName')" path="englishName">
          <NInput v-model:value="model.englishName" :placeholder="$t('page.local-data.warframe.alias.englishNamePlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.alias.chineseName')" path="chineseName">
          <NInput v-model:value="model.chineseName" :placeholder="$t('page.local-data.warframe.alias.chineseNamePlaceholder')" />
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
