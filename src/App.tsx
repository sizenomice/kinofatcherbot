function App() {
    const tg = window.Telegram?.WebApp
    tg?.ready()
    tg?.expand()
    if (['android', 'ios'].includes(tg?.platform)) {
      tg?.requestFullscreen?.()
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
