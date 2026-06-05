# Yeremia — Portfolio

Portfolio personal dengan admin panel untuk mengelola konten secara dinamis tanpa menyentuh kode.

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules |
| Animasi | Framer Motion 12 |
| Database | PostgreSQL |
| ORM | Prisma 7 (driver: `@prisma/adapter-pg`) |
| Auth | JWT via `jose`, cookie HTTP-only |
| Font | Montserrat (`next/font/google`) |

---

## Arsitektur Sistem

```
┌──────────────────────────────────────────────────────┐
│                       Browser                        │
│                                                      │
│   Landing Page (/)         Admin Panel (/admin)      │
│   - Hero                   - Login                   │
│   - About                  - Edit About              │
│   - Projects               - Manage Projects         │
│   - Contact                  - Edit info             │
│   - Project Detail           - Sections & Gallery    │
└────────────────┬─────────────────────┬───────────────┘
                 │                     │
                 ▼                     ▼
┌──────────────────────────────────────────────────────┐
│                   Next.js Server                     │
│                                                      │
│  ┌──────────────────┐   ┌────────────────────────┐   │
│  │  Server Pages    │   │      API Routes        │   │
│  │                  │   │                        │   │
│  │  (main)/page.tsx │   │  GET  /api/about       │   │
│  │  → query Prisma  │   │  PUT  /api/about       │   │
│  │    langsung      │   │                        │   │
│  │                  │   │  GET  /api/projects    │   │
│  │  projects/[id]/  │   │  POST /api/projects    │   │
│  │  page.tsx        │   │                        │   │
│  │  → query Prisma  │   │  PUT  /api/projects/id │   │
│  │    langsung      │   │  DEL  /api/projects/id │   │
│  └──────────────────┘   │                        │   │
│                          │  GET  .../sections     │   │
│  ┌──────────────────┐   │  POST .../sections     │   │
│  │  proxy.ts        │   │  PUT  .../sections/sid │   │
│  │  (route guard)   │   │  DEL  .../sections/sid │   │
│  │                  │   │                        │   │
│  │  /admin/*        │   │  GET  .../gallery      │   │
│  │  → verifikasi    │   │  POST .../gallery      │   │
│  │    JWT cookie    │   │  DEL  .../gallery/gid  │   │
│  │  → redirect jika │   │                        │   │
│  │    tidak valid   │   │  POST /api/upload      │   │
│  └──────────────────┘   │  POST /api/admin/login │   │
│                          │  POST /api/admin/logout│   │
│                          └────────────────────────┘   │
└─────────────────────────────────┬────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────┐
│                    PostgreSQL                        │
│                                                      │
│  About              Project         ProjectSection   │
│  ──────────         ───────────     ─────────────    │
│  id (selalu 1)      id              id               │
│  bio                title           projectId (FK)   │
│  skills[ ]          category        title?           │
│  stats (JSON)       year            description      │
│  updatedAt          description?    imageUrl?        │
│                     githubUrl?      order            │
│                     liveUrl?                         │
│                     thumbnailUrl?   ProjectImage     │
│                     layout          ────────────     │
│                     order           id               │
│                     sections[ ]     projectId (FK)   │
│                     gallery[ ]      url              │
│                                    caption?          │
│                                    order             │
└──────────────────────────────────────────────────────┘
```

### Alur Data

**Landing page (publik):**
```
Request /  →  Next.js server page
           →  query Prisma langsung (server component)
           →  render HTML dengan data
           →  kirim ke browser
```

**Admin panel:**
```
Login  →  POST /api/admin/login
       →  bandingkan dengan ADMIN_PASSWORD di .env
       →  buat JWT  →  simpan di HTTP-only cookie (7 hari)

Request /admin/*  →  proxy.ts intersep
                  →  verifikasi JWT dari cookie
                  →  invalid  →  redirect ke /admin (login)
                  →  valid    →  lanjut ke halaman

Edit konten  →  admin page fetch ke API route
             →  API route verifikasi JWT
             →  Prisma update database
             →  landing page otomatis tampil data terbaru
```

**Upload gambar:**
```
Pilih file  →  POST /api/upload (multipart/form-data)
            →  simpan ke public/uploads/[timestamp-random].ext
            →  return { url: "/uploads/filename" }
            →  URL disimpan ke database
```

---

## Struktur File

