<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NDatePicker } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { RivenTrendType } from '@/enum';

defineOptions({
  name: 'RivenOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.RivenTrend | null;
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
    add: $t('page.local-data.warframe.riven-trend.addRiven'),
    edit: $t('page.local-data.warframe.riven-trend.editRiven')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.LocalData.RivenTrend,
  'trend_name' | 'new_dot' | 'new_num' | 'old_dot' | 'old_num' | 'type' | 'isDate'
>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    trend_name: '',
    new_dot: '',
    new_num: 0.5,
    old_dot: '',
    old_num: 0.5,
    type: '',
    isDate: new Date()
  };
}

type RuleKey = Extract<keyof Model, 'trend_name' | 'new_dot' | 'new_num' | 'old_dot' | 'old_num' | 'type' | 'isDate'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  trend_name: defaultRequiredRule,
  new_dot: defaultRequiredRule,
  new_num: defaultRequiredRule,
  old_dot: defaultRequiredRule,
  old_num: defaultRequiredRule,
  type: defaultRequiredRule,
  isDate: defaultRequiredRule
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
watch(
  () => model.value.new_num,
  val => {
    if (val < 0.7) {
      model.value.new_dot = '●○○○○';
    } else if (val >= 0.7 && val < 0.9) {
      model.value.new_dot = '●●○○○';
    } else if (val >= 0.9 && val < 1.15) {
      model.value.new_dot = '●●●○○';
    } else if (val >= 1.15 && val < 1.3) {
      model.value.new_dot = '●●●●○';
    } else if (val >= 1.3) {
      model.value.new_dot = '●●●●●';
    }
  }
);
watch(
  () => model.value.old_num,
  val => {
    if (val < 0.7) {
      model.value.old_dot = '●○○○○';
    } else if (val >= 0.7 && val < 0.9) {
      model.value.old_dot = '●●○○○';
    } else if (val >= 0.9 && val < 1.15) {
      model.value.old_dot = '●●●○○';
    } else if (val >= 1.15 && val < 1.3) {
      model.value.old_dot = '●●●●○';
    } else if (val >= 1.3) {
      model.value.old_dot = '●●●●●';
    }
  }
);
const options = computed(() => {
  return Object.keys(RivenTrendType).map(key => ({
    label: RivenTrendType[key as keyof typeof RivenTrendType],
    value: key
  }));
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.itemEnName')" path="trend_name">
          <NInput
            v-model:value="model.trend_name"
            :placeholder="$t('page.local-data.warframe.riven-trend.itemEnNamePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.newDisposition')" path="new_dot">
          <NInput
            v-model:value="model.new_dot"
            :placeholder="$t('page.local-data.warframe.riven-trend.newDispositionPlaceholder')"
            :readonly="true"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.newDisposition')" path="new_num">
          <NInputNumber
            v-model:value="model.new_num"
            :placeholder="$t('page.local-data.warframe.riven-trend.newDispositionPlaceholder')"
            :step="0.01"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.oldDisposition')" path="old_dot">
          <NInput
            v-model:value="model.old_dot"
            :placeholder="$t('page.local-data.warframe.riven-trend.oldDispositionPlaceholder')"
            :readonly="true"
          />
        </NFormItem>

        <NFormItem :label="$t('page.local-data.warframe.riven-trend.oldDisposition')" path="old_num">
          <NInputNumber
            v-model:value="model.old_num"
            :placeholder="$t('page.local-data.warframe.riven-trend.oldDispositionPlaceholder')"
            :step="0.01"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.weaponType')" path="type">
          <NSelect
            v-model:value="model.type"
            :options="options"
            :placeholder="$t('page.local-data.warframe.riven-trend.weaponTypePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-trend.updateTime')" path="isDate">
          <NDatePicker
            v-model:value="model.isDate"
            :placeholder="$t('page.local-data.warframe.riven-trend.updateTime')"
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
