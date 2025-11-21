/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { useRouterPush } from '@/hooks/common/router';
import { changeUsername, fetchGetUserInfo, fetchLogin, restorePassword } from '@/service/api';
import { localStg } from '@/utils/storage';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  // 导入路由实例，用于访问当前路由信息
  const route = useRoute();
  // 导入路由存储，用于管理应用路由状态
  const routeStore = useRouteStore();
  // 导入标签页存储，用于管理应用标签页状态
  const tabStore = useTabStore();
  // 导入路由跳转工具函数，设置为非全局加载状态
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  // 导入登录加载状态管理工具，用于控制登录过程中的加载状态
  const { loading: loginLoading, startLoading, endLoading } = useLoading();
  // 创建响应式的token引用，初始值从本地存储获取
  const token = ref(getToken());

  // 创建响应式的用户信息对象，类型为Api.Auth.UserInfo
  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '', // 用户ID
    userName: '', // 用户名
    roles: [], // 用户角色列表
    buttons: [] // 用户权限按钮列表
  });

  /** 判断在静态路由模式下用户是否为超级管理员角色 仅在VITE_AUTH_ROUTE_MODE配置为'static'且用户角色包含VITE_STATIC_SUPER_ROLE时返回true */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** 判断用户是否已登录 当token存在时返回true，否则返回false */
  const isLogin = computed(() => Boolean(token.value));
  /**
   * 重置认证状态
   *
   * 此函数用于完全清除用户的认证状态，包括清除本地存储的认证信息、 重置认证store、重定向到登录页面以及重置相关的应用状态
   *
   * 执行流程：
   *
   * 1. 清除本地存储中的认证信息（如token等）
   * 2. 重置认证store中的状态
   * 3. 判断当前路由是否为常量路由，如不是则重定向到登录页面
   * 4. 缓存当前标签页状态
   * 5. 重置路由状态
   */
  async function resetStore() {
    // 获取认证store实例
    const authStore = useAuthStore();

    // 清除本地存储中的所有认证相关信息（如token、用户信息等）
    clearAuthStorage();

    // 重置认证store中的状态到初始值
    authStore.$reset();

    // 判断当前路由是否为常量路由（不受认证状态影响的路由）
    // 如果不是常量路由，则重定向到登录页面
    if (!route.meta.constant) {
      await toLogin();
    }

    // 缓存当前标签页状态，确保应用状态的一致性
    tabStore.cacheTabs();

    // 重置路由store状态，清除可能存在的路由相关临时数据
    routeStore.resetStore();
  }

  /**
   * 用户登录函数
   *
   * @param userName 用户输入的用户名
   * @param password 用户输入的密码
   * @param [redirect=true] 登录成功后是否自动重定向，默认为true. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    // 标记登录操作开始，显示加载状态
    startLoading();

    // 调用登录API，获取登录token
    const { data: loginToken, error } = await fetchLogin(userName, password);

    // 判断登录是否成功（无错误）
    if (!error) {
      // 使用获取到的token完成登录流程
      const pass = await loginByToken(loginToken);

      // 判断token登录是否成功
      if (pass) {
        // 根据参数决定是否重定向页面
        await redirectFromLogin(redirect);

        // 当路由初始化完成后，显示登录成功通知
        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: $t('page.login.common.loginSuccess'),
            content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
            duration: 4500
          });
        }
      }
    } else {
      // 登录失败时，重置认证状态
      resetStore();
    }

    // 标记登录操作结束，隐藏加载状态
    endLoading();
  }

  /**
   * 通过登录token完成用户登录
   *
   * 该函数主要负责处理登录token的存储、用户信息获取和登录状态更新
   *
   * @param loginToken 登录成功后获取的token对象，包含访问token和刷新token
   * @returns boolean - 登录是否成功完成
   */
  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. 将token和refreshToken存储到localStorage中，后续API请求需要在请求头中使用这些token
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);

    // 2. 使用token获取用户详细信息
    const pass = await getUserInfo();

    // 检查用户信息获取是否成功
    if (pass) {
      // 更新Pinia store中的token状态，标记用户已登录
      token.value = loginToken.token;

      // 返回登录成功结果
      return true;
    }

    // 用户信息获取失败，返回登录失败结果
    return false;
  }

  /**
   * 获取当前登录用户的详细信息
   *
   * 该函数通过API获取用户信息，并在获取成功后更新store中的用户信息状态
   *
   * @returns boolean - 用户信息获取是否成功
   */
  async function getUserInfo() {
    // 调用API获取用户信息
    const { data: info, error } = await fetchGetUserInfo();

    // 判断用户信息获取是否成功（无错误）
    if (!error) {
      // 将获取到的用户信息合并到store中的userInfo对象
      Object.assign(userInfo, info);

      // 返回获取成功结果
      return true;
    }

    // 用户信息获取失败，返回失败结果
    return false;
  }

  /**
   * 初始化用户信息
   *
   * 此函数在应用启动或需要验证用户登录状态时调用，用于检查本地是否存在认证令牌 并尝试通过令牌获取用户信息，以自动恢复用户登录状态
   *
   * 执行流程：
   *
   * 1. 检查本地存储中是否存在认证令牌
   * 2. 如果存在令牌，尝试获取用户详细信息
   * 3. 如果获取用户信息失败，则重置认证状态
   */
  async function initUserInfo() {
    // 检查本地存储中是否存在认证令牌
    const hasToken = getToken();

    // 如果存在令牌，尝试获取用户信息以验证令牌有效性
    if (hasToken) {
      // 调用getUserInfo获取用户详情并验证令牌
      const pass = await getUserInfo();

      // 如果用户信息获取失败（可能是令牌过期或无效），则重置store状态
      if (!pass) {
        resetStore();
      }
    }
  }

  /**
   * 重置用户密码
   *
   * 此函数用于用户修改密码，需要提供旧密码以及两次确认的新密码 执行密码重置操作并根据结果显示相应的通知
   *
   * @param oldPassword 原密码，用于验证用户身份
   * @param newPassword 新密码
   * @param confirmPassword 确认新密码，用于确保两次输入的新密码一致
   *
   *   注意：函数名存在拼写错误(应为resetPassword)，且通知逻辑中有问题(成功通知也使用了error.msg)
   */
  async function restPassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    // 开始加载状态，通常会显示加载指示器
    startLoading();
    try {
      // 调用密码重置API，传入旧密码和新密码信息
      const { error } = await restorePassword(oldPassword, newPassword, confirmPassword);

      // 根据API返回结果显示相应通知
      if (!error) {
        window.$notification?.success({
          title: (error as any).msg,
          content: (error as any).msg,
          duration: 4500
        });
      } else {
        // 显示错误通知
        window.$notification?.error({
          title: (error as any).msg,
          content: (error as any).msg,
          duration: 4500
        });
      }
    } catch (e) {
      // 发生异常时重置整个认证状态
      resetStore();
    } finally {
      // 无论成功失败都结束加载状态
      endLoading();
    }
  }

  /**
   * 修改用户名
   *
   * 此函数用于用户修改用户名，需要提供新用户名和当前密码进行验证
   *
   * @param newUsername 新用户名
   * @param password 当前密码，用于验证用户身份
   */
  async function updateUsername(newUsername: string, password: string) {
    // 开始加载状态
    startLoading();
    try {
      // 调用修改用户名API
      const { error } = await changeUsername(newUsername, password);

      // 根据API返回结果显示相应通知
      if (!error) {
        // 修改成功，更新store中的用户名
        userInfo.userName = newUsername;

        // 显示成功通知
        window.$notification?.success({
          title: $t('common.changeUsername.success'),
          content: $t('common.changeUsername.success'),
          duration: 4500
        });
      } else {
        // 显示错误通知
        window.$notification?.error({
          title: $t('common.changeUsername.error'),
          content: (error as any).msg || $t('common.changeUsername.error'),
          duration: 4500
        });
      }
    } catch (e) {
      // 发生异常时显示错误通知
      window.$notification?.error({
        title: $t('common.changeUsername.error'),
        content: $t('common.changeUsername.error'),
        duration: 4500
      });
    } finally {
      // 无论成功失败都结束加载状态
      endLoading();
    }
  }

  return {
    token,
    userInfo,
    isStaticSuper,
    isLogin,
    loginLoading,
    resetStore,
    login,
    initUserInfo,
    restPassword,
    updateUsername
  };
});
