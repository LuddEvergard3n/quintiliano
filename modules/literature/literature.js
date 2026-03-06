/**
 * literature.js — Módulo de Literatura
 *
 * Duas abas:
 *   1. Autores — grade de perfis com integração ao Project Gutenberg
 *   2. ABL     — cadeiras da Academia Brasileira de Letras com ocupantes notáveis
 *
 * Integração com Project Gutenberg:
 *   - Obras em domínio público carregadas como texto puro
 *   - Cache automático em localStorage após primeiro carregamento
 */

/* ================================================================
   DADOS: ACADEMIA BRASILEIRA DE LETRAS
   40 cadeiras, fundada em 1897. Cada cadeira tem um patrono
   (escolhido pelos fundadores, imutável) e uma sequência de ocupantes.
   Listamos os ocupantes mais relevantes literariamente.
   ================================================================ */

const ABL_CADEIRAS = [
  {
    numero: 1, patrono: "Adelino Fontoura",
    ocupantes: [
      { nome: "Luís Murat", periodo: "1897–1929", nota: "Poeta parnasiano, um dos fundadores." },
      { nome: "Murilo Mendes", periodo: "1942–1949 (eleito)", nota: "Poeta modernista de forte viés religioso e surrealista. Recusou a posse." },
      { nome: "Cláudio Murilo Leal", periodo: "2004–atual", nota: "Crítico e biógrafo." }
    ]
  },
  {
    numero: 2, patrono: "Álvares de Azevedo",
    ocupantes: [
      { nome: "Coelho Neto", periodo: "1897–1934", nota: "Romancista prolífico, 'o rei da prosa' — hoje lido criticamente como exemplo do parnasianismo em prosa." },
      { nome: "Odylo Costa Filho", periodo: "1959–1979", nota: "Jornalista e poeta." },
      { nome: "Lygia Fagundes Telles", periodo: "1985–2022", nota: "Uma das maiores contistas brasileiras. Autora de 'As Meninas' (1973)." }
    ]
  },
  {
    numero: 3, patrono: "Artur de Oliveira",
    ocupantes: [
      { nome: "Machado de Assis", periodo: "1897–1908 (Presidente fundador)", nota: "Fundador e primeiro presidente da ABL. Patrono de si mesmo — escolheu o patrono e ocupou a cadeira." },
      { nome: "Alcântara Machado", periodo: "1928–1935", nota: "Modernista paulista, autor de Brás, Bexiga e Barra Funda." },
      { nome: "Austregésilo de Athayde", periodo: "1952–1998", nota: "Jornalista, presidente da ABL por décadas." }
    ]
  },
  {
    numero: 7, patrono: "Castro Alves",
    ocupantes: [
      { nome: "Olavo Bilac", periodo: "1897–1918", nota: "O maior parnasiano brasileiro. 'Profissão de fé' e 'Via Láctea'. Escreveu a letra do Hino à Bandeira." },
      { nome: "Guilherme de Almeida", periodo: "1930–1969", nota: "Poeta modernista paulistano, tradutor de Shakespeare." },
      { nome: "Ferreira Gullar", periodo: "1989–2016", nota: "Poeta neoconcretista. 'Poema Sujo' (1976), escrito no exílio durante a ditadura." }
    ]
  },
  {
    numero: 15, patrono: "Gonçalves Dias",
    ocupantes: [
      { nome: "José Veríssimo", periodo: "1897–1916", nota: "Crítico literário fundamental. Sua História da Literatura Brasileira (1916) é referência até hoje." },
      { nome: "Gilberto Freyre", periodo: "1947–1987", nota: "Sociólogo e ensaísta. 'Casa Grande & Senzala' (1933) — obra central e controversa sobre formação cultural brasileira." },
      { nome: "Nélida Piñon", periodo: "1990–2023", nota: "Romancista, primeira mulher presidente da ABL. 'A República dos Sonhos' (1984)." }
    ]
  },
  {
    numero: 23, patrono: "João de Alencar",
    ocupantes: [
      { nome: "Rui Barbosa", periodo: "1897–1923", nota: "Jurista, político, orador. 'A Águia de Haia'. Defensor do purismo linguístico — famoso pela polêmica com Carneiro Ribeiro sobre o estilo de Rui." },
      { nome: "Austregésilo de Athayde", periodo: "N/A", nota: "" },
      { nome: "Zélia Gattai", periodo: "2001–2008", nota: "Escritora, viúva de Jorge Amado. Autora de 'Anarquistas Graças a Deus' (1979)." }
    ]
  },
  {
    numero: 32, patrono: "Raul Pompeia",
    ocupantes: [
      { nome: "Graça Aranha", periodo: "1897–1931", nota: "Romancista. 'Canaã' (1902) — romance que discute a imigração europeia no Brasil." },
      { nome: "Jorge Amado", periodo: "1961–2001", nota: "O escritor brasileiro mais traduzido. 'Gabriela, Cravo e Canela' (1958), 'Dona Flor e Seus Dois Maridos' (1966)." },
      { nome: "João Ubaldo Ribeiro", periodo: "2008–2014", nota: "Romancista baiano. 'Viva o Povo Brasileiro' (1984)." }
    ]
  },
  {
    numero: 38, patrono: "Álvaro de Azevedo",
    ocupantes: [
      { nome: "Sílvio Romero", periodo: "1897–1914", nota: "Crítico e folclorista. 'História da Literatura Brasileira' (1888) — primeiro estudo sistemático do campo." },
      { nome: "Carlos Drummond de Andrade", periodo: "1945 (eleito, recusou a posse)", nota: "Eleito mas recusou por discrição. Considerou o ambiente da ABL incompatível com sua maneira de ser." },
      { nome: "Cora Coralina", periodo: "N/A (candidatura)", nota: "Candidatou-se à cadeira 38 em 1981, aos 85 anos. Não foi eleita — episódio que expôs o conservadorismo da ABL." }
    ]
  },
  {
    numero: 39, patrono: "Eça de Queiroz",
    ocupantes: [
      { nome: "Medeiros e Albuquerque", periodo: "1897–1934", nota: "Poeta e jornalista." },
      { nome: "Rachel de Queiroz", periodo: "1977–2003", nota: "Primeira mulher eleita para a ABL. 'O Quinze' (1930), 'As Três Marias' (1939). Levou 80 anos para uma mulher ser aceita na instituição." }
    ]
  },
  {
    numero: 40, patrono: "Olavo Bilac",
    ocupantes: [
      { nome: "Pedro Rabelo", periodo: "1897–1905", nota: "Poeta simbolista." },
      { nome: "João Cabral de Melo Neto", periodo: "1969–1999", nota: "O poeta mais rigoroso do modernismo brasileiro. 'Morte e Vida Severina' (1955). Poesia como arquitetura: sem ornamento desnecessário." },
      { nome: "Cid Seixas", periodo: "2006–atual", nota: "Poeta e ensaísta baiano." }
    ]
  }
];

