import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchIcon from './icons/SearchIcon'
import MoneyIcon from './icons/MoneyIcon'
import './BottomNavigation.css'

function BottomNavigation() {
  const location = useLocation()

  return (
    <nav className="bottom-navigation">
      <Link 
        to="/" 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
      >
        <SearchIcon className="nav-icon" />
        <span className="nav-label">Поиск</span>
      </Link>
      <Link 
        to="/payments" 
        className={`nav-item ${location.pathname === '/payments' ? 'active' : ''}`}
      >
        <MoneyIcon className="nav-icon" />
        <span className="nav-label">Подписка</span>
      </Link>
    </nav>
  )
}

export default memo(BottomNavigation)
