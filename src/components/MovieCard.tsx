import { memo } from 'react'
import type { Movie } from '../store/slices/poiskkinoSlice'
import { handleImageError, getMoviePosterUrl } from '../utils/image'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

const MovieCard = memo(({ movie, onClick }: MovieCardProps) => {
  const posterUrl = getMoviePosterUrl(movie.poster)
  const title = movie.name || movie.alternativeName || 'Без названия'
  const year = movie.year
  const rating = movie.rating?.kp

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">
          {year && `${year}`}
          {rating && ` • ⭐ ${rating.toFixed(1)}`}
        </p>
      </div>
    </div>
  )
})

MovieCard.displayName = 'MovieCard'

export default MovieCard

