import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice'
import modalReducer from './slices/modal'

export const store = configureStore({
  reducer: {
    post: postReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
