import { AddNewArticleBResponse, AddNewArticleRequest, AddNewArticleResponse, GetAllArticlesBResponse, GetAllArticlesResponse } from "../../types/api/user";
import { Article, BArticle } from "../../types/articles";
import { EmotionProps } from "../../types/components";
import { User } from "../../types/user";
import { emotionsTransfer } from "../../utils/emotionTransfer";
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
    GetGoogleData: builder.query<any, void>({
      query: () => ({
        url: '/user/info',
        method: 'GET',
      }),
    }),
    GetAllArticles: builder.query<GetAllArticlesResponse, number>({
      query: (userId) => ({
        url: `/user/article/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: GetAllArticlesBResponse): GetAllArticlesResponse => {
        const articles: GetAllArticlesResponse = [];

        response.forEach((bArticle: BArticle) => {
          let toArticle: Article = {
            articleId: bArticle.articleId,
            name: bArticle.name,
            content: bArticle.content,
            emotions: [],
            newestAudioId: bArticle.newestAudioId,
            allAudioIds: bArticle.allAudioIds,
            createdDate: bArticle.createdDate.toString().split('T')[0],
          };

          // 處理 emotions 的轉換
          let toEmotions: Array<EmotionProps> = emotionsTransfer(bArticle.emotions);

          toArticle.emotions = toEmotions;
          articles.push(toArticle);
        });

        return articles;
      }
    }),
    AddNewArticle: builder.mutation<AddNewArticleResponse, AddNewArticleRequest>({
      query: (article: AddNewArticleRequest) => ({
        url: '/user/article',
        method: 'POST',
        body: article
      }),
      transformResponse: (response: AddNewArticleBResponse): AddNewArticleResponse => ({
        ...response,
        emotions: emotionsTransfer(response.emotions),
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

export const { useGetCurrentUserQuery, useLazyGetCurrentUserQuery, useGetUserDataQuery, useLazyGetGoogleDataQuery, useGetGoogleDataQuery, useLazyGetUserDataQuery, useGetAllArticlesQuery, useLazyGetAllArticlesQuery, useAddNewArticleMutation, useCheckUsernameQuery, useLazyCheckUsernameQuery, useCheckEmailQuery, useLazyCheckEmailQuery } = extendedApiSlice;