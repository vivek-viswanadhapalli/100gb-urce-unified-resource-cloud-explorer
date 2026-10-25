import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ExternalLink,
  Info,
  Plus,
  RotateCcw,
} from 'lucide-react';
import {
  CALCULATOR_PRESETS,
  calculateStorageBreakdown,
  DEFAULT_CALCULATOR_INPUTS,
  evaluateProvidersForRequirement,
  MB_PER_GB,
} from '../lib/calculator';
import { getAllProviders } from '../services/providerService';
import { StorageCalculatorInputs } from '../types/cloud';
import { ProviderEmblem } from '../components/brand/BrandLogo';
import { useWorkspace } from '../hooks/useWorkspace';

export function CalculatorPage() {
  const [inputs, setInputs] = useState<StorageCalculatorInputs>(DEFAULT_CALCULATOR_INPUTS);
  const allProviders = getAllProviders();
  const { isSaved, toggleSaved, toggleCompare, isComparing } = useWorkspace();

  const { validation, breakdown } = useMemo(
    () => calculateStorageBreakdown(inputs),
    [inputs]
  );

  const providerFits = useMemo(
    () =>
      evaluateProvidersForRequirement(
        allProviders,
        breakdown.totalGB,
        validation.sanitizedValues.avgVideoSizeMB,
        validation.sanitizedValues.avgPhotoSizeMB
      ),
    [
      allProviders,
      breakdown.totalGB,
      validation.sanitizedValues.avgVideoSizeMB,
      validation.sanitizedValues.avgPhotoSizeMB,
    ]
  );

  const updateField = (key: keyof StorageCalculatorInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const clearZero = () => {
    setInputs({
      photoCount: '0',
      avgPhotoSizeMB: '3.5',
      videoCount: '0',
      avgVideoSizeMB: '85',
      documentsGB: '0',
      extraStorageGB: '0',
    });
  };

  const totalSafe = breakdown.totalGB > 0 ? breakdown.totalGB : 1;
  const photoPct = Math.round((breakdown.photosGB / totalSafe) * 100);
  const videoPct = Math.round((breakdown.videosGB / totalSafe) * 100);
  const docPct = Math.round((breakdown.documentsGB / totalSafe) * 100);
  const extraPct = Math.max(0, 100 - photoPct - videoPct - docPct);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-[#155EEF]">Interactive Estimator</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
            Cloud storage requirement calculator
          </h1>
          <p className="mt-2.5 text-base text-[#667085] max-w-2xl">
            Estimate how many gigabytes your photos, videos, and documents require, then see
            which verified free tiers can accommodate your workload.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setInputs(DEFAULT_CALCULATOR_INPUTS)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors self-start lg:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset defaults</span>
        </button>
      </div>

      {/* Presets Row */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#667085] mr-1">
          Sample workloads:
        </span>
        {CALCULATOR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => setInputs(preset.inputs)}
            title={preset.description}
            className="px-3.5 py-1.5 rounded-xl border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors"
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={clearZero}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#14243A] transition-colors"
        >
          Zero all fields
        </button>
      </div>

      {/* Calculator Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 cols: Input Form */}
        <section
          aria-label="Storage estimator inputs"
          className="lg:col-span-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7 space-y-6"
        >
          <div>
            <h2 className="text-lg font-bold text-[#14243A]">1. Media & file inputs</h2>
            <p className="mt-1 text-xs text-[#667085]">
              All fields accept non-negative numbers and update your estimate immediately.
              Empty fields are treated as 0.
            </p>
          </div>

          {/* Photos Pair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="calc-photo-count"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Number of photos
              </label>
              <input
                id="calc-photo-count"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={inputs.photoCount}
                onChange={(e) => updateField('photoCount', e.target.value)}
                aria-invalid={Boolean(validation.errors.photoCount)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.photoCount && (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.photoCount}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-photo-size"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Average photo size (MB)
              </label>
              <input
                id="calc-photo-size"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={inputs.avgPhotoSizeMB}
                onChange={(e) => updateField('avgPhotoSizeMB', e.target.value)}
                aria-invalid={Boolean(validation.errors.avgPhotoSizeMB)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.avgPhotoSizeMB ? (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.avgPhotoSizeMB}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-[#667085]">
                  Typical HEIC/JPEG: 2.5–5 MB · RAW: 20–45 MB
                </p>
              )}
            </div>
          </div>

          {/* Videos Pair */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E4E7EC]">
            <div>
              <label
                htmlFor="calc-video-count"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Number of videos
              </label>
              <input
                id="calc-video-count"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                value={inputs.videoCount}
                onChange={(e) => updateField('videoCount', e.target.value)}
                aria-invalid={Boolean(validation.errors.videoCount)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.videoCount && (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.videoCount}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-video-size"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Average video size (MB)
              </label>
              <input
                id="calc-video-size"
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                value={inputs.avgVideoSizeMB}
                onChange={(e) => updateField('avgVideoSizeMB', e.target.value)}
                aria-invalid={Boolean(validation.errors.avgVideoSizeMB)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.avgVideoSizeMB ? (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.avgVideoSizeMB}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-[#667085]">
                  1 min 1080p: ~60–130 MB · 1 min 4K: ~300–400 MB
                </p>
              )}
            </div>
          </div>

          {/* Documents & Optional Extra Buffer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E4E7EC]">
            <div>
              <label
                htmlFor="calc-docs-gb"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Documents & other files (GB)
              </label>
              <input
                id="calc-docs-gb"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={inputs.documentsGB}
                onChange={(e) => updateField('documentsGB', e.target.value)}
                aria-invalid={Boolean(validation.errors.documentsGB)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.documentsGB ? (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.documentsGB}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-[#667085]">
                  PDFs, Office files, ZIP archives, code repositories
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="calc-extra-gb"
                className="block text-xs font-semibold text-[#14243A]"
              >
                Optional extra headroom (GB)
              </label>
              <input
                id="calc-extra-gb"
                type="number"
                min="0"
                step="0.1"
                inputMode="decimal"
                value={inputs.extraStorageGB}
                onChange={(e) => updateField('extraStorageGB', e.target.value)}
                aria-invalid={Boolean(validation.errors.extraStorageGB)}
                className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white font-mono text-sm tabular-nums text-[#14243A]"
              />
              {validation.errors.extraStorageGB ? (
                <p role="alert" className="mt-1 text-xs text-[#DC2626]">
                  {validation.errors.extraStorageGB}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-[#667085]">
                  Recommended buffer for future growth & email attachments
                </p>
              )}
            </div>
          </div>

          {/* Unit Convention Notice */}
          <div className="p-4 rounded-xl bg-[#F3F6FB] border border-[#E4E7EC] flex items-start gap-2.5 text-xs text-[#667085]">
            <Info className="w-4 h-4 text-[#155EEF] mt-0.5 shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong className="font-semibold text-[#14243A]">Unit convention: </strong>
              Calculations use the binary storage ratio{' '}
              <code className="font-mono text-[#14243A]">1 GB = {MB_PER_GB} MB</code>. Actual
              storage consumed may vary slightly due to file compression, version history,
              email/photo quota sharing, and decimal (1,000 MB) marketing definitions used by
              some providers.
            </p>
          </div>
        </section>

        {/* Right 6 cols: Live Breakdown Result */}
        <section
          aria-live="polite"
          className="lg:col-span-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7"
        >
          <span className="text-xs font-semibold text-[#667085]">
            Total Estimated Storage Required
          </span>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="font-mono text-4xl sm:text-5xl font-extrabold tabular-nums text-[#14243A]">
              {breakdown.totalGB.toFixed(2)} GB
            </span>
            <span className="font-mono text-xs text-[#667085] tabular-nums">
              ({breakdown.totalMB.toLocaleString()} MB)
            </span>
          </div>

          {/* Visual Stacked Bar (Vector SVG, zero inline styles) */}
          <div className="mt-6 h-3 w-full rounded-full bg-[#F3F6FB] overflow-hidden" aria-hidden="true">
            {breakdown.totalGB > 0 && (
              <svg
                viewBox="0 0 100 4"
                preserveAspectRatio="none"
                className="w-full h-full block"
              >
                <rect x={0} y={0} width={photoPct} height={4} fill="#155EEF" />
                <rect x={photoPct} y={0} width={videoPct} height={4} fill="#0EA5E9" />
                <rect
                  x={photoPct + videoPct}
                  y={0}
                  width={docPct}
                  height={4}
                  fill="#14243A"
                />
                <rect
                  x={photoPct + videoPct + docPct}
                  y={0}
                  width={extraPct}
                  height={4}
                  fill="#94A3B8"
                />
              </svg>
            )}
          </div>

          {/* Category Breakdown Table */}
          <table className="mt-6 w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#E4E7EC] text-xs text-[#667085]">
                <th className="py-2 font-semibold">Category</th>
                <th className="py-2 font-semibold text-right">Estimated Size</th>
                <th className="py-2 font-semibold text-right">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC] text-xs sm:text-sm">
              <tr>
                <td className="py-2.5 font-medium text-[#14243A]">Photos</td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#14243A]">
                  {breakdown.photosGB.toFixed(2)} GB
                </td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#667085]">
                  {breakdown.totalGB > 0 ? `${photoPct}%` : '0%'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#14243A]">Videos</td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#14243A]">
                  {breakdown.videosGB.toFixed(2)} GB
                </td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#667085]">
                  {breakdown.totalGB > 0 ? `${videoPct}%` : '0%'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#14243A]">Documents & archives</td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#14243A]">
                  {breakdown.documentsGB.toFixed(2)} GB
                </td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#667085]">
                  {breakdown.totalGB > 0 ? `${docPct}%` : '0%'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-[#14243A]">Extra storage buffer</td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#14243A]">
                  {breakdown.extraGB.toFixed(2)} GB
                </td>
                <td className="py-2.5 font-mono tabular-nums text-right text-[#667085]">
                  {breakdown.totalGB > 0 ? `${extraPct}%` : '0%'}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Summary Guidance */}
          <div className="mt-6 pt-5 border-t border-[#E4E7EC] text-xs text-[#667085] leading-relaxed">
            {breakdown.totalGB <= 20 ? (
              <p>
                <strong className="text-[#15803D]">Single-provider fit available: </strong>
                At least one verified free plan offers enough capacity for your{' '}
                <span className="font-mono font-semibold text-[#14243A]">
                  {breakdown.totalGB.toFixed(2)} GB
                </span>{' '}
                estimate, subject to file-size and quota-sharing conditions below.
              </p>
            ) : (
              <p>
                <strong className="text-[#B45309]">Exceeds single free tiers: </strong>
                No single verified provider offers more than 20 GB of permanent base free
                space. You will either need a paid cloud subscription (e.g., 100 GB–2 TB plans)
                or deliberately split separate folders (such as photos vs archives) across
                multiple accounts in your{' '}
                <Link to="/workspace" className="text-[#155EEF] font-semibold hover:underline">
                  Personal Workspace
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Comparison Against Verified Provider Allowances */}
      <section className="mt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#14243A]">
              How your {breakdown.totalGB.toFixed(2)} GB estimate compares to free tiers
            </h2>
            <p className="mt-1 text-sm text-[#667085]">
              Evaluated against verified immediate base allowances, onboarding steps, and single-file upload limits.
            </p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-semibold text-[#155EEF] hover:underline whitespace-nowrap"
          >
            Compare selected providers →
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E4E7EC] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#E4E7EC] bg-[#FAFAF7] text-xs text-[#667085]">
                  <th className="py-3.5 px-5 font-semibold">Provider</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Base Free</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Headroom / Shortfall</th>
                  <th className="py-3.5 px-4 font-semibold">Compatibility Verdict</th>
                  <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {providerFits.map((fit) => {
                  const saved = isSaved(fit.provider.id);
                  const comparing = isComparing(fit.provider.id);
                  return (
                    <tr key={fit.provider.id} className="hover:bg-[#FAFAF7]/70">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <ProviderEmblem
                            providerId={fit.provider.id}
                            name={fit.provider.name}
                            size="sm"
                          />
                          <div>
                            <Link
                              to={`/providers/${fit.provider.id}`}
                              className="font-bold text-[#14243A] hover:text-[#155EEF]"
                            >
                              {fit.provider.name}
                            </Link>
                            {fit.fileSizeWarning && (
                              <p className="text-[11px] text-[#B45309] flex items-center gap-1 mt-0.5">
                                <AlertTriangle className="w-3 h-3 shrink-0" aria-hidden="true" />
                                <span>{fit.fileSizeWarning}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono font-semibold tabular-nums text-right text-[#14243A]">
                        {fit.provider.allowance.baseFreeGB} GB
                        {fit.provider.allowance.onboardingFreeGB >
                          fit.provider.allowance.baseFreeGB && (
                          <span className="block text-[11px] text-[#155EEF]">
                            → {fit.provider.allowance.onboardingFreeGB} GB
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-mono text-xs font-semibold tabular-nums text-right">
                        {fit.remainingBaseGB >= 0 ? (
                          <span className="text-[#15803D]">
                            +{fit.remainingBaseGB.toFixed(2)} GB spare
                          </span>
                        ) : (
                          <span className="text-[#667085]">
                            {fit.remainingBaseGB.toFixed(2)} GB short
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-xs">
                        {fit.fitTier === 'fits_base_free' && (
                          <span className="inline-flex items-center gap-1.5 font-semibold text-[#15803D]">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            <span>Fits standard free plan</span>
                          </span>
                        )}
                        {fit.fitTier === 'fits_onboarding_free' && (
                          <span className="font-semibold text-[#155EEF]">
                            Fits after free starter checklist ({fit.provider.allowance.onboardingFreeGB} GB)
                          </span>
                        )}
                        {fit.fitTier === 'exceeds_free_tier' && (
                          <span className="text-[#667085]">
                            Exceeds free tier · Use for partial archive or upgrade
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleSaved(fit.provider.id, fit.provider.name)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              saved
                                ? 'bg-[#14243A] text-white'
                                : 'bg-[#155EEF] hover:bg-[#0E4BD8] text-white'
                            }`}
                          >
                            {saved ? (
                              <>
                                <Check className="w-3 h-3" aria-hidden="true" />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" aria-hidden="true" />
                                <span>Save</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleCompare(fit.provider.id, fit.provider.name)}
                            className="px-2.5 py-1.5 rounded-lg border border-[#E4E7EC] hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors"
                          >
                            {comparing ? 'Comparing' : 'Compare'}
                          </button>

                          <a
                            href={fit.provider.officialPricingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Official plans for ${fit.provider.name}`}
                            className="p-1.5 text-[#667085] hover:text-[#14243A]"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
