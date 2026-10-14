/** Visualizador de texto que preserva a sequência original de caracteres. */
export function tokenize(text) {
  const source = String(text ?? '');
  return [...source.matchAll(/\p{L}+(?:[-'’]\p{L}+)*|\p{N}+(?:[.,]\p{N}+)?|\s+|[^\s\p{L}\p{N}]/gu)]
    .map(match => ({
      type: /^\p{L}/u.test(match[0]) ? 'word' : /^\p{N}/u.test(match[0]) ? 'number' : /^\s/u.test(match[0]) ? 'space' : 'punct',
      value: match[0],
      start: match.index,
      end: match.index + match[0].length,
    }));
}

export function createTextViewer({ text, interactive = true, onTokenClick }) {
  const container = document.createElement('div');
  container.className = 'text-display';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Texto para análise');
  const tokens = tokenize(text);
  container._defaultTokenClickHandler = onTokenClick;
  container._tokenClickHandler = onTokenClick;

  tokens.forEach((token, index) => {
    if (token.type === 'space') {
      container.appendChild(document.createTextNode(token.value));
      return;
    }
    const span = document.createElement('span');
    span.textContent = token.value;
    span.dataset.index = String(index);
    span.dataset.value = token.value;
    span.dataset.type = token.type;
    span.dataset.start = String(token.start);
    span.dataset.end = String(token.end);
    if (token.type === 'word' || token.type === 'number') {
      span.className = 'token';
      if (interactive) {
        span.tabIndex = 0;
        span.setAttribute('role', 'button');
        span.setAttribute('aria-label', `Selecionar: ${token.value}`);
        const activate = () => container._tokenClickHandler?.(token.value, index, span);
        span.addEventListener('click', activate);
        span.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate();
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

export function highlightWords(viewer, words, clear = true) {
  if (clear) clearHighlights(viewer);
  const wanted = new Set((words ?? []).map(word => String(word).toLocaleLowerCase('pt-BR')));
  viewer.querySelectorAll('.token[data-type="word"], .token[data-type="number"]').forEach(token => {
    if (wanted.has(token.dataset.value.toLocaleLowerCase('pt-BR'))) token.classList.add('hint-highlight');
  });
}

export function clearHighlights(viewer) {
  viewer.querySelectorAll('.hint-highlight').forEach(element => element.classList.remove('hint-highlight'));
}

export function classifyToken(viewer, tokenIndex, className) {
  const token = viewer.querySelector(`.token[data-index="${tokenIndex}"]`);
  if (!token) return;
  token.classList.toggle('classified', Boolean(className));
  if (className) {
    token.dataset.class = className;
    token.setAttribute('aria-label', `${token.dataset.value} — ${className}`);
  } else {
    delete token.dataset.class;
    token.setAttribute('aria-label', `Selecionar: ${token.dataset.value}`);
  }
}

export function clearClassifications(viewer) {
  viewer.querySelectorAll('.token.classified').forEach(token => {
    token.classList.remove('classified');
    delete token.dataset.class;
  });
}

export function clearSelection(viewer) {
  viewer.querySelectorAll('.token.selected').forEach(token => token.classList.remove('selected'));
}
