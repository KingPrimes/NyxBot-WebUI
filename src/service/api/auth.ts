import { request } from "../request";

/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/login",
    method: "post",
    data: {
      userName,
      password,
    },
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<Api.Auth.UserInfo>({ url: "/auth/info" });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: "/auth/refreshToken",
    method: "post",
    data: {
      refreshToken,
    },
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: "/auth/error", params: { code, msg } });
}

/**
 * Restore password
 *
 * @param oldPassword Old password
 * @param newPassword New password
 * @param confirmPassword Confirm new password
 */
export function restorePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
  return request({
    url: "/auth/restPassword",
    method: "post",
    data: {
      oldPassword,
      newPassword,
      confirmPassword,
    },
  });
}

/**
 * Change username
 *
 * @param username New username
 * @param password Current password
 */
export function changeUsername(username: string, password: string) {
  return request({
    url: "/auth/changeUsername",
    method: "post",
    data: {
      username,
      password,
    },
  });
}
