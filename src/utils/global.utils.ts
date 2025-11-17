export const getSafeAreaTop = () => {
  const safeAreaTop = window.Telegram?.WebApp?.safeAreaInsets?.top || 0
  const contentSafeAreaTop = window.Telegram?.WebApp?.contentSafeAreaInsets?.top || 0

  return safeAreaTop + contentSafeAreaTop
}
