/**
 * variation.js — Módulo 15: Variação Linguística
 *
 * Estrutura em 4 tabs:
 *   1. Tipos de Variação  — diatópica, diastrática, diafásica, diacrônica
 *   2. Registros          — formal, informal, técnico, literário — quando usar cada um
 *   3. Norma e Preconceito — norma culta vs. norma padrão, preconceito linguístico
 *   4. Exercícios         — identificação de registro e variação
 *
 * Dados declarados neste módulo. Sem dependências externas.
 */

/* ================================================================
   BANCO: TIPOS DE VARIAÇÃO
   ================================================================ */

const TIPOS = [
  {
    nome:    'Diatópica (geográfica)',
    icone:   '🗺',
    def:     'Variação de uma região para outra. Falantes de regiões diferentes da mesma língua produzem formas distintas — vocabulário, pronúncia, entonação.',
    exemplos: [
      { var: 'mandioca', reg: 'Sul e Sudeste' },
      { var: 'aipim',    reg: 'Rio de Janeiro' },
      { var: 'macaxeira', reg: 'Nordeste' },
      { var: 'ônibus',   reg: 'maioria do Brasil' },
      { var: 'lotação',  reg: 'Rio de Janeiro' },
      { var: 'bonde',    reg: 'São Paulo (informal)' },
    ],
    atencao: 'Nenhuma variante regional é "errada". São formas igualmente válidas do português — diferem em distribuição geográfica, não em correção.',
  },
  {
    nome:    'Diastrática (social)',
    icone:   '👥',
    def:     'Variação ligada ao grupo social: escolaridade, profissão, classe, faixa etária. O mesmo falante pode pertencer a múltiplos grupos e transitar entre suas variedades.',
    exemplos: [
      { var: 'gíria de grupo',   reg: 'Jovens: "mitar", "lacrar", "cancelar"' },
      { var: 'jargão profissional', reg: 'Médicos: "hemiplegia", "escara"' },
      { var: 'fala de idosos',   reg: '"gramofone", "longa-metragem" por "filme"' },
      { var: 'variedade popular', reg: '"nós vai", "a gente fomos"' },
    ],
    atencao: 'Variedades de menor prestígio social não são linguisticamente inferiores. O estigma é social, não linguístico.',
  },
  {
    nome:    'Diafásica (situacional)',
    icone:   '🎭',
    def:     'Variação segundo a situação de comunicação. O mesmo falante usa formas diferentes dependendo de com quem fala, onde e para quê — é o registro.',
    exemplos: [
      { var: 'Conversa com amigos', reg: '"E aí, tudo bem? Que foi?"' },
      { var: 'Entrevista de emprego', reg: '"Boa tarde. Tenho experiência em…"' },
      { var: 'E-mail profissional',  reg: '"Prezado senhor, venho por meio deste…"' },
      { var: 'Mensagem de voz',      reg: '"Oi, me liga quando puder!"' },
    ],
    atencao: 'Adequação é a habilidade central: saber qual variedade usar em cada contexto. Isso não é "falar certo" — é falar apropriado.',
  },
  {
    nome:    'Diacrônica (histórica)',
    icone:   '⏳',
    def:     'Variação ao longo do tempo. Línguas mudam — palavras surgem, desaparecem, mudam de sentido. O português do século XVI é quase ininteligível para falantes modernos sem preparo.',
    exemplos: [
      { var: 'vós falais',     reg: 'Português arcaico — hoje: "vocês falam"' },
      { var: 'farmácia',       reg: 'Surgiu do grego via árabe — "botica" era o termo' },
      { var: 'selfie, drone',  reg: 'Neologismos do século XXI' },
      { var: 'botar',          reg: 'Hoje informal no Sul — era padrão no século XIX' },
    ],
    atencao: 'Língua que muda é língua viva. Resistência à mudança é natural, mas a mudança é inevitável e não significa "degradação".',
  },
];

/* ================================================================
   BANCO: REGISTROS
   ================================================================ */

