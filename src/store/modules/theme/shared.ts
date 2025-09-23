import type { GlobalThemeOverrides } from 'naive-ui';
import { defu } from 'defu';
import { addColorAlpha, getColorPalette, getPaletteColorByNumber, getRgb } from '@sa/color';
import { overrideThemeSettings, themeSettings } from '@/theme/settings';
import { themeVars } from '@/theme/vars';
import { toggleHtmlClass } from '@/utils/common';
import { localStg } from '@/utils/storage';

const DARK_CLASS = 'dark';

/** Init theme settings */
export function initThemeSettings() {
  // 获取当前环境是否为生产环境
  const isProd = import.meta.env.PROD;

  // 开发模式下：不使用缓存的主题设置，直接返回默认主题设置
  // 如需修改主题，直接更新 src/theme/settings.ts 中的 themeSettings
  if (!isProd) return themeSettings;

  // 生产模式下：主题设置会被缓存到 localStorage 中
  // 发布新版本时如需强制更新主题设置，请修改 src/theme/settings.ts 中的 overrideThemeSettings

  // 从 localStorage 中获取用户保存的主题设置
  const localSettings = localStg.get('themeSettings');

  // 合并本地设置与默认设置（本地设置优先级更高）
  let settings = defu(localSettings, themeSettings);

  // 检查是否需要应用覆盖设置（通过比较构建时间戳）
  const isOverride = localStg.get('overrideThemeFlag') === BUILD_TIME;

  // 如果需要应用覆盖设置（首次加载新版本或覆盖标志不匹配）
  if (!isOverride) {
    // 合并覆盖设置到当前设置（覆盖设置优先级最高）
    settings = defu(overrideThemeSettings, settings);

    // 保存覆盖标志，标记此版本的主题设置已应用
    localStg.set('overrideThemeFlag', BUILD_TIME);
  }

  // 返回最终合并后的主题设置
  return settings;
}

/**
 * create theme token css vars value by theme settings
 *
 * @param colors Theme colors
 * @param tokens Theme setting tokens
 * @param [recommended=false] Use recommended color. Default is `false`
 */
/**
 * 根据主题设置创建主题令牌 CSS 变量值
 *
 * @param colors 主题颜色配置
 * @param tokens 主题设置令牌（可选）
 * @param [recommended=false] 是否使用推荐颜色，默认为 `false`. Default is `false`
 */
export function createThemeToken(
  colors: App.Theme.ThemeColor,
  tokens?: App.Theme.ThemeSetting['tokens'],
  recommended = false
) {
  // 基于传入的主题颜色和推荐标志创建主题调色板颜色
  const paletteColors = createThemePaletteColors(colors, recommended);

  // 从传入的令牌或默认主题设置中解构亮色和暗色主题配置
  // 如果未提供tokens参数，则使用themeSettings中的默认令牌
  const { light, dark } = tokens || themeSettings.tokens;

  // 创建亮色主题令牌CSS变量对象
  const themeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      // 合并调色板颜色（如primary, success, warning等）
      ...paletteColors,
      // 设置进度条颜色使用主色调
      nprogress: paletteColors.primary,
      // 合并亮色主题特有的颜色配置
      ...light.colors
    },
    boxShadow: {
      // 合并亮色主题的阴影配置
      ...light.boxShadow
    }
  };

  // 创建暗色主题令牌CSS变量对象
  const darkThemeTokens: App.Theme.ThemeTokenCSSVars = {
    colors: {
      // 继承亮色主题的所有颜色配置
      ...themeTokens.colors,
      // 用暗色主题特有的颜色配置覆盖对应项
      // 使用可选链操作符(?.)安全访问dark对象，防止未定义情况
      ...dark?.colors
    },
    boxShadow: {
      // 继承亮色主题的所有阴影配置
      ...themeTokens.boxShadow,
      // 用暗色主题特有的阴影配置覆盖对应项
      ...dark?.boxShadow
    }
  };

  // 返回包含亮色和暗色主题令牌的对象
  return {
    themeTokens,
    darkThemeTokens
  };
}

/**
 * 创建主题调色板颜色
 *
 * @param colors 主题颜色对象
 * @param [recommended=false] 是否使用推荐颜色，默认为 false. Default is `false`
 * @returns 包含所有主题颜色及其不同色调的调色板对象
 */
function createThemePaletteColors(colors: App.Theme.ThemeColor, recommended = false) {
  // 获取主题颜色对象的所有键名
  const colorKeys = Object.keys(colors) as App.Theme.ThemeColorKey[];
  // 创建用于存储调色板颜色的空对象
  const colorPaletteVar = {} as App.Theme.ThemePaletteColor;

  // 遍历每个颜色键
  colorKeys.forEach(key => {
    // 获取该颜色的完整调色板
    const colorMap = getColorPalette(colors[key], recommended);

    // 设置基础颜色（500色调）
    colorPaletteVar[key] = colorMap.get(500)!;

    // 将调色板中所有色调的颜色添加到结果对象
    colorMap.forEach((hex, number) => {
      colorPaletteVar[`${key}-${number}`] = hex;
    });
  });

  return colorPaletteVar;
}

/**
 * 根据主题令牌获取CSS变量字符串
 *
 * @param tokens 主题基础令牌对象
 * @returns 格式化的CSS变量字符串
 */
