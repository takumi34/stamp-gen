import type { RefObject } from 'react';
import { generateStampFilename } from '../utils/canvas';
import { Button } from './ui';

interface DownloadButtonProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  stampText: string;
}

export const DownloadButton = ({ canvasRef, stampText }: DownloadButtonProps) => {
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = generateStampFilename(stampText);
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <Button onClick={handleDownload} variant="primary" size="lg" fullWidth>
      Download PNG
    </Button>
  );
};
