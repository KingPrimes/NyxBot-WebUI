<script setup lang="tsx">
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
import { fetchGetLogInfoDetail } from '@/service/api/system-log';

defineOptions({
  name: 'DetailOperateModal'
});

export type OperateType = NaiveUI.TableOperateType | 'detail';

interface Props {
  /** the type of operation */
  operateType: OperateType;
  /** the edit menu data or the parent menu data when adding a child menu */
  rowData?: { id: number; codesOption: CommonType.Option<string>[] } | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { validate, restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('common.add'),
    edit: $t('common.edit'),
    push: $t('common.push'),
    detail: $t('common.detail')
  };
  return titles[props.operateType];
});

type Model = Pick<
  Api.SystemLog.LogInfo,
  | 'id'
  | 'title'
  | 'code'
  | 'permissions'
  | 'businessType'
  | 'botUid'
  | 'groupUid'
  | 'userUid'
  | 'rawMsg'
  | 'url'
  | 'method'
  | 'requestMethod'
  | 'runTime'
  | 'param'
  | 'result'
  | 'status'
  | 'errorMsg'
  | 'logTime'
>;

const model = ref(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    title: '',
    code: '',
    permissions: '',
    businessType: '',
    botUid: 0,
    groupUid: 0,
    userUid: 0,
    rawMsg: '',
    url: '',
    method: '',
    requestMethod: '',
    runTime: 0,
    param: '',
    result: '',
    status: 0,
    errorMsg: '',
    logTime: ''
  };
}

function handleInitModel() {
  model.value = createDefaultModel();
  if (props.operateType === 'detail' && props.rowData) {
    fetchGetLogInfoDetail(props.rowData.id).then(res => {
      if (res.data) {
        model.value = res.data;
      } else {
        model.value = createDefaultModel();
      }
    });
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  closeDrawer();
  emit('submitted');
}
const formattedLogTime = computed(() => {
  return model.value ? dayjs(model.value.logTime).format('YYYY-MM-DD HH:mm:ss') : '';
});

const formattedParam = computed(() => {
  if (model.value) {
    try {
      return JSON.stringify(JSON.parse(model.value.param), null, 2);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return model.value.param;
    }
  }
  return '';
});

const runtime = computed(() => {
  return model.value ? `${model.value.runTime} ms` : '';
});

const errorMsg = computed(() => {
  return model.value && model.value.errorMsg ? model.value.errorMsg : 'null';
});

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-800px">
    <NScrollbar class="h-480px pr-20px">
      <NForm label-placement="left" :label-width="100">
        <NGrid responsive="screen" item-responsive>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.title')">
            <NInput v-model:value="model.title" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.codes')">
            <NInput v-model:value="model.code" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.permissions')">
            <NInput v-model:value="model.permissions" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.businessType')">
            <NInput v-model:value="model.businessType" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.botUid')">
            <NInputNumber v-model:value="model.botUid" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.groupUid')">
            <NInputNumber v-model:value="model.groupUid" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.userUid')">
            <NInputNumber v-model:value="model.userUid" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.rawMsg')">
            <NInput v-model:value="model.rawMsg" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.url')">
            <NInput v-model:value="model.url" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.method')">
            <NInput v-model:value="model.method" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.requestMethod')">
            <NInput v-model:value="model.requestMethod" type="textarea" autosize disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.runTime')">
            <NInput v-model:value="runtime" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.param')">
            <NInput v-model:value="formattedParam" type="textarea" autosize disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.result')">
            <NInput v-model:value="model.result" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.status')">
            <NTag v-if="model.status === 0" type="success">成功</NTag>
            <NTag v-else type="error">失败</NTag>
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.errorMsg')">
            <NInput v-model:value="errorMsg" disabled />
          </NFormItemGi>
          <NFormItemGi span="24 m:12" :label="$t('page.log.loginfo.logTime')">
            <NInput v-model:value="formattedLogTime" disabled />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NScrollbar>
    <template #footer>
      <NSpace justify="end" :size="16">
        <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
