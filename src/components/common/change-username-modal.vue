<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'ChangeUsernameModal'
});

/** 修改用户名表单模型接口定义 */
interface FormModel {
  // 新用户名
  newUsername: string;
  // 当前密码，用于验证身份
  password: string;
}

// 获取认证状态管理实例
const authStore = useAuthStore();

// 使用NaiveUI表单验证钩子，获取验证方法
const { formRef, validate } = useNaiveForm();

// 控制弹窗显示/隐藏
const visible = defineModel<boolean>('visible', { default: false });

// 创建响应式表单模型，初始化所有字段为空字符串
const model: FormModel = reactive({
  newUsername: '',
  password: ''
});

// 加载状态
const loading = ref(false);

// 计算属性，创建响应式的表单验证规则
// 使用computed确保语言变化时规则提示信息也会更新
const rules = computed<Record<keyof FormModel, App.Global.FormRule[]>>(() => {
  // 调用表单规则钩子获取预设的验证规则
  const { formRules } = useFormRules();

  return {
    newUsername: formRules.userName, // 新用户名验证规则
    password: formRules.pwd // 当前密码验证规则
  };
});

/**
 * 处理表单提交的异步函数
 *
 * 1. 首先执行表单验证
 * 2. 验证通过后，调用authStore的updateUsername方法提交修改用户名请求
 * 3. 成功后关闭弹窗并重置表单
 */
async function handleSubmit() {
  await validate();
  loading.value = true;
  try {
    await authStore.updateUsername(model.newUsername, model.password);
    // 修改成功后关闭弹窗
    visible.value = false;
    // 重置表单
    resetForm();
  } finally {
    loading.value = false;
  }
}

/** 重置表单 */
function resetForm() {
  model.newUsername = '';
  model.password = '';
}

/** 关闭弹窗时重置表单 */
function handleClose() {
  resetForm();
  visible.value = false;
}
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    :title="$t('common.changeUsername.title')"
    class="w-480px"
    @after-leave="resetForm"
  >
    <!-- 修改用户名表单，使用NForm组件，并设置回车键提交 -->
    <NForm ref="formRef" :model="model" size="large" :rules="rules" @keyup.enter="handleSubmit">
      <!-- 新用户名输入框 -->
      <NFormItem :label="$t('common.changeUsername.newUsername')" path="newUsername">
        <NInput v-model:value="model.newUsername" :placeholder="$t('form.userName.required')" />
      </NFormItem>
      <!-- 当前密码输入框 -->
      <NFormItem :label="$t('common.changeUsername.currentPassword')" path="password">
        <NInput
          v-model:value="model.password"
          type="password"
          show-password-on="click"
          :placeholder="$t('form.pwd.required')"
        />
      </NFormItem>
    </NForm>

    <!-- 弹窗底部按钮 -->
    <template #footer>
      <div class="flex justify-end gap-12px">
        <NButton @click="handleClose">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" :loading="loading" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </div>
    </template>
  </NModal>
</template>

<style scoped></style>
