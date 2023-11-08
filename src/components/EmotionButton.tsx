import React from 'react';
import classNames from 'classnames';

import { EmotionButtonProps, EmotionColorProps } from '../types/components';
import { emotionStyles } from '../utils/emotion';
import emotionToColor from '../utils/emotionToColor';


const EmotionButton: React.FC<EmotionButtonProps> = ({ label, onClick, color, selected, disabled, size, className, defaultStyle = true }) => {
  let toColor: EmotionColorProps = color || emotionToColor(label);
  const emotionClass = emotionStyles[toColor];

  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={classNames(`h-fit text-white bg-gradient-to-br to-slate-100 border mr-2 rounded-3xl  hover:to-white hover:text-white focus:outline-none font-bold text-center transition-all ease-in duration-100`,
        emotionClass,
        { 'opacity-50 border-opacity-50': selected },
        { 'px-3 py-1.5 text-sm': size === 'sm' },
        className,
        { 'rounded-3xl px-4 py-2 text-lg': defaultStyle })
      }
    >
      {label}
    </button>
  );
};

export default EmotionButton;

