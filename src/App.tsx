import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import BottomNavigation from './components/BottomNavigation'
import LoadingScreen from './components/LoadingScreen'
import { useTheme } from './hooks/useTheme'
import { useGetMoviesQuery } from './store/slices/poiskkinoSlice'
import './App.css'

function App() {
  const theme = useTheme()
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { isLoading } = useGetMoviesQuery({ page: 1, limit: 20 })
  const loadStartTime = useRef<number>(Date.now())
  const MIN_LOADING_TIME = 5000

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      const elapsedTime = Date.now() - loadStartTime.current
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime)
      
      const timer = setTimeout(() => {
        setIsInitialLoad(false)
      }, remainingTime + 300)
      
      return () => clearTimeout(timer)
    }
  }, [isLoading, isInitialLoad])

  return (
    <BrowserRouter>
      {isInitialLoad && <LoadingScreen />}
      <div className={`app-container ${theme}`}>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  )
}

export default App
