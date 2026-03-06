/**
 * main.js — Ponto de entrada da aplicação Quintiliano
 *
 * Responsabilidades:
 *   - Carregar dados JSON
 *   - Instanciar o roteador
 *   - Registrar todas as rotas
 *   - Iniciar a aplicação
 *
 * Todos os módulos são carregados dinamicamente apenas quando a rota é acessada,
 * reduzindo o tempo de carregamento inicial.
 */

import { Router } from './router.js';

/** Dados globais carregados uma única vez */
let textsData    = null;
let authorsData  = null;
let etymData     = null;

/**
 * Carrega um arquivo JSON local.
 * @param {string} path
 * @returns {Promise<object>}
 */
async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Falha ao carregar ${path}: ${response.status}`);
  return response.json();
}

/**
 * Garante que todos os dados estejam carregados.
 * Carrega apenas uma vez — resultados são cacheados nas variáveis do módulo.
 */
async function ensureDataLoaded() {
  if (!textsData || !authorsData || !etymData) {
    [textsData, authorsData, etymData] = await Promise.all([
      loadJSON('./data/texts.json'),
      loadJSON('./data/authors.json'),
      loadJSON('./data/etymology.json'),
    ]);
  }
}

/** Ponto de entrada */
async function init() {
  const outlet = document.getElementById('main-content');
  if (!outlet) throw new Error('Elemento #main-content não encontrado no DOM.');

  const router = new Router(outlet);

  // --- Rota: Página inicial ---
  router.register('/', async () => {
    const { renderHome } = await import('../modules/home.js');
    return renderHome();
  });

  // --- Rota: Leitura estrutural ---
  router.register('/modulo/leitura', async () => {
    await ensureDataLoaded();
    const { renderLeituraEstrutura } = await import('../modules/reading/reading.js');
    return renderLeituraEstrutura(textsData);
  });

  // --- Rota: Interpretação ---
  router.register('/modulo/interpretacao', async () => {
    await ensureDataLoaded();
    const { renderInterpretacao } = await import('../modules/interpretation/interpretation.js');
    return renderInterpretacao(textsData);
  });

  // --- Rota: Sintaxe ---
  router.register('/modulo/sintaxe', async () => {
    const { renderSintaxe } = await import('../modules/syntax/syntax.js');
    return renderSintaxe();
  });

  // --- Rota: Etimologia ---
  router.register('/modulo/etimologia', async () => {
    await ensureDataLoaded();
    const { renderEtimologia } = await import('../modules/etymology/etymology.js');
    return renderEtimologia(etymData);
  });

  // --- Rota: Literatura (lista de autores) ---
  router.register('/modulo/literatura', async () => {
    await ensureDataLoaded();
    const { renderLiteratura } = await import('../modules/literature/literature.js');
    return renderLiteratura(authorsData, router);
  });

  // --- Rota: Perfil de autor ---
  router.register('/autor/:id', async ({ id }) => {
    await ensureDataLoaded();
    const { renderAutorPerfil } = await import('../modules/literature/literature.js');
    return renderAutorPerfil(authorsData.authors, id, textsData, router);
  });

  // --- Rota: Argumentação ---
  router.register('/modulo/argumentacao', async () => {
    const { renderArgumentacao } = await import('../modules/argumentation/argumentation.js');
    return renderArgumentacao();
  });

  // --- Rota: Poesia ---
  router.register('/modulo/poesia', async () => {
    await ensureDataLoaded();
    const { renderPoesia } = await import('../modules/poetry/poetry.js');
    return renderPoesia(textsData);
  });

  // --- Rota: Regras da Língua Portuguesa ---
  router.register('/modulo/regras', async () => {
    const { renderRegras } = await import('../modules/rules/rules.js');
    return renderRegras();
  });

  // --- Rota: Escrita ---
  router.register('/modulo/escrita', async () => {
    await ensureDataLoaded();
    const { renderEscrita } = await import('../modules/writing/writing.js');
    return renderEscrita(textsData);
  });

  // --- Rota: Ortografia ---
  router.register('/modulo/ortografia', async () => {
    const { renderOrtografia } = await import('../modules/orthography/orthography.js');
    return renderOrtografia();
  });

  // --- Rota: Redação ---
  router.register('/modulo/redacao', async () => {
    const { renderRedacao } = await import('../modules/composition/composition.js');
    return renderRedacao();
  });

  // --- Rota: Retórica ---
  router.register('/modulo/retorica', async () => {
    const { renderRetorica } = await import('../modules/rhetoric/rhetoric.js');
    return renderRetorica();
  });

  router.register('/modulo/prosodia', async () => {
    const { renderProsodia } = await import('../modules/prosody/prosody.js');
    return renderProsodia();
  });

  router.register('/modulo/coesao', async () => {
    const { renderCoesao } = await import('../modules/cohesion/cohesion.js');
    return renderCoesao();
  });

  router.register('/modulo/variacao', async () => {
    const { renderVariacao } = await import('../modules/variation/variation.js');
    return renderVariacao();
  });

  router.register('/modulo/premios', async () => {
    const { renderPremios } = await import('../modules/premios/premios.js');
    return renderPremios();
  });

  router.register('/modulo/grandes-nomes', async () => {
    const { renderGrandesNomes } = await import('../modules/grandes-nomes/grandes-nomes.js');
    return renderGrandesNomes();
  });

  router.register('/abl', async () => {
    const { renderABL } = await import('../modules/abl/abl.js');
    return renderABL();
  });

  // Inicia o roteador (resolve o hash atual ou '/')
  router.start();

  // Hambúrguer — abre/fecha ambos os navs em mobile
  const navToggle   = document.getElementById('nav-toggle');
  const mainNav     = document.getElementById('main-nav');
  const secondaryNav = document.getElementById('main-nav-secondary');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      if (secondaryNav) secondaryNav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Fecha ao clicar fora
    document.addEventListener('click', e => {
      const outside = !mainNav.contains(e.target) &&
                      !(secondaryNav && secondaryNav.contains(e.target)) &&
                      !navToggle.contains(e.target);
      if (outside) {
        mainNav.classList.remove('open');
        if (secondaryNav) secondaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Atualiza classe 'active' na navegação quando a rota muda
  window.addEventListener('hashchange', updateNavActive);
  updateNavActive();
}

/**
 * Atualiza o estado visual dos links de navegação com base no hash atual.
 * Em mobile, atualiza também o label do módulo ativo visível no header.
 */
function updateNavActive() {
  const hash = window.location.hash || '#/';
  const activeLabel = document.getElementById('nav-active-label');

  document.querySelectorAll('.nav-link[data-route]').forEach(link => {
    const route   = link.dataset.route;
    const isActive = hash === `#${route}` || (hash === '#' && route === '/');
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');

    if (isActive && activeLabel) {
      activeLabel.textContent = route === '/' ? '' : link.textContent.trim();
    }
  });

  // Fecha o menu ao navegar
  const nav       = document.getElementById('main-nav');
  const navSec    = document.getElementById('main-nav-secondary');
  const toggle    = document.getElementById('nav-toggle');
  if (nav && toggle) {
    nav.classList.remove('open');
    if (navSec) navSec.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
