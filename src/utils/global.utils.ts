export const getSafeAreaTop = () => {
  if (window.Telegram?.WebApp?.isFullscreen) {
    const safeAreaTop = window.Telegram?.WebApp?.safeAreaInsets?.top || 0
    const contentSafeAreaTop = window.Telegram?.WebApp?.contentSafeAreaInsets?.top || 0
  
    return safeAreaTop + contentSafeAreaTop
  }
}
