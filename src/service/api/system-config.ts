import { request } from '../request';

/** 获取管理员列表 */
export function fetchGetAdminList(params?: Api.SystemConfig.AdminSearchParams) {
  return request<Api.SystemConfig.AdminList>({
    url: '/systemConfig/getAdminList',
    method: 'get',
    params
  });
}

/** 添加管理员 */
export function fetchAddAdmin(data: Api.SystemConfig.AdminModel) {
  return request<null>({
    url: '/systemConfig/addAdmin',
    method: 'post',
    data
  });
}

/** 编辑管理员 */
export function fetchEditAdmin(data: Api.SystemConfig.AdminModel) {
  return request<null>({
    url: '/systemConfig/editAdmin',
    method: 'put',
    data
  });
}

/** 删除管理员 */
export function fetchDeleteAdmin(adminId: string | number) {
  return request<null>({
    url: `/systemConfig/deleteAdmin/${adminId}`,
    method: 'delete'
  });
}

/** 获取所有管理员 */
export function fetchGetAllAdminOptionList() {
  return request<Api.SystemConfig.AdminOption[]>({
    url: '/systemConfig/getAllAdmin',
    method: 'get'
  });
}

/** 获取所有角色 */
export function fetchGetAllBotOptionList() {
  return request<Api.SystemConfig.BotOption[]>({
    url: '/systemConfig/getAllBot',
    method: 'get'
  });
}

/** 获取黑名单群组列表 */
export function fetchGetBlacklistGroupList(params?: Api.SystemConfig.BlacklistGroupSearchParams) {
  return request<Api.SystemConfig.BlacklistGroup[]>({
    url: '/systemConfig/getBlacklistGroupList',
    method: 'get',
    params
  });
}

/** 获取黑名单个人列表 */
export function fetchGetBlacklistPersonalList(params?: Api.SystemConfig.BlacklistPersonalSearchParams) {
  return request<Api.SystemConfig.BlacklistPersonal[]>({
    url: '/systemConfig/getBlacklistPersonalList',
    method: 'get',
    params
  });
}

/** 获取白名单群组列表 */
export function fetchGetWhitelistGroupList(params?: Api.SystemConfig.WhitelistGroupSearchParams) {
  return request<Api.SystemConfig.WhitelistGroup[]>({
    url: '/systemConfig/getWhitelistGroupList',
    method: 'get',
    params
  });
}

/** 获取白名单个人列表 */
export function fetchGetWhitelistPersonalList(params?: Api.SystemConfig.WhitelistPersonalSearchParams) {
  return request<Api.SystemConfig.WhitelistPersonal[]>({
    url: '/systemConfig/getWhitelistPersonalList',
    method: 'get',
    params
  });
}
