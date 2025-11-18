import { memo } from 'react'

interface PlayIconProps {
  className?: string
  strokeWidth?: number
}

function PlayIcon({ className = '', strokeWidth = 2 }: PlayIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default memo(PlayIcon)

