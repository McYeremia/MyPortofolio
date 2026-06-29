# Panduan Menambah Card Project

Guide singkat untuk menambahkan project baru supaya semua card tetap **setara / seragam** tanpa pernah merusak layout.

## Cara kerja: satu sumber data, dua halaman

Semua project hidup di array `projects` di [`portfolio.ts`](./portfolio.ts). Tambah satu object, dia langsung tersedia. Tapi dua halaman menampilkannya secara **berbeda**:

| Halaman | Komponen | Menampilkan |
|---------|----------|-------------|
| Arsip `/projects` | `src/app/(main)/projects/page.tsx` | **SEMUA** project di array |
| Landing (homepage) | `src/components/Projects.tsx` | **Hanya** project di daftar `landingProjectIds` |

Jadi: menambah project ke array = otomatis muncul di halaman arsip. Untuk landing, kamu memilih (kurasi) mana yang tampil — lihat bagian berikut.

Tidak perlu menyentuh komponen atau CSS untuk menambah/mengganti project.

## Mengatur project mana yang tampil di landing page

Landing page tidak menampilkan semua project, melainkan satu **shortlist** yang kamu kontrol lewat `landingProjectIds` di `portfolio.ts`:

```ts
export const landingProjectIds: string[] = [
  "settlezk",
  "trustdrop",
  "verified-agent-records",
  "idxanalyst",
];
```

- Tiap string adalah `id` sebuah project (lihat field `id` di tiap entry array).
- **Urutan di daftar ini = urutan tampil** di landing.
- Untuk **mengganti** project di landing, cukup ubah 1–2 baris di sini — tukar id-nya. Contoh: ganti `"idxanalyst"` jadi `"project-baru"` → landing langsung ikut berubah, halaman arsip tidak terpengaruh.
- Idealnya isi **4 id** (layout landing dirancang untuk 4: 1 card featured besar + 3 grid).
- Id yang salah ketik akan diabaikan diam-diam (card-nya hilang, tapi tidak error).

Jadi alurnya: tambah semua project ke array `projects` → arsip otomatis lengkap → pilih 4 favorit di `landingProjectIds` untuk dipajang di landing.

## Template card baru

Salin block ini ke dalam array `projects` di `portfolio.ts`:

```ts
{
  id: "nama-project",                     // slug unik (huruf kecil, pakai -). Dipakai landingProjectIds
  tag: "FULLSTACK · WEB · 2026",          // label mono kecil di atas judul
  title: "Nama Project",
  desc: "Satu–tiga kalimat. Jelaskan APA yang dipecahkan dan KENAPA menarik, bukan daftar fitur.",
  thumb: "[ replace screenshot ]",        // placeholder kalau image belum ada
  image: "/projects/nama-project.png",    // taruh file di /public/projects/, atau null
  tech: ["Next.js", "FastAPI", "Tailwind"], // 3–4 badge ideal
  live: "https://contoh.vercel.app",      // opsional — hapus baris kalau tidak ada
  repo: "https://github.com/McYeremia/repo", // opsional — hapus baris kalau tidak ada
  // featured: true,                       // HANYA untuk satu project (lihat di bawah)
},
```

Definisi tipe lengkapnya ada di `interface ProjectCard` (atas `portfolio.ts`).

## Field reference

| Field      | Wajib | Catatan |
|------------|:-----:|---------|
| `id`       | ✅ | Slug unik (huruf kecil, `-` sebagai pemisah). Dipakai sebagai React `key` dan untuk referensi di `landingProjectIds`. |
| `tag`      | ✅ | Label mono uppercase, pisahkan dengan ` · `. Buat ringkas (≤ 3 segmen). |
| `title`    | ✅ | Judul tampil. Usahakan unik. |
| `desc`     | ✅ | Lihat aturan panjang di bawah. |
| `thumb`    | ✅ | Teks placeholder saat `image` kosong. Boleh `"[ replace screenshot ]"`. |
| `image`    | ➖ | Path di `/public` (mis. `/projects/foo.png`). `null`/hilang → tampil placeholder. |
| `tech`     | ✅ | Array string. 3–4 badge paling rapi. |
| `live`     | ➖ | URL demo. Tombol "Live" hilang kalau field dihapus. |
| `repo`     | ➖ | URL source. Tombol GitHub hilang kalau field dihapus. |
| `featured` | ➖ | Lihat bagian Featured. Maksimal **satu** project. |

