import { EmotionProps } from "../types/components";

export function emotionNumTransfer(emotion: EmotionProps): Number {
  if (emotion === '喜歡') return 1;
  if (emotion === '悲傷') return 2;
  if (emotion === '厭惡') return 3;
  if (emotion === '憤怒') return 4;
  if (emotion === '幸福') return 5;
  return 0;
}

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