import { memo } from 'react'

interface CheckCircleIconProps {
  className?: string
  strokeWidth?: number
}

function CheckCircleIcon({ className = '', strokeWidth = 2 }: CheckCircleIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default memo(CheckCircleIcon)

