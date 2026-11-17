---
title: "Embrace the Future Endpoint – Part 2"
description: "Continue the discussion of the future endpoint and a modern approach to device management."
date: 2023-06-26
categories: [Windows]
tags: [Endpoint management]
icon: article
---

## Introduction and recap

[***In the first part of our series***](/2023/06/19/future-client-zero-trust/), we embarked on an exploration of the evolving landscape of endpoint management. We discussed the ‘Future Endpoint’, an emerging concept representing the wide array of devices and systems that businesses must now manage. We scrutinized traditional endpoint management tools like SCCM, evaluating their capabilities and identifying their limitations in managing this new generation of endpoints. Furthermore, we recognized the necessity of compliance and conditional access, elements that are becoming increasingly critical in our modern environment.

As we move into Part 2, our focus pivots towards the future. We’ll explore the capabilities of modern management tools that have been designed to manage this expanded and diverse array of endpoints effectively. Tools like Intune, Azure AD and Defender for Endpoint are specifically engineered to embrace these changes, providing powerful and flexible solutions that align with the demands of contemporary endpoint management.

Moreover, we’ll delve into the intricate process of transitioning from a traditional management tool like SCCM to these modern solutions. We understand that change can be challenging; therefore, we will highlight potential obstacles you may encounter during this transition, and importantly, discuss strategies to mitigate these challenges. Our primary aim with this segment is to provide you with comprehensive insights and practical guidance to navigate this crucial transition successfully, helping you future-proof your endpoint management strategy and strengthen your organization’s digital infrastructure.

## Why Microsoft Intune

You may already be familiar with Microsoft Intune, but let’s delve a little deeper. As an IT professional, I’ve seen how Intune has transformed device and application management in our ever-evolving digital landscape. This cloud-based service, part of Microsoft’s Enterprise Mobility + Security Suite, is more than just a tool; it’s an essential partner in managing the complexity of today’s workplaces.

Intune excels in managing both PCs, Macs, iOS and Android devices and their apps. Key features like Mobile Device Management (MDM) and PC management capabilities streamline daily tasks, ensuring secure application access, robust device and data protection, as well as flexible deployment and software updates.

As our workplaces become a network of diverse devices and remote teams, Intune’s ability to manage a variety of operating systems, apply conditional access policies, and perform real-time compliance assessments is invaluable. For me, Microsoft Intune isn’t merely a tool, it’s the ally I rely on to create an efficient, secure, and adaptable endpoint management environment.

## “The normal SCCM to Intune project”

The journey of transitioning management from SCCM to Intune typically unfolds in two distinct phases. Each phase involves specific considerations and action points to ensure a smooth and efficient transition.

![](/images/posts/future-client-zero-trust-pt2/Rocket_ModernWorld-1-1024x267.png)

### Phase 1: Managing Existing PCs (Hybrid Joined Devices)

The first phase focuses on managing existing PCs that are hybrid joined. The primary goal here is to set up co-management, which allows SCCM and Intune to manage the same device. I start by setting all sliders to Intune Pilot and then adding a collection on the staging tab. This approach offers me full control over which computers are moved to Intune.

Next, a crucial aspect of this phase is the analysis of existing Group Policy Objects (GPOs). It’s essential to evaluate which GPOs make sense to be moved to Intune. However, a word of caution here: a one-to-one transfer is not beneficial, as it may clutter Intune with outdated or unnecessary configurations. From experience, GPOs relating to certificates, network shares, and printers are typically left untouched for Hybrid Joined devices..

To ensure only the desired GPOs are applied, I usually create a new Organizational Unit (OU) structure in Active Directory, block inheritance, and add only the necessary GPOs. This method guarantees that only selected policies are enforced, preserving a clean, efficient management environment.  
This also make it easier to cleanup old GPOs later when the move is done.

Additionally, maintaining a naming standard for policies in Intune from the get-go prevents chaos in the future. Clear and consistent naming conventions facilitate easier management and troubleshooting.

Finally, it’s crucial to establish a robust Security baseline in Intune, enhancing the overall security posture of the managed devices.

### Phase 2: Modern Azure AD Devices

The second phase of the project involves setting up modern Azure AD devices. This process includes setting up Deployment Profiles, Enrollment Status Pages, and ensuring that the Security baseline established in Phase 1 is compatible with the modern setup.

In this phase, solutions for managing certificates, network shares, and printers must also be considered, ensuring these elements are integrated smoothly into the modern management paradigm.

In conclusion, the journey from SCCM to Intune is a two-phase project that involves thoughtful planning, meticulous execution, and continuous optimization. While the road may seem winding at first, the benefits it yields in terms of flexibility, scalability, and security make it a worthy endeavour for every IT professional.

## Potential Challenges

**But Simon, our focus is primarily on creating Modern AAD-joined Autopilot devices and we don’t necessarily want our existing hybrid devices in Intune. So, wouldn’t it make more sense for us to just move directly to phase 2?**

That’s a valid point and Azure AD Autopilot certainly offers compelling benefits. But here’s my take: If you’re in a position to replace all your devices at once, then yes, skipping straight to Phase 2 might make sense. However, in reality, many organizations follow a staggered hardware refresh cycle, and an immediate, all-at-once transition is not feasible.

In such cases, ignoring the existing hybrid devices and their transition to Intune can lead to complications. You would end up managing two separate environments, each with potentially different security baselines and policies. This fragmentation can cause management overhead and introduce inconsistencies in the user experience and security posture.

So, while moving straight to Phase 2 with AAD-joined Autopilot devices may seem attractive, it’s critical to consider the practicalities of your specific situation. Striking a balance that suits your organization’s unique circumstances is key to a successful transition.

**Okay fair, I will also look at phase 1 – but can i run these two phases at the same time.**

Great question! Indeed, it is possible to run these two phases simultaneously, but careful consideration must be given to the specifics of your organization and the current state of your device landscape. If you have Azure AD devices already in production, moving straight into Phase 2 while concurrently running Phase 1 can pose challenges.

The issue lies in potential variations in the security baselines for different devices. Changes made during the transition can inadvertently affect AAD-joined devices already in production, causing unexpected issues or conflicts. So, while it’s possible, I recommend a methodical and carefully sequenced approach.

Consider this: complete Phase 1 first – move existing devices to Intune, ensure your security baselines are firmly established and running smoothly. Only then, with a solid foundation, commence Phase 2 and introduce Azure AD devices. This way, you avoid the risk of disrupting your production environment, and you have a clear and controlled transition path to modern management.
