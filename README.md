# Neon Estate | Luksusowa Architektura Premium

<div align="center">

**"Architektura... W Nowym Świetle"**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![ES Modules](https://img.shields.io/badge/ES-Modules-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Profesjonalna strona konceptualna dla luksusowej agencji nieruchomości premium, łącząca wizualną elegancję z wydajnością na poziomie production.

[Demo](#) · [Dokumentacja](#-dokumentacja) · [Deployment](#-deployment)

</div>

---

## 📋 Spis Treści

- [O Projekcie](#-o-projekcie)
- [Kluczowe Funkcje](#-kluczowe-funkcje)
- [Stack Technologiczny](#-stack-technologiczny)
- [Szybki Start](#-szybki-start)
- [Struktura Projektu](#-struktura-projektu)
- [Wydajność](#-wydajno%C5%9B%C4%87)
- [Bezpieczeństwo](#-bezpiecze%C5%84stwo)
- [Dokumentacja](#-dokumentacja)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Licencja](#-licencja)

---

## 💎 O Projekcie

**Neon Estate** to zaawansowany koncept strony internetowej dla agencji nieruchomości luksusowych, zaprojektowany z naciskiem na:

- **Performance First**: Optymalizacja wydajności (PageSpeed 90+)
- **Visual Excellence**: Minimalistyczny design w stylu "Quiet Luxury"
- **AI Integration**: Generator konceptów architektonicznych powered by Google Gemini AI
- **Production Ready**: Pełna architektura backend (Node.js + Express) gotowa do wdrożenia

Projekt demonstruje nowoczesne podejście do web developmentu, łącząc:
- Responsive Images (AVIF/WebP/JPEG) z automatyczną optymalizacją
- Lazy Loading z IntersectionObserver API
- Bezpieczną integrację AI z rate limitingiem i XSS protection
- SEO-friendly strukturę z Schema.org markup

---

## 🌟 Kluczowe Funkcje

### Frontend
- ✨ **AI Atelier** - Generator konceptów architektonicznych z wykorzystaniem Gemini API
- 🎬 **Cinematic UX** - Płynne animacje (Intersection Observer, Progressive Reveal)
- 🎨 **Minimalist Luxury Design** - Czarny gradient, złote akcenty, neonowe linie
- 🖱️ **Custom Cursor** - Interaktywny kursor "Diamond Precision" z animacjami
- 📱 **Mobile First** - Pełna responsywność z dedykowanym menu mobilnym
- 🖼️ **Responsive Images** - AVIF + WebP + JPEG fallback (70-94% kompresja)
- ⚡ **Lazy Loading** - Inteligentne ładowanie obrazów i animacji
- ♿ **Accessibility** - ARIA labels, semantic HTML, skip links

### Backend (AI Atelier)
- 🤖 **Google Gemini AI** - Generowanie konceptów architektonicznych
- 🔒 **Security** - DOMPurify XSS protection, Helmet, CORS, Rate Limiting
- 📊 **Input Validation** - Frontend + backend sanitization
- ⚙️ **Environment Config** - Centralna konfiguracja z .env
- 🚀 **Deployment Ready** - Gotowy do wdrożenia na Vercel/Heroku/Railway

### Performance Optimizations
- CSS Minification (29% redukcja rozmiaru)
- Image Optimization (84 warianty, 4 rozmiary × 3 formaty)
- Git Hooks dla automatycznej minifikacji
- DNS prefetch i preconnect dla external resources

---

## 🛠️ Stack Technologiczny

### Frontend
```
HTML5             - Semantic markup, ARIA accessibility
CSS3              - Variables, Grid, Flexbox, Animations
JavaScript ES6+   - Vanilla JS, Async/Await, Modules
```

### Backend
```
Node.js v18+      - Runtime environment
Express.js        - Web framework
Google Gemini AI  - AI concept generation
DOMPurify         - XSS protection
Helmet            - Security headers
Express Rate Limit - API rate limiting
```

### DevOps & Tools
```
Sharp             - Image optimization (AVIF, WebP)
Git Hooks         - Pre-commit CSS minification
npm Scripts       - Build automation
Environment Config - .env management
```

### SEO & Performance
```
Schema.org JSON-LD - Structured data
Open Graph         - Social media optimization
Twitter Cards      - Rich social previews
Sitemap.xml        - Search engine indexing
robots.txt         - Crawler configuration
```

---

## 🚀 Szybki Start

### Wymagania

- **Node.js** v18.0.0 lub wyższy
- **npm** (dołączony do Node.js)
- **Git** (opcjonalnie)

### Instalacja

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/DominDev/DominDev-Neon-Estate.git
   cd DominDev-Neon-Estate
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj environment** (opcjonalnie, jeśli używasz AI Atelier)
   ```bash
   cp .env.example .env
   ```

   Edytuj `.env` i dodaj swój Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   NODE_ENV=development
   PORT=3000
   ALLOWED_ORIGINS=http://localhost:5501
   ```

4. **Uruchom backend** (opcjonalnie, dla AI Atelier)
   ```bash
   npm run dev
   ```
   Backend będzie dostępny na: `http://localhost:3000`

5. **Uruchom frontend**
   - Otwórz `index.html` w przeglądarce, lub
   - Użyj Live Server (VS Code extension)
   - Lub uruchom lokalny serwer HTTP:
     ```bash
     npx http-server -p 5501
     ```

---

## 📂 Struktura Projektu

```
DominDev-Neon-Estate/
│
├── 📁 api/                          # Backend Node.js + Express
│   ├── config/
│   │   └── env.js                   # Environment configuration
│   ├── middleware/
│   │   ├── error-handler.js         # Global error handling
│   │   ├── rate-limiter.js          # Rate limiting (10 req/15min)
│   │   └── validator.js             # Input validation
│   ├── routes/
│   │   └── ai-atelier.js            # AI generation endpoints
│   ├── utils/
│   │   ├── http-client.js           # Fetch with timeout
│   │   └── sanitizer.js             # XSS protection
│   ├── server.js                    # Main server file
│   └── README.md                    # Backend docs
│
├── 📁 assets/
│   ├── css/
│   │   ├── style.css                # Main stylesheet (69 KB)
│   │   └── style.min.css            # Minified (49 KB) [-29%]
│   ├── js/
│   │   └── main.js                  # Main logic (974 lines)
│   ├── images/
│   │   ├── originals/               # Source images (ignored in git)
│   │   ├── *-400.avif/webp/jpg     # Mobile optimized
│   │   ├── *-800.avif/webp/jpg     # Tablet optimized
│   │   ├── *-1200.avif/webp/jpg    # Desktop optimized
│   │   └── *-1600.avif/webp/jpg    # HiDPI optimized
│   └── fonts/                       # (Optional custom fonts)
│
├── 📁 _scripts/                     # Development scripts
│   ├── optimize-images.js           # Sharp image optimization
│   ├── minify-css.js                # CSS minification
│   ├── auto-minify-css.js           # Watch mode minification
│   ├── setup-git-hooks.js           # Git pre-commit hooks
│   ├── snapshot-structure.ps1       # Project structure snapshot
│   ├── snapshot-code.ps1            # Code backup snapshot
│   └── README.md                    # Scripts documentation
│
├── 📁 _docs/                        # Technical documentation
│   ├── technical-documentation.md   # Main tech docs
│   ├── guide-mcp-setup.md          # MCP setup guide
│   ├── guide-seo-configuration.md  # SEO customization
│   ├── report-image-optimization.md # Image optimization report
│   ├── changelog-seo.md            # SEO changes log
│   └── notes-manual-tasks.md       # Manual task checklist
│
├── 📄 index.html                    # Main HTML file
├── 📄 robots.txt                    # SEO crawler rules
├── 📄 sitemap.xml                   # SEO sitemap
├── 📄 package.json                  # Dependencies & scripts
├── 📄 .env.example                  # Environment template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 vercel.json                   # Vercel deployment config
└── 📄 README.md                     # This file

```

---

## ⚡ Wydajność

### Image Optimization Results

| Image | Original | AVIF | WebP | JPEG | Oszczędność |
|-------|----------|------|------|------|-------------|
| about-bg.jpg | 214.6 KB | 91% | 93% | 92% | ~195 KB |
| portfolio-penthouse.jpg | 108.3 KB | 70% | 78% | 78% | ~85 KB |
| og-image.png | 53.6 KB | 94% | 93% | 91% | ~49 KB |

**Total:** 84 image variants wygenerowanych (7 obrazów × 4 rozmiary × 3 formaty)
**Total savings:** ~3.6 MB dla wszystkich obrazów

### CSS Optimization

```
Original:  69.54 KB (style.css)
Minified:  49.40 KB (style.min.css)
Saved:     20.14 KB (-29.15%)
```

### PageSpeed Insights (Estimated)

- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 90+
- **SEO:** 100

---

## 🔒 Bezpieczeństwo

### Implemented Security Measures

✅ **XSS Protection**
- DOMPurify sanitization (backend)
- Secure innerHTML usage
- Content Security Policy headers (Helmet)

✅ **CSRF Protection**
- Origin validation
- CORS configuration
- Rate limiting

✅ **Input Validation**
- Frontend validation
- Backend sanitization
- SQL injection prevention

✅ **API Security**
- Environment variables dla API keys
- Rate limiting (10 requests/15min)
- Timeout handling (45s)
- AbortController dla request cancellation

✅ **HTTP Security Headers** (Helmet)
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

---

## 📚 Dokumentacja

### Główne Dokumenty

- **[Technical Documentation](_docs/technical-documentation.md)** - Kompletna dokumentacja techniczna
- **[MCP Setup Guide](_docs/guide-mcp-setup.md)** - Przewodnik po Model Context Protocol
- **[SEO Configuration](_docs/guide-seo-configuration.md)** - Konfiguracja SEO (800+ linii)
- **[Image Optimization Report](_docs/report-image-optimization.md)** - Raport optymalizacji obrazów
- **[Scripts README](_scripts/README.md)** - Dokumentacja skryptów developerskich

### NPM Scripts

```bash
# Development
npm run dev                   # Start backend z auto-reload

# Testing (MCP)
npm test                      # Wszystkie testy MCP
npm run test:browser          # Browser MCP - basic test
npm run test:browser:seo      # SEO audit test
npm run test:browser:perf     # Performance test
npm run test:combined:full    # Complete audit

# Production
npm start                     # Start backend (production mode)
```

### Development Scripts

```bash
# Image Optimization
node _scripts/optimize-images.js

# CSS Minification
node _scripts/minify-css.js                    # One-time minify
node _scripts/auto-minify-css.js --watch       # Watch mode

# Git Hooks
node _scripts/setup-git-hooks.js               # Install pre-commit hooks
node _scripts/setup-git-hooks.js uninstall     # Remove hooks
```

---

## 🚀 Deployment

### Frontend (Static)

**Vercel / Netlify / GitHub Pages**
```bash
# Build nie jest wymagany - pure static files
# Po prostu deploy całego projektu

# Opcjonalnie: minifikacja CSS przed deploymentem
node _scripts/minify-css.js
```

### Backend (AI Atelier)

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel login
vercel

# Add environment variables w Vercel dashboard:
# GEMINI_API_KEY=your_key
# NODE_ENV=production
# ALLOWED_ORIGINS=https://your-domain.com
```

**Heroku**
```bash
heroku create neon-estate-api
heroku config:set GEMINI_API_KEY=your_key
heroku config:set NODE_ENV=production
git push heroku main
```

**Railway.app**
```bash
# Deploy przez Railway dashboard
# 1. Connect GitHub repo
# 2. Add environment variables
# 3. Deploy automatically
```

**VPS (Node.js)**
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start api/server.js --name neon-estate

# Setup auto-restart
pm2 startup
pm2 save
```

📖 **Szczegółowa dokumentacja deployment:** Zobacz [api/README.md](api/README.md)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### Proces Contribution

1. Fork projektu
2. Stwórz feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

### Code Style Guidelines

- **ES Modules** - Używaj `import`/`export` (nie `require()`)
- **Naming Convention** - camelCase dla zmiennych/funkcji, PascalCase dla klas
- **Comments** - JSDoc dla funkcji publicznych
- **Formatting** - Prettier/ESLint config (TODO: dodać)

---

## 📝 Licencja

**ISC License** © 2025 Neon Estate Concept

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

---

## 👨‍💻 Autor

**Concept & Development by DominDev**

- Senior Fullstack Developer & UI/UX Designer
- Focus: High-Performance Web & Brand Identity
- Portfolio: [domindev.com](https://domindev.com)

---

## 🙏 Acknowledgments

- **Google Gemini AI** - AI concept generation
- **Sharp** - Image optimization library
- **Font Awesome** - Icon library
- **Google Fonts** - Playfair Display & Manrope fonts
- **Unsplash** - High-quality stock photography

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ and ☕ by DominDev

</div>
