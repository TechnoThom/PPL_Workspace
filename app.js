// Daten zwischen Safari und PWA via URL-Parameter übertragen
// (iOS isoliert localStorage zwischen Safari und installierter PWA)
const PPL_MIGRATABLE_KEYS = [
  'ppl-pack-items', 'ppl-pack-state', 'ppl-onboarded', 'ppl-frequency',
  'ppl-profile', 'ppl-weights', 'ppl-weight-history', 'ppl-sets',
  'ppl-sessions', 'ppl-freezes', 'ppl-last-share-reward', 'ppl-rec-enabled',
  'ppl-install-dismissed', 'ppl-substitutes', 'ppl-plan-mode', 'ppl-custom-plan',
  'ppl-theme', 'ppl-lang', 'ppl-prs'
];

// i18n
const I18N = {
  de: {
    'header.6.eyebrow': '6× pro Woche · A/B Split',
    'header.6.sub': 'Jede Muskelgruppe 2× pro Woche · Tap für Details',
    'header.3.eyebrow': '3× pro Woche · Push · Pull · Legs',
    'header.3.sub': 'Jede Muskelgruppe 1× pro Woche · Tap für Details',
    'header.custom.eyebrow': 'Eigener Plan',
    'header.custom.sub': 'Selbst zusammengestellt · Tap für Details',
    'tab.plan': 'Plan',
    'tab.progress': 'Progress',
    'tab.pack': 'Packliste',
    'tab.soon': 'Bald',
    'roadmap.eyebrow': 'Was als Nächstes kommt',
    'roadmap.title': 'Roadmap',
    'roadmap.intro': 'Die Community hat abgestimmt. Hier ist, woran ich arbeite.',
    'roadmap.status.building': 'In Arbeit',
    'roadmap.status.next': 'Als Nächstes',
    'roadmap.status.planned': 'Geplant',
    'roadmap.vote.winner': 'Poll-Sieger',
    'roadmap.vote.runnerup': 'Platz 2 im Poll',
    'roadmap.item.progress.title': 'Progress Bars',
    'roadmap.item.progress.desc': 'Sparklines pro Übung, PR-Detection. Fast fertig, du nutzt sie schon.',
    'roadmap.item.challenge.title': '30-Day Challenge',
    'roadmap.item.challenge.desc': 'Geführter Plan über 30 Tage, getrennt für Frauen und Männer. Strukturiertes Programm mit Progressionslogik.',
    'roadmap.item.heatmap.title': 'Streak-Heatmap',
    'roadmap.item.heatmap.desc': 'Kalenderansicht à la GitHub für deine Trainings-Konsistenz auf einen Blick.',
    'roadmap.item.share.title': 'Plan teilen via QR',
    'roadmap.item.share.desc': 'Eigenen Plan in 2 Sekunden an Trainingspartner schicken. Komplett offline, ohne Server.',
    'roadmap.foot': 'Du hast ne Idee? Melde dich auf Insta @ppl.app',
    'roadmap.close': 'Schließen',
    'progress.eyebrow': 'Deine Steigerung',
    'progress.title': 'Progress',
    'progress.sub': 'Größter Sprung zuerst. Tipp eine Übung für Details.',
    'progress.empty.title': 'Noch keine Daten',
    'progress.empty.text': 'Sobald du Gewichte änderst oder trainierst, siehst du hier deine Steigerung pro Übung.',
    'progress.delta.up': '+{kg} kg seit Start',
    'progress.delta.same': 'Noch keine Steigerung',
    'progress.delta.bw': '{n} Sessions',
    'progress.pr.toast': '🏆 Neuer Bestwert',
    'progress.detail.start': 'Start',
    'progress.detail.now': 'Aktuell',
    'progress.detail.peak': 'Bestwert',
    'progress.detail.sessions': 'Sessions',
    'progress.inline.start': 'Start',
    'progress.inline.now': 'Jetzt',
    'stat.streak': 'Streak',
    'stat.sessions': 'Sessions',
    'stat.freeze.one': 'Streak Freeze',
    'stat.freeze.many': 'Streak Freezes',
    'action.share': 'Teilen',
    'action.install': 'Installieren',
    'rest.title': 'Rest Day',
    'rest.text': 'Heute ist frei. Gönn dir Regeneration oder mach leichtes Cardio.',
    'planswitch.custom': 'Eigener',
    'footer.title': 'Hinweise',
    'footer.progression.label': 'Progression',
    'footer.progression.text': 'Gewicht steigern wenn oberes Wdh-Ziel in allen Sätzen sauber geschafft',
    'footer.pause.label': 'Pause',
    'footer.pause.text': '2 bis 3 min bei schweren Sätzen, 60 bis 90 s bei Isolation',
    'rest.timer.label': 'Pause',
    'rest.timer.skip': 'Überspringen',
    'rest.timer.add': '+15 s',
    'rest.timer.done': 'Los!',
    'footer.warmup.label': 'Aufwärmen',
    'footer.warmup.text': '2 leichte Sätze vor jeder Grundübung',
    'footer.deload.label': 'Deload',
    'footer.deload.text': 'Alle 6 bis 8 Wochen eine leichtere Woche einplanen',
    'settings.rec': 'Intelligente Gewichtsvorschläge',
    'settings.rec.desc': 'Plus/Minus-Puls zeigt, wann du hoch- oder runtergehen solltest.',
    'settings.theme': 'Light Mode',
    'settings.theme.desc': 'Heller Hintergrund, z. B. für draußen oder helle Räume.',
    'settings.lang': 'Sprache',
    'settings.lang.desc': 'Sprache der App-Texte umschalten.',
    'pack.edit': 'Bearbeiten',
    'pack.editing': 'Fertig',
    'pack.clear': 'Clear',
    'pack.add.placeholder': 'Neues Item hinzufügen...',
    'update.text': 'Neue Version verfügbar',
    'update.button': 'Neu laden',
    'ig.eyebrow': 'In-App Browser',
    'ig.title': 'In Browser öffnen',
    'ig.text.html': 'Tippe oben rechts auf <strong>⋯</strong> und wähle <strong>"Im externen Browser öffnen"</strong>. Nur dort kannst du die App zum Home-Bildschirm hinzufügen.',
    'ig.dismiss': 'Trotzdem fortfahren',
    'install.title': 'Als App installieren',
    'install.text': 'Drei-Punkt-Menü → Teilen → "Zum Home-Bildschirm"',
    'install.dismiss': 'OK',
    'install.toast.already': 'Läuft bereits als App.',
    'custom.empty.title': 'Dein Plan',
    'custom.empty.text': 'Noch keine Trainings-Tage. Leg deinen ersten Tag an und füll ihn mit Übungen.',
    'custom.empty.button': 'Plan erstellen',
    'custom.edit': 'Plan bearbeiten',
    'editor.title': 'Eigener Plan',
    'editor.cancel': 'Abbrechen',
    'editor.template': 'Vorlage',
    'editor.save': 'Speichern',
    'editor.day.label': 'Tag-Label',
    'editor.day.label.placeholder': 'z. B. Push, Pull, Oberkörper',
    'editor.day.delete.aria': 'Tag löschen',
    'editor.day.accent': 'Akzentfarbe',
    'editor.day.accent.push': 'Push (rot)',
    'editor.day.accent.pull': 'Pull (grün)',
    'editor.day.accent.legs': 'Legs (gelb)',
    'editor.day.weekday': 'Wochentag',
    'editor.day.weekday.none': 'Kein Wochentag',
    'editor.day.weekday.mon': 'Montag',
    'editor.day.weekday.tue': 'Dienstag',
    'editor.day.weekday.wed': 'Mittwoch',
    'editor.day.weekday.thu': 'Donnerstag',
    'editor.day.weekday.fri': 'Freitag',
    'editor.day.weekday.sat': 'Samstag',
    'editor.day.weekday.sun': 'Sonntag',
    'editor.day.variant': 'Variante',
    'editor.day.variant.placeholder': 'A / B',
    'editor.day.focus': 'Fokus (optional)',
    'editor.day.focus.placeholder': 'z. B. Schwer, Volumen, Quad-Fokus',
    'editor.exercises': 'Übungen',
    'editor.ex.name': 'Name',
    'editor.ex.name.placeholder': 'z. B. Bankdrücken',
    'editor.ex.note': 'Notiz (optional)',
    'editor.ex.note.placeholder': 'z. B. Hauptübung Brust',
    'editor.ex.type': 'Typ',
    'editor.ex.type.reps': 'Wiederholungen',
    'editor.ex.type.hold': 'Halten (Zeit)',
    'editor.ex.sets': 'Sätze',
    'editor.ex.range.reps': 'Wdh',
    'editor.ex.range.hold': 'Dauer (s)',
    'editor.ex.range.reps.placeholder': 'z. B. 6-8 oder 10-12',
    'editor.ex.range.hold.placeholder': 'z. B. 30 oder 30-45',
    'editor.ex.rest': 'Pause (s)',
    'editor.ex.base': 'Startgewicht (kg, leer = Körpergewicht)',
    'editor.ex.base.placeholder': 'leer lassen für Bodyweight',
    'editor.ex.step': 'Schritt (kg)',
    'editor.ex.delete.aria': 'Übung löschen',
    'editor.add.ex': '+ Übung hinzufügen',
    'editor.add.day': '+ Trainings-Tag hinzufügen',
    'templates.eyebrow': 'Vorlage wählen',
    'templates.title': 'Starte mit einem fertigen Plan',
    'templates.close': 'Abbrechen',
    'sets.suffix.reps': 'Wdh',
    'sets.suffix.hold': 's',
    'wd.mon': 'MO',
    'wd.tue': 'DI',
    'wd.wed': 'MI',
    'wd.thu': 'DO',
    'wd.fri': 'FR',
    'wd.sat': 'SA',
    'wd.sun': 'SO',
    'wd.off': 'OFF',
    'day.focus.push.heavy': 'Schwer · niedrige Wdh',
    'day.focus.push.volume': 'Volumen · höhere Wdh',
    'day.focus.pull.heavy': 'Schwer · Grundübungen',
    'day.focus.pull.volume': 'Volumen · andere Winkel',
    'day.focus.legs.quad': 'Quad-Fokus',
    'day.focus.legs.hams': 'Hamstring · Po',
    'day.focus.push.full': 'Brust · Schulter · Trizeps',
    'day.focus.pull.full': 'Rücken · Bizeps · hintere Schulter',
    'day.focus.legs.full': 'Quad · Hamstring · Po · Waden',
    'onb.intro.eyebrow': 'Einrichtung',
    'onb.intro.title': 'Kurze Einrichtung',
    'onb.intro.text': 'Ein paar Fragen zu dir, deinem Training und deiner Packliste. Damit stimmen wir Startgewichte und spätere Empfehlungen auf dich ab. Alles später anpassbar.',
    'onb.intro.privacy.title': 'Deine Daten bleiben bei dir',
    'onb.intro.privacy.text': 'Keine Server, keine Tracker, keine Analyse. Alle Antworten bleiben auf diesem Gerät und werden nur lokal genutzt, damit die App optimal zu dir passt. Du kannst trotzdem alles überspringen.',
    'onb.intro.start': "Los geht's",
    'onb.intro.skip': 'Alles überspringen',
    'onb.profile.eyebrow': 'Über dich {n} / {total}',
    'onb.training.eyebrow': 'Training',
    'onb.training.title': 'Welcher Plan passt?',
    'onb.training.hint': '3× pro Woche hat längere Sessions, 6× pro Woche ist ein A/B-Split mit kürzeren Einheiten. Oder stell dir deinen eigenen Plan zusammen.',
    'onb.training.3': '3× pro Woche',
    'onb.training.6': '6× pro Woche',
    'onb.training.custom': 'Eigener Plan',
    'onb.pack.eyebrow': 'Packliste {n} / {total}',
    'onb.yes': 'Ja',
    'onb.no': 'Nein',
    'onb.done.eyebrow': 'Fertig',
    'onb.done.title': 'Alles klar',
    'onb.done.text': 'Plan: {freq}× pro Woche. Packliste mit {count} Items. Startgewichte stehen, feintunen geht mit +/- pro Übung.',
    'onb.done.text.custom': 'Eigener Plan, gleich startklar. Packliste mit {count} Items. Startgewichte für deine Übungen kannst du selbst setzen.',
    'onb.done.button': "Los geht's",
    'profile.gender.q': 'Was ist dein Geschlecht?',
    'profile.gender.hint': 'Bestimmt den Startpunkt deiner Trainingsgewichte.',
    'profile.gender.male': 'Mann',
    'profile.gender.female': 'Frau',
    'profile.gender.diverse': 'Divers',
    'profile.age.q': 'Wie alt bist du?',
    'profile.age.hint': 'Alter beeinflusst Kraft und Regeneration.',
    'profile.age.18-25': '18 bis 25',
    'profile.age.26-35': '26 bis 35',
    'profile.age.36-50': '36 bis 50',
    'profile.age.50+': 'Über 50',
    'profile.nutrition.q': 'Achtest du auf deine Ernährung?',
    'profile.nutrition.hint': 'Bestimmt, wie häufig dir Gewichtssteigerungen empfohlen werden. Mit genug Protein gehen Fortschritte schneller.',
    'profile.nutrition.protein': 'Ja, Protein-bewusst',
    'profile.nutrition.casual': 'Casual, keine feste Routine',
    'profile.commitment.q': 'Ziehst du den Plan durch?',
    'profile.commitment.hint': 'Bestimmt, wie häufig dir Gewichtssteigerungen empfohlen werden. Voll dabei heißt häufigere Empfehlungen.',
    'profile.commitment.full': 'Ja, voll dabei',
    'profile.commitment.casual': 'Mal so, mal so',
    'pack.q.shower.q': 'Duschst du im Gym?',
    'pack.q.shower.hint': 'Wir packen Handtuch, Shampoo, Schlappen und Deo mit ein.',
    'pack.q.music.q': 'Hörst du Musik beim Training?',
    'pack.q.music.hint': 'Kopfhörer kommen mit auf die Liste.',
    'pack.q.after.q': 'Hast du nach dem Training direkt was vor?',
    'pack.q.after.hint': 'Skincare und Parfum kommen für danach mit.',
    'toast.share.granted.share': 'Danke fürs Teilen. Streak Freeze für dich.',
    'toast.share.granted.copy': 'Link kopiert. Streak Freeze für dich.',
    'toast.share.capped': 'Danke! Du hast bereits das Freeze-Maximum (3) erreicht.',
    'toast.share.thanks.share': 'Danke fürs Teilen.',
    'toast.share.thanks.copy': 'Link kopiert.',
    'swap.eyebrow': 'Alternative wählen',
    'swap.close': 'Abbrechen',
    'swap.option.original': 'Original',
    'swap.option.alt': 'Alternative',
  },
  en: {
    'header.6.eyebrow': '6× per week · A/B split',
    'header.6.sub': 'Each muscle group twice per week · tap for details',
    'header.3.eyebrow': '3× per week · Push · Pull · Legs',
    'header.3.sub': 'Each muscle group once per week · tap for details',
    'header.custom.eyebrow': 'Your own plan',
    'header.custom.sub': 'Built by you · tap for details',
    'tab.plan': 'Plan',
    'tab.progress': 'Progress',
    'tab.pack': 'Packing list',
    'tab.soon': 'Soon',
    'roadmap.eyebrow': 'What is coming next',
    'roadmap.title': 'Roadmap',
    'roadmap.intro': 'The community voted. Here is what I am working on.',
    'roadmap.status.building': 'Building',
    'roadmap.status.next': 'Up next',
    'roadmap.status.planned': 'Planned',
    'roadmap.vote.winner': 'Poll winner',
    'roadmap.vote.runnerup': 'Runner-up in poll',
    'roadmap.item.progress.title': 'Progress Bars',
    'roadmap.item.progress.desc': 'Sparklines per exercise, PR detection. Almost done, you are already using it.',
    'roadmap.item.challenge.title': '30-Day Challenge',
    'roadmap.item.challenge.desc': 'Guided 30-day program, separate plans for women and men. Structured progression built in.',
    'roadmap.item.heatmap.title': 'Streak heatmap',
    'roadmap.item.heatmap.desc': 'GitHub-style calendar so you can see your training consistency at a glance.',
    'roadmap.item.share.title': 'Share plan via QR',
    'roadmap.item.share.desc': 'Send your custom plan to a training partner in 2 seconds. Fully offline, no server.',
    'roadmap.foot': 'Got an idea? Hit me up on Insta @ppl.app',
    'roadmap.close': 'Close',
    'progress.eyebrow': 'Your progression',
    'progress.title': 'Progress',
    'progress.sub': 'Biggest jump first. Tap an exercise for details.',
    'progress.empty.title': 'No data yet',
    'progress.empty.text': 'Once you adjust weights or train, your per-exercise progression shows up here.',
    'progress.delta.up': '+{kg} kg since start',
    'progress.delta.same': 'No progression yet',
    'progress.delta.bw': '{n} sessions',
    'progress.pr.toast': '🏆 New personal best',
    'progress.detail.start': 'Start',
    'progress.detail.now': 'Current',
    'progress.detail.peak': 'Peak',
    'progress.detail.sessions': 'Sessions',
    'progress.inline.start': 'Start',
    'progress.inline.now': 'Now',
    'stat.streak': 'Streak',
    'stat.sessions': 'Sessions',
    'stat.freeze.one': 'streak freeze',
    'stat.freeze.many': 'streak freezes',
    'action.share': 'Share',
    'action.install': 'Install',
    'rest.title': 'Rest Day',
    'rest.text': "Today is off. Treat yourself to recovery or some light cardio.",
    'planswitch.custom': 'Custom',
    'footer.title': 'Tips',
    'footer.progression.label': 'Progression',
    'footer.progression.text': 'Add weight when you hit the top of the rep range cleanly across all sets',
    'footer.pause.label': 'Rest',
    'footer.pause.text': '2 to 3 min on heavy sets, 60 to 90 s on isolation',
    'rest.timer.label': 'Rest',
    'rest.timer.skip': 'Skip',
    'rest.timer.add': '+15 s',
    'rest.timer.done': 'Go!',
    'footer.warmup.label': 'Warm-up',
    'footer.warmup.text': '2 light sets before every compound lift',
    'footer.deload.label': 'Deload',
    'footer.deload.text': 'Plan a lighter week every 6 to 8 weeks',
    'settings.rec': 'Smart weight suggestions',
    'settings.rec.desc': 'A plus/minus pulse hints when to go up or back.',
    'settings.theme': 'Light mode',
    'settings.theme.desc': 'Light background, e.g. for outdoors or bright rooms.',
    'settings.lang': 'Language',
    'settings.lang.desc': 'Switch the language of all app texts.',
    'pack.edit': 'Edit',
    'pack.editing': 'Done',
    'pack.clear': 'Clear',
    'pack.add.placeholder': 'Add a new item...',
    'update.text': 'New version available',
    'update.button': 'Reload',
    'ig.eyebrow': 'In-app browser',
    'ig.title': 'Open in browser',
    'ig.text.html': 'Tap <strong>⋯</strong> in the top right and choose <strong>"Open in external browser"</strong>. Only there can you add the app to your home screen.',
    'ig.dismiss': 'Continue anyway',
    'install.title': 'Install as app',
    'install.text': 'Three-dot menu → Share → "Add to home screen"',
    'install.dismiss': 'OK',
    'install.toast.already': 'Already running as an app.',
    'custom.empty.title': 'Your plan',
    'custom.empty.text': "No training days yet. Add your first day and fill it with exercises.",
    'custom.empty.button': 'Create plan',
    'custom.edit': 'Edit plan',
    'editor.title': 'Your own plan',
    'editor.cancel': 'Cancel',
    'editor.template': 'Template',
    'editor.save': 'Save',
    'editor.day.label': 'Day label',
    'editor.day.label.placeholder': 'e.g. Push, Pull, Upper',
    'editor.day.delete.aria': 'Delete day',
    'editor.day.accent': 'Accent color',
    'editor.day.accent.push': 'Push (red)',
    'editor.day.accent.pull': 'Pull (green)',
    'editor.day.accent.legs': 'Legs (yellow)',
    'editor.day.weekday': 'Weekday',
    'editor.day.weekday.none': 'No weekday',
    'editor.day.weekday.mon': 'Monday',
    'editor.day.weekday.tue': 'Tuesday',
    'editor.day.weekday.wed': 'Wednesday',
    'editor.day.weekday.thu': 'Thursday',
    'editor.day.weekday.fri': 'Friday',
    'editor.day.weekday.sat': 'Saturday',
    'editor.day.weekday.sun': 'Sunday',
    'editor.day.variant': 'Variant',
    'editor.day.variant.placeholder': 'A / B',
    'editor.day.focus': 'Focus (optional)',
    'editor.day.focus.placeholder': 'e.g. Heavy, Volume, Quad-focus',
    'editor.exercises': 'Exercises',
    'editor.ex.name': 'Name',
    'editor.ex.name.placeholder': 'e.g. Bench Press',
    'editor.ex.note': 'Note (optional)',
    'editor.ex.note.placeholder': 'e.g. Main chest lift',
    'editor.ex.type': 'Type',
    'editor.ex.type.reps': 'Repetitions',
    'editor.ex.type.hold': 'Hold (time)',
    'editor.ex.sets': 'Sets',
    'editor.ex.range.reps': 'Reps',
    'editor.ex.range.hold': 'Duration (s)',
    'editor.ex.range.reps.placeholder': 'e.g. 6-8 or 10-12',
    'editor.ex.range.hold.placeholder': 'e.g. 30 or 30-45',
    'editor.ex.rest': 'Rest (s)',
    'editor.ex.base': 'Starting weight (kg, leave empty = bodyweight)',
    'editor.ex.base.placeholder': 'leave empty for bodyweight',
    'editor.ex.step': 'Step (kg)',
    'editor.ex.delete.aria': 'Delete exercise',
    'editor.add.ex': '+ Add exercise',
    'editor.add.day': '+ Add training day',
    'templates.eyebrow': 'Pick a template',
    'templates.title': 'Start from a ready-made plan',
    'templates.close': 'Cancel',
    'sets.suffix.reps': 'reps',
    'sets.suffix.hold': 's',
    'wd.mon': 'MON',
    'wd.tue': 'TUE',
    'wd.wed': 'WED',
    'wd.thu': 'THU',
    'wd.fri': 'FRI',
    'wd.sat': 'SAT',
    'wd.sun': 'SUN',
    'wd.off': 'OFF',
    'day.focus.push.heavy': 'Heavy · low reps',
    'day.focus.push.volume': 'Volume · higher reps',
    'day.focus.pull.heavy': 'Heavy · compounds',
    'day.focus.pull.volume': 'Volume · different angles',
    'day.focus.legs.quad': 'Quad focus',
    'day.focus.legs.hams': 'Hamstrings · glutes',
    'day.focus.push.full': 'Chest · shoulders · triceps',
    'day.focus.pull.full': 'Back · biceps · rear delts',
    'day.focus.legs.full': 'Quads · hamstrings · glutes · calves',
    'onb.intro.eyebrow': 'Setup',
    'onb.intro.title': 'Quick setup',
    'onb.intro.text': "A few questions about you, your training and your packing list. We'll use them to set your starting weights and tailor later suggestions. Everything is editable later.",
    'onb.intro.privacy.title': 'Your data stays with you',
    'onb.intro.privacy.text': 'No servers, no trackers, no analytics. Every answer stays on this device and is only used locally to tune the app to you. You can still skip everything.',
    'onb.intro.start': "Let's go",
    'onb.intro.skip': 'Skip everything',
    'onb.profile.eyebrow': 'About you {n} / {total}',
    'onb.training.eyebrow': 'Training',
    'onb.training.title': 'Which plan fits?',
    'onb.training.hint': '3× per week means longer sessions, 6× per week is an A/B split with shorter sessions. Or build your own plan.',
    'onb.training.3': '3× per week',
    'onb.training.6': '6× per week',
    'onb.training.custom': 'Your own plan',
    'onb.pack.eyebrow': 'Packing list {n} / {total}',
    'onb.yes': 'Yes',
    'onb.no': 'No',
    'onb.done.eyebrow': 'Done',
    'onb.done.title': "All set",
    'onb.done.text': 'Plan: {freq}× per week. Packing list with {count} items. Starting weights are set; tweak with +/- per exercise.',
    'onb.done.text.custom': 'Your own plan is ready to launch. Packing list with {count} items. Set starting weights for your own exercises yourself.',
    'onb.done.button': "Let's go",
    'profile.gender.q': 'What is your gender?',
    'profile.gender.hint': 'Sets the starting point for your training weights.',
    'profile.gender.male': 'Male',
    'profile.gender.female': 'Female',
    'profile.gender.diverse': 'Other',
    'profile.age.q': 'How old are you?',
    'profile.age.hint': 'Age affects strength and recovery.',
    'profile.age.18-25': '18 to 25',
    'profile.age.26-35': '26 to 35',
    'profile.age.36-50': '36 to 50',
    'profile.age.50+': 'Over 50',
    'profile.nutrition.q': 'Do you watch your nutrition?',
    'profile.nutrition.hint': 'Sets how often weight increases get suggested. Enough protein means faster progress.',
    'profile.nutrition.protein': 'Yes, protein-aware',
    'profile.nutrition.casual': 'Casual, no fixed routine',
    'profile.commitment.q': 'Will you stick with the plan?',
    'profile.commitment.hint': 'Sets how often weight increases get suggested. All-in means more frequent suggestions.',
    'profile.commitment.full': 'Yes, all in',
    'profile.commitment.casual': 'Sometimes, sometimes not',
    'pack.q.shower.q': 'Do you shower at the gym?',
    'pack.q.shower.hint': "We'll add towel, shampoo, flip-flops and deodorant.",
    'pack.q.music.q': 'Do you listen to music while training?',
    'pack.q.music.hint': "Headphones go on the list.",
    'pack.q.after.q': 'Plans right after the gym?',
    'pack.q.after.hint': 'Skincare and perfume go in for after.',
    'toast.share.granted.share': 'Thanks for sharing. Streak freeze for you.',
    'toast.share.granted.copy': 'Link copied. Streak freeze for you.',
    'toast.share.capped': 'Thanks! You already hit the freeze cap (3).',
    'toast.share.thanks.share': 'Thanks for sharing.',
    'toast.share.thanks.copy': 'Link copied.',
    'swap.eyebrow': 'Pick alternative',
    'swap.close': 'Cancel',
    'swap.option.original': 'Original',
    'swap.option.alt': 'Alternative',
  }
};

