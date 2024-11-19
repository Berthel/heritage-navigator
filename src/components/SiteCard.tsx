import React from 'react';
import { Heart, MapPin, ChevronRight, Clock, Navigation2 } from 'lucide-react';
import { HeritageSite, getLocalizedField, isOpenNow } from '@/types/models';
import { calculateDistance, formatDistance } from '@/lib/distance';

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
  const primaryPeriod = site.periods.find(p => p.id === site.primaryPeriod);
  const isOpen = isOpenNow(site.openingHours);

  const handleShowOnMap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShowOnMap?.(site.id);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReadMore?.(site.id);
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
      // Åbn Google Maps med rutevejledning
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
      <div className="flex items-start gap-3">
        {/* Thumbnail image */}
        <div className="flex-shrink-0">
          {site.thumbnailImage && (
            <div className="w-[120px] h-[90px] rounded-lg overflow-hidden">
              <img
                src={site.images.find(img => img.id === site.thumbnailImage)?.thumbnailUrl || 
                     site.images.find(img => img.id === site.thumbnailImage)?.url}
                alt={getLocalizedField(site.images.find(img => img.id === site.thumbnailImage)?.alt, selectedLanguage)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Period indicator and content */}
        <div className="flex items-start gap-3 flex-1">
          {/* Period indicator */}
          {primaryPeriod && (
            <div 
              className="h-2 w-2 mt-2 rounded-full"
              style={{ backgroundColor: primaryPeriod.color }}
              title={getLocalizedField(primaryPeriod.name, selectedLanguage)}
            />
          )}
          
          <div className="flex-1">
            {/* Header with title and favorite */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">
                  {getLocalizedField(site.name, selectedLanguage)}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  {site.status !== 'active' && (
                    <span className="text-red-500">
                      {site.status === 'temporary_closed' ? 'Midlertidigt lukket' : 'Permanent lukket'}
                    </span>
                  )}
                  {site.status === 'active' && (
                    <span className={isOpen ? 'text-green-500' : 'text-gray-500'}>
                      <Clock size={14} className="inline mr-1" />
                      {isOpen ? 'Åben nu' : 'Lukket'}
                    </span>
                  )}
                  {distance !== null && (
                    <button 
                      onClick={handleShowDirections}
                      className="text-blue-500 flex items-center gap-1 hover:text-blue-600 transition-colors"
                      title="Vis vej i Google Maps"
                    >
                      <Navigation2 size={14} />
                      {formatDistance(distance)}
                    </button>
                  )}
                </div>
              </div>
              <button 
                onClick={handleFavorite}
                className={`p-2 rounded-full hover:bg-gray-100 ${
                  isFavorite ? 'text-red-500' : 'text-gray-400'
                }`}
                aria-label={isFavorite ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">
              {getLocalizedField(site.description, selectedLanguage)}
            </p>

            {/* Tags */}
            {site.tags.length > 0 && (
              <div className="flex gap-2 mb-3">
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
                onClick={handleShowOnMap}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <MapPin size={16} />
                Vis på kort
              </button>
              <button 
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                onClick={handleReadMore}
              >
                <span className="text-sm">Læs mere</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
