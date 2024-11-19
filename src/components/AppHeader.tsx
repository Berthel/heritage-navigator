'use client';

import { Menu } from 'lucide-react';

interface AppHeaderProps {
  selectedLanguage: 'da' | 'en' | 'pt';
  onLanguageChange: (language: 'da' | 'en' | 'pt') => void;
}

export default function AppHeader({ selectedLanguage, onLanguageChange }: AppHeaderProps) {
  return (
    <header className="px-4 py-3 bg-white border-b border-gray-100 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Heritage Navigator</h1>
          <h2 className="text-sm text-gray-500">Tavira</h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="rounded-full bg-gray-50 px-2 py-1 text-sm hover:bg-gray-100"
            onClick={() => {
              const nextLang = selectedLanguage === 'da' ? 'en' : selectedLanguage === 'en' ? 'pt' : 'da';
              onLanguageChange(nextLang);
            }}
          >
            {selectedLanguage.toUpperCase()}
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
