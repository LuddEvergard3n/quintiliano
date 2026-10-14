import { clearHighlights, clearSelection, highlightWords } from './text-viewer.js';

/** Motor determinístico para escolha, classificação e seleção textual. */
export function createExerciseEngine({ exercises, textViewer, onAnswer, onComplete, activityPrefix = 'activity' }) {
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  const container = document.createElement('div');
  container.className = 'exercise-container';
  renderCurrent();

  function renderCurrent() {
    container.replaceChildren();
    clearHighlights(textViewer);
    clearSelection(textViewer);
    textViewer._tokenClickHandler = textViewer._defaultTokenClickHandler;
    if (currentIndex >= exercises.length) return renderCompletion();
    const exercise = exercises[currentIndex];
    container.appendChild(createProgressBar(currentIndex, exercises.length));
    const mode = resolveResponseMode(exercise);
    if (mode === 'choice') container.appendChild(renderChoice(exercise));
    else if (mode === 'classification') container.appendChild(renderClassification(exercise));
    else if (mode === 'self-assessment') container.appendChild(renderSelfAssessment(exercise));
    else container.appendChild(renderSelection(exercise));
  }

  function renderChoice(exercise) {
    answered = false;
    const wrapper = document.createElement('div');
    wrapper.append(createInstruction(exercise.instruction), createHintButton(exercise, textViewer));
    const list = document.createElement('ul'); list.className = 'options-list';
    const letters = ['A', 'B', 'C', 'D', 'E'];
    exercise.options.forEach((option, index) => {
      const item = document.createElement('li'); item.className = 'option-item';
      const button = document.createElement('button'); button.type = 'button'; button.className = 'option-btn';
      const letter = document.createElement('span'); letter.className = 'option-letter'; letter.setAttribute('aria-hidden', 'true'); letter.textContent = letters[index] ?? String(index + 1);
      const text = document.createElement('span'); text.textContent = option;
      button.append(letter, text);
      button.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = index === exercise.correct;
        if (correct) score++;
        list.querySelectorAll('button').forEach((candidate, candidateIndex) => {
          candidate.disabled = true;
          candidate.closest('li').classList.toggle('correct', candidateIndex === exercise.correct);
          candidate.closest('li').classList.toggle('incorrect', candidateIndex === index && !correct);
        });
        finish(wrapper, exercise, correct);
      });
      item.appendChild(button); list.appendChild(item);
    });
    wrapper.append(list, createFeedbackArea());
    return wrapper;
  }

  function renderClassification(exercise) {
    answered = false;
    const wrapper = document.createElement('div');
    wrapper.appendChild(createInstruction(exercise.instruction));
    const rows = document.createElement('div');
    const selected = new Map();
    exercise.items.forEach((item, index) => {
      const row = document.createElement('div'); row.className = 'exercise-classification-row';
      const label = document.createElement('span'); label.textContent = `“${item.text}”`;
      const controls = document.createElement('div');
      ['fato', 'opiniao'].forEach(value => {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'btn btn-secondary'; button.textContent = value === 'fato' ? 'Fato' : 'Opinião';
        button.addEventListener('click', () => {
          if (answered) return;
          selected.set(index, value);
          controls.querySelectorAll('button').forEach(candidate => candidate.classList.toggle('btn-accent', candidate === button));
          if (selected.size === exercise.items.length) {
            answered = true;
            const correct = exercise.items.every((candidate, candidateIndex) => selected.get(candidateIndex) === candidate.answer);
            if (correct) score++;
            finish(wrapper, exercise, correct);
          }
        });
        controls.appendChild(button);
      });
      row.append(label, controls); rows.appendChild(row);
    });
    wrapper.append(rows, createFeedbackArea());
    return wrapper;
  }

  function renderSelection(exercise) {
    answered = false;
    const wrapper = document.createElement('div');
    wrapper.append(createInstruction(exercise.instruction), createHintButton(exercise, textViewer));
    const selected = new Set();
    textViewer._tokenClickHandler = (_value, index, token) => {
      if (answered) return;
      token.classList.toggle('selected');
      token.classList.contains('selected') ? selected.add(String(index)) : selected.delete(String(index));
    };
    const verify = document.createElement('button'); verify.type = 'button'; verify.className = 'btn btn-primary'; verify.textContent = 'Verificar seleção';
    verify.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      const expected = selectionTargets(exercise, textViewer);
      const correct = expected.size > 0 && expected.size === selected.size && [...expected].every(index => selected.has(index));
      if (correct) score++;
      const hints = exercise.hint_highlight?.length ? exercise.hint_highlight : (exercise.targets ?? [exercise.target]).filter(Boolean);
      if (hints.length) highlightWords(textViewer, hints, false);
      finish(wrapper, exercise, correct);
    });
    wrapper.append(verify, createFeedbackArea());
    return wrapper;
  }

  function renderSelfAssessment(exercise) {
    const wrapper = document.createElement('div');
    wrapper.appendChild(createInstruction(exercise.instruction));
    const reminder = document.createElement('p'); reminder.className = 'exercise-feedback visible'; reminder.textContent = 'A escrita fica somente nesta tela. Revise-a pelos critérios indicados e registre a realização quando terminar.';
    const writing = document.createElement('textarea'); writing.rows = 6; writing.className = 'exercise-writing'; writing.setAttribute('aria-label', 'Resposta de autoavaliação');
    const complete = document.createElement('button'); complete.type = 'button'; complete.className = 'btn btn-primary'; complete.textContent = 'Registrar autoavaliação realizada';
    complete.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      onAnswer?.({ exercise, index: currentIndex, correct: null, score, total: exercises.length, activityId: `${activityPrefix}:${exercise.id ?? currentIndex}`, selfAssessment: true });
      const next = document.createElement('button'); next.type = 'button'; next.className = 'btn btn-secondary'; next.textContent = currentIndex === exercises.length - 1 ? 'Ver resultado' : 'Próximo exercício';
      next.addEventListener('click', () => { currentIndex++; renderCurrent(); });
      complete.disabled = true; wrapper.appendChild(next);
    });
    wrapper.append(reminder, writing, complete);
    return wrapper;
  }

  function finish(wrapper, exercise, correct) {
    const feedback = wrapper.querySelector('.exercise-feedback');
    feedback.classList.add('visible', correct ? 'success' : 'error');
    feedback.querySelector('.feedback-title').textContent = correct ? 'Correto' : 'Revise a resposta';
    feedback.querySelector('.feedback-explanation').textContent = exercise.explanation ?? '';
    onAnswer?.({ exercise, index: currentIndex, correct, score, total: exercises.length, activityId: `${activityPrefix}:${exercise.id ?? currentIndex}` });
    const next = document.createElement('button'); next.type = 'button'; next.className = 'btn btn-primary'; next.textContent = currentIndex === exercises.length - 1 ? 'Ver resultado' : 'Próximo exercício';
    next.addEventListener('click', () => { currentIndex++; renderCurrent(); });
    wrapper.appendChild(next);
  }

  function renderCompletion() {
    const total = exercises.length; const pct = total ? Math.round((score / total) * 100) : 0;
    const card = document.createElement('div'); card.className = 'card card-elevated';
    const title = document.createElement('h3'); title.textContent = 'Exercícios concluídos';
    const result = document.createElement('p'); result.textContent = `${score}/${total}`;
    const restart = document.createElement('button'); restart.type = 'button'; restart.className = 'btn btn-secondary'; restart.textContent = 'Repetir exercícios';
    restart.addEventListener('click', () => { currentIndex = 0; score = 0; renderCurrent(); });
    card.append(title, result, restart); container.appendChild(card);
    onComplete?.({ score, total, pct });
  }

  return { element: container, destroy() { clearSelection(textViewer); } };
}

