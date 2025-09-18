<script setup lang="ts">
// 导入Vue响应式相关API
import { computed, reactive } from 'vue';
// 导入国际化翻译函数
import { $t } from '@/locales';
// 导入表单相关钩子
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// 导入认证相关store
import { useAuthStore } from '@/store/modules/auth';

// 定义组件名称为PwdLogin
defineOptions({
  name: 'PwdLogin'
});

// 获取认证store实例
const authStore = useAuthStore();
// 使用Naive UI表单钩子，获取表单引用和验证方法
const { formRef, validate } = useNaiveForm();

// 定义登录表单数据模型接口
interface FormModel {
  userName: string;
  password: string;
}

// 创建响应式表单数据模型，设置默认的管理员账号密码
const model: FormModel = reactive({
  userName: 'admin',
  password: 'admin123'
});

// 计算属性，创建响应式的表单验证规则
// 使用computed确保语言变化时规则提示信息也会更新
const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // 调用表单规则钩子获取预设的验证规则
  const { formRules } = useFormRules();

  return {
    userName: formRules.userName, // 用户名验证规则
    password: formRules.pwd // 密码验证规则
  };
});

/**
 * 处理表单提交
 *
 * 1. 首先进行表单验证
 * 2. 验证通过后调用authStore的login方法进行登录
 */
async function handleSubmit() {
  await validate();
  await authStore.login(model.userName, model.password);
}
</script>

<template>
  <!-- Naive UI表单组件，绑定模型数据、验证规则和表单引用 -->
  <!-- 设置表单大小为large，不显示标签，支持按Enter键提交 -->
  <NForm ref="formRef" :model="model" :rules="rules" size="large" :show-label="false" @keyup.enter="handleSubmit">
    <!-- 用户名输入框 -->
    <NFormItem path="userName">
      <NInput v-model:value="model.userName" :placeholder="$t('page.login.common.userNamePlaceholder')" />
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
    <!-- 表单操作区域 -->
    <NSpace vertical :size="24">
      <!-- 记住我选项 -->
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t('page.login.pwdLogin.rememberMe') }}</NCheckbox>
      </div>
      <!-- 登录按钮，显示登录加载状态 -->
      <NButton type="primary" size="large" round block :loading="authStore.loginLoading" @click="handleSubmit">
        {{ $t('common.confirm') }}
      </NButton>
    </NSpace>
  </NForm>
</template>

<style scoped>
/* 组件样式 - 目前为空，使用全局样式 */
</style>
