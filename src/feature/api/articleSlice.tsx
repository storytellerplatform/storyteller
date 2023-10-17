import { Article } from "../../types/article";
import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    GetArticle: builder.query<Article, Number>({
      query: (articleId) => ({
        url: `/article/${articleId}`,
        method: 'GET',
      })
    }),
  })
})

export const { useGetArticleQuery } = extendedApiSlice;