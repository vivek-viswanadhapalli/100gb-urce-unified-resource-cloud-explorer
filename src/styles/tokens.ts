/**
 * Centralized 100GB Design System Tokens (TypeScript mirror of CSS Custom Properties).
 * Keeps UI components, SVG illustrations, and documentation aligned to one palette.
 */
export const DESIGN_TOKENS = {
  colors: {
    primaryCobalt: '#155EEF',
    primaryCobaltHover: '#0E4BD8',
    deepNavy: '#14243A',
    cyanAccent: '#22D3EE',
    mainBackground: '#FAFAF7',
    whiteSurface: '#FFFFFF',
    secondaryBackground: '#F3F6FB',
    mainText: '#172033',
    secondaryText: '#667085',
    border: '#E4E7EC',
    success: '#15803D',
    warning: '#B45309',
    error: '#DC2626',
  },
  typography: {
    displayFont: '"Plus Jakarta Sans", system-ui, sans-serif',
    bodyFont: '"Manrope", system-ui, sans-serif',
    monoFont: '"JetBrains Mono", monospace',
  },
  layout: {
    maxContentWidth: '80rem', // 1280px (max-w-7xl)
  },
} as const;
