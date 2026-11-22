---
title: "Introducing IntuneScope"
subtitle: "Every assignment. One view."
description: "A free, open-source web app that shows every Intune assignment in one place, and answers what a group or an assignment filter really drives."
lead: "Intune shows assignments one policy at a time. IntuneScope turns the question around: pick a group or a filter and see everything that uses it."
date: 2026-11-21
categories: [Intune, Tools]
tags: [Intune, Assignments, Tools]
icon: intune
featured: true
image: /images/posts/introducing-intunescope/intunescope-app.png
project:
  name: IntuneScope
  suffix: .app
  tagline: Every assignment. One view.
  icon: intune
  links:
    - label: Open IntuneScope
      url: https://intunescope.app/
      primary: true
    - label: View on GitHub
      url: https://github.com/Simsen/IntuneScope
---

**Explore policies. Find groups. Discover filters.**

![IntuneScope.app: Every assignment. One view. A policy list with type, platform, included and excluded groups and assignment filters, covering configuration, application, script, compliance and Settings Catalog policies on Windows, macOS, iOS and Android](/images/posts/introducing-intunescope/intunescope-app.png)

Intune shows assignments one policy at a time. But the question I usually need answered is the reverse:

**What does this group actually get? And where is this filter used?**

Answering that in the Intune admin center means opening policy after policy, app after app, script after script.

## Where the idea came from

I was at a customer where we migrated a hybrid setup from Group Policy to Intune.

During the migration, we used a specific Entra group to target the new Intune policies.

When the migration was done, every policy assigned to that group had to be changed. So we needed an easy overview of exactly which policies used the group, so we could update all of them and not miss a single one.

Intune doesn't give you that view. You can see who a policy is assigned to, but not everything a group is assigned to.

The answer was opening every single policy, one by one, and checking its assignments. That's about a thousand clicks, and it's far too easy to miss one.

**So instead of a thousand clicks, I built an app.** 😎

Meet **IntuneScope**.

A free, open-source web app that loads every policy, app and script in your tenant with its assignments, and answers those questions in seconds, straight from your browser.

**Every assignment. One view.**

[https://intunescope.app](https://intunescope.app)

[https://github.com/Simsen/IntuneScope](https://github.com/Simsen/IntuneScope)

---

## What IntuneScope does

-   **Policies:** browse every object with its targets, assignment filters and filter mode, across all platforms.
-   **Group lookup:** pick an Entra group and see every policy, app, script and remediation that includes or excludes it, including what it inherits through **parent groups** (nested membership, any depth), marked *via <parent>*.
-   **Filter lookup:** pick an assignment filter and see everything that uses it, in include or exclude mode.
-   **Export:** Excel (with an *About* sheet) or CSV, one row per assignment.
-   **Bulk edit (Editor):** add, replace or remove assignments, or change filters, across many policies.

<div class="note"><strong>See it live, no sign-in needed</strong>Open <a href="https://intunescope.app/">intunescope.app</a> and click <b>Try the demo — Contoso sample tenant, no sign-in</b>. You get a fictional Contoso tenant with sample policies, apps, groups and filters. Click around the Policies view, Group lookup and Filter lookup, try an export, and even run a bulk edit. Nothing is read from Microsoft, and nothing is changed. <a href="#try-it">See a screenshot ↓</a></div>

## Getting started

1.  Open **https://intunescope.app/**.
2.  Sign in with your Microsoft Entra ID account. The first time, an admin has to approve the app for the tenant (see below).
3.  Browse **Policies**, or open **Group lookup** or **Filter lookup**.
4.  Export the result to Excel or CSV if you need it in a report.

No install, no PowerShell, no backend.

## Two modes, two app registrations

IntuneScope has two modes, and each one has its own app registration:

-   **Explorer** is read-only. It uses delegated `Read.All` permissions for configuration, apps and scripts, plus `Group.ReadBasic.All`, `GroupMember.Read.All` (to find the groups a group is nested in) and `User.Read`.
-   **Editor** adds write permission for **assignments** of Settings Catalog, Endpoint Security, Device configuration and Compliance policies. It never changes policy settings, apps or scripts.

Because they are separate apps, a tenant can approve Explorer without ever granting write access, and can lock Editor down further with *assignment required* and Conditional Access.

<div class="note"><strong>Update, 22 November 2026 (v0.1.9)</strong>Group lookup now includes nested groups, which needs one more read-only permission, <code>GroupMember.Read.All</code>, in both Explorer and Editor. If your tenant already approved IntuneScope, add the permission to your app registrations (self-hosted) or run the admin consent again. Until then, users get a consent prompt at their next sign-in.</div>

Both use delegated permissions, so they never exceed the signed-in user's own rights: **Intune RBAC and scope tags still apply.** If your role can't see an object, IntuneScope can't either, and every lookup says which workloads were and weren't searched.

## How Editor changes assignments safely

Bulk-editing assignments is exactly where one wrong click hurts, so Editor works in steps:

1.  **One platform per batch.** Assignment filters are platform-specific, and Graph doesn't check the pairing, so IntuneScope does.
2.  **Preview from a fresh read:** before and after, per policy.
3.  **A JSON backup downloads first**, with a ready-to-use restore body per policy.
4.  **Compare-and-skip:** each policy is read again right before writing. If it changed since the preview, it's skipped.
5.  **Verify:** IntuneScope reads every policy back after writing and compares, and you can download an execution report.

<div class="note"><strong>Good to know</strong>A run isn't atomic: policies that succeeded stay changed even if others fail. Keep the JSON backup until you've checked the result.</div>

## Privacy and security

IntuneScope is a static web app. Your browser talks directly to Microsoft Graph, signing in with MSAL and PKCE, with no client secret.

Data is held in memory only: close or refresh the tab and it's gone. There's no analytics, no telemetry, and no server of mine in between.

## Limits, by design

-   **Nested groups go upwards only.** Group lookup adds what a group inherits from its parent groups, but doesn't expand the groups nested inside it.
-   **Not device-level.** IntuneScope shows what targets a group or filter, not what one specific device ends up receiving.
-   **Scope tags reduce what Graph returns.** Results are labelled accordingly, so "nothing found" reads as *No references found in the workloads you can see*.

## Try it

Open **https://intunescope.app/** and sign in, or start the demo to look around in a Contoso sample tenant first.

![IntuneScope Policies & assignments view in the Contoso demo tenant: every policy and app with its platform, type, assignments and filter. All Users and All Devices are green, Entra groups blue, exclusions red, and filters violet](/images/posts/introducing-intunescope/intunescope-app-view.png)

That's it! No PowerShell scripts, no exports to piece together, and no thousand clicks.

IntuneScope is free and open source under the MIT license. You can also host it yourself; the README on GitHub explains how.

If you find a bug or have an idea, open an issue on [GitHub](https://github.com/Simsen/IntuneScope).
