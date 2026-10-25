import { CLOUD_PROVIDERS } from '../data/providers';
import { AllowanceCalculationMode, WorkspacePreferences } from '../types/cloud';

export const WORKSPACE_STORAGE_KEY = '100gb_workspace_preferences_v1';

const VALID_PROVIDER_IDS = new Set(CLOUD_PROVIDERS.map((p) => p.id));

export const DEFAULT_COMPARE_PROVIDER_IDS = ['google-drive', 'mega', 'proton-drive'];

export function createDefaultWorkspacePreferences(): WorkspacePreferences {
  return {
    savedProviderIds: [],
    favoriteProviderIds: [],
    compareProviderIds: [...DEFAULT_COMPARE_PROVIDER_IDS],
    providerNotes: {},
    allowanceMode: 'base',
    lastUpdatedIso: new Date().toISOString(),
  };
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function getSafeStorage(customStorage?: StorageLike): StorageLike | null {
  if (customStorage) return customStorage;
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  return null;
}

function sanitizeIdList(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const clean: string[] = [];
  for (const item of raw) {
    if (typeof item === 'string' && VALID_PROVIDER_IDS.has(item) && !seen.has(item)) {
      seen.add(item);
      clean.push(item);
    }
  }
  return clean;
}

function sanitizeNotes(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (VALID_PROVIDER_IDS.has(key) && typeof value === 'string') {
      clean[key] = value.slice(0, 280);
    }
  }
  return clean;
}

export function loadWorkspacePreferences(customStorage?: StorageLike): WorkspacePreferences {
  const storage = getSafeStorage(customStorage);
  const defaults = createDefaultWorkspacePreferences();
  if (!storage) return defaults;

  try {
    const raw = storage.getItem(WORKSPACE_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<WorkspacePreferences>;
    if (!parsed || typeof parsed !== 'object') return defaults;

    const allowanceMode: AllowanceCalculationMode =
      parsed.allowanceMode === 'onboarding' ? 'onboarding' : 'base';

    const compareIds = Array.isArray(parsed.compareProviderIds)
      ? sanitizeIdList(parsed.compareProviderIds)
      : defaults.compareProviderIds;

    return {
      savedProviderIds: sanitizeIdList(parsed.savedProviderIds),
      favoriteProviderIds: sanitizeIdList(parsed.favoriteProviderIds),
      compareProviderIds: compareIds,
      providerNotes: sanitizeNotes(parsed.providerNotes),
      allowanceMode,
      lastUpdatedIso:
        typeof parsed.lastUpdatedIso === 'string'
          ? parsed.lastUpdatedIso
          : defaults.lastUpdatedIso,
    };
  } catch {
    return defaults;
  }
}

export function saveWorkspacePreferences(
  prefs: WorkspacePreferences,
  customStorage?: StorageLike
): boolean {
  const storage = getSafeStorage(customStorage);
  if (!storage) return false;

  try {
    const payload: WorkspacePreferences = {
      ...prefs,
      savedProviderIds: sanitizeIdList(prefs.savedProviderIds),
      favoriteProviderIds: sanitizeIdList(prefs.favoriteProviderIds),
      compareProviderIds: sanitizeIdList(prefs.compareProviderIds),
      providerNotes: sanitizeNotes(prefs.providerNotes),
      lastUpdatedIso: new Date().toISOString(),
    };
    storage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch {
    return false;
  }
}
