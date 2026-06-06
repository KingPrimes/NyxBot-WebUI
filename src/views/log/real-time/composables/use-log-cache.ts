import { ref } from 'vue';

const MAX_CACHE_SIZE = 5000;

const EMPTY_STATS: Api.Log.Stats = {
  total: 0,
  trace: 0,
  debug: 0,
  info: 0,
  warn: 0,
  error: 0,
  displayed: 0,
  cacheSize: '2 B'
};

export function useLogCache() {
  const logCache = ref<Api.Log.Data[]>([]);
  const systemLogs = ref<string[]>([]);
  const cachePayloadSize = ref(0);
  const stats = ref<Api.Log.Stats>({ ...EMPTY_STATS });

  function formatCacheSize(sizeInBytes: number) {
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    }
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getLogSize(log: Api.Log.Data) {
    return JSON.stringify(log).length;
  }

  function updateStats(logs: Api.Log.Data[], direction: 1 | -1) {
    if (!logs.length) return;

    const nextStats = { ...stats.value };

    logs.forEach(log => {
      nextStats.total += direction;
      cachePayloadSize.value += direction * getLogSize(log);

      switch (log.live) {
        case 'TRACE':
          nextStats.trace += direction;
          break;
        case 'DEBUG':
          nextStats.debug += direction;
          break;
        case 'INFO':
          nextStats.info += direction;
          break;
        case 'WARN':
          nextStats.warn += direction;
          break;
        case 'ERROR':
          nextStats.error += direction;
          break;
      }
    });

    cachePayloadSize.value = Math.max(cachePayloadSize.value, 0);
    nextStats.displayed = nextStats.total;
    nextStats.cacheSize = formatCacheSize(nextStats.total ? cachePayloadSize.value + nextStats.total + 1 : 2);
    stats.value = nextStats;
  }

  /** 添加日志到缓存 */
  function addLogs(logs: Api.Log.Data[]) {
    if (!logs.length) return;

    const nextLogs = [...logCache.value, ...logs];
    const removedCount = Math.max(0, nextLogs.length - MAX_CACHE_SIZE);
    const removedLogs = removedCount ? nextLogs.slice(0, removedCount) : [];

    logCache.value = removedCount ? nextLogs.slice(removedCount) : nextLogs;
    updateStats(logs, 1);
    updateStats(removedLogs, -1);
  }

  /** 添加系统日志 */
  function addSystemLog(message: string) {
    const timestamp = new Date().toLocaleTimeString('zh-CN');
    systemLogs.value.push(`[${timestamp}] ${message}`);

    // 限制系统日志最多 100 条
    if (systemLogs.value.length > 100) {
      systemLogs.value = systemLogs.value.slice(-100);
    }
  }

  /** 清空日志缓存 */
  function clearCache() {
    logCache.value = [];
    cachePayloadSize.value = 0;
    stats.value = { ...EMPTY_STATS };
  }

  /** 清空系统日志 */
  function clearSystemLogs() {
    systemLogs.value = [];
  }

  /** 搜索日志 */
  function searchLogs(sourceLogs: Api.Log.Data[], keyword: string, useRegex: boolean = false): Api.Log.Data[] {
    if (!keyword.trim()) {
      return sourceLogs;
    }

    try {
      if (useRegex) {
        const regex = new RegExp(keyword, 'i');
        return sourceLogs.filter(log => regex.test(log.log) || regex.test(log.pack) || regex.test(log.thread));
      }
      const lowerKeyword = keyword.toLowerCase();
      return sourceLogs.filter(
        log =>
          log.log.toLowerCase().includes(lowerKeyword) ||
          log.pack.toLowerCase().includes(lowerKeyword) ||
          log.thread.toLowerCase().includes(lowerKeyword)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('搜索日志失败:', error);
      return sourceLogs;
    }
  }

  /** 导出日志为文本 */
  function exportLogsAsText(logs: Api.Log.Data[]): string {
    return logs.map(log => `[${log.live}] ${log.time} [${log.thread}] ${log.pack}\n${log.log}`).join('\n\n');
  }

  /** 下载日志文件 */
  function downloadLogs(logs: Api.Log.Data[], filename: string = 'logs.txt') {
    const text = exportLogsAsText(logs);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return {
    logCache,
    systemLogs,
    stats,
    addLogs,
    addSystemLog,
    clearCache,
    clearSystemLogs,
    searchLogs,
    exportLogsAsText,
    downloadLogs
  };
}
