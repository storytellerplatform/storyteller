import React from 'react';

// Define a type for the button's props
interface EmotionButtonProps {
  label: string;
  color?: string;
  onClick: () => void;
}

function emotionToColor(emotion: string) {
  if (emotion === '開心') return 'yellow';
  if (emotion === '悲傷') return 'blue';
  if (emotion === '浪漫') return 'rose';
  if (emotion === '憤怒') return 'orange';
}

// Define the button component
const EmotionButton: React.FC<EmotionButtonProps> = ({ label, onClick, color }) => {
  if (!color) color = emotionToColor(label);

  return (
    <button
      type='button'
      onClick={onClick}
      className={`text-white bg-gradient-to-br from-${color}-400 via-${color}-400 to-slate-100  border border-${color}-400 hover:bg-${color}-300 hover:from-${color}-300 hover:via-${color}-300 hover:to-white hover:text-white focus:outline-none text-lg font-bold rounded-lg px-4 py-2 text-center mr-2 mb-2`}
    >
      {label}
    </button>
  );
};

export default EmotionButton;

