import React, { useRef, useCallback, useState } from 'react';
import { useTrendingMovies } from '../../hooks/useTrendingMovies';
import MovieCard from './MovieCard/MovieCard';
import type { Movie } from '../../interfaces/movie.interface';
import { useNavigate } from 'react-router-dom';

const TrendingNow: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTrendingMovies(24);
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'next' | 'prev') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 224; // Approximate width of a movie card + gap-6 (200px + 24px)
      if (direction === 'next') {
        scrollContainerRef.current.scrollLeft += scrollAmount;
        setCurrentIndex((prev) => Math.min(prev + 1, movies.length - 1));
      } else {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <section className='container section-spacing'>
      <h2 className='text-title mb-6'>Trending Now</h2>
      {isLoading && <div className='text-body'>Loading...</div>}
      {isError && (
        <div className='text-red-500'>Failed to load trending movies.</div>
      )}
      <div className='relative'>
        <div
          className='flex gap-6 overflow-x-auto pb-2 custom-scrollbar'
          ref={scrollContainerRef}
        >
          {movies.map((movie: Movie, index: number) => (
            <div
              key={movie.id}
              ref={
                index === movies.length - 1 ? lastMovieElementRef : undefined
              }
              className='w-40 md:w-48 flex-shrink-0 snap-center'
            >
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={() => scroll('prev')}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors hidden md:block'
          aria-label='Previous slide'
          disabled={currentIndex === 0}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 18l-6-6 6-6' />
          </svg>
        </button>
        <button
          onClick={() => scroll('next')}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors hidden md:block'
          aria-label='Next slide'
          disabled={currentIndex === movies.length - 1}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M9 18l6-6-6-6' />
          </svg>
        </button>
      </div>
      {isFetchingNextPage && (
        <div className='text-body text-center py-4'>Loading more...</div>
      )}
    </section>
  );
};

export default TrendingNow;
