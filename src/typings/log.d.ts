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

    interface CommandSearchParams {
      command: string | null;
      groupQQ: string | null;
    }

    type CommandList = App.PageData<Command>;
  }
}
