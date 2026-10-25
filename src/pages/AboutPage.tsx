import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Layers, Lock, ServerOff } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Header */}
      <header>
        <p className="text-xs font-semibold text-[#155EEF]">
          Project Documentation & System Overview
        </p>
        <h1 className="mt-1.5 text-3xl sm:text-4xl font-extrabold text-[#14243A]">
          About 100GB — Unified Cloud Explorer
        </h1>
        <p className="mt-3 text-base text-[#667085] leading-relaxed max-w-3xl">
          100GB is an independent web engineering project designed to bring clarity, source
          transparency, and calm organization to personal cloud storage selection.
        </p>
      </header>

      {/* Problem Statement & Motivation */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
          <h2 className="text-lg font-bold text-[#14243A]">Problem statement</h2>
          <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
            Students, developers, and everyday users routinely outgrow a single free cloud
            account when smartphone photos, email attachments, and project archives compete
            for the same quota. Meanwhile, comparing alternatives requires digging through
            marketing pages that obscure critical constraints — such as shared email pools,
            250 MB single-file upload caps, 3-device sync limits, or paid-only encryption.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
          <h2 className="text-lg font-bold text-[#14243A]">Motivation & proposed solution</h2>
          <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
            Rather than promising a miracle free storage host or asking users to hand over
            sensitive cloud credentials to an unverified third party, 100GB provides a
            source-attributed research and organization hub. Users can inspect verified free
            allowances, calculate realistic gigabyte needs, compare trade-offs side by side,
            and maintain a local-first Personal Cloud Workspace.
          </p>
        </div>
      </section>

      {/* V1 & V2 Product Scope */}
      <section className="rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-[#14243A]">Implemented scope: V1 & V2</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[#155EEF]">
              V1 — Cloud Discovery & Analysis
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#172033]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Curated directory of 9 cloud providers with typed verification records</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Separation of base free, starter-step, shared-quota, and referral storage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Live search, capability filters (E2EE, Linux, dedicated quota), and sorting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Side-by-side comparison matrix for 2–4 providers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Interactive Storage Calculator (1 GB = 1,024 MB) with upload-cap warnings</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#155EEF]">
              V2 — Personal Cloud Workspace
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#172033]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Saved Workspace selections and Favorite provider bookmarks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Persistent per-provider folder allocation notes in browser localStorage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Informational allowance totals (Immediate Base vs Starter Checklist modes)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Direct official Web App launchers with honest connection status</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Typed OAuth 2.0 PKCE integration adapter specification for V3 extension</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technology Stack & Architecture */}
      <section
        id="data-methodology"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        <div className="lg:col-span-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Technology Stack</span>
          </div>
          <h2 className="mt-1.5 text-lg font-bold text-[#14243A]">
            Modern, zero-backend frontend stack
          </h2>
          <dl className="mt-4 divide-y divide-[#E4E7EC] text-xs sm:text-sm">
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">UI Framework</dt>
              <dd className="font-semibold text-[#14243A]">React 19 + TypeScript</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">Build Tooling</dt>
              <dd className="font-semibold text-[#14243A]">Vite</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">Client Routing</dt>
              <dd className="font-semibold text-[#14243A]">React Router v7</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">Design System & Styling</dt>
              <dd className="font-semibold text-[#14243A]">Tailwind CSS v4 + CSS Custom Properties</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">Local Persistence</dt>
              <dd className="font-semibold text-[#14243A]">Schema-validated Browser localStorage</dd>
            </div>
            <div className="py-2.5 flex justify-between gap-4">
              <dt className="text-[#667085]">Automated Testing</dt>
              <dd className="font-semibold text-[#14243A]">Node Test Runner + tsx</dd>
            </div>
          </dl>
        </div>

        <div
          id="integration-architecture"
          className="lg:col-span-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-7"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
            <ServerOff className="w-4 h-4" aria-hidden="true" />
            <span>Architecture Overview</span>
          </div>
          <h2 className="mt-1.5 text-lg font-bold text-[#14243A]">
            Layered separation of concerns
          </h2>
          <p className="mt-2.5 text-sm text-[#667085] leading-relaxed">
            The codebase cleanly isolates data definitions (<code className="font-mono text-xs">src/data/</code>),
            TypeScript contracts (<code className="font-mono text-xs">src/types/</code>), pure
            calculation and filtering engines (<code className="font-mono text-xs">src/lib/</code>),
            persistence/integration services (<code className="font-mono text-xs">src/services/</code>),
            and accessible React components (<code className="font-mono text-xs">src/components/</code> &{' '}
            <code className="font-mono text-xs">src/pages/</code>).
          </p>
          <p className="mt-3 text-sm text-[#667085] leading-relaxed">
            Because V1/V2 requires no database, Docker container, or private API keys, the
            entire project runs offline or locally in VS Code immediately after{' '}
            <code className="font-mono text-xs">npm install</code>.
          </p>
        </div>
      </section>

      {/* Limitations & Future Scope */}
      <section className="rounded-2xl border border-[#E4E7EC] bg-[#F3F6FB] p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-bold text-[#14243A]">Current limitations</h2>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              <li>
                • <strong className="text-[#14243A]">Static verification snapshots:</strong>{' '}
                Provider allowances reflect official documentation verified in October 2026 and
                do not scrape live promotional changes automatically.
              </li>
              <li>
                • <strong className="text-[#14243A]">Device-local preferences:</strong>{' '}
                Workspace selections reside in the active browser’s <code className="font-mono text-xs">localStorage</code>{' '}
                and do not sync across separate browsers without cloud login.
              </li>
              <li>
                • <strong className="text-[#14243A]">No direct file browsing:</strong>{' '}
                100GB launches official provider web apps rather than acting as a cross-cloud
                file proxy.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#155EEF]">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Roadmap (V3)</span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-[#14243A]">Future enhancements</h2>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
              <li>
                • <strong className="text-[#14243A]">Optional OAuth 2.0 PKCE backend:</strong>{' '}
                Implement read-only quota telemetry (<code className="font-mono text-xs">drive.metadata.readonly</code>,{' '}
                Microsoft Graph <code className="font-mono text-xs">/me/drive</code>, Dropbox{' '}
                <code className="font-mono text-xs">get_space_usage</code>) via secure HTTP-only
                session cookies.
              </li>
              <li>
                • <strong className="text-[#14243A]">JSON workspace export/import:</strong>{' '}
                Portable backup file so users can transfer their workspace notes across machines
                without creating an account.
              </li>
              <li>
                • <strong className="text-[#14243A]">Paid-tier cost-per-GB analyzer:</strong>{' '}
                Extend comparisons to 100 GB, 200 GB, and 2 TB paid plans across currencies.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[#CBD5E1]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-[#667085]">
          <p>
            <strong className="text-[#14243A]">Independence disclaimer:</strong> 100GB is an
            independent academic project. It is not affiliated with, sponsored by, or endorsed
            by Google, Microsoft, Dropbox, MEGA, Box, pCloud, Proton, Sync.com, Internxt, or any
            educational institution.
          </p>
          <Link
            to="/providers"
            className="inline-flex items-center gap-1 font-semibold text-[#155EEF] hover:underline shrink-0"
          >
            <span>Explore the directory</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
