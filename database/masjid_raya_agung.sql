CREATE DATABASE IF NOT EXISTS masjid_raya_agung;
USE masjid_raya_agung;

-- Tabel jadwal sholat
CREATE TABLE IF NOT EXISTS jadwal_sholat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_sholat VARCHAR(50) NOT NULL,
    waktu TIME NOT NULL
);

-- Tabel pesan dari pengunjung
CREATE TABLE IF NOT EXISTS pesan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subjek VARCHAR(200) NOT NULL,
    pesan TEXT NOT NULL,
    tanggal DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel kegiatan masjid
CREATE TABLE IF NOT EXISTS kegiatan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kegiatan VARCHAR(200) NOT NULL,
    deskripsi TEXT,
    hari VARCHAR(20),
    waktu TIME,
    lokasi VARCHAR(100)
);

-- Insert data jadwal sholat contoh
INSERT INTO jadwal_sholat (nama_sholat, waktu) VALUES
('Subuh', '04:30:00'),
('Dzuhur', '12:00:00'),
('Ashar', '15:15:00'),
('Maghrib', '18:00:00'),
('Isya', '19:15:00');

-- Insert data kegiatan contoh
INSERT INTO kegiatan (nama_kegiatan, deskripsi, hari, waktu, lokasi) VALUES
('Pengajian Rutin', 'Pengajian mingguan untuk masyarakat umum', 'Jumat', '19:00:00', 'Aula Utama'),
('TPA (Taman Pendidikan Al-Quran)', 'Pendidikan Al-Quran untuk anak-anak', 'Senin-Jumat', '16:00:00', 'Ruang TPA'),
('Kajian Muslimah', 'Kajian khusus untuk muslimah', 'Sabtu', '09:00:00', 'Ruang Muslimah'),
('Bimbingan Pernikahan', 'Konsultasi dan bimbingan pranikah', 'Minggu Pertama', '13:00:00', 'Kantor Sekretariat');
