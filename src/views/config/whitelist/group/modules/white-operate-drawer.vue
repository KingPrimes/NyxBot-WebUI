<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { fetchGetAllAdminOptionList, fetchGetAllBotOptionList } from '@/service/api/system-config';
import { $t } from '@/locales';

defineOptions({
  name: 'WhiteOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
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
    add: $t('page.config.whitelist.group.addWhitelistGroup'),
    edit: $t('page.config.whitelist.group.editWhitelistGroup'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.SystemConfig.WhitelistGroup, 'groupAccount'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    groupAccount: ''
  };
}

type RuleKey = Extract<keyof Model, 'groupAccount'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  groupAccount: defaultRequiredRule
};

const groupAccountOptions = ref<CommonType.Option<string>[]>([]);

async function getGroupAccountOptions() {
  /* const { error, data } = await fetchGetAllBotOptionList();

  if (!error) {
    groupAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  } */
  /* const userAdminOptions = model.value.adminAccount.map(item => ({
    label: item,
    value: item
  })); */
}

function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit') {
    Object.assign(model.value);
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
    getGroupAccountOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.config.whitelist.group.groupAccount')" path="groupAccount">
          <NSelect v-model:value="model.groupAccount" :options="groupAccountOptions" />
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