## Aturan emas supaya card tetap setara

Layout sudah meng-handle tinggi yang sama secara otomatis (grid stretch + `flex:1` body + tombol di-`margin-top:auto`). Tugasmu cuma jaga **konten** dalam rentang wajar:

1. **`desc` ± 2–4 baris.** Boleh beda panjang antar card — tombol tetap rata bawah berkat `margin-top:auto`. Tapi hindari deskripsi 1 baris vs 8 baris yang ekstrem; itu bikin area kosong terasa timpang.
2. **`tech` cukup 3–4 badge.** Lebih dari itu badge akan wrap ke baris kedua dan menambah tinggi card. Masih aman (tombol tetap rata), tapi paling rapi kalau jumlahnya konsisten antar project.
3. **`image` rasio landscape ~16:10.** Frame media tinggi tetap (`min-height:190px`) dan pakai `object-fit:cover`, jadi gambar apa pun terisi penuh tanpa gepeng. Idealnya semua screenshot pakai rasio yang sama.
4. **`title` usahakan ≤ 2 baris.** Judul sangat panjang menggeser body; pendek lebih konsisten.
5. **Jangan tambah field/markup khusus per-card.** Keseragaman muncul justru karena semua card render lewat komponen yang sama (`ProjectGridCard`). Kalau satu card perlu beda, ubah komponennya, bukan datanya.

## Tentang `featured`

- Tandai **satu** project dengan `featured: true`. Itu tampil sebagai panel split besar di atas section (media kiri, teks kanan) di layar > 960px.
- Featured hanya berpengaruh **di landing**, dan project-nya **harus ada di `landingProjectIds`**. Kalau id-nya tidak masuk shortlist, dia tidak akan tampil sama sekali.
- Card featured otomatis disembunyikan dari grid di desktop (`.card.featuredGridCard { display:none }`) dan muncul lagi sebagai card grid biasa di layar ≤ 960px — jadi jangan duplikat manual.
- Kalau tidak ada yang ditandai di antara shortlist, project pertama di `landingProjectIds` dipakai sebagai fallback (lihat `Projects.tsx`).

## Menambah gambar

1. Simpan screenshot di `public/projects/nama-project.png`.
2. Set `image: "/projects/nama-project.png"` (path relatif dari `/public`, awali dengan `/`).
3. Selama belum ada gambar, biarkan `image: null` dan `thumb` akan tampil sebagai placeholder.

## Di mana logika tinggi-sama berada (kalau perlu ngoprek)

Tidak perlu disentuh untuk pemakaian normal, tapi referensinya:

- `src/components/Projects.module.css`
  - `.grid` → kolom auto-fit + baris stretch (tinggi sama per baris)
  - `.card` / `.cardBody` → flex column + `flex:1` (body menyerap sisa tinggi)
  - `.cardBody .actions { margin-top:auto }` → tombol rata bawah di semua card
  - `.media { min-height:190px }` + `.shot { object-fit:cover }` → frame gambar seragam
- `src/components/projectParts.tsx` → komponen `Media`, `TechRow`, `Actions`, `ProjectGridCard`
- `src/components/TiltCard.tsx` → efek tilt 3D saat hover (mengikuti reduced-motion)

## Checklist sebelum commit

- [ ] `id` unik (huruf kecil, `-`)
- [ ] `tech` 3–4 item
- [ ] `desc` 2–4 baris, tidak ekstrem
- [ ] `image` ada di `/public/projects/` (atau `null`)
- [ ] Hapus `live`/`repo` yang tidak dipakai (jangan isi `"#"`)
- [ ] Maksimal satu project `featured`
- [ ] Kalau ingin project ini tampil di landing → tambahkan id-nya ke `landingProjectIds` (jaga tetap 4)
- [ ] Cek di homepage **dan** `/projects`
