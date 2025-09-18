<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NSelect } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchGetAllBotsOptionList, fetchGetAllGroupOptionList } from '@/service/api/system-config-bot';
import { fetchSaveWhiteGroup } from '@/service/api/system-config-bot-white';

// 定义组件名称
defineOptions({
  name: 'WhiteOperateDrawer'
});

// 组件属性定义
interface Props {
  /** 操作类型（add添加/edit编辑/push推送） */
  operateType: NaiveUI.TableOperateType;
  /** 编辑行的数据 */
  rowData?: Api.SystemConfig.WhitelistGroup | null;
}

const props = defineProps<Props>();

// 组件事件定义
interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

// 控制抽屉显示/隐藏的双向绑定变量
const visible = defineModel<boolean>('visible', {
  default: false
});

// 获取表单相关方法和引用
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

// 根据操作类型计算抽屉标题
const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.config.whitelist.group.addWhitelistGroup'),
    edit: $t('page.config.whitelist.group.editWhitelistGroup'),
    push: $t('common.push')
  };
  return titles[props.operateType];
});

// 定义表单数据模型类型
type Model = Pick<Api.SystemConfig.WhitelistGroup, 'groupUid' | 'botUid'>;
// 创建表单数据模型
const model = ref(createDefaultModel());

/**
 * 创建默认的表单数据模型
 *
 * @returns 包含botUid和groupUid的默认模型对象
 */
function createDefaultModel(): Model {
  return {
    botUid: '',
    groupUid: ''
  };
}

// 定义表单验证规则的键类型
type RuleKey = Extract<keyof Model, 'groupUid' | 'botUid'>;

// 合并验证规则
const rules: Record<RuleKey, App.Global.FormRule> = {
  botUid: defaultRequiredRule,
  groupUid: defaultRequiredRule
};

// 群列表选项数据
const groupOptions = ref<CommonType.Option<string>[]>([]);
// 机器人账号列表选项数据
const botOptions = ref<CommonType.Option<string>[]>([]);

/** 获取机器人账号列表选项 从API接口获取所有可用的机器人账号信息 */
async function getBotOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

/**
 * 获取指定机器人的群列表选项
 *
 * @param bot 机器人账号ID
 */
async function getGroupOptions(bot: string) {
  const { error, data } = await fetchGetAllGroupOptionList(bot);
  if (!error) {
    groupOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

/** 初始化表单数据模型 根据操作类型设置对应的数据 */
function handleInitModel() {
  model.value = createDefaultModel();

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

/** 关闭抽屉 将visible设置为false以隐藏抽屉 */
function closeDrawer() {
  visible.value = false;
}

/** 提交表单数据 验证表单后调用API保存白名单群信息 */
async function handleSubmit() {
  await validate();
  await fetchSaveWhiteGroup(model.value).then(res => {
    if (Number(res.response.data.code) === 200) {
      window.$message?.success(res.response.data.msg);
      emit('submitted');
      closeDrawer();
    } else {
      window.$message?.error(res.response.data.msg);
    }
  });
}

// 监听机器人账号变化，动态加载对应的群列表
watch(
  () => model.value.botUid,
  async newVal => {
    if (newVal && visible.value) {
      await getGroupOptions(newVal);
    }
  }
);

// 监听抽屉显示状态，初始化表单数据和验证状态
watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
    getBotOptions();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.config.admin.botAccount')" path="botUid">
          <NSelect v-model:value="model.botUid" :options="botOptions" />
        </NFormItem>
        <NFormItem :label="$t('page.config.whitelist.group.groupAccount')" path="groupUid">
          <!-- 添加filterable属性允许手动输入，当群列表为空时启用tag模式 -->
          <NSelect
            v-model:value="model.groupUid"
            :options="groupOptions"
            filterable
            :tag="groupOptions.length === 0"
            placeholder="{{ $t('page.config.group.inputGroupId') || $t('page.config.group.optionsOrinput') }}"
          />
        </NFormItem>
      </NForm>
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
