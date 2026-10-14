/** Roteador por hash com proteção contra renders assíncronos obsoletos. */
export class Router {
  #routes = new Map();
  #outlet;
  #currentPath = null;
  #generation = 0;
  #cleanup = null;

  constructor(outlet) {
    if (!(outlet instanceof HTMLElement)) throw new Error('Router: outlet deve ser um HTMLElement.');
    this.#outlet = outlet;
    window.addEventListener('hashchange', () => this.#resolve());
  }

  register(path, handler) { this.#routes.set(path, handler); return this; }
  navigate(path) { window.location.hash = path; }
  start() { this.#resolve(); }
  get currentPath() { return this.#currentPath; }

  async #resolve() {
    const request = ++this.#generation;
    const { path, query } = parseHash(window.location.hash);
    const { handler, params } = this.#match(path);
    this.#dispose();

    if (!handler) return this.#render(this.#notFound(path));
    this.#currentPath = path;
    window.scrollTo({ top: 0, behavior: 'instant' });
    try {
      const content = await handler({ ...params, query });
      if (request !== this.#generation) {
        content?.destroy?.();
        return;
      }
      this.#cleanup = typeof content?.destroy === 'function' ? content.destroy.bind(content) : null;
      this.#render(content);
    } catch (error) {
      if (request === this.#generation) {
        console.error('Router: erro ao renderizar rota', path, error);
        this.#render(this.#errorView());
      }
    }
  }

  #dispose() {
    this.#cleanup?.();
    this.#cleanup = null;
  }

  #match(path) {
    if (this.#routes.has(path)) return { handler: this.#routes.get(path), params: {} };
    for (const [route, handler] of this.#routes) {
      const params = extractParams(route, path);
      if (params) return { handler, params };
    }
    return { handler: null, params: {} };
  }

  #render(content) {
    this.#outlet.replaceChildren();
    content.classList.add('fade-in');
    this.#outlet.appendChild(content);
  }

  #notFound(path) {
    const el = document.createElement('div');
    el.className = 'panel';
    const title = document.createElement('h2'); title.textContent = 'Página não encontrada';
    const detail = document.createElement('p'); detail.textContent = `O caminho “${path}” não existe neste sistema.`;
    const link = document.createElement('a'); link.href = '#/'; link.className = 'btn btn-secondary'; link.textContent = 'Voltar ao início';
    el.append(title, detail, link);
    return el;
  }

  #errorView() {
    const el = document.createElement('div');
    el.className = 'panel';
    el.textContent = 'Não foi possível carregar este módulo. Tente novamente.';
    return el;
  }
}

export function parseHash(hash) {
  const raw = String(hash || '#/').replace(/^#/, '') || '/';
  const [path, search = ''] = raw.split('?');
  return { path: path.startsWith('/') ? path : '/', query: new URLSearchParams(search) };
}

function extractParams(pattern, actual) {
  const expected = pattern.split('/');
  const received = actual.split('/');
  if (expected.length !== received.length) return null;
  const params = {};
  for (let i = 0; i < expected.length; i++) {
    if (expected[i].startsWith(':')) {
      try { params[expected[i].slice(1)] = decodeURIComponent(received[i]); } catch (_) { return null; }
    } else if (expected[i] !== received[i]) return null;
  }
  return params;
}
