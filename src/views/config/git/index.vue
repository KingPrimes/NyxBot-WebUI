<script setup lang="ts">
import { computed, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';

defineOptions({ name: 'ConfigGit' });

const appStore = useAppStore();

interface FormState {
  account: string;
  token: string;
  dataSourceUrl: string;
}

// 根据移动端状态调整标签宽度
const labelWidth = computed(() => (appStore.isMobile ? 80 : 180));
const formRef = ref<FormInst | null>(null);
const formValue = ref<FormState>({
  account: '',
  token: '',
  dataSourceUrl: ''
});

const formRules = {
  account: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input']
  },
  token: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input']
  },
  dataSourceUrl: {
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

async function handleSubmit() {
  try {
    await formRef.value?.validate();
    console.log('提交表单', formValue.value);
  } catch (errors) {
    console.error('表单验证失败:', errors);
  }
}

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
          <NInput v-model:value="formValue.account" :placeholder="$t('page.config.git.form.accountPlaceholder')" />
        </NFormItem>

        <NFormItem :label="$t('page.config.git.form.token')" path="token" required>
          <NInput
            v-model:value="formValue.token"
            type="textarea"
            :placeholder="$t('page.config.git.form.tokenPlaceholder')"
            :rows="3"
          />
        </NFormItem>

        <NFormItem :label="$t('page.config.git.form.url')" path="dataSourceUrl" required>
          <NInput v-model:value="formValue.dataSourceUrl" :placeholder="$t('page.config.git.form.urlPlaceholder')" />
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

<style scoped>
:deep(.n-form-item-label) {
  @apply font-500;
}

:deep(.n-input) {
  @apply max-w-full;
}

:deep(.n-card-header) {
  @apply break-words;
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.n-form) {
    @apply w-full;
  }

  :deep(.n-space) {
    @apply w-full;
  }

  :deep(.n-button) {
    @apply w-full;
  }
}
</style>
