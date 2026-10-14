import { getState, resetProgress } from '../../js/state.js';

export function renderProgresso() {
  const page = document.createElement('div');
  const progress = Object.values(getState('progress'));
  const completed = progress.filter(item => item.completed).length;
  const correct = progress.filter(item => item.correct).length;
  const heading = document.createElement('div');
  heading.innerHTML = '<a href="#/" class="btn btn-ghost">← Voltar</a><h1 class="section-title">Progresso</h1>';
  const panel = document.createElement('div'); panel.className = 'panel';
  const summary = document.createElement('p'); summary.textContent = completed ? `${completed} atividades concluídas; ${correct} respondidas corretamente na última tentativa.` : 'Ainda não há atividades concluídas. Escolha uma leitura para começar.';
  panel.appendChild(summary);
  if (completed) {
    const reset = document.createElement('button'); reset.type = 'button'; reset.className = 'btn btn-secondary'; reset.textContent = 'Zerar progresso';
    reset.addEventListener('click', () => { resetProgress(); window.location.hash = '#/progresso'; });
    panel.appendChild(reset);
  }
  page.append(heading, panel);
  return page;
}
