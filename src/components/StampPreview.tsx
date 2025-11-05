import type { ReactNode, RefObject } from 'react';
import { useRef } from 'react';
import { CANVAS_SIZE } from '../constants';
import { Card, GlowBox } from './ui';
import type { StampConfig } from '../types';
import { usePreviewSync } from '../hooks/usePreviewSync';

interface StampPreviewProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  config: StampConfig;
  children?: ReactNode;
}

export const StampPreview = ({ canvasRef, config, children }: StampPreviewProps) => {
  const previewRef = useRef<HTMLCanvasElement>(null);
  usePreviewSync(canvasRef, previewRef, config);

  return (
    <aside className="lg:col-span-1">
      <Card className="sticky top-6">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Preview</h2>

        <div className="flex flex-col items-center space-y-4">
          <GlowBox>
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              className="rounded-lg shadow-md ring-1 ring-white"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </GlowBox>

          <div className="w-full">
            <p className="text-center mb-2 text-xs text-gray-500">Actual size in Slack</p>
            <div className="flex items-center justify-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <canvas
                ref={previewRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="rounded shadow-sm"
                style={{ width: '32px', height: '32px', imageRendering: 'crisp-edges' }}
              />
              <span className="text-xs text-gray-500">32px display</span>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50">
              <span className="text-xs font-semibold text-indigo-700">128 × 128 px</span>
            </div>
          </div>

          {children}
        </div>
      </Card>
    </aside>
  );
};
