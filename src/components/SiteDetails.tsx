'use client';

import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Clock, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppHeader from './AppHeader';
import { HeritageSite, LocalizedField, City } from '@/types/models';
import { colors } from '@/styles/theme';
import Image from 'next/image';
import { PeriodBadge } from './PeriodBadge';

interface SiteDetailsProps {
  site: HeritageSite;
  city: City;
}

export default function SiteDetails({ site, city }: SiteDetailsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: site.name[selectedLanguage],
          text: site.description[selectedLanguage],
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const mainImage = site.images.find(img => img.id === site.thumbnailImage);
  const detailTextSection = site.detailedInfo.sections.find(section => section.type === 'text');
  const detailText = detailTextSection?.content as LocalizedField | undefined;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        city={city}
      />

      <main className="flex-1 overflow-auto pt-[72px]">
        <div className="relative">
          {mainImage && (
            <div className="w-full relative aspect-video">
              <Image
                src={mainImage.url}
                alt={mainImage.alt[selectedLanguage]}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="absolute top-4 left-4 bg-white/80 hover:bg-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbage
          </Button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: colors.text.dark }}>
                {site.name[selectedLanguage]}
              </h2>
              {site.periods && site.periods.length > 0 && (
                <PeriodBadge period={site.periods[0]} selectedLanguage={selectedLanguage} />
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
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Åben nu
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
                Om stedet
              </h3>
              <p 
                className="whitespace-pre-line"
                style={{ color: colors.text.muted }}
              >
                {detailText?.[selectedLanguage]}
              </p>
            </CardContent>
          </Card>

          {/* TODO: Add image gallery */}
          {/* TODO: Add opening hours details */}
          {/* TODO: Add accessibility information */}
        </div>
      </main>

      <footer className="border-t bg-white p-4 safe-area-bottom">
        <div className="flex justify-center items-center max-w-md mx-auto">
          <Button 
            variant="ghost"
            onClick={handleShare}
            style={{ color: colors.text.dark }}
          >
            <Share2 className="w-5 h-5 mr-2" />
            <span className="text-sm">Del lokation</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
