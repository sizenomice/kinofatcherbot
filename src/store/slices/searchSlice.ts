import { createSlice } from '@reduxjs/toolkit'
import type { Movie } from './poiskkinoSlice'

interface SearchState {
  searchQuery: string
  page: number
  allMovies: Movie[]
  hasMore: boolean
}

const initialState: SearchState = {
  searchQuery: '',
  page: 1,
  allMovies: [],
  hasMore: true,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: { payload: string }) => {
      state.searchQuery = action.payload
    },
    setPage: (state, action: { payload: number }) => {
      state.page = action.payload
    },
    setAllMovies: (state, action: { payload: Movie[] }) => {
      state.allMovies = action.payload
    },
    appendMovies: (state, action: { payload: Movie[] }) => {
      const existingIds = new Set(state.allMovies.map(m => m.id))
      const newMovies = action.payload.filter(m => !existingIds.has(m.id))
      state.allMovies = [...state.allMovies, ...newMovies]
    },
    setHasMore: (state, action: { payload: boolean }) => {
      state.hasMore = action.payload
    },
    resetPagination: (state) => {
      state.page = 1
      state.allMovies = []
      state.hasMore = true
    },
  },
})

export const {
  setSearchQuery,
  setPage,
  setAllMovies,
  appendMovies,
  setHasMore,
  resetPagination,
} = searchSlice.actions

export default searchSlice.reducer

