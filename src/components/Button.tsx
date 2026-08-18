import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/**
 * Shared button component with three visual variants.
 * Sizes map to specific padding/font-size combinations — no magic numbers.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md',
    secondary:
      'bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100',
    ghost:
      'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
