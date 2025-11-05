import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const gradientTextVariants = cva('bg-clip-text text-transparent', {
  variants: {
    gradient: {
      primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
      secondary: 'bg-gradient-to-r from-pink-500 to-orange-500',
    },
  },
  defaultVariants: {
    gradient: 'primary',
  },
});

interface GradientTextProps extends VariantProps<typeof gradientTextVariants> {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, gradient, className }: GradientTextProps) => {
  return <span className={gradientTextVariants({ gradient, className })}>{children}</span>;
};
