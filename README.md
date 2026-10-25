# 100GB — Unified Resource & Cloud Explorer (URCE)

**All your cloud options. One smarter place.**

**100GB** is a local-first web application for discovering free cloud storage plans, comparing real technical constraints across providers, estimating personal gigabyte requirements, and organizing preferred cloud services in a persistent workspace.

> **Important Note:** 100GB is an independent cloud discovery, comparison, and workspace organization platform — **not** a cloud storage host. It does not host user files, grant automatic cloud storage, or simulate fake cloud account logins.

---

## 1. Project Overview

Modern students, developers, and content creators regularly use multiple cloud services simultaneously. However, free storage tiers vary widely in how quotas are calculated, whether encryption keys are controlled by the user, which desktop operating systems are supported, and what upload caps apply.

**100GB — Unified Cloud Explorer** brings verified data for nine established cloud storage providers into a cohesive, accessible React + TypeScript interface that runs completely locally without requiring user registration, databases, or private API keys.

---

## 2. Problem Statement

1. **Fragmented plan disclosures:** Free tiers advertise headline gigabyte figures while burying crucial constraints such as shared email/photo pools (Google Drive, OneDrive, Proton Drive), strict per-file upload limits (Box’s 250 MB cap), connected device caps (Dropbox’s 3-device limit), or conditional onboarding steps (pCloud, Proton Drive).
2. **Storage miscalculation:** Users struggle to translate thousands of photos and video clips in megabytes into an accurate gigabyte target before choosing a provider.
3. **Multi-cloud disorganization:** Users who split files across multiple free accounts lack a simple, private place to track which provider stores which category of files without handing their cloud credentials to a third-party aggregator.

---

## 3. Objectives

- Present accurate, source-attributed free-tier records for nine major cloud storage providers.
- Distinguish immediate base free storage from onboarding checklists, shared ecosystem quotas, and referral bonuses.
- Provide side-by-side multi-provider comparison across capacity, limits, OS support, and encryption models.
- Deliver an interactive Storage Calculator using a documented unit convention (`1 GB = 1,024 MB`).
- Enable a persistent, local-first **Personal Cloud Workspace** backed by `localStorage` with zero mandatory sign-up.
- Define a clean, honest adapter architecture for future OAuth 2.0 PKCE integrations without faking account connections.

---

## 4. Features

- **Interactive Landing Page (`/`):** Live 3-pane Explorer preview, free-allowance classification breakdown, featured providers, and workflow guide.
- **Provider Directory (`/providers`):** Real-time keyword search, minimum base storage segmented filter (`Any`, `5 GB+`, `10 GB+`, `15 GB+`), verified capability filters (`Zero-knowledge E2EE free`, `Native Linux desktop client`, `Dedicated drive quota`), and multi-criteria sorting.
- **Provider Details (`/providers/:id`):** Complete provider profile including base vs. starter-step allowances, upload/transfer rules, native OS table, encryption profile, official pricing source links, related providers, and a designed invalid-ID fallback.
- **Side-by-Side Comparison (`/compare`):** Compare 2–4 providers simultaneously with quick preset sets (`Mainstream ecosystems`, `Zero-knowledge E2EE free`, `Highest free capacity`), responsive horizontal matrix scrolling, and transparent methodology notes.
- **Storage Requirement Calculator (`/calculator`):** Immediate calculation across photos, videos, documents, and buffer headroom (`1 GB = 1,024 MB`), SVG category breakdown bar, input validation, and automated fit evaluation against all 9 providers (including single-file upload cap warnings).
- **Personal Cloud Workspace (`/workspace`):** Save providers, bookmark favorites, record per-provider folder purpose notes, toggle between *Immediate Base Free* and *With Starter Steps* allowance totals, launch official web apps, and inspect OAuth 2.0 integration specs.
- **About & System Documentation (`/about`)** and **Polished 404 Route (`/*`)**.

---

## 5. V1 and V2 Scope

| Release Tier | Scope | Status |
| :--- | :--- | :--- |
| **V1 — Cloud Discovery** | 9-provider verified directory, search, capability filters, sorting, provider detail pages, side-by-side comparison, storage calculator, official source links, verification indicators | **Implemented** |
| **V2 — Personal Cloud Workspace** | Saved workspace selections, favorite providers, per-provider folder notes, `localStorage` persistence, informational allowance totals, official web launch links, truthful connection indicators, OAuth adapter interface | **Implemented** |
| **V3 — Live Cloud Telemetry** | Optional backend OAuth 2.0 PKCE token exchange and live read-only quota polling (`about.get`, `/me/drive`) | **Planned Architecture Only** |

