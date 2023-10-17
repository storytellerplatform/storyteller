import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { User } from '../../types/user';

export const initialState: User = {
  userId: '0',
  name: '',
  email: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    }
  }
})

export const getUserData = (state: RootState) => state.user;
export const getUsername = (state: RootState) => state.user.name;
export const getUserId = (state: RootState) => state.user.userId;

export const { setUserId, setUsername, setEmail } = userSlice.actions

export default userSlice.reducer