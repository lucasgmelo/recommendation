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
      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
      }`}
      style={{
        backgroundColor: disabled ? 'var(--neutral-surface-high-emphasis)' : 'var(--primary-surface-high-emphasis)',
        color: 'var(--neutral-text-inverse)',
        border: 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--primary-surface-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = 'var(--primary-surface-high-emphasis)';
        }
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
