# SEO Configuration Guide - Neon Estate

**Document Created:** 2025-12-03
**Last Modified:** 2025-12-03
**Version:** 1.0
**Author:** DominDev - SEO Optimization Team
**Target Audience:** Website purchaser / New owner

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Critical SEO Elements to Update](#critical-seo-elements-to-update)
3. [Domain Configuration](#domain-configuration)
4. [Meta Tags Customization](#meta-tags-customization)
5. [Structured Data (Schema.org)](#structured-data-schemaorg)
6. [Images & Media](#images--media)
7. [Contact Information](#contact-information)
8. [Analytics & Tracking](#analytics--tracking)
9. [Advanced Configuration](#advanced-configuration)
10. [SEO Checklist](#seo-checklist)
11. [Tools & Validation](#tools--validation)

---

## 🎯 Introduction

This guide provides step-by-step instructions for customizing SEO elements on the **Neon Estate** website. If you've purchased this template or are deploying it to a different domain, follow this guide to ensure optimal search engine visibility.

### Current Configuration
- **Domain:** `neon.estate.com`
- **Location:** Wrocław, Poland
- **Language:** Polish (pl-PL)
- **Business Type:** Architecture & Design Studio

---

## 🚨 Critical SEO Elements to Update

### Priority: HIGH (Must Update Before Launch)

1. **Domain URLs** - Update all references to `neon.estate.com`
2. **Contact Information** - Phone, email, address
3. **Meta Tags** - Titles, descriptions, keywords
4. **Schema.org Data** - Business information, location
5. **Sitemap & Robots.txt** - Domain references

---

## 🌐 Domain Configuration

### Files to Update:

#### 1. `index.html` (Multiple Locations)

**Lines to search and replace:**

```html
<!-- Search for: -->
https://neon.estate.com/

<!-- Replace with: -->
https://your-new-domain.com/
```

**Specific locations in `index.html`:**

- **Line 21:** Canonical URL
  ```html
  <link rel="canonical" href="https://YOUR-DOMAIN.com/" />
  ```

- **Lines 24-32:** Open Graph Tags
  ```html
  <meta property="og:url" content="https://YOUR-DOMAIN.com/" />
  <meta property="og:image" content="https://YOUR-DOMAIN.com/assets/images/favicon.svg" />
  ```

- **Lines 35-39:** Twitter Card Tags
  ```html
  <meta name="twitter:url" content="https://YOUR-DOMAIN.com/" />
  <meta name="twitter:image" content="https://YOUR-DOMAIN.com/assets/images/favicon.svg" />
  ```

- **Lines 75-240:** Structured Data (JSON-LD)
  ```json
  "@id": "https://YOUR-DOMAIN.com/#organization",
  "url": "https://YOUR-DOMAIN.com/",
  ```

#### 2. `robots.txt`

**Line 10:**
```
Sitemap: https://YOUR-DOMAIN.com/sitemap.xml
```

#### 3. `sitemap.xml`

**Line 5:**
```xml
<loc>https://YOUR-DOMAIN.com/</loc>
```

**Lines 10-12:** Image references
```xml
<image:loc>https://YOUR-DOMAIN.com/assets/images/favicon.svg</image:loc>
```

---

## 📝 Meta Tags Customization

### Location: `index.html` (Lines 11-39)

#### 1. Page Title (Line 11)
```html
<title>YOUR COMPANY | Your SEO-Optimized Title</title>
```

**Best Practices:**
- Keep it under 60 characters
- Include primary keyword
- Include location if relevant
- Format: `Brand | Primary Keyword | Location`

**Example:**
```html
<title>Elite Design Studio | Luxury Apartments Architecture | Warsaw</title>
```

#### 2. Meta Description (Line 13)
```html
<meta name="description" content="Your compelling description (155-160 chars)" />
```

**Best Practices:**
- 150-160 characters
- Include call-to-action
- Include primary keywords naturally
- Highlight unique value proposition

**Current:**
```
Studio architektury specjalizujące się w projektowaniu luksusowych apartamentów, penthouse'ów i rezydencji premium. Światło, przestrzeń i panorama - architektura bez kompromisów.
```

#### 3. Keywords (Line 14)
```html
<meta name="keywords" content="keyword1, keyword2, keyword3, ..." />
```

**Current Keywords:**
```
apartamenty premium, luksusowe apartamenty, architektura premium, ekskluzywne apartamenty, projektowanie wnętrz, penthouse Wrocław, luksusowe rezydencje, architektura wnętrz, quiet luxury, apartamenty luksusowe Wrocław, projektowanie apartamentów, studio architektury Wrocław
```

**How to Update:**
1. Research keywords for your market
2. Include location-specific terms
3. Use 10-15 relevant keywords
4. Separate with commas

#### 4. Open Graph Title (Line 26)
```html
<meta property="og:title" content="Your Social Media Title" />
```

**Tip:** This appears when shared on Facebook/LinkedIn. Can be different from page title.

#### 5. Open Graph Description (Line 27)
```html
<meta property="og:description" content="Social media description" />
```

#### 6. Open Graph Image (Line 28)
```html
<meta property="og:image" content="https://YOUR-DOMAIN.com/path/to/social-image.jpg" />
```

**Requirements:**
- Recommended size: 1200x630px
- Format: JPG or PNG
- Max file size: 8MB
- Shows preview when shared on social media

---

## 🏢 Structured Data (Schema.org)

### Location: `index.html` (Lines 69-244)

This is the JSON-LD structured data that helps search engines understand your business.

#### 1. Organization Data (Lines 74-99)

**Update these fields:**

```json
{
  "@type": "Organization",
  "name": "YOUR COMPANY NAME",
  "alternateName": "YOUR.BRAND",
  "url": "https://YOUR-DOMAIN.com/",
  "logo": {
    "url": "https://YOUR-DOMAIN.com/assets/images/YOUR-LOGO.svg"
  },
  "description": "Your business description",
  "address": {
    "addressLocality": "YOUR CITY",
    "addressCountry": "YOUR COUNTRY CODE"
  },
  "contactPoint": {
    "telephone": "+XX-XXX-XXX-XXX",
    "email": "your@email.com"
  }
}
```

#### 2. LocalBusiness Data (Lines 100-126)

**Update these fields:**

```json
{
  "@type": "LocalBusiness",
  "name": "YOUR BUSINESS NAME",
  "address": {
    "addressLocality": "YOUR CITY",
    "addressRegion": "YOUR REGION/STATE",
    "addressCountry": "YOUR COUNTRY"
  },
  "geo": {
    "latitude": YOUR_LATITUDE,
    "longitude": YOUR_LONGITUDE
  },
  "telephone": "+XX-XXX-XXX-XXX",
  "email": "your@email.com"
}
```

**How to find coordinates:**
1. Go to Google Maps
2. Right-click on your business location
3. Click on coordinates to copy them

**Current coordinates (Wrocław):**
- Latitude: 51.1079
- Longitude: 17.0385

#### 3. FAQ Schema (Lines 177-230)

Update the questions and answers to match your business FAQ.

**Current structure:**
```json
{
  "@type": "Question",
  "name": "Your question?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Your answer"
  }
}
```

---

## 🖼️ Images & Media

### Hero Image

**Location:** `index.html` (Line 318)

```html
<img
  src="assets/images/hero-luxury-villa.jpg"
  alt="Descriptive alt text with keywords"
  width="2000"
  height="1333"
/>
```

**Best Practices:**
- Use descriptive alt text (include keywords)
- Specify width/height to prevent layout shift
- Optimize file size (use WebP if possible)
- Hero image should be under 500KB

### Portfolio Images

**Location:** `assets/js/main.js` (Lines 9, 18, 27, 36)

Update the `img` paths in the properties array:

```javascript
const properties = [
  {
    title: "Your Property Title",
    img: "assets/images/YOUR-IMAGE.jpg",
    description: "SEO-friendly description with keywords"
  }
];
```

### Social Media Image (OG Image)

**Recommended:** Create a dedicated social media image

**Specifications:**
- Size: 1200x630px
- Format: JPG or PNG
- Include brand logo and tagline
- No small text (won't be readable)

**Update in `index.html` (Line 28):**
```html
<meta property="og:image" content="https://YOUR-DOMAIN.com/assets/images/og-image.jpg" />
```

---

## 📞 Contact Information

### Locations to Update:

#### 1. Schema.org ContactPoint (Line 91-96)
```json
"contactPoint": {
  "telephone": "+XX-XXX-XXX-XXX",
  "email": "your@email.com",
  "contactType": "Customer Service"
}
```

#### 2. Mobile Menu (Lines 303-309)
```html
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+XXXXXXXXXXXX">+XX XXX XXX XXX</a>
```

#### 3. Contact Section (Lines 693, 697)
```html
<a href="mailto:your@email.com">your@email.com</a>
<a href="tel:+XXXXXXXXXXXX">+XX XXX XXX XXX</a>
```

#### 4. Contact Form Action (Line 702)
```html
<form action="/submit-contact" method="POST">
```

**Note:** Update the form action to your actual form handler endpoint.

---

## 📊 Analytics & Tracking

### Google Analytics 4 (GA4)

**Add before closing `</head>` tag:**

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Tag Manager (Alternative)

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### Facebook Pixel (Optional)

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
```

---

## ⚙️ Advanced Configuration

### 1. Multilingual Setup (Future)

If you plan to add English or other languages:

**Add to `<head>`:**
```html
<link rel="alternate" hreflang="pl" href="https://YOUR-DOMAIN.com/" />
<link rel="alternate" hreflang="en" href="https://YOUR-DOMAIN.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://YOUR-DOMAIN.com/" />
```

**Update Schema.org:**
```json
"inLanguage": ["pl-PL", "en-US"]
```

### 2. Rich Snippets Testing

After making changes, test your structured data:

**Tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

### 3. Additional Structured Data Types

Consider adding:

**Breadcrumbs (if you add subpages):**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://YOUR-DOMAIN.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Portfolio",
      "item": "https://YOUR-DOMAIN.com/portfolio"
    }
  ]
}
```

**Reviews (if you have customer reviews):**
```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Customer Name"
  },
  "reviewBody": "Review text..."
}
```

---

## ✅ SEO Checklist

### Before Launch:

- [ ] Updated all domain references (neon.estate.com → your domain)
- [ ] Updated meta title and description
- [ ] Customized keywords for your market
- [ ] Updated contact information (phone, email)
- [ ] Updated business address and coordinates
- [ ] Updated Schema.org structured data
- [ ] Replaced stock images with your own
- [ ] Optimized image alt texts
- [ ] Updated Open Graph images (1200x630px)
- [ ] Updated robots.txt
- [ ] Updated sitemap.xml
- [ ] Added Google Analytics tracking code
- [ ] Tested structured data with Google Rich Results Test
- [ ] Submitted sitemap to Google Search Console
- [ ] Verified mobile-friendliness
- [ ] Checked page load speed (GTmetrix/PageSpeed Insights)

### After Launch:

- [ ] Set up Google Search Console
- [ ] Verify domain ownership
- [ ] Submit sitemap to Search Console
- [ ] Request indexing of main pages
- [ ] Set up Google Business Profile (if local business)
- [ ] Monitor crawl errors weekly
- [ ] Track keyword rankings
- [ ] Monitor organic traffic in Analytics
- [ ] Build quality backlinks
- [ ] Create content marketing strategy

---

## 🛠️ Tools & Validation

### Essential SEO Tools:

1. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Purpose: Monitor indexing, fix errors, submit sitemaps

2. **Google Analytics 4**
   - URL: https://analytics.google.com/
   - Purpose: Track traffic, user behavior, conversions

3. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Purpose: Test performance and Core Web Vitals

4. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Purpose: Validate structured data

5. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Purpose: Validate JSON-LD syntax

6. **Screaming Frog SEO Spider**
   - URL: https://www.screamingfrog.co.uk/
   - Purpose: Crawl site, find technical issues

7. **Ahrefs / Semrush**
   - Purpose: Keyword research, competitor analysis, backlinks

### Free Testing Tools:

- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Structured Data Testing Tool:** https://validator.schema.org/
- **Meta Tags Preview:** https://metatags.io/
- **Sitemap Validator:** https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## 📞 Support & Updates

### When to Update This Document:

- When domain changes
- When business information changes
- When adding new features (blog, portfolio pages)
- When expanding to new locations
- When adding new languages

### Quick Reference Card:

**Files That Contain Domain References:**
1. `index.html` (multiple locations)
2. `robots.txt`
3. `sitemap.xml`

**Files That Contain Contact Info:**
1. `index.html` (Schema.org, mobile menu, contact section)

**Files That Contain Keywords:**
1. `index.html` (meta tags, line 14)

---

## 📌 Notes

- Always backup files before making changes
- Test changes on a staging environment first
- Validate HTML after modifications: https://validator.w3.org/
- Monitor Google Search Console for any crawl errors after updates
- Update sitemap lastmod date when making content changes
- Keep this documentation updated when adding new pages

---

**Document Version History:**

- **v1.0** (2025-12-03): Initial documentation created
  - Comprehensive SEO setup guide
  - Domain configuration instructions
  - Meta tags customization
  - Structured data guidelines
  - Analytics integration guide

---

**For questions or technical support:**
Contact the original developer or refer to:
- Google Search Central: https://developers.google.com/search
- Schema.org Documentation: https://schema.org/docs/documents.html
- MDN Web Docs: https://developer.mozilla.org/

---

**End of Document**
