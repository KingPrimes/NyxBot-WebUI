<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import {
  fetchGetAllBotsFriendsOptionList,
  fetchGetAllBotsOptionList,
  fetchGetAllPermissionOptionList,
  fetchPostBotAdmin
} from '@/service/api/system-config-bot';
import { $t } from '@/locales';

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
    edit: $t('page.config.admin.editAdmin'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.SystemConfig.AdminModel, 'botUid' | 'adminUid' | 'permissions'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    botUid: '',
    adminUid: '',
    permissions: ''
  };
}

type RuleKey = Extract<keyof Model, 'botUid' | 'adminUid' | 'permissions'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  botUid: defaultRequiredRule,
  adminUid: defaultRequiredRule,
  permissions: defaultRequiredRule
};

const adminAccountOptions = ref<CommonType.Option<string>[]>([]);

const botAccountOptions = ref<CommonType.Option<string>[]>([]);

const permissionOptions = ref<CommonType.Option<string>[]>([]);

async function getAdminAccountOptions(botUid: string) {
  const { error, data } = await fetchGetAllBotsFriendsOptionList(botUid);
  if (!error) {
    adminAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

async function getBotAccountOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

async function getPermissionOptions() {
  const { error, data } = await fetchGetAllPermissionOptionList();

  if (!error) {
    permissionOptions.value = data.map(item => ({
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
  await fetchPostBotAdmin(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted');
      closeDrawer();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

watch(
  () => model.value.botUid,
  async newVal => {
    if (newVal) {
      await getAdminAccountOptions(newVal);
    }
  }
);

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getPermissionOptions();
    getBotAccountOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.config.admin.botAccount')" path="botUid">
          <NSelect v-model:value="model.botUid" :options="botAccountOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.admin.adminAccount')" path="adminUid">
          <NSelect v-model:value="model.adminUid" :options="adminAccountOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.admin.roles.roleName')" path="permissions">
          <NSelect v-model:value="model.permissions" :options="permissionOptions" />
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
