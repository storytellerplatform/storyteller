import { AddNewArticleRequest, AddNewArticleResponse, GetAllArticlesResponse } from "../../types/api/user";
import { User } from "../../types/user";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // <User, void>
    GetCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      })
    }),
    GetUserData: builder.query<User, Number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      })
    }),
    GetAllArticles: builder.query<GetAllArticlesResponse, number>({
      query: (userId) => ({
        url: `/user/article/${userId}`,
        method: 'GET',
      })
    }),
    AddNewArticle: builder.mutation<AddNewArticleResponse, AddNewArticleRequest>({
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

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useGetUserDataQuery, useLazyGetUserDataQuery, useGetAllArticlesQuery, useLazyGetAllArticlesQuery, useAddNewArticleMutation, useCheckUsernameQuery, useLazyCheckUsernameQuery, useCheckEmailQuery, useLazyCheckEmailQuery } = extendedApiSlice;