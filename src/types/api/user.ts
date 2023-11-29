import { Article } from "../articles";
import { Emotion } from "../emotion";

export interface AddNewArticleRequest {
  userId: number,
  content: string,
}

export interface AddNewArticleResponse {
  articleId: number;
  content: string;
  purpose: string;
  emotions: Array<Emotion>;
}

export type GetAllArticlesResponse = Array<Article>; 