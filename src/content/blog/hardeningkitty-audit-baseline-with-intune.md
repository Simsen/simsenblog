---
title: "HardeningKitty: Audit Baseline with Intune"
description: "Use HardeningKitty with Intune to audit your clients remotely, collect the reports automatically and confirm that every device meets your security baseline."
date: 2024-03-24
categories: [Intune, Windows]
tags: ["PowerShell"]
icon: terminal
wordpress:
  guid: "https://www.simsenblog.dk/?p=1839"
  published: 2024-03-24T08:44:31Z
  categories: [endpoint-manager, powershell]
---

## Introduction

In this blog, I will explore how to leverage HardeningKitty in conjunction with Intune, enabling us to remotely audit our clients and ensure they meet our security baseline. By integrating HardeningKitty with Intune, we can automate the process of security auditing, streamline the management of audit reports, and confirm that our organizational security standards are consistently met. This approach not only enhances our cybersecurity posture but also simplifies the monitoring and enforcement of security policies across the board. Join me as we delve into setting up HardeningKitty with Intune, aiming for a robust, efficient way to keep our digital environments secure and compliant.

**What is HardeningKitty**: HardeningKitty is a powerful tool for Windows security hardening, automating the application of best practice configurations and policies to enhance system security and compliance efficiently. [Link to Github](https://github.com/scipag/HardeningKitty)

## Functions in the script

In this section, we delve into the technical workings of the script, highlighting its key functionalities and how they contribute to the seamless integration of HardeningKitty with Microsoft Intune for enhanced security management:

**InstallHardeningKitty**: Automates the download and installation of the latest HardeningKitty version from GitHub, ensuring that the tool is always up-to-date with the latest security checks and features.

**Invoke-HardeningKittyAudit**: Executes HardeningKitty in audit mode, generating a comprehensive log that details the current security posture of the system. This function is crucial for identifying potential vulnerabilities and non-compliance with security best practices.

**CopyHardeningKittyLogs**: Transfers the generated audit logs to a specified directory within the `ProgramData\Microsoft\IntuneManagementExtension\Logs\`, making them readily accessible for review and inclusion in diagnostic data collections initiated from the Intune portal.

**FindAndDisplayHardeningKittyScore**: Extracts and displays the overall security score from the audit log, providing a quick snapshot of the system’s security status. This function is instrumental in the pre-remediation detection phase, offering immediate visibility into the effectiveness of existing security configurations.  
Ex.: “Your HardeningKitty score is: 3.27. HardeningKitty Statistics: Total checks: 391 – Passed: 86, Low: 62, Medium: 243, High: 0.”

## Setup script in Microsoft Intune

-   Copy script to your code editor – save it as Detection.ps1
-   Go to Intune > Devices > Scripts and remediations
-   Create New > Give it a name > Click Next
-   Insert your Detection.ps1
-   Set Run script in 64-bit PowerShell to Yes

Click Next > Set scope tags > Assign to Device group

```powershell
# Function to install HardeningKitty
Function InstallHardeningKitty {
    param (
        [string]$Version
    )

    # Get the download link for the latest version of HardeningKitty from GitHub API
    $HardeningKittyLatestVersionDownloadLink = ((Invoke-WebRequest "https://api.github.com/repos/scipag/HardeningKitty/releases/latest" -UseBasicParsing) | ConvertFrom-Json).zipball_url

    # Set the progress preference to silently continue
    $ProgressPreference = 'SilentlyContinue'

    # Download the latest version of HardeningKitty
    Invoke-WebRequest $HardeningKittyLatestVersionDownloadLink -OutFile "HardeningKitty$Version.zip"

    # Extract the downloaded zip file
    Expand-Archive -Path "HardeningKitty$Version.zip" -DestinationPath "HardeningKitty$Version" -Force

    # Get the name of the extracted folder
    $Folder = Get-ChildItem "HardeningKitty$Version" | Select-Object -ExpandProperty Name

    # Move the contents of the extracted folder to the main folder
    Move-Item "HardeningKitty$Version\$Folder\*" "HardeningKitty$Version" -Force

    # Remove the extracted folder
    Remove-Item "HardeningKitty$Version\$Folder" -Force

    # Create the directory for HardeningKitty module in Program Files
    New-Item -Path $Env:ProgramFiles\WindowsPowerShell\Modules\HardeningKitty\$Version -ItemType Directory -Force

    # Set the current location to the HardeningKitty version folder
    Set-Location "HardeningKitty$Version"

    # Copy the required files to the HardeningKitty module directory
    Copy-Item -Path "HardeningKitty.psd1", "HardeningKitty.psm1", "lists\" -Destination "$Env:ProgramFiles\WindowsPowerShell\Modules\HardeningKitty\$Version\" -Recurse

    # Import the HardeningKitty module
    Import-Module "$Env:ProgramFiles\WindowsPowerShell\Modules\HardeningKitty\$Version\HardeningKitty.psm1" -Force

    # Display installation success message
    Write-Host "HardeningKitty $Version has been installed."
}

# Function to invoke HardeningKitty audit
Function Invoke-HardeningKittyAudit {
    # Generate a timestamp string
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

    # Construct the filename with the timestamp
    $filename = "HardeningKitty-$timestamp.log"

    # Full path for the report file
    $reportPath = Join-Path -Path $env:ProgramData -ChildPath "Microsoft\IntuneManagementExtension\Logs\$filename"

    # Invoke HardeningKitty with the dynamically generated report filename and capture output
    $output = Invoke-HardeningKitty -Mode Audit -Log -Report -ReportFile $reportPath | Out-String
}

# Function to find and display HardeningKitty score
Function FindAndDisplayHardeningKittyScore {
    # Navigate to the HardeningKitty log directory
    $hardeningKittyLogPath = "C:\Program Files\WindowsPowerShell\Modules\HardeningKitty"
    Set-Location -Path $hardeningKittyLogPath

    # Identify the latest log file with a name pattern like 'hardeningkitty_log_'
    $latestLogFile = Get-ChildItem -Filter "hardeningkitty_log_*" | Sort-Object LastWriteTime -Descending | Select-Object -First 1

    if ($latestLogFile -ne $null) {
        # Read the latest log file and search for the score line
        $logContent = Get-Content -Path $latestLogFile.FullName
        $scoreLine = $logContent | Where-Object { $_ -match 'Your HardeningKitty score is.*' }

        if ($scoreLine) {
            Write-Host "$scoreLine"
        } else {
            Write-Host "No HardeningKitty log files were found."
        }
    }
}

# Function to copy HardeningKitty logs
Function CopyHardeningKittyLogs {
    $sourcePath = "C:\Program Files\WindowsPowerShell\Modules\HardeningKitty"
    $destinationPath = Join-Path -Path $env:ProgramData -ChildPath "Microsoft\IntuneManagementExtension\Logs"

    # Ensure the destination directory exists
    if (-not (Test-Path -Path $destinationPath)) {
        New-Item -Path $destinationPath -ItemType Directory | Out-Null
    }

    # Find and copy the latest hardeningkitty_log_ file
    Get-ChildItem -Path $sourcePath -Filter "hardeningkitty_log_*" | Sort-Object LastWriteTime -Descending | ForEach-Object {
        $destFilePath = Join-Path -Path $destinationPath -ChildPath $_.Name
        if (-not (Test-Path -Path $destFilePath)) {
            Copy-Item -Path $_.FullName -Destination $destinationPath -Force
            Write-Host "Copied $($_.Name) to $destinationPath"
        } else {
            Write-Host "$($_.Name) already exists in $destinationPath"
        }
    }
}

# Main execution block
$installedVersion = Get-InstalledHardeningKittyVersion
$latestVersion = Get-LatestHardeningKittyVersion

InstallHardeningKitty
Invoke-HardeningKittyAudit
CopyHardeningKittyLogs
FindAndDisplayHardeningKittyScore
```

## Collect status

After script has run on the client – you have 2 options to get status

## Option 1

-   See “Pre-remediation detection output” on the Remediation script.
-   You need to activate the Colum under the Remediation Script > Columns > Select: Pre-remediation detection output
-   It will here show: Your HardeningKitty score is……

## Option 2

-   Go to the Windows client in Intune
-   Click **Collect diagnostics** (will take a around 15 min)
-   Click **Device diagnostics** under the specific device
-   Now **Download** Diagnostics and Unzip it
-   Click on folder: **(64) FoldersFiles ProgramData\_Microsoft\_IntuneManagementExtension\_Logs**
-   Here it will show the HardeningKitty log file.
