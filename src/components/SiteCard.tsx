import React from 'react';
import { Heart, MapPin, ChevronRight } from 'lucide-react';
import { HeritageSite, getLocalizedField } from '@/types/models';

interface SiteCardProps {
  site: HeritageSite;
  selectedLanguage: 'da' | 'en' | 'pt';
  onFavorite?: (siteId: string) => void;
  onShowOnMap?: (siteId: string) => void;
  onReadMore?: (siteId: string) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({
  site,
  selectedLanguage,
  onFavorite,
  onShowOnMap,
  onReadMore
}) => {
  return (
    <div className="bg-white rounded-lg border p-4 mb-3">
      <div className="flex items-start gap-3">
        {/* Period indicator */}
        <div 
          className="h-2 w-2 mt-2 rounded-full"
          style={{ backgroundColor: site.period.color }}
          title={site.period.name}
        />
        
        <div className="flex-1">
          {/* Header with title and favorite */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">
              {getLocalizedField(site.name, selectedLanguage)}
            </h3>
            <button 
              onClick={() => onFavorite?.(site.id)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3">
            {getLocalizedField(site.description, selectedLanguage)}
          </p>

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <button 
              onClick={() => onShowOnMap?.(site.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <MapPin size={16} />
              Vis på kort
            </button>
            <button 
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              onClick={() => onReadMore?.(site.id)}
            >
              <span className="text-sm">Læs mere</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCard;