const REGISTROS = [
  {
    nome:    'Formal',
    cor:     'var(--color-accent)',
    def:     'Situações de maior distância social, contexto institucional ou escrito público. Exige proximidade com a norma padrão.',
    quando:  ['Petição judicial', 'Dissertação acadêmica', 'Discurso oficial', 'Carta formal', 'Contrato'],
    marcas:  ['Vocabulário preciso e sem ambiguidade', 'Concordância estrita', 'Sem gírias ou contrações informais', 'Frases completas'],
    evitar:  ['Gírias', 'Abreviações ("vc", "tb")', 'Elipses não convencionais', 'Segunda pessoa informal ("você" → preferir "o senhor/a")'],
    ex_bom:  'Venho, por meio deste, solicitar a reconsideração do indeferimento.',
    ex_ruim: 'Tô mandando isso pra ver se dá pra reverter essa decisão.',
  },
  {
    nome:    'Informal',
    cor:     'var(--color-green)',
    def:     'Situações de proximidade social, contexto cotidiano ou comunicação entre iguais. Permite mais variação e criatividade.',
    quando:  ['Conversa com amigos', 'Mensagem de texto', 'Redes sociais pessoais', 'Diário'],
    marcas:  ['Contrações naturais ("tô", "tá", "pra")', 'Gírias do grupo', 'Frases curtas ou incompletas', 'Emoticons e interjeições'],
    evitar:  ['Registro formal em contexto de intimidade soa distante ou irônico', 'Não existe "evitar" — apenas adequação ao contexto'],
    ex_bom:  'Ei, tudo bem? Me fala quando você chegar!',
    ex_ruim: '— (não há "errado" aqui — depende do contexto)',
  },
  {
    nome:    'Técnico / Científico',
    cor:     'var(--color-gold)',
    def:     'Linguagem especializada de uma área do conhecimento. Alta precisão semântica — cada termo tem significado fixo, diferente do uso comum.',
    quando:  ['Artigo científico', 'Laudo médico', 'Bula de remédio', 'Manual de engenharia', 'Processo jurídico'],
    marcas:  ['Terminologia específica da área', 'Ausência de ambiguidade', 'Frases nominais e passivas', 'Impessoalidade'],
    evitar:  ['Termos técnicos em texto para público leigo sem explicação', 'Misturar jargões de áreas diferentes'],
    ex_bom:  'O paciente apresentou quadro de insuficiência cardíaca congestiva com fração de ejeção reduzida.',
    ex_ruim: 'O coração do paciente não tava bombeando direito e ele ficou com água no pulmão. (para laudo)',
  },
  {
    nome:    'Literário',
    cor:     'var(--color-ink-mid)',
    def:     'A língua como material estético. Viola deliberadamente convenções para criar efeito — pode ser formal, informal, técnico ou arcaico conforme o projeto do autor.',
    quando:  ['Romance', 'Poesia', 'Conto', 'Crônica literária'],
    marcas:  ['Polissemia intencional', 'Desvios gramaticais com função', 'Ritmo e sonoridade', 'Imagens e figuras'],
    evitar:  ['Julgar pela norma padrão — o "erro" pode ser recurso', 'Confundir língua do narrador com língua do autor'],
    ex_bom:  '"Amar o perdido / deixa confundido / este coração." (Drummond)',
    ex_ruim: '— (não há errado — o critério é o efeito estético)',
  },
];

/* ================================================================
   BANCO: NORMA E PRECONCEITO
   ================================================================ */

const NORMA = [
  {
    titulo: 'Norma culta vs. norma padrão',
    corpo: `
      <p style="margin-bottom:var(--space-3)"><strong>Norma padrão</strong> é o conjunto de regras codificadas em gramáticas normativas e manuais de redação.
      É uma abstração — nenhum falante a usa de forma completa e natural em toda situação.</p>
      <p style="margin-bottom:var(--space-3)"><strong>Norma culta</strong> é o uso real dos falantes escolarizados em situações formais.
      É empírica — descrita a partir do que falantes reais produzem, não do que a gramática prescreve.</p>
      <p>A diferença importa: "a gente foi" é norma culta real (falantes escolarizados usam).
      "Nós fomos" é a forma da norma padrão. Ambas coexistem — o contexto define qual é mais adequada.</p>
    `,
  },
  {
    titulo: 'O que é preconceito linguístico',
    corpo: `
      <p style="margin-bottom:var(--space-3)">Preconceito linguístico é tratar uma variedade da língua como inferior, errada ou feia com base em critérios sociais — não linguísticos.
      Toda variedade tem uma gramática interna coerente.</p>
      <p style="margin-bottom:var(--space-3)">Exemplos de preconceito linguístico:</p>
      <ul style="padding-left:var(--space-5);display:flex;flex-direction:column;gap:var(--space-2)">
        <li>"Nordestino fala errado" — é variação diatópica, não erro</li>
        <li>"Pobre não sabe português" — é variação diastrática, não ignorância</li>
        <li>"Jovens estão destruindo a língua" — é variação diacrônica, não degradação</li>
      </ul>
    `,
  },
  {
    titulo: 'Adequação vs. correção',
    corpo: `
      <p style="margin-bottom:var(--space-3)">A pergunta mais útil não é "está certo?" mas "está adequado?". Uma frase pode estar de acordo com a norma padrão e ser inadequada ao contexto — e vice-versa.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-green)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-green);margin-bottom:var(--space-2)">Adequado</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">"Oi, tudo bem?" — para um amigo<br>"Prezado Dr. Silva…" — para e-mail profissional</p>
        </div>
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-accent)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2)">Inadequado (mas não errado)</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">"Prezado amigo…" — para um colega próximo<br>"Ei cara, tô te mandando isso…" — em petição jurídica</p>
        </div>
      </div>
    `,
  },
  {
    titulo: 'Por que estudar a norma padrão mesmo assim?',
    corpo: `
      <p style="margin-bottom:var(--space-3)">Dominar a norma padrão é uma ferramenta de acesso social — não uma obrigação moral.
      Quem a domina pode usá-la em contextos que a exigem (concursos, universidade, publicações, contratos).
      Quem não a domina tem o acesso a esses contextos restringido — independentemente da qualidade de seu pensamento.</p>
      <p>Estudar a norma padrão não é abandonar a variedade nativa. É <em>adicionar</em> um registro ao repertório — não substituir.</p>
    `,
  },
];

