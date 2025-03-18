import { expect, test } from '@playwright/test';

test.describe('Fitur Analitik dan Tracking', () => {
  // Setup: login sebelum menjalankan tes
  test.beforeEach(async ({ page }) => {
    // Melakukan login
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /masuk/i }).click();

    // Memastikan login berhasil
    await expect(page).toHaveURL(/dashboard/);
  });

  test('harus menampilkan dashboard analitik', async ({ page }) => {
    await page.goto('/dashboard/analytics');

    // Memastikan halaman analitik terbuka
    await expect(
      page.getByRole('heading', { name: /analitik/i }),
    ).toBeVisible();

    // Memastikan komponen statistik ditampilkan
    await expect(page.getByText(/total klick/i)).toBeVisible();
    await expect(page.getByText(/pengunjung unik/i)).toBeVisible();
    await expect(page.getByText(/rata-rata waktu kunjungan/i)).toBeVisible();
  });

  test('harus menampilkan grafik analitik', async ({ page }) => {
    await page.goto('/dashboard/analytics');

    // Memastikan grafik ditampilkan
    await expect(page.locator('canvas').first()).toBeVisible();

    // Mengganti filter periode
    await page.getByRole('button', { name: /periode/i }).click();
    await page.getByRole('menuitem', { name: /bulan ini/i }).click();

    // Memastikan grafik diperbarui (grafik masih terlihat)
    await expect(page.locator('canvas').first()).toBeVisible();
  });

  test('harus menampilkan detail analitik untuk shortlink tertentu', async ({
    page,
  }) => {
    // Pergi ke halaman daftar shortlink
    await page.goto('/dashboard/shortlink');

    // Memilih shortlink pertama untuk melihat analitik
    await page
      .getByRole('link', { name: /analitik/i })
      .first()
      .click();

    // Memastikan halaman analitik shortlink terbuka
    await expect(
      page.getByRole('heading', { name: /analitik/i }),
    ).toBeVisible();

    // Memastikan detail klik ditampilkan
    await expect(page.getByText(/detail klik/i)).toBeVisible();
    await expect(page.getByText(/negara/i)).toBeVisible();
    await expect(page.getByText(/perangkat/i)).toBeVisible();
    await expect(page.getByText(/browser/i)).toBeVisible();
  });

  test('harus menampilkan peta sebaran klik berdasarkan lokasi', async ({
    page,
  }) => {
    await page.goto('/dashboard/analytics');

    // Memastikan peta ditampilkan
    await expect(page.locator('.map-container')).toBeVisible();

    // Memastikan ada data lokasi yang ditampilkan
    await expect(page.getByText(/sebaran lokasi/i)).toBeVisible();
    await expect(page.getByText(/negara/i)).toBeVisible();
  });

  test('harus dapat mengunduh laporan analitik', async ({ page }) => {
    await page.goto('/dashboard/analytics');

    // Mengklik tombol ekspor/unduh
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /ekspor/i }).click();

    // Memastikan file berhasil diunduh
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('analytics');
  });
});
