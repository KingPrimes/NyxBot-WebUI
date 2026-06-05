<script setup lang="ts">
// 导入Vue相关工具函数
import { computed, ref, watch } from 'vue';
// 导入Naive UI组件
import { NSelect } from 'naive-ui';
// 导入表单相关hooks
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// 导入国际化翻译函数
import { $t } from '@/locales';
// 导入获取机器人和群组选项列表的API
import { fetchGetAllBotsOptionList, fetchGetAllGroupOptionList } from '@/service/api/system-config-bot';
// 导入保存黑名单群组的API
import { fetchSaveBlackGroup } from '@/service/api/system-config-bot-black';

// 定义组件名称
defineOptions({
  name: 'BlackOperateDrawer'
});

// 定义组件Props接口
interface Props {
  /** 操作类型（add/edit/push） */
  operateType: NaiveUI.TableOperateType;
  /** 编辑行数据 */
  rowData?: Api.SystemConfig.BlacklistGroup | null;
}

// 接收组件Props
const props = defineProps<Props>();

// 定义组件Emits接口
interface Emits {
  (e: 'submitted'): void;
}

// 定义组件Emits
const emit = defineEmits<Emits>();

// 定义双向绑定的可见性状态
const visible = defineModel<boolean>('visible', {
  default: false
});

// 使用表单hooks获取表单引用和验证方法
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

// 计算组件标题，根据操作类型动态显示
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.config.blacklist.group.addBlacklistGroup'), // 添加黑名单群组
    edit: $t('page.config.blacklist.group.editBlacklistGroup'), // 编辑黑名单群组
    push: $t('common.push') // 推送
  };
  return titles[props.operateType];
});

// 定义表单数据模型类型
// 从Api.SystemConfig.BlacklistGroup中提取需要的字段
type Model = Pick<Api.SystemConfig.BlacklistGroup, 'groupUid' | 'botUid'>;

// 初始化表单数据
const model = ref(createDefaultModel());

/**
 * 创建默认表单模型
 *
 * @returns 默认的黑名单群组表单数据
 */
function createDefaultModel(): Model {
  return {
    botUid: '', // 机器人UID
    groupUid: '' // 群组UID
  };
}

// 定义表单验证规则键类型
type RuleKey = Extract<keyof Model, 'groupUid' | 'botUid'>;

// 定义表单验证规则
const rules: Record<RuleKey, App.Global.FormRule> = {
  botUid: defaultRequiredRule, // 机器人账号为必填项
  groupUid: defaultRequiredRule
};

// 群组UID下拉选项
const groupUidOptions = ref<CommonType.Option<string>[]>([]);

// 机器人账号下拉选项
const botOptions = ref<CommonType.Option<string>[]>([]);

/** 获取所有机器人账号列表 */
async function getBotOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botOptions.value = data.map(item => ({
      label: item.label, // 显示文本
      value: item.value // 实际值
    }));
  }
}

/**
 * 获取指定机器人的群组列表
 *
 * @param bot 机器人UID
 */
async function getGroupUidOptions(bot: string) {
  const { error, data } = await fetchGetAllGroupOptionList(bot);
  if (!error) {
    groupUidOptions.value = data.map(item => ({
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
 * 2. 调用API提交数据
 * 3. 根据结果显示提示信息并关闭抽屉
 */
async function handleSubmit() {
  await validate();
  await fetchSaveBlackGroup(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted'); // 触发提交成功事件
      closeDrawer(); // 关闭抽屉
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

// 监听机器人UID变化，动态加载对应机器人的群组列表
watch(
  () => model.value.botUid,
  async newVal => {
    if (newVal && visible.value) {
      await getGroupUidOptions(newVal);
    }
  }
);

// 监听抽屉可见性变化
watch(visible, () => {
  if (visible.value) {
    handleInitModel(); // 初始化表单数据
    restoreValidation(); // 重置表单验证状态
    getBotOptions(); // 获取机器人账号列表
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
          <NSelect v-model:value="model.botUid" :options="botOptions" />
        </NFormItem>
        <!-- 群组账号选择框 - 支持手动输入和QQ群号验证 -->
        <NFormItem :label="$t('page.config.blacklist.group.groupAccount')" path="groupUid">
          <NSelect
            v-model:value="model.groupUid"
            :options="groupUidOptions"
            filterable
            :tag="groupUidOptions.length === 0"
            placeholder="{{ $t('page.config.group.inputGroupId') || $t('page.config.group.optionsOrinput') }}"
          />
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
