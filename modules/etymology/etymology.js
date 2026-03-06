/**
 * etymology.js — Módulo de Etimologia
 *
 * Fontes de dados (em ordem de prioridade):
 *   1. Banco curado local (etymology.json) — palavras do currículo com
 *      informação pedagógica enriquecida (curiosidades, família, cognatos)
 *   2. Wiktionary PT via MediaWiki API — cobertura de qualquer palavra
 *      do português, com cache automático em localStorage
 *
 * O módulo não sabe qual fonte está sendo usada — a lógica de busca
 * está encapsulada em loadWord().
 */

import { fetchEtymology, fetchDefinition } from '../../js/api.js';

/* ================================================================
   ENTRADA PRINCIPAL
   ================================================================ */

/**
 * @param {object} localData — Conteúdo de etymology.json
 * @returns {HTMLElement}
 */
export function renderEtimologia(localData) {
  const localWords = localData.words;

  const page = document.createElement('div');
  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Etimologia</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Cada palavra carrega uma história. Pesquise qualquer palavra do português —
        o sistema busca sua origem no Wiktionary.
        Palavras do currículo têm informação pedagógica enriquecida.
      </p>
    </div>

    <div style="max-width:var(--content-width)">
      <div style="margin-bottom:var(--space-6)">
        <div style="display:flex;gap:var(--space-3)">
          <div style="flex:1">
            <label for="etym-search" class="sr-only">Buscar palavra</label>
            <input
              type="search"
              id="etym-search"
              placeholder="Digite qualquer palavra em português…"
              autocomplete="off"
              spellcheck="false"
              style="
                width:100%;font-family:var(--font-body);font-size:var(--text-base);
                padding:var(--space-6) var(--space-6);border:1.5px solid var(--color-paper-border);
                border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);
                outline:none;transition:border-color var(--transition-fast);
              "
            >
          </div>
          <button type="button" class="btn btn-primary" id="etym-search-btn">Pesquisar</button>
        </div>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-2)">
          Pressione <kbd style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);padding:0 4px;border-radius:2px">/</kbd> para focar · Requer conexão para palavras fora do currículo
        </p>
      </div>

      <div style="margin-bottom:var(--space-8)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-3)">Palavras do currículo</p>
        <div id="word-chips-bar" style="display:flex;flex-wrap:wrap;gap:var(--space-2)"></div>
      </div>

      <div id="etym-detail"></div>
    </div>
  `;

  const searchInput = page.querySelector('#etym-search');
  const searchBtn   = page.querySelector('#etym-search-btn');
  const chipsBar    = page.querySelector('#word-chips-bar');
  const detailArea  = page.querySelector('#etym-detail');

  // Chips do currículo
  localWords.forEach(w => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'word-chip';
    chip.textContent = w.word;
    chip.setAttribute('aria-label', `Ver etimologia de: ${w.word}`);
    chip.addEventListener('click', () => {
      searchInput.value = w.word;
      renderLocalWord(detailArea, w, localWords);
    });
    chipsBar.appendChild(chip);
  });

  // Busca
  const doSearch = () => {
    const query = searchInput.value.trim();
    if (!query) return;
    const local = localWords.find(w => w.word.toLowerCase() === query.toLowerCase());
    if (local) {
      renderLocalWord(detailArea, local, localWords);
    } else {
      renderWiktionaryWord(detailArea, query, localWords);
    }
  };

  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  searchInput.addEventListener('focus', () => { searchInput.style.borderColor = 'var(--color-ink-light)'; });
  searchInput.addEventListener('blur',  () => { searchInput.style.borderColor = 'var(--color-paper-border)'; });

  // Tecla '/' foca no campo
  const onSlash = e => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  };
  document.addEventListener('keydown', onSlash);

  // Exibe primeira palavra por padrão
  renderLocalWord(detailArea, localWords[0], localWords);

  return page;
}

/* ================================================================
   RENDERIZAÇÃO: BANCO LOCAL
   ================================================================ */

function renderLocalWord(container, word, allLocalWords) {
  container.innerHTML = '';
  container.appendChild(buildLocalCard(word, allLocalWords));
  container.classList.add('fade-in');
}

/* ================================================================
   RENDERIZAÇÃO: WIKTIONARY
   ================================================================ */

async function renderWiktionaryWord(container, word, localWords) {
  container.innerHTML = '';
  container.appendChild(buildLoadingState(word));

  const [etymResult, defResult] = await Promise.all([
    fetchEtymology(word),
    fetchDefinition(word),
  ]);

  container.innerHTML = '';

  if (etymResult.error && defResult.error) {
    container.appendChild(buildErrorState(word));
    return;
  }

  if (!etymResult.found && !defResult.found) {
    container.appendChild(buildNotFoundState(word));
    return;
  }

  container.appendChild(buildWiktionaryCard(word, etymResult, defResult));
  container.classList.add('fade-in');
}

/* ================================================================
   CARDS
   ================================================================ */

function buildLocalCard(word, localWords) {
  const card = document.createElement('div');
  card.className = 'etymology-card';

  // Cabeçalho
  const header = document.createElement('div');
  header.className = 'etymology-header';
  header.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between">
      <div>
        <div class="etymology-word">${word.word}</div>
        <div class="etymology-origin-label">${capitalize(word.language_origin)} · <em style="font-style:normal">${word.root}</em></div>
      </div>
      <span class="tag" style="margin-top:var(--space-2);background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-color:rgba(255,255,255,0.2)">Currículo</span>
    </div>
  `;
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'etymology-body';

  // Significado original
  if (word.meaning_origin) {
    const s = buildSection('Significado original');
    s.innerHTML += `<p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid)">
      <em class="lang-foreign">${word.root}</em> → ${word.meaning_origin}
    </p>`;
    body.appendChild(s);
  }

  // Evolução
  if (word.evolution?.length) {
    const s = buildSection('Como chegou ao português');
    const chain = document.createElement('div');
    chain.className = 'evolution-chain';
    word.evolution.forEach((step, i) => {
      const el = document.createElement('span');
      el.className = 'evolution-step';
      el.textContent = step;
      chain.appendChild(el);
      if (i < word.evolution.length - 1) {
        const arrow = document.createElement('span');
        arrow.className = 'evolution-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        chain.appendChild(arrow);
      }
    });
    s.appendChild(chain);
    body.appendChild(s);
  }

  // Cognatos
  const cognates = word.cognates_other_languages ?? {};
  if (Object.keys(cognates).length) {
    const s = buildSection('Em outras línguas');
    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-3)';
    Object.entries(cognates).forEach(([lang, form]) => {
      const cell = document.createElement('div');
      cell.style.cssText = 'background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)';
      cell.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--space-1)">${lang}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid)">${form}</p>
      `;
      grid.appendChild(cell);
    });
    s.appendChild(grid);
    body.appendChild(s);
  }

  // Família
  if (word.family?.length) {
    const s = buildSection('Família de palavras');
    const chips = document.createElement('div');
    chips.className = 'word-family';
    word.family.forEach(w => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'word-chip';
      chip.textContent = w;
      const related = localWords?.find(lw => lw.word === w);
      if (related) {
        chip.addEventListener('click', () => {
          const area = document.querySelector('#etym-detail');
          if (area) renderLocalWord(area, related, localWords);
        });
      }
      chips.appendChild(chip);
    });
    s.appendChild(chips);
    body.appendChild(s);
  }

  // Curiosidade
  if (word.curiosity) {
    const panel = document.createElement('div');
    panel.className = 'panel panel-info';
    panel.style.marginTop = 'var(--space-6)';
    panel.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-gold);margin-bottom:var(--space-2)">Curiosidade</p>
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7">${word.curiosity}</p>
    `;
    body.appendChild(panel);
  }

  card.appendChild(body);
  return card;
}

