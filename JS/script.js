        // ============================================
        // SIMPLE LANGUAGE TOGGLE
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize language
            initLanguage();
            
            // Initialize countdown
            initCountdown();
            
            // Initialize scroll to top
            initScrollTop();
            
            // Initialize scroll animations
            initScrollAnimations();
        });

        function initLanguage() {
            const langButtons = document.querySelectorAll('.lang-btn');
            const allLangContents = document.querySelectorAll('.lang-content');
            
            // Load saved language or default to English
            let currentLang = localStorage.getItem('weddingLang') || 'en';
            
            function switchLanguage(lang) {
                // Update buttons
                langButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.lang === lang);
                });
                
                // Update content
                allLangContents.forEach(content => {
                    content.classList.toggle('active', content.dataset.lang === lang);
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
            
            // Initialize
            switchLanguage(currentLang);
        }

        // ============================================
        // SIMPLE COUNTDOWN
        // ============================================
        function initCountdown() {
            const weddingDate = new Date("Feb 10, 2026 00:00:00").getTime();
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            function updateCountdown() {
                const now = new Date().getTime();
                const diff = weddingDate - now;
                
                if (diff < 0) {
                    document.getElementById("countdown").innerHTML = 
                        '<div style="color: var(--color-primary); font-size: 1.5rem; text-align: center; padding: 20px;">🎉 We Are Married! 🎉</div>';
                    return;
                }
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
            }
            
            // Initial update
            updateCountdown();
            
            // Update every second
            setInterval(updateCountdown, 1000);
        }

        // ============================================
        // SCROLL TO TOP
        // ============================================
        function initScrollTop() {
            const scrollTopBtn = document.getElementById('scrollTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
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
        // SIMPLE SCROLL ANIMATIONS
        // ============================================
        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            // Observe elements with fade-in-up class
            document.querySelectorAll('.fade-in-up').forEach(el => {
                observer.observe(el);
            });
        }

        // ============================================
        // PERFORMANCE: LAZY LOAD IMAGES
        // ============================================
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }