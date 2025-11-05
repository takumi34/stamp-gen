import { useEffect, useRef } from 'react';
import type { StampConfig } from '../types';
import { drawStamp } from '../utils/canvas';

export const useStampCanvas = (config: StampConfig) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);

    rafIdRef.current = requestAnimationFrame(() => {
      drawStamp(canvas, config);
      rafIdRef.current = null;
    });

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [config]);

  return { canvasRef };
};
