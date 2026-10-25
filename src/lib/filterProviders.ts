import { CloudProvider, ProviderFilterCriteria } from '../types/cloud';

export const DEFAULT_FILTER_CRITERIA: ProviderFilterCriteria = {
  searchQuery: '',
  minBaseStorageGB: 0,
  onlyZeroKnowledgeFree: false,
  onlyLinuxSupported: false,
  excludeSharedQuota: false,
  sortBy: 'storage_desc',
};

export function hasActiveFilters(criteria: ProviderFilterCriteria): boolean {
  return (
    criteria.searchQuery.trim().length > 0 ||
    criteria.minBaseStorageGB > 0 ||
    criteria.onlyZeroKnowledgeFree ||
    criteria.onlyLinuxSupported ||
    criteria.excludeSharedQuota ||
    criteria.sortBy !== 'storage_desc'
  );
}

export function isLinuxSupported(provider: CloudProvider): boolean {
  const linuxEntry = provider.platforms.find((p) => p.platform === 'Linux');
  return Boolean(linuxEntry && linuxEntry.supportLevel === 'native');
}

export function filterAndSortProviders(
  providers: CloudProvider[],
  criteria: ProviderFilterCriteria
): CloudProvider[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  const filtered = providers.filter((provider) => {
    // 1. Search query match across name, tagline, description, security jurisdiction, platforms, and bestSuitedFor
    if (normalizedQuery.length > 0) {
      const searchableCorpus = [
        provider.name,
        provider.shortTagline,
        provider.description,
        provider.security.jurisdiction,
        provider.security.encryptionModel,
        provider.allowance.headlineAllowance,
        provider.allowance.conditionSummary,
        ...provider.verifiedFeatures,
        ...provider.bestSuitedFor,
        ...provider.platforms
          .filter((p) => p.supportLevel !== 'none')
          .map((p) => `${p.platform} ${p.note ?? ''}`),
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableCorpus.includes(normalizedQuery)) {
        return false;
      }
    }

    // 2. Minimum verified base storage filter
    if (provider.allowance.baseFreeGB < criteria.minBaseStorageGB) {
      return false;
    }

    // 3. Zero-knowledge E2EE on free plan filter
    if (criteria.onlyZeroKnowledgeFree && !provider.security.zeroKnowledgeOnFree) {
      return false;
    }

    // 4. Native Linux client support filter
    if (criteria.onlyLinuxSupported && !isLinuxSupported(provider)) {
      return false;
    }

    // 5. Exclude shared ecosystem quota (Gmail/Photos/Mail shared pools)
    if (criteria.excludeSharedQuota && provider.allowance.sharedAcrossEcosystem) {
      return false;
    }

    return true;
  });

  // Sort immutably
  return [...filtered].sort((a, b) => {
    switch (criteria.sortBy) {
      case 'storage_desc':
        return (
          b.allowance.baseFreeGB - a.allowance.baseFreeGB ||
          b.allowance.onboardingFreeGB - a.allowance.onboardingFreeGB ||
          a.name.localeCompare(b.name)
        );
      case 'storage_asc':
        return (
          a.allowance.baseFreeGB - b.allowance.baseFreeGB ||
          a.allowance.onboardingFreeGB - b.allowance.onboardingFreeGB ||
          a.name.localeCompare(b.name)
        );
      case 'onboarding_desc':
        return (
          b.allowance.onboardingFreeGB - a.allowance.onboardingFreeGB ||
          b.allowance.baseFreeGB - a.allowance.baseFreeGB ||
          a.name.localeCompare(b.name)
        );
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
}
