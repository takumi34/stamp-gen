import type { ReactNode } from 'react';

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export const Label = ({ htmlFor, children, className }: LabelProps) => {
  const classes = className
    ? `block text-xs font-semibold text-gray-700 mb-2 ${className}`
    : 'block text-xs font-semibold text-gray-700 mb-2';

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  );
};
