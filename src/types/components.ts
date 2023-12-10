export type EmotionColorProps = 'red' | 'green' | 'yellow' | 'blue' | 'rose' | 'orange' | 'stone';  
export type EmotionProps = '喜歡' | '悲傷' | '厭惡' | '憤怒' | '幸福' | '無';
export type EmotionSizeProps = 'sm' | 'lg';

export interface EmotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: EmotionProps;
  color?: EmotionColorProps;
  onClick?: () => void;
  selected?: boolean;
  size?: EmotionSizeProps;
  defaultStyle?: boolean;
}