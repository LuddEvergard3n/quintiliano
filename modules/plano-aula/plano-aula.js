/**
 * plano-aula.js — Gerador de Plano de Aula
 *
 * Ferramenta para o professor de Língua Portuguesa gerar planos de aula
 * com habilidades BNCC selecionáveis, presets pedagógicos e preview imprimível.
 *
 * Layout: Template 3 — grid com formulário fixo 470px + preview flex:1.
 * O professor vê o documento se formando em tempo real, sem precisar de scroll.
 *
 * Impressão: window.print() — diálogo nativo do browser, "Salvar como PDF"
 * produz qualidade tipográfica perfeita sem dependências de biblioteca.
 * print-color-adjust:exact preserva fundos coloridos (badges de seção).
 *
 * Dados BNCC embutidos no módulo — sem fetch(), sem JSON externo,
 * funciona offline e com file://
 *
 * Sem dependências externas. CSS injetado no render.
 */

/* ================================================================
   DADOS — BNCC LÍNGUA PORTUGUESA
   Habilidades por ano/série — embutidas para garantir offline.
   EM usa aliases (mesmas habilidades para EM1/EM2/EM3 — padrão BNCC CHS).
   ================================================================ */

const EF6 = [
  { id: 'EF06LP01', t: 'Identificar diferentes graus de parcialidade/imparcialidade no relato de fatos.' },
  { id: 'EF06LP02', t: 'Reconhecer o texto como lugar de manifestação e negociação de sentidos e valores.' },
  { id: 'EF06LP05', t: 'Identificar em notícias os elementos da estrutura narrativa (esquema W+H).' },
  { id: 'EF06LP10', t: 'Produzir notícias para jornal escolar ou blog, considerando condições de produção.' },
  { id: 'EF06LP25', t: 'Reconhecer e usar recursos de coesão referencial: pronomes, sinônimos e expressões nominais.' },
  { id: 'EF06LP35', t: 'Identificar a expressão de presente, passado e futuro em textos.' },
  { id: 'EF06LP39', t: 'Identificar efeitos de humor e ironia: ambiguidade, polissemia e comparações implícitas.' },
  { id: 'EF06LP46', t: 'Criar narrativas ficcionais com cenários, personagens e conflito em sequência lógica.' },
  { id: 'EF06LP55', t: 'Reconhecer expressões que sinalizam a organização do texto e a argumentação.' },
];

const EF7 = [
  { id: 'EF07LP01', t: 'Distinguir informações de diferentes graus de relevância em textos lidos ou escutados.' },
  { id: 'EF07LP03', t: 'Identificar o efeito de recursos gráfico-visuais em textos publicados em jornais e revistas.' },
  { id: 'EF07LP07', t: 'Produzir textos de opinião com argumentos e exemplos que sustentem a tese.' },
  { id: 'EF07LP10', t: 'Identificar e usar conectivos de causalidade, conclusão e oposição.' },
  { id: 'EF07LP16', t: 'Reconhecer conjunções e orações subordinadas articulando relações lógicas e argumentativas.' },
  { id: 'EF07LP28', t: 'Identificar efeitos de ironia e humor e analisar os recursos utilizados.' },
  { id: 'EF07LP31', t: 'Pesquisar, selecionar e organizar informações de diferentes fontes sobre temas relevantes.' },
  { id: 'EF07LP38', t: 'Reconhecer e usar, ao produzir texto, a variedade linguística adequada ao contexto.' },
];

const EF8 = [
  { id: 'EF08LP01', t: 'Identificar elementos de persuasão e manipulação em textos publicitários e mídias sociais.' },
  { id: 'EF08LP04', t: 'Reconhecer e comparar diferentes versões de notícias sobre um mesmo fato.' },
  { id: 'EF08LP05', t: 'Produzir artigos de opinião com hierarquização de argumentos e exemplos.' },
  { id: 'EF08LP13', t: 'Identificar e usar formas nominais do verbo: infinitivo, gerúndio e particípio.' },
  { id: 'EF08LP16', t: 'Reconhecer efeitos de sentido dos recursos de concordância nominal e verbal.' },
  { id: 'EF08LP21', t: 'Analisar a construção de personagens em narrativas e a relação com o contexto sociocultural.' },
  { id: 'EF08LP26', t: 'Identificar e usar marcadores discursivos de sequência, explicação e conclusão.' },
  { id: 'EF08LP37', t: 'Reconhecer recursos expressivos da linguagem poética: verso, estrofe, rima e ritmo.' },
];

