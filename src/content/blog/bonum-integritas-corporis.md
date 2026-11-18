---
title: "Patch Management flow for Windows 10"
description: "A simple, proven patch flow for Windows 10 in ConfigMgr: three rollouts a month (the 8th, 18th and 28th), five days in test and five in production, driven by nine Automatic Deployment Rules."
date: 2020-12-16
categories: [Windows]
tags: ["ConfigMgr"]
icon: windows
wordpress:
  guid: "https://blog.wpin1.1prod.one/?p=101"
  published: 2020-12-16T10:17:00Z
  categories: [sccm]
---

It can be hard to find the right way to patch Windows 10 – also when Microsoft release patches outside “Patch Tuesday”.

For that reason I have implemented a simple and successful patch flow – that is running over the month with 3 flows – 08., 18. and 28. in the month.

-   5 days in test – with deadline as soon as possible.
-   5 days in production – with deadline the last day.

![](/images/posts/bonum-integritas-corporis/patchflow8_18_28-1024x130.png)

To manage this – I have configured 9 Automatic Deployment Rules(ADR) for:

-   Windows 10
-   Office 365
-   Other

On each ADR – I have added an extra deployment to the Production collection. So when a make the ADR I point to the Test collection.

![](/images/posts/bonum-integritas-corporis/patch_ADR-1024x680.png)

For Windows 10 ADR – this is the same filter on all 3:

![](/images/posts/bonum-integritas-corporis/Win10_ADR-1024x998.png)

For Other ADR – this is the same filter on all 3:

![](/images/posts/bonum-integritas-corporis/Other_ADR-1024x998.png)

For Office 365 ADR – again, same filter on all 3:

![](/images/posts/bonum-integritas-corporis/Office_ADR-1024x998.png)

Here you see my Patch Management collection view – and the reason I have created a collection for each ADR group – is only if I like to manage who get what updates.

![](/images/posts/bonum-integritas-corporis/PatchManagement_collections-1024x486.png)
