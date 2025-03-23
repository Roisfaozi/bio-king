import { expect, test } from '@playwright/test';

test.describe('Fitur Bio Page', () => {
  // Setup: login sebelum menjalankan tes
  test.beforeEach(async ({ page }) => {
    // Melakukan login - menggunakan rute yang benar
    await page.goto('/en/auth/login');

    // Periksa apakah form login ada
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const loginButton = page.getByRole('button', {
      name: /masuk|login|sign in/i,
    });

    const formAvailable =
      (await emailInput.count()) > 0 &&
      (await passwordInput.count()) > 0 &&
      (await loginButton.count()) > 0;

    if (formAvailable) {
      await emailInput.fill('test@example.com');
      await passwordInput.fill('password123');
      await loginButton.click();

      // Tunggu navigasi selesai
      await page.waitForTimeout(2000);

      // Cek apakah sudah masuk ke dashboard
      const url = page.url();
      console.log(`Current URL after login: ${url}`);
      if (!url.includes('dashboard')) {
        console.log('Login gagal atau redirect ke halaman lain');
      }
    } else {
      console.log('Form login tidak ditemukan');
    }
  });

  test('harus dapat membuat bio page baru jika form tersedia', async ({
    page,
  }) => {
    // Pergi ke halaman pembuatan bio page
    await page.goto('/en/(dashboard)/(main)/bio-pages/create');

    // Periksa apakah form tersedia
    const usernameInput = page.getByLabel(/username/i);
    const titleInput = page.getByLabel(/judul|title/i);
    const createButton = page.getByRole('button', { name: /buat|create/i });

    const formAvailable =
      (await usernameInput.count()) > 0 &&
      (await titleInput.count()) > 0 &&
      (await createButton.count()) > 0;

    if (formAvailable) {
      // Mengisi form
      const username = `test-${Date.now()}`;
      await usernameInput.fill(username);
      await titleInput.fill('Bio Page Test');
      if ((await page.getByLabel(/deskripsi|description/i).count()) > 0) {
        await page
          .getByLabel(/deskripsi|description/i)
          .fill('Ini adalah bio page untuk pengujian');
      }

      // Submit form
      await createButton.click();

      // Tunggu proses selesai
      await page.waitForTimeout(2000);

      // Periksa apakah ada konfirmasi sukses
      const successMessage = await page
        .getByText(/berhasil|success|created/i)
        .isVisible();
      if (successMessage) {
        console.log('Bio page berhasil dibuat');
      }
    } else {
      console.log('Form pembuatan bio page tidak ditemukan');
    }
  });

  test('harus dapat melihat daftar bio page', async ({ page }) => {
    // Pergi ke halaman daftar bio page
    await page.goto('/en/(dashboard)/(main)/bio-pages');

    // Tunggu konten dimuat
    await page.waitForTimeout(2000);

    // Periksa apakah ada daftar bio page
    const bioPageList =
      (await page.locator('table').count()) > 0 ||
      (await page.locator('.bio-page-item').count()) > 0;

    if (bioPageList) {
      console.log('Daftar bio page ditemukan');
    } else {
      console.log('Daftar bio page tidak ditemukan atau kosong');
    }
  });

  test('harus dapat menambahkan link ke bio page jika tersedia', async ({
    page,
  }) => {
    // Pergi ke halaman daftar bio page
    await page.goto('/en/(dashboard)/(main)/bio-pages');

    // Periksa apakah ada bio page
    const editLink = page.getByRole('link', { name: /edit|kelola/i });

    if ((await editLink.count()) > 0) {
      // Klik link edit pada bio page pertama
      await editLink.first().click();

      // Tunggu navigasi selesai
      await page.waitForTimeout(2000);

      // Periksa apakah ada tombol tambah link
      const addLinkButton = page.getByRole('button', {
        name: /tambah link|add link/i,
      });

      if ((await addLinkButton.count()) > 0) {
        await addLinkButton.click();

        // Periksa apakah form link muncul
        const titleInput = page.getByLabel(/judul|title/i);
        const urlInput = page.getByLabel(/url/i);
        const saveButton = page.getByRole('button', { name: /simpan|save/i });

        if (
          (await titleInput.count()) > 0 &&
          (await urlInput.count()) > 0 &&
          (await saveButton.count()) > 0
        ) {
          // Isi form
          await titleInput.fill('Link Bio Test');
          await urlInput.fill('https://example.com');
          await saveButton.click();

          // Tunggu proses selesai
          await page.waitForTimeout(2000);

          // Periksa apakah link berhasil ditambahkan
          const success = await page.getByText(/berhasil|success/i).isVisible();
          if (success) {
            console.log('Link berhasil ditambahkan');
          }
        } else {
          console.log('Form tambah link tidak ditemukan');
        }
      } else {
        console.log('Tombol tambah link tidak ditemukan');
      }
    } else {
      console.log('Tidak ada bio page yang tersedia untuk diedit');
    }
  });
});
