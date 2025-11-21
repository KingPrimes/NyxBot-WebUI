const local: App.I18n.Schema = {
  system: {
    title: 'NyxBotAdmin',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    detail: 'Detail',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    delete: 'Delete',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    editPassword: 'Edit Password',
    edit: 'Edit',
    warning: 'Warning',
    error: 'Error',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    userCenter: 'User Center',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    restPassword: {
      success: 'reset password success',
      successTip: 'reset password success, please login again',
      error: 'reset password failed',
      errorTip: 'reset password failed, please try again later',
      oldPassword: 'old password',
      newPassword: 'new password',
      confirmPassword: 'confirm password'
    },
    from: {
      urlError: "url can't be empty"
    },
    push: 'push',
    pushSuccess: 'push success',
    commits: 'commits'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark'
    },
    grayscale: 'Grayscale',
    colourWeakness: 'Colour Weakness',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode',
      reverseHorizontalMix: 'Reverse first level menus and child level menus position'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      },
      multilingual: {
        visible: 'Display multilingual button'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tag Bar Info Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    watermark: {
      visible: 'Watermark Full Screen Visible',
      text: 'Watermark Text'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    resetCacheStrategy: {
      title: 'Reset Cache Strategy',
      close: 'Close Page',
      refresh: 'Refresh Page'
    },
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    config: 'Config',
    config_admin: 'Admin',
    config_blacklist_group: 'Blacklist Group',
    config_blacklist_personal: 'Blacklist Personal',
    config_blacklist: 'Black List',
    config_whitelist: 'White List',
    'local-data': 'Local Data',
    'local-data_warframe': 'Data Warframe',
    log: 'Log',
    config_service: 'Service',
    config_whitelist_group: 'Whitelist Group',
    config_whitelist_personal: 'Whitelist Personal',
    'local-data_warframe_alias': 'Warframe Alias',
    'local-data_warframe_market-riven': 'Warframe Market Riven',
    'local-data_warframe_market': 'Warframe Market',
    'local-data_warframe_subscription': 'Warframe Subscription',
    log_command: 'Log Command',
    'log_real-time': 'Log Real-time',
    'rest-password': 'rest password',
    document: 'Document',
    reward: 'Appreciation'
  },
  page: {
    login: {
      common: {
        loginOrRegister: 'Login / Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember me',
        forgetPassword: 'Forget password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      },
      codeLogin: {
        title: 'Verification Code Login',
        getCode: 'Get verification code',
        reGetCode: 'Reacquire after {time}s',
        sendCodeSuccess: 'Verification code sent successfully',
        imageCodePlaceholder: 'Please enter image verification code'
      },
      register: {
        title: 'Register',
        agreement: 'I have read and agree to',
        protocol: '《User Agreement》',
        policy: '《Privacy Policy》'
      },
      resetPwd: {
        title: 'Reset Password'
      },
      bindWeChat: {
        title: 'Bind WeChat'
      }
    },
    home: {
      branchDesc:
        'For the convenience of everyone in developing and updating the merge, we have streamlined the code of the main branch, only retaining the homepage menu, and the rest of the content has been moved to the example branch for maintenance. The preview address displays the content of the example branch.',
      greeting: 'Good morning, {userName}, today is another day full of vitality!',
      weatherDesc: 'Today is cloudy to clear, 20℃ - 25℃!',
      projectCount: 'Project Count',
      todo: 'Todo',
      message: 'Message',
      downloadCount: 'Download Count',
      registerCount: 'Register Count',
      schedule: 'Work and rest Schedule',
      study: 'Study',
      work: 'Work',
      rest: 'Rest',
      entertainment: 'Entertainment',
      visitCount: 'Visit Count',
      turnover: 'Turnover',
      dealCount: 'Deal Count',
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    log: {
      command: {
        title: 'Command Log',
        id: 'Log ID',
        moduleName: 'Module Name',
        command: 'Command',
        commandPlaceholder: 'Please enter the command',
        botQQ: 'Bot QQ',
        groupQQ: 'QQ Group',
        groupQQPlaceholder: 'Please enter the QQ group',
        triggerQQ: 'Trigger QQ',
        operateTime: 'Operation Time',
        titles: 'Module Name',
        titlesPlaceholder: 'Please enter the module name'
      },
      loginfo: {
        title: 'Module',
        codes: 'Codes',
        permissions: 'Permissions',
        businessType: 'Business Type',
        botUid: 'Bot Uid',
        groupUid: 'Group Uid',
        userUid: 'User Uid',
        rawMsg: 'Raw Msg',
        url: 'Url',
        method: 'Method',
        requestMethod: 'Request Method',
        runTime: 'Run Time',
        param: 'Param',
        result: 'Result',
        status: 'Status',
        errorMsg: 'Error Msg',
        logTime: 'Log Time'
      }
    },
    config: {
      title: 'System Configuration',
      git: {
        title: 'Configure Git Account',
        form: {
          account: 'Git Account',
          accountPlaceholder: 'Please enter the Git account name',
          token: 'Git Token',
          tokenPlaceholder: 'Please enter the Git token',
          url: 'DataSource Repository URL',
          urlPlaceholder: 'Please enter the DataSource repository URL'
        }
      },
      service: {
        title: 'Configure Service',
        restartTip: 'Changes need to restart the service to take effect',
        form: {
          port: 'Port',
          portPlaceholder: 'Please enter the port number',
          portError: 'Port number must be between 1-65535',
          client: 'Client',
          server: 'Server',
          switchTo: 'Switch to {type}',
          urlPlaceholder: 'Please enter the {type} URL'
        }
      },
      admin: {
        title: 'Administrator List',
        botAccount: 'Bot Account',
        adminAccount: 'Administrator Account',
        status: 'Status',
        role: 'Permissions',
        addAdmin: 'Add Administrator',
        editAdmin: 'Edit Administrator',
        inputAdminQQ: 'Input Administrator QQ',
        optionsOrinput: 'Options or input administrator QQ',
        form: {
          botAccount: 'Please enter the bot account',
          adminAccount: 'Please enter the administrator account',
          status: 'Please select the status',
          role: 'Please select the permissions'
        },
        roles: {
          superAdmin: 'Super Administrator',
          admin: 'Administrator',
          commonUser: 'Common User',
          backendUser: 'Backend User',
          other: 'Other User',
          placeholder: 'Please select the role',
          roleName: 'Role Name'
        }
      },
      blacklist: {
        group: {
          title: 'Blacklist Group List',
          groupAccount: 'Group Account',
          addBlacklistGroup: 'Add Blacklist Group',
          editBlacklistGroup: 'Edit Blacklist Group',
          placeholder: 'Please select the group account'
        },
        personal: {
          title: 'Blacklist Personal List',
          personalAccount: 'Personal Account',
          addBlacklistPersonal: 'Add Blacklist Personal',
          editBlacklistPersonal: 'Edit Blacklist Personal',
          placeholder: 'Please select the personal account'
        }
      },
      whitelist: {
        group: {
          title: 'Whitelist Group List',
          groupAccount: 'Group Account',
          addWhitelistGroup: 'Add Whitelist Group',
          editWhitelistGroup: 'Edit Whitelist Group',
          placeholder: 'Please select the group account'
        },
        personal: {
          title: 'Whitelist Personal List',
          personalAccount: 'Personal Account',
          addWhitelistPersonal: 'Add Whitelist Personal',
          editWhitelistPersonal: 'Edit Whitelist Personal',
          placeholder: 'Please select the personal account'
        }
      },
      group: {
        inputGroupId: 'Input Group ID',
        optionsOrinput: 'Options or input group account'
      }
    },
    'local-data': {
      warframe: {
        alias: {
          title: 'Alias List',
          englishName: 'English Name',
          chineseName: 'Chinese Name',
          addAlias: 'Add Alias',
          editAlias: 'Edit Alias',
          englishNamePlaceholder: 'Please enter the English name',
          chineseNamePlaceholder: 'Please enter the Chinese name'
        },
        market: {
          title: 'Market',
          itemName: 'Item Name',
          addMarket: 'Add Market',
          editMarket: 'Edit Market',
          itemNamePlaceholder: 'Please enter the item name',
          imageUrl: 'Image URL',
          imageUrlPlaceholder: 'Please enter the image URL'
        },
        'market-riven': {
          title: 'Market Riven',
          itemName: 'Item Name',
          itemNamePlaceholder: 'Please enter the item name',
          rivenType: 'Riven Type',
          rivenTypePlaceholder: 'Please enter the Riven type',
          group: 'Group',
          groupPlaceholder: 'Please enter the group',
          rankLimit: 'Rank Limit',
          rankLimitPlaceholder: 'Please enter the rank limit',
          imageUrl: 'Image URL',
          imageUrlPlaceholder: 'Please enter the image URL',
          addMarketRiven: 'Add Riven Data',
          editMarketRiven: 'Edit Riven Data'
        },
        phantom: {
          title: 'Phantom',
          itemName: 'Item Name',
          itemNamePlaceholder: 'Please enter the item name',
          urlName: 'URL Name',
          urlNamePlaceholder: 'Please enter the URL name',
          iconLink: 'Icon Link',
          iconLinkPlaceholder: 'Please enter the icon link',
          imageSource: 'Image Source',
          imageSourcePlaceholder: 'Please enter the image source',
          animation: 'Animation',
          animationPlaceholder: 'Please enter the animation',
          addPhantom: 'Add Phantom Data',
          editPhantom: 'Edit Phantom Data'
        },
        'riven-trend': {
          title: 'Riven Trend',
          itemName: 'Item Name',
          itemNamePlaceholder: 'Please enter the item name',
          itemEnName: 'Item English Name',
          itemEnNamePlaceholder: 'Please enter the item English name',
          newDisposition: 'New Disposition',
          newDispositionPlaceholder: 'Please enter the new disposition',
          oldDisposition: 'Old Disposition',
          oldDispositionPlaceholder: 'Please enter the old disposition',
          weaponType: 'Weapon Type',
          weaponTypePlaceholder: 'Please enter the weapon type',
          addRiven: 'Add Riven Data',
          editRiven: 'Edit Riven Data',
          updateTime: 'Update Time'
        },
        translation: {
          title: 'Warframe Translation Management',
          english: 'English',
          englishPlaceholder: 'Please enter English',
          chinese: 'Chinese',
          chinesePlaceholder: 'Please enter Chinese',
          addTranslation: 'Add Translation',
          editTranslation: 'Edit Translation',
          isPrime: 'is Prime',
          isSet: 'is Set'
        },
        untranslated: {
          title: 'Warframe Untranslated Database',
          text: 'Text',
          textPlaceholder: 'Please enter the search text',
          english: 'English',
          englishPlaceholder: 'Please enter English',
          addUntranslated: 'Add Untranslated Data',
          editUntranslated: 'Edit Untranslated Data'
        },
        subscription: {
          title: 'Subscription',
          groupName: 'group name',
          userList: 'user list',
          typeList: 'type list',
          id: 'ID',
          subGroup: 'sub group',
          subBotUid: 'sub bot uid',
          userDetail: 'sub user detail',
          userId: 'user uid',
          userName: 'user name',
          typeDetail: 'sub type detail',
          subscribe: 'sub type',
          missionTypeEnum: 'sub mission type',
          tierNum: 'relics tier'
        }
      }
    },
    git: {
      title: 'Configure Git Account',
      form: {
        account: 'Git Account',
        accountPlaceholder: 'Please enter the Git account name',
        token: 'Git Token',
        tokenPlaceholder: 'Please enter the Git token',
        url: 'DataSource Repository URL',
        urlPlaceholder: 'Please enter the DataSource repository URL'
      }
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    },
    qq: {
      required: 'please enter qq',
      invalid: 'qq format is incorrect'
    },
    groupUid: {
      required: 'Please enter group UID',
      invalid: 'Group UID format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin'
  },
  datatable: {
    itemCount: 'Total {total} items'
  },
  config: {
    service: {
      form: {
        portError: 'port must be a number between 1 and 65535'
      }
    }
  }
};

export default local;
