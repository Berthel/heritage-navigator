'use client';

import { useState } from 'react';
import { Map, List, Clock, Heart, Settings, ChevronUp, Globe, Menu } from 'lucide-react';
import { HeritageSite } from '@/types/models';
import dynamic from 'next/dynamic';
import SiteList from './SiteList';

// Dynamically import Map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 animate-pulse" />
  ),
});

interface MobileLayoutProps {
  sites: HeritageSite[];
}

export default function MobileLayout({ sites }: MobileLayoutProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'da' | 'en' | 'pt'>('da');
  
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="px-4 py-3 bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Historiske Steder i Tavira</h1>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => {
                const nextLang = selectedLanguage === 'da' ? 'en' : selectedLanguage === 'en' ? 'pt' : 'da';
                setSelectedLanguage(nextLang);
              }}
            >
              <Globe size={20} />
              <span className="ml-1 text-sm">{selectedLanguage.toUpperCase()}</span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-14 mb-16 fixed inset-0 pt-14 pb-16">
        {/* Map View - Fixed 60% height */}
        <div className="h-[60%] w-full">
          <MapComponent sites={sites} />
        </div>

        {/* List View - Fixed 40% height */}
        <div className="h-[40%] bg-white overflow-y-auto">
          <SiteList sites={sites} selectedLanguage={selectedLanguage} />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t px-4 py-2">
        <div className="flex justify-around items-center">
          <button className="p-2 text-blue-600 flex flex-col items-center">
            <Map size={24} />
            <span className="text-xs">Kort</span>
          </button>
          <button className="p-2 flex flex-col items-center">
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
