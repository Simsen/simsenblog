---
title: "Local macOS Compliance Checker"
description: "How do you verify macOS security settings on a Mac that isn't managed yet? A local tool that checks the security settings directly on the Mac."
date: 2025-03-17
categories: [Intune, macOS, Tools]
tags: ["Compliance"]
icon: macos
---

### Why Compliance Matters for macOS Admins

With macOS, Apple continues to enhance security and streamline device management. However, these changes introduce new challenges for IT teams, particularly in verifying security configurations and compliance policies.

Many IT admins rely on Intune or other MDMs to enforce compliance policies, but what happens when you need to manually verify settings on an unmanaged Mac? That’s where the macOS Compliance Checker comes in!

This lightweight shell script allows IT teams to quickly verify key security configurations—without diving deep into system logs or manually navigating System Settings.

---

### What Does the Compliance Checker Verify?

The script performs local security checks and provides a simple report on essential macOS security settings:

✅ System Integrity Protection (SIP) – Confirms if SIP is enabled for OS security.  
✅ FileVault – Ensures that disk encryption is active.  
✅ Firewall Status – Checks if the macOS firewall is enabled.  
✅ Stealth Mode – Verifies if macOS is dropping unsolicited network probes.  
✅ Gatekeeper – Confirms app security settings for safe software execution.  
✅ Platform SSO – Detects if macOS is integrated with a federated identity provider (e.g., Entra ID).

### Why This is Useful

-   **Instant Compliance Checks** – No need to rely on MDM dashboards; this runs locally.
-   **Quick Troubleshooting** – Identify misconfigurations in seconds.
-   **Works on Unmanaged Macs** – Perfect for BYOD or standalone macOS systems.

---

### How It Works

The script runs directly on a macOS device and provides an easy-to-read GUI-based report using AppleScript dialogs.

![](/images/posts/local-macos-compliance-checker/ComplianceChecker-1009x1024.png)

### The script – save it as: CheckCompliance.sh

```bash
#!/bin/bash

# **Get macOS Version and Name**
macos_full_version=$(system_profiler SPSoftwareDataType | awk -F": " '/System Version/{print $2}')
macos_name=$(echo "$macos_full_version" | awk '{print $2}')
macos_version=$(sw_vers -productVersion)

macos_result="🖥 macOS: $macos_name\n"

# **Check System Integrity Protection (SIP)**
sip_status=$(csrutil status | grep -o "enabled")
if [[ "$sip_status" == "enabled" ]]; then
    sip_result="✅ System Integrity Protection: Enabled\n"
else
    sip_result="❌ System Integrity Protection: Disabled\n"
fi

# **Check FileVault (Disk Encryption)**
filevault_status=$(fdesetup status | grep -o "On")
if [[ "$filevault_status" == "On" ]]; then
    filevault_result="✅ FileVault: Enabled\n"
else
    filevault_result="❌ FileVault: Disabled\n"
fi

# **Check Firewall Status**
firewall_status=$(/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate 2>/dev/null)
if [[ "$firewall_status" == *"enabled"* ]]; then
    firewall_result="✅ Firewall: Enabled\n"
else
    firewall_result="❌ Firewall: Disabled\n"
fi

# **Check Stealth Mode (Silent Drop Mode)**
stealth_status=$(system_profiler SPFirewallDataType | grep "Stealth Mode" | awk '{print $NF}')
if [[ "$stealth_status" == "Yes" ]]; then
    stealth_result="✅ Stealth Mode: Enabled\n"
else
    stealth_result="⚠️ Stealth Mode: Not Configured\n"
fi

# **Check Gatekeeper Policy**
gatekeeper_status=$(spctl --status | grep -o "assessments enabled")
if [[ "$gatekeeper_status" == "assessments enabled" ]]; then
    gatekeeper_result="✅ Gatekeeper: Enabled (App Store & Identified Developers)\n"
else
    gatekeeper_result="❌ Gatekeeper: Disabled\n"
fi

# **Check Platform SSO Configuration**
platform_sso_active="No"

# Check if Platform SSO is enabled (PlatformSSOUniqueIdentifier exists)
dscl_output=$(dscl . -read /Users/$USER 2>/dev/null)

if echo "$dscl_output" | grep -q "dsAttrTypeNative:PlatformSSOUniqueIdentifier"; then
    platform_sso_active="Yes"
fi

# **Determine SSO Result Output**
if [[ "$platform_sso_active" == "Yes" ]]; then
    sso_result="✅ Platform SSO: Configured\n"
else
    sso_result="⚠️ Platform SSO: Not Configured\n"
fi

# **Combine results and display GUI output**
compliance_report="$macos_result\n
$sip_result\n
$filevault_result\n
$firewall_result\n
$stealth_result\n
$gatekeeper_result\n
$sso_result"

osascript -e "display dialog \"$compliance_report\" buttons {\"OK\"} default button \"OK\" with title \"Compliance Checker by simsenblog.dk\""
```

**Disclaimer**: If the Mac is not managed (i.e., no MDM, no enterprise SSO), checking for Platform SSO may not be relevant. Most unmanaged Macs won’t have Platform SSO configured, so this check is mainly useful for corporate-managed Macs.

However, if your organization supports local device enrollment into Federated Authentication (e.g., Microsoft Entra ID, Okta, or other IdPs), this check can still be useful to verify integration.
