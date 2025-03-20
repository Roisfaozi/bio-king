import { generateShortCode } from '@/lib/utils';

describe('generateShortCode', () => {
  it('harus menghasilkan shortcode dengan panjang 6 karakter', () => {
    const shortCode = generateShortCode();
    expect(shortCode).toHaveLength(6);
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
