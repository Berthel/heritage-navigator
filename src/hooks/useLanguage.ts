import { useState, useEffect } from 'react';

const LANGUAGE_KEY = 'heritage-navigator-language';
type Language = 'da' | 'en' | 'pt';

export function useLanguage(initialLanguage: Language = 'da') {
  // Start med initialLanguage for at undgå hydration mismatch
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Kun tjek localStorage efter første render
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored && (stored === 'da' || stored === 'en' || stored === 'pt')) {
      setSelectedLanguage(stored);
    }
  }, []);

  useEffect(() => {
    // Kun opdater localStorage efter første render
    if (mounted) {
      localStorage.setItem(LANGUAGE_KEY, selectedLanguage);
    }
  }, [selectedLanguage, mounted]);

  return [selectedLanguage, setSelectedLanguage] as const;
}
