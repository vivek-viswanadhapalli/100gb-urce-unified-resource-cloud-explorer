import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { EmptyState } from '../components/ui/Primitives';

export function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <EmptyState
        icon={<Compass className="w-6 h-6" />}
        title="404 — Page not found"
        description="The address you requested does not match an active route in 100GB. Return to the home page or browse all verified cloud storage providers."
        actions={
          <>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0E4BD8] text-white text-sm font-semibold transition-colors"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/providers"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E4E7EC] bg-white hover:bg-[#F3F6FB] text-[#14243A] text-sm font-semibold transition-colors"
            >
              <span>Explore Providers</span>
            </Link>
          </>
        }
      />
    </div>
  );
}
