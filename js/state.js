/** Estado local versionado do Quintiliano. */
const STORAGE_KEY = 'quintiliano_state_v1';
const VERSION = 2;

const initialState = {
  version: VERSION,
  progress: {},
  settings: { fontSize: 'normal', highContrast: false },
  lastStudy: null,
};

let preserveFutureState = false;
let state = hydrate();
const subscribers = new Map();

export function getState(key) {
  return clone(key === undefined ? state : state[key]);
}

export function setState(key, value) {
  const previous = state[key];
  state[key] = clone(value);
  persist();
  subscribers.get(key)?.forEach(fn => fn(clone(state[key]), clone(previous)));
}

export function updateProgress(activityId, patch) {
  if (typeof activityId !== 'string' || !activityId) return;
  const progress = getState('progress');
  progress[activityId] = {
    attempts: 0,
    completed: false,
    bestScore: null,
    updatedAt: null,
    ...progress[activityId],
    ...clone(patch),
  };
  setState('progress', progress);
}

export function recordActivity({ moduleId, textId = null, exerciseId, correct, score = null, total = null }) {
  if (typeof exerciseId !== 'string' || !exerciseId) return;
  const previous = getState('progress')[exerciseId] ?? {};
  updateProgress(exerciseId, {
    moduleId,
    textId,
    attempts: (previous.attempts ?? 0) + 1,
    completed: true,
    correct: correct === true ? true : correct === false ? false : null,
    bestScore: score === null ? previous.bestScore ?? null : Math.max(previous.bestScore ?? 0, score),
    total: total ?? previous.total ?? null,
    updatedAt: new Date().toISOString(),
  });
  setState('lastStudy', { moduleId, textId, exerciseId });
}

export function subscribe(key, fn) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(fn);
  return () => subscribers.get(key)?.delete(fn);
}

export function resetProgress() {
  setState('progress', {});
  setState('lastStudy', null);
}

export function resetState() {
  state = clone(initialState);
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* navegador sem armazenamento */ }
}

function hydrate() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return clone(initialState);
    if (saved.version && saved.version > VERSION) {
      preserveFutureState = true;
      return clone(initialState);
    }
    const progress = isObject(saved.progress) ? migrateProgress(saved.progress) : {};
    return {
      ...clone(initialState),
      progress,
      settings: { ...initialState.settings, ...(isObject(saved.settings) ? saved.settings : {}) },
      lastStudy: isObject(saved.lastStudy) ? saved.lastStudy : legacyLastStudy(saved),
    };
  } catch (_) {
    return clone(initialState);
  }
}

function persist() {
  if (preserveFutureState) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) { /* segue em memória */ }
}

function migrateProgress(progress) {
  const migrated = {};
  for (const [id, entry] of Object.entries(progress)) {
    if (!isObject(entry) || !Array.isArray(entry.completed)) { migrated[id] = entry; continue; }
    entry.completed.forEach(index => {
      if (!Number.isInteger(index) || index < 0) return;
      migrated[`legacy:${id}:${index}`] = { moduleId: id, attempts: entry.attempts ?? 0, completed: true, correct: null, bestScore: null, total: null, updatedAt: null };
    });
  }
  return migrated;
}

function legacyLastStudy(saved) {
  return typeof saved.activeModule === 'string' ? { moduleId: saved.activeModule, textId: typeof saved.activeTextId === 'string' ? saved.activeTextId : null } : null;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}