function buildWiktionaryCard(word, etymResult, defResult) {
  const card = document.createElement('div');
  card.className = 'etymology-card';

  const header = document.createElement('div');
  header.className = 'etymology-header';
  header.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between">
      <div>
        <div class="etymology-word">${word}</div>
        ${defResult.found ? `<div class="etymology-origin-label">${defResult.partOfSpeech}</div>` : ''}
      </div>
      <span class="tag" style="background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);border-color:rgba(255,255,255,0.2)">Wiktionary</span>
    </div>
  `;
  card.appendChild(header);

  const body = document.createElement('div');
  body.className = 'etymology-body';

  if (etymResult.found && etymResult.text) {
    const s = buildSection('Etimologia');
    s.innerHTML += `<p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">${etymResult.text}</p>`;
    body.appendChild(s);
  }

  if (defResult.found && defResult.definitions?.length) {
    const s = buildSection('Definições');
    const ol = document.createElement('ol');
    ol.style.cssText = 'padding-left:var(--space-6);display:flex;flex-direction:column;gap:var(--space-3)';
    defResult.definitions.forEach(def => {
      const li = document.createElement('li');
      li.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7';
      li.textContent = def;
      ol.appendChild(li);
    });
    s.appendChild(ol);
    body.appendChild(s);
  }

  const note = document.createElement('p');
  note.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-6);text-align:right';
  note.innerHTML = `Fonte: <a href="https://pt.wiktionary.org/wiki/${encodeURIComponent(word)}" target="_blank" rel="noopener" style="color:inherit">pt.wiktionary.org</a> · cache de 7 dias`;
  body.appendChild(note);

  card.appendChild(body);
  return card;
}