---

## 6. Technology Stack

- **Frontend Library:** React 19
- **Language:** TypeScript (strict typed interfaces & enums)
- **Build Tool & Dev Server:** Vite 8
- **Routing:** React Router (`react-router-dom`)
- **Styling & Design System:** Tailwind CSS v4 + CSS Custom Properties (`src/index.css` & `src/styles/tokens.ts`)
- **Icons & Brand Graphics:** Lucide React + custom vector SVGs (`BrandLogo`, `ProviderEmblem`, `public/favicon.svg`)
- **Persistence:** Schema-validated Browser `localStorage`
- **Automated Testing:** Node.js native test runner (`node:test`, `node:assert/strict`) executed via `tsx`

---

## 7. Folder Structure

```text
100gb-unified-cloud-explorer/
├── public/
│   ├── favicon.svg              # Primary vector favicon (white background, cobalt-cyan 100 mark)
│   ├── favicon.ico              # Multi-resolution 16/32/48 ICO fallback
│   ├── favicon-16x16.png        # 16x16 PNG favicon
│   ├── favicon-32x32.png        # 32x32 PNG favicon
│   ├── favicon-48x48.png        # 48x48 PNG favicon
│   └── apple-touch-icon.png     # 180x180 touch icon
├── scripts/
│   └── generate-favicons.mjs    # Zero-dependency Node script generating PNG/ICO favicons
├── src/
│   ├── components/
│   │   ├── brand/BrandLogo.tsx  # Vector 100GB logo, wordmark, and 9 provider emblems
│   │   ├── home/HeroExplorerPreview.tsx
│   │   ├── layout/              # Navbar, Footer, AppLayout
│   │   ├── providers/ProviderCard.tsx
│   │   └── ui/Primitives.tsx    # StorageBadge, StatusIndicators, ToastViewport, Dialog, EmptyState
│   ├── data/
│   │   └── providers.ts         # Verified dataset & official source links for all 9 providers
│   ├── hooks/
│   │   └── useWorkspace.tsx     # Reactive Workspace & Toast context synced to localStorage
│   ├── lib/
│   │   ├── calculator.ts        # Storage estimator math (1 GB = 1,024 MB) & validation
│   │   ├── filterProviders.ts   # Pure search, capability filter, and sort functions
│   │   └── workspaceSummary.ts  # Informational workspace totals & caveats
│   ├── pages/                   # HomePage, ExploreProvidersPage, ProviderDetailsPage,
│   │                            # ComparePage, CalculatorPage, WorkspacePage, AboutPage, NotFoundPage
│   ├── services/
│   │   ├── integrationAdapter.ts# Truthful OAuth 2.0 PKCE adapter specs for V3
│   │   ├── providerService.ts   # Typed provider query helpers
│   │   └── storagePersistence.ts# Safe, schema-validated localStorage wrapper
│   ├── styles/
│   │   └── tokens.ts            # TypeScript mirror of design system color & typography tokens
│   ├── types/
│   │   └── cloud.ts             # Centralized TypeScript interfaces and enums
│   ├── App.tsx                  # Route table & providers
│   ├── index.css                # Tailwind v4 import, CSS custom properties, focus & motion rules
│   └── main.tsx                 # React DOM entry point
├── tests/
│   └── core.test.ts             # 13 automated unit & integration tests
├── index.html                   # Entry HTML with metadata, favicons, Google Fonts, JSON-LD
├── package.json                 # Scripts & dependencies
├── README.md                    # Setup, usage, and maintenance documentation
└── PROJECT_REPORT.md            # Academic CSE Mini Project report
```

---

## 8. Prerequisites

- **Operating System:** Windows 10/11, macOS, or Linux
- **Node.js:** v20.x LTS or v22.x LTS recommended (includes `npm` and native `node:test`)
- **Code Editor:** Visual Studio Code (VS Code)
- **No external services required:** No database, Docker container, cloud account, or `.env` API keys are needed to run, test, or build this project.

---

## 9. Installation & Running Locally in VS Code (Windows / macOS / Linux)

1. **Export / Download Source ZIP:** Download the project ZIP from Google AI Studio (using the **Download / Export ZIP** option in the top toolbar) and extract it to a local folder (for example, `C:\Projects\100gb-unified-cloud-explorer`).
2. **Open in VS Code:** Launch VS Code and select **File → Open Folder...**, choosing the extracted project folder.
3. **Open Integrated Terminal:** Press `` Ctrl + ` `` (Windows/Linux) or `` Cmd + ` `` (macOS) in VS Code.
4. **Verify Node.js & npm:**
   ```bash
   node -v
   npm -v
   ```
