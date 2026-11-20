---
title: "ASR Rules – anno 2023"
description: "Attack Surface Reduction rules have become pivotal in my client projects. How to roll them out with Intune and Defender for Endpoint, from audit mode to block mode, with ready-made policy files."
date: 2023-07-12
categories: [Intune, Windows]
tags: ["Defender for Endpoint"]
icon: intune
wordpress:
  guid: "https://www.simsenblog.dk/?p=1716"
  published: 2023-07-12T05:00:00Z
  categories: [endpoint-manager, mdfe]
---

## Introduction

In my client management journey, Attack Surface Reduction (ASR) rules have become pivotal. These rules, central to Microsoft Defender, are designed to minimize the ‘opportunities’ for attackers to exploit our systems. Microsoft Defender for Endpoint further leverages these rules, providing enhanced alerting, reporting, and threat context, simplifying their management and enforcement. Adopting ASR rules is more than a reaction to threats; it’s a proactive approach to anticipate vulnerabilities. This shift has been key in fortifying our IT environment, strengthening our overall security posture against persistent cyber threats.

### Attack Surface Reduction vs. Attack Surface Reduction Rules

ASR and ASR rules, while connected, refer to different aspects of cybersecurity. ASR, standing for Attack Surface Reduction, broadly denotes the set of built-in and cloud-enabled security features in Windows 10/11 that aim to decrease the potential entry points for malicious actors. This comprehensive strategy aligns with what’s known in the industry as a HIPS (Host Intrusion Prevention System) solution. On the other hand, within the framework of Microsoft Defender ATP, ASR is represented through ASR rules, which are…

-   Attack surface reduction rules
-   Hardware based isolation
-   Application control
-   Exploit protection
-   Network protection
-   Web protection
-   Controlled folder access
-   Network firewall

---

## Which ASR rules exist in Intune?

-   **Block Adobe Reader from creating child processes**
    -   Prevents Adobe Reader, a commonly exploited software, from initiating new processes which could be harmful.  
        
-   **Block execution of potentially obfuscated scripts**
    -   Blocks scripts that have been obfuscated to evade detection, a common practice in advanced attacks.  
        
-   **Block Win32 API calls from Office macros**
    -   Stops dangerous Win32 API calls originating from Office macros. Win32 API calls, while integral to some legitimate processes, can be hijacked for malicious activities.  
        
-   **Block credential stealing from the Windows local security authority subsystem (lsass.exe)**
    -   Prevents unauthorized access to lsass.exe, a key Windows component targeted for credential theft.  
        
-   **Block executable files from running unless they meet a prevalence, age, or trusted list criterion**
    -   This curtails execution of suspicious or unknown files, reducing the potential attack surface.  
        
-   **Block JavaScript or VBScript from launching downloaded executable content**
    -   Prevents JavaScript/VBScript from running downloaded executable files, a common technique used in attacks.  
        
-   **Block Office communication application from creating child processes**
    -   Restricts communication apps within Office from creating child processes, minimizing potential exploit avenues.  
        
-   **Block all Office applications from creating child processes**
    -   This rule stops Office applications from initiating new processes, reducing risks of malicious activities or unintended resource usage.  
        
-   **Block untrusted and unsigned processes that run from USB**
    -   Stops unauthorized or uncertified processes running from USB devices, protecting against potential malware attacks.  
        
-   **Block process creations originating from PSExec and WMI commands**
    -   Prevents potentially malicious process creations triggered by PSExec or WMI, tools often misused by attackers.  
        
-   **Block persistence through WMI event subscription**
    -   This rule stops attackers from using Windows Management Instrumentation for persistence, a common post-exploitation technique.  
        
-   **Block Office applications from creating executable content**
    -   Stops Office apps from generating executable content, reducing potential malware entry points.  
        
-   **Block Office applications from injecting code into other processes**
    -   Prevents Office apps from injecting code into other processes, a common technique used by malware.  
        
-   **Use advanced protection against ransomware**
    -   Applies enhanced security measures to defend against ransomware, a prevalent and disruptive type of malware.  
        
-   **Block executable content from email client and webmail**
    -   Stops executable content in email clients and webmail, protecting against email-based malware attacks.  
        
-   **Block abuse of exploited vulnerable signed drivers (Lastest ASR rule in GUI)**
    -   Stops misuse of exploited signed drivers, preventing another common attack avenue.

---

## Where to start?

