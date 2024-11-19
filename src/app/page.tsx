'use client';

import { mockSites } from '@/lib/mockData';
import MobileLayout from '@/components/MobileLayout';
import { useState } from 'react';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');

  return (
    <MobileLayout 
      sites={mockSites} 
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
    />
  );
}