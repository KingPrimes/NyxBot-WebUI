export {};

declare module "*.vue" {
  import type { Component } from "vue";
  const component: Component;
  export default component;
}

declare global {
  export interface Window {
    /** NProgress instance */
    NProgress?: import("nprogress").NProgress;
    /** Loading bar instance */
    $loadingBar?: import("naive-ui").LoadingBarProviderInst;
    /** Dialog instance */
    $dialog?: import("naive-ui").DialogProviderInst;
    /** Message instance */
    $message?: import("naive-ui").MessageProviderInst;
    /** Notification instance */
    $notification?: import("naive-ui").NotificationProviderInst;
  }

  /** Build time of the project */
  export const BUILD_TIME: string;
}
