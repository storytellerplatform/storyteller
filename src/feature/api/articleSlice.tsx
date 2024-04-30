import { GetAllArticlesBResponse, GetAllArticlesResponse } from "../../types/api/user";
import { Article, BArticle } from "../../types/articles";
import { EmotionProps } from "../../types/components";
import { emotionsTransfer } from "../../utils/emotionTransfer";
import { apiSlice } from "./apiSlice";

export interface UpdateEmotionsRequest {
  articleId: Number,
  emotions: Array<EmotionProps>
}

export interface SearchByNameRequest {
  userId: Number,
  search: string
}

export interface SearchByEmotionRequest {
  userId: Number,
  emotion: Number
}

export enum SortDataType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface SortByCreatedDateRequest {
  userId: Number,
  sort: SortDataType;
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
      }),
    }),
    SearchByName: builder.query<Array<Article>, SearchByNameRequest>({
      query: ({ userId, search }) => ({
        url: `/article/name`,
        params: {
          'userId': userId,
          'search': search
        }
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
    SearchByEmotion: builder.query<Array<Article>, SearchByEmotionRequest>({
      query: ({ userId, emotion }) => ({
        url: '/article/emotion',
        params: {
          userId,
          emotion
        },
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
    SortByCreatedDate: builder.query<Array<Article>, SortByCreatedDateRequest>({
      query: ({ userId, sort }) => ({
        url: '/article/sortedData',
        params: {
          userId,
          sort
        },
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
  })
})

export const { useGetArticleQuery, useUpdateEmotionsMutation, useLazySearchByNameQuery, useLazySearchByEmotionQuery, useLazySortByCreatedDateQuery } = extendedApiSlice;