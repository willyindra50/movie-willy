import React, { useState, useEffect } from 'react';
import type { Movie } from '../../interfaces/movie.interface';
import Button from '../ui/Button/Button';
import trailerLogoSvg from '../../assets/trailer-logo.svg';

interface HeroProps {
  movies: Movie[];
  onWatchTrailer?: () => void;
  onSeeDetail?: (movieId: number) => void;
}

const Hero: React.FC<HeroProps> = ({ movies, onWatchTrailer, onSeeDetail }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = movies[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [movies.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  if (!currentMovie) return null;

  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : 'https://placehold.co/1280x720?text=No+Image';

  return (
    <div className=' bg-zinc-950 flex flex-col'>
      <main className='flex-1'>
        <section className='relative w-full h-[393px] md:h-[80vh] flex items-end overflow-hidden'>
          {/* Background Image */}
          <img
            src={backdropUrl}
            alt={currentMovie.title}
            className='absolute inset-0 w-full h-full object-cover object-top z-0 transition-opacity duration-500'
            loading='eager'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10' />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors'
            aria-label='Previous slide'
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
            onClick={goToNextSlide}
            className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors'
            aria-label='Next slide'
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

          {/* Content */}
          <div className='relative z-20 max-w-7xl mx-auto px-6 md:px-20 pt-24 pb-12 md:pt-32 md:pb-16 flex flex-col gap-6 items-start justify-end w-full'>
            <h1 className='text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg'>
              {currentMovie.title}
            </h1>
            <p className='text-white/80 max-w-2xl text-base md:text-lg mb-4 line-clamp-3'>
              {currentMovie.overview}
            </p>
            <div className='flex gap-4'>
              <Button
                variant='primary'
                onClick={onWatchTrailer}
                className='flex items-center gap-2 pl-4 flex-row-reverse'
              >
                <img
                  src={trailerLogoSvg}
                  alt='Watch Trailer'
                  className='w-5 h-5'
                />
                Watch Trailer
              </Button>
              <Button
                variant='secondary'
                onClick={() => onSeeDetail?.(currentMovie.id)}
              >
                See Detail
              </Button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
