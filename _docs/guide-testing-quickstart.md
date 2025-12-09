# 🚀 MCP Testing - Quick Start Guide

**2 minuty do pierwszego testu MCP!**

---

## 🎯 Wybierz Metodę

### Metoda 1: Claude Code Chat (NAJŁATWIEJSZA) ⭐

**Dla kogo:** Wszyscy, zero konfiguracji

**Jak uruchomić:**
1. Otwórz chat z Claude Code
2. Wklej scenariusz:
```
Używając Browser MCP, otwórz https://domindev.github.io/DominDev-Neon-Estate/ i zrób screenshot hero section
```
3. Gotowe! ✅

---

### Metoda 2: Skrypty Node.js (AUTOMATYZACJA) 🔧

**Dla kogo:** Developerzy, CI/CD, powtarzalne testy

**Jak uruchomić:**

```bash
# Krok 1: Zainstaluj zależności
npm install

# Krok 2: Wygeneruj skrypty testowe
node _scripts/create-all-tests.js

# Krok 3: Uruchom pierwszy test
npm run test:browser
```

**Gotowe!** ✅

---

## 📋 Dostępne Testy (Skrypty)

```bash
# Browser MCP Tests
npm run test:browser              # 01: Navigation + screenshot
npm run test:browser:seo          # 02: SEO audit
npm run test:browser:forms        # 03: Contact form
npm run test:browser:mobile       # 04: Mobile menu
npm run test:browser:sections     # 05: All sections
npm run test:browser:links        # 06: Verify links
npm run test:browser:perf         # 07: Performance
npm run test:browser:ai           # 08: AI Atelier
npm run test:browser:hover        # 09: Hover effects
npm run test:browser:audit        # 10: Complete audit

# Wszystkie testy naraz
npm test
```

---

## 💡 Przykładowe Scenariusze (Chat)

### Test SEO:
```
Używając Browser MCP, wyekstraktuj z neon-estate: title, meta description, H1, H2, alt texty
```

### Test Formularza:
```
Używając Browser MCP, przetestuj formularz kontaktowy - wypełnij testowymi danymi (NIE wysyłaj)
```

### Test GitMCP:
```
Używając GitMCP, wylistuj wszystkie pliki dokumentacji w _docs/
```

### Combined Test:
```
Browser MCP: Test formularza kontaktowego
GitMCP: Jak formularz powinien działać wg docs?
Porównaj rzeczywistość vs dokumentacja
```

---

## ⚠️ Wymagania

### Dla Browser MCP:
- ✅ Node.js 18+ zainstalowany
- ✅ Rozszerzenie Chrome: [Browser MCP](https://chromewebstore.google.com/detail/browser-mcp/)
- ✅ Chrome otwarty

### Dla GitMCP:
- ✅ Nic! Działa od razu w chacie 😊

---

## 🐛 Problemy?

### "npm install" nie działa?
```bash
# Sprawdź Node.js
node --version  # Powinno być v18+
```

### Browser MCP nie łączy?
1. Zainstaluj rozszerzenie Chrome
2. Otwórz Chrome przed testem
3. Zrestartuj VSCode

### GitMCP nie działa?
Użyj **tylko przez chat** - GitMCP używa SSE transport

---

## 📚 Pełna Dokumentacja

- **Setup**: [_docs/guide-mcp-setup.md](_docs/guide-mcp-setup.md)
- **Scenariusze**: [_docs/guide-mcp-testing-scenarios.md](_docs/guide-mcp-testing-scenarios.md)
- **Skrypty**: [_scripts/README.md](_scripts/README.md)

---

## 🎯 Następne Kroki

1. ✅ Wypróbuj pierwszy test (chat LUB skrypt)
2. ✅ Sprawdź wyniki
3. ✅ Przeczytaj pełną dokumentację
4. ✅ Dostosuj testy do swoich potrzeb

---

**Powodzenia!** 🚀

Pytania? Zapytaj Claude - ma dostęp do całej dokumentacji! 😊
