import { request } from '../request';

const baseUrl = '/config/bot';
const group = `${baseUrl}/white/group`;
const prove = `${baseUrl}/white/prove`;
/** 获取白名单群组列表 */
export function fetchGetWhitelistGroupList(params?: Api.SystemConfig.WhitelistGroupSearchParams) {
  return request<Api.SystemConfig.WhitelistGroupList>({
    url: `${group}/list`,
    method: 'post',
    data: params
  });
}

/** 增加修改群黑名单 */
export function fetchSaveWhiteGroup(params?: Api.SystemConfig.WhitelistGroup) {
  return request<Api.Result>({
    url: `${group}/save`,
    method: 'post',
    data: params
  });
}

/** 移除群黑名单 */
export function fetchRemoveWhiteGroup(id: number) {
  return request<Api.Result>({
    url: `${group}/remove/${id}`,
    method: 'delete'
  });
}

/** 获取白名单个人列表 */
export function fetchGetWhitelistProvelList(params?: Api.SystemConfig.WhitelistProveSearchParams) {
  return request<Api.SystemConfig.WhitelistProveList>({
    url: `${prove}/list`,
    method: 'post',
    data: params
  });
}

/** 增加修改个人黑名单 */
export function fetchSaveWhiteProve(params?: Api.SystemConfig.WhitelistProve) {
  return request<Api.Result>({
    url: `${prove}/save`,
    method: 'post',
    data: params
  });
}

/** 移除个人黑名单 */
export function fetchRemoveWhiteProve(id: number) {
  return request<Api.Result>({
    url: `${prove}/remove/${id}`,
    method: 'delete'
  });
}
