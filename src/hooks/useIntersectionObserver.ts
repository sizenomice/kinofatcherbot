import { useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLDivElement>
}

/**
 * Хук для отслеживания пересечения элемента с viewport
 * Используется для бесконечной прокрутки
 */
export const useIntersectionObserver = (
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const { threshold = 0.1, rootMargin = '200px', enabled = true } = options
  const elementRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(callback)

  // Обновляем ref при изменении callback
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && enabled) {
        callbackRef.current()
      }
    },
    [enabled]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [handleObserver, threshold, rootMargin, enabled])

  return { ref: elementRef }
}

