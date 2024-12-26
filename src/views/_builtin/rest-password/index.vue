<script setup lang="ts">
import { reactive } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
const authStore = useAuthStore();
interface FormModel {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const model: FormModel = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

defineOptions({
  name: 'RestPassword'
});

const { validate } = useNaiveForm();

async function handleSubmit() {
  await validate();
  await authStore.restPassword(model.oldPassword, model.newPassword, model.confirmPassword);
}
</script>

<template>
  <NForm :model="model" size="large" @keyup.enter="handleSubmit">
    <NFormItem :label="$t('common.restPassword.oldPassword')" path="oldPassword">
      <NInput v-model:value="model.oldPassword" type="password" show-password-on="click" />
    </NFormItem>
    <NFormItem :label="$t('common.restPassword.newPassword')" path="newPassword">
      <NInput v-model:value="model.newPassword" type="password" show-password-on="click" />
    </NFormItem>
    <NFormItem :label="$t('common.restPassword.confirmPassword')" path="confirmPassword">
      <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" />
    </NFormItem>
    <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
      {{ $t('common.confirm') }}
    </NButton>
  </NForm>
</template>

<style scoped></style>
