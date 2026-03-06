/**
 * reading.js — Módulo de Leitura Estrutural
 *
 * O usuário seleciona tokens no texto e classifica-os morfossintaticamente.
 * A verificação é baseada nos dados do exercício (heurística declarativa).
 */

import { createTextViewer, classifyToken, clearClassifications } from '../../components/text-viewer.js';
import { createExerciseEngine } from '../../components/exercise-engine.js';

/**
 * @param {object} data — Conteúdo de texts.json
 * @returns {HTMLElement}
 */
export function renderLeituraEstrutura(data) {
  const page = document.createElement('div');

  const texts = data.texts.filter(t => t.exercises.some(e => e.type === 'estrutura'));

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Leitura Estrutural</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Toda frase tem uma arquitetura. Aqui você a torna visível.
        Selecione as palavras do texto e classifique cada elemento.
        O sistema confirma sua análise e explica o porquê.
      </p>
    </div>
    <div id="reading-content"></div>
  `;

  const content = page.querySelector('#reading-content');
  renderTextSelector(content, texts, data);

  return page;
}

function renderTextSelector(container, texts, data) {
  const wrapper = document.createElement('div');

  const label = document.createElement('p');
  label.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost);margin-bottom:var(--space-4);text-transform:uppercase;letter-spacing:0.08em';
  label.textContent = 'Escolha um texto para analisar';
  wrapper.appendChild(label);

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-4);margin-bottom:var(--space-8)';

  texts.forEach(text => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'card';
    btn.style.cssText = 'text-align:left;cursor:pointer;transition:box-shadow var(--transition);';
    btn.setAttribute('aria-label', `Analisar: ${text.title}`);
    btn.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-2)">${text.author}</p>
      <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2)">${text.title}</p>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${text.year} · ${text.genre}</p>
    `;
    btn.addEventListener('mouseenter', () => { btn.style.boxShadow = 'var(--shadow)'; });
    btn.addEventListener('mouseleave', () => { btn.style.boxShadow = ''; });
    btn.addEventListener('click', () => {
      container.innerHTML = '';
      renderTextAnalysis(container, text, () => {
        container.innerHTML = '';
        renderTextSelector(container, texts, data);
      });
    });
    grid.appendChild(btn);
  });

  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}

function renderTextAnalysis(container, textData, onBack) {
  // Legenda de classificação
  const categories = [
    { id: 'sujeito', label: 'Sujeito',   dot: 'legend-dot-sujeito' },
    { id: 'verbo',   label: 'Verbo',     dot: 'legend-dot-verbo'   },
    { id: 'objeto',  label: 'Objeto',    dot: 'legend-dot-objeto'  },
    { id: 'adj',     label: 'Adjunto',   dot: 'legend-dot-adj'     },
  ];

  let activeCategory = 'sujeito';

  // Metadados
  const meta = document.createElement('div');
  meta.className = 'text-meta';
  meta.innerHTML = `
    <span class="text-meta-item">${textData.author}</span>
    <span class="text-meta-separator">·</span>
    <span class="text-meta-item">${textData.title}</span>
    <span class="text-meta-separator">·</span>
    <span class="text-meta-item">${textData.year}</span>
  `;
  container.appendChild(meta);

  // Texto interativo
  const viewer = createTextViewer({
    text: textData.content,
    interactive: true,
    onTokenClick: (word, index, span) => {
      // Aplica a categoria ativa ao token clicado
      classifyToken(viewer, word, activeCategory);
    },
  });
  container.appendChild(viewer);

  // Legenda interativa
  const legend = document.createElement('div');
  legend.className = 'classification-legend';
  legend.setAttribute('role', 'group');
  legend.setAttribute('aria-label', 'Categorias de classificação');

  categories.forEach(cat => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = `legend-item ${cat.id === activeCategory ? 'active' : ''}`;
    item.setAttribute('aria-pressed', cat.id === activeCategory ? 'true' : 'false');
    item.innerHTML = `
      <span class="legend-dot ${cat.dot}" aria-hidden="true"></span>
      <span>${cat.label}</span>
    `;
    item.addEventListener('click', () => {
      activeCategory = cat.id;
      legend.querySelectorAll('.legend-item').forEach(el => {
        el.classList.remove('active');
        el.setAttribute('aria-pressed', 'false');
      });
      item.classList.add('active');
      item.setAttribute('aria-pressed', 'true');
    });
    legend.appendChild(item);
  });

  // Botão limpar
  const clearBtn = document.createElement('button');
  clearBtn.type = 'button';
  clearBtn.className = 'btn-ghost';
  clearBtn.style.cssText = 'margin-left:auto;font-size:var(--text-xs)';
  clearBtn.textContent = 'Limpar';
  clearBtn.addEventListener('click', () => clearClassifications(viewer));
  legend.appendChild(clearBtn);

  container.appendChild(legend);

  // Exercícios estruturais do texto
  const structureExercises = textData.exercises.filter(e =>
    ['estrutura', 'interpretacao', 'fato_opiniao', 'tom', 'inferencia', 'figuras'].includes(e.type)
  );

  if (structureExercises.length > 0) {
    const exerciseTitle = document.createElement('h3');
    exerciseTitle.style.cssText = 'font-family:var(--font-display);margin-top:var(--space-8);margin-bottom:var(--space-4)';
    exerciseTitle.textContent = 'Exercícios';
    container.appendChild(exerciseTitle);

    const engine = createExerciseEngine({
      exercises: structureExercises,
      textViewer: viewer,
    });
    container.appendChild(engine.element);
  }

  // Botão voltar
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'btn btn-secondary';
  backBtn.style.marginTop = 'var(--space-8)';
  backBtn.textContent = '← Escolher outro texto';
  backBtn.addEventListener('click', onBack);
  container.appendChild(backBtn);
}
