<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'TableHeaderOperation'
});

interface Props {
  itemAlign?: NaiveUI.Align;
  disabledDelete?: boolean;
  loading?: boolean;
  showDelete?: boolean;
  showPush?: boolean;
  showUpdate?: boolean;
  showAdd?: boolean;
}

// defineProps<Props>();

withDefaults(defineProps<Props>(), {
  showAdd: true // 设置默认值为 true
});

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
  (e: 'update'): void;
  (e: 'push'): void;
}

const emit = defineEmits<Emits>();

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => []
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}
function update() {
  emit('update');
}

function push() {
  emit('push');
}
</script>

<template>
  <NSpace :align="itemAlign" wrap justify="end" class="lt-sm:w-200px">
    <slot name="prefix">
      <NButton v-if="showPush" size="small" ghost type="warning" @click="push">
        <template #icon>
          <icon-ic-round-publish class="text-icon" />
        </template>
        {{ $t('common.push') }}
      </NButton>
      <NButton v-if="showUpdate" size="small" ghost type="success" @click="update">
        <template #icon>
          <icon-ic-sharp-update class="text-icon" />
        </template>
        {{ $t('common.update') }}
      </NButton>
    </slot>
    <slot name="default">
      <NButton v-if="showAdd" size="small" ghost type="primary" @click="add">
        <template #icon>
          <icon-ic-round-plus class="text-icon" />
        </template>
        {{ $t('common.add') }}
      </NButton>
      <NPopconfirm v-if="showDelete" @positive-click="batchDelete">
        <template #trigger>
          <NButton size="small" ghost type="error" :disabled="disabledDelete">
            <template #icon>
              <icon-ic-round-delete class="text-icon" />
            </template>
            {{ $t('common.batchDelete') }}
          </NButton>
        </template>
        {{ $t('common.confirmDelete') }}
      </NPopconfirm>
    </slot>
    <NButton size="small" @click="refresh">
      <template #icon>
        <icon-mdi-refresh class="text-icon" :class="{ 'animate-spin': loading }" />
      </template>
      {{ $t('common.refresh') }}
    </NButton>
    <TableColumnSetting v-model:columns="columns" />
    <slot name="suffix"></slot>
  </NSpace>
</template>

<style scoped></style>
