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

/** 删除别名 */
export async function fetchDeleteAlias(id: number) {
  return request<Api.Result>({
    url: `${baseUrl}/alias/remove/${id}`,
    method: 'delete'
  });
}

/** 更新Warframe别名数据 */
export async function fetchAliasUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/alias/update`,
    method: 'post'
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

export async function fetchGetSubscribeEnums() {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/sub`,
    method: 'get'
  });
}

export async function fetchGetSubscribeTypeEnums() {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/type`,
    method: 'get'
  });
}

export async function fetchGetSubscribeRewardEnums() {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/reward`,
    method: 'get'
  });
}

/** 获取订阅组数据 */
export async function fetchPostMissionSubscribeList(params?: Api.LocalData.MissionSubscribeSearchParams) {
  return request<Api.LocalData.MissionSubscribeList>({
    url: `${baseUrl}/subscribe/list`,
    method: 'post',
    data: params
  });
}

/** 获取订阅组用户数据 */
export async function fetchPostMissionSubscribeUserList(params?: Api.LocalData.MissionSubscribeUserSearchParams) {
  return request<Api.LocalData.MissionSubscribeUserList>({
    url: `${baseUrl}/subscribe/user/list`,
    method: 'post',
    data: params
  });
}

/** 获取用户订阅类型数据 */
export async function fetchPostMissionSubscribeUserTypeList(
  params?: Api.LocalData.MissionSubscribeUserCheckTypeSearchParams
) {
  return request<Api.LocalData.MissionSubscribeUserCheckTypeList>({
    url: `${baseUrl}/subscribe/type/list`,
    method: 'post',
    data: params
  });
}

/** 移除订阅组 */
export async function fetchDeleteMissionSubscribe(id?: number) {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/${id}`,
    method: 'delete'
  });
}

/** 移除订阅用户 */
export async function fetchDeleteMissionSubscribeUser(id?: number) {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/user/${id}`,
    method: 'delete'
  });
}

/** 移除用户订阅类型 */
export async function fetchDeleteMissionSubscribeCheckType(id?: number) {
  return request<Api.Result>({
    url: `${baseUrl}/subscribe/type/${id}`,
    method: 'delete'
  });
}

/** 获取赤毒/信条武器列表 */
export async function fetchPostLichSisterList(params?: Api.LocalData.LichSisterSearchParams) {
  return request<Api.LocalData.LichSisterList>({
    url: `${baseUrl}/lich-sister/list`,
    method: 'post',
    data: params
  });
}

/** 更新赤毒/信条武器数据 */
export async function fetchLichSisterUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/lich-sister/update`,
    method: 'post'
  });
}

/** 获取电波任务列表 */
export async function fetchPostNightWaveList(params?: Api.LocalData.NightWaveSearchParams) {
  return request<Api.LocalData.NightWaveList>({
    url: `${baseUrl}/night-wave/list`,
    method: 'post',
    data: params
  });
}

/** 更新电波任务数据 */
export async function fetchNightWaveUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/night-wave/update`,
    method: 'post'
  });
}

/** 获取节点列表 */
export async function fetchPostNodesList(params?: Api.LocalData.NodesSearchParams) {
  return request<Api.LocalData.NodesList>({
    url: `${baseUrl}/nodes/list`,
    method: 'post',
    data: params
  });
}

/** 更新节点数据 */
export async function fetchNodesUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/nodes/update`,
    method: 'post'
  });
}

/** 保存节点 */
export async function fetchSaveNodes(params: Api.LocalData.Nodes) {
  return request<Api.Result>({
    url: `${baseUrl}/nodes/save`,
    method: 'post',
    data: params
  });
}

/** 获取单个节点 */
export async function fetchGetNodesEdit(uniqueName: string) {
  return request<Api.LocalData.Nodes>({
    url: `${baseUrl}/nodes/edit/${uniqueName}`,
    method: 'get'
  });
}

/** 删除节点 */
export async function fetchDeleteNodes(uniqueName: string) {
  return request<Api.Result>({
    url: `${baseUrl}/nodes/remove/${uniqueName}`,
    method: 'delete'
  });
}

/** 获取奖励池列表 */
export async function fetchPostRewardPoolList(params?: Api.LocalData.RewardPoolSearchParams) {
  return request<Api.LocalData.RewardPoolList>({
    url: `${baseUrl}/reward-pool/list`,
    method: 'post',
    data: params
  });
}

/** 更新奖励池数据 */
export async function fetchRewardPoolUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/reward-pool/update`,
    method: 'post'
  });
}

/** 保存奖励池 */
export async function fetchSaveRewardPool(params: Api.LocalData.RewardPool) {
  return request<Api.Result>({
    url: `${baseUrl}/reward-pool/save`,
    method: 'post',
    data: params
  });
}

/** 获取单个奖励池 */
export async function fetchGetRewardPoolEdit(uniqueName: string) {
  return request<Api.LocalData.RewardPool>({
    url: `${baseUrl}/reward-pool/edit/${uniqueName}`,
    method: 'get'
  });
}

