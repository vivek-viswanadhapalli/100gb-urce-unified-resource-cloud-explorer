import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { CLOUD_PROVIDERS } from '../src/data/providers';
import {
  DEFAULT_FILTER_CRITERIA,
  filterAndSortProviders,
  isLinuxSupported,
} from '../src/lib/filterProviders';
import {
  calculateStorageBreakdown,
  evaluateProvidersForRequirement,
  MB_PER_GB,
} from '../src/lib/calculator';
import { computeWorkspaceSummary } from '../src/lib/workspaceSummary';
import {
  loadWorkspacePreferences,
  saveWorkspacePreferences,
  StorageLike,
  WORKSPACE_STORAGE_KEY,
} from '../src/services/storagePersistence';
import { getProviderById, getRelatedProviders } from '../src/services/providerService';
import { getProviderAdapter } from '../src/services/integrationAdapter';

function createMemoryStorage(): StorageLike {
  const store = new Map<string, string>();
  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    removeItem: (key) => {
      store.delete(key);
    },
  };
}

describe('100GB Provider Dataset & Service Integrity', () => {
  it('contains all 9 required cloud storage providers with verified official sources', () => {
    const expectedIds = [
      'google-drive',
      'microsoft-onedrive',
      'dropbox',
      'mega',
      'box',
      'pcloud',
      'proton-drive',
      'sync-com',
      'internxt',
    ];
    assert.equal(CLOUD_PROVIDERS.length, 9);
    for (const id of expectedIds) {
      const record = getProviderById(id);
      assert.ok(record, `Expected provider "${id}" to exist`);
      assert.ok(record.officialWebsite.startsWith('https://'));
      assert.ok(record.officialPricingUrl.startsWith('https://'));
      assert.ok(record.allowance.baseFreeGB >= 1);
      assert.ok(record.allowance.onboardingFreeGB >= record.allowance.baseFreeGB);
      assert.ok(record.sources.length >= 1);
    }
  });

  it('returns undefined for invalid provider IDs and related providers excluding current', () => {
    assert.equal(getProviderById('non-existent-provider'), undefined);
    const mega = getProviderById('mega')!;
    const related = getRelatedProviders(mega, 3);
    assert.equal(related.length, 3);
    assert.ok(related.every((p) => p.id !== 'mega'));
  });

  it('never reports fake connected status in integration adapters', async () => {
    for (const provider of CLOUD_PROVIDERS) {
      const adapter = getProviderAdapter(provider.id);
      const snapshot = await adapter.fetchQuotaSnapshot();
      assert.equal(snapshot.connected, false);
      assert.ok(snapshot.reason.length > 10);
    }
  });
});

describe('100GB Search, Filtering, and Sorting Engine', () => {
  it('sorts by base free storage descending by default', () => {
    const sorted = filterAndSortProviders(CLOUD_PROVIDERS, DEFAULT_FILTER_CRITERIA);
    assert.equal(sorted[0].id, 'mega'); // 20 GB
    assert.equal(sorted[1].id, 'google-drive'); // 15 GB
    assert.equal(sorted[sorted.length - 1].id, 'internxt'); // 1 GB
  });

  it('filters zero-knowledge E2EE free providers accurately', () => {
    const e2eeOnly = filterAndSortProviders(CLOUD_PROVIDERS, {
      ...DEFAULT_FILTER_CRITERIA,
      onlyZeroKnowledgeFree: true,
    });
    const ids = e2eeOnly.map((p) => p.id).sort();
    assert.deepEqual(ids, ['internxt', 'mega', 'proton-drive', 'sync-com']);
  });

  it('filters native Linux desktop clients accurately', () => {
    const linuxOnly = filterAndSortProviders(CLOUD_PROVIDERS, {
      ...DEFAULT_FILTER_CRITERIA,
      onlyLinuxSupported: true,
    });
    assert.ok(linuxOnly.length >= 4);
    assert.ok(linuxOnly.every((p) => isLinuxSupported(p)));
    assert.ok(!linuxOnly.some((p) => p.id === 'google-drive'));
  });

  it('handles keyword search and minimum storage thresholds', () => {
    const result = filterAndSortProviders(CLOUD_PROVIDERS, {
      ...DEFAULT_FILTER_CRITERIA,
      searchQuery: 'switzerland',
      minBaseStorageGB: 2,
    });
    const ids = result.map((p) => p.id).sort();
    assert.deepEqual(ids, ['pcloud', 'proton-drive']);
  });
});

