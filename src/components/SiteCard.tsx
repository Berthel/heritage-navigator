'use client';

import { Clock, MapPin, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HeritageSite, Period, getLocalizedField } from '@/types/models';
import { formatDistance } from '@/utils/formatters';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getImages, getPeriods } from '@/lib/api';

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
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [primaryPeriodData, setPrimaryPeriodData] = useState<Period | null>(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const images = await getImages();
        const image = images.find(img => img.id === site.thumbnailImage);
        if (image) {
          setThumbnailUrl(image.thumbnailUrl || image.url);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };
    
    if (site.thumbnailImage) {
      fetchThumbnail();
    }
  }, [site.thumbnailImage]);

  useEffect(() => {
    const fetchPeriodData = async () => {
      try {
        const periods = await getPeriods();
        const period = periods.find(p => p.id === site.primaryPeriod);
        if (period) {
          setPrimaryPeriodData(period);
        }
      } catch (error) {
        console.error('Error fetching period:', error);
      }
    };
    
    if (site.primaryPeriod) {
      fetchPeriodData();
    }
  }, [site.primaryPeriod]);

  const t = (key: keyof typeof translations) => translations[key][selectedLanguage];
  const isOpen = true; // TODO: Implementer åbningstider

  return (
    <motion.div 
      layout
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail med periode indikator */}
        <div className="relative flex-shrink-0 w-[30vw] min-w-[100px] max-w-[120px]">
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden relative bg-gray-100">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={getLocalizedField(site.name, selectedLanguage)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 100px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            {primaryPeriodData && (
              <div 
                className="absolute -left-1.5 -top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm z-10"
                style={{ backgroundColor: primaryPeriodData.color }}
                title={getLocalizedField(primaryPeriodData.name, selectedLanguage)}
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

          <div className="flex items-center gap-4 mt-2">
            {onSiteSelect && (
              <button 
                onClick={() => onSiteSelect(site.id)}
                className="text-blue-600 flex items-center hover:underline"
              >
                <span className="mr-1">{t('showOnMap')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <Link
              href={`/site/${site.id}`}
              className="text-blue-600 flex items-center hover:underline ml-auto"
            >
              <span className="mr-1">{t('readMore')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}