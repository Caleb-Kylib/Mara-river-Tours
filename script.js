// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Destination Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        destinationCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Basic validation
        const requiredFields = ['name', 'email', 'subject', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = contactForm.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#e1e5e9';
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.destination-card, .service-card, .feature-card, .team-member, .faq-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Form field focus effects
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type === 'submit') {
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            // Re-enable after 3 seconds (for demo purposes)
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});

// Smooth reveal animation for stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const finalValue = item.textContent;
                const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
                if (numericValue) {
                    animateNumber(item, 0, numericValue, 2000, finalValue);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isPercentage = originalText.includes('%');
    const isPlus = originalText.includes('+');
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        let displayText = current.toString();
        if (isPercentage) displayText += '%';
        if (isPlus) displayText += '+';
        
        element.textContent = displayText;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Add hover effects to cards
document.querySelectorAll('.destination-card, .service-card, .team-member').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonials Carousel Functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current testimonial and dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Event listeners for carousel controls
if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-play testimonials (optional)
let testimonialInterval;

function startTestimonialAutoPlay() {
    testimonialInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
}

function stopTestimonialAutoPlay() {
    clearInterval(testimonialInterval);
}

// Start auto-play when page loads
if (testimonials.length > 0) {
    startTestimonialAutoPlay();
    
    // Pause auto-play on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopTestimonialAutoPlay);
        carousel.addEventListener('mouseleave', startTestimonialAutoPlay);
    }
}

// Gallery Filtering and Lightbox Functionality
const galleryFilterButtons = document.querySelectorAll('.gallery .filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxLocation = document.querySelector('.lightbox-location');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let filteredImages = [];

// Gallery Filter Functionality
galleryFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox Functionality
function openLightbox(index) {
    currentImageIndex = index;
    filteredImages = Array.from(galleryItems).filter(item => 
        item.style.display !== 'none'
    );
    
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-info h3').textContent;
    const location = currentItem.querySelector('.gallery-info p').textContent;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxLocation.textContent = location;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-info h3').textContent;
    const location = currentItem.querySelector('.gallery-info p').textContent;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxLocation.textContent = location;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector('img');
    const title = currentItem.querySelector('.gallery-info h3').textContent;
    const location = currentItem.querySelector('.gallery-info p').textContent;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxLocation.textContent = location;
}

// Event Listeners for Gallery
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Lightbox Event Listeners
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
        }
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mara Tours website loaded successfully!');
    
    // Add any additional initialization code here
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});


// global testimonials js

const globalSlides = document.querySelectorAll("#globalTestimonialSlider .testimonial-item");
let globalIndex = 0;

document.getElementById("nextGlobal").addEventListener("click", () => {
  globalSlides[globalIndex].classList.remove("active");
  globalIndex = (globalIndex + 1) % globalSlides.length;
  globalSlides[globalIndex].classList.add("active");
});

document.getElementById("prevGlobal").addEventListener("click", () => {
  globalSlides[globalIndex].classList.remove("active");
  globalIndex = (globalIndex - 1 + globalSlides.length) % globalSlides.length;
  globalSlides[globalIndex].classList.add("active");
});

// Optional auto-slide
setInterval(() => {
  document.getElementById("nextGlobal").click();
}, 6000);