```
├── prisma/
│   ├── schema.prisma        # Definisi model database
│   └── seed.ts              # Data awal (bio, 3 project contoh)
│
├── public/
│   └── uploads/             # Gambar yang diupload via admin
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — ThemeProvider saja
│   │   │
│   │   ├── (main)/              # Route group: landing page
│   │   │   ├── layout.tsx       # Tambahkan Navbar
│   │   │   ├── page.tsx         # Halaman utama (/)
│   │   │   └── projects/[id]/   # Halaman detail project
│   │   │       ├── page.tsx     # Server component, fetch data
│   │   │       └── ProjectDetail.tsx  # Client component, render layout
│   │   │
│   │   ├── admin/               # Admin panel (semua protected)
│   │   │   ├── page.tsx         # Halaman login
│   │   │   ├── layout.tsx       # Metadata noindex
│   │   │   ├── admin.module.css # Styles seluruh admin UI
│   │   │   ├── _components/
│   │   │   │   └── AdminShell.tsx  # Sidebar + layout admin
│   │   │   ├── about/
│   │   │   │   └── page.tsx     # Editor bio, stats, skills
│   │   │   └── projects/
│   │   │       ├── page.tsx     # List + CRUD projects
│   │   │       └── [id]/
│   │   │           └── page.tsx # Sections & gallery manager
│   │   │
│   │   └── api/
│   │       ├── about/route.ts
│   │       ├── projects/route.ts
│   │       ├── projects/[id]/route.ts
│   │       ├── projects/[id]/sections/route.ts
│   │       ├── projects/[id]/sections/[sectionId]/route.ts
│   │       ├── projects/[id]/gallery/route.ts
│   │       ├── projects/[id]/gallery/[imageId]/route.ts
│   │       ├── upload/route.ts
│   │       └── admin/
│   │           ├── login/route.ts
│   │           └── logout/route.ts
│   │
│   ├── components/          # Komponen landing page
│   │   ├── Navbar.tsx / .module.css
│   │   ├── Hero.tsx / .module.css
│   │   ├── About.tsx / .module.css
│   │   ├── Projects.tsx / .module.css
│   │   └── Contact.tsx / .module.css
│   │
│   ├── context/
│   │   └── ThemeContext.tsx  # State dark/light mode + localStorage
│   │
│   ├── lib/
│   │   ├── auth.ts           # signToken, verifyToken, checkPassword
│   │   └── prisma.ts         # Prisma client singleton (PrismaPg adapter)
│   │
│   └── proxy.ts             # Route guard untuk /admin/* (Next.js 16)
│
├── .env                     # Environment variables — JANGAN di-commit
├── prisma.config.ts         # Konfigurasi Prisma (datasource URL)
└── next.config.ts
```

---

## Setup

### Prasyarat

- Node.js 18+
- PostgreSQL (lokal atau cloud: Neon, Supabase, Railway)

### Instalasi

```bash
# 1. Install dependencies
npm install

# 2. Buat dan isi file .env (lihat bagian Environment Variables)

# 3. Buat tabel di database
npm run db:push

# 4. Isi data awal
npm run db:seed

# 5. Jalankan dev server
npm run dev
```

Buka:
- `http://localhost:3000` — landing page
- `http://localhost:3000/admin` — admin panel

---

## Environment Variables

```env
# Koneksi database PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/portfolio"

# Password untuk login ke admin panel
ADMIN_PASSWORD="password-kamu"

# Secret key untuk signing JWT (string acak, minimal 32 karakter)
ADMIN_SECRET="random-string-panjang-yang-tidak-mudah-ditebak"
```

> File `.env` sudah ada di `.gitignore` dan tidak akan ter-commit.

---

## Scripts

| Script | Fungsi |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm run start` | Jalankan production build |
| `npm run db:generate` | Regenerate Prisma client setelah ubah schema |
| `npm run db:push` | Sinkronkan schema ke database (tanpa migration file) |
| `npm run db:seed` | Isi data awal ke database |

> **Penting:** Setiap kali `prisma/schema.prisma` diubah, jalankan `db:generate` lalu restart dev server agar Prisma client ter-refresh.

---

## Admin Panel

### `/admin/about`
Edit bio, statistik (nilai + label), dan tech stack (skill badges). Klik **Simpan** untuk menyimpan semua sekaligus.

### `/admin/projects`
- Tambah, edit, hapus project
- Upload **thumbnail** yang tampil di grid landing page

### `/admin/projects/[id]` — Content Manager

Setiap project punya dua pilihan layout untuk halaman detailnya:

**Layout 1 — Alternating**
Sections tampil dengan deskripsi dan gambar berselang-seling kiri-kanan. Gambar per section bersifat opsional — section tanpa gambar tampil sebagai teks penuh.

**Layout 2 — Plain**
Sections berisi teks saja. Semua gambar ditampilkan di galeri bawah halaman.

Alur pengeditan:
1. Pilih layout
2. Tambah sections (isi judul, deskripsi, dan gambar jika Layout 1)
3. Klik **Simpan Semua Perubahan** — menyimpan layout dan semua sections sekaligus
4. Upload gambar galeri — tersimpan otomatis tanpa perlu klik save

---

## Deployment

### Vercel

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Tambahkan environment variables di Vercel dashboard:
   - `DATABASE_URL` — gunakan connection string dari Neon atau Supabase
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET`
4. Deploy

### Catatan Penting untuk Production

Gambar yang diupload saat ini disimpan di `public/uploads/` (filesystem lokal). Di Vercel, filesystem bersifat read-only sehingga upload tidak akan berfungsi setelah deploy.

Solusi: migrasi upload ke cloud storage sebelum deploy ke production:
- **Vercel Blob** (terintegrasi langsung dengan Vercel)
- **Cloudinary** (gratis tier tersedia)
- **AWS S3** atau **Supabase Storage**

Perubahan yang diperlukan hanya di `src/app/api/upload/route.ts` — ganti `writeFile` dengan SDK cloud storage yang dipilih.

---

## Dark Mode

Aktif otomatis mengikuti preferensi sistem (`prefers-color-scheme`). Toggle manual tersedia di navbar. Preferensi tersimpan di `localStorage` browser.
