// Smooth scroll behavior and fade-in animations
document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const animateElements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .testimonials-carousel, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Initialize testimonials carousel
    initTestimonialsCarousel();

    // Auto-rotate testimonials every 5 seconds
    setInterval(function () {
        changeTestimonial(1);
    }, 5000);

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

    // Add scroll effect to hero section
    window.addEventListener('scroll', function () {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Testimonials carousel functionality
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function initTestimonialsCarousel() {
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (dots[i]) {
            dots[i].classList.remove('active');
        }
    });

    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    currentTestimonialIndex = index;
}

function changeTestimonial(direction) {
    let newIndex = currentTestimonialIndex + direction;

    if (newIndex >= testimonials.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = testimonials.length - 1;
    }

    showTestimonial(newIndex);
}

function currentTestimonial(index) {
    showTestimonial(index - 1); // Convert to 0-based index
}

// Add loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Skills hover effect
document.addEventListener('DOMContentLoaded', function () {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards interactive effects
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add glow effect
            this.style.boxShadow = '0 15px 40px rgba(0, 128, 128, 0.3)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 10px 30px rgba(0, 128, 128, 0.2)';
        });
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect for hero subtitle
document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1500);
    }
});

// Contact form enhancement (if needed in future)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Navbar scroll effect (if adding navigation)
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.download-btn, .contact-link, .carousel-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(function () {
    // Add any scroll-based animations here
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');

    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);
