# 🔐 Setup Admin - Quran Class Manager

## Keamanan Aplikasi

Aplikasi ini sekarang **terkunci dengan autentikasi admin**. Hanya user yang terdaftar di Supabase Auth yang bisa login dan mengakses aplikasi.

---

## 📝 Cara Membuat Admin Pertama Kali

### Metode 1: Via Supabase Dashboard (Recommended)

1. **Login ke Supabase Dashboard**
   - Buka https://supabase.com
   - Login dengan akun Anda
   - Pilih project aplikasi

2. **Buka Authentication**
   - Di sidebar kiri, klik **"Authentication"**
   - Klik **"Users"**

3. **Add User**
   - Klik tombol **"Add User"** di kanan atas
   - Pilih **"Create new user"**

4. **Isi Data Admin**
   ```
   Email: admin@example.com
   Password: [password yang kuat]
   ☑ Auto Confirm User (centang ini!)
   ```

5. **Create User**
   - Klik **"Create user"**
   - User admin sudah siap!

6. **Test Login**
   - Buka aplikasi Anda
   - Login dengan email dan password yang dibuat
   - Berhasil! ✅

---

### Metode 2: Via SQL Editor (Advanced)

Jika Anda familiar dengan SQL, bisa juga create user via SQL Editor:

1. **Buka SQL Editor** di Supabase Dashboard
2. **Jalankan query ini:**

```sql
-- Ganti dengan email dan password Anda
SELECT auth.create_user(
  jsonb_build_object(
    'email', 'admin@example.com',
    'password', 'password_anda_di_sini',
    'email_confirm', true
  )
);
```

3. **Run** query tersebut
4. User admin sudah dibuat!

---

## 👥 Menambah Admin Baru

Untuk menambah admin lain (guru/ustadz lain):

1. Login ke Supabase Dashboard
2. Authentication → Users
3. Add User
4. Isi email & password admin baru
5. Auto confirm user
6. Share credentials ke admin baru

---

## 🔑 Reset Password Admin

### Via Supabase Dashboard:

1. Authentication → Users
2. Cari user yang ingin direset
3. Klik menu (⋮) di sebelah kanan
4. Pilih **"Reset Password"**
5. Kirim reset link ke email atau set password baru langsung

### Via Aplikasi (Coming Soon):

Fitur reset password via email bisa ditambahkan jika diperlukan.

---

## 🛡️ Keamanan yang Sudah Diterapkan

### 1. **Authentication Required**
- Semua halaman butuh login
- Tidak ada akses anonymous
- Auto redirect ke login jika belum login

### 2. **Row Level Security (RLS)**
- Database protected dengan RLS
- Hanya authenticated users bisa akses
- Anonymous users tidak bisa read/write

### 3. **Session Management**
- Session otomatis tersimpan
- Auto logout saat session expired
- Logout button tersedia di sidebar

---

## 🚨 Troubleshooting

### Tidak Bisa Login?

**Cek hal berikut:**

1. **Email sudah terdaftar?**
   - Check di Supabase Dashboard → Authentication → Users
   - Pastikan user ada dalam list

2. **User sudah confirmed?**
   - Di list users, cek kolom "Confirmed"
   - Jika belum, klik user → Confirm user

3. **Password benar?**
   - Pastikan password yang diinput benar
   - Coba reset password jika lupa

4. **Environment variables benar?**
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```

### Error "Invalid login credentials"?

- Email atau password salah
- Coba reset password di Supabase Dashboard

### Stuck di loading?

- Check network connection
- Check Supabase status
- Clear browser cache dan reload

---

## 💡 Best Practices

### 1. **Password yang Kuat**
```
❌ Buruk: admin123, password, 12345678
✅ Baik: Admin@2024!Quran, Secure#Pass2024
```

### 2. **Email yang Valid**
- Gunakan email yang bisa diakses
- Untuk reset password jika lupa

### 3. **Jangan Share Credentials**
- Setiap admin punya akun sendiri
- Tidak share email/password
- Buat user baru untuk admin baru

### 4. **Logout Setelah Selesai**
- Terutama di device bersama
- Klik tombol Logout di sidebar

---

## 🎯 Flow Penggunaan

```
1. Buka aplikasi
   ↓
2. Halaman Login muncul
   ↓
3. Input email & password admin
   ↓
4. Klik "Masuk Sebagai Admin"
   ↓
5. Masuk ke dashboard ✅
   ↓
6. Kelola data santri
   ↓
7. Logout saat selesai
```

---

## 📞 Butuh Bantuan?

Jika ada masalah saat setup admin atau login:

**Developer:** Achmad Luthfi C, M.Pd.
**WhatsApp:** https://wa.me/62895612466176

---

## ✅ Checklist Setup

- [ ] Login ke Supabase Dashboard
- [ ] Buka Authentication → Users
- [ ] Add User pertama (admin)
- [ ] Auto confirm user
- [ ] Test login di aplikasi
- [ ] Berhasil masuk dashboard
- [ ] Tambah admin lain jika perlu
- [ ] Share credentials ke tim

---

**Selamat! Aplikasi Anda sekarang aman dan hanya bisa diakses oleh admin yang terdaftar! 🔐**
