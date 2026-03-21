# How to Hire an AI - Landing Page

A modern, sales-focused landing page for the "How to Hire an AI" playbook and training service offering.

## Project Structure

```
how-to-hire-ai/
├── index.html              # Main landing page
├── css/
│   ├── style.css          # Main styles and layout
│   └── animations.css     # Animation definitions
├── js/
│   └── main.js            # Interactive functionality
├── assets/                # Images and media (placeholder)
└── README.md              # This file
```

## Features

### Sections

1. **Hero Section** - Eye-catching introduction with headline, CTAs, and key stats
2. **Playbook Preview** - 6 modules showcasing the complete guide structure
3. **Case Studies** - Real-world examples showing proven results
4. **Pricing** - Three tiers (Starter, Professional, Enterprise) with clear value props
5. **Sign-up Form** - Comprehensive form for training program enrollment
6. **Footer** - Links, resources, and support information

### Technical Features

- **Responsive Design** - Mobile-first approach, optimized for all device sizes
- **Modern Styling** - CSS Grid, Flexbox, gradient effects
- **Smooth Animations** - Scroll-triggered fade-ins and transforms
- **Form Handling** - Client-side validation and success notifications
- **Performance** - Lazy loading, optimized animations
- **Accessibility** - Semantic HTML, WCAG considerations

## Color Scheme

- **Primary**: #4f46e5 (Indigo)
- **Accent**: #06b6d4 (Cyan)
- **Secondary**: #ec4899 (Pink)
- **Text Primary**: #1e293b (Dark Slate)
- **Text Secondary**: #64748b (Slate)

## Getting Started

### Local Development

1. Open `index.html` in a modern web browser
2. No build step required - pure HTML/CSS/JavaScript
3. For production, consider:
   - Minifying CSS/JS
   - Adding SSL certificates
   - Configuring email backend for forms
   - Setting up analytics

### Form Integration

The landing page includes placeholder form handlers. To integrate:

1. **Preview Download** - Modify `handlePreviewDownload()` in `js/main.js`
2. **Signup Form** - Modify `handleSignup()` in `js/main.js`
3. **Enterprise Contact** - Currently uses mailto links

## Customization

### Update Content

Edit `index.html` to:
- Change company name and branding
- Update pricing tiers
- Add real case studies
- Modify CTAs and headlines

### Update Styling

Edit `css/style.css` to:
- Change color variables in `:root`
- Adjust spacing and typography
- Modify layout breakpoints

### Add Analytics

Update `initAnalytics()` in `js/main.js` to connect to:
- Google Analytics
- Mixpanel
- Segment
- Custom analytics backend

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- **Lighthouse Score**: Target 90+
- **Page Load**: < 3s on 4G
- **Core Web Vitals**: All green
- **Mobile Friendly**: Yes

## Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance
- Alt text for images

## Future Enhancements

- [ ] Blog section with resources
- [ ] Testimonials video carousel
- [ ] Chat widget for support
- [ ] Email confirmation flows
- [ ] Payment integration (Stripe)
- [ ] Progress tracker for signup flow
- [ ] A/B testing variants
- [ ] Multi-language support

## Support

For questions or issues:
- Email: support@howtohireai.com
- Response time: Under 24 hours

## License

© 2026 How to Hire an AI. All rights reserved.

---

Built with ❤️ for forward-thinking organizations.
