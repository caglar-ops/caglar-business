// Smooth scroll utility
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form handlers
function handlePreviewDownload(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Show success message
    showNotification('Check your email for the free preview!', 'success');
    
    // Reset form
    event.target.reset();
    
    // In production, this would send data to your backend
    console.log('Preview download requested for:', email);
}

function handleSignup(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = {
        name: event.target.querySelector('#name').value,
        email: event.target.querySelector('#email').value,
        company: event.target.querySelector('#company').value,
        role: event.target.querySelector('#role').value,
        teamSize: event.target.querySelector('#team-size').value,
        plan: event.target.querySelector('#plan').value,
        timestamp: new Date().toISOString()
    };
    
    // Show success message
    showNotification(
        `Welcome ${formData.name}! Check your email to get started.`,
        'success'
    );
    
    // Reset form
    event.target.reset();
    
    // In production, this would send data to your backend/email service
    console.log('Signup data:', formData);
    
    // Store in localStorage for demonstration
    const signups = JSON.parse(localStorage.getItem('signups') || '[]');
    signups.push(formData);
    localStorage.setItem('signups', JSON.stringify(signups));
}

function handleEnterpiseContact() {
    const email = 'support@howtohireai.com';
    const subject = 'Enterprise Plan Inquiry - How to Hire an AI';
    const body = 'Hi,\n\nI\'m interested in learning more about the Enterprise plan for How to Hire an AI.\n\nPlease let me know about custom pricing and options.';
    
    // Open email client
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll(
        '.playbook-card, .case-study, .pricing-card, .faq-item'
    ).forEach(el => {
        observer.observe(el);
    });
}

// Add stagger animation to grid items
function initStaggerAnimations() {
    const grids = [
        '.playbook-grid',
        '.case-studies-grid',
        '.pricing-grid',
        '.faq-grid'
    ];

    grids.forEach(gridSelector => {
        const grid = document.querySelector(gridSelector);
        if (grid) {
            grid.querySelectorAll('> *').forEach(item => {
                item.classList.add('stagger-item');
            });
        }
    });
}

// Enhanced form validation
function enhanceFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Validate all required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    field.addEventListener('focus', function() {
                        this.style.borderColor = '';
                    });
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });
}

// Mobile menu toggle (if needed)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if viewport is mobile
    if (window.innerWidth <= 768) {
        // Add mobile-specific functionality if needed
    }
}

// Smooth anchor link handling
function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Track scroll position for navbar effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });
}

// Analytics tracking (placeholder)
function initAnalytics() {
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Button clicked:', this.textContent);
            // In production, send to analytics service
        });
    });

    // Track section views
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Section viewed:', entry.target.id);
                // In production, send to analytics service
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
}

// Performance optimization: Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing How to Hire an AI landing page');
    
    initScrollAnimations();
    initStaggerAnimations();
    enhanceFormValidation();
    initMobileMenu();
    initAnchorLinks();
    initScrollEffects();
    initAnalytics();
    initLazyLoading();
    
    console.log('Initialization complete');
});

// Handle window resize events
window.addEventListener('resize', function() {
    // Could reinitialize mobile-specific features here
});

// Export functions for use in HTML event handlers
window.scrollToSection = scrollToSection;
window.handlePreviewDownload = handlePreviewDownload;
window.handleSignup = handleSignup;
window.handleEnterpiseContact = handleEnterpiseContact;
