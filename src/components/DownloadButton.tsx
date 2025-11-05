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
    if (!canvas) {
      console.error('Canvas reference is not available');
      return;
    }

    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to generate blob from canvas');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = generateStampFilename(stampText);
        link.href = url;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png');
    } catch (error) {
      console.error('Error downloading stamp:', error);
    }
  };

  return (
    <Button onClick={handleDownload} variant="primary" size="lg" fullWidth>
      Download PNG
    </Button>
  );
};
