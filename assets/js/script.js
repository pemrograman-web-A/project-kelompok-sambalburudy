document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU LOGIC (FIXED) ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('i');

    // Toggle Menu saat tombol diklik
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah event bubbling
        menu.classList.toggle('hidden');
        
        // Ubah Ikon
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close menu saat link diklik
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close menu saat klik di LUAR menu (Click Outside)
    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });


    // --- 2. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });


    // --- 3. SCROLL REVEAL ANIMATION ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

// --- 4. WHATSAPP ORDER LOGIC ---
function orderViaWA(productName, price) {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor Admin
    const message = `Halo Admin Bu Rudy, saya mau pesan:\n\n*${productName}*\nHarga: Rp ${price.toLocaleString('id-ID')}\n\nApakah stok tersedia?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}