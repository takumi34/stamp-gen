import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const glowBoxVariants = cva('relative', {
  variants: {
    glow: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    glow: true,
  },
});

const glowEffectVariants = cva('', {
  variants: {
    color: {
      primary: 'absolute -inset-2 rounded-xl blur-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-15',
      secondary: 'absolute -inset-2 rounded-xl blur-lg bg-gradient-to-r from-pink-500 to-orange-500 opacity-15',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

const contentBoxVariants = cva('relative', {
  variants: {
    variant: {
      primary: 'p-6 rounded-xl shadow-inner bg-gradient-to-br from-gray-50 to-gray-100',
      secondary: 'p-4 rounded-lg shadow-md bg-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface GlowBoxProps extends VariantProps<typeof glowBoxVariants> {
  children: ReactNode;
  glowColor?: 'primary' | 'secondary';
  contentVariant?: 'primary' | 'secondary';
}

export const GlowBox = ({ children, glow, glowColor = 'primary', contentVariant = 'primary' }: GlowBoxProps) => {
  return (
    <div className={glowBoxVariants({ glow })}>
      {glow && <div className={glowEffectVariants({ color: glowColor })} />}
      <div className={contentBoxVariants({ variant: contentVariant })}>{children}</div>
    </div>
  );
};
