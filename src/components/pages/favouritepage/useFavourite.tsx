import { useState, useEffect } from 'react';
import type { Movie } from './helper';

export const useFavourite = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favouriteMovies');
    if (storedFavourites) {
      setFavouriteMovies(JSON.parse(storedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  const addFavourite = (movie: Movie) => {
    setFavouriteMovies((prevMovies) => [...prevMovies, movie]);
  };

  const removeFavourite = (id: number) => {
    setFavouriteMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== id)
    );
  };

  const isFavourite = (id: number) => {
    return favouriteMovies.some((movie) => movie.id === id);
  };

  return { favouriteMovies, addFavourite, removeFavourite, isFavourite };
};
