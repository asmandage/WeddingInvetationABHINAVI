// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initLanguage();
    initCountdown();
    initScrollAnimations();
    initScrollProgress();
    initScrollTop();
    initGallery();
    initRSVP();
    initTimeline();
    initHoverEffects();
    
    // Start animations after page load
    setTimeout(initStaggeredAnimations, 500);
});

// ============================================
// PAGE LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('page-loader');
    const mainContent = document.getElementById('main-content');
    
    // Hide loader and show content when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            mainContent.classList.add('loaded');
            
            // Remove loader from DOM after animation
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger confetti celebration
                createConfetti();
            }, 1000);
        }, 1500);
    });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to section
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinksContainer.style.display = 'none';
                }
            }
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isVisible = navLinksContainer.style.display === 'flex';
            navLinksContainer.style.display = isVisible ? 'none' : 'flex';
            
            if (!isVisible) {
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = 'rgba(255, 255, 255, 0.98)';
                navLinksContainer.style.backdropFilter = 'blur(10px)';
                navLinksContainer.style.padding = '1rem';
                navLinksContainer.style.boxShadow = 'var(--shadow-md)';
                navLinksContainer.style.zIndex = '1000';
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// LANGUAGE SWITCHER
// ============================================
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const allLangContents = document.querySelectorAll('.lang-content');
    
    // Load saved language or default to English
    let currentLang = localStorage.getItem('weddingLang') || 'en';
    
    function switchLanguage(lang) {
        // Animate out current language
        allLangContents.forEach(content => {
            if (content.classList.contains('active')) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    content.classList.remove('active');
                    
                    // Animate in new language
                    allLangContents.forEach(newContent => {
                        if (newContent.dataset.lang === lang) {
                            newContent.classList.add('active');
                            setTimeout(() => {
                                newContent.style.opacity = '1';
                                newContent.style.transform = 'translateY(0)';
                            }, 10);
                        }
                    });
                }, 200);
            }
        });
        
        // Update buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Save preference
        localStorage.setItem('weddingLang', lang);
        currentLang = lang;
    }
    
    // Add click handlers
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // Initialize with saved language
    switchLanguage(currentLang);
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function initCountdown() {
    const weddingDate = new Date("Feb 10, 2026 00:00:00").getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // Store old values for flip animation
    let oldValues = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    };
    
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = weddingDate - now;
        
        if (diff < 0) {
            // Wedding day has arrived!
            document.querySelector('.countdown-timer').innerHTML = 
                `<div class="wedding-day-message" style="text-align: center; padding: var(--spacing-xl);">
                    <h3 style="color: var(--color-accent); font-size: 2.5rem; margin-bottom: var(--spacing-md);">
                        🎉 Today's the Day! 🎉
                    </h3>
                    <p style="color: var(--color-light); font-size: 1.125rem;">
                        We're getting married right now!
                    </p>
                </div>`;
            
            // Create celebratory confetti
            createConfetti();
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update with flip animation
        updateWithFlip(daysEl, days.toString().padStart(2, '0'), oldValues.days);
        updateWithFlip(hoursEl, hours.toString().padStart(2, '0'), oldValues.hours);
        updateWithFlip(minutesEl, minutes.toString().padStart(2, '0'), oldValues.minutes);
        updateWithFlip(secondsEl, seconds.toString().padStart(2, '0'), oldValues.seconds);
        
        // Store old values
        oldValues = {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
        };
    }
    
    function updateWithFlip(element, newValue, oldValue) {
        if (element.textContent !== newValue) {
            element.classList.add('flip-animation');
            element.textContent = newValue;
            
            setTimeout(() => {
                element.classList.remove('flip-animation');
            }, 600);
        }
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animations
                entry.target.classList.add('visible');
                
                // Add specific animations based on element type
                if (entry.target.classList.contains('animate-text')) {
                    entry.target.style.animationDelay = '0.3s';
                }
                
                if (entry.target.classList.contains('animate-card')) {
                    const delay = entry.target.dataset.delay || '0';
                    entry.target.style.animationDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-text, .animate-card, section').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// GALLERY
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add hover effect to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// RSVP
// ============================================
function initRSVP() {
    const confirmBtn = document.querySelector('.confirm-btn');
    const declineBtn = document.querySelector('.decline-btn');
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                showRSVPModal('confirm');
            }
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showRSVPModal('decline');
        });
    }
}

function showRSVPModal(type) {
    const modal = document.createElement('div');
    modal.className = 'rsvp-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${type === 'confirm' ? 'Thank You!' : 'We Understand'}</h3>
            <p>${type === 'confirm' 
                ? 'We look forward to celebrating with you!' 
                : 'Thank you for letting us know. We\'ll miss you!'}</p>
            <button class="modal-close">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ============================================
// TIMELINE
// ============================================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add staggered animation to timeline items
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// ============================================
// HOVER EFFECTS
// ============================================
function initHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.family-card, .venue-info, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = 'var(--shadow-xl)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// ============================================
// STAGGERED ANIMATIONS
// ============================================
function initStaggeredAnimations() {
    // Animate hero elements with delay
    const heroElements = document.querySelectorAll('.hero-section .animate-text');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 300 + (index * 200));
    });
    
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header .animate-text');
    sectionHeaders.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 500 + (index * 100));
    });
}

// ============================================
// CONFETTI EFFECT
// ============================================
function createConfetti() {
    const colors = ['#c46bae', '#d4af37', '#ffffff', '#9e4c8a'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 3;
        const animationDuration = Math.random() * 2 + 2;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = color;
        confetti.style.left = `${left}vw`;
        confetti.style.animationDelay = `${animationDelay}s`;
        confetti.style.animationDuration = `${animationDuration}s`;
        
        // Add to document
        document.body.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, (animationDelay + animationDuration) * 1000);
    }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
window.addEventListener('resize', function() {
    // Update navigation for mobile/desktop
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'static';
        navLinks.style.flexDirection = 'row';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
    } else {
        navLinks.style.display = 'none';
    }
});

// ============================================
// ADDITIONAL ANIMATION FUNCTIONS
// ============================================
function createParticles(element, count = 20) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 2;
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
}

// Add particles to important elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('rsvp-button') || 
        e.target.closest('.rsvp-button')) {
        createParticles(e.target.closest('.rsvp-button'), 30);
    }
});

// Initialize floating elements
function initFloatingElements() {
    const floatingEls = document.querySelectorAll('.floating-element, .floating-ring');
    floatingEls.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

// Call initialization functions
initFloatingElements();