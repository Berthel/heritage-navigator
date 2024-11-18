import { HeritageSite } from '@/types/models';
import SiteCard from './SiteCard';

interface SiteListProps {
  sites: HeritageSite[];
  selectedLanguage?: 'da' | 'en' | 'pt';
  onSiteSelect?: (siteId: string) => void;
}

export default function SiteList({ 
  sites, 
  selectedLanguage = 'da',
  onSiteSelect 
}: SiteListProps) {
  return (
    <div className="w-full max-w-2xl p-4">
      <div className="space-y-4">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            selectedLanguage={selectedLanguage}
            onShowOnMap={() => onSiteSelect?.(site.id)}
            onReadMore={() => onSiteSelect?.(site.id)}
          />
        ))}
      </div>
    </div>
  );
}
