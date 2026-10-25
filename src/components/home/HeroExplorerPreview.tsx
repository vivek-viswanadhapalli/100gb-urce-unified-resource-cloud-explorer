import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ExternalLink,
  FolderKanban,
  GitCompareArrows,
  HardDrive,
  Laptop,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { getAllProviders } from '../../services/providerService';
import { isLinuxSupported } from '../../lib/filterProviders';
import { ProviderEmblem } from '../brand/BrandLogo';
import { VerificationIndicator } from '../ui/Primitives';
import { useWorkspace } from '../../hooks/useWorkspace';

type PreviewPreset = 'all' | 'e2ee' | 'high_capacity' | 'linux' | 'workspace';

export function HeroExplorerPreview() {
  const providers = getAllProviders();
  const { preferences, isSaved, toggleSaved, isComparing, toggleCompare } = useWorkspace();

  const [activePreset, setActivePreset] = useState<PreviewPreset>('all');
  const [quickQuery, setQuickQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('google-drive');

  const filteredList = useMemo(() => {
    return providers.filter((p) => {
      if (quickQuery.trim()) {
        const q = quickQuery.trim().toLowerCase();
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.shortTagline.toLowerCase().includes(q) ||
          p.security.jurisdiction.toLowerCase().includes(q);
        if (!hit) return false;
      }

      if (activePreset === 'e2ee') return p.security.zeroKnowledgeOnFree;
      if (activePreset === 'high_capacity') return p.allowance.baseFreeGB >= 10;
      if (activePreset === 'linux') return isLinuxSupported(p);
      if (activePreset === 'workspace') return preferences.savedProviderIds.includes(p.id);
      return true;
    });
  }, [providers, activePreset, quickQuery, preferences.savedProviderIds]);

  const activeProvider = useMemo(() => {
    const inFiltered = filteredList.find((p) => p.id === selectedId);
    if (inFiltered) return inFiltered;
    return filteredList[0] ?? providers[0];
  }, [filteredList, selectedId, providers]);

  const workspaceBaseSum = useMemo(() => {
    return providers
      .filter((p) => preferences.savedProviderIds.includes(p.id))
      .reduce((sum, p) => sum + p.allowance.baseFreeGB, 0);
  }, [providers, preferences.savedProviderIds]);

  const sidebarItems: {
    id: PreviewPreset;
    label: string;
    count: number;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'all',
      label: 'All Providers',
      count: providers.length,
      icon: <HardDrive className="w-3.5 h-3.5" aria-hidden="true" />,
    },
    {
      id: 'e2ee',
      label: 'Zero-Knowledge Free',
      count: providers.filter((p) => p.security.zeroKnowledgeOnFree).length,
      icon: <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />,
    },
    {
      id: 'high_capacity',
      label: '10 GB+ Base Free',
      count: providers.filter((p) => p.allowance.baseFreeGB >= 10).length,
      icon: <HardDrive className="w-3.5 h-3.5" aria-hidden="true" />,
    },
    {
      id: 'linux',
      label: 'Native Linux App',
      count: providers.filter((p) => isLinuxSupported(p)).length,
      icon: <Laptop className="w-3.5 h-3.5" aria-hidden="true" />,
    },
    {
      id: 'workspace',
      label: 'Saved Workspace',
      count: preferences.savedProviderIds.length,
      icon: <FolderKanban className="w-3.5 h-3.5" aria-hidden="true" />,
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_24px_64px_-16px_rgba(20,36,58,0.10)] overflow-hidden text-left">
      {/* Window Chrome Bar */}
      <div className="px-4 sm:px-5 py-3 border-b border-[#E4E7EC] bg-[#FAFAF7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC] border border-[#CBD5E1]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC] border border-[#CBD5E1]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E4E7EC] border border-[#CBD5E1]" />
          </div>
          <span className="text-xs font-semibold text-[#14243A] tracking-tight">
            100GB Cloud Explorer — Interactive Preview
          </span>
        </div>

        {/* Live Search inside preview */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="w-3.5 h-3.5 text-[#667085] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Filter preview..."
              aria-label="Filter providers in preview"
              className="w-40 sm:w-52 pl-8 pr-3 py-1 text-xs rounded-lg border border-[#E4E7EC] bg-white text-[#172033] placeholder:text-[#667085] focus:border-[#155EEF]"
            />
          </div>

          <Link
            to="/compare"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-xs font-semibold text-[#14243A] transition-colors whitespace-nowrap"
          >
            <GitCompareArrows className="w-3.5 h-3.5 text-[#155EEF]" aria-hidden="true" />
            <span className="tabular-nums">
              Compare ({preferences.compareProviderIds.length})
            </span>
          </Link>
        </div>
      </div>

      {/* 3-Pane Application Workspace Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {/* Pane 1: Views Sidebar */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#E4E7EC] bg-[#FAFAF7]/60 p-3.5 flex flex-col justify-between">
          <div>
            <p className="px-2.5 text-[11px] font-semibold text-[#667085] mb-2">
              Discovery Views
            </p>
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
              {sidebarItems.map((item) => {
                const active = activePreset === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePreset(item.id)}
                    className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#EBF1FF] text-[#155EEF] font-semibold'
                        : 'text-[#172033] hover:bg-[#F3F6FB]'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-[#667085]">
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block mt-6 pt-4 border-t border-[#E4E7EC] px-2.5">
            <p className="text-[11px] text-[#667085]">Saved Workspace Estimate</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#14243A]">
              {workspaceBaseSum} GB{' '}
              <span className="font-sans text-xs font-normal text-[#667085]">
                across {preferences.savedProviderIds.length} saved
              </span>
            </p>
            <Link
              to="/workspace"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#155EEF] hover:text-[#0E4BD8]"
            >
              <span>Manage workspace</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Pane 2: Provider Directory List */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#E4E7EC] divide-y divide-[#E4E7EC] max-h-[430px] overflow-y-auto">
          {filteredList.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-[#14243A]">
                {activePreset === 'workspace'
                  ? 'No providers saved to your workspace yet.'
                  : 'No providers match this preview filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActivePreset('all');
                  setQuickQuery('');
                }}
                className="mt-3 text-xs font-semibold text-[#155EEF] hover:underline"
              >
                Show all 9 verified providers
              </button>
            </div>
          ) : (
            filteredList.map((provider) => {
              const isSelected = activeProvider?.id === provider.id;
              const saved = isSaved(provider.id);
              return (
                <div
                  key={provider.id}
                  onClick={() => setSelectedId(provider.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedId(provider.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`px-4 py-3 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F3F6FB]' : 'bg-white hover:bg-[#FAFAF7]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(provider.id, provider.name);
                      }}
                      aria-label={
                        saved
                          ? `Remove ${provider.name} from workspace`
                          : `Save ${provider.name} to workspace`
                      }
                      title={saved ? 'Saved in Workspace' : 'Save to Workspace'}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        saved
                          ? 'bg-[#155EEF] border-[#155EEF] text-white'
                          : 'bg-white border-[#CBD5E1] text-transparent hover:border-[#155EEF]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <ProviderEmblem
                      providerId={provider.id}
                      name={provider.name}
                      size="sm"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#14243A] truncate">
                        {provider.name}
                      </p>
                      <p className="text-[11px] text-[#667085] truncate">
                        {provider.security.zeroKnowledgeOnFree
                          ? 'Zero-knowledge E2EE'
                          : provider.allowance.sharedAcrossEcosystem
                          ? 'Shared ecosystem pool'
                          : 'Dedicated cloud quota'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#14243A]">
                      {provider.allowance.baseFreeGB} GB
                    </span>
                    {provider.allowance.onboardingFreeGB >
                      provider.allowance.baseFreeGB && (
                      <p className="font-mono text-[10px] tabular-nums text-[#155EEF]">
                        → {provider.allowance.onboardingFreeGB} GB
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pane 3: Selected Provider Plan Inspector */}
        {activeProvider && (
          <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ProviderEmblem
                    providerId={activeProvider.id}
                    name={activeProvider.name}
                    size="md"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#14243A]">
                      {activeProvider.name}
                    </h3>
                    <VerificationIndicator
                      status={activeProvider.verificationStatus}
                      verifiedDate={activeProvider.lastVerifiedDate}
                    />
                  </div>
                </div>
              </div>

              {/* Allowance Breakdown */}
              <div className="mt-4 pt-4 border-t border-[#E4E7EC] grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-[#667085] block">
                    Standard Free
                  </span>
                  <span className="font-mono text-xl font-bold tabular-nums text-[#14243A]">
                    {activeProvider.allowance.baseFreeGB} GB
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#667085] block">
                    After Starter Steps
                  </span>
                  <span className="font-mono text-xl font-bold tabular-nums text-[#155EEF]">
                    {activeProvider.allowance.onboardingFreeGB} GB
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-[#667085] leading-relaxed">
                {activeProvider.allowance.conditionSummary}
              </p>

              {/* Encryption & OS Fact Sheet */}
              <dl className="mt-4 pt-3 border-t border-[#E4E7EC] space-y-2 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-[#667085]">Free E2EE</dt>
                  <dd className="font-medium text-[#14243A] text-right">
                    {activeProvider.security.zeroKnowledgeOnFree
                      ? 'Included (Client-side)'
                      : 'Not on free tier'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#667085]">Jurisdiction</dt>
                  <dd className="font-medium text-[#14243A] text-right">
                    {activeProvider.security.jurisdiction}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-[#667085]">Account link</dt>
                  <dd className="text-[#667085] text-right">
                    Not connected · Web launch
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E4E7EC] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSaved(activeProvider.id, activeProvider.name)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-xs font-semibold transition-colors"
                >
                  {isSaved(activeProvider.id) ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Save</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => toggleCompare(activeProvider.id, activeProvider.name)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E4E7EC] hover:bg-[#F3F6FB] text-[#14243A] text-xs font-semibold transition-colors"
                >
                  <span>{isComparing(activeProvider.id) ? 'Comparing' : '+ Compare'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <Link
                  to={`/providers/${activeProvider.id}`}
                  className="text-[#155EEF] hover:underline inline-flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <a
                  href={activeProvider.officialPricingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#667085] hover:text-[#14243A] inline-flex items-center gap-1"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
