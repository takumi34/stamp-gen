export const isValidHexColor = (color: string): boolean => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return hexColorRegex.test(color);
};

export const sanitizeColor = (color: string, fallback: string = '#000000'): string => {
  return isValidHexColor(color) ? color : fallback;
};

export const normalizeHexColor = (color: string): string => {
  if (!isValidHexColor(color)) return color;

  if (color.length === 4) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }

  return color.toUpperCase();
};