/* ================================================================
   BANCO: EXERCÍCIOS
   ================================================================ */

const EXERCICIOS = [
  {
    id:   'v01',
    inst: '"Mano, vou chegando agora. Bora tomar aquele sorvete?" — Qual tipo de variação esse trecho exemplifica?',
    opts: ['Diatópica', 'Diastrática', 'Diafásica (registro informal)', 'Diacrônica'],
    ok:   2,
    exp:  'A variação é diafásica — o registro muda conforme a situação (conversa informal entre conhecidos). "Mano" e "bora" são marcas de informalidade situacional, não regional ou geracional.',
  },
  {
    id:   'v02',
    inst: '"Aipim" no Rio de Janeiro e "macaxeira" no Nordeste para o mesmo tubérculo. Que tipo de variação é essa?',
    opts: ['Diastrática', 'Diafásica', 'Diatópica', 'Diacrônica'],
    ok:   2,
    exp:  'Variação diatópica: formas diferentes para o mesmo referente em regiões geográficas distintas. Ambas são corretas — diferem em distribuição regional.',
  },
  {
    id:   'v03',
    inst: 'Qual das opções abaixo é um exemplo de preconceito linguístico?',
    opts: [
      'Reconhecer que "nós fomos" é norma padrão e "a gente foi" é norma culta real',
      'Afirmar que o nordestino "fala errado" por usar "oxente" e "vixe"',
      'Preferir registro formal em concurso público',
      'Notar que jovens usam gírias que idosos não usam',
    ],
    ok:   1,
    exp:  'Atribuir "erro" a uma variedade regional é preconceito linguístico. "Oxente" e "vixe" são formas regionais válidas — não erros. Variedades são diferentes, não inferiores.',
  },
  {
    id:   'v04',
    inst: '"O paciente evoluiu com quadro de broncopneumonia bilateral." Esse trecho pertence a qual registro?',
    opts: ['Informal', 'Literário', 'Técnico/científico', 'Formal genérico'],
    ok:   2,
    exp:  '"Broncopneumonia bilateral" é terminologia médica específica. O texto pertence ao registro técnico/científico — linguagem especializada com precisão semântica máxima.',
  },
  {
    id:   'v05',
    inst: 'Um estudante usa "vós tendes" numa conversa casual com amigos. O problema é:',
    opts: [
      'Erro gramatical — "vós" não existe mais',
      'Inadequação de registro — forma arcaica em contexto informal',
      'Preconceito linguístico',
      'Variação diatópica incorreta',
    ],
    ok:   1,
    exp:  '"Vós tendes" é gramaticalmente correto na norma padrão arcaica, mas inadequado para conversa informal. O problema não é correção — é adequação ao contexto.',
  },
  {
    id:   'v06',
    inst: '"Selfie", "stalkear", "cancelar" (uma pessoa) são exemplos de qual tipo de variação?',
    opts: ['Diatópica', 'Diastrática', 'Diacrônica', 'Diafásica'],
    ok:   2,
    exp:  'Palavras que surgem com o tempo são variação diacrônica — a língua muda e incorpora novos termos. Também têm componente diastrático (mais usados por jovens), mas o fenômeno primário é histórico.',
  },
  {
    id:   'v07',
    inst: 'Qual é a diferença entre norma padrão e norma culta?',
    opts: [
      'São sinônimos — referem-se à mesma coisa',
      'Norma padrão é o uso real de escolarizados; norma culta é a gramática normativa',
      'Norma padrão é prescritiva (regras codificadas); norma culta é descritiva (uso real de escolarizados)',
      'Norma culta é mais rigorosa que norma padrão',
    ],
    ok:   2,
    exp:  'Norma padrão = regras prescritas por gramáticas. Norma culta = uso real e empírico de falantes escolarizados em situações formais. A norma culta pode diferir da padrão — "a gente foi" é norma culta, "nós fomos" é norma padrão.',
  },
  {
    id:   'v08',
    inst: 'Um texto literário usa "as pernas dela era bonita" intencionalmente. Como analisar isso?',
    opts: [
      'Erro gramatical — concordância incorreta',
      'Pode ser recurso estilístico para retratar fala de personagem ou efeito sonoro',
      'Variação diatópica do autor',
      'Norma culta regional aceita',
    ],
    ok:   1,
    exp:  'Em literatura, o "erro" pode ser recurso. A não-concordância pode retratar a fala de um personagem, criar ritmo ou aproximar o texto da oralidade. O critério não é a norma padrão — é o efeito estético.',
  },
  {
    id:   'v09',
    inst: '"Vossa Excelência, permita-me apresentar os fundamentos jurídicos deste recurso." Que tipo de variação linguística esse trecho exemplifica?',
    opts: ['Diacrônica — forma arcaica', 'Diafásica — registro formal técnico-jurídico', 'Diatópica — variante regional', 'Diastrática — variante de classe social'],
    ok:   1,
    exp:  '"Vossa Excelência" e a sintaxe cuidadosa marcam registro formal específico do contexto jurídico. Variação diafásica: o falante adapta a linguagem ao contexto (tribunal), não à região ou época.',
  },
  {
    id:   'v10',
    inst: '"Saudade" não tem equivalente direto em inglês ou alemão. Que fenômeno isso ilustra?',
    opts: [
      'Preconceito linguístico — línguas europeias são inferiores',
      'Que português é mais expressivo que outros idiomas',
      'Que o léxico de cada língua reflete a cultura e a experiência de seu povo',
      'Variação diastrática — saudade é palavra de classe baixa',
    ],
    ok:   2,
    exp:  'O léxico não é universal — reflete a cosmovisão de uma cultura. "Saudade" cristaliza uma experiência afetiva específica da cultura lusófona. Nenhuma língua é mais rica — são diferentes em suas ênfases.',
  },
  {
    id:   'v11',
    inst: 'No século XIX, dizia-se "vossa mercê", que virou "vosmecê", depois "você". Que tipo de variação registra essa mudança?',
    opts: ['Diatópica', 'Diastrática', 'Diafásica', 'Diacrônica'],
    ok:   3,
    exp:  'Diacrônica: variação ao longo do tempo. A língua muda de geração em geração — formas que pareciam "erros" tornam-se a norma. "Você" hoje é padrão; sua origem é uma forma popular desgastada.',
  },
  {
    id:   'v12',
    inst: 'Um professor corrige um aluno de comunidade periférica dizendo "você fala errado". O que está errado nessa correção?',
    opts: [
      'Nada — cabe ao professor ensinar a norma padrão',
      'O professor deveria usar a BNCC como argumento',
      'Confunde variedade linguística com erro — a fala do aluno segue regras sistemáticas de sua variante',
      'O professor deveria corrigir apenas a escrita, não a fala',
    ],
    ok:   2,
    exp:  'Toda variedade linguística é sistemática e regida por regras. O que o professor chama de "erro" é uma variante diastrática e diatópica. Ensinar a norma padrão é legítimo; dizer que o aluno "fala errado" é preconceito linguístico — nega a inteligência e a coerência da variedade materna do aluno.',
  },
  {
    id:   'v13',
    inst: '"Tu vai no mercado?" é gramatical em português?',
    opts: [
      'Não — é erro de concordância',
      'Sim — é uma variante sistemática presente em vários dialetos brasileiros',
      'Sim — mas apenas em registro informal',
      'Não — "tu" não existe no português brasileiro',
    ],
    ok:   1,
    exp:  'Em grande parte do Brasil (especialmente Norte e Nordeste), "tu" combina com verbo na 3ª pessoa singular ("tu vai", "tu fez"). É variante sistemática — não erro. A concordância "tu vais" é padrão prescrito, mas "tu vai" é norma culta real em regiões onde "tu" é usado.',
  },
  {
    id:   'v14',
    inst: 'Por que o mesmo texto não pode ter simultaneamente registro formal e informal?',
    opts: [
      'Pode — depende do gênero textual e do efeito desejado',
      'Não pode — a coerência exige registro único',
      'Depende — na ficção é possível; na não-ficção, não',
      'Pode — mas apenas se houver aspas nas partes informais',
    ],
    ok:   0,
    exp:  'Pode sim — e frequentemente é um recurso consciente. Romances misturam narrador culto e personagens em registro oral. Artigos de opinião às vezes inserem coloquialismo para efeito retórico. O que importa é que a escolha seja intencional e coerente com o projeto de texto.',
  },
];

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

