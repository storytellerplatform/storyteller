import { Article, BArticle } from "../articles";
import { EmotionProps } from "../components";

export type GetAllArticlesResponse = Array<Article>;
export type GetAllArticlesBResponse = Array<BArticle>;  

export interface AddNewArticleRequest {
  userId: number;
  name: string;
  content: string;
  emotions: Array<Number>;
}

/*
  後端傳來資料未進行轉換
*/ 
export interface AddNewArticleBResponse {
  articleId: number;
  name: string;
  content: string;
  createdDate: Date;
  emotions: Array<Number>;
}

/*
  將資料進行轉換後，給予前端使用
*/ 
export interface AddNewArticleResponse {
  articleId: number;
  name: string;
  content: string;
  createdDate: Date;
  emotions: Array<EmotionProps>;
}
