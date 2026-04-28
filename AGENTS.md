# PPL · Push · Pull · Legs

Offline-fähige Mobile-Webapp (PWA) für einen Push-Pull-Legs Trainingsplan
und die Gym-Packliste. Wird am iPhone via "Zum Home-Bildschirm" als App
installiert.

- Repo: `github.com/TechnoThom/PPL_Workspace`
- Netlify: Auto-Deploy bei jedem Push auf `main`, keine Build-Befehle
- Lokal: `npx serve -p 4200 .` dann `http://localhost:4200`

# Kern-Prinzipien
- Offline-first. Alles läuft clientseitig im Browser, kein Backend.
- Kein Build-Step, kein Bundler, kein Framework.
- Einzige externe Abhängigkeiten: Google Fonts (Bebas Neue, JetBrains Mono)
  und Browser-APIs.
- Einfachheit ist das Feature, nicht die Einschränkung.

# Schreibregeln
- **Keine Gedankenstriche** (— oder –) in UI-Texten. Kommas, Punkte
  oder Umformulierungen nutzen.
- Alle UI-Texte auf Deutsch, Duzen ("du", nicht "Sie").
- Code (Variablen, Funktionen) auf Englisch, Content-Strings auf Deutsch.

# Dateistruktur
```
PPL_Workspace/
  index.html        # Markup (Views, Overlays, Stats-Bar, Footer)
  styles.css        # Komplette Styles
  app.js            # Gesamte App-Logik
  sw.js             # Service Worker, Cache-Name "ppl-vN"
  manifest.json     # PWA-Manifest
  icon-180.png      # Apple Touch Icon
  icon-192.png      # Standard-Icon
  icon-512.png      # Hi-Res Icon, auch maskable
  story.html        # Standalone 9:19.5 Instagram-Story-Ad (7 Scenes)
```

HTML, CSS und JS werden direkt vom Browser geladen (`<link>`, `<script>`),
kein Bundler. Wenn `app.js` weiter wächst, kann man nach Feature splitten
(z. B. `onboarding.js`, `tracking.js`) und zusätzliche `<script>`-Tags
einfügen.

# Tech-Stack
- Reines HTML / CSS / JavaScript.
- Service Worker für Offline-Caching (Cache-First Strategie).
- `localStorage` für State-Persistenz.
- Google Fonts: **Bebas Neue** (Display), **JetBrains Mono** (Body).

# Design-Tokens (CSS-Variablen in `:root`)
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

# localStorage-Keys

## Onboarding & Installation
- `ppl-onboarded`: Onboarding-Q&A wurde abgeschlossen oder übersprungen.
- `ppl-install-dismissed`: Install-Banner wurde geschlossen.

## Profil & Plan
- `ppl-profile`: `{ gender, age, nutrition, commitment }`. Bestimmt die
  Startgewichte und die Frequenz der Gewichtsempfehlungen.
- `ppl-frequency`: `"3"` oder `"6"`. Welcher Preset-Plan in der
  Plan-View angezeigt wird (3× Push/Pull/Legs oder 6× A/B-Split).
- `ppl-plan-mode`: `"preset"` oder `"custom"`. Steuert, ob die
  Preset-Pläne oder der eigene Plan angezeigt werden. Im Custom-Modus
  wird `ppl-frequency` ignoriert.
- `ppl-custom-plan`: `{ days: [{ id, label, variant, accent, focus, weekday, exercises: [{ id, name, note, sets, range, rest, base, step, bodyweight }] }] }`.
  User-definierte Trainings-Tage und Übungen. Beim Rendern werden
  Custom-Exercises zur Runtime in die globale `EXERCISES`-Map
  gemergt, damit Gewichts- und Satz-Tracking funktionieren.
- `ppl-substitutes`: Map `{ "<freq>/<dayLabel>/<originalExId>": "<newExId>" }`.
  Alternative Übungen pro Slot (nur für Preset-Pläne). `applySubstitutes`
  überschreibt zur Laufzeit `ex-name` und `ex-note`, Gewichts- und
  Satz-Tracking hängen dann an der neuen `exId`.

## Training-State
- `ppl-weights`: Map `{ exerciseId: kg }` für alle nicht-bodyweight
  Übungen. IDs sind aus dem Namen normalisiert via `exerciseId()`.
