import React, { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ children, id, ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer group">
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          className="peer appearance-none w-5 h-5 border rounded transition-all duration-200 cursor-pointer border-[var(--neutral-border-interactive)] bg-[var(--neutral-surface)] checked:bg-[var(--primary-surface-high-emphasis)] checked:border-[var(--primary-border)] hover:border-[var(--neutral-border-interactive-hover)]"
          {...props}
        />

        <svg
          className="absolute w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200 text-black translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="ml-3 text-sm font-medium transition-colors text-[var(--neutral-text-high-emphasis)]">
        {children}
      </span>
    </label>
  );
};

export default Checkbox;
