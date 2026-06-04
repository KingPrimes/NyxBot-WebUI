import { onUnmounted, ref } from "vue";
import type { Ref } from "vue";
import { localStg } from "@/utils/storage";

export function useLogSSE() {
  const connectionStatus = ref<"disconnected" | "connecting" | "connected" | "error">(
    "disconnected",
  );
  const activeConnections = ref(0);
  const sessionId = ref("");

  let eventSource: EventSource | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 10;

  function getToken(): string {
    return localStg.get("token") || "";
  }

  function getBasePath(): string {
    const isDev = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === "Y";
    return isDev ? "/proxy-default" : "";
  }

  function stopReconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
  }

  /** 获取当前活跃 SSE 连接数 */
  async function fetchStats() {
    const token = getToken();
    try {
      const res = await fetch(`${getBasePath()}/sse/stats?token=${token}`);
      if (res.ok) {
        const json = await res.json();
        activeConnections.value = json.connections ?? 0;
      }
    } catch {
      // 静默处理
    }
  }

  /** 连接 SSE */
  function connect(
    onMessage: (logs: Api.Log.Data[]) => void,
    onSystemLog?: (message: string) => void,
    level: Api.Log.Level = "INFO",
  ) {
    if (eventSource && eventSource.readyState !== EventSource.CLOSED) {
      onSystemLog?.("⚠️ SSE 已连接");
      return;
    }

    disconnect(true);
    connectionStatus.value = "connecting";
    onSystemLog?.("🔌 正在连接 SSE...");
    reconnectAttempts = 0;

    const token = getToken();
    const url = `${getBasePath()}/sse/log-now?token=${token}&level=${level}`;

    eventSource = new EventSource(url);

    eventSource.onopen = () => {
      connectionStatus.value = "connected";
      reconnectAttempts = 0;
      onSystemLog?.("✅ SSE 连接成功");
      fetchStats();
    };

    eventSource.addEventListener("history", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as Api.Log.Data[];
        if (Array.isArray(data)) {
          onMessage(data);
        }
      } catch {
        // 忽略解析错误
      }
    });

    eventSource.addEventListener("session", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.sessionId) {
          sessionId.value = data.sessionId;
        }
      } catch {
        // 忽略解析错误
      }
    });

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as Api.Log.Data[];
        if (Array.isArray(data)) {
          onMessage(data);
        }
      } catch {
        if (event.data) {
          onSystemLog?.(event.data);
        }
      }
    };

    eventSource.onerror = () => {
      connectionStatus.value = "error";
      onSystemLog?.("❌ SSE 连接错误");

      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }

      if (reconnectAttempts < maxReconnectAttempts) {
        const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
        reconnectAttempts++;
        onSystemLog?.(`🔄 正在重连 (${reconnectAttempts}/${maxReconnectAttempts})...`);

        reconnectTimer = setTimeout(() => {
          if (connectionStatus.value !== "connected") {
            connect(onMessage, onSystemLog, level);
          }
        }, delay);
      } else {
        connectionStatus.value = "disconnected";
        onSystemLog?.("❌ 已达到最大重连次数，请手动重连");
      }
    };
  }

  /** 断开连接 */
  function disconnect(silent = false) {
    stopReconnect();
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    sessionId.value = "";
    if (!silent) {
      connectionStatus.value = "disconnected";
    }
  }

  /** 检查后端业务响应码，失败时抛出错误 */
  async function checkBusinessResponse(res: Response) {
    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.msg || `HTTP ${res.status}`);
    }
    const json = await res.json().catch(() => null);
    if (json && String(json.code) !== import.meta.env.VITE_SERVICE_SUCCESS_CODE) {
      throw new Error(json.msg || `业务错误: ${json.code}`);
    }
    return json;
  }

  /** 发送过滤配置更新到服务器 */
  async function sendFilterConfig(config: Api.Log.FilterConfig) {
    const token = getToken();
    const sid = sessionId.value;
    const res = await fetch(`${getBasePath()}/sse/filter/update?token=${token}&sessionId=${sid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    await checkBusinessResponse(res);
  }

  /** 重置服务器端过滤配置 */
  async function sendFilterReset() {
    const token = getToken();
    const sid = sessionId.value;
    const res = await fetch(`${getBasePath()}/sse/filter/reset?token=${token}&sessionId=${sid}`, {
      method: "POST",
    });
    await checkBusinessResponse(res);
  }

  onUnmounted(() => {
    disconnect();
  });

  return {
    connectionStatus,
    activeConnections: activeConnections as Readonly<Ref<number>>,
    connect,
    disconnect,
    sendFilterConfig,
    sendFilterReset,
    fetchStats,
  };
}
