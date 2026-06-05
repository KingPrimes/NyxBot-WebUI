<script setup lang="ts">
import { ref, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
const { formRef, validate } = useNaiveForm();
const props = defineProps<{ modelValue: { commit: string } }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: { commit: string }): void }>();

const localCommit = ref(props.modelValue.commit);

watch(
  () => props.modelValue.commit,
  newCommit => {
    localCommit.value = newCommit;
  }
);

function updateCommit(commit: string) {
  emit('update:modelValue', { commit });
}
const rules = {
  commit: [
    {
      required: true,
      message: $t('common.commits'),
      trigger: 'blur'
    }
  ]
};

async function validateForm() {
  await validate();
}

defineExpose({
  validateForm
});
</script>

<template>
  <NForm ref="formRef" :model="props.modelValue" :rules="rules">
    <NFormItem :label="$t('common.commits')" path="commit">
      <NInput v-model:value="localCommit" :placeholder="$t('common.commits')" @input="updateCommit($event)" />
    </NFormItem>
  </NForm>
</template>
