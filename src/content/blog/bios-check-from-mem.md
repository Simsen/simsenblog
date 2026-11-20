---
title: "BIOS check from Endpoint Manager"
description: "Compliance errors after Autopilot enrolment, and a hunch that the BIOS settings were wrong. A Proactive Remediation script that reads the BIOS configuration from WMI on every device, without touching them."
date: 2021-01-24
categories: [Intune, Windows]
tags: ["PowerShell"]
icon: terminal
wordpress:
  guid: "http://www.simsenblog.dk/?p=424"
  published: 2021-01-24T22:08:00Z
  categories: [endpoint-manager, powershell]
---

We got errors on our compliance policy after we enrolled them to Autopilot and I have the idea that the BIOS was correct configured. But instead of having the computer in hand. Together with a collegue we developed this script.

The script can from Proactive Remediation, check all computers in the WMI – and give you a feedback of how the BIOS is configured.

This is version 1.0 – so im sure there will be a better version – that make the report better.

Insert it as a Detection script.

```powershell
outputArr = @()
##### CHECK TPM IS ENABLED

$TPMEnabled = wmic /namespace:\\root\cimv2\security\microsofttpm path win32_tpm get IsEnabled_InitialValue
if("TRUE" -in $TPMEnabled.Trim()){
    $outputArr += "  TPM Enabled  "
}else{
    $outputArr += "  TPM Disabled  "
}

##### CHECK TPM VERSION

$SpecVersionArray = (wmic /namespace:\\root\cimv2\security\microsofttpm path win32_tpm get SpecVersion)
$SpecVersionTxt = ""
foreach($SpecVersion in $SpecVersionArray){
    if($SpecVersion.Trim() -ne "SpecVersion" -and $SpecVersion.Trim() -ne ""){
        $SpecVersionTxt = $SpecVersion.Trim();
    }
}
if($SpecVersionTxt -ne "" -and $SpecVersionTxt.IndexOf('2.0') -gt -1){
    $outputArr += "  $($SpecVersionTxt)  "
}else{
    $outputArr += "  $($SpecVersionTxt) - Investigate if TPM can be upgraded to 2.0  "
}

##### CHECK CPU VENDOR

$captionArray = Wmic cpu get caption
$captionTxt = ""
foreach($caption in $captionArray){
    if($caption.Trim() -ne "Caption" -and $caption.Trim() -ne ""){
        $captionTxt = $caption.Trim()
    }
}
if($captionTxt -ne ""){
    $outputArr += "  $($captionTxt)  "
}else{
    $outputArr += "  Caption missing  "
}

##### CHECK VIRTUALIZATION IS ENABLED

$virtualization = systeminfo
$virtualizationTxt = $virtualization.Trim() | ? { $_ -like "*hypervisor has been detected*" }
if($virtualizationTxt -ne $null){
    $outputArr += "  Virtualization is ENABLED  "
}else{
    $outputArr += "  Enabled Virtualization in BIOS  "
}

##### CHECK Secure BOOT and UEFI is ENABLED

$uefi = (Confirm-SecureBootUEFI)
if($uefi){
    $outputArr += "  Secure Boot and UEFI is ENABLED  "
}else{
    $outputArr += "  Secure Boot and UEFI is DISABLED, CHECK BIOS  "
}

Write-Host ($outputArr -join " // ")
```

![Remediation detection output for BIOS Settings Compliance reporting TPM enabled but Secure Boot and UEFI disabled](/images/posts/bios-check-from-mem/ProactiveRemediation_BIOS-1024x251.png)
*Secure Boot is disabled 🙁*
