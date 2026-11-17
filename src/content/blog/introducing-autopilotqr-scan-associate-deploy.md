---
title: "Introducing AutopilotQR"
subtitle: "Scan. Associate. Deploy."
description: "A free, open-source QR scanner for Windows Autopilot Device Association. Built to make preparing your next device a little simpler."
lead: "An easier way to associate Windows devices with your tenant. Built for the community, one QR code at a time."
date: 2026-10-18
categories: [Intune, Windows, Tools]
tags: [Windows, Intune]
icon: qr
featured: true
project:
  name: AutopilotQR
  suffix: .app
  tagline: Scan. Associate. Deploy.
  icon: qr
  links:
    - label: Open AutopilotQR
      url: https://autopilotqr.app/
      primary: true
    - label: View on GitHub
      url: https://github.com/Simsen/AutopilotQR
original: https://www.simsenblog.dk/2026/10/18/introducing-autopilotqr-scan-associate-deploy/
---

Windows Autopilot Device Preparation can display a QR code during setup. AutopilotQR turns that code into a simpler device association workflow.

## Where the idea came from

A customer project sparked the idea: make device association accessible through a browser, without maintaining a separate Power Apps solution.

> Microsoft gave us the QR code. So why not build the scanner?

## What is device association?

Device association establishes a relationship between a Windows device and your Microsoft Entra tenant before enrollment. AutopilotQR provides a browser-based way to complete that association.

## Getting started

1. In Windows OOBE, press the Windows key five times.
2. Select the QR-code option.
3. Open [AutopilotQR.app](https://autopilotqr.app/) on your phone and sign in.
4. Scan the code and choose your Device Preparation policy.
5. Associate the device with your tenant.

<div class="note"><strong>In your browser</strong>AutopilotQR communicates directly with Microsoft Graph using delegated permissions, without backend customer-data storage.</div>
