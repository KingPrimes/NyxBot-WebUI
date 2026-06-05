import { request } from '../request';

const baseUrl = '/config/';

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

export function fetchGetTokenKeys() {
  return request<Api.SystemConfig.TokenKeys>({
    url: `${baseUrl}token`,
    method: 'get'
  });
}

export function fetchPostTokenKeys(params?: Api.SystemConfig.TokenKeys) {
  return request<Api.Result>({
    url: `${baseUrl}token`,
    method: 'post',
    data: params
  });
}
