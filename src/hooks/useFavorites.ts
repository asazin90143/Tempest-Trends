import { useState, useEffect } from 'react';
import { FavoriteCity } from '../lib/types';

export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Component mounted, safely load from localStorage
        const savedFavorites = localStorage.getItem('tempestFavorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error("Failed to parse favorites", error);
            }
        }
        setIsLoaded(true);
    }, []);

    const addFavorite = (city: FavoriteCity) => {
        const updated = [...favorites, city];
        setFavorites(updated);
        localStorage.setItem('tempestFavorites', JSON.stringify(updated));
    };

    const removeFavorite = (id: string) => {
        const updated = favorites.filter((fav) => fav.id !== id);
        setFavorites(updated);
        localStorage.setItem('tempestFavorites', JSON.stringify(updated));
    };

    const isFavorite = (cityName: string) => {
        return favorites.some((fav) => fav.cityName.toLowerCase() === cityName.toLowerCase());
    };

    return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
