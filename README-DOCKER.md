# Panduan Docker untuk Bio-King

Dokumen ini berisi instruksi untuk menjalankan Bio-King menggunakan Docker dan Docker Compose.

## Prasyarat

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Cara Menjalankan dengan Docker

### 1. Persiapan

Pastikan file konfigurasi Docker sudah tersedia dalam proyek:

- `Dockerfile`
- `docker-compose.yml`
- `.env.docker`
- `.dockerignore`

### 2. Memulai Aplikasi dengan Docker Compose

```bash
# Membangun dan menjalankan container
docker-compose up -d --build

# Melihat log aplikasi
docker-compose logs -f app
```

### 3. Migrasi Database

Setelah container berjalan, jalankan migrasi Prisma untuk menyiapkan database:

```bash
# Masuk ke container aplikasi
docker-compose exec app sh

# Jalankan migrasi Prisma
npx prisma migrate deploy

# Opsional: Jalankan seeder jika diperlukan
npx prisma db seed
```

### 4. Mengakses Aplikasi

Setelah semua container berjalan dengan baik, Anda dapat mengakses aplikasi di:

- Frontend: http://localhost:3000
- Database PostgreSQL: localhost:5432

### 5. Menghentikan Aplikasi

```bash
# Menghentikan semua container
docker-compose down

# Menghentikan dan menghapus volume data (HATI-HATI: ini akan menghapus semua data)
docker-compose down -v
```

## Struktur Docker

- **app**: Service Next.js yang berisi aplikasi Bio-King
- **db**: Service PostgreSQL untuk database

## Pengembangan dengan Docker

### Mengubah Lingkungan

Untuk mengubah variabel lingkungan, edit file `.env.docker` dan restart container:

```bash
docker-compose down
docker-compose up -d
```

### Melihat Log

```bash
# Semua service
docker-compose logs -f

# Service spesifik
docker-compose logs -f app
docker-compose logs -f db
```

### Mengakses Database

```bash
# Menggunakan psql di dalam container
docker-compose exec db psql -U bio -d bio_db
```

## Deployment Produksi

Untuk lingkungan produksi, sebaiknya:

1. Gunakan kredensial database yang lebih kuat
2. Aktifkan SSL pada koneksi database
3. Hapus port yang terekspose ke host jika tidak diperlukan
4. Gunakan volume persistent untuk data

Sesuaikan file `docker-compose.yml` dan `.env.docker` sesuai kebutuhan produksi Anda.
