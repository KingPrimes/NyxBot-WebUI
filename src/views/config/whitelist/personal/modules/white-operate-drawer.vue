<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { fetchGetAllAdminOptionList, fetchGetAllBotOptionList } from '@/service/api/system-config';
import { $t } from '@/locales';
import { fetchGetAllBotsOptionList } from '@/service/api/system-config-bot';
import { fetchSaveWhiteProve } from '@/service/api/system-config-bot-white';

defineOptions({
  name: 'WhiteOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemConfig.WhitelistProve | null;
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
    add: $t('page.config.whitelist.personal.addWhitelistPersonal'),
    edit: $t('page.config.whitelist.personal.editWhitelistPersonal'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});
type Model = Pick<Api.SystemConfig.WhitelistProve, 'proveUid' | 'botUid'>;
const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    botUid: '',
    proveUid: 0
  };
}

type RuleKey = Extract<keyof Model, 'proveUid' | 'botUid'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  proveUid: {
    required: true,
    validator: (_, value: number) => {
      const qqRegex = /^[1-9]\d{4,10}$/;
      if (!qqRegex.test(String(value))) {
        return new Error($t('form.qq.invalid'));
      }
      return true;
    }
  },
  botUid: defaultRequiredRule
};
const onlyAllowNumber = (value: string) => /^\d+$/.test(value);
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
  await fetchSaveWhiteProve(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted');
      closeDrawer();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}
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
        <NFormItem :label="$t('page.config.whitelist.personal.personalAccount')" path="proveUid">
          <NInputNumber
            v-model:value="model.proveUid"
            :show-button="false"
            :allow-input="onlyAllowNumber"
            @keydown.prevent.arrow-up
            @keydown.prevent.arrow-down
            @keydown.prevent.page-up
            @keydown.prevent.page-down
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
