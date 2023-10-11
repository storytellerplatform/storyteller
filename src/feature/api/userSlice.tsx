import { AddNewArticleRequest } from "../../types/api/user";
import { User } from "../../types/user";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    GetUserData: builder.query<User, BigInt>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      })
    }),
    // <AddNewArticleResponse, AddNewArticleRequest>
    AddNewArticle: builder.mutation<any, AddNewArticleRequest>({
      query: (article: AddNewArticleRequest) => ({
        url: '/user/article',
        method: 'POST',
        body: article
      })
    }),
    CheckUsername: builder.query<boolean, string>({
      query: (username: string) => ({
        url: `/user/checkUsername?username=${username}`,
        method: 'GET',
      })
    }),
    CheckEmail: builder.query<boolean, string>({
      query: (email: string) => ({
        url: `/user/checkEmail?email=${email}`,
        method: 'GET',
      })
    })
  })
})

export const { useGetUserDataQuery, useLazyGetUserDataQuery, useAddNewArticleMutation, useCheckUsernameQuery, useLazyCheckUsernameQuery, useCheckEmailQuery, useLazyCheckEmailQuery } = extendedApiSlice;