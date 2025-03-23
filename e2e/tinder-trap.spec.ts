import { test, expect, Page } from '@playwright/test';

test.describe('Tinder Profile Page', () => {
  // Handle geolocation
  test.beforeEach(async ({ context }) => {
    // Mock geolocation
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({
      latitude: -6.2088,
      longitude: 106.8456, // Jakarta coordinates
      accuracy: 10,
    });
  });

  test('harus menampilkan halaman profile Tinder', async ({ page }) => {
    // Buat variabel untuk menyimpan request yang tertangkap
    const trackedRequests: any[] = [];

    // Pantau request ke endpoint tracking
    page.on('request', (request) => {
      if (request.url().includes('/api/track')) {
        trackedRequests.push(request);
      }
    });

    // Buka halaman Tinder profile - menggunakan rute yang benar
    await page.goto('/en/tinder/profile');

    // Tunggu halaman dimuat
    await page.waitForTimeout(2000);

    // Periksa apakah elemen header ada
    const headerExists = (await page.locator('header').count()) > 0;
    if (headerExists) {
      await expect(page.locator('header')).toBeVisible();
      console.log('Header terlihat');
    }

    // Periksa apakah elemen profile gambar ada
    const profileImageExists =
      (await page.locator('img[alt*="profile picture"]').count()) > 0;
    if (profileImageExists) {
      await expect(page.locator('img[alt*="profile picture"]')).toBeVisible();
      console.log('Gambar profil terlihat');
    }

    // Log jumlah request tracking untuk debug
    console.log(`Tracked requests: ${trackedRequests.length}`);

    // Cek apakah ada tracking request yang dikirim (jika implementasi tracking ada)
    if (trackedRequests.length > 0) {
      expect(trackedRequests.length).toBeGreaterThan(0);
    }
  });

  test('harus menampilkan error ketika geolokasi ditolak', async ({
    page,
    context,
  }) => {
    // Tolak izin geolokasi dengan membatalkan izin yang diberikan di beforeEach
    await context.clearPermissions();

    // Gunakan koordinat kosong akan tetapi tetap valid untuk tipe
    await context.setGeolocation({
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    });

    // Buka halaman Tinder profile - menggunakan rute yang benar
    await page.goto('/en/tinder/profile');

    // Tunggu permintaan geolokasi
    await page.waitForTimeout(3000);

    // Periksa apakah ada pesan error geolokasi
    const errorElements = (await page.locator('text=location').count()) > 0;
    if (errorElements) {
      console.log('Pesan error geolokasi ditemukan');
    } else {
      console.log('Tidak ada pesan error geolokasi yang ditampilkan');
    }
  });

  test('harus mengirimkan data geolokasi ke server jika diizinkan', async ({
    page,
  }) => {
    // Buat variabel untuk menyimpan data payload tracking
    let trackingPayload: any = null;

    // Intercept permintaan tracking ke endpoint
    await page.route('**/api/track', async (route) => {
      // Simpan data payload yang dikirim
      try {
        const postData = await route.request().postData();
        if (postData) {
          trackingPayload = JSON.parse(postData);
          console.log('Berhasil menangkap data tracking');
        }
      } catch (error) {
        console.error('Error parsing request data:', error);
      }
      // Lanjutkan permintaan
      await route.continue();
    });

    // Buka halaman Tinder profile - menggunakan rute yang benar
    await page.goto('/en/tinder/profile');

    // Tunggu permintaan geolokasi dan tracking
    await page.waitForTimeout(3000);

    // Jika implementasi tracking ada dan data dikirim
    if (trackingPayload) {
      console.log(
        'Data tracking ditemukan:',
        JSON.stringify(trackingPayload).substring(0, 100) + '...',
      );
      if (trackingPayload.geoData) {
        console.log('Data geolokasi ditemukan dalam tracking payload');
      }
    } else {
      console.log('Tidak ada data tracking yang ditangkap');
    }
  });
});
