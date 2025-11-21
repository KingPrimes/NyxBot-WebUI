import { computed, ref } from 'vue';

// 日志级别优先级
const LEVEL_PRIORITY: Record<Api.Log.Level, number> = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4
};

export function useLogFilter() {
  const filterConfig = ref<Api.Log.FilterConfig>({
    enabled: false,
    minLevel: 'TRACE',
    includeKeywords: [],
    excludeKeywords: [],
    includePackages: [],
    excludePackages: [],
    includeThreads: [],
    useRegex: false
  });

  /** 检查日志级别是否符合最小级别要求 */
  function checkLevel(logLevel: Api.Log.Level): boolean {
    return LEVEL_PRIORITY[logLevel] >= LEVEL_PRIORITY[filterConfig.value.minLevel];
  }

  /** 检查关键词匹配 */
  function checkKeywords(log: Api.Log.Data): boolean {
    const { includeKeywords, excludeKeywords, useRegex } = filterConfig.value;
    const text = `${log.log} ${log.pack} ${log.thread}`;

    // 排除关键词检查
    if (excludeKeywords.length > 0) {
      const hasExcluded = excludeKeywords.some(keyword => {
        if (!keyword.trim()) return false;

        try {
          if (useRegex) {
            const regex = new RegExp(keyword, 'i');
            return regex.test(text);
          }
          return text.toLowerCase().includes(keyword.toLowerCase());
        } catch {
          // 忽略无效的正则表达式
          return false;
        }
      });

      if (hasExcluded) return false;
    }

    // 包含关键词检查
    if (includeKeywords.length > 0) {
      return includeKeywords.some(keyword => {
        if (!keyword.trim()) return false;

        try {
          if (useRegex) {
            const regex = new RegExp(keyword, 'i');
            return regex.test(text);
          }
          return text.toLowerCase().includes(keyword.toLowerCase());
        } catch {
          // 忽略无效的正则表达式
          return false;
        }
      });
    }

    return true;
  }

  /** 检查包名匹配 */
  function checkPackages(log: Api.Log.Data): boolean {
    const { includePackages, excludePackages, useRegex } = filterConfig.value;
    const packageName = log.pack;

    // 排除包名检查
    if (excludePackages.length > 0) {
      const hasExcluded = excludePackages.some(pkg => {
        if (!pkg.trim()) return false;

        try {
          if (useRegex) {
            const regex = new RegExp(pkg, 'i');
            return regex.test(packageName);
          }
          return packageName.toLowerCase().includes(pkg.toLowerCase());
        } catch {
          // 忽略无效的正则表达式
          return false;
        }
      });

      if (hasExcluded) return false;
    }

    // 包含包名检查
    if (includePackages.length > 0) {
      return includePackages.some(pkg => {
        if (!pkg.trim()) return false;

        try {
          if (useRegex) {
            const regex = new RegExp(pkg, 'i');
            return regex.test(packageName);
          }
          return packageName.toLowerCase().includes(pkg.toLowerCase());
        } catch {
          // 忽略无效的正则表达式
          return false;
        }
      });
    }

    return true;
  }

  /** 检查线程名匹配 */
  function checkThreads(log: Api.Log.Data): boolean {
    const { includeThreads } = filterConfig.value;
    const threadName = log.thread;

    // 如果没有设置线程过滤，则通过
    if (includeThreads.length === 0) {
      return true;
    }

    // 检查是否匹配任一线程
    return includeThreads.some(thread => {
      if (!thread.trim()) return false;
      return threadName.toLowerCase().includes(thread.toLowerCase());
    });
  }

  /** 应用过滤规则 */
  function applyFilter(logs: Api.Log.Data[]): Api.Log.Data[] {
    if (!filterConfig.value.enabled) {
      return logs;
    }

    return logs.filter(log => {
      // 级别检查
      if (!checkLevel(log.live)) return false;

      // 关键词检查
      if (!checkKeywords(log)) return false;

      // 包名检查
      if (!checkPackages(log)) return false;

      // 线程检查
      if (!checkThreads(log)) return false;

      return true;
    });
  }

  /** 更新过滤配置 */
  function updateFilter(config: Partial<Api.Log.FilterConfig>) {
    filterConfig.value = {
      ...filterConfig.value,
      ...config
    };
  }

  /** 重置过滤配置 */
  function resetFilter() {
    filterConfig.value = {
      enabled: false,
      minLevel: 'TRACE',
      includeKeywords: [],
      excludeKeywords: [],
      includePackages: [],
      excludePackages: [],
      includeThreads: [],
      useRegex: false
    };
  }

  /** 切换过滤开关 */
  function toggleFilter() {
    filterConfig.value.enabled = !filterConfig.value.enabled;
  }

  /** 设置最小日志级别 */
  function setMinLevel(level: Api.Log.Level) {
    filterConfig.value.minLevel = level;
  }

  /** 是否有活动的过滤规则 */
  const hasActiveFilters = computed(() => {
    const config = filterConfig.value;
    return (
      config.enabled &&
      (config.minLevel !== 'TRACE' ||
        config.includeKeywords.length > 0 ||
        config.excludeKeywords.length > 0 ||
        config.includePackages.length > 0 ||
        config.excludePackages.length > 0 ||
        config.includeThreads.length > 0)
    );
  });

  return {
    filterConfig,
    hasActiveFilters,
    applyFilter,
    updateFilter,
    resetFilter,
    toggleFilter,
    setMinLevel
  };
}
