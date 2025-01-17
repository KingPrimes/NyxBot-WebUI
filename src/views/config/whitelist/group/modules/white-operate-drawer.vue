<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { fetchGetAllAdminOptionList, fetchGetAllBotOptionList } from '@/service/api/system-config';
import { $t } from '@/locales';
import { fetchGetAllBotsOptionList, fetchGetAllGroupOptionList } from '@/service/api/system-config-bot';
import { fetchSaveWhiteGroup } from '@/service/api/system-config-bot-white';

defineOptions({
  name: 'WhiteOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemConfig.WhitelistGroup | null;
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
type Model = Pick<Api.SystemConfig.WhitelistGroup, 'groupUid' | 'botUid'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    botUid: '',
    groupUid: ''
  };
}

type RuleKey = Extract<keyof Model, 'groupUid' | 'botUid'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  botUid: defaultRequiredRule,
  groupUid: defaultRequiredRule
};

const groupOptions = ref<CommonType.Option<string>[]>([]);
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

async function getGroupOptions(bot: string) {
  const { error, data } = await fetchGetAllGroupOptionList(bot);
  if (!error) {
    groupOptions.value = data.map(item => ({
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
  await fetchSaveWhiteGroup(model.value).then(res => {
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
      await getGroupOptions(newVal);
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
        <NFormItem :label="$t('page.config.whitelist.group.groupAccount')" path="groupUid">
          <NSelect v-model:value="model.groupUid" :options="groupOptions" />
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
