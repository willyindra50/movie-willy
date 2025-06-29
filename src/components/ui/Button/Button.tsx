import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base =
    'px-6 py-2 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary:
      'bg-[var(--accent-red)] text-white hover:bg-red-700 focus:ring-red-500',
    secondary:
      'bg-white/10 text-white hover:bg-white/20 focus:ring-white border border-white/20',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
