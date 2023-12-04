import { BEmotion, Emotion } from "./emotion";

// Design for Frontend
export interface Article {
  articleId: Number,
  name: string,
  content: string,
  emotions: Array<Emotion>,
  createdDate: string,
}

export interface BArticle {
  articleId: Number,
  name: string,
  content: string,
  emotions: Array<BEmotion>,
  createdDate: Date,
}