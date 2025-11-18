import { memo } from 'react'

interface SearchIconProps {
  className?: string
  strokeWidth?: number
}

function SearchIcon({ className = '', strokeWidth = 2 }: SearchIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

export default memo(SearchIcon)

