/**
 * state.js — Gerenciamento de estado da aplicação
 *
 * Estado simples baseado em objetos JS com sistema de subscrição (pub/sub).
 * Persiste progresso do usuário em localStorage quando disponível.
 * Não usa proxies ou frameworks — apenas funções explícitas.
 */

const STORAGE_KEY = 'quintiliano_state_v1';

/** Estado global inicial */
const initialState = {
  /** Progresso por módulo: { [moduleId]: { completed: number[], attempts: number } } */
  progress: {},

  /** Módulo e exercício atualmente ativos */
  activeModule: null,
  activeTextId: null,
  activeExerciseIndex: 0,

  /** Configurações do usuário */
  settings: {
    fontSize: 'normal',   // 'small' | 'normal' | 'large'
    highContrast: false,
  },
};

/** @type {typeof initialState} */
let state = deepClone(initialState);

/** @type {Map<string, Set<(value: any, prev: any) => void>>} */
const subscribers = new Map();

/**
 * Retorna uma cópia profunda do estado atual ou de uma chave.
 * Retornar cópias garante que o consumidor não mutará o estado diretamente.
 * @param {string} [key]
 * @returns {any}
 */
export function getState(key) {
  if (key === undefined) return deepClone(state);
  return deepClone(state[key]);
}

/**
 * Atualiza uma chave do estado e notifica os subscribers.
 * @param {string} key
 * @param {any} value — Valor novo (será clonado antes de armazenar)
 */
export function setState(key, value) {
  const prev = state[key];
  state[key] = deepClone(value);
  persist();
  notify(key, state[key], prev);
}

/**
 * Atualiza um campo aninhado em 'progress'.
 * @param {string} moduleId
 * @param {object} patch
 */
export function updateProgress(moduleId, patch) {
  const progress = getState('progress');
  progress[moduleId] = { ...(progress[moduleId] ?? { completed: [], attempts: 0 }), ...patch };
  setState('progress', progress);
}

/**
 * Registra um subscriber para uma chave de estado.
 * @param {string} key
 * @param {(value: any, prev: any) => void} fn
 * @returns {() => void} — Função para cancelar a subscrição
 */
export function subscribe(key, fn) {
  if (!subscribers.has(key)) subscribers.set(key, new Set());
  subscribers.get(key).add(fn);
  return () => subscribers.get(key).delete(fn);
}

/**
 * Reinicia o estado para os valores iniciais.
 * Útil em testes ou ao trocar de módulo.
 */
export function resetState() {
  state = deepClone(initialState);
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* sem localStorage */ }
}

/* --- Funções internas --- */

function notify(key, value, prev) {
  subscribers.get(key)?.forEach(fn => fn(value, prev));
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      progress: state.progress,
      settings: state.settings,
    }));
  } catch (_) {
    // localStorage indisponível — continua em memória
  }
}

function deepClone(value) {
  // JSON.parse/stringify é suficiente para estado sem referências circulares ou Dates
  return JSON.parse(JSON.stringify(value));
}

/** Restaura estado persistido no boot */
function hydrate() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.progress) state.progress = saved.progress;
    if (saved.settings) state.settings = { ...initialState.settings, ...saved.settings };
  } catch (_) {
    // Dados corrompidos — inicia do zero
  }
}

// Executa hidratação imediatamente ao carregar o módulo
hydrate();
