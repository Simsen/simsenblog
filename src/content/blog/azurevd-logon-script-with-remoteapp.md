---
title: "AVD tip! – Logon script with RemoteApp"
description: "RemoteApp in Azure Virtual Desktop skips Run, RunOnce and startup apps to speed up logon. A workaround for when you still need a logon script, for example to load a different Windows theme."
date: 2022-03-02
categories: [Windows]
tags: ["AVD · Windows 365"]
icon: windows
wordpress:
  guid: "https://www.simsenblog.dk/?p=849"
  published: 2022-03-02T05:00:42Z
  categories: [avd]
---

When you setup RemoteApp in Azure Virtual Desktop – Microsoft has designed it to minimize the load of:

-   The Run registry entry
-   The RunOnce registry entry
-   The startup applications

Simply to make a better and faster experience on the logon phase.  
[**Read more about this.**](https://docs.microsoft.com/en-us/troubleshoot/windows-server/remote/application-not-start-in-remoteapp-session#cause)  
The 2 workarounds Microsoft suggested in the above doc was not good enough for me.

In my case I needed to load another Windows Theme – as the theme in Windows 10 and 11 was bad for the legacy application like Microsoft Navision.

In my AVD image I created a custom folder with my scripts – C:\\Windows\\Customfiles\\Run\_Navision.cmd  
When I created the RemoteApp in Azure – I simply pointed to the Run\_Navision.cmd file that loads the new theme and start the application.  

With this solution I am also sure it always run – no matter what new session host user joins.

Icon path is still to the Navision executable(finsql.exe) – to have the right icon in the Remote Desktop app.  
  
Hope this helped you – enjoy!
