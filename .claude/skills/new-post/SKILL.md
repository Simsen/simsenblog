---
name: new-post
description: Create, preview and publish a new SIMSENblog post. Use when Simon wants to write, draft, continue or publish a blog post, e.g. "/new-post Autopilot device preparation", "new post about X", "publish my draft".
---

# New SIMSENblog post

Simon writes about Microsoft Intune, Windows, macOS and endpoint security. Help him get from an idea,
notes or screenshots to a published post. Work in this repository; `docs/writing.md` has the full post format.

## 1. Start

- Topic in the arguments ($ARGUMENTS)? Use it. Otherwise ask what the post is about.
- Ask for his material if he has any: notes, steps, scripts, a folder of screenshots. Don't invent
  settings, menu paths, version numbers or results. Where something isn't known, leave a clear
  `TODO:` in the draft and tell him.
- Make sure the preview is running: `npx astro dev status`, else `npx astro dev --background`.

## 2. Create the draft

- Copy `templates/new-post.md` to `src/content/blog/<slug>.md`. The slug becomes the URL
  (`/YYYY/MM/DD/<slug>/`): short, lowercase, dashes, no dates.
- Fill in the front matter: title, description (1–2 sentences, also used by Google and RSS), today's
  `date`, categories (Intune, Windows, macOS, Tools), tags, icon. Keep `draft: true`.
- Delete the template's notes (`#` lines) and example sections that the post doesn't use.
- Never add a `wordpress:` block. That's only for posts migrated from the old site.
- Write in Simon's voice: read two or three recent posts in `src/content/blog/` first. Practical,
  first person, step by step, `##` headings for each step, short paragraphs.

## 3. Images

- Copy screenshots to `public/images/posts/<slug>/`, renamed to lowercase-with-dashes
  (`step-1-enrollment.png`).
- Shrink anything wider than 1600 px: `sips --resampleWidth 1600 <file>` (built into macOS).
- Every image needs real alt text describing what it shows. The lightbox picks images up automatically.
- Several screenshots of one flow → use the step-by-step gallery from the template.

## 4. Check

- `npm run validate` must pass (it names any missing image or bad field).
- Give Simon the preview link: `http://localhost:4321/YYYY/MM/DD/<slug>/`. Drafts are visible
  locally with a DRAFT label, and nowhere else.
- Make the changes he asks for.

## 5. Publish (only when Simon says so)

1. Remove `draft: true`.
2. `npm run check` (validate + full build) must pass.
3. `git add` the post and its image folder, commit ("Add post: <title>"), `git push`.
4. `gh workflow run publish.yml`, then `gh run watch <id> --exit-status`.
5. Open the live URL and confirm the post, its images and the homepage entry. Report the link.

Note: a draft file pushed to GitHub is public in the repository even though it's not on the site.
Don't push drafts unless he asks.
