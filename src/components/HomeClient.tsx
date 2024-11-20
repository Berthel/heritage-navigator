'use client';

import { useState } from 'react';
import FilteredLayout from '@/components/FilteredLayout';
import MobileLayout from '@/components/MobileLayout';
import { HeritageSite, City } from '@/types/models';

interface HomeClientProps {
  sites: HeritageSite[];
  city: City;
}

export default function HomeClient({ sites, city }: HomeClientProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');

  const handleClearFilter = () => {
    // Implementation af clear filter
    console.log('Clear filter');
  };

  const handleLanguageChange = (language: 'da' | 'en' | 'pt') => {
    setSelectedLanguage(language);
  };

  return (
    <main>
      <div className="hidden md:block">
        <FilteredLayout 
          sites={sites} 
          selectedPeriod={null}
          selectedLanguage={selectedLanguage}
          onClearFilter={handleClearFilter}
          city={city} 
        />
      </div>
      <div className="md:hidden">
        <MobileLayout 
          sites={sites} 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          city={city} 
        />
      </div>
    </main>
  );
}
