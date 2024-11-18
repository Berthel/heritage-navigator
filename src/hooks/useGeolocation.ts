import { useState, useEffect } from 'react';

interface GeolocationState {
  coordinates: [number, number] | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, error: 'Geolocation ikke understøttet', loading: false }));
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          coordinates: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        setState({
          coordinates: null,
          error: error.message,
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}
