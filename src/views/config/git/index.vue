<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { fetchGetGitUserPriovider, fetchPostGitUserPriovider } from '@/service/api/system-config';

defineOptions({ name: 'ConfigGit' });

const appStore = useAppStore();

// 根据移动端状态调整标签宽度
const labelWidth = computed(() => (appStore.isMobile ? 80 : 180));
const formRef = ref<FormInst | null>(null);
const formValue = ref<Api.SystemConfig.GitHubUserProvider>({
  id: 0,
  userName: '',
  passWord: '',
  gitUrl: ''
});

const formRules = {
  userName: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input']
  },
  passWord: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input']
  },
  gitUrl: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input'],
    validator: (_: any, value: string) => {
      if (!value.startsWith('https://github.com/')) {
        return new Error($t('common.from.urlError'));
      }
      return true;
    }
  }
};
// 提交数据
async function handleSubmit() {
  await formRef.value?.validate();
  await fetchPostGitUserPriovider(formValue.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      onLoad();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}
async function onLoad() {
  const response = await fetchGetGitUserPriovider();
  if (response && response.data) {
    formValue.value = { ...response.data };
  }
}
// 初始化数据
onMounted(async () => onLoad());
function handleCancel() {
  formRef.value?.restoreValidation();
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :title="$t('page.config.git.title')" :bordered="false" size="small" segmented class="card-wrapper">
      <NForm
        ref="formRef"
        :model="formValue"
        :rules="formRules"
        :label-width="labelWidth"
        :label-placement="appStore.isMobile ? 'top' : 'left'"
        require-mark-placement="right-hanging"
      >
        <NFormItem :label="$t('page.config.git.form.account')" path="account" required>
          <NInput v-model:value="formValue.userName" :placeholder="$t('page.config.git.form.accountPlaceholder')" />
        </NFormItem>

        <NFormItem :label="$t('page.config.git.form.token')" path="token" required>
          <NInput
            v-model:value="formValue.passWord"
            type="textarea"
            :placeholder="$t('page.config.git.form.tokenPlaceholder')"
            :rows="3"
          />
        </NFormItem>

        <NFormItem :label="$t('page.config.git.form.url')" path="dataSourceUrl" required>
          <NInput v-model:value="formValue.gitUrl" :placeholder="$t('page.config.git.form.urlPlaceholder')" />
        </NFormItem>

        <div class="mt-6 flex justify-end">
          <NSpace :size="16">
            <NButton type="primary" :block="appStore.isMobile" @click="handleSubmit">
              {{ $t('common.confirm') }}
            </NButton>
            <NButton :block="appStore.isMobile" @click="handleCancel">
              {{ $t('common.cancel') }}
            </NButton>
          </NSpace>
        </div>
      </NForm>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
