import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../app/store';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Article'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
    // baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set('Authorization', 'Bearer ' + token);
      };
      return headers;
    },
  }),
  endpoints: builder => ({
    testApi: builder.query<String, void>({
      query: () => '/test'
    })
  })
})

export const { useTestApiQuery } = apiSlice