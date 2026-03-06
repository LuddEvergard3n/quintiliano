/**
 * poetry.js — Módulo de Poesia
 *
 * Foco pedagógico: estrutura do poema como objeto distinto da prosa.
 * O módulo ensina:
 *   1. Versificação — verso, estrofe, tipos de estrofe
 *   2. Figuras sonoras — aliteração, assonância, onomatopeia
 *   3. Rima — esquema rimático (ABAB, ABBA, etc.), tipos de rima
 *   4. Ritmo e metro — contagem de sílabas poéticas, padrões métricos
 *   5. Exercícios por poema — do banco de textos (genre === 'poesia')
 *
 * Usa os poemas existentes em texts.json.
 * Não depende de API externa — funciona offline.
 */

/* ================================================================
   ENTRADA PRINCIPAL
   ================================================================ */

/**
 * @param {object} textsData — Conteúdo de texts.json
 * @returns {HTMLElement}
 */
export function renderPoesia(textsData) {
  const poemas = textsData.texts.filter(t => t.genre === 'poesia');

  const page = document.createElement('div');
  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Poesia</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Poesia tem estrutura própria: verso, estrofe, rima, ritmo, metro.
        Cada poema aqui é uma aula de como o som e o sentido se constroem juntos.
      </p>
    </div>

    <!-- Tabs de seção -->
    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8)" role="tablist">
      ${['Poemas', 'Versificação', 'Rima', 'Figuras Sonoras', 'Metro'].map((label, i) => `
        <button
          type="button"
          role="tab"
          class="poetry-tab"
          data-tab="${i}"
          aria-selected="${i === 0}"
          style="
            font-family:var(--font-ui);font-size:var(--text-sm);
            padding:var(--space-6) var(--space-6);border:none;background:none;cursor:pointer;
            color:${i === 0 ? 'var(--color-accent)' : 'var(--color-ink-ghost)'};
            border-bottom:2px solid ${i === 0 ? 'var(--color-accent)' : 'transparent'};
            margin-bottom:-2px;transition:all var(--transition-fast);
          "
        >${label}</button>
      `).join('')}
    </div>

    <!-- Painéis de conteúdo -->
    <div id="tab-poemas"    class="tab-panel"></div>
    <div id="tab-versif"    class="tab-panel" style="display:none"></div>
    <div id="tab-rima"      class="tab-panel" style="display:none"></div>
    <div id="tab-figuras"   class="tab-panel" style="display:none"></div>
    <div id="tab-metro"     class="tab-panel" style="display:none"></div>
  `;

  // Renderiza conteúdo das tabs
  renderTabPoemas(page.querySelector('#tab-poemas'), poemas);
  renderTabVersificacao(page.querySelector('#tab-versif'));
  renderTabRima(page.querySelector('#tab-rima'));
  renderTabFiguras(page.querySelector('#tab-figuras'));
  renderTabMetro(page.querySelector('#tab-metro'));

  // Lógica de troca de tabs
  const tabIds = ['tab-poemas', 'tab-versif', 'tab-rima', 'tab-figuras', 'tab-metro'];
  const tabs   = page.querySelectorAll('.poetry-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.tab, 10);

      tabs.forEach((t, i) => {
        const active = i === idx;
        t.style.color        = active ? 'var(--color-accent)' : 'var(--color-ink-ghost)';
        t.style.borderBottom = active ? '2px solid var(--color-accent)' : '2px solid transparent';
        t.setAttribute('aria-selected', active);
        page.querySelector(`#${tabIds[i]}`).style.display = active ? '' : 'none';
      });
    });
  });

  return page;
}

/* ================================================================
   TAB 1 — POEMAS (lista + visor + exercícios)
   ================================================================ */

function renderTabPoemas(container, poemas) {
  // Filtros
  const autores  = [...new Set(poemas.map(p => p.author))].sort();
  const niveis   = ['basico', 'intermediario', 'avancado'];

  container.innerHTML = `
    <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-bottom:var(--space-6)">
      <div>
        <label style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-1)">Autor</label>
        <select id="filter-autor" style="font-family:var(--font-ui);font-size:var(--text-sm);padding:var(--space-2) var(--space-3);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink)">
          <option value="">Todos</option>
          ${autores.map(a => `<option value="${a}">${a}</option>`).join('')}
        </select>
      </div>
      <div>
        <label style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-1)">Nível</label>
        <select id="filter-nivel" style="font-family:var(--font-ui);font-size:var(--text-sm);padding:var(--space-2) var(--space-3);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink)">
          <option value="">Todos</option>
          <option value="basico">Básico</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
        </select>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:var(--space-6);align-items:start">
      <div id="poem-list"></div>
      <div id="poem-viewer"></div>
    </div>
  `;

  const listEl   = container.querySelector('#poem-list');
  const viewerEl = container.querySelector('#poem-viewer');
  const selAutor = container.querySelector('#filter-autor');
  const selNivel = container.querySelector('#filter-nivel');

  let selectedId = poemas[0]?.id ?? null;

  const buildList = () => {
    const autor = selAutor.value;
    const nivel = selNivel.value;
    const filtered = poemas.filter(p =>
      (!autor || p.author === autor) &&
      (!nivel || p.level === nivel)
    );

    listEl.innerHTML = '';
    if (!filtered.length) {
      listEl.innerHTML = `<p style="font-family:var(--font-body);color:var(--color-ink-ghost)">Nenhum poema encontrado com esses filtros.</p>`;
      return;
    }

    filtered.forEach(p => {
      const item = document.createElement('button');
      item.type = 'button';
      item.dataset.id = p.id;
      const isActive = p.id === selectedId;
      item.style.cssText = `
        display:block;width:100%;text-align:left;
        padding:var(--space-3) var(--space-4);margin-bottom:var(--space-2);
        border:1.5px solid ${isActive ? 'var(--color-accent)' : 'var(--color-paper-border)'};
        border-radius:var(--radius);background:${isActive ? 'rgba(139,26,26,0.05)' : 'var(--color-paper)'};
        cursor:pointer;transition:all var(--transition-fast);
      `;
      item.innerHTML = `
        <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);margin-bottom:2px">${p.title}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${p.author} · ${nivelLabel(p.level)}</p>
      `;
      item.addEventListener('click', () => {
        selectedId = p.id;
        buildList();
        renderPoemViewer(viewerEl, p);
      });
      listEl.appendChild(item);
    });

    // Se o poema selecionado sumiu dos resultados, seleciona o primeiro
    if (!filtered.find(p => p.id === selectedId)) {
      selectedId = filtered[0].id;
      buildList();
    }
  };

  selAutor.addEventListener('change', buildList);
  selNivel.addEventListener('change', buildList);

  buildList();
  if (poemas[0]) renderPoemViewer(viewerEl, poemas[0]);
}

