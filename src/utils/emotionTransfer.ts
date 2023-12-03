import { EmotionProps } from "../types/components";

export function emotionTransfer(emotion: Number): EmotionProps {
  if (emotion === 1) return '喜歡';
  if (emotion === 2) return '悲傷';
  if (emotion === 3) return '厭惡';
  if (emotion === 4) return '憤怒';
  if (emotion === 5) return '幸福';
  return '無';
};

export function emotionsTransfer (emotions: Array<Number>): Array<EmotionProps> {
  return emotions.map(emotion => {
    return emotionTransfer(emotion);
  });
};