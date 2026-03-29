# How to Hire an AI - Landing Page & Service

A modern, conversion-optimized landing page for the "How to Hire an AI" playbook and training service. Built with React + Tailwind CSS.

## 🎯 Project Overview

This landing page serves three core business purposes:

1. **Educate** - Demonstrate the playbook's value through compelling copy and guide preview
2. **Convert** - Capture qualified leads through a well-designed signup form
3. **Sell Services** - Position and sell training, setup, and coaching services

### Key Features

- ✅ **Responsive Design** - Mobile-first, optimized for all devices
- ✅ **High-Converting Sections** - Hero, problem, playbook preview, testimonials
- ✅ **Service Offering** - 3 pricing tiers (Training, Setup, Coaching)
- ✅ **Guide Preview** - Table of contents and preview of the playbook
- ✅ **Signup Form** - Progressive profiling with email, role, company, team size
- ✅ **Case Studies** - Real results from customers
- ✅ **Testimonials** - Social proof from hiring leaders
- ✅ **Smooth Navigation** - Sticky nav with scroll-to-section functionality

## 📁 Project Structure

```
how-to-hire-ai/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx        # Sticky nav with smooth scroll
│   │   ├── Hero.jsx              # Hero section with value prop
│   │   ├── ProblemSection.jsx    # 4 key pain points
│   │   ├── PlaybookSection.jsx   # 6-step hiring framework
│   │   ├── GuidePreview.jsx      # Table of contents + CTA
│   │   ├── ServiceOffering.jsx   # 3 service packages
│   │   ├── CaseStudies.jsx       # Real results
│   │   ├── Testimonials.jsx      # Customer feedback
│   │   ├── SignupForm.jsx        # Lead capture form
│   │   └── Footer.jsx            # Footer with links
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind + custom styles
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.js               # Vite config
├── tailwind.config.js           # Tailwind config
├── postcss.config.js            # PostCSS config
├── GUIDE_PREVIEW.md             # Full guide preview content
├── signups.json                 # Signup storage (simple JSON)
└── README.md                    # This file
```

## 🚀 Getting Started

### Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```
   Output is in `dist/`

4. **Preview production build:**
   ```bash
   npm run preview
   ```

### Local Testing

- **Desktop:** Browser at full width
- **Tablet:** Chrome DevTools (iPad size)
- **Mobile:** Chrome DevTools (iPhone size) or actual device

Test form submission by opening browser console and submitting the form.

## 📊 Sections Breakdown

### 1. Navigation
- Sticky header with gradient background
- Desktop: Horizontal menu with CTA button
- Mobile: Hamburger menu
- Smooth scroll-to-section functionality

### 2. Hero Section
- Compelling headline positioning as "THE guide"
- Value proposition with emotional hook
- Social proof (500+ teams, 92% success rate, $2.4M avg value)
- Dual CTAs: Download guide + Explore training

### 3. Problem Section
- 4 key pain points in AI hiring
- Visual icons + descriptions
- Bottom callout: Why this guide matters

### 4. Playbook Section
- 6 modules of the hiring framework
- Module number, title, description, key features
- Card layout with hover effects
- Grid responsive to tablet/mobile

### 5. Guide Preview
- Left: Table of contents preview
- Right: Benefits list + download CTA
- Highlights key features (frameworks, tools, questions)
- Call-to-action for guide download

### 6. Service Offering
- 3 pricing tiers: Training ($4,999), Setup ($12,999), Coaching ($2,499/mo)
- Setup Service is featured (larger, different color)
- Clear feature lists for each
- "Get Started" button for each service

### 7. Case Studies
- 3 real customer results
- Challenge → Result format
- Key metric highlight for each
- Builds credibility and FOMO

### 8. Testimonials
- 6 5-star testimonials from customers
- Avatar badges with initials
- Role + company for credibility
- Quote-focused design

### 9. Signup Form
- Progressive profiling (5 key fields)
- Radio buttons for service selection
- Form validation
- Success message display
- Responsive layout

### 10. Footer
- Links grouped by category
- Contact email
- Social links
- Copyright

