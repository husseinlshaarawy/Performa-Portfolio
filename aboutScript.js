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

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple items
                    setTimeout(() => {
                        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                        entry.target.style.opacity = '1';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.about-section, .value-item, .mission-box, .vision-box').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.about-hero');
            const heroContent = document.querySelector('.about-hero-content');
            
            if (hero && heroContent) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
            }
        });

        // Add typing effect to hero subtitle
        function typeWriter(element, text, speed = 50) {
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

        // Initialize typing effect on load
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.about-hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 100);
                }, 500);
            }
        });

        // Add hover sound effect simulation (visual feedback)
        document.querySelectorAll('.value-item, .mission-box, .vision-box').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        // Sidebar menu toggle for mobile
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('open');
                menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
            });
            // Optional: close sidebar when a link is clicked (on mobile)
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    if(window.innerWidth <= 768) {
                        navLinks.classList.remove('open');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });