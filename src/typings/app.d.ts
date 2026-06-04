/** The global namespace for the app */
declare namespace App {
  /** Page data type for paginated API responses */
  interface PageData<T> extends Api.Common.PaginatingQueryRecord<Api.Common.CommonRecord<T>> {}

  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = import("@sa/color").ColorPaletteNumber;

    /** NaiveUI theme overrides that can be specified in preset */
    type NaiveUIThemeOverride = import("naive-ui").GlobalThemeOverrides;

    /** Theme setting */
    interface ThemeSetting {
      /** Theme scheme */
      themeScheme: UnionKey.ThemeScheme;
      /** grayscale mode */
      grayscale: boolean;
      /** colour weakness mode */
      colourWeakness: boolean;
      /** Whether to recommend color */
      recommendColor: boolean;
      /** Theme color */
      themeColor: string;
      /** Theme radius */
      themeRadius: number;
      /** Other color */
      otherColor: OtherColor;
      /** Whether info color is followed by the primary color */
      isInfoFollowPrimary: boolean;
      /** Layout */
      layout: {
        /** Layout mode */
        mode: UnionKey.ThemeLayoutMode;
        /** Scroll mode */
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /** Page */
      page: {
        /** Whether to show the page transition */
        animate: boolean;
        /** Page animate mode */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** Header */
      header: {
        /** Header height */
        height: number;
        /** Header breadcrumb */
        breadcrumb: {
          /** Whether to show the breadcrumb */
          visible: boolean;
          /** Whether to show the breadcrumb icon */
          showIcon: boolean;
        };
        /** Multilingual */
        multilingual: {
          /** Whether to show the multilingual */
          visible: boolean;
        };
        globalSearch: {
          /** Whether to show the GlobalSearch */
          visible: boolean;
        };
      };
      /** Tab */
      tab: {
        /** Whether to show the tab */
        visible: boolean;
        /**
         * Whether to cache the tab
         *
         * If cache, the tabs will get from the local storage when the page is refreshed
         */
        cache: boolean;
        /** Tab height */
        height: number;
        /** Tab mode */
        mode: UnionKey.ThemeTabMode;
        /** Whether to close tab by middle click */
        closeTabByMiddleClick: boolean;
      };
      /** Fixed header and tab */
      fixedHeaderAndTab: boolean;
      /** Sider */
      sider: {
        /** Inverted sider */
        inverted: boolean;
        /** Sider width */
        width: number;
        /** Collapsed sider width */
        collapsedWidth: number;
        /** Sider width when the layout is 'vertical-mix', 'top-hybrid-sidebar-first', or 'top-hybrid-header-first' */
        mixWidth: number;
        /**
         * Collapsed sider width when the layout is 'vertical-mix', 'top-hybrid-sidebar-first', or
         * 'top-hybrid-header-first'
         */
        mixCollapsedWidth: number;
        /** Child menu width when the layout is 'vertical-mix', 'top-hybrid-sidebar-first', or 'top-hybrid-header-first' */
        mixChildMenuWidth: number;
        /** Whether to auto select the first submenu */
        autoSelectFirstMenu: boolean;
      };
      /** Footer */
      footer: {
        /** Whether to show the footer */
        visible: boolean;
        /** Whether fixed the footer */
        fixed: boolean;
        /** Footer height */
        height: number;
        /**
         * Whether float the footer to the right when the layout is 'top-hybrid-sidebar-first' or
         * 'top-hybrid-header-first'
         */
        right: boolean;
      };
      /** Watermark */
      watermark: {
        /** Whether to show the watermark */
        visible: boolean;
        /** Watermark text */
        text: string;
        /** Whether to use user name as watermark text */
        enableUserName: boolean;
        /** Whether to use current time as watermark text */
        enableTime: boolean;
        /** Time format for watermark text */
        timeFormat: string;
      };
      /** define some theme settings tokens, will transform to css variables */
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
      "base-text": string;
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
    type VNode = import("vue").VNode;
    type RouteLocationNormalizedLoaded = import("vue-router").RouteLocationNormalizedLoaded;
    type RouteKey = import("@elegant-router/types").RouteKey;
    type RouteMap = import("@elegant-router/types").RouteMap;
    type RoutePath = import("@elegant-router/types").RoutePath;
    type LastLevelRouteKey = import("@elegant-router/types").LastLevelRouteKey;

    /** The router push options */
    type RouterPushOptions = {
      query?: Record<string, string>;
      params?: Record<string, string>;
      force?: boolean;
    };

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

    type Breadcrumb = Omit<Menu, "children"> & {
      options?: Breadcrumb[];
    };

    /** Tab route */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, "name" | "path" | "meta"> &
      Partial<Pick<RouteLocationNormalizedLoaded, "fullPath" | "query" | "matched">>;

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
    type FormRule = import("naive-ui").FormItemRule;

    /** The global dropdown key */
    type DropdownKey =
      | "closeCurrent"
      | "closeOther"
      | "closeLeft"
      | "closeRight"
      | "closeAll"
      | "pin"
      | "unpin";
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type RouteKey = import("@elegant-router/types").RouteKey;

    type LangType = "en-US" | "zh-CN";

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, "root" | "not-found">;

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
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        cancel: string;
        close: string;
        check: string;
        selectAll: string;
        expandColumn: string;
        columnSetting: string;
        config: string;
        confirm: string;
        delete: string;
        deleteSuccess: string;
        confirmDelete: string;
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
        editPassword: string;
        editUsername: string;
        from: string;
        push: string;
        pushSuccess: string;
        commits: string;
        detail: string;
        restPassword: {
          success: string;
          successTip: string;
          error: string;
          errorTip: string;
          oldPassword: string;
          newPassword: string;
          confirmPassword: string;
        };
        changeUsername: {
          title: string;
          newUsername: string;
          currentPassword: string;
          success: string;
          error: string;
        };
        yesOrNo: {
          yes: string;
          no: string;
        };
        dataUpdate: {
          connecting: string;
          sseError: string;
          requestError: string;
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
        themeDrawerTitle: string;
        tabs: {
          appearance: string;
          layout: string;
          general: string;
          preset: string;
        };
        appearance: {
          themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
          grayscale: string;
          colourWeakness: string;
          themeColor: {
            title: string;
            followPrimary: string;
          } & Record<Theme.ThemeColorKey, string>;
          recommendColor: string;
          recommendColorDesc: string;
          themeRadius: {
            title: string;
          };
          preset: {
            title: string;
            apply: string;
            applySuccess: string;
            [key: string]:
              | {
                  name: string;
                  desc: string;
                }
              | string;
          };
        };
        layout: {
          layoutMode: { title: string } & Record<UnionKey.ThemeLayoutMode, string> & {
              [K in `${UnionKey.ThemeLayoutMode}_detail`]: string;
            };
          tab: {
            title: string;
            visible: string;
            cache: string;
            cacheTip: string;
            height: string;
            mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
            closeByMiddleClick: string;
            closeByMiddleClickTip: string;
          };
          header: {
            title: string;
            height: string;
            breadcrumb: {
              visible: string;
              showIcon: string;
            };
          };
          sider: {
            title: string;
            inverted: string;
            width: string;
            collapsedWidth: string;
            mixWidth: string;
            mixCollapsedWidth: string;
            mixChildMenuWidth: string;
            autoSelectFirstMenu: string;
            autoSelectFirstMenuTip: string;
          };
          footer: {
            title: string;
            visible: string;
            fixed: string;
            height: string;
            right: string;
          };
          content: {
            title: string;
            scrollMode: { title: string; tip: string } & Record<UnionKey.ThemeScrollMode, string>;
            page: {
              animate: string;
              mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
            };
            fixedHeaderAndTab: string;
          };
        };
        general: {
          title: string;
          watermark: {
            title: string;
            visible: string;
            text: string;
            enableUserName: string;
            enableTime: string;
            timeFormat: string;
          };
          multilingual: {
            title: string;
            visible: string;
          };
          globalSearch: {
            title: string;
            visible: string;
          };
        };
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey | string, string>;
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
          title: string;
          command: {
            title: string;
            id: string;
            moduleName: string;
            command: string;
            botQQ: string;
            groupQQ: string;
            triggerQQ: string;
            operateTime: string;
            titles: string;
            titlesPlaceholder: string;
            commandPlaceholder: string;
            groupQQPlaceholder: string;
          };
          realtime: {
            title: string;
            connected: string;
            connecting: string;
            disconnected: string;
            connectionError: string;
            clearConfirm: string;
            exportSuccess: string;
            searchPlaceholder: string;
            filterBtn: string;
            stats: string;
            export: string;
            clear: string;
            noLogs: string;
            total: string;
            displayed: string;
            cacheSize: string;
            filterPanel: {
              title: string;
              enable: string;
              minLevel: string;
              includeKeywords: string;
              excludeKeywords: string;
              keywordPlaceholder: string;
              includePackages: string;
              excludePackages: string;
              packagePlaceholder: string;
              includeThreads: string;
              threadPlaceholder: string;
              useRegex: string;
              reset: string;
              apply: string;
            };
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
          admin: {
            title: string;
            botUid: string;
            userUid: string;
            userPermission: string;
            groupId: string;
            addAdmin: string;
            editAdmin: string;
            searchNamePlaceholder: string;
            botAccount: string;
            adminAccount: string;
            roles: {
              roleName: string;
            };
            inputAdminQQ: string;
            optionsOrinput: string;
          };
          blacklist: {
            title: string;
            group: {
              title: string;
              groupId: string;
              groupName: string;
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
          whitelist: {
            title: string;
            group: {
              title: string;
              groupId: string;
              groupName: string;
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
          group: {
            inputGroupId: string;
            optionsOrinput: string;
          };
          service: {
            title: string;
            restartTip: string;
            form: {
              pluginPrefix: string;
              port: string;
              portPlaceholder: string;
              switchTo: string;
              urlPlaceholder: string;
              client: string;
              server: string;
            };
          };
        };
        "local-data": {
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
            "lich-sister": {
              title: string;
              name: string;
              slug: string;
              reqMasteryRank: string;
              gameRef: string;
            };
            "night-wave": {
              title: string;
              uniqueName: string;
              name: string;
              description: string;
              standing: string;
              required: string;
            };
            nodes: {
              title: string;
              uniqueName: string;
              name: string;
              systemName: string;
              masteryReq: string;
              missionIndex: string;
              factionIndex: string;
              minEnemyLevel: string;
              maxEnemyLevel: string;
              addNodes: string;
              editNodes: string;
            };
            market: {
              title: string;
              itemName: string;
              slug: string;
              ducats: string;
              maxRank: string;
              vaulted: string;
              addMarket: string;
              editMarket: string;
              itemNamePlaceholder: string;
              imageUrl: string;
              imageUrlPlaceholder: string;
            };
            "market-riven": {
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
              imageThumb: string;
              imageSource: string;
              imageSourcePlaceholder: string;
              animation: string;
              animationPlaceholder: string;
              addPhantom: string;
              editPhantom: string;
            };
            "riven-analyse": {
              title: string;
              name: string;
              prefix: string;
              suffix: string;
              rifle: string;
              shotgun: string;
              pistol: string;
              melle: string;
              archwing: string;
            };
            "riven-tion": {
              title: string;
              effect: string;
              group: string;
              prefix: string;
              suffix: string;
              units: string;
              urlName: string;
              exclusiveTo: string;
              addRivenTion: string;
              editRivenTion: string;
            };
            "riven-tion-alias": {
              title: string;
              en: string;
              cn: string;
              addRivenTionAlias: string;
              editRivenTionAlias: string;
            };
            "state-translation": {
              title: string;
              uniqueName: string;
              name: string;
              description: string;
              type: string;
              parentName: string;
              addStateTranslation: string;
              editStateTranslation: string;
            };
            relics: {
              title: string;
              uniqueName: string;
              name: string;
              rewards: string;
            };
            warframes: {
              title: string;
              uniqueName: string;
              name: string;
              health: string;
              shield: string;
              armor: string;
              power: string;
              masteryReq: string;
              sprintSpeed: string;
              description: string;
              abilityName: string;
              abilityDesc: string;
            };
            weapons: {
              title: string;
              name: string;
              uniqueName: string;
              totalDamage: string;
              criticalChance: string;
              procChance: string;
              fireRate: string;
              masteryReq: string;
              productCategory: string;
            };
            "reward-pool": {
              title: string;
              uniqueName: string;
              rewards: string;
              addRewardPool: string;
              editRewardPool: string;
            };
            subscription: {
              title: string;
              groupName: string;
              userList: string;
              typeList: string;
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
              invasionReward: string;
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
      config: {
        service: {
          form: {
            portError: string;
          };
        };
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
        fixed: {
          left: string;
          right: string;
          unFixed: string;
        };
      };
    };

    type GetI18nKey<
      T extends Record<string, unknown>,
      K extends keyof T = keyof T,
    > = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never;

    type I18nKey = GetI18nKey<Schema>;

    type TranslateOptions<Locales extends string> = import("vue-i18n").TranslateOptions<Locales>;

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
    type OtherBaseURLKey = "demo";

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

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, "baseURL"> {
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
