import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// todo: for analyze models api support 
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    mode: 'no-cors',
    // prepareHeaders: (headers, { getState }) => {
    //   const state = getState() as RootState;
    //   const token = state.auth.token;
    //   if (token) {
    //     headers.set('Authorization', 'Bearer ' + token);
    //   };
    //   return headers;
    // }
  }),
  endpoints: builder => ({
    testApi: builder.query<String, void>({
      query: () => '/test'
    }),
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
  })
})

export const { useTestApiQuery } = apiSlice