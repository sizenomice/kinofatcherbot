import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')
  const [entries, setEntries] = useState<string[]>([])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setEntries((prev) => [...prev, trimmed])
    setValue('')
  }

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
        justifyContent: 'flex-start',
        backgroundColor: '#000000',
        color: '#fff',
        padding: '40px 20px',
        gap: '24px',
      }}
    >
      <img src="/favicon.svg" alt="KinoFatcherBot" style={{ width: '100px', height: '100px', backgroundColor: '#fff', borderRadius: '50%' }} />
      <div style={{ fontSize: '24px', fontWeight: 600 }}>KinoFatcherBot</div>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit()
          }
        }}
        placeholder="Введите сообщение"
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid #555',
          background: '#111',
          color: '#fff',
          fontSize: '16px',
        }}
      />
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {entries.map((entry, index) => (
          <div
            key={`${entry}-${index}`}
            style={{
              padding: '12px 16px',
              background: '#1c1c1c',
              borderRadius: '8px',
              border: '1px solid #333',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ flex: 1, wordBreak: 'break-word' }}>{entry}</span>
            <button
              type="button"
              onClick={() => setEntries((prev) => prev.filter((_, i) => i !== index))}
              style={{
                background: 'transparent',
                color: '#f55',
                border: '1px solid #f55',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
              }}
            >
              удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
