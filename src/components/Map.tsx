"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeritageSite, getLocalizedField } from '@/types/models';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapContainer as LeafletMapContainer, useMap } from 'react-leaflet';

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

// Center Control Component
function CenterControl({ coordinates }: { coordinates: [number, number] | null }) {
  const map = useMap();
  const TAVIRA_CENTER: [number, number] = [37.1283, -7.6506];
  const [isUserLocation, setIsUserLocation] = useState(false);

  const toggleCenter = () => {
    if (coordinates) {
      const newCenter = isUserLocation ? TAVIRA_CENTER : coordinates;
      map.flyTo(newCenter, map.getZoom(), {
        duration: 1.5 // Animation duration in seconds
      });
      setIsUserLocation(!isUserLocation);
    }
  };

  return coordinates ? (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={toggleCenter}
          className="bg-white p-2 shadow-md rounded-lg m-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          title={isUserLocation ? "Vis Tavira centrum" : "Vis min position"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
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
        <CenterControl coordinates={coordinates} />
        {coordinates && (
          <Circle
            center={coordinates}
            radius={20}
            pathOptions={{ 
              color: '#22C55E',         // Grøn kant
              fillColor: '#86EFAC',     // Lysere grøn fyld
              weight: 2,                // Tykkere kant
              fillOpacity: 0.6          // Semi-transparent fyld
            }}
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
