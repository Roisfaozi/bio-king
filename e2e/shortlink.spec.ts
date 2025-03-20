import { expect, test } from '@playwright/test';

test.describe('Fitur Shortlink', () => {
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

  test('harus dapat membuat shortlink baru', async ({ page }) => {
    await page.goto('/dashboard/shortlink/create');

    // Mengisi form pembuatan shortlink
    await page.getByLabel(/judul/i).fill('Link Testing');
    await page.getByLabel(/url asli/i).fill('https://example.com');
    await page.getByRole('button', { name: /buat/i }).click();

    // Memastikan shortlink berhasil dibuat
    await expect(page.getByText(/shortlink berhasil dibuat/i)).toBeVisible();

    // Memastikan redirected ke halaman daftar shortlink
    await expect(page).toHaveURL(/dashboard\/shortlink/);

    // Memastikan shortlink baru muncul dalam daftar
    await expect(page.getByText('Link Testing')).toBeVisible();
  });

  test('harus menampilkan error saat membuat shortlink dengan URL tidak valid', async ({
    page,
  }) => {
    await page.goto('/dashboard/shortlink/create');

    // Mengisi form dengan URL tidak valid
    await page.getByLabel(/judul/i).fill('Link Tidak Valid');
    await page.getByLabel(/url asli/i).fill('invalid-url');
    await page.getByRole('button', { name: /buat/i }).click();

    // Memastikan pesan error ditampilkan
    await expect(page.getByText(/url tidak valid/i)).toBeVisible();
  });

  test('harus dapat mengunjungi shortlink dan diarahkan ke URL asli', async ({
    page,
    context,
  }) => {
    // Membuat shortlink baru
    await page.goto('/dashboard/shortlink/create');
    await page.getByLabel(/judul/i).fill('Link Redirect Test');
    await page.getByLabel(/url asli/i).fill('https://example.com');
    await page.getByRole('button', { name: /buat/i }).click();

    // Mendapatkan kode shortlink
    await page.goto('/dashboard/shortlink');
    const shortCodeElement = await page.getByText(/\/s\//i).first();
    const shortCodeText = await shortCodeElement.textContent();
    const shortCode = shortCodeText?.replace('/s/', '') || '';

    // Membuka tab baru untuk menguji redirect
    const newPage = await context.newPage();
    await newPage.goto(`/s/${shortCode}`);

    // Memastikan diarahkan ke URL yang benar
    await expect(newPage).toHaveURL(/example\.com/);
  });
});