function loadLang() {
  try { return localStorage.getItem('ppl-lang') === 'en' ? 'en' : 'de'; }
  catch (e) { return 'de'; }
}

function saveLang(l) {
  try { localStorage.setItem('ppl-lang', l); } catch (e) {}
}

function t(key, vars) {
  const lang = loadLang();
  let s = (I18N[lang] && I18N[lang][key]) || (I18N.de && I18N.de[key]) || key;
  if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}

function applyI18n() {
  document.documentElement.lang = loadLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const pairs = el.dataset.i18nAttr.split(',');
    pairs.forEach(p => {
      const [attr, key] = p.split(':');
      if (attr && key) el.setAttribute(attr.trim(), t(key.trim()));
    });
  });
}

function exportStateToUrl() {
  try {
    const data = {};
    PPL_MIGRATABLE_KEYS.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    });
    if (!Object.keys(data).length) return;
    const encoded = encodeURIComponent(JSON.stringify(data));
    const url = new URL(window.location.href);
    url.searchParams.set('s', encoded);
    history.replaceState(null, '', url.pathname + url.search);
  } catch (e) {}
}

function importStateFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('s');
    if (!encoded) return;
    const url = new URL(window.location.href);
    url.searchParams.delete('s');
    const clean = url.pathname + (url.search || '');
    history.replaceState(null, '', clean);
    if (localStorage.getItem('ppl-onboarded') || localStorage.getItem('ppl-pack-items')) return;
    const data = JSON.parse(decodeURIComponent(encoded));
    Object.keys(data).forEach(k => {
      if (PPL_MIGRATABLE_KEYS.includes(k) && typeof data[k] === 'string') {
        localStorage.setItem(k, data[k]);
      }
    });
  } catch (e) {}
}

importStateFromUrl();

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.action === 'roadmap') {
      openRoadmap();
      return;
    }
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('view-' + tab.dataset.view).classList.add('active');
  });
});

function openRoadmap() {
  const sheet = document.getElementById('roadmap-sheet');
  if (!sheet) return;
  sheet.classList.remove('hidden');
  sheet.setAttribute('aria-hidden', 'false');
}

function closeRoadmap() {
  const sheet = document.getElementById('roadmap-sheet');
  if (!sheet) return;
  sheet.classList.add('hidden');
  sheet.setAttribute('aria-hidden', 'true');
}

document.getElementById('roadmap-close')?.addEventListener('click', closeRoadmap);
document.getElementById('roadmap-sheet')?.addEventListener('click', e => {
  if (e.target.id === 'roadmap-sheet') closeRoadmap();
});

// Day toggle
document.querySelectorAll('.day-head').forEach(head => {
  head.addEventListener('click', () => {
    head.parentElement.classList.toggle('open');
  });
});

// Packliste
const DEFAULT_ITEMS = [
  'Hose', 'Shirt', 'Karte', 'SportSchuhe', 'Geräte Handtuch',
  'Flasche', 'Socken', 'Trockenhandtuch', 'Unterhose', 'Deo',
  'Shampoo', 'Schlappen', 'Skincare', 'Parfum', 'Kopfhörer',
  'Schlüssel', 'Pulli -nebendran', 'Trikot -nebendran',
  'Sporthose -nebendran', 'alte Socken -nebendran'
];

const BASE_ITEMS = [
  'Hose', 'Shirt', 'Unterhose', 'Socken',
  'SportSchuhe', 'Flasche', 'Karte', 'Schlüssel',
  'Geräte Handtuch'
];

const BASE_ITEMS_EN = [
  'Pants', 'Shirt', 'Underwear', 'Socks',
  'Sneakers', 'Water Bottle', 'Card', 'Keys',
  'Gym Towel'
];

function baseItemsForLang() {
  return loadLang() === 'en' ? [...BASE_ITEMS_EN] : [...BASE_ITEMS];
}

const PROFILE_QUESTIONS = [
  { id: 'gender', qKey: 'profile.gender.q', hintKey: 'profile.gender.hint', options: [
    { labelKey: 'profile.gender.male', value: 'male' },
    { labelKey: 'profile.gender.female', value: 'female' },
    { labelKey: 'profile.gender.diverse', value: 'diverse' }
  ]},
  { id: 'age', qKey: 'profile.age.q', hintKey: 'profile.age.hint', options: [
    { labelKey: 'profile.age.18-25', value: '18-25' },
    { labelKey: 'profile.age.26-35', value: '26-35' },
    { labelKey: 'profile.age.36-50', value: '36-50' },
    { labelKey: 'profile.age.50+', value: '50+' }
  ]},
  { id: 'nutrition', qKey: 'profile.nutrition.q', hintKey: 'profile.nutrition.hint', options: [
    { labelKey: 'profile.nutrition.protein', value: 'protein' },
    { labelKey: 'profile.nutrition.casual', value: 'casual' }
  ]},
  { id: 'commitment', qKey: 'profile.commitment.q', hintKey: 'profile.commitment.hint', options: [
    { labelKey: 'profile.commitment.full', value: 'full' },
    { labelKey: 'profile.commitment.casual', value: 'casual' }
  ]}
];

const ONBOARDING_QUESTIONS = [
  { qKey: 'pack.q.shower.q', hintKey: 'pack.q.shower.hint',
    items: ['Trockenhandtuch', 'Shampoo', 'Schlappen', 'Deo'],
    itemsEn: ['Towel', 'Shampoo', 'Flip Flops', 'Deodorant'] },
  { qKey: 'pack.q.music.q', hintKey: 'pack.q.music.hint',
    items: ['Kopfhörer'],
    itemsEn: ['Headphones'] },
  { qKey: 'pack.q.after.q', hintKey: 'pack.q.after.hint',
    items: ['Skincare', 'Parfum'],
    itemsEn: ['Skincare', 'Perfume'] }
];

function questionItems(q) {
  return loadLang() === 'en' ? (q.itemsEn || q.items) : q.items;
}

const list = document.getElementById('pack-list');
const doneEl = document.getElementById('done');
const totalEl = document.getElementById('total');
const progressEl = document.getElementById('progress');
const clearBtn = document.getElementById('clear');
const editBtn = document.getElementById('edit-btn');

let items = [];
let state = [];
let editMode = false;

function escapeHtml(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function loadItems() {
  try {
    const saved = localStorage.getItem('ppl-pack-items');
    if (saved) { items = JSON.parse(saved); return; }
  } catch (e) {}
  items = [...DEFAULT_ITEMS];
}

function saveItems() {
  try { localStorage.setItem('ppl-pack-items', JSON.stringify(items)); } catch (e) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem('ppl-pack-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        state = parsed.slice(0, items.length);
        while (state.length < items.length) state.push(false);
        return;
      }
    }
  } catch (e) {}
  state = new Array(items.length).fill(false);
}

