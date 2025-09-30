// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll with modern glassmorphism
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
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

// Typing animation for hero title
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

// Initialize typing animation when page loads - DISABLED to preserve HTML formatting
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.innerHTML;
//     typeWriter(heroTitle, originalText, 50);
// });

// Animate statistics numbers
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateNumber(target, 0, finalNumber, 2000);
                observer.unobserve(target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    // Determine if we should add "+" based on the number
    const shouldAddPlus = end < 100; // Only add + for smaller numbers like 5, 10
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        if (shouldAddPlus) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize number animation
document.addEventListener('DOMContentLoaded', animateStats);

// Animate skill items on scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                entry.target.classList.add('animate-in');
            }
        });
    });

    skillItems.forEach(item => observer.observe(item));
}

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInScale 0.6s ease-out forwards;
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize skill animation
document.addEventListener('DOMContentLoaded', animateSkills);

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    this.reset();
    
    // Here you would typically send the data to your server
    // Example: sendEmailToServer(name, email, subject, message);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading class after animation
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
});

// Add initial loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .loading {
        overflow: hidden;
    }
`;
document.head.appendChild(loadingStyle);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-category, .timeline-item, .about-content, .contact-content'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Add fade-in animation styles
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    .project-card,
    .skill-category,
    .timeline-item,
    .about-content,
    .contact-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(fadeStyle);

// Theme toggle functionality (optional - can be added later)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #6366f1;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const toggle = document.querySelector('.theme-toggle');
    const isDark = document.body.classList.contains('dark-theme');
    toggle.innerHTML = isDark ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    // Uncomment to enable theme toggle
    // createThemeToggle();
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #6366f1;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Premium cursor system with advanced effects
function createPremiumCursor() {
    // Main cursor blob
    const cursor = document.createElement('div');
    cursor.className = 'premium-cursor';
    
    // Cursor trail
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    
    // Inner dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    // Outer ring
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    let ringX = 0, ringY = 0;

    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot follow
        cursorDot.style.left = (mouseX - 2) + 'px';
        cursorDot.style.top = (mouseY - 2) + 'px';
        cursorDot.style.opacity = '1';
        
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

    // Smooth animation loop
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = (cursorX - 15) + 'px';
        cursor.style.top = (cursorY - 15) + 'px';
        
        // Slower trail
        trailX += (mouseX - trailX) * 0.05;
        trailY += (mouseY - trailY) * 0.05;
        cursorTrail.style.left = (trailX - 20) + 'px';
        cursorTrail.style.top = (trailY - 20) + 'px';
        
        // Ring animation
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = (ringX - 25) + 'px';
        cursorRing.style.top = (ringY - 25) + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive elements hover effects
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .project-card, .skill-item, .nav-link, .contact-item, input, textarea'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorRing.classList.add('cursor-hover');
            cursorTrail.classList.add('cursor-hover');
            
            // Add magnetic effect
            el.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.320, 1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorRing.classList.remove('cursor-hover');
            cursorTrail.classList.remove('cursor-hover');
            
            el.style.transform = '';
        });
        
        // Magnetic effect
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
    });

    // Click effect
    document.addEventListener('click', () => {
        cursor.classList.add('cursor-click');
        cursorRing.classList.add('cursor-click');
        
        setTimeout(() => {
            cursor.classList.remove('cursor-click');
            cursorRing.classList.remove('cursor-click');
        }, 300);
    });
}

// Add magnetic effect to buttons (ReactBits style)
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .project-card');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

// Add sophisticated navigation interactions
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');
    
    // Add ripple effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add floating animation to navigation
    const navbar = document.querySelector('.navbar');
    let floatDirection = 1;
    
    setInterval(() => {
        navbar.style.transform = `translateX(-50%) translateY(${Math.sin(Date.now() * 0.001) * 2}px)`;
    }, 16);
}

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize premium effects
document.addEventListener('DOMContentLoaded', () => {
    createPremiumCursor();
    addMagneticEffect();
    enhanceNavigation();
    initPremiumAnimations();
});

// Premium animations system
function initPremiumAnimations() {
    // Enhanced parallax scrolling with smooth continuity  
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Floating elements parallax
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = scrolled * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Hero content parallax
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroTitle) {
            heroTitle.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
            heroTitle.style.opacity = Math.max(0, 1 - scrolled / windowHeight);
        }
        if (heroSubtitle) {
            heroSubtitle.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
            heroSubtitle.style.opacity = Math.max(0, 1 - scrolled / windowHeight);
        }
        if (heroDescription) {
            heroDescription.style.transform = `translate3d(0, ${scrolled * 0.1}px, 0)`;
            heroDescription.style.opacity = Math.max(0, 1 - scrolled / windowHeight);
        }
        
        // Section reveal animations based on scroll position
        const sections = document.querySelectorAll('section:not(.hero)');
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < windowHeight * 0.8 && rect.bottom >= 0;
            
            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
        
        // Continuous background glow based on scroll
        const body = document.body;
        const scrollPercent = scrolled / (document.documentElement.scrollHeight - windowHeight);
        const hue = 240 + (scrollPercent * 60); // Shift from blue to purple
        
        body.style.setProperty('--scroll-hue', hue);
    });
    
    // Text reveal animation with stagger
    const textElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.320, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300 + 800);
    });
    
    // Initialize sections with hidden state
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
    });
    
    // Enhanced floating elements interaction
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.3)';
            element.style.filter = 'brightness(1.5) saturate(1.2)';
            element.style.zIndex = '10';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1) saturate(1)';
            element.style.zIndex = '1';
        });
    });
    
    // Add flowing connection lines between sections
    createFlowingConnections();
}

// Create flowing connection animations
function createFlowingConnections() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach((section, index) => {
        if (index < sections.length - 1) {
            const connection = document.createElement('div');
            connection.className = 'section-connection';
            connection.style.cssText = `
                position: absolute;
                bottom: -50px;
                left: 50%;
                width: 2px;
                height: 100px;
                background: linear-gradient(180deg, 
                    rgba(102, 126, 234, 0.5) 0%, 
                    rgba(118, 75, 162, 0.3) 50%,
                    transparent 100%
                );
                transform: translateX(-50%);
                z-index: 0;
                animation: connectionFlow 3s ease-in-out infinite;
            `;
            
            const connectionStyle = document.createElement('style');
            connectionStyle.textContent = `
                @keyframes connectionFlow {
                    0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleY(1); }
                    50% { opacity: 0.8; transform: translateX(-50%) scaleY(1.2); }
                }
            `;
            document.head.appendChild(connectionStyle);
            
            section.appendChild(connection);
        }
    });
}

window.addEventListener('scroll', debouncedScrollHandler);