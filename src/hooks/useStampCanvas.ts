import { useEffect, useRef } from 'react';
import type { StampConfig } from '../types';
import { drawStamp } from '../utils/canvas';

export const useStampCanvas = (config: StampConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawStamp(canvas, config);
  }, [config]);

  return { canvasRef };
};
