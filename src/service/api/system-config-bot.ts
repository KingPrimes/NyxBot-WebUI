import { request } from '../request';

const baseUrl = '/config/bot';

/** 获取机器人的好友列表 */
export function fetchGetAllAdminOptionList(botUid: number) {
  return request<Api.SystemConfig.FriendInfoResp[]>({
    url: `${baseUrl}/friend/${botUid}`,
    method: 'get'
  });
}

/** 获取所有权限 */
export function fetchGetAllPermissionOptionList() {
  return request<Api.SystemConfig.Option[]>({
    url: `${baseUrl}/admin/permissions`,
    method: 'get'
  });
}

/** 获取机器人列表 */
export function fetchGetAllBotsOptionList() {
  return request<Api.SystemConfig.Option[]>({
    url: `${baseUrl}/bots`,
    method: 'get'
  });
}

/** 获取好友列表 */
export function fetchGetAllBotsFriendsOptionList(botUid: string) {
  return request<Api.SystemConfig.Option[]>({
    url: `${baseUrl}/friend/${botUid}`,
    method: 'get'
  });
}

/** 获取群列表 */
export function fetchGetAllGroupOptionList(botUid: string) {
  return request<Api.SystemConfig.Option[]>({
    url: `${baseUrl}/group/${botUid}`,
    method: 'get'
  });
}
