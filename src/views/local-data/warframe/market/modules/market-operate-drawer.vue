<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'MarketOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.Market | null;
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
    add: $t('page.local-data.warframe.market.addMarket'),
    edit: $t('page.local-data.warframe.market.editMarket'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.Market, 'item_name' | 'thumb'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    item_name: '',
    thumb: ''
  };
}

type RuleKey = Extract<keyof Model, 'item_name' | 'thumb'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  item_name: defaultRequiredRule,
  thumb: defaultRequiredRule
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
        <NFormItem :label="$t('page.local-data.warframe.market.itemName')" path="itemName">
          <NInput
            v-model:value="model.item_name"
            :placeholder="$t('page.local-data.warframe.market.itemNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market.imageUrl')" path="thumb">
          <NInput
            v-model:value="model.thumb"
            :placeholder="$t('page.local-data.warframe.market.imageUrlPlaceholder')"
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
