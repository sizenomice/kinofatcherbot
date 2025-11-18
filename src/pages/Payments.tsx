import './Payments.css'
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { purchaseSubscription } from '../store/slices/subscriptionSlice'

interface SubscriptionPlan {
  id: string
  months: number
  price: number
  popular?: boolean
}

function Payments() {
  const dispatch = useAppDispatch()
  const subscription = useAppSelector((state) => state.subscription)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<HTMLDivElement>(null)

  const plans: SubscriptionPlan[] = [
    { id: '1', months: 1, price: 299 },
    { id: '2', months: 3, price: 799, popular: true },
    { id: '3', months: 6, price: 1399 },
    { id: '4', months: 9, price: 1899 },
    { id: '5', months: 12, price: 2299, popular: true },
  ]

  const handleSubscribe = (plan: SubscriptionPlan) => {
    dispatch(purchaseSubscription({ months: plan.months, price: plan.price }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price)
  }

  const getMonthlyPrice = (price: number, months: number) => {
    return Math.round(price / months)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const getMonthLabel = (months: number) => {
    if (months === 1) return 'месяц'
    if (months < 5) return 'месяца'
    return 'месяцев'
  }

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return

    const handleScroll = () => {
      const scrollLeft = swiper.scrollLeft
      const containerWidth = swiper.clientWidth
      const cardStep = containerWidth - 20
      
      const newIndex = Math.round(scrollLeft / cardStep)
      const clampedIndex = Math.max(0, Math.min(newIndex, plans.length - 1))
      setActiveIndex(clampedIndex)
    }

    handleScroll()

    swiper.addEventListener('scroll', handleScroll, { passive: true })
    return () => swiper.removeEventListener('scroll', handleScroll)
  }, [plans.length])

  return (
    <div className="about-page">
      <div className="about-container">
        {subscription.endDate ? (
          <div className="active-subscription">
            <div className="active-subscription-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="active-subscription-title">Подписка активна</h2>
            <div className="active-subscription-info">
              <p className="active-subscription-plan">
                Подписка на {subscription.months} {subscription.months && getMonthLabel(subscription.months)}
              </p>
              <p className="active-subscription-date">
                Действует до: <strong>{formatDate(subscription.endDate)}</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className="promo-subscription">
            <div className="promo-subscription-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <h2 className="promo-subscription-title">Получите полный доступ</h2>
            <p className="promo-subscription-subtitle">Откройте все возможности приложения</p>
            <div className="promo-benefits">
              <div className="promo-benefit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>Безлимитный доступ</span>
              </div>
              <div className="promo-benefit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>Все функции</span>
              </div>
              <div className="promo-benefit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>Без рекламы</span>
              </div>
            </div>
            <div className="promo-cta">
              <p className="promo-cta-text">Выберите план ниже и начните прямо сейчас!</p>
            </div>
          </div>
        )}

        <div className="swiper-container">
          <div className="subscription-plans" ref={swiperRef}>
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`subscription-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <div className="popular-badge">Популярный</div>
                )}
                <div className="subscription-header">
                  <h3 className="subscription-months">
                    {plan.months} {getMonthLabel(plan.months)}
                  </h3>
                  <div className="subscription-price">
                    <div className="price-wrapper">
                      <span className="old-price">{formatPrice(Math.round(plan.price * 1.3))}₽</span>
                      <div className="current-price">
                        <span className="price-amount">{formatPrice(plan.price)}</span>
                        <span className="price-currency">₽</span>
                      </div>
                    </div>
                  </div>
                  <p className="subscription-monthly">
                    {formatPrice(getMonthlyPrice(plan.price, plan.months))}₽ в месяц
                  </p>
                </div>
                <button
                  className="subscribe-button"
                  onClick={() => handleSubscribe(plan)}
                >
                  <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Подписаться
                </button>
              </div>
            ))}
          </div>
          <div className="swiper-pagination">
            {plans.map((_, index) => (
              <button
                key={index}
                className={`swiper-pagination-bullet ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  const swiper = swiperRef.current
                  if (swiper) {
                    const containerWidth = swiper.clientWidth
                    const cardStep = containerWidth - 20
                    const scrollPosition = index * cardStep
                    swiper.scrollTo({
                      left: scrollPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
