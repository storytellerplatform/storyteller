export type EmotionColorProps = 'red' | 'green' | 'yellow' | 'blue' | 'rose' | 'orange';  
export type EmotionProps = '開心' | '悲傷' | '浪漫' | '憤怒' | '緊張';
export type EmotionSizeProps = 'sm' | 'lg';

export interface EmotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: EmotionProps;
  color?: EmotionColorProps;
  onClick?: () => void;
  selected?: boolean;
  size?: EmotionSizeProps;
  defaultStyle?: boolean;
}