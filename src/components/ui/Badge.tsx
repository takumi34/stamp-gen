import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'px-3 py-0.5 rounded-full text-xs font-semibold shadow-md',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white',
        secondary: 'bg-indigo-100 text-indigo-700',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export const Badge = ({ children, variant, className }: BadgeProps) => {
  return (
    <span className={badgeVariants({ variant, className })}>
      {children}
    </span>
  );
};
