/**
 * test-modules.js — Testes de smoke dos módulos
 *
 * Verifica que cada módulo:
 *   1. Exporta a função render esperada
 *   2. A função retorna um HTMLElement (ou objeto com children/innerHTML)
 *   3. Não lança exceção ao ser chamada com dados válidos
 *
 * Módulos que dependem apenas de dados declarados internamente
 * (Ortografia, Redação, Retórica, Sintaxe, Argumentação, Regras)
 * são testados diretamente.
 *
 * Módulos que recebem dados externos (Leitura, Interpretação, Etimologia,
 * Literatura, Escrita, Poesia) são testados com fixtures mínimas.
 *
 * Execução: node --test tests/test-modules.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import * as A from './assert-helpers.js';

const __dir   = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dir, '..');

/* ================================================================
   STUBS DE DOM
   Todos os módulos criam HTMLElements — precisamos de stubs globais.
   ================================================================ */

class HTMLElement {
  constructor(tag = 'div') {
    this.tagName     = tag.toUpperCase();
    this.children    = [];
    this.className   = '';
    this._innerHTML  = '';
    this.style       = new Proxy({}, { set(t, k, v) { t[k] = v; return true; } });
    this._listeners  = {};
    this.href        = '';
    this.type        = '';
    this.disabled    = false;
    this.value       = '';
    this.placeholder = '';
    this.role        = '';
    this.tabIndex    = 0;
    this.dataset     = {};
    this.textContent = '';
    this.id          = '';
  }

  // innerHTML setter: parseia IDs para querySelector funcionar
  set innerHTML(html) {
    this._innerHTML = html;
    this.children   = [];
    // Extrai ids declarados para que querySelector('#id') os encontre
    this._idMap = {};
    const re = /id="([^"]+)"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const el = new HTMLElement();
      el.id = m[1];
      this._idMap[m[1]] = el;
      this.children.push(el);
    }
  }
  get innerHTML() { return this._innerHTML; }

  appendChild(child) { this.children.push(child); return child; }

  querySelector(sel) {
    // Suporta '#id' e '.class' e tag simples
    if (sel && sel.startsWith('#')) {
      const id = sel.slice(1);
      if (this._idMap && this._idMap[id]) return this._idMap[id];
      for (const c of this.children) {
        const found = c.querySelector && c.querySelector(sel);
        if (found) return found;
      }
    }
    // Fallback: retorna elemento vazio (nunca null)
    return new HTMLElement();
  }

  querySelectorAll(sel) {
    const results = [];
    if (this._idMap) {
      for (const el of Object.values(this._idMap)) results.push(el);
    }
    return { forEach: (fn) => results.forEach(fn), length: results.length };
  }

  addEventListener(ev, fn) {
    this._listeners[ev] = this._listeners[ev] ?? [];
    this._listeners[ev].push(fn);
  }
  setAttribute(k, v) { this[k] = v; }
  getAttribute(k)    { return this[k] ?? null; }
  classList = { add: () => {}, remove: () => {}, contains: () => false };
  scrollIntoView() {}
  closest()   { return null; }
  remove()    {}
  focus()     {}
  blur()      {}
}

class Document {
  createElement(tag) { return new HTMLElement(tag); }
  querySelector()    { return new HTMLElement(); }
  querySelectorAll() { return []; }
  getElementById()   { return null; }
  createTextNode(t)  { return { textContent: t, nodeType: 3 }; }
  addEventListener() {}
  removeEventListener() {}
  get activeElement() { return new HTMLElement(); }
}

globalThis.HTMLElement = HTMLElement;
globalThis.document    = new Document();
globalThis.window      = {
  location:  { hash: '' },
  scrollTo:  () => {},
  addEventListener: () => {},
};
globalThis.localStorage = {
  _store: {},
  getItem(k)      { return this._store[k] ?? null; },
  setItem(k, v)   { this._store[k] = v; },
  removeItem(k)   { delete this._store[k]; },
};
globalThis.fetch = async () => ({
  ok: false,
  status: 503,
  json: async () => ({}),
  text: async () => '',
});

/* ================================================================
   FIXTURES MÍNIMAS
   ================================================================ */

function loadJSON(name) {
  return JSON.parse(readFileSync(join(rootDir, 'data', name), 'utf8'));
}

const textsData   = loadJSON('texts.json');
const authorsData = loadJSON('authors.json');
const etymData    = loadJSON('etymology.json');

// Router stub mínimo
const routerStub = {
  navigate: () => {},
  register: () => {},
  currentPath: '/',
};

/* ================================================================
   HELPER
   ================================================================ */

// assertIsElement disponível via A.assertIsElement (assert-helpers.js)

/* ================================================================
   MÓDULOS SEM DADOS EXTERNOS
   ================================================================ */

