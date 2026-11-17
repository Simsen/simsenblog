---
title: "How to configure Protected Downloads in Microsoft Edge"
description: "Edge 150+ can redirect downloads on unmanaged Windows devices to OneDrive for Business. A step-by-step setup of Windows MAM, Conditional Access and Protected Downloads."
lead: "Protecting corporate data on unmanaged Windows devices has always been a balancing act between security and user productivity."
date: 2026-11-05
categories: [Intune, Windows]
tags: [Edge, Windows MAM, Conditional Access]
icon: windows
---

Microsoft Edge version 150+ introduces **Protected Downloads**, a new capability for Windows MAM that automatically redirects downloaded files to OneDrive for Business. This helps organizations keep corporate data protected without preventing users from accessing the files they need.

Let’s go through the setup step by step and configure Protected Downloads in Microsoft Edge.

To implement Protected Downloads, we need to configure three different parts of the Microsoft platform:

1. **Microsoft Intune** – configure the Windows MAM App Protection Policy that protects the browser session and corporate data.
2. **Conditional Access** – define which users and unmanaged Windows devices should be required to use the protected MAM experience.
3. **Microsoft Edge for Business** – enable the Protected Downloads capability.

Together, these three components determine who gets the protected experience, how Edge handles corporate data, and where downloaded files are allowed to go.

## 1. Configure Windows MAM in Intune

The first step is to configure a **Windows App Protection Policy** in Microsoft Intune. This policy defines how corporate data can be handled inside the protected Microsoft Edge work profile.

In the Intune admin center, go to:

**Apps > App protection policies > Windows**

Create a new policy or modify an existing Windows MAM policy that targets Microsoft Edge.

Under **Data protection**, configure:

- **Receive data from:** All sources
- **Send org data to:** No destinations
- **Allow cut, copy, and paste for:** Org data destinations and org data sources
- **Print org data:** Block

![Data protection settings in a Windows app protection policy in Intune: receive data from all sources, send org data to no destinations, cut, copy and paste limited to org data, and printing blocked](/images/posts/how-to-configure-protected-downloads-in-microsoft-edge/mam-app-protection-policy.png)

---

## 2. Configure Conditional Access

Next, we need Conditional Access to ensure that users accessing corporate resources from unmanaged Windows devices use the protected Edge experience.

Create a Conditional Access policy targeting the users and resources you want to protect. For a pilot, I recommend starting with a dedicated user group before expanding the policy.

Under **Conditions**, configure:

- **Device platforms:** Windows
- **Filter:** Exclude filtered devices from policy – `IsCompliant = True`
- **Client apps:** Browser

Under **Grant**, select **Require app protection policy**.

This connects Conditional Access with Windows MAM. When a targeted user accesses corporate resources from an unmanaged Windows device, access is required to take place through an application protected by the Intune App Protection Policy.

---

## 3. Enable Protected Downloads in Microsoft Edge

The final piece is configured through the **Microsoft Edge management service**.

![Microsoft Edge management service, Customization Settings > Security settings of a configuration policy, with Protected Downloads (Preview) set to Enabled for Windows](/images/posts/how-to-configure-protected-downloads-in-microsoft-edge/edge-management-service.png)

Go to:

**Microsoft 365 admin center > Settings > Microsoft Edge**

1. Create a new **Configuration policy** targeted to the intended users.
2. Ensure Windows 10+ is selected for platforms and policy type is **Cloud**.
3. No settings need to be added when creating the policy.
4. Under Assignments, assign the Edge configuration policy to the same users targeted by your Windows MAM configuration.

After the configuration policy has been created and saved, open it and navigate to **Customization Settings → Security Settings**.

5. Enable **Protected Downloads**.

---

**Users will now have protected downloads to OneDrive for Business enabled.**

![Microsoft Edge downloads panel with the message "Downloads are managed and will now be saved in OneDrive" and an "Open file in OneDrive" link](/images/posts/how-to-configure-protected-downloads-in-microsoft-edge/protected-download.png)

---

## Two approaches to protecting data on unmanaged devices

Protected Downloads isn’t the only way Microsoft can protect corporate data when users access resources from unmanaged devices.

Organizations using **Defender for Cloud Apps Session Control** can achieve similar outcomes through real-time session controls. However, the two technologies take very different approaches to protecting the data.

The comparison below shows some of the key differences.

![Two approaches, same goal: protect corporate data on unmanaged Windows devices. Windows MAM with Microsoft Edge: unmanaged devices supported, no enrollment required, protection through the Edge work profile, downloads redirected to OneDrive for Business, clipboard and screen capture protection and watermarking supported, control per Edge work profile, Defender for Cloud Apps not required. Best fit: protecting Microsoft 365 access from unmanaged Windows devices, especially with Microsoft 365 E3. Defender for Cloud Apps Session Control: unmanaged devices supported, no enrollment required, protection through a proxied browser session, downloads can be allowed, blocked or protected, clipboard protection and watermarking supported, screen capture protection depends on the app or session, control per app or session, Defender for Cloud Apps required. Best fit: when more granular and advanced session controls are required across cloud applications.](/images/posts/how-to-configure-protected-downloads-in-microsoft-edge/mam-vs-defender-for-cloud-apps.png)

## Is Windows MAM a replacement for Defender for Cloud Apps?

Not necessarily.

Defender for Cloud Apps provides more granular session controls across cloud applications and allows organizations to control activities such as downloads, uploads, copy/paste, and other actions through a proxied browser session.

Windows MAM takes a different approach. Instead of proxying the session, **Microsoft Edge becomes the protected boundary**, with Intune App Protection controlling how corporate data can be handled.

For organizations primarily looking to protect Microsoft 365 access from **unmanaged Windows devices**, Windows MAM can therefore be an interesting alternative, especially if they already have Microsoft 365 E3 and don’t require the more advanced session controls available with Defender for Cloud Apps.
