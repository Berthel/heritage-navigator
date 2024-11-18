'use client';

import { useState, useMemo } from 'react';
import { Map as MapIcon, List, Clock, Heart, Settings, ChevronUp } from 'lucide-react';
import { HeritageSite, Period } from '@/types/models';
import dynamic from 'next/dynamic';
import SiteList from './SiteList';
import AppHeader from './AppHeader';
import { useFavorites } from '@/hooks/useFavorites';
import PeriodFilter from './PeriodFilter';
import FilteredLayout from './FilteredLayout';

// Dynamically import Map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full rounded-lg bg-gray-100 animate-pulse" />
  ),
});

interface MobileLayoutProps {
  sites: HeritageSite[];
}

export default function MobileLayout({ sites }: MobileLayoutProps) {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [expanded, setExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');
  const [activeSiteId, setActiveSiteId] = useState<string | undefined>();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showPeriodFilter, setShowPeriodFilter] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // Udtræk unikke perioder fra sites
  const periods = useMemo(() => {
    const uniquePeriods = new Map<string, Period>();
    sites.forEach(site => {
      if (!uniquePeriods.has(site.period.id)) {
        uniquePeriods.set(site.period.id, site.period);
      }
    });
    return Array.from(uniquePeriods.values());
  }, [sites]);

  // Find den valgte periode
  const selectedPeriod = useMemo(() => {
    if (!selectedPeriodId) return null;
    return periods.find(p => p.id === selectedPeriodId) || null;
  }, [periods, selectedPeriodId]);

  // Filtrer sites baseret på både favoritter og valgt periode
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      const matchesFavorites = !showOnlyFavorites || isFavorite(site.id);
      const matchesPeriod = !selectedPeriodId || site.period.id === selectedPeriodId;
      return matchesFavorites && matchesPeriod;
    });
  }, [sites, showOnlyFavorites, isFavorite, selectedPeriodId]);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <AppHeader 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Main Content */}
      <main className="flex-1 pt-[4.5rem] pb-16 relative">
        <FilteredLayout
          selectedPeriod={selectedPeriod}
          onClearFilter={() => setSelectedPeriodId(null)}
        >
          {view === 'map' ? (
            <>
              <div className={`${expanded ? 'h-full' : 'h-2/5'} relative`}>
                <MapComponent sites={filteredSites} activeSiteId={activeSiteId} />
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
                <div className="h-3/5 bg-white overflow-y-auto">
                  <SiteList 
                    sites={filteredSites} 
                    selectedLanguage={selectedLanguage} 
                    onSiteSelect={(siteId) => {
                      setActiveSiteId(siteId);
                      setExpanded(false);
                    }}
                    onFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="h-full overflow-y-auto">
              <SiteList 
                sites={filteredSites}
                selectedLanguage={selectedLanguage}
                onSiteSelect={(siteId) => {
                  setActiveSiteId(siteId);
                  setView('map');
                  setExpanded(false);
                }}
                onFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            </div>
          )}
        </FilteredLayout>
      </main>

      {/* Period Filter Modal */}
      {showPeriodFilter && (
        <PeriodFilter
          periods={periods}
          selectedPeriodId={selectedPeriodId}
          onSelectPeriod={(periodId) => {
            setSelectedPeriodId(periodId);
            setShowPeriodFilter(false);
          }}
          onClose={() => setShowPeriodFilter(false)}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            className={`p-2 flex flex-col items-center ${view === 'map' ? 'text-blue-600' : ''}`}
            onClick={() => setView('map')}
          >
            <MapIcon size={24} />
            <span className="text-xs">Kort</span>
          </button>
          <button 
            className={`p-2 flex flex-col items-center ${view === 'list' ? 'text-blue-600' : ''}`}
            onClick={() => setView('list')}
          >
            <List size={24} />
            <span className="text-xs">Liste</span>
          </button>
          <button 
            className={`p-2 flex flex-col items-center ${showOnlyFavorites ? 'text-red-500' : ''}`}
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          >
            <Heart size={24} fill={showOnlyFavorites ? 'currentColor' : 'none'} />
            <span className="text-xs">Favoritter</span>
          </button>
          <button 
            className={`p-2 flex flex-col items-center ${selectedPeriodId ? 'text-blue-600' : ''}`}
            onClick={() => setShowPeriodFilter(true)}
          >
            <Clock size={24} />
            <span className="text-xs">Perioder</span>
          </button>
          <button className="p-2 flex flex-col items-center">
            <Settings size={24} />
            <span className="text-xs">Mere</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
