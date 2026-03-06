/**
 * text-viewer.js — Componente de visualização de texto interativo
 *
 * Responsabilidades:
 *   - Tokenizar texto em palavras e pontuação
 *   - Renderizar tokens clicáveis com suporte a classificação
 *   - Expor API para highlight externo (dicas)
 *   - Emitir eventos de seleção para os módulos de exercício
 *
 * Não faz análise linguística — apenas renderização e interação.
 */

/**
 * Tokeniza uma string de texto em tokens de palavra e pontuação.
 * Preserva espaços como tokens separados para manter a formatação.
 *
 * @param {string} text
 * @returns {Array<{ type: 'word'|'punct'|'space', value: string }>}
 */
export function tokenize(text) {
  const tokens = [];
  // Regex: captura palavras (com hífen/apóstrofo internos), pontuação, e espaços/quebras
  const pattern = /([A-Za-zÀ-ÖØ-öø-ÿ]+(?:[-'][A-Za-zÀ-ÖØ-öø-ÿ]+)*)|([.,;:!?—\-–"«»()\[\]\/])|(\s+)/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match[1]) {
      tokens.push({ type: 'word',  value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: 'punct', value: match[2] });
    } else if (match[3]) {
      tokens.push({ type: 'space', value: match[3] });
    }
  }

  return tokens;
}

/**
 * Cria um componente de visualização de texto interativo.
 *
 * @param {object} options
 * @param {string} options.text                — Texto a ser exibido
 * @param {boolean} [options.interactive]      — Se tokens de palavra são clicáveis (padrão: true)
 * @param {(word: string, index: number) => void} [options.onTokenClick] — Callback ao clicar em token
 * @returns {HTMLElement}
 */
export function createTextViewer({ text, interactive = true, onTokenClick }) {
  const container = document.createElement('div');
  container.className = 'text-display';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Texto para análise');

  const tokens = tokenize(text);

  tokens.forEach((token, index) => {
    if (token.type === 'space') {
      container.appendChild(document.createTextNode(token.value));
      return;
    }

    const span = document.createElement('span');
    span.textContent = token.value;
    span.dataset.index = index;
    span.dataset.value = token.value;
    span.dataset.type  = token.type;

    if (token.type === 'word') {
      span.className = 'token';
      if (interactive) {
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', `Palavra: ${token.value}`);

        const handler = () => onTokenClick?.(token.value, index, span);

        span.addEventListener('click', handler);
        span.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handler();
          }
        });
      }
    } else {
      span.className = 'token punct';
    }

    container.appendChild(span);
  });

  return container;
}

/**
 * Aplica highlight em tokens por valor de palavra.
 * Usado pelo sistema de dicas.
 *
 * @param {HTMLElement} viewer        — Container retornado por createTextViewer
 * @param {string[]} words            — Palavras a destacar
 * @param {boolean} [clear=true]      — Limpar highlights anteriores antes de aplicar
 */
export function highlightWords(viewer, words, clear = true) {
  if (clear) clearHighlights(viewer);

  const normalized = words.map(w => w.toLowerCase());
  const tokens = viewer.querySelectorAll('.token[data-type="word"]');

  tokens.forEach(token => {
    if (normalized.includes(token.dataset.value.toLowerCase())) {
      token.classList.add('hint-highlight');
    }
  });
}

/**
 * Remove todos os highlights de dica.
 * @param {HTMLElement} viewer
 */
export function clearHighlights(viewer) {
  viewer.querySelectorAll('.hint-highlight').forEach(el => {
    el.classList.remove('hint-highlight');
  });
}

/**
 * Aplica classificação morfossintática a tokens pelo valor da palavra.
 *
 * @param {HTMLElement} viewer
 * @param {string} word       — Palavra a classificar
 * @param {string} className  — 'sujeito' | 'verbo' | 'objeto' | 'adj'
 */
export function classifyToken(viewer, word, className) {
  const tokens = viewer.querySelectorAll('.token[data-type="word"]');
  tokens.forEach(token => {
    if (token.dataset.value.toLowerCase() === word.toLowerCase()) {
      // Remove classificação anterior se houver
      token.classList.remove('classified');
      delete token.dataset.class;

      if (className) {
        token.classList.add('classified');
        token.dataset.class = className;
        token.setAttribute('aria-label', `${token.dataset.value} — ${className}`);
      }
    }
  });
}

/**
 * Remove todas as classificações de tokens.
 * @param {HTMLElement} viewer
 */
export function clearClassifications(viewer) {
  viewer.querySelectorAll('.token.classified').forEach(token => {
    token.classList.remove('classified');
    delete token.dataset.class;
  });
}

/**
 * Retorna um array com as palavras atualmente selecionadas (classe 'selected').
 * @param {HTMLElement} viewer
 * @returns {string[]}
 */
export function getSelectedWords(viewer) {
  return Array.from(viewer.querySelectorAll('.token.selected')).map(t => t.dataset.value);
}

/**
 * Marca tokens como selecionados por valor.
 * @param {HTMLElement} viewer
 * @param {string[]} words
 */
export function selectWords(viewer, words) {
  const normalized = words.map(w => w.toLowerCase());
  viewer.querySelectorAll('.token[data-type="word"]').forEach(token => {
    if (normalized.includes(token.dataset.value.toLowerCase())) {
      token.classList.add('selected');
    }
  });
}

/**
 * Limpa seleção de tokens.
 * @param {HTMLElement} viewer
 */
export function clearSelection(viewer) {
  viewer.querySelectorAll('.token.selected').forEach(t => t.classList.remove('selected'));
}
