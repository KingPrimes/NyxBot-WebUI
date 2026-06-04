<script lang="ts" setup>
import type { MessageReactive } from "naive-ui";
import { computed, onUnmounted, ref, watch } from "vue";
import { NButton } from "naive-ui";
import { $t } from "@/locales";
import { localStg } from "@/utils/storage";

const props = defineProps<{
  apiFn: () => Promise<any>;
  buttonText: string;
  successMessage: string;
}>();

const emit = defineEmits<{
  completed: [];
}>();

type RefreshStatus = "idle" | "connecting" | "running" | "completed" | "failed";

const status = ref<RefreshStatus>("idle");
const message = ref("");
let eventSource: EventSource | null = null;
let msgInstance: MessageReactive | null = null;

const loading = computed(() => status.value === "connecting" || status.value === "running");

function getBasePath(): string {
  const isDev = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === "Y";
  return isDev ? "/proxy-default" : "";
}

function disconnect() {
  eventSource?.close();
  eventSource = null;
}

function startRefresh() {
  if (loading.value) return;

  status.value = "connecting";
  message.value = $t("common.dataUpdate.connecting");

  const token = localStg.get("token") || "";
  const url = `${getBasePath()}/sse/data-refresh?token=${token}`;
  eventSource = new EventSource(url);

  eventSource.addEventListener("data-refresh", (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      message.value = data.message;

      if (data.status === "STARTED") {
        status.value = "running";
      } else if (data.status === "COMPLETED") {
        status.value = "completed";
        disconnect();
        emit("completed");
      } else if (data.status === "FAILED") {
        status.value = "failed";
        disconnect();
      }
    } catch {
      // JSON 解析失败，忽略
    }
  });

  eventSource.onerror = () => {
    if (status.value === "idle" || status.value === "connecting") {
      status.value = "failed";
      message.value = $t("common.dataUpdate.sseError");
    }
    disconnect();
  };

  eventSource.onopen = () => {
    props.apiFn().catch(() => {
      status.value = "failed";
      message.value = $t("common.dataUpdate.requestError");
      disconnect();
    });
  };
}

watch(status, (val) => {
  if (val === "connecting" || val === "running") {
    msgInstance?.destroy();
    msgInstance = window.$message?.create(message.value, { type: "loading", duration: 0 }) ?? null;
  } else {
    msgInstance?.destroy();
    msgInstance = null;
    if (val === "completed") {
      window.$message?.success(props.successMessage);
    } else if (val === "failed") {
      window.$message?.error(message.value);
    }
  }
});

onUnmounted(() => disconnect());
</script>

<template>
  <NButton ghost type="primary" size="small" :loading="loading" @click="startRefresh">
    <template #icon>
      <icon-ic-round-cloud-download class="text-icon" />
    </template>
    {{ buttonText }}
  </NButton>
</template>
