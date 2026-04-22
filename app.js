// Daten zwischen Safari und PWA via URL-Parameter übertragen
// (iOS isoliert localStorage zwischen Safari und installierter PWA)
const PPL_MIGRATABLE_KEYS = [
  'ppl-pack-items', 'ppl-pack-state', 'ppl-onboarded', 'ppl-frequency',
  'ppl-profile', 'ppl-weights', 'ppl-weight-history', 'ppl-sets',
  'ppl-sessions', 'ppl-freezes', 'ppl-last-share-reward', 'ppl-rec-enabled',
  'ppl-install-dismissed', 'ppl-substitutes', 'ppl-plan-mode', 'ppl-custom-plan'
];

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
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('view-' + tab.dataset.view).classList.add('active');
  });
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

const PROFILE_QUESTIONS = [
  {
    id: 'gender',
    question: 'Was ist dein Geschlecht?',
    hint: 'Bestimmt den Startpunkt deiner Trainingsgewichte.',
    options: [
      { label: 'Mann', value: 'male' },
      { label: 'Frau', value: 'female' },
      { label: 'Divers', value: 'diverse' }
    ]
  },
  {
    id: 'age',
    question: 'Wie alt bist du?',
    hint: 'Alter beeinflusst Kraft und Regeneration.',
    options: [
      { label: '18 bis 25', value: '18-25' },
      { label: '26 bis 35', value: '26-35' },
      { label: '36 bis 50', value: '36-50' },
      { label: 'Über 50', value: '50+' }
    ]
  },
  {
    id: 'nutrition',
    question: 'Achtest du auf deine Ernährung?',
    hint: 'Bestimmt, wie häufig dir Gewichtssteigerungen empfohlen werden. Mit genug Protein gehen Fortschritte schneller.',
    options: [
      { label: 'Ja, Protein-bewusst', value: 'protein' },
      { label: 'Casual, keine feste Routine', value: 'casual' }
    ]
  },
  {
    id: 'commitment',
    question: 'Ziehst du den Plan durch?',
    hint: 'Bestimmt, wie häufig dir Gewichtssteigerungen empfohlen werden. Voll dabei heißt häufigere Empfehlungen.',
    options: [
      { label: 'Ja, voll dabei', value: 'full' },
      { label: 'Mal so, mal so', value: 'casual' }
    ]
  }
];

const ONBOARDING_QUESTIONS = [
  {
    question: 'Duschst du im Gym?',
    hint: 'Wir packen Handtuch, Shampoo, Schlappen und Deo mit ein.',
    items: ['Trockenhandtuch', 'Shampoo', 'Schlappen', 'Deo']
  },
  {
    question: 'Hörst du Musik beim Training?',
    hint: 'Kopfhörer kommen mit auf die Liste.',
    items: ['Kopfhörer']
  },
  {
    question: 'Hast du nach dem Training direkt was vor?',
    hint: 'Skincare und Parfum kommen für danach mit.',
    items: ['Skincare', 'Parfum']
  }
];

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
      <input type="text" class="pack-add-input" placeholder="Neues Item hinzufügen...">
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
  editBtn.textContent = editMode ? 'Fertig' : 'Bearbeiten';
  editBtn.classList.toggle('active', editMode);
  render();
});

