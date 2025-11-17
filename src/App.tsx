function App() {
  window.Telegram?.WebApp.ready()
  window.Telegram?.WebApp?.expand()
  if (['android', 'ios'].includes(window.Telegram?.WebApp?.platform)) {
    window.Telegram?.WebApp?.requestFullscreen?.()
  }

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
