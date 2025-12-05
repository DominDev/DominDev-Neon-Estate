# Neon Estate - Backend API Documentation

## 📖 Spis Treści

1. [Przegląd](#przegląd)
2. [Szybki Start](#szybki-start)
3. [Struktura Projektu](#struktura-projektu)
4. [Deployment](#deployment)
5. [Konfiguracja](#konfiguracja)
6. [Endpointy API](#endpointy-api)
7. [Bezpieczeństwo](#bezpieczeństwo)
8. [Troubleshooting](#troubleshooting)

---

## 🎨 Przegląd

Backend API dla **Neon Estate AI Atelier** - bezpieczny serwer do generowania konceptów architektonicznych za pomocą Google Gemini AI.

### Technologie:
- **Node.js** (v18+)
- **Express.js** - Framework webowy
- **Google Gemini API** - AI do generowania treści
- **DOMPurify** - Ochrona XSS
- **Helmet** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Ochrona przed nadużyciem

---

## 🚀 Szybki Start

### 1. Instalacja

```bash
# W głównym katalogu projektu
npm install
```

### 2. Konfiguracja

```bash
# Skopiuj przykładowy plik .env
cp .env.example .env

# Edytuj .env i wypełnij wymagane wartości
# NAJWAŻNIEJSZE: GEMINI_API_KEY
```

**Jak uzyskać klucz API Gemini:**
1. Przejdź do: https://makersuite.google.com/app/apikey
2. Zaloguj się kontem Google
3. Kliknij "Create API Key"
4. Skopiuj klucz i wklej do `.env` jako `GEMINI_API_KEY`

### 3. Uruchomienie (Development)

```bash
# Uruchom serwer z auto-reload
npm run dev

# Serwer będzie dostępny na: http://localhost:3000
```

### 4. Test

Otwórz przeglądarkę i przejdź do:
- `http://localhost:3000` - Health check
- `http://localhost:3000/api/ai-atelier/health` - API health

---

## 📁 Struktura Projektu

```
api/
├── config/
│   └── env.js              # Konfiguracja environment variables
├── middleware/
│   ├── error-handler.js    # Centralne zarządzanie błędami
│   ├── rate-limiter.js     # Rate limiting (ochrona przed spam)
│   └── validator.js        # Walidacja inputu
├── routes/
│   └── ai-atelier.js       # Endpointy AI Atelier
├── utils/
│   ├── http-client.js      # Fetch z timeout i retry
│   └── sanitizer.js        # DOMPurify sanityzacja (XSS protection)
├── server.js               # Main server file
└── README.md               # Ta dokumentacja
```

---

## 🌐 Deployment

### Opcja 1: Vercel (Zalecane - Darmowe dla hobby)

#### A. Przez CLI:

```bash
# Zainstaluj Vercel CLI
npm install -g vercel

# Deploy
vercel

# Po pierwszym deploy, ustaw environment variables w dashboard:
# https://vercel.com/dashboard -> Project -> Settings -> Environment Variables

# Deploy produkcyjny
vercel --prod
```

#### B. Przez GitHub:

1. Push kod do GitHub
2. Połącz repository z Vercel: https://vercel.com/new
3. Ustaw environment variables w Vercel dashboard
4. Deploy automatyczny po każdym push

**⚠️ WAŻNE - Konfiguracja Vercel:**

Utwórz plik `vercel.json` w głównym katalogu:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/server.js"
    }
  ]
}
```

### Opcja 2: Heroku

```bash
# Login do Heroku
heroku login

# Utwórz aplikację
heroku create neon-estate-backend

# Ustaw environment variables
heroku config:set GEMINI_API_KEY=your_api_key_here
heroku config:set NODE_ENV=production
heroku config:set ALLOWED_ORIGINS=https://neon-estate.com

# Deploy
git push heroku main
```

### Opcja 3: Railway

1. Połącz GitHub repo z Railway: https://railway.app
2. Ustaw environment variables w dashboard
3. Deploy automatyczny

### Opcja 4: VPS (DigitalOcean, Linode, AWS EC2)

```bash
# Na serwerze
git clone your-repo-url
cd DominDev-Neon-Estate
npm install
npm start

# Użyj PM2 dla production
npm install -g pm2
pm2 start api/server.js --name neon-estate-api
pm2 save
pm2 startup
```

---

## ⚙️ Konfiguracja

### Environment Variables (.env)

| Zmienna | Wymagana | Domyślnie | Opis |
|---------|----------|-----------|------|
| `GEMINI_API_KEY` | ✅ Tak | - | Klucz API Google Gemini |
| `PORT` | ❌ Nie | 3000 | Port serwera |
| `NODE_ENV` | ❌ Nie | development | Environment (development/production) |
| `ALLOWED_ORIGINS` | ❌ Nie | localhost | Dozwolone originy CORS (oddziel przecinkami) |
| `RATE_LIMIT_MAX_REQUESTS` | ❌ Nie | 10 | Max requestów na IP w oknie czasu |
| `RATE_LIMIT_WINDOW_MS` | ❌ Nie | 900000 | Okno czasu (15 min) |

### Frontend Integration

**1. Zaktualizuj URL w `assets/js/main.js`:**

```javascript
// Development
const API_BASE_URL = 'http://localhost:3000';

// Production (przykład Vercel)
const API_BASE_URL = 'https://neon-estate-backend.vercel.app';
```

**2. Upewnij się, że CORS jest skonfigurowany:**

W `.env` ustaw:
```
ALLOWED_ORIGINS=https://neon-estate.com,https://www.neon-estate.com
```

---

## 📡 Endpointy API

### 1. Health Check

```http
GET /
```

**Response:**
```json
{
  "success": true,
  "message": "Neon Estate Backend API",
  "version": "1.0.0",
  "status": "operational"
}
```

---

### 2. Generate Concept

```http
POST /api/ai-atelier/generate-concept
Content-Type: application/json
```

**Request Body:**
```json
{
  "projectType": "Penthouse",
  "location": "Warszawa",
  "description": "Przestronny salon z widokiem na panoramę miasta..."
}
```

**Validacja:**
- `projectType`: wymagane, string, max 100 znaków
- `location`: wymagane, string, max 100 znaków
- `description`: wymagane, string, 10-1000 znaków

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "concept": "<p>Wygenerowany koncept w HTML...</p>",
    "generatedAt": "2025-12-05T00:00:00.000Z"
  }
}
```

**Response (Error - 400/429/500):**
```json
{
  "success": false,
  "error": "Opis błędu po polsku"
}
```

**Rate Limiting:**
- Max 10 requestów na IP w 15 minut
- Header `RateLimit-Remaining` pokazuje pozostałe requesty
- Status 429 gdy przekroczony limit

---

### 3. API Health

```http
GET /api/ai-atelier/health
```

**Response:**
```json
{
  "success": true,
  "status": "operational",
  "timestamp": "2025-12-05T00:00:00.000Z",
  "geminiModel": "gemini-2.5-flash-preview-09-2025"
}
```

---

## 🔒 Bezpieczeństwo

### Zaimplementowane zabezpieczenia:

1. **API Key Protection**
   - Klucz API tylko w `.env` (nigdy w kodzie frontend)
   - `.gitignore` blokuje commity `.env`

2. **XSS Protection**
   - DOMPurify sanityzacja wszystkich AI responses
   - Tylko bezpieczne HTML tagi dozwolone

3. **Rate Limiting**
   - Ochrona przed spam i nadużyciem API
   - Osobne limity dla różnych endpointów

4. **CORS**
   - Tylko whitelisted origins
   - Blokowanie nieautoryzowanych źródeł

5. **Input Validation**
   - Walidacja i sanityzacja wszystkich inputów
   - Limity długości pól

6. **Security Headers (Helmet)**
   - X-Content-Type-Options
   - X-Frame-Options
   - Strict-Transport-Security

7. **Timeout Protection**
   - AbortController z timeoutem
   - Zapobiega wiszącom requestom

8. **Error Handling**
   - Nie ujawnia szczegółów implementacji
   - Przyjazne komunikaty dla użytkownika

---

## 🐛 Troubleshooting

### Problem: "Missing required environment variables: GEMINI_API_KEY"

**Rozwiązanie:**
```bash
# Sprawdź czy istnieje plik .env
ls -la .env

# Jeśli nie, skopiuj z .env.example
cp .env.example .env

# Edytuj i dodaj klucz API
nano .env  # lub inny edytor
```

---

### Problem: "Not allowed by CORS"

**Rozwiązanie:**
```bash
# Dodaj origin frontend do .env
echo "ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500" >> .env

# Zrestartuj serwer
npm run dev
```

---

### Problem: "Failed to fetch" w frontend

**Możliwe przyczyny:**
1. Backend nie jest uruchomiony
2. Zły URL w `API_BASE_URL`
3. CORS nie jest skonfigurowany

**Rozwiązanie:**
```bash
# 1. Sprawdź czy backend działa
curl http://localhost:3000

# 2. Sprawdź URL w main.js
grep API_BASE_URL assets/js/main.js

# 3. Sprawdź CORS w .env
grep ALLOWED_ORIGINS .env
```

---

### Problem: "Rate limit exceeded"

**Rozwiązanie:**
Poczekaj 15 minut lub zmień limity w `.env`:
```
RATE_LIMIT_MAX_REQUESTS=20
RATE_LIMIT_WINDOW_MS=900000
```

---

### Problem: "Request timeout"

**Rozwiązanie:**
Zwiększ timeout w `.env`:
```
GEMINI_TIMEOUT_MS=60000  # 60 sekund
```

---

## 📞 Support

Jeśli napotkasz problemy:

1. Sprawdź logi serwera (`npm run dev`)
2. Sprawdź console w przeglądarce (F12)
3. Sprawdź dokumentację Gemini API: https://ai.google.dev/docs
4. Sprawdź status Gemini API: https://status.cloud.google.com

---

## 📄 License

ISC License - Neon Estate 2025
