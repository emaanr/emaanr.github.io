// @ts-check
import { defineConfig } from 'astro/config';
import franticContrast from './src/styles/frantic-contrast.json'


// https://astro.build/config
export default defineConfig({
  site: 'https://emaanr.github.io',
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      // @ts-ignore
      theme: franticContrast,
    },
  },
});
