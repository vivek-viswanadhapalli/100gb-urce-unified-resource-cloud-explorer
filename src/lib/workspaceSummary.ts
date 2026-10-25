import { AllowanceCalculationMode, CloudProvider } from '../types/cloud';

export interface WorkspaceAllowanceSummary {
  providerCount: number;
  totalBaseFreeGB: number;
  totalOnboardingFreeGB: number;
  activeTotalGB: number;
  zeroKnowledgeCount: number;
  sharedQuotaCount: number;
  conditionalCount: number;
  caveats: string[];
}

export function computeWorkspaceSummary(
  selectedProviders: CloudProvider[],
  mode: AllowanceCalculationMode
): WorkspaceAllowanceSummary {
  // Deduplicate by ID to prevent double-counting
  const uniqueMap = new Map<string, CloudProvider>();
  for (const p of selectedProviders) {
    uniqueMap.set(p.id, p);
  }
  const uniqueProviders = Array.from(uniqueMap.values());

  const totalBaseFreeGB = uniqueProviders.reduce(
    (sum, p) => sum + p.allowance.baseFreeGB,
    0
  );
  const totalOnboardingFreeGB = uniqueProviders.reduce(
    (sum, p) => sum + p.allowance.onboardingFreeGB,
    0
  );

  const zeroKnowledgeCount = uniqueProviders.filter(
    (p) => p.security.zeroKnowledgeOnFree
  ).length;
  const sharedQuotaCount = uniqueProviders.filter(
    (p) => p.allowance.sharedAcrossEcosystem
  ).length;
  const conditionalCount = uniqueProviders.filter(
    (p) => p.allowance.onboardingFreeGB > p.allowance.baseFreeGB
  ).length;

  const caveats: string[] = [];

  if (uniqueProviders.length > 1) {
    caveats.push(
      'Combined capacity is an informational sum across separate accounts. Free cloud tiers do not merge into a single contiguous hard drive, so individual files cannot span across two providers.'
    );
  }

  if (sharedQuotaCount > 0) {
    caveats.push(
      `${sharedQuotaCount} selected ${
        sharedQuotaCount === 1 ? 'provider shares its' : 'providers share their'
      } storage pool with email or photo backups (e.g., Gmail/Google Photos, Outlook attachments, or Proton Mail).`
    );
  }

  if (mode === 'onboarding' && conditionalCount > 0) {
    caveats.push(
      `Onboarding mode includes +${
        totalOnboardingFreeGB - totalBaseFreeGB
      } GB from ${conditionalCount} ${
        conditionalCount === 1 ? 'provider requiring' : 'providers requiring'
      } first-party verification or app-install steps.`
    );
  }

  if (uniqueProviders.some((p) => p.id === 'box')) {
    caveats.push(
      'Box Individual enforces a 250 MB single-file upload limit despite offering 10 GB total space.'
    );
  }

  return {
    providerCount: uniqueProviders.length,
    totalBaseFreeGB,
    totalOnboardingFreeGB,
    activeTotalGB: mode === 'onboarding' ? totalOnboardingFreeGB : totalBaseFreeGB,
    zeroKnowledgeCount,
    sharedQuotaCount,
    conditionalCount,
    caveats,
  };
}
