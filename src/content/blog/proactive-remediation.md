---
title: "Collection of Remediation scripts"
description: "Proactive Remediations detect and fix issues before users notice them. My collection of detection and remediation scripts, used across many client projects."
date: 2020-12-21
categories: [Intune, Windows]
tags: ["PowerShell"]
icon: intune
wordpress:
  guid: "http://www.simsenblog.dk/?p=375"
  published: 2020-12-21T02:47:21Z
  categories: [endpoint-manager, powershell]
---

Since summer 2020 – Proactive Remediation has been available in the Endpoint Manager portal.

This give the possibility to detect and remediate issues before the user see them. This also mean it is only the fantasy that sets the limitations og things you want to observe, change or take statistic on.  
  
The function is also well known from SCCM / MECM with Items and baselines.

Since it was released – I have used if for several tasks. So to help you – I will try collect the best scripts from other sites and keep this post updated with latest and greatest.

---

**Remove doublets – by** [Tristan van Onselen](https://workplaceascode.com/2020/11/10/3-incredible-proactive-remediation-scripts/)  
If you are a IT Pro that reinstall endpoint over and over again – this function will help you to delete doublets on the Desktop, like Teams and Edge shortcuts.

Detection Script: [https://github.com/TristanvanOnselen/WorkplaceAsCode/blob/master/ProActive\_Remediation/Detect\_shortcutsDesktop.ps1](https://github.com/TristanvanOnselen/WorkplaceAsCode/blob/master/ProActive_Remediation/Detect_shortcutsDesktop.ps1)

Remediation Script:  
[https://github.com/TristanvanOnselen/WorkplaceAsCode/blob/master/ProActive\_Remediation/Remediate\_shortcutsDesktop.ps1](https://github.com/TristanvanOnselen/WorkplaceAsCode/blob/master/ProActive_Remediation/Remediate_shortcutsDesktop.ps1)

---

**Suggest reboot for enduser – by** [Jan Ketil Skanke](https://msendpointmgr.com/2020/06/25/endpoint-analytics-proactive-remediations/)

**POST WILL BE UPDATED VERY SOON WITH MORE**
