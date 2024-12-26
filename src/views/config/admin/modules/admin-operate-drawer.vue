<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchGetAllAdminOptionList, fetchGetAllBotOptionList } from '@/service/api/system-config';
import { $t } from '@/locales';
import { adminRoleOptions } from '@/constants/admin';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'AdminOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemConfig.AdminModel | null;
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
    add: $t('page.config.admin.addAdmin'),
    edit: $t('page.config.admin.editAdmin')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.SystemConfig.AdminModel, 'botAccount' | 'adminAccount' | 'role'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    botAccount: '',
    adminAccount: '',
    role: null
  };
}

type RuleKey = Extract<keyof Model, 'botAccount' | 'adminAccount' | 'role'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  botAccount: defaultRequiredRule,
  adminAccount: defaultRequiredRule,
  role: defaultRequiredRule
};

const adminAccountOptions = ref<CommonType.Option<string>[]>([]);

async function getAdminAccountOptions() {
  const { error, data } = await fetchGetAllAdminOptionList();

  if (!error) {
    adminAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }

  /* const userAdminOptions = model.value.adminAccount.map(item => ({
    label: item,
    value: item
  })); */
}

const botAccountOptions = ref<CommonType.Option<string>[]>([]);

async function getBotAccountOptions() {
  const { error, data } = await fetchGetAllBotOptionList();

  if (!error) {
    botAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

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
    getAdminAccountOptions();
    getBotAccountOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.config.admin.botAccount')" path="botAccount">
          <NSelect v-model:value="model.botAccount" :options="botAccountOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.admin.adminAccount')" path="adminAccount">
          <NSelect v-model:value="model.adminAccount" :options="adminAccountOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.admin.role.roleName')" path="role">
          <NSelect v-model:value="model.role" :options="translateOptions(adminRoleOptions)" />
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
