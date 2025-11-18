import { memo } from 'react'

interface CheckIconProps {
  className?: string
  strokeWidth?: number
}

function CheckIcon({ className = '', strokeWidth = 2 }: CheckIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default memo(CheckIcon)

