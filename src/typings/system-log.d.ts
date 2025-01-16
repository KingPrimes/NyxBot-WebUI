declare namespace Api {
  namespace SystemLog {
    interface LogSearchParams extends Common.CommonSearchParams {
      page?: number;
      pageSize?: number;
      codes?: string | undefined;
      groupUid?: number | undefined;
    }

    interface LogInfoList {
      id?: number | undefined;
      title: string;
      codes: string;
      botUid: number;
      groupUid: number;
      userUid: number;
      runTime: number;
    }

    interface CodesOption {
      label: string;
      value: string;
    }

    interface LogInfo {
      id?: number | undefined;
      title: string;
      codes: string;
      permissions: string;
      businessType: string;
      botUid: number;
      groupUid: number;
      userUid: number;
      rawMsg: string;
      url: string;
      method: string;
      requestMethod: string;
      runTime: number;
      param: string;
      result: string;
      status: number;
      errorMsg: string;
      logTime: string;
    }

    interface LogInfoNow {
      live: string;
      time: string;
      pack: string;
      thread: string;
      log: string;
    }

    type LogList = App.PageData<LogInfoList>;
  }
}
