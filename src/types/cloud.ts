export enum VerificationStatus {
  Verified = 'verified',
  Conditional = 'conditional',
  Unverified = 'unverified',
}

export enum IntegrationStatus {
  WebLaunchOnly = 'web_launch_only',
  AdapterPlanned = 'adapter_planned',
  NotConnected = 'not_connected',
}

export enum AllowanceType {
  Standard = 'standard',
  ConditionalOnboarding = 'conditional_onboarding',
  SharedEcosystem = 'shared_ecosystem',
}

export type PlatformName = 'Web' | 'Windows' | 'macOS' | 'Linux' | 'iOS' | 'Android';

export type PlatformSupportLevel = 'native' | 'cli_or_webdav' | 'none';

export interface PlatformSupportEntry {
  platform: PlatformName;
  supportLevel: PlatformSupportLevel;
  note?: string;
}

export interface ProviderSourceAttribution {
  label: string;
  url: string;
  verifiedDate: string;
}

export interface FreeAllowanceDetails {
  /** Unconditional free storage available immediately upon standard registration (in GB) */
  baseFreeGB: number;
  /** Free storage available after completing official first-party verification or onboarding steps (in GB) */
  onboardingFreeGB: number;
  /** Optional ceiling achievable through friend referral bonuses (in GB), if officially offered */
  referralMaxGB: number | null;
  /** Classification of how the free tier is structured */
  allowanceType: AllowanceType;
  /** Concise human-readable allowance label */
  headlineAllowance: string;
  /** Whether the free storage quota is shared with email or photo services */
  sharedAcrossEcosystem: boolean;
  /** Explanation of shared quota or onboarding tasks if applicable */
  conditionSummary: string;
  /** Documented upload or transfer restrictions on the free plan */
  uploadAndTransferLimits: string;
}

export interface SecurityProfile {
  /** Whether client-side zero-knowledge E2EE is included at no extra cost on the free plan */
  zeroKnowledgeOnFree: boolean;
  /** Concise summary of transit and at-rest encryption */
  encryptionModel: string;
  /** Support for two-factor authentication (TOTP / security keys) on free accounts */
  twoFactorAuth: boolean;
  /** Whether client sync software is published under an open-source license */
  openSourceClients: boolean;
  /** Primary privacy jurisdiction / headquarters */
  jurisdiction: string;
  /** Verified security and privacy facts */
  verifiedHighlights: string[];
}

export interface CloudProvider {
  id: string;
  name: string;
  shortTagline: string;
  description: string;
  officialWebsite: string;
  officialPricingUrl: string;
  webLaunchUrl: string;
  brandAccentHex: string;
  allowance: FreeAllowanceDetails;
  planLimitations: string[];
  verifiedFeatures: string[];
  platforms: PlatformSupportEntry[];
  security: SecurityProfile;
  bestSuitedFor: string[];
  sources: ProviderSourceAttribution[];
  lastVerifiedDate: string;
  verificationStatus: VerificationStatus;
  integrationStatus: IntegrationStatus;
  integrationSummary: string;
  featured: boolean;
}

export type AllowanceCalculationMode = 'base' | 'onboarding';

export interface WorkspacePreferences {
  savedProviderIds: string[];
  favoriteProviderIds: string[];
  compareProviderIds: string[];
  providerNotes: Record<string, string>;
  allowanceMode: AllowanceCalculationMode;
  lastUpdatedIso: string;
}

export interface StorageCalculatorInputs {
  photoCount: string;
  avgPhotoSizeMB: string;
  videoCount: string;
  avgVideoSizeMB: string;
  documentsGB: string;
  extraStorageGB: string;
}

export interface StorageCategoryBreakdown {
  photosGB: number;
  videosGB: number;
  documentsGB: number;
  extraGB: number;
  totalGB: number;
  totalMB: number;
}

export interface CalculatorValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof StorageCalculatorInputs, string>>;
  sanitizedValues: {
    photoCount: number;
    avgPhotoSizeMB: number;
    videoCount: number;
    avgVideoSizeMB: number;
    documentsGB: number;
    extraStorageGB: number;
  };
}

export type SortOption =
  | 'storage_desc'
  | 'storage_asc'
  | 'onboarding_desc'
  | 'name_asc'
  | 'name_desc';

export interface ProviderFilterCriteria {
  searchQuery: string;
  minBaseStorageGB: number;
  onlyZeroKnowledgeFree: boolean;
  onlyLinuxSupported: boolean;
  excludeSharedQuota: boolean;
  sortBy: SortOption;
}
