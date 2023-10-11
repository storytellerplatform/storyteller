import { configureStore } from '@reduxjs/toolkit'
import sidebarSlice from '../feature/sidebar/sidebarSlice';
import { apiSlice } from '../feature/api/apiSlice'
import userSlice from '../feature/user/userSlice';
import authSlice from '../feature/auth/authSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    sidebar: sidebarSlice,
    [apiSlice.reducerPath]: apiSlice.reducer  
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;