/**
 * Форматирует число в формат с разделителями тысяч
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price)
}

/**
 * Вычисляет месячную цену подписки
 */
export const getMonthlyPrice = (price: number, months: number): number => {
  return Math.round(price / months)
}

/**
 * Форматирует дату в читаемый формат
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Возвращает правильное склонение слова "месяц"
 */
export const getMonthLabel = (months: number): string => {
  if (months === 1) return 'месяц'
  if (months < 5) return 'месяца'
  return 'месяцев'
}

