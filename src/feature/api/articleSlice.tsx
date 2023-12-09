import { Article, BArticle } from "../../types/articles";
import { EmotionProps } from "../../types/components";
import { emotionsTransfer } from "../../utils/emotionTransfer";
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
      }),
      transformResponse: (response: BArticle): Article => {
        const { articleId, name, content, emotions, createdDate, newestAudioId, allAudioIds } = response;

        const toFormatEmotions: Array<EmotionProps> = emotionsTransfer(emotions);

        const formatData: string = createdDate.toString().split('T')[0];

        return {
          articleId,
          name,
          content,
          emotions: toFormatEmotions,
          createdDate: formatData,
          newestAudioId,
          allAudioIds
        }
      }
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