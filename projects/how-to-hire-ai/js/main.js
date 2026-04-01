function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function handlePreviewDownload(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showNotification('Check your email for the free preview!', 'success');
    event.target.reset();
}

function handleSignup(event) {
    event.preventDefault();
    const formData = {
        name: event.target.querySelector('#name').value,
        email: event.target.querySelector('#email').value,
        company: event.target.querySelector('#company').value,
        role: event.target.querySelector('#role').value,
        teamSize: event.target.querySelector('#team-size').value,
        plan: event.target.querySelector('#plan').value,
        timestamp: new Date().toISOString()
    };
    showNotification(`Welcome ${formData.name}! Check your email to get started.`, 'success');
    event.target.reset();
}

function handleEnterpiseContact() {
    const email = 'support@howtohireai.com';
    const subject = 'Enterprise Plan Inquiry';
    const body = 'Hi,\n\nI\'m interested in the Enterprise plan for How to Hire an AI.';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
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
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Landing page initialized');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

window.scrollToSection = scrollToSection;
window.handlePreviewDownload = handlePreviewDownload;
window.handleSignup = handleSignup;
window.handleEnterpiseContact = handleEnterpiseContact;
