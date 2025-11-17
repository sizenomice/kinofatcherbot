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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        color: '#fff',
      }}
    >
      <img src="/favicon.svg" alt="KinoFatcherBot" style={{ width: '100px', height: '100px', backgroundColor: '#fff', borderRadius: '50%' }} />
      <div style={{ fontSize: '24px', fontWeight: 600 }}>KinoFatcherBot</div>
    </div>
  )
}

export default App
