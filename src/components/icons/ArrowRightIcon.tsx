import { memo } from 'react'

interface ArrowRightIconProps {
  className?: string
  strokeWidth?: number
}

function ArrowRightIcon({ className = '', strokeWidth = 2 }: ArrowRightIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default memo(ArrowRightIcon)

