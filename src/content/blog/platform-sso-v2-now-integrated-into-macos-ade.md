---
title: "Platform SSO: Now Integrated into macOS ADE"
description: "Explore Platform SSO as part of Automated Device Enrollment and the macOS onboarding experience."
date: 2026-05-07
categories: [Intune, macOS]
tags: [macOS, Identity]
icon: macos
---

Microsoft and Apple just made the macOS onboarding experience a lot cleaner.

With the new **“Enable Registration During Setup”** setting in Intune, Platform SSO registration can now happen directly during Automated Device Enrollment (ADE).

That means:

❌ No more post-login popup asking users to register their Mac for Platform SSO  
✅ Registration is now part of the onboarding flow during Setup Assistant  
⚠️ User still asked to Enable Company Portal in the **AutoFill & Passwords** (can be scripted to automate)

## What You Need

In Microsoft Intune:

-   Enable **Enable Registration During Setup** in your Platform SSO policy.
-   Deploy the latest beta of **Company Portal** (Tested with 53.2604003.000) ([LINK](https://res.public.onecdn.static.microsoft/mro1cdnstorage/4B2D7701-0A4F-49C8-B4CB-0C2D4043F51F/MacAutoupdate/CompanyPortal_5.2604.0-Upgrade.pkg))
-   Configure ADE with:
    -   **Setup Assistant with modern authentication**
    -   **Await final configuration**

## Why This Feels Like “Platform SSO v2”

Before this, Platform SSO worked — but the experience still felt a bit disconnected.

Users enrolled the Mac… logged in… and then got another registration prompt afterward.

Now the experience is much more integrated:

-   Platform SSO registration happens during onboarding
-   Users arrive at the desktop already registered
-   Immediate access to apps and company resources
-   A more native macOS experience overall

![](/images/posts/platform-sso-v2-now-integrated-into-macos-ade/CP_ADE-1024x762.png)
*Platform SSO – now part of Automated Device Enrollment*

For cloud-native macOS deployments with Intune, this is a pretty big UX improvement.

***⚠️ Note: At the time of writing, the required Company Portal version is still in beta. As always, test carefully before production rollout, as Platform SSO on macOS is still evolving and some organizations may experience stability issues depending on authentication method and macOS version.***
