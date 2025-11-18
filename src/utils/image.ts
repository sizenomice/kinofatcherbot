const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x450?text=No+Image'

/**
 * Обработчик ошибки загрузки изображения
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement
  target.src = PLACEHOLDER_IMAGE
}

/**
 * Получает URL постера фильма или возвращает placeholder
 */
export const getMoviePosterUrl = (
  poster?: { url?: string; previewUrl?: string }
): string => {
  return poster?.url || poster?.previewUrl || PLACEHOLDER_IMAGE
}

