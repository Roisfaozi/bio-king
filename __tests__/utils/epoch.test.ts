import {
  addDaysToEpoch,
  dateToEpoch,
  epochToDate,
  getCurrentEpoch,
  isEpochInFuture,
  isEpochInPast,
} from '@/lib/utils';

describe('Fungsi Epoch', () => {
  describe('epochToDate', () => {
    it('harus mengkonversi epoch ke objek Date', () => {
      const testEpoch = 1647270000000; // 14 Maret 2022, 12:00:00 UTC
      const result = epochToDate(testEpoch);
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBe(testEpoch);
    });

    it('harus mengembalikan Date saat ini jika epoch tidak disediakan', () => {
      const now = new Date();
      const result = epochToDate(0);
      expect(result).toBeInstanceOf(Date);
      // Toleransi 1 detik untuk eksekusi tes
      expect(result.getTime()).toBeGreaterThanOrEqual(now.getTime() - 1000);
      expect(result.getTime()).toBeLessThanOrEqual(now.getTime() + 1000);
    });
  });

  describe('dateToEpoch', () => {
    it('harus mengkonversi objek Date ke timestamp epoch', () => {
      const testDate = new Date('2022-03-14T12:00:00Z');
      const result = dateToEpoch(testDate);
      expect(result).toBe(testDate.getTime());
    });
  });

  describe('getCurrentEpoch', () => {
    it('harus mengembalikan timestamp epoch saat ini', () => {
      const now = Date.now();
      const result = getCurrentEpoch();
      // Toleransi 1 detik untuk eksekusi tes
      expect(result).toBeGreaterThanOrEqual(now - 1000);
      expect(result).toBeLessThanOrEqual(now + 1000);
    });
  });

  describe('isEpochInPast', () => {
    it('harus mengembalikan true untuk timestamp di masa lalu', () => {
      const pastEpoch = Date.now() - 86400000; // 1 hari yang lalu
      expect(isEpochInPast(pastEpoch)).toBe(true);
    });

    it('harus mengembalikan false untuk timestamp di masa depan', () => {
      const futureEpoch = Date.now() + 86400000; // 1 hari ke depan
      expect(isEpochInPast(futureEpoch)).toBe(false);
    });
  });

  describe('isEpochInFuture', () => {
    it('harus mengembalikan true untuk timestamp di masa depan', () => {
      const futureEpoch = Date.now() + 86400000; // 1 hari ke depan
      expect(isEpochInFuture(futureEpoch)).toBe(true);
    });

    it('harus mengembalikan false untuk timestamp di masa lalu', () => {
      const pastEpoch = Date.now() - 86400000; // 1 hari yang lalu
      expect(isEpochInFuture(pastEpoch)).toBe(false);
    });
  });

  describe('addDaysToEpoch', () => {
    it('harus menambahkan hari ke timestamp epoch', () => {
      const testEpoch = 1647270000000; // 14 Maret 2022, 12:00:00 UTC
      const daysToAdd = 5;
      const expected = testEpoch + daysToAdd * 24 * 60 * 60 * 1000;

      expect(addDaysToEpoch(testEpoch, daysToAdd)).toBe(expected);
    });

    it('harus mampu menangani nilai negatif untuk mengurangi hari', () => {
      const testEpoch = 1647270000000; // 14 Maret 2022, 12:00:00 UTC
      const daysToSubtract = -3;
      const expected = testEpoch + daysToSubtract * 24 * 60 * 60 * 1000;

      expect(addDaysToEpoch(testEpoch, daysToSubtract)).toBe(expected);
    });
  });
});
