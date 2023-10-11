import { apiSlice } from "./apiSlice";
import { SigninRequest, SigninResponse, SignupRequest, SignupResponse } from '../../types/api/auth';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    Signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user
      })
    }),
    Signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (user) => ({
        url: '/auth/authenticate',
        method: 'POST',
        body: user
      })
    }),
  })
})

export const { useSignupMutation, useSigninMutation } = extendedApiSlice;