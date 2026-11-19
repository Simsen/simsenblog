# Writing and publishing posts

How to add, correct and publish posts on [simsenblog.dk](https://www.simsenblog.dk).
With Claude Code: type `blog` in Terminal, or `/new-post <topic>` inside the project.

## Publish a post

1. **Write** a Markdown file with a metadata block at the top (see [Post format](#post-format) below).
   Easiest: copy [`templates/new-post.md`](../templates/new-post.md), which has every field and formatting example with notes.
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
| `image` | no | Picture shown when the post is shared (LinkedIn, X) and next to it in feed readers/aggregators, e.g. `/images/posts/my-post/cover.jpg`. Defaults to the first image in the post. |
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
