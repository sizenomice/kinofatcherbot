import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Payments from './pages/Payments'
import BottomNavigation from './components/BottomNavigation'
import LoadingScreen from './components/LoadingScreen'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const theme = useTheme()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const classes: string[] = [theme]
    if (!isInitialLoad) {
      classes.push('loaded')
    }
    document.body.className = classes.join(' ')
  }, [theme, isInitialLoad])

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {isInitialLoad && <LoadingScreen />}
      {!isInitialLoad && (
        <div className={`app-container ${theme}`}>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payments" element={<Payments />} />
            </Routes>
          </main>
          <BottomNavigation />
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
