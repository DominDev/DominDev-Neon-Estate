# Neon Estate | Luxury Real Estate Concept

**"Architektura... W Nowym Świetle"**

High-Performance Luxury Real Estate Platform Concept. Projekt badawczy interfejsu (UI/UX) symulujący architekturę Headless dla segmentu premium.

---

## 💎 O Projekcie

**Neon Estate** to koncept strony dla luksusowej agencji nieruchomości, gdzie priorytetem jest połączenie wizualnego bogactwa (zdjęcia 4K, kinowe efekty) z błyskawicznym działaniem (Performance First).

Projekt demonstruje estetykę "Neon Luxury" – połączenie głębokiego grafitu, klasycznej typografii i nowoczesnych, złotych akcentów świetlnych, odchodząc od standardowych szablonów.

---

## 🌟 Kluczowe Funkcje (UX & UI)

- **AI Atelier**: Generator konceptów architektonicznych powered by Google Gemini AI z pełnym backendem Node.js
- **Cinematic Experience**: Płynne animacje wejścia (Progressive Reveal) sterowane przez Intersection Observer.
- **Atmospheric Design**: Tła z animowanymi liniami architektonicznymi, efekt "Glass Prism" i subtelna poświata (Ambient Glow).
- **Micro-interactions**: Customowy kursor ("Diamond Precision") oraz interaktywne elementy reagujące złotą poświatą.
- **Performance Simulation**: Symulacja asynchronicznego ładowania danych (Mock API) typowego dla architektury Headless.
- **Mobile First**: Pełna responsywność (RWD) z dedykowanym menu mobilnym i optymalizacją pod dotyk.

---

## 🛠️ Stack Technologiczny

### Frontend:
- **HTML5**, **CSS3** (Variables, Keyframe Animations, Flexbox/Grid)
- **JavaScript**: Vanilla ES6+ (z pełną obsługą async/await, AbortController)
- **Icons**: Font Awesome 6
- **Fonts**: Playfair Display (Serif) & Manrope (Sans-serif)

### Backend (AI Atelier):
- **Node.js** v18+ z Express.js
- **Google Gemini AI** - Generowanie konceptów architektonicznych
- **Security**: DOMPurify (XSS protection), Helmet, CORS, Rate Limiting
- **Deployment Ready**: Vercel, Heroku, Railway, VPS

### Intended Production Stack (Planowana Architektura):
- **Frontend**: Next.js / React
- **Backend**: WordPress (Headless CMS via WPGraphQL) + Node.js API
- **Styling**: Tailwind CSS

---

## 🚀 Jak uruchomić?

### Frontend (Static)

Projekt jest **"zero-dependency"** dla frontendu – nie wymaga instalacji Node.js do podglądu.

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/DominDev/DominDev-Neon-Estate.git
   cd DominDev-Neon-Estate
   ```

2. Otwórz plik `index.html` w dowolnej przeglądarce lub użyj Live Server.

### Backend (AI Atelier)

**Wymagania:** Node.js v18+

1. Zainstaluj zależności:
   ```bash
   npm install
   ```

2. Skonfiguruj environment:
   ```bash
   cp .env.example .env
   # Edytuj .env i dodaj GEMINI_API_KEY
   ```

3. Uruchom serwer:
   ```bash
   npm run dev
   ```

4. Backend będzie dostępny na: `http://localhost:3000`

**📖 Pełna dokumentacja backend:** Zobacz [api/README.md](api/README.md) dla szczegółowych instrukcji deployment (Vercel, Heroku, VPS).

---

## 📂 Struktura Plików

```
DominDev-Neon-Estate/
├── api/                       # Backend Node.js (AI Atelier)
│   ├── config/
│   │   └── env.js            # Environment configuration
│   ├── middleware/
│   │   ├── error-handler.js  # Error handling
│   │   ├── rate-limiter.js   # Rate limiting
│   │   └── validator.js      # Input validation
│   ├── routes/
│   │   └── ai-atelier.js     # AI Atelier endpoints
│   ├── utils/
│   │   ├── http-client.js    # Fetch with timeout
│   │   └── sanitizer.js      # DOMPurify XSS protection
│   ├── server.js             # Main server file
│   └── README.md             # Backend documentation
├── assets/
│   ├── css/
│   │   └── style.css         # Style główne projektu
│   ├── js/
│   │   └── main.js           # Logika JavaScript + API integration
│   ├── images/
│   │   └── gallery/          # Zdjęcia nieruchomości
│   └── fonts/                # Własne fonty (opcjonalnie)
├── data/                     # Mock API / JSON dane
├── _docs/                    # Dokumentacja analiz
├── index.html                # Główny plik HTML
├── package.json              # Node.js dependencies
├── .env.example              # Example environment variables
├── vercel.json               # Vercel deployment config
├── robots.txt                # SEO - crawlers config
├── sitemap.xml               # SEO - mapa strony
├── .gitignore                # Ignorowane pliki
└── README.md                 # Dokumentacja projektu
```

---

## 👨‍💻 Autor

**Concept & Development by DominDev**

- Senior Fullstack Developer & UI/UX Designer
- Focus: High-Performance Web & Brand Identity

---

© 2025 Neon Estate Concept. Projekt stworzony w celach demonstracyjnych.
