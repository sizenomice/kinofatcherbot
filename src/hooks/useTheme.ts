import { useEffect, useState } from 'react'

export type Theme = {
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

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => resolveTheme())

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

  return theme
}
