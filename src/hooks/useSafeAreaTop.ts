import { useEffect, useState } from 'react'

export const useSafeAreaTop = () => {
  const [safeAreaTop, setSafeAreaTop] = useState(0)

  const safeArea = window?.Telegram?.WebApp?.safeAreaInset?.top || 0;
  const contentSafeArea = window?.Telegram?.WebApp?.contentSafeAreaInset?.top || 0;

  useEffect(() => {
    setSafeAreaTop(safeArea + contentSafeArea)
  }, [safeArea, contentSafeArea])

  return safeAreaTop
}

