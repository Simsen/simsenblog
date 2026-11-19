---
# ─────────────────────────────────────────────────────────────────────────────
# NEW POST TEMPLATE
# 1. Copy this file to src/content/blog/ and rename it to the URL you want:
#    my-new-intune-guide.md  →  simsenblog.dk/2026/11/16/my-new-intune-guide/
#    (lowercase letters, numbers and dashes only)
# 2. Fill in the fields below. Lines starting with # are notes. Delete them or leave them.
# 3. Put images in public/images/posts/my-new-intune-guide/
# 4. Remove "draft: true" when it's ready, then run Actions → Publish website.
# ─────────────────────────────────────────────────────────────────────────────

# Headline. Keep the quotes.
title: "My new Intune guide"

# Optional second headline line, shown in light blue on the article page.
# subtitle: "Step by step"

# 1–2 sentences. Shown in the homepage preview, in Google and in the RSS feed.
description: "A short summary of what the reader will learn or be able to do after reading this."

# Optional longer introduction under the headline. Uses the description if left out.
# lead: "A longer introduction that sets the scene."

# Publish date, YYYY-MM-DD. Forms the URL, so don't change it after publishing.
date: 2026-11-16

# Homepage filters. One or more of: Intune, Windows, macOS, Tools
categories: [Intune, Windows]

# Optional topics shown above the headline. Free text.
tags: [Autopilot, Compliance]

# Small icon in the homepage list:
# article, windows, intune, macos, code, tool, qr, terminal
icon: intune

# Optional: true shows a FEATURED label on the homepage.
# featured: true

# Optional picture for LinkedIn/X shares and feed readers. Defaults to the first image in the post.
# image: /images/posts/my-new-intune-guide/cover.jpg

# true = not on the website yet (but the file is public on GitHub). Remove when ready.
draft: true
---

Start with the problem this post solves, in a sentence or two. Why should the reader care?

## Before you start

Every `##` heading becomes a link in the "On this page" list next to the post.

- What you need, e.g. Intune Administrator role
- A test device

## Step 1 – Configure the policy

Write the steps. **Bold** for buttons and settings, `code` for values and paths.

1. Go to **Devices → Configuration → Create**
2. Choose **Windows 10 and later**
3. Set `ExampleSetting` to `Enabled`

An image (the text in [ ] describes it for screen readers and search engines).
Images shown smaller than their file can be clicked to see them full size.

![Intune configuration profile with the setting enabled](/images/posts/my-new-intune-guide/step-1.png)

## Step 2 – Run a script

```powershell
# Code blocks get syntax highlighting: powershell, bash, json, xml
Get-WindowsAutopilotInfo -Online
```

<div class="note"><strong>Good to know</strong>A callout box for tips and warnings.</div>

## Step-by-step gallery

One image at a time with ‹ ›. Keep the lines together, with no blank lines inside the div.
Delete this section if you don't need it.

<div class="post-gallery" aria-label="Enrol the device">
<figure><img src="/images/posts/my-new-intune-guide/gallery-01.png" alt="Step 1 - Click Continue" /><figcaption>Step 1 - Click Continue</figcaption></figure>
<figure><img src="/images/posts/my-new-intune-guide/gallery-02.png" alt="Step 2 - Click Agree" /><figcaption>Step 2 - Click Agree</figcaption></figure>
</div>

## Wrap-up

> A pull quote: one sentence worth highlighting.

Sum up the result, and link to related reading, e.g. [Microsoft Learn](https://learn.microsoft.com/mem/intune/).
