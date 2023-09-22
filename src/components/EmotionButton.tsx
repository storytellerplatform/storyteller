import React from 'react';

// Define a type for the button's props
interface EmotionButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

// Define the button component
const EmotionButton: React.FC<EmotionButtonProps> = ({ label, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-${color}-400 hover:text-white border border-${color}-400 hover:bg-${color}-300 focus:outline-none font-bold rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2`}
    >
      {label}
    </button>
  );
};

export default EmotionButton;

