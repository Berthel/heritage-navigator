import { HeritageSite } from '@/types/models';
import SiteCard from './SiteCard';

interface SiteListProps {
  sites: HeritageSite[];
  selectedLanguage?: 'da' | 'en' | 'pt';
  onSiteSelect?: (siteId: string) => void;
  onFavorite: (siteId: string) => void;
  isFavorite: (siteId: string) => boolean;
  showOnlyFavorites?: boolean;
}

export default function SiteList({ 
  sites, 
  selectedLanguage = 'da',
  onSiteSelect,
  onFavorite,
  isFavorite,
  showOnlyFavorites = false
}: SiteListProps) {
  const filteredSites = showOnlyFavorites 
    ? sites.filter(site => isFavorite(site.id))
    : sites;

  return (
    <div className="w-full max-w-2xl p-4">
      <div className="space-y-4">
        {filteredSites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            selectedLanguage={selectedLanguage}
            onShowOnMap={() => onSiteSelect?.(site.id)}
            onReadMore={() => onSiteSelect?.(site.id)}
            onFavorite={onFavorite}
            isFavorite={isFavorite(site.id)}
          />
        ))}
      </div>
    </div>
  );
}
