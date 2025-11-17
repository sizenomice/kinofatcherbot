import { useEffect, useState } from 'react'

const resolveTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const webApp = window.Telegram?.WebApp
  return webApp?.colorScheme === 'light' ? 'light' : 'dark'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => resolveTheme())

  useEffect(() => {
    const handleThemeChange = () => setTheme(resolveTheme())
    const webApp = window.Telegram?.WebApp

    webApp?.onEvent?.('themeChanged', handleThemeChange)

    return () => {
      webApp?.offEvent?.('themeChanged', handleThemeChange)
    }
  }, [])

  return theme
}
