# How to Hire an AI - Landing Page & Service Offering

A modern, high-converting landing page for the "How to Hire an AI" playbook and training service. Designed to compete with Felix Craft by positioning a complete hiring framework + expert service offerings.

## 📖 Overview

This landing page serves three core purposes:

1. **Educate** - Demonstrate the playbook value through compelling copy and guide preview
2. **Convert** - Capture leads through a signup form with progressive profiling
3. **Service Sell** - Position training and hands-on setup services

## 🎯 Features

### Landing Page Sections

- **Navigation Bar** - Sticky nav with smooth scrolling to key sections
- **Hero Section** - Compelling value prop + social proof (500+ teams)
- **Problem Section** - 4 key pain points with the AI hiring crisis
- **Playbook Section** - 6-step framework with detailed checklists
- **Guide Preview** - Sneak peek of playbook content + testimonials
- **Service Offering** - 3 service packages (training, setup, retention coaching)
- **Signup Form** - Progressive profiling (name, email, role, company, team size)
- **Footer** - Links and contact info

### Design Highlights

- Modern, professional design (blue + orange accent colors)
- Fully responsive (desktop, tablet, mobile)
- Smooth scroll animations
- Interactive form validation
- Success message handling
- Accessibility best practices

### Content Features

- **Compelling Copy** - Benefits-driven, not feature-driven
- **Social Proof** - Testimonials from real use cases
- **Guide Preview** - Full markdown guide with frameworks, templates, and resources
- **Clear CTAs** - Multiple conversion points (CTA button, form, email link)
- **Domain Expertise** - Specific, actionable frameworks (not vague)

## 📁 File Structure

```
how-to-hire-ai/
├── index.html              # Main landing page
├── styles.css              # Responsive styling
├── script.js               # Form handling & interactions
├── GUIDE_PREVIEW.md        # Full guide preview (downloadable)
├── README.md               # This file
└── .git/                   # Git repository
```

## 🚀 Getting Started

### Local Development

1. Clone or navigate to the repository:
   ```bash
   cd how-to-hire-ai
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html  # macOS
   # or
   xdg-open index.html  # Linux
   # or just drag index.html into your browser
   ```

3. Forms will log to console (in production, integrate with email/CRM service)

### Production Deployment

#### Option 1: Static Hosting (Recommended)
- **Netlify:** Drag-drop `index.html`, `styles.css`, `script.js` into Netlify
- **Vercel:** Push to GitHub, connect to Vercel for auto-deploy
- **GitHub Pages:** Push to GitHub, enable Pages in settings
- **AWS S3 + CloudFront:** For high-traffic needs

#### Option 2: Traditional Web Server
```bash
# Copy files to your web server
scp index.html styles.css script.js user@server:/var/www/html/

# Ensure proper permissions
chmod 644 /var/www/html/*.{html,css,js}
```

## 📝 Customization

### Update Content

Edit `index.html` to customize:
- Company name and branding
- Playbook sections and steps
- Service offerings and pricing
- Testimonials
- Contact email

### Update Styling

Edit `styles.css`:
- Change color scheme (update `:root` CSS variables)
- Adjust spacing and typography
- Modify responsive breakpoints

### Integrate Form Backend

Update `script.js` `submitForm()` function to connect to:
- **Email service:** SendGrid, Mailgun, AWS SES
- **CRM:** HubSpot, Salesforce, Pipedrive
- **Database:** Firebase, Airtable, custom backend
- **Webhook:** Zapier, Make.com for automation

Example with SendGrid:
```javascript
function submitForm(data) {
    fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_SENDGRID_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: data.email }],
                subject: 'Welcome to How to Hire an AI'
            }],
            from: { email: 'hello@hireaiai.com' },
            content: [{ type: 'text/html', value: 'Welcome...' }]
        })
    })
    // Handle response
}
```

## 🎨 Design System

### Colors
- **Primary Blue:** `#0066ff` (CTAs, headers, links)
- **Secondary Orange:** `#f97316` (Accents, highlights)
- **Dark Text:** `#1a1a1a` (Body copy)
- **Light Background:** `#f5f5f5` (Sections)
- **White:** `#ffffff` (Cards, forms)

### Typography
- **Font Family:** System UI stack (no external fonts = fast loading)
- **Heading Scale:** 1.2x - 3rem
- **Line Height:** 1.6 (readable)
- **Font Weight:** 400 (normal), 600 (emphasis), 700 (headers)

### Spacing
- **Base Unit:** 1rem (16px)
- **Gap:** 2rem between sections
- **Padding:** 2rem inside cards
- **Margin:** 1.5rem for vertical rhythm

### Responsive Breakpoints
- **Desktop:** 1200px max-width
- **Tablet:** 768px (adjust layout)
- **Mobile:** 480px (single column)

## 📊 SEO & Analytics Setup

### Meta Tags (Already Included)
- `description`: Page meta description
- `keywords`: Relevant search terms
- `viewport`: Mobile responsive

### Suggested Additions

Add Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

Add form tracking:
```javascript
// In script.js, add to submitForm()
gtag('event', 'signup', {
    'event_category': 'engagement',
    'event_label': 'playbook_signup'
});
```

## 🔐 Security & Privacy

### Form Security
- No sensitive data stored locally
- HTTPS required in production
- CSRF protection via backend (implement on server)

### Privacy Compliance
- Update privacy policy link in footer
- Respect email preferences
- Include unsubscribe link in emails
- GDPR/CCPA compliance (consult legal for your jurisdiction)

## 📈 Conversion Optimization Tips

1. **Test CTA Copy** - Try "Download Guide", "Get Started", "Access Training"
2. **Form Length** - Keep to 5-7 fields max (this form is optimized)
3. **Progressive Profiling** - Collect more data on second signup
4. **Social Proof** - Add more testimonials as they come in
5. **Trust Signals** - Add company logos, "As seen in", certifications
6. **Follow-up Sequence** - Email sequence after signup (implement with email service)

## 🧪 Testing Checklist

- [ ] Form submission works locally
- [ ] All links navigate correctly
- [ ] Mobile responsiveness (use browser DevTools)
- [ ] Performance (Lighthouse score >90)
- [ ] Accessibility (WCAG 2.1 AA standard)
- [ ] Browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Form validation (required fields, email format)
- [ ] Success message displays after submit

## 📞 Support & Integration

### Ready to Deploy?
1. Update company info and links
2. Connect form backend (SendGrid, HubSpot, etc.)
3. Set up email follow-up sequences
4. Deploy to hosting platform
5. Set up Google Analytics
6. Create landing page in your CRM
7. Start driving traffic!

### Need Help?
- For technical issues: Check script console (F12 → Console tab)
- For design updates: Edit `styles.css` and reload
- For form integration: Connect to SendGrid/HubSpot API

## 📄 License

This template is provided as-is. Customize freely for your use.

---

**Ready to hire AI talent? Start with the playbook, scale with our training. Let's build elite AI teams.**
