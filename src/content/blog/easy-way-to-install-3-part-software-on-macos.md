---
title: "Install 3.part software on macOS"
description: "Installomator installs and updates nearly 1,000 macOS apps automatically. How to deploy it with Intune, plus a simple script to install applications on your Macs."
date: 2025-03-11
categories: [Intune, macOS, Tools]
tags: ["Installomator", "App deployment"]
icon: macos
wordpress:
  guid: "https://www.simsenblog.dk/?p=1971"
  published: 2025-03-11T22:00:00Z
  categories: [endpoint-manager, macos, tools]
---

## Introduction

When managing macOS devices with **Microsoft Intune**, deploying and updating applications efficiently is a key challenge. **Installomator** simplifies this process by offering an automated way to install and update nearly 1000 macOS applications. In this post, I’ll introduce **Installomator**, show you how to deploy it via Intune, and demonstrate a simple script to install applications.

## What is Installomator?

**Installomator** is an open-source script that allows IT administrators to install and update a vast array of macOS applications. Instead of manually packaging and deploying apps, Installomator fetches the latest versions directly from vendor sources.

Link: [https://github.com/Installomator/Installomator](https://github.com/Installomator/Installomator)

### Why Installomator is interesting

-   **Automated App Deployment**: Deploy and update applications with minimal effort.
-   **Supports Nearly 1000 Apps**: Includes popular productivity and development tools.
-   **Works Seamlessly with Intune**: Can be used in shell scripts for automated management.
-   **Ensures Latest Versions**: Fetches the latest versions directly from vendors.

---

### Get started…

#### 1\. Copy script for Adobe Reader DC – and save to InstallAdobeReaderDC.sh

##### Simply just change application name on Line 8 with another from the list.  
Link to the list can be found in the buttom.

```bash
#!/bin/bash

# Download Installomator
curl -fsSL https://raw.githubusercontent.com/Installomator/Installomator/main/Installomator.sh -o /usr/local/bin/Installomator
chmod +x /usr/local/bin/Installomator

# Run Installomator with explicit install parameters
sudo /usr/local/bin/Installomator adobereaderdc DEBUG=0
```

#### 2\. Go to Intune > Devices > Scripts and remediations > Platform scripts

#### 3\. Click Add > macOS

![](/images/posts/easy-way-to-install-3-part-software-on-macos/Screenshot-2025-03-11-at-22.45.44.png)

#### 4\. Insert Name and Click Next

![](/images/posts/easy-way-to-install-3-part-software-on-macos/Screenshot-2025-03-11-at-22.46.38.png)

#### 5\. Insert Script and select following options – Click Next

![](/images/posts/easy-way-to-install-3-part-software-on-macos/Screenshot-2025-03-11-at-22.59.25.png)

#### 6\. Assign to User or Device group – Click Next and Add

List of all 998 Apps that can be used in the scripts: [https://github.com/Installomator/Installomator/blob/main/Labels.txt](https://github.com/Installomator/Installomator/blob/main/Labels.txt)

### Will in next blogpost look into SwiftDialog and how to upgrade existing installations.

#### Shortout to The Installomator team
