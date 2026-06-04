import { request } from "../request";

const baseUrl = "/api/warframe";

/** 平原时间 */
export function fetchCycle() {
  return request<any>({ url: `${baseUrl}/cycle` });
}

/** 入侵信息 */
export function fetchInvasions() {
  return request<any>({ url: `${baseUrl}/invasions` });
}

/** 裂隙信息 */
export function fetchFissures(type?: string) {
  return request<any>({ url: `${baseUrl}/fissures`, params: { type: type || "ACTIVE_MISSION" } });
}

/** 电波信息 */
export function fetchNightwave() {
  return request<any>({ url: `${baseUrl}/nightwave` });
}

/** 突击信息 */
export function fetchSorties() {
  return request<any>({ url: `${baseUrl}/sorties` });
}

/** 执刑官猎杀 */
export function fetchArchonHunt() {
  return request<any>({ url: `${baseUrl}/archon` });
}

/** 警报信息 */
export function fetchAlerts() {
  return request<any>({ url: `${baseUrl}/alerts` });
}

/** 每日特惠 */
export function fetchDailyDeals() {
  return request<any>({ url: `${baseUrl}/dailydeals` });
}

/** 虚空商人 */
export function fetchVoidTrader() {
  return request<any>({ url: `${baseUrl}/voidtrader` });
}

/** 双衍王境轮换 */
export function fetchDuvalierCycle() {
  return request<any>({ url: `${baseUrl}/duvalier` });
}

/** 任务类型枚举 */
export function fetchMissionTypes() {
  return request<Record<string, string>>({ url: `${baseUrl}/enums/mission-types` });
}

/** 派系枚举 */
export function fetchFactions() {
  return request<Record<string, string>>({ url: `${baseUrl}/enums/factions` });
}

/** 遗物等级枚举 */
export function fetchVoidTiers() {
  return request<Record<string, string>>({ url: `${baseUrl}/enums/void-tiers` });
}
