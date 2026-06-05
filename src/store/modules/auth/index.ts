import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { changeUsername, fetchGetUserInfo, fetchLogin, fetchRefreshToken, restorePassword } from '@/service/api';
import { useRouterPush } from '@/hooks/common/router';
import { localStg } from '@/utils/storage';
import { SetupStoreId } from '@/enum';
import { $t } from '@/locales';
import { useRouteStore } from '../route';
import { useTabStore } from '../tab';
import { clearAuthStorage, getToken, getTokenExpTime } from './shared';

export const useAuthStore = defineStore(SetupStoreId.Auth, () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const { toLogin, redirectFromLogin } = useRouterPush(false);
  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token = ref('');

  const userInfo: Api.Auth.UserInfo = reactive({
    userId: '',
    userName: '',
    roles: [],
    buttons: []
  });

  /** is super role in static route */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return VITE_AUTH_ROUTE_MODE === 'static' && userInfo.roles.includes(VITE_STATIC_SUPER_ROLE);
  });

  /** Is login */
  const isLogin = computed(() => Boolean(token.value));

  /** Timer for proactive token refresh */
  let refreshTimer: ReturnType<typeof setTimeout> | null = null;

  /** Proactively refresh token before it expires */
  async function refreshToken() {
    const { error, data } = await fetchRefreshToken();
    if (!error) {
      localStg.set('token', data.token);
      localStg.set('refreshToken', data.refreshToken);
      token.value = data.token;
      scheduleTokenRefresh();
      return true;
    }
    resetStore();
    return false;
  }

  /** Schedule a timer to refresh token 60 seconds before expiry */
  function scheduleTokenRefresh() {
    clearTokenRefreshTimer();
    const currentToken = localStg.get('token');
    if (!currentToken) return;

    const expTime = getTokenExpTime(currentToken);
    if (!expTime) return;

    const refreshAhead = 60_000;
    const delay = expTime - Date.now() - refreshAhead;

    if (delay <= 0) {
      refreshToken();
      return;
    }

    refreshTimer = setTimeout(() => {
      refreshToken();
    }, delay);
  }

  function clearTokenRefreshTimer() {
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
  }

  /** Reset auth store */
  async function resetStore() {
    clearTokenRefreshTimer();

    recordUserId();

    clearAuthStorage();

    authStore.$reset();

    if (!route.meta.constant) {
      await toLogin();
    }

    tabStore.cacheTabs();
    routeStore.resetStore();
  }

  /** Record the user ID of the previous login session Used to compare with the current user ID on next login */
  function recordUserId() {
    if (!userInfo.userId) {
      return;
    }

    // Store current user ID locally for next login comparison
    localStg.set('lastLoginUserId', userInfo.userId);
  }

  /**
   * Check if current login user is different from previous login user If different, clear all tabs
   *
   * @returns {boolean} Whether to clear all tabs
   */
  function checkTabClear(): boolean {
    if (!userInfo.userId) {
      return false;
    }

    const lastLoginUserId = localStg.get('lastLoginUserId');

    // Clear all tabs if current user is different from previous user
    if (!lastLoginUserId || lastLoginUserId !== userInfo.userId) {
      localStg.remove('globalTabs');
      tabStore.clearTabs();

      localStg.remove('lastLoginUserId');
      return true;
    }

    localStg.remove('lastLoginUserId');
    return false;
  }

  /**
   * Login
   *
   * @param userName User name
   * @param password Password
   * @param [redirect=true] Whether to redirect after login. Default is `true`
   */
  async function login(userName: string, password: string, redirect = true) {
    startLoading();

    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      const pass = await loginByToken(loginToken);

      if (pass) {
        scheduleTokenRefresh();

        // Check if the tab needs to be cleared
        const isClear = checkTabClear();
        let needRedirect = redirect;

        if (isClear) {
          // If the tab needs to be cleared,it means we don't need to redirect.
          needRedirect = false;
        }
        await redirectFromLogin(needRedirect);

        window.$notification?.success({
          title: $t('page.login.common.loginSuccess'),
          content: $t('page.login.common.welcomeBack', { userName: userInfo.userName }),
          duration: 4500
        });
      }
    } else {
      resetStore();
    }

    endLoading();
  }

  async function loginByToken(loginToken: Api.Auth.LoginToken) {
    // 1. stored in the localStorage, the later requests need it in headers
    localStg.set('token', loginToken.token);
    localStg.set('refreshToken', loginToken.refreshToken);

    // 2. get user info
    const pass = await getUserInfo();

    if (pass) {
      token.value = loginToken.token;

      return true;
    }

    return false;
  }

  async function getUserInfo() {
    const { data: info, error } = await fetchGetUserInfo();

    if (!error) {
      // update store
      Object.assign(userInfo, info);

      return true;
    }

    return false;
  }

  async function initUserInfo() {
    const maybeToken = getToken();

    if (maybeToken) {
      token.value = maybeToken;
      const pass = await getUserInfo();

      if (!pass) {
        resetStore();
      } else {
        scheduleTokenRefresh();
      }
    }
  }

  /**
   * Reset password
   *
   * @param oldPassword Old password
   * @param newPassword New password
   * @param confirmPassword Confirm new password
   */
  async function restPassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    startLoading();
    const { error } = await restorePassword(oldPassword, newPassword, confirmPassword);

    if (!error) {
      window.$notification?.success({
        title: $t('common.restPassword.success'),
        content: $t('common.restPassword.success'),
        duration: 4500
      });
      resetStore();
    } else {
      window.$notification?.error({
        title: $t('common.restPassword.error'),
        content: $t('common.restPassword.error'),
        duration: 4500
      });
    }

    endLoading();
  }

  /**
   * Update username
   *
   * @param newUsername New username
   * @param password Current password
   */
  async function updateUsername(newUsername: string, password: string) {
    startLoading();
    const { error } = await changeUsername(newUsername, password);

    if (!error) {
      window.$notification?.success({
        title: $t('common.changeUsername.success'),
        content: $t('common.changeUsername.success'),
        duration: 4500
      });
      resetStore();
    } else {
      window.$notification?.error({
        title: $t('common.changeUsername.error'),
        content: $t('common.changeUsername.error'),
        duration: 4500
      });
    }

    endLoading();
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
