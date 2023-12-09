import { configureStore } from '@reduxjs/toolkit'

import sidebarSlice from '../feature/sidebar/sidebarSlice';
import userSlice from '../feature/user/userSlice';
import authSlice from '../feature/auth/authSlice';
import authSidebar from '../feature/authSidebar';

// API slices
import { apiSlice } from '../feature/api/apiSlice'
import { moodAnaApiSlice } from '../feature/api/moodAnaApi/apiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    sidebar: sidebarSlice,
    authSidebar: authSidebar,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [moodAnaApiSlice.reducerPath]: moodAnaApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware, moodAnaApiSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;