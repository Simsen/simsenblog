---
title: "Onboard existing devices"
description: "New hardware arrives registered for Autopilot, but existing devices need their hardware hash collected first. A script to onboard them, even at a branch office without ConfigMgr."
date: 2021-03-07
categories: [Intune, Windows]
tags: ["PowerShell"]
icon: intune
---

When we talking about Windows 10 and Autopilot – we always recommend to make and agreement with the OEM partner, so they prepare the hardware to the Autopilot device list.

But for existing hardware we need to onboard to Autopilot – can be another story.

If you have SCCM – you have both a Task Sequence or a SCCM Report to help you get all the hardware info.

But what about if you have a small branch office with no local IT – and no management on the computer. You just like to onboard these existing devices. This script can help you!

First you need to make an Azure App Registration – **follow this guide from [Michael Niehaus](https://oofhours.com/2019/11/29/app-based-authentication-with-intune/)**

Follow the readme file – and make the changes to your Azure App registration.

Run the script locally on the client – after unboxing and Region selection.  
Press SHIFT + F10 to get a commandprompt – then run the script from a USB.

**Summery of the script:**

-   Check that BIOS is correct for security settings:
    -   TPM is enabled
    -   TPM version (No hard requirement)
    -   CPU (No hard requirement – but need to know, to see virtualization)
    -   Virtualization enabled
    -   Secure Boot enabled(UEFI)
-   When BIOS is green – it proceed, otherwise it quits.
-   GUI shows – Please select the location (for Group Tag selection)
-   Now importing and ready to proceed.

---

![](/images/posts/script-onboard-existing-devices/bioscheck.png)

Whats in the brackets will be used in the **Group Tag**.  
Open ReadMe file to see what scripts that need to be changed for this part.

![](/images/posts/script-onboard-existing-devices/locationselector.png)

Now the computer serialnumber and hash will be uploaded and waiting for confirmed Autopilot deployment profile assignment

![](/images/posts/script-onboard-existing-devices/waitingforAssign-1024x472.png)

Autopilot profile is assigned – wait another 15min before proceed that is my experience.

![](/images/posts/script-onboard-existing-devices/assigned-1024x295.png)

[![](/images/posts/script-onboard-existing-devices/github-logo.png)](https://github.com/Simsen/AutopilotOnboarding)
