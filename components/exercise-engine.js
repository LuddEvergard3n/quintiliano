/**
 * exercise-engine.js — Motor de exercícios
 *
 * Responsabilidades:
 *   - Renderizar qualquer tipo de exercício definido nos dados
 *   - Verificar respostas
 *   - Emitir feedback imediato
 *   - Controlar fluxo (próximo exercício, reinício)
 *
 * Tipos de exercício suportados:
 *   - 'estrutura'     — Identificação de elementos no texto (clique em tokens)
 *   - 'interpretacao' — Múltipla escolha sobre sentido do texto
 *   - 'tom'           — Múltipla escolha sobre tom/voz do autor
 *   - 'fato_opiniao'  — Classificar itens como fato ou opinião
 *   - 'inferencia'    — Múltipla escolha sobre inferência
 *   - 'figuras'       — Identificação de figuras de linguagem no texto
 */

import { highlightWords, clearHighlights } from './text-viewer.js';

/**
 * Cria o motor de exercícios para uma sequência de exercícios.
 *
 * @param {object} options
 * @param {Array}        options.exercises       — Array de objetos de exercício
 * @param {HTMLElement}  options.textViewer      — Componente text-viewer para highlight
 * @param {(result: object) => void} [options.onComplete] — Chamado ao concluir todos os exercícios
 * @returns {{ element: HTMLElement, destroy: () => void }}
 */
