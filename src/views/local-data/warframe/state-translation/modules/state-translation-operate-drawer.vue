<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { $t } from "@/locales";
import { fetchGetStateTranslationTypes, fetchSaveStateTranslation } from "@/service/api/local-data";

defineOptions({ name: "StateTranslationOperateDrawer" });

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.LocalData.StateTranslation | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: "submitted"): void }>();
const visible = defineModel<boolean>("visible", { default: false });
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const typeOptions = ref<{ value: string; label: string }[]>([]);

const title = computed(
  () =>
    ({
      add: $t("page.local-data.warframe.state-translation.addStateTranslation"),
      edit: $t("page.local-data.warframe.state-translation.editStateTranslation"),
      push: $t("common.push"),
    })[props.operateType],
);

type Model = Pick<
  Api.LocalData.StateTranslation,
  "uniqueName" | "name" | "description" | "type" | "parentName"
>;
const model = ref<Model>({ uniqueName: "", name: "", description: "", type: "", parentName: "" });
const rules = { uniqueName: defaultRequiredRule, name: defaultRequiredRule };

async function fetchTypes() {
  const { error, data } = await fetchGetStateTranslationTypes();
  if (!error && data) typeOptions.value = data;
}

function handleInitModel() {
  model.value = { uniqueName: "", name: "", description: "", type: "", parentName: "" };
  if (props.operateType === "edit" && props.rowData) Object.assign(model.value, props.rowData);
}
function closeDrawer() {
  visible.value = false;
}
async function handleSubmit() {
  await validate();
  const { error } = await fetchSaveStateTranslation(model.value as Api.LocalData.StateTranslation);
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
    fetchTypes();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="420">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem
          :label="$t('page.local-data.warframe.state-translation.uniqueName')"
          path="uniqueName"
        >
          <NInput v-model:value="model.uniqueName" :disabled="operateType === 'edit'" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.state-translation.name')" path="name">
          <NInput v-model:value="model.name" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.state-translation.type')" path="type">
          <NSelect v-model:value="model.type" :options="typeOptions" clearable filterable />
        </NFormItem>
        <NFormItem
          :label="$t('page.local-data.warframe.state-translation.description')"
          path="description"
        >
          <NInput v-model:value="model.description" type="textarea" />
        </NFormItem>
        <NFormItem
          :label="$t('page.local-data.warframe.state-translation.parentName')"
          path="parentName"
        >
          <NInput v-model:value="model.parentName" />
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
