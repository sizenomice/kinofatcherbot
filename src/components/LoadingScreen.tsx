import { memo } from 'react'
import { useTheme } from '../hooks/useTheme'
import './LoadingScreen.css'

function LoadingScreen() {
  const theme = useTheme()

  return (
    <div className={`loading-screen ${theme}`}>
      <div className="loading-content">
        <div className="loading-icon-wrapper">
          <img 
            src="/favicon.svg" 
            alt="App Icon" 
            className="loading-icon"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  )
}

export default memo(LoadingScreen)
