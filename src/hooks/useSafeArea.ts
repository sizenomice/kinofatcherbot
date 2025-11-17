import { useEffect, useState } from 'react'

export type SafeAreaInsets = {
  top: number
  bottom: number
  left: number
  right: number
}

const getSafeAreaInsets = (): SafeAreaInsets => {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 }
  }

  const webApp = window.Telegram?.WebApp
  const safeAreaInsets = webApp?.safeAreaInsets
  const contentSafeAreaInsets = webApp?.contentSafeAreaInsets

  return {
    top: (safeAreaInsets?.top ?? 0) + (contentSafeAreaInsets?.top ?? 0),
    bottom: (safeAreaInsets?.bottom ?? 0) + (contentSafeAreaInsets?.bottom ?? 0),
    left: (safeAreaInsets?.left ?? 0) + (contentSafeAreaInsets?.left ?? 0),
    right: (safeAreaInsets?.right ?? 0) + (contentSafeAreaInsets?.right ?? 0),
  }
}

export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState<SafeAreaInsets>(() => getSafeAreaInsets())

  useEffect(() => {
    const handleViewportChange = () => setSafeArea(getSafeAreaInsets())
    const webApp = window.Telegram?.WebApp

    webApp?.onEvent?.('viewportChanged', handleViewportChange)

    return () => {
      webApp?.offEvent?.('viewportChanged', handleViewportChange)
    }
  }, [])

  return safeArea
}

