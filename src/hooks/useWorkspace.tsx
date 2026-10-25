import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  createDefaultWorkspacePreferences,
  DEFAULT_COMPARE_PROVIDER_IDS,
  loadWorkspacePreferences,
  saveWorkspacePreferences,
} from '../services/storagePersistence';
import { AllowanceCalculationMode, WorkspacePreferences } from '../types/cloud';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone?: 'info' | 'success' | 'warning';
}

interface WorkspaceContextValue {
  preferences: WorkspacePreferences;
  isSaved: (providerId: string) => boolean;
  isFavorite: (providerId: string) => boolean;
  isComparing: (providerId: string) => boolean;
  toggleSaved: (providerId: string, providerName?: string) => void;
  toggleFavorite: (providerId: string, providerName?: string) => void;
  toggleCompare: (providerId: string, providerName?: string) => void;
  setCompareList: (providerIds: string[], toastLabel?: string) => void;
  resetCompareList: () => void;
  updateNote: (providerId: string, note: string) => void;
  setAllowanceMode: (mode: AllowanceCalculationMode) => void;
  loadStarterWorkspace: () => void;
  clearAllSaved: () => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<WorkspacePreferences>(() =>
    loadWorkspacePreferences()
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    saveWorkspacePreferences(preferences);
  }, [preferences]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3600);
    },
    []
  );

  const isSaved = useCallback(
    (providerId: string) => preferences.savedProviderIds.includes(providerId),
    [preferences.savedProviderIds]
  );

  const isFavorite = useCallback(
    (providerId: string) => preferences.favoriteProviderIds.includes(providerId),
    [preferences.favoriteProviderIds]
  );

  const isComparing = useCallback(
    (providerId: string) => preferences.compareProviderIds.includes(providerId),
    [preferences.compareProviderIds]
  );

  const toggleSaved = useCallback(
    (providerId: string, providerName = 'Provider') => {
      setPreferences((prev) => {
        const exists = prev.savedProviderIds.includes(providerId);
        const nextIds = exists
          ? prev.savedProviderIds.filter((id) => id !== providerId)
          : [...prev.savedProviderIds, providerId];

        pushToast({
          title: exists
            ? `Removed ${providerName} from Workspace`
            : `Saved ${providerName} to Workspace`,
          tone: exists ? 'info' : 'success',
        });

        return {
          ...prev,
          savedProviderIds: nextIds,
        };
      });
    },
    [pushToast]
  );

  const toggleFavorite = useCallback(
    (providerId: string, providerName = 'Provider') => {
      setPreferences((prev) => {
        const exists = prev.favoriteProviderIds.includes(providerId);
        const nextIds = exists
          ? prev.favoriteProviderIds.filter((id) => id !== providerId)
          : [...prev.favoriteProviderIds, providerId];

        pushToast({
          title: exists
            ? `Removed ${providerName} from Favorites`
            : `Marked ${providerName} as Favorite`,
          tone: exists ? 'info' : 'success',
        });

        return {
          ...prev,
          favoriteProviderIds: nextIds,
        };
      });
    },
    [pushToast]
  );

  const toggleCompare = useCallback(
    (providerId: string, providerName = 'Provider') => {
      setPreferences((prev) => {
        const exists = prev.compareProviderIds.includes(providerId);
        if (!exists && prev.compareProviderIds.length >= 4) {
          pushToast({
            title: 'Comparison limit reached (4 providers)',
            description: 'Remove one provider from Compare before adding another.',
            tone: 'warning',
          });
          return prev;
        }

        const nextIds = exists
          ? prev.compareProviderIds.filter((id) => id !== providerId)
          : [...prev.compareProviderIds, providerId];

        pushToast({
          title: exists
            ? `Removed ${providerName} from Compare`
            : `Added ${providerName} to Compare (${nextIds.length} selected)`,
          tone: 'info',
        });

        return {
          ...prev,
          compareProviderIds: nextIds,
        };
      });
    },
    [pushToast]
  );

  const setCompareList = useCallback(
    (providerIds: string[], toastLabel?: string) => {
      const capped = providerIds.slice(0, 4);
      setPreferences((prev) => ({
        ...prev,
        compareProviderIds: capped,
      }));
      if (toastLabel) {
        pushToast({
          title: toastLabel,
          tone: 'info',
        });
      }
    },
    [pushToast]
  );

  const resetCompareList = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      compareProviderIds: [...DEFAULT_COMPARE_PROVIDER_IDS],
    }));
    pushToast({
      title: 'Reset comparison to default trio',
      tone: 'info',
    });
  }, [pushToast]);

  const updateNote = useCallback((providerId: string, note: string) => {
    setPreferences((prev) => ({
      ...prev,
      providerNotes: {
        ...prev.providerNotes,
        [providerId]: note.slice(0, 280),
      },
    }));
  }, []);

  const setAllowanceMode = useCallback((mode: AllowanceCalculationMode) => {
    setPreferences((prev) => ({
      ...prev,
      allowanceMode: mode,
    }));
  }, []);

  const loadStarterWorkspace = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      savedProviderIds: ['google-drive', 'mega', 'proton-drive', 'box'],
      favoriteProviderIds: ['google-drive', 'proton-drive'],
      providerNotes: {
        ...prev.providerNotes,
        'google-drive': 'Collaborative semester docs & shared slide decks',
        mega: 'Encrypted project archives & large zip backups',
        'proton-drive': 'Sensitive ID scans & personal certificates',
        box: 'Lightweight academic PDFs (< 250 MB per file)',
      },
    }));
    pushToast({
      title: 'Loaded 4-provider starter workspace',
      description: 'Saved locally in your browser preferences.',
      tone: 'success',
    });
  }, [pushToast]);

  const clearAllSaved = useCallback(() => {
    const defaults = createDefaultWorkspacePreferences();
    setPreferences((prev) => ({
      ...defaults,
      compareProviderIds: prev.compareProviderIds,
    }));
    pushToast({
      title: 'Cleared saved workspace and favorites',
      tone: 'info',
    });
  }, [pushToast]);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      preferences,
      isSaved,
      isFavorite,
      isComparing,
      toggleSaved,
      toggleFavorite,
      toggleCompare,
      setCompareList,
      resetCompareList,
      updateNote,
      setAllowanceMode,
      loadStarterWorkspace,
      clearAllSaved,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      preferences,
      isSaved,
      isFavorite,
      isComparing,
      toggleSaved,
      toggleFavorite,
      toggleCompare,
      setCompareList,
      resetCompareList,
      updateNote,
      setAllowanceMode,
      loadStarterWorkspace,
      clearAllSaved,
      toasts,
      pushToast,
      dismissToast,
    ]
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used inside WorkspaceProvider');
  }
  return ctx;
}
