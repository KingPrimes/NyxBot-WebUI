import { request } from '../request';

/** 获取指令列表 */
export function fetchGetCodesOption() {
  return request<Api.SystemLog.CodesOption[]>({
    url: '/log/codes',
    method: 'get'
  });
}
export function fetchGetLogInfoDetail(id: number) {
  return request<Api.SystemLog.LogInfo>({
    url: `/log/detail/${id}`,
    method: 'get'
  });
}

/** 获取实时日志列表 */
export function fetchGetCommandLogList(params?: Api.SystemLog.LogSearchParams) {
  return request<Api.SystemLog.LogList>({
    url: '/log/list',
    method: 'post',
    data: params
  });
}
