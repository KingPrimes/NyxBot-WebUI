import type { RouteMeta } from "vue-router";
import ElegantVueRouter from "@elegant-router/vue/vite";
import type { RouteKey } from "@elegant-router/types";

export function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: "src/layouts/base-layout/index.vue",
      blank: "src/layouts/blank-layout/index.vue",
    },
    routePathTransformer(routeName, routePath) {
      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ["login", "403", "404", "500"];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as App.I18n.I18nKey,
      };

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      const iconMap: Record<string, string> = {
        home: "mdi:monitor-dashboard",
        log: "mdi:file-document-outline",
        config: "mdi:cog",
        config_admin: "mdi:account",
        config_service: "mdi:server",
        config_blacklist: "mdi:account-group",
        config_blacklist_group: "mdi:account-group",
        config_blacklist_personal: "mdi:account-group",
        config_whitelist: "mdi:account-group-outline",
        config_whitelist_group: "mdi:account-group-outline",
        config_whitelist_personal: "mdi:account-group-outline",
        "local-data": "mdi:folder",

        "local-data_warframe": "mdi:gamepad-variant",
        "local-data_warframe_alias": "mdi:gamepad-variant",
        "local-data_warframe_market": "mdi:cart",
        "local-data_warframe_market-riven": "mdi:diamond-stone",
        "local-data_warframe_phantom": "mdi:ghost",
        "local-data_warframe_subscription": "mdi:bell-ring",
        document: "mdi:file-document-outline",
        reward: "mdi:currency-twd",
      };

      if (iconMap[key]) {
        meta.icon = iconMap[key];
      }

      const orderMap: Record<string, number> = {
        home: 1,
        log: 2,
        log_command: 1,
        "log_real-time": 2,
        config: 3,
        config_admin: 3,
        config_service: 2,
        config_blacklist: 4,
        config_blacklist_group: 1,
        config_blacklist_personal: 2,
        config_whitelist: 5,
        config_whitelist_group: 1,
        config_whitelist_personal: 2,
        "local-data": 5,
        "local-data_warframe": 1,
        "local-data_warframe_alias": 1,
        "local-data_warframe_market": 2,
        "local-data_warframe_market-riven": 3,
        "local-data_warframe_phantom": 4,
        "local-data_warframe_subscription": 6,
        document: 998,
        reward: 999,
      };

      if (key in orderMap) {
        meta.order = orderMap[key];
      }

      return meta;
    },
  });
}