describe('100GB Storage Calculator & Validation', () => {
  it('converts MB to GB using 1024 MB = 1 GB accurately', () => {
    assert.equal(MB_PER_GB, 1024);
    const { validation, breakdown } = calculateStorageBreakdown({
      photoCount: '1024',
      avgPhotoSizeMB: '2', // 2048 MB = 2 GB
      videoCount: '10',
      avgVideoSizeMB: '102.4', // 1024 MB = 1 GB
      documentsGB: '3.5',
      extraStorageGB: '1.5',
    });

    assert.equal(validation.isValid, true);
    assert.equal(breakdown.photosGB, 2);
    assert.equal(breakdown.videosGB, 1);
    assert.equal(breakdown.documentsGB, 3.5);
    assert.equal(breakdown.extraGB, 1.5);
    assert.equal(breakdown.totalGB, 8);
  });

  it('handles empty and negative inputs safely with validation errors', () => {
    const { validation, breakdown } = calculateStorageBreakdown({
      photoCount: '-50',
      avgPhotoSizeMB: '',
      videoCount: 'abc',
      avgVideoSizeMB: '50',
      documentsGB: '2',
      extraStorageGB: '',
    });

    assert.equal(validation.isValid, false);
    assert.ok(validation.errors.photoCount);
    assert.ok(validation.errors.videoCount);
    assert.equal(breakdown.totalGB, 2);
  });

  it('flags Box single-file 250 MB upload cap when video size exceeds 250 MB', () => {
    const fits = evaluateProvidersForRequirement(CLOUD_PROVIDERS, 6, 350, 4);
    const boxFit = fits.find((f) => f.provider.id === 'box')!;
    assert.equal(boxFit.fitTier, 'fits_base_free'); // 6 GB <= 10 GB
    assert.ok(boxFit.fileSizeWarning && boxFit.fileSizeWarning.includes('250 MB'));

    const pcloudFit = fits.find((f) => f.provider.id === 'pcloud')!;
    assert.equal(pcloudFit.fitTier, 'fits_onboarding_free'); // 2 GB base < 6 GB <= 7 GB onboarding
  });
});

describe('100GB Workspace Persistence & Summary Math', () => {
  it('saves, sanitizes, and reloads preferences via StorageLike interface', () => {
    const mem = createMemoryStorage();
    const savedOk = saveWorkspacePreferences(
      {
        savedProviderIds: ['google-drive', 'proton-drive', 'google-drive', 'invalid-id'],
        favoriteProviderIds: ['mega'],
        compareProviderIds: ['google-drive', 'mega'],
        providerNotes: {
          'google-drive': 'Coursework folder',
          'invalid-id': 'Should be stripped',
        },
        allowanceMode: 'onboarding',
        lastUpdatedIso: '2026-10-24T00:00:00.000Z',
      },
      mem
    );
    assert.equal(savedOk, true);

    const loaded = loadWorkspacePreferences(mem);
    assert.deepEqual(loaded.savedProviderIds, ['google-drive', 'proton-drive']);
    assert.deepEqual(loaded.favoriteProviderIds, ['mega']);
    assert.equal(loaded.allowanceMode, 'onboarding');
    assert.equal(loaded.providerNotes['google-drive'], 'Coursework folder');
    assert.equal(loaded.providerNotes['invalid-id'], undefined);
  });

  it('recovers gracefully from corrupted JSON in localStorage', () => {
    const mem = createMemoryStorage();
    mem.setItem(WORKSPACE_STORAGE_KEY, '{corrupted-json');
    const loaded = loadWorkspacePreferences(mem);
    assert.deepEqual(loaded.savedProviderIds, []);
    assert.equal(loaded.allowanceMode, 'base');
  });

  it('computes base vs onboarding totals and generates truthful caveats', () => {
    const google = getProviderById('google-drive')!; // 15 base, 15 onboarding
    const proton = getProviderById('proton-drive')!; // 2 base, 5 onboarding

    const baseSummary = computeWorkspaceSummary([google, proton], 'base');
    assert.equal(baseSummary.totalBaseFreeGB, 17);
    assert.equal(baseSummary.totalOnboardingFreeGB, 20);
    assert.equal(baseSummary.activeTotalGB, 17);
    assert.ok(baseSummary.caveats.length >= 2);

    const onboardingSummary = computeWorkspaceSummary([google, proton], 'onboarding');
    assert.equal(onboardingSummary.activeTotalGB, 20);
  });
});
