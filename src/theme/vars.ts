/** 创建颜色调色板变量引用映射对象 该函数生成主题颜色系统中使用的CSS变量引用 */
function createColorPaletteVars() {
  // 定义支持的主题颜色类型
  const colors: App.Theme.ThemeColorKey[] = ['primary', 'info', 'success', 'warning', 'error'];
  // 定义支持的颜色强度等级
  const colorPaletteNumbers: App.Theme.ColorPaletteNumber[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  // 创建调色板变量对象
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  // 为每种主题颜色创建CSS变量引用
  colors.forEach(color => {
    // 创建基础颜色的CSS变量引用 (如: rgb(var(--primary-color)))
    colorPaletteVar[color] = `rgb(var(--${color}-color))`;
    // 为每种颜色的不同强度等级创建CSS变量引用 (如: rgb(var(--primary-50-color)))
    colorPaletteNumbers.forEach(number => {
      colorPaletteVar[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`;
    });
  });

  return colorPaletteVar;
}

// 生成并存储颜色调色板变量
const colorPaletteVars = createColorPaletteVars();

/** 主题CSS变量配置对象 包含应用程序中使用的所有主题相关CSS变量引用 */
export const themeVars: App.Theme.ThemeTokenCSSVars = {
  colors: {
    // 扩展基础颜色调色板变量
    ...colorPaletteVars,
    // 进度条颜色
    nprogress: 'rgb(var(--nprogress-color))',
    // 容器背景颜色
    container: 'rgb(var(--container-bg-color))',
    // 布局背景颜色
    layout: 'rgb(var(--layout-bg-color))',
    // 反转背景颜色
    inverted: 'rgb(var(--inverted-bg-color))',
    'base-text': 'rgb(var(--base-text-color))'
  },
  boxShadow: {
    // 头部阴影样式
    header: 'var(--header-box-shadow)',
    // 侧边栏阴影样式
    sider: 'var(--sider-box-shadow)',
    // 标签页阴影样式
    tab: 'var(--tab-box-shadow)'
  }
};
