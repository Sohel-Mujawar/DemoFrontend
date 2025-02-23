import {defineConfig} from 'vite';
import viteReact from '@vitejs/plugin-react';
import {TanStackRouterVite} from '@tanstack/router-plugin/vite';
import {resolve} from 'path';

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  base: 'https://tmssuccess.biz/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
  },
});
