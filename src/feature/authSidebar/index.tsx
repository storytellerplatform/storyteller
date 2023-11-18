import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

interface authSidebarType {
  loginFormOpen: boolean
  registerFormOpen: boolean
}

const initialState: authSidebarType = {
  loginFormOpen: false,
  registerFormOpen: false,
}

export const authSidebarSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    taggleLoginForm: state => ({
      ...state,
      registerFormOpen: false,
      loginFormOpen: !state.loginFormOpen
    }),
    taggleRegisterForm: state => ({
      ...state,
      loginFormOpen: false,
      registerFormOpen: !state.registerFormOpen
    }),
    changeOpenForm: state => ({
      ...state,
      loginFormOpen: !state.loginFormOpen,
      registerFormOpen: !state.registerFormOpen
    }),
  }
})

export const getLoginForm = (state: RootState) => state.authSidebar.loginFormOpen;
export const getRegisterForm = (state: RootState) => state.authSidebar.registerFormOpen;

export const { taggleLoginForm, taggleRegisterForm, changeOpenForm } = authSidebarSlice.actions

export default authSidebarSlice.reducer