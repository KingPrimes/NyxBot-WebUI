import { createApp } from 'vue';
import './plugins/assets';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import App from './App.vue';

/** 应用初始化函数 该函数负责按照特定顺序初始化应用的各个核心模块 使用异步函数以便支持路由等需要异步初始化的模块 */
async function setupApp() {
  // 1. 设置全局加载状态管理
  setupLoading();

  // 2. 设置页面顶部进度条
  setupNProgress();

  // 3. 初始化离线图标支持
  setupIconifyOffline();

  // 4. 配置日期时间处理库 dayjs
  setupDayjs();

  // 5. 创建 Vue 应用实例
  const app = createApp(App);

  // 6. 设置 Pinia/Vuex 状态管理
  setupStore(app);

  // 7. 异步设置路由系统，等待路由配置完成
  await setupRouter(app);

  // 8. 设置国际化支持
  setupI18n(app);

  // 9. 配置应用版本更新通知
  setupAppVersionNotification();

  // 10. 将应用挂载到 DOM 中指定的 #app 元素
  app.mount('#app');
}

// 调用应用初始化函数启动应用
setupApp();
