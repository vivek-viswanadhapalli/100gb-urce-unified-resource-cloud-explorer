import {
  CalculatorValidationResult,
  CloudProvider,
  StorageCalculatorInputs,
  StorageCategoryBreakdown,
} from '../types/cloud';

/**
 * Consistent binary storage convention: 1 GB = 1,024 MB.
 * Explicitly documented in the calculator interface and project report.
 */
export const MB_PER_GB = 1024;

export const DEFAULT_CALCULATOR_INPUTS: StorageCalculatorInputs = {
  photoCount: '1200',
  avgPhotoSizeMB: '3.5',
  videoCount: '25',
  avgVideoSizeMB: '85',
  documentsGB: '2.5',
  extraStorageGB: '1.0',
};

export interface CalculatorPreset {
  id: string;
  label: string;
  description: string;
  inputs: StorageCalculatorInputs;
}

export const CALCULATOR_PRESETS: CalculatorPreset[] = [
  {
    id: 'student-semester',
    label: 'Student coursework',
    description: 'Lecture PDFs, lab code, slides, and reference photos',
    inputs: {
      photoCount: '400',
      avgPhotoSizeMB: '2.5',
      videoCount: '8',
      avgVideoSizeMB: '60',
      documentsGB: '2.0',
      extraStorageGB: '0.5',
    },
  },
  {
    id: 'everyday-backup',
    label: 'Phone & personal backup',
    description: '1,200 smartphone photos, short clips, and personal PDFs',
    inputs: {
      photoCount: '1200',
      avgPhotoSizeMB: '3.5',
      videoCount: '25',
      avgVideoSizeMB: '85',
      documentsGB: '2.5',
      extraStorageGB: '1.0',
    },
  },
  {
    id: 'creator-media',
    label: 'Creator project archive',
    description: 'High-resolution RAW photos and 4K B-roll video clips',
    inputs: {
      photoCount: '800',
      avgPhotoSizeMB: '18',
      videoCount: '15',
      avgVideoSizeMB: '350',
      documentsGB: '3.0',
      extraStorageGB: '2.0',
    },
  },
  {
    id: 'minimal-vault',
    label: 'Encrypted ID & tax vault',
    description: 'Essential identity scans, certificates, and recovery keys',
    inputs: {
      photoCount: '60',
      avgPhotoSizeMB: '2.0',
      videoCount: '0',
      avgVideoSizeMB: '0',
      documentsGB: '0.5',
      extraStorageGB: '0.2',
    },
  },
];

function parseNonNegativeField(
  raw: string,
  fieldLabel: string,
  requireInteger = false
): { value: number; error?: string } {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return { value: 0 };
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || Number.isNaN(parsed)) {
    return { value: 0, error: `${fieldLabel} must be a valid number.` };
  }

  if (parsed < 0) {
    return { value: 0, error: `${fieldLabel} cannot be negative.` };
  }

  if (parsed > 1_000_000) {
    return { value: 1_000_000, error: `${fieldLabel} exceeds realistic calculator range (max 1,000,000).` };
  }

  if (requireInteger && !Number.isInteger(parsed)) {
    return {
      value: Math.floor(parsed),
      error: `${fieldLabel} must be a whole number.`,
    };
  }

  return { value: parsed };
}

export function validateCalculatorInputs(
  inputs: StorageCalculatorInputs
): CalculatorValidationResult {
  const errors: Partial<Record<keyof StorageCalculatorInputs, string>> = {};

  const photoCount = parseNonNegativeField(inputs.photoCount, 'Number of photos', true);
  if (photoCount.error) errors.photoCount = photoCount.error;

  const avgPhotoSizeMB = parseNonNegativeField(inputs.avgPhotoSizeMB, 'Average photo size');
  if (avgPhotoSizeMB.error) errors.avgPhotoSizeMB = avgPhotoSizeMB.error;

  const videoCount = parseNonNegativeField(inputs.videoCount, 'Number of videos', true);
  if (videoCount.error) errors.videoCount = videoCount.error;

  const avgVideoSizeMB = parseNonNegativeField(inputs.avgVideoSizeMB, 'Average video size');
  if (avgVideoSizeMB.error) errors.avgVideoSizeMB = avgVideoSizeMB.error;

  const documentsGB = parseNonNegativeField(inputs.documentsGB, 'Documents storage');
  if (documentsGB.error) errors.documentsGB = documentsGB.error;

  const extraStorageGB = parseNonNegativeField(inputs.extraStorageGB, 'Extra storage buffer');
  if (extraStorageGB.error) errors.extraStorageGB = extraStorageGB.error;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedValues: {
      photoCount: photoCount.value,
      avgPhotoSizeMB: avgPhotoSizeMB.value,
      videoCount: videoCount.value,
      avgVideoSizeMB: avgVideoSizeMB.value,
      documentsGB: documentsGB.value,
      extraStorageGB: extraStorageGB.value,
    },
  };
}

