import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastViewport } from '../ui/Primitives';
import { useWorkspace } from '../../hooks/useWorkspace';

export function AppLayout() {
  const location = useLocation();
  const { toasts, dismissToast } = useWorkspace();

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#172033]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#155EEF] focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
