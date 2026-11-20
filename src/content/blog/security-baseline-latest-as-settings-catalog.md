---
title: "Security Baseline as Settings Catalog"
description: "Explore using the Settings Catalog for security baseline configuration in Intune."
date: 2023-05-08
categories: [Intune, Windows]
tags: [Intune, Security]
icon: article
wordpress:
  guid: "https://www.simsenblog.dk/?p=1240"
  published: 2023-05-08T14:59:16Z
  categories: [endpoint-manager]
---

Have you ever tried using the Security Baseline feature in Intune’s Endpoint Security to enhance your device’s security?

If you have, but also encountered the frustration of finding certain settings missing – so you still need to create a Configuration Profile. Here is a tip that is quit smart and also make sure you get the latest baseline.

You can create your own Settings Catalog with all the baseline settings and add your own settings too.

To get started, download the latest Microsoft Security Toolkit package that includes all the necessary Group Policy Objects (GPOs). Then, head over to Microsoft Intune > Devices > [**Group Policy analytics** (preview)](https://intune.microsoft.com/#view/Microsoft_Intune_DeviceSettings/DevicesMenu/~/policyAnalyticsReport)– import the policy, and **migrate** it to the Settings Catalog. This approach lets you create a comprehensive and personalized list of settings and you can add all the settings you want.

[Download latest Microsoft Security Toolkit](https://www.microsoft.com/en-us/download/confirmation.aspx?id=55319)

Current baselines is in the MST package for Windows client, M365 Apps and Edge:

-   Windows 11 version 22H2 Security Baseline.zip
-   Microsoft 365 Apps for Enterprise-2206-FINAL.zip
-   Microsoft Edge v112 Security Baseline.zip
-   Windows 10 Update Baseline.zip
-   Windows 10 Version 1507 Security Baseline.zip
-   Windows 10 Version 1607.zip
-   Windows 10 Version 1809.zip
-   Windows 10 Version 20H2.zip
-   Windows 10 version 21H2 Security Baseline.zip
-   Windows 10 version 22H2 Security Baseline.zip
-   Windows 11 Security Baseline.zip

Here I have now imported all Windows 11, Edge and Microsoft 365 policies to Group Policy Analytics:

![Intune Group Policy analytics listing imported Windows 11, Edge and Microsoft 365 Apps baseline GPOs with MDM support percentages](/images/posts/security-baseline-latest-as-settings-catalog/Intune_Policies-1024x663.png)

Now select the Group Policy and Click **Migrate**

![Group Policy analytics with the Edge Version 112 GPO ticked and the Migrate button highlighted](/images/posts/security-baseline-latest-as-settings-catalog/Migrate_policy.png)

Click **Select all** on this page.  
**OBS:** Remember if there is multiple pages – you have to Click Next (up-right-corner) and again Select all on this page. Until you have them all.

![Settings to migrate step with 'Select all on this page', the page selector and Next highlighted](/images/posts/security-baseline-latest-as-settings-catalog/Click_SelectAll-1024x861.png)

Click Next

Now you get an overview

![Configuration step listing the selected Edge baseline settings and their values before creating the Settings catalog profile](/images/posts/security-baseline-latest-as-settings-catalog/overview_edge.png)

Set name for the policy

![Profile info step with the new policy named 'MSFT - Edge baseline'](/images/posts/security-baseline-latest-as-settings-catalog/name_policy.png)

Click Next

![Scope tags step of the migration wizard with the Default scope tag](/images/posts/security-baseline-latest-as-settings-catalog/scopetag.png)

Set assignment if needed – else Click Next

![Assignments step of the migration wizard with no included or excluded groups selected](/images/posts/security-baseline-latest-as-settings-catalog/assignment.png)

Click Deploy

![Review + deploy step summarising the MSFT - Edge baseline settings with the Deploy button](/images/posts/security-baseline-latest-as-settings-catalog/review.png)

Now you have a full setting catalog policy with latest Edge baseline.
