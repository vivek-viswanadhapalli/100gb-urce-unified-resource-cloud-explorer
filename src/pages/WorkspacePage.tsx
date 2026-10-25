import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ExternalLink,
  FolderKanban,
  Heart,
  Info,
  Plus,
  Sparkles,
  Trash2,
  Unplug,
} from 'lucide-react';
import { useWorkspace } from '../hooks/useWorkspace';
import { getProvidersByIds } from '../services/providerService';
import { computeWorkspaceSummary } from '../lib/workspaceSummary';
import { getAllIntegrationSpecs } from '../services/integrationAdapter';
import { ProviderEmblem } from '../components/brand/BrandLogo';
import {
  Dialog,
  EmptyState,
  IntegrationIndicator,
  VerificationIndicator,
} from '../components/ui/Primitives';

export function WorkspacePage() {
  const {
    preferences,
    toggleSaved,
    toggleFavorite,
    isFavorite,
    isSaved,
    updateNote,
    setAllowanceMode,
    loadStarterWorkspace,
    clearAllSaved,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<'saved' | 'favorites'>('saved');
  const [adapterModalOpen, setAdapterModalOpen] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const savedProviders = useMemo(
    () => getProvidersByIds(preferences.savedProviderIds),
    [preferences.savedProviderIds]
  );

  const favoriteProviders = useMemo(
    () => getProvidersByIds(preferences.favoriteProviderIds),
    [preferences.favoriteProviderIds]
  );

  const summary = useMemo(
    () => computeWorkspaceSummary(savedProviders, preferences.allowanceMode),
    [savedProviders, preferences.allowanceMode]
  );

  const integrationSpecs = useMemo(() => getAllIntegrationSpecs(), []);

  const displayedProviders =
    activeTab === 'saved' ? savedProviders : favoriteProviders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-[#155EEF]">Local-First Preferences</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
            Personal Cloud Workspace
          </h1>
          <p className="mt-2.5 text-base text-[#667085] max-w-2xl">
            Organize your chosen cloud storage services, record folder allocation notes,
            review your informational free allowance total, and launch official web apps.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setAdapterModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors whitespace-nowrap"
          >
            <Unplug className="w-3.5 h-3.5 text-[#155EEF]" aria-hidden="true" />
            <span>Connection & OAuth architecture</span>
          </button>

          {(savedProviders.length > 0 || favoriteProviders.length > 0) && (
            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] hover:text-[#DC2626] text-xs font-semibold text-[#667085] transition-colors whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Clear workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Honest Connection Distinction Callout */}
      <div className="mt-6 rounded-2xl border border-[#E4E7EC] bg-[#F3F6FB] p-4 sm:p-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#155EEF] mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-xs text-[#172033] leading-relaxed">
          <strong className="font-semibold text-[#14243A]">
            Saved in Workspace ≠ Connected Cloud Account:{' '}
          </strong>
          Your selections and notes are saved locally in this browser via{' '}
          <code className="font-mono">localStorage</code> without any login. Clicking{' '}
          <strong className="font-semibold">Launch Web App</strong> opens the provider’s
          official website in a new tab — 100GB never intercepts your cloud credentials or
          simulates fake file listings.
        </p>
      </div>

      {/* Combined Allowance Summary Card */}
      <section className="mt-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E4E7EC]">
          <div>
            <h2 className="text-lg font-bold text-[#14243A]">
              Saved Workspace Allowance Estimate
            </h2>
            <p className="text-xs text-[#667085] mt-0.5">
              Informational sum across your {summary.providerCount} saved workspace{' '}
              {summary.providerCount === 1 ? 'provider' : 'providers'}.
            </p>
          </div>

          {/* Segmented Mode Control */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#F3F6FB] border border-[#E4E7EC] self-start">
            <button
              type="button"
              onClick={() => setAllowanceMode('base')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                preferences.allowanceMode === 'base'
                  ? 'bg-white text-[#14243A] shadow-xs'
                  : 'text-[#667085] hover:text-[#14243A]'
              }`}
            >
              Immediate base free
            </button>
            <button
              type="button"
              onClick={() => setAllowanceMode('onboarding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                preferences.allowanceMode === 'onboarding'
                  ? 'bg-white text-[#14243A] shadow-xs'
                  : 'text-[#667085] hover:text-[#14243A]'
              }`}
            >
              With starter steps
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-xs text-[#667085] block">Informational Total</span>
            <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums text-[#14243A]">
              {summary.activeTotalGB} GB
            </p>
            <span className="text-[11px] text-[#667085]">
              {preferences.allowanceMode === 'base'
                ? 'Unconditional Day-1 total'
                : 'Includes free starter steps'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block">Saved Providers</span>
            <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums text-[#14243A]">
              {summary.providerCount}
            </p>
            <span className="text-[11px] text-[#667085]">
              {favoriteProviders.length} marked as favorite
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block">Zero-Knowledge E2EE</span>
            <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums text-[#155EEF]">
              {summary.zeroKnowledgeCount}
            </p>
            <span className="text-[11px] text-[#667085]">
              Client-side encrypted on free plan
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block">Live API Connections</span>
            <p className="mt-1 font-mono text-3xl font-extrabold tabular-nums text-[#667085]">
              0
            </p>
            <span className="text-[11px] text-[#667085]">
              Local-only mode · Web launch active
            </span>
          </div>
        </div>

        {summary.caveats.length > 0 && (
          <div className="mt-6 pt-5 border-t border-[#E4E7EC] space-y-2">
            {summary.caveats.map((caveat, idx) => (
              <p
                key={idx}
                className="text-xs text-[#667085] flex items-start gap-2 leading-relaxed"
              >
                <AlertCircle
                  className="w-3.5 h-3.5 text-[#B45309] mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{caveat}</span>
              </p>
            ))}
          </div>
        )}
      </section>

      {/* Tabs: Saved Workspace vs Favorites */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E7EC] pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors tabular-nums ${
              activeTab === 'saved'
                ? 'bg-[#14243A] text-white'
                : 'text-[#667085] hover:text-[#14243A] hover:bg-white'
            }`}
          >
            Saved Workspace ({savedProviders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors tabular-nums ${
              activeTab === 'favorites'
                ? 'bg-[#14243A] text-white'
                : 'text-[#667085] hover:text-[#14243A] hover:bg-white'
            }`}
          >
            Favorite Providers ({favoriteProviders.length})
          </button>
        </div>

        <Link
          to="/providers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:text-[#0E4BD8]"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>Add more providers</span>
        </Link>
      </div>

      {/* Workspace Provider Rows or Empty State */}
      <div className="mt-6">
        {displayedProviders.length === 0 ? (
          <EmptyState
            icon={
              activeTab === 'saved' ? (
                <FolderKanban className="w-6 h-6" />
              ) : (
                <Heart className="w-6 h-6" />
              )
            }
            title={
              activeTab === 'saved'
                ? 'Your Personal Workspace is currently empty'
                : 'No favorite providers marked yet'
            }
            description={
              activeTab === 'saved'
                ? 'Add cloud providers from the directory to organize which service holds your coursework, photos, or encrypted backups — or load a balanced 4-provider starter lineup.'
                : 'Click the heart button on any provider card to bookmark your preferred cloud services here.'
            }
            actions={
              <>
                <Link
                  to="/providers"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
                >
                  <span>Browse provider directory</span>
                </Link>
                {activeTab === 'saved' && (
                  <button
                    type="button"
                    onClick={loadStarterWorkspace}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-[#14243A] text-sm font-semibold transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#155EEF]" aria-hidden="true" />
                    <span>Load 4-provider starter setup</span>
                  </button>
                )}
              </>
            }
          />
        ) : (
          <div className="space-y-4">
            {displayedProviders.map((provider) => {
              const fav = isFavorite(provider.id);
              const saved = isSaved(provider.id);
              const note = preferences.providerNotes[provider.id] ?? '';

              return (
                <article
                  key={provider.id}
                  className="rounded-2xl border border-[#E4E7EC] bg-white p-5 sm:p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <ProviderEmblem
                        providerId={provider.id}
                        name={provider.name}
                        size="md"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <Link
                            to={`/providers/${provider.id}`}
                            className="text-lg font-bold text-[#14243A] hover:text-[#155EEF]"
                          >
                            {provider.name}
                          </Link>
                          <span className="font-mono text-sm font-semibold tabular-nums text-[#155EEF]">
                            {preferences.allowanceMode === 'onboarding'
                              ? `${provider.allowance.onboardingFreeGB} GB`
                              : `${provider.allowance.baseFreeGB} GB`}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#667085]">
                          <VerificationIndicator status={provider.verificationStatus} />
                          <span aria-hidden="true">·</span>
                          <IntegrationIndicator status={provider.integrationStatus} />
                        </div>
                      </div>
                    </div>

                    {/* Launch & Manage Controls */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <a
                        href={provider.webLaunchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Launch Web App</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(provider.id, provider.name)}
                        aria-pressed={fav}
                        aria-label={
                          fav
                            ? `Unfavorite ${provider.name}`
                            : `Favorite ${provider.name}`
                        }
                        className={`p-2 rounded-lg border transition-colors ${
                          fav
                            ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                            : 'border-[#E4E7EC] bg-white text-[#667085] hover:text-[#14243A]'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${fav ? 'fill-[#155EEF]' : ''}`} />
                      </button>

                      {activeTab === 'saved' ? (
                        <button
                          type="button"
                          onClick={() => toggleSaved(provider.id, provider.name)}
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E4E7EC] hover:bg-[#FEF2F2] hover:border-[#FECACA] hover:text-[#DC2626] text-xs font-semibold text-[#667085] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Remove</span>
                        </button>
                      ) : (
                        !saved && (
                          <button
                            type="button"
                            onClick={() => toggleSaved(provider.id, provider.name)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-[#E4E7EC] hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Add to Workspace</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Personal Folder Allocation Note */}
                  <div className="mt-4 pt-4 border-t border-[#E4E7EC]">
                    <label
                      htmlFor={`note-${provider.id}`}
                      className="block text-xs font-semibold text-[#667085]"
                    >
                      Personal folder purpose note (saved automatically in this browser)
                    </label>
                    <input
                      id={`note-${provider.id}`}
                      type="text"
                      value={note}
                      onChange={(e) => updateNote(provider.id, e.target.value)}
                      placeholder={`e.g. Store ${
                        provider.security.zeroKnowledgeOnFree
                          ? 'encrypted personal IDs & archives'
                          : 'shared coursework & slides'
                      } in ${provider.name}...`}
                      className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white text-xs text-[#172033] placeholder:text-[#94A3B8]"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Dialog 1: Integration & OAuth Architecture */}
      <Dialog
        open={adapterModalOpen}
        onClose={() => setAdapterModalOpen(false)}
        title="Provider Integration & Security Architecture"
        description="Why 100GB V1/V2 separates saved workspace preferences from live cloud account connections."
      >
        <div className="space-y-4 text-xs text-[#667085] leading-relaxed">
          <p>
            Real access to cloud storage quotas or file trees requires official provider
            developer credentials, OAuth 2.0 PKCE user consent, and secure server-side
            token exchange. To keep 100GB runnable locally without secrets, databases, or
            privacy risks, V1 and V2 operate strictly in local-first mode.
          </p>

          <div className="overflow-x-auto border border-[#E4E7EC] rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4E7EC] bg-[#FAFAF7] text-[#14243A]">
                  <th className="p-3 font-semibold">Provider ID</th>
                  <th className="p-3 font-semibold">V3 Protocol</th>
                  <th className="p-3 font-semibold">Architectural Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {integrationSpecs.map((spec) => (
                  <tr key={spec.providerId}>
                    <td className="p-3 font-mono font-semibold text-[#14243A]">
                      {spec.providerId}
                    </td>
                    <td className="p-3 whitespace-nowrap">{spec.oauthProtocol}</td>
                    <td className="p-3">{spec.architecturalRequirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setAdapterModalOpen(false)}
              className="px-4 py-2 rounded-full bg-[#14243A] text-white font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>

      {/* Dialog 2: Confirm Clear Workspace */}
      <Dialog
        open={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        title="Clear Personal Workspace?"
        description="This removes your saved workspace providers, favorites, and personal folder notes from local browser storage."
      >
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setConfirmClearOpen(false)}
            className="px-4 py-2 rounded-full border border-[#E4E7EC] text-xs font-semibold text-[#14243A] hover:bg-[#F3F6FB]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              clearAllSaved();
              setConfirmClearOpen(false);
            }}
            className="px-4 py-2 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-semibold text-white"
          >
            Clear saved preferences
          </button>
        </div>
      </Dialog>
    </div>
  );
}
