'use client';

import { mockSites, mockCities } from '@/lib/mockData';
import MobileLayout from '@/components/MobileLayout';
import { useState } from 'react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');
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