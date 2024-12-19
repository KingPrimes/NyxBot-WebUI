declare namespace Api {
  namespace SystemConfig {
    interface AdminSearchParams {
      role?: string;
    }

    /** 管理员权限类型 */
    type AdminRoleType = '1' | '2' | '3' | '4' | '5';

    interface AdminModel {
      id?: string | number;
      botAccount: string;
      adminAccount: string;
      role: AdminRoleType | null;
    }

    interface Admin extends Required<AdminModel> {
      createTime: string;
      updateTime: string;
    }

    type AdminList = App.PageData<Admin>;

    /** 机器人 下拉选项 */
    interface BotOption {
      label: string;
      value: string;
    }
    /** 管理员 下拉选项 */
    interface AdminOption {
      label: string;
      value: string;
    }

    type BotOptionList = App.PageData<BotOption>;
    type AdminOptionList = App.PageData<AdminOption>;

    interface BlacklistGroupSearchParams {
      groupAccount?: string;
    }

    /** 黑名单组类型 */
    type BlacklistGroupType = '1' | '2';

    /** 黑名单组 */
    interface BlacklistGroup {
      id?: string | number;
      groupAccount: string;
    }

    interface BlacklistPersonalSearchParams {
      personalAccount?: string;
    }

    /** 黑名单个人 */
    interface BlacklistPersonal {
      id?: string | number;
      personalAccount: string;
    }

    interface WhitelistGroupSearchParams {
      groupAccount?: string;
    }

    /** 白名单组类型 */
    type WhitelistGroupType = '1' | '2';

    /** 白名单组 */
    interface WhitelistGroup {
      id?: string | number;
      groupAccount: string;
    }

    interface WhitelistPersonalSearchParams {
      personalAccount?: string;
    }

    /** 白名单个人 */
    interface WhitelistPersonal {
      id?: string | number;
      personalAccount: string;
    }
  }
}
