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
      console.log('Geolocation API ikke tilgængelig');
      setState(s => ({ ...s, error: 'Geolocation ikke understøttet', loading: false }));
      return;
    }

    console.log('Anmoder om geolocation tilladelse...');
    
    // Først prøver vi med getCurrentPosition for at få en hurtig første position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Første position modtaget:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setState({
          coordinates: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        console.log('Første positions-forsøg fejlede:', error.message);
        // Fortsætter med watchPosition selvom første forsøg fejlede
      },
      {
        enableHighAccuracy: false, // Starter med lavere nøjagtighed for hurtigere resultat
        timeout: 10000,
        maximumAge: 30000 // Tillader cachelagrede positioner op til 30 sekunder gamle
      }
    );

    // Derefter starter vi watchPosition for at følge ændringer
    const id = navigator.geolocation.watchPosition(
      (position) => {
        console.log('Position opdateret:', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setState({
          coordinates: [position.coords.latitude, position.coords.longitude],
          error: null,
          loading: false
        });
      },
      (error) => {
        console.log('Geolocation fejl:', error.message, 'Kode:', error.code);
        let errorMessage = error.message;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Browseren har ikke tilladelse til at bruge din lokation. Tjek browser-indstillingerne.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Din position kunne ikke findes. Prøv igen senere.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Det tog for lang tid at finde din position. Systemet vil fortsætte med at prøve.';
            // Ved timeout beholder vi den tidligere position hvis vi har en
            return;
            break;
        }
        
        setState(currentState => ({
          coordinates: error.code === error.TIMEOUT ? currentState.coordinates : null,
          error: errorMessage,
          loading: false
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // Øget timeout til 20 sekunder
        maximumAge: 10000 // Tillader positioner op til 10 sekunder gamle
      }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return state;
}
