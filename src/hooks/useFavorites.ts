import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'heritage-navigator-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (siteId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(siteId)) {
        return prevFavorites.filter(id => id !== siteId);
      } else {
        return [...prevFavorites, siteId];
      }
    });
  };

  const isFavorite = (siteId: string) => favorites.includes(siteId);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}
