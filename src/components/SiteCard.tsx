import React from 'react';
import { Heart, MapPin, ChevronRight, Clock, Navigation2 } from 'lucide-react';
import { HeritageSite, getLocalizedField, isOpenNow } from '@/types/models';
import { calculateDistance, formatDistance } from '@/lib/distance';
import { useRouter } from 'next/navigation';

interface SiteCardProps {
  site: HeritageSite;
  selectedLanguage: string;
  onFavorite?: (siteId: string) => void;
  onShowOnMap?: (siteId: string) => void;
  onReadMore?: (siteId: string) => void;
  isFavorite?: boolean;
  userLocation?: { latitude: number; longitude: number } | null;
}

const SiteCard: React.FC<SiteCardProps> = ({
  site,
  selectedLanguage,
  onFavorite,
  onShowOnMap,
  onReadMore,
  isFavorite = false,
  userLocation
}) => {
  const router = useRouter();
  const primaryPeriod = site.periods.find(p => p.id === site.primaryPeriod);
  const isOpen = isOpenNow(site.openingHours);

  const handleShowMap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowOnMap?.(site.id);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/site/${site.id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.(site.id);
  };

  const handleShowDirections = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${site.location.latitude},${site.location.longitude}&travelmode=walking`;
      window.open(url, '_blank');
    }
  };

  const distance = userLocation ? calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    site.location.latitude,
    site.location.longitude
  ) : null;

  return (
    <div className="bg-white rounded-lg border p-4 mb-3">
      {/* Top section with image and main info */}
      <div className="flex gap-4 mb-4">
        {/* Thumbnail with period indicator */}
        <div className="relative flex-shrink-0 w-[30vw] min-w-[100px] max-w-[120px]">
          {primaryPeriod && (
            <div 
              className="absolute -left-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm z-10"
              style={{ backgroundColor: primaryPeriod.color }}
              title={getLocalizedField(primaryPeriod.name, selectedLanguage)}
            />
          )}
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            {site.thumbnailImage && (
              <img
                src={site.images.find(img => img.id === site.thumbnailImage)?.thumbnailUrl || 
                     site.images.find(img => img.id === site.thumbnailImage)?.url}
                alt={getLocalizedField(site.images.find(img => img.id === site.thumbnailImage)?.alt, selectedLanguage)}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Title and status section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900">
              {getLocalizedField(site.name, selectedLanguage)}
            </h3>
            <button 
              onClick={handleFavorite}
              className={`ml-2 p-1 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              aria-label={isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          {/* Status and distance */}
          <div className="flex items-center gap-3 mt-1">
            {site.status === 'active' && (
              <span className={`flex items-center ${isOpen ? 'text-green-500' : 'text-gray-500'}`}>
                <Clock className="w-4 h-4 mr-1" />
                <span>Åben nu</span>
              </span>
            )}
            {distance !== null && (
              <button 
                onClick={handleShowDirections}
                className="flex items-center text-blue-500"
                title="Vis vej i Google Maps"
              >
                <Navigation2 className="w-4 h-4 mr-1" />
                <span>{formatDistance(distance)}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Description section */}
      <p className="text-gray-600 text-sm mb-3">
        {getLocalizedField(site.description, selectedLanguage)}
      </p>

      {/* Bottom section with tags and actions */}
      <div className="space-y-3">
        {/* Tags */}
        {site.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {site.tags.map(tag => (
              <span 
                key={tag.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {getLocalizedField(tag.name, selectedLanguage)}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <button 
            onClick={handleShowMap}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <MapPin size={16} />
            Vis på kort
          </button>
          <button 
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
            onClick={handleReadMore}
          >
            <span className="text-sm">Læs mere</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;