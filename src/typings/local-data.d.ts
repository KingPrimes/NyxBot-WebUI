declare namespace Api {
  namespace LocalData {
    interface AliasSearchParams {
      en?: string;
      cn?: string;
    }

    interface AliasModel {
      id?: string | number;
      en: string;
      cn: string;
    }

    interface Alias extends Required<AliasModel> {
      createTime: string;
      updateTime: string;
    }

    type AliasList = App.PageData<Alias>;

    interface Market {
      id: number;
      itemName: string;
      imageUrl: string;
    }

    interface MarketSearchParams {
      item_name: string | null;
    }

    type MarketList = App.PageData<Market>;

    interface MarketRiven {
      id: number;
      itemName: string;
      rivenType: string;
      group: string;
      rankLimit: string;
      imageUrl: string;
    }

    interface MarketRivenSearchParams {
      item_name: string | null;
      riven_type: string | null;
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

    interface PhantomSearchParams {
      item_name: string | null;
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

    interface RivenSearchParams {
      itemName: string | null;
    }

    type RivenList = App.PageData<Riven>;

    interface Translation {
      id: number;
      english: string;
      chinese: string;
    }

    interface TranslationSearchParams {
      chinese: string | null;
    }

    type TranslationList = App.PageData<Translation>;

    interface Untranslated {
      id: number;
      english: string;
    }

    interface UntranslatedSearchParams {
      text: string | null;
    }

    type UntranslatedList = App.PageData<Untranslated>;
  }
}
