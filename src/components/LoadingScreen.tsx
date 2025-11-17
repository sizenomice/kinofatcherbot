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
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

