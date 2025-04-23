'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { applyThemeToDom } from '@ui/themes/utils/apply-theme-to-dom';
import {
  ThemeId,
  ThemeSelectorContext,
  ThemeSelectorContextValue,
} from '@ui/themes/theme-selector-context';
import { useBootstrapDataStore } from '@ui/bootstrap-data/bootstrap-data-store';
import { usePreferredColorScheme } from '@ui/themes/use-preferred-color-scheme';
import { themeEl } from '@ui/root-el';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  console.log('🔄 ThemeProvider: Render');

  // ✅ 1. Run all hooks unconditionally
  const preferredColorScheme = usePreferredColorScheme();
  const data = useBootstrapDataStore(s => s.data);
  const allThemes = data?.themes ?? [];

  const [forcedThemeId, setForceThemeId] = useState<ThemeId | null>(null);

  const selectThemeTemporarily = useCallback((themeId: ThemeId | null) => {
    console.log('🕹️ selectThemeTemporarily called:', themeId);
    setForceThemeId(themeId);
  }, []);

  const resolveTheme = useCallback(
      (themeId: string | number | null) => {
        console.log('🧠 resolveTheme called with:', themeId);

        if (themeId === 0 || themeId === 'system' || themeId === null) {
          const found = allThemes.find(t =>
              preferredColorScheme === 'light' ? t.default_light : t.default_dark,
          );
          console.log('🔍 system default resolved to:', found);
          return found;
        }

        if (themeId === 'light' || themeId === 'dark') {
          const found = allThemes.find(t => t.default_light === (themeId === 'light'));
          console.log(`🔍 '${themeId}' resolved to:`, found);
          return found;
        }

        const found = allThemes.find(t => t.id == themeId);
        console.log('🔍 themeId resolved to:', found);
        return found;
      },
      [allThemes, preferredColorScheme],
  );

  // ✅ 2. After hooks, decide logic with fallback
  const isHydrated = data?.themes?.length > 0;

  const selectedTheme = useMemo(() => {
    const theme = resolveTheme(forcedThemeId);
    return (
        theme ??
        allThemes.find(t =>
            preferredColorScheme === 'light' ? t.default_light : t.default_dark,
        ) ??
        allThemes[0]
    );
  }, [resolveTheme, forcedThemeId, allThemes, preferredColorScheme]);

  useEffect(() => {
    if (!selectedTheme) return;

    const currentThemeId = themeEl.dataset.themeId;
    console.log('🌈 Applying theme. Current:', currentThemeId, '→ New:', selectedTheme.id);

    if (`${selectedTheme.id}` !== `${currentThemeId}`) {
      applyThemeToDom(selectedTheme);
    }
  }, [selectedTheme]);

  const contextValue: ThemeSelectorContextValue = useMemo(() => {
    return {
      allThemes,
      selectedTheme: selectedTheme!,
      selectThemeTemporarily,
      selectTheme: id => {
        const theme = resolveTheme(id);
        if (theme) {
          console.log('🎯 Theme selected by user:', theme);
          setForceThemeId(theme.id);
          applyThemeToDom(theme);
        }
      },
    };
  }, [allThemes, selectedTheme, resolveTheme, selectThemeTemporarily]);
  if (!isHydrated) {
    console.warn('⏳ ThemeProvider: bootstrap not hydrated yet.');
    return null;
  }

  return (
      <ThemeSelectorContext.Provider value={contextValue}>
        {children}
      </ThemeSelectorContext.Provider>
  );
}
