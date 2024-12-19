import { transformRecordToOption } from '@/utils/common';

/** 管理员角色记录 */
export const adminRoleRecord: Record<Api.SystemConfig.AdminRoleType, string> = {
  '1': 'page.config.admin.role.superAdmin',
  '2': 'page.config.admin.role.admin',
  '3': 'page.config.admin.role.commonUser',
  '4': 'page.config.admin.role.backendUser',
  '5': 'page.config.admin.role.other'
};

/** 管理员角色选项 */
export const adminRoleOptions = transformRecordToOption(adminRoleRecord);
