/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: "light",
  grayscale: false,
  colourWeakness: false,
  recommendColor: true,
  themeColor: "#fe7199",
  themeRadius: 6,
  otherColor: {
    info: "#7e9aff",
    success: "#9aff7e",
    warning: "#fffd7e",
    error: "#ec696b",
  },
  isInfoFollowPrimary: false,
  layout: {
    mode: "vertical",
    scrollMode: "content",
  },
  page: {
    animate: true,
    animateMode: "fade-slide",
  },
  header: {
    height: 56,
    breadcrumb: {
      visible: false,
      showIcon: false,
    },
    multilingual: {
      visible: true,
    },
    globalSearch: {
      visible: true,
    },
  },
  tab: {
    visible: false,
    cache: false,
    height: 44,
    mode: "chrome",
    closeTabByMiddleClick: false,
  },
  fixedHeaderAndTab: false,
  sider: {
    inverted: false,
    width: 220,
    collapsedWidth: 64,
    mixWidth: 90,
    mixCollapsedWidth: 64,
    mixChildMenuWidth: 200,
    autoSelectFirstMenu: false,
  },
  footer: {
    visible: false,
    fixed: false,
    height: 48,
    right: true,
  },
  watermark: {
    visible: false,
    text: "NyxBot",
    enableUserName: false,
    enableTime: false,
    timeFormat: "YYYY-MM-DD HH:mm",
  },
  tokens: {
    light: {
      colors: {
        container: "rgb(248, 243, 233)",
        layout: "#ece4d5",
        inverted: "rgb(186, 172, 156)",
        "base-text": "rgb(254, 113, 152)",
      },
      boxShadow: {
        header: "0 1px 2px rgba(180, 160, 130, 0.25)",
        sider: "2px 0 8px 0 rgba(180, 160, 130, 0.25)",
        tab: "0 1px 2px rgba(180, 160, 130, 0.25)",
      },
    },
    dark: {
      colors: {
        container: "#151d2b",
        layout: "#201d31",
        inverted: "#f4bf96",
        "base-text": "#fCf5ed",
      },
      boxShadow: {
        header: "0 2px 12px 0 rgba(45, 46, 96, 0.3)",
        sider: "2px 0 16px 0 rgba(45, 46, 96, 0.25)",
        tab: "0 2px 12px 0 rgba(45, 46, 96, 0.3)",
      },
    },
  },
};

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