export function renderVariacao() {
  const page = document.createElement('div');

  const TABS = [
    { id: 'tipos',     label: 'Tipos de Variação' },
    { id: 'registros', label: 'Registros'          },
    { id: 'norma',     label: 'Norma e Preconceito'},
    { id: 'exercicios',label: 'Exercícios'          },
  ];

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Variação Linguística</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        A língua não é um bloco homogêneo — ela varia conforme a região, o grupo social,
        a situação e o tempo. Entender essa variação é entender que não existe variedade
        "errada": existe variedade adequada ou inadequada a cada contexto.
      </p>
    </div>

    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);flex-wrap:wrap" role="tablist">
      ${TABS.map((t, i) => `
        <button type="button" role="tab" class="var-tab" data-tab="${i}"
          aria-selected="${i === 0}"
          style="font-family:var(--font-ui);font-size:var(--text-sm);padding:var(--space-3) var(--space-4);
          border:none;background:none;cursor:pointer;white-space:nowrap;
          color:${i === 0 ? 'var(--color-accent)' : 'var(--color-ink-ghost)'};
          border-bottom:2px solid ${i === 0 ? 'var(--color-accent)' : 'transparent'};
          margin-bottom:-2px;transition:all var(--transition-fast);"
        >${t.label}</button>
      `).join('')}
    </div>

    ${TABS.map((t, i) => `
      <div id="var-panel-${i}" class="var-panel" style="${i > 0 ? 'display:none' : ''}"></div>
    `).join('')}
  `;

  const renderers = [renderTipos, renderRegistros, renderNorma, renderExercicios];
  TABS.forEach((_, i) => renderers[i](page.querySelector(`#var-panel-${i}`)));

  const tabs   = page.querySelectorAll('.var-tab');
  const panels = page.querySelectorAll('.var-panel');
  tabs.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabs.forEach((b, j) => {
        const active = j === i;
        b.style.color        = active ? 'var(--color-accent)' : 'var(--color-ink-ghost)';
        b.style.borderBottom = active ? '2px solid var(--color-accent)' : '2px solid transparent';
        b.setAttribute('aria-selected', String(active));
      });
      panels.forEach((p, j) => { p.style.display = j === i ? '' : 'none'; });
    });
  });

  return page;
}

