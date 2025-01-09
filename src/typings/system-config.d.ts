declare namespace Api {
  namespace SystemConfig {
    interface AdminSearchParams extends Api.Common.CommonSearchParams {
      botUid?: string;
    }

    interface AdminModel {
      id?: number;
      botUid: string;
      adminUid: string;
      permissions: string;
    }

    type AdminList = App.PageData<AdminModel>;

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

    interface Permissions {
      label: string;
      value: string;
    }

    /** 好友信息 */
    interface FriendInfoResp {
      user_id?: number;
      nickname?: string;
      remark?: string;
    }
    type BotOptionList = App.PageData<BotOption>;
    type AdminOptionList = App.PageData<AdminOption>;

    interface BlacklistGroupSearchParams extends Common.CommonSearchParams {
      groupAccount?: string | null;
    }

    /** 黑名单组类型 */
    type BlacklistGroupType = '1' | '2';

    /** 黑名单组 */
    interface BlacklistGroup {
      id?: number;
      groupAccount?: string;
    }

    type BlacklistGroupList = App.PageData<BlacklistGroup>;

    interface BlacklistPersonalSearchParams extends Common.CommonSearchParams {
      personalAccount?: string;
    }

    /** 黑名单个人 */
    interface BlacklistPersonal {
      id?: number;
      personalAccount: string;
    }

    type BlacklistPersonalList = App.PageData<BlacklistPersonal>;

    interface WhitelistGroupSearchParams extends Common.CommonSearchParams {
      groupAccount?: string | null;
    }

    /** 白名单组类型 */
    type WhitelistGroupType = '1' | '2';

    /** 白名单组 */
    interface WhitelistGroup {
      id?: number;
      groupAccount: string;
    }

    type WhitelistGroupList = App.PageData<WhitelistGroup>;

    interface WhitelistPersonalSearchParams extends Common.CommonSearchParams {
      personalAccount?: string;
    }

    /** 白名单个人 */
    interface WhitelistPersonal {
      id?: number;
      personalAccount: string;
    }

    type WhitelistPersonalList = App.PageData<WhitelistPersonal>;

    interface GitHubUserProvider {
      id?: number | undefined;
      userName: string | undefined;
      passWord: string | undefined;
      gitUrl: string | undefined;
    }
  }
}
