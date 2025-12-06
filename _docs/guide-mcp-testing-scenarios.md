# 🧪 MCP - Scenariusze Testowe i Przykłady Użycia

**Last Updated:** 2025-12-05
**Version:** 1.0

---

## 📑 Spis Treści

1. [Wprowadzenie](#wprowadzenie)
2. [Użycie Przez Claude Code Chat](#użycie-przez-claude-code-chat)
3. [Użycie Przez Skrypty Node.js](#użycie-przez-skrypty-nodejs)
4. [25 Scenariuszy Testowych](#25-scenariuszy-testowych)
5. [Troubleshooting](#troubleshooting)

---

## Wprowadzenie

Ten dokument zawiera **25 gotowych scenariuszy testowych** dla serwerów MCP zainstalowanych w projekcie Neon Estate.

### ✅ Status Serwerów:

| Serwer | Tools | Status |
|--------|-------|--------|
| **Browser MCP** | 12 tools | ✅ Działa |
| **GitMCP** | 4 tools | ✅ Działa |

---

## Użycie Przez Claude Code Chat

### 🎯 NAJŁATWIEJSZA METODA - Polecana!

Po prostu **skopiuj scenariusz i wklej do chatu z Claude Code**.

**Przykład:**
```
Używając Browser MCP, otwórz https://domindev.github.io/DominDev-Neon-Estate/ i zrób screenshot hero section
```

Claude automatycznie:
1. Użyje Browser MCP
2. Otworzy przeglądarkę
3. Zrobi screenshot
4. Pokaże wynik

### Zalety Metody Chat:
- ✅ Nie wymaga kodu
- ✅ Natychmiastowe wyniki
- ✅ Interaktywne - możesz pytać o szczegóły
- ✅ Działa z GitMCP (SSE transport)

---

## Użycie Przez Skrypty Node.js

### 🔧 DLA ZAAWANSOWANYCH - Automatyzacja i CI/CD

Jeśli chcesz **uruchamiać testy automatycznie** lub **w CI/CD**, użyj skryptów Node.js.

### Krok 1: Setup

```bash
# Zainstaluj zależności
npm install

# Wygeneruj wszystkie skrypty testowe
node _scripts/create-all-tests.js
```

### Krok 2: Uruchom Testy

```bash
# Wszystkie testy Browser MCP
npm test

# Pojedynczy test
npm run test:browser

# Konkretny test
npm run test:browser:seo
npm run test:browser:forms
```

### Dostępne Komendy:

| Komenda | Opis |
|---------|------|
| `npm test` | Wszystkie testy Browser MCP |
| `npm run test:browser` | Test #01: Basic navigation |
| `npm run test:browser:seo` | Test #02: SEO audit |
| `npm run test:browser:forms` | Test #03: Forms test |
| `npm run test:browser:mobile` | Test #04: Mobile menu |
| `npm run test:browser:sections` | Test #05: All sections |
| `npm run test:browser:links` | Test #06: Verify links |
| `npm run test:browser:perf` | Test #07: Performance |
| `npm run test:browser:ai` | Test #08: AI Atelier |
| `npm run test:browser:hover` | Test #09: Hover effects |
| `npm run test:browser:audit` | Test #10: Complete audit |

### Przykładowy Output:

```bash
$ npm run test:browser:seo

==================================================================
🧪 Running Test 02: SEO Audit
==================================================================

📌 Checking page title...
✅ Title
   Title: Neon Estate - Luksusowe Apartamenty Wrocław

📝 Checking meta description...
✅ Meta description
   Description: Studio architektury...

📊 Checking H1 tags...
✅ H1 tags
   H1s: ['Neon Estate']

🖼️ Checking images alt texts...
✅ Images alt
   Images without alt: 0

✅ SEO Audit completed!
```

### ⚠️ Ważne Uwagi o Skryptach:

1. **Browser MCP only** - Skrypty Node.js działają tylko z Browser MCP (stdio transport)
2. **GitMCP wymaga chatu** - GitMCP używa SSE transport, więc użyj Claude Code chat
3. **Chrome extension required** - Browser MCP wymaga rozszerzenia Chrome

---

## 25 Scenariuszy Testowych

### 🌐 Browser MCP (01-10)

#### **Scenariusz 01: Basic Navigation** 🚀

**Chat:**
```
Używając Browser MCP, otwórz https://domindev.github.io/DominDev-Neon-Estate/ i zrób screenshot hero section
```

**Skrypt:**
```bash
npm run test:browser
```

---

#### **Scenariusz 02: SEO Audit** 📊

**Chat:**
```
Używając Browser MCP, wyekstraktuj z neon-estate: title, meta description, wszystkie H1 i H2, alt texty obrazów
```

**Skrypt:**
```bash
npm run test:browser:seo
```

---

#### **Scenariusz 03: Contact Form Test** 📋

**Chat:**
```
Używając Browser MCP, przetestuj formularz kontaktowy na neon-estate - wypełnij testowymi danymi ale NIE wysyłaj
```

**Skrypt:**
```bash
npm run test:browser:forms
```

---

#### **Scenariusz 04: Mobile Menu** 📱

**Chat:**
```
Używając Browser MCP, zmień viewport na 375x667px, kliknij hamburger menu i sprawdź czy kontakty są widoczne
```

**Skrypt:**
```bash
npm run test:browser:mobile
```

---

#### **Scenariusz 05: All Sections Screenshots** 🎨

**Chat:**
```
Używając Browser MCP, zrób screenshoty wszystkich głównych sekcji: HERO, ABOUT, OFERTA, PORTFOLIO, AI ATELIER, KONTAKT
```

**Skrypt:**
```bash
npm run test:browser:sections
```

---

#### **Scenariusz 06: Verify Links** 🔗

**Chat:**
```
Używając Browser MCP, wyekstraktuj wszystkie linki z neon-estate i sprawdź które są wewnętrzne a które zewnętrzne
```

**Skrypt:**
```bash
npm run test:browser:links
```

---

#### **Scenariusz 07: Performance Test** ⚡

**Chat:**
```
Używając Browser MCP, zmierz czas ładowania strony i sprawdź czy wszystkie obrazy się załadowały
```

**Skrypt:**
```bash
npm run test:browser:perf
```

---

#### **Scenariusz 08: AI Atelier Test** 🤖

**Chat:**
```
Używając Browser MCP, wypełnij formularz AI Atelier (apartament, Wrocław, nowoczesny) i kliknij generuj
```

**Skrypt:**
```bash
npm run test:browser:ai
```

---

#### **Scenariusz 09: Hover Effects** 🖱️

**Chat:**
```
Używając Browser MCP, znajdź wszystkie przyciski CTA i zrób screenshoty w stanie hover
```

**Skrypt:**
```bash
npm run test:browser:hover
```

---

#### **Scenariusz 10: Complete Browser Audit** 📊

**Chat:**
```
Używając Browser MCP, wykonaj pełen audit: SEO, UX, wydajność, linki - strukturalny raport
```

**Skrypt:**
```bash
npm run test:browser:audit
```

---

### 📚 GitMCP (11-17)

**⚠️ GitMCP wymaga Claude Code chat (SSE transport)**

#### **Scenariusz 11: Dokumentacja Projektu**

```
Używając GitMCP, pobierz główną dokumentację i podsumuj: typ projektu, technologie, funkcje, struktura
```

---

#### **Scenariusz 12: Search w Docs**

```
Używając GitMCP, wyszukaj w dokumentacji: implementacja SEO, bezpieczeństwo, responsywność, konfiguracja MCP
```

---

#### **Scenariusz 13: Code Search**

```
Używając GitMCP, znajdź w kodzie: mobile menu toggle, formularz kontaktowy, smooth scroll. Podaj: plik, opis, linie
```

---

#### **Scenariusz 14: Struktura Projektu**

```
Używając GitMCP, opisz strukturę katalogów, główne pliki, lokalizację assets, API i dokumentacji
```

---

#### **Scenariusz 15: Lista Dokumentacji**

```
Używając GitMCP, wylistuj wszystkie pliki w _docs/ z opisami
```

---

#### **Scenariusz 16: Analiza Bezpieczeństwa**

```
Używając GitMCP, opisz wszystkie mechanizmy bezpieczeństwa: XSS, headers, rate limiting, .env
```

---

#### **Scenariusz 17: SEO Changelog**

```
Używając GitMCP, otwórz SEO-CHANGELOG i podsumuj wszystkie optymalizacje
```

---

### 🔄 Combined (18-25)

**⚠️ Wymagają zarówno Browser MCP jak i GitMCP**

#### **Scenariusz 18: Test + Dokumentacja**

```
Browser MCP: Przetestuj formularz kontaktowy
GitMCP: Sprawdź jak powinien działać wg dokumentacji
Porównaj i raportuj rozbieżności
```

---

#### **Scenariusz 19: Design System**

```
GitMCP: Znajdź CSS variables (kolory, typografia, breakpoints)
Browser MCP: Zrób screenshoty pokazujące te elementy
Porównaj kod vs wizual
```

---

#### **Scenariusz 20: Pre-Deployment Checklist** 🚀

```
GitMCP: Status MANUAL-TASKS i code review
Browser MCP: Test wszystkich sekcji, formularza, mobile, linków
Checklist ✅/❌
```

---

#### **Scenariusz 21: Documentation Review**

```
GitMCP: Lista _docs/ - czy aktualne?
Browser MCP: Czy strona zgadza się z docs?
Raport: Docs vs Reality
```

---

#### **Scenariusz 22: Security Audit**

```
GitMCP: Jakie są zabezpieczenia w kodzie?
Browser MCP: Test XSS, sprawdź security headers w network tab
Raport bezpieczeństwa
```

---

#### **Scenariusz 23: Performance Analysis**

```
GitMCP: Optymalizacje performance z dokumentacji
Browser MCP: Zmierz rzeczywistą wydajność
Porównaj expected vs actual
```

---

#### **Scenariusz 24: Accessibility Check** ♿

```
GitMCP: WCAG requirements z code review
Browser MCP: Test skip link, focus-visible, aria attributes
Raport accessibility
```

---

#### **Scenariusz 25: Complete Site Audit** 🎯

```
GitMCP: Wszystkie rekomendacje z analysis-code-review-website.md
Browser MCP: Weryfikacja każdej rekomendacji na żywej stronie
Pełen raport implementacji
```

---

## Troubleshooting

### ❌ Browser MCP nie działa?

**Chat:**
```
Sprawdź status Browser MCP w panelu MCP VSCode
```

**Skrypt:**
```bash
# Sprawdź czy Node.js działa
node --version

# Sprawdź czy extension Chrome jest zainstalowany
chrome://extensions/
```

### ❌ GitMCP nie znajduje plików?

```
Sprawdź czy repozytorium jest publiczne:
https://github.com/DominDev/DominDev-Neon-Estate
```

### ❌ Test timeout?

**W chacie:**
```
Poczekaj 10 sekund na pełne załadowanie strony przed wykonaniem testu
```

**W skrypcie:**
```javascript
await waitForLoad(client, 10000); // 10 sekund
```

---

## 💡 Pro Tips

### Tip 1: Zawsze Użyj Chatu dla GitMCP

GitMCP używa SSE transport - **zawsze użyj Claude Code chat** zamiast skryptów.

### Tip 2: Skrypty dla Automatyzacji

Użyj skryptów Node.js dla:
- ✅ Powtarzalnych testów
- ✅ CI/CD pipelines
- ✅ Scheduled testing
- ✅ Batch operations

### Tip 3: Chat dla Eksploracji

Użyj chatu dla:
- ✅ Ad-hoc testowania
- ✅ Debugging
- ✅ Interaktywnej analizy
- ✅ GitMCP queries

### Tip 4: Łącz Oba Podejścia

```bash
# Uruchom automated tests
npm run test:browser:seo

# Potem zapytaj Claude w chacie:
"Porównaj wyniki testu SEO z dokumentacją w _docs/guide-seo-configuration.md"
```

---

## 📚 Więcej Informacji

- **Setup Guide**: [guide-mcp-setup.md](./guide-mcp-setup.md)
- **Scripts README**: [../_scripts/README.md](../_scripts/README.md)
- **Browser MCP Docs**: https://docs.browsermcp.io
- **GitMCP Docs**: https://gitmcp.io/docs

---

**Happy Testing!** 🚀

Masz pytania? Po prostu zapytaj Claude - ma dostęp do pełnej dokumentacji przez GitMCP! 😊
