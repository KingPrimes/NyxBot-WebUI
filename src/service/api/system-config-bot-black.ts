import { request } from '../request';

const baseUrl = '/config/bot';
const group = `${baseUrl}/black/group`;
const prove = `${baseUrl}/black/prove`;
/** 获取黑名单群组列表 */
export function fetchGetBlacklistGroupList(params?: Api.SystemConfig.BlacklistGroupSearchParams) {
  return request<Api.SystemConfig.BlacklistGroupList>({
    url: `${group}/list`,
    method: 'post',
    data: params
  });
}

/** 增加修改群黑名单 */
export function fetchSaveBlackGroup(params?: Api.SystemConfig.BlacklistGroup) {
  return request<Api.Result>({
    url: `${group}/save`,
    method: 'post',
    data: params
  });
}

/** 移除群黑名单 */
export function fetchRemoveBlackGroup(id: number) {
  return request<Api.Result>({
    url: `${group}/remove/${id}`,
    method: 'delete'
  });
}

/** 获取黑名单个人列表 */
export function fetchGetBlacklistProveList(params?: Api.SystemConfig.BlacklistProveSearchParams) {
  return request<Api.SystemConfig.BlacklistProveList>({
    url: `${prove}/list`,
    method: 'post',
    data: params
  });
}

/** 增加修改个人黑名单 */
export function fetchSaveBlackProve(params?: Api.SystemConfig.BlacklistProve) {
  return request<Api.Result>({
    url: `${prove}/save`,
    method: 'post',
    data: params
  });
}

/** 移除个人黑名单 */
export function fetchRemoveBlackProve(id: number) {
  return request<Api.Result>({
    url: `${prove}/remove/${id}`,
    method: 'delete'
  });
}
