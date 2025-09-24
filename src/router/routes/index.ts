import type { CustomRoute, ElegantConstRoute, ElegantRoute } from '@elegant-router/types';
import { generatedRoutes } from '../elegant/routes';
import { layouts, views } from '../elegant/imports';
import { transformElegantRoutesToVueRoutes } from '../elegant/transform';

/**
 * custom routes
 *
 * @link https://github.com/soybeanjs/elegant-router?tab=readme-ov-file#custom-route
 */
const customRoutes: CustomRoute[] = [
  {
    name: 'document',
    path: '/document',
    component: 'layout.base$view.iframe-page',
    meta: {
      title: 'Document',
      i18nKey: 'route.document',
      icon: 'mdi:file-document-outline',
      iconColor: '#ff6bf3ff',
      constant: true,
      showInMenu: true,
      href: 'https://kingprimes.top/posts/1bb16eb/',
      order: 998
    }
  },
  {
    name: 'reward',
    path: '/reward',
    component: 'layout.base$view.iframe-page',
    meta: {
      title: 'Appreciation',
      i18nKey: 'route.reward',
      icon: 'mdi:currency-twd',
      iconColor: '#ff6bf3ff',
      constant: true,
      showInMenu: true,
      href: 'https://kingprimes.top/reward/',
      order: 999
    }
  }
];

/** create routes when the auth route mode is static */
export function createStaticRoutes() {
  const constantRoutes: ElegantRoute[] = [];

  const authRoutes: ElegantRoute[] = [];

  [...customRoutes, ...generatedRoutes].forEach(item => {
    if (item.meta?.constant) {
      constantRoutes.push(item);
    } else {
      authRoutes.push(item);
    }
  });

  return {
    constantRoutes,
    authRoutes
  };
}

/**
 * Get auth vue routes
 *
 * @param routes Elegant routes
 */
export function getAuthVueRoutes(routes: ElegantConstRoute[]) {
  return transformElegantRoutesToVueRoutes(routes, layouts, views);
}
