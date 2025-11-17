import './Payments.css'
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

  const plans: SubscriptionPlan[] = [
    { id: '1', months: 1, price: 299 },
    { id: '2', months: 3, price: 799, popular: true },
    { id: '3', months: 6, price: 1399 },
    { id: '4', months: 9, price: 1899 },
    { id: '5', months: 12, price: 2299 },
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

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <div className="app-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <h1 className="about-title">Подписка</h1>
          <p className="about-subtitle">Выберите подходящий план</p>
        </div>

        {subscription.endDate && (
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
        )}

        <div className="subscription-plans">
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
                  <span className="price-amount">{formatPrice(plan.price)}</span>
                  <span className="price-currency">₽</span>
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
      </div>
    </div>
  )
}

export default Payments
