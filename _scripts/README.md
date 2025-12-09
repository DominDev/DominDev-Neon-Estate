# 🔧 MCP Test Scripts

**Last Updated:** 2025-12-05
**Version:** 1.0

---

## 📁 Struktura

```
_scripts/
├── README.md                           # Ten plik
├── test-runner.js                      # Runner dla wszystkich testów
├── create-all-tests.js                 # Generator wszystkich skryptów testowych
├── utils/
│   └── mcp-client.js                   # Utility functions dla MCP
├── mcp-tests/
│   ├── browser/                        # Browser MCP tests (01-10)
│   │   ├── 01-basic.js                 # ✅ Utworzony
│   │   ├── 02-seo-audit.js
│   │   ├── 03-forms.js
│   │   ├── 04-mobile-menu.js
│   │   ├── 05-all-sections.js
│   │   ├── 06-verify-links.js
│   │   ├── 07-performance.js
│   │   ├── 08-ai-atelier.js
│   │   ├── 09-hover-effects.js
│   │   └── 10-complete-audit.js
│   ├── gitmcp/                         # GitMCP tests (11-17)
│   │   ├── 11-docs.js
│   │   ├── 12-search-docs.js
│   │   ├── 13-code-search.js
│   │   ├── 14-structure.js
│   │   ├── 15-list-docs.js
│   │   ├── 16-security.js
│   │   └── 17-seo-changelog.js
│   └── combined/                       # Combined tests (18-25)
│       ├── 18-test-and-docs.js
│       ├── 19-design-system.js
│       ├── 20-pre-deployment.js
│       ├── 21-doc-review.js
│       ├── 22-security-audit.js
│       ├── 23-performance.js
│       ├── 24-accessibility.js
│       └── 25-complete-audit.js
```

---

## 🚀 Szybki Start

### Krok 1: Instalacja Zależności

```bash
npm install
```

To zainstaluje `@modelcontextprotocol/sdk` potrzebny do uruchamiania skryptów.

### Krok 2: Wygeneruj Wszystkie Skrypty Testowe

```bash
node _scripts/create-all-tests.js
```

To utworzy wszystkie 25 skryptów testowych w odpowiednich katalogach.

### Krok 3: Uruchom Testy

```bash
# Wszystkie testy
npm test

# Pojedynczy test
npm run test:browser

# Grupa testów
npm run test:browser:seo
npm run test:gitmcp
npm run test:combined:deploy
```

---

## 📖 Dostępne Komendy NPM

### Browser MCP Tests (01-10)

```bash
npm run test:browser              # 01: Basic navigation + screenshot
npm run test:browser:seo          # 02: SEO audit
npm run test:browser:forms        # 03: Contact form test
npm run test:browser:mobile       # 04: Mobile menu test
npm run test:browser:sections     # 05: All sections screenshots
npm run test:browser:links        # 06: Verify all links
npm run test:browser:perf         # 07: Performance test
npm run test:browser:ai           # 08: AI Atelier test
npm run test:browser:hover        # 09: Hover effects test
npm run test:browser:audit        # 10: Complete browser audit
```

### GitMCP Tests (11-17)

**⚠️ UWAGA:** GitMCP używa SSE transport który nie jest wspierany przez stdio.

**Użyj zamiast tego Claude Code chat:**
```
Używając GitMCP, pobierz główną dokumentację projektu Neon Estate
```

Alternatywnie, użyj MCP Inspector:
```bash
npx @modelcontextprotocol/inspector npx mcp-remote https://gitmcp.io/DominDev/DominDev-Neon-Estate
```

### Combined Tests (18-25)

```bash
npm run test:combined             # 18: Test + docs verification
npm run test:combined:design      # 19: Design system analysis
npm run test:combined:deploy      # 20: Pre-deployment checklist
npm run test:combined:docreview   # 21: Documentation review
npm run test:combined:security    # 22: Security audit
npm run test:combined:perf        # 23: Performance analysis
npm run test:combined:a11y        # 24: Accessibility check
npm run test:combined:full        # 25: Complete site audit
```

---

## 🛠️ Jak Używać Skryptów Samodzielnie

### Opcja 1: Bezpośrednio przez Node.js

```bash
node _scripts/mcp-tests/browser/01-basic.js
```

### Opcja 2: Przez NPM Scripts

```bash
npm run test:browser
```

### Opcja 3: Wszystkie Testy Naraz

```bash
npm test
# lub
node _scripts/test-runner.js
```

---

## 📝 Tworzenie Własnych Testów

### Template dla Browser MCP:

```javascript
import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Twój Test');

  const client = await createBrowserMCPClient();

  try {
    // 1. Navigate
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    // 2. Your test logic
    const result = await safeCallTool(client, 'toolName', { args });
    formatTestResult('Test Name', result.success, result.error);

    // 3. Assertions
    if (result.success) {
      console.log('✅ Test passed!');
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);
```

### Dodaj do package.json:

```json
{
  "scripts": {
    "test:custom": "node _scripts/mcp-tests/browser/custom-test.js"
  }
}
```

---

## 🔍 Dostępne Browser MCP Tools

