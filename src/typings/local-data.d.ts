declare namespace Api {
  namespace LocalData {
    interface AliasSearchParams extends Common.CommonSearchParams {
      cn?: string | null;
    }

    interface Alias {
      id?: number;
      en: string;
      cn: string;
    }

    type AliasList = App.PageData<Alias>;

    interface Market {
      id: number;
      name: string;
      thumb: string;
    }

    interface MarketSearchParams extends Common.CommonSearchParams {
      name?: string | null;
    }

    type MarketList = App.PageData<Market>;

    interface MarketRiven {
      id: number;
      name: string;
      rivenType: string;
      group: string;
      reqMasteryRank: string;
      thumb: string;
    }

    interface MarketRivenSearchParams extends Common.CommonSearchParams {
      name?: string | null;
      rivenType?: string | null;
    }

    type MarketRivenList = App.PageData<MarketRiven>;

    interface Phantom {
      id: string;
      name: string;
      slug: string;
      icon: string;
      thumb: string;
      animation: string;
    }

    interface PhantomSearchParams extends Common.CommonSearchParams {
      name?: string | null;
    }

    type PhantomList = App.PageData<Phantom>;

    interface MissionSubscribe {
      id: number;
      subBotUid: number;
      subGroup: number;
      groupName: string;
    }

    interface MissionSubscribeUser {
      id: number;
      userId: number;
      userName: string;
    }

    interface MissionSubscribeUserCheckType {
      id: number;
      subscribe: string;
      missionTypeEnum: string;
      tierNum: number;
      subscribeType: string;
    }

    interface MissionSubscribeSearchParams extends Common.CommonSearchParams {
      subBotUid?: number;
      subGroup?: number;
    }

    interface MissionSubscribeUserSearchParams extends Common.CommonSearchParams {
      id?: number;
      subBotUid?: number;
      subGroup?: number;
      userId?: number;
    }

    interface MissionSubscribeUserCheckTypeSearchParams extends Common.CommonSearchParams {
      id?: number;
      subBotUid?: number;
      subGroup?: number;
      userId?: number;
      subscribeType?: string;
    }

    type MissionSubscribeList = App.PageData<MissionSubscribe>;
    type MissionSubscribeUserList = App.PageData<MissionSubscribeUser>;
    type MissionSubscribeUserCheckTypeList = App.PageData<MissionSubscribeUserCheckType>;
  }
}
