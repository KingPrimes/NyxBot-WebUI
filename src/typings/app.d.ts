/** The global namespace for the app */
declare namespace App {
  interface PageData<T> extends Api.Common.PaginatingQueryRecord<Api.Common.CommonRecord<T>> {
    data: T;
  }
  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color').ColorPaletteNumber;

    /** Theme setting */
    /** 主题设置接口定义 该接口包含应用程序中所有与主题相关的配置选项 */
    interface ThemeSetting {
      /** 主题方案 (亮色/暗色/跟随系统) */
      themeScheme: UnionKey.ThemeScheme;
      /** 灰度模式开关 */
      grayscale: boolean;
      /** 色弱模式开关 */
      colourWeakness: boolean;
      /** 是否使用推荐颜色 */
      recommendColor: boolean;
      /** 主题主色 */
      themeColor: string;
      /** 其他辅助颜色配置 */
      otherColor: OtherColor;
      /** 信息颜色是否跟随主色 */
      isInfoFollowPrimary: boolean;
      /** 重置缓存策略 */
      resetCacheStrategy: UnionKey.ResetCacheStrategy;
      /** 布局相关配置 */
      layout: {
        /** 布局模式 */
        mode: UnionKey.ThemeLayoutMode;
        /** 滚动模式 */
        scrollMode: UnionKey.ThemeScrollMode;
        /**
         * 是否反转水平混合布局
         *
         * 如果为true，则左侧显示垂直子级菜单，顶部显示水平一级菜单
         */
        reverseHorizontalMix: boolean;
      };
      /** 页面相关配置 */
      page: {
        /** 是否显示页面过渡动画 */
        animate: boolean;
        /** 页面动画模式 */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** 头部相关配置 */
      header: {
        /** 头部高度 */
        height: number;
        /** 头部面包屑配置 */
        breadcrumb: {
          /** 是否显示面包屑 */
          visible: boolean;
          /** 是否显示面包屑图标 */
          showIcon: boolean;
        };
        /** 多语言配置 */
        multilingual: {
          /** 是否显示多语言切换 */
          visible: boolean;
        };
      };
      /** 标签页相关配置 */
      tab: {
        /** 是否显示标签页 */
        visible: boolean;
        /**
         * 是否缓存标签页
         *
         * 如果缓存，页面刷新时会从本地存储中恢复标签页状态
         */
        cache: boolean;
        /** 标签页高度 */
        height: number;
        /** 标签页模式 */
        mode: UnionKey.ThemeTabMode;
      };
      /** 是否固定头部和标签页 */
      fixedHeaderAndTab: boolean;
      /** 侧边栏相关配置 */
      sider: {
        /** 反转侧边栏样式 */
        inverted: boolean;
        /** 侧边栏宽度 */
        width: number;
        /** 折叠后的侧边栏宽度 */
        collapsedWidth: number;
        /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时的侧边栏宽度 */
        mixWidth: number;
        /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时折叠后的侧边栏宽度 */
        mixCollapsedWidth: number;
        /** 当布局为 'vertical-mix' 或 'horizontal-mix' 时的子菜单宽度 */
        mixChildMenuWidth: number;
      };
      /** 页脚相关配置 */
      footer: {
        /** 是否显示页脚 */
        visible: boolean;
        /** 是否固定页脚 */
        fixed: boolean;
        /** 页脚高度 */
        height: number;
        /** 当布局为 'horizontal-mix' 时是否将页脚右浮动 */
        right: boolean;
      };
      /** 水印相关配置 */
      watermark: {
        /** 是否显示水印 */
        visible: boolean;
        /** 水印文本 */
        text: string;
      };
      /** 主题设置令牌定义，将转换为CSS变量 */
      tokens: {
        light: ThemeSettingToken;
        dark?: {
          [K in keyof ThemeSettingToken]?: Partial<ThemeSettingToken[K]>;
        };
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeSettingTokenColor {
      /** the progress bar color, if not set, will use the primary color */
      nprogress?: string;
      container: string;
      layout: string;
      inverted: string;
      'base-text': string;
    }

    interface ThemeSettingTokenBoxShadow {
      header: string;
      sider: string;
      tab: string;
    }

    interface ThemeSettingToken {
      colors: ThemeSettingTokenColor;
      boxShadow: ThemeSettingTokenBoxShadow;
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor;

    /** Theme token CSS variables */
    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string };
      boxShadow: ThemeSettingTokenBoxShadow & { [key: string]: string };
    };
  }