export function createExerciseEngine({ exercises, textViewer, onComplete }) {
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  const container = document.createElement('div');
  container.className = 'exercise-container';

  renderCurrent();

  function renderCurrent() {
    container.innerHTML = '';
    clearHighlights(textViewer);

    if (currentIndex >= exercises.length) {
      renderCompletion();
      return;
    }

    const exercise = exercises[currentIndex];

    // Barra de progresso
    container.appendChild(createProgressBar(currentIndex, exercises.length));

    // Renderiza o tipo correto
    switch (exercise.type) {
      case 'interpretacao':
      case 'tom':
      case 'inferencia':
        container.appendChild(renderMultipleChoice(exercise));
        break;
      case 'fato_opiniao':
        container.appendChild(renderFatoOpiniao(exercise));
        break;
      case 'estrutura':
      case 'figuras':
        container.appendChild(renderStructureExercise(exercise));
        break;
      default:
        container.appendChild(renderMultipleChoice(exercise));
    }
  }

  /** Múltipla escolha genérica */
  function renderMultipleChoice(exercise) {
    answered = false;
    const wrapper = document.createElement('div');

    wrapper.appendChild(createInstruction(exercise.instruction));

    const optionList = document.createElement('ul');
    optionList.className = 'options-list';
    optionList.setAttribute('role', 'list');

    const letters = ['A', 'B', 'C', 'D', 'E'];

    exercise.options.forEach((option, i) => {
      const li = document.createElement('li');
      li.className = 'option-item';

      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('type', 'button');
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${letters[i]}</span>
        <span>${option}</span>
      `;

      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = i === exercise.correct;
        if (isCorrect) score++;

        // Marca visualmente as opções
        optionList.querySelectorAll('.option-item').forEach((item, idx) => {
          item.querySelector('.option-btn').disabled = true;
          if (idx === exercise.correct) item.classList.add('correct');
          if (idx === i && !isCorrect) item.classList.add('incorrect');
        });

        showFeedback(wrapper, isCorrect, exercise.explanation);
        clearHighlights(textViewer);
        renderControls(wrapper, exercise);
      });

      li.appendChild(btn);
      optionList.appendChild(li);
    });

    wrapper.appendChild(optionList);
    wrapper.appendChild(createFeedbackArea());
    wrapper.appendChild(createHintButton(exercise, textViewer));

    return wrapper;
  }

  /** Exercício de Fato vs. Opinião */
  function renderFatoOpiniao(exercise) {
    answered = false;
    const wrapper = document.createElement('div');

    wrapper.appendChild(createInstruction(exercise.instruction));

    const itemsContainer = document.createElement('div');
    itemsContainer.style.display = 'flex';
    itemsContainer.style.flexDirection = 'column';
    itemsContainer.style.gap = 'var(--space-4)';
    itemsContainer.style.marginBottom = 'var(--space-6)';

    const userAnswers = {};
    let answeredCount = 0;

    exercise.items.forEach((item, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; align-items:flex-start; gap:var(--space-4); border:1px solid var(--color-paper-border); border-radius:var(--radius); padding:var(--space-3) var(--space-4); background:var(--color-paper)';

      const textSpan = document.createElement('span');
      textSpan.style.cssText = 'flex:1; font-family:var(--font-body); font-style:italic; color:var(--color-ink-mid)';
      textSpan.textContent = `"${item.text}"`;

      const btnGroup = document.createElement('div');
      btnGroup.style.cssText = 'display:flex; gap:var(--space-2); flex-shrink:0';

      ['fato', 'opiniao'].forEach(type => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = type === 'fato' ? 'Fato' : 'Opinião';
        btn.className = 'btn btn-secondary';
        btn.style.cssText = 'padding:var(--space-1) var(--space-3); font-size:var(--text-xs)';
        btn.dataset.type = type;

        btn.addEventListener('click', () => {
          if (answered) return;
          // Atualiza seleção visual
          btnGroup.querySelectorAll('button').forEach(b => {
            b.classList.remove('btn-accent');
            b.classList.add('btn-secondary');
          });
          btn.classList.add('btn-accent');
          btn.classList.remove('btn-secondary');

          const wasAnswered = item.id in userAnswers;
          userAnswers[item.id ?? i] = type;
          if (!wasAnswered) answeredCount++;

          if (answeredCount === exercise.items.length && !answered) {
            answered = true;
            let allCorrect = true;
            exercise.items.forEach((it, idx) => {
              const key = it.id ?? idx;
              const correct = userAnswers[key] === it.answer;
              if (!correct) allCorrect = false;
            });
            if (allCorrect) score++;
            showFeedback(wrapper, allCorrect, exercise.explanation);
            renderControls(wrapper, exercise);
          }
        });

        btnGroup.appendChild(btn);
      });

      item.id = i; // garante chave
      row.appendChild(textSpan);
      row.appendChild(btnGroup);
      itemsContainer.appendChild(row);
    });

    wrapper.appendChild(itemsContainer);
    wrapper.appendChild(createFeedbackArea());

    return wrapper;
  }

  /** Exercício de identificação estrutural (clique nos tokens do texto) */
  function renderStructureExercise(exercise) {
    answered = false;
    const wrapper = document.createElement('div');

    const targets = Array.isArray(exercise.targets) ? exercise.targets : [exercise.target];

    wrapper.appendChild(createInstruction(
      exercise.instruction + '<br><small style="color:var(--color-ink-ghost)">Clique nas palavras do texto acima para selecionar.</small>'
    ));

    // Coleta seleção via clique no text-viewer
    const selected = new Set();

    const originalOnClick = textViewer._onTokenClick;
    textViewer._tokenClickHandler = (word, index, span) => {
      if (answered) return;
      span.classList.toggle('selected');
      if (span.classList.contains('selected')) {
        selected.add(word.toLowerCase());
      } else {
        selected.delete(word.toLowerCase());
      }
    };

    // Reconnecta handler — texto já foi renderizado, reatribui eventos
    textViewer.querySelectorAll('.token[data-type="word"]').forEach(span => {
      span.onclick = () => textViewer._tokenClickHandler?.(span.dataset.value, span.dataset.index, span);
    });

    const checkBtn = document.createElement('button');
    checkBtn.type = 'button';
    checkBtn.className = 'btn btn-primary';
    checkBtn.textContent = 'Verificar seleção';
    checkBtn.style.marginBottom = 'var(--space-4)';

    checkBtn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const normalizedTargets = targets.map(t => t.toLowerCase());
      const normalizedSelected = Array.from(selected);

      // Aceita se ao menos uma das palavras-alvo foi selecionada
      const hits = normalizedSelected.filter(w => {
        return normalizedTargets.some(t => t.includes(w) || w.includes(t));
      });

      const isCorrect = hits.length > 0;
      if (isCorrect) score++;

      // Destaca resposta correta no texto.
      // hint_highlight é opcional — se ausente, usa targets como fallback.
      // Filtra para não chamar highlightWords com array vazio.
      const toHighlight = (exercise.hint_highlight?.length ? exercise.hint_highlight : targets)
        .filter(w => typeof w === 'string' && w.trim() !== '');
      if (toHighlight.length) highlightWords(textViewer, toHighlight, false);
      showFeedback(wrapper, isCorrect, exercise.explanation);
      renderControls(wrapper, exercise);
    });

    wrapper.appendChild(checkBtn);
    wrapper.appendChild(createFeedbackArea());
    wrapper.appendChild(createHintButton(exercise, textViewer));

    return wrapper;
  }

  /** Mostra feedback de resposta */
  function showFeedback(wrapper, isCorrect, explanation) {
    const feedback = wrapper.querySelector('.exercise-feedback');
    if (!feedback) return;

    feedback.classList.add('visible');
    feedback.classList.add(isCorrect ? 'success' : 'error');

    const title = feedback.querySelector('.feedback-title');
    const exp   = feedback.querySelector('.feedback-explanation');

    title.textContent    = isCorrect ? 'Correto' : 'Não exatamente';
    exp.textContent      = explanation ?? '';
  }

  /** Renderiza controles de navegação após resposta */
  function renderControls(wrapper, exercise) {
    const controls = document.createElement('div');
    controls.className = 'exercise-controls';

    const isLast = currentIndex === exercises.length - 1;

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = isLast ? 'Ver resultado' : 'Próximo exercício →';
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      renderCurrent();
    });

    controls.appendChild(nextBtn);
    wrapper.appendChild(controls);
  }

  /** Tela de conclusão */
  function renderCompletion() {
    const total   = exercises.length;
    const pct     = Math.round((score / total) * 100);
    const message = pct >= 80 ? 'Excelente trabalho.' : pct >= 50 ? 'Bom progresso.' : 'Continue praticando.';

    const el = document.createElement('div');
    el.className = 'card card-elevated';
    el.innerHTML = `
      <h3 style="font-family:var(--font-display);margin-bottom:var(--space-4)">Exercícios concluídos</h3>
      <p style="font-size:var(--text-3xl);font-family:var(--font-display);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2)">
        ${score}/${total}
      </p>
      <p style="color:var(--color-ink-mid);margin-bottom:var(--space-6)">${message}</p>
      <button type="button" class="btn btn-secondary" id="restart-exercises">Repetir exercícios</button>
    `;

    el.querySelector('#restart-exercises').addEventListener('click', () => {
      currentIndex = 0;
      score = 0;
      renderCurrent();
    });

    container.appendChild(el);

    onComplete?.({ score, total, pct });
  }

  return {
    element: container,
    /** Libera event listeners e referências */
    destroy() {
      if (textViewer) {
        textViewer._tokenClickHandler = null;
      }
    },
  };
}

/* --- Helpers internos --- */

function createProgressBar(current, total) {
  const pct = Math.round((current / total) * 100);
  const el = document.createElement('div');
  el.className = 'exercise-progress';
  el.innerHTML = `
    <span>Exercício ${current + 1} de ${total}</span>
    <div class="progress-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" style="width:${pct}%"></div>
    </div>
  `;
  return el;
}

function createInstruction(html) {
  const el = document.createElement('div');
  el.className = 'exercise-instruction';
  el.innerHTML = html;
  return el;
}

function createFeedbackArea() {
  const el = document.createElement('div');
  el.className = 'exercise-feedback';
  el.innerHTML = `
    <p class="feedback-title"></p>
    <p class="feedback-explanation"></p>
  `;
  return el;
}

function createHintButton(exercise, textViewer) {
  if (!exercise.hint_highlight?.length) return document.createDocumentFragment();

  let used = false;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'hint-btn';
  btn.setAttribute('aria-label', 'Pedir dica');
  btn.textContent = 'Dica';

  btn.addEventListener('click', () => {
    if (used) {
      clearHighlights(textViewer);
      btn.textContent = 'Dica';
      used = false;
    } else {
      highlightWords(textViewer, exercise.hint_highlight);
      btn.textContent = 'Ocultar dica';
      used = true;
    }
  });

  return btn;
}
