---
title: "Admin by Request + MS AppLocker = GREAT"
description: "Combine Admin by Request with AppLocker to block unapproved apps like shareware or TeamViewer QuickSupport, while still letting users request the ones they need. With a demo video of five common scenarios."
date: 2021-10-04
categories: [Windows, Tools]
tags: ["Admin By Request", "AppLocker"]
icon: tool
permalink: "/2021/10/04/admin-by-request_and_ms-applocker/"
wordpress:
  guid: "https://www.simsenblog.dk/?p=626"
  published: 2021-10-04T11:00:00Z
  categories: [ad-gpo, tools]
---

Companies need to fulfil regulations, to document what specific applications that is running on the PC. Here it can be hard to make sure users don’t download software that is not approved and run ex. Shareware/malware, TeamViewer QuickSupport or Google Chrome. But Companies still want the flexibility to allow some apps to run for special matter. Here Admin by Request can help.

The request feature in Admin by Reqeust will “win” over AppLocker to actually give the possibility to do the request and run specific application. AppLocker is a perfect solution to make sure apps from specific vendor, specific version or from Read-Only folders can run.

But it can be hard to give back some of this flexibility and still audit this in a smart process.

## I have made a demo video – with 5 common scenarios.

My AppLocker policy for the demo – very simple.

![AppLocker rules allowing Microsoft-signed apps, Program Files and Windows folders, but denying NOTEPAD.EXE for Everyone](/images/posts/admin-by-request-and-ms-applocker/applocker.png)

In Admin by Request I have activated, so users can do Run As Admin, but need approval.

![Admin By Request Run As Administrator settings with Allow Run As Admin and Require approval both switched on](/images/posts/admin-by-request-and-ms-applocker/applocker2.png)

PC 1

-   Downloaded TeamviewerQS – and run, NOT Allowed.
-   Downloaded Notepad++ – Request to install, Allowed
    -   Installed in Program Files – Allowed to run
-   Request TeamviewerQS to run – Allowed.
-   Close TeamviewerQS, try run again, Not allowed(Only single session is approved).

PC 2

-   Request to install Notepad++, Allowed
    -   Install to **C:\\Notepad**\\
    -   Not allow to Run (Only allowed to run from Program Files and Windows folder)

<video controls preload="metadata" playsinline width="1280" height="958" src="/images/posts/admin-by-request-and-ms-applocker/applocker.mp4"></video>

## Conclusion

We now have full control of all executables on the Windows client. Everything is allowed to run from Read-only folders, like Program Files and Windows. Software is typical installed in these folders by MEM/SCCM.

All apps that is downloaded – and tried to installed/run will be blocked. Users is able to request install/run on a single session. IT Admins can then from Admin by Request approve single session to run.
