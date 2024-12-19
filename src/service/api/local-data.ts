import { request } from '../request';

/** 获取Warframe别名列表 */
export function fetchGetAliasList(params?: Api.LocalData.AliasSearchParams) {
  return request<Api.LocalData.AliasList>({
    url: '/localData/getAliasList',
    method: 'get',
    params
  });
}

/** 获取Warframe市场列表 */
export function fetchGetMarketList(params?: Api.LocalData.MarketSearchParams) {
  return request<Api.LocalData.MarketList>({
    url: '/localData/getMarketList',
    method: 'get',
    params
  });
}

/** 获取Warframe市场Riven列表 */
export function fetchGetMarketRivenList(params?: Api.LocalData.MarketRivenSearchParams) {
  return request<Api.LocalData.MarketRivenList>({
    url: '/localData/getMarketRivenList',
    method: 'get',
    params
  });
}

/** 获取Warframe幻纹列表 */
export function fetchGetPhantomList(params?: Api.LocalData.PhantomSearchParams) {
  return request<Api.LocalData.PhantomList>({
    url: '/localData/getPhantomList',
    method: 'get',
    params
  });
}

/** 获取WarframeRiven列表 */
export function fetchGetRivenList(params?: Api.LocalData.RivenSearchParams) {
  return request<Api.LocalData.RivenList>({
    url: '/localData/getRivenList',
    method: 'get',
    params
  });
}

/** 获取Warframe翻译列表 */
export function fetchGetTranslationList(params?: Api.LocalData.TranslationSearchParams) {
  return request<Api.LocalData.TranslationList>({
    url: '/localData/getTranslationList',
    method: 'get',
    params
  });
}

/** 获取Warframe未翻译列表 */
export function fetchGetUntranslatedList(params?: Api.LocalData.UntranslatedSearchParams) {
  return request<Api.LocalData.UntranslatedList>({
    url: '/localData/getUntranslatedList',
    method: 'get',
    params
  });
}
