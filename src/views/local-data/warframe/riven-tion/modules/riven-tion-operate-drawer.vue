<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { $t } from "@/locales";
import { fetchSaveRivenTion } from "@/service/api/local-data";

defineOptions({ name: "RivenTionOperateDrawer" });

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.LocalData.RivenTion | null;
}
const props = defineProps<Props>();
const emit = defineEmits<{ (e: "submitted"): void }>();
const visible = defineModel<boolean>("visible", { default: false });
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(
  () =>
    ({
      add: $t("page.local-data.warframe.riven-tion.addRivenTion"),
      edit: $t("page.local-data.warframe.riven-tion.editRivenTion"),
      push: $t("common.push"),
    })[props.operateType],
);

type Model = Pick<
  Api.LocalData.RivenTion,
  "effect" | "group" | "prefix" | "suffix" | "units" | "urlName" | "exclusiveTo"
>;
const model = ref<Model>({
  effect: "",
  group: "",
  prefix: "",
  suffix: "",
  units: "",
  urlName: "",
  exclusiveTo: "",
});
const rules = { effect: defaultRequiredRule, urlName: defaultRequiredRule };

function handleInitModel() {
  model.value = {
    effect: "",
    group: "",
    prefix: "",
    suffix: "",
    units: "",
    urlName: "",
    exclusiveTo: "",
  };
  if (props.operateType === "edit" && props.rowData) Object.assign(model.value, props.rowData);
}
function closeDrawer() {
  visible.value = false;
}
async function handleSubmit() {
  await validate();
  const { error } = await fetchSaveRivenTion(model.value as Api.LocalData.RivenTion);
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
  <NDrawer v-model:show="visible" display-directive="show" :width="420">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.effect')" path="effect">
          <NInput v-model:value="model.effect" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.urlName')" path="urlName">
          <NInput v-model:value="model.urlName" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.group')" path="group">
          <NInput v-model:value="model.group" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.prefix')" path="prefix">
          <NInput v-model:value="model.prefix" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.suffix')" path="suffix">
          <NInput v-model:value="model.suffix" />
        </NFormItem>
        <NFormItem :label="$t('page.local-data.warframe.riven-tion.units')" path="units">
          <NInput v-model:value="model.units" />
        </NFormItem>
        <NFormItem
          :label="$t('page.local-data.warframe.riven-tion.exclusiveTo')"
          path="exclusiveTo"
        >
          <NInput v-model:value="model.exclusiveTo" />
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
