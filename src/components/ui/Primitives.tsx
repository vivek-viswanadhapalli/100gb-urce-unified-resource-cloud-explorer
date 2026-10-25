import React, { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Info,
  ShieldCheck,
  Unplug,
  X,
} from 'lucide-react';
import { ToastMessage } from '../../hooks/useWorkspace';
import { IntegrationStatus, VerificationStatus } from '../../types/cloud';

/**
 * Tabular storage readout with clean unboxed qualifier text (zero candy pills).
 */
export function StorageBadge({
  baseGB,
  onboardingGB,
  shared,
  size = 'md',
}: {
  baseGB: number;
  onboardingGB: number;
  shared?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const numberSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-mono font-semibold tabular-nums tracking-tight text-[#14243A] ${numberSize}`}
        >
          {baseGB} GB
        </span>
        <span className="text-xs font-medium text-[#667085] whitespace-nowrap">
          {shared ? 'shared free' : 'base free'}
        </span>
      </div>
      {onboardingGB > baseGB && (
        <span className="text-xs text-[#155EEF] font-medium tabular-nums mt-0.5">
          Up to {onboardingGB} GB after starter steps
        </span>
      )}
    </div>
  );
}

/**
 * Accessible status indicator pairing explicit iconography with unboxed plain text.
 * Never relies on color alone or decorative pulsing dots.
 */
export function VerificationIndicator({
  status,
  verifiedDate,
}: {
  status: VerificationStatus;
  verifiedDate?: string;
}) {
  if (status === VerificationStatus.Verified) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#15803D] font-medium">
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Verified{verifiedDate ? ` ${verifiedDate}` : ''}</span>
      </span>
    );
  }

  if (status === VerificationStatus.Conditional) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#B45309] font-medium">
        <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Conditional tier{verifiedDate ? ` · ${verifiedDate}` : ''}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#667085] font-medium">
      <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>Unverified</span>
    </span>
  );
}

/**
 * Truthful integration status indicator clearly separating saved preferences from live account links.
 */
export function IntegrationIndicator({ status }: { status: IntegrationStatus }) {
  if (status === IntegrationStatus.AdapterPlanned) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-[#667085]">
        <Unplug className="w-3.5 h-3.5 shrink-0 text-[#667085]" aria-hidden="true" />
        <span>Not connected · OAuth adapter planned</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#667085]">
      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#667085]" aria-hidden="true" />
      <span>Not connected · Official web launch</span>
    </span>
  );
}

export function ZeroKnowledgeIndicator({ active }: { active: boolean }) {
  if (!active) {
    return (
      <span className="text-xs text-[#667085]">
        Server-managed keys on free tier
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#14243A]">
      <ShieldCheck className="w-3.5 h-3.5 text-[#155EEF] shrink-0" aria-hidden="true" />
      <span>Zero-knowledge E2EE free</span>
    </span>
  );
}

/**
 * Accessible Toast notification viewport.
 */
export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100vw-2.5rem)] pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-start justify-between gap-3 rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 shadow-[0_12px_30px_-8px_rgba(20,36,58,0.14)]"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            {toast.tone === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#15803D] mt-0.5 shrink-0" aria-hidden="true" />
            ) : toast.tone === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-[#B45309] mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <Info className="w-4 h-4 text-[#155EEF] mt-0.5 shrink-0" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#172033] leading-snug">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs text-[#667085] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
            className="p-1 text-[#667085] hover:text-[#172033] rounded-md transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Keyboard-accessible Dialog modal component.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14243A]/45 backdrop-blur-[2px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#E4E7EC] bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E4E7EC]">
          <div>
            <h2 id="dialog-title" className="text-xl font-bold text-[#14243A]">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-[#667085] mt-1">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-lg text-[#667085] hover:text-[#172033] hover:bg-[#F3F6FB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

/**
 * Structured Empty State component with icon, plain explanation, and action affordances.
 */
export function EmptyState({
  icon,
  title,
  description,
  actions,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center max-w-2xl mx-auto">
      <div className="w-12 h-12 rounded-xl bg-[#F3F6FB] border border-[#E4E7EC] flex items-center justify-center mx-auto text-[#155EEF]">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#14243A]">{title}</h3>
      <p className="mt-2 text-sm text-[#667085] max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {actions && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
