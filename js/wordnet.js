/**
 * wordnet.js — Serviço de léxico (OpenWordNet-PT)
 *
 * Carrega o arquivo wordnet.json bundlado com o projeto.
 * Expõe funções de consulta: sinônimos, antônimos, hiperônimos, definição.
 *
 * O arquivo wordnet.json é servido estaticamente — sem chamada externa.
 * Compatível com GitHub Pages e uso offline.
 */

/** @type {Record<string, object> | null} */
let db = null;

/**
 * Carrega o banco de dados WordNet.
 * Idempotente — carrega apenas uma vez.
 * @returns {Promise<void>}
 */
async function ensureLoaded() {
  if (db) return;
  const res = await fetch('./data/wordnet.json');
  if (!res.ok) throw new Error(`Falha ao carregar wordnet.json: ${res.status}`);
  db = await res.json();
}

/**
 * Busca uma entrada no WordNet pelo valor exato da palavra (case-insensitive).
 * @param {string} word
 * @returns {Promise<object | null>}
 */
export async function lookupWord(word) {
  await ensureLoaded();
  const key = word.toLowerCase().trim();
  return db[key] ?? null;
}

/**
 * Retorna os sinônimos de uma palavra.
 * @param {string} word
 * @returns {Promise<string[]>}
 */
export async function getSynonyms(word) {
  const entry = await lookupWord(word);
  return entry?.sinonimos ?? [];
}

/**
 * Retorna os antônimos de uma palavra.
 * @param {string} word
 * @returns {Promise<string[]>}
 */
export async function getAntonyms(word) {
  const entry = await lookupWord(word);
  return entry?.antonimos ?? [];
}

/**
 * Retorna a definição de uma palavra.
 * @param {string} word
 * @returns {Promise<string | null>}
 */
export async function getDefinition(word) {
  const entry = await lookupWord(word);
  return entry?.definicao ?? null;
}

/**
 * Retorna o hiperônimo (categoria superior) de uma palavra.
 * @param {string} word
 * @returns {Promise<string | null>}
 */
export async function getHypernym(word) {
  const entry = await lookupWord(word);
  return entry?.hiperonimo ?? null;
}

/**
 * Retorna todas as palavras disponíveis no banco.
 * @returns {Promise<string[]>}
 */
export async function listAllWords() {
  await ensureLoaded();
  return Object.keys(db);
}
