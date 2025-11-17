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
  secondaryBackground: '#000000',
  text: '#ffffff',
  inputBackground: '#000000',
  border: '#ffffff',
  deleteColor: '#ffffff',
}

const lightTheme: Theme = {
  background: '#ffffff',
  secondaryBackground: '#ffffff',
  text: '#000000',
  inputBackground: '#ffffff',
  border: '#000000',
  deleteColor: '#000000',
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
