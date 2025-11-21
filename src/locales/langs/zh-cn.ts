const local: App.I18n.Schema = {
  system: {
    title: 'NyxBot 后台系统',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateConfirm: '立即刷新',
    updateCancel: '稍后再说'
  },
  common: {
    action: '操作',
    add: '新增',
    addSuccess: '添加成功',
    backToHome: '返回首页',
    batchDelete: '批量删除',
    cancel: '取消',
    close: '关闭',
    check: '勾选',
    expandColumn: '展开列',
    columnSetting: '列设置',
    config: '配置',
    confirm: '确认',
    delete: '删除',
    deleteSuccess: '删除成功',
    confirmDelete: '确认删除吗？',
    editPassword: '修改密码',
    edit: '编辑',
    warning: '警告',
    error: '错误',
    index: '序号',
    keywordSearch: '请输入关键词搜索',
    logout: '退出登录',
    logoutConfirm: '确认退出登录吗？',
    lookForward: '敬请期待',
    modify: '修改',
    modifySuccess: '修改成功',
    noData: '无数据',
    operate: '操作',
    pleaseCheckValue: '请检查输入的值是否合法',
    refresh: '刷新',
    reset: '重置',
    search: '搜索',
    switch: '切换',
    tip: '提示',
    trigger: '触发',
    update: '更新',
    updateSuccess: '更新成功',
    userCenter: '个人中心',
    yesOrNo: {
      yes: '是',
      no: '否'
    },
    restPassword: {
      success: '重置密码成功',
      successTip: '密码重置成功，请使用新密码登录',
      error: '重置密码失败',
      errorTip: '密码重置失败，请稍后重试',
      oldPassword: '旧密码',
      newPassword: '新密码',
      confirmPassword: '确认密码'
    },
    from: {
      urlError: 'URL格式不正确，请输入正确的URL'
    },
    push: '推送',
    pushSuccess: '推送成功',
    commits: '提交信息',
    detail: '详情'
  },
  request: {
    logout: '请求失败后登出用户',
    logoutMsg: '用户状态失效，请重新登录',
    logoutWithModal: '请求失败后弹出模态框再登出用户',
    logoutWithModalMsg: '用户状态失效，请重新登录',
    refreshToken: '请求的token已过期，刷新token',
    tokenExpired: 'token已过期'
  },
  theme: {
    themeSchema: {
      title: '主题模式',
      light: '亮色模式',
      dark: '暗黑模式'
    },
    grayscale: '灰色模式',
    colourWeakness: '色弱模式',
    layoutMode: {
      title: '布局模式',
      vertical: '左侧菜单模式',
      'vertical-mix': '左侧菜单混合模式',
      horizontal: '顶部菜单模式',
      'horizontal-mix': '顶部菜单混合模式',
      reverseHorizontalMix: '一级菜单与子级菜单位置反转'
    },
    recommendColor: '应用推荐算法的颜色',
    recommendColorDesc: '推荐颜色的算法参照',
    themeColor: {
      title: '主题颜色',
      primary: '主色',
      info: '信息色',
      success: '成功色',
      warning: '警告色',
      error: '错误色',
      followPrimary: '跟随主色'
    },
    scrollMode: {
      title: '滚动模式',
      wrapper: '外层滚动',
      content: '主体滚动'
    },
    page: {
      animate: '页面切换动画',
      mode: {
        title: '页面切换动画类型',
        'fade-slide': '滑动',
        fade: '淡入淡出',
        'fade-bottom': '底部消退',
        'fade-scale': '缩放消退',
        'zoom-fade': '渐变',
        'zoom-out': '闪现',
        none: '无'
      }
    },
    fixedHeaderAndTab: '固定头部和标签栏',
    header: {
      height: '头部高度',
      breadcrumb: {
        visible: '显示面包屑',
        showIcon: '显示面包屑图标'
      },
      multilingual: {
        visible: '显示多语言按钮'
      }
    },
    tab: {
      visible: '显示标签栏',
      cache: '标签栏信息缓存',
      height: '标签栏高度',
      mode: {
        title: '标签栏风格',
        chrome: '谷歌风格',
        button: '按钮风格'
      }
    },
    sider: {
      inverted: '深色侧边栏',
      width: '侧边栏宽度',
      collapsedWidth: '侧边栏折叠宽度',
      mixWidth: '混合布局侧边栏宽度',
      mixCollapsedWidth: '混合布局侧边栏折叠宽度',
      mixChildMenuWidth: '混合布局子菜单宽度'
    },
    footer: {
      visible: '显示底部',
      fixed: '固定底部',
      height: '底部高度',
      right: '底部局右'
    },
    watermark: {
      visible: '显示全屏水印',
      text: '水印文本'
    },
    themeDrawerTitle: '主题配置',
    pageFunTitle: '页面功能',
    resetCacheStrategy: {
      title: '重置缓存策略',
      close: '关闭页面',
      refresh: '刷新页面'
    },
    configOperation: {
      copyConfig: '复制配置',
      copySuccessMsg: '复制成功，请替换 src/theme/settings.ts 中的变量 themeSettings',
      resetConfig: '重置配置',
      resetSuccessMsg: '重置成功'
    }
  },
  route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    'local-data': '本地数据',
    'local-data_warframe': 'Warframe',
    'local-data_warframe_alias': '别名',
    'local-data_warframe_subscription': '订阅',
    'local-data_warframe_market': 'Market',
    'local-data_warframe_market-riven': 'Market Riven',
    config: '配置',
    config_service: '服务配置',
    config_admin: '管理员',
    config_blacklist: '黑名单',
    config_blacklist_group: '群黑名单',
    config_blacklist_personal: '个人黑名单',
    log: '日志',
    log_command: '命令日志',
    'log_real-time': '实时日志',
    config_whitelist: '白名单',
    config_whitelist_group: '群白名单',
    config_whitelist_personal: '个人白名单',
    'rest-password': '重置密码',
    document: '文档',
    reward: '赞赏'
  },
  page: {
    login: {
      common: {
        loginOrRegister: '登录 / 注册',
        userNamePlaceholder: '请输入用户名',
        phonePlaceholder: '请输入手机号',
        codePlaceholder: '请输入验证码',
        passwordPlaceholder: '请输入密码',
        confirmPasswordPlaceholder: '请再次输入密码',
        codeLogin: '验证码登录',
        confirm: '确定',
        back: '返回',
        validateSuccess: '验证成功',
        loginSuccess: '登录成功',
        welcomeBack: '欢迎回来，{userName} ！'
      },
      pwdLogin: {
        title: '密码登录',
        rememberMe: '记住我',
        forgetPassword: '忘记密码？',
        register: '注册账号',
        otherAccountLogin: '其他账号登录',
        otherLoginMode: '其他登录方式',
        superAdmin: '超级管理员',
        admin: '管理员',
        user: '普通用户'
      },
      codeLogin: {
        title: '验证码登录',
        getCode: '获取验证码',
        reGetCode: '{time}秒后重新获取',
        sendCodeSuccess: '验证码发送成功',
        imageCodePlaceholder: '请输入图片验证码'
      },
      register: {
        title: '注册账号',
        agreement: '我已经仔细阅读并接受',
        protocol: '《用户协议》',
        policy: '《隐私权政策》'
      },
      resetPwd: {
        title: '重置密码'
      },
      bindWeChat: {
        title: '绑定微信'
      }
    },
    home: {
      branchDesc:
        '为了方便大家开发和更新合并，我们对main分支的代码进行了精简，只保留了首页菜单，其余内容已移至example分支进行维护。预览地址显示的内容即为example分支的内容。',
      greeting: '早安，{userName}, 今天又是充满活力的一天!',
      weatherDesc: '今日多云转晴，20℃ - 25℃!',
      projectCount: '项目数',
      todo: '待办',
      message: '消息',
      downloadCount: '下载量',
      registerCount: '注册量',
      schedule: '作息安排',
      study: '学习',
      work: '工作',
      rest: '休息',
      entertainment: '娱乐',
      visitCount: '访问量',
      turnover: '成交额',
      dealCount: '成交量',
      projectNews: {
        title: '项目动态',
        moreNews: '更多动态',
        desc1: 'Soybean 在2021年5月28日创建了开源项目 soybean-admin!',
        desc2: 'Yanbowe 向 soybean-admin 提交了一个bug，多标签栏不会自适应。',
        desc3: 'Soybean 准备为 soybean-admin 的发布做充分的准备工作!',
        desc4: 'Soybean 正在忙于为soybean-admin写项目说明文档！',
        desc5: 'Soybean 刚才把工作台页面随便写了一些，凑合能看了！'
      },
      creativity: '创意'
    },
    log: {
      command: {
        title: '命令日志',
        id: '日志编号',
        moduleName: '模块名称',
        command: '指令',
        commandPlaceholder: '请输入指令',
        botQQ: '机器人QQ',
        groupQQ: 'QQ群',
        groupQQPlaceholder: '请输入QQ群',
        triggerQQ: '触发者QQ',
        operateTime: '操作时间',
        titles: '模块名称',
        titlesPlaceholder: '请输入模块名称'
      },
      loginfo: {
        title: '模块',
        codes: '指令',
        permissions: '权限',
        businessType: '操作类型',
        botUid: '机器人UID',
        groupUid: '群UID',
        userUid: '用户UID',
        rawMsg: '原始消息',
        url: 'URL',
        method: '方法',
        requestMethod: '请求方法',
        runTime: '运行时间',
        logTime: '日志时间',
        param: '请求的参数',
        result: '返回的结果',
        status: '执行状态',
        errorMsg: '错误信息'
      }
    },
    config: {
      title: '系统配置',
      git: {
        title: '配置Git账户',
        form: {
          account: 'Git账户',
          accountPlaceholder: '请输入Git账户名称',
          token: 'Git令牌',
          tokenPlaceholder: '请输入Git令牌',
          url: 'DataSource仓库地址',
          urlPlaceholder: '请输入DataSource仓库地址'
        }
      },
      service: {
        title: '配置服务',
        restartTip: '更改之后需要重启服务才能生效',
        form: {
          port: '端口',
          portPlaceholder: '请输入端口号',
          portError: '端口号必须在1-65535之间',
          client: '客户端',
          server: '服务端',
          switchTo: '切换到{type}',
          urlPlaceholder: '请输入{type}URL'
        }
      },
      admin: {
        title: '管理员列表',
        botAccount: '机器人账号',
        adminAccount: '管理员账号',
        status: '状态',
        role: '权限',
        addAdmin: '新增管理员',
        editAdmin: '编辑管理员',
        inputAdminQQ: '输入管理员QQ',
        optionsOrinput: '选择或输入管理员QQ',
        form: {
          botAccount: '请选择机器账号',
          adminAccount: '请选择管理员账号',
          status: '请选择状态',
          role: '请选择权限'
        },
        roles: {
          superAdmin: '超级管理员',
          admin: '管理员',
          commonUser: '普通用户',
          backendUser: '后台用户',
          other: '其他用户',
          placeholder: '请选择角色',
          roleName: '角色名称'
        }
      },
      blacklist: {
        group: {
          title: '黑名单组列表',
          groupAccount: '群账号',
          addBlacklistGroup: '新增黑名单组',
          editBlacklistGroup: '编辑黑名单组',
          placeholder: '请选择群账号'
        },
        personal: {
          title: '黑名单个人列表',
          personalAccount: '个人账号',
          addBlacklistPersonal: '新增黑名单个人',
          editBlacklistPersonal: '编辑黑名单个人',
          placeholder: '请选择个人账号'
        }
      },
      whitelist: {
        group: {
          title: '白名单组列表',
          groupAccount: '群账号',
          addWhitelistGroup: '新增白名单组',
          editWhitelistGroup: '编辑白名单组',
          placeholder: '请选择群账号'
        },
        personal: {
          title: '白名单个人列表',
          personalAccount: '个人账号',
          addWhitelistPersonal: '新增白名单个人',
          editWhitelistPersonal: '编辑白名单个人',
          placeholder: '请选择个人账号'
        }
      },
      group: {
        inputGroupId: '输入群ID',
        optionsOrinput: '选择或输入群ID'
      }
    },
    'local-data': {
      warframe: {
        alias: {
          title: '别名列表',
          englishName: '英文名',
          chineseName: '中文名',
          addAlias: '新增别名',
          editAlias: '编辑别名',
          englishNamePlaceholder: '请输入英文名',
          chineseNamePlaceholder: '请输入中文名'
        },
        market: {
          title: 'Market',
          itemName: '物品名称',
          addMarket: '新增Market',
          editMarket: '编辑Market',
          itemNamePlaceholder: '请输入物品名称',
          imageUrl: '图片链接',
          imageUrlPlaceholder: '请输入图片链接'
        },
        'market-riven': {
          title: 'Market Riven',
          itemName: '物品名称',
          itemNamePlaceholder: '请输入物品名称',
          rivenType: '紫卡类型',
          rivenTypePlaceholder: '请输入紫卡类型',
          group: '分组',
          groupPlaceholder: '请输入分组',
          rankLimit: '段位限制',
          rankLimitPlaceholder: '请输入段位限制',
          imageUrl: '图片链接',
          imageUrlPlaceholder: '请输入图片链接',
          addMarketRiven: '添加紫卡数据',
          editMarketRiven: '编辑紫卡数据'
        },
        phantom: {
          title: '幻纹',
          itemName: '物品名称',
          itemNamePlaceholder: '请输入物品名称',
          urlName: 'URL名称',
          urlNamePlaceholder: '请输入URL名称',
          iconLink: '图标链接',
          iconLinkPlaceholder: '请输入图标链接',
          imageSource: '图片来源',
          imageSourcePlaceholder: '请输入图片来源',
          animation: '动画',
          animationPlaceholder: '请输入动画',
          addPhantom: '添加幻纹数据',
          editPhantom: '编辑幻纹数据'
        },
        'riven-trend': {
          title: '紫卡倾向',
          itemName: '物品名称',
          itemNamePlaceholder: '请输入物品名称',
          itemEnName: '物品英文名称',
          itemEnNamePlaceholder: '请输入物品英文名称',
          newDisposition: '新倾向',
          newDispositionPlaceholder: '请输入新倾向',
          oldDisposition: '旧倾向',
          oldDispositionPlaceholder: '请输入旧倾向',
          weaponType: '武器类型',
          weaponTypePlaceholder: '请输入武器类型',
          addRiven: '添加Riven数据',
          editRiven: '编辑Riven数据',
          updateTime: '更新时间'
        },
        translation: {
          title: 'Warframe翻译管理',
          english: '英文',
          englishPlaceholder: '请输入英文',
          chinese: '中文',
          chinesePlaceholder: '请输入中文',
          addTranslation: '添加翻译',
          editTranslation: '编辑翻译',
          isPrime: '是否为Prime',
          isSet: '是否为套装'
        },
        untranslated: {
          title: 'Warframe未翻译数据库',
          text: '文本',
          textPlaceholder: '请输入搜索文本',
          english: '英文',
          englishPlaceholder: '请输入英文',
          addUntranslated: '添加未翻译数据',
          editUntranslated: '编辑未翻译数据'
        },
        subscription: {
          title: '订阅管理',
          groupName: '订阅组名称',
          userList: '订阅用户列表',
          typeList: '订阅类型列表',
          id: '编号',
          subGroup: '订阅组',
          subBotUid: '机器人 UID',
          userDetail: '订阅用户详情',
          userId: '用户 UID',
          userName: '用户昵称',
          typeDetail: '订阅类型详情',
          subscribe: '订阅类型',
          missionTypeEnum: '订阅任务类型',
          tierNum: '订阅遗物等级'
        }
      }
    },
    git: {
      title: '配置Git账户',
      form: {
        account: 'Git账户',
        accountPlaceholder: '请输入Git账户名称',
        token: 'Git令牌',
        tokenPlaceholder: '请输入Git令牌',
        url: 'DataSource仓库地址',
        urlPlaceholder: '请输入DataSource仓库地址'
      }
    }
  },
  form: {
    required: '不能为空',
    userName: {
      required: '请输入用户名',
      invalid: '用户名格式不正确'
    },
    phone: {
      required: '请输入手机号',
      invalid: '手机号格式不正确'
    },
    pwd: {
      required: '请输入密码',
      invalid: '密码格式不正确，6-18位字符，包含字母、数字、下划线'
    },
    confirmPwd: {
      required: '请输入确认密码',
      invalid: '两次输入密码不一致'
    },
    code: {
      required: '请输入验证码',
      invalid: '验证码格式不正确'
    },
    email: {
      required: '请输入邮箱',
      invalid: '邮箱格式不正确'
    },
    qq: {
      required: '请输入QQ号',
      invalid: 'QQ号格式不正确'
    },
    groupUid: {
      required: '请输入群UID',
      invalid: '群UID格式不正确'
    }
  },
  dropdown: {
    closeCurrent: '关闭',
    closeOther: '关闭其它',
    closeLeft: '关闭左侧',
    closeRight: '关闭右侧',
    closeAll: '关闭所有'
  },
  icon: {
    themeConfig: '主题配置',
    themeSchema: '主题模式',
    lang: '切换语言',
    fullscreen: '全屏',
    fullscreenExit: '退出全屏',
    reload: '刷新页面',
    collapse: '折叠菜单',
    expand: '展开菜单',
    pin: '固定',
    unpin: '取消固定'
  },
  datatable: {
    itemCount: '共 {total} 条'
  },
  config: {
    service: {
      form: {
        portError: '端口格式不正确，请输入1-65535之间的数字'
      }
    }
  }
};

export default local;
