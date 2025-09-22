import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducers/counter'

export const store = configureStore({
  reducer: {
    // All reducers here
    counter: counterSlice.reducer
  }
})