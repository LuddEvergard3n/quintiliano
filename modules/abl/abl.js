/**
 * abl.js — Academia Brasileira de Letras
 *
 * Duas abas:
 *   1. Contexto histórico — fatos, contexto, análise
 *   2. Cadeiras           — 10 cadeiras com patrono e ocupantes notáveis
 *
 * Dados declarados neste módulo. Sem dependências externas.
 * Estilos de escopo declarados via <style> injetado no render.
 */

/* ================================================================
   DADOS — CONTEXTO HISTÓRICO
   ================================================================ */

const CONTEXTO = [
  {
    titulo: 'Fundação',
    texto: 'A ABL foi fundada em 20 de julho de 1897 no Rio de Janeiro por iniciativa de Machado de Assis e outros 39 escritores. O modelo foi a Académie française (1635). Cada fundador escolheu um patrono — escritor do passado que batizaria sua cadeira para sempre.',
  },
  {
    titulo: 'Estrutura',
    texto: 'São 40 cadeiras permanentes. Cada uma tem um patrono imutável (escolhido em 1897) e uma sequência de ocupantes eleitos pelos membros. A eleição exige maioria absoluta — candidatos disputam por anos antes de ser aceitos.',
  },
  {
    titulo: 'Mulheres na ABL',
    texto: 'Durante 80 anos a ABL foi exclusivamente masculina. Rachel de Queiroz foi a primeira mulher eleita, em 1977. Nélida Piñon foi a primeira a presidir a instituição (1996–1997). A exclusão histórica é parte constitutiva da instituição.',
  },
  {
    titulo: 'Recusas e rejeições notáveis',
    texto: 'Carlos Drummond de Andrade foi eleito para a cadeira 38 em 1945 e recusou — considerou a solenidade acadêmica incompatível com seu temperamento. Lima Barreto tentou ser eleito repetidas vezes e foi sistematicamente preterido. Cora Coralina candidatou-se aos 85 anos e também não foi eleita.',
  },
];

/* ================================================================
   DADOS — CADEIRAS
   ================================================================ */

