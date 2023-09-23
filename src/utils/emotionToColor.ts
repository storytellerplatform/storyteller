import { EmotionColorProps, EmotionProps } from "../types/components";

export default function emotionToColor(emotion: EmotionProps): EmotionColorProps {
  if (emotion === '開心') return 'yellow';
  if (emotion === '悲傷') return 'blue';
  if (emotion === '浪漫') return 'rose';
  if (emotion === '憤怒') return 'orange';
  if (emotion === '緊張') return 'blue';
  return 'yellow';
}