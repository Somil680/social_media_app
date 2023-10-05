import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice'
import modalReducer from './slices/modal'
import profileReducer from './slices/userData'

export const store = configureStore({
  reducer: {
    post: postReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
