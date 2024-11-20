import { useState, useEffect } from 'react';

const LANGUAGE_KEY = 'heritage-navigator-language';
type Language = 'da' | 'en' | 'pt';

export function useLanguage(initialLanguage?: Language) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    // First try to get from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      if (stored && (stored === 'da' || stored === 'en' || stored === 'pt')) {
        return stored;
      }
    }
    // Then use initialLanguage if provided
    if (initialLanguage) {
      return initialLanguage;
    }
    // Finally fallback to 'da'
    return 'da';
  });

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem(LANGUAGE_KEY, selectedLanguage);
  }, [selectedLanguage]);

  return [selectedLanguage, setSelectedLanguage] as const;
}
