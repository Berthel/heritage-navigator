'use client';

import { MapPin, Heart, ChevronRight } from 'lucide-react';
import { getLocalizedField, HeritageSite, Period } from '@/types/models';
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
  const [sitePeriods, setSitePeriods] = useState<Period[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch images
        const allImages = await getImages();
        const relevantImages = allImages.filter(img => site.images.includes(img.id));
        if (site.thumbnailImage) {
          const thumbnail = relevantImages.find(img => img.id === site.thumbnailImage);
          if (thumbnail) {
            setThumbnailUrl(thumbnail.url);
          }
        }

        // Fetch periods
        if (site.periods && site.periods.length > 0) {
          const allPeriods = await getPeriods();
          const relevantPeriods = allPeriods.filter(p => site.periods.includes(p.id));
          setSitePeriods(relevantPeriods);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [site.images, site.thumbnailImage, site.periods]);

  const t = (key: keyof typeof translations) => translations[key][selectedLanguage];
  const isOpen = true; // TODO: Implementer åbningstider

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
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
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span>No image</span>
              </div>
            )}
          </div>
          {sitePeriods[0] && (
            <div 
              className="absolute top-2 left-2 w-3 h-3 rounded-full"
              style={{ backgroundColor: sitePeriods[0].color }}
            />
          )}
        </div>

        {/* Info sektion */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-900 leading-tight">
                {getLocalizedField(site.name, selectedLanguage)}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {getLocalizedField(site.description, selectedLanguage)}
              </p>
            </div>
            {onFavorite && (
              <button
                onClick={() => onFavorite(site.id)}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            )}
          </div>

          {/* Meta information */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
            {showDistance && site.distance !== undefined && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{formatDistance(site.distance, selectedLanguage)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <svg
                className={`w-4 h-4 ${isOpen ? 'text-green-600' : 'text-gray-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className={isOpen ? 'text-green-600' : 'text-gray-600'}>
                {isOpen ? t('openNow') : ''}
              </span>
            </div>
          </div>

          {/* Actions */}
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
    </div>
  );
}