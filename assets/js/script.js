document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle Logic
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        
        // Switch Icon (Bars <-> Times)
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });


    // 2. Navbar Scroll Effect (Glassmorphism enhancer)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });


    // 3. Scroll Reveal Animation (Intersection Observer)
    // Ini membuat elemen muncul perlahan saat discroll ke bawah
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Hanya animasi sekali
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

});

// 4. WhatsApp Direct Order Logic (Global Function)
// Dipanggil langsung dari onClick button di HTML
function orderViaWA(productName, price) {
    // GANTI NOMOR INI dengan nomor admin asli (Format: Kode Negara + Nomor)
    const phoneNumber = "6281234567890"; 
    
    // Format pesan sapaan yang sopan dan jelas
    const message = `Halo Admin Bu Rudy, saya mau pesan:\n\n*${productName}*\nHarga: Rp ${price.toLocaleString('id-ID')}\n\nApakah stok tersedia dan bisa dikirim ke alamat saya?`;
    
    // Encode URL agar karakter spasi dan enter terbaca
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Buka di tab baru
    window.open(url, '_blank');
}