import { isValidUrl } from '@/lib/utils';

describe('isValidUrl', () => {
  it('harus mengembalikan true untuk URL yang valid', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://sub.example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
    expect(isValidUrl('https://example.com:8080')).toBe(true);
  });

  it('harus mengembalikan false untuk URL yang tidak valid', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('example.com')).toBe(false); // tanpa protokol
    expect(isValidUrl('http:/example.com')).toBe(false); // tanpa double slash
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('ftp://example.com')).toBe(true); // ftp adalah protokol valid
  });
});
