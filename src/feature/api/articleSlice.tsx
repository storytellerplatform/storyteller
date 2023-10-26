import { Article } from "../../types/article";
import { EmotionProps } from "../../types/components";
import { apiSlice } from "./apiSlice";

export interface UpdateEmotionsRequest {
  articleId: number,
  emotions: Array<EmotionProps>
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    GetArticle: builder.query<Article, Number>({
      query: (articleId) => ({
        url: `/article/${articleId}`,
        method: 'GET',
      })
    }),
    UpdateEmotions: builder.mutation<Article, UpdateEmotionsRequest>({
      query: ({ articleId, emotions }) => ({
        url: `/article/emotion/${articleId}`,
        method: 'POST',
        body: emotions
      })
    })
  })
})

export const { useGetArticleQuery, useUpdateEmotionsMutation } = extendedApiSlice;