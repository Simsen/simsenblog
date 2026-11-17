---
title: "Admin by Request: LAPS for Autopilot device"
description: "Admin by Request 7.3 brings LAPS to Autopilot devices. How to set it up, and why AbR takes so much pain out of software that is hard to package centrally."
date: 2022-02-13
categories: [Intune, Windows, Tools]
tags: ["Admin By Request", "Autopilot", "LAPS"]
icon: tool
---

I have over time been more and more impressed with **Fasttrack: Admin by Request**.  
How they solve a nightmare for IT admins. It can be hard to deliver all software for the endpoints – and some software is so special and maybe need to be installed in a various versions, so to make a package that can be central distributed will be a pain. AbR solve this – and we are still in control.

In the latest release(7.3) they again come up with new features that could make them important in the Modern AzureAD join transition.

It is now possible to create a Break Glass account – directly from the Admin by Request – Admin portal.  
The account is created with unique username and password – and everything is audited:

-   **Who created the Break Glass Account from AbR portal**
-   **When was the account created on the endpoint**
-   **When did the user logon with the account**
-   **What did the user do with the account on the endpoint**
-   **When was the account deleted from the endpoint**

Something we didnt have with the Local Administrator Password Solution from Microsoft – and I doubt they will have it if/when they release a LAPS solution for AzureAD only devices.

The modern endpoint community has also tried to solve this with Proactive Remediations script from MEM/Intune – but the solution is not 100% and it is hard to manage RBAC for only this part.

---

#### How it works:

1.  When Admin by Request version 7.3 is installed – Break Glass menu show up on the left side.  
    Here we will click Generate Account

![](/images/posts/laps-for-autopilot-device/Abr1_-1024x483.png)
*Here you can generate account for 15min, 30min, 1 hour, 2 hour, 4 hour, 8 hour or unlimited.*

2.  It will live update on the right side – when account is created on the endpoint.

![](/images/posts/laps-for-autopilot-device/Screenshot-2022-02-13-at-19.57.06-1024x628.png)

3.  To trigger an update on the client – try to logon. First time it will say incorrect.  
    But this will trigger AbR agent to update – and create the profile.

![](/images/posts/laps-for-autopilot-device/sidebyside-1024x547.jpg)

4.  This will be seen in the portal like this.

![](/images/posts/laps-for-autopilot-device/Screenshot-2022-02-13-at-19.58.36-1024x634.png)

5.  Now we will logon again with same username and password.  
    AbR also change the background – so we are sure this is the Break Glass Mode

![](/images/posts/laps-for-autopilot-device/Screenshot-2022-02-13-at-20.08.08-1024x827.png)

6.  With this user I have installed Notepad++ – this is visible in the AbR portal.

![](/images/posts/laps-for-autopilot-device/Screenshot-2022-02-13-at-20.13.38-1024x826.png)

7.  Last thing – I have the overview of who created the Break Glass account, when it was used and when it was removed again.

![](/images/posts/laps-for-autopilot-device/Screenshot-2022-02-13-at-20.20.12-1024x268.png)

This is very strong – and I actually also see this as very useful solution in a server environment. So Admins need to create an account for the specific server before they can logon – and everything that trigger UAC/Administrator is in the Audit log.  
  
Creating new account, Updating AbR agent and see it happen in the audit page – all happen instantly.  
You can try this for free with 25 license – without deadline. [Link here.](https://www.adminbyrequest.com/FreePlanDownload)
