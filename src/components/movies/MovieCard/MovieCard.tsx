import React from 'react';
import type { Movie } from '../../../interfaces/movie.interface';
import { getImageUrl } from '../../../utils/imageUtils';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`movie-card cursor-pointer ${className}`}
      onClick={onClick}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onClick) {
          onClick();
        }
      }}
    >
      <div className='relative aspect-[2/3] overflow-hidden rounded-xl'>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className='w-full h-full object-cover'
          loading='lazy'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity' />
      </div>
      <div className='mt-2'>
        <h3 className='text-white font-semibold line-clamp-1'>{movie.title}</h3>
        <p className='text-zinc-400 text-sm'>
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