function saveState() {
  try { localStorage.setItem('ppl-pack-state', JSON.stringify(state)); } catch (e) {}
}

function deleteItem(i) {
  items.splice(i, 1);
  state.splice(i, 1);
  saveItems();
  saveState();
  render();
}

function addItem(text) {
  items.push(text);
  state.push(false);
  saveItems();
  saveState();
  render();
  // focus next add input
  const addInput = list.querySelector('.pack-add-input');
  if (addInput) addInput.focus();
}

function render() {
  list.innerHTML = '';

  if (editMode) {
    const addRow = document.createElement('div');
    addRow.className = 'pack-item add-row';
    addRow.innerHTML = `
      <input type="text" class="pack-add-input" placeholder="${escapeAttr(t('pack.add.placeholder'))}">
      <button class="add-btn" aria-label="Hinzufügen">+</button>
    `;
    const addInput = addRow.querySelector('.pack-add-input');
    const addBtnEl = addRow.querySelector('.add-btn');
    const doAdd = () => {
      const val = addInput.value.trim();
      if (val) { addItem(val); addInput.value = ''; }
    };
    addBtnEl.addEventListener('click', doAdd);
    addInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); doAdd(); } });
    list.appendChild(addRow);
  }

  items.forEach((item, i) => {
    const row = document.createElement('div');

    if (editMode) {
      row.className = 'pack-item editing';
      row.innerHTML = `
        <button class="delete-btn" aria-label="Löschen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <input type="text" class="pack-edit-input" value="${escapeAttr(item)}" placeholder="Item...">
      `;
      row.querySelector('.delete-btn').addEventListener('click', () => deleteItem(i));
      const input = row.querySelector('.pack-edit-input');
      input.addEventListener('input', () => {
        items[i] = input.value;
        saveItems();
      });
    } else {
      row.className = 'pack-item' + (state[i] ? ' checked' : '');
      row.innerHTML = `
        <div class="checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="pack-label">${escapeHtml(item)}</div>
      `;
      row.addEventListener('click', () => {
        state[i] = !state[i];
        saveState();
        render();
      });
    }
    list.appendChild(row);
  });

  updateCount();
}

function updateCount() {
  const done = state.filter(Boolean).length;
  doneEl.textContent = done;
  totalEl.textContent = '/' + items.length;
  progressEl.style.width = items.length ? (done / items.length * 100) + '%' : '0%';
}

clearBtn.addEventListener('click', () => {
  state = new Array(items.length).fill(false);
  saveState();
  render();
});

editBtn.addEventListener('click', () => {
  editMode = !editMode;
  editBtn.textContent = t(editMode ? 'pack.editing' : 'pack.edit');
  editBtn.classList.toggle('active', editMode);
  render();
});

// Übungen — name/note sind {de, en} Maps für Lokalisierung.
// base = Startgewicht kg, step = +/- Schritt kg, rest = Pause s.
// bodyweight = ohne Gewichts-Tracking, alternatives = gängige Austausch-Optionen.
const EXERCISES = {
  'bankdruecken-langhantel':     { name: { de: 'Bankdrücken Langhantel', en: 'Barbell Bench Press' },        note: { de: 'Hauptübung Brust', en: 'Main chest lift' },           base: 40, step: 2.5, rest: 180, alternatives: ['schraegbankdruecken-kh', 'bankdruecken-kurzhantel'] },
  'schulterdruecken-kurzhantel': { name: { de: 'Schulterdrücken Kurzhantel', en: 'Dumbbell Shoulder Press' }, note: { de: 'Sitzend · vordere Schulter', en: 'Seated · front delts' }, base: 12, step: 1, rest: 90,  alternatives: ['schulterdruecken-langhantel', 'arnold-press'] },
  'seitheben':                   { name: { de: 'Seitheben', en: 'Lateral Raises' },                          note: { de: 'Seitliche Schulter · Breite', en: 'Side delts · width' }, base: 6, step: 0.5, rest: 60,  alternatives: ['seitheben-kabel', 'seitheben-maschine'] },
  'trizepsdruecken-kabel':       { name: { de: 'Trizepsdrücken Kabel', en: 'Cable Triceps Pushdown' },       note: { de: 'Isolation', en: 'Isolation' },                       base: 15, step: 2.5, rest: 60,  alternatives: ['trizeps-overhead', 'french-press'] },
  'schraegbankdruecken-kh':      { name: { de: 'Schrägbankdrücken KH', en: 'Incline Dumbbell Press' },       note: { de: 'Obere Brust', en: 'Upper chest' },                   base: 15, step: 1,   rest: 120, alternatives: ['bankdruecken-langhantel', 'bankdruecken-kurzhantel'] },
  'dips-oder-brustpresse':       { name: { de: 'Dips oder Brustpresse', en: 'Dips or Chest Press' },         note: { de: 'Untere Brust · Trizeps', en: 'Lower chest · triceps' }, bodyweight: true, rest: 120, alternatives: ['bankdruecken-langhantel', 'trizepsdruecken-kabel'] },
  'trizeps-overhead':            { name: { de: 'Trizeps Overhead', en: 'Overhead Triceps Extension' },       note: { de: 'Langer Trizeps-Kopf', en: 'Long head focus' },        base: 10, step: 1,   rest: 60,  alternatives: ['trizepsdruecken-kabel', 'french-press'] },
  'klimmzuege':                  { name: { de: 'Klimmzüge', en: 'Pull-ups' },                                note: { de: 'Breiter Griff · Rücken-Basis', en: 'Wide grip · back base' }, bodyweight: true, rest: 180, alternatives: ['latzug-untergriff', 'latzug-breit'] },
  'rudern-langhantel':           { name: { de: 'Rudern Langhantel', en: 'Barbell Row' },                     note: { de: 'Horizontaler Zug · schwer', en: 'Horizontal pull · heavy' }, base: 30, step: 2.5, rest: 180, alternatives: ['kabelrudern-eng', 'rudern-kurzhantel'] },
  'face-pulls':                  { name: { de: 'Face Pulls', en: 'Face Pulls' },                             note: { de: 'Hintere Schulter · Haltung', en: 'Rear delts · posture' }, base: 12, step: 2.5, rest: 60, alternatives: ['reverse-flys', 'seitheben'] },
  'langhantel-curls':            { name: { de: 'Langhantel-Curls', en: 'Barbell Curls' },                    note: { de: 'Bizeps Isolation', en: 'Biceps isolation' },         base: 15, step: 2.5, rest: 60,  alternatives: ['kurzhantel-curls', 'hammer-curls'] },
  'latzug-untergriff':           { name: { de: 'Latzug Untergriff', en: 'Underhand Lat Pulldown' },          note: { de: 'Vertikaler Zug · Bizeps-Fokus', en: 'Vertical pull · biceps focus' }, base: 30, step: 2.5, rest: 120, alternatives: ['klimmzuege', 'latzug-breit'] },
  'kabelrudern-eng':             { name: { de: 'Kabelrudern eng', en: 'Close-Grip Cable Row' },              note: { de: 'Mittlerer Rücken', en: 'Mid back' },                 base: 30, step: 2.5, rest: 120, alternatives: ['rudern-langhantel', 'rudern-kurzhantel'] },
  'reverse-flys':                { name: { de: 'Reverse Flys', en: 'Reverse Flys' },                         note: { de: 'Hintere Schulter', en: 'Rear delts' },               base: 5,  step: 0.5, rest: 60,  alternatives: ['face-pulls', 'seitheben'] },
  'hammer-curls':                { name: { de: 'Hammer Curls', en: 'Hammer Curls' },                         note: { de: 'Brachialis · Unterarm', en: 'Brachialis · forearm' }, base: 8,  step: 1,   rest: 60,  alternatives: ['kurzhantel-curls', 'langhantel-curls'] },
  'kniebeuge':                   { name: { de: 'Kniebeuge', en: 'Squat' },                                   note: { de: 'Langhantel · Hauptübung', en: 'Barbell · main lift' }, base: 40, step: 2.5, rest: 180, alternatives: ['beinpresse', 'front-squat'] },
  'rumaenisches-kreuzheben':     { name: { de: 'Rumänisches Kreuzheben', en: 'Romanian Deadlift' },          note: { de: 'Hamstrings · Po', en: 'Hamstrings · glutes' },       base: 40, step: 2.5, rest: 180, alternatives: ['kreuzheben', 'good-mornings'] },
  'beinpresse':                  { name: { de: 'Beinpresse', en: 'Leg Press' },                              note: { de: 'Zweiter Quad-Reiz', en: 'Secondary quad work' },      base: 50, step: 5,   rest: 120, alternatives: ['kniebeuge', 'hackschmidt-squat'] },
  'beinbeuger-liegend':          { name: { de: 'Beinbeuger liegend', en: 'Lying Leg Curl' },                 note: { de: 'Hamstrings übers Knie', en: 'Hamstrings via knee' }, base: 20, step: 2.5, rest: 90,  alternatives: ['beinbeuger-sitzend', 'nordic-curls'] },
  'bulgarian-split-squats':      { name: { de: 'Bulgarian Split Squats', en: 'Bulgarian Split Squats' },     note: { de: 'Pro Bein · Po-Aktivierung', en: 'Per leg · glute activation' }, base: 8, step: 1, rest: 120, alternatives: ['ausfallschritte', 'kniebeuge'] },
  'beinbeuger-sitzend':          { name: { de: 'Beinbeuger sitzend', en: 'Seated Leg Curl' },                note: { de: 'Anderer Winkel als A', en: 'Different angle than A' }, base: 20, step: 2.5, rest: 90, alternatives: ['beinbeuger-liegend', 'nordic-curls'] },
  'wadenheben-stehend':          { name: { de: 'Wadenheben stehend', en: 'Standing Calf Raises' },           note: { de: 'Waden', en: 'Calves' },                              base: 40, step: 2.5, rest: 60,  alternatives: ['wadenheben-sitzend', 'beinpresse'] },

  // Alternativen ohne eigene alternatives-Liste (Endknoten)
  'bankdruecken-kurzhantel':     { name: { de: 'Bankdrücken Kurzhantel', en: 'Dumbbell Bench Press' },       note: { de: 'Brust · mehr Stabi-Arbeit', en: 'Chest · more stabilizer work' }, base: 14, step: 1, rest: 120 },
  'schulterdruecken-langhantel': { name: { de: 'Schulterdrücken Langhantel', en: 'Barbell Overhead Press' }, note: { de: 'Overhead Press', en: 'Overhead press' },             base: 25, step: 2.5, rest: 150 },
  'arnold-press':                { name: { de: 'Arnold Press', en: 'Arnold Press' },                         note: { de: 'Rotation · vordere Schulter', en: 'Rotation · front delts' }, base: 10, step: 1, rest: 90 },
  'seitheben-kabel':             { name: { de: 'Seitheben Kabel', en: 'Cable Lateral Raise' },               note: { de: 'Konstante Spannung', en: 'Constant tension' },        base: 8,  step: 1,   rest: 60 },
  'seitheben-maschine':          { name: { de: 'Seitheben Maschine', en: 'Lateral Raise Machine' },          note: { de: 'Geführte Bewegung', en: 'Guided motion' },            base: 15, step: 2.5, rest: 60 },
  'french-press':                { name: { de: 'French Press', en: 'Skull Crushers' },                       note: { de: 'Trizeps · Stirndrücken', en: 'Triceps · skull crushers' }, base: 15, step: 2.5, rest: 60 },
  'latzug-breit':                { name: { de: 'Latzug breit', en: 'Wide-Grip Lat Pulldown' },               note: { de: 'Latissimus-Fokus', en: 'Lat focus' },                base: 30, step: 2.5, rest: 120 },
  'rudern-kurzhantel':           { name: { de: 'Rudern Kurzhantel', en: 'Dumbbell Row' },                    note: { de: 'Einseitig · Asymmetrien ausgleichen', en: 'Single-side · fix imbalances' }, base: 16, step: 1, rest: 120 },
  'kurzhantel-curls':            { name: { de: 'Kurzhantel-Curls', en: 'Dumbbell Curls' },                   note: { de: 'Bizeps · mehr Kontrolle', en: 'Biceps · more control' }, base: 8, step: 1, rest: 60 },
  'front-squat':                 { name: { de: 'Front Squat', en: 'Front Squat' },                           note: { de: 'Quad-Fokus · aufrechter Oberkörper', en: 'Quad focus · upright torso' }, base: 30, step: 2.5, rest: 180 },
  'hackschmidt-squat':           { name: { de: 'Hackschmidt-Squat', en: 'Hack Squat' },                      note: { de: 'Quads isoliert', en: 'Quads isolated' },              base: 40, step: 5,   rest: 120 },
  'kreuzheben':                  { name: { de: 'Kreuzheben', en: 'Deadlift' },                               note: { de: 'Posterior Chain · schwer', en: 'Posterior chain · heavy' }, base: 60, step: 5, rest: 180 },
  'good-mornings':               { name: { de: 'Good Mornings', en: 'Good Mornings' },                       note: { de: 'Hamstrings · unterer Rücken', en: 'Hamstrings · lower back' }, base: 20, step: 2.5, rest: 120 },
  'nordic-curls':                { name: { de: 'Nordic Curls', en: 'Nordic Curls' },                         note: { de: 'Hamstring-Exzentrik · anspruchsvoll', en: 'Hamstring eccentric · demanding' }, bodyweight: true, rest: 120 },
  'ausfallschritte':             { name: { de: 'Ausfallschritte', en: 'Walking Lunges' },                    note: { de: 'Pro Bein · KH in jeder Hand', en: 'Per leg · DBs each hand' }, base: 10, step: 1, rest: 90 },
  'wadenheben-sitzend':          { name: { de: 'Wadenheben sitzend', en: 'Seated Calf Raises' },             note: { de: 'Soleus-Fokus', en: 'Soleus focus' },                  base: 25, step: 2.5, rest: 60 }
};

function exDisplay(idOrDef, field) {
  const def = typeof idOrDef === 'string' ? EXERCISES[idOrDef] : idOrDef;
  if (!def) return '';
  const val = def[field];
  if (val == null) return '';
  if (typeof val === 'object') {
    const lang = loadLang();
    return val[lang] || val.de || val.en || '';
  }
  return String(val);
}

const DEFAULT_PROFILE = { gender: 'male', age: '26-35', nutrition: 'protein', commitment: 'full' };

function exerciseId(name) {
  return name.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getProfile() {
  try {
    const saved = localStorage.getItem('ppl-profile');
    if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
  } catch (e) {}
  return { ...DEFAULT_PROFILE };
}

function saveProfile(p) {
  try { localStorage.setItem('ppl-profile', JSON.stringify(p)); } catch (e) {}
}

function loadWeights() {
  try {
    const saved = localStorage.getItem('ppl-weights');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {};
}

function saveWeights(w) {
  try { localStorage.setItem('ppl-weights', JSON.stringify(w)); } catch (e) {}
}

function loadWeightHistory() {
  try {
    const saved = localStorage.getItem('ppl-weight-history');
    if (saved) return JSON.parse(saved) || {};
  } catch (e) {}
  return {};
}

function saveWeightHistory(h) {
  try { localStorage.setItem('ppl-weight-history', JSON.stringify(h)); } catch (e) {}
}

function appendWeightHistory(id, weight) {
  const h = loadWeightHistory();
  if (!h[id]) h[id] = [];
  h[id].push({ date: todayIso(), weight });
  if (h[id].length > 50) h[id] = h[id].slice(-50);
  saveWeightHistory(h);
}

function loadPRs() {
  try {
    const saved = localStorage.getItem('ppl-prs');
    if (saved) return JSON.parse(saved) || {};
  } catch (e) {}
  return {};
}

function savePRs(p) {
  try { localStorage.setItem('ppl-prs', JSON.stringify(p)); } catch (e) {}
}

function checkAndRecordPR(id, weight) {
  const history = loadWeightHistory()[id] || [];
  const previousMax = history.slice(0, -1).reduce((m, e) => Math.max(m, e.weight || 0), 0);
  if (weight <= previousMax || previousMax === 0) return false;
  const prs = loadPRs();
  prs[id] = { date: todayIso(), weight };
  savePRs(prs);
  return true;
}

function isFreshPR(id) {
  const pr = loadPRs()[id];
  if (!pr) return false;
  return daysBetween(pr.date, todayIso()) <= 7;
}

function progressForExercise(id) {
  const def = EXERCISES[id];
  if (!def) return null;
  if (def.bodyweight) {
    const sessionsCount = loadSessions().filter(s => (s.exercises || []).includes(id)).length;
    return { bodyweight: true, sessions: sessionsCount, def };
  }
  const history = loadWeightHistory()[id] || [];
  if (!history.length) return null;
  const start = history[0].weight;
  const current = history[history.length - 1].weight;
  const peak = history.reduce((m, e) => Math.max(m, e.weight), 0);
  const deltaKg = Math.round((current - start) * 10) / 10;
  const deltaPct = start > 0 ? Math.round(((current - start) / start) * 100) : 0;
  return { bodyweight: false, history, start, current, peak, deltaKg, deltaPct, def };
}

function sparklineSvg(history, opts) {
  if (!history || history.length < 2) {
    return `<svg viewBox="0 0 100 32" preserveAspectRatio="none"></svg>`;
  }
  const o = opts || {};
  const stroke = o.stroke || 'var(--pull)';
  const fill = o.fill || 'rgba(48, 209, 88, 0.15)';
  const strokeWidth = o.strokeWidth ?? 1.6;
  const w = 100, h = 32, padY = 3;
  const values = history.map(e => e.weight);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const step = w / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = h - padY - ((v - min) / range) * (h - padY * 2);
    return [x, y];
  });
  const lineD = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const fillD = `${lineD} L${points[points.length - 1][0]},${h} L${points[0][0]},${h} Z`;
  const last = points[points.length - 1];
  return `
    <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path d="${fillD}" fill="${fill}" />
      <path d="${lineD}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      <circle cx="${last[0]}" cy="${last[1]}" r="2.2" fill="${stroke}" />
    </svg>
  `;
}

function getCurrentPlanExerciseIds() {
  const ids = new Set();
  const mode = getPlanMode();
  const freq = mode === 'custom' ? 'custom' : (localStorage.getItem('ppl-frequency') || '6');
  const variant = document.querySelector(`.plan-variant[data-freq="${freq}"]`);
  if (!variant) return ids;
  variant.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl) return;
    const id = ex.dataset.exId || exerciseId(nameEl.textContent);
    if (id) ids.add(id);
  });
  return ids;
}

function renderProgress() {
  const list = document.getElementById('progress-list');
  if (!list) return;
  const planIds = getCurrentPlanExerciseIds();
  const ids = planIds.size ? Array.from(planIds) : Object.keys(EXERCISES);
  const items = ids.map(id => ({ id, p: progressForExercise(id) })).filter(x => x.p);

  if (!items.length) {
    list.innerHTML = `
      <div class="progress-empty">
        <div class="e-title">${escapeHtml(t('progress.empty.title'))}</div>
        <div class="e-text">${escapeHtml(t('progress.empty.text'))}</div>
      </div>
    `;
    return;
  }

  // Score: weighted exercises by absolute kg gain; bodyweight by sessions
  const scored = items.map(x => ({
    ...x,
    score: x.p.bodyweight ? (x.p.sessions || 0) * 0.5 : (x.p.deltaKg || 0)
  })).sort((a, b) => b.score - a.score);

  list.innerHTML = scored.map((x, idx) => {
    const id = x.id;
    const p = x.p;
    const name = exDisplay(p.def, 'name') || id;
    const isTop = idx === 0 && (p.bodyweight ? p.sessions > 0 : p.deltaKg > 0);
    const fresh = isFreshPR(id);

    if (p.bodyweight) {
      const txt = t('progress.delta.bw', { n: p.sessions });
      return `
        <div class="progress-row${isTop ? ' top' : ''}" data-ex-id="${escapeAttr(id)}">
          <div class="progress-row-name"><span class="name-text">${escapeHtml(name)}</span>${fresh ? '<span class="pr-badge" title="PR">🏆</span>' : ''}</div>
          <div class="progress-row-delta same">${escapeHtml(txt)}<span class="delta-pct">BODYWEIGHT</span></div>
          <div class="progress-row-spark"></div>
        </div>
      `;
    }

    const deltaKgDisplay = p.deltaKg > 0 ? `+${p.deltaKg}` : `${p.deltaKg}`;
    const deltaCls = p.deltaKg > 0 ? 'up' : 'same';
    const deltaTxt = p.deltaKg > 0 ? `${deltaKgDisplay} kg` : t('progress.delta.same');
    const pctTxt = p.deltaKg > 0 ? `${p.deltaPct >= 0 ? '+' : ''}${p.deltaPct}%` : '';
    return `
      <div class="progress-row${isTop ? ' top' : ''}" data-ex-id="${escapeAttr(id)}">
        <div class="progress-row-name"><span class="name-text">${escapeHtml(name)}</span>${fresh ? '<span class="pr-badge" title="PR">🏆</span>' : ''}</div>
        <div class="progress-row-delta ${deltaCls}">${escapeHtml(deltaTxt)}${pctTxt ? `<span class="delta-pct">${escapeHtml(pctTxt)}</span>` : ''}</div>
        <div class="progress-row-spark">${sparklineSvg(p.history)}</div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.progress-row').forEach(row => {
    row.addEventListener('click', () => openProgressDetail(row.dataset.exId));
  });
}

function openProgressDetail(id) {
  const overlay = document.getElementById('progress-detail');
  const nameEl = document.getElementById('progress-detail-name');
  const metaEl = document.getElementById('progress-detail-meta');
  const chartEl = document.getElementById('progress-detail-chart');
  const statsEl = document.getElementById('progress-detail-stats');
  if (!overlay) return;
  const p = progressForExercise(id);
  if (!p) return;
  const name = exDisplay(p.def, 'name') || id;
  nameEl.textContent = name;
  if (p.bodyweight) {
    metaEl.textContent = 'BODYWEIGHT';
    chartEl.innerHTML = '';
    statsEl.innerHTML = `
      <div class="progress-stat">
        <div class="progress-stat-label">${escapeHtml(t('progress.detail.sessions'))}</div>
        <div class="progress-stat-value accent">${p.sessions}</div>
      </div>
    `;
  } else {
    const totalSessions = loadSessions().filter(s => (s.exercises || []).includes(id)).length;
    metaEl.textContent = `${p.history.length} Datenpunkte · ${totalSessions} Sessions`;
    chartEl.innerHTML = sparklineSvg(p.history, { strokeWidth: 2 });
    statsEl.innerHTML = `
      <div class="progress-stat">
        <div class="progress-stat-label">${escapeHtml(t('progress.detail.start'))}</div>
        <div class="progress-stat-value">${p.start}<span class="unit">kg</span></div>
      </div>
      <div class="progress-stat">
        <div class="progress-stat-label">${escapeHtml(t('progress.detail.now'))}</div>
        <div class="progress-stat-value accent">${p.current}<span class="unit">kg</span></div>
      </div>
      <div class="progress-stat">
        <div class="progress-stat-label">${escapeHtml(t('progress.detail.peak'))}</div>
        <div class="progress-stat-value">${p.peak}<span class="unit">kg</span></div>
      </div>
    `;
  }
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeProgressDetail() {
  const overlay = document.getElementById('progress-detail');
  if (!overlay) return;
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
}

document.getElementById('progress-detail-close')?.addEventListener('click', closeProgressDetail);
document.getElementById('progress-detail')?.addEventListener('click', e => {
  if (e.target.id === 'progress-detail') closeProgressDetail();
});

function renderInlineProgressBars() {
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl) return;
    const id = ex.dataset.exId || exerciseId(nameEl.textContent);
    const def = EXERCISES[id];
    if (!def || def.bodyweight) {
      const existing = ex.querySelector('.ex-progress');
      if (existing) existing.remove();
      return;
    }
    const p = progressForExercise(id);
    if (!p || p.history.length < 2) {
      const existing = ex.querySelector('.ex-progress');
      if (existing) existing.remove();
      return;
    }
    const fresh = isFreshPR(id);
    const same = p.deltaKg <= 0;
    const fillPct = p.deltaPct > 0 ? Math.min(100, Math.max(8, p.deltaPct * 2)) : 0;
    const deltaTxt = same ? t('progress.delta.same') : `+${p.deltaKg} kg`;

    let bar = ex.querySelector('.ex-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'ex-progress';
      const body = ex.children[1];
      body.appendChild(bar);
    }
    bar.className = 'ex-progress' + (same ? ' same' : '');
    bar.innerHTML = `
      <div class="bar"><div class="fill" style="width: ${fillPct}%"></div></div>
      <span class="delta">${escapeHtml(deltaTxt)}</span>
      ${fresh ? '<span class="pr-icon" title="PR">🏆</span>' : ''}
    `;
  });
}

function calculateStartWeight(base, profile) {
  const genderMod = ({ male: 1.0, female: 0.55, diverse: 0.8 })[profile.gender] ?? 1.0;
  const ageMod = ({ '18-25': 1.0, '26-35': 0.95, '36-50': 0.85, '50+': 0.7 })[profile.age] ?? 1.0;
  const nutritionMod = profile.nutrition === 'protein' ? 1.0 : 0.9;
  const commitmentMod = profile.commitment === 'full' ? 1.0 : 0.85;
  return base * genderMod * ageMod * nutritionMod * commitmentMod;
}

function initWeightsFromProfile(profile) {
  const w = {};
  const history = {};
  const today = todayIso();
  for (const id in EXERCISES) {
    const def = EXERCISES[id];
    if (def.bodyweight) continue;
    const raw = calculateStartWeight(def.base, profile);
    const rounded = Math.max(0, Math.round(raw / def.step) * def.step);
    const value = Math.round(rounded * 10) / 10;
    w[id] = value;
    history[id] = [{ date: today, weight: value }];
  }
  saveWeights(w);
  saveWeightHistory(history);
}

function ensureWeightsInitialized() {
  const existing = loadWeights();
  if (Object.keys(existing).length === 0) {
    initWeightsFromProfile(getProfile());
    return;
  }
  const history = loadWeightHistory();
  if (Object.keys(history).length === 0) {
    const bootstrapped = {};
    const today = todayIso();
    for (const id in existing) {
      bootstrapped[id] = [{ date: today, weight: existing[id] }];
    }
    saveWeightHistory(bootstrapped);
  }
}

function daysBetween(a, b) {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db - da) / 86400000);
}

function exerciseSessionsSince(exId, date) {
  return loadSessions().filter(s => s.date >= date && (s.exercises || []).includes(exId)).length;
}

function daysSinceLastSessionOf(exId) {
  const matching = loadSessions().filter(s => (s.exercises || []).includes(exId));
  if (matching.length === 0) return null;
  const latest = matching.reduce((max, s) => (s.date > max ? s.date : max), matching[0].date);
  return daysBetween(latest, todayIso());
}

function recommendationThreshold(profile, def) {
  let t = 4;
  const rest = def.rest ?? 90;
  if (rest >= 150) t -= 1;
  else if (rest <= 60) t += 1;
  if (profile.commitment !== 'full') t += 2;
  if (profile.nutrition !== 'protein') t += 1;
  if (profile.gender === 'female') t += 1;
  if (profile.age === '36-50') t += 1;
  else if (profile.age === '50+') t += 2;
  return Math.max(2, t);
}

function weightRecommendation(exId, profile) {
  const def = EXERCISES[exId];
  if (!def || def.bodyweight) return null;
  const history = loadWeightHistory()[exId] || [];
  if (history.length === 0) return null;
  const last = history[history.length - 1];
  const daysSince = daysSinceLastSessionOf(exId);
  const lastWasIncrease = history.length >= 2 && last.weight > history[history.length - 2].weight;
  if (daysSince !== null && daysSince > 10 && lastWasIncrease) return 'decrease';
  const sessionsSince = exerciseSessionsSince(exId, last.date);
  if (sessionsSince >= recommendationThreshold(profile, def)) return 'increase';
  return null;
}

function loadRecEnabled() {
  try { return localStorage.getItem('ppl-rec-enabled') !== '0'; } catch (e) { return true; }
}

function saveRecEnabled(v) {
  try { localStorage.setItem('ppl-rec-enabled', v ? '1' : '0'); } catch (e) {}
}

function refreshRecommendations() {
  const enabled = loadRecEnabled();
  const profile = getProfile();
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl) return;
    const exId = ex.dataset.exId || exerciseId(nameEl.textContent);
    const widget = ex.querySelector('.ex-weight');
    if (!widget) return;
    widget.classList.remove('rec-up', 'rec-down');
    if (!enabled) return;
    const rec = weightRecommendation(exId, profile);
    if (rec === 'increase') widget.classList.add('rec-up');
    else if (rec === 'decrease') widget.classList.add('rec-down');
  });
}

function initRecToggle() {
  const toggle = document.getElementById('rec-toggle');
  if (!toggle) return;
  const apply = (on) => {
    toggle.classList.toggle('on', on);
    toggle.setAttribute('aria-checked', on ? 'true' : 'false');
  };
  apply(loadRecEnabled());
  const handler = () => {
    const next = !toggle.classList.contains('on');
    apply(next);
    saveRecEnabled(next);
    refreshRecommendations();
  };
  toggle.addEventListener('click', handler);
  toggle.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handler(); }
  });
}

function loadTheme() {
  try { return localStorage.getItem('ppl-theme') === 'light' ? 'light' : 'dark'; }
  catch (e) { return 'dark'; }
}

function saveTheme(t) {
  try { localStorage.setItem('ppl-theme', t); } catch (e) {}
}

function applyTheme(t) {
  document.documentElement.classList.toggle('light', t === 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'light' ? '#f5f5f7' : '#0a0a0a');
}

function initLangToggle() {
  const wrap = document.getElementById('lang-switch');
  if (!wrap) return;
  const apply = (lang) => {
    wrap.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };
  apply(loadLang());
  wrap.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang === 'en' ? 'en' : 'de';
      saveLang(lang);
      apply(lang);
      applyI18n();
      // Re-render dynamic strings
      applyFrequency();
      renderFreezeBadge();
      // Re-localize exercise names/notes (preset + custom via merged map)
      if (typeof applySubstitutes === 'function') applySubstitutes();
      renderSets();
      if (typeof renderCustomPlan === 'function') renderCustomPlan();
      const editor = document.getElementById('custom-editor');
      if (editor && !editor.classList.contains('hidden')) renderEditor();
      const sheet = document.getElementById('template-sheet');
      if (sheet && !sheet.classList.contains('hidden')) renderTemplateList();
      renderProgress();
    });
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const initial = loadTheme();
  applyTheme(initial);
  const apply = (on) => {
    toggle.classList.toggle('on', on);
    toggle.setAttribute('aria-checked', on ? 'true' : 'false');
  };
  apply(initial === 'light');
  const handler = () => {
    const next = !toggle.classList.contains('on');
    apply(next);
    const theme = next ? 'light' : 'dark';
    saveTheme(theme);
    applyTheme(theme);
  };
  toggle.addEventListener('click', handler);
  toggle.addEventListener('keydown', e => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handler(); }
  });
}

function renderWeights() {
  const weights = loadWeights();
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl) return;
    const id = ex.dataset.exId || exerciseId(nameEl.textContent);
    const def = EXERCISES[id];
    if (!def || def.bodyweight) return;

    const weight = weights[id] ?? 0;
    let widget = ex.querySelector('.ex-weight');
    if (widget) {
      widget.querySelector('.weight-val').textContent = weight;
      return;
    }

    widget = document.createElement('div');
    widget.className = 'ex-weight';
    widget.innerHTML = `
      <button class="weight-btn" data-dir="-1" aria-label="Gewicht runter">−</button>
      <span class="weight-val">${weight}</span>
      <span class="weight-unit">kg</span>
      <button class="weight-btn" data-dir="1" aria-label="Gewicht hoch">+</button>
    `;
    widget.querySelectorAll('.weight-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const dir = parseInt(btn.dataset.dir);
        const current = loadWeights();
        const prev = current[id] ?? 0;
        const next = Math.max(0, prev + dir * def.step);
        current[id] = Math.round(next * 10) / 10;
        if (current[id] === prev) return;
        saveWeights(current);
        appendWeightHistory(id, current[id]);
        const isPR = checkAndRecordPR(id, current[id]);
        document.querySelectorAll('.ex').forEach(other => {
          const n = other.querySelector('.ex-name');
          if (!n) return;
          const otherId = other.dataset.exId || exerciseId(n.textContent);
          if (otherId === id) {
            const v = other.querySelector('.weight-val');
            if (v) v.textContent = current[id];
          }
        });
        refreshRecommendations();
        renderInlineProgressBars();
        renderProgress();
        if (isPR) showToast(t('progress.pr.toast'));
      });
    });

    const body = ex.children[1];
    body.appendChild(widget);
  });
  renderInlineProgressBars();
}

// Satz-Tracking + Pausentimer + Session-Streak
function parseReps(str) {
  const m = (str || '').match(/^(\d+)\s*[×x]\s*(.+)$/);
  if (!m) return null;
  return { sets: parseInt(m[1], 10), range: m[2].replace(/[–—]/g, '-').trim() };
}

function todayIso() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function addDays(iso, days) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function loadSets() {
  try {
    const saved = localStorage.getItem('ppl-sets');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.date === todayIso()) return parsed;
    }
  } catch (e) {}
  return { date: todayIso(), sets: {} };
}

function saveSets(state) {
  try { localStorage.setItem('ppl-sets', JSON.stringify(state)); } catch (e) {}
}

function loadSessions() {
  try {
    const saved = localStorage.getItem('ppl-sessions');
    if (saved) return JSON.parse(saved) || [];
  } catch (e) {}
  return [];
}

function saveSessions(arr) {
  try { localStorage.setItem('ppl-sessions', JSON.stringify(arr)); } catch (e) {}
}

function loadFreezes() {
  try {
    const saved = localStorage.getItem('ppl-freezes');
    if (saved) {
      const p = JSON.parse(saved);
      if (p && typeof p.available === 'number' && Array.isArray(p.used)) return p;
    }
  } catch (e) {}
  return { available: 0, used: [] };
}

function saveFreezes(f) {
  try { localStorage.setItem('ppl-freezes', JSON.stringify(f)); } catch (e) {}
}

function renderFreezeBadge() {
  const f = loadFreezes();
  const row = document.getElementById('actions-row');
  const count = document.getElementById('freeze-count');
  const label = document.getElementById('freeze-label');
  if (!row) return;
  row.classList.toggle('has-freezes', f.available > 0);
  if (count) count.textContent = f.available;
  if (label) label.textContent = t(f.available === 1 ? 'stat.freeze.one' : 'stat.freeze.many');
}

function maybeConsumeFreeze() {
  const f = loadFreezes();
  if (f.available === 0) return;
  const sessions = loadSessions();
  const allDates = new Set([...sessions.map(s => s.date), ...f.used]);
  const today = todayIso();
  const yesterday = addDays(today, -1);
  const dayBefore = addDays(today, -2);
  if (allDates.has(today) && !allDates.has(yesterday) && allDates.has(dayBefore)) {
    f.available -= 1;
    f.used.push(yesterday);
    saveFreezes(f);
  }
}

function dayLabel(dayEl) {
  const label = dayEl.querySelector('.day-label')?.textContent?.trim() ?? '';
  const variant = dayEl.querySelector('.variant')?.textContent?.trim();
  return variant ? `${label} ${variant}` : label;
}

function setsKey(freq, dayEl, exId) {
  return `${freq}/${dayLabel(dayEl)}/${exId}`;
}

function initExReps() {
  document.querySelectorAll('.ex-reps').forEach(el => {
    if (el.dataset.sets) return;
    const parsed = parseReps(el.textContent);
    if (!parsed) return;
    el.dataset.sets = parsed.sets;
    el.dataset.range = parsed.range;
  });
}

let activeTimer = null;

function getRestPanel() {
  return {
    panel: document.getElementById('rest-timer'),
    timeEl: document.getElementById('rest-timer-time'),
    exEl: document.getElementById('rest-timer-ex')
  };
}

function fmtSeconds(remaining) {
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function startTimer(seconds, exName) {
  const { panel, timeEl, exEl } = getRestPanel();
  if (!panel || !timeEl) return;
  if (activeTimer) {
    clearInterval(activeTimer.interval);
    if (activeTimer.dismissTimeout) clearTimeout(activeTimer.dismissTimeout);
  }
  let remaining = seconds;
  exEl.textContent = exName || '';
  timeEl.textContent = fmtSeconds(remaining);
  panel.classList.remove('hidden', 'done');
  panel.setAttribute('aria-hidden', 'false');
  // force reflow so the slide-in transition runs even on rapid restarts
  void panel.offsetWidth;
  panel.classList.add('open');

  const interval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(interval);
      timeEl.textContent = t('rest.timer.done');
      panel.classList.add('done');
      if (navigator.vibrate) try { navigator.vibrate([200, 100, 200]); } catch (e) {}
      const dismissTimeout = setTimeout(() => {
        if (activeTimer && activeTimer.interval === interval) stopTimer();
      }, 4000);
      if (activeTimer) activeTimer.dismissTimeout = dismissTimeout;
    } else {
      timeEl.textContent = fmtSeconds(remaining);
    }
  }, 1000);
  activeTimer = { interval, addTime: (s) => { remaining += s; timeEl.textContent = fmtSeconds(remaining); panel.classList.remove('done'); } };
}

function stopTimer() {
  const { panel, timeEl, exEl } = getRestPanel();
  if (activeTimer) {
    clearInterval(activeTimer.interval);
    if (activeTimer.dismissTimeout) clearTimeout(activeTimer.dismissTimeout);
    activeTimer = null;
  }
  if (!panel) return;
  panel.classList.remove('open', 'done');
  panel.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    if (!activeTimer) {
      panel.classList.add('hidden');
      if (timeEl) timeEl.textContent = '0:00';
      if (exEl) exEl.textContent = '';
    }
  }, 280);
}

document.getElementById('rest-timer-skip')?.addEventListener('click', stopTimer);
document.getElementById('rest-timer-add')?.addEventListener('click', () => {
  if (activeTimer) activeTimer.addTime(15);
});

function recordSessionIfDayComplete(dayEl, freq) {
  const exs = dayEl.querySelectorAll('.ex');
  const state = loadSets();
  for (const ex of exs) {
    const nameEl = ex.querySelector('.ex-name');
    const repsEl = ex.querySelector('.ex-reps');
    if (!nameEl || !repsEl) continue;
    const exId = ex.dataset.exId || exerciseId(nameEl.textContent);
    const numSets = parseInt(repsEl.dataset.sets || '0', 10);
    if (!numSets) continue;
    const key = setsKey(freq, dayEl, exId);
    const sets = state.sets[key] || [];
    if (sets.filter(Boolean).length < numSets) return;
  }
  const sessions = loadSessions();
  const date = todayIso();
  const day = `${freq}× ${dayLabel(dayEl)}`;
  if (sessions.some(s => s.date === date && s.day === day)) return;
  const exerciseIds = [];
  dayEl.querySelectorAll('.ex').forEach(ex => {
    const n = ex.querySelector('.ex-name');
    if (n) exerciseIds.push(ex.dataset.exId || exerciseId(n.textContent));
  });
  sessions.push({ date, day, exercises: exerciseIds });
  saveSessions(sessions);
  maybeConsumeFreeze();
  renderStats();
  renderFreezeBadge();
  refreshRecommendations();
  renderProgress();
}

function renderSets() {
  const state = loadSets();
  const mode = getPlanMode();
  const freq = mode === 'custom' ? 'custom' : (localStorage.getItem('ppl-frequency') || '6');
  document.querySelectorAll('.ex-reps').forEach(repsEl => {
    const ex = repsEl.closest('.ex');
    const dayEl = repsEl.closest('.day');
    if (!ex || !dayEl) return;
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl) return;
    const exId = ex.dataset.exId || exerciseId(nameEl.textContent);
    const numSets = parseInt(repsEl.dataset.sets || '0', 10);
    if (!numSets) return;
    const range = repsEl.dataset.range || '';
    const key = setsKey(freq, dayEl, exId);
    const sets = state.sets[key] || new Array(numSets).fill(false);

    let circles = '';
    const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    for (let i = 0; i < numSets; i++) {
      circles += `<button class="set${sets[i] ? ' done' : ''}" data-idx="${i}" aria-label="Satz ${i + 1}">${check}</button>`;
    }
    const type = repsEl.dataset.type || 'reps';
    const label = `${range} ${t(type === 'hold' ? 'sets.suffix.hold' : 'sets.suffix.reps')}`;
    repsEl.innerHTML = `
      <div class="sets">${circles}</div>
      <div class="reps-label">${escapeHtml(label)}</div>
    `;

    repsEl.querySelectorAll('.set').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        const s = loadSets();
        if (!s.sets[key]) s.sets[key] = new Array(numSets).fill(false);
        s.sets[key][idx] = !s.sets[key][idx];
        saveSets(s);
        btn.classList.toggle('done', s.sets[key][idx]);
        if (s.sets[key][idx]) {
          const def = EXERCISES[exId] || {};
          startTimer(def.rest || 90, nameEl.textContent);
          recordSessionIfDayComplete(dayEl, freq);
        }
      });
    });
  });
}

function calculateStreak(sessions) {
  const freezes = loadFreezes();
  const dates = new Set([...sessions.map(s => s.date), ...freezes.used]);
  if (!dates.size) return 0;
  const today = todayIso();
  let cursor;
  if (dates.has(today)) cursor = today;
  else if (dates.has(addDays(today, -1))) cursor = addDays(today, -1);
  else return 0;
  let streak = 1;
  let prev = addDays(cursor, -1);
  while (dates.has(prev)) {
    streak++;
    prev = addDays(prev, -1);
  }
  return streak;
}

function renderStats() {
  const sessions = loadSessions();
  const streak = calculateStreak(sessions);
  const streakEl = document.getElementById('stat-streak');
  const totalEl = document.getElementById('stat-total');
  const streakStat = document.getElementById('streak-stat');
  if (streakEl) streakEl.textContent = streak;
  if (totalEl) totalEl.textContent = sessions.length;
  if (streakStat) streakStat.classList.toggle('streak-active', streak > 0);
}

// Alternative Übungen pro Slot (freq/day/originalExId -> newExId)
function loadSubstitutes() {
  try {
    const saved = localStorage.getItem('ppl-substitutes');
    if (saved) return JSON.parse(saved) || {};
  } catch (e) {}
  return {};
}

function saveSubstitutes(s) {
  try { localStorage.setItem('ppl-substitutes', JSON.stringify(s)); } catch (e) {}
}

function subsSlotKey(freq, dayEl, originalExId) {
  return `${freq}/${dayLabel(dayEl)}/${originalExId}`;
}

function initExOriginals() {
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    const noteEl = ex.querySelector('.ex-note');
    if (!nameEl) return;
    // Source of truth: data-ex-id on .ex (preset HTML or custom render).
    // Fall back to legacy text-based ID for safety.
    let origId = ex.dataset.exId;
    if (!origId) {
      origId = exerciseId(nameEl.textContent.trim());
      ex.dataset.exId = origId;
    }
    if (!nameEl.dataset.originalId) nameEl.dataset.originalId = origId;
    if (!nameEl.dataset.originalName) nameEl.dataset.originalName = nameEl.textContent.trim();
    if (noteEl && !noteEl.dataset.originalNote) noteEl.dataset.originalNote = noteEl.textContent.trim();
  });
}

function applySubstitutes() {
  const subs = loadSubstitutes();
  const freq = localStorage.getItem('ppl-frequency') || '6';
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    const noteEl = ex.querySelector('.ex-note');
    const dayEl = ex.closest('.day');
    if (!nameEl || !nameEl.dataset.originalId || !dayEl) return;
    const origId = nameEl.dataset.originalId;
    const key = subsSlotKey(freq, dayEl, origId);
    const subId = subs[key];
    const targetId = subId && EXERCISES[subId] ? subId : origId;
    const def = EXERCISES[targetId] || EXERCISES[origId];
    if (!def) return;
    nameEl.textContent = exDisplay(def, 'name') || nameEl.dataset.originalName;
    if (noteEl) noteEl.textContent = exDisplay(def, 'note') || noteEl.dataset.originalNote || '';
  });
}

const SWAP_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>';

function renderSwapButtons() {
  document.querySelectorAll('.ex').forEach(ex => {
    const nameEl = ex.querySelector('.ex-name');
    if (!nameEl || !nameEl.dataset.originalId) return;
    const def = EXERCISES[nameEl.dataset.originalId];
    if (!def || !Array.isArray(def.alternatives) || !def.alternatives.length) return;
    if (nameEl.parentElement && nameEl.parentElement.classList.contains('ex-name-row')) return;
    const row = document.createElement('div');
    row.className = 'ex-name-row';
    nameEl.parentNode.insertBefore(row, nameEl);
    row.appendChild(nameEl);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swap-btn';
    btn.setAttribute('aria-label', 'Alternative wählen');
    btn.innerHTML = SWAP_ICON;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openSwapSheet(ex);
    });
    row.appendChild(btn);
  });
}

function openSwapSheet(exEl) {
  const nameEl = exEl.querySelector('.ex-name');
  const dayEl = exEl.closest('.day');
  if (!nameEl || !dayEl) return;
  const origId = nameEl.dataset.originalId;
  const origDef = EXERCISES[origId];
  if (!origDef || !Array.isArray(origDef.alternatives)) return;
  const freq = localStorage.getItem('ppl-frequency') || '6';
  const key = subsSlotKey(freq, dayEl, origId);
  const subs = loadSubstitutes();
  const currentId = subs[key] && EXERCISES[subs[key]] ? subs[key] : origId;

  const sheet = document.getElementById('swap-sheet');
  const title = document.getElementById('swap-title');
  const list = document.getElementById('swap-list');
  if (!sheet || !title || !list) return;

  title.textContent = exDisplay(origDef, 'name') || nameEl.dataset.originalName;
  list.innerHTML = '';

  [origId, ...origDef.alternatives].forEach((exId, idx) => {
    const def = EXERCISES[exId];
    if (!def) return;
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'swap-option' + (exId === currentId ? ' active' : '');
    opt.innerHTML = `
      <div class="swap-option-body">
        <div class="swap-option-name">${escapeHtml(exDisplay(def, 'name') || exId)}</div>
        <div class="swap-option-note">${escapeHtml(exDisplay(def, 'note'))}</div>
      </div>
      <div class="swap-option-badge">${escapeHtml(t(idx === 0 ? 'swap.option.original' : 'swap.option.alt'))}</div>
    `;
    opt.addEventListener('click', () => {
      const current = loadSubstitutes();
      if (exId === origId) delete current[key];
      else current[key] = exId;
      saveSubstitutes(current);
      closeSwapSheet();
      applySubstitutes();
      renderWeights();
      renderSets();
      refreshRecommendations();
    });
    list.appendChild(opt);
  });

  sheet.classList.remove('hidden');
  sheet.setAttribute('aria-hidden', 'false');
}

function closeSwapSheet() {
  const sheet = document.getElementById('swap-sheet');
  if (!sheet) return;
  sheet.classList.add('hidden');
  sheet.setAttribute('aria-hidden', 'true');
}

document.getElementById('swap-close')?.addEventListener('click', closeSwapSheet);
document.getElementById('swap-sheet')?.addEventListener('click', e => {
  if (e.target.id === 'swap-sheet') closeSwapSheet();
});

// Custom Plan (User-definierte Trainingstage und Übungen)
function getPlanMode() {
  try {
    return localStorage.getItem('ppl-plan-mode') === 'custom' ? 'custom' : 'preset';
  } catch (e) { return 'preset'; }
}

function setPlanMode(mode) {
  try { localStorage.setItem('ppl-plan-mode', mode === 'custom' ? 'custom' : 'preset'); } catch (e) {}
}

function loadCustomPlan() {
  try {
    const saved = localStorage.getItem('ppl-custom-plan');
    if (saved) {
      const p = JSON.parse(saved);
      if (p && Array.isArray(p.days)) return p;
    }
  } catch (e) {}
  return { days: [] };
}

function saveCustomPlan(plan) {
  try { localStorage.setItem('ppl-custom-plan', JSON.stringify(plan)); } catch (e) {}
}

function genId(prefix) {
  return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}

function defaultCustomPlan() {
  return {
    days: [
      { id: genId('d'), label: 'Push', variant: '', accent: 'push', focus: 'Brust · Schulter · Trizeps', weekday: 0, exercises: [] },
      { id: genId('d'), label: 'Pull', variant: '', accent: 'pull', focus: 'Rücken · Bizeps', weekday: 2, exercises: [] },
      { id: genId('d'), label: 'Legs', variant: '', accent: 'legs', focus: 'Beine · Po · Waden', weekday: 4, exercises: [] }
    ]
  };
}

function mergeCustomIntoExercises() {
  const plan = loadCustomPlan();
  plan.days.forEach(day => {
    (day.exercises || []).forEach(ex => {
      EXERCISES[ex.id] = {
        name: ex.name,
        note: ex.note || '',
        base: ex.base || 0,
        step: ex.step || 2.5,
        rest: ex.rest || 90,
        bodyweight: !!ex.bodyweight,
        type: ex.type === 'hold' ? 'hold' : 'reps'
      };
    });
  });
}

function renderCustomPlan() {
  const container = document.getElementById('custom-plan-view');
  if (!container) return;
  const plan = loadCustomPlan();
  container.innerHTML = '';

  if (!plan.days.length) {
    const empty = document.createElement('div');
    empty.className = 'custom-empty';
    empty.innerHTML = `
      <div class="custom-empty-title">${escapeHtml(t('custom.empty.title'))}</div>
      <div class="custom-empty-text">${escapeHtml(t('custom.empty.text'))}</div>
      <button class="custom-primary-btn" id="custom-create-btn" type="button">${escapeHtml(t('custom.empty.button'))}</button>
    `;
    container.appendChild(empty);
    document.getElementById('custom-create-btn')?.addEventListener('click', openEditor);
    return;
  }

  const week = document.createElement('div');
  week.className = 'week';
  const weekdayMap = {};
  plan.days.forEach(d => {
    if (typeof d.weekday === 'number' && d.weekday >= 0 && d.weekday <= 6) weekdayMap[d.weekday] = d;
  });
  ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'].forEach((label, i) => {
    const d = weekdayMap[i];
    const wd = document.createElement('div');
    wd.className = 'week-day';
    if (d) {
      const short = (d.label || '').slice(0, 3).toUpperCase() + (d.variant ? ' ' + d.variant : '');
      wd.innerHTML = `<div class="d">${label}</div><div class="t p-${escapeHtml(d.accent || 'push')}">${escapeHtml(short)}</div>`;
    } else {
      wd.innerHTML = `<div class="d">${label}</div><div class="t rest">OFF</div>`;
    }
    week.appendChild(wd);
  });
  container.appendChild(week);

  const edit = document.createElement('button');
  edit.className = 'custom-edit-btn';
  edit.type = 'button';
  edit.textContent = t('custom.edit');
  edit.addEventListener('click', openEditor);
  container.appendChild(edit);

  const groups = { push: [], pull: [], legs: [] };
  plan.days.forEach(d => {
    const bucket = groups[d.accent] ? d.accent : 'push';
    groups[bucket].push(d);
  });

  ['push', 'pull', 'legs'].forEach(bucket => {
    if (!groups[bucket].length) return;
    const sec = document.createElement('div');
    sec.className = 'section-title';
    sec.textContent = bucket.charAt(0).toUpperCase() + bucket.slice(1);
    container.appendChild(sec);
    groups[bucket].forEach(d => container.appendChild(renderCustomDay(d)));
  });
}

function renderCustomDay(d) {
  const dayEl = document.createElement('div');
  dayEl.className = 'day';
  dayEl.dataset.customDayId = d.id;
  const variantHtml = d.variant ? `<span class="variant">${escapeHtml(d.variant)}</span>` : '';
  const focusHtml = d.focus ? `<div class="focus">${escapeHtml(d.focus)}</div>` : '';
  const head = document.createElement('div');
  head.className = 'day-head';
  head.innerHTML = `
    <div class="day-title">
      <div class="accent ${escapeHtml(d.accent || 'push')}"></div>
      <div>
        <div><span class="day-label">${escapeHtml(d.label)}</span>${variantHtml}</div>
        ${focusHtml}
      </div>
    </div>
    <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
  `;
  head.addEventListener('click', () => dayEl.classList.toggle('open'));
  dayEl.appendChild(head);
  const exs = document.createElement('div');
  exs.className = 'exercises';
  (d.exercises || []).forEach((ex, idx) => {
    const exEl = document.createElement('div');
    exEl.className = 'ex';
    exEl.dataset.exId = ex.id;
    const num = String(idx + 1).padStart(2, '0');
    const sets = ex.sets || 3;
    const range = ex.range || (ex.type === 'hold' ? '30' : '8-10');
    const isHold = ex.type === 'hold';
    const repsText = isHold ? `${sets}×${range} s` : `${sets}×${range}`;
    exEl.innerHTML = `
      <div class="ex-num">${num}</div>
      <div>
        <div class="ex-name">${escapeHtml(ex.name || 'Übung')}</div>
        ${ex.note ? `<div class="ex-note">${escapeHtml(ex.note)}</div>` : ''}
      </div>
      <div class="ex-reps" data-sets="${sets}" data-range="${escapeAttr(range)}" data-type="${isHold ? 'hold' : 'reps'}">${escapeHtml(repsText)}</div>
    `;
    exs.appendChild(exEl);
  });
  dayEl.appendChild(exs);
  return dayEl;
}

// Plan-Templates (Vorlagen für den Custom-Plan-Editor)
const PLAN_TEMPLATES = [
  {
    id: 'upper-lower-4',
    name: 'Upper / Lower 4×',
    description: 'Klassischer 4er-Split mit Oberkörper und Unterkörper im Wechsel.',
    tags: ['Klassisch', 'Fortgeschritten'],
    days: [
      { label: 'Upper', variant: 'A', accent: 'push', weekday: 0, focus: 'Brust · Rücken · Schulter', exercises: [
        { name: 'Bankdrücken Langhantel', note: 'Hauptübung Brust', sets: 4, range: '6-8', rest: 180, base: 40, step: 2.5 },
        { name: 'Rudern Langhantel', note: 'Horizontaler Zug', sets: 4, range: '6-8', rest: 180, base: 30, step: 2.5 },
        { name: 'Schulterdrücken Kurzhantel', note: 'Vordere Schulter', sets: 3, range: '8-10', rest: 120, base: 12, step: 1 },
        { name: 'Klimmzüge', note: 'Breiter Griff', sets: 3, range: 'max', rest: 180, bodyweight: true },
        { name: 'Trizepsdrücken Kabel', note: 'Isolation', sets: 3, range: '10-12', rest: 60, base: 15, step: 2.5 },
        { name: 'Langhantel-Curls', note: 'Bizeps', sets: 3, range: '10-12', rest: 60, base: 15, step: 2.5 }
      ]},
      { label: 'Lower', variant: 'A', accent: 'legs', weekday: 1, focus: 'Quad-Fokus', exercises: [
        { name: 'Kniebeuge', note: 'Langhantel · Hauptübung', sets: 4, range: '6-8', rest: 180, base: 40, step: 2.5 },
        { name: 'Rumänisches Kreuzheben', note: 'Hamstrings · Po', sets: 3, range: '8-10', rest: 180, base: 40, step: 2.5 },
        { name: 'Beinpresse', note: 'Zweiter Quad-Reiz', sets: 3, range: '10-12', rest: 120, base: 50, step: 5 },
        { name: 'Beinbeuger liegend', note: 'Hamstrings', sets: 3, range: '10-12', rest: 90, base: 20, step: 2.5 },
        { name: 'Wadenheben stehend', note: 'Waden', sets: 4, range: '12-15', rest: 60, base: 40, step: 2.5 }
      ]},
      { label: 'Upper', variant: 'B', accent: 'pull', weekday: 3, focus: 'Rücken-Fokus · Volumen', exercises: [
        { name: 'Schrägbankdrücken KH', note: 'Obere Brust', sets: 4, range: '8-10', rest: 120, base: 15, step: 1 },
        { name: 'Latzug Untergriff', note: 'Bizeps-Fokus', sets: 3, range: '10-12', rest: 120, base: 30, step: 2.5 },
        { name: 'Seitheben', note: 'Breite', sets: 3, range: '12-15', rest: 60, base: 6, step: 0.5 },
        { name: 'Face Pulls', note: 'Hintere Schulter · Haltung', sets: 3, range: '12-15', rest: 60, base: 12, step: 2.5 },
        { name: 'Hammer Curls', note: 'Brachialis', sets: 3, range: '10-12', rest: 60, base: 8, step: 1 },
        { name: 'Trizeps Overhead', note: 'Langer Kopf', sets: 3, range: '10-12', rest: 60, base: 10, step: 1 }
      ]},
      { label: 'Lower', variant: 'B', accent: 'legs', weekday: 4, focus: 'Hamstring · Po', exercises: [
        { name: 'Rumänisches Kreuzheben', note: 'Posterior Chain · schwer', sets: 4, range: '6-8', rest: 180, base: 45, step: 2.5 },
        { name: 'Bulgarian Split Squats', note: 'Pro Bein · Po-Aktivierung', sets: 3, range: '8-10', rest: 120, base: 8, step: 1 },
        { name: 'Beinbeuger sitzend', note: 'Anderer Winkel', sets: 3, range: '10-12', rest: 90, base: 20, step: 2.5 },
        { name: 'Beinpresse', note: 'Volumen', sets: 3, range: '12-15', rest: 90, base: 60, step: 5 },
        { name: 'Wadenheben sitzend', note: 'Soleus', sets: 4, range: '12-15', rest: 60, base: 25, step: 2.5 }
      ]}
    ]
  },
  {
    id: 'full-body-3',
    name: 'Ganzkörper 3×',
    description: 'Einsteiger-freundlich. Drei Sessions, jede deckt alles ab.',
    tags: ['Anfänger', 'Klassisch'],
    days: [
      { label: 'Ganzkörper', variant: 'A', accent: 'push', weekday: 0, focus: 'Druck-Fokus', exercises: [
        { name: 'Kniebeuge', note: 'Langhantel', sets: 3, range: '8-10', rest: 180, base: 30, step: 2.5 },
        { name: 'Bankdrücken Langhantel', note: 'Brust', sets: 3, range: '8-10', rest: 150, base: 30, step: 2.5 },
        { name: 'Rudern Langhantel', note: 'Rücken', sets: 3, range: '8-10', rest: 120, base: 25, step: 2.5 },
        { name: 'Schulterdrücken Kurzhantel', note: 'Schulter', sets: 3, range: '10-12', rest: 90, base: 10, step: 1 },
        { name: 'Plank', note: 'Core Hold', type: 'hold', sets: 3, range: '30', rest: 60, bodyweight: true }
      ]},
      { label: 'Ganzkörper', variant: 'B', accent: 'pull', weekday: 2, focus: 'Zug-Fokus', exercises: [
        { name: 'Rumänisches Kreuzheben', note: 'Hamstrings', sets: 3, range: '8-10', rest: 180, base: 30, step: 2.5 },
        { name: 'Klimmzüge', note: 'Vertikaler Zug', sets: 3, range: 'max', rest: 180, bodyweight: true },
        { name: 'Schrägbankdrücken KH', note: 'Obere Brust', sets: 3, range: '8-10', rest: 120, base: 12, step: 1 },
        { name: 'Bulgarian Split Squats', note: 'Einbein', sets: 3, range: '8-10', rest: 90, base: 8, step: 1 },
        { name: 'Face Pulls', note: 'Hintere Schulter', sets: 3, range: '12-15', rest: 60, base: 12, step: 2.5 }
      ]},
      { label: 'Ganzkörper', variant: 'C', accent: 'legs', weekday: 4, focus: 'Bein-Fokus', exercises: [
        { name: 'Beinpresse', note: 'Quad', sets: 3, range: '10-12', rest: 120, base: 40, step: 5 },
        { name: 'Schrägbankdrücken KH', note: 'Brust', sets: 3, range: '10-12', rest: 90, base: 12, step: 1 },
        { name: 'Latzug Untergriff', note: 'Rücken', sets: 3, range: '10-12', rest: 90, base: 25, step: 2.5 },
        { name: 'Seitheben', note: 'Schulter', sets: 3, range: '12-15', rest: 60, base: 6, step: 0.5 },
        { name: 'Hammer Curls', note: 'Bizeps', sets: 3, range: '10-12', rest: 60, base: 8, step: 1 }
      ]}
    ]
  },
  {
    id: 'glute-focus-4',
    name: 'Glute Focus 4×',
    description: 'Zwei dedizierte Glute-Days, Oberkörper kompakt. Für Po-Fokus.',
    tags: ['Frauen', 'Glutes', 'Fortgeschritten'],
    days: [
      { label: 'Glutes', variant: 'A', accent: 'legs', weekday: 0, focus: 'Heavy · Hip Thrust & Co', exercises: [
        { name: 'Hip Thrust', note: 'Hauptübung Po · Langhantel', sets: 4, range: '6-8', rest: 180, base: 40, step: 2.5 },
        { name: 'Rumänisches Kreuzheben', note: 'Hamstrings · Po', sets: 4, range: '6-8', rest: 180, base: 30, step: 2.5 },
        { name: 'Bulgarian Split Squats', note: 'Einbein · Po-Aktivierung', sets: 3, range: '8-10', rest: 120, base: 8, step: 1 },
        { name: 'Cable Kickbacks', note: 'Glute Isolation', sets: 3, range: '12-15', rest: 60, base: 10, step: 2.5 },
        { name: 'Abduktoren Maschine', note: 'Mittlerer Po', sets: 3, range: '15-20', rest: 60, base: 25, step: 5 }
      ]},
      { label: 'Upper', variant: '', accent: 'push', weekday: 1, focus: 'Oberkörper kompakt', exercises: [
        { name: 'Bankdrücken Kurzhantel', note: 'Brust', sets: 3, range: '8-10', rest: 120, base: 10, step: 1 },
        { name: 'Rudern Kurzhantel', note: 'Rücken', sets: 3, range: '8-10', rest: 120, base: 12, step: 1 },
        { name: 'Schulterdrücken Kurzhantel', note: 'Schulter', sets: 3, range: '10-12', rest: 90, base: 8, step: 1 },
        { name: 'Latzug Untergriff', note: 'Lat + Bizeps', sets: 3, range: '10-12', rest: 90, base: 20, step: 2.5 },
        { name: 'Seitheben', note: 'Breite', sets: 3, range: '12-15', rest: 60, base: 4, step: 0.5 }
      ]},
      { label: 'Glutes', variant: 'B', accent: 'legs', weekday: 3, focus: 'Volumen · Quad + Po', exercises: [
        { name: 'Hip Thrust', note: 'Zweite Glute-Session', sets: 4, range: '10-12', rest: 150, base: 35, step: 2.5 },
        { name: 'Kniebeuge', note: 'Quad + Po', sets: 4, range: '8-10', rest: 150, base: 30, step: 2.5 },
        { name: 'Glute Bridges', note: 'Hohes Volumen', sets: 3, range: '12-15', rest: 60, base: 20, step: 2.5 },
        { name: 'Beinbeuger liegend', note: 'Hamstrings', sets: 3, range: '10-12', rest: 90, base: 15, step: 2.5 },
        { name: 'Abduktoren Maschine', note: 'Burnout', sets: 3, range: '15-20', rest: 45, base: 25, step: 5 }
      ]},
      { label: 'Upper + Core', variant: '', accent: 'pull', weekday: 4, focus: 'Pull · Core', exercises: [
        { name: 'Klimmzüge', note: 'Assistiert falls nötig', sets: 3, range: 'max', rest: 150, bodyweight: true },
        { name: 'Dips oder Brustpresse', note: 'Druck', sets: 3, range: '8-10', rest: 120, bodyweight: true },
        { name: 'Face Pulls', note: 'Hintere Schulter', sets: 3, range: '12-15', rest: 60, base: 10, step: 2.5 },
        { name: 'Langhantel-Curls', note: 'Bizeps', sets: 3, range: '10-12', rest: 60, base: 10, step: 2.5 },
        { name: 'Plank', note: 'Core Hold', type: 'hold', sets: 3, range: '45', rest: 45, bodyweight: true }
      ]}
    ]
  },
  {
    id: 'glute-full-body-3',
    name: 'Ganzkörper Glute-Bias 3×',
    description: 'Ganzkörper-Plan mit Po-Priorität. Drei Tage, Einsteiger-freundlich.',
    tags: ['Frauen', 'Anfänger', 'Glutes'],
    days: [
      { label: 'Ganzkörper', variant: 'A', accent: 'legs', weekday: 0, focus: 'Po + Oberkörper-Druck', exercises: [
        { name: 'Hip Thrust', note: 'Po · Hauptübung', sets: 3, range: '10-12', rest: 120, base: 30, step: 2.5 },
        { name: 'Kniebeuge', note: 'Quad + Po', sets: 3, range: '8-10', rest: 150, base: 25, step: 2.5 },
        { name: 'Bankdrücken Kurzhantel', note: 'Brust', sets: 3, range: '10-12', rest: 90, base: 8, step: 1 },
        { name: 'Rudern Kurzhantel', note: 'Rücken', sets: 3, range: '10-12', rest: 90, base: 10, step: 1 },
        { name: 'Plank', note: 'Core', type: 'hold', sets: 3, range: '30', rest: 45, bodyweight: true }
      ]},
      { label: 'Ganzkörper', variant: 'B', accent: 'pull', weekday: 2, focus: 'Hamstrings + Pull', exercises: [
        { name: 'Rumänisches Kreuzheben', note: 'Hamstrings · Po', sets: 3, range: '8-10', rest: 150, base: 25, step: 2.5 },
        { name: 'Bulgarian Split Squats', note: 'Einbein · Po', sets: 3, range: '10-12', rest: 90, base: 6, step: 1 },
        { name: 'Latzug Untergriff', note: 'Rücken', sets: 3, range: '10-12', rest: 90, base: 20, step: 2.5 },
        { name: 'Schulterdrücken Kurzhantel', note: 'Schulter', sets: 3, range: '10-12', rest: 90, base: 7, step: 1 },
        { name: 'Abduktoren Maschine', note: 'Po seitlich', sets: 3, range: '15-20', rest: 45, base: 20, step: 5 }
      ]},
      { label: 'Ganzkörper', variant: 'C', accent: 'push', weekday: 4, focus: 'Glute Volumen + Ganzkörper', exercises: [
        { name: 'Hip Thrust', note: 'Zweite Glute-Einheit', sets: 3, range: '12-15', rest: 90, base: 25, step: 2.5 },
        { name: 'Cable Kickbacks', note: 'Glute Isolation', sets: 3, range: '12-15', rest: 45, base: 8, step: 2.5 },
        { name: 'Dips oder Brustpresse', note: 'Druck', sets: 3, range: '10-12', rest: 90, bodyweight: true },
        { name: 'Rudern Kurzhantel', note: 'Rücken', sets: 3, range: '10-12', rest: 90, base: 10, step: 1 },
        { name: 'Face Pulls', note: 'Hintere Schulter', sets: 3, range: '12-15', rest: 60, base: 10, step: 2.5 }
      ]}
    ]
  }
];

function applyTemplate(templateId) {
  const tpl = PLAN_TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;
  editorDraft = {
    days: tpl.days.map(d => ({
      id: genId('d'),
      label: d.label,
      variant: d.variant || '',
      accent: d.accent || 'push',
      weekday: typeof d.weekday === 'number' && d.weekday >= 0 && d.weekday <= 6 ? d.weekday : -1,
      focus: d.focus || '',
      exercises: (d.exercises || []).map(e => {
        const hasWeight = !e.bodyweight && typeof e.base === 'number' && e.base > 0;
        // If template name matches a known exercise, pull localized name/note from EXERCISES
        const knownId = exerciseId(e.name);
        const knownDef = EXERCISES[knownId];
        const localizedName = knownDef ? exDisplay(knownDef, 'name') : e.name;
        const localizedNote = knownDef ? exDisplay(knownDef, 'note') : (e.note || '');
        return {
          id: genId('ex'),
          name: localizedName,
          note: localizedNote || (e.note || ''),
          type: e.type === 'hold' ? 'hold' : 'reps',
          sets: e.sets || 3,
          range: e.range || (e.type === 'hold' ? '30' : '8-10'),
          rest: e.rest || 90,
          base: hasWeight ? e.base : 0,
          step: e.step || 2.5,
          bodyweight: !hasWeight
        };
      })
    }))
  };
  closeTemplateSheet();
  renderEditor();
}

function renderTemplateList() {
  const list = document.getElementById('template-list');
  if (!list) return;
  list.innerHTML = '';
  PLAN_TEMPLATES.forEach(t => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'template-item';
    const tags = (t.tags || []).map(tag =>
      `<span class="template-item-tag${tag === 'Frauen' ? ' highlight' : ''}">${escapeHtml(tag)}</span>`
    ).join('');
    item.innerHTML = `
      <div class="template-item-name">${escapeHtml(t.name)}</div>
      <div class="template-item-desc">${escapeHtml(t.description)}</div>
      <div class="template-item-tags">${tags}</div>
    `;
    item.addEventListener('click', () => applyTemplate(t.id));
    list.appendChild(item);
  });
}

function openTemplateSheet() {
  renderTemplateList();
  const sheet = document.getElementById('template-sheet');
  if (sheet) {
    sheet.classList.remove('hidden');
    sheet.setAttribute('aria-hidden', 'false');
  }
}

function closeTemplateSheet() {
  const sheet = document.getElementById('template-sheet');
  if (sheet) {
    sheet.classList.add('hidden');
    sheet.setAttribute('aria-hidden', 'true');
  }
}

document.getElementById('template-close')?.addEventListener('click', closeTemplateSheet);
document.getElementById('template-sheet')?.addEventListener('click', e => {
  if (e.target.id === 'template-sheet') closeTemplateSheet();
});
document.getElementById('editor-load')?.addEventListener('click', openTemplateSheet);

// Editor-Overlay
let editorDraft = null;

function openEditor() {
  const existing = loadCustomPlan();
  editorDraft = existing.days.length ? JSON.parse(JSON.stringify(existing)) : defaultCustomPlan();
  renderEditor();
  const el = document.getElementById('custom-editor');
  if (el) {
    el.classList.remove('hidden');
    el.setAttribute('aria-hidden', 'false');
  }
}

function closeEditor() {
  const el = document.getElementById('custom-editor');
  if (el) {
    el.classList.add('hidden');
    el.setAttribute('aria-hidden', 'true');
  }
  editorDraft = null;
}

function renderEditor() {
  const body = document.getElementById('editor-body');
  if (!body || !editorDraft) return;
  body.innerHTML = '';

  editorDraft.days.forEach((day, dayIdx) => {
    const card = document.createElement('div');
    card.className = 'editor-day-card';
    card.innerHTML = `
      <div class="editor-day-head">
        <label class="editor-field">
          <span class="editor-field-label">${escapeHtml(t('editor.day.label'))}</span>
          <input class="editor-input" value="${escapeAttr(day.label || '')}" placeholder="${escapeAttr(t('editor.day.label.placeholder'))}" data-f="label">
        </label>
        <button class="editor-icon-btn" data-a="del-day" aria-label="${escapeAttr(t('editor.day.delete.aria'))}" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="editor-row-meta">
        <label class="editor-field">
          <span class="editor-field-label">${escapeHtml(t('editor.day.accent'))}</span>
          <select class="editor-select" data-f="accent">
            <option value="push"${day.accent === 'push' ? ' selected' : ''}>${escapeHtml(t('editor.day.accent.push'))}</option>
            <option value="pull"${day.accent === 'pull' ? ' selected' : ''}>${escapeHtml(t('editor.day.accent.pull'))}</option>
            <option value="legs"${day.accent === 'legs' ? ' selected' : ''}>${escapeHtml(t('editor.day.accent.legs'))}</option>
          </select>
        </label>
        <label class="editor-field">
          <span class="editor-field-label">${escapeHtml(t('editor.day.weekday'))}</span>
          <select class="editor-select" data-f="weekday">
            <option value="-1"${!(day.weekday >= 0 && day.weekday <= 6) ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.none'))}</option>
            <option value="0"${day.weekday === 0 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.mon'))}</option>
            <option value="1"${day.weekday === 1 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.tue'))}</option>
            <option value="2"${day.weekday === 2 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.wed'))}</option>
            <option value="3"${day.weekday === 3 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.thu'))}</option>
            <option value="4"${day.weekday === 4 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.fri'))}</option>
            <option value="5"${day.weekday === 5 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.sat'))}</option>
            <option value="6"${day.weekday === 6 ? ' selected' : ''}>${escapeHtml(t('editor.day.weekday.sun'))}</option>
          </select>
        </label>
        <label class="editor-field fixed" style="flex: 0 0 80px">
          <span class="editor-field-label">${escapeHtml(t('editor.day.variant'))}</span>
          <input class="editor-input" value="${escapeAttr(day.variant || '')}" placeholder="${escapeAttr(t('editor.day.variant.placeholder'))}" data-f="variant">
        </label>
        <label class="editor-field" style="flex: 1 1 100%">
          <span class="editor-field-label">${escapeHtml(t('editor.day.focus'))}</span>
          <input class="editor-input" value="${escapeAttr(day.focus || '')}" placeholder="${escapeAttr(t('editor.day.focus.placeholder'))}" data-f="focus">
        </label>
      </div>
      <div class="editor-section-title">${escapeHtml(t('editor.exercises'))}</div>
    `;
    card.querySelectorAll('[data-f]').forEach(input => {
      const field = input.dataset.f;
      const handler = e => {
        const v = e.target.value;
        if (field === 'weekday') day.weekday = parseInt(v, 10);
        else day[field] = v;
      };
      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });
    card.querySelector('[data-a="del-day"]').addEventListener('click', () => {
      editorDraft.days.splice(dayIdx, 1);
      renderEditor();
    });

    (day.exercises || []).forEach((ex, exIdx) => {
      const row = document.createElement('div');
      row.className = 'editor-ex-row';
      const isHold = ex.type === 'hold';
      const rangeLabel = isHold ? t('editor.ex.range.hold') : t('editor.ex.range.reps');
      const rangeDefault = isHold ? '30' : '8-10';
      const rangePlaceholder = isHold ? t('editor.ex.range.hold.placeholder') : t('editor.ex.range.reps.placeholder');
      const baseValue = ex.bodyweight || ex.base == null || ex.base === '' ? '' : ex.base;
      row.innerHTML = `
        <div class="editor-ex-fields">
          <label class="editor-field">
            <span class="editor-field-label">${escapeHtml(t('editor.ex.name'))}</span>
            <input class="editor-input" value="${escapeAttr(ex.name || '')}" placeholder="${escapeAttr(t('editor.ex.name.placeholder'))}" data-f="name">
          </label>
          <label class="editor-field">
            <span class="editor-field-label">${escapeHtml(t('editor.ex.note'))}</span>
            <input class="editor-input" value="${escapeAttr(ex.note || '')}" placeholder="${escapeAttr(t('editor.ex.note.placeholder'))}" data-f="note">
          </label>
          <label class="editor-field">
            <span class="editor-field-label">${escapeHtml(t('editor.ex.type'))}</span>
            <select class="editor-select" data-f="type">
              <option value="reps"${!isHold ? ' selected' : ''}>${escapeHtml(t('editor.ex.type.reps'))}</option>
              <option value="hold"${isHold ? ' selected' : ''}>${escapeHtml(t('editor.ex.type.hold'))}</option>
            </select>
          </label>
          <div class="editor-ex-fields-row">
            <label class="editor-field fixed" style="flex: 0 0 70px">
              <span class="editor-field-label">${escapeHtml(t('editor.ex.sets'))}</span>
              <input class="editor-input" value="${escapeAttr(ex.sets || 3)}" type="number" min="1" max="10" data-f="sets">
            </label>
            <label class="editor-field">
              <span class="editor-field-label">${escapeHtml(rangeLabel)}</span>
              <input class="editor-input" value="${escapeAttr(ex.range || rangeDefault)}" placeholder="${escapeAttr(rangePlaceholder)}" data-f="range">
            </label>
            <label class="editor-field fixed" style="flex: 0 0 90px">
              <span class="editor-field-label">${escapeHtml(t('editor.ex.rest'))}</span>
              <input class="editor-input" value="${escapeAttr(ex.rest || 90)}" type="number" min="0" max="600" step="15" data-f="rest">
            </label>
          </div>
          <div class="editor-ex-fields-row">
            <label class="editor-field">
              <span class="editor-field-label">${escapeHtml(t('editor.ex.base'))}</span>
              <input class="editor-input" value="${escapeAttr(baseValue)}" type="number" min="0" step="0.5" placeholder="${escapeAttr(t('editor.ex.base.placeholder'))}" data-f="base">
            </label>
            <label class="editor-field">
              <span class="editor-field-label">${escapeHtml(t('editor.ex.step'))}</span>
              <input class="editor-input" value="${escapeAttr(ex.step || 2.5)}" type="number" min="0.25" step="0.25" data-f="step">
            </label>
          </div>
        </div>
        <button class="editor-icon-btn" data-a="del-ex" aria-label="${escapeAttr(t('editor.ex.delete.aria'))}" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      row.querySelectorAll('[data-f]').forEach(input => {
        const field = input.dataset.f;
        const handler = e => {
          const v = e.target.value;
          if (field === 'sets' || field === 'rest') {
            ex[field] = parseInt(v, 10) || 0;
          } else if (field === 'base') {
            if (v === '') { ex.base = null; ex.bodyweight = true; }
            else { const n = parseFloat(v); ex.base = isNaN(n) ? null : n; ex.bodyweight = !n || n <= 0; }
          } else if (field === 'step') {
            ex[field] = parseFloat(v) || 0;
          } else if (field === 'type') {
            ex.type = v === 'hold' ? 'hold' : 'reps';
            renderEditor();
          } else {
            ex[field] = v;
          }
        };
        input.addEventListener('input', handler);
        input.addEventListener('change', handler);
      });
      row.querySelector('[data-a="del-ex"]').addEventListener('click', () => {
        day.exercises.splice(exIdx, 1);
        renderEditor();
      });
      card.appendChild(row);
    });

    const addEx = document.createElement('button');
    addEx.className = 'editor-add-ex';
    addEx.type = 'button';
    addEx.textContent = t('editor.add.ex');
    addEx.addEventListener('click', () => {
      if (!day.exercises) day.exercises = [];
      day.exercises.push({ id: genId('ex'), name: '', note: '', sets: 3, range: '8-10', rest: 90, base: 20, step: 2.5 });
      renderEditor();
    });
    card.appendChild(addEx);
    body.appendChild(card);
  });

  const addDay = document.createElement('button');
  addDay.className = 'editor-add-day';
  addDay.type = 'button';
  addDay.textContent = t('editor.add.day');
  addDay.addEventListener('click', () => {
    const accents = ['push', 'pull', 'legs'];
    editorDraft.days.push({
      id: genId('d'),
      label: 'Tag',
      variant: '',
      accent: accents[editorDraft.days.length % 3],
      focus: '',
      weekday: -1,
      exercises: []
    });
    renderEditor();
  });
  body.appendChild(addDay);
}

function sanitizePlan(plan) {
  return {
    days: (plan.days || [])
      .filter(d => (d.label || '').trim())
      .map(d => ({
        id: d.id || genId('d'),
        label: (d.label || 'Tag').trim(),
        variant: (d.variant || '').trim(),
        accent: ['push', 'pull', 'legs'].includes(d.accent) ? d.accent : 'push',
        focus: (d.focus || '').trim(),
        weekday: typeof d.weekday === 'number' && d.weekday >= 0 && d.weekday <= 6 ? d.weekday : -1,
        exercises: (d.exercises || [])
          .filter(e => (e.name || '').trim())
          .map(e => {
            const baseNum = parseFloat(e.base);
            const hasWeight = !isNaN(baseNum) && baseNum > 0;
            const type = e.type === 'hold' ? 'hold' : 'reps';
            const defaultRange = type === 'hold' ? '30' : '8-10';
            return {
              id: e.id || genId('ex'),
              name: (e.name || '').trim(),
              note: (e.note || '').trim(),
              type,
              sets: Math.max(1, Math.min(10, parseInt(e.sets, 10) || 3)),
              range: ((e.range || defaultRange) + '').trim() || defaultRange,
              rest: Math.max(0, Math.min(600, parseInt(e.rest, 10) || 90)),
              base: hasWeight ? baseNum : 0,
              step: Math.max(0.25, parseFloat(e.step) || 2.5),
              bodyweight: !hasWeight
            };
          })
      }))
  };
}

document.getElementById('editor-cancel')?.addEventListener('click', closeEditor);
document.getElementById('editor-save')?.addEventListener('click', () => {
  if (!editorDraft) return;
  const clean = sanitizePlan(editorDraft);
  saveCustomPlan(clean);
  setPlanMode('custom');
  mergeCustomIntoExercises();
  // Start-Gewichte für neue Übungen aus base setzen, falls noch nicht vorhanden
  const weights = loadWeights();
  const history = loadWeightHistory();
  const today = todayIso();
  let changed = false;
  clean.days.forEach(d => d.exercises.forEach(ex => {
    if (ex.bodyweight) return;
    if (weights[ex.id] == null) { weights[ex.id] = ex.base || 0; changed = true; }
    if (!history[ex.id]) { history[ex.id] = [{ date: today, weight: weights[ex.id] }]; changed = true; }
  }));
  if (changed) { saveWeights(weights); saveWeightHistory(history); }
  closeEditor();
  applyFrequency();
  initExOriginals();
  renderWeights();
  initExReps();
  renderSets();
  refreshRecommendations();
});

// Frequency / Plan-Modus
function applyFrequency() {
  const mode = getPlanMode();
  let freq = '6';
  try { freq = localStorage.getItem('ppl-frequency') || '6'; } catch (e) {}
  const activeVariant = mode === 'custom' ? 'custom' : freq;

  if (mode === 'custom') {
    mergeCustomIntoExercises();
    renderCustomPlan();
  }

  document.querySelectorAll('.plan-variant').forEach(el => {
    el.style.display = el.dataset.freq === activeVariant ? 'block' : 'none';
  });

  const eyebrow = document.querySelector('.eyebrow');
  const sub = document.querySelector('.sub');
  if (mode === 'custom') {
    eyebrow.textContent = t('header.custom.eyebrow');
    sub.textContent = t('header.custom.sub');
  } else if (freq === '3') {
    eyebrow.textContent = t('header.3.eyebrow');
    sub.textContent = t('header.3.sub');
  } else {
    eyebrow.textContent = t('header.6.eyebrow');
    sub.textContent = t('header.6.sub');
  }

  document.querySelectorAll('#plan-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.choose === activeVariant);
  });

  applyCalendar(activeVariant);
  if (typeof renderProgress === 'function') renderProgress();
}

function initPlanSwitch() {
  document.querySelectorAll('#plan-switch button').forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choose;
      if (choice === 'custom') {
        setPlanMode('custom');
      } else {
        setPlanMode('preset');
        try { localStorage.setItem('ppl-frequency', choice); } catch (e) {}
      }
      applyFrequency();
      renderWeights();
      initExReps();
      renderSets();
      refreshRecommendations();
    });
  });
}

