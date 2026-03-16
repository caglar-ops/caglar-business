/**
 * AI Agent Platform - Landing Page Script
 * Handles form validation, submission, and dynamic interactions
 */

// Configuration
const API_ENDPOINT = '/api/waitlist';
const STORAGE_FILE = 'data/waitlist.json';

// Form validation rules
const VALIDATION_RULES = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    useCase: {
        required: true,
        minLength: 10,
        message: 'Please describe your use case (at least 10 characters)'
    }
};

/**
 * Initialize the page on DOM load
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    initializeSmoothScroll();
    initializeIntersectionObserver();
});

/**
 * Initialize form handling
 */
function initializeForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Clear error messages on input
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearFieldError(input.name);
        });
    });
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    // Reset messages
    hideAllMessages();

    // Get form data
    const formData = new FormData(e.target);
    const data = {
        email: formData.get('email').trim(),
        company: formData.get('company').trim(),
        useCase: formData.get('useCase').trim(),
        timestamp: new Date().toISOString(),
        source: 'landing-page'
    };

    // Validate
    if (!validateFormData(data)) {
        return;
    }

    // Submit
    await submitForm(e.target, data);
}

/**
 * Validate form data
 */
function validateFormData(data) {
    let isValid = true;

    // Email validation
    if (!data.email || !VALIDATION_RULES.email.pattern.test(data.email)) {
        showFieldError('email', VALIDATION_RULES.email.message);
        isValid = false;
    }

    // Use case validation
    if (!data.useCase || data.useCase.length < VALIDATION_RULES.useCase.minLength) {
        showFieldError('useCase', VALIDATION_RULES.useCase.message);
        isValid = false;
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Clear field error
 */
function clearFieldError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const inputElement = document.querySelector(`[name="${fieldName}"]`);

    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

/**
 * Submit form data
 */
async function submitForm(form, data) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.opacity = '0.5';
    btnLoader.style.display = 'inline-block';

    try {
        // For this demo, we'll simulate API call and save locally
        // In production, this would hit your backend API
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // Save to local JSON (in production, backend handles this)
        const response = await saveToLocalStorage(data);

        if (response.success) {
            // Success!
            showSuccessMessage();
            form.reset();
            
            // Log success
            console.log('✓ Submission successful:', data);
        } else {
            throw new Error(response.error || 'Submission failed');
        }
    } catch (error) {
        console.error('✗ Submission error:', error);
        showErrorMessage();
    } finally {
        // Restore button state
        submitBtn.disabled = false;
        btnText.style.opacity = '1';
        btnLoader.style.display = 'none';
    }
}

/**
 * Save data to local storage (simulating backend persistence)
 */
async function saveToLocalStorage(data) {
    try {
        // In a real app, this would POST to your backend
        // For demo purposes, we store in browser localStorage
        
        const key = 'ai-agent-platform-waitlist';
        let waitlist = [];
        
        // Get existing data
        const stored = localStorage.getItem(key);
        if (stored) {
            try {
                waitlist = JSON.parse(stored);
            } catch (e) {
                waitlist = [];
            }
        }
        
        // Add new entry
        waitlist.push(data);
        
        // Save back
        localStorage.setItem(key, JSON.stringify(waitlist));
        
        // Log for debugging
        console.log(`Saved to localStorage. Total entries: ${waitlist.length}`);
        
        return { success: true };
    } catch (error) {
        console.error('Storage error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-form-message');

    if (errorMsg) errorMsg.classList.remove('show');
    if (successMsg) {
        successMsg.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
}

/**
 * Show error message
 */
function showErrorMessage() {
    const errorMsg = document.getElementById('error-form-message');
    const successMsg = document.getElementById('success-message');

    if (successMsg) successMsg.classList.remove('show');
    if (errorMsg) {
        errorMsg.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 5000);
    }
}

/**
 * Hide all messages
 */
function hideAllMessages() {
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-form-message');

    if (successMsg) successMsg.classList.remove('show');
    if (errorMsg) errorMsg.classList.remove('show');
}

/**
 * Smooth scroll enhancement (native CSS handles it, but this adds polish)
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                // Let native scroll-behavior handle it
            }
        });
    });
}

/**
 * Intersection Observer for scroll animations
 */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and pricing cards
    document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Export data for testing/debugging
 */
window.getWaitlistData = function() {
    const stored = localStorage.getItem('ai-agent-platform-waitlist');
    return stored ? JSON.parse(stored) : [];
};

window.clearWaitlistData = function() {
    localStorage.removeItem('ai-agent-platform-waitlist');
    console.log('Waitlist data cleared');
};

// Log initialization
console.log('🚀 AI Agent Platform landing page initialized');
