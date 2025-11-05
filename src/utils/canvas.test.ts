import { describe, it, expect } from 'vitest';
import { generateStampFilename, getMaxTextWidth } from './canvas';

describe('generateStampFilename', () => {
  it('should generate filename with sanitized text and date', () => {
    const filename = generateStampFilename('OK');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-ok-${dateStr}.png`);
  });

  it('should handle Japanese characters', () => {
    const filename = generateStampFilename('了解');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-了解-${dateStr}.png`);
  });

  it('should handle mixed Japanese and English', () => {
    const filename = generateStampFilename('LGTM了解');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-lgtm了解-${dateStr}.png`);
  });

  it('should replace special characters with hyphens', () => {
    const filename = generateStampFilename('OK!@#');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-ok----${dateStr}.png`);
  });

  it('should handle empty string', () => {
    const filename = generateStampFilename('');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-custom-${dateStr}.png`);
  });

  it('should handle whitespace-only string', () => {
    const filename = generateStampFilename('   ');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-custom-${dateStr}.png`);
  });

  it('should handle newlines', () => {
    const filename = generateStampFilename('Line1\nLine2');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-line1-line2-${dateStr}.png`);
  });

  it('should trim leading and trailing whitespace', () => {
    const filename = generateStampFilename('  OK  ');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp-ok-${dateStr}.png`);
  });

  it('should handle emoji and unicode characters', () => {
    const filename = generateStampFilename('👍Good');
    const dateStr = new Date().toISOString().slice(0, 10);

    expect(filename).toBe(`slack-stamp---good-${dateStr}.png`);
  });
});

describe('getMaxTextWidth', () => {
  it('should return the maximum width from multiple lines', () => {
    const mockCtx = {
      measureText: (text: string) => ({ width: text.length * 10 })
    } as unknown as CanvasRenderingContext2D;

    const lines = ['short', 'medium text', 'this is a very long line'];
    const maxWidth = getMaxTextWidth(mockCtx, lines);

    expect(maxWidth).toBe(240);
  });

  it('should handle single line', () => {
    const mockCtx = {
      measureText: (text: string) => ({ width: text.length * 10 })
    } as unknown as CanvasRenderingContext2D;

    const lines = ['single line'];
    const maxWidth = getMaxTextWidth(mockCtx, lines);

    expect(maxWidth).toBe(110);
  });

  it('should handle empty array', () => {
    const mockCtx = {
      measureText: (text: string) => ({ width: text.length * 10 })
    } as unknown as CanvasRenderingContext2D;

    const lines: string[] = [];
    const maxWidth = getMaxTextWidth(mockCtx, lines);

    expect(maxWidth).toBe(-Infinity);
  });

  it('should handle array with empty strings', () => {
    const mockCtx = {
      measureText: () => ({ width: 0 })
    } as unknown as CanvasRenderingContext2D;

    const lines = ['', '', ''];
    const maxWidth = getMaxTextWidth(mockCtx, lines);

    expect(maxWidth).toBe(0);
  });
});
