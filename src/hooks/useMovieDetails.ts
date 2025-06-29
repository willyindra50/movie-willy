import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from '../services/api';
import type { Movie } from '../interfaces/movie.interface';

export const useMovieDetails = (movieId: number) => {
  return useQuery<Movie, Error>({
    queryKey: ['movie-details', movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
  });
};
