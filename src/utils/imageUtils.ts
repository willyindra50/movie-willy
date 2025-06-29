const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (
  path: string | null,
  size: 'poster' | 'backdrop' = 'poster'
): string => {
  if (!path) {
    return 'https://placehold.co/500x750?text=No+Image';
  }

  const sizes = {
    poster: 'w500',
    backdrop: 'original',
  };

  return `${TMDB_IMAGE_BASE_URL}/${sizes[size]}${path}`;
};
