<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput, NSpace, NSwitch } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';

defineOptions({ name: 'ConfigService' });

const appStore = useAppStore();

interface FormState {
  port: string;
  enableProxy: boolean;
  serviceUrl: string;
}

// 根据移动端状态调整标签宽度
const labelWidth = computed(() => (appStore.isMobile ? 80 : 180));
const formRef = ref<FormInst | null>(null);
const formValue = ref<FormState>({
  port: '8080',
  enableProxy: false, // 默认为服务端模式
  serviceUrl: '/ws/shiro' // 默认服务端URL
});

// 计算显示的服务类型文本
const serviceTypeText = computed(() =>
  $t(`page.config.service.form.${formValue.value.enableProxy ? 'client' : 'server'}`)
);
const serviceUrlPlaceholder = computed(() =>
  $t('page.config.service.form.urlPlaceholder', { type: serviceTypeText.value })
);

const formRules = {
  port: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input'],
    validator: (_: any, value: string) => {
      const port = Number(value);
      if (Number.isNaN(port) || port < 1 || port > 65535) {
        return new Error($t('config.service.form.portError'));
      }
      return true;
    }
  },
  serviceUrl: {
    required: true,
    message: $t('form.required'),
    trigger: ['blur', 'input']
  }
};

// 处理服务类型切换
function handleServiceTypeChange(value: boolean) {
  formValue.value.enableProxy = value;
  if (!value) {
    // 切换到服务端时的默认URL
    formValue.value.serviceUrl = '/ws/shiro';
  } else {
    // 切换到客户端时的默认URL
    formValue.value.serviceUrl = 'ws://localhost:3001';
  }
}

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
    <NCard :title="$t('page.config.service.title')" :bordered="false" size="small" segmented class="card-wrapper">
      <div class="mb-4 text-red">{{ $t('page.config.service.restartTip') }}</div>
      <NForm
        ref="formRef"
        :model="formValue"
        :rules="formRules"
        :label-width="labelWidth"
        :label-placement="appStore.isMobile ? 'top' : 'left'"
        require-mark-placement="right-hanging"
      >
        <NFormItem :label="$t('page.config.service.form.port')" path="port" required>
          <NInput v-model:value="formValue.port" :placeholder="$t('page.config.service.form.portPlaceholder')" />
        </NFormItem>

        <NFormItem :label="$t('page.config.service.form.switchTo', { type: serviceTypeText })" path="enableProxy">
          <NSwitch v-model:value="formValue.enableProxy" @update:value="handleServiceTypeChange" />
        </NFormItem>

        <NFormItem :label="`${serviceTypeText}URL`" path="serviceUrl" required>
          <NInput v-model:value="formValue.serviceUrl" :placeholder="serviceUrlPlaceholder" />
        </NFormItem>

        <div class="mt-4 flex justify-end gap-4" :class="{ 'flex-col w-full': appStore.isMobile }">
          <NButton :block="appStore.isMobile" type="primary" @click="handleSubmit">
            {{ $t('common.confirm') }}
          </NButton>
          <NButton :block="appStore.isMobile" @click="handleCancel">{{ $t('common.cancel') }}</NButton>
        </div>
      </NForm>
    </NCard>
  </NSpace>
</template>

<style scoped>
.card-wrapper {
  padding: 16px 20px;
}

/* 移动端适配 */
@media (max-width: 640px) {
  :deep(.n-form) {
    width: 100%;
  }

  :deep(.n-space) {
    width: 100%;
  }

  :deep(.n-button) {
    width: 100%;
  }
}
</style>
