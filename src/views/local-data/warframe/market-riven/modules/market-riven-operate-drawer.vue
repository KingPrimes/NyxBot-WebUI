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
    edit: $t('page.local-data.warframe.market-riven.editMarketRiven'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.MarketRiven, 'item_name' | 'riven_type' | 'group' | 'rank_limit' | 'thumb'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    item_name: '',
    riven_type: '',
    group: '',
    rank_limit: '',
    thumb: ''
  };
}

type RuleKey = Extract<keyof Model, 'item_name' | 'riven_type' | 'group' | 'rank_limit' | 'thumb'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  item_name: defaultRequiredRule,
  riven_type: defaultRequiredRule,
  group: defaultRequiredRule,
  rank_limit: defaultRequiredRule,
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
        <NFormItem :label="$t('page.local-data.warframe.market-riven.itemName')" path="item_name">
          <NInput
            v-model:value="model.item_name"
            :placeholder="$t('page.local-data.warframe.market-riven.itemNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.rivenType')" path="riven_type">
          <NInput
            v-model:value="model.riven_type"
            :placeholder="$t('page.local-data.warframe.market-riven.rivenTypePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.group')" path="group">
          <NInput
            v-model:value="model.group"
            :placeholder="$t('page.local-data.warframe.market-riven.groupPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.rankLimit')" path="rank_limit">
          <NInput
            v-model:value="model.rank_limit"
            :placeholder="$t('page.local-data.warframe.market-riven.rankLimitPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.market-riven.imageUrl')" path="thumb">
          <NInput
            v-model:value="model.thumb"
            :placeholder="$t('page.local-data.warframe.market-riven.imageUrlPlaceholder')"
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
