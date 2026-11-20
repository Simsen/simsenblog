---
title: "Run scripts On-Demand from Company Portal"
description: "Let users run a script from Company Portal on macOS, for example an Installomator install or a cleanup, by wrapping it in a dummy PKG with no payload. A step-by-step guide."
date: 2025-04-07
categories: [Intune, macOS]
tags: ["Shell scripts"]
icon: macos
wordpress:
  guid: "https://www.simsenblog.dk/?p=2052"
  published: 2025-04-07T05:00:00Z
  categories: [endpoint-manager, macos, shell]
---

## Run On-Demand Scripts via Intune with a Dummy PKG

**Ever wished you could give users the ability to run a script from the Company Portal?**  
Whether it’s installing an app via Installomator, triggering a cleanup, or running a custom fix script — it’s all possible by wrapping your logic into a script and using a dummy package.

This guide shows you how to build a lightweight PKG with no payload, attach a script to it, and deploy it via Microsoft Intune. Users can then trigger it on demand directly from the Company Portal.

And yes — it works beautifully on macOS.

---

## Why use a dummy package?

macOS in Intune requires .pkg format for app deployments. But what if you don’t want to install an app — just run a script?

This method lets you:

-   Provide optional, user-initiated tasks
-   Avoid wrapping full app installers
-   Deploy fixes, maintenance, or utilities without managing payloads

Use cases include:

-   Install optional software (e.g., Adobe Reader, Zoom)
-   Reset OneDrive, Teams, or Outlook settings
-   Mount network drives
-   Trigger macOS cleanup or setup tasks

---

## Create the dummy PKG file

Step 1 – Download the tool to make the PKG dummy package

Here I use the tool from Araelium, Package Builder: [https://www.araelium.com/packagebuilder](https://www.araelium.com/packagebuilder)  
Can be used for Trial mode, as we will not see the wizard, but 25$

Step 2 – Open to and fill out: Name, Identifier and Version

![Packages app installer settings with Name 'Adobe Reader DC', identifier com.simsen.adobereader and version 1](/images/posts/run-scripts-on-demand-from-company-portal/AdobeReaderDC_Dummy-1024x734.png)

Step 3 – Click on the hammer, to save the **pkgbuilder** project

![Packages app with the hammer build button highlighted to save the pkgbuilder project](/images/posts/run-scripts-on-demand-from-company-portal/AdobeReaderDC_DummySave-1024x734.png)

Step 4 – Click on the hammer again, to save as a PKG file

![Saved AdobeReaderDC.pkgbuilder project with the hammer button highlighted to build the PKG file](/images/posts/run-scripts-on-demand-from-company-portal/AdobeReaderDC_DummySavePKG-1024x675.png)

Step 5 – Click Close – and you now have a dummy PKG file we can use.

![Packages build log with the 'Building Installer Package Succeeded' dialog and its Close button highlighted](/images/posts/run-scripts-on-demand-from-company-portal/AdobeReaderDC_done-1-1024x675.png)

---

## Prepare the package / Script in Intune and assign it.

Step 6 – In Intune > Apps > macOS > Click Create and Select

![Intune Select app type list with 'macOS app (PKG)' highlighted](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-22.48.38.png)

Step 7 – Click Select app package file. Now select the dummy package

![Intune Add App wizard for a macOS PKG with the 'Select app package file' link highlighted](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-22.49.52-1024x264.png)

Step 8 – Insert Publisher, Select Logo and Click Next

![Intune App information step with name 'Adobe Reader DC (Script)', publisher Adobe and the Acrobat logo set](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-23.25.29-996x1024.png)

Step 9 – Copy the code this code:

```bash
#!/bin/bash
# Download Installomator
curl -fsSL https://raw.githubusercontent.com/Installomator/Installomator/main/Installomator.sh -o /usr/local/bin/Installomator
chmod +x /usr/local/bin/Installomator
# Run Installomator with explicit install parameters
sudo /usr/local/bin/Installomator adobereaderdc DEBUG=0
```

Step 10 – Insert the code under Pre-Install script, Click Next  
All these Apps from Installomator can be used: [https://github.com/Installomator/Installomator/blob/main/Labels.txt](https://github.com/Installomator/Installomator/blob/main/Labels.txt)

![Intune Program step with a pre-install script that downloads Installomator and runs the adobereaderdc label](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-22.57.38-1024x988.png)

Step 11 – Select Minimum operation system that match your need.

Step 12 – Detection rules  
Here you can remove the last part of the App Bundle ID – so it only has this: **com.simsen.adobereader**

![Intune Detection rules step with the generated app bundle ID suffix on com.simsen.adobereader pointed out for removal](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-23.03.20-1024x637.png)

Step 13 – Now assign to All users as Available for enrolled devices and Click Next

![Intune Assignments step with All users included as Available for enrolled devices](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-23.06.51-1024x649.png)

Step 14 – Verify all settings and Click Create

![Intune Review + create summary for the Adobe Reader DC (Script) PKG app with the Create button highlighted](/images/posts/run-scripts-on-demand-from-company-portal/Screenshot-2025-04-06-at-23.27.21-658x1024.png)

Step 15 – Now user can run the app/script, when they need it.  
Instead of an app – it could be all kinds of scripts that do self-service for user.  
Maybe more on that later.
