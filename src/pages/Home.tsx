import { useState } from 'react'
import './Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setError('')
    
    try {
      // Здесь можно использовать реальный API для поиска фильмов
      // Например, OMDb API, TMDB API и т.д.
      // Для демонстрации используем заглушку
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Заглушка данных
      const mockMovies = [
        {
          id: 1,
          title: 'Пример фильма 1',
          year: '2024',
          poster: 'https://via.placeholder.com/300x450?text=Movie+1'
        },
        {
          id: 2,
          title: 'Пример фильма 2',
          year: '2023',
          poster: 'https://via.placeholder.com/300x450?text=Movie+2'
        }
      ]
      
      setMovies(mockMovies)
    } catch (err) {
      setError('Ошибка при поиске фильмов')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <div className="search-container">
        <h1 className="page-title">Поиск фильмов</h1>
        <form onSubmit={handleSearch} className="search-form">
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
                onClick={() => {
                  setSearchQuery('')
                  setMovies([])
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Поиск...' : 'Найти'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Поиск фильмов...</p>
        </div>
      )}

      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} />
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && searchQuery && (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Фильмы не найдены</p>
          <p className="empty-subtitle">Попробуйте изменить запрос</p>
        </div>
      )}

      {!searchQuery && movies.length === 0 && (
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
