# ⚠️ Manual Tasks Required

**Date:** 2025-12-03
**Priority:** MEDIUM

---

## 🖼️ Hero Image Download

### Issue:
The hero image (`hero-luxury-villa.jpg`) could not be automatically downloaded from Unsplash due to API restrictions.

### Current State:
- File exists at: `assets/images/hero-luxury-villa.jpg` (29 bytes - placeholder only)
- Other portfolio images downloaded successfully

### Manual Solution:

#### Option 1: Download from Unsplash Manually
1. Visit: https://unsplash.com/photos/mp0bgAAJrjg
2. Click "Download free"
3. Save as: `assets/images/hero-luxury-villa.jpg`
4. Recommended size: 2000px width, optimize to ~300-500KB

#### Option 2: Use Your Own Image
1. Prepare a high-quality luxury villa/architecture image
2. Recommended dimensions: 2000x1333px (3:2 aspect ratio)
3. Optimize to ~300-500KB (use TinyPNG or similar)
4. Save as: `assets/images/hero-luxury-villa.jpg`
5. Update the alt text in `index.html` (line 321) to match your image

#### Option 3: Use Placeholder Temporarily
1. Copy one of the downloaded portfolio images as placeholder:
   ```bash
   cp assets/images/portfolio-mountain.jpg assets/images/hero-luxury-villa.jpg
   ```
2. Replace with proper image later

### Files Affected:
- `index.html` (line 318) - already configured to use local path
- No code changes needed once image is downloaded

### Priority:
**MEDIUM** - The page will load, but the hero image will appear broken until fixed.

---

## 🎨 Open Graph Image (Optional)

### Recommendation:
Create a dedicated social media sharing image for better appearance on Facebook/LinkedIn.

### Specifications:
- Size: 1200x630px
- Format: JPG or PNG
- Content: Brand logo + tagline + hero image composite
- File size: < 1MB
- Save as: `assets/images/og-image.jpg`

### Update Location:
`index.html` line 28:
```html
<meta property="og:image" content="https://neon.estate.com/assets/images/og-image.jpg" />
```

### Current State:
Using `favicon.svg` as fallback - works but not optimal for social media.

---

## 🔧 Form Handler (Required Before Launch)

### Issue:
Contact form has placeholder action URL.

### Current State:
```html
<form action="/submit-contact" method="POST">
```

### Required Action:
1. Set up backend form handler (PHP, Node.js, or service like Formspree)
2. Update the form action URL in `index.html` (line 702)

### Options:

#### Option A: Formspree (Easiest)
1. Create account at https://formspree.io/
2. Get your endpoint URL
3. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Option B: Custom Backend
- Implement server-side handler
- Update action URL accordingly

#### Option C: Netlify Forms (if hosting on Netlify)
```html
<form name="contact" method="POST" data-netlify="true">
```

---

## 📊 Analytics Setup (Optional but Recommended)

### Google Analytics 4

**Add before `</head>` in `index.html`:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Steps:**
1. Create GA4 property at https://analytics.google.com/
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Replace in code above
4. Add to index.html before line 245 (before `</head>`)

---

## 🔍 Google Search Console (After Launch)

### Required After Domain is Live:

1. **Verify Ownership**
   - Go to https://search.google.com/search-console
   - Add property (your domain)
   - Verify via HTML tag or DNS

2. **Submit Sitemap**
   - In Search Console, go to Sitemaps
   - Submit: `https://your-domain.com/sitemap.xml`

3. **Request Indexing**
   - Submit homepage URL for immediate indexing

---

## 📸 Image Optimization (Recommended)

### Current Images:
All portfolio images are JPG format and reasonable size (89-109KB).

### Recommended:
Convert to WebP for better performance:

```bash
# Install webp tools
# Ubuntu/Debian: apt-get install webp
# Mac: brew install webp

# Convert images
cwebp -q 80 assets/images/portfolio-penthouse.jpg -o assets/images/portfolio-penthouse.webp
cwebp -q 80 assets/images/portfolio-rezydencja.jpg -o assets/images/portfolio-rezydencja.webp
cwebp -q 80 assets/images/portfolio-aurora.jpg -o assets/images/portfolio-aurora.webp
cwebp -q 80 assets/images/portfolio-mountain.jpg -o assets/images/portfolio-mountain.webp
```

Then update paths in `assets/js/main.js` (lines 9, 18, 27, 36).

---

## ✅ Checklist

Before launch, ensure:

- [ ] Hero image downloaded and optimized
- [ ] Form handler configured and tested
- [ ] Google Analytics added (optional)
- [ ] Domain updated in all files (if changed)
- [ ] Contact information verified
- [ ] Test form submission
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Submit to Google Search Console

---

## 📝 Notes

- All other SEO optimizations are complete
- These are enhancement tasks that can be done after initial review
- Hero image is the only critical visual issue
- Form handler is required for the contact form to work

---

**Priority Legend:**
- 🔴 **HIGH** - Required before launch
- 🟡 **MEDIUM** - Important but not blocking
- 🟢 **LOW** - Enhancement/optional

---

**Last Updated:** 2025-12-03
