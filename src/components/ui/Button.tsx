import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) => {
  const baseStyles = 'px-6 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles =
    variant === 'primary'
      ? 'bg-orange text-white hover:bg-orange/90 focus:ring-orange'
      : 'bg-transparent border border-black text-black hover:bg-black hover:text-white focus:ring-black';
  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
};
