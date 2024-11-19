'use client';

import { useParams } from 'next/navigation';
import { mockSites } from '@/lib/mockData';
import SiteDetails from '@/components/SiteDetails';

export default function SitePage() {
  const params = useParams();
  const site = mockSites.find(site => site.id === params.id);

  if (!site) {
    return <div>Site not found</div>;
  }

  return <SiteDetails site={site} />;
}
