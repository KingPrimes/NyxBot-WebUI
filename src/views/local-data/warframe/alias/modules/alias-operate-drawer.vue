<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchPostSaveAlias } from '@/service/api/local-data';

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
    edit: $t('page.local-data.warframe.alias.editAlias'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.LocalData.Alias, 'en' | 'cn'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    en: '',
    cn: ''
  };
}

type RuleKey = Extract<keyof Model, 'en' | 'cn'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  en: defaultRequiredRule,
  cn: defaultRequiredRule
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
  await fetchPostSaveAlias(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted');
      closeDrawer();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
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
        <NFormItem :label="$t('page.local-data.warframe.alias.englishName')" path="en">
          <NInput v-model:value="model.en" :placeholder="$t('page.local-data.warframe.alias.englishNamePlaceholder')" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.alias.chineseName')" path="cn">
          <NInput v-model:value="model.cn" :placeholder="$t('page.local-data.warframe.alias.chineseNamePlaceholder')" />
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
