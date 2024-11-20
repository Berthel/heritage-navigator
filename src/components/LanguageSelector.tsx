'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageButton } from './LanguageButton';
import { colors } from '@/styles/theme';

type Language = 'da' | 'en' | 'pt';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languageNames: Record<Language, string> = {
  da: 'Dansk',
  en: 'English',
  pt: 'Português'
};

const languageCodes: Record<Language, string> = {
  da: 'DA',
  en: 'EN',
  pt: 'PT'
};

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="language-selector relative">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          color: colors.text.light,
          background: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{languageCodes[selectedLanguage]}</span>
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu-button"
          tabIndex={-1}
          style={{ 
            background: colors.primary,
            border: `1px solid ${colors.secondary}33`
          }}
        >
          <div className="py-1" role="none">
            {(Object.keys(languageNames) as Language[]).map(lang => (
              <LanguageButton
                key={lang}
                language={lang}
                isSelected={selectedLanguage === lang}
                onClick={() => {
                  onLanguageChange(lang);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