describe('Módulos independentes (sem dados externos)', () => {

  test('renderOrtografia exporta função e retorna elemento', async () => {
    const { renderOrtografia } = await import('../modules/orthography/orthography.js');
    assert.equal(typeof renderOrtografia, 'function');
    const el = renderOrtografia();
    A.assertIsElement(el, 'renderOrtografia');
  });

  test('renderRedacao exporta função e retorna elemento', async () => {
    const { renderRedacao } = await import('../modules/composition/composition.js');
    assert.equal(typeof renderRedacao, 'function');
    const el = renderRedacao();
    A.assertIsElement(el, 'renderRedacao');
  });

  test('renderRetorica exporta função e retorna elemento', async () => {
    const { renderRetorica } = await import('../modules/rhetoric/rhetoric.js');
    assert.equal(typeof renderRetorica, 'function');
    const el = renderRetorica();
    A.assertIsElement(el, 'renderRetorica');
  });

  test('renderSintaxe exporta função e retorna elemento', async () => {
    const { renderSintaxe } = await import('../modules/syntax/syntax.js');
    assert.equal(typeof renderSintaxe, 'function');
    const el = renderSintaxe();
    A.assertIsElement(el, 'renderSintaxe');
  });

  test('renderArgumentacao exporta função e retorna elemento', async () => {
    const { renderArgumentacao } = await import('../modules/argumentation/argumentation.js');
    assert.equal(typeof renderArgumentacao, 'function');
    const el = renderArgumentacao();
    A.assertIsElement(el, 'renderArgumentacao');
  });

  test('renderRegras exporta função e retorna elemento', async () => {
    const { renderRegras } = await import('../modules/rules/rules.js');
    assert.equal(typeof renderRegras, 'function');
    const el = renderRegras();
    A.assertIsElement(el, 'renderRegras');
  });

  test('renderProsodia exporta função e retorna elemento', async () => {
    const { renderProsodia } = await import('../modules/prosody/prosody.js');
    assert.equal(typeof renderProsodia, 'function');
    const el = renderProsodia();
    A.assertIsElement(el, 'renderProsodia');
  });

  test('renderCoesao exporta função e retorna elemento', async () => {
    const { renderCoesao } = await import('../modules/cohesion/cohesion.js');
    assert.equal(typeof renderCoesao, 'function');
    const el = renderCoesao();
    A.assertIsElement(el, 'renderCoesao');
  });

  test('renderVariacao exporta função e retorna elemento', async () => {
    const { renderVariacao } = await import('../modules/variation/variation.js');
    assert.equal(typeof renderVariacao, 'function');
    const el = renderVariacao();
    A.assertIsElement(el, 'renderVariacao');
  });

  test('renderPremios exporta função e retorna elemento', async () => {
    const { renderPremios } = await import('../modules/premios/premios.js');
    assert.equal(typeof renderPremios, 'function');
    const el = renderPremios();
    A.assertIsElement(el, 'renderPremios');
  });

  test('renderGrandesNomes exporta função e retorna elemento', async () => {
    const { renderGrandesNomes } = await import('../modules/grandes-nomes/grandes-nomes.js');
    assert.equal(typeof renderGrandesNomes, 'function');
    const el = renderGrandesNomes();
    A.assertIsElement(el, 'renderGrandesNomes');
  });

  test('renderABL exporta função e retorna elemento', async () => {
    const { renderABL } = await import('../modules/abl/abl.js');
    assert.equal(typeof renderABL, 'function');
    const el = renderABL();
    A.assertIsElement(el, 'renderABL');
  });

  test('renderSobre exporta função e retorna elemento', async () => {
    const { renderSobre } = await import('../modules/sobre/sobre.js');
    assert.equal(typeof renderSobre, 'function');
    const el = renderSobre();
    A.assertIsElement(el, 'renderSobre');
  });

  test('renderGuia exporta função e retorna elemento', async () => {
    const { renderGuia } = await import('../modules/guia/guia.js');
    assert.equal(typeof renderGuia, 'function');
    const el = renderGuia();
    A.assertIsElement(el, 'renderGuia');
  });

  test('renderPlanoAula exporta função e retorna elemento', async () => {
    const { renderPlanoAula } = await import('../modules/plano-aula/plano-aula.js');
    assert.equal(typeof renderPlanoAula, 'function');
    const el = renderPlanoAula();
    A.assertIsElement(el, 'renderPlanoAula');
  });

  test('renderHome exporta função e retorna elemento', async () => {
    const { renderHome } = await import('../modules/home.js');
    assert.equal(typeof renderHome, 'function');
    const el = renderHome();
    A.assertIsElement(el, 'renderHome');
  });
});

