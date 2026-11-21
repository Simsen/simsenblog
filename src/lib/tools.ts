/**
 * Community tools. One entry per tool; the Tools page and the homepage sidebar both read from here.
 * Order = display order. `sidebar: false` hides a tool from the homepage sidebar.
 * `hidden: true` leaves a tool off the site completely (e.g. not announced yet); delete the line to show it.
 */
export interface Tool {
  id: string;
  name: string;
  /** Shown after the name in muted text, e.g. ".app" */
  suffix?: string;
  icon: string;
  /** One line for the sidebar and the quick index. */
  short: string;
  tagline: string;
  chips: string[];
  intro: string;
  features: string[];
  /** Small print under the feature list, e.g. requirements or a preview warning. */
  note?: string;
  url?: string;
  openLabel?: string;
  writeup?: string;
  github: string;
  sidebar?: boolean;
  hidden?: boolean;
}

const ALL_TOOLS: Tool[] = [
  {
    id: 'intunescope',
    // Not announced yet: hidden from the Tools page and the sidebar. Remove this line to publish it.
    hidden: true,
    name: 'IntuneScope',
    suffix: '.app',
    icon: '◎',
    short: 'See every Intune assignment',
    tagline: 'See every Intune assignment, and what a group or filter really drives.',
    chips: ['Free', 'Open source', 'Browser-only', 'Intune'],
    intro:
      'Intune shows assignments one policy at a time, but the question is usually the reverse: what does this group actually get, and where is this filter used? IntuneScope loads every policy, app and script with its assignments and answers that in seconds, straight from your browser.',
    features: [
      'Browse every policy, app and script with its targets, assignment filters and filter mode, across all platforms',
      'Group lookup: pick an Entra group and see everything that includes or excludes it',
      'Filter lookup: see everything that uses an assignment filter, in include or exclude mode',
      'Export to Excel or CSV, one row per assignment',
      'Editor mode bulk-changes assignments with preview, JSON backup, compare-and-skip and verify',
      'Read-only Explorer and write-enabled Editor are separate app registrations, so a tenant can approve one without the other',
      'Talks directly to Microsoft Graph. No backend, no telemetry, and Intune RBAC still applies',
    ],
    url: 'https://intunescope.app/',
    openLabel: 'Open IntuneScope',
    github: 'https://github.com/Simsen/IntuneScope',
  },
  {
    id: 'autopilotqr',
    name: 'AutopilotQR',
    suffix: '.app',
    icon: '⌗',
    short: 'Autopilot device association',
    tagline: 'Scan. Associate. Deploy.',
    chips: ['Free', 'Open source', 'Browser-only', 'Windows', 'Autopilot'],
    intro:
      'Windows Autopilot device preparation can show a QR code during OOBE. AutopilotQR is the scanner: sign in on your phone, scan the code, pick a Device Preparation policy, and the device is pre-associated with your tenant. No CSV, no USB stick, no backend.',
    features: [
      'Scan the OOBE QR code with your phone camera or a webcam',
      'Choose the Device Preparation policy and confirm the destination tenant before anything is imported',
      'Pre-associates the device through Microsoft Graph and checks for the preassociated status',
      'Multitenant Entra sign-in with delegated permissions. Intune RBAC still applies',
      'Runs in your browser; nothing is sent to a developer-hosted backend',
    ],
    note: 'Early preview: relies on a Microsoft Graph beta API. Validate the workflow in a test tenant first.',
    url: 'https://autopilotqr.app/',
    openLabel: 'Open AutopilotQR',
    writeup: '/2026/10/18/introducing-autopilotqr-scan-associate-deploy/',
    github: 'https://github.com/Simsen/AutopilotQR',
  },
  {
    id: 'msiinfo',
    name: 'MSIinfo',
    suffix: '.com',
    icon: '{ }',
    short: 'Read MSI properties in the browser',
    tagline: 'MSI properties for Win32 detection rules, in a second.',
    chips: ['Free', 'Client-side', 'Windows', 'Intune'],
    intro:
      'Getting a ProductCode out of an MSI usually means installing something, running Orca, or trusting an upload site with a vendor installer. Drag the MSI onto MSIinfo instead and it reads the properties you actually need for a Win32 detection rule, in the browser, in a second.',
    features: [
      'Drag and drop an MSI, get its properties immediately',
      'ProductCode, ProductVersion, UpgradeCode and the rest of what detection rules and packaging need',
      'No Orca, no PowerShell, no admin rights. Works on a locked-down client',
      "The file is parsed locally and never uploaded, which matters when the installer is a customer's",
    ],
    url: 'https://www.msiinfo.com/',
    openLabel: 'Open MSIinfo',
    writeup: '/2026/07/20/web-tool-msiinfo-com/',
    github: 'https://github.com/Simsen/MSIinfo',
  },
  {
    id: 'macpppc',
    name: 'MacPPPC',
    suffix: '.com',
    icon: '⌘',
    short: 'macOS privacy profiles for Intune',
    tagline: 'macOS PPPC profiles without writing XML.',
    chips: ['Free', 'Client-side', 'macOS', 'Intune', 'macOS 27 ready'],
    intro:
      "Building a Privacy Preferences Policy Control profile by hand means writing XML you'd rather not write, and the usual shortcut is a tool that assumes you run Jamf. MacPPPC generates macOS PPPC profiles in the browser and pushes them straight into Intune, and on macOS 27 it also builds the new declarative App Privacy and Safari Privacy settings. No XML, no JSON, nothing to install.",
    features: [
      'Grant or deny any of the 24 PPPC services, from Full Disk Access and Screen Recording to Apple Events with receiver-app pairing',
      'macOS 27: builds the declarative (DDM) App Privacy and Safari website privacy settings that replace part of PPPC, and converts existing permissions when you switch target',
      'Deploys directly to Intune through Microsoft Graph with your own Entra ID sign-in: policy names, device or user channel, scope tags, and group assignments with filters',
      'Or download a .mobileconfig, Settings Catalog JSON, or a ZIP with one profile per app, and upload it yourself',
      'Unlisted app? Drop in its Info.plist, or a zipped .app bundle, and it reads the bundle identifier for you',
      "Enforces Apple's actual rules: Camera and Microphone can only be denied, so it won't build a profile macOS will ignore",
      "100% client-side. Nothing is proxied through a server, because there isn't one",
    ],
    note: 'Built and maintained together with Roy Klooster.',
    url: 'https://macpppc.com/',
    openLabel: 'Open MacPPPC',
    writeup: '/2026/02/22/pppc-builder-simplifying-macos-privacy-policies-for-intune/',
    github: 'https://github.com/Simsen/MacPPPC',
  },
  {
    id: 'winmedia-builder',
    name: 'WinMedia Builder',
    icon: '⏏',
    short: 'Bootable Windows media, FAT32-ready',
    tagline: 'Point it at an ISO, get media that actually boots.',
    chips: ['Free', 'Open source', 'Windows', 'PowerShell'],
    intro:
      "UEFI boots from FAT32, FAT32 stops at 4 GB, and a current Windows install.wim doesn't. The fix is DISM, oscdimg and a partitioning routine you have to look up every time. WinMedia Builder wraps all of it in one GUI.",
    features: [
      'Takes a Windows ISO, install.wim or install.esd as source',
      'Splits an oversized install.wim into .swm parts so it fits on FAT32',
      'Rebuilds a bootable ISO from the result',
      'Optionally prepares a USB drive with a FAT32 boot partition and an NTFS data partition',
      'Live progress log, background processing, and settings remembered between runs',
      'Your source media is never modified. USB preparation wipes the target drive, so pick it carefully',
    ],
    note: 'Requires Windows 10+, PowerShell 5.1 or 7, admin rights and the Windows ADK Deployment Tools.',
    github: 'https://github.com/Simsen/WinMedia-Builder',
    sidebar: false,
  },
];

/** The tools shown on the site. */
export const TOOLS = ALL_TOOLS.filter((t) => !t.hidden);
