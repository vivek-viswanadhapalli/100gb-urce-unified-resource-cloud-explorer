import { IntegrationStatus } from '../types/cloud';

/**
 * Clean, truthful adapter interface for future cloud provider API integrations.
 *
 * Security & Honesty Architecture:
 * - V1 and V2 run 100% locally in the browser with zero backend secrets or OAuth tokens.
 * - No provider is ever falsely marked "Connected" merely because the user saved it or
 *   launched its official website.
 * - Real file listing or live quota telemetry in a future V3 release requires official
 *   provider OAuth 2.0 consent (PKCE), scoped read-only permissions, and secure server-side
 *   refresh-token handling.
 */
export interface ProviderIntegrationSpec {
  providerId: string;
  status: IntegrationStatus;
  publicApiAvailable: boolean;
  oauthProtocol: 'OAuth 2.0 PKCE' | 'None (Zero-Knowledge Client Vault)';
  requiredReadOnlyScopes: string[];
  officialDeveloperDocsUrl: string | null;
  architecturalRequirement: string;
}

export interface LiveQuotaSnapshot {
  connected: false;
  reason: string;
}

export interface CloudProviderAdapter {
  readonly spec: ProviderIntegrationSpec;
  getConnectionStatus(): IntegrationStatus;
  fetchQuotaSnapshot(): Promise<LiveQuotaSnapshot>;
  getOfficialWebLaunchUrl(fallbackUrl: string): string;
}

const INTEGRATION_SPECS: Record<string, ProviderIntegrationSpec> = {
  'google-drive': {
    providerId: 'google-drive',
    status: IntegrationStatus.AdapterPlanned,
    publicApiAvailable: true,
    oauthProtocol: 'OAuth 2.0 PKCE',
    requiredReadOnlyScopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
    officialDeveloperDocsUrl: 'https://developers.google.com/drive/api/guides/about-sdk',
    architecturalRequirement:
      'Requires a verified Google Cloud OAuth 2.0 client ID and user consent for read-only Drive storage quota (`about.get`).',
  },
  'microsoft-onedrive': {
    providerId: 'microsoft-onedrive',
    status: IntegrationStatus.AdapterPlanned,
    publicApiAvailable: true,
    oauthProtocol: 'OAuth 2.0 PKCE',
    requiredReadOnlyScopes: ['Files.Read', 'User.Read'],
    officialDeveloperDocsUrl: 'https://learn.microsoft.com/en-us/onedrive/developer/',
    architecturalRequirement:
      'Requires Microsoft Entra ID app registration and OAuth 2.0 PKCE authorization against Microsoft Graph (`/me/drive`).',
  },
  dropbox: {
    providerId: 'dropbox',
    status: IntegrationStatus.AdapterPlanned,
    publicApiAvailable: true,
    oauthProtocol: 'OAuth 2.0 PKCE',
    requiredReadOnlyScopes: ['account_info.read', 'files.metadata.read'],
    officialDeveloperDocsUrl: 'https://www.dropbox.com/developers/documentation/http/documentation',
    architecturalRequirement:
      'Requires Dropbox App Console OAuth 2.0 PKCE flow querying `/2/users/get_space_usage`.',
  },
  box: {
    providerId: 'box',
    status: IntegrationStatus.AdapterPlanned,
    publicApiAvailable: true,
    oauthProtocol: 'OAuth 2.0 PKCE',
    requiredReadOnlyScopes: ['root_readonly'],
    officialDeveloperDocsUrl: 'https://developer.box.com/reference/get-users-me/',
    architecturalRequirement:
      'Requires Box Developer OAuth 2.0 token exchange proxy (CORS/token security) querying `/2.0/users/me`.',
  },
  pcloud: {
    providerId: 'pcloud',
    status: IntegrationStatus.AdapterPlanned,
    publicApiAvailable: true,
    oauthProtocol: 'OAuth 2.0 PKCE',
    requiredReadOnlyScopes: ['userinfo'],
    officialDeveloperDocsUrl: 'https://docs.pcloud.com/',
    architecturalRequirement:
      'Requires pCloud OAuth 2.0 app registration (`us/eu` regional API endpoint selection) querying `userinfo` quota fields.',
  },
  mega: {
    providerId: 'mega',
    status: IntegrationStatus.WebLaunchOnly,
    publicApiAvailable: false,
    oauthProtocol: 'None (Zero-Knowledge Client Vault)',
    requiredReadOnlyScopes: [],
    officialDeveloperDocsUrl: 'https://github.com/meganz/sdk',
    architecturalRequirement:
      'MEGA derives master decryption keys from the user password client-side. 100GB intentionally avoids requesting raw passwords; use official Web Launch.',
  },
  'proton-drive': {
    providerId: 'proton-drive',
    status: IntegrationStatus.WebLaunchOnly,
    publicApiAvailable: false,
    oauthProtocol: 'None (Zero-Knowledge Client Vault)',
    requiredReadOnlyScopes: [],
    officialDeveloperDocsUrl: 'https://proton.me/drive/security',
    architecturalRequirement:
      'Proton Drive encrypts metadata and file trees end-to-end and does not expose a public third-party OAuth REST API.',
  },
  'sync-com': {
    providerId: 'sync-com',
    status: IntegrationStatus.WebLaunchOnly,
    publicApiAvailable: false,
    oauthProtocol: 'None (Zero-Knowledge Client Vault)',
    requiredReadOnlyScopes: [],
    officialDeveloperDocsUrl: 'https://www.sync.com/your-privacy/',
    architecturalRequirement:
      'Sync.com maintains strict client-side encryption without a public third-party OAuth developer API.',
  },
  internxt: {
    providerId: 'internxt',
    status: IntegrationStatus.WebLaunchOnly,
    publicApiAvailable: false,
    oauthProtocol: 'None (Zero-Knowledge Client Vault)',
    requiredReadOnlyScopes: [],
    officialDeveloperDocsUrl: 'https://github.com/internxt/cli',
    architecturalRequirement:
      'Internxt uses client-side encrypted shards; third-party access requires running the official local Internxt CLI/WebDAV daemon.',
  },
};

export function getProviderAdapter(providerId: string): CloudProviderAdapter {
  const spec: ProviderIntegrationSpec = INTEGRATION_SPECS[providerId] ?? {
    providerId,
    status: IntegrationStatus.NotConnected,
    publicApiAvailable: false,
    oauthProtocol: 'None (Zero-Knowledge Client Vault)',
    requiredReadOnlyScopes: [],
    officialDeveloperDocsUrl: null,
    architecturalRequirement: 'No live account connection configured in local-first release.',
  };

  return {
    spec,
    getConnectionStatus() {
      return spec.status;
    },
    async fetchQuotaSnapshot(): Promise<LiveQuotaSnapshot> {
      return {
        connected: false,
        reason: spec.architecturalRequirement,
      };
    },
    getOfficialWebLaunchUrl(fallbackUrl: string) {
      return fallbackUrl;
    },
  };
}

export function getAllIntegrationSpecs(): ProviderIntegrationSpec[] {
  return Object.values(INTEGRATION_SPECS);
}