const CADEIRAS = [
  {
    numero: 1, patrono: 'Adelino Fontoura',
    patrono_nota: 'Poeta português radicado no Brasil, figura do romantismo tardio.',
    ocupantes: [
      { nome: 'Luís Murat', periodo: '1897–1929', nota: 'Poeta parnasiano, um dos 40 fundadores.' },
      { nome: 'Murilo Mendes', periodo: '1942–1949 (eleito)', nota: 'Poeta modernista de viés religioso e surrealista. Recusou a posse.' },
      { nome: 'Cláudio Murilo Leal', periodo: '2004–atual', nota: 'Crítico literário e biógrafo.' },
    ],
  },
  {
    numero: 2, patrono: 'Álvares de Azevedo',
    patrono_nota: 'Poeta romântico paulistano (1831–1852). Morreu aos 20 anos. "Lira dos Vinte Anos".',
    ocupantes: [
      { nome: 'Coelho Neto', periodo: '1897–1934', nota: '"O rei da prosa" — o escritor mais popular do início do século XX. Mário de Andrade o via como símbolo do parnasianismo em prosa, ornamental e vazio.' },
      { nome: 'Lygia Fagundes Telles', periodo: '1985–2022', nota: '"As Meninas" (1973) e "Ciranda de Pedra" (1954). Uma das maiores contistas brasileiras. Ocupou a cadeira por 37 anos.' },
    ],
  },
  {
    numero: 3, patrono: 'Artur de Oliveira',
    patrono_nota: 'Poeta e tradutor fluminense (1851–1882), introdutor do simbolismo no Brasil.',
    destaque: {
      nome: 'Machado de Assis',
      subtitulo: 'Fundador, primeiro presidente vitalício e maior nome da literatura brasileira',
      bio: 'Joaquim Maria Machado de Assis nasceu no Rio de Janeiro em 1839, filho de um mulato e uma portuguesa das Ilhas. Autodidata, epiléptico, gago, pobre — e ainda assim o escritor que redefiniu o que a prosa brasileira podia fazer. Morreu em 1908, após 11 anos presidindo a instituição que fundou.',
      estilo: 'Narrador não confiável, ironia de superfície calma e fundo corrosivo, foco implacável nas convenções sociais e na hipocrisia da classe média carioca. A partir de "Memórias Póstumas de Brás Cubas" (1881), inaugura uma voz narrativa que fala diretamente ao leitor — e o engana com elegância.',
      legado_abl: 'Machado não apenas fundou a ABL: propôs o nome, redigiu os estatutos, escolheu o modelo (a Académie française), selecionou os 40 fundadores e presidiu todas as sessões até sua morte. A instituição é, em parte, um projeto pessoal dele. Optou pela cadeira 3 — patrono Artur de Oliveira, amigo pessoal — em vez de escolher Eça de Queirós ou Camões.',
      obras: [
        { titulo: 'Memórias Póstumas de Brás Cubas', ano: 1881, nota: 'Marco de ruptura: narrador morto, capítulos de uma linha, metalinguagem. O romance que encerrou o Romantismo e inventou o Realismo brasileiro num único livro.' },
        { titulo: 'Dom Casmurro', ano: 1899, nota: 'O narrador mais debatido da literatura brasileira. Capitu é culpada? A questão é insolúvel — e esse é o ponto. A ambiguidade é o tema, não o enredo.' },
        { titulo: 'O Alienista', ano: 1882, nota: 'Simão Bacamarte interna meio município no hospício — incluindo a si mesmo. Sátira à razão científica, ao poder médico e à loucura da normalidade.' },
      ],
      citacao: '"Cada cousa em seu tempo; ao polvo o polvo, ao marisco o marisco."',
      curiosidade: 'A cadeira 3 ficou vaga por 20 anos após a morte de Machado — sinal tácito de que ninguém se sentia apto a ocupá-la imediatamente.',
    },
    ocupantes: [
      { nome: 'Machado de Assis', periodo: '1897–1908', nota: 'Fundador e único presidente vitalício. Escolheu o próprio patrono e ocupou a cadeira — caso único na história da instituição.' },
      { nome: 'Alcântara Machado', periodo: '1928–1935', nota: 'Modernista paulistano. "Brás, Bexiga e Barra Funda" (1927).' },
      { nome: 'Austregésilo de Athayde', periodo: '1952–1998', nota: 'Jornalista e ensaísta. Presidiu a ABL por décadas.' },
    ],
  },
  {
    numero: 7, patrono: 'Castro Alves',
    patrono_nota: 'O "Poeta dos Escravos" (1847–1871). "O Navio Negreiro". Romantismo de cunho social.',
    ocupantes: [
      { nome: 'Olavo Bilac', periodo: '1897–1918', nota: 'O maior parnasiano brasileiro. "Profissão de Fé". Escreveu a letra do Hino à Bandeira.' },
      { nome: 'Guilherme de Almeida', periodo: '1930–1969', nota: 'Poeta modernista paulistano, tradutor de Shakespeare.' },
      { nome: 'Ferreira Gullar', periodo: '1989–2016', nota: '"Poema Sujo" (1976), escrito no exílio em Buenos Aires durante a ditadura militar.' },
    ],
  },
  {
    numero: 15, patrono: 'Gonçalves Dias',
    patrono_nota: 'O maior poeta do romantismo brasileiro (1823–1864). "I-Juca Pirama" e "Canção do Exílio".',
    ocupantes: [
      { nome: 'José Veríssimo', periodo: '1897–1916', nota: '"História da Literatura Brasileira" (1916) — primeiro estudo sistemático e ainda referência.' },
      { nome: 'Gilberto Freyre', periodo: '1947–1987', nota: '"Casa Grande & Senzala" (1933) — obra central e controversa sobre a formação cultural brasileira.' },
      { nome: 'Nélida Piñon', periodo: '1990–2023', nota: '"A República dos Sonhos" (1984). Primeira mulher a presidir a ABL (1996–1997).' },
    ],
  },
  {
    numero: 23, patrono: 'José de Alencar',
    patrono_nota: 'O fundador do romance brasileiro (1829–1877). "O Guarani", "Iracema", "Senhora".',
    ocupantes: [
      { nome: 'Rui Barbosa', periodo: '1897–1923', nota: 'Jurista e orador. Defensor do purismo linguístico absoluto.' },
      { nome: 'Zélia Gattai', periodo: '2001–2008', nota: 'Escritora e memorialista, viúva de Jorge Amado. "Anarquistas Graças a Deus" (1979).' },
    ],
  },
  {
    numero: 32, patrono: 'Raul Pompeia',
    patrono_nota: 'Romancista fluminense (1863–1895). "O Ateneu" (1888) — crítica ao sistema escolar. Suicidou-se aos 32 anos.',
    ocupantes: [
      { nome: 'Graça Aranha', periodo: '1897–1931', nota: '"Canaã" (1902) — debate sobre imigração europeia e o futuro do Brasil.' },
      { nome: 'Jorge Amado', periodo: '1961–2001', nota: 'O escritor brasileiro mais traduzido. "Gabriela, Cravo e Canela" (1958), "Dona Flor e Seus Dois Maridos" (1966).' },
      { nome: 'João Ubaldo Ribeiro', periodo: '2008–2014', nota: '"Viva o Povo Brasileiro" (1984) — épico da formação nacional narrado pelos de baixo.' },
    ],
  },
  {
    numero: 38, patrono: 'Álvaro de Azevedo',
    patrono_nota: 'Jurista e professor paraibano (1872–1906).',
    ocupantes: [
      { nome: 'Sílvio Romero', periodo: '1897–1914', nota: '"História da Literatura Brasileira" (1888) — primeiro estudo sistemático do campo.' },
      { nome: 'Carlos Drummond de Andrade', periodo: '1945 — recusou', nota: 'Eleito e recusou. Considerou o ambiente acadêmico incompatível com seu temperamento. Nunca integrou a ABL.' },
      { nome: 'Cora Coralina', periodo: 'Candidatura — 1981', nota: 'Candidatou-se aos 85 anos e não foi eleita — episódio que expôs o conservadorismo da instituição.' },
    ],
  },
  {
    numero: 39, patrono: 'Eça de Queirós',
    patrono_nota: 'O maior romancista português (1845–1900). "O Crime do Padre Amaro", "Os Maias". Único patrono estrangeiro — marca do vínculo com a tradição lusitana.',
    ocupantes: [
      { nome: 'Medeiros e Albuquerque', periodo: '1897–1934', nota: 'Poeta, jornalista e político. Um dos 40 fundadores.' },
      { nome: 'Rachel de Queiroz', periodo: '1977–2003', nota: '"O Quinze" (1930), publicado aos 19 anos. Primeira mulher eleita para a ABL — depois de 80 anos de exclusão.' },
    ],
  },
  {
    numero: 40, patrono: 'Olavo Bilac',
    patrono_nota: 'Patrono da cadeira 40 e primeiro ocupante da cadeira 7 — homenagem dupla ao maior parnasiano brasileiro.',
    ocupantes: [
      { nome: 'Pedro Rabelo', periodo: '1897–1905', nota: 'Poeta simbolista, um dos fundadores.' },
      { nome: 'João Cabral de Melo Neto', periodo: '1969–1999', nota: '"Morte e Vida Severina" (1955), "A Educação pela Pedra" (1966). Poesia como arquitetura — sem ornamento, sem excesso.' },
      { nome: 'Cid Seixas', periodo: '2006–atual', nota: 'Poeta e ensaísta baiano.' },
    ],
  },
];

