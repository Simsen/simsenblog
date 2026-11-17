# SIMSENblog 2.0

Source for [simsenblog.dk](https://www.simsenblog.dk): Microsoft Intune, Windows, macOS and endpoint security by Simon Hartmann Eriksen.

Built with [Astro](https://astro.build) and Tailwind CSS from Markdown files, published to GitHub Pages by a GitHub Actions workflow. Everything (posts, images, templates and the publishing workflow) is public in this repository.

## Publish a post

1. **Write** a Markdown file with a metadata block at the top (see [Post format](#post-format)).
   Name it the way you want the URL to read: `my-new-intune-guide.md` → `/2026/11/16/my-new-intune-guide/`.
2. **Upload** it to `src/content/blog/`, and its images to `public/images/posts/<post-name>/`.
   In the GitHub web interface: open the folder → **Add file → Upload files** → **Commit changes**.
3. **Publish**: go to **Actions → Publish website → Run workflow**.
   The workflow checks every post, builds the site and deploys it. If a check fails, the run stops before anything goes live, and the log names the file and the problem.

**To correct a post**, edit the same file and run **Publish website** again. The URL comes from the date and file name, so changing the title or text never breaks links. Don't rename the file or change the date of a published post.

> Every push also runs **Validate content**, which checks and builds without publishing, so you'll see problems before you run Publish.

## Post format

```markdown
---
title: "My new Intune guide"
description: "A short summary for the expandable homepage preview."
date: 2026-11-16
categories: [Intune, Windows]
icon: windows
---

Introduce the problem this guide solves.

## Getting started

Write the steps here.

![Intune settings used in this guide](/images/posts/my-new-intune-guide/settings.png)
```

| Field | Required | What it does |
|---|---|---|
| `title` | yes | Headline in lists, the article page and the browser tab. |
| `description` | yes | Summary in the expandable homepage preview. Also the search/SEO description. |
| `date` | yes | `YYYY-MM-DD`. Sorts the homepage and forms the URL. |
| `categories` | yes | Homepage filters: `Intune`, `Windows`, `macOS`, `Tools`. Add new ones in `src/lib/site.ts` (and `scripts/validate-content.mjs`). |
| `tags` | no | Topics shown under the title, e.g. `[Intune, Compliance]`. Defaults to the categories. |
| `icon` | no | `article` (default), `windows`, `intune`, `macos`, `code`, `tool`, `qr`, `terminal`. |
| `subtitle` | no | Second headline line on the article page, in light blue. Lists show "Title — Subtitle". |
| `lead` | no | Longer introduction under the article headline. Defaults to `description`. |
| `featured` | no | `true` adds a FEATURED label on the homepage. |
| `draft` | no | `true` leaves the post out of every page, the homepage and search. See [Drafts](#drafts). |
| `permalink` | no | Override the URL, e.g. `/2021/10/04/old-wordpress-slug/`. For migrated posts whose old URL doesn't match the date and file name. |
| `project` | no | Project banner at the top and buttons at the bottom. See `src/content/blog/introducing-autopilotqr-scan-associate-deploy.md`. |
| `original` | no | During migration: link to the post on the old WordPress site. |

### Writing tips

- `## Heading` sections are listed automatically in the "On this page" sidebar.
- A `> quote` renders as a pull quote.
- Code blocks get syntax highlighting: use ` ```powershell `, ` ```bash `, ` ```json `, ` ```xml `.
- Callout box:
  ```html
  <div class="note"><strong>Good to know</strong>Text of the callout.</div>
  ```

## Drafts

`draft: true` keeps a post off the website. **The file itself is still public in this repository**, along with any images you commit. For private writing, keep drafts on your own machine (or in a separate private repository) until they're ready, then upload them.

When previewing locally with `npm run dev`, drafts **are** shown, with a DRAFT label, so you can check them.

## Run it on your machine

Requires Node.js 22.23 or newer.

```sh
git clone https://github.com/Simsen/<repo>.git
cd <repo>
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run validate   # check all posts
npm run check      # validate + full production build into dist/
npm run preview    # serve the built dist/ folder
```

## How it's put together

```text
.github/workflows/
  publish.yml             Manual: validate → build → deploy to GitHub Pages
  validate-content.yml    Every push / PR: validate → build (no deploy)
public/images/            Logo, portrait, MVP logo; post images in posts/<post-name>/
scripts/validate-content.mjs   Metadata, dates, duplicate URLs, missing images
src/
  content/blog/           One Markdown file per article
  content.config.ts       The post metadata schema
  lib/site.ts             Site name, links, categories, icons
  lib/posts.ts            URL scheme, sorting, drafts
  components/             Header, Footer, AuthorStrip, PostRow (expandable preview)
  layouts/BaseLayout.astro
  pages/index.astro       Home: introduction, two entry boxes, author strip, filterable article list
  pages/[...slug].astro   Article pages at /YYYY/MM/DD/<file-name>/
  styles/global.css       Theme tokens and all component styles
```

URLs follow the WordPress pattern `/YYYY/MM/DD/<slug>/` with a trailing slash, so existing links to simsenblog.dk keep working after the move.

## One-time GitHub Pages setup

1. Push this repository to GitHub as a **public** repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Run **Actions → Publish website**.
4. Custom domain (at cutover): **Settings → Pages → Custom domain** → `www.simsenblog.dk`, then update DNS and enable **Enforce HTTPS**.

## Status

- [x] Homepage and article layout ported from the approved prototypes
- [x] Markdown → article + homepage preview + filters + search
- [x] Validation and manual publish workflow
- [ ] Migrate the WordPress archive (13 sample posts currently link to their originals)
- [ ] Tools, Speaking, Courses, About and Resources sections
- [ ] Full-archive search (Pagefind), RSS, sitemap
- [ ] Domain cutover
