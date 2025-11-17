import { Link, useLocation } from 'react-router-dom'
import './BottomNavigation.css'

function BottomNavigation() {
  const location = useLocation()

  return (
    <nav className="bottom-navigation">
      <Link 
        to="/" 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="nav-label">Поиск</span>
      </Link>
      <Link 
        to="/about" 
        className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="nav-label">О приложении</span>
      </Link>
    </nav>
  )
}

export default BottomNavigation

