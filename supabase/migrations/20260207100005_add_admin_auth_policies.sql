/*
  # Update RLS Policies untuk Admin Authentication
  
  Perubahan yang dilakukan:
  1. Security Changes
    - Hapus policies untuk anonymous users
    - Restrict semua operasi hanya untuk authenticated users
    - Separate policies untuk SELECT, INSERT, UPDATE, DELETE
    
  2. Students Table Policies
    - SELECT: Authenticated users dapat melihat semua data
    - INSERT: Authenticated users dapat menambah data
    - UPDATE: Authenticated users dapat update data
    - DELETE: Authenticated users dapat delete data
    
  3. App Config Table Policies
    - SELECT: Authenticated users dapat melihat config
    - INSERT: Authenticated users dapat tambah config
    - UPDATE: Authenticated users dapat update config
    - DELETE: Authenticated users dapat delete config
    
  Catatan:
  - Hanya admin yang sudah login dengan Supabase Auth yang bisa akses
  - Anonymous users tidak bisa akses sama sekali
  - Data tetap aman dengan RLS policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON students;
DROP POLICY IF EXISTS "Allow all operations for anon users" ON students;
DROP POLICY IF EXISTS "Allow all operations for authenticated users on config" ON app_config;
DROP POLICY IF EXISTS "Allow all operations for anon users on config" ON app_config;

-- Create new policies for students table - only authenticated users
CREATE POLICY "Authenticated users can view students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update students"
  ON students
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete students"
  ON students
  FOR DELETE
  TO authenticated
  USING (true);

-- Create new policies for app_config table - only authenticated users
CREATE POLICY "Authenticated users can view config"
  ON app_config
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert config"
  ON app_config
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update config"
  ON app_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete config"
  ON app_config
  FOR DELETE
  TO authenticated
  USING (true);
