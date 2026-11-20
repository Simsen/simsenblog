---
title: "Cleanup Remediations: The Forgotten Half of Endpoint Hygiene"
description: "A closer look at cleanup remediations and the often-overlooked housekeeping side of endpoint management."
date: 2026-05-05
categories: [Intune, Windows]
tags: [Intune, Endpoint hygiene]
icon: article
wordpress:
  guid: "https://www.simsenblog.dk/?p=2290"
  published: 2026-05-05T04:00:00Z
  categories: [endpoint-manager, tools]
---

We spend months hardening endpoints – baselines, compliance, Conditional Access.  
Then we leave years of sensitive data sitting in Downloads.

Cleanup has no owner in most environments. It runs on neither a schedule nor a strategy. The result is predictable: disks fill up, profiles bloat, and endpoints quietly accumulate data no one is accountable for.

I’ve written about [Proactive Remediations since 2020](/2020/12/21/proactive-remediation/) and about [security-focused remediations for Defender](/2022/03/13/proactive-remediations-security-remediations/). This post is the missing piece – the cleanup layer.

## Why bother – Storage Sense is not enough

The default reaction is simple: enable Storage Sense and move on.  
Storage Sense is a good baseline. It is not an endpoint hygiene strategy.

What it covers:

-   Temp files
-   Recycle Bin retention
-   Downloads retention
-   OneDrive dehydration

What it does **not** cover:

-   Outlook OST files (often 5–20 GB per user)
-   Teams cache (multiple GB, inconsistent cleanup)
-   Orphaned user profiles
-   Windows Update leftovers after feature upgrades (5–10 GB is common)
-   WinSxS growth
-   Browser and font cache issues

It also gives you **no central visibility**.  
You cannot answer:  
**“Did cleanup actually run across all devices this week?”**  
  
And that is exactly the kind of question Legal or Security will ask when it matters.

## A quick note on Storage Sense for Downloads

Intune does provide a native way to clean up the Downloads folder using **Storage Sense**.

You can configure a policy like:

![Intune Storage Sense settings with Downloads cleanup threshold 60 days and Recycle Bin cleanup threshold 30 days](/images/posts/cleanup-remediations-the-forgotten-half-of-endpoint-hygiene/cleanup_download_recyclebin.png)

This is a solid baseline and easy to roll out across all devices.

**But it is not a governance control.**

-   It runs on a best-effort basis
-   It depends on user activity (file “last opened”)
-   It provides no central reporting
-   You cannot prove it executed

That means you still cannot answer:  
**“Did sensitive data actually get removed from all endpoints?”**

Storage Sense is hygiene.  
Cleanup remediations are control.

Use both – but don’t confuse them.

Cleanup remediations close the remaining gap:

-   Detection script → reports state
-   Remediation script → fixes it
-   Endpoint Analytics → gives you tenant-wide visibility

That feedback loop is what Storage Sense is missing.

---

## Three categories, three different policies

This is where most implementations go wrong.  
Cleanup is not one thing – it’s three different problem domains with different owners and risk profiles.

## 1\. Temp and cache

**Automated. Weekly. No discussion needed.**

Pure hygiene. No user data. No governance friction.

Use:

-   **Clear-TempFiles-Advanced**: system + user temp paths, prefetch, update leftovers
-   **Clear-OutlookCache**: major disk savings (plan for re-sync impact)
-   **Clear-TeamsCache**: verify classic vs new Teams paths before deploying
-   **Clear-WindowsUpdateCache**: especially after feature updates
-   **Profile cleanup**: only for shared/multi-user devices (test detection carefully)

---

## A solid starting point is  
[https://github.com/JayRHa/EndpointAnalyticsRemediationScripts](https://github.com/JayRHa/EndpointAnalyticsRemediationScripts)

---

It aligns well with Endpoint Analytics and saves you from rebuilding everything from scratch.

## 2\. Optimization

**Target: measurable user experience improvements**

This is what reduces tickets:

-   slow devices
-   full disks
-   poor startup performance

Use:

-   **Get-CleanUpDisk**: reportable Disk Cleanup wrapper
-   **Optimize-StartupPrograms**: directly impacts Endpoint Analytics scores
-   **Remove-BloatwareAdvanced / Remove-ConsumerApps**: especially for Autopilot devices
-   **Monitor-DiskSpace-Trend**: proves whether cleanup actually worked

**Decision:**  
Keep optimization separate from hygiene.  
Different cadence. Different success criteria. Different rollback needs.

### 3\. Privacy and GDPR

**This is not disk cleanup** – **this is data governance**

Recycle Bin and Downloads are not technical artifacts. They are **data retention risks**.

Examples:

-   Deleted files remain in Recycle Bin for 30 days
-   Downloads contains years of:
    -   contracts
    -   exports
    -   attachments

Relevant scripts:

-   **Invoke-ClearRecycleBin**: low risk, quick win
-   **Clear-DownloadFolder**: high impact, high risk
-   **Clear-BrowserCache**: verify if history is included
-   **Detect-Browser-Passwords**: detection + policy enforcement pairing

Automating deletion of `C:\Users\<user>\Downloads` is **destructive**.

## The architect’s caveats

Before deploying anything, settle these:

**Use filters. Not groups.**  
All Devices + filters scales. Manual group scoping does not.

**Ring the rollout.**  
Pilot → broad.  
Cleanup can delete user-visible data. Mistakes scale fast.

**Measure everything.**  
If you cannot show improvement (e.g. disk space trends), the initiative will not survive governance.

## Cleanup is part of Zero Trust

Zero Trust is not just about access.  
It is also about **data minimization**.

Every unmanaged file on an endpoint is:

-   potential exposure
-   potential compliance issue
-   potential incident scope

Cleanup remediations reduce that footprint.

## Where to start tomorrow

If you are not running cleanup today, start here:

1.  **Clear-TempFiles-Advanced**
    -   Daily
    -   All devices
    -   Low risk
2.  **Invoke-ClearRecycleBin**
    -   Weekly
    -   All devices
    -   Low risk
3.  **Monitor-DiskSpace-Trend**
    -   Detection only
    -   Gives you visibility

Roll out to a pilot ring.  
Collect data for 2 weeks.  
Then expand.

Next steps:

-   Outlook / Teams cache
-   Optimization layer
-   GDPR cleanup (with governance in place)

---

## Final thought

The Scripts and remediations engine has been available for years.  
Most environments still leave it unused.

**Shortout to Jannik Reinhard, Florian Slazmann, Andrew Taylor, Joey Verlinden and Sven Wick for the scripts!**

That is probably the easiest endpoint hygiene win you can implement right now.
