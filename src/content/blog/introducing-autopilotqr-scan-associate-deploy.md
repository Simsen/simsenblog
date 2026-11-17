---
title: "Introducing AutopilotQR"
subtitle: "Scan. Associate. Deploy."
description: "A free, open-source QR scanner for Windows Autopilot Device Association. Built to make preparing your next device a little simpler."
lead: "An easier way to associate Windows devices with your tenant. Built for the community, one QR code at a time."
date: 2026-10-18
categories: [Intune, Windows, Tools]
tags: [Windows, Intune]
icon: qr
featured: true
project:
  name: AutopilotQR
  suffix: .app
  tagline: Scan. Associate. Deploy.
  icon: qr
  links:
    - label: Open AutopilotQR
      url: https://autopilotqr.app/
      primary: true
    - label: View on GitHub
      url: https://github.com/Simsen/AutopilotQR
---

**Making Windows Autopilot Device Association easier with a free, open-source QR scanner.**

Microsoft recently introduced Device Association for Windows Autopilot Device Preparation, bringing some interesting improvements to how we prepare and enroll Windows devices.

One of the new capabilities is the option to generate a QR code directly from Windows OOBE.

But that got me thinking…

**Microsoft gave us the QR code. So why not build the scanner?** 😎

## Where the idea came from

While working on a customer project, I came across a clever Power Apps solution that made it possible to work with the new Device Association functionality.

I really liked the idea.

But I also started thinking about how we could make something similar available to everyone working with Microsoft Intune.

Something that wouldn’t require deploying a Power App, creating a separate application registration, or maintaining additional infrastructure.

Just open a website, sign in with your Microsoft Entra ID account, scan the QR code, and associate the device with your tenant.

So I decided to build **AutopilotQR**.

A free, open-source web application designed to simplify Windows Autopilot Device Association.

**Scan. Associate. Deploy.**

[https://AutopilotQR.app](https://AutopilotQR.app)

[https://github.com/Simsen/AutopilotQR](https://github.com/Simsen/AutopilotQR)

---

## What is Windows Autopilot Device Association?

Before diving into AutopilotQR, it’s worth explaining the new Device Association functionality.

With Windows Autopilot Device Preparation, Microsoft introduced a different approach to preparing Windows devices compared to traditional Windows Autopilot.

Now, Device Association takes this a step further.

It allows organizations to establish a trusted relationship between a physical Windows device and their Microsoft Entra tenant before enrollment.

Unlike traditional Autopilot hardware hash registration, Device Association uses a TPM-backed identity and establishes tenant affinity in the device’s UEFI firmware.

This introduces several interesting possibilities:

-   Identify corporate-owned devices before enrollment.
-   Support environments that block personal device enrollment.
-   Apply Device Preparation policies directly to associated devices.
-   Enable additional OOBE customization capabilities.
-   Support device naming during preparation.

And importantly, Microsoft introduced a way to generate the device association information directly from Windows OOBE.

There are currently two options available from the Autopilot menu:

**Export device information:** Export a DeviceLink CSV file, typically using a USB drive, and import it through the Microsoft Intune admin center.

**Scan QR code:** Generate a QR code containing the device association information, which can be processed by a custom application.

That second option is where AutopilotQR comes in.

Microsoft documents the QR option specifically for custom applications that use Microsoft Graph to pre-associate the device. 

## Getting Started with AutopilotQR

Using AutopilotQR is pretty straightforward:

1.  Start Windows OOBE and press the Windows key five times.
2.  Select **Scan QR code**.
3.  Open **https://autopilotqr.app/** on your phone.
4.  Sign in with your Microsoft Entra ID account.
5.  Scan the QR code and select your Device Preparation policy.
6.  Associate the device with your Intune tenant.

![](/images/posts/introducing-autopilotqr-scan-associate-deploy/screenshot_autopilotQR-930x1024.png)

That’s it! No CSV exports, USB drives, or PowerShell scripts.

AutopilotQR runs entirely in your browser and communicates directly with Microsoft Graph using delegated permissions. No backend infrastructure or customer data storage is required.
