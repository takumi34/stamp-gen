import type { SelectHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const selectVariants = cva(
  'w-full px-3 py-1.5 border-2 rounded-lg focus:ring-2 focus:outline-none text-xs',
  {
    variants: {
      error: {
        true: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        false: 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
);

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const Select = ({ error, className, children, ...props }: SelectProps) => {
  return (
    <select
      className={selectVariants({ error, className })}
      {...props}
    >
      {children}
    </select>
  );
};
