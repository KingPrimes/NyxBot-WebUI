/** 默认主题设置配置 定义应用程序的基础主题参数，包括颜色、布局、组件样式等 */
export const themeSettings: App.Theme.ThemeSetting = {
  /** 主题方案：当前设置为亮色主题 */
  themeScheme: 'light',
  /** 是否启用灰度模式 */
  grayscale: false,
  /** 是否启用色弱模式 */
  colourWeakness: false,
  /** 是否使用推荐颜色方案 */
  recommendColor: true,
  /** 主题主色调：采用樱花粉作为主色调 */
  themeColor: '#FF9ED6',
  /** 其他辅助颜色配置 */
  otherColor: {
    /** 信息提示色：采用天蓝色 */
    info: '#7FC7FF',
    /** 成功提示色：采用薄荷绿 */
    success: '#C4FFEB',
    /** 警告提示色：采用奶油黄 */
    warning: '#FFD166',
    /** 错误提示色：采用玫红色 */
    error: '#FF6B9E'
  },
  /** 信息颜色是否跟随主色变化 */
  isInfoFollowPrimary: false,
  /** 重置缓存策略 */
  resetCacheStrategy: 'close',
  /** 布局相关配置 */
  layout: {
    /** 布局模式：垂直布局 */
    mode: 'vertical',
    /** 滚动模式：内容区域滚动 */
    scrollMode: 'content',
    /** 是否反转水平混合布局 */
    reverseHorizontalMix: false
  },
  /** 页面相关配置 */
  page: {
    /** 是否启用页面过渡动画 */
    animate: true,
    /** 页面动画模式：淡入滑动效果 */
    animateMode: 'fade-slide'
  },
  /** 头部相关配置 */
  header: {
    /** 头部高度 */
    height: 56,
    /** 面包屑配置 */
    breadcrumb: {
      /** 是否显示面包屑 */
      visible: true,
      /** 是否显示面包屑图标 */
      showIcon: true
    },
    /** 多语言配置 */
    multilingual: {
      /** 是否显示多语言切换 */
      visible: true
    }
  },
  /** 标签页相关配置 */
  tab: {
    /** 是否显示标签页 */
    visible: true,
    /** 是否缓存标签页状态 */
    cache: true,
    /** 标签页高度 */
    height: 44,
    /** 标签页模式：Chrome风格 */
    mode: 'chrome'
  },
  /** 是否固定头部和标签页 */
  fixedHeaderAndTab: true,
  /** 侧边栏相关配置 */
  sider: {
    /** 是否反转侧边栏样式 */
    inverted: false,
    /** 侧边栏宽度 */
    width: 220,
    /** 折叠后的侧边栏宽度 */
    collapsedWidth: 64,
    /** 混合布局模式下的侧边栏宽度 */
    mixWidth: 90,
    /** 混合布局模式下折叠后的侧边栏宽度 */
    mixCollapsedWidth: 64,
    /** 混合布局模式下的子菜单宽度 */
    mixChildMenuWidth: 200
  },
  /** 页脚相关配置 */
  footer: {
    /** 是否显示页脚 */
    visible: false,
    /** 是否固定页脚 */
    fixed: false,
    /** 页脚高度 */
    height: 48,
    /** 混合布局模式下是否右浮动 */
    right: true
  },
  /** 水印相关配置 */
  watermark: {
    /** 是否显示水印 */
    visible: false,
    /** 水印文本 */
    text: 'NyxBot'
  },
  /** 主题CSS变量令牌配置 */
  tokens: {
    /** 亮色主题变量配置 - 活泼元气向 */
    light: {
      /** 颜色变量 */
      colors: {
        /** 容器背景色 */
        container: 'rgba(255, 239, 245, 1)',
        /** 布局背景色 */
        layout: 'rgba(255, 239, 245, 1)',
        /** 反转背景色 */
        inverted: 'rgb(0, 20, 40)',
        /** 基础文本颜色 */
        'base-text': 'rgb(255, 107, 158)'
      },
      /** 阴影变量 */
      boxShadow: {
        /** 头部阴影：樱花粉色调阴影 */
        header: '0 1px 2px rgba(255, 158, 214, 0.2)',
        /** 侧边栏阴影：樱花粉色调阴影 */
        sider: '2px 0 8px 0 rgba(255, 158, 214, 0.15)',
        /** 标签页阴影：樱花粉色调阴影 */
        tab: '0 1px 2px rgba(255, 158, 214, 0.2)'
      }
    },
    /** 暗色主题变量配置 - 赛博幻想向 */
    dark: {
      /** 暗色主题颜色变量 */
      colors: {
        /** 容器背景色：深灰蓝 */
        container: 'rgb(42, 42, 58)',
        /** 布局背景色：深灰蓝 */
        layout: 'rgb(42, 42, 58)',
        /** 反转背景色 */
        inverted: 'rgb(107, 77, 255)',
        /** 基础文本颜色：淡紫白 */
        'base-text': 'rgb(224, 224, 255)'
      },
      /** 暗色主题阴影变量 */
      boxShadow: {
        /** 头部阴影：霓虹紫调阴影 */
        header: '0 2px 12px 0 rgba(199, 125, 255, 0.3)',
        /** 侧边栏阴影：霓虹紫调阴影 */
        sider: '2px 0 16px 0 rgba(199, 125, 255, 0.25)',
        /** 标签页阴影：霓虹紫调阴影 */
        tab: '0 2px 12px 0 rgba(199, 125, 255, 0.3)'
      }
    }
  }
};

/**
 * 主题设置覆盖对象
 *
 * 发布新版本时，可使用此对象覆盖特定的主题设置参数 用于在不修改主配置的情况下调整特定版本的主题行为
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