5. **Install Dependencies:**
   ```bash
   npm install
   ```
6. **Start Development Server:**
   ```bash
   npm run dev
   ```
7. **Open in Browser:** Ctrl+Click the local URL printed in the terminal (default `http://localhost:3000`).

---

## 10. Development, Build & Verification Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on port `3000` |
| `npm run build` | Compiles optimized production assets into the `dist/` folder |
| `npm run preview` | Locally previews the compiled production build from `dist/` |
| `npm test` | Runs the 13 automated tests in `tests/core.test.ts` |
| `npm run lint` | Runs strict TypeScript type-checking (`tsc --noEmit`) |
| `npm run clean` | Removes the `dist/` build output folder (cross-platform) |
| `node scripts/generate-favicons.mjs` | Regenerates PNG (`16`, `32`, `48`, `180`) and `.ico` favicons in `public/` |

---

## 11. Production Build

Run:

```bash
npm run build
```

Vite bundles and optimizes all TypeScript, CSS, and static assets into `dist/`. You can verify the compiled bundle locally by running `npm run preview`.

---

## 12. Automated Tests

Run:

```bash
npm test
```

The test suite (`tests/core.test.ts`) validates:
1. All 9 required provider records, HTTPS source links, and non-negative storage bounds.
2. Honest `connected: false` responses across all integration adapters.
3. Search, storage thresholds, zero-knowledge E2EE filtering, Linux desktop client filtering, and sorting order.
4. Binary storage conversion (`1,024 MB = 1 GB`), negative/non-numeric input validation, and Box’s 250 MB single-file warning.
5. `localStorage` persistence, ID deduplication, invalid-ID sanitization, corrupted JSON recovery, and workspace summary calculations.

---

## 13. Data Verification Principles

- **Included Providers:** Google Drive, Microsoft OneDrive, Dropbox, MEGA, Box, pCloud, Proton Drive, Sync.com, and Internxt.
- **Allowance Separation:** Every record distinguishes `baseFreeGB` (immediate unconditional space), `onboardingFreeGB` (first-party verification/starter steps), and `referralMaxGB` (friend referral bonuses).
- **Source Attribution:** Each provider record stores direct URLs to official plan/pricing documentation alongside a `lastVerifiedDate` (`2026-10-24`).

---

## 14. Troubleshooting

- **`npm: File ... npm.ps1 cannot be loaded` on Windows PowerShell:**
  Either switch the VS Code terminal profile from *PowerShell* to *Command Prompt (`cmd`)*, or run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` in PowerShell.
- **Port `3000` is already in use:**
  Vite will automatically select the next free port (such as `3001`) and display the active URL in the terminal, or you can run `npx vite --port=5173`.
- **Workspace selections reset when switching browsers:**
  Preferences are stored in browser-specific `localStorage` (`100gb_workspace_preferences_v1`). Using Incognito/Private mode clears `localStorage` when the private window closes.

---

## 15. Limitations

- Plan data is maintained as a curated static dataset rather than a live web scraper; providers may revise free quotas or terms at any time.
- Combined workspace storage figures are informational estimates across separate accounts — free cloud plans cannot merge into one contiguous volume.
- Live cloud account connections and remote file listings are intentionally disabled in V1/V2 to preserve zero-credential privacy and offline portability.

---

## 16. Future Scope

- **Backend OAuth 2.0 PKCE Service (V3):** Connect read-only quota endpoints for Google Drive, OneDrive, Dropbox, Box, and pCloud using short-lived tokens.
- **Portable Workspace Backup:** Export and import workspace selections and folder notes as a local `.json` file.
- **Paid Plan TCO Calculator:** Compare annual and monthly 100 GB–2 TB subscription pricing across currencies.

---

## 17. How to Update Provider Data

1. Open `src/data/providers.ts`.
2. Locate the provider object by its `id` (for example, `'proton-drive'` or `'google-drive'`).
3. Update `allowance.baseFreeGB`, `allowance.onboardingFreeGB`, `planLimitations`, or `platforms` based on the provider’s official documentation.
4. Update `lastVerifiedDate` (`YYYY-MM-DD`) and verify the URLs inside `sources`.
5. Run `npm test` and `npm run lint` to confirm dataset integrity and type safety.
