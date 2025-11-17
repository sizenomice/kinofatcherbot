import { useEffect } from 'react'

export const useTelegramWebApp = () => {
  useEffect(() => {
    window.Telegram?.WebApp.ready()
    window.Telegram?.WebApp?.expand()
    window.Telegram?.WebApp?.disableVerticalSwipes()
    if (['android', 'ios'].includes(window.Telegram?.WebApp?.platform)) {
      window.Telegram?.WebApp?.requestFullscreen?.()
    }
  }, [])
}
