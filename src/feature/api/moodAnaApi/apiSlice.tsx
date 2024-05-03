import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MoodAnaApiReq } from '../../../types/api/moodAna'

export const moodAnaApiSlice = createApi({
  reducerPath: 'moodAnaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MODEL_ENDPOINT}`,
  }),
  endpoints: builder => ({
    testApi: builder.query<Object, void>({
      query: () => '/'
    }),
    moodAna: builder.mutation<number[], MoodAnaApiReq>({
      query: (moodAnaApiReq: MoodAnaApiReq) => ({
        url: '/mood_analyze',
        method: 'POST',
        body: moodAnaApiReq,
      })
    })
  })
})

export const { useTestApiQuery, useMoodAnaMutation } = moodAnaApiSlice