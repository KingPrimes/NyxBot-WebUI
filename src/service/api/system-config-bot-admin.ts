import { request } from '../request';

const baseUrl = '/config/bot';

/** 获取管理员列表 */
export function fetchPostAdminList(params?: Api.SystemConfig.AdminSearchParams) {
  return request<Api.SystemConfig.AdminList>({
    url: `${baseUrl}/admin/list`,
    method: 'post',
    data: params
  });
}

/** 添加与修改管理员 */
export function fetchAddAndEditAdmin(params: Api.SystemConfig.AdminModel) {
  return request<Api.Result>({
    url: `${baseUrl}/admin/save`,
    method: 'post',
    data: params
  });
}

/** 添加管理员 */
export function fetchPostBotAdmin(params?: Api.SystemConfig.AdminModel) {
  return request<Api.Result>({
    url: `${baseUrl}/admin/save`,
    method: 'post',
    data: params
  });
}

/** 移除管理员 */
export function fetchDeleteBotAdmin(id?: number) {
  return request<Api.Result>({
    url: `${baseUrl}/admin/remove/${id}`,
    method: 'delete'
  });
}
