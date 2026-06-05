import { computed, ref } from 'vue';

const MAX_CACHE_SIZE = 5000;

export function useLogCache() {
  const logCache = ref<Api.Log.Data[]>([]);
  const systemLogs = ref<string[]>([]);

  /** 添加日志到缓存 */
  function addLogs(logs: Api.Log.Data[]) {
    logCache.value.push(...logs);

    // 限制最大 5000 条，使用循环覆盖
    if (logCache.value.length > MAX_CACHE_SIZE) {
      logCache.value = logCache.value.slice(-MAX_CACHE_SIZE);
    }
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
  }

  /** 清空系统日志 */
  function clearSystemLogs() {
    systemLogs.value = [];
  }

  /** 获取缓存大小（格式化字符串） */
  const cacheSize = computed(() => {
    const sizeInBytes = JSON.stringify(logCache.value).length;
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} B`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    }
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  });

  /** 获取统计信息 */
  const stats = computed<Api.Log.Stats>(() => {
    const total = logCache.value.length;
    const trace = logCache.value.filter(log => log.live === 'TRACE').length;
    const debug = logCache.value.filter(log => log.live === 'DEBUG').length;
    const info = logCache.value.filter(log => log.live === 'INFO').length;
    const warn = logCache.value.filter(log => log.live === 'WARN').length;
    const error = logCache.value.filter(log => log.live === 'ERROR').length;

    return {
      total,
      trace,
      debug,
      info,
      warn,
      error,
      displayed: total, // 将在过滤后更新
      cacheSize: cacheSize.value
    };
  });

  /** 搜索日志 */
  function searchLogs(keyword: string, useRegex: boolean = false): Api.Log.Data[] {
    if (!keyword.trim()) {
      return logCache.value;
    }

    try {
      if (useRegex) {
        const regex = new RegExp(keyword, 'i');
        return logCache.value.filter(log => regex.test(log.log) || regex.test(log.pack) || regex.test(log.thread));
      }
      const lowerKeyword = keyword.toLowerCase();
      return logCache.value.filter(
        log =>
          log.log.toLowerCase().includes(lowerKeyword) ||
          log.pack.toLowerCase().includes(lowerKeyword) ||
          log.thread.toLowerCase().includes(lowerKeyword)
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('搜索日志失败:', error);
      return logCache.value;
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
