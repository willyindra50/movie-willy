import type { Movie } from '../../../interfaces/movie.interface';

export interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}
