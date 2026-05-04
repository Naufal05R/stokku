# Stokku

Stokku adalah sistem manajemen inventaris berbasis web yang dibangun dengan Next.js dan Payload CMS. Aplikasi ini memungkinkan pengelolaan data barang, pencatatan transaksi keluar/masuk, dan kontrol akses berbasis peran (RBAC) untuk pengguna Admin dan Guest.

## Tech Stack

- **Framework**: Next.js 16 + Payload CMS 3
- **Database**: PostgreSQL 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Package Manager**: pnpm

## Prasyarat

Pastikan sudah terinstal:

- Node.js `>=22.15.0`
- pnpm `^9` atau `^10`
- PostgreSQL (lokal atau via Docker)

## Instalasi & Menjalankan Lokal

### 1. Clone repositori

```bash
git clone https://github.com/naufal05r/stokku.git
cd stokku
```

### 2. Salin file environment

```bash
cp .env.example .env
```

Isi variabel berikut di file `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=stokku

DATABASE_URL=postgresql://postgres:your_password@localhost:5432/stokku
PAYLOAD_SECRET=your_random_secret_string

DEFAULT_ADMIN_USER_EMAIL=admin@example.com
DEFAULT_ADMIN_USER_PASSWORD=your_admin_password
```

### 3. Install dependensi

```bash
pnpm install
```

### 4. Jalankan migrasi database

```bash
pnpm migrate
```

### 5. (Opsional) Seed data awal

```bash
pnpm seed
```

Perintah ini akan mengisi database dengan data contoh untuk users, items, dan transactions.

### 6. Jalankan dev server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

> Jika mengalami masalah cache, gunakan `pnpm devsafe` untuk membersihkan `.next` sebelum menjalankan dev server.

## Instalasi via Docker

Cara tercepat untuk menjalankan seluruh stack (app + database) menggunakan Docker Compose.

### 1. Clone repositori dan salin file environment

```bash
git clone https://github.com/naufal05r/stokku.git
cd stokku
cp .env.example .env
```

Isi file `.env` seperti contoh di atas.

### 2. Jalankan dengan Docker Compose

```bash
docker-compose up
```

Atau jalankan di background:

```bash
docker-compose up -d
```

Aplikasi akan tersedia di [http://localhost:3000](http://localhost:3000). Docker Compose akan otomatis menjalankan migrasi database saat container app pertama kali start.

## Scripts

| Perintah | Keterangan |
|---|---|
| `pnpm dev` | Menjalankan development server |
| `pnpm devsafe` | Bersihkan cache `.next` lalu jalankan dev server |
| `pnpm build` | Build aplikasi untuk production |
| `pnpm start` | Jalankan production server (setelah build) |
| `pnpm migrate` | Jalankan migrasi database |
| `pnpm seed` | Isi database dengan data contoh |
| `pnpm lint` | Jalankan ESLint |
| `pnpm test` | Jalankan semua test (integration + e2e) |
| `pnpm test:int` | Jalankan integration test (Vitest) |
| `pnpm test:e2e` | Jalankan end-to-end test (Playwright) |

## Fitur

- **Manajemen Barang** — Tambah, edit, dan hapus data barang/produk
- **Transaksi** — Catat transaksi masuk dan keluar stok
- **Dashboard** — Ringkasan kondisi inventaris secara keseluruhan
- **RBAC** — Role `admin` memiliki akses penuh; role `guest` hanya dapat membaca data
- **Dark/Light Mode** — Toggle tema dari panel admin

## Struktur Akun

Setelah menjalankan seed, akun default tersedia sesuai dengan nilai `DEFAULT_ADMIN_USER_EMAIL` dan `DEFAULT_ADMIN_USER_PASSWORD` yang diset di `.env`. Login tersedia di `/admin/login`.
