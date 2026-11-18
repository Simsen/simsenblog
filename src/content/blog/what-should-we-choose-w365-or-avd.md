---
title: "What should we choose – W365 or AVD?"
description: "A comparison of Windows 365 and Azure Virtual Desktop for different workplace needs."
date: 2023-05-21
categories: [Windows]
tags: [Windows 365, AVD]
icon: article
wordpress:
  guid: "https://www.simsenblog.dk/?p=1261"
  published: 2023-05-21T21:00:00Z
  categories: [avd]
---

As an IT consultant, I’ve had the privilege to work with various clients, each with their unique set of challenges and requirements. This diverse experience has allowed me to compare and contrast Microsoft’s Windows 365 and Azure Virtual Desktop (AVD) in real-world scenarios. I’ve witnessed these technologies in action, observed their performance, and have seen how they can shape the digital landscapes of businesses. In this post, I’ll share my insights and notes from the field on these two powerful cloud-based solutions.

## Windows 365 vs. Azure Virtual Desktop

### I often get the question:  
Simon what is difference between W365 and AVD and what should we choose? – I will say, it depends on scenario and requirements.

-   Windows 365 is per user based license to a Software as a Service.
-   AVD is a desktop / app service running in Azure services.  
    

---

![](/images/posts/what-should-we-choose-w365-or-avd/W365_mellem_logo-1-1024x107.png)

### Scenario 1:

In situations where delivering physical PCs to temporary workers is not feasible, or because your organization lacks IT staff in certain regions to deliver and service computers, But high security standards is still a high demand.

Answer:

In such cases, Windows 365 emerges as an excellent solution. This cloud-based service simplifies the process of assigning and provisioning new Windows 365 Cloud PCs for end-users. It offers the same level of security you would expect from a physical device, ensuring that your data and systems remain protected, regardless of where your employees are located.

Follow-up:

“But Simon, our users don’t need access to these systems all the time. Wouldn’t it be more cost-effective to have users share a single virtual machine in Azure Virtual Desktop (AVD) in a pooled scenario? Also, isn’t Windows 365 quite expensive?”

Answer:

You’re correct in noting that Windows 365 can be more expensive than other options. However, it’s important to consider the time and resources required to set up and manage an AVD environment. The complexity and ongoing management of AVD can often outweigh the initial cost savings.

Moreover, to optimize costs in an AVD setup, you would need to manage the turn-on/turn-off times (also known as Scale plans) to ensure you’re not paying for unused resources. This adds another layer of management complexity. Last but not least – you need to upgrade the CPU and Memory dramatically for multi-session VMs, if you give them full-desktop experience.

---

![](/images/posts/what-should-we-choose-w365-or-avd/AVD_mellem_logo-1024x107.png)

### Scenario 2:

Your organization relies on a legacy application that requires outdated third-party software with known vulnerabilities. Despite these security risks, your users still need access to this application. This presents a challenge: how can you provide access to this application while isolating it to prevent potential security breaches?

Answer:

Azure Virtual Desktop (AVD) offers a solution to this problem through its RemoteApp feature. RemoteApp allows you to host specific applications in the cloud, which users can then access remotely. This means you can provide access to the legacy application without exposing your entire system to the vulnerabilities of its outdated third-party software.

AVD RemoteApp can be configured in a pooled setup with various operating systems, including Windows 10/11, Server OS, or even Windows 7. This flexibility ensures that you can support the legacy application, regardless of its OS requirements.

It’s crucial, however, to restrict users from accessing the full desktop experience in this scenario. The reason for this is twofold:

1.  **Security**: By limiting access to the specific application, you reduce the potential attack surface. Users can’t inadvertently (or intentionally) interact with other parts of the system that might be vulnerable due to the outdated third-party software.
2.  **Resource Efficiency**: Providing a full desktop experience consumes more memory and CPU power, leading to higher costs. By using RemoteApp, you can minimize resource usage and keep costs under control.

---

![](/images/posts/what-should-we-choose-w365-or-avd/W365_mellem_logo-1-1024x107.png)

### Scenario 3:

