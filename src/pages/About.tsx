import './About.css'

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <div className="app-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <h1 className="about-title">О приложении</h1>
          <p className="about-subtitle">Поиск и информация о фильмах</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2 className="section-title">Описание</h2>
            <p className="section-text">
              KinoFetcherBot — это удобное приложение для поиска информации о фильмах. 
              Используйте его для быстрого поиска фильмов, просмотра деталей и получения 
              актуальной информации о кинематографе.
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Возможности</h2>
            <ul className="features-list">
              <li className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Быстрый поиск фильмов</span>
              </li>
              <li className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Детальная информация о фильмах</span>
              </li>
              <li className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Современный и удобный интерфейс</span>
              </li>
              <li className="feature-item">
                <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Адаптивный дизайн</span>
              </li>
            </ul>
          </section>

          <section className="about-section">
            <h2 className="section-title">Версия</h2>
            <p className="section-text version-text">
              <strong>1.0.0</strong>
            </p>
          </section>

          <section className="about-section">
            <h2 className="section-title">Разработка</h2>
            <p className="section-text">
              Приложение разработано с использованием современных технологий: 
              React, TypeScript, Redux Toolkit и React Router.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
