import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    tg?.ready()
    tg?.expand()
    tg?.requestFullscreen?.()

    if (!tg?.requestFullscreen && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {
        // ignore errors such as user gesture requirements
      })
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0f10',
        color: '#fff',
      }}
    >
      <img src="/favicon.svg" alt="KinoFetcherBot" style={{ width: '100px', height: '100px' }} />
      <div style={{ fontSize: '24px', fontWeight: 600 }}>KinoFetcherBot</div>
    </div>
  )
}

export default App
