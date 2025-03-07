import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';
import { UAParser } from 'ua-parser-js';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isLocationMatch = (
  targetLocation: any,
  locationName: any,
): boolean => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export const RGBToHex = (r: number, g: number, b: number): string => {
  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const redHex: string = componentToHex(r);
  const greenHex: string = componentToHex(g);
  const blueHex: string = componentToHex(b);

  return '#' + redHex + greenHex + blueHex;
};

export function hslToHex(hsl: string): string {
  // Remove "hsla(" and ")" from the HSL string
  let hslValues = hsl.replace('hsla(', '').replace(')', '');

  // Split the HSL string into an array of H, S, and L values
  const [h, s, l] = hslValues.split(' ').map((value) => {
    if (value.endsWith('%')) {
      // Remove the "%" sign and parse as a float
      return parseFloat(value.slice(0, -1));
    } else {
      // Parse as an integer
      return parseInt(value);
    }
  });

  // Function to convert HSL to RGB
  function hslToRgb(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert RGB values to integers
    const rInt = Math.round(r * 255);
    const gInt = Math.round(g * 255);
    const bInt = Math.round(b * 255);

    // Convert RGB values to a hex color code
    const rgbToHex = (value: number): string => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${rgbToHex(rInt)}${rgbToHex(gInt)}${rgbToHex(bInt)}`;
  }

  // Call the hslToRgb function and return the hex color code
  return hslToRgb(h, s, l);
}

export const hexToRGB = (hex: string, alpha?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

export const formatTime = (time: number | Date | string): string => {
  if (!time) return '';

  const date = new Date(time);
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formattedTime;
};

// object check
export function isObjectNotEmpty(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  return Object.keys(obj).length > 0;
}

export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

// random word
export function getWords(inputString: string): string {
  // Remove spaces from the input string
  const stringWithoutSpaces = inputString.replace(/\s/g, '');

  // Extract the first three characters
  return stringWithoutSpaces.substring(0, 3);
}

// for path name
export function getDynamicPath(pathname: any): any {
  const prefixes = ['en', 'bn', 'ar'];

  for (const prefix of prefixes) {
    if (pathname.startsWith(`/${prefix}/`)) {
      return `/${pathname.slice(prefix.length + 2)}`;
    }
  }

  return pathname;
}

// translate

interface Translations {
  [key: string]: string;
}

export const translate = (title: string, trans: Translations): string => {
  const lowercaseTitle = title.toLowerCase();

  if (trans?.hasOwnProperty(lowercaseTitle)) {
    return trans[lowercaseTitle];
  }

  return title;
};

export function parseUserAgent(userAgent: string) {
  try {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    return {
      browser: result.browser.name || 'Unknown',
      os: result.os.name || 'Unknown',
      device: result.device.type || 'desktop',
    };
  } catch (error) {
    console.error('Error parsing user agent:', error);
    return {
      browser: 'Unknown',
      os: 'Unknown',
      device: 'desktop',
    };
  }
}

export function calculateGrowth(current: number, previous: number): number {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
}

// Generate a short code for links
export function generateShortCode() {
  const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    6,
  );
  return nanoid();
}

// Validate URL
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Convert epoch timestamp (milliseconds) to Date object
export function epochToDate(epoch: number): Date {
  if (!epoch) return new Date();
  return new Date(epoch);
}

// Convert Date object to epoch timestamp (milliseconds)
export function dateToEpoch(date: Date): number {
  return date.getTime();
}

// Format epoch timestamp to readable date string
export function formatEpochDate(
  epoch: number,
  formatString: string = 'PPP',
): string {
  if (!epoch) return 'Unknown date';
  try {
    return format(epochToDate(epoch), formatString);
  } catch (error) {
    console.error('Error formatting epoch date:', error, epoch);
    return 'Invalid date';
  }
}

// Format epoch timestamp to relative time (e.g., "2 hours ago")
export function formatEpochRelative(epoch: number): string {
  if (!epoch) return 'Unknown time';
  try {
    return formatDistanceToNow(epochToDate(epoch), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative epoch:', error, epoch);
    return 'Invalid time';
  }
}

// Get current time as epoch timestamp
export function getCurrentEpoch(): number {
  return Date.now();
}

// Check if an epoch timestamp is in the past
export function isEpochInPast(epoch: number): boolean {
  return epoch < getCurrentEpoch();
}

// Check if an epoch timestamp is in the future
export function isEpochInFuture(epoch: number): boolean {
  return epoch > getCurrentEpoch();
}

// Add days to an epoch timestamp
export function addDaysToEpoch(epoch: number, days: number): number {
  const date = epochToDate(epoch);
  date.setDate(date.getDate() + days);
  return dateToEpoch(date);
}
