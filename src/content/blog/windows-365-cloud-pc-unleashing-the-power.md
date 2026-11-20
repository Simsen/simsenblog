---
title: "Windows 365: Perfect Test Environment"
description: "A look at using Windows 365 Cloud PCs as a test environment."
date: 2023-06-12
categories: [Windows]
tags: [Windows 365]
icon: article
wordpress:
  guid: "https://www.simsenblog.dk/?p=1429"
  published: 2023-06-12T05:30:00Z
  categories: [avd]
---

Having 32GB of memory isn’t a novelty in today’s tech world. We’ve had powerful desktop machines and servers with such capabilities for some time. However, the real question isn’t just about having that capacity – it’s about how we can unleash its full potential.

Enter Windows 365 Cloud PC. What sets it apart isn’t just the provision of 32GB of memory, but how this memory is optimized within a cloud-based framework. This cloud integration means you have virtually unlimited, scalable resources at your fingertips. It’s the combined power of a robust physical machine with the accessibility and flexibility of the cloud.

Running virtual machines is one way to tap into this potential. These virtual environments can utilize a significant portion of memory, allowing you to create sophisticated, isolated instances for software testing, development, and deployment. In essence, the memory becomes a gateway to a sandbox where innovation is not just possible, but encouraged.

Moreover, the ability to run high-demand applications smoothly and efficiently, paired with the ease of resource management that comes with a cloud-based system, can significantly boost productivity. It’s like having a supercomputer in your pocket, ready to be accessed anytime, anywhere.

I will show 3 scenarios:

-   **Scenario 1: Windows and Office Deployment Lab Kit**
-   **Scenario 2: Windows 11 Development Environment**
-   **Scenario 3: Windows Sandbox for Software Package Testing** (incl. Damien Van Robaeys right-click Sandbox tool)

## Windows 365 Enterprise 8vCPU / 32GB / 256GB

