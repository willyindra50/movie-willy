import { useState, useEffect } from 'react';
import type { Movie } from '../interfaces/movie.interface';

const FAVORITES_STORAGE_KEY = 'movie_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsedFavorites = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      // console.log('Initial load of favorites from localStorage:', parsedFavorites);
      return parsedFavorites;
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      // console.log('Saved favorites to localStorage:', favorites);
    } catch (error) {
      console.error('Failed to save favorites to localStorage', error);
    }
  }, [favorites]);

  const isFavorite = (movie: Movie) => {
    return favorites.some((favMovie) => favMovie.id === movie.id);
  };

  const toggleFavorite = (movie: Movie): boolean => {
    const wasFavorite = isFavorite(movie);
    setFavorites((prevFavorites) => {
      const newFavorites = wasFavorite
        ? prevFavorites.filter((favMovie) => favMovie.id !== movie.id)
        : [...prevFavorites, movie];
      // console.log('Toggling favorite, new state:', newFavorites);
      return newFavorites;
    });
    return wasFavorite; // Return true if it was removed, false if it was added
  };

  return { favorites, isFavorite, toggleFavorite };
};