const EF9 = [
  { id: 'EF09LP01', t: 'Identificar e avaliar pontos de vista em textos sobre questões controversas.' },
  { id: 'EF09LP03', t: 'Reconhecer estratégias argumentativas: comparação, exemplificação, dados estatísticos.' },
  { id: 'EF09LP07', t: 'Produzir texto dissertativo-argumentativo adequado a concursos e vestibulares.' },
  { id: 'EF09LP10', t: 'Relacionar texto literário ao contexto de produção: movimentos culturais e período histórico.' },
  { id: 'EF09LP16', t: 'Analisar o efeito de figuras de linguagem em textos literários e publicitários.' },
  { id: 'EF09LP20', t: 'Reconhecer a variação linguística como fenômeno natural e as dimensões do preconceito linguístico.' },
  { id: 'EF09LP25', t: 'Usar adequadamente recursos coesivos lexicais e gramaticais ao produzir textos.' },
  { id: 'EF09LP33', t: 'Produzir textos de diferentes gêneros com norma culta e registro formal adequados.' },
];

const EM_BNCC = [
  { id: 'EM13LP01', t: 'Relacionar o texto às suas condições de produção, circulação e recepção.' },
  { id: 'EM13LP02', t: 'Estabelecer relações entre partes do texto, identificando recorrências e progressão temática.' },
  { id: 'EM13LP03', t: 'Analisar relações entre textos de diferentes épocas, reconhecendo intertextualidade.' },
  { id: 'EM13LP06', t: 'Produzir e revisar textos considerando coerência, coesão e adequação ao registro.' },
  { id: 'EM13LP07', t: 'Produzir textos com recursos argumentativos: premissas, dados, contra-argumentos.' },
  { id: 'EM13LP08', t: 'Realizar pesquisa bibliográfica para subsidiar a produção de textos acadêmicos.' },
  { id: 'EM13LP10', t: 'Identificar e analisar argumentos, pontos de vista e posicionamentos em textos variados.' },
  { id: 'EM13LP11', t: 'Analisar discursos persuasivos e retóricos e reconhecer recursos de manipulação.' },
  { id: 'EM13LP12', t: 'Reconhecer e analisar o uso de falácias em argumentações orais e escritas.' },
  { id: 'EM13LP14', t: 'Analisar o papel dos recursos expressivos na construção de sentido de textos.' },
  { id: 'EM13LP15', t: 'Formular hipóteses, levantar questões e propor soluções em situações de debate.' },
  { id: 'EM13LP22', t: 'Usar ferramentas digitais adequadamente para pesquisa, produção e divulgação de textos.' },
  { id: 'EM13LP46', t: 'Identificar e analisar aspectos do texto literário relacionados à sua construção estética.' },
  { id: 'EM13LP47', t: 'Relacionar textos literários ao contexto de produção e à tradição da língua portuguesa.' },
  { id: 'EM13LP48', t: 'Analisar obras literárias canônicas e contemporâneas, comparando recursos, temas e estilos.' },
  { id: 'EM13LP51', t: 'Ler e analisar letras de músicas, poemas e outros gêneros artístico-literários.' },
  { id: 'EM13LP54', t: 'Produzir textos literários com uso consciente de recursos expressivos.' },
];

const BNCC = {
  6: EF6, 7: EF7, 8: EF8, 9: EF9,
  EM1: EM_BNCC, EM2: EM_BNCC, EM3: EM_BNCC,
};

/* ================================================================
   PRESETS PEDAGÓGICOS — fixos, independentes do ano
   ================================================================ */

const POBJ = [
  'Identificar e analisar a estrutura e os recursos expressivos do texto',
  'Reconhecer e empregar figuras de linguagem com consciência estilística',
  'Produzir texto dissertativo-argumentativo com tese clara e argumentos fundamentados',
  'Aplicar normas de concordância nominal e verbal em contexto de produção',
  'Distinguir fatos de opiniões e avaliar a consistência de argumentos',
  'Ampliar vocabulário com recurso à etimologia e à família de palavras',
  'Identificar elementos da narrativa literária e relacioná-los ao contexto histórico',
  'Analisar recursos de coesão e coerência em textos variados',
  'Reconhecer e nomear as classes gramaticais em contexto de uso',
  'Desenvolver fluência leitora com textos de nível crescente de complexidade',
];

