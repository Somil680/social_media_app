import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slices/postSlice'
import modalReducer from './slices/modal'
import profileReducer from './slices/userData'
import allUsersReducer from './slices/allUserData'
import feedsReducer from './slices/feed'

export const store = configureStore({
  reducer: {
    post: postReducer,
    modal: modalReducer,
    profile: profileReducer,
    allUsers: allUsersReducer,
    feeds: feedsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
