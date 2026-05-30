// Manages search/filter state for ProductList
import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '', // Current search query
  },
  reducers: {
    // Update the search query
    setSearchQuery: (state, action) => {
      state.query = action.payload
    },

    // Clear search query
    clearSearch: (state) => {
      state.query = ''
    },
  },
})

export const { setSearchQuery, clearSearch } = searchSlice.actions

// Selector to get current search query
export const selectSearchQuery = (state) => state.search.query

export default searchSlice.reducer