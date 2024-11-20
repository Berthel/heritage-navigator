'use client';

import { useState, useMemo, useEffect } from 'react';
import { Map as MapIcon, List, Clock, Heart, Settings, ChevronUp } from 'lucide-react';
import { HeritageSite, Period, City } from '@/types/models';
import dynamic from 'next/dynamic';
import SiteList from './SiteList';
import AppHeader from './AppHeader';
import { useFavorites } from '@/hooks/useFavorites';
import { useGeolocation } from '@/hooks/useGeolocation';
import PeriodFilter from './PeriodFilter';
import FilteredLayout from './FilteredLayout';
import { Button } from '@/components/ui/button';
import { getPeriods } from '@/lib/api';

// Dynamically import Map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg bg-gray-100 animate-pulse" />
  ),
});

// Lokaliserede tekster
const translations = {
  list: {
    da: 'Liste',
    en: 'List',
    pt: 'Lista'
  },
  map: {
    da: 'Kort',
    en: 'Map',
    pt: 'Mapa'
  },
  period: {
    da: 'Periode',
    en: 'Period',
    pt: 'Período'
  },
  favorites: {
    da: 'Favoritter',
    en: 'Favorites',
    pt: 'Favoritos'
  },
  selectPeriod: {
    da: 'Vælg periode',
    en: 'Select period',
    pt: 'Selecionar período'
  },
  close: {
    da: 'Luk',
    en: 'Close',
    pt: 'Fechar'
  }
} as const;

interface MobileLayoutProps {
  sites: HeritageSite[];
  selectedLanguage: 'da' | 'en' | 'pt';
  onLanguageChange: (language: 'da' | 'en' | 'pt') => void;
  city: City;
}

export default function MobileLayout({ 
  sites, 
  selectedLanguage,
  onLanguageChange,
  city
}: MobileLayoutProps) {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [expanded, setExpanded] = useState(false);
  const [activeSiteId, setActiveSiteId] = useState<string | undefined>();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { coordinates } = useGeolocation();
  const [allPeriods, setAllPeriods] = useState<Period[]>([]);

  // Fetch periods when component mounts
  useEffect(() => {
    const fetchPeriods = async () => {
      try {
        const periodsData = await getPeriods();
        setAllPeriods(periodsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };
    fetchPeriods();
  }, []);

  // Helper function to get translations
  const t = (key: keyof typeof translations) => translations[key][selectedLanguage];

  // Udtræk unikke perioder fra sites baseret på deres periode IDs
  const periods = useMemo(() => {
    const uniquePeriodIds = new Set<string>();
    sites.forEach(site => {
      site.periods.forEach(periodId => {
        uniquePeriodIds.add(periodId);
      });
    });
    
    // Find de faktiske periode-objekter fra allPeriods
    const relevantPeriods = allPeriods.filter(period => 
      uniquePeriodIds.has(period.id)
    );
    
    return relevantPeriods.sort((a, b) => a.order - b.order);
  }, [sites, allPeriods]);

  // Find den valgte periode
  const selectedPeriod = useMemo(() => {
    if (!selectedPeriodId) return null;
    return periods.find(p => p.id === selectedPeriodId) || null;
  }, [periods, selectedPeriodId]);

  // Filtrer sites baseret på både favoritter og valgt periode
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      const matchesFavorites = !showOnlyFavorites || isFavorite(site.id);
      const matchesPeriod = !selectedPeriodId || site.periods.some(p => p === selectedPeriodId);
      return matchesFavorites && matchesPeriod;
    });
  }, [sites, showOnlyFavorites, isFavorite, selectedPeriodId]);

  // Håndter når en bruger vælger at se et site på kortet
  const handleSiteSelect = (siteId: string) => {
    setActiveSiteId(siteId);
    setView('map');
    setExpanded(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <AppHeader 
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        city={city}
      />

      {/* Main Content */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 pt-[4.5rem] pb-16">
          <FilteredLayout
            selectedPeriod={selectedPeriod}
            selectedLanguage={selectedLanguage}
            onClearFilter={() => setSelectedPeriodId(null)}
            sites={filteredSites}
            onSiteSelect={handleSiteSelect}
            onFavorite={toggleFavorite}
            isFavorite={isFavorite}
            userLocation={coordinates ? { latitude: coordinates[0], longitude: coordinates[1] } : null}
            city={city}
          >
            {view === 'map' ? (
              <>
                <div className={`${expanded ? 'h-full' : 'h-2/5'} relative`}>
                  <MapComponent 
                    sites={filteredSites} 
                    activeSiteId={activeSiteId} 
                    selectedLanguage={selectedLanguage}
                    city={city}
                  />
                  <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                    <button 
                      className="p-2 bg-white rounded-full shadow-lg"
                      onClick={() => setExpanded(!expanded)}
                    >
                      <ChevronUp 
                        size={24} 
                        className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {!expanded && (
                  <div className="h-3/5 overflow-y-auto">
                    <SiteList 
                      sites={filteredSites} 
                      selectedLanguage={selectedLanguage} 
                      onSiteSelect={handleSiteSelect}
                      onFavorite={toggleFavorite}
                      isFavorite={isFavorite}
                      userLocation={coordinates ? { latitude: coordinates[0], longitude: coordinates[1] } : null}
                    />
                  </div>
                )}
              </>
            ) : (
              <SiteList 
                sites={filteredSites}
                selectedLanguage={selectedLanguage}
                onSiteSelect={handleSiteSelect}
                onFavorite={toggleFavorite}
                isFavorite={isFavorite}
                userLocation={coordinates ? { latitude: coordinates[0], longitude: coordinates[1] } : null}
              />
            )}
          </FilteredLayout>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setView(view === 'map' ? 'list' : 'map')}
            className="flex flex-col items-center gap-1 px-4 text-blue-600"
          >
            {view === 'map' ? (
              <>
                <List size={20} />
                <span className="text-xs">{t('list')}</span>
              </>
            ) : (
              <>
                <MapIcon size={20} />
                <span className="text-xs">{t('map')}</span>
              </>
            )}
          </button>

          <button 
            onClick={() => setShowPeriodFilter(true)}
            className={`flex flex-col items-center gap-1 px-4 ${
              selectedPeriod ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Clock size={20} />
            <span className="text-xs">{t('period')}</span>
          </button>

          <button 
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex flex-col items-center gap-1 px-4 ${
              showOnlyFavorites ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Heart size={20} />
            <span className="text-xs">{t('favorites')}</span>
          </button>
        </div>
      </nav>

      {/* Period Filter Modal */}
      {showPeriodFilter && (
        <div className="fixed inset-0 bg-black/50 z-50">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{t('selectPeriod')}</h3>
              <PeriodFilter
                periods={periods}
                selectedPeriod={selectedPeriodId}
                onPeriodSelect={(periodId) => {
                  setSelectedPeriodId(periodId);
                  setShowPeriodFilter(false);
                }}
                selectedLanguage={selectedLanguage}
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowPeriodFilter(false)}
            >
              {t('close')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
