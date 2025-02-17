<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput, NSpace, NSwitch } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { fetchGetLoadingConfig, fetchPostLoadingConfig } from '@/service/api/system-config';

defineOptions({ name: 'ConfigService' });

const appStore = useAppStore();

// 根据移动端状态调整标签宽度
const labelWidth = computed(() => (appStore.isMobile ? 80 : 180));
const formRef = ref<FormInst | null>(null);
const formValue = ref<Api.SystemConfig.LoadingConfig>({
  serverPort: 8080,
  isServerOrClient: true,
  wsClientUrl: 'ws://localhost:3001', // 默认客户端URL
  wsServerUrl: '/ws/shiro', // 默认服务端URL
  token: ''
});

// 计算显示的服务类型文本
const serviceTypeText = computed(() =>
  $t(`page.config.service.form.${!formValue.value.isServerOrClient ? 'client' : 'server'}`)
);
const serviceText = computed(() =>
  $t(`page.config.service.form.${formValue.value.isServerOrClient ? 'client' : 'server'}`)
);
const serviceUrlPlaceholder = computed(() =>
  $t('page.config.service.form.urlPlaceholder', { type: serviceText.value })
);

const serverurlPattern = /^\/([A-z]+)\/?([A-z]+)?/;
const clientUrlPattern = /^(ws|wss):\/\/[\w.-]+(:\d+)?(\/([\w/_.-]*(\?\S+)?)?)?$/;

const formRules = {
  serverPort: [
    { pattern: /^[0-9]+$/, message: '端口必须是数字', trigger: 'blur' },
    {
      validator: (_rule: any, value: number) => value > 1 && value <= 65535,
      message: '端口必须在1到65535之间',
      trigger: 'blur'
    }
  ],
  wsServerUrl: [
    { required: true, message: '服务端URL不能为空', trigger: 'blur' },
    { pattern: serverurlPattern, message: '服务端URL格式不正确', trigger: 'blur' }
  ],
  wsClientUrl: [
    { required: true, message: '客户端URL不能为空', trigger: 'blur' },
    { pattern: clientUrlPattern, message: '客户端URL格式不正确', trigger: 'blur' }
  ]
};

// 处理服务类型切换
function handleServiceTypeChange(value: boolean) {
  formValue.value.isServerOrClient = value;
  if (!value) {
    // 切换到服务端时的默认URL
    formValue.value.wsServerUrl = '/ws/shiro';
  } else {
    // 切换到客户端时的默认URL
    formValue.value.wsClientUrl = 'ws://localhost:3001';
  }
}

async function handleSubmit() {
  await formRef.value?.validate();
  await fetchPostLoadingConfig(formValue.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      onLoad();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

async function onLoad() {
  const response = await fetchGetLoadingConfig();
  if (response && response.data) {
    formValue.value = { ...response.data };
  }
}
onMounted(async () => onLoad());

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
        <NFormItem :label="$t('page.config.service.form.port')" path="serverPort" required>
          <NInputNumber
            v-model:value="formValue.serverPort"
            :placeholder="$t('page.config.service.form.portPlaceholder')"
          />
        </NFormItem>

        <NFormItem :label="$t('page.config.service.form.switchTo', { type: serviceText })" path="isServerOrClient">
          <NSwitch v-model:value="formValue.isServerOrClient" @update:value="handleServiceTypeChange" />
        </NFormItem>

        <NFormItem v-if="!formValue.isServerOrClient" :label="`${serviceTypeText}URL`" path="wsClientUrl" required>
          <NInput v-model:value="formValue.wsClientUrl" :placeholder="serviceUrlPlaceholder" />
        </NFormItem>

        <NFormItem v-if="formValue.isServerOrClient" :label="`${serviceTypeText}URL`" path="wsServerUrl" required>
          <NInput v-model:value="formValue.wsServerUrl" :placeholder="serviceUrlPlaceholder" />
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
