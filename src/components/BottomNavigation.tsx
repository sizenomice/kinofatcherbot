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
        to="/payments" 
        className={`nav-item ${location.pathname === '/payments' ? 'active' : ''}`}
      >
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
        <span className="nav-label">Подписка</span>
      </Link>
    </nav>
  )
}

export default BottomNavigation
