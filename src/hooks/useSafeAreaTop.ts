import { useEffect, useState } from 'react'

export const useSafeAreaTop = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(0)

  const webApp = window.Telegram?.WebApp
  const safeAreaTopValue = webApp?.safeAreaInsets?.top || 0
  const contentSafeAreaTop = webApp?.contentSafeAreaInsets?.top || 0

  useEffect(() => {
    setSafeAreaTop(safeAreaTopValue + contentSafeAreaTop)
  }, [safeAreaTopValue, contentSafeAreaTop])

  return safeAreaTop
}

