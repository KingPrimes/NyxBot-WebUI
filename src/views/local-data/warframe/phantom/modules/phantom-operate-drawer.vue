<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'PhantomOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.Phantom | null;
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
    add: $t('page.local-data.warframe.phantom.addPhantom'),
    edit: $t('page.local-data.warframe.phantom.editPhantom'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.Phantom, 'item_name' | 'url_name' | 'icon' | 'thumb' | 'animation'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    item_name: '',
    url_name: '',
    icon: '',
    thumb: '',
    animation: ''
  };
}

type RuleKey = Extract<keyof Model, 'item_name' | 'url_name' | 'icon' | 'thumb' | 'animation'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  item_name: defaultRequiredRule,
  url_name: defaultRequiredRule,
  icon: defaultRequiredRule,
  thumb: defaultRequiredRule,
  animation: defaultRequiredRule
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
        <NFormItem :label="$t('page.local-data.warframe.phantom.itemName')" path="item_name">
          <NInput
            v-model:value="model.item_name"
            :placeholder="$t('page.local-data.warframe.phantom.itemNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.phantom.urlName')" path="url_name">
          <NInput
            v-model:value="model.url_name"
            :placeholder="$t('page.local-data.warframe.phantom.urlNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.phantom.iconLink')" path="icon">
          <NInput
            v-model:value="model.icon"
            :placeholder="$t('page.local-data.warframe.phantom.iconLinkPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.phantom.imageSource')" path="thumb">
          <NInput
            v-model:value="model.thumb"
            :placeholder="$t('page.local-data.warframe.phantom.imageSourcePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.phantom.animation')" path="animation">
          <NInput
            v-model:value="model.animation"
            :placeholder="$t('page.local-data.warframe.phantom.animationPlaceholder')"
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
