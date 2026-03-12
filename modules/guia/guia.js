/**
 * guia.js — Guia do Professor
 *
 * Material pedagógico para o professor de Língua Portuguesa:
 * como usar o Quintiliano em sala de aula, atividades práticas
 * por nível e orientações gerais.
 *
 * Layout: Template 2 — sidebar 220px sticky + conteúdo flex:1.
 * O min-width:0 no conteúdo é obrigatório para evitar overflow
 * em descendentes com overflow:hidden dentro de flex items.
 *
 * Sidebar com links âncora; h2 com scroll-margin-top para
 * dar respiração visual ao destino de cada link.
 *
 * Sem dependências externas. CSS injetado no render.
 */

/* ================================================================
   CSS DE ESCOPO
   ================================================================ */

const CSS = `
  /* ── Wrapper ──────────────────────────────────────────────── */
  .guia-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: var(--space-8) var(--space-6) var(--space-16);
  }

  /* ── Layout flexbox ───────────────────────────────────────── */
  /* flexbox em vez de grid: sidebar flex-shrink:0 (nunca encolhe)
     e conteúdo absorve todo o espaço restante sem definir colunas */
  .guia-layout {
    display: flex;
    gap: var(--space-8);
    align-items: flex-start;
  }

  /* ── Sidebar ──────────────────────────────────────────────── */
  .guia-sidebar {
    width: 220px;
    flex-shrink: 0;
  }
  .guia-sidebar-panel {
    position: sticky;
    top: calc(80px + var(--space-4));  /* 80px = altura aprox. do header fixo */
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    padding: var(--space-5) 0;
  }
  .guia-sidebar-titulo {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-ink-ghost);
    padding: 0 var(--space-5) var(--space-3);
    border-bottom: 1px solid var(--color-paper-border);
    margin-bottom: var(--space-2);
  }
  /* Rótulos de grupo: não-clicáveis, criam hierarquia na nav */
  .guia-sidebar-grupo {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--color-ink-ghost);
    padding: var(--space-4) var(--space-5) var(--space-1);
  }
  /* border-left transparent como base: ocupa espaço mas
     não aparece — ao hover, só a cor muda, não o layout */
  .guia-sidebar-link {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    text-decoration: none;
    padding: var(--space-2) var(--space-5);
    border-left: 2px solid transparent;
    transition: color var(--transition-fast),
                border-color var(--transition-fast),
                background var(--transition-fast);
  }
  .guia-sidebar-link:hover {
    color: var(--color-ink);
    border-left-color: var(--color-paper-border);
    background: var(--color-paper-dark);
  }

  /* ── Área de conteúdo ─────────────────────────────────────── */
  .guia-content {
    flex: 1;
    min-width: 0; /* evita overflow em flex com descendentes especiais */
  }

  /* ── Tipografia ───────────────────────────────────────────── */
  .guia-h1 {
    font-family: var(--font-display);
    font-size: var(--text-2xl);
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: var(--space-2);
  }
  .guia-subtitulo {
    font-family: var(--font-body);
    font-style: italic;
    color: var(--color-ink-mid);
    margin-bottom: var(--space-8);
    line-height: 1.65;
  }

  /* scroll-margin-top: ao clicar em âncora, h2 para 
     1.5rem abaixo do topo — não fica colado na viewport */
  .guia-h2 {
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-accent);
    padding-bottom: var(--space-3);
    margin-bottom: var(--space-6);
    margin-top: var(--space-10);
    border-bottom: 1px solid var(--color-paper-border);
    position: relative;
    scroll-margin-top: var(--space-6);
  }
  .guia-h2:first-of-type { margin-top: 0; }
  .guia-h2::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0;
    width: 2rem; height: 1px;
    background: var(--color-accent);
  }

  /* azul = gold aqui: sub-seções são informação, não estrutura */
  .guia-h3 {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-gold);
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);
  }

  .guia-p {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-ink-mid);
    line-height: 1.8;
    margin-bottom: var(--space-4);
  }

  /* ── Bloco de aviso (vermelho — urgente) ──────────────────── */
  .guia-aviso {
    background: rgba(139, 26, 26, 0.06);
    border-left: 4px solid var(--color-accent);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: var(--space-4) var(--space-5);
    margin: var(--space-5) 0;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.7;
  }

  /* ── Bloco de nota (dourado — complementar) ───────────────── */
  .guia-nota {
    background: rgba(184, 150, 12, 0.05);
    border-left: 3px solid var(--color-gold);
    border-radius: 0 var(--radius) var(--radius) 0;
    padding: var(--space-4) var(--space-5);
    margin: var(--space-5) 0;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.7;
  }

  /* ── Cards de atividade ───────────────────────────────────── */
  /* Card: scan visual rápido — número, título, meta-tags, corpo.
     O professor precisa recuperar a atividade sem ler tudo. */
  .guia-atividade {
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    margin-bottom: var(--space-8);
    overflow: hidden;
  }
  /* gradiente horizontal: vermelho tênue → transparente.
     Integra o badge sem agressividade visual */
  .guia-ativ-header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5);
    background: linear-gradient(90deg, rgba(139,26,26,0.07), transparent);
    border-bottom: 1px solid var(--color-paper-border);
  }
  /* badge vermelho — mesmo acento de h2; sinaliza "estrutural" */
  .guia-ativ-num {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    font-weight: 700;
    background: var(--color-accent);
    color: var(--color-paper);
    padding: 2px var(--space-3);
    border-radius: var(--radius-sm);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .guia-ativ-titulo {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-ink);
  }
  .guia-ativ-body {
    padding: var(--space-5) var(--space-6);
    background: var(--color-paper);
  }
  /* meta-tags: lidas em 2 segundos — nível, duração, modo */
  .guia-ativ-meta {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    margin-bottom: var(--space-4);
  }
  .guia-ativ-tag {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    background: rgba(184, 150, 12, 0.07);
    border: 1px solid rgba(184, 150, 12, 0.2);
    border-radius: var(--radius-sm);
    padding: 2px var(--space-3);
    color: var(--color-ink-mid);
  }
  .guia-ativ-tag strong { color: var(--color-ink); }
  .guia-ativ-texto {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
    margin-bottom: var(--space-3);
  }
  /* variante inline — não merece bloco separado */
  .guia-ativ-variante {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-ghost);
    border-top: 1px solid var(--color-paper-border);
    padding-top: var(--space-3);
    margin-top: var(--space-3);
    line-height: 1.7;
  }

  /* ── Tabela de módulos ────────────────────────────────────── */
  .guia-tabela {
    width: 100%;
    border-collapse: collapse; /* sem bordas duplas entre células */
    margin: var(--space-5) 0 var(--space-6);
    font-family: var(--font-body);
    font-size: var(--text-sm);
  }
  .guia-tabela th {
    text-align: left;
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-ink-ghost);
    padding: var(--space-2) var(--space-4);
    border-bottom: 2px solid var(--color-paper-border);
  }
  .guia-tabela td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-paper-border);
    color: var(--color-ink-mid);
    vertical-align: top;
    line-height: 1.6;
  }
  .guia-tabela tr:hover td { background: var(--color-paper-dark); }
  .guia-tabela td:first-child {
    font-weight: 700;
    color: var(--color-ink);
    white-space: nowrap;
  }

  /* Badges de nível por cor — scan visual sem ler */
  .guia-nivel {
    display: inline-block;
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    padding: 1px var(--space-2);
    border-radius: var(--radius-sm);
    border: 1px solid;
  }
  .guia-nivel--ef {
    background: rgba(42, 92, 42, 0.07);
    color: #2a5c2a;
    border-color: rgba(42, 92, 42, 0.22);
  }
  .guia-nivel--em {
    background: rgba(43, 75, 126, 0.07);
    color: #2b4b7e;
    border-color: rgba(43, 75, 126, 0.22);
  }
  .guia-nivel--todos {
    background: rgba(184, 150, 12, 0.07);
    color: #7a6228;
    border-color: rgba(184, 150, 12, 0.22);
  }

  /* ── Responsivo ───────────────────────────────────────────── */
  @media (max-width: 900px) {
    .guia-layout  { flex-direction: column; }
    .guia-sidebar { width: 100%; }
    .guia-sidebar-panel { position: static; }
  }
`;

