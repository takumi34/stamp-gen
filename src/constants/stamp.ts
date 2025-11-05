// Canvas settings
export const CANVAS_SIZE = 128;
export const TEXT_MAX_WIDTH_RATIO = 0.9;
export const TEXT_MAX_HEIGHT_RATIO = 0.9;
export const LINE_HEIGHT_RATIO = 1.2;
export const LINE_SPACING_RATIO = 0.2;
export const MIN_FONT_SIZE = 10;
export const FONT_SIZE_STEP = 2;
export const TEXT_MAX_LENGTH = 20;

// Color presets
export interface ColorPreset {
  readonly name: string;
  readonly bg: string;
  readonly text: string;
}

export const COLOR_PRESETS: readonly ColorPreset[] = [
  { name: 'Green', bg: '#10B981', text: '#ffffff' },
  { name: 'Blue', bg: '#3B82F6', text: '#ffffff' },
  { name: 'Purple', bg: '#8B5CF6', text: '#ffffff' },
  { name: 'Red', bg: '#EF4444', text: '#ffffff' },
  { name: 'Yellow', bg: '#F59E0B', text: '#ffffff' },
  { name: 'Pink', bg: '#EC4899', text: '#ffffff' },
  { name: 'Indigo', bg: '#6366F1', text: '#ffffff' },
  { name: 'Gray', bg: '#6B7280', text: '#ffffff' },
] as const;

// Font options
export interface FontOption {
  readonly name: string;
  readonly value: string;
}

export const FONT_OPTIONS: readonly FontOption[] = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'ゴシック', value: '"Noto Sans JP", "Yu Gothic", "Meiryo", "Hiragino Kaku Gothic ProN", sans-serif' },
  { name: '明朝', value: '"Noto Serif JP", "Yu Mincho", "MS Mincho", "Hiragino Mincho ProN", serif' },
  { name: 'モノスペース', value: '"Courier New", "Consolas", monospace' },
] as const;
