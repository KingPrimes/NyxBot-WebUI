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
    interface Option {
      label: string;
      value: string;
    }

    /** 好友信息 */
    interface FriendInfoResp {
      user_id?: number;
      nickname?: string;
      remark?: string;
    }
    type BotOptionList = App.PageData<Option>;
    type AdminOptionList = App.PageData<Option>;

    interface BlacklistGroupSearchParams extends Common.CommonSearchParams {
      groupUid?: string | null;
    }

    /** 黑名单组 */
    interface BlacklistGroup {
      id?: number;
      botUid?: string;
      groupUid?: string;
    }

    type BlacklistGroupList = App.PageData<BlacklistGroup>;

    interface BlacklistProveSearchParams extends Common.CommonSearchParams {
      proveUid?: string;
    }

    /** 黑名单个人 */
    interface BlacklistProve {
      id?: number;
      botUid: string;
      proveUid: string;
    }

    type BlacklistProveList = App.PageData<BlacklistProve>;

    interface WhitelistGroupSearchParams extends Common.CommonSearchParams {
      groupUid?: string | null;
    }

    /** 白名单组 */
    interface WhitelistGroup {
      id?: number;
      botUid: string;
      groupUid: string;
    }

    type WhitelistGroupList = App.PageData<WhitelistGroup>;

    interface WhitelistProveSearchParams extends Common.CommonSearchParams {
      proveUid?: string;
    }

    /** 白名单个人 */
    interface WhitelistProve {
      id?: number;
      botUid: string;
      proveUid: string;
    }

    type WhitelistProveList = App.PageData<WhitelistProve>;

    interface GitHubUserProvider {
      id?: number | undefined;
      userName: string | undefined;
      passWord: string | undefined;
      gitUrl: string | undefined;
    }

    /** 机器人链接配置 */
    interface LoadingConfig {
      serverPort: number;
      isServerOrClient: boolean;
      wsClientUrl: string;
      wsServerUrl: string;
      token: string;
    }

    interface TokenKeys {
      id?: number;
      tks: string;
    }
  }
}
