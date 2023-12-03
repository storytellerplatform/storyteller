import { EmotionProps } from "./components";

export interface Emotion {
  emotionId: number;
  emotions: Array<EmotionProps>;
}

export interface BEmotion {
  emotionId: number;
  emotions: Array<Number>;
}