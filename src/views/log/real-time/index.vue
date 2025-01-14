<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { NCard, NTag } from 'naive-ui';

defineOptions({
  name: 'LogRealTime'
});

interface Log {
  live: string;
  time: string;
  pack: string;
  thread: string;
  log: string;
}

const logs = ref<Log[]>([]);
const isConnected = ref(false);
let ws: WebSocket | null = null;

function connectWebSocketEx() {
  ws = new WebSocket('/ws/log');
  ws.onopen = (): void => {
    isConnected.value = true;
  };

  ws.onmessage = event => {
    logs.value = JSON.parse(event.data);
    nextTick(() => {
      const logContainer = document.getElementById('log-container');
      if (logContainer) {
        logContainer.scrollTop = logContainer.scrollHeight;
      }
    });
  };

  ws.onclose = () => {
    isConnected.value = false;
  };
}

onMounted(() => {
  connectWebSocketEx();
});

onBeforeUnmount(() => {
  if (isConnected.value) {
    ws?.close();
  }
});
</script>

<template>
  <div>
    <NCard>
      <div id="log-container" class="log-container">
        <table class="log-table">
          <thead>
            <tr>
              <th>Live</th>
              <th>Time</th>
              <th>Pack</th>
              <th>Thread</th>
              <th>Log</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index">
              <td>
                <NTag
                  :type="
                    log.live === 'DEBUG'
                      ? 'default'
                      : log.live === 'ERROR'
                        ? 'error'
                        : log.live === 'INFO'
                          ? 'info'
                          : 'warning'
                  "
                >
                  {{ log.live }}
                </NTag>
              </td>
              <td>{{ log.time }}</td>
              <td>{{ log.pack }}</td>
              <td>{{ log.thread }}</td>
              <td>{{ log.log }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.log-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 设置容器高度 */
  overflow-y: auto; /* 允许垂直滚动 */
}

.log-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* 自动调整列宽 */
  text-align: left; /* 内容左对齐 */
}

.log-table th,
.log-table td {
  padding: 10px;
}
</style>
