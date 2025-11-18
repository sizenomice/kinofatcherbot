import { memo } from 'react'

interface CloseIconProps {
  className?: string
  strokeWidth?: number
}

function CloseIcon({ className = '', strokeWidth = 2 }: CloseIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export default memo(CloseIcon)

