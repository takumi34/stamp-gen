import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-md hover:shadow-lg',
        secondary: 'bg-white border-2 border-gray-200 hover:border-indigo-400 text-gray-700 hover:text-indigo-700',
      },
      size: {
        sm: 'py-1.5 px-3 text-xs',
        md: 'py-2 px-4 text-sm',
        lg: 'py-3 px-4 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const Button = ({ children, variant, size, fullWidth, className, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, size, fullWidth, className })} {...props}>
      {children}
    </button>
  );
};
