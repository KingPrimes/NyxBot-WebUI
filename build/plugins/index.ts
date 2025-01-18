import { resolve } from 'node:path';
import { existsSync, mkdirSync, renameSync } from 'node:fs';
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevtools from 'vite-plugin-vue-devtools';
import progress from 'vite-plugin-progress';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
import { setupHtmlPlugin } from './html';

function moveIndexHtmlPlugin(): PluginOption {
  return {
    name: 'move-index-html',
    closeBundle() {
      const templatesDir = resolve(__dirname, '../../resources/templates');
      const staticDir = resolve(__dirname, '../../resources/static');

      if (!existsSync(templatesDir)) {
        mkdirSync(templatesDir, { recursive: true });
      }

      const indexPath = resolve(staticDir, 'index.html');
      if (existsSync(indexPath)) {
        renameSync(indexPath, resolve(templatesDir, 'index.html'));
      }
    }
  };
}

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    VueDevtools(),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime),
    moveIndexHtmlPlugin()
  ];

  return plugins;
}
