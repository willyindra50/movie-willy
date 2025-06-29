import React from 'react';
import type { MovieCardProps } from './MovieCard.interface';

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/300x450?text=No+Image';

  return (
    <div
      className='bg-zinc-900 rounded-xl overflow-hidden shadow-md cursor-pointer w-full'
      onClick={() => onClick?.(movie)}
      tabIndex={0}
      role={onClick ? 'button' : undefined}
    >
      <div className='relative pt-[150%]'>
        {' '}
        {/* 2:3 Aspect Ratio (height is 150% of width) */}
        <img
          src={imageUrl}
          alt={movie.title}
          className='absolute inset-0 w-full h-full object-cover object-center bg-zinc-800'
          loading='lazy'
        />
      </div>
      <div className='p-3 flex flex-col gap-1'>
        <h3
          className='text-white text-base font-semibold truncate'
          title={movie.title}
        >
          {movie.title}
        </h3>
        <div className='flex items-center gap-2 text-xs text-yellow-400'>
          <svg width='16' height='16' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z' />
          </svg>
          <span>{movie.vote_average?.toFixed(1) ?? 'N/A'}</span>
        </div>
        <span className='text-zinc-400 text-xs'>
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : '—'}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
