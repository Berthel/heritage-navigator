'use client';

import { Globe, Menu } from 'lucide-react';

interface AppHeaderProps {
  selectedLanguage: 'da' | 'en' | 'pt';
  onLanguageChange: (lang: 'da' | 'en' | 'pt') => void;
}

export default function AppHeader({ selectedLanguage, onLanguageChange }: AppHeaderProps) {
  return (
    <header className="px-4 py-3 bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">Heritage Navigator</h1>
            <h2 className="text-sm text-gray-600">Tavira</h2>
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => {
                const nextLang = selectedLanguage === 'da' ? 'en' : selectedLanguage === 'en' ? 'pt' : 'da';
                onLanguageChange(nextLang);
              }}
            >
              <Globe size={20} />
              <span className="ml-1 text-sm">{selectedLanguage.toUpperCase()}</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