Let’s consider a situation where your organization has multiple individuals who are responsible for testing software installations and usability. This task requires a stable, secure, and easily manageable environment that closely mirrors the systems used by the majority of your users.

Answer:

In such a scenario, Windows 365 emerges as an extremely practical solution. It provides a experience that is very similar to a traditional Windows 10 or Windows 11 environment, making it ideal for testing purposes.

One of the key advantages of Windows 365 is its ease of provisioning. IT administrators can quickly and efficiently assign Cloud PCs to testers, reducing the time and effort required to set up physical machines.

Moreover, Windows 365 integrates seamlessly with Microsoft Intune. This allows for streamlined software deployment, making it easier to install and manage the applications that need to be tested.

Another significant benefit of Windows 365 is the self-service restore feature. This allows users to revert their Cloud PC to a previous restore point if they encounter issues during testing. This feature can significantly speed up the testing process, as testers can quickly recover from software errors or system crashes without needing to involve IT support.

---

![](/images/posts/what-should-we-choose-w365-or-avd/W365_mellem_logo-1-1024x107.png)

### Scenario 4:

Suppose your organization has decided to use Azure Virtual Desktop (AVD) and is now considering whether to opt for a Pooled or Personal setup. This decision can significantly impact the cost, performance, and user experience of your virtual desktop environment.

Answer:

The choice between a Personal and Pooled setup in AVD largely depends on your specific needs and the operating system requirements of your applications.

Actually I will say that AVD with personal VMs should be removed – unless there is a special requirements for Server OS or Windows 7. Besides that – I would generally recommend Windows 365.

---

![](/images/posts/what-should-we-choose-w365-or-avd/AVD_mellem_logo-1024x107.png)

### Scenario 5:

Your organization is looking to establish a Privileged Access Workstation (PAW) environment. This is a critical security measure for users who need to work securely with their Domain Admin account and Global Administrator for their Microsoft cloud tenant. The challenge lies in determining the best solution to implement this secure environment.

Answer:

If the scenario, where users need to manage both on-premises resources and the Microsoft cloud tenant, I would recommend considering Hybrid-joined Azure Virtual Desktops (AVDs).

A Hybrid-joined AVD setup allows you to leverage the benefits of both on-premises and cloud-based resources. This is particularly useful for privileged accounts that require access to both environments.

The Hybrid-joined AVD setup provides a seamless user experience, as it integrates with your existing on-premises infrastructure and the Microsoft cloud tenant. This means users can access and manage resources in both environments from a single, unified interface.

Moreover, a Hybrid-joined AVD setup can significantly enhance the security of privileged accounts. By isolating these accounts in a virtual environment, you can minimize the risk of security breaches. You can also apply stringent security policies and controls to these accounts, further hardening their security.

For instance, you can enforce multi-factor authentication (MFA) and apply conditional access policies. Additionally, you can leverage features like Privileged Identity Management(PIM) to limit the exposure of privileged accounts.

---

### A small tip for Mac users: If you have Windows 365 or AVD in multiple tenants

At the moment, you cannot add W365 or AVDs from multiple tenants in same app. Here I found that Microsoft released [**Microsoft Remote Desktop in App Store**](https://apps.apple.com/us/app/microsoft-remote-desktop/id1295203466?mt=12) – and then you can download [**Beta version of Microsoft Remote Desktop**](https://install.appcenter.ms/orgs/rdmacios-k2vy/apps/microsoft-remote-desktop-for-mac/distribution_groups/all-users-of-microsoft-remote-desktop-for-mac) – with 2 apps, you can add W365 or AVDs from 2 tenants.

<table class="layout-table"><tbody><tr><td><a href="https://apps.apple.com/us/app/microsoft-remote-desktop/id1295203466?mt=12"><strong>Microsoft Remote Desktop in App Store</strong></a></td><td><img src="/images/posts/what-should-we-choose-w365-or-avd/RemoteDesktop2.png" alt=""></td><td><a href="https://install.appcenter.ms/orgs/rdmacios-k2vy/apps/microsoft-remote-desktop-for-mac/distribution_groups/all-users-of-microsoft-remote-desktop-for-mac"><strong>Beta version of Microsoft Remote Desktop</strong></a></td></tr></tbody></table>