/**
 * Renderiza o visor de um poema individual com análise e exercícios.
 */
function renderPoemViewer(container, poema) {
  container.innerHTML = '';
  container.classList.add('fade-in');

  // Cabeçalho do poema
  const header = document.createElement('div');
  header.style.cssText = 'border-bottom:2px solid var(--color-paper-border);padding-bottom:var(--space-4);margin-bottom:var(--space-6)';
  header.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-1)">${poema.author} · ${poema.year}</p>
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-1)">${poema.title}</h2>
    <span class="tag">${nivelLabel(poema.level)}</span>
  `;
  container.appendChild(header);

  // Texto do poema
  const textBox = document.createElement('div');
  textBox.className = 'poem-text';
  textBox.setAttribute('aria-label', `Texto do poema: ${poema.title}`);
  // Renderiza preservando quebras de linha
  const lines = poema.content.split('\n');
  lines.forEach((line, i) => {
    const el = document.createElement('p');
    el.style.cssText = `
      font-family:var(--font-body);font-size:var(--text-lg);
      line-height:1.9;color:var(--color-ink-mid);
      margin:0;${line.trim() === '' ? 'margin-top:var(--space-4)' : ''}
    `;
    el.textContent = line || '\u00A0'; // linha vazia = separador de estrofe
    textBox.appendChild(el);
  });
  container.appendChild(textBox);

  // Análise estrutural automática
  const analise = analisarPoema(poema.content);
  const analiseEl = document.createElement('div');
  analiseEl.className = 'panel';
  analiseEl.style.marginTop = 'var(--space-6)';
  analiseEl.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Análise estrutural</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:var(--space-3)">
      ${metricaMini('Versos', analise.totalVersos)}
      ${metricaMini('Estrofes', analise.totalEstrofes)}
      ${metricaMini('Tipo', analise.tipoEstrofe)}
      ${metricaMini('Esquema', analise.esquemaRima || '—')}
    </div>
    ${analise.figuras.length ? `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);text-transform:uppercase;letter-spacing:0.06em;margin-top:var(--space-4);margin-bottom:var(--space-2)">Figuras detectadas</p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
        ${analise.figuras.map(f => `<span class="tag">${f}</span>`).join('')}
      </div>
    ` : ''}
  `;
  container.appendChild(analiseEl);

  // Exercícios
  if (poema.exercises?.length) {
    const exSection = document.createElement('div');
    exSection.style.marginTop = 'var(--space-6)';
    exSection.innerHTML = `
      <h3 style="font-family:var(--font-display);font-size:var(--text-lg);margin-bottom:var(--space-4)">Exercícios</h3>
    `;
    poema.exercises.forEach((ex, i) => {
      exSection.appendChild(buildExercicio(ex, i, poema));
    });
    container.appendChild(exSection);
  }
}

/* ================================================================
   TAB 2 — VERSIFICAÇÃO (conteúdo teórico interativo)
   ================================================================ */

