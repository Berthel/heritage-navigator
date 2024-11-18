"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeritageSite, getLocalizedField } from '@/types/models';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '@/hooks/useGeolocation';

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
const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);

interface MapProps {
  sites?: HeritageSite[];
  center?: [number, number];
  zoom?: number;
}

export default function Map({ 
  sites = [], 
  center = [37.1283, -7.6506], 
  zoom = 15 
}: MapProps) {
  const { coordinates, error, loading } = useGeolocation();
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

  console.log('Rendering map with center:', coordinates || center);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={coordinates || center}
        zoom={zoom}
        className="h-full w-full rounded-lg"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && (
          <Circle
            center={coordinates}
            radius={20}
            pathOptions={{ color: '#2563EB', fillColor: '#3B82F6' }}
          />
        )}
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
      {error && (
        <div className="absolute bottom-4 left-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg shadow">
          {error}
        </div>
      )}
    </div>
  );
}