// Übungen — base = Startgewicht kg, step = +/- Schritt kg, rest = Pause s,
// bodyweight = ohne Gewichts-Tracking, alternatives = gängige Austausch-Optionen.
// name/note werden beim Swap ins DOM geschrieben.
const EXERCISES = {
  'bankdruecken-langhantel':     { name: 'Bankdrücken Langhantel', note: 'Hauptübung Brust',                base: 40, step: 2.5, rest: 180, alternatives: ['schraegbankdruecken-kh', 'bankdruecken-kurzhantel'] },
  'schulterdruecken-kurzhantel': { name: 'Schulterdrücken Kurzhantel', note: 'Sitzend · vordere Schulter',  base: 12, step: 1,   rest: 90,  alternatives: ['schulterdruecken-langhantel', 'arnold-press'] },
  'seitheben':                   { name: 'Seitheben', note: 'Seitliche Schulter · Breite',                  base: 6,  step: 0.5, rest: 60,  alternatives: ['seitheben-kabel', 'seitheben-maschine'] },
  'trizepsdruecken-kabel':       { name: 'Trizepsdrücken Kabel', note: 'Isolation',                         base: 15, step: 2.5, rest: 60,  alternatives: ['trizeps-overhead', 'french-press'] },
  'schraegbankdruecken-kh':      { name: 'Schrägbankdrücken KH', note: 'Obere Brust',                       base: 15, step: 1,   rest: 120, alternatives: ['bankdruecken-langhantel', 'bankdruecken-kurzhantel'] },
  'dips-oder-brustpresse':       { name: 'Dips oder Brustpresse', note: 'Untere Brust · Trizeps',           bodyweight: true,    rest: 120, alternatives: ['bankdruecken-langhantel', 'trizepsdruecken-kabel'] },
  'trizeps-overhead':            { name: 'Trizeps Overhead', note: 'Langer Trizeps-Kopf',                   base: 10, step: 1,   rest: 60,  alternatives: ['trizepsdruecken-kabel', 'french-press'] },
  'klimmzuege':                  { name: 'Klimmzüge', note: 'Breiter Griff · Rücken-Basis',                 bodyweight: true,    rest: 180, alternatives: ['latzug-untergriff', 'latzug-breit'] },
  'rudern-langhantel':           { name: 'Rudern Langhantel', note: 'Horizontaler Zug · schwer',            base: 30, step: 2.5, rest: 180, alternatives: ['kabelrudern-eng', 'rudern-kurzhantel'] },
  'face-pulls':                  { name: 'Face Pulls', note: 'Hintere Schulter · Haltung',                  base: 12, step: 2.5, rest: 60,  alternatives: ['reverse-flys', 'seitheben'] },
  'langhantel-curls':            { name: 'Langhantel-Curls', note: 'Bizeps Isolation',                      base: 15, step: 2.5, rest: 60,  alternatives: ['kurzhantel-curls', 'hammer-curls'] },
  'latzug-untergriff':           { name: 'Latzug Untergriff', note: 'Vertikaler Zug · Bizeps-Fokus',        base: 30, step: 2.5, rest: 120, alternatives: ['klimmzuege', 'latzug-breit'] },
  'kabelrudern-eng':             { name: 'Kabelrudern eng', note: 'Mittlerer Rücken',                       base: 30, step: 2.5, rest: 120, alternatives: ['rudern-langhantel', 'rudern-kurzhantel'] },
  'reverse-flys':                { name: 'Reverse Flys', note: 'Hintere Schulter',                          base: 5,  step: 0.5, rest: 60,  alternatives: ['face-pulls', 'seitheben'] },
  'hammer-curls':                { name: 'Hammer Curls', note: 'Brachialis · Unterarm',                     base: 8,  step: 1,   rest: 60,  alternatives: ['kurzhantel-curls', 'langhantel-curls'] },
  'kniebeuge':                   { name: 'Kniebeuge', note: 'Langhantel · Hauptübung',                      base: 40, step: 2.5, rest: 180, alternatives: ['beinpresse', 'front-squat'] },
  'rumaenisches-kreuzheben':     { name: 'Rumänisches Kreuzheben', note: 'Hamstrings · Po',                 base: 40, step: 2.5, rest: 180, alternatives: ['kreuzheben', 'good-mornings'] },
  'beinpresse':                  { name: 'Beinpresse', note: 'Zweiter Quad-Reiz',                           base: 50, step: 5,   rest: 120, alternatives: ['kniebeuge', 'hackschmidt-squat'] },
  'beinbeuger-liegend':          { name: 'Beinbeuger liegend', note: 'Hamstrings übers Knie',               base: 20, step: 2.5, rest: 90,  alternatives: ['beinbeuger-sitzend', 'nordic-curls'] },
  'bulgarian-split-squats':      { name: 'Bulgarian Split Squats', note: 'Pro Bein · Po-Aktivierung',       base: 8,  step: 1,   rest: 120, alternatives: ['ausfallschritte', 'kniebeuge'] },
  'beinbeuger-sitzend':          { name: 'Beinbeuger sitzend', note: 'Anderer Winkel als A',                base: 20, step: 2.5, rest: 90,  alternatives: ['beinbeuger-liegend', 'nordic-curls'] },
  'wadenheben-stehend':          { name: 'Wadenheben stehend', note: 'Waden',                               base: 40, step: 2.5, rest: 60,  alternatives: ['wadenheben-sitzend', 'beinpresse'] },

  // Alternativen ohne eigene alternatives-Liste (Endknoten)
  'bankdruecken-kurzhantel':     { name: 'Bankdrücken Kurzhantel', note: 'Brust · mehr Stabi-Arbeit',       base: 14, step: 1,   rest: 120 },
  'schulterdruecken-langhantel': { name: 'Schulterdrücken Langhantel', note: 'Overhead Press',              base: 25, step: 2.5, rest: 150 },
  'arnold-press':                { name: 'Arnold Press', note: 'Rotation · vordere Schulter',               base: 10, step: 1,   rest: 90 },
  'seitheben-kabel':             { name: 'Seitheben Kabel', note: 'Konstante Spannung',                     base: 8,  step: 1,   rest: 60 },
  'seitheben-maschine':          { name: 'Seitheben Maschine', note: 'Geführte Bewegung',                   base: 15, step: 2.5, rest: 60 },
  'french-press':                { name: 'French Press', note: 'Trizeps · Stirndrücken',                    base: 15, step: 2.5, rest: 60 },
  'latzug-breit':                { name: 'Latzug breit', note: 'Latissimus-Fokus',                          base: 30, step: 2.5, rest: 120 },
  'rudern-kurzhantel':           { name: 'Rudern Kurzhantel', note: 'Einseitig · Asymmetrien ausgleichen',  base: 16, step: 1,   rest: 120 },
  'kurzhantel-curls':            { name: 'Kurzhantel-Curls', note: 'Bizeps · mehr Kontrolle',               base: 8,  step: 1,   rest: 60 },
  'front-squat':                 { name: 'Front Squat', note: 'Quad-Fokus · aufrechter Oberkörper',         base: 30, step: 2.5, rest: 180 },
  'hackschmidt-squat':           { name: 'Hackschmidt-Squat', note: 'Quads isoliert',                       base: 40, step: 5,   rest: 120 },
  'kreuzheben':                  { name: 'Kreuzheben', note: 'Posterior Chain · schwer',                    base: 60, step: 5,   rest: 180 },
  'good-mornings':               { name: 'Good Mornings', note: 'Hamstrings · unterer Rücken',              base: 20, step: 2.5, rest: 120 },
  'nordic-curls':                { name: 'Nordic Curls', note: 'Hamstring-Exzentrik · anspruchsvoll',       bodyweight: true,    rest: 120 },
  'ausfallschritte':             { name: 'Ausfallschritte', note: 'Pro Bein · KH in jeder Hand',            base: 10, step: 1,   rest: 90 },
  'wadenheben-sitzend':          { name: 'Wadenheben sitzend', note: 'Soleus-Fokus',                        base: 25, step: 2.5, rest: 60 }
};

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
      });
    });

    const body = ex.children[1];
    body.appendChild(widget);
  });
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
  if (label) label.textContent = f.available === 1 ? 'Streak Freeze' : 'Streak Freezes';
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

