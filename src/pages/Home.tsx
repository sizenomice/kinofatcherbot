import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchMoviesQuery, useGetMoviesQuery } from '../store/slices/poiskkinoSlice'
import { useDebounce } from '../hooks/useDebounce'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  setSearchQuery,
  setPage,
  setAllMovies,
  appendMovies,
  setHasMore,
  resetPagination,
} from '../store/slices/searchSlice'
import type { Movie } from '../store/slices/poiskkinoSlice'
import MoviePopup from '../components/MoviePopup'
import './Home.css'

function Home() {
  const dispatch = useAppDispatch()
  const { searchQuery, page, allMovies, hasMore } = useAppSelector((state) => state.search)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchMoviesQuery(
    { query: debouncedSearchQuery, limit: 20, page },
    { skip: !debouncedSearchQuery.trim() }
  )

  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useGetMoviesQuery(
    { page, limit: 20 },
    { skip: !!debouncedSearchQuery.trim() }
  )

  const isTyping = searchQuery.trim() !== debouncedSearchQuery.trim()
  
  const currentData = debouncedSearchQuery.trim() 
    ? searchData 
    : (searchQuery.trim() ? null : moviesData)
  const isLoading = debouncedSearchQuery.trim() 
    ? isSearching 
    : (searchQuery.trim() ? false : isLoadingMovies)
  const error = debouncedSearchQuery.trim() ? searchError : moviesError
  
  const showLoading = isLoading || isTyping

  useEffect(() => {
    dispatch(resetPagination())
  }, [debouncedSearchQuery, dispatch])

  useEffect(() => {
    if (searchQuery.trim() && !debouncedSearchQuery.trim()) {
      dispatch(setAllMovies([]))
      dispatch(setHasMore(true))
    }
  }, [searchQuery, debouncedSearchQuery, dispatch])

  useEffect(() => {
    if (currentData?.docs && currentData.docs.length > 0) {
      if (page === 1) {
        dispatch(setAllMovies(currentData.docs))
      } else {
        dispatch(appendMovies(currentData.docs))
      }
      
      const totalPages = currentData.pages || 1
      const hasMorePages = page < totalPages
      const hasMoreItems = currentData.docs.length >= (currentData.limit || 20)
      dispatch(setHasMore(hasMorePages && hasMoreItems))
    } else if (currentData?.docs && currentData.docs.length === 0 && page > 1) {
      dispatch(setHasMore(false))
    }
  }, [currentData, page, dispatch])

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries
    if (target.isIntersecting && hasMore && !isLoading && !isTyping && allMovies.length > 0) {
      dispatch(setPage(page + 1))
    }
  }, [hasMore, isLoading, isTyping, allMovies.length, page, dispatch])

  useEffect(() => {
    const element = observerTarget.current
    if (!element || !hasMore) return

    const option = {
      threshold: 0.1,
      rootMargin: '200px',
    }

    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [handleObserver, hasMore])

  const handleClear = () => {
    dispatch(setSearchQuery(''))
    dispatch(resetPagination())
  }

  return (
    <div className="home-page">
      <div className="search-container">
        <div className="search-form">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Введите название фильма..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {'status' in error
            ? `Ошибка: ${error.status}`
            : 'Ошибка при загрузке фильмов'}
        </div>
      )}

      {showLoading && page === 1 && allMovies.length === 0 ? (
        <div className="loading-container">
          <div className="loading-icon-wrapper">
            <img 
              src="/favicon.svg" 
              alt="Loading" 
              className="loading-icon"
            />
          </div>
        </div>
      ) : null}

      {allMovies.length > 0 && (
        <>
          <div className="movies-grid">
            {allMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="movie-poster">
                  <img
                    src={movie.poster?.url || movie.poster?.previewUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.name || movie.alternativeName || 'Фильм'}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/300x450?text=No+Image'
                    }}
                  />
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">
                    {movie.name || movie.alternativeName || 'Без названия'}
                  </h3>
                  <p className="movie-year">
                    {movie.year && `${movie.year}`}
                    {movie.rating?.kp && ` • ⭐ ${movie.rating.kp.toFixed(1)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {isLoading && page > 1 && !isTyping && (
            <div className="loading-container" style={{ padding: '24px' }}>
              <div className="loading-icon-wrapper">
                <img 
                  src="/favicon.svg" 
                  alt="Loading" 
                  className="loading-icon"
                />
              </div>
            </div>
          )}
          
          {hasMore && !isLoading && (
            <div 
              ref={observerTarget} 
              style={{ 
                height: '50px', 
                marginTop: '20px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div className="loading-icon-wrapper-small">
                <img 
                  src="/favicon.svg" 
                  alt="Loading" 
                  className="loading-icon-small"
                />
              </div>
            </div>
          )}
          
          {!hasMore && allMovies.length > 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '24px', 
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Все фильмы загружены
            </div>
          )}
        </>
      )}

      {!showLoading && allMovies.length === 0 && debouncedSearchQuery.trim() && !isTyping && (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Фильмы не найдены</p>
          <p className="empty-subtitle">Попробуйте изменить запрос</p>
        </div>
      )}

      <MoviePopup 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  )
}

export default Home
