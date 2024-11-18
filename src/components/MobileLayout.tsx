'use client';

import { useState } from 'react';
import { Map, List, Clock, Heart, Settings, ChevronUp } from 'lucide-react';
import { HeritageSite } from '@/types/models';
import dynamic from 'next/dynamic';
import SiteList from './SiteList';
import AppHeader from './AppHeader';

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
  
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <AppHeader 
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* Main Content */}
      <main className="flex-1 mt-20 mb-16">
        {view === 'map' ? (
          <>
            <div className={`${expanded ? 'h-full' : 'h-2/5'} relative`}>
              <MapComponent sites={sites} />
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
                <SiteList sites={sites} selectedLanguage={selectedLanguage} />
              </div>
            )}
          </>
        ) : (
          <div className="h-full overflow-y-auto">
            <SiteList sites={sites} selectedLanguage={selectedLanguage} />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t px-4 py-2">
        <div className="flex justify-around items-center">
          <button 
            className={`p-2 flex flex-col items-center ${view === 'map' ? 'text-blue-600' : ''}`}
            onClick={() => setView('map')}
          >
            <Map size={24} />
            <span className="text-xs">Kort</span>
          </button>
          <button 
            className={`p-2 flex flex-col items-center ${view === 'list' ? 'text-blue-600' : ''}`}
            onClick={() => setView('list')}
          >
            <List size={24} />
            <span className="text-xs">Liste</span>
          </button>
          <button className="p-2 flex flex-col items-center">
            <Clock size={24} />
            <span className="text-xs">Perioder</span>
          </button>
          <button className="p-2 flex flex-col items-center">
            <Heart size={24} />
            <span className="text-xs">Favoritter</span>
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
