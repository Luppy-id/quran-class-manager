# 📱 Quran Class Manager - PWA Ready

Aplikasi manajemen kelas Al-Quran dengan Progressive Web App (PWA) support. Bisa diinstall di semua perangkat dan berfungsi offline.

## ✨ Fitur

- 🔐 **Admin Authentication** - Login dengan email/password
- 📲 **Installable** - Install seperti aplikasi native di mobile & desktop
- 🔄 **Offline Support** - Berfungsi tanpa internet setelah install
- 🚀 **Fast Loading** - Caching untuk performa maksimal
- 📱 **Responsive** - Sempurna di semua ukuran layar
- 🔔 **Auto Update** - Update otomatis saat ada versi baru
- 🛡️ **Secure** - Database protected dengan RLS policies

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Setup Admin (PENTING!)

**Sebelum menggunakan aplikasi, Anda harus setup admin terlebih dahulu:**

1. Deploy aplikasi ke Vercel/Netlify
2. Login ke Supabase Dashboard
3. Buat user admin pertama
4. Login ke aplikasi dengan credentials admin

**Panduan lengkap:** Lihat [SETUP_ADMIN.md](./SETUP_ADMIN.md)

## 📦 Deploy

Aplikasi ini siap di-deploy ke:
- ✅ **Vercel** (Recommended)
- ✅ **Netlify**
- ✅ **GitHub Pages**
- ✅ Any static hosting

**Panduan lengkap:** Lihat [PANDUAN_DEPLOY.md](./PANDUAN_DEPLOY.md)

## 🎯 Cara Install di Perangkat

### Mobile (Android/iOS)
1. Buka aplikasi di browser
2. Klik tombol "Install" yang muncul
3. Aplikasi akan ter-install di home screen

### Desktop (Windows/Mac)
1. Buka aplikasi di Chrome/Edge
2. Klik ikon install di address bar
3. Aplikasi akan berfungsi seperti aplikasi native

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database & Auth)
- PWA (Service Worker + Manifest)

## 📁 Struktur PWA Files

```
/public
  ├── manifest.json     # PWA manifest
  ├── sw.js            # Service Worker
  └── icon.svg         # App icon

/src
  └── App.tsx          # Termasuk PWA install prompt
```

## 🎨 Kustomisasi

### Ganti Icon
Replace file `/public/icon.svg` dengan logo Anda.

### Ganti Warna Theme
Edit di `/public/manifest.json`:
```json
"theme_color": "#064e3b",
"background_color": "#064e3b"
```

## 👨‍💻 Developer

**Achmad Luthfi C, M.Pd.**
- WhatsApp: [0895612466176](https://wa.me/62895612466176)

## 📄 License

Private Project - All Rights Reserved
