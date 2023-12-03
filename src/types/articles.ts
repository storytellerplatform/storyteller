import { Emotion } from "./emotion";

// Design for Frontend
export interface Article {
  articleId: Number,
  content: string,
  purpose: string,
  emotions: Array<Emotion>,
  createdDate: Date,
}