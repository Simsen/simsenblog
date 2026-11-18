---
title: "PPPC Builder web app for macOS apps"
description: "Meet a browser-based tool for creating macOS privacy permission profiles for Intune."
date: 2026-02-22
categories: [Intune, macOS, Tools]
tags: [macOS, Tools]
icon: macos
wordpress:
  guid: "https://www.simsenblog.dk/?p=2241"
  published: 2026-02-22T05:54:13Z
  categories: [endpoint-manager, macos, tools]
---

Managing macOS privacy permissions in enterprise environments can quickly become complex. Permissions such as Screen Recording, Full Disk Access, Accessibility, Camera, and Microphone require properly configured PPPC profiles — and creating those manually can be time-consuming and error-prone.

That’s why I built **PPPC Builder**: a lightweight web tool that generates ready-to-deploy .mobileconfig files for Microsoft Intune.

Guide:

**1 –**

1.  Locate the application in Finder (typically in /Applications)
2.  Right-click the app
3.  Select **Show Package Contents**
4.  Open the Contents folder
5.  Locate the file Info.plist
6.  Upload the Info.plist file into PPPC Builder

**2 –**

Select the permissions your application needs, for example:

-   Screen Recording (Standard user can toggle)
-   Full Disk Access
-   Accessibility
-   Camera
-   Microphone

**3 –**

Download the generated .mobileconfig file.

**4 –**

1.  Go to **Intune Admin Center**
2.  Navigate to Devices → macOS → Configuration profiles
3.  Create profile → Templates → **Custom**
4.  Upload the generated .mobileconfig
5.  Assign to your target group

Done.

[**Open MacPPPC ↗**](https://macpppc.com)
