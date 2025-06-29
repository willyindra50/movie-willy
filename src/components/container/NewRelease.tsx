import React, { useRef, useCallback } from 'react';
import { useNewReleases } from '../../hooks/useNewReleases';
import MovieCard from './MovieCard/MovieCard';
import type { Movie } from '../../interfaces/movie.interface';
import { useNavigate } from 'react-router-dom';

const NewRelease: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNewReleases(24);
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  const movies = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <section className='container section-spacing'>
      <h2 className='text-title mb-6'>New Release</h2>
      {isLoading && <div className='text-body'>Loading...</div>}
      {isError && (
        <div className='text-red-500'>Failed to load new releases.</div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
        {movies.map((movie: Movie, index: number) => (
          <div
            key={movie.id}
            ref={index === movies.length - 1 ? lastMovieElementRef : undefined}
            className='movie-card'
          >
            <MovieCard
              movie={movie}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className='text-body text-center py-4'>Loading more...</div>
      )}
    </section>
  );
};

export default NewRelease;
