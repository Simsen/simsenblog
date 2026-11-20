---
title: "Local Administrator on MacOS?"
description: "Explore local administrator permissions when onboarding Macs with Intune."
date: 2023-06-04
categories: [macOS, Intune]
tags: [macOS, Security]
icon: macos
wordpress:
  guid: "https://www.simsenblog.dk/?p=832"
  published: 2023-06-04T17:40:00Z
  categories: [macos, tools]
---

When onboarding macOS with Apple Business Manager and Intune, there are a few important security considerations to keep in mind. Specifically, it’s crucial to control the level of access each user has on a device, and this includes the potential issue of local users obtaining administrator rights.

When a local user has administrator rights, they have the power to change settings, install software, and alter other user accounts. In a business environment, it’s usually not desirable for each user to have this level of control, particularly in a context where data protection, malware prevention, and consistent user experiences are key.

I have earlier mentioned Admin by Request from Fasttrack – which is a very powerfull Just-in-time priviledge tool.

When you are onboarding macOS with Apple Business Manager and Intune, you can certainly integrate Admin By Request to enhance your security measures. This tool provides several advantages:

1.  **Just-In-Time Access:** With Admin By Request, users can be granted temporary admin rights when necessary, but they don’t have full-time admin access. This mitigates the risk of malicious or inadvertent changes being made to system settings.
2.  **Auditing and Tracking:** Admin By Request provides a detailed audit log of all actions taken by users with administrative privileges. This gives you the ability to review and monitor how administrative rights are being used in your organization, providing an extra layer of accountability.
3.  **Approvals:** The tool offers the possibility of setting up an approval process. This means that when a user requests admin rights, the request can be reviewed and approved (or denied) by an IT administrator. This can be done either manually for each request or you can set up rules for automatic approval.
4.  **Security Compliance:** By limiting user privileges and closely monitoring the use of admin rights, Admin By Request can help your organization to comply with security regulations and standards, such as GDPR, ISO 27001, and Cyber Essentials.

## 1\. Setup freeplan tenant

