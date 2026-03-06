/**
 * router.js — Roteador baseado em hash
 *
 * Usa window.location.hash como estado de rota.
 * Cada rota é um par { path: string, render: (params) => HTMLElement }.
 * Não há dependências externas.
 */

export class Router {
  /** @type {Map<string, (params: object) => HTMLElement | Promise<HTMLElement>>} */
  #routes = new Map();

  /** @type {HTMLElement} */
  #outlet;

  /** @type {string | null} */
  #currentPath = null;

  /**
   * @param {HTMLElement} outlet — Elemento onde o conteúdo das rotas é renderizado.
   */
  constructor(outlet) {
    if (!(outlet instanceof HTMLElement)) {
      throw new Error('Router: outlet deve ser um HTMLElement.');
    }
    this.#outlet = outlet;
    window.addEventListener('hashchange', () => this.#resolve());
  }

  /**
   * Registra uma rota.
   * @param {string} path — Ex: '/', '/modulo/etimologia', '/modulo/:id'
   * @param {(params: object) => HTMLElement | Promise<HTMLElement>} handler
   */
  register(path, handler) {
    this.#routes.set(path, handler);
    return this;
  }

  /**
   * Navega para um caminho via hash.
   * @param {string} path
   */
  navigate(path) {
    window.location.hash = path;
  }

  /**
   * Inicia o roteador resolvendo o hash atual.
   */
  start() {
    this.#resolve();
  }

  /**
   * Resolve o hash atual para um handler e renderiza o resultado.
   */
  async #resolve() {
    const hash = window.location.hash.slice(1) || '/';
    const { handler, params } = this.#match(hash);

    if (!handler) {
      this.#render(this.#notFound(hash));
      return;
    }

    this.#currentPath = hash;

    // Scroll para o topo em toda troca de rota
    window.scrollTo({ top: 0, behavior: 'instant' });

    try {
      const content = await handler(params);
      this.#render(content);
    } catch (err) {
      console.error('Router: erro ao renderizar rota', hash, err);
      this.#render(this.#errorView(err));
    }
  }

  /**
   * Tenta casar o path com rotas registradas, incluindo rotas com parâmetros (:param).
   * @param {string} path
   * @returns {{ handler: Function | null, params: object }}
   */
  #match(path) {
    // Correspondência exata
    if (this.#routes.has(path)) {
      return { handler: this.#routes.get(path), params: {} };
    }

    // Correspondência com parâmetros
    for (const [route, handler] of this.#routes) {
      const params = this.#extractParams(route, path);
      if (params !== null) {
        return { handler, params };
      }
    }

    return { handler: null, params: {} };
  }

  /**
   * Extrai parâmetros de uma rota com padrão :param.
   * @param {string} routePattern — Ex: '/autor/:id'
   * @param {string} actualPath   — Ex: '/autor/machado'
   * @returns {object | null}
   */
  #extractParams(routePattern, actualPath) {
    const routeParts  = routePattern.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = decodeURIComponent(actualParts[i]);
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }
    return params;
  }

  /**
   * Substitui o conteúdo do outlet com animação de entrada.
   * @param {HTMLElement} content
   */
  #render(content) {
    this.#outlet.innerHTML = '';
    content.classList.add('fade-in');
    this.#outlet.appendChild(content);
  }

  /** @returns {HTMLElement} */
  #notFound(path) {
    const el = document.createElement('div');
    el.style.cssText = 'text-align:center;padding:var(--space-16) var(--space-8);max-width:560px;margin:0 auto';
    el.innerHTML = `
      <p style="
        font-family:var(--font-display);
        font-size:6rem;
        font-weight:700;
        color:var(--color-paper-border);
        line-height:1;
        margin-bottom:var(--space-6);
        letter-spacing:-0.04em;
      ">404</p>
      <h2 style="
        font-family:var(--font-display);
        font-size:var(--text-2xl);
        color:var(--color-ink);
        margin-bottom:var(--space-4);
      ">Página não encontrada</h2>
      <p style="
        font-family:var(--font-body);
        font-size:var(--text-base);
        color:var(--color-ink-mid);
        line-height:1.75;
        margin-bottom:var(--space-8);
      ">
        O caminho <code style="
          font-family:var(--font-ui);font-size:var(--text-sm);
          background:var(--color-paper-dark);
          border:1px solid var(--color-paper-border);
          border-radius:var(--radius);
          padding:2px 6px;
        ">${path}</code> não existe neste sistema.
      </p>
      <a href="#/" class="btn btn-secondary">← Voltar ao início</a>
    `;
    return el;
  }

  /** @returns {HTMLElement} */
  #errorView(err) {
    const el = document.createElement('div');
    el.className = 'panel';
    el.innerHTML = `
      <p><strong>Erro ao carregar módulo:</strong> ${err.message}</p>
    `;
    return el;
  }

  get currentPath() {
    return this.#currentPath;
  }
}
