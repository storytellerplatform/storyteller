import { Article } from "../Article";

export interface AddNewArticleRequest {
  userId: BigInt,
  content: string,
}

export interface AddNewArticleResponse {
  articleList: Array<Article>;
}