export function resolveResponseMode(exercise) {
  if (exercise.type === 'autoavaliacao') return 'self-assessment';
  if (Array.isArray(exercise.options)) return 'choice';
  if (Array.isArray(exercise.items)) return 'classification';
  return 'selection';
}

function selectionTargets(exercise, viewer) {
  const result = new Set();
  const tokens = [...viewer.querySelectorAll('.token[data-type="word"], .token[data-type="number"]')];
  for (const target of (exercise.targets ?? [exercise.target]).filter(Boolean)) {
    const expected = String(target).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.map(normalize) ?? [];
    for (let start = 0; expected.length && start <= tokens.length - expected.length; start += 1) {
      if (!expected.every((word, offset) => normalize(tokens[start + offset].dataset.value) === word)) continue;
      expected.forEach((_, offset) => result.add(tokens[start + offset].dataset.index));
      break;
    }
  }
  return result;
}

function normalize(value) { return String(value).toLocaleLowerCase('pt-BR').normalize('NFC'); }

function createProgressBar(current, total) {
  const wrapper = document.createElement('div'); wrapper.className = 'exercise-progress';
  const label = document.createElement('span'); label.textContent = `Exercício ${current + 1} de ${total}`;
  const bar = document.createElement('div'); bar.className = 'progress-bar'; bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuenow', String(Math.round((current / total) * 100))); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', '100');
  const fill = document.createElement('div'); fill.className = 'progress-fill'; fill.style.width = `${Math.round((current / total) * 100)}%`; bar.appendChild(fill); wrapper.append(label, bar); return wrapper;
}

function createInstruction(text) { const element = document.createElement('p'); element.className = 'exercise-instruction'; element.textContent = text; return element; }
function createFeedbackArea() { const element = document.createElement('div'); element.className = 'exercise-feedback'; const title = document.createElement('p'); title.className = 'feedback-title'; const explanation = document.createElement('p'); explanation.className = 'feedback-explanation'; element.append(title, explanation); return element; }
function createHintButton(exercise, textViewer) { if (!exercise.hint_highlight?.length) return document.createDocumentFragment(); const button = document.createElement('button'); button.type = 'button'; button.className = 'hint-btn'; button.textContent = 'Dica'; let used = false; button.addEventListener('click', () => { used = !used; used ? highlightWords(textViewer, exercise.hint_highlight) : clearHighlights(textViewer); button.textContent = used ? 'Ocultar dica' : 'Dica'; }); return button; }
