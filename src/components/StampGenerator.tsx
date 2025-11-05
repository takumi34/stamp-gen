import { useState } from 'react';
import type { StampConfig } from '../types';
import type { ColorPreset } from '../constants';
import { useStampCanvas } from '../hooks/useStampCanvas';
import { Header } from './Header';
import { Footer } from './Footer';
import { StampEditor } from './StampEditor';
import { StampPreview } from './StampPreview';
import { DownloadButton } from './DownloadButton';

const DEFAULT_CONFIG: StampConfig = {
  text: 'OK',
  fontSize: 48,
  fontFamily: 'Arial, sans-serif',
  textColor: '#ffffff',
  backgroundColor: '#10B981',
};

export const StampGenerator = () => {
  const [config, setConfig] = useState<StampConfig>(DEFAULT_CONFIG);
  const { canvasRef } = useStampCanvas(config);

  const handlePresetClick = (preset: ColorPreset) => {
    setConfig((prev) => ({
      ...prev,
      backgroundColor: preset.bg,
      textColor: preset.text,
    }));
  };

  const handleConfigChange = <K extends keyof StampConfig>(key: K, value: StampConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="grid lg:grid-cols-3 gap-6">
          <StampEditor config={config} onConfigChange={handleConfigChange} onPresetClick={handlePresetClick} />
          <StampPreview canvasRef={canvasRef} config={config}>
            <DownloadButton canvasRef={canvasRef} stampText={config.text} />
          </StampPreview>
        </div>
        <Footer />
      </div>
    </div>
  );
};
