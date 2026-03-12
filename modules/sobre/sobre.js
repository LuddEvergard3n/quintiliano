/**
 * sobre.js — Sobre o Quintiliano
 *
 * Página de apresentação: origem do nome, filosofia, números do projeto
 * e o ecossistema educacional completo.
 *
 * Layout: Template 1 — coluna única estreita (860px).
 * O fundo do card usa rgba(..., 0.92) para não cortar visualmente
 * do papel de fundo — padrão do ecossistema.
 *
 * Sem dependências externas. CSS injetado no render.
 */

/* ================================================================
   DADOS — MÉTRICAS
   ================================================================ */

const METRICAS = [
  { valor: '18',  label: 'Rotas e módulos'          },
  { valor: '16',  label: 'Módulos temáticos'        },
  { valor: '66',  label: 'Testes automatizados'     },
  { valor: '34',  label: 'Textos no banco literário'},
  { valor: '71',  label: 'Exercícios declarados'    },
  { valor: '45',  label: 'Entradas etimológicas'    },
  { valor: '15',  label: 'Perfis de autores'        },
  { valor: '0',   label: 'Dependências externas'    },
];

/* ================================================================
   DADOS — ECOSSISTEMA
   Todos os 7 projetos, URLs verificadas
   ================================================================ */

const ECOSSISTEMA = [
  {
    nome:   'Heródoto',
    sub:    'História',
    desc:   'Visualização de eventos históricos em tempo, espaço e contexto. Grafos de causalidade e mapas narrativos.',
    url:    'https://luddevergard3n.github.io/Herodoto/',
    ativo:  false,
  },
  {
    nome:   'Euclides',
    sub:    'Matemática',
    desc:   'Raciocínio matemático manipulável. Geometria, álgebra e demonstrações interativas.',
    url:    'https://luddevergard3n.github.io/euclides/',
    ativo:  false,
  },
  {
    nome:   'Quintiliano',
    sub:    'Língua Portuguesa & Literatura',
    desc:   'Interpretação, gramática, retórica e literatura. O projeto que você está usando agora.',
    url:    'https://luddevergard3n.github.io/quintiliano/',
    ativo:  true,
  },
  {
    nome:   'Lavoisier',
    sub:    'Química',
    desc:   'Laboratório virtual de química. Reações, equações e tabela periódica interativa.',
    url:    'https://luddevergard3n.github.io/lavoisier/',
    ativo:  false,
  },
  {
    nome:   'Humboldt',
    sub:    'Geografia',
    desc:   'Mapas, biomas, clima e geopolítica. Visualização geográfica para o ensino de ciências humanas.',
    url:    'https://luddevergard3n.github.io/humboldt/',
    ativo:  false,
  },
  {
    nome:   'Archimedes',
    sub:    'Física',
    desc:   'Simulações de física clássica e moderna. Mecânica, eletromagnetismo e óptica interativa.',
    url:    'https://luddevergard3n.github.io/archimedes/',
    ativo:  false,
  },
  {
    nome:   'Johnson',
    sub:    'Inglês',
    desc:   'Língua inglesa como instrumento — gramática, vocabulário e literatura em inglês.',
    url:    'https://luddevergard3n.github.io/johnson-english/',
    ativo:  false,
  },
];

/* ================================================================
   CSS DE ESCOPO
   ================================================================ */

const CSS = `
  /* ── Wrapper de página ────────────────────────────────────── */
  .sobre-page {
    max-width: 860px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6) var(--space-16);
  }

  /* ── Card principal ───────────────────────────────────────── */
  /* rgba 0.92 → textura do fundo transparece sutilmente,
     mantendo continuidade com o papel — não corta visualmente */
  .sobre-card {
    background: rgba(245, 240, 232, 0.92);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    padding: var(--space-10) var(--space-12);
  }

  /* ── Título e subtítulo ───────────────────────────────────── */
  .sobre-h1 {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-2);
  }
  .sobre-subtitulo {
    font-family: var(--font-body);
    font-size: 1.05rem;
    font-style: italic;
    color: var(--color-ink-mid);
    line-height: 1.65;
    margin-bottom: var(--space-8);
  }

  /* ── Epígrafe ─────────────────────────────────────────────── */
  /* border-left em vez de aspas CSS — padrão acadêmico,
     mais elegante que guillemets sintéticos */
  .sobre-epigrafe {
    border-left: 3px solid var(--color-paper-border);
    padding: var(--space-3) var(--space-6);
    margin: var(--space-6) 0 var(--space-8);
    font-family: var(--font-body);
    font-style: italic;
    color: var(--color-ink-mid);  /* desbotado — sinaliza citação */
    line-height: 1.8;
  }
  .sobre-epigrafe cite {
    display: block;
    margin-top: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
    font-style: normal;
  }

  /* ── Títulos de seção ─────────────────────────────────────── */
  /* vermelho-sépia = vermelho-ocre do ecossistema;
     border-bottom com acento curto — padrão do ecossistema */
  .sobre-h2 {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-accent);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-6);
    margin-top: var(--space-10);
    border-bottom: 1px solid var(--color-paper-border);
    position: relative;
  }
  .sobre-h2::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0;
    width: 2.5rem; height: 1px;
    background: var(--color-accent);
  }
  .sobre-h2:first-of-type { margin-top: 0; }

  /* Badge de versão inline no h2 */
  .sobre-badge {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 700;
    font-variant: normal;
    background: var(--color-ink);
    color: var(--color-paper);
    padding: 2px var(--space-2);
    border-radius: var(--radius-sm);
    vertical-align: middle;
    margin-left: var(--space-3);
    letter-spacing: 0.02em;
  }

  /* ── Parágrafos ───────────────────────────────────────────── */
  .sobre-p {
    font-family: var(--font-body);
    font-size: 1.05rem;
    color: var(--color-ink-mid);
    line-height: 1.8;
    margin-bottom: var(--space-4);
  }

  /* ── Nota de destaque (dourado) ───────────────────────────── */
  /* Nível menor que aviso — informação complementar */
  .sobre-nota {
    background: rgba(184, 150, 12, 0.05);
    border-left: 3px solid var(--color-gold);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: var(--space-5) var(--space-6);
    margin: var(--space-5) 0;
  }
  .sobre-nota-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-gold);
    margin-bottom: var(--space-3);
  }
  .sobre-nota p {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
    margin-bottom: var(--space-2);
  }
  .sobre-nota p:last-child { margin-bottom: 0; }

  /* ── Princípios filosóficos ───────────────────────────────── */
  .sobre-principios {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin: var(--space-5) 0;
  }
  .sobre-principio {
    display: flex;
    gap: var(--space-5);
    align-items: flex-start;
    padding: var(--space-4) var(--space-5);
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
  }
  .sobre-principio-num {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-paper-border);
    flex-shrink: 0;
    line-height: 1;
    padding-top: 3px;
  }
  .sobre-principio-titulo {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-1);
  }
  .sobre-principio-texto {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.7;
  }

  /* ── Grid de métricas ─────────────────────────────────────── */
  /* auto-fit minmax: 4 colunas em 860px, colapsa naturalmente */
  .sobre-metricas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: var(--space-3);
    margin: var(--space-5) 0 var(--space-6);
  }
  .sobre-metrica {
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-4) var(--space-5);
    text-align: center;
  }
  /* gold = azul-lapislazuli do ecossistema:
     "dado relevante mas não hierárquico" */
  .sobre-metrica-valor {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-gold);
    display: block;
    margin-bottom: var(--space-1);
  }
  .sobre-metrica-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    letter-spacing: 0.04em;
  }

  /* ── Rodapé de código aberto ──────────────────────────────── */
  .sobre-opensource {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
    border-top: 1px solid var(--color-paper-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .sobre-opensource p {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
  }
  .sobre-opensource a { color: var(--color-ink-ghost); text-decoration: underline; }
  .sobre-opensource a:hover { color: var(--color-ink); }

  /* ── Seção Ecossistema — fundo escuro, fora do card ──────── */
  /* Posicionada fora do .sobre-card, fundo ink comunica
     "contexto externo ao projeto" — mesmo padrão do Heródoto */
  .sobre-eco {
    background: var(--color-ink);
    margin-top: var(--space-8);
    padding: var(--space-10) var(--space-12);
    border-radius: var(--radius);
  }
  .sobre-eco-titulo {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-paper);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-2);
  }
  .sobre-eco-sub {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-8);
    line-height: 1.6;
  }
  .sobre-eco-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-4);
  }
  /* Opacidade muito baixa: cards quase desaparecem no fundo
     escuro e só ganham presença no hover — evita peso visual */
  .sobre-eco-card {
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius);
    padding: var(--space-4) var(--space-5);
    background: rgba(255,255,255,0.02);
    text-decoration: none;
    display: block;
    transition: border-color var(--transition-fast), background var(--transition-fast);
  }
  .sobre-eco-card:hover {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.06);
  }
  /* Ativo: não é clicável — já estamos nele */
  .sobre-eco-card--ativo {
    border-color: rgba(184,150,12,0.4);
    cursor: default;
    pointer-events: none;
  }
  .sobre-eco-nome {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-paper);
    margin-bottom: 2px;
  }
  .sobre-eco-card--ativo .sobre-eco-nome { color: var(--color-gold); }
  .sobre-eco-sub-txt {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-gold);
    margin-bottom: var(--space-3);
  }
  .sobre-eco-card--ativo .sobre-eco-sub-txt { color: var(--color-ink-ghost); }
  .sobre-eco-desc {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    .sobre-card { padding: var(--space-6) var(--space-5); }
    .sobre-eco  { padding: var(--space-8) var(--space-5); }
    .sobre-h2   { margin-top: var(--space-8); }
    .sobre-opensource { flex-direction: column; align-items: flex-start; }
  }
`;

/* ================================================================
   RENDER
   ================================================================ */

/**
 * Renderiza a página Sobre o Quintiliano.
 * Template 1: coluna única estreita, card + bloco de ecossistema.
 * @returns {HTMLElement}
 */
export function renderSobre() {
  const page = document.createElement('div');
  page.className = 'sobre-page';

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  /* ── Card de conteúdo ─────────────────────────────────────── */
  const card = document.createElement('div');
  card.className = 'sobre-card';
  card.innerHTML = `
    <h1 class="sobre-h1">Quintiliano</h1>
    <p class="sobre-subtitulo">
      Ambiente interativo de Língua Portuguesa e Literatura para o ensino médio e fundamental.
      Interpretação, gramática, retórica, literatura e escrita — sem frameworks,
      sem dependências, sem cadastro obrigatório.
    </p>

    <blockquote class="sobre-epigrafe">
      "Que o orador seja acima de tudo um homem de bem — pois somente o
      homem de bem pode falar com excelência."
      <cite>— Marco Fábio Quintiliano, <em>Institutio Oratoria</em>, c. 95 d.C.</cite>
    </blockquote>

    <!-- O NOME ────────────────────────────────────────────── -->
    <h2 class="sobre-h2">O nome</h2>
    <div class="sobre-nota">
      <p class="sobre-nota-label">Marco Fábio Quintiliano (c. 35–100 d.C.)</p>
      <p>
        Quintiliano foi o primeiro professor público pago pelo Estado romano — nomeado por
        Vespasiano em 68 d.C. Sua obra central, <em>Institutio Oratoria</em> em doze livros,
        é o mais completo tratado de educação retórica da Antiguidade, influente do
        Renascimento ao século XVIII.
      </p>
      <p>
        O que distingue Quintiliano dos retóricos anteriores é a preocupação com o método:
        como ensinar, não apenas o que ensinar. Ele argumenta que a formação começa na
        infância, com o exemplo mais do que com a regra. O projeto herda essa orientação —
        a gramática não como fim em si mesma, mas como instrumento para pensar e comunicar
        com clareza.
      </p>
    </div>

    <!-- FILOSOFIA ─────────────────────────────────────────── -->
    <h2 class="sobre-h2">Filosofia do projeto</h2>
    <div class="sobre-principios">
      <div class="sobre-principio">
        <span class="sobre-principio-num">1</span>
        <div>
          <p class="sobre-principio-titulo">Instrumento, não conteúdo</p>
          <p class="sobre-principio-texto">
            O objetivo não é cobrir o conteúdo de português do ENEM — é desenvolver a
            capacidade de ler com profundidade, identificar estrutura e argumentar com
            precisão. A gramática aparece como ferramenta de análise, não como lista de
            regras a memorizar.
          </p>
        </div>
      </div>
      <div class="sobre-principio">
        <span class="sobre-principio-num">2</span>
        <div>
          <p class="sobre-principio-titulo">Análise antes de julgamento</p>
          <p class="sobre-principio-texto">
            O projeto prioriza perguntas sobre como um texto funciona antes de perguntas
            sobre se ele é bom. Identificar tom, estrutura, coesão e argumento é o trabalho
            central. A avaliação estética vem depois — e com mais base.
          </p>
        </div>
      </div>
      <div class="sobre-principio">
        <span class="sobre-principio-num">3</span>
        <div>
          <p class="sobre-principio-titulo">Zero dependência, zero cadastro</p>
          <p class="sobre-principio-texto">
            Sem login, sem servidor, sem rastreamento. Todos os dados são locais,
            carregados de arquivos JSON estáticos. Uma decisão de infraestrutura que é
            também uma posição pedagógica: a ferramenta precisa estar disponível para
            qualquer professor, em qualquer contexto.
          </p>
        </div>
      </div>
      <div class="sobre-principio">
        <span class="sobre-principio-num">4</span>
        <div>
          <p class="sobre-principio-titulo">Curadoria explícita</p>
          <p class="sobre-principio-texto">
            Todos os dados — textos, autores, etimologias, exercícios — são escolhas
            editoriais declaradas. Não há geração automática de conteúdo. O que está no
            banco foi incluído com critério e pode ser verificado, corrigido e contestado.
          </p>
        </div>
      </div>
    </div>

    <!-- NÚMEROS ───────────────────────────────────────────── -->
    <h2 class="sobre-h2">Números atuais <span class="sobre-badge">v0.20.0</span></h2>
    <div class="sobre-metricas">
      ${METRICAS.map(m => `
        <div class="sobre-metrica">
          <span class="sobre-metrica-valor">${m.valor}</span>
          <span class="sobre-metrica-label">${m.label}</span>
        </div>
      `).join('')}
    </div>

    <!-- REPOSITÓRIO ───────────────────────────────────────── -->
    <div class="sobre-opensource">
      <p>
        Código aberto, licença livre —
        <a href="https://github.com/LuddEvergard3n/quintiliano" target="_blank" rel="noopener">
          github.com/LuddEvergard3n/quintiliano
        </a>
      </p>
      <a href="https://github.com/LuddEvergard3n/quintiliano"
         target="_blank" rel="noopener"
         class="btn btn-secondary" style="flex-shrink:0">
        Ver no GitHub →
      </a>
    </div>
  `;

  /* ── Bloco do ecossistema — fora do card ──────────────────── */
  const eco = document.createElement('div');
  eco.className = 'sobre-eco';
  eco.innerHTML = `
    <p class="sobre-eco-titulo">Ecossistema educacional</p>
    <p class="sobre-eco-sub">
      O Quintiliano faz parte de um conjunto de ferramentas educacionais independentes,
      cada uma dedicada a uma disciplina — construídas com a mesma filosofia:
      sem dependências, sem cadastro, sem rastreamento.
    </p>
    <div class="sobre-eco-grid">
      ${ECOSSISTEMA.map(p => `
        <${p.ativo ? 'div' : `a href="${p.url}" target="_blank" rel="noopener"`}
           class="sobre-eco-card${p.ativo ? ' sobre-eco-card--ativo' : ''}">
          <p class="sobre-eco-nome">${p.nome}</p>
          <p class="sobre-eco-sub-txt">${p.sub}</p>
          <p class="sobre-eco-desc">${p.desc}</p>
        </${p.ativo ? 'div' : 'a'}>
      `).join('')}
    </div>
  `;

  page.appendChild(card);
  page.appendChild(eco);
  return page;
}