  /** Global namespace */
  namespace Global {
    type VNode = import('vue').VNode;
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;
    type RouteKey = import('@elegant-router/types').RouteKey;
    type RouteMap = import('@elegant-router/types').RouteMap;
    type RoutePath = import('@elegant-router/types').RoutePath;
    type LastLevelRouteKey = import('@elegant-router/types').LastLevelRouteKey;

    /** The global header props */
    interface HeaderProps {
      /** Whether to show the logo */
      showLogo?: boolean;
      /** Whether to show the menu toggler */
      showMenuToggler?: boolean;
      /** Whether to show the menu */
      showMenu?: boolean;
    }

    /** The global menu */
    type Menu = {
      /**
       * The menu key
       *
       * Equal to the route key
       */
      key: string;
      /** The menu label */
      label: string;
      /** The menu i18n key */
      i18nKey?: I18n.I18nKey | null;
      /** The route key */
      routeKey: RouteKey;
      /** The route path */
      routePath: RoutePath;
      /** The menu icon */
      icon?: () => VNode;
      /** The menu children */
      children?: Menu[];
    };

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };

    /** Tab route */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>>;

    /** The global tab */
    type Tab = {
      /** The tab id */
      id: string;
      /** The tab label */
      label: string;
      /**
       * The new tab label
       *
       * If set, the tab label will be replaced by this value
       */
      newLabel?: string;
      /**
       * The old tab label
       *
       * when reset the tab label, the tab label will be replaced by this value
       */
      oldLabel?: string;
      /** The tab route key */
      routeKey: LastLevelRouteKey;
      /** The tab route path */
      routePath: RouteMap[LastLevelRouteKey];
      /** The tab route full path */
      fullPath: string;
      /** The tab fixed index */
      fixedIndex?: number | null;
      /**
       * Tab icon
       *
       * Iconify icon
       */
      icon?: string;
      /**
       * Tab local icon
       *
       * Local icon
       */
      localIcon?: string;
      /** I18n key */
      i18nKey?: I18n.I18nKey | null;
    };

    /** Form rule */
    type FormRule = import('naive-ui').FormItemRule;

