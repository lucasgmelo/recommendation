import React, { ButtonHTMLAttributes } from 'react';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      }`}
      {...props}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
