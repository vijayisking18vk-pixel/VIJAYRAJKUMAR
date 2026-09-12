import React from 'react';

export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-base font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E2D] focus-visible:ring-offset-2 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-[#2C3E2D] text-white hover:bg-[#233224] active:scale-[0.98] shadow-sm',
    secondary:
      'bg-transparent border-[1.5px] border-[#2C3E2D] text-[#2C3E2D] hover:bg-[#2C3E2D]/5 active:scale-[0.98]',
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
