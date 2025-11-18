import { createSlice } from '@reduxjs/toolkit'

interface SubscriptionState {
  endDate: string | null
  months: number | null
  price: number | null
}

interface PurchasePayload {
  months: number
  price: number
  paymentType?: 'rubles' | 'stars'
}

const initialState: SubscriptionState = {
  endDate: null,
  months: null,
  price: null,
}

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    purchaseSubscription: (state, action: { payload: PurchasePayload }) => {
      const { months, price } = action.payload
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + months)
      
      state.endDate = endDate.toISOString()
      state.months = months
      state.price = price
    },
    clearSubscription: (state) => {
      state.endDate = null
      state.months = null
      state.price = null
    },
  },
})

export const { purchaseSubscription, clearSubscription } = subscriptionSlice.actions
export default subscriptionSlice.reducer