function renderTabVersificacao(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Versificação</h2>

      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-8)">
        Verso é cada linha de um poema. Estrofe é o grupo de versos separados por espaço em branco.
        A relação entre versos e estrofes define a forma do poema.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-4);margin-bottom:var(--space-8)">
        ${[
          ['Monóstico', '1 verso', 'Raro. Máxima concentração.'],
          ['Dístico', '2 versos', 'Forma do haiku clássico japonês.'],
          ['Terceto', '3 versos', 'Terça-rima de Dante.'],
          ['Quadra', '4 versos', 'Forma mais comum na lírica popular.'],
          ['Quintilha', '5 versos', 'Cinco versos de medida variável.'],
          ['Sextilha', '6 versos', 'Comum na literatura de cordel.'],
          ['Oitava', '8 versos', 'Estrofe épica — usada por Camões.'],
          ['Soneto', '14 versos', 'Dois quartetos + dois tercetos.'],
        ].map(([nome, def, ex]) => `
          <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
            <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;color:var(--color-ink);margin-bottom:var(--space-1)">${nome}</p>
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);margin-bottom:var(--space-2)">${def}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-ghost)">${ex}</p>
          </div>
        `).join('')}
      </div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Identifique a estrofe</h3>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);margin-bottom:var(--space-4)">
        Leia o trecho e identifique o tipo de estrofe:
      </p>

      <div id="versif-quiz"></div>
    </div>
  `;

  const quiz = container.querySelector('#versif-quiz');
  buildVersifQuiz(quiz);
}

function buildVersifQuiz(container) {
  const questoes = [
    {
      poema: `Quando nasci, um anjo torto\ndesses que vivem na sombra\ndisse: Vai, Carlos! ser gauche na vida.`,
      resposta: 'Terceto',
      opcoes: ['Dístico', 'Terceto', 'Quadra', 'Quintilha'],
      explicacao: '3 versos = terceto. Drummond abre seu poema mais famoso com um terceto de verso livre.',
    },
    {
      poema: `As armas e os barões assinalados,\nQue da ocidental praia lusitana,\nPor mares nunca de antes navegados,\nPassaram ainda além da Taprobana,`,
      resposta: 'Quadra',
      opcoes: ['Terceto', 'Quadra', 'Quintilha', 'Oitava'],
      explicacao: '4 versos = quadra. Os Lusíadas usa oitavas (estrofes de 8 versos) — esta é a primeira metade da primeira estrofe.',
    },
    {
      poema: `Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\nÀ parte isso, tenho em mim todos os sonhos do mundo.`,
      resposta: 'Quadra',
      opcoes: ['Terceto', 'Quadra', 'Sextilha', 'Soneto'],
      explicacao: '4 versos = quadra. Pessoa usa verso livre — sem metro fixo — mas mantém a estrutura de 4 versos.',
    },
    {
      poema: `Amor é fogo que arde sem se ver,\nÉ ferida que dói e não se sente,\nÉ um contentamento descontente,\nÉ dor que desatina sem doer.`,
      resposta: 'Quadra',
      opcoes: ['Terceto', 'Quadra', 'Quintilha', 'Sextilha'],
      explicacao: '4 versos = quadra. Este é o famoso soneto de Camões sobre amor — a quadra é a primeira estrofe de duas que, com dois tercetos, formam o soneto completo.',
    },
    {
      poema: `E José?\nJosé?\nA festa acabou,\na luz apagou,\no povo sumiu,\na noite esfriou,\ne o José?`,
      resposta: 'Sextilha + fragmento',
      opcoes: ['Dístico', 'Terceto', 'Sextilha + fragmento', 'Oitava'],
      explicacao: 'Drummond usa estrutura irregular em "José" — a fragmentação visual (versos curtíssimos e isolados) imita o abandono que o poema descreve. Contar versos aqui é menos importante do que ver como a forma serve o sentido.',
    },
    {
      poema: `Minha terra tem palmeiras,\nOnde canta o sabiá;\nAs aves que aqui gorjeiam,\nNão gorjeiam como lá.`,
      resposta: 'Quadra',
      opcoes: ['Dístico', 'Terceto', 'Quadra', 'Quintilha'],
      explicacao: '4 versos = quadra. Abertura de "Canção do Exílio" de Gonçalves Dias. Quadras de redondilha maior (7 sílabas) com rima alternada (ABCB).',
    },
    {
      poema: `Sou um mulato nato\nno sentido lato\nfuleiro, satírico\ne muito levado\nda breca.`,
      resposta: 'Quintilha',
      opcoes: ['Quadra', 'Quintilha', 'Sextilha', 'Terceto'],
      explicacao: '5 versos = quintilha. Trecho de Chico Buarque. Rima entre "nato/lato" e "satírico/levado" sem esquema rígido — quintilha de verso livre com toques de rima.',
    },
  ];

  questoes.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = 'var(--space-4)';

    const poemaEl = document.createElement('pre');
    poemaEl.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);line-height:1.8;white-space:pre-wrap;margin-bottom:var(--space-4);padding:var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius)';
    poemaEl.textContent = q.poema;
    card.appendChild(poemaEl);

    card.innerHTML += `<p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-3)">Quantos versos tem esta estrofe?</p>`;

    const opts = document.createElement('div');
    opts.style.cssText = 'display:flex;gap:var(--space-2);flex-wrap:wrap';

    q.opcoes.forEach(op => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-secondary';
      btn.style.fontSize = 'var(--text-sm)';
      btn.textContent = op;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        const correct = op === q.resposta;
        btn.style.background    = correct ? 'var(--color-green)' : 'var(--color-accent)';
        btn.style.color         = '#fff';
        btn.style.borderColor   = correct ? 'var(--color-green)' : 'var(--color-accent)';

        if (!correct) {
          opts.querySelectorAll('button').forEach(b => {
            if (b.textContent === q.resposta) {
              b.style.background  = 'var(--color-green)';
              b.style.color       = '#fff';
              b.style.borderColor = 'var(--color-green)';
            }
          });
        }

        const fb = document.createElement('div');
        fb.className = 'panel';
        fb.style.marginTop = 'var(--space-3)';
        fb.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${q.explicacao}</p>`;
        card.appendChild(fb);
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);
    container.appendChild(card);
  });
}

/* ================================================================
   TAB 3 — RIMA
   ================================================================ */

function renderTabRima(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Rima</h2>

      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-6)">
        Rima é a repetição de sons iguais ou semelhantes no final de dois ou mais versos.
        O esquema rimático é indicado com letras: cada letra representa um som de rima.
        Versos com a mesma letra rimam entre si.
      </p>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Tipos de rima</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-8)">
        ${[
          ['Rima perfeita', 'Identidade total de sons a partir da vogal tônica.', 'amada / chegada'],
          ['Rima imperfeita (toante)', 'Apenas as vogais coincidem.', 'pedra / terra'],
          ['Rima interpolada', 'Esquema ABBA — rima envolve outra.', 'Soneto de Camões'],
          ['Verso branco', 'Sem rima, mas com metro fixo.', 'Muito comum no Classicismo'],
          ['Verso livre', 'Sem rima e sem metro fixo.', 'Modernismo — Drummond, Pessoa'],
          ['Rima rica', 'Palavras de classes gramaticais diferentes.', 'amor / dor'],
        ].map(([nome, def, ex]) => `
          <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
            <p style="font-family:var(--font-display);font-size:var(--text-sm);font-weight:700;color:var(--color-ink);margin-bottom:var(--space-1)">${nome}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-2)">${def}</p>
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);font-style:italic">${ex}</p>
          </div>
        `).join('')}
      </div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Esquemas rimáticos comuns</h3>
      <div id="esquemas-grid" style="display:flex;flex-direction:column;gap:var(--space-4);margin-bottom:var(--space-8)"></div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Identifique o esquema</h3>
      <div id="rima-quiz"></div>
    </div>
  `;

  // Esquemas visuais
  const esquemas = [
    {
      nome: 'ABAB — Rima cruzada',
      versos: [
        { letra: 'A', texto: 'As armas e os barões assinalados,' },
        { letra: 'B', texto: 'Que da ocidental praia lusitana,' },
        { letra: 'A', texto: 'Por mares nunca de antes navegados,' },
        { letra: 'B', texto: 'Passaram ainda além da Taprobana,' },
      ],
      desc: 'Versos alternados rimam entre si. O esquema mais comum na poesia portuguesa clássica.',
    },
    {
      nome: 'ABBA — Rima interpolada (ou abraçada)',
      versos: [
        { letra: 'A', texto: 'Transforma-se o amador na coisa amada,' },
        { letra: 'B', texto: 'Por virtude do muito imaginar;' },
        { letra: 'B', texto: 'Não tenho, logo, mais que desejar,' },
        { letra: 'A', texto: 'Pois em mim tenho a parte desejada.' },
      ],
      desc: 'O segundo e terceiro versos rimam entre si; o primeiro e o quarto se abraçam por fora.',
    },
    {
      nome: 'AAAA — Rima contínua (ou monorrima)',
      versos: [
        { letra: 'A', texto: 'Minha terra tem palmeiras,' },
        { letra: 'A', texto: 'Onde canta o sabiá;' },
        { letra: 'A', texto: 'As aves que aqui gorjeiam' },
        { letra: 'A', texto: 'Não gorjeiam como lá.' },
      ],
      desc: 'Todos os versos rimam. Cria ritmo muito marcado — comum em poesia popular e canções.',
    },
  ];

  const grid = container.querySelector('#esquemas-grid');
  esquemas.forEach(e => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-3)">${e.nome}</p>
      <div style="background:var(--color-paper-dark);border-radius:var(--radius);padding:var(--space-6);margin-bottom:var(--space-3)">
        ${e.versos.map(v => `
          <div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-2)">
            <span style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-gold);min-width:16px">${v.letra}</span>
            <span style="font-family:var(--font-body);font-style:italic;color:var(--color-ink-mid)">${v.texto}</span>
          </div>
        `).join('')}
      </div>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-light)">${e.desc}</p>
    `;
    grid.appendChild(card);
  });

  // Quiz de rima
  buildRimaQuiz(container.querySelector('#rima-quiz'));
}

function buildRimaQuiz(container) {
  const questoes = [
    {
      versos: ['A vida inteira que podia ter sido e que não foi.', 'Tosse, tosse, tosse.', 'Mandaram-me para Teresópolis.'],
      resposta: 'Sem rima (verso livre)',
      opcoes: ['ABAB', 'ABBA', 'AAA', 'Sem rima (verso livre)'],
      explicacao: 'Bandeira usa verso livre em "Pneumotórax" — sem esquema rimático fixo. A força do poema está no ritmo e no contraste semântico, não na rima.',
    },
    {
      versos: ['Quando nasci, um anjo torto', 'desses que vivem na sombra', 'disse: Vai, Carlos! ser gauche na vida.'],
      resposta: 'Sem rima (verso livre)',
      opcoes: ['ABA', 'AAA', 'Sem rima (verso livre)', 'ABB'],
      explicacao: 'Drummond no Modernismo usa verso livre. "Torto", "sombra" e "vida" não rimam — a força está no conteúdo e no ritmo natural da fala.',
    },
    {
      versos: ['Amor é fogo que arde sem se ver,', 'É ferida que dói e não se sente,', 'É um contentamento descontente,', 'É dor que desatina sem doer.'],
      resposta: 'ABBA',
      opcoes: ['ABAB', 'ABBA', 'AABB', 'Sem rima'],
      explicacao: '"Ver" rima com "doer" (A), "sente" rima com "descontente" (B). O esquema é ABBA — rima interpolada ou abraçada. Padrão clássico do soneto petrarquiano, muito usado por Camões.',
    },
    {
      versos: ['Minha terra tem palmeiras,', 'Onde canta o sabiá;', 'As aves que aqui gorjeiam,', 'Não gorjeiam como lá.'],
      resposta: 'ABCB',
      opcoes: ['ABAB', 'ABBA', 'ABCB', 'AABB'],
      explicacao: 'Apenas os versos pares rimam: "sabiá" e "lá" (B). Versos ímpares ficam soltos (A e C). Esquema ABCB — muito comum na poesia popular e no Romantismo brasileiro.',
    },
    {
      versos: ['Vai, gorjeio, vai cantiga,', 'Vai, lamento, vai suspiro,', 'Vai, paixão, que me persiga,', 'Vai, desvario, vai, delírio.'],
      resposta: 'ABAB',
      opcoes: ['ABAB', 'ABBA', 'AABB', 'Sem rima'],
      explicacao: '"Cantiga/persiga" (A) e "suspiro/delírio" (B) formam rima cruzada ABAB. Padrão alterno — verso 1 rima com 3, verso 2 rima com 4.',
    },
    {
      versos: ['No meio do caminho tinha uma pedra', 'tinha uma pedra no meio do caminho', 'tinha uma pedra', 'no meio do caminho tinha uma pedra.'],
      resposta: 'Sem rima (verso livre)',
      opcoes: ['ABAB', 'ABBA', 'AAAA', 'Sem rima (verso livre)'],
      explicacao: 'Drummond não usa rima em "No meio do caminho" — o efeito de obsessão vem da repetição sintática (anáfora), não da rima. Verso livre com repetição temática.',
    },
  ];

  questoes.forEach(q => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = 'var(--space-4)';

    const pre = document.createElement('pre');
    pre.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);line-height:1.8;white-space:pre-wrap;padding:var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);margin-bottom:var(--space-4)';
    pre.textContent = q.versos.join('\n');
    card.appendChild(pre);

    card.innerHTML += `<p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-3)">Qual é o esquema rimático?</p>`;

    const opts = document.createElement('div');
    opts.style.cssText = 'display:flex;gap:var(--space-2);flex-wrap:wrap';

    q.opcoes.forEach(op => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-secondary';
      btn.style.fontSize = 'var(--text-sm)';
      btn.textContent = op;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        const correct = op === q.resposta;
        btn.style.background  = correct ? 'var(--color-green)' : 'var(--color-accent)';
        btn.style.color       = '#fff';
        btn.style.borderColor = correct ? 'var(--color-green)' : 'var(--color-accent)';
        if (!correct) {
          opts.querySelectorAll('button').forEach(b => {
            if (b.textContent === q.resposta) {
              b.style.background  = 'var(--color-green)';
              b.style.color       = '#fff';
              b.style.borderColor = 'var(--color-green)';
            }
          });
        }
        const fb = document.createElement('div');
        fb.className = 'panel';
        fb.style.marginTop = 'var(--space-3)';
        fb.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${q.explicacao}</p>`;
        card.appendChild(fb);
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);
    container.appendChild(card);
  });
}

/* ================================================================
   TAB 4 — FIGURAS SONORAS
   ================================================================ */

function renderTabFiguras(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Figuras Sonoras</h2>

      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-6)">
        Em poesia, o som carrega significado. Figuras sonoras são recursos que usam
        repetição de sons para criar ritmo, reforçar sentido ou produzir efeitos musicais.
      </p>

      <div style="display:flex;flex-direction:column;gap:var(--space-6);margin-bottom:var(--space-8)" id="figuras-lista"></div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Identifique a figura sonora</h3>
      <div id="figuras-quiz"></div>
    </div>
  `;

  const figuras = [
    {
      nome: 'Aliteração',
      def: 'Repetição da mesma consoante em palavras próximas.',
      exemplo: '"O rato roeu a roupa do rei de Roma"',
      efeito: 'Cria musicalidade e pode reforçar o conteúdo. Sons oclusivos (p, t, k) criam dureza; fricativos (s, f, v) criam suavidade.',
    },
    {
      nome: 'Assonância',
      def: 'Repetição da mesma vogal em palavras próximas.',
      exemplo: '"Sou um mulato nato no sentido lato"',
      efeito: 'Cria melodia e coesão sonora. Diferente da aliteração (consoantes), a assonância trabalha com vogais.',
    },
    {
      nome: 'Onomatopeia',
      def: 'Palavra que imita um som da natureza ou de uma ação.',
      exemplo: '"Tosse, tosse, tosse" (Bandeira)',
      efeito: 'A palavra reproduz o som que descreve. A leitura em voz alta ativa a experiência física.',
    },
    {
      nome: 'Anáfora',
      def: 'Repetição de uma palavra ou expressão no início de versos consecutivos.',
      exemplo: '"Não sou nada. / Nunca serei nada. / Não posso querer ser nada." (Pessoa)',
      efeito: 'Cria ritmo de acumulação. A repetição intensifica a emoção ou o argumento.',
    },
    {
      nome: 'Paronomásia',
      def: 'Aproximação de palavras com sons parecidos mas significados diferentes.',
      exemplo: '"Amor é fogo que arde sem se ver" — amor/ardor se ecoam sonoramente',
      efeito: 'Cria jogos de sentido a partir da semelhança sonora. Muito usada em trocadilhos e poesia barroca.',
    },
    {
      nome: 'Eufonia',
      def: 'Combinação harmoniosa de sons que torna o verso musicalmente agradável.',
      exemplo: '"Iracema, a virgem dos lábios de mel" (Alencar)',
      efeito: 'Som e sentido se reforçam. A suavidade das vogais e nasais em "Iracema" cria a imagem de algo delicado.',
    },
  ];

  const lista = container.querySelector('#figuras-lista');
  figuras.forEach(f => {
    const card = document.createElement('div');
    card.style.cssText = 'border-left:3px solid var(--color-accent);padding-left:var(--space-4)';
    card.innerHTML = `
      <h4 style="font-family:var(--font-display);font-size:var(--text-lg);margin-bottom:var(--space-2)">${f.nome}</h4>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);margin-bottom:var(--space-2)">${f.def}</p>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-light);margin-bottom:var(--space-2)">${f.exemplo}</p>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${f.efeito}</p>
    `;
    lista.appendChild(card);
  });

  buildFigurasQuiz(container.querySelector('#figuras-quiz'));
}

function buildFigurasQuiz(container) {
  const questoes = [
    {
      trecho: 'Tosse, tosse, tosse.\n— Manuel Bandeira',
      figura: 'Onomatopeia',
      opcoes: ['Aliteração', 'Onomatopeia', 'Anáfora', 'Assonância'],
      explicacao: 'A palavra "tosse" reproduz o som do próprio ato. Além disso, a repetição tem valor mimético — imita o ritmo involuntário da tosse.',
    },
    {
      trecho: 'Não sou nada.\nNunca serei nada.\nNão posso querer ser nada.\n— Fernando Pessoa',
      figura: 'Anáfora',
      opcoes: ['Aliteração', 'Assonância', 'Anáfora', 'Paronomásia'],
      explicacao: '"Não" e "Nunca" são retomados no início de cada verso. A anáfora cria ritmo de acumulação — cada verso reforça a negação anterior.',
    },
    {
      trecho: '"...os lábios de mel..." / "...palmeira..."\n— José de Alencar (Iracema)',
      figura: 'Eufonia',
      opcoes: ['Onomatopeia', 'Paronomásia', 'Eufonia', 'Aliteração'],
      explicacao: 'A combinação de vogais abertas e nasais (mel, palmeira) cria fluidez sonora. Alencar escolhe palavras melodiosas para descrever Iracema — som e imagem se reforçam.',
    },
    {
      verso: '"Não sou nada. / Nunca serei nada. / Não posso querer ser nada."',
      resposta: 'Anáfora',
      opcoes: ['Aliteração', 'Anáfora', 'Assonância', 'Eufonia'],
      autor: 'Fernando Pessoa (Álvaro de Campos)',
      explicacao: 'Anáfora: repetição da mesma expressão ("Não" / "Nunca") no início de versos consecutivos. O ritmo de acumulação intensifica o esvaziamento existencial do poema.',
    },
    {
      verso: '"O rato roeu a roupa do rei de Roma."',
      resposta: 'Aliteração',
      opcoes: ['Assonância', 'Anáfora', 'Aliteração', 'Onomatopeia'],
      autor: 'Provérbio / trava-língua',
      explicacao: 'Aliteração: repetição da consoante /r/ em posição inicial. O som oclusivo e vibrante cria efeito sonoro que torna a frase memorável — daí seu uso como trava-língua.',
    },
    {
      verso: '"Tosse, tosse, tosse. / Deus! Para na última tosse?"',
      resposta: 'Onomatopeia',
      opcoes: ['Aliteração', 'Onomatopeia', 'Assonância', 'Paronomásia'],
      autor: 'Manuel Bandeira, Pneumotórax',
      explicacao: 'A palavra "tosse" imita o som da tosse. Onomatopeia: o significante reproduz o som que designa. Bandeira usou o próprio adoecimento (tuberculose) como material poético.',
    },
    {
      verso: '"Sou um mulato nato / no sentido lato."',
      resposta: 'Paronomásia',
      opcoes: ['Aliteração', 'Assonância', 'Paronomásia', 'Eufonia'],
      autor: 'Chico Buarque',
      explicacao: '"Nato" e "lato" — sons quase idênticos, significados distintos. Paronomásia: jogo entre palavras foneticamente próximas. Além do humor, aponta que ser "mulato" é condição ampla, comum, "lata".',
    },
  ];

  questoes.forEach(q => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = 'var(--space-4)';
    const pre = document.createElement('pre');
    pre.style.cssText = 'font-family:var(--font-body);font-style:italic;color:var(--color-ink-mid);line-height:1.8;white-space:pre-wrap;padding:var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);margin-bottom:var(--space-4)';
    pre.textContent = q.trecho;
    card.appendChild(pre);
    card.innerHTML += `<p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-3)">Qual figura sonora predomina?</p>`;
    const opts = document.createElement('div');
    opts.style.cssText = 'display:flex;gap:var(--space-2);flex-wrap:wrap';
    q.opcoes.forEach(op => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-secondary';
      btn.style.fontSize = 'var(--text-sm)';
      btn.textContent = op;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        const correct = op === q.figura;
        btn.style.background  = correct ? 'var(--color-green)' : 'var(--color-accent)';
        btn.style.color       = '#fff';
        btn.style.borderColor = correct ? 'var(--color-green)' : 'var(--color-accent)';
        if (!correct) opts.querySelectorAll('button').forEach(b => {
          if (b.textContent === q.figura) { b.style.background = 'var(--color-green)'; b.style.color = '#fff'; b.style.borderColor = 'var(--color-green)'; }
        });
        const fb = document.createElement('div');
        fb.className = 'panel';
        fb.style.marginTop = 'var(--space-3)';
        fb.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${q.explicacao}</p>`;
        card.appendChild(fb);
      });
      opts.appendChild(btn);
    });
    card.appendChild(opts);
    container.appendChild(card);
  });
}

/* ================================================================
   TAB 5 — METRO (contagem de sílabas)
   ================================================================ */

function renderTabMetro(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Metro e Ritmo</h2>

      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-6)">
        Metro é o número de sílabas poéticas de um verso. Sílaba poética difere da
        gramatical: elisão (duas vogais em contato viram uma sílaba), crase poética e
        sinérese são fenômenos que ocorrem na leitura em voz alta.
        A contagem vai até a última sílaba tônica.
      </p>

      <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6);margin-bottom:var(--space-8)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Regra principal</p>
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">
          A contagem termina na última sílaba tônica do verso.
          Se a última palavra é oxítona (tônica na última sílaba), soma-se 1.
          Se é paroxítona (tônica na penúltima), conta-se normalmente.
          Se é proparoxítona (tônica na antepenúltima), subtrai-se 1.
        </p>
      </div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Metros mais comuns</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-3);margin-bottom:var(--space-8)">
        ${[
          ['Redondilha menor', '5 sílabas', 'Poesia popular e de cordel'],
          ['Redondilha maior', '7 sílabas', 'Verso mais comum na lírica portuguesa medieval'],
          ['Decassílabo', '10 sílabas', 'Verso épico — Os Lusíadas, Divina Comédia'],
          ['Dodecassílabo', '12 sílabas', 'Verso alexandrino — poesia francesa e romântica'],
          ['Verso livre', 'Variável', 'Modernismo — sem metro fixo'],
        ].map(([nome, num, ex]) => `
          <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
            <p style="font-family:var(--font-display);font-size:var(--text-sm);font-weight:700;color:var(--color-ink);margin-bottom:2px">${nome}</p>
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);margin-bottom:var(--space-2)">${num}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-xs);color:var(--color-ink-ghost)">${ex}</p>
          </div>
        `).join('')}
      </div>

      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Contador de sílabas</h3>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-4)">
        Digite um verso e veja a contagem aproximada de sílabas poéticas.
        A ferramenta aplica regras básicas de elisão e conta até a última tônica.
      </p>

      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-4)">
        <input type="text" id="metro-input" placeholder="Digite um verso…"
          style="flex:1;font-family:var(--font-body);font-size:var(--text-base);padding:var(--space-3) var(--space-4);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);outline:none">
        <button type="button" class="btn btn-primary" id="metro-btn">Contar</button>
      </div>
      <div id="metro-result"></div>
    </div>
  `;

  const input  = container.querySelector('#metro-input');
  const btn    = container.querySelector('#metro-btn');
  const result = container.querySelector('#metro-result');

  const contar = () => {
    const verso = input.value.trim();
    if (!verso) return;
    const { silabas, analise } = contarSilabasPoéticas(verso);
    result.innerHTML = `
      <div class="card" style="margin-top:var(--space-2)">
        <p style="font-family:var(--font-display);font-size:var(--text-3xl);color:var(--color-ink);margin-bottom:var(--space-2)">${silabas}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost);margin-bottom:var(--space-3)">sílabas poéticas (aproximado)</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent)">${nomeMetro(silabas)}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-3)">${analise}</p>
      </div>
    `;
  };

  btn.addEventListener('click', contar);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') contar(); });

  // Quiz de metro
  const quizSection = document.createElement('div');
  quizSection.style.marginTop = 'var(--space-10)';
  quizSection.innerHTML = `
    <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Identifique o metro</h3>
    <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-6)">
      Leia o verso em voz alta, conte as sílabas poéticas até a última tônica e identifique o metro.
    </p>
    <div id="metro-quiz-container"></div>
  `;
  container.appendChild(quizSection);
  buildMetroQuiz(quizSection.querySelector('#metro-quiz-container'));
}

/* ================================================================
   QUIZ DE METRO
   ================================================================ */

function buildMetroQuiz(container) {
  const questoes = [
    {
      verso: 'Mi-nha ter-ra tem pal-mei-ras',
      original: 'Minha terra tem palmeiras',
      silabas: 7,
      metro: 'Redondilha maior (7 sílabas)',
      opcoes: ['Redondilha menor (5)', 'Redondilha maior (7)', 'Decassílabo (10)', 'Dodecassílabo (12)'],
      resposta: 1,
      autor: 'Gonçalves Dias',
      explicacao: 'Mi-nha-ter-ra-tem-pal-MEI-ras: 7 sílabas poéticas (conta até a tônica "mei"). Redondilha maior — metro mais comum da lírica popular portuguesa e romântica.',
    },
    {
      verso: 'As ar-mas e os ba-rões as-si-na-la-dos',
      original: 'As armas e os barões assinalados',
      silabas: 10,
      metro: 'Decassílabo (10 sílabas)',
      opcoes: ['Redondilha maior (7)', 'Octossílabo (8)', 'Decassílabo (10)', 'Dodecassílabo (12)'],
      resposta: 2,
      autor: 'Luís de Camões, Os Lusíadas',
      explicacao: 'As-ar-mas-e-os-ba-rões-as-si-NA-la-dos: última tônica em "si" (10ª posição). Decassílabo heroico — metro épico por excelência, usado em Os Lusíadas e Divina Comédia.',
    },
    {
      verso: 'Sou um mu-la-to na-to',
      original: 'Sou um mulato nato',
      silabas: 5,
      metro: 'Redondilha menor (5 sílabas)',
      opcoes: ['Redondilha menor (5)', 'Redondilha maior (7)', 'Hexassílabo (6)', 'Octossílabo (8)'],
      resposta: 0,
      autor: 'Chico Buarque',
      explicacao: 'Sou-um-mu-la-NA-to: última tônica na 5ª posição. Redondilha menor — metro breve, coloquial, ligado à tradição trovadoresca e à música popular.',
    },
    {
      verso: 'Quan-do nas-ci, um an-jo tor-to',
      original: 'Quando nasci, um anjo torto',
      silabas: 7,
      metro: 'Redondilha maior (7 sílabas)',
      opcoes: ['Pentassílabo (5)', 'Redondilha maior (7)', 'Decassílabo (10)', 'Octossílabo (8)'],
      resposta: 1,
      autor: 'Carlos Drummond de Andrade',
      explicacao: 'Quan-do-nas-ci-um-an-TOR-to: 7 sílabas. Drummond abre "Poema de Sete Faces" com redondilha maior — escolha irônica, pois usa o metro popular para um poema de angústia existencial.',
    },
    {
      verso: 'A vi-da é bre-ve, a ar-te é lon-ga',
      original: 'A vida é breve, a arte é longa',
      silabas: 8,
      metro: 'Octossílabo (8 sílabas)',
      opcoes: ['Redondilha maior (7)', 'Octossílabo (8)', 'Decassílabo (10)', 'Dodecassílabo (12)'],
      resposta: 1,
      autor: 'Adaptação do aforismo de Hipócrates',
      explicacao: 'A-vi-da-é-bre-ve-a-ar-TE-é-lon-ga: última tônica em "lon" (8ª posição com elisão). Octossílabo — metro muito usado na poesia espanhola e em cantigas medievais.',
    },
  ];

  questoes.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.marginBottom = 'var(--space-4)';

    const autorEl = document.createElement('p');
    autorEl.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--space-2)';
    autorEl.textContent = q.autor;
    card.appendChild(autorEl);

    const versoEl = document.createElement('pre');
    versoEl.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);line-height:1.8;white-space:pre-wrap;padding:var(--space-4) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);margin-bottom:var(--space-2)';
    versoEl.textContent = q.original;
    card.appendChild(versoEl);

    const divisaoEl = document.createElement('p');
    divisaoEl.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);letter-spacing:0.04em;margin-bottom:var(--space-4)';
    divisaoEl.textContent = `Divisão: ${q.verso}`;
    card.appendChild(divisaoEl);

    const pergunta = document.createElement('p');
    pergunta.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-3)';
    pergunta.textContent = `Qual é o metro deste verso?`;
    card.appendChild(pergunta);

    const opts = document.createElement('div');
    opts.style.cssText = 'display:flex;gap:var(--space-2);flex-wrap:wrap';

    q.opcoes.forEach((op, oi) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-secondary';
      btn.style.fontSize = 'var(--text-sm)';
      btn.textContent = op;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        const correct = oi === q.resposta;
        btn.style.cssText += `;background:${correct ? 'var(--color-green)' : 'var(--color-accent)'};color:#fff;border-color:${correct ? 'var(--color-green)' : 'var(--color-accent)'}`;
        if (!correct) {
          opts.querySelectorAll('button')[q.resposta].style.cssText += ';background:var(--color-green);color:#fff;border-color:var(--color-green)';
        }
        const fb = document.createElement('div');
        fb.className = 'panel';
        fb.style.marginTop = 'var(--space-3)';
        fb.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.7">${q.explicacao}</p>`;
        card.appendChild(fb);
      });
      opts.appendChild(btn);
    });

    card.appendChild(opts);
    container.appendChild(card);
  });
}

