import { memo } from 'react'

interface LoadingIconProps {
  className?: string
  size?: 'small' | 'default'
}

function LoadingIcon({ className = '', size = 'default' }: LoadingIconProps) {
  const iconClassName = size === 'small' ? 'loading-icon-small' : 'loading-icon'
  const wrapperClassName = size === 'small' ? 'loading-icon-wrapper-small' : 'loading-icon-wrapper'

  return (
    <div className={wrapperClassName}>
      <img 
        src="/favicon.svg" 
        alt="Loading" 
        className={`${iconClassName} ${className}`}
        loading="eager"
        decoding="async"
      />
    </div>
  )
}

export default memo(LoadingIcon)

