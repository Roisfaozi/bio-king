export const getColors = (color: string) => {
  switch (color) {
    case 'purple':
      return [
        { r: 124, g: 58, b: 237 }, // #7c3aed
        { r: 139, g: 92, b: 246 }, // #8b5cf6
        { r: 192, g: 38, b: 211 }, // #c026d3
      ];
    case 'blue':
      return [
        { r: 59, g: 130, b: 246 }, // #3b82f6
        { r: 14, g: 165, b: 233 }, // #0ea5e9
        { r: 99, g: 102, b: 241 }, // #6366f1
      ];
    case 'orange':
      return [
        { r: 249, g: 115, b: 22 }, // #f97316
        { r: 245, g: 158, b: 11 }, // #f59e0b
        { r: 239, g: 68, b: 68 }, // #ef4444
      ];
    case 'green':
      return [
        { r: 16, g: 185, b: 129 }, // #10b981
        { r: 5, g: 150, b: 105 }, // #059669
        { r: 6, g: 95, b: 70 }, // #065f46
      ];
    case 'pink':
      return [
        { r: 236, g: 72, b: 153 }, // #ec4899
        { r: 219, g: 39, b: 119 }, // #db2777
        { r: 244, g: 114, b: 182 }, // #f472b6
      ];
    case 'rainbow':
      return [
        { r: 255, g: 0, b: 0 }, // Red
        { r: 255, g: 165, b: 0 }, // Orange
        { r: 255, g: 255, b: 0 }, // Yellow
        { r: 0, g: 128, b: 0 }, // Green
        { r: 0, g: 0, b: 255 }, // Blue
        { r: 75, g: 0, b: 130 }, // Indigo
        { r: 238, g: 130, b: 238 }, // Violet
      ];
    default:
      return [
        { r: 255, g: 255, b: 255 }, // White
      ];
  }
};
