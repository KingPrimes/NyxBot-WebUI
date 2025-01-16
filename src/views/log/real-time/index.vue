<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { localStg } from '@/utils/storage';

defineOptions({
  name: 'LogRealTime'
});

const isConnected = ref(false);
let ws: WebSocket | null = null;

function connectWebSocketEx() {
  const token = localStg.get('token');
  ws = new WebSocket('/ws/log-now', token || '');
  ws.onopen = (): void => {
    isConnected.value = true;
  };

  ws.onmessage = event => {
    const loggingText = document.getElementById('loggingText');
    const datas = JSON.parse(event.data);
    for (const data of datas) {
      const ul = document.createElement('ul');
      const live = document.createElement('li');
      const time = document.createElement('li');
      const thread = document.createElement('li');
      const pack = document.createElement('li');
      const log = document.createElement('li');
      ul.setAttribute('name', 'ul-log');
      live.setAttribute('name', 'li-live');
      time.setAttribute('name', 'li-time');
      thread.setAttribute('name', 'li-thread');
      pack.setAttribute('name', 'li-pack');
      log.setAttribute('name', 'li-log');
      switch (data.live) {
        case 'INFO':
          live.style.color = 'green';
          break;
        case 'ERROR':
          live.style.color = 'red';
          break;
        case 'WARN':
          live.style.color = 'orange';
          break;
        case 'DEBUG':
          live.style.color = 'blue';
          break;
        default:
          live.style.color = 'black';
          break;
      }
      live.append(data.live);
      time.append(data.time);
      thread.append(data.thread);
      pack.append(data.pack);
      log.append(data.log);
      ul.append(live, time, thread, pack, log);
      loggingText?.append(ul);
    }
    loggingText?.scrollTo(0, loggingText.scrollHeight);
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
  <div id="loggingText" name="loggingText" contenteditable="false"></div>
</template>

<style>
#loggingText {
  scroll-behavior: smooth; /* 平滑滚动 */
  overflow-y: auto; /* 添加垂直滚动条 */
  height: 100vh; /* 设置高度为视口高度的100% */
}

#loggingText ul {
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

#loggingText li {
  margin: 0 10px;
  padding: 5px;
  border-right: 1px solid #ddd;
}

#loggingText li:last-child {
  border-right: none;
}

#loggingText li[name='li-time'] {
  color: black;
}

#loggingText li[name='li-thread'] {
  color: purple;
}

#loggingText li[name='li-pack'] {
  color: #118aa2;
}

#loggingText li[name='li-log'] {
  color: black;
  word-wrap: break-word; /* 自动换行 */
  overflow-wrap: break-word; /* 自动换行 */
  flex-grow: 1; /* 占据最大宽度 */
}
</style>
