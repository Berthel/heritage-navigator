'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage } from '@/types/models';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

// Provide a more descriptive error message if the context is used outside a provider
const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('da');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('heritage-navigator-language');
    if (stored && ['da', 'en', 'pt'].includes(stored)) {
      setLanguage(stored as SupportedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (mounted) {
      localStorage.setItem('heritage-navigator-language', lang);
    }
  };

  const value = {
    language,
    setLanguage: handleSetLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}