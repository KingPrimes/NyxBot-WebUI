<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NFormItem } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchPostPushTranslation, fetchPostSaveTranslation } from '@/service/api/local-data';
import PushCommits from '@/components/custom/push-commits.vue';

defineOptions({
  name: 'TranslationOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.LocalData.Translation | null;
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
    add: $t('page.local-data.warframe.translation.addTranslation'),
    edit: $t('page.local-data.warframe.translation.editTranslation'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.LocalData.Translation, 'id' | 'en' | 'cn' | 'is_prime' | 'is_set'>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    en: '',
    cn: '',
    is_prime: false,
    is_set: false
  };
}

type RuleKey = Extract<keyof Model, 'en' | 'cn' | 'is_prime' | 'is_set'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  en: defaultRequiredRule,
  cn: defaultRequiredRule,
  is_prime: defaultRequiredRule,
  is_set: defaultRequiredRule
};

const pushCommitModel = ref({ commit: '' });
const pushCommitsRef = ref<InstanceType<typeof PushCommits> | null>(null);

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
  if (props.operateType !== 'push') {
    await fetchPostSaveTranslation(model.value).then(res => {
      if (Number(res.response.data.code) === 200) {
        window.$message?.success(res.response.data.msg);
      } else {
        window.$message?.error(res.response.data.msg);
      }
    });
  } else {
    if (pushCommitsRef.value) {
      await pushCommitsRef.value.validateForm();
    }
    await fetchPostPushTranslation(pushCommitModel.value).then(res => {
      if (Number(res.response.data.code) === 200) {
        window.$message?.success(res.response.data.msg);
      } else {
        window.$message?.error(res.response.data.msg);
      }
    });
  }

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
      <NForm v-if="operateType !== 'push'" ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.translation.english')" path="en">
          <NInput
            v-model:value="model.en"
            :placeholder="$t('page.local-data.warframe.translation.englishPlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.translation.chinese')" path="cn">
          <NInput
            v-model:value="model.cn"
            :placeholder="$t('page.local-data.warframe.translation.chinesePlaceholder')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.translation.isPrime')" path="is_prime">
          <NRadioGroup v-model:value="model.is_prime">
            <NRadio label="否" :value="false" />
            <NRadio label="是" :value="true" />
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.translation.isSet')" path="is_set">
          <NRadioGroup v-model:value="model.is_set">
            <NRadio label="否" :value="false" />
            <NRadio label="是" :value="true" />
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <PushCommits v-else ref="pushCommitsRef" v-model="pushCommitModel"></PushCommits>
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
