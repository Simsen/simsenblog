// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

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
    '/msi-info-www-msiinfo-com/': '/tools/#msiinfo',
    '/pppc-builder/': '/tools/#macpppc',
    '/edge-favorit-builder/': '/tools/',
    '/reference/': '/about/',
    '/intuneinsiderdk/': 'https://www.youtube.com/@IntuneInsiderDK',
  },
  // sitemap-index.xml for search engines. Redirect pages and the feed copy at /feed/ are left out.
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/category/') && !page.endsWith('/feed/'),
    }),
  ],
  // Content Security Policy as a <meta> tag (GitHub Pages can't send headers). Astro hashes every
  // inline script, so only the site's own scripts run; injected scripts are blocked.
  // Code blocks use inline style="" colours, so styles allow 'unsafe-inline' (no script risk).
  // Formspree / Web3Forms are allowed so the contact form works once it's configured.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "media-src 'self'",
        "font-src 'self'",
        "connect-src 'self' https://formspree.io https://api.web3forms.com",
        "form-action 'self' https://formspree.io https://api.web3forms.com",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'",
        'upgrade-insecure-requests',
      ],
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
