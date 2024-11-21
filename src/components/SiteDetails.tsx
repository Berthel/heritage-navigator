'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Heart, Clock, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppHeader from './AppHeader';
import { HeritageSite, LocalizedField, City, Image, Period, DetailSection } from '@/types/models';
import { colors } from '@/styles/theme';
import NextImage from 'next/image';
import { PeriodBadge } from './PeriodBadge';
import { useLanguage } from '@/contexts/LanguageContext';
import { getImages, getPeriods } from '@/lib/api';

// Hjælpefunktion til at håndtere DetailSection content
const getLocalizedContent = (content: DetailSection['content'], language: 'da' | 'en' | 'pt'): string => {
  if (!content) return '';
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    return content.join(', ');
  } else if (typeof content === 'object' && content !== null) {
    return content[language] || '';
  }
  return '';
};

// Lokaliserede tekster
const translations = {
  back: {
    da: 'Tilbage',
    en: 'Back',
    pt: 'Voltar'
  },
  openNow: {
    da: 'Åben nu',
    en: 'Open now',
    pt: 'Aberto agora'
  },
  about: {
    da: 'Om stedet',
    en: 'About',
    pt: 'Sobre'
  },
  shareLocation: {
    da: 'Del lokation',
    en: 'Share location',
    pt: 'Compartilhar localização'
  }
} as const;

interface SiteDetailsProps {
  site: HeritageSite;
  city: City;
  initialLanguage?: 'da' | 'en' | 'pt';
}

const SiteDetails = ({ site, city }: SiteDetailsProps) => {
  const { language, setLanguage } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [siteImages, setSiteImages] = useState<Image[]>([]);
  const [sitePeriods, setSitePeriods] = useState<Period[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch images when component mounts
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const allImages = await getImages();
        const relevantImages = allImages.filter(img => site.images.includes(img.id));
        setSiteImages(relevantImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [site.images]);

  // Fetch periods when component mounts
  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const allPeriods = await getPeriods();
        const relevantPeriods = allPeriods.filter(p => site.periods.includes(p.id));
        setSitePeriods(relevantPeriods);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };

    if (site.periods && site.periods.length > 0) {
      fetchPeriods();
    }
  }, [site.periods]);

  const t = (key: keyof typeof translations) => translations[key][language];

  const mainImage = site.thumbnailImage ? siteImages.find(img => img.id === site.thumbnailImage) : null;

  // Find the text content section if it exists
  const textContentSection = site.detailedInfo?.sections?.find(
    section => section.type === 'text'
  );

  const detailText = textContentSection?.content;

  // Get all images for the gallery
  const galleryImages = siteImages.filter(img => img.id !== site.thumbnailImage);

  // State for modal
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Helper function to safely get alt text
  const getImageAlt = (image: Image) => {
    if (!image.alt || !image.alt[language]) {
      return site.name[language]; // Fallback to site name if no alt text
    }
    return image.alt[language];
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: site.name[language],
          text: site.description[language],
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // eller en mere sofistikeret loading indikator
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader 
        selectedLanguage={language}
        onLanguageChange={setLanguage}
        city={city}
      />

      <main className="flex-1 overflow-auto pt-[72px]">
        <div className="relative">
          {mainImage ? (
            <div className="w-full relative aspect-video">
              <NextImage
                src={mainImage.url}
                alt={getImageAlt(mainImage)}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          ) : (
            <div className="w-full relative aspect-video bg-gray-100 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
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
          <Button 
            variant="outline" 
            size="sm"
            className="absolute top-4 left-4 bg-white/80 hover:bg-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('back')}
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">
                {site.name[language]}
              </h2>
              {sitePeriods.length > 0 && (
                <PeriodBadge 
                  period={sitePeriods[0]} 
                  selectedLanguage={language}
                  className="mt-1"
                />
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} 
              />
            </Button>
          </div>

          <div className="flex gap-4 text-sm" style={{ color: colors.text.muted }}>
            {site.openingHours?.[0] && (
              <span className="flex items-center text-green-600">
                <Clock className="w-4 h-4 mr-1" />
                {t('openNow')}
              </span>
            )}
            {site.location && (
              <span className="flex items-center">
                <Map className="w-4 h-4 mr-1" />
                {/* TODO: Implement distance calculation */}
                757 m
              </span>
            )}
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2" style={{ color: colors.text.dark }}>
                {t('about')}
              </h3>
              <div className="space-y-4">
                {detailText && (
                  <p 
                    className="whitespace-pre-line"
                    style={{ color: colors.text.muted }}
                  >
                    {getLocalizedContent(detailText, language)}
                  </p>
                )}
                {!detailText && (
                  <p 
                    className="whitespace-pre-line"
                    style={{ color: colors.text.muted }}
                  >
                    {site.description[language]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Gallery */}
          {galleryImages.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.map((image, index) => (
                    <div 
                      key={image.id} 
                      className="relative aspect-[4/3] cursor-pointer"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <NextImage
                        src={image.url}
                        alt={getImageAlt(image)}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Image Modal */}
          {selectedImageIndex !== null && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div className="relative w-full max-w-4xl aspect-[4/3]">
                <NextImage
                  src={galleryImages[selectedImageIndex].url}
                  alt={getImageAlt(galleryImages[selectedImageIndex])}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <button 
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={() => setSelectedImageIndex(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SiteDetails;
