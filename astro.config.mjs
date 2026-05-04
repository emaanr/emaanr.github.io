// @ts-check
import { defineConfig } from 'astro/config';
import franticContrast from './src/styles/frantic-contrast.json'
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://emaanr.github.io',
  trailingSlash: 'never',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      // @ts-ignore
      theme: franticContrast,
    },
  },
});
