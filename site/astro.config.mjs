import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.lescarthaginoix.com',
  integrations: [sitemap()],
  // Précharge les pages liées dès qu'elles apparaissent à l'écran : la navigation est quasi instantanée.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