/* ================================================================
   ANÁLISE AUTOMÁTICA DE POEMA
 * @param {string} content
 * @returns {{ totalVersos, totalEstrofes, tipoEstrofe, esquemaRima, figuras }}
 */
function analisarPoema(content) {
  const linhas   = content.split('\n');
  const versos   = linhas.filter(l => l.trim() !== '');
  const estrofes = content.split(/\n\s*\n/).filter(e => e.trim() !== '');

  const totalVersos   = versos.length;
  const totalEstrofes = estrofes.length || 1;
  const porEstrofe    = Math.round(totalVersos / totalEstrofes);

  const tipoEstrofe = {
    1: 'Monóstico', 2: 'Dístico', 3: 'Terceto',
    4: 'Quadra', 5: 'Quintilha', 6: 'Sextilha',
    7: 'Sétima', 8: 'Oitava', 14: 'Soneto',
  }[totalVersos] ?? `${totalVersos} versos`;

  const esquemaRima = detectarEsquemaRima(versos);
  const figuras     = detectarFiguras(content);

  return { totalVersos, totalEstrofes, tipoEstrofe, esquemaRima, figuras };
}

/**
 * Detecta o esquema rimático de um conjunto de versos.
 * Compara as sílabas finais (a partir da última vogal tônica).
 * @param {string[]} versos
 * @returns {string}
 */
