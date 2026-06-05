declare namespace Api {
  namespace Log {
    /** 日志级别 */
    type Level = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

    /** 日志数据 */
    interface Data {
      live: Level;
      time: string;
      thread: string;
      pack: string;
      log: string;
    }

    /** 过滤配置 */
    interface FilterConfig {
      enabled: boolean;
      minLevel: Level;
      includeKeywords: string[];
      excludeKeywords: string[];
      includePackages: string[];
      excludePackages: string[];
      includeThreads: string[];
      useRegex: boolean;
    }

    /** 统计信息 */
    interface Stats {
      total: number;
      trace: number;
      debug: number;
      info: number;
      warn: number;
      error: number;
      displayed: number;
      cacheSize: string;
    }

    /** 命令日志 */
    interface Command {
      id: number;
      moduleName: string;
      command: string;
      botQQ: string;
      groupQQ: string;
      triggerQQ: string;
      operateTime: string;
    }

    /** 命令日志搜索参数 */
    interface CommandSearchParams extends Common.CommonSearchParams {
      code?: string | undefined;
      title?: string | undefined;
      groupUid?: number | undefined;
    }

    /** 命令日志列表类型 */
    type CommandList = App.PageData<Command>;
  }
}
