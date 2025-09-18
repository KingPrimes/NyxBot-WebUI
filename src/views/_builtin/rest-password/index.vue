<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

// 获取认证状态管理实例
const authStore = useAuthStore();

/** 密码重置表单模型接口定义 */
interface FormModel {
  // 当前用户的旧密码
  oldPassword: string;
  // 要设置的新密码
  newPassword: string;
  // 确认新密码，用于验证两次输入是否一致
  confirmPassword: string;
}

// 创建响应式表单模型，初始化所有字段为空字符串
const model: FormModel = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 定义组件名称为RestPassword
defineOptions({
  name: 'RestPassword'
});

// 使用NaiveUI表单验证钩子，获取验证方法
const { validate } = useNaiveForm();

/**
 * 处理表单提交的异步函数
 *
 * 1. 首先执行表单验证
 * 2. 验证通过后，调用authStore的restPassword方法提交密码重置请求
 */
async function handleSubmit() {
  await validate();
  await authStore.restPassword(model.oldPassword, model.newPassword, model.confirmPassword);
}

// 计算属性，创建响应式的表单验证规则
// 使用computed确保语言变化时规则提示信息也会更新
const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // 调用表单规则钩子获取预设的验证规则
  const { formRules } = useFormRules();

  return {
    oldPassword: formRules.pwd, // 用户名验证规则
    newPassword: formRules.pwd, // 密码验证规则
    confirmPassword: formRules.pwd // 确认密码验证规则
  };
});
</script>

<template>
  <!-- 密码重置表单，使用NForm组件，并设置回车键提交 -->
  <NForm :model="model" size="large" :rules="rules" @keyup.enter="handleSubmit">
    <!-- 旧密码输入框 -->
    <NFormItem :label="$t('common.restPassword.oldPassword')" path="oldPassword">
      <NInput v-model:value="model.oldPassword" type="password" show-password-on="click" />
    </NFormItem>
    <!-- 新密码输入框 -->
    <NFormItem :label="$t('common.restPassword.newPassword')" path="newPassword">
      <NInput v-model:value="model.newPassword" type="password" show-password-on="click" />
    </NFormItem>
    <!-- 确认新密码输入框 -->
    <NFormItem :label="$t('common.restPassword.confirmPassword')" path="confirmPassword">
      <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" />
    </NFormItem>
    <!-- 确认提交按钮，显示loading状态 -->
    <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
      {{ $t('common.confirm') }}
    </NButton>
  </NForm>
</template>

<style scoped></style>
