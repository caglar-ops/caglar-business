# Deployment Checklist - How to Hire an AI

## ✅ Pre-Deployment

- [x] Landing page HTML valid
- [x] CSS mobile-responsive
- [x] JavaScript form functional
- [x] Guide preview available
- [x] All images/assets present
- [x] No external dependencies required
- [x] Git repo initialized with clean commit

## 🚀 Deploy to Production (Choose One)

### Option 1: Vercel (Recommended - 1 minute)
```bash
npm install -g vercel
vercel deploy --prod
```
**Result**: Live URL, auto-deploys on git push

### Option 2: Netlify (2 minutes)
1. Visit netlify.com → New site → Drag-and-drop folder
2. **Or** connect GitHub for auto-deploy
3. **Result**: Live URL, free SSL, auto-deploy

### Option 3: GitHub Pages (Free)
```bash
git remote add origin https://github.com/you/how-to-hire-ai.git
git push -u origin master

# Enable Pages in GitHub repo settings
# Settings → Pages → Source: main branch
```

### Option 4: Custom Domain
Point DNS CNAME to your hosting provider (Vercel/Netlify)

## ⚙️ Post-Deployment Setup

### 1. Form Integration
In `js/main.js`, replace `handleFormSubmit()` with:

**Mailgun API** (recommended):
```javascript
await fetch('https://api.mailgun.net/v3/YOUR_DOMAIN/messages', {
  method: 'POST',
  headers: { 'Authorization': 'Basic ' + btoa('api:YOUR_API_KEY') },
  body: new FormData(event.target)
});
```

**Zapier Webhook**:
```javascript
await fetch('https://hooks.zapier.com/hooks/catch/YOUR_ID/', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

### 2. Email Sequences
Set up automated emails after signup:
- **Day 0**: Send playbook PDF
- **Day 1**: "Here's how the audit works"
- **Day 3**: Case study + testimonial
- **Day 7**: "Ready to get started?"

**Tools**: Mailgun, SendGrid, Zapier, ConvertKit

### 3. Analytics
Add Google Analytics 4:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 4. Domain Setup
If using custom domain (e.g., howtohireai.com):
- Point DNS CNAME to hosting provider
- Update footer email & contact links
- Ensure SSL certificate active

## 🧪 Testing Checklist

After deployment:
- [ ] Visit homepage — loads in <2s
- [ ] Test form submit — no errors in console
- [ ] Click all CTAs — scroll to correct section
- [ ] Mobile view — responsive design works
- [ ] Download guide preview — file accessible
- [ ] Check analytics — tracking code fires
- [ ] Email signup — verify email received

## 📊 First 30 Days

**Monitor**:
- Traffic volume + sources
- Bounce rate + scroll depth
- Form submission rate
- Email open rates
- Which CTAs convert best

**Optimize**:
- A/B test hero copy
- Test different CTA placement
- Analyze exit pages
- Improve underperforming sections

## 🔒 Security

- [x] No sensitive data in client-side code
- [x] Form data can be encrypted in transit
- [x] No API keys in HTML (use backend/Zapier)
- [x] HTTPS enforced (automatic on Vercel/Netlify)
- [ ] Add Privacy Policy page (after launch)
- [ ] Add Terms of Service (optional)

## ✉️ Contact & Support

**For questions**:
- Email: caglar@caglaroner.com
- Check README.md for full documentation
- See BUILD_SUMMARY.md for technical details

---

**Status**: Ready to deploy ✅
**Date**: March 2026
