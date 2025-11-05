import type { InputHTMLAttributes } from 'react';

type RangeSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const RangeSlider = ({ className, ...props }: RangeSliderProps) => {
  const classes = className ? `range-slider ${className}` : 'range-slider';

  return <input type="range" className={classes} {...props} />;
};
