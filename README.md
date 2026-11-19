# SIMSENblog 2.0

Source for [simsenblog.dk](https://www.simsenblog.dk): Microsoft Intune, Windows, macOS and endpoint security by Simon Hartmann Eriksen.

Built with [Astro](https://astro.build) and Tailwind CSS from Markdown files, published to GitHub Pages by a GitHub Actions workflow. Everything (posts, images, templates and the publishing workflow) is public in this repository.

## Publish a post

1. **Write** a Markdown file with a metadata block at the top (see [Post format](#post-format)).
   Easiest: copy [`templates/new-post.md`](templates/new-post.md), which has every field and formatting example with notes.
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
| `wordpress` | no | Only on posts moved from WordPress: the old feed ID, publish time and categories, so RSS subscribers don't see them as new. Don't add it to new posts. |

### Writing tips

- `## Heading` sections are listed automatically in the "On this page" sidebar.
- A `> quote` renders as a pull quote.
- Code blocks get syntax highlighting: use ` ```powershell `, ` ```bash `, ` ```json `, ` ```xml `.
- Callout box:
  ```html
  <div class="note"><strong>Good to know</strong>Text of the callout.</div>
  ```
- Images that show smaller than their file get a lightbox automatically: click to see them full size, with ‹ › through
  all the post's images (gallery images included). Images inside a link keep the link instead.
- Step-by-step gallery (one image at a time, with ‹ ›, counter, arrow keys and swipe). Put the images in
  `public/images/posts/<post-file-name>/` and write one `<figure>` per image. Keep the lines together, with
  no blank lines inside the `<div>`:
  ```html
  <div class="post-gallery" aria-label="Enrol the Mac">
  <figure><img src="/images/posts/my-post/step-01.png" alt="Step 1 - Click Continue" /><figcaption>Step 1 - Click Continue</figcaption></figure>
  <figure><img src="/images/posts/my-post/step-02.png" alt="Step 2 - Click Agree" /><figcaption>Step 2 - Click Agree</figcaption></figure>
  </div>
  ```

## Drafts

`draft: true` keeps a post off the website. **The file itself is still public in this repository**, along with any images you commit. For private writing, keep drafts on your own machine (or in a separate private repository) until they're ready, then upload them.

When previewing locally with `npm run dev`, drafts **are** shown, with a DRAFT label, so you can check them.

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

## Status

Live at **https://www.simsenblog.dk** since 19 November 2026.

- [x] Homepage and article layout from the approved prototypes
- [x] Markdown → article, homepage preview, topic filters, show more
- [x] Validation and manual publish workflow
- [x] All 41 WordPress posts migrated, on their original URLs, with images, downloads, video and galleries
- [x] Tools, Courses, Links and About pages, 404 page with search
- [x] Lightbox for post images, step-by-step galleries
- [x] RSS on the same addresses and item IDs as WordPress, including category feeds; sitemap
- [x] Full-text search (Pagefind)
- [x] Security hardening: CSP, branch protection, pinned Actions, Dependabot
- [x] Domain cutover from WordPress to GitHub Pages
- [x] Post template and `/new-post` command
- [ ] Contact form: add a Formspree ID or Web3Forms key in `src/lib/site.ts`
- [ ] References page (customer logos); `/reference/` redirects to About for now
- [ ] Alt text for the migrated images
- [ ] Full-resolution originals for 75 screenshots migrated at WordPress's 1024 px size
- [ ] Confirm the domain shows as Verified in GitHub, and remove the old `new` CNAME at one.com
- [ ] Shut down the old WordPress hosting after a safe period
