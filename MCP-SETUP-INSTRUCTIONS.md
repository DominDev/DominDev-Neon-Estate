# 🚀 Szybka Instalacja MCP dla Neon Estate

Ten plik zawiera quick-start instrukcje instalacji MCP dla projektu Neon Estate.

**📚 Dla pełnej dokumentacji zobacz:** [_docs/guide-mcp-setup.md](_docs/guide-mcp-setup.md)

---

## ⚡ Szybki Start (2 minuty)

### Krok 1: Wymagania

Upewnij się, że masz zainstalowane:
- **Node.js** (najnowsza wersja LTS) - [Download](https://nodejs.org/)
- **Google Chrome** - Dla Browser MCP
- **Claude Code (VSCode Extension)** - Oczywiście! 😉

### Krok 2: Konfiguracja już gotowa! ✅

**GitMCP jest już skonfigurowany** w [.vscode/mcp.json](.vscode/mcp.json)!

Właśnie dodałem również **Browser MCP** do konfiguracji.

Nie musisz uruchamiać żadnych komend - w VSCode konfiguracja MCP działa przez plik `.vscode/mcp.json`.

### Krok 3: Instalacja Rozszerzenia Chrome (tylko dla Browser MCP)

1. Otwórz Chrome Web Store: [Browser MCP Extension](https://chromewebstore.google.com/detail/browser-mcp/)
2. Kliknij **"Add to Chrome"**
3. Potwierdź uprawnienia
4. Rozszerzenie jest gotowe!

### Krok 4: Weryfikacja

**Zrestartuj VSCode** aby załadować nową konfigurację MCP.

Po restarcie sprawdź:
1. Otwórz panel **MCP** w VSCode (patrz ikonka w lewym panelu)
2. Powinieneś zobaczyć dwa serwery:
   - ✅ `DominDev-Neon-Estate Docs` (GitMCP) - 4 tools
   - ✅ `Browser MCP` - Browser automation tools

**Lub** sprawdź logi MCP:
- VSCode → Output → Dropdown → "Claude Code: MCP"

---

## 🎯 Testy - Sprawdź Czy Działa

### Test 1: GitMCP - Dokumentacja Projektu

Zapytaj Claude:
```
Using GitMCP, what is the project structure of Neon Estate?
```

Claude powinien:
1. Użyć GitMCP do pobrania dokumentacji
2. Przeanalizować strukturę projektu z README.md lub llms.txt
3. Zwrócić opis struktury

### Test 2: Browser MCP - Testowanie Strony

Zapytaj Claude:
```
Using Browser MCP, navigate to https://neon-estate.com and verify the contact form is visible
```

Claude powinien:
1. Otworzyć przeglądarkę
2. Nawigować do strony
3. Zweryfikować czy formularz kontaktowy jest widoczny
4. Zwrócić raport

---

## 📖 Co Możesz Teraz Robić?

### Z Browser MCP:

- ✅ **Automatyczne testowanie** formularza kontaktowego
- ✅ **Weryfikacja responsywności** na różnych viewport
- ✅ **Ekstrakcja danych SEO** ze strony
- ✅ **Automatyzacja testów E2E**
- ✅ **Monitoring zmian** na production
- ✅ **Web scraping** konkurencji

### Z GitMCP:

- ✅ **AI rozumie strukturę** projektu Neon Estate
- ✅ **Dostęp do dokumentacji** w `_docs/`
- ✅ **Code search** w repozytorium
- ✅ **Kontekst podczas code review**
- ✅ **Onboarding** nowych deweloperów
- ✅ **Eliminacja halucynacji** AI o kodzie

---

## 🔧 Konfiguracja MCP w VSCode

W VSCode (Claude Code Extension), konfiguracja MCP znajduje się w [.vscode/mcp.json](.vscode/mcp.json).

### Aktualna Konfiguracja:

```json
{
  "servers": {
    "DominDev-Neon-Estate Docs": {
      "type": "sse",
      "url": "https://gitmcp.io/DominDev/DominDev-Neon-Estate"
    },
    "Browser MCP": {
      "type": "stdio",
      "command": "npx",
      "args": ["@browsermcp/mcp@latest"]
    }
  }
}
```

### Jak Dodać Własny Serwer MCP:

1. Otwórz [.vscode/mcp.json](.vscode/mcp.json)
2. Dodaj nowy serwer w sekcji `"servers"`:
   ```json
   "Nazwa Serwera": {
     "type": "sse",  // lub "stdio"
     "url": "https://mcp-server-url.com"
   }
   ```
3. Zapisz plik
4. Zrestartuj VSCode

---

## ❓ Problemy?

### Browser MCP nie działa?

1. Sprawdź czy rozszerzenie Chrome jest zainstalowane: `chrome://extensions/`
2. Upewnij się że Chrome jest uruchomiony
3. Sprawdź czy Node.js jest zainstalowany: `node --version`
4. Spróbuj ręcznej konfiguracji (powyżej)

### GitMCP nie działa?

1. Sprawdź czy repozytorium jest publiczne: [DominDev/DominDev-Neon-Estate](https://github.com/DominDev/DominDev-Neon-Estate)
2. Sprawdź poprawność URL: `https://gitmcp.io/DominDev/DominDev-Neon-Estate`
3. Spróbuj usunąć i dodać ponownie:
   ```bash
   claude mcp remove gitmcp-neon-estate
   claude mcp add --transport http gitmcp-neon-estate https://gitmcp.io/DominDev/DominDev-Neon-Estate
   ```

### Nadal nie działa?

Sprawdź **pełną dokumentację** z troubleshooting: [_docs/guide-mcp-setup.md](_docs/guide-mcp-setup.md)

---

## 📚 Więcej Informacji

- **Pełna dokumentacja MCP**: [_docs/guide-mcp-setup.md](_docs/guide-mcp-setup.md)
- **Browser MCP Docs**: [https://docs.browsermcp.io](https://docs.browsermcp.io)
- **GitMCP Docs**: [https://gitmcp.io/docs](https://gitmcp.io/docs)
- **Claude Code MCP Guide**: [https://code.claude.com/docs/en/mcp.md](https://code.claude.com/docs/en/mcp.md)

---

**Powodzenia!** 🎉

Jeśli masz pytania, sprawdź dokumentację lub zapytaj Claude - teraz ma dostęp do pełnej dokumentacji projektu przez GitMCP! 😊
