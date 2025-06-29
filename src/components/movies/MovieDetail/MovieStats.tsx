import React from 'react';
import type { Movie } from '../../../interfaces/movie.interface';
import { formatRating, getAgeRating } from '../../../utils/movieUtils';

interface MovieStatsProps {
  movie: Movie;
  className?: string;
}

const MovieStats: React.FC<MovieStatsProps> = ({ movie, className = '' }) => {
  return (
    <div
      className={`flex flex-row md:flex-row gap-3 md:gap-5 mt-2 md:mt-0 md:gap-6 w-full ${className}`}
    >
      <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
        {/* Star Icon */}
        <svg
          className='text-yellow-500 mb-2 w-6 h-6'
          viewBox='0 0 24 24'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='0'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
        </svg>
        <div className='text-body'>Rating</div>
        <div className='text-subtitle'>
          {formatRating(movie.vote_average)}/10
        </div>
      </div>

      <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
        {/* Video Icon */}
        <svg
          className='text-white mb-2 w-6 h-6'
          viewBox='0 0 24 24'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='0'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polygon points='23 7 16 12 23 17 23 7' />
          <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
        </svg>
        <div className='text-body'>Genre</div>
        <div className='text-subtitle'>{movie.genres?.[0]?.name}</div>
      </div>

      <div className='stats-card flex-1 w-full h-[120px] md:h-[120px] md:w-[170px] md:min-w-[170px] flex flex-col justify-start items-start'>
        {/* Emoji Icon */}
        <svg
          className='text-white mb-2 w-6 h-6'
          viewBox='0 0 24 24'
          fill='currentColor'
          stroke='currentColor'
          strokeWidth='0'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='M8 14s1.5 2 4 2 4-2 4-2' />
          <line x1='9' y1='9' x2='9.01' y2='9' />
          <line x1='15' y1='9' x2='15.01' y2='9' />
        </svg>
        <div className='text-body'>Age Limit</div>
        <div className='text-subtitle'>
          {getAgeRating(movie.adult ?? false)}
        </div>
      </div>
    </div>
  );
};

export default MovieStats;
