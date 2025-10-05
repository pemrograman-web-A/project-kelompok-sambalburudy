document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close navbar on mobile after clicking a link
            const navbarCollapse = document.getElementById('navbarNav');
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) { // Adjust offset as needed
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
        // Special handling for Home or default
        if (scrollY < sections[0].offsetTop - 100) { // Before the first section
             navLinks[0].classList.add('active'); // Assume first link is Home
             navLinks[0].setAttribute('aria-current', 'page');
        }
    });

    // Navbar shrink/change on scroll (Optional)
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll threshold
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Order Form Logic
    const orderForm = document.getElementById('orderForm');
    const addOrderItemBtn = document.getElementById('addOrderItem');
    const orderItemsContainer = document.getElementById('orderItems');
    let itemCounter = 1;

    // Function to add a new item row
    function addOrderItemRow() {
        itemCounter++;
        const newItemHtml = `
            <div class="row g-2 mb-3 align-items-center order-item" data-item-id="${itemCounter}">
                <div class="col-md-5">
                    <label for="menuSelect${itemCounter}" class="form-label visually-hidden">Pilih Menu</label>
                    <select id="menuSelect${itemCounter}" class="form-select menu-select" required>
                        <option selected disabled value="">Pilih Menu...</option>
                        <option value="Nasi Udang Empal">Nasi Udang Empal</option>
                        <option value="Sop Rawon Daging">Sop Rawon Daging</option>
                        <option value="Iga Penyet">Iga Penyet</option>
                        <option value="Pecel Lele">Pecel Lele</option>
                        <option value="Nasi Goreng Seafood">Nasi Goreng Seafood</option>
                        <option value="Sambal Udang Kemasan">Sambal Udang Kemasan</option>
                        <option value="Sambal Bawang Kemasan">Sambal Bawang Kemasan</option>
                        <option value="Lainnya">Lainnya (Tulis di Catatan)</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="quantity${itemCounter}" class="form-label visually-hidden">Jumlah</label>
                    <input type="number" id="quantity${itemCounter}" class="form-control quantity-input" value="1" min="1" required>