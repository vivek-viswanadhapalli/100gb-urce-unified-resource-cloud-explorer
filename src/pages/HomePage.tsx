import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  GitCompareArrows,
  ShieldCheck,
} from 'lucide-react';
import { HeroExplorerPreview } from '../components/home/HeroExplorerPreview';
import { ProviderCard } from '../components/providers/ProviderCard';
import { getAllProviders, getFeaturedProviders } from '../services/providerService';
import { ProviderEmblem } from '../components/brand/BrandLogo';

export function HomePage() {
  const featuredProviders = getFeaturedProviders();
  const allProviders = getAllProviders();

  return (
    <div>
      {/* HERO SECTION — Inspired by Reference B's crisp editorial geometry & routing lines */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24">
        {/* Subtle orthogonal architectural routing lines (desktop only, decorative) */}
        <svg
          className="hidden xl:block absolute inset-x-0 top-0 w-full h-[560px] pointer-events-none select-none"
          viewBox="0 0 1440 560"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
        >
          {/* Left converging provider tracks */}
          <path
            d="M48 0 V96 Q48 116 68 116 H232 Q252 116 252 136 V268"
            stroke="#155EEF"
            strokeOpacity="0.22"
            strokeWidth="1.5"
          />
          <path
            d="M0 196 H120 Q140 196 140 216 V324 Q140 344 160 344 H512"
            stroke="#22D3EE"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <path
            d="M0 408 H172 Q192 408 192 388 V364 Q192 344 212 344 H300 Q320 344 320 364 V460"
            stroke="#155EEF"
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />

          {/* Right converging provider tracks */}
          <path
            d="M1392 0 V84 Q1392 104 1372 104 H1204 Q1184 104 1184 124 V256"
            stroke="#14243A"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
          <path
            d="M1440 212 H1308 Q1288 212 1288 232 V324 Q1288 344 1268 344 H928"
            stroke="#155EEF"
            strokeOpacity="0.28"
            strokeWidth="1.5"
          />
          <path
            d="M1440 420 H1260 Q1240 420 1240 398 V364 Q1240 344 1220 344 H1120 Q1100 344 1100 364 V460"
            stroke="#0EA5E9"
            strokeOpacity="0.32"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold text-[#155EEF] tracking-tight">
            100GB · Unified Cloud Explorer
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-[#14243A] leading-[1.08] max-w-3xl mx-auto">
            All your cloud options. One smarter place.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed">
            Discover free cloud storage, compare plans, and find the right space for every file.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/providers"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] active:bg-[#0B3FB8] text-white text-sm font-semibold transition-colors whitespace-nowrap shadow-sm"
            >
              <span>Explore cloud storage</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              to="/compare"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-[#14243A] text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <span>Compare providers</span>
            </Link>
          </div>

          {/* Unboxed quiet metadata line matching Reference B */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-[#667085]">
            <span>9 verified cloud services</span>
            <span aria-hidden="true">·</span>
            <span>Official plan sources attributed</span>
            <span aria-hidden="true">·</span>
            <span>Local-first browser workspace</span>
            <span aria-hidden="true">·</span>
            <span>No sign-up required</span>
          </div>

          {/* Real Interactive Application Preview */}
          <div className="mt-12 sm:mt-14">
            <HeroExplorerPreview />
          </div>
        </div>
      </section>

      {/* SECTION 2: DISCOVER FREE STORAGE (Truthfulness & Nuance Asymmetric Grid) */}
      <section className="py-20 bg-[#F3F6FB] border-y border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243A]">
              Free cloud storage is rarely a single flat number.
            </h2>
            <p className="mt-3 text-base text-[#667085] leading-relaxed">
              Advertised free tiers often mix unconditional storage with shared email pools,
              onboarding checklists, or single-file upload ceilings. 100GB separates every
              condition clearly before you commit your files.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Wide 7-col breakdown table */}
            <div className="lg:col-span-7 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
                <h3 className="text-base font-bold text-[#14243A]">
                  How 100GB classifies free storage allowances
                </h3>
                <span className="text-xs text-[#667085]">Verified Oct 2026</span>
              </div>

              <div className="mt-4 divide-y divide-[#E4E7EC] text-sm">
                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#14243A]">1. Standard Base Free</p>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Available immediately upon account signup without referrals or extra installs.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#14243A] shrink-0">
                    e.g. MEGA 20 GB · Box 10 GB
                  </span>
                </div>

                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#14243A]">2. Shared Ecosystem Pool</p>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Counted alongside your email attachments or mobile photo backups.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#155EEF] shrink-0">
                    Google Drive 15 GB · OneDrive 5 GB
                  </span>
                </div>

                <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#14243A]">3. Conditional Onboarding Space</p>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Unlocked after completing first-party starter checklists (app setup, recovery key).
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#B45309] shrink-0">
                    Proton 2→5 GB · pCloud 2→7 GB
                  </span>
                </div>

                <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#14243A]">4. Referral & Promotional Bonuses</p>
                    <p className="text-xs text-[#667085] mt-0.5">
                      Earned by inviting friends or temporary promos. Documented separately, never inflated into base totals.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#667085] shrink-0">
                    Excluded from base sum
                  </span>
                </div>
              </div>
            </div>

            {/* 5-col clarification card */}
            <div className="lg:col-span-5 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#14243A]">
                  What 100GB is — and what it is not
                </h3>
                <p className="mt-3 text-sm text-[#667085] leading-relaxed">
                  100GB is a discovery, comparison, and workspace organization tool. It does{' '}
                  <strong className="font-semibold text-[#14243A]">not</strong> host your files
                  or automatically grant 100 GB of unified cloud storage.
                </p>
                <p className="mt-3 text-sm text-[#667085] leading-relaxed">
                  Across the 9 documented providers, immediate base free tiers add up to{' '}
                  <span className="font-mono font-semibold tabular-nums text-[#14243A]">62 GB</span>{' '}
                  (or{' '}
                  <span className="font-mono font-semibold tabular-nums text-[#14243A]">70 GB</span>{' '}
                  after free first-party starter steps) across separate accounts — each governed
                  by its own upload limits and terms.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#E4E7EC] flex items-center justify-between gap-4">
                <Link
                  to="/calculator"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:text-[#0E4BD8] transition-colors"
                >
                  <Calculator className="w-4 h-4" aria-hidden="true" />
                  <span>Estimate your required GB</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PROVIDERS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243A]">
                Featured cloud providers
              </h2>
              <p className="mt-2 text-base text-[#667085]">
                Compare mainstream collaboration ecosystems alongside zero-knowledge encrypted vaults.
              </p>
            </div>
            <Link
              to="/providers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#155EEF] hover:text-[#0E4BD8] whitespace-nowrap"
            >
              <span>View all {allProviders.length} providers</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW IT WORKS (Clean Editorial Numbering 01, 02, 03) */}
      <section className="py-20 bg-white border-y border-[#E4E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243A]">
              How 100GB fits into your file workflow
            </h2>
            <p className="mt-2 text-base text-[#667085]">
              Three deliberate steps from estimating your storage footprint to organizing your personal provider lineup.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="pt-5 border-t border-[#E4E7EC]">
              <h3 className="text-lg font-bold text-[#14243A]">
                01. Estimate what you actually need
              </h3>
              <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
                Enter your photo count, video clips, and coursework documents in the Storage
                Calculator to convert megabytes into a realistic gigabyte target before choosing a plan.
              </p>
              <Link
                to="/calculator"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#155EEF] hover:underline"
              >
                <span>Open Storage Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="pt-5 border-t border-[#E4E7EC]">
              <h3 className="text-lg font-bold text-[#14243A]">
                02. Compare real limits side by side
              </h3>
              <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
                Inspect single-file upload limits (such as Box’s 250 MB cap), device sync caps
                (Dropbox’s 3-device limit), native Linux clients, and free zero-knowledge encryption.
              </p>
              <Link
                to="/compare"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#155EEF] hover:underline"
              >
                <span>Compare selected providers</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="pt-5 border-t border-[#E4E7EC]">
              <h3 className="text-lg font-bold text-[#14243A]">
                03. Organize your Personal Workspace
              </h3>
              <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
                Save your preferred providers, record notes on which folder belongs where, track
                your informational allowance total, and launch official web apps from one calm hub.
              </p>
              <Link
                to="/workspace"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#155EEF] hover:underline"
              >
                <span>Go to Personal Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMPARE BEFORE CHOOSING & PERSONAL WORKSPACE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Compare Highlight */}
          <div className="lg:col-span-7 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
                <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
                <span>Side-by-side Matrix</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-[#14243A]">
                Compare before choosing where your files live
              </h2>
              <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
                Choosing solely by storage size can lead to surprises later. Compare encryption
                key ownership, Linux compatibility, and transfer quotas across up to four
                services simultaneously.
              </p>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E4E7EC] text-[#667085]">
                      <th className="py-2.5 pr-4 font-semibold">Provider</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Base Free</th>
                      <th className="py-2.5 px-3 font-semibold">Free E2EE</th>
                      <th className="py-2.5 pl-3 font-semibold">Notable Condition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E7EC]">
                    {allProviders.slice(0, 5).map((p) => (
                      <tr key={p.id}>
                        <td className="py-2.5 pr-4 font-semibold text-[#14243A]">
                          <div className="flex items-center gap-2">
                            <ProviderEmblem providerId={p.id} name={p.name} size="sm" />
                            <span>{p.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-semibold tabular-nums text-right text-[#14243A]">
                          {p.allowance.baseFreeGB} GB
                        </td>
                        <td className="py-2.5 px-3 text-[#172033]">
                          {p.security.zeroKnowledgeOnFree ? 'Yes (Client-side)' : 'No'}
                        </td>
                        <td className="py-2.5 pl-3 text-[#667085]">
                          {p.id === 'google-drive' && 'Shared with Gmail & Photos'}
                          {p.id === 'mega' && 'Rolling bandwidth transfer cap'}
                          {p.id === 'microsoft-onedrive' && 'Shared with Outlook attachments'}
                          {p.id === 'proton-drive' && '2 GB initial → 5 GB starter steps'}
                          {p.id === 'box' && '250 MB max single-file upload'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#E4E7EC]">
              <Link
                to="/compare"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14243A] hover:bg-[#1E3352] text-white text-xs font-semibold transition-colors"
              >
                <span>Open full comparison table</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Personal Workspace + Data Transparency */}
          <div className="lg:col-span-5 rounded-2xl border border-[#E4E7EC] bg-[#F3F6FB] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#14243A]">
                <ShieldCheck className="w-4 h-4 text-[#155EEF]" aria-hidden="true" />
                <span>Local-First Privacy & Honest Status</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-[#14243A]">
                Your Personal Workspace stays in your browser
              </h2>
              <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
                Save favorite providers, assign folder roles, and launch official web apps
                without creating another account or handing over cloud passwords.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-[#172033]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    Preferences persist locally via <code className="font-mono text-xs">localStorage</code> across refreshes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    Every storage figure links directly to the provider’s official pricing documentation.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>
                    Opening an official website is never misrepresented as a live OAuth account connection.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-[#CBD5E1]/60 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/workspace"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-xs font-semibold transition-colors"
              >
                <FolderKanban className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Open Personal Workspace</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#14243A] hover:text-[#155EEF]"
              >
                <span>Read system architecture</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 sm:px-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243A] max-w-xl mx-auto">
              Ready to map out your cloud storage lineup?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#667085] max-w-xl mx-auto">
              Browse all nine verified services, estimate your storage needs, and save your preferred combination in seconds.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/providers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
              >
                <span>Explore cloud storage</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-[#14243A] text-sm font-semibold transition-colors"
              >
                <span>Estimate storage needs</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