const PMET = [
  'Aula expositiva dialogada com análise de texto projetado',
  'Leitura compartilhada e anotação coletiva no quadro',
  'Análise em duplas com posterior socialização para a turma',
  'Atividade de classificação com exemplos fornecidos pelo professor',
  'Debate estruturado com definição prévia de posições e turnos de fala',
  'Produção textual orientada com revisão por pares',
  'Resolução de exercícios com correção comentada e imediata',
  'Pesquisa guiada usando Etimologia ou Literatura do Quintiliano',
  'Análise projetada usando o módulo Leitura Estrutural do Quintiliano',
  'Jogo de identificação: professor lê trechos, alunos identificam a classe gramatical',
];

const PREC = [
  'Quintiliano — módulo Leitura Estrutural (projetado)',
  'Quintiliano — módulo Interpretação',
  'Quintiliano — módulo Sintaxe',
  'Quintiliano — módulo Etimologia',
  'Quintiliano — módulo Argumentação',
  'Quintiliano — módulo Retórica',
  'Quintiliano — módulo Literatura / Grandes Nomes',
  'Quintiliano — módulo Poesia',
  'Quintiliano — módulo Escrita (análise de produção)',
  'Livro didático — capítulo indicado',
  'Texto literário impresso (distribuído pelo professor)',
  'Quadro/lousa para organização coletiva',
  'Dispositivos individuais (celular ou tablet)',
];

const PAVA = [
  'Participação oral durante as atividades',
  'Produção escrita realizada em aula',
  'Exercícios de fixação com correção imediata',
  'Revisão e reescrita de produção anterior',
  'Autoavaliação: o aluno registra o que aprendeu e o que ainda tem dúvida',
  'Resposta a questão dissertativa ao final da aula',
  'Apresentação oral de análise realizada em dupla',
  'Identificação de elementos em texto não trabalhado em aula (avaliação formativa)',
];

/* ================================================================
   CSS DE ESCOPO (inclui @media print como cidadão de primeira classe)
   print-color-adjust:exact preserva fundos coloridos —
   sem isso, Chrome remove backgrounds para economizar tinta.
   ================================================================ */

