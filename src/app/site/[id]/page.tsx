'use client';

import { useParams } from 'next/navigation';
import { mockSites, mockCities } from '@/lib/mockData';
import SiteDetails from '@/components/SiteDetails';

export default function SitePage() {
  const params = useParams();
  const site = mockSites.find(site => site.id === params.id);
  const city = mockCities.find(city => city.id === site?.cityId);

  if (!site || !city) {
    return <div>Site not found</div>;
  }

  return <SiteDetails site={site} city={city} />;
}
