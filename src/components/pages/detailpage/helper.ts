import type {
  Movie,
  Video,
  CrewMember,
} from '../../../interfaces/movie.interface';

/**
 * Finds the official trailer from the movie's video results
 */
export const findOfficialTrailer = (movie: Movie): Video | undefined => {
  return movie.videos?.results.find(
    (video: Video) =>
      video.type === 'Trailer' && video.site === 'YouTube' && video.official
  );
};

/**
 * Gets the main crew members (Director, Writer, Producer, etc.) from the movie credits
 */
export const getMainCrew = (movie: Movie): CrewMember[] => {
  if (!movie.credits?.crew) return [];

  return movie.credits.crew
    .filter((c: CrewMember) =>
      [
        'Director',
        'Writer',
        'Screenplay',
        'Producer',
        'Executive Producer',
      ].includes(c.job)
    )
    .reduce((uniqueCrew: CrewMember[], currentCrew: CrewMember) => {
      if (!uniqueCrew.some((item: CrewMember) => item.id === currentCrew.id)) {
        uniqueCrew.push(currentCrew);
      }
      return uniqueCrew;
    }, [])
    .slice(0, 5);
};

/**
 * Formats the movie rating to display with one decimal place
 */
export const formatRating = (rating: number): string => {
  return rating?.toFixed(1);
};

/**
 * Gets the appropriate age rating text based on the movie's adult flag
 */
export const getAgeRating = (isAdult?: boolean): string => {
  return isAdult ? '18+' : 'PG-13';
};

/**
 * Gets the full image URL for a movie poster or backdrop
 */
export const getImageUrl = (
  path: string | null,
  type: 'poster' | 'backdrop' = 'poster'
): string => {
  if (!path) {
    return type === 'poster'
      ? 'https://placehold.co/300x450?text=No+Image'
      : 'https://placehold.co/1280x720?text=No+Image';
  }

  const size = type === 'poster' ? 'w500' : 'original';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
