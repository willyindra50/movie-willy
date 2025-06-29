import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTrendingMovies } from '../services/api';
import type { MovieListResponse } from '../interfaces/movie.interface';

export const useTrendingMovies = (pageSize: number = 24) => {
  return useInfiniteQuery<MovieListResponse, Error>({
    queryKey: ['trending-movies'],
    queryFn: ({ pageParam = 1 }) => fetchTrendingMovies(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= Math.ceil(lastPage.total_results / pageSize)
        ? nextPage
        : undefined;
    },
    initialPageParam: 1,
  });
};
