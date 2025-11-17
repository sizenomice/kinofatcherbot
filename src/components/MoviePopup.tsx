import { useEffect } from 'react'
import type { Movie } from '../store/slices/poiskkinoSlice'
import './MoviePopup.css'

interface MoviePopupProps {
  movie: Movie | null
  onClose: () => void
}

function MoviePopup({ movie, onClose }: MoviePopupProps) {
  useEffect(() => {
    if (movie) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [movie])

  if (!movie) return null

  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-container">
        <div className="popup-content">
          <div className="popup-poster">
            <button className="popup-close" onClick={onClose} aria-label="Закрыть">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <img
              src={movie.poster?.url || movie.poster?.previewUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
              alt={movie.name || movie.alternativeName || 'Фильм'}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://via.placeholder.com/300x450?text=No+Image'
              }}
            />
          </div>
          
          <div className="popup-info">
            <h2 className="popup-title">
              {movie.name || movie.alternativeName || 'Без названия'}
            </h2>
            
            {movie.alternativeName && movie.alternativeName !== movie.name && (
              <p className="popup-alternative-name">{movie.alternativeName}</p>
            )}
            
            <div className="popup-meta">
              {movie.year && (
                <span className="popup-meta-item">{movie.year}</span>
              )}
              {movie.movieLength && (
                <span className="popup-meta-item">{movie.movieLength} мин</span>
              )}
              {movie.rating?.kp && (
                <span className="popup-meta-item">⭐ {movie.rating.kp.toFixed(1)}</span>
              )}
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="popup-genres">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="popup-genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {movie.countries && movie.countries.length > 0 && (
              <div className="popup-countries">
                <span className="popup-label">Страны: </span>
                {movie.countries.map((country, index) => (
                  <span key={index}>
                    {country.name}
                    {index < movie.countries!.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}
            
            {movie.description && (
              <div className="popup-description">
                <p>{movie.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviePopup

