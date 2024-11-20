"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { HeritageSite, getLocalizedField, City, Period } from '@/types/models';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapContainer as LeafletMapContainer, useMap } from 'react-leaflet';
import { MapPin, Crosshair, Clock } from 'lucide-react';

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
  activeSiteId?: string;
  selectedLanguage: string;
  city: City;
}

// Center Control Component
function CenterControl({ coordinates, city }: { coordinates: [number, number] | null, city: City }) {
  const map = useMap();
  const CITY_CENTER: [number, number] = [city.location.latitude, city.location.longitude];
  const [isUserLocation, setIsUserLocation] = useState(false);

  const toggleCenter = () => {
    if (coordinates && isUserLocation) {
      // If we're showing user location and coordinates are available, switch to city center
      map.flyTo(CITY_CENTER, map.getZoom(), {
        duration: 1.5
      });
      setIsUserLocation(false);
    } else if (coordinates) {
      // If coordinates are available and we're showing city center, switch to user location
      map.flyTo(coordinates, map.getZoom(), {
        duration: 1.5
      });
      setIsUserLocation(true);
    } else {
      // If no coordinates available, center on city
      map.flyTo(CITY_CENTER, map.getZoom(), {
        duration: 1.5
      });
    }
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={toggleCenter}
          className={`bg-white p-2 shadow-md rounded-lg m-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${!coordinates ? 'opacity-50' : ''}`}
          title={isUserLocation ? `Vis ${getLocalizedField(city.name, 'da')} centrum` : "Vis min position"}
        >
          {isUserLocation ? (
            <MapPin className="w-6 h-6" />
          ) : (
            <Crosshair className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function Map({ 
  sites = [], 
  center,
  zoom = 15,
  activeSiteId,
  selectedLanguage,
  city
}: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [periods, setPeriods] = useState<Period[]>([]);
  const { coordinates, error, loading } = useGeolocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Fix for default markers in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/marker-icon-2x.png',
      iconUrl: '/marker-icon.png',
      shadowUrl: '/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    // Fetch periods when component mounts
    const fetchPeriods = async () => {
      try {
        const periodsData = await getPeriods();
        setPeriods(periodsData);
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    };
    fetchPeriods();
  }, []);

  useEffect(() => {
    if (map && center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);

  if (!mounted || !sites) return null;

  const defaultCenter: [number, number] = [city.location.latitude, city.location.longitude];

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center || defaultCenter}
        zoom={zoom}
        className="w-full h-full"
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {sites.map((site) => {
          const primaryPeriod = periods.find(p => p.id === site.primaryPeriod);
          if (!primaryPeriod) return null;

          const isActive = site.id === activeSiteId;
          const markerSize = isActive ? 20 : 12;
          const markerColor = isActive ? '#4CAF50' : primaryPeriod.color;
          const borderWidth = isActive ? 3 : 2;

          return (
            <Marker
              key={site.id}
              position={[site.location.latitude, site.location.longitude]}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="
                  background-color: ${markerColor}; 
                  width: ${markerSize}px; 
                  height: ${markerSize}px; 
                  border-radius: 50%; 
                  border: ${borderWidth}px solid white; 
                  box-shadow: 0 0 6px rgba(0,0,0,0.4);
                  transition: all 0.3s ease;
                "></div>`,
                iconSize: [markerSize, markerSize],
                iconAnchor: [markerSize/2, markerSize/2]
              })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-1">
                    {getLocalizedField(site.name, selectedLanguage)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {getLocalizedField(site.description, selectedLanguage)}
                  </p>
                  {site.status !== 'active' && (
                    <div className="text-red-500 text-sm">
                      {site.status === 'temporary_closed' ? 'Midlertidigt lukket' : 'Permanent lukket'}
                    </div>
                  )}
                  {site.location.accessibility && (
                    <div className="text-sm text-gray-500 mt-2">
                      <strong>Tilgængelighed:</strong><br/>
                      {getLocalizedField(site.location.accessibility, selectedLanguage)}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {coordinates && (
          <Circle
            center={coordinates}
            radius={10}
            pathOptions={{ color: '#4CAF50', fillColor: '#4CAF50' }}
          />
        )}
        <CenterControl coordinates={coordinates} city={city} />
      </MapContainer>
    </div>
  );
}