function detectarEsquemaRima(versos) {
  if (versos.length < 2) return '—';

  const finalVerso = v => {
    const palavras = v.toLowerCase().replace(/[^a-záàãâéêíóôõúüç\s]/g, '').trim().split(/\s+/);
    const ultima = palavras[palavras.length - 1] ?? '';
    // Pega as últimas 3 letras como aproximação da rima
    return ultima.slice(-3);
  };

  const fins    = versos.map(finalVerso);
  const letras  = [];
  const mapa    = {};
  let   proxima = 0;

  fins.forEach(fim => {
    if (mapa[fim] === undefined) {
      mapa[fim] = String.fromCharCode(65 + proxima);
      proxima++;
    }
    letras.push(mapa[fim]);
  });

  const esquema = letras.join('');

  // Verifica se há rima real (pelo menos duas letras iguais)
  const temRima = new Set(letras).size < letras.length;
  return temRima ? esquema : 'Verso livre';
}

/**
 * Detecta figuras sonoras por heurísticas simples.
 * @param {string} content
 * @returns {string[]}
 */
function detectarFiguras(content) {
  const figuras = [];
  const lower   = content.toLowerCase();

  // Anáfora — primeiras palavras de linhas se repetem
  const linhas  = content.split('\n').filter(l => l.trim());
  const inicios = linhas.map(l => l.trim().split(/\s+/)[0]?.toLowerCase());
  const freqIni = {};
  inicios.forEach(p => { if (p) freqIni[p] = (freqIni[p] ?? 0) + 1; });
  if (Object.values(freqIni).some(v => v >= 2)) figuras.push('Anáfora');

  // Aliteração — mesma consoante 3+ vezes próximas
  const consMatch = lower.match(/\b(\w)\w*\s+(?:\w+\s+){0,2}\1\w*/g);
  if (consMatch && consMatch.length >= 2) figuras.push('Aliteração');

  // Onomatopeia — palavras onomatopaicas comuns
  const onomatopeias = ['tosse', 'zumbido', 'sussurro', 'murmúrio', 'silvo', 'estalo', 'splash', 'crash'];
  if (onomatopeias.some(o => lower.includes(o))) figuras.push('Onomatopeia');

  return figuras;
}

/* ================================================================
   CONTADOR DE SÍLABAS POÉTICAS
   ================================================================ */

/**
 * Conta sílabas poéticas de um verso aplicando regras básicas:
 * - Elisão: vogal final + vogal inicial seguinte = 1 sílaba
 * - Conta até a última sílaba tônica
 * @param {string} verso
 * @returns {{ silabas: number, analise: string }}
 */
function contarSilabasPoéticas(verso) {
  // Remove pontuação, lowercase
  const limpo = verso.toLowerCase().replace(/[^a-záàãâéêíóôõúüç\s]/g, '').trim();

  if (!limpo) return { silabas: 0, analise: 'Verso vazio.' };

  // Conta sílabas gramaticais por palavra
  const palavras = limpo.split(/\s+/);
  let total = 0;

  palavras.forEach(p => {
    total += contarSilabasGramaticais(p);
  });

  // Aplica elisão aproximada: se palavra termina em vogal e próxima começa com vogal
  let elisoes = 0;
  for (let i = 0; i < palavras.length - 1; i++) {
    const fimAtual    = palavras[i].slice(-1);
    const inicioProx  = palavras[i + 1][0];
    if (/[aeiouáàãâéêíóôõú]/.test(fimAtual) && /[aeiouáàãâéêíóôõú]/.test(inicioProx)) {
      elisoes++;
    }
  }
  total -= elisoes;

  const analise = elisoes > 0
    ? `${elisoes} elisão${elisoes > 1 ? 'ões' : ''} aplicada${elisoes > 1 ? 's' : ''} (vogal final + vogal inicial fundidas).`
    : 'Nenhuma elisão detectada.';

  return { silabas: Math.max(1, total), analise };
}

