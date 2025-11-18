import './Payments.css'
import { useMemo, memo } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { useScrollPagination } from '../hooks/useScrollPagination'
import { purchaseSubscription } from '../store/slices/subscriptionSlice'
import { formatPrice, getMonthlyPrice, formatDate, getMonthLabel } from '../utils/format'
import CheckCircleIcon from '../components/icons/CheckCircleIcon'
import MoneyIcon from '../components/icons/MoneyIcon'
import CheckIcon from '../components/icons/CheckIcon'

interface SubscriptionPlan {
  id: string
  months: number
  price: number
  popular?: boolean
}

// Мемоизированный компонент карточки подписки
const SubscriptionCard = memo(({ 
  plan, 
  onSubscribe 
}: { 
  plan: SubscriptionPlan
  onSubscribe: (plan: SubscriptionPlan, paymentType: 'rubles' | 'stars') => void 
}) => {
  const monthlyPrice = useMemo(() => getMonthlyPrice(plan.price, plan.months), [plan.price, plan.months])
  const oldPrice = useMemo(() => Math.round(plan.price * 1.3), [plan.price])
  const monthLabel = useMemo(() => getMonthLabel(plan.months), [plan.months])

  // Конвертация рублей в звезды (1 звезда = 1,95 рубля)
  const starsPrice = useMemo(() => Math.round(plan.price / 1.95), [plan.price])
  const oldStarsPrice = useMemo(() => Math.round(oldPrice / 1.95), [oldPrice])
  const monthlyStarsPrice = useMemo(() => Math.round(monthlyPrice / 1.95), [monthlyPrice])

  const handleSubscribeRubles = () => {
    onSubscribe(plan, 'rubles')
  }

  const handleSubscribeStars = () => {
    onSubscribe(plan, 'stars')
  }

  return (
    <div className={`subscription-card ${plan.popular ? 'popular' : ''}`}>
      {plan.popular && (
        <div className="popular-badge">Популярный</div>
      )}
      <div className="subscription-header">
        <h3 className="subscription-months">
          {plan.months} {monthLabel}
        </h3>
        <div className="subscription-prices-container">
          <div className="subscription-price">
            <div className="price-wrapper">
              <span className="old-price">{formatPrice(oldPrice)}₽</span>
              <div className="current-price">
                <span className="price-amount">{formatPrice(plan.price)}</span>
                <span className="price-currency">₽</span>
              </div>
            </div>
            <p className="subscription-monthly">
              {formatPrice(monthlyPrice)}₽ в месяц
            </p>
          </div>
          <div className="subscription-price subscription-price-stars">
            <div className="price-wrapper">
              
              <div className="current-price">
                <span className="price-amount">{formatPrice(starsPrice)}</span>
                <span className="price-currency">⭐</span>
              </div>
              <span className="old-price">{formatPrice(oldStarsPrice)}⭐</span>
            </div>
            <p className="subscription-monthly">
              {formatPrice(monthlyStarsPrice)}⭐ в месяц
            </p>
          </div>
        </div>
      </div>
      <div className="subscribe-button-split">
        <button
          className="subscribe-button-left"
          onClick={handleSubscribeRubles}
        >
          <span className="button-text">{formatPrice(plan.price)}₽</span>
        </button>
        <div className="subscribe-button-divider"></div>
        <button
          className="subscribe-button-right"
          onClick={handleSubscribeStars}
        >
          <span className="button-text">{formatPrice(starsPrice)} ⭐</span>
        </button>
      </div>
    </div>
  )
})

SubscriptionCard.displayName = 'SubscriptionCard'

function Payments() {
  const dispatch = useAppDispatch()
  const subscription = useAppSelector((state) => state.subscription)

  const plans: SubscriptionPlan[] = useMemo(() => [
    { id: '1', months: 1, price: 299 },
    { id: '2', months: 3, price: 799, popular: true },
    { id: '3', months: 6, price: 1399 },
    { id: '4', months: 9, price: 1899 },
    { id: '5', months: 12, price: 2299, popular: true },
  ], [])

  const handleSubscribe = (plan: SubscriptionPlan, paymentType: 'rubles' | 'stars') => {
    dispatch(purchaseSubscription({ months: plan.months, price: plan.price, paymentType }))
  }

  const { activeIndex, scrollRef, handlePaginationClick } = useScrollPagination({
    itemCount: plans.length,
  })

  const subscriptionEndDate = useMemo(() => {
    return subscription.endDate ? formatDate(subscription.endDate) : null
  }, [subscription.endDate])

  const subscriptionMonthLabel = useMemo(() => {
    return subscription.months ? getMonthLabel(subscription.months) : null
  }, [subscription.months])

  return (
    <div className="about-page">
      <div className="about-container">
        {subscription.endDate ? (
          <div className="active-subscription">
            <div className="active-subscription-icon">
              <CheckCircleIcon />
            </div>
            <h2 className="active-subscription-title">Подписка активна</h2>
            <div className="active-subscription-info">
              <p className="active-subscription-plan">
                Подписка на {subscription.months} {subscriptionMonthLabel}
              </p>
              <p className="active-subscription-date">
                Действует до: <strong>{subscriptionEndDate}</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className="promo-subscription">
            <div className="promo-subscription-icon">
              <MoneyIcon />
            </div>
            <h2 className="promo-subscription-title">Получите полный доступ</h2>
            <p className="promo-subscription-subtitle">Откройте все возможности приложения</p>
            <div className="promo-benefits">
              <div className="promo-benefit">
                <CheckIcon />
                <span>Безлимитный доступ</span>
              </div>
              <div className="promo-benefit">
                <CheckIcon />
                <span>Все функции</span>
              </div>
              <div className="promo-benefit">
                <CheckIcon />
                <span>Без рекламы</span>
              </div>
            </div>
            <div className="promo-cta">
              <p className="promo-cta-text">Выберите план ниже и начните прямо сейчас!</p>
            </div>
          </div>
        )}

        <div className="swiper-container">
          <div className="subscription-plans" ref={scrollRef}>
            {plans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
          <div className="swiper-pagination">
            {plans.map((_, index) => (
              <button
                key={index}
                className={`swiper-pagination-bullet ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handlePaginationClick(index)}
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
