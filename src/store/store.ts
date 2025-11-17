import { configureStore } from '@reduxjs/toolkit'
import { poiskkino } from './slices/poiskkinoSlice'

export const store = configureStore({
  reducer: {
    [poiskkino.reducerPath]: poiskkino.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(poiskkino.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
