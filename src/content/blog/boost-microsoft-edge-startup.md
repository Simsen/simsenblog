---
title: "Boost Microsoft Edge startup"
description: "One policy makes Edge Chromium start almost instantly. How to turn on Startup Boost from Endpoint Manager, with a before-and-after comparison."
date: 2021-03-09
categories: [Windows]
tags: ["Edge"]
icon: windows
wordpress:
  guid: "http://www.simsenblog.dk/?p=508"
  published: 2021-03-09T06:00:00Z
  categories: [edge]
---

If your organisation already switched to Microsoft Edge – maybe this feature can be ussful.

With a simple policy – you can get the Edge Chromium to start instantly.  
You just need to be on version: 88.0.705.50 or above.

The policy is named:  
HKEY\_LOCAL\_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Edge

**StartupBoostEnabled** DWORD

(delete) = Default  
**0** = Always disabled  
**1** = Always enabled  
  
In Endpoint Manager the policy is under Administrative Templates:  
**Enable startup boost: Enable**.

Normal startup

![](/images/posts/boost-microsoft-edge-startup/Edge_slow.webp)

After policy is applied:

![](/images/posts/boost-microsoft-edge-startup/Edge_fast.webp)

When set this policy – Microsoft Edge will run in the background.
