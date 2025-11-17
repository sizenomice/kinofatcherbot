import { useState } from 'react'
import { useTheme } from './hooks/useTheme'

function App() {
  const theme = useTheme()
  const isDark = theme === 'dark'

  const [value, setValue] = useState('')
  const [entries, setEntries] = useState<string[]>([])

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setEntries((prev) => [...prev, trimmed])
    setValue('')
  }

  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    secondaryBackground: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    inputBackground: isDark ? '#000000' : '#ffffff',
    border: isDark ? '#ffffff' : '#000000',
    deleteColor: isDark ? '#ffffff' : '#000000',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
        color: colors.text,
        gap: '24px',
      }}
    >
      <img
        src="/favicon.svg"
        alt="KinoFatcherBot"
        style={{ width: 'clamp(60px, 8vw, 100px)', height: 'clamp(60px, 8vw, 100px)', backgroundColor: colors.secondaryBackground, borderRadius: '50%' }}
      />
      <div style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 600 }}>KinoFatcherBot</div>
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
          width: '90%',
          maxWidth: 'min(400px, 90vw)',
          padding: '12px 16px',
          borderRadius: '8px',
          border: `1px solid ${colors.border}`,
          background: colors.inputBackground,
          color: colors.text,
          fontSize: 'clamp(14px, 2vw, 16px)',
        }}
      />
      <div
        style={{
          width: '90%',
          maxWidth: 'min(400px, 90vw)',
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
              background: colors.secondaryBackground,
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
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
                color: colors.deleteColor,
                border: `1px solid ${colors.deleteColor}`,
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
