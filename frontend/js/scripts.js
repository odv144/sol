
document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Carrusel (solo en index.html)
    if (document.querySelector('.hero-carousel')) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        let slideInterval = setInterval(nextSlide, 5000);
        const carousel = document.querySelector('.carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }

    // Lógica del carrito (funciona en todas las páginas)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const totalElement = document.querySelector('.total span');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Actualizar contador del carrito
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = count);
    }

    // Renderizar productos en el carrito
    function renderCart() {
        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <a href="index.html#productos" class="btn">Ver productos</a>
                </div>
            `;
            if (checkoutBtn) {
                checkoutBtn.disabled = true;
            }
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-desc">${item.description}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-qty">-</button>
                        <input type="number" value="${item.quantity}" min="1">
                        <button class="increase-qty">+</button>
                    </div>
                </div>
                <button class="remove-item"><i class="fas fa-times"></i></button>
            </div>
        `).join('');

        updateCartSummary();
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
        }
    }

    // Actualizar resumen del carrito
    function updateCartSummary() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 5.99 : 0; // Costo de envío ejemplo
        const total = subtotal + shipping;

        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Eventos para productos en index.html
    document.querySelectorAll('.product-card .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const product = {
                id: Date.now(), // ID temporal
                name: productCard.querySelector('h3').textContent,
                description: productCard.querySelector('p').textContent,
                image: productCard.querySelector('img').src,
                price: Math.random() * 20 + 5, // Precio aleatorio entre 5 y 25
                quantity: 1
            };

            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Producto agregado al carrito');
        });
    });

    // Eventos para el carrito
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            const itemElement = e.target.closest('.cart-item');
            if (!itemElement) return;

            const itemId = itemElement.dataset.id;
            const itemIndex = cart.findIndex(item => item.id == itemId);

            if (e.target.closest('.remove-item')) {
                cart.splice(itemIndex, 1);
            } else if (e.target.classList.contains('decrease-qty')) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
            } else if (e.target.classList.contains('increase-qty')) {
                cart[itemIndex].quantity += 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });

        // Actualizar cantidad cuando cambia el input
        cartItemsContainer.addEventListener('change', function(e) {
            if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
                const itemElement = e.target.closest('.cart-item');
                const itemId = itemElement.dataset.id;
                const itemIndex = cart.findIndex(item => item.id == itemId);
                const newQuantity = parseInt(e.target.value);

                if (newQuantity > 0) {
                    cart[itemIndex].quantity = newQuantity;
                } else {
                    cart.splice(itemIndex, 1);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        });
    }

    // Inicializar
    updateCartCount();
    renderCart();
});
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}