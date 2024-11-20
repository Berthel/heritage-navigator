'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { colors } from '@/styles/theme';
import { City, getLocalizedField } from '@/types/models';
import { LanguageSelector } from './LanguageSelector';

interface AppHeaderProps {
  selectedLanguage: 'da' | 'en' | 'pt';
  onLanguageChange: (language: 'da' | 'en' | 'pt') => void;
  city: City;
}

export default function AppHeader({ selectedLanguage, onLanguageChange, city }: AppHeaderProps) {
  return (
    <header 
      className="px-4 py-3 fixed top-0 w-full z-50"
      style={{ 
        background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primary}ee)`,
        borderBottom: `1px solid ${colors.secondary}33`,
        paddingTop: '0.5rem'
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative animate-pulse">
            <Image
              src="/heritage-compass.svg"
              alt="Heritage Navigator Logo"
              width={40}
              height={40}
              className="animate-spin-slow"
              style={{ animationDuration: '10s' }}
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: colors.text.light }}>
              Heritage Navigator
            </h1>
            <h2 className="text-xl" style={{ color: colors.secondary }}>
              {getLocalizedField(city.name, selectedLanguage)}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="mt-0.5">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
          </div>
          <button 
            className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
            style={{ color: colors.text.light }}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
