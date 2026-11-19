# SIMSENblog

Source for **[simsenblog.dk](https://www.simsenblog.dk)**: Microsoft Intune, Windows, macOS and endpoint security, by Simon Hartmann Eriksen.

The site moved from WordPress to a static site in November 2026. Every post is a Markdown file in this repository; GitHub Actions builds the site and publishes it to GitHub Pages.

## How it's built

- **[Astro](https://astro.build) + Tailwind CSS**: Markdown in, static HTML out. No server-side code, database, plugins or login page.
- **WordPress URLs kept**: posts stay on `/YYYY/MM/DD/<slug>/`, old pages are redirected, and old category and tag links land on the matching filter or search.
- **RSS compatible with WordPress**: same feed addresses and item IDs, so subscribers and aggregators didn't notice the move.
- **Search**: instant filtering of the post list, plus full-text search across every article with [Pagefind](https://pagefind.app), all in the browser.
- **Security**: a Content Security Policy on every page, Actions pinned to commit SHAs, Dependabot, and a protected `main` branch.
- **Small extras**: step-by-step image galleries, a lightbox, and a mini-game at the top of each page.

## Run it locally

Requires Node.js 22.23 or newer.

```sh
git clone https://github.com/Simsen/simsenblog.git
cd simsenblog
npm install
npm run dev     # http://localhost:4321
```

## More

- [Writing and publishing posts](docs/writing.md): post format, writing tips, drafts
- [Operations](docs/operations.md): project layout, search, security, hosting and DNS

## Content

The posts, images and design are © Simon Hartmann Eriksen. Questions or corrections: [open an issue](https://github.com/Simsen/simsenblog/issues) or get in touch via [simsenblog.dk/about](https://www.simsenblog.dk/about/).
