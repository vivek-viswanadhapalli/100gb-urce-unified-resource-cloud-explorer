import { CLOUD_PROVIDERS } from '../data/providers';
import { CloudProvider } from '../types/cloud';

export function getAllProviders(): CloudProvider[] {
  return CLOUD_PROVIDERS;
}

export function getProviderById(id: string | undefined): CloudProvider | undefined {
  if (!id) return undefined;
  const normalized = id.trim().toLowerCase();
  return CLOUD_PROVIDERS.find((provider) => provider.id === normalized);
}

export function getFeaturedProviders(): CloudProvider[] {
  return CLOUD_PROVIDERS.filter((provider) => provider.featured);
}

export function getProvidersByIds(ids: string[]): CloudProvider[] {
  const idSet = new Set(ids);
  return CLOUD_PROVIDERS.filter((p) => idSet.has(p.id));
}

export function getRelatedProviders(current: CloudProvider, count = 3): CloudProvider[] {
  return CLOUD_PROVIDERS.filter((candidate) => candidate.id !== current.id)
    .map((candidate) => {
      let score = 0;
      if (candidate.security.zeroKnowledgeOnFree === current.security.zeroKnowledgeOnFree) {
        score += 3;
      }
      if (Math.abs(candidate.allowance.baseFreeGB - current.allowance.baseFreeGB) <= 5) {
        score += 2;
      }
      if (candidate.allowance.sharedAcrossEcosystem === current.allowance.sharedAcrossEcosystem) {
        score += 1;
      }
      return { candidate, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.allowance.baseFreeGB - a.candidate.allowance.baseFreeGB
    )
    .slice(0, count)
    .map((entry) => entry.candidate);
}
