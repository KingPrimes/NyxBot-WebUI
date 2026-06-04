import { localStg } from "@/utils/storage";

/** Get token */
export function getToken() {
  return localStg.get("token") || "";
}

/** Clear auth storage */
export function clearAuthStorage() {
  localStg.remove("token");
  localStg.remove("refreshToken");
}

/**
 * Decode JWT and get expiration timestamp in milliseconds
 *
 * @returns Expiration time in ms, or null if decoding fails
 */
export function getTokenExpTime(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}
