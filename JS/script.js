// ============================================
// PAGE LOADER FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initLanguage();
    initCountdown();
    initScrollTop();
    initScrollAnimations();
    initAdvancedAnimations();
    initSmoothScrolling();
    initScrollIndicator();
    initImageLoadEffects();
    initParallaxEffect();
    initHoverEffects();
});

// Loader remains the same as before...
function initLoader() {
    const loader = document.getElementById('page-loader');
    const mainContent = document.getElementById('main-content');
    const progressBar = document.querySelector('.progress-bar');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        progressBar.style.width = `${progress}%`;
    }, 200);

    window.addEventListener('load', function() {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        
        setTimeout(() => {
            loader.classList.add('fade-out');
            mainContent.classList.add('loaded');
            
            // Start staggered animations after loader
            setTimeout(() => {
                initStaggeredAnimations();
                addRSVPpulse();
            }, 500);
            
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 300);
    });
}

// ============================================
// ADVANCED ANIMATIONS INITIALIZATION
// ============================================
function initAdvancedAnimations() {
    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll(
        'button, a, .gallery-item, .family-photo-container, .venue-image'
    );
    
    interactiveElements.forEach(el => {
        el.style.cursor = 'pointer';
        
        // Add touch feedback for mobile
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// SMOOTH SCROLLING WITH EASING
// ============================================
function initSmoothScrolling() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add active class to scroll indicator
                updateScrollIndicator(targetId);
            }
        });
    });
}

// ============================================
// SCROLL INDICATOR
// ============================================
function initScrollIndicator() {
    // Create scroll indicator dots
    const sections = ['home', 'family-section', 'countdown-section', 'venue', 'story', 'gallery', 'rsvp'];
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    
    sections.forEach(section => {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        dot.dataset.section = section;
        dot.addEventListener('click', () => {
            document.getElementById(section).scrollIntoView({
                behavior: 'smooth'
            });
        });
        indicator.appendChild(dot);
    });
    
    document.body.appendChild(indicator);
    
    // Update active dot on scroll
    window.addEventListener('scroll', updateScrollIndicator);
}

function updateScrollIndicator(sectionId = null) {
    const dots = document.querySelectorAll('.scroll-dot');
    const sections = ['home', 'family-section', 'countdown-section', 'venue', 'story', 'gallery', 'rsvp'];
    
    let currentSection = sectionId ? sectionId.replace('#', '') : null;
    
    if (!currentSection) {
        // Determine current section based on scroll position
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const sectionTop = element.offsetTop;
                const sectionBottom = sectionTop + element.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    currentSection = section;
                }
            }
        });
    }
    
    dots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === currentSection) {
            dot.classList.add('active');
        }
    });
}

// ============================================
// IMAGE LOAD EFFECTS
// ============================================
function initImageLoadEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
                
                // Trigger parent animation
                const parent = this.closest('.gallery-item, .family-photo-container, .venue-image');
                if (parent) {
                    parent.classList.add('visible');
                }
            });
        }
    });
}

// ============================================
// STAGGERED ANIMATIONS
// ============================================
function initStaggeredAnimations() {
    // Animate elements with delay
    const elements = document.querySelectorAll('.fade-in-up, .gallery-item, .family-description, .story-text');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.add('visible');
        }, index * 100);
    });
    
    // Animate countdown numbers
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    countdownNumbers.forEach((num, index) => {
        setTimeout(() => {
            num.style.opacity = '1';
            num.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero, .family, .venue');
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * (0.3 + (index * 0.05));
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ============================================
// ENHANCED LANGUAGE TOGGLE
// ============================================
function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const allLangContents = document.querySelectorAll('.lang-content');
    
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
        
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        localStorage.setItem('weddingLang', lang);
        currentLang = lang;
    }
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    switchLanguage(currentLang);
}

// ============================================
// ENHANCED COUNTDOWN WITH ANIMATIONS
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
            document.getElementById("countdown").innerHTML = 
                `<div class="countdown-complete" style="color: var(--color-primary); font-size: 1.8rem; text-align: center; padding: 30px; animation: celebrate 1s ease;">
                    🎉 We Are Married! 🎉
                </div>`;
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Update with animation if value changed
        updateWithAnimation(daysEl, days.toString().padStart(2, '0'), oldValues.days);
        updateWithAnimation(hoursEl, hours.toString().padStart(2, '0'), oldValues.hours);
        updateWithAnimation(minutesEl, minutes.toString().padStart(2, '0'), oldValues.minutes);
        updateWithAnimation(secondsEl, seconds.toString().padStart(2, '0'), oldValues.seconds);
        
        // Store new values
        oldValues = { days, hours, minutes, seconds };
    }
    
    function updateWithAnimation(element, newValue, oldValue) {
        if (element.textContent !== newValue) {
            element.classList.add('updated');
            element.textContent = newValue;
            
            setTimeout(() => {
                element.classList.remove('updated');
            }, 600);
        }
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// ============================================
// HOVER EFFECTS
// ============================================
function initHoverEffects() {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.gallery-item, .family-photo-container, .venue-image');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px) 
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
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
                entry.target.classList.add('visible');
                
                // Add specific animations for different sections
                if (entry.target.classList.contains('story-quote')) {
                    entry.target.style.animationDelay = '0.3s';
                }
                
                if (entry.target.classList.contains('rsvp-btn')) {
                    addRSVPpulse();
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, section, .story-quote, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.classList.remove('visible');
            scrollTopBtn.style.opacity = '0';
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
// RSVP PULSE ANIMATION
// ============================================
function addRSVPpulse() {
    const rsvpBtn = document.querySelector('.rsvp-btn');
    if (rsvpBtn && !rsvpBtn.classList.contains('pulse')) {
        rsvpBtn.classList.add('pulse');
        
        // Remove pulse after 3 cycles
        setTimeout(() => {
            rsvpBtn.classList.remove('pulse');
        }, 6000);
    }
}

// ============================================
// ADD CELEBRATION ANIMATION
// ============================================
function addCSSAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrate {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes confetti {
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .countdown-complete {
            animation: celebrate 1s ease !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize celebration animation
addCSSAnimation();