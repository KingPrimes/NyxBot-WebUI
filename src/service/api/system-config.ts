import { request } from '../request';

const baseUrl = '/config/';

/** 获取Git配置 */
export function fetchGetGitUserPriovider() {
  return request<Api.SystemConfig.GitHubUserProvider>({
    url: `${baseUrl}git`,
    method: 'get'
  });
}

/** 修改Git配置 */
export function fetchPostGitUserPriovider(params?: Api.SystemConfig.GitHubUserProvider) {
  return request<Api.Result>({
    url: `${baseUrl}git`,
    method: 'post',
    data: params
  });
}

/** 获取链接配置 */
export function fetchGetLoadingConfig() {
  return request<Api.SystemConfig.LoadingConfig>({
    url: `${baseUrl}loading`,
    method: 'get'
  });
}

/** 修改链接配置 */
export function fetchPostLoadingConfig(params?: Api.SystemConfig.LoadingConfig) {
  return request<Api.Result>({
    url: `${baseUrl}loading`,
    method: 'post',
    data: params
  });
}
