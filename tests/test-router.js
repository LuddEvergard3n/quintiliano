/**
 * test-router.js — Testes unitários do Router
 *
 * Execução: node --test tests/test-router.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as A from './assert-helpers.js';

/* ================================================================
   STUBS
   ================================================================ */

class StyleMap {
  constructor() { this._m = {}; }
  set cssText(v) { this._m.cssText = v; }
  get cssText()  { return this._m.cssText ?? ''; }
}

class HTMLElement {
  constructor() {
    this.children    = [];
    this.className   = '';
    this._innerHTML  = '';
    this.style       = new StyleMap();
    this._listeners  = {};
    this.textContent = '';
    this.dataset     = {};
  }
  set innerHTML(v) { this._innerHTML = v; }
  get innerHTML()  { return this._innerHTML; }
  appendChild(child) { this.children.push(child); return child; }
  classList = { add: () => {} };
  addEventListener(ev, fn) {
    this._listeners[ev] = this._listeners[ev] ?? [];
    this._listeners[ev].push(fn);
  }
  setAttribute() {}
  getAttribute() { return null; }
  querySelector()    { return new HTMLElement(); }
  querySelectorAll() { return { forEach: () => {} }; }
}

class Document {
  createElement() { return new HTMLElement(); }
  querySelector() { return new HTMLElement(); }
  addEventListener() {}
}

// Objeto window mutável — o Router captura a referência uma vez via import cache.
// makeEnv() muta os campos internos em vez de substituir o objeto.
const sharedWindow = {
  location:  { hash: '' },
  scrollTo:  () => {},
  _listeners: [],
  addEventListener(ev, fn) {
    if (ev === 'hashchange') this._listeners.push(fn);
  },
};

globalThis.window      = sharedWindow;
globalThis.HTMLElement = HTMLElement;
globalThis.document    = new Document();

const { Router } = await import('../js/router.js');

/* ================================================================
   HELPERS
   ================================================================ */

function makeEnv() {
  // Reseta listeners e hash sem substituir o objeto
  sharedWindow._listeners  = [];
  sharedWindow.location    = { hash: '' };

  function fire(path) {
    sharedWindow.location.hash = path;
    // O router usa window.location.hash — que resolve via sharedWindow
    // mas o listener foi registrado via sharedWindow.addEventListener
    sharedWindow._listeners.forEach(fn => fn());
  }

  return { fire, loc: sharedWindow.location };
}

/* ================================================================
   TESTES
   ================================================================ */

describe('Router — matching', () => {

  test('rota exata "/" é resolvida via navigate', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);
    let called     = false;

    router.register('/', () => { called = true; return new HTMLElement(); });
    fire('#/');
    await new Promise(r => setTimeout(r, 20));

    assert.ok(called, 'handler da rota "/" não foi chamado');
  });

  test('rota com parâmetro extrai o valor correto', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);
    let captured   = null;

    router.register('/autor/:id', ({ id }) => { captured = id; return new HTMLElement(); });
    fire('#/autor/machado');
    await new Promise(r => setTimeout(r, 20));

    assert.equal(captured, 'machado');
  });

  test('rota com múltiplos parâmetros extrai todos', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);
    let params     = null;

    router.register('/modulo/:mod/texto/:id', (p) => { params = p; return new HTMLElement(); });
    fire('#/modulo/leitura/texto/machado_capitu');
    await new Promise(r => setTimeout(r, 20));

    assert.deepEqual(params, { mod: 'leitura', id: 'machado_capitu' });
  });

  test('rota não encontrada renderiza 404 sem lançar exceção', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    new Router(outlet);
    let threw      = false;

    try {
      fire('#/nao/existe');
      await new Promise(r => setTimeout(r, 20));
    } catch {
      threw = true;
    }

    assert.ok(!threw, 'Router lançou exceção para rota não encontrada');
    assert.ok(outlet.children.length > 0, 'Outlet deve ter conteúdo 404');
  });

  test('rota exata tem precedência sobre parâmetro com mesmo prefixo', async () => {
    const { fire } = makeEnv();
    const outlet    = new HTMLElement();
    const router    = new Router(outlet);
    let exactCalled = false;
    let paramCalled = false;

    router.register('/autor/lista', () => { exactCalled = true; return new HTMLElement(); });
    router.register('/autor/:id',   () => { paramCalled = true; return new HTMLElement(); });

    fire('#/autor/lista');
    await new Promise(r => setTimeout(r, 20));

    assert.ok(exactCalled,  'handler exato não foi chamado');
    assert.ok(!paramCalled, 'handler paramétrico não deveria ter sido chamado');
  });
});

describe('Router — navigate e currentPath', () => {

  test('navigate() atualiza window.location.hash', () => {
    makeEnv();
    const router = new Router(new HTMLElement());
    router.navigate('/modulo/sintaxe');
    assert.equal(sharedWindow.location.hash, '/modulo/sintaxe');
  });

  test('currentPath reflete a última rota resolvida com sucesso', async () => {
    const { fire } = makeEnv();
    const router   = new Router(new HTMLElement());

    router.register('/modulo/poesia', () => new HTMLElement());
    fire('#/modulo/poesia');
    await new Promise(r => setTimeout(r, 20));

    assert.equal(router.currentPath, '/modulo/poesia');
  });

  test('handler assíncrono é aguardado antes de renderizar', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);
    let rendered   = false;

    router.register('/async-route', async () => {
      await new Promise(r => setTimeout(r, 5));
      rendered = true;
      return new HTMLElement();
    });

    fire('#/async-route');
    await new Promise(r => setTimeout(r, 40));

    assert.ok(rendered, 'handler assíncrono não foi aguardado');
    assert.ok(outlet.children.length > 0, 'conteúdo não foi renderizado');
  });
});

describe('Router — tratamento de erros', () => {

  test('handler que lança não quebra o router', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);
    let threw      = false;

    router.register('/broken', () => { throw new Error('falha intencional'); });

    try {
      fire('#/broken');
      await new Promise(r => setTimeout(r, 20));
    } catch {
      threw = true;
    }

    assert.ok(!threw, 'exceção do handler vazou para fora do Router');
    assert.ok(outlet.children.length > 0, 'errorView deve ter sido renderizado');
  });

  test('outlet fica com conteúdo após rota com erro', async () => {
    const { fire } = makeEnv();
    const outlet   = new HTMLElement();
    const router   = new Router(outlet);

    router.register('/err', () => { throw new Error('x'); });
    fire('#/err');
    await new Promise(r => setTimeout(r, 20));

    assert.ok(outlet.children.length > 0);
  });
});

describe('Router — construtor', () => {

  test('lança TypeError se outlet não for HTMLElement', () => {
    makeEnv();
    assert.throws(
      () => new Router(null),
      { message: 'Router: outlet deve ser um HTMLElement.' }
    );
  });

  test('aceita HTMLElement válido sem lançar', () => {
    makeEnv();
    assert.doesNotThrow(() => new Router(new HTMLElement()));
  });
});