/* ================================================================
   RENDER
   ================================================================ */

/**
 * Renderiza o Guia do Professor.
 * Template 2: sidebar 220px sticky + conteúdo longo com âncoras.
 * @returns {HTMLElement}
 */
export function renderGuia() {
  const page = document.createElement('div');
  page.className = 'guia-page';

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  const layout = document.createElement('div');
  layout.className = 'guia-layout';

  /* ── Sidebar ──────────────────────────────────────────────── */
  const sidebar = document.createElement('aside');
  sidebar.className = 'guia-sidebar';
  sidebar.setAttribute('aria-label', 'Índice do guia');
  sidebar.innerHTML = `
    <div class="guia-sidebar-panel">
      <p class="guia-sidebar-titulo">Neste guia</p>

      <span class="guia-sidebar-grupo">Contexto</span>
      <a href="#o-que-e"    class="guia-sidebar-link">O que é o Quintiliano</a>
      <a href="#estrutura"  class="guia-sidebar-link">Estrutura e módulos</a>
      <a href="#como-usar"  class="guia-sidebar-link">Como usar em sala</a>

      <span class="guia-sidebar-grupo">Atividades</span>
      <a href="#ativ-1"     class="guia-sidebar-link">1 — Anatomia de um parágrafo</a>
      <a href="#ativ-2"     class="guia-sidebar-link">2 — Desmontando frases</a>
      <a href="#ativ-3"     class="guia-sidebar-link">3 — A origem das palavras</a>
      <a href="#ativ-4"     class="guia-sidebar-link">4 — Encontre a falácia</a>
      <a href="#ativ-5"     class="guia-sidebar-link">5 — Perfil literário</a>

      <span class="guia-sidebar-grupo">Referência</span>
      <a href="#bncc"         class="guia-sidebar-link">Alinhamento BNCC</a>
      <a href="#limitacoes"   class="guia-sidebar-link">Limitações</a>
    </div>
  `;

  /* ── Conteúdo ─────────────────────────────────────────────── */
  const content = document.createElement('main');
  content.className = 'guia-content';
  content.innerHTML = `
    <h1 class="guia-h1">Guia do Professor</h1>
    <p class="guia-subtitulo">
      Como usar o Quintiliano em aula — atividades práticas, alinhamento BNCC
      e orientações pedagógicas para Língua Portuguesa e Literatura.
    </p>

    <!-- O QUE É ──────────────────────────────────────────────── -->
    <h2 class="guia-h2" id="o-que-e">O que é o Quintiliano</h2>
    <p class="guia-p">
      O Quintiliano é um ambiente interativo de Língua Portuguesa e Literatura construído
      para uso em sala de aula. O objetivo não é cobrir o conteúdo do livro didático —
      é desenvolver no aluno a capacidade de <strong>ler com profundidade</strong>,
      <strong>identificar estrutura textual</strong> e <strong>argumentar com precisão</strong>.
    </p>
    <p class="guia-p">
      A ferramenta funciona inteiramente no browser, sem cadastro, sem instalação e sem
      custo. Pode ser projetada em sala ou usada individualmente pelo aluno em qualquer
      dispositivo com acesso à internet.
    </p>
    <div class="guia-nota">
      O Quintiliano não substitui a aula — ele a instrumenta. O projeto pressupõe que
      o professor conduz o processo e que a ferramenta serve de apoio para atividades
      de análise, debate e produção textual.
    </div>

    <!-- ESTRUTURA ────────────────────────────────────────────── -->
    <h2 class="guia-h2" id="estrutura">Estrutura e módulos</h2>
    <p class="guia-p">Os 16 módulos temáticos organizados por função pedagógica:</p>
    <table class="guia-tabela">
      <thead>
        <tr>
          <th>Módulo</th>
          <th>Função pedagógica principal</th>
          <th>Nível</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Leitura Estrutural</td><td>Classificação morfossintática por clique direto no texto</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
        <tr><td>Interpretação</td><td>Múltipla escolha sobre sentido, tom, fato/opinião e inferência</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
        <tr><td>Sintaxe</td><td>Reorganização de tokens — ordem direta, inversão, hipérbato</td><td><span class="guia-nivel guia-nivel--ef">Fund. II</span></td></tr>
        <tr><td>Etimologia</td><td>Origem, família e cognatos de palavras; busca por raiz</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
        <tr><td>Literatura</td><td>Perfis de autores com obras e acesso a trechos do Gutenberg</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Escrita</td><td>Análise estrutural determinística de texto do aluno</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Poesia</td><td>Versificação, esquemas de rima, figuras sonoras e metro</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
        <tr><td>Argumentação</td><td>Estrutura do argumento, falácias formais e informais, técnicas de refutação</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Retórica</td><td>Ethos, pathos, logos — análise de discursos históricos</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Regras</td><td>Regras gramaticais em accordion por nível BNCC</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
        <tr><td>Ortografia</td><td>Regras ortográficas com exemplos e exercícios</td><td><span class="guia-nivel guia-nivel--ef">Fund. II</span></td></tr>
        <tr><td>Redação</td><td>Gêneros textuais, estrutura dissertativa e ABNT</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Coesão e Coerência</td><td>Mecanismos de coesão textual e progressão temática</td><td><span class="guia-nivel guia-nivel--em">Ens. Médio</span></td></tr>
        <tr><td>Prosódia</td><td>Sílabas, tonicidade, ditongos e acentuação</td><td><span class="guia-nivel guia-nivel--ef">Fund. II</span></td></tr>
        <tr><td>Variação Linguística</td><td>Diatópica, diastrática, diafásica — norma culta e preconceito</td><td><span class="guia-nivel guia-nivel--todos">Todos</span></td></tr>
      </tbody>
    </table>

    <!-- COMO USAR ────────────────────────────────────────────── -->
    <h2 class="guia-h2" id="como-usar">Como usar em sala de aula</h2>
    <p class="guia-p">Três formatos de uso que funcionam bem em contextos diferentes:</p>

    <h3 class="guia-h3">Projeção coletiva</h3>
    <p class="guia-p">
      O professor projeta a ferramenta e conduz a análise com a turma. O aluno não precisa
      de dispositivo próprio. Funciona bem para introdução de conceitos — o professor escolhe
      um texto, faz perguntas e os alunos respondem coletivamente antes de clicar na resposta
      correta.
    </p>

    <h3 class="guia-h3">Exploração individual ou em dupla</h3>
    <p class="guia-p">
      Cada aluno ou dupla acessa o Quintiliano no próprio dispositivo e explora um módulo
      específico enquanto o professor circula. Funciona bem para fixação após instrução
      coletiva.
    </p>

    <h3 class="guia-h3">Tarefa orientada</h3>
    <p class="guia-p">
      O professor envia o link de um módulo específico com uma instrução definida — por
      exemplo: "Acesse Argumentação → Falácias e liste três falácias presentes no texto
      que distribuí." O aluno traz os resultados para discussão na aula seguinte.
    </p>

    <!-- ATIVIDADE 1 ───────────────────────────────────────────── -->
    <h2 class="guia-h2" id="ativ-1">Atividade 1 — Anatomia de um parágrafo</h2>
    <div class="guia-atividade">
      <div class="guia-ativ-header">
        <span class="guia-ativ-num">Ativ. 1</span>
        <span class="guia-ativ-titulo">Anatomia de um parágrafo</span>
      </div>
      <div class="guia-ativ-body">
        <div class="guia-ativ-meta">
          <span class="guia-ativ-tag"><strong>Módulo:</strong> Interpretação ou Leitura Estrutural</span>
          <span class="guia-ativ-tag"><strong>Duração:</strong> 30–40 min</span>
          <span class="guia-ativ-tag"><strong>Nível:</strong> Fund. II / Médio</span>
        </div>
        <p class="guia-ativ-texto">
          Escolha um texto do banco. Para o Ensino Médio, qualquer texto de Machado de Assis;
          para o Fundamental II, prefira textos informativos ou narrativas simples. Peça aos
          alunos que identifiquem, usando o módulo de Leitura Estrutural: (1) o sujeito da
          primeira frase, (2) o verbo principal de cada período, (3) pelo menos um adjunto
          adverbial.
        </p>
        <p class="guia-ativ-texto">
          Em seguida, abra o módulo de Interpretação com o mesmo texto e faça as perguntas
          de múltipla escolha em voz alta — o aluno responde antes de ver as opções.
        </p>
        <p class="guia-ativ-variante">
          <strong>Variante:</strong> para turmas mais avançadas, peça que escrevam um parágrafo
          imitando a estrutura sintática identificada — com conteúdo diferente.
        </p>
      </div>
    </div>

    <!-- ATIVIDADE 2 ───────────────────────────────────────────── -->
    <h2 class="guia-h2" id="ativ-2">Atividade 2 — Desmontando frases</h2>
    <div class="guia-atividade">
      <div class="guia-ativ-header">
        <span class="guia-ativ-num">Ativ. 2</span>
        <span class="guia-ativ-titulo">A ordem não é neutra</span>
      </div>
      <div class="guia-ativ-body">
        <div class="guia-ativ-meta">
          <span class="guia-ativ-tag"><strong>Módulo:</strong> Sintaxe</span>
          <span class="guia-ativ-tag"><strong>Duração:</strong> 20–30 min</span>
          <span class="guia-ativ-tag"><strong>Nível:</strong> Fund. II</span>
        </div>
        <p class="guia-ativ-texto">
          Acesse o módulo Sintaxe no nível Básico. Projete as frases embaralhadas e peça
          que os alunos digam — antes de interagir — qual seria a ordem correta. Discuta
          as diferenças entre as respostas e a ordem canônica do sistema.
        </p>
        <p class="guia-ativ-texto">
          No nível Avançado, introduza hipérbato e anacoluto: mostre que a "ordem errada"
          às vezes é recurso estilístico deliberado. Peça exemplos da literatura que os
          alunos já leram.
        </p>
        <p class="guia-ativ-variante">
          <strong>Variante:</strong> os alunos criam frases embaralhadas próprias e trocam
          com o colega para remontar — sem usar o sistema.
        </p>
      </div>
    </div>

    <!-- ATIVIDADE 3 ───────────────────────────────────────────── -->
    <h2 class="guia-h2" id="ativ-3">Atividade 3 — A origem das palavras</h2>
    <div class="guia-atividade">
      <div class="guia-ativ-header">
        <span class="guia-ativ-num">Ativ. 3</span>
        <span class="guia-ativ-titulo">De onde veio esta palavra?</span>
      </div>
      <div class="guia-ativ-body">
        <div class="guia-ativ-meta">
          <span class="guia-ativ-tag"><strong>Módulo:</strong> Etimologia</span>
          <span class="guia-ativ-tag"><strong>Duração:</strong> 25–35 min</span>
          <span class="guia-ativ-tag"><strong>Nível:</strong> Todos</span>
        </div>
        <p class="guia-ativ-texto">
          Peça que cada aluno escolha uma palavra do cotidiano e tente adivinhar sua origem
          antes de buscar no módulo. Compare as suposições com a etimologia real. Discuta:
          por que conhecer a origem de uma palavra ajuda a entender seu significado? Como
          palavras de raiz comum formam famílias semânticas?
        </p>
        <p class="guia-ativ-texto">
          Aproveite as palavras de origem tupi e quimbundo para introduzir a contribuição
          das línguas indígenas e africanas ao português brasileiro — e o que isso diz
          sobre nossa história.
        </p>
        <p class="guia-ativ-variante">
          <strong>Variante:</strong> "Caça ao cognato" — o professor lista dez palavras em
          português e pede que o aluno encontre, usando o módulo, qual é o cognato em
          espanhol, francês ou inglês.
        </p>
      </div>
    </div>

    <!-- ATIVIDADE 4 ───────────────────────────────────────────── -->
    <h2 class="guia-h2" id="ativ-4">Atividade 4 — Encontre a falácia</h2>
    <div class="guia-atividade">
      <div class="guia-ativ-header">
        <span class="guia-ativ-num">Ativ. 4</span>
        <span class="guia-ativ-titulo">Cadeia de argumentos</span>
      </div>
      <div class="guia-ativ-body">
        <div class="guia-ativ-meta">
          <span class="guia-ativ-tag"><strong>Módulo:</strong> Argumentação</span>
          <span class="guia-ativ-tag"><strong>Duração:</strong> 40–50 min</span>
          <span class="guia-ativ-tag"><strong>Nível:</strong> Ens. Médio</span>
        </div>
        <p class="guia-ativ-texto">
          Abra Argumentação → Falácias Informais. Mostre as definições de três falácias
          escolhidas (sugestão: <em>ad hominem</em>, espantalho, apelo à autoridade). Apresente
          à turma um editorial de jornal, discurso político ou anúncio publicitário real e
          peça que identifiquem as falácias presentes.
        </p>
        <p class="guia-ativ-texto">
          Complete os exercícios de Argumentação → Treino em formato de quiz. O placar
          é individual — a discussão é coletiva.
        </p>
        <p class="guia-ativ-variante">
          <strong>Variante:</strong> debate estruturado com dois grupos, usando Disputatio como
          referência de estrutura (Quaestio → Objectio → Determinatio → Responsio).
        </p>
      </div>
    </div>

    <!-- ATIVIDADE 5 ───────────────────────────────────────────── -->
    <h2 class="guia-h2" id="ativ-5">Atividade 5 — Perfil literário</h2>
    <div class="guia-atividade">
      <div class="guia-ativ-header">
        <span class="guia-ativ-num">Ativ. 5</span>
        <span class="guia-ativ-titulo">Quem escreveu e por quê importa</span>
      </div>
      <div class="guia-ativ-body">
        <div class="guia-ativ-meta">
          <span class="guia-ativ-tag"><strong>Módulo:</strong> Literatura / Grandes Nomes</span>
          <span class="guia-ativ-tag"><strong>Duração:</strong> 30–45 min</span>
          <span class="guia-ativ-tag"><strong>Nível:</strong> Ens. Médio</span>
        </div>
        <p class="guia-ativ-texto">
          Antes de apresentar um texto literário, mostre o perfil do autor no módulo Literatura
          ou Grandes Nomes. Leia a seção "estilo" e pergunte aos alunos: o que vocês esperam
          encontrar no texto, com base nessa descrição? Leia o trecho e discuta se a expectativa
          foi confirmada ou surpreendida.
        </p>
        <p class="guia-ativ-texto">
          O módulo ABL pode ser usado para discutir canonização: quem decide que um autor é
          "importante"? O que as recusas históricas revelam sobre o cânone literário?
        </p>
        <p class="guia-ativ-variante">
          <strong>Variante:</strong> cada dupla recebe um autor do banco e prepara uma
          apresentação de três minutos usando apenas as informações do módulo.
        </p>
      </div>
    </div>

    <!-- BNCC ──────────────────────────────────────────────────── -->
    <h2 class="guia-h2" id="bncc">Alinhamento BNCC</h2>
    <p class="guia-p">
      O Quintiliano foi construído para alinhar com as competências de Língua Portuguesa
      da BNCC — especialmente as habilidades do Ensino Médio (EM13LP) e do Fundamental II
      (EF69LP). Os módulos não citam os códigos explicitamente, mas o
      <strong>Gerador de Plano de Aula</strong> disponível neste site permite selecionar
      as habilidades BNCC correspondentes para qualquer atividade realizada com o Quintiliano.
    </p>
    <table class="guia-tabela">
      <thead>
        <tr><th>Módulo</th><th>Habilidades BNCC (exemplos)</th></tr>
      </thead>
      <tbody>
        <tr><td>Interpretação</td><td>EF69LP44, EM13LP01, EM13LP02</td></tr>
        <tr><td>Sintaxe</td><td>EF07LP03, EF08LP04, EF09LP03</td></tr>
        <tr><td>Argumentação</td><td>EM13LP10, EM13LP12, EM13LP15</td></tr>
        <tr><td>Retórica</td><td>EM13LP11, EM13LP14</td></tr>
        <tr><td>Escrita</td><td>EM13LP06, EM13LP07, EM13LP08</td></tr>
        <tr><td>Literatura / Grandes Nomes</td><td>EM13LP46, EM13LP47, EM13LP48</td></tr>
        <tr><td>Etimologia</td><td>EF06LP25, EF07LP38, EF09LP20</td></tr>
        <tr><td>Poesia</td><td>EF08LP37, EM13LP51, EM13LP54</td></tr>
      </tbody>
    </table>

    <!-- LIMITAÇÕES ────────────────────────────────────────────── -->
    <h2 class="guia-h2" id="limitacoes">Limitações</h2>
    <div class="guia-aviso">
      Comunicar as limitações aos alunos faz parte da atividade pedagógica.
      Saber o que uma ferramenta não faz é tão importante quanto saber o que ela faz.
    </div>
    <p class="guia-p">
      A análise do módulo Escrita é <strong>heurística</strong> — baseada em contagem
      e padrões estatísticos, não em compreensão de linguagem natural. Identifica padrões
      superficiais mas não avalia coerência semântica, originalidade ou qualidade argumentativa.
    </p>
    <p class="guia-p">
      O banco de textos é <strong>curado e limitado</strong>: 34 textos, todos em domínio
      público ou produzidos para o projeto. Obras com direitos autorais ativos não podem
      ser incluídas.
    </p>
    <p class="guia-p">
      A busca no Wiktionary e no Project Gutenberg requer <strong>conexão com a internet</strong>.
      Os módulos que dependem exclusivamente de dados locais — Sintaxe, Argumentação, Regras,
      Retórica, Poesia, Ortografia — funcionam offline.
    </p>
  `;

  layout.appendChild(sidebar);
  layout.appendChild(content);
  page.appendChild(layout);
  return page;
}
