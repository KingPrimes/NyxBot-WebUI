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
        meta.hideInMenu = true;
      }

      if (key === "iframe-page") {
        meta.constant = true;
        meta.hideInMenu = true;
        meta.keepAlive = true;
      }

      const iconMap: Record<string, string> = {
        home: "mdi:monitor-dashboard",
        log: "mdi:clipboard-text-outline",
        log_command: "mdi:console",
        "log_real-time": "mdi:timeline-text",
        config: "mdi:cog",
        config_admin: "mdi:shield-account",
        config_service: "mdi:server",
        config_blacklist: "mdi:account-multiple-remove",
        config_blacklist_group: "mdi:account-multiple-remove",
        config_blacklist_personal: "mdi:account-remove",
        config_subscription: "mdi:bell-ring-outline",
        config_whitelist: "mdi:account-multiple-check",
        config_whitelist_group: "mdi:account-multiple-check",
        config_whitelist_personal: "mdi:account-check",
        "local-data": "mdi:database",

        "local-data_warframe": "mdi:gamepad-variant",
        "local-data_warframe_alias": "mdi:tag-text-outline",
        "local-data_warframe_lich-sister": "mdi:skull-crossbones",
        "local-data_warframe_market": "mdi:store-outline",
        "local-data_warframe_market-riven": "mdi:diamond-stone",
        "local-data_warframe_night-wave": "mdi:signal",
        "local-data_warframe_nodes": "mdi:vector-arrange-below",
        "local-data_warframe_phantom": "mdi:ghost",
        "local-data_warframe_relics": "mdi:treasure-chest",
        "local-data_warframe_reward-pool": "mdi:gift-outline",
        "local-data_warframe_riven-analyse": "mdi:chart-timeline-variant",
        "local-data_warframe_riven-tion": "mdi:format-list-text",
        "local-data_warframe_riven-tion-alias": "mdi:tag-multiple-outline",
        "local-data_warframe_state-translation": "mdi:translate",
        "local-data_warframe_warframes": "mdi:shield",
        "local-data_warframe_weapons": "mdi:sword-cross",
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
        config_subscription: 6,
        config_whitelist: 5,
        config_whitelist_group: 1,
        config_whitelist_personal: 2,
        "local-data": 5,
        "local-data_warframe": 1,
        "local-data_warframe_alias": 1,
        "local-data_warframe_lich-sister": 5,
        "local-data_warframe_market": 2,
        "local-data_warframe_market-riven": 3,
        "local-data_warframe_night-wave": 6,
        "local-data_warframe_nodes": 7,
        "local-data_warframe_phantom": 4,
        "local-data_warframe_relics": 8,
        "local-data_warframe_reward-pool": 9,
        "local-data_warframe_riven-analyse": 10,
        "local-data_warframe_riven-tion": 11,
        "local-data_warframe_riven-tion-alias": 12,
        "local-data_warframe_state-translation": 13,
        "local-data_warframe_warframes": 14,
        "local-data_warframe_weapons": 15,
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
