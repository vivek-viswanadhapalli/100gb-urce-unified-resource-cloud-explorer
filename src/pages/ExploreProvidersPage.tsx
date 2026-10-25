import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GitCompareArrows,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { getAllProviders } from '../services/providerService';
import {
  DEFAULT_FILTER_CRITERIA,
  filterAndSortProviders,
  hasActiveFilters,
} from '../lib/filterProviders';
import { ProviderFilterCriteria, SortOption } from '../types/cloud';
import { ProviderCard } from '../components/providers/ProviderCard';
import { EmptyState } from '../components/ui/Primitives';
import { useWorkspace } from '../hooks/useWorkspace';

const STORAGE_THRESHOLDS = [
  { label: 'Any size', value: 0 },
  { label: '5 GB+', value: 5 },
  { label: '10 GB+', value: 10 },
  { label: '15 GB+', value: 15 },
];

export function ExploreProvidersPage() {
  const allProviders = getAllProviders();
  const [criteria, setCriteria] = useState<ProviderFilterCriteria>(DEFAULT_FILTER_CRITERIA);
  const { preferences } = useWorkspace();

  const filteredProviders = useMemo(
    () => filterAndSortProviders(allProviders, criteria),
    [allProviders, criteria]
  );

  const filtersModified = hasActiveFilters(criteria);

  const resetFilters = () => {
    setCriteria(DEFAULT_FILTER_CRITERIA);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-[#155EEF]">Provider Directory</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
            Explore cloud storage providers
          </h1>
          <p className="mt-2.5 text-base text-[#667085] max-w-2xl">
            Search verified free cloud storage tiers, filter by zero-knowledge encryption or
            Linux desktop support, and add services to your comparison list or workspace.
          </p>
        </div>

        {preferences.compareProviderIds.length > 0 && (
          <Link
            to="/compare"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#155EEF]/30 bg-[#EBF1FF] hover:bg-[#DCE7FF] text-[#155EEF] text-xs font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <GitCompareArrows className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">
              Compare selected ({preferences.compareProviderIds.length})
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Search, Filter & Sort Toolbar */}
      <section
        aria-label="Search and filter providers"
        className="mt-8 rounded-2xl border border-[#E4E7EC] bg-white p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <label htmlFor="provider-search" className="sr-only">
              Search providers by name, feature, OS, or jurisdiction
            </label>
            <Search
              className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="provider-search"
              type="search"
              value={criteria.searchQuery}
              onChange={(e) =>
                setCriteria((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              placeholder="Search name, encryption, Linux, Switzerland, Office..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] focus:bg-white text-sm text-[#172033] placeholder:text-[#667085] transition-colors"
            />
            {criteria.searchQuery && (
              <button
                type="button"
                onClick={() => setCriteria((prev) => ({ ...prev, searchQuery: '' }))}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#667085] hover:text-[#14243A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Minimum Base Storage Segmented Control */}
          <div className="lg:col-span-4 flex items-center gap-1 p-1 rounded-xl bg-[#F3F6FB] border border-[#E4E7EC] overflow-x-auto">
            {STORAGE_THRESHOLDS.map((item) => {
              const active = criteria.minBaseStorageGB === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setCriteria((prev) => ({ ...prev, minBaseStorageGB: item.value }))
                  }
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap tabular-nums ${
                    active
                      ? 'bg-white text-[#14243A] shadow-xs'
                      : 'text-[#667085] hover:text-[#14243A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Sort Select */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <label
              htmlFor="provider-sort"
              className="text-xs font-semibold text-[#667085] whitespace-nowrap shrink-0"
            >
              Sort by
            </label>
            <select
              id="provider-sort"
              value={criteria.sortBy}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SortOption,
                }))
              }
              className="w-full px-3 py-2.5 rounded-xl border border-[#E4E7EC] bg-[#FAFAF7] text-xs font-semibold text-[#14243A]"
            >
              <option value="storage_desc">Base free storage: High to Low</option>
              <option value="onboarding_desc">With starter steps: High to Low</option>
              <option value="storage_asc">Base free storage: Low to High</option>
              <option value="name_asc">Provider name: A to Z</option>
              <option value="name_desc">Provider name: Z to A</option>
            </select>
          </div>
        </div>

        {/* Attribute Filter Toggles + Result Count */}
        <div className="mt-4 pt-4 border-t border-[#E4E7EC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#667085] mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Verified capabilities:</span>
            </span>

            <button
              type="button"
              aria-pressed={criteria.onlyZeroKnowledgeFree}
              onClick={() =>
                setCriteria((prev) => ({
                  ...prev,
                  onlyZeroKnowledgeFree: !prev.onlyZeroKnowledgeFree,
                }))
              }
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap ${
                criteria.onlyZeroKnowledgeFree
                  ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                  : 'border-[#E4E7EC] bg-white text-[#172033] hover:bg-[#F3F6FB]'
              }`}
            >
              Zero-knowledge E2EE free
            </button>

            <button
              type="button"
              aria-pressed={criteria.onlyLinuxSupported}
              onClick={() =>
                setCriteria((prev) => ({
                  ...prev,
                  onlyLinuxSupported: !prev.onlyLinuxSupported,
                }))
              }
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap ${
                criteria.onlyLinuxSupported
                  ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                  : 'border-[#E4E7EC] bg-white text-[#172033] hover:bg-[#F3F6FB]'
              }`}
            >
              Native Linux desktop client
            </button>

            <button
              type="button"
              aria-pressed={criteria.excludeSharedQuota}
              onClick={() =>
                setCriteria((prev) => ({
                  ...prev,
                  excludeSharedQuota: !prev.excludeSharedQuota,
                }))
              }
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap ${
                criteria.excludeSharedQuota
                  ? 'border-[#155EEF] bg-[#EBF1FF] text-[#155EEF]'
                  : 'border-[#E4E7EC] bg-white text-[#172033] hover:bg-[#F3F6FB]'
              }`}
            >
              Dedicated drive quota (not shared with email)
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#667085] tabular-nums">
              Showing <strong className="text-[#14243A]">{filteredProviders.length}</strong> of{' '}
              {allProviders.length} verified providers
            </span>

            {filtersModified && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-semibold text-[#155EEF] hover:text-[#0E4BD8]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Provider Grid or Empty Search State */}
      <div className="mt-8">
        {filteredProviders.length === 0 ? (
          <EmptyState
            icon={<Search className="w-6 h-6" />}
            title="No cloud providers match these filters"
            description="Try lowering the minimum base storage threshold, removing a capability constraint, or clearing your search keywords."
            actions={
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reset all filters</span>
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