function contarSilabasGramaticais(palavra) {
  if (!palavra) return 0;
  // Conta grupos vocálicos como sílabas
  const grupos = palavra.match(/[aeiouáàãâéêíóôõúü]+/g);
  return grupos ? grupos.length : 1;
}

function nomeMetro(n) {
  const nomes = {
    1: 'Monossílabo', 2: 'Dissílabo', 3: 'Trissílabo',
    4: 'Tetrassílabo', 5: 'Pentassílabo (redondilha menor)',
    6: 'Hexassílabo', 7: 'Heptassílabo (redondilha maior)',
    8: 'Octossílabo', 9: 'Eneassílabo',
    10: 'Decassílabo (verso épico)', 11: 'Hendecassílabo',
    12: 'Dodecassílabo (alexandrino)',
  };
  return nomes[n] ?? `${n} sílabas — sem nome canônico`;
}

/* ================================================================
   EXERCÍCIOS (reutiliza lógica simples de múltipla escolha)
   ================================================================ */

function buildExercicio(ex, idx, poema) {
  const wrapper = document.createElement('div');
  wrapper.className = 'card';
  wrapper.style.marginBottom = 'var(--space-4)';

  const header = document.createElement('p');
  header.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)';
  header.textContent = `Exercício ${idx + 1} · ${labelTipoEx(ex.type)}`;
  wrapper.appendChild(header);

  const instr = document.createElement('p');
  instr.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);margin-bottom:var(--space-4)';
  instr.textContent = ex.instruction;
  wrapper.appendChild(instr);

  if (ex.type === 'interpretacao' || ex.type === 'tom' || ex.type === 'inferencia' || ex.type === 'figuras') {
    const opts = document.createElement('div');
    opts.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-2)';

    ex.options.forEach((op, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = 'text-align:left;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-2) var(--space-3);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);cursor:pointer;transition:all var(--transition-fast)';
      btn.textContent = op;
      btn.addEventListener('click', () => {
        opts.querySelectorAll('button').forEach(b => b.disabled = true);
        const correct = i === ex.correct;
        btn.style.background  = correct ? 'rgba(74,124,89,0.15)' : 'rgba(139,26,26,0.1)';
        btn.style.borderColor = correct ? 'var(--color-green)' : 'var(--color-accent)';
        if (!correct) {
          opts.querySelectorAll('button')[ex.correct].style.background  = 'rgba(74,124,89,0.15)';
          opts.querySelectorAll('button')[ex.correct].style.borderColor = 'var(--color-green)';
        }
        if (ex.explanation) {
          const fb = document.createElement('div');
          fb.className = 'panel';
          fb.style.marginTop = 'var(--space-3)';
          fb.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${ex.explanation}</p>`;
          wrapper.appendChild(fb);
        }
      });
      opts.appendChild(btn);
    });

    wrapper.appendChild(opts);
  } else if (ex.type === 'estrutura') {
    // Para exercícios de estrutura, mostra a resposta como revelação
    const revealBtn = document.createElement('button');
    revealBtn.type = 'button';
    revealBtn.className = 'btn btn-secondary';
    revealBtn.textContent = 'Ver resposta';
    revealBtn.addEventListener('click', () => {
      revealBtn.style.display = 'none';
      const answer = document.createElement('div');
      answer.className = 'panel';
      answer.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;color:var(--color-green);margin-bottom:var(--space-2)">Resposta</p>
        <p style="font-family:var(--font-body);color:var(--color-ink-mid);margin-bottom:var(--space-2)">${Array.isArray(ex.targets) ? ex.targets.join(', ') : ex.target}</p>
        ${ex.explanation ? `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-light);border-top:1px solid var(--color-paper-border);padding-top:var(--space-2);margin-top:var(--space-2)">${ex.explanation}</p>` : ''}
      `;
      wrapper.appendChild(answer);
    });
    wrapper.appendChild(revealBtn);
  }

  return wrapper;
}

/* ================================================================
   UTILITÁRIOS
   ================================================================ */

function metricaMini(label, value) {
  return `
    <div style="background:var(--color-paper);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
      <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;color:var(--color-ink)">${value}</p>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);text-transform:uppercase;letter-spacing:0.05em">${label}</p>
    </div>
  `;
}

function nivelLabel(level) {
  return { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' }[level] ?? level;
}

function labelTipoEx(type) {
  return {
    estrutura: 'Estrutura', interpretacao: 'Interpretação', tom: 'Tom',
    inferencia: 'Inferência', figuras: 'Figuras de linguagem', fato_opiniao: 'Fato ou Opinião',
  }[type] ?? type;
}
