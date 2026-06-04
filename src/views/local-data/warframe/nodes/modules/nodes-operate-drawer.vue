<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { $t } from "@/locales";
import { fetchSaveNodes } from "@/service/api/local-data";

defineOptions({ name: "NodesOperateDrawer" });

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.LocalData.Nodes | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: "submitted"): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>("visible", { default: false });

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t("page.local-data.warframe.nodes.addNodes"),
    edit: $t("page.local-data.warframe.nodes.editNodes"),
    push: $t("common.push"),
  };
  return titles[props.operateType];
});

type Model = Api.LocalData.Nodes;
const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    uniqueName: "",
    name: "",
    systemName: "",
    systemIndex: 0,
    nodeType: 0,
    masteryReq: 0,
    missionIndex: 0,
    factionIndex: 0,
    minEnemyLevel: 0,
    maxEnemyLevel: 0,
  };
}

const rules: Record<string, App.Global.FormRule> = {
  uniqueName: defaultRequiredRule,
  name: defaultRequiredRule,
  systemName: defaultRequiredRule,
};

function handleInitModel() {
  model.value = createDefaultModel();
  if (props.operateType === "edit" && props.rowData) {
    Object.assign(model.value, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  const { error } = await fetchSaveNodes(model.value);
  if (!error) {
    window.$message?.success($t("common.modifySuccess"));
    emit("submitted");
    closeDrawer();
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="400">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.nodes.uniqueName')" path="uniqueName">
          <NInput v-model:value="model.uniqueName" :disabled="operateType === 'edit'" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.name')" path="name">
          <NInput v-model:value="model.name" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.systemName')" path="systemName">
          <NInput v-model:value="model.systemName" />
        </NFormItem>
        <NFormItem label="systemIndex" path="systemIndex">
          <NInputNumber v-model:value="model.systemIndex" />
        </NFormItem>
        <NFormItem label="nodeType" path="nodeType">
          <NInputNumber v-model:value="model.nodeType" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.masteryReq')" path="masteryReq">
          <NInputNumber v-model:value="model.masteryReq" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.missionIndex')" path="missionIndex">
          <NInputNumber v-model:value="model.missionIndex" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.factionIndex')" path="factionIndex">
          <NInputNumber v-model:value="model.factionIndex" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.minEnemyLevel')" path="minEnemyLevel">
          <NInputNumber v-model:value="model.minEnemyLevel" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.nodes.maxEnemyLevel')" path="maxEnemyLevel">
          <NInputNumber v-model:value="model.maxEnemyLevel" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t("common.cancel") }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t("common.confirm") }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
