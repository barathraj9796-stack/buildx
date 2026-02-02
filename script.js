// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Modal Functions
const enrollModal = document.getElementById('enrollModal');
const enrollmentForm = document.getElementById('enrollmentForm');

function openEnrollModal() {
    enrollModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEnrollModal() {
    enrollModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
enrollModal.addEventListener('click', (e) => {
    if (e.target === enrollModal) {
        closeEnrollModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEnrollModal();
    }
});

// Form Validation and Submission
enrollmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const department = document.getElementById('department').value;
    const yearOfStudy = document.getElementById('yearOfStudy').value;
    const program = document.getElementById('program').value;

    // Basic validation
    if (!fullName || !email || !phone || !education || !department || !yearOfStudy || !program) {
        alert('Please fill all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email');
        return;
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number');
        return;
    }

    // Success message
    alert(`Thank you for enrolling, ${fullName}! We'll contact you soon.`);
    
    // Reset form
    enrollmentForm.reset();
    closeEnrollModal();

    // Log enrollment data (in real app, send to server)
    console.log('Enrollment Data:', {
        fullName,
        email,
        phone,
        education,
        department,
        yearOfStudy,
        program,
        enrollmentDate: new Date().toISOString()
    });
});

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and major elements
document.querySelectorAll('.service-card, .course-card, .cert-card, .pricing-card, .internship-card, .approach-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.service-card, .course-card, .cert-card, .pricing-card, .internship-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// Count animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-card h3').forEach(h3 => {
                const finalValue = parseInt(h3.textContent);
                animateCounter(h3, finalValue);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Keyboard shortcut: Press 'K' to focus search (placeholder for future enhancement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        console.log('Search functionality can be added here');
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = diameter + 'px';
    circle.style.left = (event.clientX - button.offsetLeft - radius) + 'px';
    circle.style.top = (event.clientY - button.offsetTop - radius) + 'px';
    circle.classList.add('ripple');

    const ripple = button.querySelector('.ripple');
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Cookie notice or user preference (optional)
function initUserPreferences() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
}

initUserPreferences();

// Performance: Lazy load images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Page Transitions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to section on page (used in home page)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Counter animation for statistics
function animateCounterValue(element) {
    if (!element) return;
    const target = parseInt(element.dataset.target) || 0;
    if (target === 0) return;
    
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
            clearInterval(interval);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 30);
}

// Stagger animation for child elements
function staggerElements(container) {
    if (!container) return;
    const children = container.querySelectorAll(':scope > *');
    children.forEach((child, index) => {
        setTimeout(() => {
            child.style.opacity = '1';
            child.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 100);
    });
}

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    
    // Stagger main content
    const mainContent = document.querySelector('main') || document.querySelector('body > section:first-of-type');
    if (mainContent) {
        staggerElements(mainContent);
    }
    
    // Animate stat numbers when visible
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounterValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(num => observer.observe(num));
    }
});

// Smooth page transitions
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*=".html"]');
    if (link && !link.target) {
        // Optional: Add page transition animation here
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http')) {
            // e.preventDefault();
            // Could add fade out animation before navigation
        }
    }
});

// Mobile menu active state
function updateMobileMenuState() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateMobileMenuState);
} else {
    updateMobileMenuState();
}

// Console message for developers
console.log('%c🚀 Welcome to BuildX Tech Solutions!', 'font-size: 20px; color: #06b6d4; font-weight: bold;');
console.log('%cBuilding the future of tech education.', 'font-size: 14px; color: #cbd5e1;');
console.log('%cExplore our courses: https://buildx-tech.com', 'font-size: 12px; color: #a855f7;');
