import { memo } from 'react'
import SearchIcon from '../icons/SearchIcon'

interface EmptyStateProps {
  title?: string
  subtitle?: string
}

function EmptyState({ 
  title = 'Фильмы не найдены', 
  subtitle = 'Попробуйте изменить запрос' 
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <SearchIcon className="empty-icon" />
      <p>{title}</p>
      {subtitle && <p className="empty-subtitle">{subtitle}</p>}
    </div>
  )
}

export default memo(EmptyState)

