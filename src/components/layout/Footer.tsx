import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../brand/BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-[#E4E7EC] bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Positioning */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <BrandLogo size="md" />
            </Link>
            <p className="mt-3 text-sm font-medium text-[#14243A]">
              Unified Cloud Explorer — All your cloud options. One smarter place.
            </p>
            <p className="mt-2 text-xs text-[#667085] leading-relaxed max-w-md">
              100GB is an independent cloud storage discovery, comparison, and workspace
              organization application. 100GB is not a cloud storage provider and does not
              directly host user files or grant automatic cloud storage.
            </p>
          </div>

          {/* Product Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-[#14243A] tracking-wide">
              Application
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#667085]">
              <li>
                <Link to="/providers" className="hover:text-[#14243A] transition-colors">
                  Explore Providers
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-[#14243A] transition-colors">
                  Compare Plans
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-[#14243A] transition-colors">
                  Storage Calculator
                </Link>
              </li>
              <li>
                <Link to="/workspace" className="hover:text-[#14243A] transition-colors">
                  Personal Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Transparency */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold text-[#14243A] tracking-wide">
              Transparency & Architecture
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#667085]">
              <li>
                <Link to="/about" className="hover:text-[#14243A] transition-colors">
                  About 100GB & System Scope
                </Link>
              </li>
              <li>
                <Link to="/about#data-methodology" className="hover:text-[#14243A] transition-colors">
                  Verification & Official Sources
                </Link>
              </li>
              <li>
                <Link to="/about#integration-architecture" className="hover:text-[#14243A] transition-colors">
                  OAuth 2.0 Integration Adapter Spec
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#667085]">
          <p>
            © {new Date().getFullYear()} 100GB Unified Cloud Explorer. Independent engineering mini project.
          </p>
          <p>
            All trademarks belong to their respective cloud providers. Plan terms verified against official documentation.
          </p>
        </div>
      </div>
    </footer>
  );
}
