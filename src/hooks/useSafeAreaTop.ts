import { useEffect, useState } from 'react'

export const useSafeAreaTop = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return 0
    
    const safeAreaTop = webApp.safeAreaInsets?.top || 0
    const contentSafeAreaTop = webApp.contentSafeAreaInsets?.top || 0
    
    return safeAreaTop + contentSafeAreaTop
  })

  useEffect(() => {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return

    const updateSafeAreaTop = () => {
      const safeAreaTop = webApp.safeAreaInsets?.top || 0
      const contentSafeAreaTop = webApp.contentSafeAreaInsets?.top || 0
      setSafeAreaTop(safeAreaTop + contentSafeAreaTop)
    }

    webApp.onEvent?.('viewportChanged', updateSafeAreaTop)

    return () => {
      webApp.offEvent?.('viewportChanged', updateSafeAreaTop)
    }
  }, [])

  return safeAreaTop
}