/** 删除奖励池 */
export async function fetchDeleteRewardPool(uniqueName: string) {
  return request<Api.Result>({
    url: `${baseUrl}/reward-pool/remove/${uniqueName}`,
    method: 'delete'
  });
}

// ========== RivenAnalyseTrend ==========

export async function fetchPostRivenAnalyseList(params?: Api.LocalData.RivenAnalyseTrendSearchParams) {
  return request<Api.LocalData.RivenAnalyseTrendList>({
    url: `${baseUrl}/riven-analyse/list`,
    method: 'post',
    data: params
  });
}

export async function fetchRivenAnalyseUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/riven-analyse/update`,
    method: 'post'
  });
}

// ========== RivenTionAlias ==========

export async function fetchPostRivenTionAliasList(params?: Api.LocalData.RivenTionAliasSearchParams) {
  return request<Api.LocalData.RivenTionAliasList>({
    url: `${baseUrl}/riven-tion-alias/list`,
    method: 'post',
    data: params
  });
}

export async function fetchRivenTionAliasUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion-alias/update`,
    method: 'post'
  });
}

export async function fetchSaveRivenTionAlias(params: Api.LocalData.RivenTionAlias) {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion-alias/save`,
    method: 'post',
    data: params
  });
}

export async function fetchGetRivenTionAliasEdit(id: number) {
  return request<Api.LocalData.RivenTionAlias>({
    url: `${baseUrl}/riven-tion-alias/edit/${id}`,
    method: 'get'
  });
}

export async function fetchDeleteRivenTionAlias(id: number) {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion-alias/remove/${id}`,
    method: 'delete'
  });
}

// ========== RivenTion ==========

export async function fetchPostRivenTionList(params?: Api.LocalData.RivenTionSearchParams) {
  return request<Api.LocalData.RivenTionList>({
    url: `${baseUrl}/riven-tion/list`,
    method: 'post',
    data: params
  });
}

export async function fetchRivenTionUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion/update`,
    method: 'post'
  });
}

export async function fetchSaveRivenTion(params: Api.LocalData.RivenTion) {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion/save`,
    method: 'post',
    data: params
  });
}

export async function fetchGetRivenTionEdit(id: number) {
  return request<Api.LocalData.RivenTion>({
    url: `${baseUrl}/riven-tion/edit/${id}`,
    method: 'get'
  });
}

export async function fetchDeleteRivenTion(id: number) {
  return request<Api.Result>({
    url: `${baseUrl}/riven-tion/remove/${id}`,
    method: 'delete'
  });
}

// ========== StateTranslation ==========

export async function fetchPostStateTranslationList(params?: Api.LocalData.StateTranslationSearchParams) {
  return request<Api.LocalData.StateTranslationList>({
    url: `${baseUrl}/state-translation/list`,
    method: 'post',
    data: params
  });
}

export async function fetchStateTranslationUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/state-translation/update`,
    method: 'post'
  });
}

export async function fetchSaveStateTranslation(params: Api.LocalData.StateTranslation) {
  return request<Api.Result>({
    url: `${baseUrl}/state-translation/save`,
    method: 'post',
    data: params
  });
}

export async function fetchGetStateTranslationEdit(uniqueName: string) {
  return request<Api.LocalData.StateTranslation>({
    url: `${baseUrl}/state-translation/edit/${encodeURIComponent(uniqueName)}`,
    method: 'get'
  });
}

export async function fetchDeleteStateTranslation(uniqueName: string) {
  return request<Api.Result>({
    url: `${baseUrl}/state-translation/remove/${encodeURIComponent(uniqueName)}`,
    method: 'delete'
  });
}

/** 获取状态翻译类型枚举 */
export async function fetchGetStateTranslationTypes() {
  return request<Api.LocalData.StateTranslationType[]>({
    url: `${baseUrl}/state-translation/types`,
    method: 'get'
  });
}

// ========== Warframes ==========

export async function fetchPostWarframesList(params?: Api.LocalData.WarframesSearchParams) {
  return request<Api.LocalData.WarframesList>({
    url: `${baseUrl}/warframes/list`,
    method: 'post',
    data: params
  });
}

export async function fetchWarframesUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/warframes/update`,
    method: 'post'
  });
}

// ========== Weapons ==========

export async function fetchPostWeaponList(params?: Api.LocalData.WeaponSearchParams) {
  return request<Api.LocalData.WeaponList>({
    url: `${baseUrl}/weapons/list`,
    method: 'post',
    data: params
  });
}

export async function fetchWeaponUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/weapons/update`,
    method: 'post'
  });
}

// ========== Relics ==========

export async function fetchPostRelicList(params?: Api.LocalData.RelicSearchParams) {
  return request<Api.LocalData.RelicList>({
    url: `${baseUrl}/relics/list`,
    method: 'post',
    data: params
  });
}

export async function fetchRelicUpdate() {
  return request<Api.Result>({
    url: `${baseUrl}/relics/update`,
    method: 'post'
  });
}
