import type { InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const colorPickerVariants = cva(
  'h-9 w-9 cursor-pointer rounded-lg border-2 border-gray-200 transition-colors',
  {
    variants: {
      variant: {
        primary: 'hover:border-indigo-400',
        secondary: 'hover:border-purple-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

interface ColorPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
    VariantProps<typeof colorPickerVariants> {}

export const ColorPicker = ({ variant, className, ...props }: ColorPickerProps) => {
  return (
    <input
      type="color"
      className={colorPickerVariants({ variant, className })}
      {...props}
    />
  );
};
