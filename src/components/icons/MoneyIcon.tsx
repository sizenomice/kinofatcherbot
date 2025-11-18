import { memo } from 'react'

interface MoneyIconProps {
  className?: string
  strokeWidth?: number
}

function MoneyIcon({ className = '', strokeWidth = 2 }: MoneyIconProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth}
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  )
}

export default memo(MoneyIcon)

