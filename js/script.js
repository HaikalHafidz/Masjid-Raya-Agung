// Smooth scrolling untuk navigasi
document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;

                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });

                // Tutup mobile menu jika terbuka
                document.querySelector('nav ul').classList.remove('show');
            }
        }
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function () {
    document.querySelector('nav ul').classList.toggle('show');
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Highlight menu aktif berdasarkan scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fungsi untuk mendapatkan jadwal sholat
async function getJadwalSholat() {
    try {
        // Menggunakan API dari jadwal-sholat.org
        const response = await fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/' + getTodayDate());
        const data = await response.json();

        if (data.status === 'ok') {
            displayJadwalSholat(data.jadwal.data);
            updateDateInfo(data.jadwal.data);
        } else {
            // Fallback jika API tidak berfungsi
            displayDefaultJadwal();
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        displayDefaultJadwal();
    }
}

// Format tanggal untuk API
function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

// Update info tanggal dan lokasi
function updateDateInfo(jadwal) {
    const tanggalElement = document.getElementById('tanggal-sekarang');
    const lokasiElement = document.getElementById('lokasi-sekarang');

    if (jadwal.tanggal) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(jadwal.tanggal);
        tanggalElement.textContent = date.toLocaleDateString('id-ID', options);
    }

    if (jadwal.lokasi) {
        lokasiElement.textContent = jadwal.lokasi;
    }
}

// Menampilkan jadwal sholat default
function displayDefaultJadwal() {
    const jadwalContainer = document.getElementById('jadwal-sholat');

    // Data jadwal default (contoh)
    const jadwalDefault = [
        { name: 'Subuh', time: '04:30' },
        { name: 'Dzuhur', time: '12:00' },
        { name: 'Ashar', time: '15:15' },
        { name: 'Maghrib', time: '18:00' },
        { name: 'Isya', time: '19:15' }
    ];

    let html = '';
    jadwalDefault.forEach(sholat => {
        html += `
            <div class="jadwal-item">
                <span class="jadwal-nama">${sholat.name}</span>
                <span class="jadwal-waktu">${sholat.time}</span>
            </div>
        `;
    });

    jadwalContainer.innerHTML = html;

    // Update tanggal default
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('tanggal-sekarang').textContent = new Date().toLocaleDateString('id-ID', options);
}

// Menampilkan jadwal sholat dari API
function displayJadwalSholat(jadwal) {
    const jadwalContainer = document.getElementById('jadwal-sholat');

    const sholatList = [
        { name: 'Subuh', key: 'subuh' },
        { name: 'Dzuhur', key: 'dzuhur' },
        { name: 'Ashar', key: 'ashar' },
        { name: 'Maghrib', key: 'maghrib' },
        { name: 'Isya', key: 'isya' }
    ];

    let html = '';
    sholatList.forEach(sholat => {
        html += `
            <div class="jadwal-item">
                <span class="jadwal-nama">${sholat.name}</span>
                <span class="jadwal-waktu">${jadwal[sholat.key]}</span>
            </div>
        `;
    });

    jadwalContainer.innerHTML = html;
}

// Tab system untuk donasi
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', function () {
        // Hapus active class dari semua tab buttons dan contents
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Tambah active class ke tab button yang diklik
        this.classList.add('active');

        // Tampilkan tab content yang sesuai
        const tabId = this.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});

// Form donasi handler
document.getElementById('form-donasi-qris').addEventListener('submit', function (e) {
    e.preventDefault();
    processDonasi('QRIS');
});

document.getElementById('form-donasi-transfer').addEventListener('submit', function (e) {
    e.preventDefault();
    processDonasi('Transfer');
});

function processDonasi(method) {
    // Validasi form
    const form = event.target;
    const nama = form.nama.value.trim();
    const email = form.email.value.trim();
    const jumlah = form.jumlah.value.trim();
    const bukti = form.bukti.value.trim();

    if (!nama || !email || !jumlah || !bukti) {
        showNotification('Harap lengkapi semua field!', 'error');
        return;
    }

    // Simulasi pengiriman data
    showNotification('Sedang mengirim data donasi...', 'info');

    setTimeout(() => {
        // Dalam implementasi nyata, ini akan mengirim data ke server
        showNotification('Donasi berhasil dikonfirmasi! Terima kasih atas partisipasinya.', 'success');
        form.reset();

        // Update total donasi (simulasi)
        updateTotalDonasi(parseInt(jumlah));
    }, 2000);
}

function updateTotalDonasi(jumlah) {
    const totalElement = document.querySelector('.total-amount');
    const progressElement = document.querySelector('.progress');

    // Ekstrak angka dari string (menghapus "Rp" dan ".")
    const currentTotal = parseInt(totalElement.textContent.replace(/[^\d]/g, ''));
    const newTotal = currentTotal + jumlah;

    // Format ulang dengan titik sebagai pemisah ribuan
    totalElement.textContent = 'Rp ' + newTotal.toLocaleString('id-ID');

    // Update progress bar (simulasi)
    const progressPercentage = Math.min(100, (newTotal / 200000000) * 100);
    progressElement.style.width = progressPercentage + '%';

    // Update teks progress
    document.querySelector('.progress-text').textContent =
        Math.round(progressPercentage) + '% dari target Rp 200.000.000';
}

// Form kontak handler
document.getElementById('form-kontak').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validasi form sederhana
    const nama = this.nama.value.trim();
    const email = this.email.value.trim();
    const subjek = this.subjek.value.trim();
    const pesan = this.pesan.value.trim();

    if (!nama || !email || !subjek || !pesan) {
        showNotification('Harap lengkapi semua field!', 'error');
        return;
    }

    // Kirim form (dalam implementasi nyata, ini akan dikirim ke server)
    showNotification('Pesan Anda telah terkirim! Terima kasih.', 'success');
    this.reset();
});

// Newsletter form handler
document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = this.querySelector('input').value.trim();

    if (!email) {
        showNotification('Harap masukkan email Anda!', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Format email tidak valid!', 'error');
        return;
    }

    showNotification('Terima kasih telah berlangganan newsletter kami!', 'success');
    this.reset();
});

// Fungsi bantuan
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;

    // Style notifikasi
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;

    // Warna berdasarkan jenis notifikasi
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#17a2b8';
    }

    // Tambahkan ke body
    document.body.appendChild(notification);

    // Animasi masuk
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Tombol tutup
    notification.querySelector('.close-notification').addEventListener('click', function () {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });

    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Animasi saat scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.kegiatan-item, .feature-item, .tentang-image, .donasi-info, .donasi-methods');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    getJadwalSholat();
    initScrollAnimations();

    // Tambahkan style untuk notifikasi
    const style = document.createElement('style');
    style.textContent = `
        .close-notification {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(style);
});
