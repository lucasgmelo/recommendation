import React, { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ children, id, ...props }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        {...props}
      />
      <span className="ml-2 text-sm font-medium text-gray-900">{children}</span>
    </label>
  );
};

export default Checkbox;
