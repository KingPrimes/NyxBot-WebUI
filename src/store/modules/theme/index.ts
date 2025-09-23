import { computed, effectScope, onScopeDispose, ref, toRefs, watch } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { useEventListener, usePreferredColorScheme } from '@vueuse/core';
import { getPaletteColorByNumber } from '@sa/color';
import { SetupStoreId } from '@/enum';
import { localStg } from '@/utils/storage';
import {
  addThemeVarsToGlobal,
  createThemeToken,
  getNaiveTheme,
  initThemeSettings,
  toggleAuxiliaryColorModes,
  toggleCssDarkMode
} from './shared';

/** Theme store - 主题状态管理模块 */
export const useThemeStore = defineStore(SetupStoreId.Theme, () => {
  // 创建响应式作用域
  const scope = effectScope();
  // 获取操作系统主题偏好
  const osTheme = usePreferredColorScheme();

  /** Theme settings - 主题设置对象 */
  const settings: Ref<App.Theme.ThemeSetting> = ref(initThemeSettings());

  /** Dark mode - 计算当前是否为暗色模式 */
  const darkMode = computed(() => {
    if (settings.value.themeScheme === 'auto') {
      // 自动模式下，跟随操作系统主题
      return osTheme.value === 'dark';
    }
    // 否则根据设置的主题方案判断
    return settings.value.themeScheme === 'dark';
  });

  /** grayscale mode - 灰度模式状态 */
  const grayscaleMode = computed(() => settings.value.grayscale);

  /** colourWeakness mode - 色盲模式状态 */
  const colourWeaknessMode = computed(() => settings.value.colourWeakness);

  /** Theme colors - 计算当前主题颜色对象 */
  const themeColors = computed(() => {
    const { themeColor, otherColor, isInfoFollowPrimary } = settings.value;
    const colors: App.Theme.ThemeColor = {
      primary: themeColor, // 主色调
      ...otherColor, // 其他颜色
      // 信息色是否跟随主色调
      info: isInfoFollowPrimary ? themeColor : otherColor.info
    };
    return colors;
  });

  /** Naive theme - Naive UI 组件库的主题配置 */
  const naiveTheme = computed(() => getNaiveTheme(themeColors.value, settings.value.recommendColor));

  /**
   * Settings json
   *
   * 用于复制设置的 JSON 字符串
   */
  const settingsJson = computed(() => JSON.stringify(settings.value));

  /** Reset store - 重置主题设置 */
  function resetStore() {
    const themeStore = useThemeStore();
    themeStore.$reset();
  }

  /**
   * Set theme scheme - 设置主题方案
   *
   * @param themeScheme 主题方案 ('light' | 'dark' | 'auto')
   */
  function setThemeScheme(themeScheme: UnionKey.ThemeScheme) {
    settings.value.themeScheme = themeScheme;
  }

  /**
   * Set grayscale value - 设置灰度模式
   *
   * @param isGrayscale 是否启用灰度模式
   */
  function setGrayscale(isGrayscale: boolean) {
    settings.value.grayscale = isGrayscale;
  }

  /**
   * Set colourWeakness value - 设置色盲模式
   *
   * @param isColourWeakness 是否启用色盲模式
   */
  function setColourWeakness(isColourWeakness: boolean) {
    settings.value.colourWeakness = isColourWeakness;
  }

  /** Toggle theme scheme - 切换主题方案（亮色/暗色） */
  function toggleThemeScheme() {
    const themeSchemes: UnionKey.ThemeScheme[] = ['light', 'dark'];

    // 查找当前主题方案的索引
    const index = themeSchemes.findIndex(item => item === settings.value.themeScheme);

    // 计算下一个主题方案的索引
    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;

    // 获取下一个主题方案
    const nextThemeScheme = themeSchemes[nextIndex];

    // 设置新的主题方案
    setThemeScheme(nextThemeScheme);
  }

  /**
   * Update theme colors - 更新主题颜色
   *
   * @param key 主题颜色键名
   * @param color 主题颜色值
   */
  function updateThemeColors(key: App.Theme.ThemeColorKey, color: string) {
    let colorValue = color;

    if (settings.value.recommendColor) {
      // 如果启用了推荐颜色，则获取该颜色的调色板并使用合适的颜色
      colorValue = getPaletteColorByNumber(color, 500, true);
    }

    // 根据颜色类型更新相应的设置
    if (key === 'primary') {
      settings.value.themeColor = colorValue;
    } else {
      settings.value.otherColor[key] = colorValue;
    }
  }

  /**
   * Set theme layout - 设置主题布局模式
   *
   * @param mode 主题布局模式
   */
  function setThemeLayout(mode: UnionKey.ThemeLayoutMode) {
    settings.value.layout.mode = mode;
  }

  /** Setup theme vars to global - 设置全局主题变量 */
  function setupThemeVarsToGlobal() {
    // 创建主题令牌对象
    const { themeTokens, darkThemeTokens } = createThemeToken(
      themeColors.value, // 当前主题颜色
      settings.value.tokens, // 当前主题令牌
      settings.value.recommendColor // 是否使用推荐颜色
    );
    // 将主题变量添加到全局样式中
    addThemeVarsToGlobal(themeTokens, darkThemeTokens);
  }

  /**
   * Set layout reverse horizontal mix - 设置布局水平混合反转
   *
   * @param reverse 是否反转水平混合
   */
  function setLayoutReverseHorizontalMix(reverse: boolean) {
    settings.value.layout.reverseHorizontalMix = reverse;
  }

  /** Cache theme settings - 缓存主题设置 */
  function cacheThemeSettings() {
    const isProd = import.meta.env.PROD;

    // 仅在生产环境缓存
    if (!isProd) return;

    // 将主题设置存储到本地存储
    localStg.set('themeSettings', settings.value);
  }

  // 监听页面关闭或刷新事件，缓存主题设置
  useEventListener(window, 'beforeunload', () => {
    cacheThemeSettings();
  });

  // 在作用域内运行监听器
  scope.run(() => {
    // 监听暗色模式变化
    watch(
      darkMode,
      val => {
        toggleCssDarkMode(val);
      },
      { immediate: true } // 立即执行一次
    );

    // 监听灰度模式和色盲模式变化
    watch(
      [grayscaleMode, colourWeaknessMode],
      val => {
        toggleAuxiliaryColorModes(val[0], val[1]);
      },
      { immediate: true } // 立即执行一次
    );

    // 监听主题颜色变化，更新CSS变量并存储主题色
    watch(
      themeColors,
      val => {
        setupThemeVarsToGlobal();
        localStg.set('themeColor', val.primary);
      },
      { immediate: true } // 立即执行一次
    );
  });

  /** On scope dispose - 作用域销毁时清理资源 */
  onScopeDispose(() => {
    scope.stop();
  });

  // 暴露store的状态和方法
  return {
    ...toRefs(settings.value), // 解构主题设置的所有属性为响应式引用
    darkMode, // 暗色模式状态
    themeColors, // 主题颜色对象
    naiveTheme, // Naive UI主题配置
    settingsJson, // 主题设置的JSON字符串
    setGrayscale, // 设置灰度模式的方法
    setColourWeakness, // 设置色盲模式的方法
    resetStore, // 重置store的方法
    setThemeScheme, // 设置主题方案的方法
    toggleThemeScheme, // 切换主题方案的方法
    updateThemeColors, // 更新主题颜色的方法
    setThemeLayout, // 设置主题布局的方法
    setLayoutReverseHorizontalMix // 设置布局水平混合反转的方法
  };
});
