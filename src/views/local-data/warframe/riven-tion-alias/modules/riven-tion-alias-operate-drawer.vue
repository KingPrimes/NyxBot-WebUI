<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { $t } from "@/locales";
import { fetchSaveRivenTionAlias } from "@/service/api/local-data";

defineOptions({ name: "RivenTionAliasOperateDrawer" });

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.LocalData.RivenTionAlias | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: "submitted"): void }>();
const visible = defineModel<boolean>("visible", { default: false });
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(
  () =>
    ({
      add: $t("page.local-data.warframe.riven-tion-alias.addRivenTionAlias"),
      edit: $t("page.local-data.warframe.riven-tion-alias.editRivenTionAlias"),
      push: $t("common.push"),
    })[props.operateType],
);

type Model = Pick<Api.LocalData.RivenTionAlias, "en" | "cn">;
const model = ref<Model>({ en: "", cn: "" });
const rules = { en: defaultRequiredRule, cn: defaultRequiredRule };

function handleInitModel() {
  model.value = { en: "", cn: "" };
  if (props.operateType === "edit" && props.rowData) Object.assign(model.value, props.rowData);
}
function closeDrawer() {
  visible.value = false;
}
async function handleSubmit() {
  await validate();
  const { error } = await fetchSaveRivenTionAlias(model.value as Api.LocalData.RivenTionAlias);
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
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.riven-tion-alias.en')" path="en">
          <NInput v-model:value="model.en" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion-alias.cn')" path="cn">
          <NInput v-model:value="model.cn" />
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
