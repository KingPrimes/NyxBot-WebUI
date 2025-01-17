<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { fetchGetAllAdminOptionList, fetchGetAllBotOptionList } from '@/service/api/system-config';
import { $t } from '@/locales';
import { fetchGetAllBotsFriendsOptionList, fetchGetAllBotsOptionList } from '@/service/api/system-config-bot';
import { fetchSaveBlackProve } from '@/service/api/system-config-bot-black';

defineOptions({
  name: 'BlackOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemConfig.BlacklistProve | null;
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
    add: $t('page.config.blacklist.personal.addBlacklistPersonal'),
    edit: $t('page.config.blacklist.personal.editBlacklistPersonal'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.SystemConfig.BlacklistProve, 'proveUid' | 'botUid'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    botUid: '',
    proveUid: ''
  };
}

type RuleKey = Extract<keyof Model, 'proveUid' | 'botUid'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  proveUid: defaultRequiredRule,
  botUid: defaultRequiredRule
};

const proveOptions = ref<CommonType.Option<string>[]>([]);
const botOptions = ref<CommonType.Option<string>[]>([]);
async function getBotOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

async function getProveOptions(botUid: string) {
  const { error, data } = await fetchGetAllBotsFriendsOptionList(botUid);

  if (!error) {
    proveOptions.value = data.map(item => ({
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
  await fetchSaveBlackProve(model.value).then(res => {
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
    if (newVal && visible.value) {
      await getProveOptions(newVal);
    }
  }
);
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getBotOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.config.admin.botAccount')" path="botUid">
          <NSelect v-model:value="model.botUid" :options="botOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.blacklist.personal.personalAccount')" path="proveUid">
          <NSelect v-model:value="model.proveUid" :options="proveOptions" />
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
