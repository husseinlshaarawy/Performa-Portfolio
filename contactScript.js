 // Form submission handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.firstName || !data.lastName || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = '✅ Message Sent!';
                submitButton.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Show success message
                alert('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
                    submitButton.disabled = false;
                }, 3000);
                
            }, 2000);
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
                    }, index * 150);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.contact-form-section, .contact-methods, .business-info, .contact-method, .hour-item').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.contact-hero');
            const heroContent = document.querySelector('.contact-hero-content');
            
            if (hero && heroContent) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.transform = `translateY(${scrolled * -0.1}px)`;
            }
        });

        // Enhanced form interactions
        const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
        
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
            
            // Add validation feedback
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = 'rgba(40, 167, 69, 0.5)';
                } else if (this.value.length > 0) {
                    this.style.borderColor = 'rgba(220, 53, 69, 0.5)';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
        });

        // WhatsApp floating button interaction
        const whatsappFloat = document.querySelector('.whatsapp-float');
        let isVisible = false;

        // Show WhatsApp button after scrolling
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > 300 && !isVisible) {
                whatsappFloat.style.transform = 'scale(1)';
                whatsappFloat.style.opacity = '1';
                isVisible = true;
            } else if (scrollPosition <= 300 && isVisible) {
                whatsappFloat.style.transform = 'scale(0)';
                whatsappFloat.style.opacity = '0';
                isVisible = false;
            }
        });

        // Initial state for WhatsApp button
        whatsappFloat.style.transform = 'scale(0)';
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transition = 'all 0.3s ease';

        // Contact method click tracking (for analytics)
        document.querySelectorAll('.contact-method').forEach(method => {
            method.addEventListener('click', function() {
                const methodType = this.querySelector('h3').textContent;
                console.log(`Contact method clicked: ${methodType}`);
                
                // Add visual feedback
                this.style.transform = 'translateX(10px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateX(5px)';
                }, 150);
            });
        });

        // Dynamic business hours status
        function updateBusinessStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const hour = now.getHours();
            
            let isOpen = false;
            
            // Monday - Thursday: 9 AM - 6 PM
            if (day >= 1 && day <= 4 && hour >= 9 && hour < 18) {
                isOpen = true;
            }
            // Friday: 9 AM - 5 PM
            else if (day === 5 && hour >= 9 && hour < 17) {
                isOpen = true;
            }
            
            const statusElement = document.createElement('div');
            statusElement.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-size: 0.8rem;
                font-weight: 600;
                z-index: 999;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            `;
            
            if (isOpen) {
                statusElement.textContent = '🟢 We\'re Open!';
                statusElement.style.background = 'rgba(40, 167, 69, 0.2)';
                statusElement.style.border = '1px solid rgba(40, 167, 69, 0.3)';
                statusElement.style.color = '#28a745';
            } else {
                statusElement.textContent = '🔴 Currently Closed';
                statusElement.style.background = 'rgba(220, 53, 69, 0.2)';
                statusElement.style.border = '1px solid rgba(220, 53, 69, 0.3)';
                statusElement.style.color = '#dc3545';
            }
            
            document.body.appendChild(statusElement);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusElement.style.opacity = '0';
                statusElement.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    statusElement.remove();
                }, 300);
            }, 5000);
        }

        // Show business status on page load
        window.addEventListener('load', () => {
            setTimeout(updateBusinessStatus, 1500);
        });

        // Add typing indicator for contact methods
        document.querySelectorAll('.contact-method').forEach(method => {
            method.addEventListener('mouseenter', function() {
                const info = this.querySelector('.contact-method-info p');
                const originalText = info.textContent;
                
                if (this.querySelector('h3').textContent === 'WhatsApp') {
                    info.textContent = 'Click to start chatting instantly! 💬';
                } else if (this.querySelector('h3').textContent === 'Email Us') {
                    info.textContent = 'Click to compose your email 📝';
                } else if (this.querySelector('h3').textContent === 'Instagram') {
                    info.textContent = 'Follow for daily marketing insights! 📈';
                }
                
                // Reset text on mouse leave
                this.addEventListener('mouseleave', function() {
                    info.textContent = originalText;
                }, { once: true });
            });
        });