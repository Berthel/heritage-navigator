'use client';

import { Period, getLocalizedField, HeritageSite, City } from '@/types/models';
import { X } from 'lucide-react';
import SiteList from './SiteList';
import { motion, AnimatePresence } from 'framer-motion';

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
  city: City;
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
  children,
  city
}: FilteredLayoutProps) {
  // Lokaliserede tekster
  const resultText = {
    da: sites.length === 1 ? 'seværdighed fundet' : 'seværdigheder fundet',
    en: sites.length === 1 ? 'site found' : 'sites found',
    pt: sites.length === 1 ? 'local encontrado' : 'locais encontrados'
  };

  // Periode år tekst
  const yearText = selectedPeriod && selectedPeriod.startYear && selectedPeriod.endYear
    ? `${selectedPeriod.startYear < 0 ? Math.abs(selectedPeriod.startYear) + ' f.Kr.' : selectedPeriod.startYear} - ${selectedPeriod.endYear < 0 ? Math.abs(selectedPeriod.endYear) + ' f.Kr.' : selectedPeriod.endYear}`
    : '';

  return (
    <div className="flex flex-col h-full">
      {children}
      {selectedPeriod && (
        <AnimatePresence>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white border-b"
          >
            {/* Filter header */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: selectedPeriod.color }}
                    />
                    <span className="font-medium">
                      {getLocalizedField(selectedPeriod.name, selectedLanguage)}
                    </span>
                    {yearText && (
                      <span className="text-sm text-gray-500">
                        ({yearText})
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {sites.length} {resultText[selectedLanguage]}
                  </p>
                </div>
                <button
                  onClick={onClearFilter}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Ryd filter"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Period description */}
              <p className="text-sm text-gray-600 mt-2">
                {getLocalizedField(selectedPeriod.description, selectedLanguage)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* Content */}
      {!children && (
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
      )}
    </div>
  );
}
