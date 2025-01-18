import { request } from '../request';

const baseUrl = '/data/warframe';

/** 获取Warframe别名列表 */
export async function fetchPostAliasList(params?: Api.LocalData.AliasSearchParams) {
  return request<Api.LocalData.AliasList>({
    url: `${baseUrl}/alias/list`,
    method: 'post',
    data: params
  });
}

export async function fetchPostSaveAlias(params: Api.LocalData.Alias) {
  return request<Api.Result>({
    url: `${baseUrl}/alias/save`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe市场列表 */
export async function fetchPostMarketList(params?: Api.LocalData.MarketSearchParams) {
  return request<Api.LocalData.MarketList>({
    url: `${baseUrl}/market/list`,
    method: 'post',
    data: params
  });
}

/** 更新Warframe市场 */
export async function fetchPostUpdateMarket() {
  return request<Api.Result>({
    url: `${baseUrl}/market/update`,
    method: 'post'
  });
}

/** 获取Warframe市场Riven列表 */
export async function fetchPostMarketRivenList(params?: Api.LocalData.MarketRivenSearchParams) {
  return request<Api.LocalData.MarketRivenList>({
    url: `${baseUrl}/market/riven/list`,
    method: 'post',
    data: params
  });
}

/** 更新Warframe市场Riven列表 */
export async function fetchPostUpdateMarketRiven() {
  return request<Api.Result>({
    url: `${baseUrl}/market/riven/update`,
    method: 'post'
  });
}

/** 获取Warframe幻纹列表 */
export async function fetchPostPhantomList(params?: Api.LocalData.PhantomSearchParams) {
  return request<Api.LocalData.PhantomList>({
    url: `${baseUrl}/ephemeras/list`,
    method: 'post',
    data: params
  });
}

/** 更新幻纹 */
export async function fetchPostUpdatePhantom() {
  return request<Api.Result>({
    url: `${baseUrl}/ephemeras/update`,
    method: 'post'
  });
}

/** 获取RivenTrend列表 */
export async function fetchPostRivenTrendList(params?: Api.LocalData.RivenTrendSearchParams) {
  return request<Api.LocalData.RivenTrendList>({
    url: `${baseUrl}/rivenTrend/list`,
    method: 'post',
    data: params
  });
}

/** 保存RivenTrend */
export async function fetchPostSaveRivenTrend(params?: Api.LocalData.RivenTrend) {
  return request<Api.Result>({
    url: `${baseUrl}/rivenTrend/save`,
    method: 'post',
    data: params
  });
}

/** 更新RivenTrend */
export async function fetchPostUpdateRivenTrend() {
  return request<Api.Result>({
    url: `${baseUrl}/rivenTrend/update`,
    method: 'post'
  });
}

/** 推送RivenTrend */
export async function fetchPostPushRivenTrend(params: Api.LocalData.PushCommit) {
  return request<Api.Result>({
    url: `${baseUrl}/rivenTrend/push`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe翻译列表 */
export async function fetchPostTranslationList(params?: Api.LocalData.TranslationSearchParams) {
  return request<Api.LocalData.TranslationList>({
    url: `${baseUrl}/translation/list`,
    method: 'post',
    data: params
  });
}

/** 保存Warframe翻译 */
export async function fetchPostSaveTranslation(params: Api.LocalData.Translation) {
  return request<Api.Result>({
    url: `${baseUrl}/translation/save`,
    method: 'post',
    data: params
  });
}

/** 更新Warframe翻译 */
export async function fetchPostUpdateTranslation() {
  return request<Api.Result>({
    url: `${baseUrl}/translation/update`,
    method: 'post'
  });
}

/** 推送Warframe翻译 */
export async function fetchPostPushTranslation(params: Api.LocalData.PushCommit) {
  return request<Api.Result>({
    url: `${baseUrl}/translation/push`,
    method: 'post',
    data: params
  });
}

/** 获取Warframe未翻译列表 */
export async function fetchPostUntranslatedList(params?: Api.LocalData.UntranslatedSearchParams) {
  return request<Api.LocalData.UntranslatedList>({
    url: `${baseUrl}/notTranslation/list`,
    method: 'post',
    data: params
  });
}

/** 添加未翻译的数据 */
export async function fetchPostSaveNotTranslation(params: Api.LocalData.Translation) {
  return request<Api.Result>({
    url: `${baseUrl}/notTranslation/save`,
    method: 'post',
    data: params
  });
}
