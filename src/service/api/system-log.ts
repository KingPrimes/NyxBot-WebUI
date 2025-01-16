import { request } from '../request';

/** 获取指令列表 */
export function fetchGetCodesOption() {
  return request<Api.SystemLog.CodesOption[]>({
    url: '/log/codes',
    method: 'get'
  });
}

/** 获取日志详细信息 */
export function fetchGetLogInfoDetail(id: number) {
  return request<Api.SystemLog.LogInfo>({
    url: `/log/detail/${id}`,
    method: 'get'
  });
}

/** 获取日志列表 */
export function fetchGetCommandLogList(params?: Api.SystemLog.LogSearchParams) {
  return request<Api.SystemLog.LogList>({
    url: '/log/list',
    method: 'post',
    data: params
  });
}

export function fetchGetLogInfoNow() {
  return request<Api.SystemLog.LogInfoNow[]>({
    url: '/ws/log',
    method: 'get',
    headers: {
      Upgrade: 'websocket'
    }
  });
}
