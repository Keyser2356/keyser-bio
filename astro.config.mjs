import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  server: {
    port: 3000,
    host: true,
  },
  vite: {
    esbuild: {
      target: 'esnext',
    },
  },
});
