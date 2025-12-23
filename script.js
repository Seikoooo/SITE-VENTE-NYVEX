// ===== DOM ELEMENTS =====
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const qtyInput = document.querySelector('.qty-input');
const qtyMinusBtn = document.querySelector('.qty-btn.minus');
const qtyPlusBtn = document.querySelector('.qty-btn.plus');
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image img');

// ===== CART FUNCTIONALITY =====
let cart = [];

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(qtyInput?.value || 1);
        const existingItem = cart.find(item => item.id === 1);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ 
                id: 1, 
                name: 'PDRN Capsule Cream 100',
                price: 49.90,
                quantity: quantity 
            });
        }
        
        updateCartCount();
        
        // Visual feedback
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = ' Ajouté au panier';
        addToCartBtn.style.background = '#4db3a0';
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.background = '';
        }, 2000);
    });
}

// ===== QUANTITY CONTROLS =====
if (qtyMinusBtn && qtyPlusBtn && qtyInput) {
    qtyMinusBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
            updateAddToCartPrice();
        }
    });

    qtyPlusBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        if (currentValue < 10) {
            qtyInput.value = currentValue + 1;
            updateAddToCartPrice();
        }
    });

    qtyInput.addEventListener('change', () => {
        let value = parseInt(qtyInput.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 10) value = 10;
        qtyInput.value = value;
        updateAddToCartPrice();
    });
}

function updateAddToCartPrice() {
    if (addToCartBtn && qtyInput) {
        const quantity = parseInt(qtyInput.value);
        const price = (49.90 * quantity).toFixed(2).replace('.', ',');
        addToCartBtn.textContent = `Ajouter au panier  ${price}€`;
    }
}

// ===== THUMBNAIL GALLERY =====
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
        
        // If thumbnail has an image, update main image
        const thumbImg = thumbnail.querySelector('img');
        if (thumbImg && mainImage) {
            mainImage.src = thumbImg.src;
        }
    });
});

// ===== MOBILE MENU =====
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        if (emailInput.value) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = ' Inscrit !';
            submitBtn.style.background = '#4db3a0';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .ingredient-card, .testimonial-card, .routine-step').forEach(el => {
    observer.observe(el);
});

// ===== STICKY CTA FUNCTIONALITY =====
const stickyCta = document.querySelector('.sticky-cta');
const productSection = document.querySelector('.product-section');

if (stickyCta && productSection) {
    window.addEventListener('scroll', () => {
        const productRect = productSection.getBoundingClientRect();
        
        // Show sticky CTA when product section is out of view on mobile
        if (window.innerWidth <= 968) {
            if (productRect.bottom < 0 || productRect.top > window.innerHeight) {
                stickyCta.style.transform = 'translateY(0)';
            } else {
                stickyCta.style.transform = 'translateY(100%)';
            }
        }
    });
    
    // Add click handler for sticky CTA button
    const stickyBtn = stickyCta.querySelector('.btn');
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => {
            productSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ===== PRELOADER (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CONSOLE BRANDING =====
console.log('%cNOVA', 'font-size: 48px; font-family: serif; font-weight: bold; color: #4db3a0;');
console.log('%cL\'innovation au service de votre peau', 'font-size: 14px; color: #6b6b6b;');
