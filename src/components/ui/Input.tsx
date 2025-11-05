import type { InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'px-3 py-1.5 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all duration-200',
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

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = ({ error, className, ...props }: InputProps) => {
  return (
    <input
      className={inputVariants({ error, className })}
      {...props}
    />
  );
};