const CSS = `
  /* ── Wrapper da ferramenta ────────────────────────────────── */
  .plano-page {
    padding: var(--space-8) var(--space-6) var(--space-16);
    max-width: 1400px;
    margin: 0 auto;
  }

  /* ── Cabeçalho da ferramenta ──────────────────────────────── */
  .plano-topo {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
  }
  .plano-topo-h1 {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-1);
  }
  .plano-topo-sub {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
  }
  .plano-toolbar {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    align-items: center;
  }

  /* ── Layout dois painéis ──────────────────────────────────── */
  /* 470px fixo para formulário; 1fr para o documento preview —
     em telas largas, o documento fica confortável para ler */
  .plano-layout {
    display: grid;
    grid-template-columns: 470px 1fr;
    gap: var(--space-6);
    align-items: flex-start;
  }

  /* ── Painel do formulário ─────────────────────────────────── */
  .plano-form-panel {
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-6);
  }
  .plano-secao-titulo {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-paper-border);
  }
  .plano-divisor {
    border: none;
    border-top: 1px solid var(--color-paper-border);
    margin: var(--space-5) 0;
  }

  /* Grids de campos */
  .plano-fr2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
  .plano-fr3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-3);
  }

  /* Grupo de campo */
  .plano-fg {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--space-3);
  }
  /* min-height:2em + flex + align-items:flex-end:
     todos os labels reservam 2 linhas de altura e alinham o texto
     pela base — inputs abaixo ficam sempre nivelados horizontalmente */
  .plano-fg label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    letter-spacing: 0.04em;
    min-height: 2em;
    display: flex;
    align-items: flex-end;
    padding-bottom: 0.12rem;
  }
  .plano-fg input,
  .plano-fg select,
  .plano-fg textarea {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink);
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    width: 100%;
    transition: border-color var(--transition-fast);
  }
  .plano-fg input:focus,
  .plano-fg select:focus,
  .plano-fg textarea:focus {
    outline: none;
    border-color: var(--color-ink-light);
  }
  /* Campo readonly (Carga Horária calculada) */
  .plano-fg input[readonly] {
    background: var(--color-paper-border);
    color: var(--color-ink-mid);
    cursor: default;
  }
  .plano-fg textarea {
    resize: vertical;
    min-height: 60px;
    line-height: 1.5;
  }

  /* Caixa de checkboxes com scroll */
  .plano-check-box {
    max-height: 180px;
    overflow-y: auto;
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius-sm);
    padding: var(--space-2) var(--space-3);
    background: var(--color-paper-dark);
    margin-bottom: var(--space-2);
  }
  .plano-check-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: 3px 0;
  }
  .plano-check-item input[type="checkbox"] {
    width: auto;
    flex-shrink: 0;
    margin-top: 3px;
  }
  .plano-check-item label {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-ink-mid);
    cursor: pointer;
    line-height: 1.5;
    min-height: auto;
    padding-bottom: 0;
  }
  /* código BNCC em destaque monoespaçado */
  .plano-bncc-id {
    font-family: var(--font-mono);
    font-size: 10px;
    background: var(--color-paper-border);
    padding: 1px 4px;
    border-radius: 2px;
    margin-right: 4px;
    white-space: nowrap;
    color: var(--color-ink-mid);
    flex-shrink: 0;
  }
  .plano-check-empty {
    font-family: var(--font-body);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
    font-style: italic;
    padding: var(--space-2);
  }

  /* ── Painel de preview ────────────────────────────────────── */
  .plano-preview-panel {
    position: sticky;
    top: calc(80px + var(--space-4));
  }
  .plano-preview-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-3);
  }

  /* ── Documento gerado ─────────────────────────────────────── */
  /* Fonte e cores próprias (não herdam da aplicação)
     para garantir que a impressão fique idêntica à preview */
  #plano-doc {
    background: white;
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-8) var(--space-10);
    box-shadow: var(--shadow);
    font-family: 'Crimson Text', Georgia, serif;
    font-size: 0.92rem;
    color: #1a1208;
    line-height: 1.65;
    min-height: 400px;
  }
  .pd-titulo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 4px;
  }
  .pd-subtitulo {
    font-size: 0.85rem;
    text-align: center;
    color: #5a4030;
    margin-bottom: 18px;
  }
  .pd-linha {
    border: none;
    border-top: 2px solid #1a1208;
    margin-bottom: 14px;
  }
  .pd-identificacao {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 16px;
    margin-bottom: 14px;
    font-size: 0.83rem;
  }
  .pd-id-item { display: flex; gap: 5px; align-items: baseline; }
  .pd-id-label { color: #5a4030; white-space: nowrap; }
  .pd-id-valor { color: #1a1208; font-weight: 600; }
  /* título de seção com fundo escuro — print-color-adjust:exact
     garante que o fundo apareça na impressão */
  .pd-secao { margin-bottom: 12px; }
  .pd-secao-titulo {
    display: inline-block;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: #1a1208;
    color: white;
    padding: 2px 8px;
    margin-bottom: 6px;
  }
  .pd-secao-corpo {
    font-size: 0.85rem;
    line-height: 1.65;
    color: #2a1e0f;
    padding: 0 2px;
    white-space: pre-wrap;
  }
  .pd-bncc-item {
    display: flex;
    gap: 6px;
    align-items: flex-start;
    margin-bottom: 4px;
    font-size: 0.83rem;
  }
  .pd-bncc-code {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    background: #e8dfc8;
    padding: 1px 4px;
    border-radius: 2px;
    white-space: nowrap;
    flex-shrink: 0;
    color: #3d2e1a;
  }
  .pd-vazio {
    text-align: center;
    padding: 60px 20px;
    color: var(--color-ink-ghost);
    font-style: italic;
    font-size: var(--text-sm);
  }

  /* ── Responsivo ───────────────────────────────────────────── */
  @media (max-width: 960px) {
    .plano-layout {
      grid-template-columns: 1fr;
    }
    .plano-preview-panel { position: static; }
    .plano-fr3 { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 540px) {
    .plano-fr2, .plano-fr3 { grid-template-columns: 1fr; }
  }

  /* ── Impressão ────────────────────────────────────────────── */
  @media print {
    /* 1. Remove cabeçalho da ferramenta e formulário */
    .plano-topo,
    .plano-form-panel,
    .plano-preview-label,
    .plano-toolbar { display: none !important; }

    /* 2. Colapsa para coluna única */
    .plano-layout { display: block !important; }
    .plano-preview-panel { position: static !important; }

    /* 3. Remove decorações do container do documento */
    #plano-doc {
      border: none !important;
      box-shadow: none !important;
      padding: 1.5cm 2cm !important;
      font-size: 10pt !important;
    }

    /* 4. CRÍTICO: preserva fundos coloridos (pd-secao-titulo, pd-bncc-code) */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  }
`;

