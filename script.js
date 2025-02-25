document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Dropdown Functionality
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            // Click handler
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                        other.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                trigger.setAttribute('aria-expanded', !isExpanded);
            });

            // Keyboard navigation
            menu.addEventListener('keydown', (e) => {
                const items = menu.querySelectorAll('[role="menuitem"]');
                const currentIndex = Array.from(items).indexOf(document.activeElement);

                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        items[currentIndex > 0 ? currentIndex - 1 : items.length - 1].focus();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        items[currentIndex < items.length - 1 ? currentIndex + 1 : 0].focus();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        dropdown.classList.remove('active');
                        trigger.setAttribute('aria-expanded', 'false');
                        trigger.focus();
                        break;
                }
            });
        }
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Close dropdowns
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    dropdown.querySelector('.dropdown-trigger').setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Adjust this value to change when the effect triggers

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with: ${email}`);
            e.target.reset();
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll for review cards
    const reviewCards = document.querySelectorAll('.review-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
