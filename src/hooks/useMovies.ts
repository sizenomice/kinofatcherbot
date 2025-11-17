import { useState } from 'react';
import {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetRandomMovieQuery,
  type MoviesParams,
  type SearchParams,
} from '../store/slices/poiskkinoSlice';

export const useMovies = () => {
  const [filters, setFilters] = useState<MoviesParams>({
    page: 1,
    limit: 20,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const moviesQuery = useGetMoviesQuery(filters, {
    skip: !!searchTerm,
  });

  const searchQuery = useSearchMoviesQuery(
    { query: searchTerm, ...filters } as SearchParams,
    { skip: !searchTerm }
  );

  const randomMovieQuery = useGetRandomMovieQuery();

  const currentQuery = searchTerm ? searchQuery : moviesQuery;

  return {
    data: currentQuery.data,
    isLoading: currentQuery.isLoading,
    error: currentQuery.error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    randomMovie: randomMovieQuery.data,
    refetchRandom: randomMovieQuery.refetch,
  };
};

