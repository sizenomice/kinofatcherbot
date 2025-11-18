import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useSearchMoviesQuery, useGetMoviesQuery } from '../store/slices/poiskkinoSlice'
import { useDebounce } from '../hooks/useDebounce'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  setSearchQuery,
  setAllMovies,
  resetPagination,
  setPage,
  appendMovies,
  setHasMore,
} from '../store/slices/searchSlice'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import type { Movie } from '../store/slices/poiskkinoSlice'
import MoviePopup from '../components/MoviePopup'
import MovieCard from '../components/MovieCard'
import SearchInput from '../components/common/SearchInput'
import LoadingIcon from '../components/common/LoadingIcon'
import ErrorMessage from '../components/common/ErrorMessage'
import EmptyState from '../components/common/EmptyState'
import './Home.css'

function Home() {
  const dispatch = useAppDispatch()
  const { searchQuery, allMovies, page, hasMore } = useAppSelector((state) => state.search)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const isLoadingMoreRef = useRef(false)
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const trimmedDebouncedQuery = useMemo(() => debouncedSearchQuery.trim(), [debouncedSearchQuery])
  const trimmedSearchQuery = useMemo(() => searchQuery.trim(), [searchQuery])
  const isTyping = useMemo(() => trimmedSearchQuery !== trimmedDebouncedQuery, [trimmedSearchQuery, trimmedDebouncedQuery])
  
  const { data: searchData, isLoading: isSearching, error: searchError } = useSearchMoviesQuery(
    { query: trimmedDebouncedQuery, limit: 20, page: 1 },
    { skip: !trimmedDebouncedQuery }
  )

  const { data: moviesData, isLoading: isLoadingMovies, error: moviesError } = useGetMoviesQuery(
    { page: 1, limit: 20 },
    { skip: !!trimmedDebouncedQuery }
  )

  const { data: searchDataPage, isLoading: isSearchingPage } = useSearchMoviesQuery(
    { query: trimmedDebouncedQuery, limit: 20, page: page },
    { skip: !trimmedDebouncedQuery || page === 1 || !hasMore }
  )

  const { data: moviesDataPage, isLoading: isLoadingMoviesPage } = useGetMoviesQuery(
    { page: page, limit: 20 },
    { skip: !!trimmedDebouncedQuery || page === 1 || !hasMore }
  )

  const currentData = useMemo(() => {
    if (trimmedDebouncedQuery) return searchData
    if (trimmedSearchQuery) return null
    return moviesData
  }, [trimmedDebouncedQuery, trimmedSearchQuery, searchData, moviesData])

  const isLoading = useMemo(() => {
    if (trimmedDebouncedQuery) return isSearching
    if (trimmedSearchQuery) return false
    return isLoadingMovies
  }, [trimmedDebouncedQuery, trimmedSearchQuery, isSearching, isLoadingMovies])

  const error = useMemo(() => {
    return trimmedDebouncedQuery ? searchError : moviesError
  }, [trimmedDebouncedQuery, searchError, moviesError])

  const showLoading = isLoading || isTyping

  useEffect(() => {
    dispatch(resetPagination())
    isLoadingMoreRef.current = false
  }, [trimmedDebouncedQuery, dispatch])

  useEffect(() => {
    if (trimmedSearchQuery && !trimmedDebouncedQuery) {
      dispatch(setAllMovies([]))
    }
  }, [trimmedSearchQuery, trimmedDebouncedQuery, dispatch])

  useEffect(() => {
    if (!currentData || isLoading) return

    if (currentData.docs && currentData.docs.length > 0) {
      dispatch(setAllMovies(currentData.docs))
      const totalPages = currentData.pages || 0
      const currentPage = currentData.page || 1
      dispatch(setHasMore(currentPage < totalPages))
    }
  }, [currentData, isLoading, dispatch])

  useEffect(() => {
    const paginationData = trimmedDebouncedQuery ? searchDataPage : moviesDataPage
    const isPaginationLoading = trimmedDebouncedQuery ? isSearchingPage : isLoadingMoviesPage

    if (page === 1 || isPaginationLoading) return

    if (paginationData) {
      if (paginationData.docs && paginationData.docs.length > 0) {
        dispatch(appendMovies(paginationData.docs))
        const totalPages = paginationData.pages || 0
        const currentPage = paginationData.page || 1
        dispatch(setHasMore(currentPage < totalPages))
      } else {
        dispatch(setHasMore(false))
      }
      isLoadingMoreRef.current = false
    }
  }, [searchDataPage, moviesDataPage, isSearchingPage, isLoadingMoviesPage, page, trimmedDebouncedQuery, dispatch])

  const loadNextPage = useCallback(() => {
    if (isLoadingMoreRef.current || !hasMore) return

    const isCurrentlyLoading = trimmedDebouncedQuery 
      ? isSearchingPage 
      : isLoadingMoviesPage

    if (isCurrentlyLoading) return

    isLoadingMoreRef.current = true
    dispatch(setPage(page + 1))
  }, [page, hasMore, trimmedDebouncedQuery, isSearchingPage, isLoadingMoviesPage, dispatch])

  const isPaginationLoading = useMemo(() => {
    return trimmedDebouncedQuery ? isSearchingPage : isLoadingMoviesPage
  }, [trimmedDebouncedQuery, isSearchingPage, isLoadingMoviesPage])

  const { ref: loadMoreRef } = useIntersectionObserver(
    loadNextPage,
    {
      threshold: 0.1,
      rootMargin: '200px',
      enabled: hasMore && !isLoading && !isPaginationLoading && allMovies.length > 0,
    }
  )

  const handleClear = useCallback(() => {
    dispatch(setSearchQuery(''))
    dispatch(resetPagination())
    isLoadingMoreRef.current = false
  }, [dispatch])

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setSearchQuery(value))
  }, [dispatch])

  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie)
  }, [])

  const handleClosePopup = useCallback(() => {
    setSelectedMovie(null)
  }, [])

  return (
    <div className="home-page">
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleClear}
      />

      {error && <ErrorMessage />}

      {showLoading && allMovies.length === 0 && (
        <div className="loading-container">
          <LoadingIcon />
        </div>
      )}

      {allMovies.length > 0 && (
        <>
          <div className="movies-grid">
            {allMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>
          {hasMore && (
            <div ref={loadMoreRef} style={{ height: '20px', width: '100%' }}>
              {(trimmedDebouncedQuery ? isSearchingPage : isLoadingMoviesPage) && (
                <div className="loading-container">
                  <LoadingIcon />
                </div>
              )}
            </div>
          )}
        </>
      )}

      {!showLoading && allMovies.length === 0 && trimmedDebouncedQuery && !isTyping && (
        <EmptyState />
      )}

      <MoviePopup 
        movie={selectedMovie} 
        onClose={handleClosePopup} 
      />
    </div>
  )
}

export default Home
