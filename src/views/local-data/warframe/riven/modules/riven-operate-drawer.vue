<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'RivenOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.Riven | null;
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
    add: $t('page.local-data.warframe.riven.addRiven'),
    edit: $t('page.local-data.warframe.riven.editRiven')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.Riven, 'itemName' | 'itemEnName' | 'newDisposition' | 'oldDisposition' | 'weaponType'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    itemName: '',
    itemEnName: '',
    newDisposition: '',
    oldDisposition: '',
    weaponType: ''
  };
}

type RuleKey = Extract<keyof Model, 'itemName' | 'itemEnName' | 'newDisposition' | 'oldDisposition' | 'weaponType'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  itemName: defaultRequiredRule,
  itemEnName: defaultRequiredRule,
  newDisposition: defaultRequiredRule,
  oldDisposition: defaultRequiredRule,
  weaponType: defaultRequiredRule
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
        <NFormItem :label="$t('page.local-data.warframe.riven.itemName')" path="itemName">
          <NInput
            v-model:value="model.itemName"
            :placeholder="$t('page.local-data.warframe.riven.itemNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven.itemEnName')" path="itemEnName">
          <NInput
            v-model:value="model.itemEnName"
            :placeholder="$t('page.local-data.warframe.riven.itemEnNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven.newDisposition')" path="newDisposition">
          <NInput
            v-model:value="model.newDisposition"
            :placeholder="$t('page.local-data.warframe.riven.newDispositionPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven.oldDisposition')" path="oldDisposition">
          <NInput
            v-model:value="model.oldDisposition"
            :placeholder="$t('page.local-data.warframe.riven.oldDispositionPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven.weaponType')" path="weaponType">
          <NInput
            v-model:value="model.weaponType"
            :placeholder="$t('page.local-data.warframe.riven.weaponTypePlaceholder')"
          />
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
