// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  integrations: [
    mdx(),
    sitemap(),
    react(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: vercel({}),
});