function startTimer(timerEl, seconds) {
  if (activeTimer) {
    clearInterval(activeTimer.interval);
    activeTimer.el.classList.add('hidden');
    activeTimer.el.classList.remove('done');
    activeTimer.el.textContent = '';
  }
  let remaining = seconds;
  const fmt = () => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    timerEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
  };
  fmt();
  timerEl.classList.remove('hidden', 'done');
  const interval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(interval);
      timerEl.textContent = 'Los!';
      timerEl.classList.add('done');
      if (navigator.vibrate) try { navigator.vibrate([200, 100, 200]); } catch (e) {}
      setTimeout(() => {
        if (activeTimer && activeTimer.interval === interval) {
          activeTimer.el.classList.add('hidden');
          activeTimer.el.classList.remove('done');
          activeTimer.el.textContent = '';
          activeTimer = null;
        }
      }, 4000);
    } else {
      fmt();
    }
  }, 1000);
  activeTimer = { el: timerEl, interval };
}

function stopTimer() {
  if (!activeTimer) return;
  clearInterval(activeTimer.interval);
  activeTimer.el.classList.add('hidden');
  activeTimer.el.classList.remove('done');
  activeTimer.el.textContent = '';
  activeTimer = null;
}

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
    repsEl.innerHTML = `
      <div class="sets">${circles}</div>
      <div class="reps-label">${escapeHtml(range)} Wdh</div>
      <div class="timer hidden"></div>
    `;

    const timerEl = repsEl.querySelector('.timer');
    timerEl.addEventListener('click', e => { e.stopPropagation(); stopTimer(); });

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
          startTimer(timerEl, def.rest || 90);
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
    if (!nameEl || nameEl.dataset.originalName) return;
    const name = nameEl.textContent.trim();
    nameEl.dataset.originalName = name;
    nameEl.dataset.originalId = exerciseId(name);
    if (noteEl) noteEl.dataset.originalNote = noteEl.textContent.trim();
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
    nameEl.textContent = def.name || nameEl.dataset.originalName;
    if (noteEl) noteEl.textContent = def.note || noteEl.dataset.originalNote || '';
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

  title.textContent = origDef.name || nameEl.dataset.originalName;
  list.innerHTML = '';

  [origId, ...origDef.alternatives].forEach((exId, idx) => {
    const def = EXERCISES[exId];
    if (!def) return;
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'swap-option' + (exId === currentId ? ' active' : '');
    opt.innerHTML = `
      <div class="swap-option-body">
        <div class="swap-option-name">${escapeHtml(def.name || exId)}</div>
        <div class="swap-option-note">${escapeHtml(def.note || '')}</div>
      </div>
      <div class="swap-option-badge">${idx === 0 ? 'Original' : 'Alternative'}</div>
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
        bodyweight: !!ex.bodyweight
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
      <div class="custom-empty-title">Dein Plan</div>
      <div class="custom-empty-text">Noch keine Trainings-Tage. Leg deinen ersten Tag an und füll ihn mit Übungen.</div>
      <button class="custom-primary-btn" id="custom-create-btn" type="button">Plan erstellen</button>
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

  const edit = document.createElement('button');
  edit.className = 'custom-edit-btn';
  edit.type = 'button';
  edit.textContent = 'Plan bearbeiten';
  edit.addEventListener('click', openEditor);
  container.appendChild(edit);
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
    const repsText = `${ex.sets || 3}×${ex.range || '8-10'}`;
    exEl.innerHTML = `
      <div class="ex-num">${num}</div>
      <div>
        <div class="ex-name">${escapeHtml(ex.name || 'Übung')}</div>
        ${ex.note ? `<div class="ex-note">${escapeHtml(ex.note)}</div>` : ''}
      </div>
      <div class="ex-reps">${escapeHtml(repsText)}</div>
    `;
    exs.appendChild(exEl);
  });
  dayEl.appendChild(exs);
  return dayEl;
}

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
          <span class="editor-field-label">Tag-Label</span>
          <input class="editor-input" value="${escapeAttr(day.label || '')}" placeholder="z. B. Push, Pull, Oberkörper" data-f="label">
        </label>
        <button class="editor-icon-btn" data-a="del-day" aria-label="Tag löschen" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="editor-row-meta">
        <label class="editor-field">
          <span class="editor-field-label">Akzentfarbe</span>
          <select class="editor-select" data-f="accent">
            <option value="push"${day.accent === 'push' ? ' selected' : ''}>Push (rot)</option>
            <option value="pull"${day.accent === 'pull' ? ' selected' : ''}>Pull (grün)</option>
            <option value="legs"${day.accent === 'legs' ? ' selected' : ''}>Legs (gelb)</option>
          </select>
        </label>
        <label class="editor-field">
          <span class="editor-field-label">Wochentag</span>
          <select class="editor-select" data-f="weekday">
            <option value="-1"${!(day.weekday >= 0 && day.weekday <= 6) ? ' selected' : ''}>Kein Wochentag</option>
            <option value="0"${day.weekday === 0 ? ' selected' : ''}>Montag</option>
            <option value="1"${day.weekday === 1 ? ' selected' : ''}>Dienstag</option>
            <option value="2"${day.weekday === 2 ? ' selected' : ''}>Mittwoch</option>
            <option value="3"${day.weekday === 3 ? ' selected' : ''}>Donnerstag</option>
            <option value="4"${day.weekday === 4 ? ' selected' : ''}>Freitag</option>
            <option value="5"${day.weekday === 5 ? ' selected' : ''}>Samstag</option>
            <option value="6"${day.weekday === 6 ? ' selected' : ''}>Sonntag</option>
          </select>
        </label>
        <label class="editor-field fixed" style="flex: 0 0 80px">
          <span class="editor-field-label">Variante</span>
          <input class="editor-input" value="${escapeAttr(day.variant || '')}" placeholder="A / B" data-f="variant">
        </label>
        <label class="editor-field" style="flex: 1 1 100%">
          <span class="editor-field-label">Fokus (optional)</span>
          <input class="editor-input" value="${escapeAttr(day.focus || '')}" placeholder="z. B. Schwer, Volumen, Quad-Fokus" data-f="focus">
        </label>
      </div>
      <div class="editor-section-title">Übungen</div>
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
      row.innerHTML = `
        <div class="editor-ex-fields">
          <label class="editor-field">
            <span class="editor-field-label">Name</span>
            <input class="editor-input" value="${escapeAttr(ex.name || '')}" placeholder="z. B. Bankdrücken" data-f="name">
          </label>
          <label class="editor-field">
            <span class="editor-field-label">Notiz (optional)</span>
            <input class="editor-input" value="${escapeAttr(ex.note || '')}" placeholder="z. B. Hauptübung Brust" data-f="note">
          </label>
          <div class="editor-ex-fields-row">
            <label class="editor-field fixed" style="flex: 0 0 70px">
              <span class="editor-field-label">Sätze</span>
              <input class="editor-input" value="${escapeAttr(ex.sets || 3)}" type="number" min="1" max="10" data-f="sets">
            </label>
            <label class="editor-field">
              <span class="editor-field-label">Wdh</span>
              <input class="editor-input" value="${escapeAttr(ex.range || '8-10')}" placeholder="z. B. 6-8 oder 10-12" data-f="range">
            </label>
            <label class="editor-field fixed" style="flex: 0 0 90px">
              <span class="editor-field-label">Pause (s)</span>
              <input class="editor-input" value="${escapeAttr(ex.rest || 90)}" type="number" min="0" max="600" step="15" data-f="rest">
            </label>
          </div>
          <div class="editor-ex-fields-row">
            <label class="editor-field">
              <span class="editor-field-label">Startgewicht (kg)</span>
              <input class="editor-input" value="${escapeAttr(ex.base || 0)}" type="number" min="0" step="0.5" data-f="base">
            </label>
            <label class="editor-field">
              <span class="editor-field-label">Schritt (kg)</span>
              <input class="editor-input" value="${escapeAttr(ex.step || 2.5)}" type="number" min="0.25" step="0.25" data-f="step">
            </label>
          </div>
        </div>
        <button class="editor-icon-btn" data-a="del-ex" aria-label="Übung löschen" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      row.querySelectorAll('[data-f]').forEach(input => {
        const field = input.dataset.f;
        input.addEventListener('input', e => {
          const v = e.target.value;
          if (field === 'sets' || field === 'rest') ex[field] = parseInt(v, 10) || 0;
          else if (field === 'base' || field === 'step') ex[field] = parseFloat(v) || 0;
          else ex[field] = v;
        });
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
    addEx.textContent = '+ Übung hinzufügen';
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
  addDay.textContent = '+ Trainings-Tag hinzufügen';
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
          .map(e => ({
            id: e.id || genId('ex'),
            name: (e.name || '').trim(),
            note: (e.note || '').trim(),
            sets: Math.max(1, Math.min(10, parseInt(e.sets, 10) || 3)),
            range: (e.range || '8-10').trim(),
            rest: Math.max(0, Math.min(600, parseInt(e.rest, 10) || 90)),
            base: Math.max(0, parseFloat(e.base) || 0),
            step: Math.max(0.25, parseFloat(e.step) || 2.5),
            bodyweight: !!e.bodyweight
          }))
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
    eyebrow.textContent = 'Eigener Plan';
    sub.textContent = 'Selbst zusammengestellt · Tap für Details';
  } else if (freq === '3') {
    eyebrow.textContent = '3× pro Woche · Push · Pull · Legs';
    sub.textContent = 'Jede Muskelgruppe 1× pro Woche · Tap für Details';
  } else {
    eyebrow.textContent = '6× pro Woche · A/B Split';
    sub.textContent = 'Jede Muskelgruppe 2× pro Woche · Tap für Details';
  }

  document.querySelectorAll('#plan-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.choose === activeVariant);
  });

  applyCalendar(activeVariant);
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

  const collected = [...BASE_ITEMS];
  const profile = { ...DEFAULT_PROFILE };
  let frequency = '6';
  let planMode = 'preset';
  const totalSteps = PROFILE_QUESTIONS.length + 1 + ONBOARDING_QUESTIONS.length; // 4 + 1 + 4

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

  function showIntro() {
    setProgress(0);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">Einrichtung</div>
        <div class="onboarding-title">Kurze Einrichtung</div>
        <div class="onboarding-text">Ein paar Fragen zu dir, deinem Training und deiner Packliste. Damit stimmen wir Startgewichte und spätere Empfehlungen auf dich ab. Alles später anpassbar.</div>
      </div>
    `;
    actions.innerHTML = '';
    const start = document.createElement('button');
    start.className = 'onboarding-btn primary';
    start.textContent = 'Los geht\'s';
    start.addEventListener('click', () => showProfileQuestion(0));
    actions.appendChild(start);

    const skip = document.createElement('button');
    skip.className = 'onboarding-skip';
    skip.textContent = 'Überspringen';
    skip.addEventListener('click', () => finish(BASE_ITEMS));
    actions.appendChild(skip);
  }

  function showProfileQuestion(i) {
    const q = PROFILE_QUESTIONS[i];
    setProgress(i + 1);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">Über dich ${i + 1} / ${PROFILE_QUESTIONS.length}</div>
        <div class="onboarding-title">${escapeHtml(q.question)}</div>
        <div class="onboarding-hint">${escapeHtml(q.hint)}</div>
      </div>
    `;
    actions.innerHTML = '';
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'onboarding-btn' + (idx === 0 ? ' primary' : '');
      btn.textContent = opt.label;
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
        <div class="onboarding-eyebrow">Training</div>
        <div class="onboarding-title">Welcher Plan passt?</div>
        <div class="onboarding-hint">3× pro Woche hat längere Sessions, 6× pro Woche ist ein A/B-Split mit kürzeren Einheiten. Oder stell dir deinen eigenen Plan zusammen.</div>
      </div>
    `;
    actions.innerHTML = '';

    const btn3 = document.createElement('button');
    btn3.className = 'onboarding-btn';
    btn3.textContent = '3× pro Woche';
    btn3.addEventListener('click', () => { frequency = '3'; planMode = 'preset'; showQuestion(0); });
    actions.appendChild(btn3);

    const btn6 = document.createElement('button');
    btn6.className = 'onboarding-btn primary';
    btn6.textContent = '6× pro Woche';
    btn6.addEventListener('click', () => { frequency = '6'; planMode = 'preset'; showQuestion(0); });
    actions.appendChild(btn6);

    const btnCustom = document.createElement('button');
    btnCustom.className = 'onboarding-btn';
    btnCustom.textContent = 'Eigener Plan';
    btnCustom.addEventListener('click', () => { planMode = 'custom'; showQuestion(0); });
    actions.appendChild(btnCustom);
  }

  function showQuestion(i) {
    const q = ONBOARDING_QUESTIONS[i];
    setProgress(PROFILE_QUESTIONS.length + 1 + i + 1);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">Packliste ${i + 1} / ${ONBOARDING_QUESTIONS.length}</div>
        <div class="onboarding-title">${escapeHtml(q.question)}</div>
        <div class="onboarding-hint">${escapeHtml(q.hint)}</div>
      </div>
    `;
    actions.innerHTML = '';

    const yes = document.createElement('button');
    yes.className = 'onboarding-btn primary';
    yes.textContent = 'Ja';
    yes.addEventListener('click', () => {
      collected.push(...q.items);
      next(i);
    });
    actions.appendChild(yes);

    const no = document.createElement('button');
    no.className = 'onboarding-btn';
    no.textContent = 'Nein';
    no.addEventListener('click', () => next(i));
    actions.appendChild(no);
  }

  function next(i) {
    if (i + 1 < ONBOARDING_QUESTIONS.length) showQuestion(i + 1);
    else showDone();
  }

  function showDone() {
    setProgress(totalSteps);
    content.innerHTML = `
      <div>
        <div class="onboarding-eyebrow">Fertig</div>
        <div class="onboarding-title">Alles klar</div>
        <div class="onboarding-text">Plan: ${frequency}× pro Woche. Packliste mit ${collected.length} Items. Startgewichte stehen, feintunen geht mit +/- pro Übung.</div>
      </div>
    `;
    actions.innerHTML = '';
    const done = document.createElement('button');
    done.className = 'onboarding-btn primary';
    done.textContent = 'Los geht\'s';
    done.addEventListener('click', () => finish(collected));
    actions.appendChild(done);
  }

  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
  showIntro();
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
    showToast(navigator.share ? 'Danke fürs Teilen. Streak Freeze für dich.' : 'Link kopiert. Streak Freeze für dich.');
  } else if (result === 'capped') {
    showToast('Danke! Du hast bereits das Freeze-Maximum (3) erreicht.');
  } else {
    showToast(navigator.share ? 'Danke fürs Teilen.' : 'Link kopiert.');
  }
}

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
initRecToggle();
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
  banner.innerHTML = `<span>Neue Version verfügbar</span><button type="button">Neu laden</button>`;
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
    background: #1f1f1f; border: 1px solid #2a2a2a; border-radius: 14px;
    padding: 16px; z-index: 100; color: #f5f5f5;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.5;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    max-width: 480px; margin: 0 auto;
  `;
  banner.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
      <div>
        <div style="font-family: 'Bebas Neue'; font-size: 18px; letter-spacing: 0.05em; margin-bottom: 4px;">Als App installieren</div>
        <div style="color: #888; font-size: 11px;">Drei-Punkt-Menü → Teilen → "Zum Home-Bildschirm"</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <button id="ppl-dismiss" style="background: #2a2a2a; border: none; color: #f5f5f5; padding: 6px 10px; border-radius: 6px; font-family: inherit; font-size: 11px; cursor: pointer;">OK</button>
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