/* ================================================================
   ESTILOS DE ESCOPO
   ================================================================ */

const CSS = `
  .abl-tablist {
    display: flex;
    gap: var(--space-2);
    border-bottom: 2px solid var(--color-paper-border);
    margin-bottom: var(--space-8);
  }
  .abl-tab {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    padding: var(--space-3) var(--space-5);
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    background: none;
    cursor: pointer;
    white-space: nowrap;
    color: var(--color-ink-ghost);
    letter-spacing: 0.03em;
    transition: color 0.15s, border-color 0.15s;
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .abl-tab[aria-selected="true"] {
    color: var(--color-accent);
    border-bottom-color: var(--color-accent);
  }
  .abl-tab:hover { color: var(--color-ink); }

  .abl-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }
  .abl-stat {
    padding: var(--space-5);
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-top: 3px solid var(--color-gold);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .abl-stat-value {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-gold);
    line-height: 1;
  }
  .abl-stat-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    line-height: 1.4;
  }

  .abl-context-card {
    border: 1px solid var(--color-paper-border);
    border-left: 3px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-6);
    margin-bottom: var(--space-4);
    background: var(--color-paper);
    transition: border-left-color 0.15s;
  }
  .abl-context-card:last-of-type { margin-bottom: 0; }
  .abl-context-card:hover { border-left-color: var(--color-accent); }
  .abl-context-title {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: var(--space-3);
  }
  .abl-context-text {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-ink-mid);
    line-height: 1.8;
  }

  /* Cadeiras — accordion */
  .abl-chair-wrap { margin-bottom: var(--space-5); }

  .abl-chair-hdr {
    display: grid;
    grid-template-columns: 60px 1fr 36px;
    width: 100%;
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--color-paper);
    cursor: pointer;
    text-align: left;
    transition: box-shadow 0.15s;
  }
  .abl-chair-hdr:hover { box-shadow: var(--shadow-sm); }
  .abl-chair-hdr[aria-expanded="true"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: var(--shadow-sm);
  }

  .abl-chair-num {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-paper-dark);
    border-right: 1px solid var(--color-paper-border);
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-gold);
    flex-shrink: 0;
  }
  .abl-chair-meta {
    padding: var(--space-6) var(--space-6);
    min-width: 0;
  }
  .abl-chair-label {
    font-family: var(--font-ui);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-1);
  }
  .abl-chair-patrono {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: var(--space-2);
  }
  .abl-chair-nota {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-style: italic;
    color: var(--color-ink-mid);
    line-height: 1.5;
  }
  .abl-chair-chev {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-ink-ghost);
    font-size: 9px;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .abl-chair-hdr[aria-expanded="true"] .abl-chair-chev {
    transform: rotate(180deg);
  }

  .abl-chair-body {
    display: none;
    border: 1px solid var(--color-paper-border);
    border-top: none;
    border-radius: 0 0 var(--radius) var(--radius);
    background: var(--color-paper-dark);
    overflow: hidden;
  }
  .abl-ocupante {
    display: grid;
    grid-template-columns: 60px 1fr;
  }
  .abl-ocupante + .abl-ocupante { border-top: 1px solid var(--color-paper-border); }
  .abl-ocupante-gutter {
    border-right: 1px solid var(--color-paper-border);
    background: rgba(0,0,0,0.025);
  }
  .abl-ocupante-body {
    padding: var(--space-4) var(--space-6);
  }
  .abl-ocupante-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-2);
    margin-bottom: var(--space-1);
  }
  .abl-ocupante-nome {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-ink);
  }
  .abl-ocupante-periodo {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-gold);
    letter-spacing: 0.03em;
  }
  .abl-ocupante-nota {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.65;
  }

  .abl-footnote {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    text-align: center;
    margin-top: var(--space-6);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-paper-border);
  }

  @media (max-width: 768px) {
    .abl-stats { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Destaque Machado ─────────────────────────────────────── */
  .abl-destaque {
    border: 2px solid var(--color-gold);
    border-radius: var(--radius-lg);
    background: var(--color-paper-dark);
    padding: var(--space-8);
    margin-bottom: var(--space-8);
  }
  .abl-destaque-header {
    display: flex;
    align-items: flex-start;
    gap: var(--space-5);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-paper-border);
  }
  .abl-destaque-num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--color-gold);
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-paper);
    flex-shrink: 0;
  }
  .abl-destaque-nome {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-1);
  }
  .abl-destaque-subtitulo {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
  }
  .abl-destaque-citacao {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    font-style: italic;
    color: var(--color-ink-mid);
    border-left: 4px solid var(--color-gold);
    padding-left: var(--space-5);
    margin: 0 0 var(--space-6) 0;
  }
  .abl-destaque-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-6);
  }
  .abl-destaque-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-gold);
    margin-bottom: var(--space-2);
  }
  .abl-destaque-text {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
  }
  .abl-destaque-obras {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
  }
  .abl-destaque-obra {
    padding: var(--space-4) var(--space-5);
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-left: 3px solid var(--color-gold);
    border-radius: var(--radius);
  }
  .abl-destaque-obra-titulo {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: var(--space-1);
  }
  .abl-destaque-obra-ano {
    font-weight: 400;
    color: var(--color-ink-ghost);
    font-size: var(--text-sm);
  }
  .abl-destaque-obra-nota {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.65;
  }
  .abl-destaque-curiosidade {
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-5);
  }
  @media (max-width: 768px) {
    .abl-destaque { padding: var(--space-5); }
    .abl-destaque-grid { grid-template-columns: 1fr; }
  }
`;

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

export function renderABL() {
  const page = document.createElement('div');

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  const header = document.createElement('div');
  header.style.marginBottom = 'var(--space-8)';
  header.innerHTML = `
    <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
    <h1 class="section-title">Academia Brasileira de Letras</h1>
    <p style="max-width:var(--content-width);font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8">
      Fundada em 1897, a ABL é o principal espaço de consagração da literatura brasileira —
      e um espelho de seus preconceitos. Conhecer quem foi aceito, quem recusou
      e quem foi rejeitado diz tanto sobre a literatura quanto sobre o país.
    </p>
  `;
  page.appendChild(header);

  const tablist = document.createElement('div');
  tablist.className = 'abl-tablist';
  tablist.setAttribute('role', 'tablist');
  tablist.innerHTML = `
    <button class="abl-tab" role="tab" id="abl-tab-0" aria-selected="true">Contexto histórico</button>
    <button class="abl-tab" role="tab" id="abl-tab-1" aria-selected="false">Cadeiras</button>
  `;
  page.appendChild(tablist);

  const panel0 = document.createElement('div');
  panel0.id = 'abl-panel-0';
  const panel1 = document.createElement('div');
  panel1.id = 'abl-panel-1';
  panel1.style.display = 'none';
  page.appendChild(panel0);
  page.appendChild(panel1);

  renderContexto(panel0);
  renderCadeiras(panel1);

  const tab0 = tablist.children[0];
  const tab1 = tablist.children[1];
  [tab0, tab1].forEach((btn, i) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      tab0.setAttribute('aria-selected', String(i === 0));
      tab1.setAttribute('aria-selected', String(i === 1));
      panel0.style.display = i === 0 ? '' : 'none';
      panel1.style.display = i === 1 ? '' : 'none';
    });
  });

  return page;
}

function renderContexto(el) {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = 'var(--content-width)';

  const stats = document.createElement('div');
  stats.className = 'abl-stats';
  [
    ['1897',           'Fundação no Rio de Janeiro'],
    ['40',             'Cadeiras permanentes'],
    ['1977',           '1ª mulher eleita — Rachel de Queiroz'],
    ['1996',           '1ª mulher presidente — Nélida Piñon'],
    ['80 anos',        'Tempo até a 1ª mulher ser aceita'],
    ['academia.org.br','Acervo digital público'],
  ].forEach(([v, l]) => {
    stats.innerHTML += `
      <div class="abl-stat">
        <span class="abl-stat-value">${v}</span>
        <span class="abl-stat-label">${l}</span>
      </div>
    `;
  });
  wrap.appendChild(stats);

  CONTEXTO.forEach(b => {
    wrap.innerHTML += `
      <div class="abl-context-card">
        <p class="abl-context-title">${b.titulo}</p>
        <p class="abl-context-text">${b.texto}</p>
      </div>
    `;
  });

  el.appendChild(wrap);
}

function renderCadeiras(el) {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = 'var(--content-width)';

  wrap.innerHTML += `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-5)">
      10 cadeiras selecionadas por relevância literária — lista completa em academia.org.br
    </p>
  `;

  CADEIRAS.forEach(c => {
    // Cadeira com destaque (ex: Machado na cadeira 3): renderiza bloco especial antes do accordion
    if (c.destaque) {
      const d = c.destaque;
      const destEl = document.createElement('div');
      destEl.className = 'abl-destaque';
      destEl.innerHTML = `
        <div class="abl-destaque-header">
          <div class="abl-destaque-num">${c.numero}</div>
          <div>
            <p class="abl-destaque-nome">${d.nome}</p>
            <p class="abl-destaque-subtitulo">${d.subtitulo}</p>
          </div>
        </div>
        <blockquote class="abl-destaque-citacao">${d.citacao}</blockquote>
        <div class="abl-destaque-grid">
          <div>
            <p class="abl-destaque-label">Quem foi</p>
            <p class="abl-destaque-text">${d.bio}</p>
          </div>
          <div>
            <p class="abl-destaque-label">Como escreve</p>
            <p class="abl-destaque-text">${d.estilo}</p>
          </div>
        </div>
        <div style="margin-bottom:var(--space-6)">
          <p class="abl-destaque-label">Papel na ABL</p>
          <p class="abl-destaque-text">${d.legado_abl}</p>
        </div>
        <p class="abl-destaque-label" style="margin-bottom:var(--space-3)">Obras essenciais</p>
        <div class="abl-destaque-obras">
          ${d.obras.map(ob => `
            <div class="abl-destaque-obra">
              <p class="abl-destaque-obra-titulo">${ob.titulo} <span class="abl-destaque-obra-ano">(${ob.ano})</span></p>
              <p class="abl-destaque-obra-nota">${ob.nota}</p>
            </div>
          `).join('')}
        </div>
        <div class="abl-destaque-curiosidade">
          <p class="abl-destaque-label" style="margin-bottom:var(--space-2)">Curiosidade</p>
          <p class="abl-destaque-text">${d.curiosidade}</p>
        </div>
      `;
      wrap.appendChild(destEl);
    }

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.className = 'abl-chair-hdr';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.innerHTML = `
      <div class="abl-chair-num">${c.numero}</div>
      <div class="abl-chair-meta">
        <p class="abl-chair-label">Patrono</p>
        <p class="abl-chair-patrono">${c.patrono}</p>
        <p class="abl-chair-nota">${c.patrono_nota}</p>
      </div>
      <div class="abl-chair-chev">▼</div>
    `;

    const body = document.createElement('div');
    body.className = 'abl-chair-body';
    body.style.display = 'none';

    c.ocupantes.filter(o => o.nota).forEach(o => {
      body.innerHTML += `
        <div class="abl-ocupante">
          <div class="abl-ocupante-gutter"></div>
          <div class="abl-ocupante-body">
            <div class="abl-ocupante-head">
              <span class="abl-ocupante-nome">${o.nome}</span>
              ${o.periodo ? `<span class="abl-ocupante-periodo">${o.periodo}</span>` : ''}
            </div>
            <p class="abl-ocupante-nota">${o.nota}</p>
          </div>
        </div>
      `;
    });

    hdr.addEventListener('click', () => {
      const open = hdr.getAttribute('aria-expanded') !== 'true';
      hdr.setAttribute('aria-expanded', String(open));
      body.style.display = open ? 'block' : 'none';
    });

    const wrp = document.createElement('div');
    wrp.className = 'abl-chair-wrap';
    wrp.appendChild(hdr);
    wrp.appendChild(body);
    wrap.appendChild(wrp);
  });

  wrap.innerHTML += `
    <p class="abl-footnote">Exibindo 10 das 40 cadeiras — seleção por relevância literária.</p>
  `;

  el.appendChild(wrap);
}
