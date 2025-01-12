<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchGetCodesOption } from '@/service/api/system-log';

defineOptions({
  name: 'CommandSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Log.CommandSearchParams>('model', { required: true });

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}

const codesOption = ref<CommonType.Option<string>[]>([]);

async function getCodes() {
  const { error, data } = await fetchGetCodesOption();

  if (!error) {
    codesOption.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}

onMounted(() => {
  getCodes();
});
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="command-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.log.command.command')" path="codes" class="pr-24px">
              <NSelect
                v-model:value="model.codes"
                :placeholder="$t('page.log.command.commandPlaceholder')"
                :options="codesOption"
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:8" :label="$t('page.log.command.groupQQ')" path="groupUid" class="pr-24px">
              <NInputNumber v-model:value="model.groupUid" :placeholder="$t('page.log.command.groupQQPlaceholder')" />
            </NFormItemGi>
            <NFormItemGi span="24 m:8" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
