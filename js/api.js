/**
 * api.js — Camada de serviço para APIs externas
 *
 * Responsabilidades:
 *   - Wiktionary PT: etimologia e definição de qualquer palavra
 *   - Project Gutenberg: textos completos de obras em domínio público
 *   - Cache em localStorage para uso offline após primeiro acesso
 *
 * Todas as funções retornam Promises.
 * Erros de rede são capturados e retornados como { error: string }.
 * O chamador decide o que exibir — este módulo não toca o DOM.
 */

/* ================================================================
   CONFIGURAÇÃO
   ================================================================ */

const CACHE_PREFIX   = 'quintiliano_cache_v1_';
const CACHE_TTL_MS   = 7 * 24 * 60 * 60 * 1000; // 7 dias

const WIKTIONARY_API = 'https://pt.wiktionary.org/w/api.php';
const GUTENBERG_BASE = 'https://www.gutenberg.org/cache/epub';

/* ================================================================
   CACHE (localStorage)
   ================================================================ */

/**
 * Lê do cache. Retorna null se expirado ou inexistente.
 * @param {string} key
 * @returns {any | null}
 */
function cacheGet(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { value, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return value;
  } catch (_) {
    return null;
  }
}

/**
 * Grava no cache com TTL.
 * @param {string} key
 * @param {any} value
 * @param {number} [ttlMs]
 */
function cacheSet(key, value, ttlMs = CACHE_TTL_MS) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({
      value,
      expires: Date.now() + ttlMs,
    }));
  } catch (_) {
    // localStorage cheio ou indisponível — sem cache, sem erro
  }
}

/* ================================================================
   WIKTIONARY — ETIMOLOGIA
   ================================================================ */

/**
 * Busca a etimologia de uma palavra no Wiktionary PT.
 *
 * Estratégia de extração:
 *   1. Busca as seções da página (action=parse&prop=sections)
 *   2. Identifica o índice da seção "Etimologia" sob "Português"
 *   3. Busca o HTML dessa seção específica
 *   4. Extrai o texto limpo do HTML retornado
 *
 * @param {string} word
 * @returns {Promise<{ found: boolean, text: string, source: string } | { error: string }>}
 */
export async function fetchEtymology(word) {
  // Normaliza entrada: espaços extras e case.
  // Retry com lowercase se a página não existir — Wiktionary PT usa minúsculas
  // para substantivos comuns mas maiúsculas para nomes próprios.
  word = word.trim();
  const cacheKey = `etym_${word.toLowerCase()}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  try {
    // Passo 1: lista de seções da página
    const sectionsUrl = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(word)}&prop=sections&format=json&origin=*`;
    const sectionsRes = await fetch(sectionsUrl);
    if (!sectionsRes.ok) throw new Error(`HTTP ${sectionsRes.status}`);
    const sectionsData = await sectionsRes.json();

    // Retry com lowercase se a página não foi encontrada (ex: "Paralelepípedo" → "paralelepípedo")
    if (sectionsData.error && word !== word.toLowerCase()) {
      const wordLower = word.toLowerCase();
      const sectionsUrlLower = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(wordLower)}&prop=sections&format=json&origin=*`;
      const sectionsResLower = await fetch(sectionsUrlLower);
      if (sectionsResLower.ok) {
        const sectionsDataLower = await sectionsResLower.json();
        if (!sectionsDataLower.error) {
          word = wordLower;
          Object.assign(sectionsData, sectionsDataLower);
        }
      }
    }

    if (sectionsData.error) {
      const result = { found: false, text: '', source: 'wiktionary' };
      cacheSet(cacheKey, result);
      return result;
    }

    const sections = sectionsData.parse?.sections ?? [];

    // Passo 2: encontra índice da seção "Etimologia" sob "Português"
    const etymIndex = findEtymologySection(sections);

    if (!etymIndex) {
      const result = { found: false, text: '', source: 'wiktionary' };
      cacheSet(cacheKey, result);
      return result;
    }

    // Passo 3: busca HTML da seção de etimologia
    const htmlUrl = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(word)}&prop=text&section=${etymIndex}&format=json&origin=*`;
    const htmlRes = await fetch(htmlUrl);
    if (!htmlRes.ok) throw new Error(`HTTP ${htmlRes.status}`);
    const htmlData = await htmlRes.json();

    const html = htmlData.parse?.text?.['*'] ?? '';
    const text = extractTextFromWikiHtml(html);

    const result = {
      found: text.length > 0,
      text,
      source: 'wiktionary',
      word,
    };

    cacheSet(cacheKey, result);
    return result;

  } catch (err) {
    return { error: err.message, found: false, source: 'wiktionary' };
  }
}

