'use client';

import { mockSites, mockCities } from '@/lib/mockData';
import MobileLayout from '@/components/MobileLayout';
import { useLanguage } from '@/hooks/useLanguage';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useLanguage();
  const city = mockCities[0]; // For nu bruger vi bare den første by

  return (
    <MobileLayout 
      sites={mockSites} 
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
      city={city}
    />
  );
}