/* ================================================================
   MÓDULOS QUE RECEBEM DADOS
   ================================================================ */

describe('Módulos com dados externos (fixtures reais)', () => {

  test('renderLiteratura retorna elemento com dados reais', async () => {
    const { renderLiteratura } = await import('../modules/literature/literature.js');
    assert.equal(typeof renderLiteratura, 'function');
    const el = renderLiteratura(authorsData, routerStub);
    A.assertIsElement(el, 'renderLiteratura');
  });

  test('renderAutorPerfil com autor existente retorna elemento', async () => {
    const { renderAutorPerfil } = await import('../modules/literature/literature.js');
    assert.equal(typeof renderAutorPerfil, 'function');
    const el = renderAutorPerfil(authorsData.authors, 'machado', textsData, routerStub);
    A.assertIsElement(el, 'renderAutorPerfil(machado)');
  });

  test('renderAutorPerfil com ID inexistente não lança exceção', async () => {
    const { renderAutorPerfil } = await import('../modules/literature/literature.js');
    let threw = false;
    let el;
    try {
      el = renderAutorPerfil(authorsData.authors, 'nao_existe', textsData, routerStub);
    } catch {
      threw = true;
    }
    assert.ok(!threw, 'renderAutorPerfil lançou exceção para autor inexistente');
    A.assertIsElement(el, 'renderAutorPerfil(nao_existe)');
  });

  test('renderEtimologia retorna elemento com dados reais', async () => {
    const { renderEtimologia } = await import('../modules/etymology/etymology.js');
    assert.equal(typeof renderEtimologia, 'function');
    const el = renderEtimologia(etymData);
    A.assertIsElement(el, 'renderEtimologia');
  });

  test('renderLeituraEstrutura retorna elemento com dados reais', async () => {
    const { renderLeituraEstrutura } = await import('../modules/reading/reading.js');
    assert.equal(typeof renderLeituraEstrutura, 'function');
    const el = renderLeituraEstrutura(textsData);
    A.assertIsElement(el, 'renderLeituraEstrutura');
  });

  test('renderInterpretacao retorna elemento com dados reais', async () => {
    const { renderInterpretacao } = await import('../modules/interpretation/interpretation.js');
    assert.equal(typeof renderInterpretacao, 'function');
    const el = renderInterpretacao(textsData);
    A.assertIsElement(el, 'renderInterpretacao');
  });

  test('renderPoesia retorna elemento com dados reais', async () => {
    const { renderPoesia } = await import('../modules/poetry/poetry.js');
    assert.equal(typeof renderPoesia, 'function');
    const el = renderPoesia(textsData);
    A.assertIsElement(el, 'renderPoesia');
  });

  test('renderEscrita retorna elemento com dados reais', async () => {
    const { renderEscrita } = await import('../modules/writing/writing.js');
    assert.equal(typeof renderEscrita, 'function');
    const el = renderEscrita(textsData);
    A.assertIsElement(el, 'renderEscrita');
  });
});

/* ================================================================
   CONSISTÊNCIA: textos de autores cadastrados
   ================================================================ */

describe('Consistência entre dados', () => {

  test('todos os autores em texts.json têm pelo menos um perfil em authors.json', () => {
    const mismatches = [];

    textsData.texts.forEach(t => {
      if (!t.author) return;
      // Normaliza: remove parênteses e heterônimos, extrai tokens
      const normalized = t.author.replace(/\(.*?\)/g, '').trim().toLowerCase();
      const tokens = normalized.split(/\s+/).filter(tok => tok.length > 3);

      // Basta um token do nome bater com qualquer parte do nome de um autor cadastrado
      const found = tokens.some(tok =>
        authorsData.authors.some(a => a.name.toLowerCase().includes(tok))
      );

      // Textos didáticos anônimos são permitidos
      const isAnonymous = normalized.startsWith('texto') || tokens.length === 0;
      if (!found && !isAnonymous) {
        mismatches.push(`"${t.author}" (texto: ${t.id})`);
      }
    });

    assert.deepEqual(
      mismatches, [],
      `Textos sem autor cadastrado em authors.json:\n  ${mismatches.join('\n  ')}`
    );
  });

  test('número de textos é >= 40', () => {
    assert.ok(textsData.texts.length >= 40, `Esperado >= 40 textos, encontrado ${textsData.texts.length}`);
  });

  test('número de autores é >= 15', () => {
    assert.ok(authorsData.authors.length >= 20, `Esperado >= 20 autores, encontrado ${authorsData.authors.length}`);
  });

  test('número de entradas etimológicas é >= 45', () => {
    assert.ok(etymData.words.length >= 60, `Esperado >= 60 entradas, encontrado ${etymData.words.length}`);
  });
});