/* ================================================================
   ABA 1 — TIPOS
   ================================================================ */

function renderTipos(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width);display:flex;flex-direction:column;gap:var(--space-5)';

  TIPOS.forEach(tipo => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-5) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <p style="flex:1;font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink)">${tipo.nome}</p>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';
    body.innerHTML = `
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-5)">${tipo.def}</p>

      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplos</p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-5)">
        ${tipo.exemplos.map(e => `
          <div style="padding:var(--space-2) var(--space-3);background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius)">
            <span style="font-family:var(--font-display);font-size:var(--text-base);font-weight:600;color:var(--color-accent)">${e.var}</span>
            <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-left:6px">${e.reg}</span>
          </div>
        `).join('')}
      </div>

      <div style="border-left:3px solid var(--color-gold);padding-left:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-gold);margin-bottom:4px">Ponto central</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${tipo.atencao}</p>
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
    wrap.appendChild(card);
  });

  el.appendChild(wrap);
}

/* ================================================================
   ABA 2 — REGISTROS
   ================================================================ */

function renderRegistros(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const grid = document.createElement('div');
  grid.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-5)';

  REGISTROS.forEach(r => {
    const card = document.createElement('div');
    card.style.cssText = `border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;border-left:4px solid ${r.cor}`;

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-5) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <div style="flex:1">
        <p style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink)">${r.nome}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-mid)">${r.def}</p>
      </div>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';
    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-4)">
        <div>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Quando usar</p>
          ${r.quando.map(w => `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55;padding:2px 0">· ${w}</p>`).join('')}
        </div>
        <div>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Marcas do registro</p>
          ${r.marcas.map(m => `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55;padding:2px 0">· ${m}</p>`).join('')}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)">
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-green)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-green);margin-bottom:4px">Exemplo adequado</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);line-height:1.6">"${r.ex_bom}"</p>
        </div>
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-accent)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-accent);margin-bottom:4px">Inadequado neste contexto</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);line-height:1.6">"${r.ex_ruim}"</p>
        </div>
      </div>

      <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-accent);margin-bottom:4px">Atenção</p>
        ${r.evitar.map(e => `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${e}</p>`).join('')}
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
    grid.appendChild(card);
  });

  wrap.appendChild(grid);
  el.appendChild(wrap);
}

