'use client';

import { HeritageSite, City } from '@/types/models';
import SiteDetails from '@/components/SiteDetails';

interface SiteClientProps {
  site: HeritageSite;
  city: City;
  initialLanguage: 'da' | 'en' | 'pt';
}

export default function SiteClient({ site, city, initialLanguage }: SiteClientProps) {
  return (
    <main>
      <SiteDetails site={site} city={city} initialLanguage={initialLanguage} />
    </main>
  );
}
