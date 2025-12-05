# 🔌 MCP (Model Context Protocol) - Przewodnik Instalacji i Konfiguracji

**Last Updated:** 2025-12-05
**Version:** 1.0

---

## 📑 Spis Treści

1. [Czym jest MCP?](#czym-jest-mcp)
2. [Jak działa MCP?](#jak-działa-mcp)
3. [Kluczowe Koncepcje](#kluczowe-koncepcje)
4. [Browser MCP](#browser-mcp)
5. [GitMCP](#gitmcp)
6. [Instalacja i Konfiguracja](#instalacja-i-konfiguracja)
7. [Jak Korzystać z MCP](#jak-korzystać-z-mcp)
8. [Rozwiązywanie Problemów](#rozwiązywanie-problemów)
9. [Bezpieczeństwo](#bezpieczeństwo)
10. [Źródła](#źródła)

---

## Czym jest MCP?

**MCP (Model Context Protocol)** to **otwarty standard dla integracji narzędzi AI** stworzony przez Anthropic. Działa jak uniwersalny mostek łączący Claude Code (i inne aplikacje AI) z setkami zewnętrznych narzędzi, baz danych i API przez znormalizowane interfejsy.

### Główne Możliwości:

- 🎯 **Issue Trackers**: GitHub, JIRA, Linear
- 📊 **Monitoring**: Sentry, Datadog
- 🗄️ **Bazy Danych**: PostgreSQL, MySQL, MongoDB
- 🎨 **Design Tools**: Figma, Adobe XD
- 💬 **Komunikacja**: Email, Slack
- 🌐 **Przeglądarka**: Automatyzacja przeglądarki
- 📁 **Git**: Dostęp do repozytoriów GitHub
- 🔧 **Custom Scripts**: Własne narzędzia lokalne

---

## Jak Działa MCP?

```
┌─────────────────┐
│   Claude Code   │
│   (AI Client)   │
└────────┬────────┘
         │
         │ MCP Protocol
         │ (standardized)
         │
         ▼
┌─────────────────────────────────┐
│      MCP Server                 │
│  ┌──────────┬──────────────┐   │
│  │  Tools   │  Resources   │   │
│  │ (Actions)│  (Data)      │   │
│  └──────────┴──────────────┘   │
└─────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  External Services/APIs         │
│  (GitHub, Browser, DB, etc.)    │
└─────────────────────────────────┘
```

### Proces Działania:

1. **Serwer MCP** eksportuje funkcje (tools) i dane (resources)
2. **Claude Code** uzyskuje dostęp do tych możliwości
3. **Użytkownik** może odwoływać się do danych zewnętrznych używając `@mentions`
4. **Claude** automatycznie wywołuje narzędzia gdy jest to pomocne
5. **Prompts** z MCP mogą być używane jako slash commands

---

## Kluczowe Koncepcje

### 1. MCP Servers

Backend'owe usługi implementujące standard MCP. Mogą być:

| Typ | Opis | Użycie |
|-----|------|--------|
| **HTTP Servers** | Zdalne serwery w chmurze | Zewnętrzne usługi (GitHub, Figma, SaaS) |
| **Stdio Servers** | Lokalne procesy na maszynie | Custom scripts, narzędzia lokalne |
| **SSE Servers** | Server-Sent Events (legacy) | Starsze implementacje (HTTP teraz preferowane) |

### 2. Tools (Narzędzia)

Funkcje/akcje które Claude może wywoływać przez serwer MCP:

- Tworzenie issue w GitHub
- Wykonywanie zapytań SQL
- Wywoływanie API calls
- Uruchamianie custom scripts
- Automatyzacja przeglądarki

**Przykład:** Browser MCP eksportuje narzędzia do nawigacji web, wypełniania formularzy, ekstrakcji danych.

### 3. Resources (Zasoby)

Zewnętrzne dane które Claude może referować i analizować:

- GitHub issues/PRs
- Rekordy bazodanowe
- Pliki projektowe
- Dokumentacja kodu

**Użycie:** Odwołujesz się do resources używając `@mentions`:
```
@github:issue://123
@postgres:table://users
@figma:file://xyz
```

### 4. Prompts (Szablony)

Pre-skonfigurowane instrukcje lub szablony eksponowane przez serwery MCP, które:
- Mogą być używane jako slash commands
- Pojawiają się jako auto-suggestions
- Pomagają standaryzować jak Claude podchodzi do typowych zadań

### 5. Configuration Scopes (Zakresy Konfiguracji)

MCP serwery mogą być skonfigurowane na trzech poziomach:

| Scope | Lokalizacja | Przypadek Użycia |
|-------|-------------|------------------|
| **Local** | `~/.claude.json` | Konfiguracje osobiste, specyficzne dla projektu |
| **Project** | `.mcp.json` | Współpraca zespołowa (wersjonowane w git) |
| **User** | `~/.claude.json` | Narzędzia osobiste używane w wielu projektach |

---

## Browser MCP

### 🎯 Czym Jest Browser MCP?

**Browser MCP** to serwer MCP + rozszerzenie Chrome pozwalające na **automatyzację przeglądarki** przez aplikacje AI jak VS Code, Claude, Cursor i Windsurf.

### ⚡ Kluczowe Cechy:

- **⚡ Szybki**: Lokalna automatyzacja bez opóźnień sieciowych
- **🔒 Prywatny**: Aktywność przeglądarki pozostaje na urządzeniu
- **👤 Zalogowany**: Używa istniejącego profilu przeglądarki i sesji
- **🥷 Stealth**: Używa prawdziwego fingerprint przeglądarki (unikanie detekcji botów)

### 🛠️ Narzędzia (Tools) Eksponowane przez Browser MCP:

Browser MCP eksportuje narzędzia do:
- **Nawigacji web** (otwieranie URL, klikanie linków)
- **Wypełniania formularzy** (input text, checkboxes, submit)
- **Ekstrakcji danych** (scraping, pobieranie zawartości)
- **Automatyzacji workflow** (sekwencje akcji)
- **Wykonywania JavaScript** na stronach

### 📋 Wymagania Systemowe:

- **Node.js** (najnowsza wersja LTS)
- **Google Chrome** lub **Chromium**
- **System operacyjny**: Windows, macOS, Linux

### 🔧 Instalacja Browser MCP:

#### Krok 1: Instalacja Serwera MCP

```bash
# Uruchom serwer MCP bezpośrednio (nie wymaga instalacji globalnej)
npx @browsermcp/mcp@latest
```

#### Krok 2: Konfiguracja w Claude Code

W Claude Code dodaj konfigurację MCP:

```bash
# Dodaj serwer MCP w Claude Code
claude mcp add --transport stdio browsermcp -- npx @browsermcp/mcp@latest
```

**Lub** ręcznie edytuj `~/.claude.json`:

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    }
  }
}
```

#### Krok 3: Instalacja Rozszerzenia Chrome

1. Odwiedź [Browser MCP Chrome Extension](https://chromewebstore.google.com/detail/browser-mcp/)
2. Kliknij "Add to Chrome"
3. Potwierdź uprawnienia
4. Rozszerzenie pojawi się w pasku narzędzi Chrome

#### Krok 4: Weryfikacja

```bash
# Sprawdź status serwera w Claude Code
/mcp
```

Powinieneś zobaczyć "browsermcp" na liście aktywnych serwerów.

### 📖 Przykłady Użycia Browser MCP:

```plaintext
Użytkownik: "Navigate to https://github.com/anthropics/claude-code and extract all issue titles"

Claude używa Browser MCP do:
1. Otworzenia URL w przeglądarce
2. Zidentyfikowania issue titles na stronie
3. Ekstrakcji tekstu
4. Zwrócenia listy tytułów
```

```plaintext
Użytkownik: "Fill out the contact form on neon-estate.com with test data"

Claude używa Browser MCP do:
1. Otworzenia strony kontaktowej
2. Zlokalizowania pól formularza
3. Wypełnienia testowymi danymi
4. Opcjonalnie: submit formularza (jeśli zażądane)
```

### ⚠️ Znane Problemy:

- **Claude Desktop**: Obecnie bug powodujący podwójną inicjalizację serwerów MCP (pojawią się błędy, ale serwer działa normalnie)

### 🔗 Browser MCP Resources:

- **Website**: [https://browsermcp.io](https://browsermcp.io)
- **Documentation**: [https://docs.browsermcp.io](https://docs.browsermcp.io)
- **GitHub**: [https://github.com/BrowserMCP/mcp](https://github.com/BrowserMCP/mcp)

---

## GitMCP

### 🎯 Czym Jest GitMCP?

**GitMCP** to **darmowy, open-source, zdalny serwer MCP** transformujący dowolny projekt GitHub (repozytoria lub GitHub Pages) w **hub dokumentacji** dostępny dla AI. Eliminuje halucynacje kodu przez dostęp do aktualnej dokumentacji.

### ⚡ Kluczowe Cechy:

- **🚀 Zero instalacji**: Działa w chmurze, bez pobierania
- **🔓 Bez autentykacji**: Dla publicznych repozytoriów
- **📚 Smart documentation**: Priorytetyzuje `llms.txt` > project docs > `README.md`
- **🔍 Code search**: Wyszukiwanie w kodzie przez GitHub API
- **🌐 Uniwersalny**: Działa z dowolnym publicznym repozytorium GitHub

### 🛠️ Narzędzia (Tools) Eksponowane przez GitMCP:

GitMCP eksportuje 4 główne narzędzia:

| Tool | Opis |
|------|------|
| **Fetch Documentation** | Pobiera główną dokumentację projektu (priorytet: llms.txt, potem README) |
| **Search Documentation** | Inteligentnie wyszukuje w dokumentacji projektu |
| **Fetch URL Content** | Ekstraktuje i konwertuje zawartość zewnętrznych linków w docs |
| **Search Code** | Wyszukuje w rzeczywistym kodzie repozytorium (GitHub code search) |

### 📋 Wymagania Systemowe:

- **Brak** - działa w chmurze!
- Wymaga tylko **MCP-kompatybilnego klienta AI** (Claude Code, Cursor, Windsurf, VSCode)

### 🔧 Instalacja GitMCP:

#### Metoda 1: Specyficzne Repozytorium (Zalecana dla pojedynczego projektu)

```bash
# Claude Code
claude mcp add --transport http gitmcp https://gitmcp.io/{owner}/{repo}
```

**Przykład dla tego projektu:**
```bash
claude mcp add --transport http gitmcp-neon-estate https://gitmcp.io/DominDev/DominDev-Neon-Estate
```

**Lub** ręcznie w `~/.claude.json`:

```json
{
  "mcpServers": {
    "gitmcp-neon-estate": {
      "command": "npx",
      "args": ["mcp-remote", "https://gitmcp.io/DominDev/DominDev-Neon-Estate"]
    }
  }
}
```

#### Metoda 2: Dynamiczny Endpoint (Dla wielu projektów)

```bash
# Generyczny serwer pozwalający przełączać między repozytoriami
claude mcp add --transport http gitmcp https://gitmcp.io/docs
```

W `~/.claude.json`:

```json
{
  "mcpServers": {
    "gitmcp": {
      "command": "npx",
      "args": ["mcp-remote", "https://gitmcp.io/docs"]
    }
  }
}
```

#### Weryfikacja

```bash
# Sprawdź status serwera
/mcp
```

Powinieneś zobaczyć "gitmcp" lub "gitmcp-neon-estate" na liście.

### 📖 Przykłady Użycia GitMCP:

```plaintext
Użytkownik: "@gitmcp:docs What is the project structure?"

Claude używa GitMCP do:
1. Fetch Documentation (pobiera README.md lub llms.txt)
2. Search Documentation (wyszukuje "project structure")
3. Zwraca aktualną strukturę projektu z dokumentacji
```

```plaintext
Użytkownik: "How is error handling implemented in this project?"

Claude używa GitMCP do:
1. Search Code (wyszukuje "error handling" w kodzie)
2. Fetch Documentation (sprawdza docs o error handling)
3. Analizuje znalezione fragmenty kodu
4. Wyjaśnia implementację
```

### 🎯 Przypadki Użycia:

1. **Onboarding nowych deweloperów**: AI ma dostęp do aktualnej dokumentacji projektu
2. **Eliminacja halucynacji**: AI odpowiada w oparciu o rzeczywisty kod i docs
3. **Code review**: AI rozumie kontekst projektu podczas review
4. **Refactoring**: AI ma pełny obraz architektury projektu

### 🔗 GitMCP Resources:

- **Website**: [https://gitmcp.io](https://gitmcp.io)
- **Documentation**: [https://gitmcp.io/docs](https://gitmcp.io/docs)
- **GitHub**: [https://github.com/idosal/git-mcp](https://github.com/idosal/git-mcp)

---

## Instalacja i Konfiguracja

### 🚀 Szybki Start - Instalacja Obu Serwerów

#### Dla Projektu Neon Estate:

```bash
# 1. Browser MCP (automatyzacja przeglądarki)
claude mcp add --transport stdio browsermcp -- npx @browsermcp/mcp@latest

# 2. GitMCP (dokumentacja projektu GitHub)
claude mcp add --transport http gitmcp-neon-estate https://gitmcp.io/DominDev/DominDev-Neon-Estate

# 3. Weryfikacja
/mcp
```

#### Alternatywnie - Ręczna Konfiguracja:

Edytuj `~/.claude.json`:

```json
{
  "mcpServers": {
    "browsermcp": {
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    },
    "gitmcp-neon-estate": {
      "command": "npx",
      "args": ["mcp-remote", "https://gitmcp.io/DominDev/DominDev-Neon-Estate"]
    }
  }
}
```

### 📦 Zarządzanie Serwerami MCP

```bash
# Lista wszystkich zainstalowanych serwerów
claude mcp list

# Szczegóły konkretnego serwera
claude mcp get browsermcp

# Usunięcie serwera
claude mcp remove browsermcp

# Status serwerów w sesji
/mcp
```

### 🎛️ Konfiguracja Projektowa (Opcjonalna)

Dla współpracy zespołowej, utwórz `.mcp.json` w katalogu projektu:

```json
{
  "mcpServers": {
    "gitmcp-neon-estate": {
      "command": "npx",
      "args": ["mcp-remote", "https://gitmcp.io/DominDev/DominDev-Neon-Estate"]
    }
  }
}
```

**Dodaj do `.gitignore`** jeśli zawiera wrażliwe dane:
```gitignore
# MCP configuration (if contains sensitive data)
.mcp.json
```

**Lub commituj** jeśli chcesz współdzielić konfigurację z zespołem (GitMCP jest publiczny więc bezpieczny).

---

## Jak Korzystać z MCP

### 1. Automatyczne Wywołanie Tools

Claude automatycznie używa MCP tools gdy jest to pomocne:

```plaintext
Użytkownik: "Create a GitHub issue for bug in contact form"

Claude (automatycznie):
1. Wykrywa, że potrzebuje GitHub MCP
2. Wywołuje tool "create_issue"
3. Tworzy issue z opisem buga
4. Zwraca link do utworzonego issue
```

### 2. Odwoływanie się do Resources przez @mentions

```plaintext
# Analiza dokumentacji projektu
"Analyze the project structure using @gitmcp:docs"

# Nawigacja do strony i analiza
"Using browser automation, check @browsermcp:url://neon-estate.com and verify all links work"
```

### 3. Używanie Slash Commands (jeśli MCP eksportuje prompts)

Jeśli serwer MCP eksportuje prompts, pojawią się jako slash commands:

```bash
/analyze-repo  # Przykład: prompt z GitMCP
/automate-test # Przykład: prompt z Browser MCP
```

### 4. Sprawdzanie Statusu

```bash
# W Claude Code
/mcp

# Zobaczysz:
# - Które serwery są połączone
# - Status autentykacji
# - Dostępność serwerów
# - Dostępne tools i resources
```

### 5. Przykładowe Workflow - Testowanie Formularza Kontaktowego

```plaintext
Użytkownik: "Test the contact form on neon-estate.com and document any issues in GitHub"

Claude używa MCP do:
1. [Browser MCP] Navigate to neon-estate.com/index.html#contact
2. [Browser MCP] Fill form with test data
3. [Browser MCP] Submit and verify response
4. [GitMCP] Search existing issues for duplicates
5. [GitHub MCP] Create new issue if bug found
6. Zwraca raport z testem i link do issue
```

---

## Rozwiązywanie Problemów

### ❌ Serwer MCP nie jest widoczny w `/mcp`

**Przyczyny:**
- Błąd w konfiguracji JSON
- Brak wymaganych zależności (Node.js)
- Serwer nie odpowiada

**Rozwiązanie:**
```bash
# 1. Sprawdź syntax JSON
cat ~/.claude.json  # Czy JSON jest poprawny?

# 2. Sprawdź czy Node.js jest zainstalowany
node --version

# 3. Spróbuj ponownie dodać serwer
claude mcp remove browsermcp
claude mcp add --transport stdio browsermcp -- npx @browsermcp/mcp@latest

# 4. Zrestartuj Claude Code
```

### ❌ Browser MCP: "Connection failed"

**Przyczyny:**
- Rozszerzenie Chrome nie jest zainstalowane
- Przeglądarka nie jest uruchomiona
- Port jest zajęty

**Rozwiązanie:**
```bash
# 1. Upewnij się, że rozszerzenie Chrome jest zainstalowane
# Sprawdź w chrome://extensions/

# 2. Uruchom przeglądarkę Chrome

# 3. Sprawdź czy serwer MCP działa
npx @browsermcp/mcp@latest

# 4. Sprawdź porty
netstat -an | grep LISTEN  # Windows: netstat -an | findstr LISTEN
```

### ❌ GitMCP: "Repository not found"

**Przyczyny:**
- Repozytorium jest prywatne
- Błędny format URL
- Owner/repo name niepoprawny

**Rozwiązanie:**
```bash
# 1. Sprawdź czy repozytorium jest publiczne
# https://github.com/DominDev/DominDev-Neon-Estate

# 2. Sprawdź poprawność URL
# Format: https://gitmcp.io/{owner}/{repo}
# Przykład: https://gitmcp.io/DominDev/DominDev-Neon-Estate

# 3. Usuń i dodaj ponownie z poprawnym URL
claude mcp remove gitmcp-neon-estate
claude mcp add --transport http gitmcp-neon-estate https://gitmcp.io/DominDev/DominDev-Neon-Estate
```

### ❌ Claude Desktop: Podwójna inicjalizacja (znany bug)

**Objaw:**
Widzisz błędy o podwójnej inicjalizacji serwera

**Rozwiązanie:**
To znany bug w Claude Desktop - **ignoruj błędy**. Serwer działa normalnie mimo alertów.

### ❌ "Tool not available" podczas wywołania

**Przyczyny:**
- Serwer MCP nie jest połączony
- Tool wymaga autentykacji
- Rate limiting

**Rozwiązanie:**
```bash
# 1. Sprawdź status
/mcp

# 2. Zobacz szczegóły serwera
claude mcp get browsermcp

# 3. Sprawdź logi (jeśli dostępne)
# Logi mogą być w ~/.claude/logs/

# 4. Zrestartuj serwer
claude mcp remove browsermcp
claude mcp add --transport stdio browsermcp -- npx @browsermcp/mcp@latest
```

---

## Bezpieczeństwo

### 🔒 Najlepsze Praktyki Bezpieczeństwa:

1. **Ufaj tylko zaufanym serwerom MCP**
   - Instaluj tylko serwery z oficjalnych źródeł
   - Sprawdź kod na GitHub przed instalacją
   - Unikaj serwerów od nieznanych twórców

2. **Uważaj na untrusted content**
   - Niektóre serwery obsługujące zewnętrzne dane mogą być podatne na prompt injection
   - GitMCP jest bezpieczny dla publicznych repozytoriów GitHub (trusted source)

3. **Autentykacja i Tokeny**
   - Zdalne serwery używają **OAuth 2.0** dla bezpiecznej autentykacji
   - Nigdy nie commituj tokenów do git
   - Używaj zmiennych środowiskowych dla API keys

4. **Kontrola Enterprise (dla firm)**
   - Administratorzy mogą wdrożyć `managed-mcp.json` dla centralnej kontroli
   - Allowlists i denylists serwerów MCP
   - Audyt logów użycia MCP

5. **Browser MCP - Prywatność**
   - Automatyzacja jest **lokalna** - dane nie są wysyłane do chmury
   - Używa Twojego profilu Chrome - pozostajesz zalogowany
   - **Uwaga**: Może wykonywać akcje w Twoim imieniu - używaj ostrożnie na production!

6. **GitMCP - Publiczne Dane**
   - Działa tylko z **publicznymi** repozytoriami GitHub
   - Nie eksponuje prywatnych danych
   - Bezpieczny dla open-source projektów

### ⚠️ Ostrzeżenia:

- **NIE** używaj Browser MCP do automatyzacji wrażliwych operacji bez nadzoru
- **NIE** instaluj MCP serwerów z nieznanych źródeł
- **NIE** commituj plików `.mcp.json` zawierających API keys lub secrets
- **ZAWSZE** testuj Browser MCP na środowisku dev przed production

---

## Źródła

### Official MCP Documentation:
- [MCP Configuration Guide - Claude Code](https://code.claude.com/docs/en/mcp.md)
- [Getting Started with Local MCP Servers - Claude Help](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
- [MCP Platform Documentation](https://platform.claude.com/docs)

### Browser MCP:
- [Browser MCP Website](https://browsermcp.io)
- [Browser MCP Documentation](https://docs.browsermcp.io)
- [Browser MCP Setup Guide](https://docs.browsermcp.io/setup-server)
- [Browser MCP GitHub Repository](https://github.com/BrowserMCP/mcp)
- [Browser MCP Setup Tutorial](https://augchan42.github.io/2025/08/02/configuring-browser-tools-mcp-claude-code/)

### GitMCP:
- [GitMCP Website](https://gitmcp.io)
- [GitMCP Documentation](https://gitmcp.io/docs)
- [GitMCP GitHub Repository](https://github.com/idosal/git-mcp)
- [GitMCP on Playbooks](https://playbooks.com/mcp/idosal-git-mcp)

### Additional Resources:
- [Add MCP Servers to Claude Code - MCPcat Guide](https://mcpcat.io/guides/adding-an-mcp-server-to-claude-code/)
- [GitHub MCP Registry](https://github.blog/ai-and-ml/generative-ai/how-to-find-install-and-manage-mcp-servers-with-the-github-mcp-registry/)
- [Top 9 MCP Servers for Git Tools 2025](https://apidog.com/blog/top-10-mcp-servers-for-git-tools/)

---

## 📝 Notatki Końcowe

### Dla Projektu Neon Estate:

Po instalacji Browser MCP i GitMCP zyskujesz:

1. **Browser MCP**:
   - Automatyczne testowanie formularza kontaktowego
   - Weryfikacja responsywności na różnych viewport
   - Ekstrakcja danych SEO ze strony
   - Automatyzacja testów E2E

2. **GitMCP**:
   - AI rozumie strukturę projektu Neon Estate
   - Dostęp do dokumentacji w `_docs/`
   - Code search w repozytorium
   - Kontekst podczas code review

### Next Steps:

1. Zainstaluj oba serwery MCP używając komend z sekcji "Szybki Start"
2. Przetestuj Browser MCP na stronie neon-estate.com
3. Przetestuj GitMCP pytając o strukturę projektu
4. Sprawdź `/mcp` aby potwierdzić, że serwery działają
5. Zacznij używać MCP w codziennej pracy!

---

**Sukcesu z MCP!** 🚀
