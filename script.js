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
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe service cards and portfolio items
        document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Mobile menu toggle and EmailJS form submission
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', function() {
                    const isOpen = navLinks.classList.toggle('open');
                    menuToggle.setAttribute('aria-expanded', isOpen);
                });
                // Close menu when a link is clicked
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('open');
                        menuToggle.setAttribute('aria-expanded', false);
                    });
                });
            }
            // EmailJS form submission
            const form = document.querySelector('.contact-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    emailjs.sendForm('service_x12hf82', 'template_dlwqvxf', this)
                        .then(function() {
                            alert('Thank you for your interest! We\'ll get back to you within 24 hours.');
                            form.reset();
                        }, function(error) {
                            alert('There was an error sending your message. Please try again later.');
                        });
                });
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });