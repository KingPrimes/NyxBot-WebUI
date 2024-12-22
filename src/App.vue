<script setup lang="ts">
// 引入Vue的computed函数，用于创建计算属性
import {computed} from 'vue';
// 引入Naive UI的水印组件的属性类型
import type {WatermarkProps} from 'naive-ui';
// 引入Naive UI的配置提供者和暗黑主题
import {darkTheme, NConfigProvider} from 'naive-ui';
// 引入应用状态管理
import {useAppStore} from './store/modules/app';
// 引入主题状态管理
import {useThemeStore} from './store/modules/theme';
// 引入Naive UI的本地化配置
import {naiveDateLocales, naiveLocales} from './locales/naive';

// 定义组件选项，设置组件名称为'App'
defineOptions({
  name: 'App'
});

// 获取应用状态实例
const appStore = useAppStore();
// 获取主题状态实例
const themeStore = useThemeStore();

// 计算属性，根据主题状态中的暗黑模式开关返回相应的主题
const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined));

// 计算属性，根据应用状态中的语言设置返回相应的Naive UI本地化配置
const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

// 计算属性，根据应用状态中的语言设置返回相应的Naive UI日期本地化配置
const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

// 计算属性，返回水印组件的配置属性
const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: themeStore.watermark.text, // 水印内容
    cross: true, // 是否交叉显示水印
    fullscreen: true, // 是否全屏显示水印
    fontSize: 16, // 字体大小
    lineHeight: 16, // 行高
    width: 384, // 水印宽度
    height: 384, // 水印高度
    xOffset: 12, // 水印水平偏移
    yOffset: 60, // 水印垂直偏移
    rotate: -15, // 水印旋转角度
    zIndex: 9999 // 水印层级
  };
});
</script>

<template>
  <!-- Naive UI的配置提供者组件，用于全局配置Naive UI组件的主题、本地化等 -->
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <!-- 应用提供者组件，用于提供全局状态等 -->
    <AppProvider>
      <!-- 路由视图组件，用于显示当前路由对应的组件 -->
      <RouterView class="bg-layout" />
      <!-- Naive UI的水印组件，根据主题状态中的水印可见性决定是否显示 -->
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