Starting with ASR rules may seem daunting, but Microsoft Defender for Endpoint makes it considerably easier. To start, familiarize yourself with each rule and understand their impact on your environment. I recommend beginning with rules that have less likely disruptive effects. Turn on the rules in ‘audit mode’ first, which allows you to assess their impact without blocking anything. Microsoft Defender for Endpoint provides invaluable telemetry and alert data here. It logs every event where the rule would have been triggered, offering a clear view of potential disruptions. This makes it simpler to anticipate and manage any adjustments before switching to ‘block mode’, easing the entire process significantly.  
Scroll down for more info about Defender for Endpoint insights.

### ASR Rules – Easy to set

The following rules are relatively straightforward to set. They typically have less impact on common workflows and cause fewer disruptions:

-   Block Adobe Reader from creating child processes
-   Block credential stealing from the Windows local security authority subsystem (lsass.exe)
-   Block JavaScript or VBScript from launching downloaded executable content
-   Block untrusted and unsigned processes that run from USB
-   Block persistence through WMI event subscription
-   Block Office applications from creating executable content
-   Block executable content from email client and webmail

### ASR Rules – Medium to set

These rules require more careful consideration and testing. They may impact some common workflows and require more specific fine-tuning:

-   Block execution of potentially obfuscated scripts
-   Block Win32 API calls from Office macros
-   Block Office communication application from creating child processes
-   Block Office applications from injecting code into other processes

### ASR Rules – Hard to set

The following rules can be challenging to implement correctly. They require significant testing and may disrupt common workflows. It’s crucial to understand their potential impact before fully enabling them:

-   Block executable files from running unless they meet a prevalence, age, or trusted list criterion
-   Use advanced protection against ransomware
-   Block process creations originating from PSExec and WMI commands **(NO-GO if SCCM Agent is installed)**
-   Block Office communication application from creating child processes

---

### Investigate with Microsoft Defender for Endpoint

Before you just set all “easy to set” policies in Block mode – it is always good to be in control and have done some investigation before enable policies. Here Microsoft Defender for Endpoint comes in handy.

### So how can I help you?

Deploying ASR rules requires meticulous planning as “no rule is without exception”. Each rule can interact differently with your unique IT environment, potentially causing unexpected disruptions. Here I have tried something abnormal and maybe not recommended. But it gives you the possibility so assign each policy to a group.  
It is of cause recommended to bundle the policies together!

Prepare policies

1.  I have created 16 Attack Surface Reduction Rules policies in Intune – each policy for each ASR Rule.

![Intune list of 16 Attack Surface Reduction policies, one per ASR rule, for Windows 10 and later](/images/posts/asr-rules-anno-2023/ASR_Rules-1024x547.png)

2.  I have created 2 Sets – Above policies is exported to JSON files, ready to be imported to your tenant
    -   [Download all policies as in Audit mode](/Files/ASR_AuditMode.zip)
    -   [Download all policies as in Block mode](/Files/ASR_BlockMode.zip)
3.  Now import policies to your tenant with [John Seerden’s Intune Backup & Restore module](https://github.com/jseerden/IntuneBackupAndRestore)
    -   Remember if you import both Audit and Block JSONs, policy name is the same.

### Planning – with Defender for Endpoint

To have the best insights on how your endpoints will react on ASR rules – use this KQL(Kusto Query Language) script

```
DeviceEvents 
| where Timestamp > ago(30d)   
| where ActionType startswith "ASR"
| summarize EventCount=count() by ActionType
```

It gives your a good overview on how the landscape is:

![Defender advanced hunting results counting ASR events by ActionType, such as AsrOfficeCommAppChildProcessBlocked](/images/posts/asr-rules-anno-2023/ASR_Overview.png)

Then you can dive deeper into what each ASR Rule – to get computer names

```
DeviceEvents 
| where (ActionType startswith "AsrOfficeMacro")   
| extend RuleId=extractjson("$Ruleid", AdditionalFields, typeof(string))
| project DeviceName, FileName, FolderPath, ProcessCommandLine, InitiatingProcessFileName, InitiatingProcessCommandLine
```

### Test and Troubleshoot ASR Rules

If you want to test or troubleshoot directly on a single PC – how the ASR tool could block a process. I can recommend this small [powershell GUI from hemaurer](https://github.com/hemaurer/MDATP_PoSh_Scripts/tree/master/ASR%20GUI)

![ASR Rules PoSh GUI listing each Attack Surface Reduction rule with Disabled, Audit, Enabled and Warn options](/images/posts/asr-rules-anno-2023/ASR_Gui.png)

---

### Disclaimer 🙂

Each IT environment is unique and an ‘easy’ ASR rule in one context could have a significant impact in another. Therefore, it’s vital to test each rule in your specific setting before fully implementing it. Use ‘audit mode’ and leverage the telemetry data from Microsoft Defender for Endpoint to assess potential disruptions. Always balance security measures with operational efficiency, and consult up-to-date Microsoft documentation or an IT professional for personalized guidance.
