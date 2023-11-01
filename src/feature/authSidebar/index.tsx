import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

interface authSidebarType {
  loginFormOpen: boolean
  registerFormOpen: boolean
  loginFormDelayMove: boolean
  registerFormDelayMove: boolean
}

const initialState: authSidebarType = {
  loginFormOpen: false,
  registerFormOpen: false,
  loginFormDelayMove: false,
  registerFormDelayMove: false,
}

export const authSidebarSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    taggleLoginForm: state => ({
      ...state,
      loginFormDelayMove: state.registerFormOpen,
      registerFormOpen: false,
      loginFormOpen: !state.loginFormOpen
    }),
    taggleRegisterForm: state => ({
      ...state,
      registerFormDelayMove: state.loginFormDelayMove,
      loginFormOpen: false,
      registerFormOpen: !state.registerFormOpen
    }),
    turnOffLoginFormDelayMove: state => ({
      ...state,
      loginFormDelayMove: false
    }),
    turnOffRegisterFormDelayMove: state => ({
      ...state,
      registerFormDelayMove: false
    }),
  }
})

export const getLoginForm = (state: RootState) => state.authSidebar.loginFormOpen;
export const getRegisterForm = (state: RootState) => state.authSidebar.registerFormOpen;
export const getLoginFormDelayMove = (state: RootState) => state.authSidebar.loginFormDelayMove;
export const getRegisterFormDelayMove = (state: RootState) => state.authSidebar.registerFormDelayMove;

export const { taggleLoginForm, taggleRegisterForm, turnOffLoginFormDelayMove, turnOffRegisterFormDelayMove } = authSidebarSlice.actions

export default authSidebarSlice.reducer