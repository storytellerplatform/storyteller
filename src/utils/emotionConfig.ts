import { EmotionProps } from "../types/components";

export const allEmotions: Array<EmotionProps> = ['無', '喜歡', '悲傷', '厭惡', '憤怒', '幸福'];
export const selectEmotions: Array<EmotionProps> = ['喜歡', '悲傷', '厭惡', '憤怒', '幸福'];
export const englishEmotions = {
  "喜歡": "Like",
  "悲傷": "Sadness",
  "厭惡": "Disgust",
  "憤怒": "Anger",
  "幸福": "Happiness"
};

export const emotionStyles = {
  'red': ['from-red-400 via-red-400 border-red-400 hover:bg-red-300 hover:from-red-300 hover:via-red-300 hover:border hover:border-red-300'],
  'green': ['from-green-400 via-green-400 border-green-400 hover:bg-green-300 hover:from-green-300 hover:via-green-300 hover:border hover:border-green-300'],
  'yellow': ['from-yellow-400 via-yellow-400 border-yellow-400 hover:bg-yellow-300 hover:from-yellow-300 hover:via-yellow-300 hover:border hover:border-yellow-300'],
  'blue': ['from-blue-400 via-blue-400 border-blue-400 hover:bg-blue-300 hover:from-blue-300 hover:via-blue-300 hover:border hover:border-blue-300'],
  'rose': ['from-rose-400 via-rose-400 border-rose-400 hover:bg-rose-300 hover:from-rose-300 hover:via-rose-300 hover:border hover:border-rose-300'],
  'orange': ['from-orange-400 via-orange-400 border border-orange-400 hover:bg-orange-300 hover:from-orange-300 hover:via-orange-300 hover:border hover:border-orange-300'],
  'stone': ['from-stone-400 via-stone-400 border border-stone-400 hover:bg-stone-300 hover:from-stone-300 hover:via-stone-300 hover:border hover:border-stone-300']
}