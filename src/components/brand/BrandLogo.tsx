import React, { useId } from 'react';

interface BrandMarkProps {
  className?: string;
}

/**
 * Vector recreation of the 100GB brand reference mark:
 * - Bold geometric '1' stem in cobalt blue
 * - Interwoven infinity-ribbon '00' transitioning from cobalt to cyan
 * - Layered rounded cloud dome rising above the '00'
 */
export function BrandMark({ className = 'w-8 h-8' }: BrandMarkProps) {
  const uid = useId().replace(/:/g, '');
  const stemGrad = `stem-${uid}`;
  const domeBackGrad = `dome-back-${uid}`;
  const domeFrontGrad = `dome-front-${uid}`;
  const loopGrad = `loop-${uid}`;

  return (
    <svg
      viewBox="0 0 88 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={stemGrad} x1="8" y1="54" x2="24" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0838D6" />
          <stop offset="100%" stopColor="#155EEF" />
        </linearGradient>
        <linearGradient id={domeBackGrad} x1="28" y1="26" x2="68" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D55F2" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id={domeFrontGrad} x1="30" y1="28" x2="58" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A45E0" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id={loopGrad} x1="22" y1="48" x2="82" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A3FE0" />
          <stop offset="50%" stopColor="#0891EE" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* Upper cloud dome sweep */}
      <path
        d="M27.5 24.2C31.4 13.4 42.1 7.2 53.6 8.5C63.1 9.6 70.8 16.4 73.1 25.6C68.3 23.4 62.6 23.1 57.3 25.1C53.2 17.8 44.8 14.3 36.2 16.5C32.7 17.4 29.6 20.1 27.5 24.2Z"
        fill={`url(#${domeBackGrad})`}
      />
      {/* Secondary inner cloud crest */}
      <path
        d="M29.2 24.8C35.2 19.6 44.3 18.8 51.6 23.6C53.9 25.1 55.7 27 57.1 29.2C54.2 30.8 51.6 32.9 49.4 35.6C47.7 28.9 41.9 24.4 34.8 24.4C32.8 24.4 30.9 24.5 29.2 24.8Z"
        fill={`url(#${domeFrontGrad})`}
      />

      {/* Interwoven '00' infinity cloud ribbon */}
      <path
        d="M38.2 26.8C29.4 26.8 22.2 33.9 22.2 42.8C22.2 51.6 29.4 58.8 38.2 58.8C44.8 58.8 49.7 54.9 54.2 48.9L58.4 43.3C61.3 39.4 64.2 36.6 68.4 36.6C73.2 36.6 77 40.4 77 45.2C77 50 73.2 53.8 68.4 53.8C64.6 53.8 61.7 51.5 59.8 48.2L53.9 55.8C57.4 59.8 62.5 62.2 68.4 62.2C77.9 62.2 85.4 54.6 85.4 45.2C85.4 35.8 77.9 28.2 68.4 28.2C61.5 28.2 56.6 32.2 52.1 38.2L47.9 43.8C45 47.7 42.1 50.4 38.2 50.4C33.8 50.4 30.6 47 30.6 42.8C30.6 38.5 33.8 35.2 38.2 35.2C41.8 35.2 44.6 37.3 46.3 40.3L52.1 32.8C48.8 29 43.8 26.8 38.2 26.8Z"
        fill={`url(#${loopGrad})`}
      />

      {/* Bold geometric '1' monogram */}
      <path
        d="M14.4 22.2L4.2 29.8C3.2 30.6 2.6 31.8 2.6 33.1V37.8C2.6 39.4 4.4 40.4 5.8 39.5L12 35.6V55.8C12 57.5 13.3 58.8 15 58.8H20.2C21.9 58.8 23.2 57.5 23.2 55.8V25.2C23.2 23.5 21.9 22.2 20.2 22.2H14.4Z"
        fill={`url(#${stemGrad})`}
      />
    </svg>
  );
}

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ size = 'md' }: BrandLogoProps) {
  const iconDimensions =
    size === 'sm' ? 'w-7 h-5' : size === 'lg' ? 'w-11 h-8' : 'w-9 h-6.5';
  const wordmarkSize =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap shrink-0 select-none">
      <BrandMark className={iconDimensions} />
      <span
        className={`font-extrabold tracking-tight text-[#14243A] ${wordmarkSize}`}
      >
        100<span className="text-[#155EEF]">GB</span>
      </span>
    </span>
  );
}

