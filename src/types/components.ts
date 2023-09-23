export type EmotionColorProps = 'red' | 'green' | 'yellow' | 'blue' | 'rose' | 'orange';  
export type EmotionProps = '開心' | '悲傷' | '浪漫' | '憤怒' | '緊張';

export interface EmotionButtonProps {
  label: EmotionProps;
  color?: EmotionColorProps;
  onClick?: () => void;
}