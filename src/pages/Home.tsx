import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchMoviesQuery, useGetMoviesQuery } from '../store/slices/poiskkinoSlice'
import { useDebounce } from '../hooks/useDebounce'
import type { Movie } from '../store/slices/poiskkinoSlice'
import './Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [hasMore, setHasMore] = useState(true)
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

  const currentData = debouncedSearchQuery.trim() ? searchData : moviesData
  const isLoading = debouncedSearchQuery.trim() ? isSearching : isLoadingMovies
  const error = debouncedSearchQuery.trim() ? searchError : moviesError

  useEffect(() => {
    setPage(1)
    setAllMovies([])
    setHasMore(true)
  }, [debouncedSearchQuery])

  useEffect(() => {
    if (currentData?.docs && currentData.docs.length > 0) {
      if (page === 1) {
        setAllMovies(currentData.docs)
      } else {
        setAllMovies(prev => {
          const existingIds = new Set(prev.map(m => m.id))
          const newMovies = currentData.docs.filter(m => !existingIds.has(m.id))
          return [...prev, ...newMovies]
        })
      }
      
      const totalPages = currentData.pages || 1
      const hasMorePages = page < totalPages
      const hasMoreItems = currentData.docs.length >= (currentData.limit || 20)
      setHasMore(hasMorePages && hasMoreItems)
    } else if (currentData?.docs && currentData.docs.length === 0 && page > 1) {
      setHasMore(false)
    }
  }, [currentData, page])

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries
    if (target.isIntersecting && hasMore && !isLoading && allMovies.length > 0) {
      setPage(prev => prev + 1)
    }
  }, [hasMore, isLoading, allMovies.length])

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
    setSearchQuery('')
    setPage(1)
  }

  return (
    <div className="home-page">
      <div className="search-container">
        <h1 className="page-title">Поиск фильмов</h1>
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
              onChange={(e) => setSearchQuery(e.target.value)}
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

      {page === 1 && isLoading && (
        <div className="loading-container">
          <img 
            src="/favicon.svg" 
            alt="Loading" 
            className="loading-icon"
          />
        </div>
      )}

      {allMovies.length > 0 && (
        <>
          <div className="movies-grid">
            {allMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
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
          
          {isLoading && page > 1 && (
            <div className="loading-container" style={{ padding: '24px' }}>
              <img 
                src="/favicon.svg" 
                alt="Loading" 
                className="loading-icon"
              />
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
              <img 
                src="/favicon.svg" 
                alt="Loading" 
                className="loading-icon-small"
              />
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

      {!isLoading && allMovies.length === 0 && debouncedSearchQuery && (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Фильмы не найдены</p>
          <p className="empty-subtitle">Попробуйте изменить запрос</p>
        </div>
      )}

      {!debouncedSearchQuery && !isLoading && allMovies.length === 0 && (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Начните поиск фильмов</p>
          <p className="empty-subtitle">Введите название фильма в поле поиска</p>
        </div>
      )}
    </div>
  )
}

export default Home
