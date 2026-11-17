---
title: "Web tool: MSIinfo.com"
description: "Read MSI properties, product codes, versions, and installation details directly in your browser. A practical tool for application packaging and Intune deployments."
date: 2026-07-20
categories: [Intune, Windows, Tools]
tags: [Intune, Application packaging]
icon: code
---

When working with Microsoft Intune, one of the first things I often need from an MSI file is surprisingly simple:

-   What is the ProductCode?
-   Which silent install command should I use?
-   What detection rule should I configure?
-   Which version am I packaging?

Normally this means opening multiple tools such as Orca, PowerShell or other MSI utilities.

I wanted something much simpler.

That’s why I built **MSIinfo.com**.

Simply drag and drop an MSI file into your browser, and the tool instantly extracts the information most Intune administrators and application packagers need.

## Features

-   ProductCode & UpgradeCode
-   Product name, version and manufacturer
-   Silent install & uninstall commands
-   Intune detection rules
-   Complete MSI Property table

One thing that was important from the beginning was privacy.

**Everything is processed locally in your browser.** Your MSI file is never uploaded or sent to a server.

Whether you’re packaging applications every day or just occasionally need to inspect an MSI, the goal is the same: spend less time finding metadata and more time deploying applications.

The project is also **open source**, so feedback, issues and pull requests are always welcome.

[**Open MSIinfo.com ↗**](https://msiinfo.com)
