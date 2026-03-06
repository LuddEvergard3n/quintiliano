/**
 * premios.js — Prêmios Literários
 *
 * Três prêmios que definem o reconhecimento da literatura em língua portuguesa:
 *   - Prêmio Camões     — o principal da lusofonia
 *   - Prêmio Jabuti     — o mais prestigioso do Brasil
 *   - Nobel de Literatura — o contexto global, com ênfase em lusófonos
 *
 * Para cada prêmio: história, critérios, vencedores notáveis com nota,
 * preteridos notáveis e o que o prêmio revela sobre o cânone que constrói.
 *
 * Dados declarados neste módulo. Sem dependências externas.
 * Estilos de escopo declarados via CSS injetado no render.
 */

/* ================================================================
   DADOS — PRÊMIOS
   ================================================================ */

const PREMIOS = [
  {
    id:       'camoes',
    nome:     'Prêmio Camões',
    sigla:    'CAM',
    pais:     'Brasil / Portugal',
    desde:    1989,
    periodo:  'Anual',
    tag:      'O prêmio da lusofonia',
    cor:      'var(--color-gold)',
    descricao: 'O mais importante prêmio literário da língua portuguesa. Criado em 1989 por acordo entre Brasil e Portugal, é concedido alternadamente a um autor de cada país — embora a regra não seja rígida. A dotação financeira é paga metade por cada governo. O objetivo declarado é reconhecer "obras de relevância para o patrimônio literário e cultural da língua portuguesa".',
    criterios: 'Conjunto da obra — não um livro específico. O autor deve ter publicado obra significativa em língua portuguesa. Não há inscrição: os candidatos são indicados por academias, universidades e entidades culturais dos países lusófonos. A comissão é binacional.',
    tensao: 'O prêmio espelha a tensão histórica entre Brasil e Portugal pela hegemonia cultural da língua. Os primeiros vencedores foram autores do cânone estabelecido; a partir dos anos 2000, autores africanos lusófonos começaram a aparecer — Pepetela (2009), Mia Couto (2013) — o que indica uma reconfiguração do que "lusófono" significa.',
    vencedores: [
      { nome: 'João Ubaldo Ribeiro',    ano: 1989, pais: 'Brasil',   nota: 'Primeiro vencedor. "Viva o Povo Brasileiro" (1984) é o livro pelo qual é mais lembrado — epopeia cômica e trágica da formação do Brasil. O prêmio reconheceu um autor que mistura erudição e linguagem popular de modo incomum.' },
      { nome: 'Sophia de Mello Breyner', ano: 1999, pais: 'Portugal', nota: 'A maior poeta portuguesa do século XX. Poesia de clareza clássica e rigor formal, influenciada pelo Mediterrâneo e pela luz. Menos lida no Brasil do que merece — o prêmio foi uma oportunidade de correção.' },
      { nome: 'José Saramago',          ano: 1995, pais: 'Portugal', nota: 'Quatro anos antes do Nobel. O prêmio Camões confirmou o que o Nobel consolidaria: Saramago é o maior romancista português do século XX. "Ensaio sobre a Cegueira" (1995) foi publicado no mesmo ano.' },
      { nome: 'Lygia Fagundes Telles',  ano: 2005, pais: 'Brasil',   nota: 'A maior contista brasileira viva. "As Meninas" e "Ciranda de Pedra" são marcos do romance psicológico. O Camões reconheceu tardiamente uma escritora que já era canônica.' },
      { nome: 'Pepetela',               ano: 2009, pais: 'Angola',   nota: 'Primeiro angolano a vencer. "As Aventuras de Ngunga" e "Mayombe" são pilares da literatura angolana. A vitória de Pepetela expandiu geograficamente o conceito do prêmio — não apenas Brasil e Portugal.' },
      { nome: 'Mia Couto',              ano: 2013, pais: 'Moçambique', nota: 'O autor moçambicano mais lido internacionalmente. "Terra Sonâmbula" é considerado um dos melhores romances africanos do século XX. Ganhou também o Neustadt Prize em 2014, quase um Nobel alternativo.' },
      { nome: 'Raduan Nassar',          ano: 2016, pais: 'Brasil',   nota: 'Autor de obra mínima e perfeita: "Lavoura Arcaica" (1975) e "Um Copo de Cólera" (1978). Abandonou a literatura para se dedicar à agropecuária — o prêmio chegou décadas depois de seus únicos livros.' },
      { nome: 'Chico Buarque',          ano: 2019, pais: 'Brasil',   nota: 'Músico e romancista. "Budapeste" (2003) e "O Irmão Alemão" (2014) são seus romances mais discutidos. O prêmio foi polêmico em Portugal — parte da imprensa considerou que Chico é antes de tudo compositor, não escritor.' },
    ],
    preteridos: [
      { nome: 'Clarice Lispector', obs: 'Morreu em 1977, doze anos antes do prêmio existir. O Camões chegou tarde demais para a maior escritora brasileira do século XX.' },
      { nome: 'João Guimarães Rosa', obs: 'Morreu em 1967. Outro nome que o prêmio nunca pôde reconhecer. A ausência de Guimarães Rosa e Clarice na lista de vencedores é um limite cronológico, não editorial.' },
      { nome: 'Conceição Evaristo', obs: 'Indicada repetidamente. Sua ausência na lista de vencedores é lida por parte da crítica como sinal das tensões de raça e gênero que ainda atravessam o cânone lusófono.' },
    ],
  },
  {
    id:       'jabuti',
    nome:     'Prêmio Jabuti',
    sigla:    'JAB',
    pais:     'Brasil',
    desde:    1959,
    periodo:  'Anual',
    tag:      'O mais antigo do Brasil',
    cor:      'var(--color-accent)',
    descricao: 'O prêmio literário mais antigo e mais prestigioso do Brasil. Concedido pela Câmara Brasileira do Livro (CBL) desde 1959, cobre ficção, não-ficção, poesia, infantojuvenil, tradução e outras categorias. O nome vem do jabuti — jaboti em tupi —, tartaruga símbolo de longevidade e sabedoria na mitologia indígena.',
    criterios: 'Os livros são inscritos pelas próprias editoras. Júris especializados por categoria avaliam as obras publicadas no ano anterior. O prêmio maior — Livro do Ano — é escolhido entre os vencedores das categorias principais. Diferente do Camões, avalia livros específicos, não conjunto da obra.',
    tensao: 'Por ser concedido por uma entidade do mercado editorial (a CBL representa editoras), o Jabuti sofre crítica recorrente de refletir poder comercial antes de mérito literário. Editoras grandes têm mais recursos para inscrever e promover candidaturas. Apesar disso, a lista de vencedores ao longo de 60 anos coincide em grande parte com o cânone da literatura brasileira contemporânea.',
    vencedores: [
      { nome: 'Grande Sertão: Veredas — Guimarães Rosa', ano: 1957, pais: 'Brasil', nota: 'O romance mais importante da literatura brasileira do século XX ganhou o Jabuti dois anos antes do prêmio ter esse nome (era "Prêmio Jabuti" desde 1959; as edições anteriores tinham outro formato). Referência que ancora a credibilidade histórica do prêmio.' },
      { nome: 'Avalovara — Osman Lins',                 ano: 1974, pais: 'Brasil', nota: 'Um dos romances experimentais mais ambiciosos da literatura brasileira. Osman Lins é menos lido do que merece — o Jabuti é um dos poucos reconhecimentos institucionais que recebeu em vida.' },
      { nome: 'A Hora da Estrela — Clarice Lispector',  ano: 1978, pais: 'Brasil', nota: 'Último romance de Clarice, publicado em 1977. Venceu o Jabuti postumamente — ela morreu em dezembro de 1977. O prêmio chegou quando ela já não estava.' },
      { nome: 'Estação Carandiru — Drauzio Varella',    ano: 1999, pais: 'Brasil', nota: 'Não-ficção que documentou a vida dentro do maior presídio da América Latina antes do massacre de 1992. Caso raro em que o Jabuti reconheceu jornalismo literário de alto impacto social.' },
      { nome: 'Leite Derramado — Chico Buarque',        ano: 2010, pais: 'Brasil', nota: 'Romance de narrador idoso que revisita a decadência de uma família aristocrática brasileira. Prosa mais depurada de Chico Buarque. O Jabuti confirmou o que o Camões repetiria em 2019.' },
      { nome: 'Torto Arado — Itamar Vieira Junior',     ano: 2020, pais: 'Brasil', nota: 'O romance mais vendido e mais premiado da literatura brasileira recente. Narra a história de duas irmãs em uma fazenda baiana onde o trabalho escravo sobreviveu disfarçado. Ganhou também o Leya e o Oceanos. Revelou um autor que antes era desconhecido do grande público.' },
      { nome: 'Quarenta Dias — Maria Valéria Rezende', ano: 2015, pais: 'Brasil', nota: 'Romance sobre uma nordestina que vai a Porto Alegre e perde o rumo. Prosa simples que esconde complexidade. A autora tinha mais de 60 anos quando publicou seu primeiro romance.' },
    ],
    preteridos: [
      { nome: 'Lima Barreto', obs: 'Morreu em 1922 — o Jabuti só existe a partir de 1959. Mas Lima Barreto foi ignorado pelo cânone de sua época; o prêmio teria sido improvável mesmo se existisse.' },
      { nome: 'Carolina Maria de Jesus', obs: '"Quarto de Despejo" (1960) foi publicado um ano depois da criação do Jabuti e vendeu mais de 100 mil exemplares no primeiro ano. Não foi premiado. A ausência diz algo sobre quais vozes o cânone de 1960 reconhecia.' },
      { nome: 'Hilda Hilst', obs: 'Uma das escritoras mais radicais da literatura brasileira do século XX. Obra densa, erótica, filosófica — pouco acessível ao mercado. O Jabuti nunca a premiou de forma significativa.' },
    ],
  },
  {
    id:       'nobel',
    nome:     'Nobel de Literatura',
    sigla:    'NOB',
    pais:     'Internacional',
    desde:    1901,
    periodo:  'Anual',
    tag:      'O prêmio impossível',
    cor:      'var(--color-ink-mid)',
    descricao: 'Concedido pela Academia Sueca desde 1901, o Nobel de Literatura é o prêmio literário com maior visibilidade e poder simbólico no mundo. Não avalia um livro — avalia "uma obra de tendência idealista de grande importância", segundo Alfred Nobel. Na prática, avalia conjunto da obra com peso para alcance internacional e, frequentemente, posicionamento político.',
    criterios: 'Candidatos são indicados por membros de academias literárias, professores universitários de literatura e linguística, e ex-laureados. A Academia Sueca delibera em segredo. Não há inscrição pública. As atas ficam seladas por 50 anos. O prêmio é dado em outubro; a cerimônia em dezembro, em Estocolmo.',
    tensao: 'A Academia Sueca tem viés histórico europeu e androcêntrico. Das 121 edições até 2024, apenas 17 mulheres venceram. A América Latina recebeu poucos prêmios relativos à sua produção literária. O Nobel é criticado por ignorar sistematicamente escritores africanos, asiáticos e da América Latina — e por ser influenciado por alinhamentos políticos (Sartre recusou em 1964; Pasternak foi forçado a recusar pela URSS em 1958).',
    vencedores: [
      { nome: 'José Saramago',      ano: 1998, pais: 'Portugal',  nota: 'O único escritor em língua portuguesa a receber o Nobel. A Academia citou "parábolas sustentadas pela imaginação, compaixão e ironia". "Ensaio sobre a Cegueira" havia sido publicado três anos antes. O governo português protestou em 1998 quando Saramago foi indicado — considerava "O Evangelho Segundo Jesus Cristo" uma blasfêmia. Saramago se mudou para Lanzarote em resposta.' },
      { nome: 'Gabriel García Márquez', ano: 1982, pais: 'Colômbia', nota: 'Não é de língua portuguesa, mas é o único latino-americano de língua espanhola comparável em peso ao que Saramago representa para o português. "Cem Anos de Solidão" (1967) é a referência. A proximidade geográfica e literária com o realismo mágico brasileiro torna sua influência relevante para entender a recepção do Nobel na América Latina.' },
      { nome: 'Albert Camus',        ano: 1957, pais: 'França',    nota: 'Incluído para contraste: Camus recebeu o Nobel aos 43 anos, um dos mais jovens. Sua influência no existencialismo literário brasileiro — especialmente em Clarice Lispector e Graciliano Ramos — é direta e documentada. Um Nobel que ajuda a entender o contexto intelectual dos escritores brasileiros do período.' },
    ],
    preteridos: [
      { nome: 'Jorge Luis Borges', obs: 'O caso mais discutido de Nobel negado. Borges foi indicado repetidas vezes; acredita-se que seu apoio a ditaduras latino-americanas (incluindo Pinochet) tenha pesado contra. Morreu em 1986 sem o prêmio. Sua influência na literatura de língua portuguesa — especialmente em Guimarães Rosa e Saramago — é inegável.' },
      { nome: 'Clarice Lispector', obs: 'Nunca indicada formalmente (as atas são secretas), mas sistematicamente citada como ausência injustificável. Parte da explicação é cronológica — o Nobel raramente premia autores desconhecidos do público sueco, e Clarice foi traduzida tardiamente para o inglês. Parte é a barreira estrutural da Academia para literatura não-europeia.' },
      { nome: 'João Guimarães Rosa', obs: 'Morreu em 1967, três dias após ser empossado na ABL. Há relatos de que estava sendo considerado pela Academia Sueca. O Nobel não é concedido postumamente — a morte encerrou uma candidatura que teria sido historicamente justa.' },
      { nome: 'Mia Couto',          obs: 'O mais próximo da lusofonia de receber o prêmio atualmente. Ganhou o Neustadt Prize em 2014 — considerado o "Nobel americano". Traduzido para mais de 30 línguas. Candidatura crescente e reconhecida.' },
    ],
  },
];