You can setup a freeplan tenant with 25 licenses – which is a great idea to actually test the solution. The freeplan dont have any deadline. [LINK](https://www.adminbyrequest.com/en/freeplandownload)

---

## 2\. Setup Azure AD Connector

A new and very important feature for Admin by Request on MacOS is support for Azure AD groups. We will get back to details on how it looks.

![Admin By Request Mac Global Settings, Azure AD tab, with Azure AD Connector enabled for the tenant and state Functional](/images/posts/local-administrator-on-macos/AbR-AzureADConnector-1024x499.png)

---

## 3\. Download Admin by Request agent

Go to download – and get the Client for Mac.

![Admin By Request portal Download Client for Mac panel offering Admin By Request for Mac 4.0](/images/posts/local-administrator-on-macos/AbR-Download-1024x149.png)

When click Download – the agent will be created for your tenant. So no special parameters or login after. This package is for **YOUR** tenant.

![Admin By Request portal building the tenant-specific Mac package, noting it must be co-signed by Apple (up to 15 minutes)](/images/posts/local-administrator-on-macos/AbR-Download2.png)

---

## 4\. Prepare Admin by Request – Mac Global Settings

<table class="layout-table"><tbody><tr><td>When login to Admin by Request admin portal<br><br>Go to: Settings.<br><br>From settings – you can see:<br><br>Windows Settings – Global Windows settings<br>Windows Sub Settings – Settings assigned to a group<br><br>Mac Settings – Global Mac setting<br>Mac Sub Setting – Settings assigned to a group<br><br>Global settings – is like fallback, if no sub settings is matching</td><td><img src="/images/posts/local-administrator-on-macos/abr_Menu.png" alt="Admin By Request portal Settings menu listing Windows Settings, Windows Sub Settings, Mac Settings and Mac Sub Settings"><br></td></tr></tbody></table>

### Set Global Mac settings

![Mac Global Settings Authorization tab with Allow Run As Admin and Allow Admin Sessions both set to Off](/images/posts/local-administrator-on-macos/abr_Global_mac_settings-1024x747.png)
*Set both to off*

![Mac Global Settings Lockdown tab with Revoke admin rights set to Off](/images/posts/local-administrator-on-macos/abr_Global_mac_settings2-1024x468.png)
*Revoke admin rights – Set to Off  
When Admin by Request is installed – it will not have any effect.*

---

## 5\. Prepare Admin by Request app in Intune

### Install from Intune as a Line-of-business app

Go to: https://intune.microsoft.com > Apps > MacOS > + Add > **Line-of-business app**.  
I will then assign the app to All devices with a filter or a specific Azure AD group.

![Intune Add App wizard for a macOS line-of-business app, uploading Admin By Request 4.0 pkg with bundle ID com.fasttracksoftware.adminbyrequest](/images/posts/local-administrator-on-macos/AbR-IntuneApp-569x1024.png)

### Install from Shell script

If you onboard your Mac from Apple Business Manager – and want to have Admin by Request installed as soon as possible. I recommend use Shell scripts – as this is much faster. [Link to Github](https://github.com/Simsen/MacAppInstall_Intune/blob/main/AdminByRequest)

---

## 6\. Install Admin by Request from Company Portal and verify

Admin by Request now show up in Company Portal.

![Company Portal for Mac showing Admin By Request 4.0 available to install](/images/posts/local-administrator-on-macos/AbR_CompanyPortal-1024x792.png)

After Installation – Admin by Request will show in tool menu (Upper-right-corner)  
When the icon is RED – user is still local administrator all the time and Admin by Request policy is not enforced yet.  
This is because we set our Global Mac settings to NOT revoke Admin rights.

![Red Admin By Request menu bar icon reporting the user is logged in as administrator, so the policy is not yet enforced](/images/posts/local-administrator-on-macos/Skaermbillede-2023-06-04-kl.-10.13.03.png)

---

## 7\. Create Admin by Request policies

Now we will create a Mac sub setting that target our Mac.

![Admin By Request Mac sub settings page with an empty list and the New button highlighted](/images/posts/local-administrator-on-macos/abr-subsetting_1-1-1024x305.png)
*Click New*

![New Mac sub setting named 'Office User' being entered, with Update highlighted](/images/posts/local-administrator-on-macos/abr-subsetting_2-1-1024x370.png)
*Insert name – and click Update*

![Mac sub settings list showing 'Office User (Inactive)' with the Edit link highlighted](/images/posts/local-administrator-on-macos/abr-subsetting_3-1-1024x292.png)
*Click Edit on the new sub setting*

![Office User sub setting scope with computer group AAD_AdminByRequest_OfficeSettings, Active set to On and Save highlighted](/images/posts/local-administrator-on-macos/abr-subsetting_4-1-1024x563.png)
*Set Active to On  
Insert Azure AD group (Remember to add the mac to this group)  
Click Save*

![Office User Authorization settings overruling global settings, with Run As Admin, Admin Sessions and Require reason on and 15-minute access time](/images/posts/local-administrator-on-macos/abr-subsetting_5-1024x566.png)
*Go to: **Authorization**  
Set it to Overrule global settings  
Activate as showed and click Save*

![Office User Endpoint branding overruling global settings, with logo file on and company name set to 'Office'](/images/posts/local-administrator-on-macos/abr-subsetting_6-2-1024x525.png)
*Go to: **Endpoint**  
Set it to Overrule global settings  
I recommend to set policy name as Company name.(Will show later why)*

![Office User Lockdown Admin Rights tab overruling global settings with Revoke admin rights set to On](/images/posts/local-administrator-on-macos/abr-subsetting_7-1-1024x535.png)
*Go to: **Lockdown**  
Set it to Overrule global settings  
Set Revoke admin rights to On*

![Office User Lockdown SUDO tab overruling global settings, with Allow sudo terminal commands left Off](/images/posts/local-administrator-on-macos/abr-subsetting_8-1024x526.png)
*Under **Lockdown** go to the other tab: **SUDO**  
Consider if you want to enable this – user will be able to uninstall Admin by Request agent*

---

## 8\. Now check Admin by Request agent on the Mac

![Admin By Request menu bar icon on the Mac offering Request administrator access once the policy is applied](/images/posts/local-administrator-on-macos/abr-PolicyApplied.png)
*Click Request administrator access*

![Administrator Access prompt asking to start an administrator session, branded with the sub-setting name 'Office'](/images/posts/local-administrator-on-macos/Screenshot-2023-06-04-at-19.31.19.png)
*Click Yes  
Under the logo – you can also see it is the name of the sub-setting: Office  
Normally it would be Company name.  
When you have multiple profiles and need to troubleshoot this is handy.*

![Request Administrator Access form with email, phone and reason 'Install Jabra application' for the audit log](/images/posts/local-administrator-on-macos/Screenshot-2023-06-04-at-19.31.12.png)
*Type in justification to the Audit log – why you elevated to Administrator access*

![Admin By Request administrator session window counting down from 15 minutes, with a Finish button](/images/posts/local-administrator-on-macos/abr-countdown.png)
*15min countdown for multiple tasks.*

---

## 9\. Full audit

From the Admin by Request admin portal – we now have full audit of what has been installed.

![Admin By Request audit log entry showing the user, reason, Office User setting and Jabra software installed during the session](/images/posts/local-administrator-on-macos/abr-fullaudit-1024x441.png)
