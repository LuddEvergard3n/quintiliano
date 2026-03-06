/**
 * interpretation.js — Módulo de Interpretação de Texto
 *
 * Foca em habilidades de leitura profunda:
 * ideia principal, argumento, fato vs. opinião, inferência, tom, ironia.
 */

import { createTextViewer } from '../../components/text-viewer.js';
import { createExerciseEngine } from '../../components/exercise-engine.js';

/**
 * @param {object} data — Conteúdo de texts.json
 * @returns {HTMLElement}
 */
export function renderInterpretacao(data) {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Interpretação de Texto</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Ler palavras é diferente de interpretar ideias. Aqui você treina
        a diferença entre o que o texto diz e o que ele significa —
        identificando argumentos, inferências, tom e intenção do autor.
      </p>
    </div>

    <div class="panel panel-info" style="max-width:var(--content-width);margin-bottom:var(--space-8)">
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-mid)">
        <strong>Como funciona:</strong> Leia o trecho com atenção.
        Responda as perguntas com base no que o texto comunica —
        não no que você sabe sobre o assunto fora dele.
        Use a dica apenas se necessário.
      </p>
    </div>

    <div id="interp-content"></div>
  `;

  const content = page.querySelector('#interp-content');

  // Filtra textos que têm exercícios de interpretação
  const interpTypes = ['interpretacao', 'tom', 'fato_opiniao', 'inferencia'];
  const texts = data.texts.filter(t =>
    t.exercises.some(e => interpTypes.includes(e.type))
  );

  renderTextList(content, texts);

  return page;
}

function renderTextList(container, texts) {
  texts.forEach(textData => {
    const section = document.createElement('section');
    section.style.cssText = 'margin-bottom:var(--space-12);max-width:var(--content-width)';

    // Cabeçalho do texto
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom:var(--space-4)';
    header.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:var(--space-1)">${textData.author} · ${textData.year}</p>
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:0">${textData.title}</h2>
    `;
    section.appendChild(header);

    // Texto
    const viewer = createTextViewer({
      text: textData.content,
      interactive: false,
    });
    viewer.style.marginBottom = 'var(--space-6)';
    section.appendChild(viewer);

    const divider = document.createElement('div');
    divider.className = 'divider';
    section.appendChild(divider);

    // Exercícios de interpretação
    const interpExercises = textData.exercises.filter(e =>
      ['interpretacao', 'tom', 'fato_opiniao', 'inferencia'].includes(e.type)
    );

    if (interpExercises.length > 0) {
      const engine = createExerciseEngine({
        exercises: interpExercises,
        textViewer: viewer,
      });
      section.appendChild(engine.element);
    }

    container.appendChild(section);

    // Separador entre textos
    const spacer = document.createElement('div');
    spacer.style.cssText = 'height:3px;background:linear-gradient(to right, var(--color-accent), transparent);margin-bottom:var(--space-12)';
    container.appendChild(spacer);
  });
}
