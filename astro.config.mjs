import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tu-dominio.com',
  output: 'static', // Astro 5.18+: static = old hybrid behavior
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), sitemap()],
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: false }),
    },
  },
});
