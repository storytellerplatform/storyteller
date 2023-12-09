import { EmotionProps } from "./components";

// Design for Frontend
export interface Article {
  articleId: Number,
  name: string,
  content: string,
  emotions: Array<EmotionProps>,
  createdDate: string,
  newestAudioId: Number,
  allAudioIds: Array<Number>,
}

export interface BArticle {
  articleId: Number,
  name: string,
  content: string,
  emotions: Array<Number>,
  createdDate: Date,
  newestAudioId: Number,
  allAudioIds: Array<Number>,
}