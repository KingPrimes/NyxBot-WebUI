<script setup lang="ts">
import { NButton, NCard, NCollapse, NCollapseItem, NForm, NFormItemGi, NGrid, NSelect, NSpace } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { useNaiveForm } from '@/hooks/common/form';
import { fetchGetAllBotsOptionList } from '@/service/api/system-config-bot';

defineOptions({
  name: 'AdminSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.SystemConfig.AdminSearchParams>('model', { required: true });

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
const botAccountOptions = ref<CommonType.Option<string>[]>([]);

async function getBotAccountOptions() {
  const { error, data } = await fetchGetAllBotsOptionList();

  if (!error) {
    botAccountOptions.value = data.map(item => ({
      label: item.label,
      value: item.value
    }));
  }
}
onMounted(() => {
  getBotAccountOptions();
});
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="admin-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" :label="$t('page.config.admin.botAccount')" path="role" class="pr-24px">
              <NSelect
                v-model:value="model.botUid"
                :options="botAccountOptions"
                :placeholder="$t('page.config.admin.botAccount')"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 m:12" class="pr-24px">
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
