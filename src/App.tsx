import { useEffect, useState } from 'react'

type Theme = {
  background: string
  secondaryBackground: string
  text: string
  inputBackground: string
  border: string
  deleteColor: string
}

const darkTheme: Theme = {
  background: '#000000',
  secondaryBackground: '#1c1c1c',
  text: '#ffffff',
  inputBackground: '#111111',
  border: '#555555',
  deleteColor: '#f55',
}

const lightTheme: Theme = {
  background: '#f4f4f4',
  secondaryBackground: '#ffffff',
  text: '#111111',
  inputBackground: '#ffffff',
  border: '#cccccc',
  deleteColor: '#d22',
}

const resolveTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return darkTheme
  }

  const webApp = window.Telegram?.WebApp
  const params = webApp?.themeParams

  if (params) {
    return {
      background: params.bg_color ?? darkTheme.background,
      secondaryBackground: params.secondary_bg_color ?? darkTheme.secondaryBackground,
      text: params.text_color ?? darkTheme.text,
      inputBackground: params.secondary_bg_color ?? darkTheme.inputBackground,
      border: params.hint_color ?? darkTheme.border,
      deleteColor: params.button_color ?? darkTheme.deleteColor,
    }
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefersDark ? darkTheme : lightTheme
}

function App() {
  const [value, setValue] = useState('')
  const [entries, setEntries] = useState<string[]>([])
  const [theme, setTheme] = useState<Theme>(() => resolveTheme())

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    setEntries((prev) => [...prev, trimmed])
    setValue('')
  }

  window.Telegram?.WebApp.ready()
  window.Telegram?.WebApp?.expand()
  window.Telegram?.WebApp?.disableVerticalSwipes()
  if (['android', 'ios'].includes(window.Telegram?.WebApp?.platform)) {
    window.Telegram?.WebApp?.requestFullscreen?.()
  }

  useEffect(() => {
    const handleThemeChange = () => setTheme(resolveTheme())
    const webApp = window.Telegram?.WebApp
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')

    webApp?.onEvent?.('themeChanged', handleThemeChange)
    mediaQuery?.addEventListener?.('change', handleThemeChange)

    return () => {
      webApp?.offEvent?.('themeChanged', handleThemeChange)
      mediaQuery?.removeEventListener?.('change', handleThemeChange)
    }
  }, [])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.background,
        color: theme.text,
        padding: '40px 20px',
        gap: '24px',
      }}
    >
      <img
        src="/favicon.svg"
        alt="KinoFatcherBot"
        style={{ width: '100px', height: '100px', backgroundColor: theme.secondaryBackground, borderRadius: '50%' }}
      />
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
          border: `1px solid ${theme.border}`,
          background: theme.inputBackground,
          color: theme.text,
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
              background: theme.secondaryBackground,
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
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
                color: theme.deleteColor,
                border: `1px solid ${theme.deleteColor}`,
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
