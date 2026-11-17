---
title: "Proactive Remediations – MS Defender"
description: "Sometimes parts of Microsoft Defender stop running, even with Tamper Protection on. Proactive Remediation scripts that check every Defender component and start what has stopped."
date: 2022-03-13
categories: [Intune, Windows]
tags: ["Defender for Endpoint", "PowerShell"]
icon: terminal
---

Microsoft Defender on each client is a high important tool as it both are an Antivirus tool – but also deliver info to Defender for Endpoint as a sensor.

Microsoft developed Tamper Protection that should make sure evil software/process not should be able to disable Microsoft Defender.

But we sometime see different components of Defender that is not running. Here Proactive Remediation scripts gets handy to make sure every day/week that Defender process is running and secure the client.

We have scripts for:

-   SCID-91: Enable Real Time Behavior Monitoring
-   SCID-96: Enable Network Protection
-   SCID-2012: Enable Real Time Protection
-   SCID-2013: Enable PUA Protection(Potentially Unwanted Applications)
-   SCID-2016: Enable Cloud Delivered Protection

**Kudos to my good collegue [Peter Jørgensen Madsen](https://windowstech.net/) for support on the scripts**.

All scripts is setup with following settings:

Run this script using the logged-on credentials: **No**  
Enforce script signature check: **No**  
Run script in 64-bit PowerShell: **Yes**

---

**Enable Real Time Behavior Monitoring**

Detection script

```powershell
$version = 'C1'
if((Get-MpComputerStatus).BehaviorMonitorEnabled  -eq "True") {
    Write-Output "$version COMPLIANT"
    exit 0
} else {
    Write-Output "$version NON-COMPLIANT"
    exit 1
}
```

Remediation script

```powershell
$version = 'R1'
try {
    Set-MpPreference -DisableBehaviorMonitoring $false
    Write-Output "$version Remediated"
    exit 0
}
catch {
    Write-Output "$version Failed"
    exit 1
}
```

---

**Enable Network Protection**

Detection script

```powershell
$version = 'C1'
if((Get-MpPreference).EnableNetworkProtection -eq 1) {
    Write-Output "$version COMPLIANT"
    exit 0
} else {
    Write-Output "$version NON-COMPLIANT"
    exit 1
}
```

Remediation script

```powershell
$version = 'R1'
try {
    Set-MpPreference -EnableNetworkProtection Enabled
    Write-Output "$version Remediated"
    exit 0
}
catch {
    Write-Output "$version Failed"
    exit 1
}
```

---

**Enable Real Time Protection**

Detection script

```powershell
$version = 'C1'
if((Get-MpComputerStatus).RealTimeProtectionEnabled  -eq "True") {
    Write-Output "$version COMPLIANT"
    exit 0
} else {
    Write-Output "$version NON-COMPLIANT"
    exit 1
}
```

Remediation script

```powershell
$version = 'R1'
try {
    Set-MpPreference -DisableRealtimeMonitoring $false
    Write-Output "$version Remediated"
    exit 0
}
catch {
    Write-Output "$version Failed"
    exit 1
}
```

---

**Enable PUA Protection(Potentially Unwanted Applications)**

Detection script

```powershell
$version = 'C1'
if((Get-MpPreference).PUAProtection -eq 1) {
    Write-Output "$version COMPLIANT"
    exit 0
} else {
    Write-Output "$version NON-COMPLIANT"
    exit 1
}
```

Remediation script

```powershell
$version = 'R1'
try {
    Set-MpPreference -PUAProtection Enabled
    Write-Output "$version Remediated"
    exit 0
}
catch {
    Write-Output "$version Failed"
    exit 1
}
```

---

**Enable Cloud Delivered Protection**

Detection script

```powershell
$version = 'C1'
if(((Get-MpPreference).MAPSReporting -eq 2) -and ((Get-MpPreference).SubmitSamplesConsent) -eq 3) {
    Write-Output "$version COMPLIANT"
    exit 0
} else {
    Write-Output "$version NON-COMPLIANT"
    exit 1
}
```

Remediation script

```powershell
$version = 'R1'
try {
    Set-MpPreference -MAPSReporting Advanced
    Set-MpPreference -SubmitSamplesConsent SendAllSamples
    Write-Output "$version Remediated"
    exit 0
}
catch {
    Write-Output "$version Failed"
    exit 1
}
```

---
