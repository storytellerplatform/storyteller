import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

interface AuthState {
  token: string | null;
  // ... other authentication fields
}

export const initialState: AuthState = {
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  }
})

export const getToken = (state: RootState) => state.auth.token;

export const { setToken } = authSlice.actions

export default authSlice.reducer