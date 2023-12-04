import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MoodAnaApiReq } from '../../types/api/moodAna'

const IP = '100.87.143.63';
const PORT = '8050'

export const moodAnaApiSlice = createApi({
  reducerPath: 'moodAnaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${IP}:${PORT}/`,
  }),
  endpoints: builder => ({
    testApi: builder.query<Object, void>({
      query: () => '/'
    }),
    moodAna: builder.mutation<Number, MoodAnaApiReq>({
      query: (moodAnaApiReq: MoodAnaApiReq) => ({
        url: '/emotion_analysis',
        method: 'POST',
        body: moodAnaApiReq,
      })
    })
  })
})

export const { useTestApiQuery, useMoodAnaMutation } = moodAnaApiSlice