// @ts-check
import { defineConfig } from 'astro/config';

import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import mdx from '@astrojs/mdx';
import franticContrast from './src/styles/frantic-contrast.json'

// https://astro.build/config
export default defineConfig({
  site: 'https://emaanr.github.io',
  trailingSlash: 'never',
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    }),
    shikiConfig: {
      // @ts-ignore
      theme: franticContrast,
    },
  },
});
