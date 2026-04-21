# PPL · Push · Pull · Legs

Offline-fähige Mobile-Webapp (PWA) für einen Push-Pull-Legs Trainingsplan und
die Gym-Packliste. Wird am iPhone via "Zum Home-Bildschirm" als App installiert.

# Kern-Prinzip
Die App ist und bleibt offline-first und ohne Build-Step. Einfachheit ist das
Feature, nicht die Einschränkung. Alles läuft clientseitig im Browser.

# Schreibregeln
- Keine Gedankenstriche (— oder –) in Texten. Kommas, Punkte oder Umformulierungen nutzen.
- Alle UI-Texte auf Deutsch. Duzen ("du", nicht "Sie").
- Code (Variablen, Funktionen) auf Englisch. Content-Strings auf Deutsch.

# Tech-Stack
- Reines HTML / CSS / JS. Keine Frameworks, kein Bundler, kein Build-Step.
- Service Worker (sw.js) für Offline-Caching (Cache-First Strategie).
- localStorage für State-Persistenz.
- Google Fonts: Bebas Neue (Display), JetBrains Mono (Body).

# Dateistruktur
```
PPL_Workspace/
  index.html        # Gesamte App: HTML + inline CSS + inline JS
  sw.js             # Service Worker (Cache-Name: ppl-vN)
  manifest.json     # PWA-Manifest
  icon-180.png      # Apple Touch Icon
  icon-192.png      # Standard-Icon
  icon-512.png      # Hi-Res Icon (auch maskable)
```

# localStorage-Keys
- `ppl-pack-items`: Array<string>, die Packlisten-Items des Users
- `ppl-pack-state`: Array<boolean>, Checkbox-Zustände parallel zu items
- `ppl-install-dismissed`: iOS-Install-Banner wurde geschlossen
- `ppl-onboarded`: Onboarding-Q&A wurde abgeschlossen oder übersprungen
- `ppl-frequency`: Trainings-Häufigkeit, "3" oder "6". Steuert welcher Plan (3× oder 6× A/B-Split) in der Plan-View angezeigt wird
- `ppl-profile`: User-Profil `{ gender, age, nutrition, commitment }`. Bestimmt die Startgewichte pro Übung
- `ppl-weights`: Map `{ exerciseId: kg }` für alle nicht-bodyweight Übungen. IDs sind aus dem Übungs-Namen normalisiert (siehe `exerciseId()`)
- `ppl-weight-history`: Map `{ exerciseId: [{ date, weight }, ...] }`. Basis für die Empfehlungs-Logik (letzte Änderung, ob es ein Increase war). Pro Übung auf 50 Einträge gekappt
- `ppl-sets`: `{ date: 'YYYY-MM-DD', sets: { '<freq>/<dayLabel>/<exerciseId>': [bool, ...] } }`. Satz-Checkboxen pro Übung pro Tag. Setzt sich am nächsten Kalendertag automatisch zurück (loadSets prüft date)
- `ppl-sessions`: Array `[{ date, day }]`. Wird erweitert sobald an einem Tag alle Sätze eines Day-Cards abgehakt sind (dedupliziert pro date+day). Basis für Streak und Sessions-Total oben im Plan-Tab

Bei Änderungen an der Items-Struktur die Länge von items und state synchron
halten. loadState() kürzt oder erweitert state automatisch, damit beide Arrays
gleich lang bleiben.

# Service Worker · WICHTIG
Bei jeder Änderung an index.html, sw.js oder manifest.json den Cache-Namen in
sw.js erhöhen (z. B. `ppl-v3` zu `ppl-v4`). Ohne Bump sehen installierte User
ewig die alte Version, weil der Service Worker Cache-First lädt. Der neue
Worker löscht alte Caches automatisch beim activate-Event.

Update-Flow:
1. Neuer Worker installiert sich (state `installed`), bleibt aber `waiting`.
2. index.html zeigt das "Neue Version verfügbar" Banner.
3. Klick auf "Neu laden" postet `'skipWaiting'` an den wartenden Worker.
4. Worker aktiviert sich, `controllerchange`-Listener in index.html löst den
   Reload aus.

Deshalb kein `self.skipWaiting()` mehr im install-Event, sonst überspringt
der Worker das Warten und der User sieht das Banner nie.

# Design-Tokens (CSS-Variablen in :root)
| Token         | Hex        | Verwendung                          |
|---------------|------------|-------------------------------------|
| `--bg`        | `#0a0a0a`  | Seiten-Hintergrund                  |
| `--surface`   | `#151515`  | Cards, Bars                         |
| `--surface-2` | `#1f1f1f`  | Erhöhte Flächen, Rest-Tage          |
| `--border`    | `#2a2a2a`  | Borders                             |
| `--text`      | `#f5f5f5`  | Haupttext                           |
| `--text-dim`  | `#888`     | Sekundärtext                        |
| `--push`      | `#ff3b30`  | Push-Akzent (rot)                   |
| `--pull`      | `#30d158`  | Pull-Akzent (grün)                  |
| `--legs`      | `#ffcc00`  | Legs-Akzent (gelb)                  |
| `--pack`      | `#0a84ff`  | Packliste-Akzent (blau)             |

# Deployment
- Repo: github.com/TechnoThom/PPL_Workspace
- Netlify: Auto-Deploy bei jedem Push auf `main` (keine Build-Befehle nötig)

# Git-Workflow
- Feature-Branch für neue Features (`feature/<name>`)
- main ist der Netlify-Produktionsstand

# Lokal ausführen
```
npx serve -p 4200 .
```
Dann http://localhost:4200 öffnen. PWA-Install im Desktop-Chrome über das
Install-Icon in der Adressleiste.

# Dont's
- KEIN Framework (React, Vue, …) und KEIN Build-Step einführen.
- KEINE externen Abhängigkeiten außer Google Fonts und Browser-APIs.
- KEIN Backend. Alles clientseitig im localStorage.
- Cache-Name in sw.js nicht vergessen zu bumpen.
- KEINE Gedankenstriche in UI-Texten.
