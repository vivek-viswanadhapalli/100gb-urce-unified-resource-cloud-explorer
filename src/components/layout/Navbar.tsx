import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FolderKanban, Menu, X } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { useWorkspace } from '../../hooks/useWorkspace';

const NAV_LINKS = [
  { to: '/providers', label: 'Explore' },
  { to: '/compare', label: 'Compare' },
  { to: '/calculator', label: 'Storage Calculator' },
  { to: '/workspace', label: 'Workspace' },
  { to: '/about', label: 'About' },
];

/**
 * Strict 3-Zone Top Bar Contract:
 * [Zone 1: 100GB Brand Lockup] — [Zone 2: 5 concise single-line nav links] — [Zone 3: 1 primary CTA]
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { preferences } = useWorkspace();
  const savedCount = preferences.savedProviderIds.length;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#E4E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Logo & Wordmark */}
        <Link
          to="/"
          aria-label="100GB Home"
          className="inline-flex items-center whitespace-nowrap shrink-0 rounded-lg py-1"
        >
          <BrandLogo size="md" />
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#667085]"
        >
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive
                    ? 'text-[#14243A] font-semibold border-[#155EEF]'
                    : 'border-transparent hover:text-[#14243A]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single primary action (plus mobile menu button on narrow viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/workspace"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] active:bg-[#0B3FB8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            <FolderKanban className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">
              {savedCount > 0 ? `My Workspace (${savedCount})` : 'Open Workspace'}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E4E7EC] bg-white text-[#14243A] hover:bg-[#F3F6FB] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-[#E4E7EC] bg-white px-4 pt-3 pb-5 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F3F6FB] text-[#155EEF] font-semibold'
                      : 'text-[#172033] hover:bg-[#F3F6FB]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#E4E7EC]">
            <Link
              to="/providers"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
            >
              Explore cloud storage
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
