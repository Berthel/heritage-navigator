import { HeritageSite } from '@/types/models';
import SiteCard from './SiteCard';
import { calculateDistance } from '@/utils/distance';

interface SiteListProps {
  sites: HeritageSite[];
  selectedLanguage?: 'da' | 'en' | 'pt';
  onSiteSelect?: (siteId: string) => void;
  onFavorite: (siteId: string) => void;
  isFavorite: (siteId: string) => boolean;
  showOnlyFavorites?: boolean;
  userLocation?: { latitude: number; longitude: number } | null;
}

export default function SiteList({ 
  sites, 
  selectedLanguage = 'da',
  onSiteSelect,
  onFavorite,
  isFavorite,
  showOnlyFavorites = false,
  userLocation
}: SiteListProps) {
  const filteredSites = showOnlyFavorites 
    ? sites.filter(site => isFavorite(site.id))
    : sites;

  // Calculate distances for each site if user location is available
  const sitesWithDistance = filteredSites.map(site => {
    if (userLocation && site.location) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        site.location.latitude,
        site.location.longitude
      );
      return { ...site, distance };
    }
    return site;
  });

  return (
    <div className="w-full max-w-2xl p-4">
      <div className="space-y-4">
        {sitesWithDistance.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            selectedLanguage={selectedLanguage}
            onSiteSelect={onSiteSelect ? () => onSiteSelect(site.id) : undefined}
            onFavorite={() => onFavorite(site.id)}
            isFavorite={isFavorite(site.id)}
            showDistance={!!userLocation}
          />
        ))}
      </div>
    </div>
  );
}