export function calculateStorageBreakdown(
  inputs: StorageCalculatorInputs
): {
  validation: CalculatorValidationResult;
  breakdown: StorageCategoryBreakdown;
} {
  const validation = validateCalculatorInputs(inputs);
  const {
    photoCount,
    avgPhotoSizeMB,
    videoCount,
    avgVideoSizeMB,
    documentsGB,
    extraStorageGB,
  } = validation.sanitizedValues;

  const photosMB = photoCount * avgPhotoSizeMB;
  const videosMB = videoCount * avgVideoSizeMB;
  const documentsMB = documentsGB * MB_PER_GB;
  const extraMB = extraStorageGB * MB_PER_GB;

  const photosGB = photosMB / MB_PER_GB;
  const videosGB = videosMB / MB_PER_GB;
  const totalMB = photosMB + videosMB + documentsMB + extraMB;
  const totalGB = totalMB / MB_PER_GB;

  return {
    validation,
    breakdown: {
      photosGB: roundToTwoDecimals(photosGB),
      videosGB: roundToTwoDecimals(videosGB),
      documentsGB: roundToTwoDecimals(documentsGB),
      extraGB: roundToTwoDecimals(extraStorageGB),
      totalGB: roundToTwoDecimals(totalGB),
      totalMB: Math.round(totalMB),
    },
  };
}

export function roundToTwoDecimals(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export type ProviderFitTier =
  | 'fits_base_free'
  | 'fits_onboarding_free'
  | 'exceeds_free_tier';

export interface ProviderStorageFit {
  provider: CloudProvider;
  fitTier: ProviderFitTier;
  remainingBaseGB: number;
  remainingOnboardingGB: number;
  fileSizeWarning: string | null;
}

export function evaluateProvidersForRequirement(
  providers: CloudProvider[],
  requiredGB: number,
  avgVideoSizeMB: number,
  avgPhotoSizeMB: number
): ProviderStorageFit[] {
  const largestExpectedSingleFileMB = Math.max(avgVideoSizeMB, avgPhotoSizeMB);

  return [...providers]
    .map((provider): ProviderStorageFit => {
      const baseGB = provider.allowance.baseFreeGB;
      const onboardingGB = provider.allowance.onboardingFreeGB;

      let fitTier: ProviderFitTier = 'exceeds_free_tier';
      if (requiredGB <= baseGB) {
        fitTier = 'fits_base_free';
      } else if (requiredGB <= onboardingGB) {
        fitTier = 'fits_onboarding_free';
      }

      let fileSizeWarning: string | null = null;
      if (provider.id === 'box' && largestExpectedSingleFileMB > 250) {
        fileSizeWarning =
          'Your average media file exceeds Box Individual’s 250 MB single-file upload limit.';
      } else if (provider.id === 'internxt' && largestExpectedSingleFileMB > 100) {
        fileSizeWarning =
          'Large single files may hit browser upload caps on Internxt’s 1 GB free plan.';
      }

      return {
        provider,
        fitTier,
        remainingBaseGB: roundToTwoDecimals(baseGB - requiredGB),
        remainingOnboardingGB: roundToTwoDecimals(onboardingGB - requiredGB),
        fileSizeWarning,
      };
    })
    .sort((a, b) => {
      const rank = { fits_base_free: 0, fits_onboarding_free: 1, exceeds_free_tier: 2 };
      if (rank[a.fitTier] !== rank[b.fitTier]) {
        return rank[a.fitTier] - rank[b.fitTier];
      }
      return b.provider.allowance.baseFreeGB - a.provider.allowance.baseFreeGB;
    });
}
