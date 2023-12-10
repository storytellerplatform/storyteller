import { EmotionColorProps, EmotionProps } from "../types/components";

export default function emotionToColor(emotion: EmotionProps): EmotionColorProps {
  if (emotion === '喜歡') return 'yellow';
  if (emotion === '悲傷') return 'blue';
  if (emotion === '幸福') return 'rose';
  if (emotion === '憤怒') return 'orange';
  if (emotion === '厭惡') return 'stone';
  return 'yellow';
}