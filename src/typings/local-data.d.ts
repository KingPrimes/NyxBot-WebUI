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
      id?: string;
      name: string;
      slug: string;
      icon: string;
      thumb: string;
      ducats?: number | null;
      vaulted?: boolean;
      maxRank?: number | null;
      bulkTradable?: boolean;
      tradingTax?: number | null;
      gameRef?: string;
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
      invasionReward: string;
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
    }

    type MissionSubscribeList = App.PageData<MissionSubscribe>;
    type MissionSubscribeUserList = App.PageData<MissionSubscribeUser>;
    type MissionSubscribeUserCheckTypeList = App.PageData<MissionSubscribeUserCheckType>;

    interface LichSisterWeapons {
      id?: string;
      name: string;
      slug: string;
      icon: string;
      thumb: string;
      gameRef: string;
      reqMasteryRank?: number | null;
    }

    interface LichSisterSearchParams extends Common.CommonSearchParams {}

    type LichSisterList = App.PageData<LichSisterWeapons>;

    interface NightWave {
      uniqueName: string;
      name: string;
      description: string;
      standing: number;
      required: number;
    }

    interface NightWaveSearchParams extends Common.CommonSearchParams {}

    type NightWaveList = App.PageData<NightWave>;

    interface Nodes {
      uniqueName: string;
      name: string;
      systemName: string;
      systemIndex: number;
      nodeType: number;
      masteryReq: number;
      missionIndex: number;
      factionIndex: number;
      minEnemyLevel: number;
      maxEnemyLevel: number;
    }

    interface NodesSearchParams extends Common.CommonSearchParams {}

    type NodesList = App.PageData<Nodes>;

    interface Reward {
      id: string;
      item: string;
      rarity: string;
      itemCount: number;
    }

    interface RewardPool {
      uniqueName: string;
      rewards: Reward[];
    }

    interface RewardPoolSearchParams extends Common.CommonSearchParams {}

    type RewardPoolList = App.PageData<RewardPool>;

    interface RivenAnalyseTrend {
      id: number;
      archwing: number;
      melle: number;
      name: string;
      pistol: number;
      prefix: string;
      rifle: number;
      shotgun: number;
      suffix: string;
    }

    interface RivenAnalyseTrendSearchParams extends Common.CommonSearchParams {}

    type RivenAnalyseTrendList = App.PageData<RivenAnalyseTrend>;

    interface RivenTionAlias {
      id: number;
      en: string;
      cn: string;
    }

    interface RivenTionAliasSearchParams extends Common.CommonSearchParams {}

    type RivenTionAliasList = App.PageData<RivenTionAlias>;

    interface RivenTion {
      ids: number;
      effect: string;
      group: string;
      negativeOnly: number;
      positiveIsNegative: number;
      prefix: string;
      searchOnly: number;
      suffix: string;
      units: string;
      urlName: string;
      exclusiveTo: string;
    }

    interface RivenTionSearchParams extends Common.CommonSearchParams {}

    type RivenTionList = App.PageData<RivenTion>;

    interface StateTranslation {
      uniqueName: string;
      name: string;
      description: string;
      type: string;
      parentName: string;
    }

    interface StateTranslationSearchParams extends Common.CommonSearchParams {}

    type StateTranslationList = App.PageData<StateTranslation>;

    interface StateTranslationType {
      value: string;
      label: string;
    }

    interface Warframes {
      uniqueName: string;
      name: string;
      parentName: string;
      description: string;
      health: number;
      shield: number;
      armor: number;
      power: number;
      masteryReq: number;
      productCategory: string;
      sprintSpeed: number;
      abilities: any[];
      codexSecret: boolean;
      current: number;
      size: number;
      stamina: number;
    }

    interface WarframesSearchParams extends Common.CommonSearchParams {}

    type WarframesList = App.PageData<Warframes>;

    interface Weapon {
      uniqueName: string;
      name: string;
      totalDamage: number;
      criticalChance: number;
      criticalMultiplier: number;
      procChance: number;
      fireRate: number;
      masteryReq: number;
      productCategory: string;
      slot: number;
      noise: string;
      trigger: string;
      magazineSize: number;
      reloadTime: number;
      sentinel: boolean;
    }

    interface WeaponSearchParams extends Common.CommonSearchParams {}

    type WeaponList = App.PageData<Weapon>;

    interface RelicReward {
      id: string;
      rewardName: string;
      rarity: string;
      tier: number;
      itemCount: number;
    }

    interface Relic {
      uniqueName: string;
      name: string;
      description: string;
      relicRewards: RelicReward[];
    }

    interface RelicSearchParams extends Common.CommonSearchParams {}

    type RelicList = App.PageData<Relic>;
  }
}
