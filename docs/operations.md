# Operations

How the site is built, hosted and secured. For writing posts, see [writing.md](writing.md).

## Run it on your machine

Requires Node.js 22.23 or newer.

```sh
git clone https://github.com/Simsen/simsenblog.git
cd simsenblog
npm install
npm run dev        # http://localhost:4321, reloads as you edit (drafts shown)
npm run validate   # check all posts
npm run check      # validate + full production build into dist/ (incl. search index)
npm run preview    # serve the built dist/ folder (full-text search works here, not in dev)
```

## How it's put together

```text
.github/workflows/
  publish.yml             Manual: validate → build → deploy to GitHub Pages
  validate-content.yml    Every push / PR: validate → build (no deploy)
  dependabot.yml          Monthly update PRs for npm packages and Actions (pinned to commit SHAs)
.claude/skills/new-post/  The /new-post command for writing a post with Claude Code
templates/new-post.md     Starting point for a new post, with every field and formatting example
public/                   Images (posts/<post-name>/ per post), downloads (Files/, cmtrace.exe), robots.txt
scripts/validate-content.mjs   Metadata, dates, duplicate URLs, missing images
src/
  content/blog/           One Markdown file per article
  content.config.ts       The post metadata schema
  lib/site.ts             Site name, links, categories, icons, contact form keys
  lib/posts.ts            URL scheme, sorting, drafts
  lib/tools.ts            The tools on /tools/ and in the sidebar
  lib/feed.ts             RSS feeds (WordPress-compatible addresses and item IDs)
  components/             Header, Footer, Sidebar, PostRow, ContactForm, InlineScript, the hero mini-games
  scripts/                gallery.ts (step-by-step galleries), lightbox.ts (click to enlarge)
  layouts/BaseLayout.astro
  pages/index.astro       Blog: topic filters, search (titles + full text), show more
  pages/[...slug].astro   Article pages at /YYYY/MM/DD/<file-name>/
  pages/                  tools, course, links, about, 404, feed addresses
  styles/global.css       Theme tokens and all component styles
```

URLs follow the WordPress pattern `/YYYY/MM/DD/<slug>/` with a trailing slash, so existing links to simsenblog.dk keep working. Old WordPress addresses that moved are redirected in `astro.config.mjs`; old `/category/` and `/tag/` links land on the matching filter or search.

### Search

The search box filters the post list by title, description and tags as you type. Below it, "Found in the article text" lists posts that only mention the words inside the article. That part uses [Pagefind](https://pagefind.app): `npm run build` indexes the article text of every post into `dist/pagefind/`, and the browser downloads only the small parts of the index it needs. No server or outside service is involved.

### Security

- Static files only: no server-side code, database, login page or plugins on the website.
- Content Security Policy in every page (`astro.config.mjs`): only the site's own scripts run (inline scripts by hash, via `InlineScript.astro`).
- `main` is protected against force-push and deletion. Secret scanning, push protection and Dependabot security updates are on.
- Verify `simsenblog.dk` under the GitHub account's **Settings → Pages**, so no one else can use the domain there (TXT record `_github-pages-challenge-simsen` at one.com).

## Hosting and domain

- GitHub Pages, deployed by **Actions → Publish website**, with HTTPS enforced.
- DNS at one.com: `simsenblog.dk` → GitHub Pages IPs (A/AAAA `185.199.108–111.153`, `2606:50c0:8000–8003::153`), `www` → CNAME `simsen.github.io`. GitHub redirects `simsenblog.dk` to `www.simsenblog.dk`.
- Email (Microsoft 365 MX, autodiscover, SPF, DKIM) is separate and unaffected.
