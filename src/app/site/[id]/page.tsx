'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { mockSites, mockCities } from '@/lib/mockData';
import SiteDetails from '@/components/SiteDetails';

// Type guard to validate language parameter
function isValidLanguage(lang: string | null): lang is 'da' | 'en' | 'pt' {
  return lang === 'da' || lang === 'en' || lang === 'pt';
}

export default function SitePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang');
  const selectedLanguage = isValidLanguage(langParam) ? langParam : 'da';
  const site = mockSites.find(site => site.id === params.id);
  const city = mockCities.find(city => city.id === site?.cityId);

  if (!site || !city) {
    return <div>Site not found</div>;
  }

  return <SiteDetails site={site} city={city} initialLanguage={selectedLanguage} />;
}
