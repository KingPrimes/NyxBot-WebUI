declare namespace Api {
  namespace Log {
    interface Command {
      id: number;
      moduleName: string;
      command: string;
      botQQ: string;
      groupQQ: string;
      triggerQQ: string;
      operateTime: string;
    }

    interface CommandSearchParams extends Common.CommonSearchParams {
      code?: string | undefined;
      title?: string | undefined;
      groupUid?: number | undefined;
    }

    type CommandList = App.PageData<Command>;
  }
}
