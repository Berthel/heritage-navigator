"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeritageSite, getLocalizedField } from '@/types/models';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface MapProps {
  sites?: HeritageSite[];
  center?: [number, number];
  zoom?: number;
}

export default function Map({ 
  sites = [], 
  center = [37.1283, -7.6506], // Tavira's coordinates
  zoom = 15 
}: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('Map component mounting...');
    setMounted(true);
    
    // Fix for default markers in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
    console.log('Leaflet icons configured');
  }, []);

  if (!mounted) {
    console.log('Map not mounted yet');
    return null;
  }

  console.log('Rendering map with center:', center);

  return (
    <div className="w-full h-[600px]">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.location.latitude, site.location.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{getLocalizedField(site.name, 'da')}</h3>
                <p className="text-sm">{getLocalizedField(site.description, 'da')}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
