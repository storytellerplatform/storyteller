import { Article } from "../Article";

export interface AddNewArticleRequest {
  userId: number,
  content: string,
}

export interface AddNewArticleResponse {
  articleList: Array<Article>;
}