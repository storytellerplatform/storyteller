import { Emotion } from "./emotion";

export interface Article {
  articleId: Number,
  content: string,
  purpose: string,
  emotions: Array<Emotion>,
  createdDate: Date,
}