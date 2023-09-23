import React from 'react';

import { EmotionButtonProps } from '../types/components';

function emotionToColor(emotion: string): string {
  if (emotion === '開心') return 'yellow';
  if (emotion === '悲傷') return 'blue';
  if (emotion === '浪漫') return 'rose';
  if (emotion === '憤怒') return 'orange';
  return 'yellow';
}

const EmotionButton: React.FC<EmotionButtonProps> = ({ label, onClick, emotion }) => {
  let toColor = emotion || emotionToColor(label);

  return (
    <button
      type='button'
      onClick={onClick}
      className={`text-white bg-gradient-to-br from-${toColor}-400 via-${toColor}-400 to-slate-100  border border-${toColor}-400 hover:bg-${toColor}-300 hover:from-${toColor}-300 hover:via-${toColor}-300 hover:to-white hover:text-white hover:border-${toColor}-300 focus:outline-none text-lg font-bold rounded-lg px-4 py-2 text-center mr-2`}
    >
      {label}
    </button>
  );
};

export default EmotionButton;

