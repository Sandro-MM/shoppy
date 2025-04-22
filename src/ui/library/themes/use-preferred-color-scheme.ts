'use client'
import { useState, useEffect } from 'react';

export function usePreferredColorScheme(): 'dark' | 'light' {
  const [scheme, setScheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateScheme = () => setScheme(mediaQuery.matches ? 'dark' : 'light');

    updateScheme();
    mediaQuery.addEventListener('change', updateScheme);

    return () => {
      mediaQuery.removeEventListener('change', updateScheme);
    };
  }, []);

  return scheme;
}
