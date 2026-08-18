import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Shared Button component with primary, secondary, and ghost variants.
 * Automatically renders as an anchor tag `<a>` when `href` is provided,
 * otherwise renders as a `<button>`.
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
      'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/80 active:bg-gray-100 dark:active:bg-slate-700 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 active:bg-gray-200 dark:active:bg-slate-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };

  const combinedClasses = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a
        className={combinedClasses}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