/**
 * Busca a definição de uma palavra no Wiktionary PT.
 * Extrai a seção da classe gramatical predominante (substantivo, verbo, adjetivo…).
 *
 * @param {string} word
 * @returns {Promise<{ found: boolean, definitions: string[], partOfSpeech: string, source: string } | { error: string }>}
 */
export async function fetchDefinition(word) {
  word = word.trim();
  const cacheKey = `def_${word.toLowerCase()}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  try {
    const sectionsUrl = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(word)}&prop=sections&format=json&origin=*`;
    const sectionsRes = await fetch(sectionsUrl);
    if (!sectionsRes.ok) throw new Error(`HTTP ${sectionsRes.status}`);
    const sectionsData = await sectionsRes.json();

    // Retry com lowercase (mesmo padrão de fetchEtymology)
    if (sectionsData.error && word !== word.toLowerCase()) {
      const wordLower = word.toLowerCase();
      const sectionsUrlLower = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(wordLower)}&prop=sections&format=json&origin=*`;
      const sectionsResLower = await fetch(sectionsUrlLower);
      if (sectionsResLower.ok) {
        const sectionsDataLower = await sectionsResLower.json();
        if (!sectionsDataLower.error) {
          word = wordLower;
          Object.assign(sectionsData, sectionsDataLower);
        }
      }
    }

    if (sectionsData.error) {
      const result = { found: false, definitions: [], partOfSpeech: '', source: 'wiktionary' };
      cacheSet(cacheKey, result);
      return result;
    }

    const sections = sectionsData.parse?.sections ?? [];
    const posSection = findPartOfSpeechSection(sections);

    if (!posSection) {
      const result = { found: false, definitions: [], partOfSpeech: '', source: 'wiktionary' };
      cacheSet(cacheKey, result);
      return result;
    }

    const htmlUrl = `${WIKTIONARY_API}?action=parse&page=${encodeURIComponent(word)}&prop=text&section=${posSection.index}&format=json&origin=*`;
    const htmlRes = await fetch(htmlUrl);
    if (!htmlRes.ok) throw new Error(`HTTP ${htmlRes.status}`);
    const htmlData = await htmlRes.json();

    const html = htmlData.parse?.text?.['*'] ?? '';
    const definitions = extractDefinitionsFromWikiHtml(html);

    const result = {
      found: definitions.length > 0,
      definitions,
      partOfSpeech: posSection.line,
      source: 'wiktionary',
      word,
    };

    cacheSet(cacheKey, result);
    return result;

  } catch (err) {
    return { error: err.message, found: false, definitions: [], source: 'wiktionary' };
  }
}

/* ================================================================
   GUTENBERG — TEXTOS LITERÁRIOS
   ================================================================ */

/**
 * Busca um trecho inicial de uma obra do Project Gutenberg.
 * Retorna os primeiros N caracteres após o cabeçalho do Gutenberg.
 *
 * @param {number} gutenbergId  — ID da obra no Project Gutenberg
 * @param {number} [charLimit]  — Máximo de caracteres a retornar (padrão: 3000)
 * @returns {Promise<{ found: boolean, text: string, title: string } | { error: string }>}
 */
export async function fetchGutenbergExcerpt(gutenbergId, charLimit = 3000) {
  const cacheKey = `gutenberg_${gutenbergId}_${charLimit}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  try {
    // Gutenberg serve os textos como UTF-8 plain text
    const url = `${GUTENBERG_BASE}/${gutenbergId}/pg${gutenbergId}.txt`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const fullText = await res.text();
    const excerpt  = extractGutenbergExcerpt(fullText, charLimit);
    const title    = extractGutenbergTitle(fullText);

    const result = { found: true, text: excerpt, title, gutenbergId };
    cacheSet(cacheKey, result);
    return result;

  } catch (err) {
    return { error: err.message, found: false, gutenbergId };
  }
}

/* ================================================================
   PARSERS HTML DO WIKTIONARY
   ================================================================ */

/**
 * Encontra o índice de seção da etimologia na lista de seções.
 * O Wiktionary PT organiza: Português > Etimologia > Substantivo > …
 *
 * @param {Array} sections
 * @returns {string | null} — Índice da seção ou null
 */
function findEtymologySection(sections) {
  let underPortuguese = false;

  for (const section of sections) {
    // Detecta a seção "Português" de nível 1
    if (section.toclevel === 1 && normalizeTitle(section.line) === 'português') {
      underPortuguese = true;
      continue;
    }
    // Se passou para outra língua de nível 1, para
    if (section.toclevel === 1 && underPortuguese) break;

    if (underPortuguese && normalizeTitle(section.line).startsWith('etimologia')) {
      return section.index;
    }
  }

  // Fallback: qualquer seção de etimologia na página
  const fallback = sections.find(s => normalizeTitle(s.line).startsWith('etimologia'));
  return fallback?.index ?? null;
}

