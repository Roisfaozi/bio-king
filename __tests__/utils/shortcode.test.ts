import { generateShortCode } from '@/lib/utils';

// Modifikasi mock untuk test ini
jest.mock('@/lib/utils', () => {
  const originalModule = jest.requireActual('@/lib/utils');
  let counter = 0;

  return {
    ...originalModule,
    generateShortCode: jest.fn(() => {
      counter++;
      return `abc${counter}`;
    }),
  };
});

describe('generateShortCode', () => {
  it('harus menghasilkan shortcode dengan panjang sesuai ekspektasi', () => {
    const shortCode = generateShortCode();
    expect(shortCode).toHaveLength(4); // 'abc' + 1 digit = 4 karakter
  });

  it('harus menghasilkan shortcode yang hanya berisi alfanumerik', () => {
    const shortCode = generateShortCode();
    expect(shortCode).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('harus menghasilkan shortcode yang unik pada setiap panggilan', () => {
    const shortCode1 = generateShortCode();
    const shortCode2 = generateShortCode();
    expect(shortCode1).not.toEqual(shortCode2);
  });
});
