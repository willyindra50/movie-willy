interface Video {
  type: string;
  site: string;
}

interface CrewMember {
  id: number;
  job: string;
  name: string;
}

interface Movie {
  videos?: {
    results?: Video[];
  };
  credits?: {
    crew?: CrewMember[];
  };
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const getAgeRating = (isAdult: boolean): string => {
  return isAdult ? '18+' : 'All Ages';
};

export const findOfficialTrailer = (movie: Movie): Video | undefined => {
  return movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
};

export const getMainCrew = (movie: Movie): CrewMember[] => {
  const crew = movie.credits?.crew || [];
  const mainRoles = ['Director', 'Screenplay', 'Story', 'Writer'];

  return crew
    .filter((person) => mainRoles.includes(person.job))
    .reduce((acc: CrewMember[], person) => {
      if (!acc.find((p) => p.id === person.id)) {
        acc.push(person);
      }
      return acc;
    }, [])
    .slice(0, 3);
};