/**
 * Encontra a seção de classe gramatical principal (substantivo, verbo, adjetivo…).
 * @param {Array} sections
 * @returns {{ index: string, line: string } | null}
 */
function findPartOfSpeechSection(sections) {
  const posTags = ['substantivo', 'verbo', 'adjetivo', 'advérbio', 'pronome', 'preposição'];
  let underPortuguese = false;

  for (const section of sections) {
    if (section.toclevel === 1 && normalizeTitle(section.line) === 'português') {
      underPortuguese = true;
      continue;
    }
    if (section.toclevel === 1 && underPortuguese) break;

    if (underPortuguese) {
      const normalized = normalizeTitle(section.line);
      if (posTags.some(pos => normalized.startsWith(pos))) {
        return { index: section.index, line: section.line };
      }
    }
  }

  // Fallback global
  const fallback = sections.find(s => {
    const n = normalizeTitle(s.line);
    return posTags.some(pos => n.startsWith(pos));
  });
  return fallback ? { index: fallback.index, line: fallback.line } : null;
}

/**
 * Extrai texto limpo de um bloco HTML do Wiktionary.
 * Remove tags, notas de rodapé e referências.
 * @param {string} html
 * @returns {string}
 */
function extractTextFromWikiHtml(html) {
  // Usa DOMParser quando disponível (browser) — fallback para regex (Node/teste)
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, 'text/html');

    // Remove elementos de edição e notas
    doc.querySelectorAll('.mw-editsection, sup, .reference, .noprint').forEach(el => el.remove());

    const paragraphs = doc.querySelectorAll('p');
    return Array.from(paragraphs)
      .map(p => p.textContent.trim())
      .filter(t => t.length > 10)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Fallback simples baseado em regex (sem DOM)
  return html
    .replace(/<sup[^>]*>.*?<\/sup>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extrai lista de definições do HTML de uma seção de classe gramatical.
 * O Wiktionary PT usa <ol> com <li> para definições.
 * @param {string} html
 * @returns {string[]}
 */
function extractDefinitionsFromWikiHtml(html) {
  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(html, 'text/html');

    doc.querySelectorAll('.mw-editsection, sup, .reference, .noprint, .example').forEach(el => el.remove());

    const items = doc.querySelectorAll('ol > li');
    if (items.length > 0) {
      return Array.from(items)
        .map(li => li.textContent.trim())
        .filter(t => t.length > 5)
        .slice(0, 5); // máximo 5 definições
    }

    // Fallback: parágrafos
    return Array.from(doc.querySelectorAll('p'))
      .map(p => p.textContent.trim())
      .filter(t => t.length > 10)
      .slice(0, 3);
  }

  return [];
}

/**
 * Remove o cabeçalho administrativo do Gutenberg e retorna o trecho inicial da obra.
 * O cabeçalho termina com uma linha contendo "*** START OF".
 * @param {string} fullText
 * @param {number} charLimit
 * @returns {string}
 */
function extractGutenbergExcerpt(fullText, charLimit) {
  // Marcador padrão do Gutenberg
  const startMarker = /\*{3}\s*START OF (THIS|THE) PROJECT GUTENBERG/i;
  const endMarker   = /\*{3}\s*END OF (THIS|THE) PROJECT GUTENBERG/i;

  const startMatch = startMarker.exec(fullText);
  const endMatch   = endMarker.exec(fullText);

  let body = fullText;

  if (startMatch) {
    // Pula a linha do marcador inteira
    const afterStart = fullText.indexOf('\n', startMatch.index);
    body = fullText.slice(afterStart + 1);
  }

  if (endMatch) {
    body = body.slice(0, endMatch.index - (startMatch?.index ?? 0));
  }

  // Remove linhas em branco iniciais
  body = body.replace(/^\s+/, '');

  return body.slice(0, charLimit);
}

/**
 * Extrai o título da obra do cabeçalho do Gutenberg.
 * @param {string} fullText
 * @returns {string}
 */
function extractGutenbergTitle(fullText) {
  const match = fullText.match(/Title:\s*(.+)/i);
  return match ? match[1].trim() : '';
}

/**
 * Normaliza título de seção para comparação (lowercase, sem acentos especiais de edição).
 * @param {string} title
 * @returns {string}
 */
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/<[^>]+>/g, '') // remove HTML inline
    .trim();
}
