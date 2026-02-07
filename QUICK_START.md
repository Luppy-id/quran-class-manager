# 🚀 Quick Start - Deploy dalam 5 Menit

## Langkah 1: Push ke GitHub

```bash
# Di folder project
git init
git add .
git commit -m "PWA ready"
git branch -M main
git remote add origin https://github.com/USERNAME/quran-manager.git
git push -u origin main
```

Ganti `USERNAME` dan `quran-manager` sesuai kebutuhan.

## Langkah 2: Deploy ke Vercel

1. **Buka** https://vercel.com
2. **Sign up/Login** dengan GitHub
3. **Import** project dari GitHub
4. **Tambahkan Environment Variables:**
   ```
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_key_here
   ```
5. **Deploy** (tunggu 2-3 menit)

## Langkah 3: Setup Admin

**PENTING! Lakukan ini dulu sebelum test aplikasi:**

1. Login ke **Supabase Dashboard**
2. Buka **Authentication → Users**
3. **Add User** (admin pertama)
4. Auto confirm user
5. Catat email & password

**Detail:** Lihat [SETUP_ADMIN.md](./SETUP_ADMIN.md)

## Langkah 4: Test Login & PWA

1. Buka URL hasil deploy
2. **Login** dengan credentials admin
3. Berhasil masuk dashboard ✅
4. Test di mobile - muncul banner "Install Aplikasi"
5. Klik **INSTALL**
6. Done! ✅

## URL Aplikasi

Setelah deploy, URL akan seperti:
```
https://quran-manager.vercel.app
```

Bagikan URL ini ke semua pengguna!

---

## Troubleshooting

**Build error?**
- Check environment variables sudah benar
- Pastikan Supabase URL & Key valid

**Install button tidak muncul?**
- Pastikan akses via HTTPS
- Clear cache dan reload
- Coba di mode incognito

**Butuh bantuan?**
- Lihat [PANDUAN_DEPLOY.md](./PANDUAN_DEPLOY.md) untuk detail lengkap
- WA: 0895612466176

---

**Selamat! Aplikasi Anda siap digunakan di semua perangkat! 🎉**
