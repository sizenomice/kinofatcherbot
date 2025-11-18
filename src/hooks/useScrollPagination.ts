import { useState, useRef, useEffect, useCallback } from 'react'

interface UseScrollPaginationOptions {
  cardStepOffset?: number
  itemCount: number
}

interface UseScrollPaginationReturn {
  activeIndex: number
  scrollRef: React.RefObject<HTMLDivElement>
  handlePaginationClick: (index: number) => void
}

/**
 * Хук для управления горизонтальной пагинацией через скролл
 * Используется для каруселей и слайдеров
 */
export const useScrollPagination = (
  options: UseScrollPaginationOptions
): UseScrollPaginationReturn => {
  const { cardStepOffset = 20, itemCount } = options
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const swiper = scrollRef.current
    if (!swiper) return

    const scrollLeft = swiper.scrollLeft
    const containerWidth = swiper.clientWidth
    const cardStep = containerWidth - cardStepOffset

    const newIndex = Math.round(scrollLeft / cardStep)
    const clampedIndex = Math.max(0, Math.min(newIndex, itemCount - 1))
    setActiveIndex(clampedIndex)
  }, [cardStepOffset, itemCount])

  useEffect(() => {
    const swiper = scrollRef.current
    if (!swiper) return

    let ticking = false

    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    throttledHandleScroll() // Инициализация

    swiper.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => swiper.removeEventListener('scroll', throttledHandleScroll)
  }, [handleScroll])

  const handlePaginationClick = useCallback(
    (index: number) => {
      const swiper = scrollRef.current
      if (swiper) {
        const containerWidth = swiper.clientWidth
        const cardStep = containerWidth - cardStepOffset
        const scrollPosition = index * cardStep
        swiper.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        })
      }
    },
    [cardStepOffset]
  )

  return {
    activeIndex,
    scrollRef,
    handlePaginationClick,
  }
}