/* ================================================================
   HELPERS DO FORMULÁRIO
   ================================================================ */

/**
 * Renderiza lista de checkboxes em um container.
 * hasId:true → item é {id, t}; usa .plano-bncc-id para o código.
 * hasId:false → item é string simples.
 */
function renderCheckboxes(containerId, items, prefix, hasId) {
  const box = document.getElementById(containerId);
  if (!box) return;

  if (!items || !items.length) {
    box.innerHTML = '<p class="plano-check-empty">Selecione o ano/série para ver as habilidades.</p>';
    return;
  }

  box.innerHTML = items.map((item, i) => {
    const txt  = hasId ? item.t  : item;
    const lbl  = hasId
      ? `<span class="plano-bncc-id">${item.id}</span>${txt}`
      : txt;
    return `<div class="plano-check-item">
      <input type="checkbox" id="ck-${prefix}-${i}"
             class="${prefix}-ck"
             data-id="${hasId ? item.id : ''}"
             data-text="${txt.replace(/"/g, '&quot;')}">
      <label for="ck-${prefix}-${i}">${lbl}</label>
    </div>`;
  }).join('');
}

/** Coleta itens marcados em checkboxes + texto livre de um textarea. */
function coletarMarcados(prefixClass, extraId) {
  const marcados = [...document.querySelectorAll(`.${prefixClass}:checked`)].map(c => ({
    id:   c.dataset.id   || '',
    text: c.dataset.text || '',
  }));
  const extra = (document.getElementById(extraId)?.value || '').trim();
  if (extra) marcados.push({ id: '', text: extra });
  return marcados;
}

/** Atualiza Carga Horária Total calculada (Nº Aulas × Duração). */
function calcCarga() {
  const n   = parseInt(document.getElementById('f-naulas')?.value) || 0;
  const dur = document.getElementById('f-dur')?.value || '50';
  const min = dur === '1h30' ? 90 : parseInt(dur);
  const tot = n * min;
  let txt = '';
  if (tot >= 60) {
    const h = Math.floor(tot / 60), r = tot % 60;
    txt = r ? `${h}h${String(r).padStart(2, '0')}min` : `${h}h`;
  } else if (tot > 0) {
    txt = `${tot} min`;
  }
  const f = document.getElementById('f-carga');
  if (f) f.value = txt;
}

/** Reconstrói checkboxes de habilidades BNCC ao trocar o ano. */
function onAnoChange() {
  const raw = document.getElementById('f-ano')?.value;
  if (!raw) return;
  const key = isNaN(parseInt(raw)) ? raw : parseInt(raw);
  renderCheckboxes('box-bncc', BNCC[key] || null, 'bncc', true);
}

/* ================================================================
   GERAÇÃO DO DOCUMENTO
   ================================================================ */

/** Constrói um bloco de seção do documento. */
function secao(titulo, corpo) {
  return `<div class="pd-secao">
    <span class="pd-secao-titulo">${titulo}</span>
    <div class="pd-secao-corpo">${corpo}</div>
  </div>`;
}

