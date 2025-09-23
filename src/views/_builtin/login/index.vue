<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { loginModuleRecord } from '@/constants/app';
import PwdLogin from './modules/pwd-login.vue';

/** 登录页面组件的属性接口定义 */
interface Props {
  /** 登录模块类型，决定显示哪个登录组件 */
  module?: UnionKey.LoginModule;
}

// 定义组件属性
const props = defineProps<Props>();

// 获取应用状态管理实例
const appStore = useAppStore();
// 获取主题状态管理实例
const themeStore = useThemeStore();

/** 登录模块配置接口，包含模块显示标签和对应的组件 */
interface LoginModule {
  label: string;
  component: Component;
}

/** 登录模块映射表，将模块类型与具体配置关联 */
const moduleMap: Record<UnionKey.LoginModule, LoginModule> = {
  'pwd-login': { label: loginModuleRecord['pwd-login'], component: PwdLogin }
};

/** 计算当前活动的登录模块 如果未指定模块，则默认使用密码登录模块 */
const activeModule = computed(() => moduleMap[props.module || 'pwd-login']);
</script>

<template>
  <!-- 登录页面主容器，使用flex布局居中内容 -->
  <div class="relative size-full flex-center overflow-hidden">
    <!-- 波浪背景组件 -->
    <WaveBg />
    <!-- 登录卡片容器，使用NCard组件 -->
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-400px lt-sm:w-300px">
        <!-- 登录卡片头部，包含Logo、标题和设置按钮 -->
        <header class="flex-y-center justify-between">
          <!-- 系统Logo组件 -->
          <SystemLogo class="text-64px text-primary lt-sm:text-48px" />
          <!-- 系统标题，使用国际化文本 -->
          <h3 class="text-28px text-primary font-500 lt-sm:text-22px">{{ $t('system.title') }}</h3>
          <!-- 主题和语言设置区域 -->
          <div class="i-flex-col">
            <!-- 主题切换开关组件 -->
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px text-pink-500 lt-sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <!-- 语言切换组件 -->
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <!-- 登录卡片主体内容区域 -->
        <main class="pt-24px">
          <!-- 登录模块标题，根据当前活动模块动态显示 -->
          <h3 class="text-18px text-primary font-medium">{{ $t(activeModule.label) }}</h3>
          <div class="pt-24px">
            <!-- 登录模块切换动画，应用主题中定义的页面动画模式 -->
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <!-- 动态渲染当前活动的登录模块组件 -->
              <component :is="activeModule.component" />
            </Transition>
          </div>
        </main>
      </div>
    </NCard>
  </div>
</template>

<!-- 完全移除内联样式块 -->
<style scoped></style>
