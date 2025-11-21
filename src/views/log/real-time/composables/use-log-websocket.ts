import { onUnmounted, ref } from 'vue';
import { localStg } from '@/utils/storage';

export function useLogWebSocket() {
  const isConnected = ref(false);
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');

  let ws: WebSocket | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  /** 解压 GZIP 数据 */
  async function decompressData(arrayBuffer: ArrayBuffer): Promise<string> {
    try {
      const ds = new DecompressionStream('gzip');
      const blob = new Blob([arrayBuffer]);
      const stream = blob.stream().pipeThrough(ds);
      const decompressedBlob = await new Response(stream).blob();
      return await decompressedBlob.text();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('解压数据失败:', error);
      throw error;
    }
  }

  /** 启动心跳 */
  function startHeartbeat() {
    stopHeartbeat();
    heartbeatTimer = setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // 30秒心跳
  }

  /** 停止心跳 */
  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
  }

  /** 连接 WebSocket */
  function connect(
    onMessage: (logs: Api.Log.Data[]) => void,
    onSystemLog?: (message: string) => void,
    level: Api.Log.Level = 'INFO'
  ) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      onSystemLog?.('⚠️ WebSocket 已连接');
      return;
    }

    connectionStatus.value = 'connecting';
    onSystemLog?.('🔌 正在连接 WebSocket...');

    const token = localStg.get('token');
    const wsUrl = import.meta.env.DEV ? `/proxy-default/ws/log-now?level=${level}` : `/ws/log-now?level=${level}`;

    try {
      ws = new WebSocket(wsUrl, token || '');

      ws.onopen = () => {
        isConnected.value = true;
        connectionStatus.value = 'connected';
        onSystemLog?.('✅ WebSocket 连接成功');
        startHeartbeat();
      };

      ws.onmessage = async event => {
        try {
          let data: Api.Log.Data[];

          // 处理 GZIP 压缩数据
          if (event.data instanceof Blob) {
            const arrayBuffer = await event.data.arrayBuffer();
            const decompressed = await decompressData(arrayBuffer);
            data = JSON.parse(decompressed);
          } else {
            // 处理普通 JSON 数据
            data = JSON.parse(event.data);
          }

          // 验证数据格式
          if (Array.isArray(data)) {
            onMessage(data);
          } else {
            // eslint-disable-next-line no-console
            console.warn('收到非数组格式的日志数据:', data);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('处理消息失败:', error);
          onSystemLog?.(`❌ 处理消息失败: ${error}`);
        }
      };

      ws.onerror = error => {
        // eslint-disable-next-line no-console
        console.error('WebSocket 错误:', error);
        connectionStatus.value = 'error';
        onSystemLog?.('❌ WebSocket 连接错误');
      };

      ws.onclose = () => {
        isConnected.value = false;
        connectionStatus.value = 'disconnected';
        stopHeartbeat();
        onSystemLog?.('🔌 WebSocket 连接已关闭');

        // 5秒后自动重连
        reconnectTimer = setTimeout(() => {
          if (!ws || ws.readyState === WebSocket.CLOSED) {
            onSystemLog?.('🔄 正在重连...');
            connect(onMessage, onSystemLog, level);
          }
        }, 5000);
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('创建 WebSocket 失败:', error);
      connectionStatus.value = 'error';
      onSystemLog?.(`❌ 创建 WebSocket 失败: ${error}`);
    }
  }

  /** 断开连接 */
  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    stopHeartbeat();
    if (ws) {
      ws.close();
      ws = null;
    }
    isConnected.value = false;
    connectionStatus.value = 'disconnected';
  }

  /** 发送过滤配置到服务器 */
  function sendFilterConfig(config: Api.Log.FilterConfig) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message: Api.Log.WSMessage = {
        type: 'filter',
        action: 'update',
        config
      };
      ws.send(JSON.stringify(message));
    }
  }

  /** 组件卸载时清理 */
  onUnmounted(() => {
    disconnect();
  });

  return {
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    sendFilterConfig
  };
}