// Kalender-Sync: heutigen Wochentag markieren und passenden Day aufklappen
const DAY_TO_LABEL_6X = {
  0: 'Push A', 1: 'Pull A', 2: 'Legs A',
  3: 'Push B', 4: 'Pull B', 5: 'Legs B'
};
const DAY_TO_LABEL_3X = { 0: 'Push', 2: 'Pull', 4: 'Legs' };

function getWeekdayIndex() {
  const js = new Date().getDay();
  return js === 0 ? 6 : js - 1;
}

function findDayByLabel(variantEl, label) {
  if (!variantEl || !label) return null;
  return Array.from(variantEl.querySelectorAll('.day')).find(d => {
    const l = d.querySelector('.day-label')?.textContent?.trim() ?? '';
    const v = d.querySelector('.variant')?.textContent?.trim();
    return (v ? `${l} ${v}` : l) === label;
  });
}

function applyCalendar(freq) {
  const today = getWeekdayIndex();
  const variantEl = document.querySelector(`.plan-variant[data-freq="${freq}"]`);
  if (!variantEl) return;
  variantEl.querySelectorAll('.week-day').forEach((el, i) => {
    el.classList.toggle('today', i === today);
  });
  variantEl.querySelectorAll('.day').forEach(d => d.classList.remove('open', 'is-today'));
  let target = null;
  if (freq === 'custom') {
    const plan = loadCustomPlan();
    const dayToday = plan.days.find(d => typeof d.weekday === 'number' && d.weekday === today);
    if (dayToday) target = variantEl.querySelector(`.day[data-custom-day-id="${dayToday.id}"]`);
  } else {
    const map = freq === '3' ? DAY_TO_LABEL_3X : DAY_TO_LABEL_6X;
    target = findDayByLabel(variantEl, map[today] || null);
  }
  if (target) target.classList.add('open', 'is-today');
  const banner = document.getElementById('rest-banner');
  if (banner) banner.classList.toggle('hidden', !!target);
}

