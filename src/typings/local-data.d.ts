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
      item_name: string;
      thumb: string;
    }

    interface MarketSearchParams extends Common.CommonSearchParams {
      item_name?: string | null;
    }

    type MarketList = App.PageData<Market>;

    interface MarketRiven {
      id: number;
      item_name: string;
      riven_type: string;
      group: string;
      rank_limit: string;
      thumb: string;
    }

    interface MarketRivenSearchParams extends Common.CommonSearchParams {
      item_name?: string | null;
      riven_type?: string | null;
    }

    type MarketRivenList = App.PageData<MarketRiven>;

    interface Phantom {
      id: string;
      item_name: string;
      url_name: string;
      icon: string;
      icon_format: string;
      thumb: string;
      animation: string;
    }

    interface PhantomSearchParams extends Common.CommonSearchParams {
      item_name?: string | null;
    }

    type PhantomList = App.PageData<Phantom>;

    interface RivenTrend {
      id: number;
      trend_name: string;
      new_dot: string;
      new_num: number;
      old_dot: string;
      old_num: number;
      type: string;
      isDate: any;
      traCh: string;
    }

    interface RivenTrendSearchParams extends Common.CommonSearchParams {
      trend_name?: string | null;
    }

    type RivenTrendList = App.PageData<RivenTrend>;

    interface Translation {
      id?: number;
      en: string;
      cn: string;
      is_prime: boolean;
      is_set: boolean;
    }

    interface TranslationSearchParams extends Common.CommonSearchParams {
      cn?: string | null;
      en?: string | null;
    }

    type TranslationList = App.PageData<Translation>;

    interface Untranslated {
      id: number;
      notTranslation: string;
    }

    interface UntranslatedSearchParams extends Common.CommonSearchParams {
      notTranslation?: string | null;
    }

    type UntranslatedList = App.PageData<Untranslated>;

    interface PushCommit {
      commit: string;
    }
  }
}
