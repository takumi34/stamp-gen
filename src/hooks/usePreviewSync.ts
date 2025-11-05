import { useEffect, type RefObject } from 'react';
import type { StampConfig } from '../types';

export const usePreviewSync = (
  sourceCanvasRef: RefObject<HTMLCanvasElement | null>,
  targetCanvasRef: RefObject<HTMLCanvasElement | null>,
  config: StampConfig
) => {
  useEffect(() => {
    const updatePreview = () => {
      if (targetCanvasRef.current && sourceCanvasRef.current) {
        const ctx = targetCanvasRef.current.getContext('2d');
        if (ctx) {
          ctx.drawImage(sourceCanvasRef.current, 0, 0);
        }
      }
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(updatePreview);
    });
  }, [config, sourceCanvasRef, targetCanvasRef]);
};