function getCssVarByTokens(tokens: App.Theme.BaseToken) {
  // 存储生成的CSS样式规则
  const styles: string[] = [];

  // 移除CSS变量前缀的辅助函数
  function removeVarPrefix(value: string) {
    return value.replace('var(', '').replace(')', '');
  }

  // 移除RGB函数前缀的辅助函数
  function removeRgbPrefix(value: string) {
    return value.replace('rgb(', '').replace(')', '');
  }

  // 遍历所有主题变量定义
  for (const [key, tokenValues] of Object.entries(themeVars)) {
    for (const [tokenKey, tokenValue] of Object.entries(tokenValues)) {
      // 提取CSS变量名
      let cssVarsKey = removeVarPrefix(tokenValue);
      // 获取对应的令牌值
      let cssValue = tokens[key][tokenKey];

      // 特殊处理颜色值，将HEX转换为RGB格式
      if (key === 'colors') {
        cssVarsKey = removeRgbPrefix(cssVarsKey);
        const { r, g, b } = getRgb(cssValue);
        cssValue = `${r} ${g} ${b}`;
      }

      // 添加CSS变量声明
      styles.push(`${cssVarsKey}: ${cssValue}`);
    }
  }

  // 将所有样式规则用分号连接
  const styleStr = styles.join(';');

  return styleStr;
}

/**
 * 将主题变量添加到全局样式
 *
 * @param tokens 亮色主题令牌
 * @param darkTokens 暗色主题令牌
 */
export function addThemeVarsToGlobal(tokens: App.Theme.BaseToken, darkTokens: App.Theme.BaseToken) {
  // 生成亮色和暗色主题的CSS变量字符串
  const cssVarStr = getCssVarByTokens(tokens);
  const darkCssVarStr = getCssVarByTokens(darkTokens);

  // 构建基础主题CSS样式
  const css = `
    :root {
      ${cssVarStr}
    }
  `;

  // 构建暗色主题CSS样式
  const darkCss = `
    html.${DARK_CLASS} {
      ${darkCssVarStr}
    }
  `;

  // 样式元素的ID
  const styleId = 'theme-vars';

  // 获取现有样式元素或创建新元素
  const style = document.querySelector(`#${styleId}`) || document.createElement('style');

  // 设置样式元素ID
  style.id = styleId;

  // 设置样式内容，合并亮色和暗色主题
  style.textContent = css + darkCss;

  // 将样式元素添加到文档头部
  document.head.appendChild(style);
}

/**
 * 切换CSS暗色模式
 *
 * @param darkMode 是否启用暗色模式
 */
export function toggleCssDarkMode(darkMode = false) {
  // 获取切换HTML类的辅助函数
  const { add, remove } = toggleHtmlClass(DARK_CLASS);

  // 根据参数决定添加或移除暗色模式类
  if (darkMode) {
    add();
  } else {
    remove();
  }
}

/**
 * 切换辅助颜色模式（灰度和色盲模式）
 *
 * @param grayscaleMode 是否启用灰度模式
 * @param colourWeakness 是否启用色盲模式
 */
export function toggleAuxiliaryColorModes(grayscaleMode = false, colourWeakness = false) {
  // 获取HTML根元素
  const htmlElement = document.documentElement;
  // 构建并设置filter样式，根据参数组合灰度和反转效果
  htmlElement.style.filter = [grayscaleMode ? 'grayscale(100%)' : '', colourWeakness ? 'invert(80%)' : '']
    .filter(Boolean) // 过滤掉空字符串
    .join(' '); // 用空格连接多个过滤器
}

// Naive UI颜色场景类型定义
type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
// Naive UI颜色键类型定义
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`;
// Naive UI主题颜色对象类型定义
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>;
// Naive UI颜色处理动作接口
interface NaiveColorAction {
  scene: NaiveColorScene;
  handler: (color: string) => string;
}

/**
 * 获取Naive UI主题颜色配置
 *
 * @param colors 主题颜色对象
 * @param [recommended=false] 是否使用推荐颜色，默认为 false. Default is `false`
 * @returns 适配Naive UI的主题颜色配置对象
 */
function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  // 定义不同交互场景下的颜色处理规则
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: color => color }, // 基础颜色
    { scene: 'Suppl', handler: color => color }, // 补充颜色
    { scene: 'Hover', handler: color => getPaletteColorByNumber(color, 500, recommended) }, // 悬停状态颜色
    { scene: 'Pressed', handler: color => getPaletteColorByNumber(color, 700, recommended) }, // 按下状态颜色
    { scene: 'Active', handler: color => addColorAlpha(color, 0.1) } // 激活状态颜色
  ];

  // 创建主题颜色配置对象
  const themeColors: NaiveThemeColor = {};

  // 将颜色对象转换为键值对数组
  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][];

  // 遍历每个颜色和交互场景，生成对应的主题颜色配置
  colorEntries.forEach(color => {
    colorActions.forEach(action => {
      const [colorType, colorValue] = color;
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`;
      themeColors[colorKey] = action.handler(colorValue);
    });
  });

  return themeColors;
}

/**
 * 获取Naive UI主题配置
 *
 * @param colors 主题颜色对象
 * @param [recommended=false] 是否使用推荐颜色，默认为 false. Default is `false`
 * @returns Naive UI的全局主题覆盖配置对象
 */
export function getNaiveTheme(colors: App.Theme.ThemeColor, recommended = false) {
  // 从颜色对象中提取加载条颜色
  const { primary: colorLoading } = colors;

  // 构建并返回Naive UI主题覆盖配置
  const theme: GlobalThemeOverrides = {
    common: {
      // 合并主题颜色配置
      ...getNaiveThemeColors(colors, recommended),
      // 设置全局圆角
      borderRadius: '6px'
    },
    // 配置加载条颜色
    LoadingBar: {
      colorLoading
    },
    // 配置标签组件圆角
    Tag: {
      borderRadius: '6px'
    }
  };

  return theme;
}
