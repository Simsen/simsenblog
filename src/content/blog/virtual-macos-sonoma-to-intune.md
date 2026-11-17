---
title: "Setup virtual MacOS Sonoma to Intune"
description: "Set up macOS Sonoma (beta) as a virtual machine in Parallels and enrol it in Intune. Great for testing, with one catch: VMs can't be enrolled through Apple Business Manager."
date: 2023-07-03
categories: [Intune, macOS, Tools]
tags: ["Parallels", "Enrolment"]
icon: macos
---

## Introduction

In this blog post, I will setting up the new MacOS Sonoma(Beta) as a virtual machine via Parallels and onboard it to Intune.  
Microsoft made it possible to onboard virtual MacOS to Intune. So we will go through how easy it is to enroll virtual MacOS Sonoma to Intune – when using Parallels.  
  
Unfortunately is it not possible to onboard the VM from Apple Business Manager to Intune. Only manual onboarding via Company Portal is supported.

## Prerequisities

-   MacOS 13.3.1 or higher
-   Latest version installed of:
    -   Parallels Desktop for Mac Standard Edition
    -   Parallels Desktop for Mac Pro Edition
    -   Parallels Desktop for Mac Business Edition
    -   Parallels Desktop for Mac App Store Edition
-   Login to: [developer.apple.com](https://developer.apple.com) – Go to Distribute in top menu > MacOS > Download
    
    -   Download macOS Sonoma 14 beta 2 image
    -   Download Device Support for MacOS 14 beta 2
    -   ![](/images/posts/virtual-macos-sonoma-to-intune/download_ipsw.png)  
        
    
    -   Install **Device Support for MacOS 14 beta 2** on the MacOS host(physical)

---

## Create MacOS 14 Sonoma VM

-   Go to Finder – browse to these 3 locations
    -   Path to the application in Parallels Desktop to create the VM![](/images/posts/virtual-macos-sonoma-to-intune/MacOS_Sonoma_path1.png)
    -   Path to the ipsw file – you just downloaded
    -   ![](/images/posts/virtual-macos-sonoma-to-intune/MacOS_Sonoma_path2.png)
    -   Empty folder – to store the VM
    -   ![](/images/posts/virtual-macos-sonoma-to-intune/MacOS_Sonoma_path3.png)
-   Start Terminal – then it should look like this:

![](/images/posts/virtual-macos-sonoma-to-intune/MicrosoftTeams-image-28-1024x725.png)

When the “installation” is done – click on the macvm file, then it will show up in Control Center

![](/images/posts/virtual-macos-sonoma-to-intune/MacOS_SonomaVM-1-1024x306.png)

  
When turn on – it is now ready to continue the setup

<div class="post-gallery" role="group" aria-roledescription="gallery" aria-label="Set up the macOS Sonoma VM">
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.32.38.png" alt="MacOS Sonoma - Step 1" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 1</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.10.png" alt="MacOS Sonoma - Step 2" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 2</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.23.png" alt="MacOS Sonoma - Step 3" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 3</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.29.png" alt="MacOS Sonoma - Step 4" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 4</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.35.png" alt="MacOS Sonoma - Step 5" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 5</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.39.png" alt="MacOS Sonoma - Step 6" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 6</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.45.png" alt="MacOS Sonoma - Step 7" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 7</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.50.png" alt="MacOS Sonoma - Step 8" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 8</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.44.55.png" alt="MacOS Sonoma - Step 9" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 9</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.45.00.png" alt="MacOS Sonoma - Step 10" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 10</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.45.05.png" alt="MacOS Sonoma - Step 11" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 11</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.46.13.png" alt="MacOS Sonoma - Step 12" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 12</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.46.41.png" alt="MacOS Sonoma - Step 13" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 13</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.46.45.png" alt="MacOS Sonoma - Step 14" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 14</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.46.54.png" alt="MacOS Sonoma - Step 15" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 15</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.47.02.png" alt="MacOS Sonoma - Step 16" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 16</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.47.09.png" alt="MacOS Sonoma - Step 17" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 17</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-06.47.48.png" alt="MacOS Sonoma - Step 18" width="1600" height="1102" loading="lazy" /><figcaption>MacOS Sonoma - Step 18</figcaption></figure>
</div>

---

## Enroll MacOS Sonoma to Microsoft Intune

Open safari – and go to this site: [Enroll your Mac with Intune Company Portal | Microsoft Learn](https://learn.microsoft.com/en-us/mem/intune/user-help/enroll-your-device-in-intune-macos-cp#install-company-portal-app)

![](/images/posts/virtual-macos-sonoma-to-intune/Screenshot-2023-06-30-at-08.15.05.png)
*Download Company portal for Mac – and install*

<div class="post-gallery" role="group" aria-roledescription="gallery" aria-label="Enrol macOS Sonoma in Intune">
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.15.32.png" alt="Step 01 - Click Continue" width="636" height="462" loading="lazy" /><figcaption>Step 01 - Click Continue</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.15.50.png" alt="Step 02 - Click Continue" width="630" height="456" loading="lazy" /><figcaption>Step 02 - Click Continue</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.16.03.png" alt="Step 03 - Click Agree" width="636" height="458" loading="lazy" /><figcaption>Step 03 - Click Agree</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.16.13.png" alt="Step 04 - Click Install" width="636" height="460" loading="lazy" /><figcaption>Step 04 - Click Install</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.16.26.png" alt="Step 05 - Type in password for local user – and click Install Software" width="642" height="526" loading="lazy" /><figcaption>Step 05 - Type in password for local user – and click Install Software</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.16.50.png" alt="Step 06 - Click Close" width="636" height="462" loading="lazy" /><figcaption>Step 06 - Click Close</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.16.58.png" alt="Step 07 - Click Move to Bin – installation done." width="640" height="460" loading="lazy" /><figcaption>Step 07 - Click Move to Bin – installation done.</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.17.41.png" alt="Step 08 - Sign in" width="824" height="620" loading="lazy" /><figcaption>Step 08 - Sign in</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.17.53.png" alt="Step 09 - Sign in with your M365 account" width="824" height="622" loading="lazy" /><figcaption>Step 09 - Sign in with your M365 account</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.18.41.png" alt="Step 10 - Click Begin, to enroll device" width="840" height="628" loading="lazy" /><figcaption>Step 10 - Click Begin, to enroll device</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.18.57.png" alt="Step 11 - Click Cotinue" width="826" height="612" loading="lazy" /><figcaption>Step 11 - Click Cotinue</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.19.08.png" alt="Step 12 - Click Download profile" width="828" height="616" loading="lazy" /><figcaption>Step 12 - Click Download profile</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.30.23.png" alt="Step 13 - Click on the profile" width="736" height="498" loading="lazy" /><figcaption>Step 13 - Click on the profile</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.30.34.png" alt="Step 14 - Click Install…" width="732" height="494" loading="lazy" /><figcaption>Step 14 - Click Install…</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-08.30.53.png" alt="Step 15 - Type Pasword – to confirm Intune MDM profile" width="736" height="492" loading="lazy" /><figcaption>Step 15 - Type Pasword – to confirm Intune MDM profile</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-09.06.59.png" alt="Step 16 - Compliance policy will now be checked" width="832" height="620" loading="lazy" /><figcaption>Step 16 - Compliance policy will now be checked</figcaption></figure>
<figure><img src="/images/posts/virtual-macos-sonoma-to-intune/gallery/Screenshot-2023-06-30-at-09.14.03.png" alt="Step 17 - Your virtual MacOS Sonoma is now enrolled to Intune." width="828" height="616" loading="lazy" /><figcaption>Step 17 - Your virtual MacOS Sonoma is now enrolled to Intune.</figcaption></figure>
</div>
