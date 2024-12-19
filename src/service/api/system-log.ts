import { request } from '../request';

/** 获取实时日志列表 */
export function fetchGetRealTimeLogList(params?: Api.SystemLog.LogSearchParams) {
  return request<Api.SystemLog.LogList>({
    url: '/systemLog/getRealTimeLogList',
    method: 'get',
    params
  });
}

/** 获取指令日志列表 */
export function fetchGetCommandLogList(params?: Api.SystemLog.LogSearchParams) {
  return request<Api.SystemLog.CommandLogList>({
    url: '/systemLog/getCommandLogList',
    method: 'get',
    params
  });
}
