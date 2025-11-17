import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import BottomNavigation from './components/BottomNavigation'
import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const theme = useTheme()

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <BrowserRouter>
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
