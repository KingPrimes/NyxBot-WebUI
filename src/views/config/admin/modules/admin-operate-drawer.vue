<script setup lang="ts">
// 导入 Vue 相关工具函数
import { computed, ref, watch } from 'vue';
// 导入 Naive UI 组件
import { NSelect } from 'naive-ui';
// 导入表单相关 hooks
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// 导入获取下拉选项数据的 API
import {
  fetchGetAllBotsFriendsOptionList,
  fetchGetAllBotsOptionList,
  fetchGetAllPermissionOptionList
} from '@/service/api/system-config-bot';
// 导入国际化翻译函数
import { $t } from '@/locales';
// 导入管理员操作相关 API
import { fetchPostBotAdmin } from '@/service/api/sytem-config-bot-admin';

// 定义组件名称
defineOptions({
  name: 'AdminOperateDrawer'
});

// 定义组件 Props 接口
interface Props {
  /** 操作类型（add/edit/push） */
  operateType: NaiveUI.TableOperateType;
  /** 编辑行数据 */
  rowData?: Api.SystemConfig.AdminModel | null;
}

// 接收组件 Props
const props = defineProps<Props>();

// 定义组件 Emits 接口
interface Emits {
  (e: 'submitted'): void;
}

// 定义组件 Emits
const emit = defineEmits<Emits>();

// 定义双向绑定的可见性状态
const visible = defineModel<boolean>('visible', {
  default: false
});

// 使用表单 hooks
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

// 计算组件标题，根据操作类型动态显示
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.config.admin.addAdmin'), // 添加管理员
    edit: $t('page.config.admin.editAdmin'), // 编辑管理员
    push: $t('common.push') // 推送
  };
  return titles[props.operateType];
});

// 定义表单数据模型类型
type Model = Pick<Api.SystemConfig.AdminModel, 'botUid' | 'adminUid' | 'permissions'>;

// 初始化表单数据
const model = ref(createDefaultModel());

/**
 * 创建默认表单模型
 *
 * @returns 默认的管理员表单数据
 */
function createDefaultModel(): Model {
  return {
    botUid: '', // 机器人 UID
    adminUid: '', // 管理员 UID
    permissions: '' // 权限角色
  };
}

// 定义表单验证规则键类型
type RuleKey = Extract<keyof Model, 'botUid' | 'adminUid' | 'permissions'>;

// 定义表单验证规则
const rules: Record<RuleKey, App.Global.FormRule> = {
  botUid: defaultRequiredRule, // 机器人账号为必填项
  adminUid: defaultRequiredRule, // 管理员账号为必填项
  permissions: defaultRequiredRule // 权限角色为必填项
};

// 管理员账号下拉选项
const adminAccountOptions = ref<CommonType.Option<string>[]>([]);

// 机器人账号下拉选项
const botAccountOptions = ref<CommonType.Option<string>[]>([]);

// 权限角色下拉选项
const permissionOptions = ref<CommonType.Option<string>[]>([]);

/**
 * 获取指定机器人的好友列表作为管理员选项
 *
 * @param botUid 机器人 UID
 */
async function getAdminAccountOptions(botUid: string) {
  const { error, data } = await fetchGetAllBotsFriendsOptionList(botUid);
  if (!error) {
    adminAccountOptions.value = data.map(item => ({
      label: item.label, // 显示文本
      value: item.value // 实际值
    }));
  }
}

/** 获取所有机器人账号列表 */
async function getBotAccountOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botAccountOptions.value = data.map(item => ({
      label: item.label, // 显示文本
      value: item.value // 实际值
    }));
  }
}

/** 获取所有权限角色列表 */
async function getPermissionOptions() {
  const { error, data } = await fetchGetAllPermissionOptionList();

  if (!error) {
    permissionOptions.value = data.map(item => ({
      label: item.label, // 显示文本
      value: item.value // 实际值
    }));
  }
}

/** 初始化表单模型数据 如果是编辑操作，则填充现有数据 */
function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

/** 关闭抽屉 */
function closeDrawer() {
  visible.value = false;
}

/**
 * 提交表单数据
 *
 * 1. 执行表单验证
 * 2. 调用 API 提交数据
 * 3. 根据结果显示提示信息并关闭抽屉
 */
async function handleSubmit() {
  await validate();
  await fetchPostBotAdmin(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted'); // 触发提交成功事件
      closeDrawer(); // 关闭抽屉
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

// 监听机器人 UID 变化，动态加载对应机器人的好友列表
watch(
  () => model.value.botUid,
  async newVal => {
    if (newVal && visible.value) {
      await getAdminAccountOptions(newVal);
    }
  }
);

// 监听抽屉可见性变化
watch(visible, () => {
  if (visible.value) {
    handleInitModel(); // 初始化表单数据
    restoreValidation(); // 重置表单验证状态
    getPermissionOptions(); // 获取权限角色列表
    getBotAccountOptions(); // 获取机器人账号列表
  }
});
</script>

<template>
  <!-- 抽屉组件，支持双向绑定可见性状态 -->
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <!-- 表单组件，绑定模型和验证规则 -->
      <NForm ref="formRef" :model="model" :rules="rules">
        <!-- 机器人账号选择框 -->
        <NFormItem :label="$t('page.config.admin.botAccount')" path="botUid">
          <NSelect v-model:value="model.botUid" :options="botAccountOptions" />
        </NFormItem>
        <!-- 管理员账号选择框 - 支持手动输入 -->
        <NFormItem :label="$t('page.config.admin.adminAccount')" path="adminUid">
          <NSelect
            v-model:value="model.adminUid"
            :options="adminAccountOptions"
            filterable
            :tag="adminAccountOptions.length === 0"
            placeholder="{{ $t('page.config.admin.inputAdminQQ') || $t('page.config.admin.optionsOrinput') }}"
          />
        </NFormItem>
        <!-- 权限角色选择框 -->
        <NFormItem :label="$t('page.config.admin.roles.roleName')" path="permissions">
          <NSelect v-model:value="model.permissions" :options="permissionOptions" />
        </NFormItem>
      </NForm>
      <!-- 抽屉底部操作按钮 -->
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