    /** The global dropdown key */
    type DropdownKey = 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      system: {
        title: string;
        updateTitle: string;
        updateContent: string;
        updateConfirm: string;
        updateCancel: string;
      };
      common: {
        action: string;
        add: string;
        detail: string;
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        cancel: string;
        close: string;
        check: string;
        expandColumn: string;
        columnSetting: string;
        config: string;
        confirm: string;
        delete: string;
        deleteSuccess: string;
        confirmDelete: string;
        editPassword: string;
        edit: string;
        warning: string;
        error: string;
        index: string;
        keywordSearch: string;
        logout: string;
        logoutConfirm: string;
        lookForward: string;
        modify: string;
        modifySuccess: string;
        noData: string;
        operate: string;
        pleaseCheckValue: string;
        refresh: string;
        reset: string;
        search: string;
        switch: string;
        tip: string;
        trigger: string;
        update: string;
        updateSuccess: string;
        userCenter: string;
        push: string;
        commits: string;
        pushSuccess: string;
        yesOrNo: {
          yes: string;
          no: string;
        };
        restPassword: {
          success: string;
          successTip: string;
          error: string;
          errorTip: string;
          oldPassword: string;
          newPassword: string;
          confirmPassword: string;
        };
        from: {
          urlError: string;
        };
      };
      request: {
        logout: string;
        logoutMsg: string;
        logoutWithModal: string;
        logoutWithModalMsg: string;
        refreshToken: string;
        tokenExpired: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        grayscale: string;
        colourWeakness: string;
        layoutMode: { title: string; reverseHorizontalMix: string } & Record<UnionKey.ThemeLayoutMode, string>;
        recommendColor: string;
        recommendColorDesc: string;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
          multilingual: {
            visible: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
        };
        watermark: {
          visible: string;
          text: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        resetCacheStrategy: { title: string } & Record<UnionKey.ResetCacheStrategy, string>;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        login: {
          common: {
            loginOrRegister: string;
            userNamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            forgetPassword: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            superAdmin: string;
            admin: string;
            user: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            reGetCode: string;
            sendCodeSuccess: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
          };
          bindWeChat: {
            title: string;
          };
        };
        home: {
          branchDesc: string;
          greeting: string;
          weatherDesc: string;
          projectCount: string;
          todo: string;
          message: string;
          downloadCount: string;
          registerCount: string;
          schedule: string;
          study: string;
          work: string;
          rest: string;
          entertainment: string;
          visitCount: string;
          turnover: string;
          dealCount: string;
          projectNews: {
            title: string;
            moreNews: string;
            desc1: string;
            desc2: string;
            desc3: string;
            desc4: string;
            desc5: string;
          };
          creativity: string;
        };
        log: {
          command: {
            title: string;
            id: string;
            moduleName: string;
            titles: string;
            titlesPlaceholder: string;
            command: string;
            commandPlaceholder: string;
            botQQ: string;
            groupQQ: string;
            groupQQPlaceholder: string;
            triggerQQ: string;
            operateTime: string;
          };
          loginfo: {
            title: string;
            codes: string;
            permissions: string;
            businessType: string;
            botUid: string;
            groupUid: string;
            userUid: string;
            rawMsg: string;
            url: string;
            method: string;
            requestMethod: string;
            runTime: string;
            param: string;
            result: string;
            status: string;
            errorMsg: string;
            logTime: string;
          };
        };
        config: {
          title: string;
          git: {
            title: string;
            form: {
              account: string;
              accountPlaceholder: string;
              token: string;
              tokenPlaceholder: string;
              url: string;
              urlPlaceholder: string;
            };
          };
          service: {
            title: string;
            restartTip: string;
            form: {
              port: string;
              portPlaceholder: string;
              portError: string;
              client: string;
              server: string;
              switchTo: string;
              urlPlaceholder: string;
            };
          };
          admin: {
            title: string;
            botAccount: string;
            adminAccount: string;
            status: string;
            role: string;
            addAdmin: string;
            editAdmin: string;
            inputAdminQQ: string;
            optionsOrinput: string;
            form: {
              botAccount: string;
              adminAccount: string;
              status: string;
              role: string;
            };
            roles: {
              superAdmin: string;
              admin: string;
              commonUser: string;
              backendUser: string;
              other: string;
              placeholder: string;
              roleName: string;
            };
          };
          blacklist: {
            group: {
              title: string;
              groupAccount: string;
              addBlacklistGroup: string;
              editBlacklistGroup: string;
              placeholder: string;
            };
            personal: {
              title: string;
              personalAccount: string;
              addBlacklistPersonal: string;
              editBlacklistPersonal: string;
              placeholder: string;
            };
          };
          group: {
            inputGroupId: string;
            optionsOrinput: string;
          };
          whitelist: {
            group: {
              title: string;
              groupAccount: string;
              addWhitelistGroup: string;
              editWhitelistGroup: string;
              placeholder: string;
            };
            personal: {
              title: string;
              personalAccount: string;
              addWhitelistPersonal: string;
              editWhitelistPersonal: string;
              placeholder: string;
            };
          };
        };
        'local-data': {
          warframe: {
            alias: {
              title: string;
              englishName: string;
              chineseName: string;
              addAlias: string;
              editAlias: string;
              englishNamePlaceholder: string;
              chineseNamePlaceholder: string;
            };
            market: {
              title: string;
              itemName: string;
              addMarket: string;
              editMarket: string;
              itemNamePlaceholder: string;
              imageUrl: string;
              imageUrlPlaceholder: string;
            };
            'market-riven': {
              title: string;
              itemName: string;
              itemNamePlaceholder: string;
              rivenType: string;
              rivenTypePlaceholder: string;
              group: string;
              groupPlaceholder: string;
              rankLimit: string;
              rankLimitPlaceholder: string;
              imageUrl: string;
              imageUrlPlaceholder: string;
              addMarketRiven: string;
              editMarketRiven: string;
            };
            phantom: {
              title: string;
              itemName: string;
              itemNamePlaceholder: string;
              urlName: string;
              urlNamePlaceholder: string;
              iconLink: string;
              iconLinkPlaceholder: string;
              imageSource: string;
              imageSourcePlaceholder: string;
              animation: string;
              animationPlaceholder: string;
              addPhantom: string;
              editPhantom: string;
            };
            'riven-trend': {
              title: string;
              itemName: string;
              itemNamePlaceholder: string;
              itemEnName: string;
              itemEnNamePlaceholder: string;
              newDisposition: string;
              newDispositionPlaceholder: string;
              oldDisposition: string;
              oldDispositionPlaceholder: string;
              weaponType: string;
              weaponTypePlaceholder: string;
              addRiven: string;
              editRiven: string;
              updateTime: string;
            };
            translation: {
              title: string;
              english: string;
              englishPlaceholder: string;
              chinese: string;
              chinesePlaceholder: string;
              addTranslation: string;
              editTranslation: string;
              isPrime: string;
              isSet: string;
            };
            untranslated: {
              title: string;
              text: string;
              textPlaceholder: string;
              english: string;
              englishPlaceholder: string;
              addUntranslated: string;
              editUntranslated: string;
            };
            subscription: {
              id: string;
              subGroup: string;
              subBotUid: string;
              userDetail: string;
              userId: string;
              userName: string;
              typeDetail: string;
              subscribe: string;
              missionTypeEnum: string;
              tierNum: string;
              title: string;
              groupName: string;
              userList: string;
              typeList: string;
            };
          };
        };
        git: {
          title: string;
          form: {
            account: string;
            accountPlaceholder: string;
            token: string;
            tokenPlaceholder: string;
            url: string;
            urlPlaceholder: string;
          };
        };
      };
      form: {
        required: string;
        userName: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        confirmPwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
        qq: FormMsg;
        groupUid: FormMsg;
      };
      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
      };
      datatable: {
        itemCount: string;
      };
      config: {
        service: {
          form: {
            portError: string;
          };
        };
      };
    };

    type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

    interface $T {
      (key: I18nKey): string;
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
      (key: I18nKey, list: unknown[], plural: number): string;
      (key: I18nKey, list: unknown[], defaultMsg: string): string;
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
      (key: I18nKey, named: Record<string, unknown>, plural: number): string;
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
    }
  }

  /** Service namespace */
  namespace Service {
    /** Other baseURL key */
    type OtherBaseURLKey = 'demo';

    interface ServiceConfigItem {
      /** The backend service base url */
      baseURL: string;
      /** The proxy pattern of the backend service base url */
      proxyPattern: string;
    }

    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }

    /** The backend service config */
    interface ServiceConfig extends ServiceConfigItem {
      /** Other backend service config */
      other: OtherServiceConfigItem[];
    }

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>;
    }

    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: string;
      /** The backend service response message */
      msg: string;
      /** The backend service response data */
      data: T;
    };

    /** The demo backend service response data */
    type DemoResponse<T = unknown> = {
      /** The backend service response code */
      status: string;
      /** The backend service response message */
      message: string;
      /** The backend service response data */
      result: T;
    };
  }
}
