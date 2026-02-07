# 📱 Panduan Deploy & Install PWA - Quran Class Manager

## ✅ Fitur PWA yang Sudah Aktif

Aplikasi ini sudah dilengkapi dengan:
- ✨ Progressive Web App (PWA) support
- 📲 Install prompt otomatis
- 🔄 Service Worker untuk offline capability
- 🎨 App manifest dengan branding
- 📱 Responsive di semua perangkat

---

## 🚀 Cara Deploy ke Vercel (Gratis & Recommended)

### Langkah 1: Persiapan

1. **Buat akun GitHub** (jika belum punya)
   - Kunjungi https://github.com
   - Daftar gratis

2. **Upload project ke GitHub**
   ```bash
   # Di folder project, jalankan:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```

### Langkah 2: Deploy ke Vercel

1. **Buat akun Vercel**
   - Kunjungi https://vercel.com
   - Sign up dengan akun GitHub

2. **Import Project**
   - Klik "New Project"
   - Pilih repository dari GitHub
   - Klik "Import"

3. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Environment Variables**
   Tambahkan variabel berikut:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai (2-3 menit)
   - Aplikasi siap diakses!

### URL Aplikasi

Setelah deploy selesai, Anda akan mendapat URL seperti:
```
https://nama-app.vercel.app
```

---

## 🚀 Alternatif Deploy: Netlify (Gratis)

### Langkah 1: Buat Akun Netlify

1. Kunjungi https://netlify.com
2. Sign up dengan GitHub

### Langkah 2: Deploy

1. Klik "Add new site" → "Import an existing project"
2. Pilih GitHub dan authorize
3. Pilih repository
4. Configure build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

5. Tambahkan Environment Variables di Site Settings

6. Klik "Deploy site"

---

## 📲 Cara Install Aplikasi di Perangkat

### Di Android (Chrome/Edge)

1. Buka aplikasi di browser Chrome atau Edge
2. Akan muncul banner "Install Aplikasi" di bagian atas
3. Klik tombol **"INSTALL"**
4. Atau klik menu (⋮) → "Install app" / "Add to Home screen"
5. Aplikasi akan muncul di home screen seperti aplikasi native

### Di iPhone/iPad (Safari)

1. Buka aplikasi di Safari
2. Klik tombol "Share" (kotak dengan panah ke atas)
3. Scroll dan pilih **"Add to Home Screen"**
4. Edit nama jika perlu
5. Klik "Add"
6. Aplikasi akan muncul di home screen

### Di Windows (Chrome/Edge)

1. Buka aplikasi di Chrome atau Edge
2. Klik ikon install (⊕) di address bar
3. Atau klik menu (⋮) → "Install Quran Class Manager"
4. Aplikasi akan terinstall dan bisa dibuka dari Start Menu
5. Akan berjalan seperti aplikasi desktop native

### Di Mac (Chrome/Safari)

1. Buka aplikasi di Chrome atau Safari
2. Di Chrome: Klik menu → "Install Quran Class Manager"
3. Di Safari: File → "Add to Dock"
4. Aplikasi akan muncul di Dock atau Applications

---

## 🔧 Kustomisasi Icon (Opsional)

Untuk mengganti icon aplikasi dengan logo kustom:

### Cara Mudah - Gunakan Tool Online:

1. **Buat icon di https://realfavicongenerator.net**
   - Upload logo/gambar (min 512x512px)
   - Generate semua ukuran icon
   - Download package

2. **Replace files di folder `/public`**
   - Ganti `/public/icon.svg` dengan icon baru
   - Atau tambahkan PNG: `icon-192.png` dan `icon-512.png`

3. **Update manifest.json**
   ```json
   "icons": [
     {
       "src": "/icon-192.png",
       "sizes": "192x192",
       "type": "image/png"
     },
     {
       "src": "/icon-512.png",
       "sizes": "512x512",
       "type": "image/png"
     }
   ]
   ```

4. **Commit dan push ke GitHub**
   - Vercel/Netlify akan otomatis re-deploy

---

## 🌐 Update Otomatis

Setiap kali Anda push perubahan ke GitHub:
- Vercel/Netlify akan otomatis rebuild
- User yang sudah install akan dapat update otomatis
- Tidak perlu install ulang

---

## 💡 Tips & Troubleshooting

### Install Button Tidak Muncul?

- Pastikan aplikasi diakses via HTTPS
- Clear browser cache dan reload
- Install prompt hanya muncul 1x per browser
- Coba buka di mode incognito

### Aplikasi Tidak Berfungsi Offline?

- Service Worker perlu waktu untuk cache pertama kali
- Buka aplikasi saat online minimal 1x
- Refresh halaman untuk update cache

### Error saat Build?

- Pastikan semua dependencies terinstall: `npm install`
- Check environment variables sudah benar
- Lihat build logs di Vercel/Netlify dashboard

### Update Tidak Muncul?

- Clear browser cache
- Uninstall dan install ulang aplikasi
- Atau tutup aplikasi dan buka lagi

---

## 📊 Monitoring

### Analytics (Opsional)

Tambahkan Google Analytics atau Plausible untuk tracking:

1. **Google Analytics**
   ```bash
   npm install react-ga4
   ```

2. **Tambahkan di App.tsx**
   ```typescript
   import ReactGA from 'react-ga4';

   useEffect(() => {
     ReactGA.initialize('G-XXXXXXXXXX');
     ReactGA.send('pageview');
   }, []);
   ```

---

## 🎯 Checklist Deploy

- [ ] Environment variables sudah diset
- [ ] Build berhasil lokal: `npm run build`
- [ ] Push ke GitHub
- [ ] Deploy ke Vercel/Netlify
- [ ] Test PWA install di mobile
- [ ] Test PWA install di desktop
- [ ] Test offline functionality
- [ ] Share URL dengan user

---

## 📞 Support

Jika ada masalah saat deploy atau install:

**Developer:** Achmad Luthfi C, M.Pd.
**WhatsApp:** https://wa.me/62895612466176

---

## 🎉 Selamat!

Aplikasi Anda sekarang bisa diakses dari mana saja dan diinstall di semua perangkat!

**URL Deployment:** `https://your-app.vercel.app`

Bagikan URL ini ke semua pengguna, mereka tinggal:
1. Buka URL di browser
2. Klik tombol "Install"
3. Aplikasi siap digunakan! 🚀