For this demonstration, I’ve set up a potent Cloud PC which should more than meet the requirements for our outlined scenarios. However, it’s worth noting that a configuration with 4vCPU could also be viable for nested virtualization. [More info here](https://learn.microsoft.com/en-us/windows-365/enterprise/nested-virtualization)

![Windows 11 Settings About page on a Cloud PC Enterprise 8vCPU/32GB/256GB, showing an AMD EPYC processor and 32 GB RAM](/images/posts/windows-365-cloud-pc-unleashing-the-power/Windows365_32GB-1024x686.png)

---

## Scenario 1: Windows and Office Deployment Lab Kit

Utilize the robust 32GB memory of Windows 365 Cloud PC to download and run this comprehensive deployment kit, comprising SCCM, MDT, Domain Controller, and multiple Windows clients. Witness how it handles a great demo-setup on the move.

**Step 1**: [Download the Lab](https://www.microsoft.com/en-us/evalcenter/download-lab-kit) and extract zip – 22GB

![Lab Kit server table listing HYD-CLIENT1-6, HYD-CM1, HYD-DC1, HYD-GW1, HYD-INET1, HYD-MDT1 and HYD-VPN1 with their roles](/images/posts/windows-365-cloud-pc-unleashing-the-power/labkit_servers-1024x641.png)

  
**Step 2**: Enable Hyper-V feature and reboot cloud pc

![Windows Features dialog with the Hyper-V checkbox ticked and highlighted](/images/posts/windows-365-cloud-pc-unleashing-the-power/Hyper-V-1.png)

  
**Step 3**: Create an External Virtual Switch in Hyper-V

![Hyper-V Virtual Switch Manager creating 'External 2' as an External network switch on the Microsoft Hyper-V Network Adapter](/images/posts/windows-365-cloud-pc-unleashing-the-power/vNETswitch.png)
*Create new network switch – called External 2. When apply, connection to Cloud PC will maybe loose.  
Just recoonect.*

**Step 4:** Install the Deployment Lab Kit – Run setup.exe

![Windows 10 and Office 365 Deployment Lab Kit Setup Wizard welcome page, noting setup takes about 20 minutes](/images/posts/windows-365-cloud-pc-unleashing-the-power/Screenshot-2023-06-09-at-12.29.48.png)
*Click Next*

![Deployment Lab Kit Setup Wizard License page showing the Microsoft licence terms for the VHD images](/images/posts/windows-365-cloud-pc-unleashing-the-power/Screenshot-2023-06-09-at-12.29.59.png)
*Click Next*

![Setup Wizard Provision page extracting Microsoft365DeviceLabKit.zpaq from C:\DATA\Lab with a progress bar](/images/posts/windows-365-cloud-pc-unleashing-the-power/labkit.png)
*Now it is extracting all VHDs and configure Hyper-V*

![Setup Wizard Ready page saying the lab is ready, with a link to Hyper-V Manager](/images/posts/windows-365-cloud-pc-unleashing-the-power/labkit_done.png)
*Close the prompt – and open Hyper-V manager  
Lab Kit is now installed – running on Windows 365 Cloud PC*

![Hyper-V Manager on the Cloud PC running HYD-CM1, HYD-DC1 and HYD-GW1, with Active Directory and Configuration Manager consoles open](/images/posts/windows-365-cloud-pc-unleashing-the-power/labkit_running-1024x686.png)

---

## Scenario 2: Windows 11 Development Environment

Experience a fully fledged Windows 11 development environment, equipped with Visual Studio 2022, WSL2, Windows Terminal, and developer mode enabled. The Cloud PC’s capacity is perfectly suited for this resource-intensive setup, paving the way for innovation.

**Step 1:** Right Click in Hyper-V manager > Click Quick Create…

![Hyper-V Manager right-click menu on the host with Quick Create highlighted](/images/posts/windows-365-cloud-pc-unleashing-the-power/hyper-v_rightclick.png)

  
Step 2: Select Windows 11 dev environment > Click Create Virtual Machine  
Windows Image can also be downloaded here: [Download the image](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/) for multiple Virtualization vendors.

![Hyper-V Quick Create dialog with Windows 11 dev environment selected and the Create Virtual Machine button](/images/posts/windows-365-cloud-pc-unleashing-the-power/Screenshot-2023-06-10-at-20.33.45.png)

![Quick Create confirming 'Virtual machine created successfully' for Windows 11 dev environment, with a Connect button](/images/posts/windows-365-cloud-pc-unleashing-the-power/devkit_2.png)

  
**Step 3: Start and Connect – ready to use**

![Windows 11 dev environment VM running in Hyper-V on the Cloud PC, Start menu showing Visual Studio 2022 and Ubuntu on Windows](/images/posts/windows-365-cloud-pc-unleashing-the-power/devkit-1024x686.png)

---

## Scenario 3: Windows Sandbox for Software Package Testing

Use Windows Sandbox to test software packages within secure, isolated environments. With the Cloud PC’s ample memory, spinning up multiple sandbox instances is a breeze, demonstrating its exceptional efficiency and resource management.

**Step 1:** Enable Windows Sandbox feature and reboot

![Windows Features dialog with the Windows Sandbox checkbox ticked and highlighted](/images/posts/windows-365-cloud-pc-unleashing-the-power/sandbox_enable.png)

  
**Step 2:** Start Windows Sandbox

![Windows Sandbox window running on the Windows 365 Cloud PC desktop](/images/posts/windows-365-cloud-pc-unleashing-the-power/sandbox_run-1024x686.png)

## Extra: [RunInSandbox Right-Click tool from Damien Van Robaeys](https://www.systanddeploy.com/2023/06/runinsandbox-quick-way-to-runextract.html)

Damien just released this tool – so I thought it make sense also to test it on Cloud PC.

Right click directly on EXE, PS1, VBS, CMD, MSI, REG, ect. and run in Sandbox

![Explorer right-click menu on a PowerShell script showing Run PS1 in Sandbox with system, user and parameters options](/images/posts/windows-365-cloud-pc-unleashing-the-power/sandbox_tool-1024x686.png)

Windows Sandbox startup – and start PSAppDeployToolkit installation with Notepad++  
**Kudos to Damien for making this right click tool!**

![Windows Sandbox showing a PSAppDeployToolkit dialog installing SIMSEN Notepad++ 1.0](/images/posts/windows-365-cloud-pc-unleashing-the-power/sandbox_tool_running-1024x686.png)
*Perfect to use for software testing – and save some clicks!*
