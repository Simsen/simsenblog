---
title: "Move to Edge Chromium"
description: "Edge Legacy reaches end of support on 9 March 2021. Where to get the new Edge, how to deploy it with ConfigMgr or Intune, and the ADMX policies I recommend."
date: 2021-01-08
categories: [Intune, Windows]
tags: ["Edge", "ConfigMgr"]
icon: intune
---

March 9. 2021 is the day where Edge Legacy will have End-of-Support.  
So plan your upgrade today!

[Download the Edge browser for your client here](https://www.microsoft.com/en-us/edge)

[**If you use SCCM / MECM – please follow this great blogpost by Anoop C Nair**](https://www.anoopcnair.com/deploy-edge-chromium-browser-using-sccm/)

---

**[If you use INTUNE / MEM – please follow this great blogpost by Peter Kalpwijk](https://www.inthecloud247.com/deploy-and-manage-microsoft-edge-chromium-with-intune/)  
**

---

When we using Endpoint Manager – here is some great ADMX policies I suggest to use. To give a better experience for the end-user.

| Name | State | Extra |
|---|---|---|
| Action to take on startup | Enable | Open a list of URLs |
| Browser sign-in settings | Enable | Force users to sign-in to use the browser |
| Configure Microsoft Defender SmartScreen | Enable |  |
| Configure Microsoft Defender SmartScreen to block unwanted apps | Enable |  |
| Configure the home page URL | Enable | Setup default webpage |
| Control which extensions are installed silently | Enable | Windows Browser Extension:<br>bkbeeeffjjeopflfhgeknacdieedcoml?hl=en-US |
| Default search provider search URL | Enable | If you want Google:<br>{google:baseURL}search?q={searchTerms}&amp;{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:searchClient}{google:sourceId}ie={inputEncoding} |
| Default search provider URL for suggestions | Enable | {google:baseURL}search?q=%s&amp;{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:contextualSearchVersion}ie={inputEncoding} |
| Enable favorites bar | Enable |  |
| Enable the default search provider | Enable |  |
| Force Microsoft Defender SmartScreen checks on downloads from trusted sources | Enable |  |
| Force synchronization of browser data and do not show the sync consent prompt | Enable |  |
| Show Home button on toolbar | Enable |  |
| Sites to open when the browser starts | Enable | List URLs |
