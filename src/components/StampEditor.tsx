import type { StampConfig } from '../types';
import { TEXT_MAX_LENGTH, COLOR_PRESETS, FONT_OPTIONS, type ColorPreset } from '../constants';
import { Card, Label, Input, Textarea, Select, RangeSlider, ColorPicker } from './ui';

interface StampEditorProps {
  config: StampConfig;
  onConfigChange: <K extends keyof StampConfig>(key: K, value: StampConfig[K]) => void;
  onPresetClick: (preset: ColorPreset) => void;
}

export const StampEditor = ({ config, onConfigChange, onPresetClick }: StampEditorProps) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      <Card>
        <Label htmlFor="text-input">Text Content</Label>
        <Textarea
          id="text-input"
          value={config.text}
          onChange={(e) => onConfigChange('text', e.target.value)}
          placeholder="Enter your stamp text (e.g., OK, LGTM, Thanks)"
          rows={2}
          maxLength={TEXT_MAX_LENGTH}
        />
        <div className="mt-1 text-xs text-gray-400 text-right" aria-live="polite">
          {config.text.length} / {TEXT_MAX_LENGTH}
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="font-select">Font</Label>
            <Select
              id="font-select"
              value={config.fontFamily}
              onChange={(e) => onConfigChange('fontFamily', e.target.value)}
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="font-size">Size</Label>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-700">
                {config.fontSize}px
              </span>
            </div>
            <RangeSlider
              id="font-size"
              min="20"
              max="80"
              value={config.fontSize}
              onChange={(e) => onConfigChange('fontSize', Number(e.target.value))}
            />
          </div>
        </div>
      </Card>

      <Card>
        <Label>Color Presets</Label>
        <div className="grid grid-cols-8 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onPresetClick(preset)}
              className="group relative aspect-square rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ backgroundColor: preset.bg }}
              title={preset.name}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-white text-[10px] font-semibold bg-black/40 px-1.5 py-0.5 rounded">
                  {preset.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2">
              <ColorPicker
                id="text-color"
                value={config.textColor}
                onChange={(e) => onConfigChange('textColor', e.target.value)}
              />
              <Input
                type="text"
                value={config.textColor}
                onChange={(e) => onConfigChange('textColor', e.target.value)}
                className="flex-1 font-mono text-xs"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex gap-2">
              <ColorPicker
                id="bg-color"
                variant="secondary"
                value={config.backgroundColor}
                onChange={(e) => onConfigChange('backgroundColor', e.target.value)}
              />
              <Input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => onConfigChange('backgroundColor', e.target.value)}
                className="flex-1 font-mono text-xs"
                placeholder="#10B981"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
