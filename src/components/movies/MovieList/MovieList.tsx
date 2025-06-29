import React from 'react';
import type { Movie } from '../../../interfaces/movie.interface';
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onMovieClick,
  className = '',
  loading = false,
  error = null,
}) => {
  if (loading) {
    return <div className='text-body'>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>;
  }

  if (movies.length === 0) {
    return <div className='text-body'>No movies found.</div>;
  }

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 ${className}`}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick?.(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