import { fetchGutenbergExcerpt } from '../../js/api.js';

/* ================================================================
   LISTA DE AUTORES
   ================================================================ */

export function renderLiteratura(data, router) {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Literatura</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Conheça os autores que formaram a língua e o pensamento brasileiros.
        Obras em domínio público podem ser lidas diretamente aqui,
        carregadas do Project Gutenberg.
        Para a história da Academia Brasileira de Letras, acesse o módulo
        <a href="#/abl" style="color:var(--color-accent);text-decoration:none;font-weight:500">ABL</a>.
      </p>
    </div>
    <div class="author-grid" id="author-grid"></div>
  `;

  const grid = page.querySelector('#author-grid');

  data.authors.forEach(author => {
    const hasGutenberg = author.gutenberg_works?.length > 0;
    const isContemporary = !author.death || author.birth >= 1940;

    const card = document.createElement('article');
    card.className = 'author-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver detalhes de ${author.name}`);

    card.innerHTML = `
      <div class="author-card-header">
        <h2 class="author-name">${author.name}</h2>
        <p class="author-dates">${author.birth}–${author.death ?? ''}</p>
        <span class="author-movement">${author.movement}</span>
        ${isContemporary
          ? `<span class="tag" style="margin-top:var(--space-2);background:rgba(76,175,80,0.15);color:var(--color-green);border-color:rgba(76,175,80,0.3)">contemporâneo</span>`
          : ''}
        ${hasGutenberg
          ? `<span class="tag" style="margin-top:var(--space-2);background:rgba(184,150,12,0.2);color:var(--color-gold);border-color:rgba(184,150,12,0.3)">
              ${author.gutenberg_works.length} obra${author.gutenberg_works.length > 1 ? 's' : ''} disponíve${author.gutenberg_works.length > 1 ? 'is' : 'l'}
            </span>`
          : ''}
      </div>
      <div class="author-card-body">
        <p class="author-excerpt">${author.short_bio}</p>
      </div>
    `;

    const open = () => router.navigate(`/autor/${author.id}`);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    grid.appendChild(card);
  });

  return page;
}

/* ================================================================
   renderABL removida — ABL agora é módulo independente (/abl)
   ================================================================ */

function _unused_renderABL_placeholder(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const info = document.createElement('div');
  info.style.cssText = 'padding:var(--space-5) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);margin-bottom:var(--space-6);border-left:4px solid var(--color-gold)';
  info.innerHTML = `
    <p style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2)">Academia Brasileira de Letras</p>
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75;margin-bottom:var(--space-3)">
      Fundada em 1897 por Machado de Assis e outros 39 escritores, a ABL tem 40 cadeiras permanentes.
      Cada cadeira tem um <strong>patrono</strong> imutável — um escritor do passado escolhido pelos fundadores —
      e uma sequência de <strong>ocupantes</strong> eleitos pelos pares.
    </p>
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-3)">
      ${[
        ['1897', 'Fundação no Rio de Janeiro'],
        ['40', 'Cadeiras permanentes'],
        ['1977', '1ª mulher eleita — Rachel de Queiroz'],
        ['academia.org.br', 'Acervo digital completo'],
      ].map(([v, l]) => `
        <div style="padding:var(--space-2) var(--space-4);background:var(--color-paper);border:1px solid var(--color-paper-border);border-radius:var(--radius)">
          <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--color-gold)">${v}</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${l}</p>
        </div>
      `).join('')}
    </div>
  `;
  wrap.appendChild(info);

  const label = document.createElement('p');
  label.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)';
  label.textContent = 'Cadeiras selecionadas — patrono e ocupantes notáveis';
  wrap.appendChild(label);

  const list = document.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  ABL_CADEIRAS.forEach(cadeira => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-6) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;
        width:44px;height:44px;border-radius:50%;flex-shrink:0;
        background:var(--color-paper-dark);border:2px solid var(--color-gold);
        font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--color-gold)">${cadeira.numero}</div>
      <div style="flex:1">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:2px">Patrono</p>
        <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-ink)">${cadeira.patrono}</p>
      </div>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-4) var(--space-5)';
    body.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Ocupantes notáveis</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-2)">
        ${cadeira.ocupantes.filter(o => o.nota).map(o => `
          <div style="padding:var(--space-6) var(--space-6);border:1px solid var(--color-paper-border);border-radius:var(--radius);border-left:3px solid var(--color-gold)">
            <div style="display:flex;align-items:baseline;gap:var(--space-2);margin-bottom:4px;flex-wrap:wrap">
              <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:600;color:var(--color-ink)">${o.nome}</p>
              ${o.periodo && o.periodo !== 'N/A' ? `<p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${o.periodo}</p>` : ''}
            </div>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${o.nota}</p>
          </div>
        `).join('')}
      </div>
    `;

    hdr.addEventListener('click', () => {
      const open = body.style.display !== 'block';
      body.style.display = open ? 'block' : 'none';
      hdr.setAttribute('aria-expanded', String(open));
      hdr.querySelector('.chev').style.transform = open ? 'rotate(180deg)' : '';
    });

    card.appendChild(hdr);
    card.appendChild(body);
    list.appendChild(card);
  });

  wrap.appendChild(list);

  const note = document.createElement('p');
  note.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-6);text-align:center';
  note.textContent = 'Exibindo 10 das 40 cadeiras — seleção por relevância literária. Lista completa em academia.org.br';
  wrap.appendChild(note);

  el.appendChild(wrap);
}

/* ================================================================
   PERFIL DE AUTOR
   ================================================================ */

export function renderAutorPerfil(authors, authorId, textsData, router) {
  const author = authors.find(a => a.id === authorId);

  if (!author) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<p>Autor não encontrado.</p><a href="#/modulo/literatura" class="btn btn-secondary">← Voltar</a>`;
    return el;
  }

  const page = document.createElement('div');
  page.style.maxWidth = 'var(--content-width)';

  page.innerHTML = `
    <a href="#/modulo/literatura" class="btn btn-ghost" style="margin-bottom:var(--space-6)">← Autores</a>

    <div style="border-bottom:3px solid var(--color-accent);padding-bottom:var(--space-6);margin-bottom:var(--space-8)">
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.1em;color:var(--color-accent);margin-bottom:var(--space-2)">${author.movement}</p>
      <h1 style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:700;margin-bottom:var(--space-2)">${author.name}</h1>
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">${author.nationality} · ${author.birth}–${author.death}</p>
    </div>

    <blockquote class="author-quote">${author.signature_quote}</blockquote>

    <section style="margin-bottom:var(--space-8)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Quem foi</h2>
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">${author.short_bio}</p>
    </section>

    <section style="margin-bottom:var(--space-8)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Como escreve</h2>
      <div class="panel">
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">${author.style}</p>
      </div>
    </section>

    <section style="margin-bottom:var(--space-8)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Contexto histórico</h2>
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">${author.context}</p>
    </section>

    <section style="margin-bottom:var(--space-8)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Obras</h2>
      <div id="works-list"></div>
    </section>

    <section id="gutenberg-section" style="margin-bottom:var(--space-8)"></section>

    <section id="author-texts-section" style="margin-bottom:var(--space-8)"></section>
  `;

  // Lista de obras
  const worksList = page.querySelector('#works-list');
  const gutenbergWorks = author.gutenberg_works ?? [];

  author.key_works.forEach(work => {
    const gutenbergEntry = gutenbergWorks.find(g => g.title === work.title);
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-bottom:1px solid var(--color-paper-border);gap:var(--space-4);flex-wrap:wrap';
    row.innerHTML = `
      <div style="flex:1">
        <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink)">${work.title}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${work.genre}</p>
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-3)">
        <span style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">${work.year}</span>
        ${gutenbergEntry
          ? `<button type="button" class="btn btn-secondary" style="font-size:var(--text-xs);padding:var(--space-1) var(--space-3)"
               data-gutenberg-id="${gutenbergEntry.gutenberg_id}" data-work-title="${work.title}">
               Ler trecho
             </button>`
          : ''}
      </div>
    `;
    worksList.appendChild(row);
  });

  // Nota se não há obras no Gutenberg
  if (gutenbergWorks.length === 0) {
    const note = document.createElement('div');
    note.className = 'panel panel-info';
    note.style.marginTop = 'var(--space-4)';
    note.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">
      As obras deste autor ainda estão sob proteção de direitos autorais e não estão disponíveis para leitura direta.
    </p>`;
    worksList.appendChild(note);
  }

  // Lida com clicks nos botões "Ler trecho"
  const gutenbergSection = page.querySelector('#gutenberg-section');
  page.addEventListener('click', async e => {
    const btn = e.target.closest('[data-gutenberg-id]');
    if (!btn) return;

    const id    = parseInt(btn.dataset.gutenbergId, 10);
    const title = btn.dataset.workTitle;

    // Desativa botão enquanto carrega
    btn.disabled = true;
    btn.textContent = 'Carregando…';

    gutenbergSection.innerHTML = '';
    gutenbergSection.appendChild(buildExcerptLoading(title));
    gutenbergSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const result = await fetchGutenbergExcerpt(id, 4000);

    gutenbergSection.innerHTML = '';

    if (result.error || !result.found) {
      gutenbergSection.appendChild(buildExcerptError(title, id));
    } else {
      gutenbergSection.appendChild(buildExcerptViewer(result.title || title, result.text, id));
    }

    btn.disabled = false;
    btn.textContent = 'Ler trecho';
  });

  // Textos disponíveis no banco para este autor
  const authorTextsSection = page.querySelector('#author-texts-section');
  const authorTexts = (textsData?.texts ?? []).filter(t =>
    t.author && t.author.toLowerCase().includes(author.name.split(' ').pop().toLowerCase())
  );

  if (authorTexts.length > 0) {
    const heading = document.createElement('h2');
    heading.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)';
    heading.textContent = 'Textos disponíveis no Quintiliano';
    authorTextsSection.appendChild(heading);

    const LEVEL_LABEL = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' };
    const LEVEL_COLOR = { basico: 'var(--color-green)', intermediario: 'var(--color-gold)', avancado: 'var(--color-accent)' };

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-2)';

    authorTexts.forEach(text => {
      const row = document.createElement('a');
      row.href = `#/modulo/interpretacao`;
      row.style.cssText = `
        display:flex;align-items:center;gap:var(--space-4);
        padding:var(--space-4) var(--space-5);
        border:1px solid var(--color-paper-border);
        border-radius:var(--radius);
        background:var(--color-paper-dark);
        text-decoration:none;
        transition:background var(--transition-fast), border-color var(--transition-fast);
      `;
      row.innerHTML = `
        <div style="flex:1">
          <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink);margin-bottom:2px">${text.title}</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${text.genre} · ${text.year}</p>
        </div>
        <span style="
          font-family:var(--font-ui);font-size:var(--text-xs);font-weight:600;
          color:${LEVEL_COLOR[text.level] ?? 'var(--color-ink-ghost)'};
          background:var(--color-paper);
          border:1px solid currentColor;
          border-radius:var(--radius);
          padding:2px 8px;flex-shrink:0;
        ">${LEVEL_LABEL[text.level] ?? text.level}</span>
        <span style="font-size:var(--text-sm);color:var(--color-ink-ghost);flex-shrink:0">→</span>
      `;
      row.addEventListener('mouseenter', () => {
        row.style.background = 'var(--color-paper)';
        row.style.borderColor = 'var(--color-accent)';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = 'var(--color-paper-dark)';
        row.style.borderColor = 'var(--color-paper-border)';
      });
      list.appendChild(row);
    });

    authorTextsSection.appendChild(list);

    const note = document.createElement('p');
    note.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-3)';
    note.textContent = 'Os textos abrem no módulo Interpretação, onde é possível analisá-los com exercícios.';
    authorTextsSection.appendChild(note);
  }

  return page;
}

/* ================================================================
   VISOR DE TRECHO DO GUTENBERG
   ================================================================ */

function buildExcerptLoading(title) {
  const el = document.createElement('div');
  el.className = 'card';
  el.style.cssText = 'text-align:center;padding:var(--space-8)';
  el.innerHTML = `
    <p style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-ink-mid);margin-bottom:var(--space-3)">${title}</p>
    <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">Carregando do Project Gutenberg…</p>
  `;
  return el;
}

function buildExcerptError(title, id) {
  const el = document.createElement('div');
  el.className = 'panel';
  el.innerHTML = `
    <p style="font-family:var(--font-ui);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2)">Não foi possível carregar o texto</p>
    <p style="font-family:var(--font-body);color:var(--color-ink-mid)">Verifique sua conexão ou acesse diretamente:</p>
    <a href="https://www.gutenberg.org/ebooks/${id}" target="_blank" rel="noopener"
       class="btn btn-secondary" style="margin-top:var(--space-3);display:inline-flex">
      Abrir no Project Gutenberg →
    </a>
  `;
  return el;
}

function buildExcerptViewer(title, text, gutenbergId) {
  const wrapper = document.createElement('div');

  // Cabeçalho do visor
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-3);margin-bottom:var(--space-4)';
  header.innerHTML = `
    <div>
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl)">${title}</h3>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">
        Trecho inicial · Project Gutenberg #${gutenbergId}
      </p>
    </div>
    <a href="https://www.gutenberg.org/ebooks/${gutenbergId}" target="_blank" rel="noopener"
       class="btn btn-secondary" style="font-size:var(--text-xs)">Obra completa →</a>
  `;
  wrapper.appendChild(header);

  // Texto do trecho
  const textBox = document.createElement('div');
  textBox.style.cssText = `
    background:var(--color-paper);
    border:1px solid var(--color-paper-border);
    border-radius:var(--radius);
    padding:var(--space-8);
    max-height:500px;
    overflow-y:auto;
    font-family:var(--font-body);
    font-size:var(--text-base);
    line-height:1.9;
    color:var(--color-ink-mid);
    white-space:pre-wrap;
    word-break:break-word;
  `;
  textBox.setAttribute('tabindex', '0');
  textBox.setAttribute('role', 'region');
  textBox.setAttribute('aria-label', `Trecho de ${title}`);
  textBox.textContent = text;
  wrapper.appendChild(textBox);

  // Nota de domínio público
  const note = document.createElement('p');
  note.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-3);text-align:right';
  note.textContent = 'Obra em domínio público · texto via Project Gutenberg · cache de 7 dias';
  wrapper.appendChild(note);

  return wrapper;
}