// Onboarding
function shouldOnboard() {
  // Im Browser kein Onboarding zeigen, sonst hindert es Leute am Installieren.
  // Erst in der installierten PWA (standalone) lassen wir die Q&A laufen.
  const installed = window.navigator.standalone === true ||
                    window.matchMedia('(display-mode: standalone)').matches;
  if (!installed) return false;
  try {
    return !localStorage.getItem('ppl-onboarded') && !localStorage.getItem('ppl-pack-items');
  } catch (e) { return false; }
}

function markOnboarded() {
  try { localStorage.setItem('ppl-onboarded', '1'); } catch (e) {}
}

function startOnboarding() {
  const overlay = document.getElementById('onboarding');
  const content = document.getElementById('onboarding-content');
  const actions = document.getElementById('onboarding-actions');
  const progressBar = document.getElementById('onboarding-progress');

  let collected = baseItemsForLang();
  const profile = { ...DEFAULT_PROFILE };
  let frequency = '6';
  let planMode = 'preset';
  const totalSteps = PROFILE_QUESTIONS.length + 1 + ONBOARDING_QUESTIONS.length;

  function setProgress(step) {
    const pct = step === 0 ? 0 : (Math.min(step, totalSteps) / totalSteps) * 100;
    progressBar.style.width = pct + '%';
  }

  function finish(finalItems) {
    items = [...finalItems];
    state = new Array(items.length).fill(false);
    saveItems();
    saveState();
    saveProfile(profile);
    initWeightsFromProfile(profile);
    try { localStorage.setItem('ppl-frequency', frequency); } catch (e) {}
    setPlanMode(planMode);
    applyFrequency();
    renderWeights();
    refreshRecommendations();
    markOnboarded();
    render();
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    if (!isStandalone) exportStateToUrl();
    if (planMode === 'custom') openEditor();
  }

  function showLanguage() {
    setProgress(0);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">Sprache · Language</div>
        <div class="onboarding-title">Welche Sprache?<br>Which language?</div>
        <div class="onboarding-hint">Du kannst sie später jederzeit ändern. You can change it any time later.</div>
      </div>
    `;
    actions.innerHTML = '';
    const de = document.createElement('button');
    de.className = 'onboarding-btn primary';
    de.textContent = 'Deutsch';
    de.addEventListener('click', () => pickLang('de'));
    actions.appendChild(de);

    const en = document.createElement('button');
    en.className = 'onboarding-btn';
    en.textContent = 'English';
    en.addEventListener('click', () => pickLang('en'));
    actions.appendChild(en);
  }

  function pickLang(l) {
    saveLang(l);
    applyI18n();
    collected = baseItemsForLang();
    showIntro();
  }

  function showIntro() {
    setProgress(0);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">${escapeHtml(t('onb.intro.eyebrow'))}</div>
        <div class="onboarding-title">${escapeHtml(t('onb.intro.title'))}</div>
        <div class="onboarding-text">${escapeHtml(t('onb.intro.text'))}</div>
        <div class="onboarding-privacy">
          <div class="onboarding-privacy-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
          </div>
          <div>
            <div class="onboarding-privacy-title">${escapeHtml(t('onb.intro.privacy.title'))}</div>
            <div class="onboarding-privacy-text">${escapeHtml(t('onb.intro.privacy.text'))}</div>
          </div>
        </div>
      </div>
    `;
    actions.innerHTML = '';
    const start = document.createElement('button');
    start.className = 'onboarding-btn primary';
    start.textContent = t('onb.intro.start');
    start.addEventListener('click', () => showProfileQuestion(0));
    actions.appendChild(start);

    const skip = document.createElement('button');
    skip.className = 'onboarding-skip';
    skip.textContent = t('onb.intro.skip');
    skip.addEventListener('click', () => finish(baseItemsForLang()));
    actions.appendChild(skip);
  }

  function showProfileQuestion(i) {
    const q = PROFILE_QUESTIONS[i];
    setProgress(i + 1);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">${escapeHtml(t('onb.profile.eyebrow', { n: i + 1, total: PROFILE_QUESTIONS.length }))}</div>
        <div class="onboarding-title">${escapeHtml(t(q.qKey))}</div>
        <div class="onboarding-hint">${escapeHtml(t(q.hintKey))}</div>
      </div>
    `;
    actions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'onboarding-btn' + (idx === 0 ? ' primary' : '');
      btn.textContent = t(opt.labelKey);
      btn.addEventListener('click', () => {
        profile[q.id] = opt.value;
        if (i + 1 < PROFILE_QUESTIONS.length) showProfileQuestion(i + 1);
        else showFrequency();
      });
      actions.appendChild(btn);
    });
  }

  function showFrequency() {
    setProgress(PROFILE_QUESTIONS.length + 1);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">${escapeHtml(t('onb.training.eyebrow'))}</div>
        <div class="onboarding-title">${escapeHtml(t('onb.training.title'))}</div>
        <div class="onboarding-hint">${escapeHtml(t('onb.training.hint'))}</div>
      </div>
    `;
    actions.innerHTML = '';

    const btn3 = document.createElement('button');
    btn3.className = 'onboarding-btn';
    btn3.textContent = t('onb.training.3');
    btn3.addEventListener('click', () => { frequency = '3'; planMode = 'preset'; showQuestion(0); });
    actions.appendChild(btn3);

    const btn6 = document.createElement('button');
    btn6.className = 'onboarding-btn primary';
    btn6.textContent = t('onb.training.6');
    btn6.addEventListener('click', () => { frequency = '6'; planMode = 'preset'; showQuestion(0); });
    actions.appendChild(btn6);

    const btnCustom = document.createElement('button');
    btnCustom.className = 'onboarding-btn';
    btnCustom.textContent = t('onb.training.custom');
    btnCustom.addEventListener('click', () => { planMode = 'custom'; showQuestion(0); });
    actions.appendChild(btnCustom);
  }

  function showQuestion(i) {
    const q = ONBOARDING_QUESTIONS[i];
    setProgress(PROFILE_QUESTIONS.length + 1 + i + 1);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">${escapeHtml(t('onb.pack.eyebrow', { n: i + 1, total: ONBOARDING_QUESTIONS.length }))}</div>
        <div class="onboarding-title">${escapeHtml(t(q.qKey))}</div>
        <div class="onboarding-hint">${escapeHtml(t(q.hintKey))}</div>
      </div>
    `;
    actions.innerHTML = '';

    const yes = document.createElement('button');
    yes.className = 'onboarding-btn primary';
    yes.textContent = t('onb.yes');
    yes.addEventListener('click', () => {
      collected.push(...questionItems(q));
      next(i);
    });
    actions.appendChild(yes);

    const no = document.createElement('button');
    no.className = 'onboarding-btn';
    no.textContent = t('onb.no');
    no.addEventListener('click', () => next(i));
    actions.appendChild(no);
  }

  function next(i) {
    if (i + 1 < ONBOARDING_QUESTIONS.length) showQuestion(i + 1);
    else showDone();
  }

  function showDone() {
    setProgress(totalSteps);
    const doneText = planMode === 'custom'
      ? t('onb.done.text.custom', { count: collected.length })
      : t('onb.done.text', { freq: frequency, count: collected.length });
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">${escapeHtml(t('onb.done.eyebrow'))}</div>
        <div class="onboarding-title">${escapeHtml(t('onb.done.title'))}</div>
        <div class="onboarding-text">${escapeHtml(doneText)}</div>
      </div>
    `;
    actions.innerHTML = '';
    const done = document.createElement('button');
    done.className = 'onboarding-btn primary';
    done.textContent = t('onb.done.button');
    done.addEventListener('click', () => finish(collected));
    actions.appendChild(done);
  }

  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  showLanguage();
}

