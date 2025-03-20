import { expect, test } from '@playwright/test';

test.describe('Autentikasi', () => {
  test('harus menampilkan halaman login', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Masuk/);
    await expect(page.getByRole('heading', { name: /masuk/i })).toBeVisible();
  });

  test('harus menampilkan error saat login dengan data yang tidak valid', async ({
    page,
  }) => {
    await page.goto('/login');

    // Mengisi formulir dengan data yang tidak valid
    await page.getByLabel(/email/i).fill('email@tidak-valid.com');
    await page.getByLabel(/password/i).fill('passwordsalah');
    await page.getByRole('button', { name: /masuk/i }).click();

    // Menunggu pesan error muncul
    await expect(page.getByText(/email atau password salah/i)).toBeVisible();
  });

  test('harus dapat mendaftar pengguna baru', async ({ page }) => {
    await page.goto('/register');

    // Mengisi formulir pendaftaran
    const testEmail = `test-${Date.now()}@example.com`;
    await page.getByLabel(/nama/i).fill('Pengguna Test');
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/password/i).fill('Password123!');
    await page.getByRole('button', { name: /daftar/i }).click();

    // Verifikasi pengalihan ke halaman dashboard setelah pendaftaran berhasil
    await expect(page).toHaveURL(/dashboard/);
  });
});
