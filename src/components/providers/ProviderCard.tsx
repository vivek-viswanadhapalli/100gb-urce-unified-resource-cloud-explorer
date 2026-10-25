import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Check,
  ExternalLink,
  GitCompareArrows,
  Heart,
  Plus,
} from 'lucide-react';
import { CloudProvider } from '../../types/cloud';
import { ProviderEmblem } from '../brand/BrandLogo';
import {
  StorageBadge,
  VerificationIndicator,
  ZeroKnowledgeIndicator,
} from '../ui/Primitives';
import { useWorkspace } from '../../hooks/useWorkspace';

interface ProviderCardProps {
  provider: CloudProvider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const {
    isSaved,
    isFavorite,
    isComparing,
    toggleSaved,
    toggleFavorite,
    toggleCompare,
  } = useWorkspace();

  const saved = isSaved(provider.id);
  const favorite = isFavorite(provider.id);
  const comparing = isComparing(provider.id);

  const supportedPlatforms = provider.platforms
    .filter((p) => p.supportLevel === 'native')
    .map((p) => p.platform);

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#E4E7EC] bg-white p-6 transition-colors hover:border-[#CBD5E1]">
      <div>
        {/* Card Header: Emblem + Name + Favorite action */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <ProviderEmblem providerId={provider.id} name={provider.name} size="md" />
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#14243A] truncate">
                <Link
                  to={`/providers/${provider.id}`}
                  className="hover:text-[#155EEF] transition-colors"
                >
                  {provider.name}
                </Link>
              </h3>
              {/* Clean unboxed metadata with typographic separators */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#667085] mt-0.5">
                <VerificationIndicator status={provider.verificationStatus} />
                <span aria-hidden="true">·</span>
                <span>{provider.security.jurisdiction}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(provider.id, provider.name)}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Remove ${provider.name} from favorites`
                : `Add ${provider.name} to favorites`
            }
            title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
              favorite
                ? 'border-[#155EEF]/30 bg-[#F3F6FB] text-[#155EEF]'
                : 'border-[#E4E7EC] bg-white text-[#667085] hover:text-[#14243A] hover:bg-[#F3F6FB]'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-[#155EEF]' : ''}`} />
          </button>
        </div>

        {/* Storage Readout & Security Summary */}
        <div className="mt-5 pt-4 border-t border-[#E4E7EC] flex items-end justify-between gap-4">
          <StorageBadge
            baseGB={provider.allowance.baseFreeGB}
            onboardingGB={provider.allowance.onboardingFreeGB}
            shared={provider.allowance.sharedAcrossEcosystem}
          />
          <div className="text-right">
            <ZeroKnowledgeIndicator active={provider.security.zeroKnowledgeOnFree} />
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-[#667085] leading-relaxed">
          {provider.shortTagline}
        </p>

        {/* Key Free-Tier Condition */}
        <p className="mt-3 text-xs text-[#172033]/80 leading-relaxed">
          <span className="font-semibold text-[#14243A]">Key condition: </span>
          {provider.planLimitations[0]}
        </p>

        {/* Supported Native Platforms (unboxed inline list) */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#667085]">
          <span className="font-medium text-[#14243A]">Apps:</span>
          <span>{supportedPlatforms.join(' · ')}</span>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-[#E4E7EC] flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => toggleSaved(provider.id, provider.name)}
            aria-pressed={saved}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              saved
                ? 'bg-[#14243A] text-white hover:bg-[#1E3352]'
                : 'bg-[#155EEF] text-white hover:bg-[#0E4BD8]'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>In Workspace</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Add Workspace</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => toggleCompare(provider.id, provider.name)}
            aria-pressed={comparing}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap ${
              comparing
                ? 'border-[#155EEF] bg-[#F3F6FB] text-[#155EEF]'
                : 'border-[#E4E7EC] bg-white text-[#172033] hover:bg-[#F3F6FB]'
            }`}
          >
            <GitCompareArrows className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{comparing ? 'Comparing' : 'Compare'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs font-semibold">
          <Link
            to={`/providers/${provider.id}`}
            className="inline-flex items-center gap-1 text-[#155EEF] hover:text-[#0E4BD8] transition-colors py-1"
          >
            <span>Provider details</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>

          <a
            href={provider.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#667085] hover:text-[#14243A] transition-colors py-1"
          >
            <span>Official site</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
