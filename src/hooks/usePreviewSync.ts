import { useEffect, useRef, type RefObject } from 'react';
import type { StampConfig } from '../types';

export const usePreviewSync = (
  sourceCanvasRef: RefObject<HTMLCanvasElement | null>,
  targetCanvasRef: RefObject<HTMLCanvasElement | null>,
  config: StampConfig
) => {
  const rafIdRef = useRef<number | null>(null);
  const rafIdRef2 = useRef<number | null>(null);

  useEffect(() => {
    if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    if (rafIdRef2.current !== null) cancelAnimationFrame(rafIdRef2.current);

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef2.current = requestAnimationFrame(() => {
        if (targetCanvasRef.current && sourceCanvasRef.current) {
          const ctx = targetCanvasRef.current.getContext('2d');
          if (ctx) ctx.drawImage(sourceCanvasRef.current, 0, 0);
        }
      });
    });

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (rafIdRef2.current !== null) cancelAnimationFrame(rafIdRef2.current);
    };
  }, [config, sourceCanvasRef, targetCanvasRef]);
};
