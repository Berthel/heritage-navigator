'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { colors } from '@/styles/theme';

interface AppHeaderProps {
  selectedLanguage: 'da' | 'en' | 'pt';
  onLanguageChange: (language: 'da' | 'en' | 'pt') => void;
}

export default function AppHeader({ selectedLanguage, onLanguageChange }: AppHeaderProps) {
  return (
    <header 
      className="px-4 py-3 fixed top-0 w-full z-50"
      style={{ 
        background: `linear-gradient(to bottom, ${colors.primary}, ${colors.primary}ee)`,
        borderBottom: `1px solid ${colors.secondary}33`
      }}
    >
      <div className="flex justify-between items-center">
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
            <h1 className="text-xl font-semibold" style={{ color: colors.text.light }}>
              Heritage Navigator
            </h1>
            <h2 className="text-sm" style={{ color: colors.secondary }}>
              Tavira
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="rounded-full px-3 py-1.5 text-sm border transition-colors duration-200"
            style={{ 
              borderColor: colors.secondary,
              color: colors.text.light,
              background: 'transparent',
            }}
            onClick={() => {
              const nextLang = selectedLanguage === 'da' ? 'en' : selectedLanguage === 'en' ? 'pt' : 'da';
              onLanguageChange(nextLang);
            }}
          >
            {selectedLanguage.toUpperCase()}
          </button>
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
