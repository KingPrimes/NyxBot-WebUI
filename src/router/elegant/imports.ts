/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from "@elegant-router/types";

import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<LastLevelRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import("@/views/_builtin/403/index.vue"),
  404: () => import("@/views/_builtin/404/index.vue"),
  500: () => import("@/views/_builtin/500/index.vue"),
  "iframe-page": () => import("@/views/_builtin/iframe-page/[url].vue"),
  login: () => import("@/views/_builtin/login/index.vue"),
  "rest-password": () => import("@/views/_builtin/rest-password/index.vue"),
  config_admin: () => import("@/views/config/admin/index.vue"),
  config_blacklist_group: () => import("@/views/config/blacklist/group/index.vue"),
  config_blacklist_personal: () => import("@/views/config/blacklist/personal/index.vue"),
  config_git: () => import("@/views/config/git/index.vue"),
  config_service: () => import("@/views/config/service/index.vue"),
  config_token: () => import("@/views/config/token/index.vue"),
  config_whitelist_group: () => import("@/views/config/whitelist/group/index.vue"),
  config_whitelist_personal: () => import("@/views/config/whitelist/personal/index.vue"),
  home: () => import("@/views/home/index.vue"),
  "local-data_warframe_alias": () => import("@/views/local-data/warframe/alias/index.vue"),
  "local-data_warframe_market-riven": () => import("@/views/local-data/warframe/market-riven/index.vue"),
  "local-data_warframe_market": () => import("@/views/local-data/warframe/market/index.vue"),
  "local-data_warframe_phantom": () => import("@/views/local-data/warframe/phantom/index.vue"),
  "local-data_warframe_riven": () => import("@/views/local-data/warframe/riven/index.vue"),
  "local-data_warframe_subscription": () => import("@/views/local-data/warframe/subscription/index.vue"),
  "local-data_warframe_translation": () => import("@/views/local-data/warframe/translation/index.vue"),
  "local-data_warframe_untranslated": () => import("@/views/local-data/warframe/untranslated/index.vue"),
  log_command: () => import("@/views/log/command/index.vue"),
  "log_real-time": () => import("@/views/log/real-time/index.vue"),
};