/**
 * Clean geometric vector emblems for each of the 9 providers.
 * Ensures zero reliance on fragile external logo CDNs while remaining crisp at all DPIs.
 */
export function ProviderEmblem({
  providerId,
  name,
  size = 'md',
}: {
  providerId: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const boxClass =
    size === 'sm'
      ? 'w-8 h-8 rounded-lg'
      : size === 'lg'
      ? 'w-12 h-12 rounded-xl'
      : 'w-10 h-10 rounded-xl';
  const svgClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div
      className={`${boxClass} border border-[#E4E7EC] bg-[#F8FAFC] flex items-center justify-center shrink-0`}
      aria-label={`${name} emblem`}
    >
      {renderProviderVector(providerId, svgClass)}
    </div>
  );
}

function renderProviderVector(providerId: string, className: string) {
  switch (providerId) {
    case 'google-drive':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M8.5 3.5H15.5L22 14.8L18.5 20.5H5.5L2 14.8L8.5 3.5Z" stroke="#1A73E8" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M2.5 15H21.5" stroke="#15803D" strokeWidth="1.8" />
          <path d="M8.5 3.5L15 15L11.5 20.5" stroke="#EA4335" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'mega':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" stroke="#D9272E" strokeWidth="1.8" />
          <path d="M7.5 15.5V8.5L12 13L16.5 8.5V15.5" stroke="#D9272E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'microsoft-onedrive':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.5 17.5H18C20.2 17.5 21.8 15.9 21.8 13.8C21.8 11.9 20.4 10.3 18.5 10.1C17.6 7.4 15 5.5 12 5.5C8.8 5.5 6.2 7.7 5.6 10.7C3.6 11.1 2.2 12.8 2.2 14.8C2.2 16.4 3.6 17.5 6.5 17.5Z"
            stroke="#0078D4"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'proton-drive':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M4 7.5C4 6.4 4.9 5.5 6 5.5H10.2L12.4 7.8H18C19.1 7.8 20 8.7 20 9.8V16.8C20 17.9 19.1 18.8 18 18.8H6C4.9 18.8 4 17.9 4 16.8V7.5Z"
            stroke="#6D4AFF"
            strokeWidth="1.8"
          />
          <rect x="10" y="11.5" width="4" height="4" rx="1" stroke="#6D4AFF" strokeWidth="1.7" />
        </svg>
      );
    case 'box':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke="#0061D5" strokeWidth="1.8" />
          <circle cx="9.5" cy="12.5" r="2.3" stroke="#0061D5" strokeWidth="1.8" />
          <path d="M14.2 10.2L17.8 14.8M17.8 10.2L14.2 14.8" stroke="#0061D5" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'pcloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path
            d="M6.2 17.5H17.8C19.8 17.5 21.4 15.9 21.4 14C21.4 12.1 19.9 10.6 18 10.5C17.1 7.8 14.6 6 11.7 6C8.4 6 5.8 8.4 5.4 11.5C3.8 11.9 2.6 13.3 2.6 15C2.6 16.4 4.1 17.5 6.2 17.5Z"
            stroke="#0097A7"
            strokeWidth="1.8"
          />
          <path d="M10.5 14.8V10.5H12.6C13.5 10.5 14.1 11.1 14.1 11.9C14.1 12.7 13.5 13.3 12.6 13.3H10.5" stroke="#0097A7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'sync-com':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M17.5 8.5C16.2 6.7 14.2 5.5 11.8 5.5C8 5.5 5 8.5 5 12.2" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6.5 15.5C7.8 17.3 9.8 18.5 12.2 18.5C16 18.5 19 15.5 19 11.8" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14.8 8.7H17.8V5.7" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.2 15.3H6.2V18.3" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'dropbox':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M7.5 4.5L2.5 7.8L7.5 11L12 8L7.5 4.5Z" stroke="#0061FF" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M16.5 4.5L12 8L16.5 11L21.5 7.8L16.5 4.5Z" stroke="#0061FF" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M2.5 14.2L7.5 11L12 14L7.5 17.5L2.5 14.2Z" stroke="#0061FF" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M21.5 14.2L16.5 11L12 14L16.5 17.5L21.5 14.2Z" stroke="#0061FF" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case 'internxt':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="#14243A" strokeWidth="2.1" strokeLinecap="round" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="4" stroke="#14243A" strokeWidth="1.5" />
        </svg>
      );
  }
}
