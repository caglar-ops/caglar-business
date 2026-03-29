// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            role: document.getElementById('role').value,
            teamSize: document.getElementById('team-size').value,
            trainingInterest: document.getElementById('training-interest').checked,
            timestamp: new Date().toISOString()
        };

        // Log to console (in production, this would send to a backend/email service)
        console.log('Signup submission:', formData);

        // Simulate backend submission
        submitForm(formData);
    });

    function submitForm(data) {
        // Show loading state
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Simulate API call with timeout
        setTimeout(() => {
            // Hide form
            signupForm.style.display = 'none';
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset button state (if user would want to submit again)
            submitButton.disabled = false;
            submitButton.textContent = originalText;

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });

            // Log that in production, you'd send this data to:
            // - Email service (SendGrid, Mailgun, etc.)
            // - CRM (HubSpot, Salesforce, etc.)
            // - Database
            console.log('Form submitted successfully. In production, send this data to your backend:', data);
        }, 800);
    }
});

// Smooth scroll for navigation links
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

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
});

// Track form interactions (for analytics in production)
const formInputs = document.querySelectorAll('.signup-form input, .signup-form select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        console.log('User focused on:', this.name);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.playbook-card, .service-card, .problem-card').forEach(card => {
    card.style.opacity = '0.8';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
