import { computed } from 'vue';
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
  return request<null>({
    url: `${baseUrl}/admin/save`,
    method: 'post',
    data: params
  });
}

/** 获取机器人的好友列表 */
export function fetchGetAllAdminOptionList(botUid: number) {
  return request<Api.SystemConfig.FriendInfoResp[]>({
    url: `${baseUrl}/admin/friend/${botUid}`,
    method: 'get'
  });
}

/** 获取权限Map */
export function fetchGetPermissionsMap() {
  return request<any>({
    url: `${baseUrl}/admin/permissions`,
    method: 'get'
  }).then(res => {
    return computed(() => {
      res.data.map((item: any) => {
        return {
          label: item.name,
          value: item.id
        };
      });
    });
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
  return request<Api.SystemConfig.BlacklistGroupList>({
    url: '/systemConfig/getBlacklistGroupList',
    method: 'get',
    params
  });
}

/** 获取黑名单个人列表 */
export function fetchGetBlacklistPersonalList(params?: Api.SystemConfig.BlacklistPersonalSearchParams) {
  return request<Api.SystemConfig.BlacklistPersonalList>({
    url: '/systemConfig/getBlacklistPersonalList',
    method: 'get',
    params
  });
}

/** 获取白名单群组列表 */
export function fetchGetWhitelistGroupList(params?: Api.SystemConfig.WhitelistGroupSearchParams) {
  return request<Api.SystemConfig.WhitelistGroupList>({
    url: '/systemConfig/getWhitelistGroupList',
    method: 'get',
    params
  });
}

/** 获取白名单个人列表 */
export function fetchGetWhitelistPersonalList(params?: Api.SystemConfig.WhitelistPersonalSearchParams) {
  return request<Api.SystemConfig.WhitelistPersonalList>({
    url: '/systemConfig/getWhitelistPersonalList',
    method: 'get',
    params
  });
}

export function fetchGetGitUserPriovider() {
  return request<Api.SystemConfig.GitHubUserProvider>({
    url: '/config/git',
    method: 'get'
  });
}

export function fetchPostGitUserPriovider(params?: Api.SystemConfig.GitHubUserProvider) {
  return request<Api.LocalData.Result>({
    url: '/config/git',
    method: 'post',
    data: params
  });
}
