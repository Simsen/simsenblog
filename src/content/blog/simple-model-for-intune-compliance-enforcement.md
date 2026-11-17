---
title: "Simple Model for Intune Compliance Enforcement"
description: "A practical approach to introducing compliance enforcement with Microsoft Intune."
date: 2026-03-30
categories: [Intune]
tags: [Intune, Compliance]
icon: article
---

One of the most common challenges when implementing **Conditional Access with “Require compliant device”** is fear.

-   Fear that devices will suddenly become non-compliant.
-   Fear that users will lose access to Microsoft 365.
-   Fear that legacy machines will break overnight.

Because of this, many organizations delay enforcing compliance for years.  
But it doesn’t have to be that way.

A simple approach is to introduce compliance in **phases**, starting with visibility and moving towards enforcement.

---

## Step 1 – Build Simple Compliance Policies

Instead of one large compliance policy, split the controls into logical groups.

Example structure:

### 1\. Policy: OS Version

-   WIN\_Compliance\_OSVersionWIN10-22H2
-   WIN\_Compliance\_OSVersionWIN11-24H2
-   WIN\_Compliance\_OSVersionWIN11-25H2

Purpose: Ensure devices are running supported Windows versions.  
Configured setting: Minimum OS Version

### 2\. Policy: Platform Security Baseline

-   WIN\_Compliance\_Security

Checks:

-   BitLocker enabled
-   Secure Boot enabled
-   Code integrity enabled
-   Trusted Platform Module present

These settings verify that **core device security protections are enabled**.

### 3\. Policy: Critical Security Controls

-   WIN\_Compliance\_SecurityCritical

Checks:

-   Firewall enabled
-   Antivirus enabled
-   Antispyware enabled
-   Defender Antimalware active
-   Real-time protection enabled
-   Defender Antimalware security intelligence up-to-date

These represent security controls required for enterprise protection.

### 4\. Policy: Defender Risk Level

-   WIN\_Compliance\_DefenderSecureScore

Configured setting:

-   Require the device to be at or under machine risk score: Medium

### How it could look in Intune:

![](/images/posts/simple-model-for-intune-compliance-enforcement/Screenshot-2026-03-30-at-18.10.08.png)

---

## Step 2 – Use the Compliance Grace Period

Instead of enforcing immediately, configure a grace period.

Recommended options:

-   30 days  
    or
-   60 days

This allows users time to remediate issues before access is blocked.

To support this, configure automated email notifications to inform users about their non-compliant status during the grace period.

Example notification schedule:

-   Day 20: First reminder
-   Day 10: Second reminder
-   Day 5: Final warning
-   Day 0: Access blocked

Example behavior:

-   Day 0: Policy introduced
-   Day 1-30: Device marked non-compliant but access allowed
-   Day 30: Access blocked if not compliant

This approach:

-   Avoids service disruption
-   Allows IT to monitor impact
-   Gives users time to update or fix devices
-   Reduces Service Desk load by proactively informing users

---

## Step 3 – Monitor Before Enforcement

During the grace period:  
Monitor:

-   Intune compliance reports
-   Defender device risk
-   Conditional Access insights

This gives a clear view of:

-   How many devices will be blocked
-   Which settings cause non-compliance
-   Which legacy devices need remediation

---

## Step 4 – Create Remediation script to trigger security settings

If you have machines that is not compliant – because it is drifting from policy.  
Remediation script can be used to enforce policies as another option from the policy itself.  
Get my Remediation scripts on my Github page

[![](/images/posts/simple-model-for-intune-compliance-enforcement/github-logo.png)](https://github.com/Simsen/RemediationScript-CompliancePolicy)

---

## Why This Model Works

This staged model delivers several benefits:

-   Reduces risk of sudden lockouts
-   Improves security posture gradually
-   Provides visibility before enforcement
-   Aligns compliance with Conditional Access

Most importantly, it allows organizations to move forward with Zero Trust without disrupting users.
