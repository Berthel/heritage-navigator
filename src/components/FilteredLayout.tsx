import { Period, getLocalizedField, HeritageSite } from '@/types/models';
import { X } from 'lucide-react';
import SiteList from './SiteList';

interface FilteredLayoutProps {
  selectedPeriod: Period | null;
  sites: HeritageSite[];
  selectedLanguage: 'da' | 'en' | 'pt';
  onClearFilter: () => void;
  onSiteSelect?: (siteId: string) => void;
  onFavorite?: (siteId: string) => void;
  isFavorite?: (siteId: string) => boolean;
  userLocation?: { latitude: number; longitude: number } | null;
  children?: React.ReactNode;
}

export default function FilteredLayout({
  selectedPeriod,
  sites,
  selectedLanguage,
  onClearFilter,
  onSiteSelect,
  onFavorite,
  isFavorite,
  userLocation,
  children
}: FilteredLayoutProps) {
  if (!selectedPeriod) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Filter header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedPeriod.color }}
            />
            <span className="font-medium">
              {getLocalizedField(selectedPeriod.name, selectedLanguage)}
            </span>
          </div>
          <button
            onClick={onClearFilter}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Ryd filter"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <SiteList
          sites={sites}
          selectedLanguage={selectedLanguage}
          onSiteSelect={onSiteSelect}
          onFavorite={onFavorite || (() => {})}
          isFavorite={isFavorite || (() => false)}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
}
