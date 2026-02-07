/*
  # Al-Quran Class Manager Database Schema

  1. Tabel yang Dibuat
    - `students` - Menyimpan data santri
      - `id` (uuid, primary key)
      - `absen` (integer) - Nomor absensi
      - `name` (text) - Nama santri
      - `class` (text) - Nama kelas
      - `type` (text) - Jenis program (Jilid/Al-Quran)
      - `current_progress` (text) - Bacaan terakhir
      - `total_attendance` (integer) - Total kehadiran
      - `last_materi` (text) - Materi terakhir
      - `last_activity_type` (text) - Tipe aktivitas terakhir
      - `last_note` (text) - Catatan terakhir
      - `history` (jsonb) - Riwayat progress
      - `created_at` (timestamptz) - Waktu dibuat
      - `updated_at` (timestamptz) - Waktu update terakhir

    - `app_config` - Menyimpan konfigurasi aplikasi
      - `id` (uuid, primary key)
      - `config_key` (text, unique) - Kunci konfigurasi
      - `config_value` (text) - Nilai konfigurasi
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS pada semua tabel
    - Policy untuk authenticated users dapat melakukan semua operasi CRUD
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  absen integer DEFAULT 0,
  name text NOT NULL,
  class text NOT NULL,
  type text NOT NULL DEFAULT 'Jilid',
  current_progress text DEFAULT 'Jilid 1 Hal 1',
  total_attendance integer DEFAULT 0,
  last_materi text DEFAULT '',
  last_activity_type text DEFAULT 'Reading',
  last_note text DEFAULT '',
  history jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create app_config table
CREATE TABLE IF NOT EXISTS app_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key text UNIQUE NOT NULL,
  config_value text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class);
CREATE INDEX IF NOT EXISTS idx_students_absen ON students(absen);
CREATE INDEX IF NOT EXISTS idx_app_config_key ON app_config(config_key);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
CREATE POLICY "Allow all operations for authenticated users"
  ON students
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for anon users"
  ON students
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create policies for app_config table
CREATE POLICY "Allow all operations for authenticated users on config"
  ON app_config
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations for anon users on config"
  ON app_config
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Insert default sheet_url config
INSERT INTO app_config (config_key, config_value)
VALUES ('sheet_url', '')
ON CONFLICT (config_key) DO NOTHING;