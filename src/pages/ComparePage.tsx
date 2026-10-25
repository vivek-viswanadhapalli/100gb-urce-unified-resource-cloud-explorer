import React from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ExternalLink,
  GitCompareArrows,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { getAllProviders, getProvidersByIds } from '../services/providerService';
import { useWorkspace } from '../hooks/useWorkspace';
import { ProviderEmblem } from '../components/brand/BrandLogo';
import {
  EmptyState,
  IntegrationIndicator,
  VerificationIndicator,
} from '../components/ui/Primitives';
import { PlatformName } from '../types/cloud';

const ALL_PLATFORMS: PlatformName[] = [
  'Web',
  'Windows',
  'macOS',
  'Linux',
  'iOS',
  'Android',
];

const COMPARE_PRESETS = [
  {
    label: 'Mainstream ecosystems',
    ids: ['google-drive', 'microsoft-onedrive', 'dropbox', 'box'],
  },
  {
    label: 'Zero-knowledge E2EE free',
    ids: ['mega', 'proton-drive', 'sync-com', 'internxt'],
  },
  {
    label: 'Highest free capacity',
    ids: ['mega', 'google-drive', 'box', 'pcloud'],
  },
];

export function ComparePage() {
  const allProviders = getAllProviders();
  const {
    preferences,
    toggleCompare,
    setCompareList,
    resetCompareList,
    isSaved,
    toggleSaved,
  } = useWorkspace();

  const selectedProviders = getProvidersByIds(preferences.compareProviderIds);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-[#155EEF]">Side-by-Side Matrix</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
            Compare cloud storage plans
          </h1>
          <p className="mt-2.5 text-base text-[#667085] max-w-2xl">
            Select two to four cloud services to inspect standard free allowances,
            onboarding requirements, upload caps, platform clients, and encryption models.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={resetCompareList}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset default trio</span>
          </button>

          {selectedProviders.length > 0 && (
            <button
              type="button"
              onClick={() => setCompareList([], 'Cleared comparison table')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] hover:text-[#DC2626] text-xs font-semibold text-[#667085] transition-colors whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear all</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Provider Selector & Presets */}
      <section
        aria-label="Select providers to compare"
        className="mt-8 rounded-2xl border border-[#E4E7EC] bg-white p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E4E7EC]">
          <span className="text-xs font-semibold text-[#14243A] tabular-nums">
            Selected providers ({selectedProviders.length} / 4 max)
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#667085]">Quick sets:</span>
            {COMPARE_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  setCompareList(preset.ids, `Loaded "${preset.label}" comparison`)
                }
                className="px-3 py-1 rounded-lg bg-[#F3F6FB] hover:bg-[#EBF1FF] text-xs font-semibold text-[#14243A] hover:text-[#155EEF] transition-colors whitespace-nowrap"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allProviders.map((provider) => {
            const active = preferences.compareProviderIds.includes(provider.id);
            return (
              <button
                key={provider.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleCompare(provider.id, provider.name)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                    : 'border-[#E4E7EC] bg-[#FAFAF7] text-[#172033] hover:bg-white'
                }`}
              >
                <span>{provider.name}</span>
                <span className="font-mono tabular-nums text-[11px] opacity-80">
                  {provider.allowance.baseFreeGB} GB
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Guidance when fewer than 2 providers are selected */}
      {selectedProviders.length < 2 ? (
        <div className="mt-8">
          <EmptyState
            icon={<GitCompareArrows className="w-6 h-6" />}
            title={
              selectedProviders.length === 0
                ? 'Select at least two providers to compare'
                : `Add one more provider alongside ${selectedProviders[0].name}`
            }
            description="Click any provider button above or load one of the quick comparison sets to view a full side-by-side specification matrix."
            actions={
              <button
                type="button"
                onClick={resetCompareList}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
              >
                <span>Load recommended comparison (3 providers)</span>
              </button>
            }
          />
        </div>
      ) : (
        /* Side-by-Side Comparison Matrix (Horizontally scrollable on narrow screens) */
        <section className="mt-8 rounded-2xl border border-[#E4E7EC] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4E7EC] bg-[#FAFAF7]">
                  <th className="w-52 p-5 text-xs font-semibold text-[#667085] align-top">
                    Specification
                  </th>
                  {selectedProviders.map((provider) => (
                    <th key={provider.id} className="p-5 align-top min-w-[210px]">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <ProviderEmblem
                            providerId={provider.id}
                            name={provider.name}
                            size="sm"
                          />
                          <div>
                            <Link
                              to={`/providers/${provider.id}`}
                              className="text-base font-bold text-[#14243A] hover:text-[#155EEF]"
                            >
                              {provider.name}
                            </Link>
                            <p className="text-[11px] font-normal text-[#667085]">
                              {provider.security.jurisdiction}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCompare(provider.id, provider.name)}
                          aria-label={`Remove ${provider.name} from comparison`}
                          className="text-xs text-[#667085] hover:text-[#DC2626] px-1.5 py-0.5 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4E7EC] text-sm">
                {/* Row 1: Standard Free Storage */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Standard base free
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top">
                      <span className="font-mono text-2xl font-bold tabular-nums text-[#14243A]">
                        {p.allowance.baseFreeGB} GB
                      </span>
                      <p className="text-xs text-[#667085] mt-1">
                        {p.allowance.sharedAcrossEcosystem
                          ? 'Shared with email / photos'
                          : 'Dedicated cloud drive'}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Row 2: Conditional / Referral Ceiling */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Starter & referral bonuses
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top text-xs text-[#172033]">
                      <p className="font-mono font-semibold tabular-nums text-[#155EEF]">
                        Starter steps: {p.allowance.onboardingFreeGB} GB
                      </p>
                      <p className="text-[#667085] mt-1">
                        {p.allowance.referralMaxGB !== null
                          ? `Referrals up to ${p.allowance.referralMaxGB} GB`
                          : 'No permanent referral bonus'}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Row 3: Upload & Plan Limitations */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Key free-tier limits
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top text-xs text-[#667085] leading-relaxed">
                      <ul className="space-y-1.5">
                        {p.planLimitations.slice(0, 3).map((lim, idx) => (
                          <li key={idx}>• {lim}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row 4: Privacy & Security */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Verified privacy & security
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top text-xs">
                      <p className="font-semibold text-[#14243A]">
                        {p.security.zeroKnowledgeOnFree
                          ? 'Zero-knowledge E2EE included free'
                          : 'Server-managed encryption on free tier'}
                      </p>
                      <p className="text-[#667085] mt-1 leading-relaxed">
                        {p.security.encryptionModel}
                      </p>
                      <p className="text-[#667085] mt-1.5">
                        2FA: {p.security.twoFactorAuth ? 'Yes' : 'No'} · Open-source apps:{' '}
                        {p.security.openSourceClients ? 'Yes' : 'No'}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Row 5: Supported Platforms */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Supported platforms
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top text-xs">
                      <div className="space-y-1">
                        {ALL_PLATFORMS.map((platName) => {
                          const entry = p.platforms.find((x) => x.platform === platName);
                          return (
                            <div
                              key={platName}
                              className="flex items-center justify-between gap-2"
                            >
                              <span className="text-[#667085]">{platName}</span>
                              <span
                                className={
                                  entry?.supportLevel === 'native'
                                    ? 'font-semibold text-[#14243A]'
                                    : entry?.supportLevel === 'cli_or_webdav'
                                    ? 'font-medium text-[#B45309]'
                                    : 'text-[#94A3B8]'
                                }
                              >
                                {entry?.supportLevel === 'native'
                                  ? 'Native'
                                  : entry?.supportLevel === 'cli_or_webdav'
                                  ? 'CLI'
                                  : '—'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 6: Source & Verification Status */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Verification & connection
                  </th>
                  {selectedProviders.map((p) => (
                    <td key={p.id} className="p-5 align-top space-y-2">
                      <div>
                        <VerificationIndicator
                          status={p.verificationStatus}
                          verifiedDate={p.lastVerifiedDate}
                        />
                      </div>
                      <div>
                        <IntegrationIndicator status={p.integrationStatus} />
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row 7: Official Plan Links & Workspace Actions */}
                <tr>
                  <th className="p-5 text-xs font-semibold text-[#14243A] bg-[#FAFAF7]/50 align-top">
                    Actions & official plans
                  </th>
                  {selectedProviders.map((p) => {
                    const saved = isSaved(p.id);
                    return (
                      <td key={p.id} className="p-5 align-top space-y-2.5">
                        <button
                          type="button"
                          onClick={() => toggleSaved(p.id, p.name)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                            saved
                              ? 'bg-[#14243A] text-white'
                              : 'bg-[#155EEF] hover:bg-[#0E4BD8] text-white'
                          }`}
                        >
                          {saved ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Saved in Workspace</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Save to Workspace</span>
                            </>
                          )}
                        </button>

                        <a
                          href={p.officialPricingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#E4E7EC] hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors"
                        >
                          <span>Official plans</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-[#FAFAF7] border-t border-[#E4E7EC] text-xs text-[#667085]">
            <strong className="font-semibold text-[#14243A]">Comparison methodology: </strong>
            100GB reports documented technical attributes (client-side key ownership, published
            client code, upload caps, and OS packages) rather than subjective rankings. Always
            review each provider’s current Terms of Service before uploading sensitive records.
          </div>
        </section>
      )}
    </div>
  );
}
