'use client';

import FilteredLayout from '@/components/FilteredLayout';
import MobileLayout from '@/components/MobileLayout';
import { HeritageSite, City } from '@/types/models';
import { useLanguage } from '@/contexts/LanguageContext';

interface HomeClientProps {
  sites: HeritageSite[];
  city: City;
}

export default function HomeClient({ sites, city }: HomeClientProps) {
  const { language, setLanguage } = useLanguage();

  const handleClearFilter = () => {
    // Implementation af clear filter
    console.log('Clear filter');
  };

  return (
    <main>
      <div className="hidden md:block">
        <FilteredLayout 
          sites={sites} 
          selectedPeriod={null}
          selectedLanguage={language}
          onClearFilter={handleClearFilter}
          city={city} 
        />
      </div>
      <div className="md:hidden">
        <MobileLayout 
          sites={sites} 
          selectedLanguage={language}
          onLanguageChange={setLanguage}
          city={city} 
        />
      </div>
    </main>
  );
}
