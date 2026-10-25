import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ExternalLink,
  GitCompareArrows,
  Heart,
  Info,
  Plus,
  ShieldCheck,
  Unplug,
} from 'lucide-react';
import { getProviderById, getRelatedProviders } from '../services/providerService';
import { getProviderAdapter } from '../services/integrationAdapter';
import { ProviderEmblem } from '../components/brand/BrandLogo';
import {
  EmptyState,
  IntegrationIndicator,
  VerificationIndicator,
} from '../components/ui/Primitives';
import { ProviderCard } from '../components/providers/ProviderCard';
import { useWorkspace } from '../hooks/useWorkspace';

export function ProviderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const provider = getProviderById(id);
  const {
    isSaved,
    isFavorite,
    isComparing,
    toggleSaved,
    toggleFavorite,
    toggleCompare,
  } = useWorkspace();

  if (!provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={<AlertCircle className="w-6 h-6" />}
          title="Provider record not found"
          description={`No verified cloud provider matches the identifier "${id ?? ''}". Browse the directory to inspect all nine verified cloud storage providers.`}
          actions={
            <>
              <Link
                to="/providers"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
              >
                <span>Browse provider directory</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-[#14243A] text-sm font-semibold transition-colors"
              >
                <span>Return home</span>
              </Link>
            </>
          }
        />
      </div>
    );
  }

  const saved = isSaved(provider.id);
  const favorite = isFavorite(provider.id);
  const comparing = isComparing(provider.id);
  const relatedProviders = getRelatedProviders(provider, 3);
  const adapter = getProviderAdapter(provider.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Contextual Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#667085]">
        <Link
          to="/providers"
          className="inline-flex items-center gap-1 font-medium hover:text-[#14243A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Explore Providers</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-[#14243A]">{provider.name}</span>
      </nav>

      {/* Provider Hero Header */}
      <section className="mt-5 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <ProviderEmblem providerId={provider.id} name={provider.name} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#667085]">
                <VerificationIndicator
                  status={provider.verificationStatus}
                  verifiedDate={provider.lastVerifiedDate}
                />
                <span aria-hidden="true">·</span>
                <span>{provider.security.jurisdiction}</span>
                <span aria-hidden="true">·</span>
                <IntegrationIndicator status={provider.integrationStatus} />
              </div>

              <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
                {provider.name}
              </h1>
              <p className="mt-2.5 text-base text-[#667085] max-w-2xl leading-relaxed">
                {provider.description}
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleSaved(provider.id, provider.name)}
              aria-pressed={saved}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
                saved
                  ? 'bg-[#14243A] text-white hover:bg-[#1E3352]'
                  : 'bg-[#155EEF] text-white hover:bg-[#0E4BD8]'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Saved in Workspace</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Workspace</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(provider.id, provider.name)}
              aria-pressed={favorite}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-semibold transition-colors whitespace-nowrap ${
                favorite
                  ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                  : 'border-[#E4E7EC] bg-white text-[#14243A] hover:bg-[#F3F6FB]'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-[#155EEF]' : ''}`} aria-hidden="true" />
              <span>{favorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              type="button"
              onClick={() => toggleCompare(provider.id, provider.name)}
              aria-pressed={comparing}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-xs font-semibold transition-colors whitespace-nowrap ${
                comparing
                  ? 'border-[#155EEF] bg-[#F3F6FB] text-[#155EEF]'
                  : 'border-[#E4E7EC] bg-white text-[#14243A] hover:bg-[#F3F6FB]'
              }`}
            >
              <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
              <span>{comparing ? 'In Compare' : 'Compare'}</span>
            </button>

            <a
              href={provider.webLaunchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E4E7EC] bg-[#FAFAF7] hover:bg-[#F3F6FB] text-[#14243A] text-xs font-semibold transition-colors whitespace-nowrap"
            >
              <span>Launch {provider.name}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Structured Allowance Metrics Strip */}
        <div className="mt-8 pt-6 border-t border-[#E4E7EC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-xs font-medium text-[#667085] block">
              Standard Base Free
            </span>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#14243A]">
              {provider.allowance.baseFreeGB} GB
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              {provider.allowance.sharedAcrossEcosystem
                ? 'Shared across account ecosystem'
                : 'Dedicated cloud drive pool'}
            </p>
          </div>

          <div>
            <span className="text-xs font-medium text-[#667085] block">
              After Free Starter Steps
            </span>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#155EEF]">
              {provider.allowance.onboardingFreeGB} GB
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              {provider.allowance.onboardingFreeGB > provider.allowance.baseFreeGB
                ? `+${provider.allowance.onboardingFreeGB - provider.allowance.baseFreeGB} GB via first-party checklist`
                : 'No extra onboarding steps required'}
            </p>
          </div>

          <div>
            <span className="text-xs font-medium text-[#667085] block">
              Referral Ceiling
            </span>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#14243A]">
              {provider.allowance.referralMaxGB !== null
                ? `Up to ${provider.allowance.referralMaxGB} GB`
                : 'None permanent'}
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              {provider.allowance.referralMaxGB !== null
                ? 'Requires inviting friends'
                : 'No permanent referral bonus'}
            </p>
          </div>

          <div>
            <span className="text-xs font-medium text-[#667085] block">
              Free Zero-Knowledge E2EE
            </span>
            <p className="mt-1 text-lg font-bold text-[#14243A]">
              {provider.security.zeroKnowledgeOnFree
                ? 'Included by default'
                : 'Not included on free plan'}
            </p>
            <p className="mt-0.5 text-xs text-[#667085]">
              {provider.security.twoFactorAuth ? '2FA supported' : 'Standard auth'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Split Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns: Conditions, Features, OS Support */}
        <div className="lg:col-span-8 space-y-8">
          {/* Allowance Conditions & Plan Limitations */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[#14243A]">
              Free plan conditions & limitations
            </h2>
            <p className="mt-2 text-sm text-[#667085] leading-relaxed">
              {provider.allowance.conditionSummary}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-[#F3F6FB] border border-[#E4E7EC] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#155EEF] mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-xs text-[#172033] leading-relaxed">
                <strong className="font-semibold text-[#14243A]">
                  Upload & transfer rules:{' '}
                </strong>
                {provider.allowance.uploadAndTransferLimits}
              </p>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-[#172033]">
              {provider.planLimitations.map((limit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <AlertCircle
                    className="w-4 h-4 text-[#B45309] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Verified Features & Best Use Cases */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[#14243A]">
              Verified capabilities & recommended uses
            </h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {provider.verifiedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-[#172033]"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#E4E7EC]">
              <h3 className="text-xs font-semibold text-[#667085]">
                Well suited for
              </h3>
              <ul className="mt-2.5 space-y-2 text-sm text-[#14243A] font-medium">
                {provider.bestSuitedFor.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Supported Platforms Table */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
            <h2 className="text-xl font-bold text-[#14243A]">
              Platform & client support
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E4E7EC] text-xs text-[#667085]">
                    <th className="py-2.5 pr-4 font-semibold">Platform</th>
                    <th className="py-2.5 px-4 font-semibold">Availability</th>
                    <th className="py-2.5 pl-4 font-semibold">Verified Client Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E7EC]">
                  {provider.platforms.map((entry) => (
                    <tr key={entry.platform}>
                      <td className="py-3 pr-4 font-semibold text-[#14243A]">
                        {entry.platform}
                      </td>
                      <td className="py-3 px-4">
                        {entry.supportLevel === 'native' && (
                          <span className="text-xs font-semibold text-[#15803D]">
                            Official native app
                          </span>
                        )}
                        {entry.supportLevel === 'cli_or_webdav' && (
                          <span className="text-xs font-semibold text-[#B45309]">
                            CLI / WebDAV only
                          </span>
                        )}
                        {entry.supportLevel === 'none' && (
                          <span className="text-xs text-[#667085]">
                            No official desktop app
                          </span>
                        )}
                      </td>
                      <td className="py-3 pl-4 text-xs text-[#667085]">
                        {entry.note ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right 4 Columns: Security, Sources, Integration Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Privacy & Security Profile */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Security & Privacy</span>
            </div>
            <h2 className="mt-1.5 text-lg font-bold text-[#14243A]">
              Encryption architecture
            </h2>
            <p className="mt-2 text-xs text-[#667085] leading-relaxed">
              {provider.security.encryptionModel}
            </p>

            <dl className="mt-4 pt-4 border-t border-[#E4E7EC] space-y-2.5 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[#667085]">Zero-knowledge free</dt>
                <dd className="font-semibold text-[#14243A]">
                  {provider.security.zeroKnowledgeOnFree ? 'Yes' : 'No'}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#667085]">Two-factor auth (2FA)</dt>
                <dd className="font-semibold text-[#14243A]">
                  {provider.security.twoFactorAuth ? 'Supported' : 'Not verified'}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#667085]">Open-source client code</dt>
                <dd className="font-semibold text-[#14243A]">
                  {provider.security.openSourceClients ? 'Published' : 'Proprietary'}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#667085]">Jurisdiction</dt>
                <dd className="font-semibold text-[#14243A]">
                  {provider.security.jurisdiction}
                </dd>
              </div>
            </dl>

            <ul className="mt-4 pt-4 border-t border-[#E4E7EC] space-y-2 text-xs text-[#667085]">
              {provider.security.verifiedHighlights.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </section>

          {/* Official Plan & Source Attribution */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6">
            <h2 className="text-lg font-bold text-[#14243A]">
              Official links & sources
            </h2>
            <p className="mt-1.5 text-xs text-[#667085] leading-relaxed">
              Plan allowances change over time. Always confirm current terms directly on{' '}
              {provider.name}’s official pages.
            </p>

            <div className="mt-4 space-y-2.5">
              {provider.sources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 p-3 rounded-xl border border-[#E4E7EC] hover:bg-[#F3F6FB] transition-colors text-xs"
                >
                  <div>
                    <p className="font-semibold text-[#14243A]">{src.label}</p>
                    <p className="text-[11px] text-[#667085] mt-0.5 tabular-nums">
                      Verified {src.verifiedDate}
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#155EEF] shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          {/* Honest Account Connection Status */}
          <section className="rounded-2xl border border-[#E4E7EC] bg-[#F3F6FB] p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#14243A]">
              <Unplug className="w-4 h-4 text-[#667085]" aria-hidden="true" />
              <span>Integration Status</span>
            </div>
            <p className="mt-2 text-xs text-[#667085] leading-relaxed">
              {provider.integrationSummary}
            </p>
            <div className="mt-3 pt-3 border-t border-[#CBD5E1]/60 text-[11px] text-[#667085] space-y-1">
              <p>
                <strong className="text-[#14243A]">Protocol:</strong>{' '}
                {adapter.spec.oauthProtocol}
              </p>
              {adapter.spec.requiredReadOnlyScopes.length > 0 && (
                <p className="font-mono break-all">
                  Scope: {adapter.spec.requiredReadOnlyScopes.join(', ')}
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Related Providers */}
      <section className="mt-16 pt-12 border-t border-[#E4E7EC]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[#14243A]">
              Comparable cloud providers
            </h2>
            <p className="mt-1 text-sm text-[#667085]">
              Explore alternatives with related capacity or privacy characteristics.
            </p>
          </div>
          <Link
            to="/compare"
            className="text-xs font-semibold text-[#155EEF] hover:underline whitespace-nowrap"
          >
            Compare side by side →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProviders.map((rel) => (
            <ProviderCard key={rel.id} provider={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
