import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import type { MovieListResponse } from '../interfaces/movie.interface';

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const fetchSearchMovies = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, string];
  pageParam?: number;
}): Promise<MovieListResponse> => {
  const [, searchQuery] = queryKey;

  if (!searchQuery) {
    return {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageParam}`;
  console.log('Fetching search results from URL:', url);

  const response = await fetch(url);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error('API Error Response:', response.status, errorBody);
    throw new Error(
      `Failed to fetch search results: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log('Search API Response:', data);
  return data;
};

export const useSearchMovies = (searchQuery: string) => {
  return useInfiniteQuery<
    MovieListResponse,
    Error,
    InfiniteData<MovieListResponse>,
    [string, string],
    number
  >({
    queryKey: ['searchMovies', searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchMovies({ queryKey: ['searchMovies', searchQuery], pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MovieListResponse) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: !!searchQuery, // Only fetch if search query is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime in v5)
  });
};