- `ppl-weight-history`: Map `{ exerciseId: [{ date, weight }, ...] }`.
  Basis der Empfehlungs-Logik, pro Übung auf 50 Einträge gekappt.
- `ppl-sets`: `{ date: 'YYYY-MM-DD', sets: { '<freq>/<dayLabel>/<exerciseId>': [bool, ...] } }`.
  Satz-Checkboxen pro Übung pro Tag. Reset automatisch am nächsten
  Kalendertag (`loadSets` prüft das Datum).
- `ppl-sessions`: Array `[{ date, day, exercises }]`. Wird erweitert,
  sobald an einem Tag alle Sätze eines Day-Cards abgehakt sind (deduped
  pro `date+day`). Basis für Streak und Sessions-Total.

## Progress / PRs
- `ppl-prs`: Map `{ exerciseId: { date: 'YYYY-MM-DD', weight: number } }`.
  Wird in `checkAndRecordPR` gesetzt, sobald ein neues Höchstgewicht
  erreicht wird. `isFreshPR(id)` liefert `true`, wenn der PR jünger als
  7 Tage ist, und triggert das 🏆-Badge auf den Übungs-Cards und in der
  Progress-Liste.

## Streak-Freezes
- `ppl-freezes`: `{ available: number, used: string[] }`. Werden über den
  "Teilen"-Button verdient (+1 pro Share, max. 3 gleichzeitig).
  `maybeConsumeFreeze` weist einen Freeze automatisch einem gestrigen
  Lücken-Tag zu, sobald heute eine Session abgeschlossen und vorgestern
  eine Session vorhanden ist.
- `ppl-last-share-reward`: `"YYYY-MM-DD"`. Verhindert mehr als einen
  Freeze pro Tag.

## Packliste
- `ppl-pack-items`: `Array<string>`, die Packlisten-Items.
- `ppl-pack-state`: `Array<boolean>`, Checkbox-Zustände parallel zu
  `ppl-pack-items`. `loadState()` kürzt oder erweitert das Array
  automatisch, damit beide Arrays gleich lang bleiben.

## Settings
- `ppl-rec-enabled`: `"0"` oder `"1"`. Toggle für intelligente
  Gewichtsvorschläge im Footer. Bei `"0"` werden die Plus/Minus-Puls-
  Animationen unterdrückt.

# Service Worker

Bei jeder Änderung an `index.html`, `styles.css`, `app.js`, `sw.js` oder
`manifest.json` den Cache-Namen in `sw.js` erhöhen (z. B. `ppl-v19` zu
`ppl-v20`). Ohne Bump sehen installierte User ewig die alte Version,
weil der Service Worker Cache-First lädt. Der neue Worker löscht alte
Caches automatisch beim `activate`-Event.

**Update-Flow**:
1. Neuer Worker installiert sich (`state === 'installed'`), bleibt aber
   `waiting`.
2. `app.js` zeigt das "Neue Version verfügbar"-Banner.
3. Klick auf "Neu laden" postet `'skipWaiting'` an den wartenden Worker.
4. Worker aktiviert sich, `controllerchange`-Listener in `app.js` löst
   den Reload aus.

Deshalb **kein** `self.skipWaiting()` im `install`-Event, sonst
überspringt der Worker das Warten und der User sieht das Banner nie.

# Safari → PWA Daten-Migration

iOS isoliert `localStorage` zwischen Safari und der "Zum Home-Bildschirm"-PWA.
Damit Onboarding und Fortschritt nicht verloren gehen, packen wir alle
`ppl-*` Keys als URL-Param `?s=...` (JSON, URL-encoded) in die aktuelle
URL, wenn der Install-Hint erscheint oder das Onboarding abgeschlossen
wird. iOS übernimmt beim "Zum Home-Bildschirm" die aktuelle URL, die
PWA liest die Daten beim ersten Start via `importStateFromUrl()` in
`localStorage` und bereinigt die URL via `history.replaceState`. Der
Import läuft **nur**, wenn noch kein State vorhanden ist, damit geteilte
Links bestehende Daten nicht überschreiben.

# Git-Workflow
- Feature-Branch für neue Features (`feature/<name>`).
- `main` ist der Netlify-Produktionsstand.
