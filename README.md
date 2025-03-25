# Bio-King Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Menjalankan dengan Docker

Proyek ini mendukung deployment menggunakan Docker. Ikuti langkah-langkah berikut untuk menjalankan aplikasi dengan Docker:

### Prasyarat

- Docker dan Docker Compose terinstal di sistem Anda
- Git untuk mengkloning repositori

### Langkah Menjalankan

1. Clone repositori:

   ```bash
   git clone <repository-url>
   cd bio-king
   ```

2. Jalankan dengan Docker Compose:

   ```bash
   docker-compose up -d
   ```

3. Aplikasi akan tersedia di `http://localhost:3000`

4. Untuk mematikan aplikasi:
   ```bash
   docker-compose down
   ```

### Environment Variables

Untuk lingkungan Docker, variabel lingkungan dikonfigurasi dalam:

- `.env.docker` - Berisi konfigurasi khusus Docker
- `docker-compose.yml` - Berisi konfigurasi service dan environment

### Database

PostgreSQL berjalan di container terpisah dan tersedia di:

- Host: `localhost` (atau `db` dari dalam container aplikasi)
- Port: `5432`
- Username: `bio`
- Password: `biopassword`
- Database: `bio_db`

### Volume Data

Data disimpan dalam volume Docker:

- `postgres-data`: Menyimpan data PostgreSQL
- `app-data`: Menyimpan data aplikasi

# Bio Shortlink - Tracking System

## Cara Akses Fitur

### Akses Dashboard

1. Login ke aplikasi
2. Klik menu "Dashboard" di navbar

### Manajemen Link untuk Tinder atau VSCO

Untuk membuat dan mengelola link yang mengarah ke halaman Tinder atau VSCO:

1. Pergi ke Dashboard → Shortlinks
2. Klik tombol "Create Link" di bagian atas halaman
3. Isi form dengan:
   - **Title**: Judul pendek untuk link (opsional)
   - **Destination URL**: URL tujuan setelah tracking
   - **Page Type**: Pilih salah satu:
     - **Tinder**: Akan menampilkan halaman profil Tinder palsu
     - **VSCO**: Akan menampilkan halaman profil VSCO palsu
4. Klik "Create Link" untuk menyimpan

Link yang telah dibuat dapat:

- Dilihat di halaman dashboard Shortlinks
- Diedit dengan mengklik ikon "Edit"
- Dihapus dengan mengklik ikon "Delete"
- Disalin ke clipboard dengan mengklik ikon "Copy"

### Melihat Data Captures

Data yang ditangkap dari pengunjung dapat dilihat di:

1. Pergi ke Dashboard → Form Captures
2. Halaman ini menampilkan semua data yang berhasil ditangkap, termasuk:
   - Source (Tinder, VSCO, dll)
   - Email dan password yang dimasukkan pengunjung
   - Data tambahan seperti nama dan nomor telepon
   - Informasi teknis seperti IP address, browser, dan device

### Filter Data Captures

Anda dapat memfilter data captures berdasarkan:

1. **Source**: Memilih sumber data (Tinder, VSCO, dll)
2. **Shortcode**: Mencari data berdasarkan kode singkat URL

### Navigasi Dashboard

Dashboard terbagi menjadi beberapa bagian utama:

- **Home**: Ringkasan dan analytics
- **Shortlinks**: Manajemen link tracking
- **Form Captures**: Data yang berhasil ditangkap
- **Analytics**: Statistik kunjungan

## Fitur yang Tersedia

### Manajemen Shortlink

- Membuat, mengedit, dan menghapus shortlink
- Menyesuaikan tipe halaman (Tinder/VSCO)
- Melihat statistik klik

### Form Captures

- Melihat semua data yang ditangkap dari pengunjung
- Memfilter berdasarkan source atau shortcode
- Export data (jika tersedia)

### Tracking

- Pelacakan IP pengunjung
- Capture GPS location (jika diizinkan)
- Device fingerprinting
- Capture data login yang dimasukkan pengunjung

## Keamanan

Pastikan untuk:

- Selalu logout setelah menggunakan dashboard
- Tidak membagikan credential akses
- Menjaga kerahasiaan data yang ditangkap
- Menggunakan fitur ini sesuai dengan ketentuan hukum yang berlaku