/* ================================================================
   ESTADOS DE UI
   ================================================================ */

function buildLoadingState(word) {
  const el = document.createElement('div');
  el.className = 'card';
  el.style.cssText = 'text-align:center;padding:var(--space-12)';
  el.innerHTML = `
    <p style="font-family:var(--font-display);font-size:var(--text-2xl);color:var(--color-ink-mid);margin-bottom:var(--space-4)">${word}</p>
    <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">Buscando no Wiktionary…</p>
  `;
  return el;
}

function buildErrorState(word) {
  const el = document.createElement('div');
  el.className = 'panel';
  el.innerHTML = `
    <p style="font-family:var(--font-ui);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2)">Sem conexão</p>
    <p style="font-family:var(--font-body);color:var(--color-ink-mid)">
      Não foi possível contactar o Wiktionary. Verifique sua conexão e tente novamente.
    </p>
    <a href="https://pt.wiktionary.org/wiki/${encodeURIComponent(word)}" target="_blank" rel="noopener"
       class="btn btn-secondary" style="margin-top:var(--space-4);display:inline-flex">Abrir no Wiktionary →</a>
  `;
  return el;
}

function buildNotFoundState(word) {
  const el = document.createElement('div');
  el.className = 'card';
  el.style.cssText = 'text-align:center;padding:var(--space-8)';
  el.innerHTML = `
    <p style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-ink-mid);margin-bottom:var(--space-4)">"${word}"</p>
    <p style="font-family:var(--font-body);color:var(--color-ink-light)">Palavra não encontrada no Wiktionary PT. Verifique a grafia.</p>
    <a href="https://pt.wiktionary.org/wiki/${encodeURIComponent(word)}" target="_blank" rel="noopener"
       class="btn btn-secondary" style="margin-top:var(--space-4);display:inline-flex">Buscar no Wiktionary →</a>
  `;
  return el;
}

/* ================================================================
   UTILITÁRIOS
   ================================================================ */

function buildSection(title) {
  const section = document.createElement('div');
  section.style.marginBottom = 'var(--space-6)';
  const h = document.createElement('h4');
  h.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)';
  h.textContent = title;
  section.appendChild(h);
  return section;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
