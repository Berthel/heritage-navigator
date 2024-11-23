'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage } from '@/types/models';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isReady: boolean;
}

const defaultLanguage: SupportedLanguage = 'da';

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>(defaultLanguage);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    return {
      language: defaultLanguage,
      setLanguage: () => {},
      isReady: false
    };
  }
  return context;
}