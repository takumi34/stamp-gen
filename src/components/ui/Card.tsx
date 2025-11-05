import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4',
  {
    variants: {
      hover: {
        true: 'hover:shadow-xl transition-shadow duration-300',
      },
    },
    defaultVariants: {
      hover: true,
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className, hover }: CardProps) => {
  return (
    <div className={cardVariants({ hover, className })}>
      {children}
    </div>
  );
};
