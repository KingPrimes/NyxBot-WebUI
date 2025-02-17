<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { NButton, NCard, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { fetchGetTokenKeys, fetchPostTokenKeys } from '@/service/api/system-config';

defineOptions({ name: 'ConfigToken' });

const appStore = useAppStore();

// 根据移动端状态调整标签宽度
const labelWidth = computed(() => (appStore.isMobile ? 80 : 180));
const formRef = ref<FormInst | null>(null);
const formValue = ref<Api.SystemConfig.TokenKeys>({
  id: 1,
  tks: ''
});

async function handleSubmit() {
  await formRef.value?.validate();
  await fetchPostTokenKeys(formValue.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      onLoad();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

async function onLoad() {
  const response = await fetchGetTokenKeys();
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
    <NCard :title="$t('page.config.token.title')" :bordered="false" size="small" segmented class="card-wrapper">
      <NForm
        ref="formRef"
        :model="formValue"
        :label-width="labelWidth"
        :label-placement="appStore.isMobile ? 'top' : 'left'"
        require-mark-placement="right-hanging"
      >
        <NFormItem :label="$t('page.config.token.token')" path="serverPort" required>
          <NInput v-model:value="formValue.tks" :placeholder="$t('page.config.token.placeholder')" />
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
