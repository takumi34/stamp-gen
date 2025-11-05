import type { StampConfig } from '../types';
import {
  CANVAS_SIZE,
  TEXT_MAX_WIDTH_RATIO,
  TEXT_MAX_HEIGHT_RATIO,
  LINE_HEIGHT_RATIO,
  LINE_SPACING_RATIO,
  MIN_FONT_SIZE,
  FONT_SIZE_STEP,
} from '../constants';
import { sanitizeColor } from './validation';

export const getMaxTextWidth = (ctx: CanvasRenderingContext2D, lines: string[]): number => {
  return Math.max(...lines.map(line => ctx.measureText(line).width));
};

export const calculateOptimalFontSize = (
  ctx: CanvasRenderingContext2D,
  lines: string[],
  initialFontSize: number,
  fontFamily: string
): number => {
  let fontSize = initialFontSize;
  const maxWidth = CANVAS_SIZE * TEXT_MAX_WIDTH_RATIO;
  const maxHeight = CANVAS_SIZE * TEXT_MAX_HEIGHT_RATIO;

  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  let maxTextWidth = getMaxTextWidth(ctx, lines);

  while (
    (maxTextWidth > maxWidth || lines.length * fontSize * LINE_HEIGHT_RATIO > maxHeight) &&
    fontSize > MIN_FONT_SIZE
  ) {
    fontSize -= FONT_SIZE_STEP;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    maxTextWidth = getMaxTextWidth(ctx, lines);
  }

  return fontSize;
};

export const renderTextOnCanvas = (
  ctx: CanvasRenderingContext2D,
  lines: string[],
  fontSize: number,
  textColor: string
): void => {
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  const metrics = ctx.measureText('Mg');
  const actualAscent = metrics.actualBoundingBoxAscent;
  const actualDescent = metrics.actualBoundingBoxDescent;
  const actualLineHeight = actualAscent + actualDescent;
  const lineSpacing = fontSize * LINE_SPACING_RATIO;

  const totalHeight = lines.length * actualLineHeight + (lines.length - 1) * lineSpacing;
  const startY = (CANVAS_SIZE - totalHeight) / 2 + actualAscent;

  lines.forEach((line, index) => {
    const y = startY + index * (actualLineHeight + lineSpacing);
    ctx.fillText(line, CANVAS_SIZE / 2, y);
  });
};

export const drawStamp = (canvas: HTMLCanvasElement, config: StampConfig): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.warn('Failed to get 2d context from canvas');
    return;
  }

  try {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = sanitizeColor(config.backgroundColor, '#10B981');
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (!config.text.trim()) return;

    const allLines = config.text.split('\n');
    const lines = allLines.filter((line) => line.length > 0 || allLines.length === 1);
    const optimalFontSize = calculateOptimalFontSize(ctx, lines, config.fontSize, config.fontFamily);

    ctx.font = `bold ${optimalFontSize}px ${config.fontFamily}`;
    renderTextOnCanvas(ctx, lines, optimalFontSize, sanitizeColor(config.textColor, '#FFFFFF'));
  } catch (error) {
    console.error('Error drawing stamp:', error);
  }
};

export const generateStampFilename = (text: string): string => {
  const sanitizedText = text
    .trim()
    .replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '-')
    .toLowerCase();
  const timestamp = new Date().toISOString().slice(0, 10);
  return `slack-stamp-${sanitizedText || 'custom'}-${timestamp}.png`;
};
