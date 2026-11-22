---
title: "Introducing MSIinfo"
subtitle: "MSI properties for Win32 detection rules, in a second."
description: "A free, open-source web tool that reads MSI properties, product codes, versions and install commands directly in your browser. Built for application packaging and Intune deployments."
lead: "Drag an MSI into your browser and get the ProductCode, silent install commands and an Intune detection rule in a second. No Orca, no PowerShell, no upload."
date: 2026-07-20
categories: [Intune, Windows, Tools]
tags: [Intune, Application packaging]
icon: code
featured: true
image: /images/posts/web-tool-msiinfo-com/msiinfo-app.png
project:
  name: MSIinfo
  suffix: .com
  tagline: MSI properties for Win32 detection rules, in a second.
  icon: code
  links:
    - label: Open MSIinfo
      url: https://msiinfo.com/
      primary: true
    - label: View on GitHub
      url: https://github.com/Simsen/MSIinfo
wordpress:
  guid: "https://www.simsenblog.dk/?p=2368"
  published: 2026-07-20T06:00:00Z
  categories: [endpoint-manager, msi, tools]
---

![MSIinfo.com with an MSI loaded: the ProductCode highlighted at the top, then ProductName, ProductVersion, Manufacturer, UpgradeCode, ProductLanguage and the install scope, each with a Copy button](/images/posts/web-tool-msiinfo-com/msiinfo-app.png)

**What is the ProductCode of this MSI?**

It's a simple question, and you need the answer every time you package an app for Intune.

## Where the idea came from

When working with Microsoft Intune, one of the first things I often need from an MSI file is surprisingly simple:

-   What is the ProductCode?
-   Which silent install command should I use?
-   What detection rule should I configure?
-   Which version am I packaging?

Normally this means opening multiple tools such as Orca, PowerShell or other MSI utilities. Or uploading a vendor's installer to a website you know nothing about.

I wanted something much simpler.

**So instead of another tool to install, I built a website.** 😎

Meet **MSIinfo**.

A free, open-source web tool: drag and drop an MSI file into your browser, and it instantly shows the information Intune administrators and application packagers need.

**MSI properties for Win32 detection rules, in a second.**

[https://msiinfo.com](https://msiinfo.com)

[https://github.com/Simsen/MSIinfo](https://github.com/Simsen/MSIinfo)

---

## What MSIinfo does

-   **Key properties:** ProductCode, ProductName, ProductVersion, Manufacturer, UpgradeCode and ProductLanguage, each with a Copy button.
-   **Install scope:** reads `ALLUSERS` and `MSIINSTALLPERUSER` and tells you whether the MSI installs per-machine or per-user, and how to deploy it in Intune.
-   **Command lines and Intune detection:** silent install and uninstall commands, the registry detection path, and a PowerShell check, all one click to copy.
-   **Full Property table:** filter it, or copy it as JSON or CSV.
-   **Summary Information:** package code, minimum installer version, platform, languages and timestamps.
-   **Large files:** multi-GB installers work, because MSIinfo reads only the parts of the file it needs.

<div class="note"><strong>See it live, no MSI needed</strong>Open <a href="https://msiinfo.com/">msiinfo.com</a> and click <b>Show example</b>. You get the Adobe Acrobat DC installer with its properties, command lines and detection rule. <a href="#try-it">See a screenshot ↓</a></div>

## Getting started

1.  Open **https://msiinfo.com/**.
2.  Drag an MSI onto the page, or click to browse.
3.  Copy what you need: the ProductCode, the install and uninstall commands, or the detection rule.

No install, no sign-in, no admin rights. It works on a locked-down client too.

## Privacy and security

One thing that was important from the beginning was privacy.

**Everything is processed locally in your browser.** Your MSI file is never uploaded: no file contents or file names are sent to any server. That matters when the installer belongs to a customer.

Page visits are counted with Cloudflare Web Analytics, without cookies and without anything about the files you open.

## Limits, by design

-   **A viewer, not an editor.** MSIinfo reads MSI files; it never changes them.
-   **MSI files only.** `.mst` transforms and most `.msp` patches have no Property table, so they are rejected with a clear message.
-   **Exotic codepages** fall back to Windows-1252 if your browser can't decode them.

## Try it

Whether you're packaging applications every day or just occasionally need to inspect an MSI, the goal is the same: spend less time finding metadata and more time deploying applications.

The project is **open source**, so feedback, issues and pull requests are always welcome.

![MSIinfo.com showing the Adobe Acrobat DC example: key properties, the install scope, silent install and uninstall commands, the Intune detection path, a PowerShell check, and the full Property table with Copy JSON and Copy CSV](/images/posts/web-tool-msiinfo-com/msiinfo-app-view.png)
