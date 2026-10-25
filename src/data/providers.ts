import {
  AllowanceType,
  CloudProvider,
  IntegrationStatus,
  VerificationStatus,
} from '../types/cloud';

/**
 * Centralized, source-attributed dataset of cloud storage providers for 100GB.
 * Every allowance distinguishes unconditional base storage from onboarding tasks,
 * shared ecosystem pools, and referral bonuses.
 */
export const CLOUD_PROVIDERS: CloudProvider[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    shortTagline: 'Generous ecosystem storage integrated with Docs, Sheets, and Gmail.',
    description:
      'Google Drive provides cloud file storage, real-time document collaboration, and cross-device synchronization as part of a personal Google Account (Google One Free tier).',
    officialWebsite: 'https://www.google.com/drive/',
    officialPricingUrl: 'https://one.google.com/about/plans',
    webLaunchUrl: 'https://drive.google.com/',
    brandAccentHex: '#1A73E8',
    allowance: {
      baseFreeGB: 15,
      onboardingFreeGB: 15,
      referralMaxGB: null,
      allowanceType: AllowanceType.SharedEcosystem,
      headlineAllowance: '15 GB shared free',
      sharedAcrossEcosystem: true,
      conditionSummary:
        'Shared across Google Drive, Gmail, and Google Photos. Some newly created accounts allocate 5 GB initially until phone verification unlocks the full 15 GB.',
      uploadAndTransferLimits:
        'Up to 5 TB maximum single-file size (subject to available account quota). Native Google Docs, Sheets, and Slides created online have specific storage accounting rules.',
    },
    planLimitations: [
      '15 GB pool is shared with Gmail messages/attachments and Google Photos backups.',
      'Not end-to-end zero-knowledge encrypted on personal free accounts; Google manages encryption keys.',
      'No official first-party graphical desktop sync client for Linux.',
      'Accounts inactive for 24+ months across Google services are subject to Google’s Inactive Account Policy.',
    ],
    verifiedFeatures: [
      'Real-time browser editing via Google Docs, Sheets, and Slides',
      'Granular link and email-based folder sharing permissions',
      'Desktop folder mirroring and streaming via Drive for Desktop (Windows/macOS)',
      'Optical character recognition (OCR) search across PDFs and images',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'Full browser workspace' },
      { platform: 'Windows', supportLevel: 'native', note: 'Google Drive for Desktop' },
      { platform: 'macOS', supportLevel: 'native', note: 'Google Drive for Desktop' },
      { platform: 'Linux', supportLevel: 'none', note: 'No official Google Linux GUI client' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS & iPadOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Pre-installed / official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: false,
      encryptionModel: 'TLS in transit and AES-256 server-side encryption at rest (Google-managed keys).',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'United States',
      verifiedHighlights: [
        'Supports Passkeys, hardware security keys (FIDO2), and Google Authenticator 2-Step Verification',
        'Automated malware and phishing scanning on shared downloads',
      ],
    },
    bestSuitedFor: [
      'Students collaborating on group assignments and presentations',
      'Everyday cross-device document access across mobile and desktop',
    ],
    sources: [
      {
        label: 'Google One Official Storage Plans',
        url: 'https://one.google.com/about/plans',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Google Drive Official Product Overview',
        url: 'https://www.google.com/drive/',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.AdapterPlanned,
    integrationSummary:
      'Not connected in local V1/V2 mode. Future read-only quota & metadata sync planned via Google Drive API v3 (OAuth 2.0 PKCE).',
    featured: true,
  },
  {
    id: 'mega',
    name: 'MEGA',
    shortTagline: 'High base free capacity with user-controlled end-to-end encryption.',
    description:
      'MEGA is a privacy-focused cloud storage and communication service offering 20 GB of base free storage with client-side zero-knowledge encryption enabled by default.',
    officialWebsite: 'https://mega.io/',
    officialPricingUrl: 'https://mega.io/pricing',
    webLaunchUrl: 'https://mega.nz/',
    brandAccentHex: '#D9272E',
    allowance: {
      baseFreeGB: 20,
      onboardingFreeGB: 20,
      referralMaxGB: null,
      allowanceType: AllowanceType.Standard,
      headlineAllowance: '20 GB base free',
      sharedAcrossEcosystem: false,
      conditionSummary:
        '20 GB permanent base storage. Optional achievement bonuses (installing MEGAsync or mobile apps) are temporary promotional allocations that expire after 180–365 days and are excluded from 100GB base totals.',
      uploadAndTransferLimits:
        'Free accounts are subject to dynamic rolling transfer/download bandwidth quotas depending on network utilization.',
    },
    planLimitations: [
      'Dynamic transfer quota pauses large downloads temporarily once rolling free bandwidth allowance is reached.',
      'Promotional achievement bonuses expire if not converted to a paid plan.',
      'If you lose your password AND fail to export your Recovery Key, MEGA cannot decrypt or recover your files due to zero-knowledge encryption.',
      'Free accounts inactive for extended periods (3+ months without login) face inactivity warnings and potential data purge.',
    ],
    verifiedFeatures: [
      'Client-side end-to-end encryption on the free tier',
      'Full native desktop sync client (MEGAsync) including official Linux packages',
      'Selective folder sync and scheduled local folder backups',
      'End-to-end encrypted shared folder and file links with decryption keys in URL fragment',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'In-browser cryptographic client' },
      { platform: 'Windows', supportLevel: 'native', note: 'MEGAsync desktop app' },
      { platform: 'macOS', supportLevel: 'native', note: 'MEGAsync desktop app' },
      {
        platform: 'Linux',
        supportLevel: 'native',
        note: 'Official Ubuntu, Debian, Fedora, Arch packages + Nautilus/Dolphin plugins',
      },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: true,
      encryptionModel: 'Client-side AES-128/256 & RSA zero-knowledge encryption; keys derived from user password.',
      twoFactorAuth: true,
      openSourceClients: true,
      jurisdiction: 'New Zealand',
      verifiedHighlights: [
        'Zero-knowledge encryption included at no cost on free accounts',
        'Client-side SDK and desktop/mobile app source code published on GitHub for inspection',
        'Mandatory Recovery Key export workflow for account safety',
      ],
    },
    bestSuitedFor: [
      'Users needing large free archival storage for encrypted project backups',
      'Linux desktop users requiring a native graphical sync client',
    ],
    sources: [
      {
        label: 'MEGA Official Plans & Pricing',
        url: 'https://mega.io/pricing',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'MEGA Linux Desktop Sync Client',
        url: 'https://mega.io/desktop',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.WebLaunchOnly,
    integrationSummary:
      'Web launch only. Because MEGA encrypts filenames and file trees client-side with user keys, third-party web apps should not handle master credentials.',
    featured: true,
  },
  {
    id: 'microsoft-onedrive',
    name: 'Microsoft OneDrive',
    shortTagline: 'Seamless Windows file explorer integration and Office web apps.',
    description:
      'Microsoft OneDrive is built directly into Windows 10 and Windows 11, providing cloud storage, Files On-Demand syncing, and browser-based Word, Excel, and PowerPoint access.',
    officialWebsite: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage',
    officialPricingUrl: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/compare-onedrive-plans',
    webLaunchUrl: 'https://onedrive.live.com/',
    brandAccentHex: '#0078D4',
    allowance: {
      baseFreeGB: 5,
      onboardingFreeGB: 5,
      referralMaxGB: 15,
      allowanceType: AllowanceType.SharedEcosystem,
      headlineAllowance: '5 GB cloud storage',
      sharedAcrossEcosystem: true,
      conditionSummary:
        '5 GB Microsoft cloud storage pool. Outlook.com email attachments count against this 5 GB OneDrive cloud storage quota (separate from the 15 GB text mailbox quota). Referral bonus up to +10 GB (500 MB per friend) may apply.',
      uploadAndTransferLimits:
        'Up to 250 GB maximum single-file size technically supported, constrained by remaining free quota.',
    },
    planLimitations: [
      '5 GB free capacity fills quickly if Windows Desktop/Pictures folder backup or Outlook attachments are active.',
      'Personal Vault (2FA-protected area) is capped at a maximum of 3 files on the free plan.',
      'Expiring links and password-protected sharing links require a paid Microsoft 365 subscription.',
      'No official Microsoft graphical sync client for Linux.',
    ],
    verifiedFeatures: [
      'Native Windows 10/11 File Explorer Files On-Demand integration',
      'Free browser-based editing in Word, Excel, PowerPoint, and OneNote for the Web',
      'Personal Vault two-step verification folder (up to 3 files on free tier)',
      'Mobile document scanning and automatic camera roll backup',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'OneDrive Web + Office Online' },
      { platform: 'Windows', supportLevel: 'native', note: 'Built into Windows 10 & 11' },
      { platform: 'macOS', supportLevel: 'native', note: 'Official macOS Finder sync app' },
      { platform: 'Linux', supportLevel: 'none', note: 'No official Microsoft Linux client' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: false,
      encryptionModel: 'TLS in transit and server-side BitLocker / per-file AES-256 encryption at rest.',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'United States',
      verifiedHighlights: [
        'Microsoft Authenticator passwordless sign-in and FIDO2 passkey support',
        'Personal Vault adds identity re-verification for up to 3 sensitive files on free accounts',
      ],
    },
    bestSuitedFor: [
      'Windows laptop users syncing Office coursework and spreadsheets',
      'Users working regularly with `.docx`, `.xlsx`, and `.pptx` formatting',
    ],
    sources: [
      {
        label: 'Compare Microsoft OneDrive Cloud Storage Plans',
        url: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/compare-onedrive-plans',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Microsoft Storage Quotas & Attachment Rules',
        url: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.AdapterPlanned,
    integrationSummary:
      'Not connected in local V1/V2 mode. Planned future adapter targets Microsoft Graph API (`Files.Read`) via OAuth 2.0.',
    featured: true,
  },
  {
    id: 'proton-drive',
    name: 'Proton Drive',
    shortTagline: 'Swiss open-source zero-knowledge cloud storage and encrypted docs.',
    description:
      'Developed by the team behind Proton Mail, Proton Drive provides end-to-end encrypted file storage, photo backup, and collaborative Proton Docs under Swiss privacy laws.',
    officialWebsite: 'https://proton.me/drive',
    officialPricingUrl: 'https://proton.me/drive/pricing',
    webLaunchUrl: 'https://drive.proton.me/',
    brandAccentHex: '#6D4AFF',
    allowance: {
      baseFreeGB: 2,
      onboardingFreeGB: 5,
      referralMaxGB: null,
      allowanceType: AllowanceType.ConditionalOnboarding,
      headlineAllowance: '2 GB base · up to 5 GB free',
      sharedAcrossEcosystem: true,
      conditionSummary:
        'New Proton Free accounts start at 2 GB and unlock up to 5 GB permanent free storage by completing a quick 30-day starter checklist (e.g., uploading a file, setting a recovery method). Quota is shared across Proton Drive and Proton Mail.',
      uploadAndTransferLimits:
        'No artificial file upload size cap via web/desktop apps within available quota; password-protected and expiring share links are included even on the free tier.',
    },
    planLimitations: [
      'Starts at 2 GB until free onboarding actions are completed to reach 5 GB.',
      'Storage pool is shared if you also use the same account for Proton Mail.',
      'Linux support is currently focused on the official CLI rather than a full graphical sync folder client.',
    ],
    verifiedFeatures: [
      'Default client-side end-to-end encryption for file contents, filenames, and folder names',
      'End-to-end encrypted collaborative Proton Docs in the browser',
      'Password-protected and expiration-dated file sharing links on the free tier',
      'File version history retained for recent edits',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'Encrypted web vault + Proton Docs' },
      { platform: 'Windows', supportLevel: 'native', note: 'Proton Drive for Windows' },
      { platform: 'macOS', supportLevel: 'native', note: 'Proton Drive for macOS' },
      {
        platform: 'Linux',
        supportLevel: 'cli_or_webdav',
        note: 'Official CLI tool available; full native Linux GUI sync client not yet released',
      },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app with photo backup' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app with photo backup' },
    ],
    security: {
      zeroKnowledgeOnFree: true,
      encryptionModel: 'OpenPGP & AES-GCM end-to-end encryption; filenames, sizes, and hashes encrypted client-side.',
      twoFactorAuth: true,
      openSourceClients: true,
      jurisdiction: 'Switzerland',
      verifiedHighlights: [
        'Independently audited open-source cryptographic libraries and client apps',
        'Protected by Swiss Federal Data Protection Act (FADP)',
        'Hardware security key (U2F/FIDO2) and TOTP 2FA supported on free accounts',
      ],
    },
    bestSuitedFor: [
      'Storing sensitive personal records, IDs, tax documents, and private notes',
      'Users wanting encrypted online document editing without tracking',
    ],
    sources: [
      {
        label: 'Proton Drive Official Pricing & Free Tier',
        url: 'https://proton.me/drive/pricing',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Proton Drive Security Architecture',
        url: 'https://proton.me/drive/security',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Conditional,
    integrationStatus: IntegrationStatus.WebLaunchOnly,
    integrationSummary:
      'Web launch only. Proton Drive does not expose an unencrypted third-party REST API in order to preserve end-to-end cryptographic guarantees.',
    featured: true,
  },
  {
    id: 'box',
    name: 'Box',
    shortTagline: '10 GB structured document workspace with strict per-file upload limits.',
    description:
      'Box is an enterprise-grade content management platform that offers a 10 GB Individual free plan suited for PDFs, spreadsheets, and structured document workflows.',
    officialWebsite: 'https://www.box.com/',
    officialPricingUrl: 'https://www.box.com/pricing/individual',
    webLaunchUrl: 'https://app.box.com/',
    brandAccentHex: '#0061D5',
    allowance: {
      baseFreeGB: 10,
      onboardingFreeGB: 10,
      referralMaxGB: null,
      allowanceType: AllowanceType.Standard,
      headlineAllowance: '10 GB base free',
      sharedAcrossEcosystem: false,
      conditionSummary:
        '10 GB dedicated free storage on the Box Individual plan with no onboarding tasks required, but constrained by a strict 250 MB single-file upload limit.',
      uploadAndTransferLimits:
        'Strict 250 MB maximum upload size per individual file on the free Individual plan.',
    },
    planLimitations: [
      '250 MB single-file upload cap prevents storing large raw videos, ISO images, or multi-gigabyte archives.',
      'Version history is limited on the free Individual plan (paid plans unlock multi-version retention).',
      'No official native Linux desktop sync client.',
    ],
    verifiedFeatures: [
      '10 GB immediate storage dedicated exclusively to Box files',
      'Box Notes collaborative workspace and in-browser preview for 120+ file types',
      'Integrations with Microsoft Office and Google Workspace editors',
      'Box Drive desktop mount for Windows and macOS',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'Box Web App & Box Notes' },
      { platform: 'Windows', supportLevel: 'native', note: 'Box Drive desktop client' },
      { platform: 'macOS', supportLevel: 'native', note: 'Box Drive desktop client' },
      { platform: 'Linux', supportLevel: 'none', note: 'Web browser or CLI only; no native GUI sync app' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: false,
      encryptionModel: 'TLS 1.2+ in transit and 256-bit AES server-side encryption at rest.',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'United States',
      verifiedHighlights: [
        'Enterprise compliance heritage (SOC 1/2/3, ISO 27001 infrastructure)',
        'Multi-factor authentication available on Individual accounts',
      ],
    },
    bestSuitedFor: [
      'Archiving thousands of lightweight PDFs, lecture slides, source code zips (<250 MB), and e-books',
      'Separating academic or professional paperwork from personal photo libraries',
    ],
    sources: [
      {
        label: 'Box Individual & Personal Plan Pricing',
        url: 'https://www.box.com/pricing/individual',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Box Official Homepage',
        url: 'https://www.box.com/',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.AdapterPlanned,
    integrationSummary:
      'Not connected in local V1/V2 mode. Future integration adapter designed for Box Platform OAuth 2.0 REST API.',
    featured: false,
  },
  {
    id: 'pcloud',
    name: 'pCloud',
    shortTagline: 'Virtual drive desktop mounting with up to 10 GB unlockable free space.',
    description:
      'Swiss-headquartered pCloud acts as a virtual mounted drive on desktop systems (including Linux) so cloud files do not consume local SSD space unless cached.',
    officialWebsite: 'https://www.pcloud.com/',
    officialPricingUrl: 'https://www.pcloud.com/cloud-storage-pricing.html',
    webLaunchUrl: 'https://my.pcloud.com/',
    brandAccentHex: '#00A8B5',
    allowance: {
      baseFreeGB: 2,
      onboardingFreeGB: 7,
      referralMaxGB: 10,
      allowanceType: AllowanceType.ConditionalOnboarding,
      headlineAllowance: '2 GB base · up to 10 GB conditional',
      sharedAcrossEcosystem: false,
      conditionSummary:
        'Starts at 2 GB upon signup. Completing first-party steps (+1 GB verify email, +1 GB upload file, +1 GB desktop app, +1 GB mobile app, +1 GB mobile auto-upload) reaches 7 GB, plus up to +3 GB via friend referrals (10 GB ceiling).',
      uploadAndTransferLimits:
        'No single-file upload size limit; free tier includes a 50 GB/month shared download link traffic cap.',
    },
    planLimitations: [
      'Only 2 GB is available immediately before completing app installation and auto-upload onboarding steps.',
      'Client-side zero-knowledge encryption (pCloud Crypto) is NOT included in the free plan; it requires a separate paid pass.',
      'Trash retention and file version history are capped at 15 days on free accounts.',
      'Accounts inactive for 12+ months on the free tier may be deleted per pCloud Terms of Service.',
    ],
    verifiedFeatures: [
      'pCloud Drive mounts cloud storage as a virtual local disk without duplicating disk usage',
      'Official Linux AppImage desktop client alongside Windows and macOS',
      'Built-in audio and video streaming player in web and mobile apps',
      'Choice of US (Texas) or EU (Luxembourg) data storage region upon registration',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'my.pcloud.com web manager' },
      { platform: 'Windows', supportLevel: 'native', note: 'pCloud Drive virtual disk' },
      { platform: 'macOS', supportLevel: 'native', note: 'pCloud Drive virtual disk' },
      { platform: 'Linux', supportLevel: 'native', note: 'Official AppImage virtual drive client' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: false,
      encryptionModel:
        'TLS/SSL channel encryption and 256-bit AES server-side encryption (zero-knowledge pCloud Crypto is a paid add-on).',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'Switzerland',
      verifiedHighlights: [
        'Selectable EU (Luxembourg) or US data residency at account creation',
        'Multi-copy redundant storage across at least three server locations',
      ],
    },
    bestSuitedFor: [
      'Laptop users with small SSDs who prefer a mounted virtual network drive',
      'Linux and media users streaming audio/video files directly from the cloud',
    ],
    sources: [
      {
        label: 'pCloud Official Pricing & Plans',
        url: 'https://www.pcloud.com/cloud-storage-pricing.html',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'pCloud Drive Desktop & Linux Download',
        url: 'https://www.pcloud.com/download-free-online-cloud-file-storage.html',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Conditional,
    integrationStatus: IntegrationStatus.AdapterPlanned,
    integrationSummary:
      'Not connected in local V1/V2 mode. pCloud provides a documented OAuth 2.0 JSON API suitable for future backend integration.',
    featured: false,
  },
  {
    id: 'sync-com',
    name: 'Sync.com',
    shortTagline: '5 GB zero-knowledge encrypted storage under Canadian privacy laws.',
    description:
      'Sync.com offers 5 GB of immediate end-to-end encrypted storage (Sync Starter) designed for private file synchronization and confidential link sharing.',
    officialWebsite: 'https://www.sync.com/',
    officialPricingUrl: 'https://www.sync.com/pricing/',
    webLaunchUrl: 'https://cp.sync.com/',
    brandAccentHex: '#1D4ED8',
    allowance: {
      baseFreeGB: 5,
      onboardingFreeGB: 5,
      referralMaxGB: 20,
      allowanceType: AllowanceType.Standard,
      headlineAllowance: '5 GB base free',
      sharedAcrossEcosystem: false,
      conditionSummary:
        '5 GB immediate free storage on Sync Free (Starter) with zero-knowledge encryption enabled by default. Additional bonus space can be earned through friend referrals.',
      uploadAndTransferLimits:
        'Free Starter plan limits connected devices to 5, active shared links to 3, and places daily/monthly transfer caps on shared links.',
    },
    planLimitations: [
      'Maximum of 5 synced personal devices on the Free Starter plan.',
      'Maximum of 3 active shared links simultaneously on the Free Starter tier.',
      'No native graphical Linux desktop client.',
      'Sync CloudFiles (on-demand file streaming without local storage) is reserved for paid plans on some OS configurations.',
    ],
    verifiedFeatures: [
      '5 GB immediate zero-knowledge end-to-end encrypted storage',
      '30-day deleted file recovery and file version history on the free tier',
      'Sync Vault cloud-only archival folder accessible via browser and mobile',
      'Two-factor authentication via TOTP authenticator apps or email',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'In-browser decrypted control panel' },
      { platform: 'Windows', supportLevel: 'native', note: 'Sync desktop application' },
      { platform: 'macOS', supportLevel: 'native', note: 'Sync desktop application' },
      { platform: 'Linux', supportLevel: 'none', note: 'No official native Linux desktop client' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: true,
      encryptionModel: 'End-to-end 256-bit AES GCM & RSA-2048 client-side zero-knowledge encryption.',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'Canada',
      verifiedHighlights: [
        'Zero-knowledge privacy enabled automatically on the free Starter plan',
        'Compliant with Canadian PIPEDA privacy regulations',
      ],
    },
    bestSuitedFor: [
      'Windows and macOS users seeking 5 GB of immediate E2EE storage without onboarding hoops',
      'Archiving confidential project records in Sync Vault',
    ],
    sources: [
      {
        label: 'Sync.com Official Plans & Starter Limits',
        url: 'https://www.sync.com/pricing/',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Sync.com Privacy & Encryption Whitepaper Overview',
        url: 'https://www.sync.com/your-privacy/',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.WebLaunchOnly,
    integrationSummary:
      'Web launch only. Sync.com does not offer a public third-party REST API for consumer zero-knowledge accounts.',
    featured: false,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    shortTagline: 'Fast block-level file delta sync with a compact 2 GB Basic tier.',
    description:
      'Dropbox pioneered consumer folder synchronization and block-level delta uploads, though its free Dropbox Basic tier offers a modest 2 GB capacity and a 3-device limit.',
    officialWebsite: 'https://www.dropbox.com/',
    officialPricingUrl: 'https://www.dropbox.com/plans',
    webLaunchUrl: 'https://www.dropbox.com/home',
    brandAccentHex: '#0061FF',
    allowance: {
      baseFreeGB: 2,
      onboardingFreeGB: 2,
      referralMaxGB: 18,
      allowanceType: AllowanceType.Standard,
      headlineAllowance: '2 GB base free',
      sharedAcrossEcosystem: false,
      conditionSummary:
        '2 GB permanent storage on Dropbox Basic. Users can earn +500 MB per verified friend referral up to an additional 16 GB (18 GB maximum).',
      uploadAndTransferLimits:
        'Strict maximum of 3 linked devices on Dropbox Basic; 20 GB/day bandwidth limit and 100,000 downloads/day limit on shared links.',
    },
    planLimitations: [
      'Smallest mainstream free tier (2 GB) and strict 3-connected-device cap across phones and computers.',
      'Not zero-knowledge encrypted on Dropbox Basic; server-side keys are managed by Dropbox.',
      'Smart Sync / online-only placeholder management features are more limited than on paid Plus/Professional plans.',
    ],
    verifiedFeatures: [
      'Fast block-level delta sync (uploads only modified file chunks rather than whole files)',
      '30-day file version history and deleted file recovery on Basic',
      'Official Linux daemon and CLI alongside Windows, macOS, iOS, and Android',
      'Broad third-party app ecosystem and Paper collaborative documents',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'Dropbox Web & Paper' },
      { platform: 'Windows', supportLevel: 'native', note: 'Dropbox Desktop app' },
      { platform: 'macOS', supportLevel: 'native', note: 'Dropbox Desktop app' },
      { platform: 'Linux', supportLevel: 'native', note: 'Official Ubuntu/Fedora packages & headless daemon' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: false,
      encryptionModel: 'TLS in transit and 256-bit AES server-side encryption at rest.',
      twoFactorAuth: true,
      openSourceClients: false,
      jurisdiction: 'United States',
      verifiedHighlights: [
        'Supports hardware security keys (FIDO U2F) and authenticator app 2FA',
        'Granular active device session review in account settings (capped at 3 devices on Basic)',
      ],
    },
    bestSuitedFor: [
      'Syncing small active working folders (code snippets, Markdown notes, configuration files) rapidly across up to 3 devices',
      'Workflows requiring third-party app integrations',
    ],
    sources: [
      {
        label: 'Dropbox Basic (Free) Plan Specifications',
        url: 'https://www.dropbox.com/basic',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Dropbox Official Plan Comparison',
        url: 'https://www.dropbox.com/plans',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.AdapterPlanned,
    integrationSummary:
      'Not connected in local V1/V2 mode. Planned future adapter supports Dropbox API v2 OAuth 2.0 PKCE.',
    featured: false,
  },
  {
    id: 'internxt',
    name: 'Internxt',
    shortTagline: 'Open-source European zero-knowledge storage with a 1 GB free starter vault.',
    description:
      'Based in Spain (EU), Internxt Drive offers open-source, client-side encrypted storage with post-quantum cryptography architecture and native Linux support, paired with a compact 1 GB free plan.',
    officialWebsite: 'https://internxt.com/',
    officialPricingUrl: 'https://internxt.com/pricing',
    webLaunchUrl: 'https://drive.internxt.com/',
    brandAccentHex: '#0F172A',
    allowance: {
      baseFreeGB: 1,
      onboardingFreeGB: 1,
      referralMaxGB: null,
      allowanceType: AllowanceType.Standard,
      headlineAllowance: '1 GB base free',
      sharedAcrossEcosystem: false,
      conditionSummary:
        '1 GB permanent free encrypted storage. Previously advertised higher onboarding promotions have been consolidated to a 1 GB standard free tier.',
      uploadAndTransferLimits:
        'Browser uploads on free accounts have smaller per-file size ceilings than desktop apps; advanced sharing controls (link passwords, custom expiry counts) require paid plans.',
    },
    planLimitations: [
      '1 GB capacity is suitable primarily for critical documents, keys, and small archives rather than photos or videos.',
      'Password-protected sharing links, scheduled device backups, and antivirus scanning require paid subscriptions.',
      'Extended account inactivity can trigger dormant account cleanup policies.',
    ],
    verifiedFeatures: [
      'Zero-knowledge client-side file fragmentation and encryption on the free tier',
      'Official graphical Linux desktop client (.deb, .rpm, AppImage) plus CLI/WebDAV',
      'Open-source client repositories published on GitHub',
      'GDPR-aligned European Union jurisdiction',
    ],
    platforms: [
      { platform: 'Web', supportLevel: 'native', note: 'drive.internxt.com encrypted client' },
      { platform: 'Windows', supportLevel: 'native', note: 'Internxt Drive for Windows' },
      { platform: 'macOS', supportLevel: 'native', note: 'Internxt Drive for macOS' },
      { platform: 'Linux', supportLevel: 'native', note: 'Official DEB, RPM, AppImage + WebDAV CLI' },
      { platform: 'iOS', supportLevel: 'native', note: 'Official iOS app' },
      { platform: 'Android', supportLevel: 'native', note: 'Official Android app' },
    ],
    security: {
      zeroKnowledgeOnFree: true,
      encryptionModel: 'Client-side AES-256 encryption with fragmented shard storage and post-quantum Kyber-512 key encapsulation.',
      twoFactorAuth: true,
      openSourceClients: true,
      jurisdiction: 'Spain (European Union)',
      verifiedHighlights: [
        'Independent security audit performed by Securitum',
        'Open-source client code verifiable on GitHub',
      ],
    },
    bestSuitedFor: [
      'Storing compact high-sensitivity files (SSH/PGP backup archives, certificates, Vital PDFs) under EU jurisdiction',
      'Linux users testing open-source encrypted storage workflows',
    ],
    sources: [
      {
        label: 'Internxt Drive Official Pricing & Free Plan',
        url: 'https://internxt.com/pricing',
        verifiedDate: '2026-10-24',
      },
      {
        label: 'Internxt Drive Product & Security Overview',
        url: 'https://internxt.com/drive',
        verifiedDate: '2026-10-24',
      },
    ],
    lastVerifiedDate: '2026-10-24',
    verificationStatus: VerificationStatus.Verified,
    integrationStatus: IntegrationStatus.WebLaunchOnly,
    integrationSummary:
      'Web launch only. Internxt encrypts file shards client-side; local WebDAV/CLI bridge requires local user installation.',
    featured: false,
  },
];
