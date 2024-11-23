'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage } from '@/types/models';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isReady: boolean;
}

const defaultLanguage: SupportedLanguage = 'da';

// Provide a more descriptive error message if the context is used outside a provider
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  isReady: false
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('heritage-navigator-language');
    if (stored && ['da', 'en', 'pt'].includes(stored)) {
      setLanguage(stored as SupportedLanguage);
    }
    setIsReady(true);
  }, []);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('heritage-navigator-language', lang);
    }
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    isReady
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}