/** Gera e injeta o documento no painel de preview. */
function gerarDocumento() {
  const v = id => (document.getElementById(id)?.value || '').trim();

  const escola    = v('f-escola');
  const professor = v('f-professor');
  const data      = v('f-data');
  const turma     = v('f-turma');
  const ano       = v('f-ano');
  const disciplina = v('f-disc') || 'Língua Portuguesa';
  const naulas    = v('f-naulas');
  const dur       = v('f-dur');
  const carga     = v('f-carga');
  const tema      = v('f-tema');
  const objetivo  = coletarMarcados('obt-ck', 'xa-obj');
  const bncc      = coletarMarcados('bncc-ck', 'xa-bncc');
  const met       = coletarMarcados('met-ck', 'xa-met');
  const rec       = coletarMarcados('rec-ck', 'xa-rec');
  const ava       = coletarMarcados('ava-ck', 'xa-ava');
  const obsExtra  = v('f-obs');

  const durLabel = dur === '1h30' ? '1h30min' : `${dur} min`;

  if (!tema && !objetivo.length && !bncc.length) {
    document.getElementById('plano-doc').innerHTML =
      '<p class="pd-vazio">Preencha o formulário ao lado para gerar o plano de aula.</p>';
    return;
  }

  const labelAno = {
    6:'6º ano EF', 7:'7º ano EF', 8:'8º ano EF', 9:'9º ano EF',
    EM1:'1ª série EM', EM2:'2ª série EM', EM3:'3ª série EM',
  }[ano] || ano;

  let html = `
    <p class="pd-titulo">Plano de Aula</p>
    <p class="pd-subtitulo">${disciplina}</p>
    <hr class="pd-linha">
    <div class="pd-identificacao">
      ${escola    ? `<div class="pd-id-item"><span class="pd-id-label">Escola:</span><span class="pd-id-valor">${escola}</span></div>` : ''}
      ${professor ? `<div class="pd-id-item"><span class="pd-id-label">Professor(a):</span><span class="pd-id-valor">${professor}</span></div>` : ''}
      ${data      ? `<div class="pd-id-item"><span class="pd-id-label">Data:</span><span class="pd-id-valor">${data}</span></div>` : ''}
      ${turma     ? `<div class="pd-id-item"><span class="pd-id-label">Turma:</span><span class="pd-id-valor">${turma}</span></div>` : ''}
      ${labelAno  ? `<div class="pd-id-item"><span class="pd-id-label">Ano/Série:</span><span class="pd-id-valor">${labelAno}</span></div>` : ''}
      ${naulas && dur ? `<div class="pd-id-item"><span class="pd-id-label">Aulas:</span><span class="pd-id-valor">${naulas} × ${durLabel}${carga ? ` = ${carga}` : ''}</span></div>` : ''}
    </div>
  `;

  if (tema)         html += secao('Tema / Conteúdo', tema);
  if (objetivo.length) {
    html += secao('Objetivos de Aprendizagem',
      objetivo.map(o => `• ${o.text}`).join('\n'));
  }
  if (bncc.length) {
    html += `<div class="pd-secao">
      <span class="pd-secao-titulo">Habilidades BNCC</span>
      <div>
        ${bncc.map(b => `
          <div class="pd-bncc-item">
            ${b.id ? `<span class="pd-bncc-code">${b.id}</span>` : ''}
            <span>${b.text}</span>
          </div>
        `).join('')}
      </div>
    </div>`;
  }
  if (met.length) {
    html += secao('Metodologia / Estratégias',
      met.map(m => `• ${m.text}`).join('\n'));
  }
  if (rec.length) {
    html += secao('Recursos Didáticos',
      rec.map(r => `• ${r.text}`).join('\n'));
  }
  if (ava.length) {
    html += secao('Avaliação',
      ava.map(a => `• ${a.text}`).join('\n'));
  }
  if (obsExtra) {
    html += secao('Observações', obsExtra);
  }

  document.getElementById('plano-doc').innerHTML = html;
}

/* ================================================================
   RENDER
   ================================================================ */

/**
 * Renderiza o Gerador de Plano de Aula.
 * Template 3: grid 470px + 1fr.
 * @returns {HTMLElement}
 */
export function renderPlanoAula() {
  const page = document.createElement('div');
  page.className = 'plano-page';

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  /* ── Topo ─────────────────────────────────────────────────── */
  const topo = document.createElement('div');
  topo.className = 'plano-topo';
  topo.innerHTML = `
    <div>
      <h1 class="plano-topo-h1">Gerador de Plano de Aula</h1>
      <p class="plano-topo-sub">
        Preencha o formulário — o documento é gerado em tempo real.
        Use "Imprimir / Salvar PDF" para exportar.
      </p>
    </div>
    <div class="plano-toolbar">
      <button class="btn btn-secondary" id="btn-limpar">Limpar</button>
      <button class="btn btn-primary"   id="btn-imprimir">Imprimir / Salvar PDF</button>
    </div>
  `;
  page.appendChild(topo);

  /* ── Layout dois painéis ──────────────────────────────────── */
  const layout = document.createElement('div');
  layout.className = 'plano-layout';

  /* Painel esquerdo: formulário */
  const formPanel = document.createElement('div');
  formPanel.className = 'plano-form-panel';
  formPanel.innerHTML = `

    <!-- Identificação ──────────────────────────────────── -->
    <p class="plano-secao-titulo">Identificação</p>
    <div class="plano-fr2">
      <div class="plano-fg">
        <label for="f-escola">Escola / Instituição</label>
        <input id="f-escola" type="text" placeholder="Nome da escola">
      </div>
      <div class="plano-fg">
        <label for="f-professor">Professor(a)</label>
        <input id="f-professor" type="text" placeholder="Nome completo">
      </div>
    </div>
    <div class="plano-fr3">
      <div class="plano-fg">
        <label for="f-data">Data da aula</label>
        <input id="f-data" type="date">
      </div>
      <div class="plano-fg">
        <label for="f-turma">Turma</label>
        <input id="f-turma" type="text" placeholder="Ex: 9A">
      </div>
      <div class="plano-fg">
        <label for="f-disc">Disciplina</label>
        <input id="f-disc" type="text" value="Língua Portuguesa">
      </div>
    </div>
    <div class="plano-fr3">
      <div class="plano-fg">
        <label for="f-ano">Ano / Série</label>
        <select id="f-ano">
          <option value="">Selecione…</option>
          <optgroup label="Ensino Fundamental II">
            <option value="6">6º ano</option>
            <option value="7">7º ano</option>
            <option value="8">8º ano</option>
            <option value="9">9º ano</option>
          </optgroup>
          <optgroup label="Ensino Médio">
            <option value="EM1">1ª série</option>
            <option value="EM2">2ª série</option>
            <option value="EM3">3ª série</option>
          </optgroup>
        </select>
      </div>
      <div class="plano-fg">
        <label for="f-naulas">Nº de aulas</label>
        <input id="f-naulas" type="number" min="1" max="10" value="1">
      </div>
      <div class="plano-fg">
        <label for="f-dur">Duração por aula</label>
        <select id="f-dur">
          <option value="50">50 min</option>
          <option value="45">45 min</option>
          <option value="60">60 min</option>
          <option value="1h30">1h30min</option>
        </select>
      </div>
    </div>
    <div class="plano-fg">
      <label for="f-carga">Carga horária total (calculada)</label>
      <input id="f-carga" type="text" readonly placeholder="—">
    </div>

    <hr class="plano-divisor">

    <!-- Tema ───────────────────────────────────────────── -->
    <p class="plano-secao-titulo">Tema e conteúdo</p>
    <div class="plano-fg">
      <label for="f-tema">Tema / Conteúdo da aula</label>
      <textarea id="f-tema" rows="2" placeholder="Ex: Figuras de linguagem — metáfora e metonímia em textos publicitários"></textarea>
    </div>

    <hr class="plano-divisor">

    <!-- Objetivos ──────────────────────────────────────── -->
    <p class="plano-secao-titulo">Objetivos de aprendizagem</p>
    <div class="plano-check-box" id="box-obj"></div>
    <div class="plano-fg">
      <label for="xa-obj">Objetivo adicional (texto livre)</label>
      <textarea id="xa-obj" rows="2" placeholder="Descreva objetivos específicos desta aula…"></textarea>
    </div>

    <hr class="plano-divisor">

    <!-- BNCC ───────────────────────────────────────────── -->
    <p class="plano-secao-titulo">Habilidades BNCC</p>
    <div class="plano-check-box" id="box-bncc">
      <p class="plano-check-empty">Selecione o ano/série acima para ver as habilidades.</p>
    </div>
    <div class="plano-fg">
      <label for="xa-bncc">Habilidade adicional (texto livre)</label>
      <input id="xa-bncc" type="text" placeholder="Ex: EM13LP09">
    </div>

    <hr class="plano-divisor">

    <!-- Metodologia ────────────────────────────────────── -->
    <p class="plano-secao-titulo">Metodologia / Estratégias</p>
    <div class="plano-check-box" id="box-met"></div>
    <div class="plano-fg">
      <label for="xa-met">Estratégia adicional</label>
      <textarea id="xa-met" rows="2" placeholder="Descreva estratégias específicas…"></textarea>
    </div>

    <hr class="plano-divisor">

    <!-- Recursos ───────────────────────────────────────── -->
    <p class="plano-secao-titulo">Recursos didáticos</p>
    <div class="plano-check-box" id="box-rec"></div>
    <div class="plano-fg">
      <label for="xa-rec">Recurso adicional</label>
      <input id="xa-rec" type="text" placeholder="Ex: Texto impresso — crônica de Rubem Braga">
    </div>

    <hr class="plano-divisor">

    <!-- Avaliação ──────────────────────────────────────── -->
    <p class="plano-secao-titulo">Avaliação</p>
    <div class="plano-check-box" id="box-ava"></div>
    <div class="plano-fg">
      <label for="xa-ava">Instrumento adicional</label>
      <input id="xa-ava" type="text" placeholder="Ex: Lista de verificação de coesão textual">
    </div>

    <hr class="plano-divisor">

    <!-- Observações ────────────────────────────────────── -->
    <p class="plano-secao-titulo">Observações</p>
    <div class="plano-fg">
      <label for="f-obs">Observações gerais (opcional)</label>
      <textarea id="f-obs" rows="3" placeholder="Adaptações para NEE, sequência didática, referências bibliográficas…"></textarea>
    </div>
  `;

  /* Painel direito: preview */
  const previewPanel = document.createElement('div');
  previewPanel.className = 'plano-preview-panel';
  previewPanel.innerHTML = `
    <p class="plano-preview-label">Documento gerado</p>
    <div id="plano-doc">
      <p class="pd-vazio">Preencha o formulário ao lado para gerar o plano de aula.</p>
    </div>
  `;

  layout.appendChild(formPanel);
  layout.appendChild(previewPanel);
  page.appendChild(layout);

  /* ── Inicialização após injeção no DOM ──────────────────────── */
  // Usa setTimeout(0) como fallback para ambientes sem rAF (Node/testes)
  const schedule = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : fn => setTimeout(fn, 0);

  schedule(() => {

    /* Presets fixos (independentes do ano) */
    renderCheckboxes('box-obj', POBJ, 'obt', false);
    renderCheckboxes('box-met', PMET, 'met', false);
    renderCheckboxes('box-rec', PREC, 'rec', false);
    renderCheckboxes('box-ava', PAVA, 'ava', false);

    /* Data atual */
    const hoje = new Date().toISOString().split('T')[0];
    const fData = document.getElementById('f-data');
    if (fData) fData.value = hoje;

    /* Carga horária inicial */
    calcCarga();

    /* Eventos de formulário → regenerar documento */
    const campos = ['f-escola','f-professor','f-data','f-turma','f-disc',
                    'f-naulas','f-dur','f-tema','f-obs'];
    campos.forEach(id => {
      document.getElementById(id)?.addEventListener('input', gerarDocumento);
    });

    /* Ano → recarrega habilidades BNCC + regenera */
    document.getElementById('f-ano')?.addEventListener('change', () => {
      onAnoChange();
      gerarDocumento();
    });

    /* Carga horária calculada */
    document.getElementById('f-naulas')?.addEventListener('input', () => {
      calcCarga();
      gerarDocumento();
    });
    document.getElementById('f-dur')?.addEventListener('change', () => {
      calcCarga();
      gerarDocumento();
    });

    /* Delegação de eventos em checkboxes e textareas de presets */
    ['box-obj','box-met','box-rec','box-ava','box-bncc'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', gerarDocumento);
    });
    ['xa-obj','xa-bncc','xa-met','xa-rec','xa-ava'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', gerarDocumento);
    });

    /* Toolbar */
    document.getElementById('btn-imprimir')?.addEventListener('click', () => {
      gerarDocumento(); // garante documento atualizado
      window.print();
    });
    document.getElementById('btn-limpar')?.addEventListener('click', () => {
      formPanel.querySelectorAll('input:not([readonly]), textarea, select').forEach(el => {
        if (el.type === 'checkbox') { el.checked = false; }
        else if (el.id === 'f-disc') { el.value = 'Língua Portuguesa'; }
        else if (el.id === 'f-naulas') { el.value = '1'; }
        else if (el.id === 'f-dur') { el.value = '50'; }
        else if (el.id === 'f-data') { el.value = hoje; }
        else { el.value = ''; }
      });
      calcCarga();
      document.getElementById('plano-doc').innerHTML =
        '<p class="pd-vazio">Preencha o formulário ao lado para gerar o plano de aula.</p>';
    });
  });

  return page;
}
