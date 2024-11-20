'use client';

import { Clock, MapPin, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeritageSite, getLocalizedField, getImageForContext } from '@/types/models';
import { formatDistance } from '@/utils/formatters';
import Link from 'next/link';
import Image from 'next/image';

interface SiteCardProps {
  site: HeritageSite;
  selectedLanguage: 'da' | 'en' | 'pt';
  onSiteSelect?: (siteId: string) => void;
  onFavorite?: (siteId: string) => void;
  isFavorite?: boolean;
  showDistance?: boolean;
}

// Lokaliserede tekster
const translations = {
  openNow: {
    da: 'Åben nu',
    en: 'Open now',
    pt: 'Aberto agora'
  },
  showOnMap: {
    da: 'Vis på kort',
    en: 'Show on map',
    pt: 'Mostrar no mapa'
  },
  readMore: {
    da: 'Læs mere',
    en: 'Read more',
    pt: 'Ler mais'
  }
} as const;

export default function SiteCard({ 
  site, 
  selectedLanguage, 
  onSiteSelect,
  onFavorite,
  isFavorite = false,
  showDistance = true
}: SiteCardProps) {
  const t = (key: keyof typeof translations) => translations[key][selectedLanguage];
  const isOpen = true; // TODO: Implementer åbningstider
  const thumbnailUrl = getImageForContext(site.images, site.thumbnailImage || '', 'thumbnail');
  const primaryPeriod = site.periods.find(p => p.id === site.primaryPeriod);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-sm p-4 relative"
    >
      <div className="flex gap-4">
        {/* Thumbnail med periode indikator */}
        <div className="relative flex-shrink-0 w-[30vw] min-w-[100px] max-w-[120px]">
          {primaryPeriod && (
            <div 
              className="absolute -left-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm z-10"
              style={{ backgroundColor: primaryPeriod.color }}
              title={getLocalizedField(primaryPeriod.name, selectedLanguage)}
            />
          )}
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={getLocalizedField(site.images.find(img => img.id === site.thumbnailImage)?.alt, selectedLanguage) || ''}
                width={120}
                height={90}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Title og beskrivelse */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">
                {getLocalizedField(site.name, selectedLanguage)}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {getLocalizedField(site.description, selectedLanguage)}
              </p>
            </div>
            {onFavorite && (
              <button 
                onClick={() => onFavorite(site.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
        {showDistance && site.distance !== undefined && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{formatDistance(site.distance, selectedLanguage)}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Clock className={`w-4 h-4 ${isOpen ? 'text-green-600' : 'text-gray-600'}`} />
          <span className={isOpen ? 'text-green-600' : 'text-gray-600'}>{isOpen ? t('openNow') : ''}</span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        {onSiteSelect && (
          <button 
            onClick={() => onSiteSelect(site.id)}
            className="text-blue-600 flex items-center hover:underline"
          >
            {t('showOnMap')}
          </button>
        )}
        <Link 
          href={`/site/${site.id}?lang=${selectedLanguage}`}
          className="text-blue-600 hover:underline ml-auto flex items-center gap-1"
        >
          {t('readMore')}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}