/* ================================================================
   ABA 3 — NORMA E PRECONCEITO
   ================================================================ */

function renderNorma(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width);display:flex;flex-direction:column;gap:var(--space-5)';

  NORMA.forEach(n => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-5) var(--space-6)';
    card.innerHTML = `
      <p style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-4)">${n.titulo}</p>
      <div style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75">${n.corpo}</div>
    `;
    wrap.appendChild(card);
  });

  el.appendChild(wrap);
}

/* ================================================================
   ABA 4 — EXERCÍCIOS
   ================================================================ */

function renderExercicios(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const score = { total: 0, correct: 0 };
  const scoreEl = document.createElement('div');
  scoreEl.style.cssText = 'margin-bottom:var(--space-4)';
  wrap.appendChild(scoreEl);

  function updateScore() {
    if (score.total === 0) { scoreEl.innerHTML = ''; return; }
    scoreEl.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">
        Respondidas: <strong style="color:var(--color-ink)">${score.total}</strong> &nbsp;|&nbsp;
        Acertos: <strong style="color:var(--color-green)">${score.correct}</strong> &nbsp;|&nbsp;
        Erros: <strong style="color:var(--color-accent)">${score.total - score.correct}</strong>
      </p>
    `;
  }

  const list = document.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  EXERCICIOS.forEach(q => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper)';
    card.innerHTML = `
      <div style="padding:var(--space-5) var(--space-6)">
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-4)">${q.inst}</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-2)" id="opts-va-${q.id}"></div>
        <div id="fb-va-${q.id}" style="margin-top:var(--space-4);display:none"></div>
      </div>
    `;

    const optsWrap = card.querySelector(`#opts-va-${q.id}`);
    const fbEl     = card.querySelector(`#fb-va-${q.id}`);
    let answered   = false;

    q.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);font-weight:500;
        padding:var(--space-2) var(--space-4);border-radius:var(--radius);
        border:1.5px solid var(--color-paper-border);text-align:left;
        background:var(--color-paper-dark);color:var(--color-ink);
        cursor:pointer;transition:all var(--transition-fast);width:100%;
      `;
      btn.textContent = opt;
      btn.addEventListener('mouseenter', () => { if (!answered) btn.style.borderColor = 'var(--color-accent)'; });
      btn.addEventListener('mouseleave', () => { if (!answered) btn.style.borderColor = 'var(--color-paper-border)'; });
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        score.total++;
        const correct = idx === q.ok;
        if (correct) score.correct++;

        optsWrap.querySelectorAll('button').forEach((b, i) => {
          b.style.cursor = 'default';
          if (i === q.ok) { b.style.background = '#e8f5e9'; b.style.borderColor = 'var(--color-green)'; b.style.color = 'var(--color-green)'; }
          else if (i === idx && !correct) { b.style.background = '#fce8e8'; b.style.borderColor = 'var(--color-accent)'; b.style.color = 'var(--color-accent)'; }
        });

        fbEl.style.display = 'block';
        fbEl.innerHTML = `
          <div style="border-left:3px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'};padding-left:var(--space-4)">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
              text-transform:uppercase;letter-spacing:0.06em;
              color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};margin-bottom:var(--space-1)">
              ${correct ? 'Correto' : `Incorreto — resposta: ${q.opts[q.ok]}`}
            </p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${q.exp}</p>
          </div>
        `;
        updateScore();
      });
      optsWrap.appendChild(btn);
    });

    list.appendChild(card);
  });

  wrap.appendChild(list);
  el.appendChild(wrap);
}