// Share + Streak Freeze
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 320);
  }, 2800);
}

function grantFreezeIfEligible() {
  const today = todayIso();
  let last;
  try { last = localStorage.getItem('ppl-last-share-reward'); } catch (e) {}
  if (last === today) return 'already-today';
  const f = loadFreezes();
  if (f.available >= 3) return 'capped';
  f.available += 1;
  saveFreezes(f);
  try { localStorage.setItem('ppl-last-share-reward', today); } catch (e) {}
  renderFreezeBadge();
  renderStats();
  return 'granted';
}

async function shareApp() {
  const url = window.location.origin + '/';
  const shareData = {
    title: 'PPL · Push Pull Legs',
    text: 'Mein Gym-Plan als Mini-App. Offline, ohne Account.',
    url
  };
  let shared = false;
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      shared = true;
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      shared = true;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  if (!shared) { showToast(url); return; }
  const result = grantFreezeIfEligible();
  if (result === 'granted') {
    showToast(t(navigator.share ? 'toast.share.granted.share' : 'toast.share.granted.copy'));
  } else if (result === 'capped') {
    showToast(t('toast.share.capped'));
  } else {
    showToast(t(navigator.share ? 'toast.share.thanks.share' : 'toast.share.thanks.copy'));
  }
}

applyI18n();
initLangToggle();
initPlanSwitch();
applyFrequency();
ensureWeightsInitialized();
initExOriginals();
applySubstitutes();
renderSwapButtons();
renderWeights();
initExReps();
renderSets();
renderStats();
renderFreezeBadge();
refreshRecommendations();
renderInlineProgressBars();
renderProgress();
initRecToggle();
initThemeToggle();
document.getElementById('share-btn')?.addEventListener('click', shareApp);

