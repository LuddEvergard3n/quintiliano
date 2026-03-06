/**
 * writing.js — Módulo de Escrita
 *
 * Análise estrutural heurística + integração com OpenWordNet-PT:
 *   - Métricas de texto (palavras, frases, parágrafos, diversidade lexical)
 *   - Detecção de frases longas
 *   - Detecção de palavras repetidas com sugestão de sinônimos via WordNet
 *   - Clique na palavra redundante abre painel de sinônimos
 */

import { lookupWord } from '../../js/wordnet.js';

const REDUNDANCY_THRESHOLD    = 3;
const LONG_SENTENCE_THRESHOLD = 40;

const STOP_WORDS = new Set([
  'o','a','os','as','um','uma','uns','umas',
  'de','do','da','dos','das','em','no','na','nos','nas',
  'por','para','com','sem','sob','sobre','entre',
  'e','ou','mas','porém','contudo','todavia','entretanto',
  'que','se','pois','porque','quando','como','onde',
  'eu','tu','ele','ela','nós','vós','eles','elas',
  'me','te','nos','lhe','lhes',
  'ao','à','aos','às',
  'seu','sua','seus','suas','meu','minha','meus','minhas',
  'este','esta','estes','estas','esse','essa','esses','essas',
  'aquele','aquela','aqueles','aquelas',
  'é','são','foi','eram','ser','estar','ter','haver',
  'não','nem','também','já','ainda','sempre','nunca',
  'muito','mais','menos','tão','bem','mal',
]);

/* ================================================================
   ENTRADA PRINCIPAL
   ================================================================ */

/**
 * @param {object} [textsData] — Conteúdo de texts.json (opcional). Se fornecido,
 *   exibe exemplos pré-carregados de diferentes gêneros para o aluno usar como
 *   ponto de partida.
 * @returns {HTMLElement}
 */
export function renderEscrita(textsData) {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Escrita</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Cole ou escreva um texto. O sistema analisa sua estrutura e aponta
        palavras repetidas — com sugestões de sinônimos do léxico português.
      </p>
    </div>

    <div style="max-width:var(--content-width)">
      <div id="writing-examples"></div>

      <div style="margin-bottom:var(--space-4)">
        <label for="writing-input" class="sr-only">Seu texto</label>
        <textarea
          id="writing-input"
          placeholder="Escreva ou cole seu texto aqui…"
          rows="10"
          spellcheck="true"
          lang="pt-BR"
          style="
            width:100%;font-family:var(--font-body);font-size:var(--text-base);
            line-height:1.8;padding:var(--space-4) var(--space-6);
            border:1.5px solid var(--color-paper-border);border-radius:var(--radius);
            background:var(--color-paper);color:var(--color-ink);resize:vertical;
            outline:none;transition:border-color var(--transition-fast);
          "
        ></textarea>
      </div>

      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-8)">
        <button type="button" class="btn btn-primary" id="analyze-btn">Analisar texto</button>
        <button type="button" class="btn btn-secondary" id="clear-btn">Limpar</button>
      </div>

      <div id="analysis-result" style="display:none"></div>
    </div>
  `;

  const textarea   = page.querySelector('#writing-input');
  const analyzeBtn = page.querySelector('#analyze-btn');
  const clearBtn   = page.querySelector('#clear-btn');
  const result     = page.querySelector('#analysis-result');
  const examplesEl = page.querySelector('#writing-examples');

  // Exemplos pré-carregados
  if (textsData?.texts?.length) {
    renderExamples(examplesEl, textsData.texts, textarea);
  }

  textarea.addEventListener('focus', () => { textarea.style.borderColor = 'var(--color-ink-light)'; });
  textarea.addEventListener('blur',  () => { textarea.style.borderColor = 'var(--color-paper-border)'; });

  analyzeBtn.addEventListener('click', async () => {
    const text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analisando…';

    const analysis = analyzeText(text);
    await renderAnalysis(result, analysis, text);

    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analisar texto';

    result.style.display = 'block';
    result.classList.add('fade-in');
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  clearBtn.addEventListener('click', () => {
    textarea.value = '';
    result.style.display = 'none';
    textarea.focus();
  });

  return page;
}

/**
 * Renderiza a seção de exemplos pré-carregados.
 * Seleciona um texto representativo de cada gênero disponível.
 * @param {HTMLElement} container
 * @param {Array} texts
 * @param {HTMLTextAreaElement} textarea
 */
function renderExamples(container, texts, textarea) {
  // Um texto por gênero, preferindo nível intermediário, depois básico, depois avançado
  const NIVEL_PREF = ['intermediario', 'basico', 'avancado'];
  const byGenre    = {};

  for (const t of texts) {
    if (!byGenre[t.genre]) byGenre[t.genre] = [];
    byGenre[t.genre].push(t);
  }

  const picks = Object.values(byGenre).map(group => {
    for (const nivel of NIVEL_PREF) {
      const found = group.find(t => t.level === nivel);
      if (found) return found;
    }
    return group[0];
  }).slice(0, 6); // máximo 6 exemplos para não poluir

  if (!picks.length) return;

  container.innerHTML = `
    <div style="margin-bottom:var(--space-6)">
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">
        Exemplos para analisar — clique para carregar
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)" id="example-chips"></div>
    </div>
  `;

  const chips = container.querySelector('#example-chips');

  picks.forEach(text => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = `
      font-family:var(--font-ui);font-size:var(--text-xs);
      padding:var(--space-2) var(--space-3);
      border:1px solid var(--color-paper-border);border-radius:var(--radius);
      background:var(--color-paper-dark);color:var(--color-ink-mid);
      cursor:pointer;transition:all var(--transition-fast);
      text-align:left;
    `;
    btn.innerHTML = `
      <span style="color:var(--color-accent)">${GENRE_LABEL[text.genre] ?? text.genre}</span>
      <span style="color:var(--color-ink-ghost);margin:0 4px">·</span>
      <span>${text.author.split(' ').slice(-1)[0]}</span>
    `;
    btn.title = `${text.title} — ${text.author}`;

    btn.addEventListener('click', () => {
      textarea.value = text.content;
      textarea.focus();
      // Marca o chip ativo
      chips.querySelectorAll('button').forEach(b => {
        b.style.borderColor    = 'var(--color-paper-border)';
        b.style.background     = 'var(--color-paper-dark)';
      });
      btn.style.borderColor = 'var(--color-accent)';
      btn.style.background  = 'rgba(139,26,26,0.06)';
    });

    btn.addEventListener('mouseenter', () => { btn.style.borderColor = 'var(--color-ink-light)'; });
    btn.addEventListener('mouseleave', () => {
      if (btn.style.borderColor !== 'var(--color-accent)') {
        btn.style.borderColor = 'var(--color-paper-border)';
      }
    });

    chips.appendChild(btn);
  });
}

/** Labels legíveis para gêneros */
const GENRE_LABEL = {
  'romance':              'Romance',
  'conto':                'Conto',
  'poesia':               'Poesia',
  'crônica':              'Crônica',
  'artigo de opinião':    'Opinião',
  'dissertação':          'Dissertação',
  'narrativa':            'Narrativa',
  'texto científico':     'Científico',
  'texto instrucional':   'Instrucional',
  'prosa não-ficcional':  'Não-ficção',
};

/* ================================================================
   ANÁLISE
   ================================================================ */

function analyzeText(text) {
  const sentences  = splitSentences(text);
  const words      = extractWords(text);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim());

  const wordCount             = words.length;
  const sentenceCount         = sentences.length;
  const paragraphCount        = paragraphs.length;
  const avgWordsPerSentence   = sentenceCount > 0 ? Math.round(wordCount / sentenceCount) : 0;
  const freqMap               = buildFrequencyMap(words);
  const uniqueWords           = Object.keys(freqMap).length;
  const lexicalDiversity      = wordCount > 0 ? (uniqueWords / wordCount).toFixed(2) : '0.00';

  const longSentences = sentences.filter(s => extractWords(s).length >= LONG_SENTENCE_THRESHOLD);

  const redundancies = Object.entries(freqMap)
    .filter(([word, count]) => count >= REDUNDANCY_THRESHOLD && !STOP_WORDS.has(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return { wordCount, sentenceCount, paragraphCount, avgWordsPerSentence,
           longSentences, redundancies, uniqueWords, lexicalDiversity };
}

/* ================================================================
   RENDERIZAÇÃO DA ANÁLISE
   ================================================================ */

async function renderAnalysis(container, analysis, text) {
  container.innerHTML = '';

  // Métricas gerais
  const metricsSection = document.createElement('section');
  metricsSection.style.marginBottom = 'var(--space-8)';
  metricsSection.innerHTML = `
    <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Métricas gerais</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:var(--space-4)">
      ${metricCard('Palavras',            analysis.wordCount)}
      ${metricCard('Frases',              analysis.sentenceCount)}
      ${metricCard('Parágrafos',          analysis.paragraphCount)}
      ${metricCard('Média palavras/frase',analysis.avgWordsPerSentence)}
      ${metricCard('Palavras únicas',     analysis.uniqueWords)}
      ${metricCard('Diversidade lexical', analysis.lexicalDiversity, '(0 a 1)')}
    </div>
  `;
  container.appendChild(metricsSection);
  container.appendChild(makeDivider());

  // Frases longas
  const longSection = document.createElement('section');
  longSection.style.marginBottom = 'var(--space-8)';

  if (analysis.longSentences.length === 0) {
    longSection.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Extensão das frases</h2>
      <div class="panel panel-success">
        <p style="font-family:var(--font-body);color:var(--color-ink-mid)">
          Nenhuma frase ultrapassa ${LONG_SENTENCE_THRESHOLD} palavras.
        </p>
      </div>
    `;
  } else {
    longSection.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-2)">Frases muito longas</h2>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-4)">
        Frases com mais de ${LONG_SENTENCE_THRESHOLD} palavras podem dificultar a leitura. Considere dividi-las.
      </p>
      <div id="long-sentences-list"></div>
    `;
    const list = longSection.querySelector('#long-sentences-list');
    analysis.longSentences.forEach(sent => {
      const el = document.createElement('div');
      el.className = 'panel';
      el.style.marginBottom = 'var(--space-3)';
      el.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);margin-bottom:var(--space-2)">${extractWords(sent).length} palavras</p>
        <p style="font-family:var(--font-body);font-style:italic;color:var(--color-ink-mid)">${sent.trim()}</p>
      `;
      list.appendChild(el);
    });
  }
  container.appendChild(longSection);
  container.appendChild(makeDivider());

  // Redundâncias + WordNet
  const redSection = document.createElement('section');
  redSection.style.marginBottom = 'var(--space-8)';

  if (analysis.redundancies.length === 0) {
    redSection.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Palavras repetidas</h2>
      <div class="panel panel-success">
        <p style="font-family:var(--font-body);color:var(--color-ink-mid)">Nenhuma palavra de conteúdo repetida em excesso. Bom vocabulário.</p>
      </div>
    `;
  } else {
    redSection.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-2)">Palavras repetidas</h2>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-4)">
        Palavras com ${REDUNDANCY_THRESHOLD}+ ocorrências. Clique para ver sinônimos do léxico português.
      </p>
      <div id="redundancy-chips" style="display:flex;flex-wrap:wrap;gap:var(--space-3);margin-bottom:var(--space-4)"></div>
      <div id="synonym-panel"></div>
    `;

    const chipsArea   = redSection.querySelector('#redundancy-chips');
    const synonymArea = redSection.querySelector('#synonym-panel');

    // Busca sinônimos de todas as palavras redundantes em paralelo
    const synonymMap = {};
    await Promise.all(
      analysis.redundancies.map(async ([word]) => {
        const entry = await lookupWord(word);
        if (entry) synonymMap[word] = entry;
      })
    );

    analysis.redundancies.forEach(([word, count]) => {
      const hasWordNet = !!synonymMap[word];

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.style.cssText = `
        display:inline-flex;align-items:center;gap:var(--space-2);
        background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
        border-radius:var(--radius);padding:var(--space-2) var(--space-3);
        cursor:${hasWordNet ? 'pointer' : 'default'};
        transition:all var(--transition-fast);
      `;
      chip.innerHTML = `
        <span style="font-family:var(--font-body);font-size:var(--text-base)">${word}</span>
        <span style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-accent)">${count}×</span>
        ${hasWordNet ? `<span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-gold)">ver sinônimos</span>` : ''}
      `;

      if (hasWordNet) {
        chip.addEventListener('click', () => {
          renderSynonymPanel(synonymArea, word, synonymMap[word]);
          // Scroll para o painel
          synonymArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        chip.addEventListener('mouseenter', () => { chip.style.borderColor = 'var(--color-gold)'; });
        chip.addEventListener('mouseleave', () => { chip.style.borderColor = 'var(--color-paper-border)'; });
      }

      chipsArea.appendChild(chip);
    });
  }

  container.appendChild(redSection);

  // Diversidade lexical
  const divValue = parseFloat(analysis.lexicalDiversity);
  const divMsg   = divValue >= 0.7
    ? 'Alta diversidade lexical — vocabulário variado.'
    : divValue >= 0.5
    ? 'Diversidade moderada — há espaço para variar mais o vocabulário.'
    : 'Diversidade baixa — muitas palavras se repetem.';

  const diversityPanel = document.createElement('div');
  diversityPanel.className = `panel ${divValue >= 0.7 ? 'panel-success' : ''}`;
  diversityPanel.style.marginBottom = 'var(--space-8)';
  diversityPanel.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-1)">Diversidade lexical: ${analysis.lexicalDiversity}</p>
    <p style="font-family:var(--font-body);color:var(--color-ink-mid)">${divMsg}</p>
  `;
  container.appendChild(diversityPanel);
}

/**
 * Renderiza o painel de sinônimos e antônimos de uma palavra.
 */
function renderSynonymPanel(container, word, entry) {
  container.innerHTML = '';
  container.classList.add('fade-in');

  const panel = document.createElement('div');
  panel.className = 'card card-elevated';
  panel.style.marginTop = 'var(--space-4)';

  let html = `
    <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:var(--space-4)">
      <h4 style="font-family:var(--font-display);font-size:var(--text-xl)">${word}</h4>
      <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">OpenWordNet-PT</span>
    </div>
  `;

  if (entry.definicao) {
    html += `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-4);font-style:italic">${entry.definicao}</p>`;
  }

  if (entry.hiperonimo) {
    html += `<p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-bottom:var(--space-4)">Categoria: <strong style="color:var(--color-ink-mid)">${entry.hiperonimo}</strong></p>`;
  }

  if (entry.sinonimos?.length) {
    html += `
      <div style="margin-bottom:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-green);margin-bottom:var(--space-2)">Sinônimos</p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
          ${entry.sinonimos.map(s => `<span class="word-chip">${s}</span>`).join('')}
        </div>
      </div>
    `;
  }

  if (entry.antonimos?.length) {
    html += `
      <div>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-2)">Antônimos</p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
          ${entry.antonimos.map(a => `<span class="word-chip">${a}</span>`).join('')}
        </div>
      </div>
    `;
  }

  panel.innerHTML = html;
  container.appendChild(panel);
}

/* ================================================================
   UTILITÁRIOS
   ================================================================ */

function splitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean);
}

function extractWords(text) {
  return text.toLowerCase().match(/[a-záàãâéêíóôõúüç]+/g) ?? [];
}

function buildFrequencyMap(words) {
  const map = {};
  for (const w of words) map[w] = (map[w] ?? 0) + 1;
  return map;
}

function metricCard(label, value, sub = '') {
  return `
    <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6) var(--space-6)">
      <p style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:var(--color-ink)">${value}</p>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);text-transform:uppercase;letter-spacing:0.06em">${label}</p>
      ${sub ? `<p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${sub}</p>` : ''}
    </div>
  `;
}

function makeDivider() {
  const d = document.createElement('div');
  d.className = 'divider';
  return d;
}
