// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.simsenblog.dk',
  // WordPress URLs end in a slash (/2026/10/18/my-post/). Keep that so old links resolve.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Start loading a page when the visitor hovers or focuses a link, so it opens instantly.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Old WordPress URLs that moved.
  redirects: {
    '/category/tools/': '/tools/',
  },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
