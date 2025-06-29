import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNewReleases } from '../services/api';
import type { MovieListResponse } from '../interfaces/movie.interface';

export const useNewReleases = (pageSize: number = 24) => {
  return useInfiniteQuery<MovieListResponse, Error>({
    queryKey: ['new-releases'],
    queryFn: ({ pageParam = 1 }) => fetchNewReleases(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= Math.ceil(lastPage.total_results / pageSize)
        ? nextPage
        : undefined;
    },
    initialPageParam: 1,
  });
};
