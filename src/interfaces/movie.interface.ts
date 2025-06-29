export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  genre_ids?: number[];
  genres?: Genre[];
  adult?: boolean;
  videos?: {
    results: Video[];
  };
  credits?: Credits;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Video {
  id: string;
  key: string;
  type: string;
  site: string;
  official: boolean;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  crew: CrewMember[];
  cast: CastMember[];
}