| Tool | Opis | Przykład |
|------|------|----------|
| `navigate` | Otwiera URL | `{ url: 'https://...' }` |
| `click` | Klika element | `{ selector: '#button' }` |
| `type` | Wpisuje tekst | `{ selector: 'input', text: 'Hello' }` |
| `screenshot` | Robi screenshot | `{ selector: 'body' }` |
| `scroll` | Scrolluje stronę | `{ direction: 'down', amount: 500 }` |
| `get_text` | Pobiera tekst | `{ selector: 'h1' }` |
| `get_attribute` | Pobiera atrybut | `{ selector: 'img', attribute: 'alt' }` |
| `execute_javascript` | Wykonuje JS | `{ code: 'document.title' }` |
| `wait_for_element` | Czeka na element | `{ selector: '.loaded' }` |
| `query_selector` | Wyszukuje elementy | `{ selector: 'a' }` |
| `fill_form` | Wypełnia formularz | `{ selector: 'form', data: {...} }` |
| `submit` | Wysyła formularz | `{ selector: 'form' }` |

---

## 🎯 Przykłady Użycia

### Przykład 1: SEO Audit

```bash
npm run test:browser:seo
```

**Output:**
```
📌 Checking page title...
✅ Title: Neon Estate - Luksusowe Apartamenty Wrocław

📝 Checking meta description...
✅ Description: Studio architektury...

📊 Checking H1 tags...
✅ H1s: ['Neon Estate']

🖼️ Images without alt: 0
✅ All images have alt text!
```

### Przykład 2: Form Testing

```bash
npm run test:browser:forms
```

**Output:**
```
📋 Testing contact form...
✅ Field 'name' filled
✅ Field 'email' filled
✅ Field 'phone' filled
✅ Field 'message' filled
✅ Checkbox checked
📸 Screenshot taken
⚠️  Form NOT submitted (test only)
```

### Przykład 3: Mobile Menu

```bash
npm run test:browser:mobile
```

**Output:**
```
📱 Setting mobile viewport (375x667)
✅ Viewport changed
🍔 Clicking hamburger menu
✅ Menu opened
📸 Screenshot taken
✅ Contact section visible at bottom
```

---

## ⚠️ Ważne Uwagi

### 1. Browser MCP Requires Chrome Extension

Browser MCP wymaga zainstalowanego rozszerzenia Chrome:
- https://chromewebstore.google.com/detail/browser-mcp/

### 2. GitMCP - SSE Transport

GitMCP używa SSE (Server-Sent Events) transport, który nie jest wspierany przez stdio.

**Użyj Claude Code chat zamiast skryptów:**
```
Używając GitMCP, pobierz dokumentację projektu
```

**Lub użyj MCP Inspector:**
```bash
npx @modelcontextprotocol/inspector npx mcp-remote https://gitmcp.io/DominDev/DominDev-Neon-Estate
```

### 3. Node.js Version

Wymagane Node.js v18+ lub v20+:
```bash
node --version
```

### 4. Timeout Issues

Jeśli testy timeout, zwiększ wait time:
```javascript
await waitForLoad(client, 5000); // 5 sekund zamiast 3
```

---

## 🐛 Troubleshooting

### Problem: "command not found: npx"

**Rozwiązanie:**
```bash
# Sprawdź Node.js
node --version
npm --version

# Zainstaluj ponownie Node.js
# https://nodejs.org/
```

### Problem: "Failed to connect to Browser MCP"

**Rozwiązanie:**
1. Sprawdź czy rozszerzenie Chrome jest zainstalowane
2. Otwórz Chrome przed uruchomieniem testu
3. Sprawdź czy port 9009 nie jest zajęty

### Problem: "Module not found: @modelcontextprotocol/sdk"

**Rozwiązanie:**
```bash
npm install
```

### Problem: "Test hangs/freezes"

**Rozwiązanie:**
- Zwiększ timeout: `await waitForLoad(client, 10000);`
- Sprawdź czy strona się ładuje w przeglądarce
- Sprawdź logi MCP: VSCode → Output → "Claude Code: MCP"

---

## 📚 Dodatkowe Zasoby

- **MCP Setup Guide**: [_docs/guide-mcp-setup.md](../_docs/guide-mcp-setup.md)
- **Testing Scenarios**: [_docs/guide-mcp-testing-scenarios.md](../_docs/guide-mcp-testing-scenarios.md)
- **Browser MCP Docs**: https://docs.browsermcp.io
- **MCP SDK Docs**: https://github.com/modelcontextprotocol/sdk

---

## 🎯 Następne Kroki

1. ✅ Zainstaluj zależności: `npm install`
2. ✅ Wygeneruj testy: `node _scripts/create-all-tests.js`
3. ✅ Uruchom pierwszy test: `npm run test:browser`
4. ✅ Sprawdź wyniki
5. ✅ Dostosuj testy do swoich potrzeb

---

## 💡 Tips & Tricks

### Tip 1: Debug Mode

Dodaj `console.log` w skryptach aby zobaczyć więcej szczegółów:

```javascript
const result = await safeCallTool(client, 'navigate', { url: SITE_URL });
console.log('Full result:', JSON.stringify(result, null, 2));
```

### Tip 2: Screenshot na Błędzie

Zawsze rób screenshot gdy test fail:

```javascript
try {
  // Your test
} catch (error) {
  await safeCallTool(client, 'screenshot', {});
  throw error;
}
```

### Tip 3: Reusable Functions

Twórz własne utility functions w `_scripts/utils/`:

```javascript
// _scripts/utils/my-helpers.js
export async function fillContactForm(client, data) {
  // Reusable form filling logic
}
```

---

**Happy Testing!** 🚀
