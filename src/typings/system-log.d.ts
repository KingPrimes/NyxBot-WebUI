declare namespace Api {
  namespace SystemLog {
    interface LogSearchParams {
      page?: number;
      pageSize?: number;
    }

    interface Log {
      id: string | number;
      content: string;
      level: 'info' | 'warning' | 'error';
      createTime: string;
    }

    interface CommandLog {
      id: string | number;
      command: string;
      result: string;
      status: number;
      createTime: string;
    }

    type LogList = App.PageData<Log>;
    type CommandLogList = App.PageData<CommandLog>;
  }
}
