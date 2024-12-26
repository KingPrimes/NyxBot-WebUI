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
      id: number;
      item_name: string;
      url_name: string;
      icon: string;
      thumb: string;
      animation: string;
    }

    interface PhantomSearchParams extends Common.CommonSearchParams {
      item_name?: string | null;
    }

    type PhantomList = App.PageData<Phantom>;

    interface Riven {
      id: number;
      itemName: string;
      itemEnName: string;
      newDisposition: string;
      oldDisposition: string;
      weaponType: string;
    }

    interface RivenSearchParams extends Common.CommonSearchParams {
      itemName?: string | null;
    }

    type RivenList = App.PageData<Riven>;

    interface Translation {
      id: number;
      english: string;
      chinese: string;
    }

    interface TranslationSearchParams extends Common.CommonSearchParams {
      chinese?: string | null;
    }

    type TranslationList = App.PageData<Translation>;

    interface Untranslated {
      id: number;
      english: string;
    }

    interface UntranslatedSearchParams extends Common.CommonSearchParams {
      text?: string | null;
    }

    type UntranslatedList = App.PageData<Untranslated>;
  }
}
