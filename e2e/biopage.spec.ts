import { expect, test } from '@playwright/test';

test.describe('Fitur Bio Page', () => {
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

  test('harus dapat membuat bio page baru', async ({ page }) => {
    await page.goto('/dashboard/biopage/create');

    // Mengisi form pembuatan bio page
    const username = `test-${Date.now()}`;
    await page.getByLabel(/username/i).fill(username);
    await page.getByLabel(/judul/i).fill('Bio Page Test');
    await page
      .getByLabel(/deskripsi/i)
      .fill('Ini adalah bio page untuk pengujian');
    await page.getByRole('button', { name: /buat/i }).click();

    // Memastikan bio page berhasil dibuat
    await expect(page.getByText(/bio page berhasil dibuat/i)).toBeVisible();

    // Memastikan redirected ke halaman daftar bio page
    await expect(page).toHaveURL(/dashboard\/biopage/);

    // Memastikan bio page baru muncul dalam daftar
    await expect(page.getByText('Bio Page Test')).toBeVisible();
  });

  test('harus dapat menambahkan link ke bio page', async ({ page }) => {
    // Pergi ke halaman daftar bio page
    await page.goto('/dashboard/biopage');

    // Memilih bio page pertama
    await page
      .getByRole('link', { name: /kelola/i })
      .first()
      .click();

    // Menambahkan link baru
    await page.getByRole('button', { name: /tambah link/i }).click();
    await page.getByLabel(/judul/i).fill('Link Bio Test');
    await page.getByLabel(/url/i).fill('https://example.com');
    await page.getByRole('button', { name: /simpan/i }).click();

    // Memastikan link berhasil ditambahkan
    await expect(page.getByText(/link berhasil ditambahkan/i)).toBeVisible();
    await expect(page.getByText('Link Bio Test')).toBeVisible();
  });

  test('harus dapat mengunjungi bio page publik', async ({ page, context }) => {
    // Pergi ke halaman daftar bio page
    await page.goto('/dashboard/biopage');

    // Mendapatkan username bio page pertama
    const usernameElement = await page.getByText(/@[\w-]+/i).first();
    const usernameText = await usernameElement.textContent();
    const username = usernameText?.replace('@', '') || '';

    // Membuka tab baru untuk mengunjungi bio page
    const newPage = await context.newPage();
    await newPage.goto(`/${username}`);

    // Memastikan bio page terbuka
    await expect(newPage.getByRole('heading')).toBeVisible();

    // Memastikan ada link yang ditampilkan
    await expect(newPage.getByRole('link')).toBeVisible();
  });

  test('harus dapat mengubah tema bio page', async ({ page }) => {
    // Pergi ke halaman daftar bio page
    await page.goto('/dashboard/biopage');

    // Memilih bio page pertama
    await page
      .getByRole('link', { name: /kelola/i })
      .first()
      .click();

    // Membuka pengaturan tema
    await page.getByRole('button', { name: /tema/i }).click();

    // Memilih tema lain
    await page.getByRole('radio', { name: /dark/i }).click();
    await page.getByRole('button', { name: /simpan/i }).click();

    // Memastikan tema berhasil diubah
    await expect(page.getByText(/tema berhasil diubah/i)).toBeVisible();
  });
});