## 🎨 Design System

### Colors
- **Primary Blue:** `#0066ff`
- **Secondary Purple:** `#764ba2`
- **Accent Orange:** `#f97316`
- **Text Dark:** `#1a1a1a`
- **Text Gray:** `#666666`
- **Background Light:** `#f5f5f5`
- **White:** `#ffffff`

### Typography
- **Font Stack:** System UI (no external fonts)
- **Headings:** Bold, 2xl-5xl
- **Body:** Regular, 16px base
- **Line Height:** 1.6

### Spacing
- **Base Unit:** 1rem (16px)
- **Section Padding:** 4rem vertical
- **Component Gap:** 2rem
- **Card Padding:** 2rem

### Responsive Breakpoints
- **Mobile:** <640px (single column)
- **Tablet:** 640px-1024px (2 columns)
- **Desktop:** >1024px (3+ columns)

## 📝 Customization Guide

### Update Company Name & Branding

Edit `src/components/Navigation.jsx`:
```jsx
<h1 className="text-2xl font-bold">YourBrand</h1>
```

### Update Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-blue',
  secondary: '#your-purple',
}
```

### Update Content

Each component is self-contained. Edit:
- `Hero.jsx` - Main headline, subheading, social proof
- `ProblemSection.jsx` - Pain points array
- `PlaybookSection.jsx` - 6 steps array
- `ServiceOffering.jsx` - 3 services array
- `CaseStudies.jsx` - 3 case studies array
- `Testimonials.jsx` - 6 testimonials array

### Update Pricing

Edit `src/components/ServiceOffering.jsx`:
```jsx
const services = [
  {
    name: "Your Service",
    price: "$9,999",
    duration: "6 weeks",
    // ...
  }
]
```

## 🔗 Integration Points

### Form Submission

Currently logs to console. To integrate with backend:

**Option 1: Email Service (SendGrid)**
```jsx
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({/* email payload */})
});
```

**Option 2: CRM (HubSpot)**
```jsx
const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    properties: {
      email: formData.email,
      firstname: formData.name,
      // ...
    }
  })
});
```

**Option 3: Webhook (Zapier/Make)**
```jsx
const response = await fetch('https://hooks.zapier.com/hooks/catch/YOUR_ID/YOUR_WEBHOOK', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

### Analytics

Add Google Analytics:
```jsx
// In index.html, before closing </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 📦 Deployment Options

### Netlify (Recommended)
1. Push to GitHub
2. Connect to Netlify
3. Auto-deploy on push

### Vercel
1. Import from GitHub
2. Configure environment
3. Deploy

### GitHub Pages
```bash
# Build
npm run build

# Deploy to gh-pages
npx gh-pages -d dist
```

### Traditional Server
```bash
# Build
npm run build

# Copy dist/ to web server
scp -r dist/* user@server:/var/www/html/
```

## 📊 Performance

- **Lighthouse Score Target:** >90
- **Page Load:** <2s (optimized)
- **Mobile:** Full responsiveness
- **Accessibility:** WCAG 2.1 AA

## 🧪 Testing Checklist

- [ ] Form validation (required fields)
- [ ] Form submission (success message)
- [ ] Mobile responsiveness (DevTools)
- [ ] Desktop responsiveness (wide screen)
- [ ] Smooth scrolling (nav clicks)
- [ ] All links functional
- [ ] Images optimized
- [ ] Lighthouse score >90

## 📚 Data Storage

Signups are stored in `signups.json`:
```json
{
  "submissions": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "hiring-manager",
      "company": "Acme Corp",
      "teamSize": "1-3",
      "service": "training",
      "timestamp": "2026-03-29T12:00:00Z"
    }
  ]
}
```

In production, integrate with a database or email service.

## 📞 Support

- **Questions?** Edit relevant component and reload
- **Styling?** Edit `src/index.css` or `tailwind.config.js`
- **Form issues?** Check browser console (F12)
- **Deployment?** See deployment section above

## 📄 License

This project is provided as-is. Customize freely for your use.

---

**Built for hiring leaders who take AI talent seriously.**
