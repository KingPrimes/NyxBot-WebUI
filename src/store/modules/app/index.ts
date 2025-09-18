// 导入Vue相关函数和钩子
import { effectScope, nextTick, onScopeDispose, ref, watch } from 'vue';
// 导入Pinia的defineStore函数用于创建store
import { defineStore } from 'pinia';
// 导入VueUse的响应式断点、事件监听和页面标题工具
import { breakpointsTailwind, useBreakpoints, useEventListener, useTitle } from '@vueuse/core';
// 导入布尔值状态管理钩子
import { useBoolean } from '@sa/hooks';
// 导入storeID常量
import { SetupStoreId } from '@/enum';
// 导入路由实例
import { router } from '@/router';
// 导入国际化相关工具
import { $t, setLocale } from '@/locales';
// 导入dayjs日期库的国际化设置
import { setDayjsLocale } from '@/locales/dayjs';
// 导入本地存储工具
import { localStg } from '@/utils/storage';
// 导入其他store
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { useThemeStore } from '../theme';

/** 应用程序全局状态管理Store 负责管理应用程序级别的状态，如语言、布局、响应式状态等 */
export const useAppStore = defineStore(SetupStoreId.App, () => {
  // 引入其他store实例
  const themeStore = useThemeStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();

  // 创建effect作用域，用于管理响应式副作用
  const scope = effectScope();
  // 使用Tailwind的断点配置创建响应式断点检测
  const breakpoints = useBreakpoints(breakpointsTailwind);

  // 创建布尔值状态管理 - 主题抽屉可见性
  const { bool: themeDrawerVisible, setTrue: openThemeDrawer, setFalse: closeThemeDrawer } = useBoolean();
  // 创建布尔值状态管理 - 页面重载标志
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true);
  // 创建布尔值状态管理 - 全屏内容模式
  const { bool: fullContent, toggle: toggleFullContent } = useBoolean();
  // 创建布尔值状态管理 - 内容区域水平滚动
  const { bool: contentXScrollable, setBool: setContentXScrollable } = useBoolean();
  // 创建布尔值状态管理 - 侧边栏折叠状态
  const { bool: siderCollapse, setBool: setSiderCollapse, toggle: toggleSiderCollapse } = useBoolean();
  // 创建布尔值状态管理 - 混合布局侧边栏固定状态（从本地存储读取初始值）
  const {
    bool: mixSiderFixed,
    setBool: setMixSiderFixed,
    toggle: toggleMixSiderFixed
  } = useBoolean(localStg.get('mixSiderFixed') === 'Y');

  /** 响应式计算属性 - 是否为移动设备布局 当屏幕宽度小于sm断点时返回true */
  const isMobile = breakpoints.smaller('sm');

  /**
   * 重新加载页面
   *
   * @param duration 重载动画持续时间（毫秒）
   */
  async function reloadPage(duration = 300) {
    // 设置重载标志为false，触发页面卸载动画
    setReloadFlag(false);

    // 根据主题设置确定实际等待时间
    const d = themeStore.page.animate ? duration : 40;

    // 等待指定时间
    await new Promise(resolve => {
      setTimeout(resolve, d);
    });

    // 设置重载标志为true，触发页面重新加载
    setReloadFlag(true);

    // 如果主题重置缓存策略为refresh，则重置路由缓存
    if (themeStore.resetCacheStrategy === 'refresh') {
      routeStore.resetRouteCache();
    }
  }

  // 创建国际化语言状态（从本地存储读取初始值，默认为zh-CN）
  const locale = ref<App.I18n.LangType>(localStg.get('lang') || 'zh-CN');

  // 语言选项配置
  const localeOptions: App.I18n.LangOption[] = [
    {
      label: '中文',
      key: 'zh-CN'
    },
    {
      label: 'English',
      key: 'en-US'
    }
  ];

  /**
   * 切换应用程序语言
   *
   * @param lang 语言类型
   */
  function changeLocale(lang: App.I18n.LangType) {
    // 更新语言状态
    locale.value = lang;
    // 设置全局语言
    setLocale(lang);
    // 保存到本地存储
    localStg.set('lang', lang);
  }

  /** 根据当前语言更新文档标题 从路由元信息中获取标题或国际化key，并应用当前语言 */
  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta;

    // 优先使用国际化key获取标题，否则使用原始标题
    const documentTitle = i18nKey ? $t(i18nKey) : title;

    // 设置文档标题
    useTitle(documentTitle);
  }

  /** 初始化应用程序状态 */
  function init() {
    // 设置dayjs日期库的语言
    setDayjsLocale(locale.value);
  }

  // 在effect作用域内运行响应式监听
  scope.run(() => {
    // 监听设备是否为移动设备
    watch(
      isMobile,
      newValue => {
        if (newValue) {
          // 当进入移动设备模式时，备份当前主题设置
          localStg.set('backupThemeSettingBeforeIsMobile', {
            layout: themeStore.layout.mode,
            siderCollapse: siderCollapse.value
          });

          // 在移动设备上强制使用垂直布局并折叠侧边栏
          themeStore.setThemeLayout('vertical');
          setSiderCollapse(true);
        } else {
          // 当离开移动设备模式时，恢复之前备份的主题设置
          const backup = localStg.get('backupThemeSettingBeforeIsMobile');

          if (backup) {
            // 使用nextTick确保DOM更新后再恢复设置
            nextTick(() => {
              themeStore.setThemeLayout(backup.layout);
              setSiderCollapse(backup.siderCollapse);

              // 恢复后移除备份数据
              localStg.remove('backupThemeSettingBeforeIsMobile');
            });
          }
        }
      },
      { immediate: true } // 立即执行一次回调
    );

    // 监听语言变化
    watch(locale, () => {
      // 更新文档标题
      updateDocumentTitleByLocale();

      // 更新全局菜单的国际化文本
      routeStore.updateGlobalMenusByLocale();

      // 更新标签页的国际化文本
      tabStore.updateTabsByLocale();

      // 更新dayjs日期库的语言
      setDayjsLocale(locale.value);
    });
  });

  // 在窗口关闭前保存侧边栏固定状态到本地存储
  useEventListener(window, 'beforeunload', () => {
    localStg.set('mixSiderFixed', mixSiderFixed.value ? 'Y' : 'N');
  });

  /** Store作用域销毁时的清理函数 */
  onScopeDispose(() => {
    // 停止effect作用域，清理所有响应式副作用
    scope.stop();
  });

  // 初始化应用程序状态
  init();

  // 导出store的状态和方法
  return {
    isMobile, // 是否为移动设备布局
    reloadFlag, // 页面重载标志
    reloadPage, // 页面重载方法
    fullContent, // 是否为全屏内容模式
    locale, // 当前语言
    localeOptions, // 语言选项列表
    changeLocale, // 切换语言方法
    themeDrawerVisible, // 主题抽屉可见性
    openThemeDrawer, // 打开主题抽屉方法
    closeThemeDrawer, // 关闭主题抽屉方法
    toggleFullContent, // 切换全屏内容模式方法
    contentXScrollable, // 内容区域是否允许水平滚动
    setContentXScrollable, // 设置内容区域水平滚动方法
    siderCollapse, // 侧边栏是否折叠
    setSiderCollapse, // 设置侧边栏折叠状态方法
    toggleSiderCollapse, // 切换侧边栏折叠状态方法
    mixSiderFixed, // 混合布局侧边栏是否固定
    setMixSiderFixed, // 设置混合布局侧边栏固定状态方法
    toggleMixSiderFixed // 切换混合布局侧边栏固定状态方法
  };
});
