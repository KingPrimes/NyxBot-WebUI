<script setup lang="ts">
// 导入Vue响应式相关API
import { computed, reactive } from 'vue';
// 导入国际化翻译函数
import { $t } from '@/locales';
// 导入路由相关钩子
import { useRouterPush } from '@/hooks/common/router';
// 导入表单相关钩子
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// 导入验证码相关钩子
import { useCaptcha } from '@/hooks/business/captcha';

// 定义组件名称为Register
defineOptions({
  name: 'Register'
});

// 获取路由切换方法，用于返回登录页
const { toggleLoginModule } = useRouterPush();
// 使用Naive UI表单钩子，获取表单引用和验证方法
const { formRef, validate } = useNaiveForm();
// 使用验证码钩子，获取验证码相关状态和方法
const { label, isCounting, loading, getCaptcha } = useCaptcha();

// 定义注册表单数据模型接口
interface FormModel {
  phone: string;
  code: string;
  password: string;
  confirmPassword: string;
}

// 创建响应式表单数据模型
const model: FormModel = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
});

// 计算属性，创建响应式的表单验证规则
const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  const { formRules, createConfirmPwdRule } = useFormRules();

  return {
    phone: formRules.phone, // 手机号验证规则
    code: formRules.code, // 验证码验证规则
    password: formRules.pwd, // 密码验证规则
    confirmPassword: createConfirmPwdRule(model.password) // 确认密码验证规则，与密码保持一致
  };
});

/**
 * 处理注册表单提交
 *
 * 1. 首先进行表单验证
 * 2. 验证通过后执行注册请求逻辑 注意：目前只实现了表单验证和成功提示，实际注册请求未实现
 */
async function handleSubmit() {
  await validate();
  // request to register
  window.$message?.success($t('page.login.common.validateSuccess'));
}
</script>

<template>
  <!-- Naive UI表单组件，绑定模型数据、验证规则和表单引用 -->
  <!-- 设置表单大小为large，不显示标签，支持按Enter键提交 -->
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <!-- 手机号输入框 -->
    <NFormItem path="phone">
      <NInput v-model:value="model.phone" :placeholder="$t('page.login.common.phonePlaceholder')" />
    </NFormItem>
    <!-- 验证码输入框和获取验证码按钮 -->
    <NFormItem path="code">
      <div class="w-full flex-y-center gap-16px">
        <NInput v-model:value="model.code" :placeholder="$t('page.login.common.codePlaceholder')" />
        <NButton size="large" :disabled="isCounting" :loading="loading" @click="getCaptcha(model.phone)">
          {{ label }}
        </NButton>
      </div>
    </NFormItem>
    <!-- 密码输入框，支持点击显示密码 -->
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <!-- 确认密码输入框，支持点击显示密码 -->
    <NFormItem path="confirmPassword">
      <NInput
        v-model:value="model.confirmPassword"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.confirmPasswordPlaceholder')"
      />
    </NFormItem>
    <!-- 表单操作按钮 -->
    <NSpace vertical :size="18" class="w-full">
      <!-- 注册确认按钮 -->
      <NButton type="primary" size="large" round block @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
      <!-- 返回登录页面按钮 -->
      <NButton size="large" round block @click="toggleLoginModule('pwd-login')">
        {{ $t('page.login.common.back') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped>
/* 组件样式 - 目前为空，使用全局样式 */
</style>
