import { useEffect, useCallback, useMemo, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Movie } from '../store/slices/poiskkinoSlice'
import { useAppSelector } from '../hooks/useAppSelector'
import CloseIcon from './icons/CloseIcon'
import PlayIcon from './icons/PlayIcon'
import { handleImageError, getMoviePosterUrl } from '../utils/image'
import './MoviePopup.css'

interface MoviePopupProps {
  movie: Movie | null
  onClose: () => void
}

function MoviePopup({ movie, onClose }: MoviePopupProps) {
  const navigate = useNavigate()
  const subscription = useAppSelector((state) => state.subscription)

  const hasActiveSubscription = useMemo(() => {
    if (!subscription.endDate) return false
    const endDate = new Date(subscription.endDate)
    return endDate > new Date()
  }, [subscription.endDate])

  const handleWatch = useCallback(() => {
    if (hasActiveSubscription) {
      // Здесь можно добавить логику для просмотра фильма
      alert('Начинаем просмотр фильма!')
    } else {
      navigate('/payments')
      onClose()
    }
  }, [hasActiveSubscription, navigate, onClose])

  // Упрощенная логика блокировки скролла
  useEffect(() => {
    if (!movie) return

    // Блокируем скролл body
    document.body.style.overflow = 'hidden'
    document.body.classList.add('popup-open')
    
    const mainContent = document.querySelector('.main-content') as HTMLElement
    if (mainContent) {
      mainContent.style.overflow = 'hidden'
      mainContent.style.touchAction = 'none'
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('popup-open')
      if (mainContent) {
        mainContent.style.overflow = ''
        mainContent.style.touchAction = ''
      }
    }
  }, [movie])

  if (!movie) return null

  const posterUrl = getMoviePosterUrl(movie.poster)
  const title = movie.name || movie.alternativeName || 'Без названия'
  const alternativeName = movie.alternativeName && movie.alternativeName !== movie.name ? movie.alternativeName : null

  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-container">
        <div className="popup-content">
          <div className="popup-poster">
            <button className="popup-close" onClick={onClose} aria-label="Закрыть">
              <CloseIcon />
            </button>
            <img
              src={posterUrl}
              alt={title}
              loading="eager"
              decoding="async"
              onError={handleImageError}
            />
          </div>
          
          <div className="popup-info">
            <h2 className="popup-title">{title}</h2>
            
            {alternativeName && (
              <p className="popup-alternative-name">{alternativeName}</p>
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
                  <span key={`${genre.name}-${index}`} className="popup-genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            {movie.countries && movie.countries.length > 0 && (
              <div className="popup-countries">
                <span className="popup-label">Страны: </span>
                {movie.countries.map((country, index) => (
                  <span key={`${country.name}-${index}`}>
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
            
            <button className="popup-watch-button" onClick={handleWatch}>
              <PlayIcon className="watch-button-icon" />
              Смотреть
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(MoviePopup)
