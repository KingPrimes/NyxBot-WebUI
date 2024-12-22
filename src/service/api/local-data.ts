import {request} from '../request';

const baseUrl = '/data/warframe';

/** 获取Warframe别名列表 */
export function fetchPostAliasList(params?: Api.LocalData.AliasSearchParams) {
  return request<Api.LocalData.AliasList>({
    url: `${baseUrl}/alias/list`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe市场列表 */
export function fetchPostMarketList(params?: Api.LocalData.MarketSearchParams) {
  return request<Api.LocalData.MarketList>({
    url: `${baseUrl}/market/list`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe市场Riven列表 */
export function fetchPostMarketRivenList(params?: Api.LocalData.MarketRivenSearchParams) {
  return request<Api.LocalData.MarketRivenList>({
    url: `${baseUrl}/market/riven/list`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe幻纹列表 */
export function fetchPostPhantomList(params?: Api.LocalData.PhantomSearchParams) {
  return request<Api.LocalData.PhantomList>({
    url: `${baseUrl}/ephemeras/list`,
    method: 'post',
    data: params
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
