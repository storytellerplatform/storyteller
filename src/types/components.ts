export interface EmotionButtonProps {
  label: string;
  emotion?: '開心' | '悲傷' | '浪漫' | '憤怒' | null | undefined;
  onClick?: () => void;
}