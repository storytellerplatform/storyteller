import React from 'react';
import classNames from 'classnames';

import { EmotionButtonProps, EmotionColorProps, EmotionProps } from '../types/components';
import { emotionStyles } from '../utils/emotion';

function emotionToColor(emotion: EmotionProps): EmotionColorProps {
  if (emotion === '開心') return 'yellow';
  if (emotion === '悲傷') return 'blue';
  if (emotion === '浪漫') return 'rose';
  if (emotion === '憤怒') return 'orange';
  return 'yellow';
}

const EmotionButton: React.FC<EmotionButtonProps> = ({ label, onClick, color }) => {
  let toColor: EmotionColorProps = color || emotionToColor(label);
  const emotionClass = emotionStyles[toColor];

  return (
    <button
      type='button'
      onClick={onClick}
      className={classNames(`text-white bg-gradient-to-br to-slate-100 border hover:to-white hover:text-white hover:border-${toColor}-300 focus:outline-none text-lg font-bold rounded-lg px-4 py-2 text-center mr-2`, emotionClass)}
    >
      {label}
    </button>
  );
};

export default EmotionButton;