/* ================================================================
   CSS DE ESCOPO
   ================================================================ */

const CSS = `
  .prl-page {
    max-width: var(--content-width);
  }
  .prl-intro {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-ink-mid);
    line-height: 1.8;
    margin-bottom: var(--space-10);
  }

  /* ── Tabs de prêmio ───────────────────────────────────────── */
  .prl-tabs {
    display: flex;
    gap: var(--space-2);
    border-bottom: 2px solid var(--color-paper-border);
    margin-bottom: var(--space-8);
    flex-wrap: wrap;
  }
  .prl-tab {
    padding: var(--space-3) var(--space-5);
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    cursor: pointer;
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-ink-ghost);
    transition: color var(--transition-fast), border-color var(--transition-fast);
    white-space: nowrap;
  }
  .prl-tab:hover { color: var(--color-ink); }
  .prl-tab.active {
    color: var(--color-ink);
    border-bottom-color: var(--color-accent);
  }
  .prl-tab[data-cor="var(--color-gold)"].active    { border-bottom-color: var(--color-gold); }
  .prl-tab[data-cor="var(--color-accent)"].active  { border-bottom-color: var(--color-accent); }
  .prl-tab[data-cor="var(--color-ink-mid)"].active { border-bottom-color: var(--color-ink-mid); }

  /* ── Painel de prêmio ─────────────────────────────────────── */
  .prl-panel { display: none; }
  .prl-panel.active { display: block; }

  .prl-header {
    display: flex;
    align-items: flex-start;
    gap: var(--space-5);
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-paper-border);
  }
  .prl-sigla {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius);
    font-family: var(--font-display);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-paper);
    flex-shrink: 0;
    letter-spacing: 0.03em;
  }
  .prl-header-meta {}
  .prl-nome {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-2);
  }
  .prl-meta-row {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }
  .prl-meta-item {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
  }
  .prl-meta-item strong {
    color: var(--color-ink-mid);
    font-weight: 600;
  }
  .prl-tag {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    padding: 2px var(--space-2);
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius-sm);
    color: var(--color-ink-ghost);
  }

  /* ── Seções de texto ──────────────────────────────────────── */
  .prl-section { margin-bottom: var(--space-8); }
  .prl-section-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-3);
  }
  .prl-text {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
  }
  .prl-tensao {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
    padding: var(--space-5);
    background: var(--color-paper-dark);
    border-left: 3px solid var(--color-paper-border);
    border-radius: var(--radius);
  }

  /* ── Lista de vencedores ──────────────────────────────────── */
  .prl-vencedores {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .prl-vencedor {
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .prl-v-hdr {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    width: 100%;
    padding: var(--space-4) var(--space-5);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background var(--transition-fast);
  }
  .prl-v-hdr:hover { background: var(--color-paper-dark); }
  .prl-v-ano {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-ink-ghost);
    min-width: 44px;
    flex-shrink: 0;
  }
  .prl-v-meta { flex: 1; }
  .prl-v-nome {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-ink);
  }
  .prl-v-pais {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
  }
  .prl-v-chev {
    font-size: 10px;
    color: var(--color-ink-ghost);
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .prl-v-body {
    padding: var(--space-4) var(--space-5);
    border-top: 1px solid var(--color-paper-border);
    background: var(--color-paper-dark);
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
  }

  /* ── Preteridos ───────────────────────────────────────────── */
  .prl-preteridos {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .prl-preterido {
    padding: var(--space-4) var(--space-5);
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-left: 3px solid var(--color-paper-border);
    border-radius: var(--radius);
  }
  .prl-p-nome {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: var(--space-2);
  }
  .prl-p-obs {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    .prl-tabs { gap: var(--space-1); }
    .prl-tab  { padding: var(--space-2) var(--space-3); font-size: var(--text-xs); }
    .prl-nome { font-size: var(--text-xl); }
    .prl-v-hdr { padding: var(--space-3) var(--space-4); }
    .prl-v-body { padding: var(--space-3) var(--space-4); }
  }
`;

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

/**
 * Renderiza o módulo Prêmios Literários.
 * @returns {HTMLElement}
 */
export function renderPremios() {
  const page = document.createElement('div');
  page.className = 'prl-page';

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  // Cabeçalho da página
  const header = document.createElement('div');
  header.style.marginBottom = 'var(--space-8)';
  header.innerHTML = `
    <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
    <h1 class="section-title">Prêmios Literários</h1>
    <p class="prl-intro">
      Três prêmios que definem o reconhecimento da literatura em língua portuguesa:
      o Camões — da lusofonia —, o Jabuti — do Brasil — e o Nobel — o horizonte global
      que só um escritor lusófono alcançou. Para cada um: história, critérios, vencedores
      notáveis com contexto e os preteridos que revelam o que o prêmio ainda não conseguiu ver.
    </p>
  `;
  page.appendChild(header);

  // Tabs
  const tabBar = document.createElement('div');
  tabBar.className = 'prl-tabs';
  tabBar.setAttribute('role', 'tablist');

  // Painéis
  const paineis = [];

  PREMIOS.forEach((p, i) => {
    // Tab
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'prl-tab' + (i === 0 ? ' active' : '');
    tab.textContent = p.nome;
    tab.dataset.cor = p.cor;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `prl-panel-${p.id}`);
    tabBar.appendChild(tab);

    // Painel
    const painel = document.createElement('div');
    painel.className = 'prl-panel' + (i === 0 ? ' active' : '');
    painel.id = `prl-panel-${p.id}`;
    painel.setAttribute('role', 'tabpanel');

    // Cabeçalho do prêmio
    painel.innerHTML = `
      <div class="prl-header">
        <div class="prl-sigla" style="background:${p.cor}">${p.sigla}</div>
        <div class="prl-header-meta">
          <p class="prl-nome">${p.nome}</p>
          <div class="prl-meta-row">
            <span class="prl-meta-item"><strong>Desde</strong> ${p.desde}</span>
            <span class="prl-meta-item"><strong>Periodicidade</strong> ${p.periodo}</span>
            <span class="prl-meta-item"><strong>País</strong> ${p.pais}</span>
            <span class="prl-tag">${p.tag}</span>
          </div>
        </div>
      </div>

      <div class="prl-section">
        <p class="prl-section-label">O que é</p>
        <p class="prl-text">${p.descricao}</p>
      </div>

      <div class="prl-section">
        <p class="prl-section-label">Como funciona</p>
        <p class="prl-text">${p.criterios}</p>
      </div>

      <div class="prl-section">
        <p class="prl-section-label">O que o prêmio revela</p>
        <p class="prl-tensao">${p.tensao}</p>
      </div>

      <div class="prl-section">
        <p class="prl-section-label" style="margin-bottom:var(--space-4)">Vencedores notáveis</p>
        <div class="prl-vencedores" id="prl-v-${p.id}"></div>
      </div>

      <div class="prl-section">
        <p class="prl-section-label" style="margin-bottom:var(--space-4)">Ausências notáveis</p>
        <div class="prl-preteridos">
          ${p.preteridos.map(pr => `
            <div class="prl-preterido">
              <p class="prl-p-nome">${pr.nome}</p>
              <p class="prl-p-obs">${pr.obs}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    paineis.push({ tab, painel, p });
  });

  // Adiciona tabBar e painéis na ordem correta (após style e header)
  page.appendChild(tabBar);
  paineis.forEach(({ painel }) => page.appendChild(painel));

  // Popula vencedores com accordion
  paineis.forEach(({ painel, p }) => {
    const container = painel.querySelector(`#prl-v-${p.id}`);
    if (!container) return;

    p.vencedores.forEach(v => {
      const item = document.createElement('div');
      item.className = 'prl-vencedor';

      const hdr = document.createElement('button');
      hdr.type = 'button';
      hdr.className = 'prl-v-hdr';
      hdr.setAttribute('aria-expanded', 'false');
      hdr.innerHTML = `
        <span class="prl-v-ano">${v.ano}</span>
        <div class="prl-v-meta">
          <p class="prl-v-nome">${v.nome}</p>
          <p class="prl-v-pais">${v.pais}</p>
        </div>
        <span class="prl-v-chev" aria-hidden="true">▼</span>
      `;

      const body = document.createElement('div');
      body.className = 'prl-v-body';
      body.style.display = 'none';
      body.textContent = v.nota;

      hdr.addEventListener('click', () => {
        const open = body.style.display !== 'block';
        body.style.display = open ? 'block' : 'none';
        hdr.setAttribute('aria-expanded', String(open));
        hdr.querySelector('.prl-v-chev').style.transform = open ? 'rotate(180deg)' : '';
      });

      item.appendChild(hdr);
      item.appendChild(body);
      container.appendChild(item);
    });
  });

  // Lógica das tabs
  paineis.forEach(({ tab }, i) => {
    tab.addEventListener('click', () => {
      paineis.forEach(({ tab: t, painel: pan }) => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
        pan.classList.toggle('active', active);
      });
    });
  });

  return page;
}