if (shouldOnboard()) {
  items = [];
  state = [];
  render();
  startOnboarding();
} else {
  if (!localStorage.getItem('ppl-onboarded')) markOnboarded();
  loadItems();
  loadState();
  render();
}

// Service Worker registrieren + Update-Benachrichtigung
function showUpdateBanner(worker) {
  if (document.querySelector('.update-banner')) return;
  const banner = document.createElement('div');
  banner.className = 'update-banner';
  banner.innerHTML = `<span>${t('update.text')}</span><button type="button">${t('update.button')}</button>`;
  banner.querySelector('button').addEventListener('click', () => {
    worker.postMessage('skipWaiting');
  });
  document.body.appendChild(banner);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      if (reg.waiting && navigator.serviceWorker.controller) showUpdateBanner(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateBanner(nw);
        });
      });

      // iOS PWAs prüfen Service Worker sonst frühestens alle 24h oder gar
      // nicht mehr. Deshalb: aktiver Check beim Laden und bei jedem
      // Wechsel aus dem Hintergrund in den Vordergrund.
      const forceUpdate = () => { reg.update().catch(() => {}); };
      forceUpdate();
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') forceUpdate();
      });
      window.addEventListener('focus', forceUpdate);
    }).catch(() => {});

    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  });
}

// Install-Hinweis (Banner mit Pfeil Richtung Browser-Menü)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isStandalone = window.navigator.standalone === true ||
                     window.matchMedia('(display-mode: standalone)').matches;
const isInAppWebView = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Snapchat|Line|MicroMessenger|TikTok|musical_ly|Bytedance/i.test(navigator.userAgent);

if (isInAppWebView && !isStandalone) {
  const igOverlay = document.getElementById('ig-overlay');
  if (igOverlay) {
    igOverlay.classList.remove('hidden');
    igOverlay.setAttribute('aria-hidden', 'false');
    document.getElementById('ig-dismiss')?.addEventListener('click', () => {
      igOverlay.classList.add('hidden');
      igOverlay.setAttribute('aria-hidden', 'true');
    });
  }
}

function showInstallHint(options) {
  const forced = options && options.forced;
  if (!forced && localStorage.getItem('ppl-install-dismissed')) return;
  if (document.getElementById('ppl-install-banner')) return;
  exportStateToUrl();
  const banner = document.createElement('div');
  banner.id = 'ppl-install-banner';
  banner.style.cssText = `
    position: fixed; bottom: 20px; left: 20px; right: 20px;
    background: var(--surface-2); border: 1px solid var(--border); border-radius: 14px;
    padding: 16px; z-index: 100; color: var(--text);
    font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.5;
    box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    max-width: 480px; margin: 0 auto;
  `;
  banner.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
      <div>
        <div style="font-family: 'Bebas Neue'; font-size: 18px; letter-spacing: 0.05em; margin-bottom: 4px;">${t('install.title')}</div>
        <div style="color: var(--text-dim); font-size: 11px;">${t('install.text')}</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <button id="ppl-dismiss" style="background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 6px 10px; border-radius: 6px; font-family: inherit; font-size: 11px; cursor: pointer;">${t('install.dismiss')}</button>
        <svg class="install-hint-arrow" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="6 13 12 19 18 13"/>
        </svg>
      </div>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('ppl-dismiss').addEventListener('click', () => {
    localStorage.setItem('ppl-install-dismissed', '1');
    banner.remove();
  });
}

if (isIOS && !isStandalone) showInstallHint();

const installBtn = document.getElementById('install-btn');
if (installBtn) {
  if (isStandalone) {
    installBtn.remove();
  } else {
    installBtn.addEventListener('click', () => showInstallHint({ forced: true }));
  }
}
