import type { TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textareaVariants = cva(
  'w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none resize-none transition-all duration-200 text-sm',
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

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = ({ error, className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={textareaVariants({ error, className })}
      {...props}
    />
  );
};
