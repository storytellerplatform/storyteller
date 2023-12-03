import { Article } from "../articles";
import { EmotionProps } from "../components";
import { BEmotion } from "../emotion";

export type GetAllArticlesResponse = Array<Article>; 

/*
  從情緒模型傳來的，未加入 emotion ID 
*/
export interface AddNewArticleRequest {
  userId: number;
  name: string;
  content: string;
  emotionList: Array<Number>;
}

/*
  從資料庫回傳，已有設立 emotion 的 ID
*/ 
export interface AddNewArticleBResponse {
  articleId: number;
  name: string;
  content: string;
  purpose: string;
  emotions: Array<BEmotion>;
}

/*
  將資料進行轉換後，給予前端使用
*/ 
export interface AddNewArticleResponse {
  articleId: number;
  name: string;
  content: string;
  purpose: string;
  emotions: Array<EmotionProps>;
}
