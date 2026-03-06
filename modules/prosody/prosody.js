/**
 * prosody.js — Módulo 13: Prosódia
 *
 * Estrutura em 4 tabs:
 *   1. Sílabas       — divisão silábica, encontros vocálicos e consonantais
 *   2. Acentuação    — regras de acentuação gráfica pós-Acordo de 1990
 *   3. Tonicidade    — sílaba tônica, oxítonas, paroxítonas, proparoxítonas
 *   4. Exercícios    — classificação e divisão interativas
 *
 * Dados declarados neste módulo. Sem dependências externas.
 */

/* ================================================================
   BANCO: ENCONTROS VOCÁLICOS E CONSONANTAIS
   ================================================================ */

const ENCONTROS = [
  {
    tipo:    'Ditongo',
    sub:     'Vogal + semivogal (ou semivogal + vogal) na mesma sílaba',
    grupos:  [
      {
        nome:      'Ditongo crescente',
        def:       'Semivogal antes da vogal. A intensidade cresce.',
        exemplos:  ['qua-dro (wa)', 'gló-ria (ia)', 'sé-rie (ie)'],
      },
      {
        nome:      'Ditongo decrescente',
        def:       'Vogal antes da semivogal. A intensidade decresce.',
        exemplos:  ['pai', 'lei', 'mau', 'neu-tro', 'cai-xa'],
      },
      {
        nome:      'Ditongo oral',
        def:       'Sem nasalidade.',
        exemplos:  ['pai', 'rei', 'boi', 'seu'],
      },
      {
        nome:      'Ditongo nasal',
        def:       'Com nasalidade em uma ou ambas as vogais.',
        exemplos:  ['mãe', 'pão', 'bem', 'vim'],
      },
    ],
    atencao: 'Cuidado com hiatos disfarçados de ditongos: "sa-ú-de" tem hiato (a-ú), não ditongo.',
  },
  {
    tipo:    'Tritongo',
    sub:     'Semivogal + vogal + semivogal na mesma sílaba',
    grupos:  [
      {
        nome:      'Tritongo oral',
        def:       'Sequência semivogal-vogal-semivogal sem nasalidade.',
        exemplos:  ['U-ru-guai', 'i-guais', 'sa-guão (arguiu)'],
      },
      {
        nome:      'Tritongo nasal',
        def:       'Com nasalidade.',
        exemplos:  ['en-guão', 'saguão'],
      },
    ],
    atencao: 'Tritongos são raros. Na dúvida, a análise pelo contexto (oral/nasal) é suficiente.',
  },
  {
    tipo:    'Hiato',
    sub:     'Duas vogais em sílabas separadas',
    grupos:  [
      {
        nome:      'Hiato simples',
        def:       'Duas vogais que pertencem a sílabas distintas.',
        exemplos:  ['sa-ú-de', 'po-e-ta', 'bo-a', 'pa-ís'],
      },
      {
        nome:      'Identificação prática',
        def:       'Se ao separar duas vogais consecutivas cada uma soa independente, é hiato.',
        exemplos:  ['du-e-lo (u-e = hiato)', 'pi-a-da (i-a = hiato)', 'vi-ú-va (i-ú = hiato)'],
      },
    ],
    atencao: 'O i e o u tônicos após ditongo formam hiato: "pa-pa-i-a" → pa-pa-ia (ditongo) vs. "sa-í-da" → sa-í-da (hiato).',
  },
  {
    tipo:    'Dígrafo',
    sub:     'Duas letras que representam um único fonema',
    grupos:  [
      {
        nome:      'Dígrafos consonantais',
        def:       'Duas consoantes = um som.',
        exemplos:  ['ch (chave)', 'lh (filho)', 'nh (vinho)', 'rr (carro)', 'ss (passo)', 'qu (quilo)', 'gu (guerra)'],
      },
      {
        nome:      'Dígrafos vocálicos (vogais nasais)',
        def:       'Vogal + m ou n = som nasal.',
        exemplos:  ['am (campo)', 'em (tempo)', 'im (limpo)', 'om (sombra)', 'um (tumba)'],
      },
    ],
    atencao: 'Dígrafo não é sílaba. "lha" tem uma sílaba, não duas. "nh" é um fonema, não dois.',
  },
];

/* ================================================================
   BANCO: REGRAS DE ACENTUAÇÃO
   ================================================================ */

const ACENTUACAO = [
  {
    titulo:  'Oxítonas acentuadas',
    regra:   'Oxítonas terminadas em A(S), E(S), O(S), EM, ENS recebem acento.',
    exemplos: [
      { palavra: 'sofá', motivo: 'oxítona em -á' },
      { palavra: 'café', motivo: 'oxítona em -é' },
      { palavra: 'avó', motivo: 'oxítona em -ó' },
      { palavra: 'também', motivo: 'oxítona em -ém' },
      { palavra: 'parabéns', motivo: 'oxítona em -éns' },
    ],
    nao_acentua: ['amor (oxítona em -r — não entra na regra)', 'rapaz (oxítona em -z)'],
  },
  {
    titulo:  'Paroxítonas acentuadas',
    regra:   'Paroxítonas são a maioria — só se acentuam quando terminam em terminações incomuns: L, N, R, X, PS, Ã(S), ÃO(S), UM, UNS, I(S), US, ON(S).',
    exemplos: [
      { palavra: 'fácil',   motivo: 'paroxítona em -il' },
      { palavra: 'hífen',   motivo: 'paroxítona em -en' },
      { palavra: 'caráter', motivo: 'paroxítona em -er' },
      { palavra: 'tórax',   motivo: 'paroxítona em -ax' },
      { palavra: 'bíceps',  motivo: 'paroxítona em -eps' },
      { palavra: 'ímã',     motivo: 'paroxítona em -ã' },
      { palavra: 'órfão',   motivo: 'paroxítona em -ão' },
      { palavra: 'álbum',   motivo: 'paroxítona em -um' },
      { palavra: 'júri',    motivo: 'paroxítona em -i' },
      { palavra: 'vírus',   motivo: 'paroxítona em -us' },
    ],
    nao_acentua: ['casa (paroxítona em -a — terminação comum)', 'livro (em -o)', 'canto (em -o)'],
  },
  {
    titulo:  'Proparoxítonas — todas acentuadas',
    regra:   'Toda proparoxítona é acentuada, sem exceção.',
    exemplos: [
      { palavra: 'pássaro',   motivo: 'proparoxítona' },
      { palavra: 'médico',    motivo: 'proparoxítona' },
      { palavra: 'lâmpada',   motivo: 'proparoxítona' },
      { palavra: 'óculos',    motivo: 'proparoxítona' },
      { palavra: 'tráfego',   motivo: 'proparoxítona' },
    ],
    nao_acentua: [],
  },
  {
    titulo:  'Hiatos acentuados',
    regra:   'I e U tônicos sozinhos ou seguidos de S formam hiato com a vogal anterior e recebem acento (exceto quando seguidos de NH).',
    exemplos: [
      { palavra: 'saúde',  motivo: 'hiato a-ú, u tônico sozinho' },
      { palavra: 'país',   motivo: 'hiato a-í, i tônico + s' },
      { palavra: 'raízes', motivo: 'hiato a-í, i tônico' },
      { palavra: 'baú',    motivo: 'hiato a-ú, u tônico final' },
    ],
    nao_acentua: ['rainha (i+nh → não acentua)', 'moinho (i+nh)', 'muito (ditongo — ui é ditongo)'],
  },
  {
    titulo:  'Acento diferencial — o que sobrou após 1990',
    regra:   'O Acordo de 1990 aboliu o trema e vários acentos diferenciais. Sobreviveram apenas: pôr (verbo) vs. por (preposição); pôde (passado) vs. pode (presente).',
    exemplos: [
      { palavra: 'pôr',  motivo: 'verbo — distingue de "por" (preposição)' },
      { palavra: 'pôde', motivo: 'pretérito — distingue de "pode" (presente)' },
    ],
    nao_acentua: [
      'para/pára — abolido (1990)',
      'pelo/pêlo — abolido',
      'polo/pólo — abolido',
      'voo, zoo, enjoo — abolido o acento do hiato oo',
    ],
  },
];

/* ================================================================
   BANCO: TONICIDADE
   ================================================================ */

const TONICIDADE = [
  {
    classe:  'Oxítona',
    def:     'Sílaba tônica é a última.',
    dica:    'Pense em "atrás" — o peso vai para o fim.',
    exemplos: ['ca-fé', 'pa-vel', 'tam-bém', 'so-fá', 'ra-paz', 'a-mor'],
    tip:     'A maioria dos monossílabos tônicos são oxítonos: pé, mês, só, vós.',
  },
  {
    classe:  'Paroxítona',
    def:     'Sílaba tônica é a penúltima.',
    dica:    'É a classe mais comum em português — a "classe padrão".',
    exemplos: ['ca-SA', 'li-VRO', 'me-SA', 'can-TO', 'fá-cil', 'ví-rus'],
    tip:     'Palavras terminadas em -a, -e, -o, -em, -ens, -am são quase sempre paroxítonas.',
  },
  {
    classe:  'Proparoxítona',
    def:     'Sílaba tônica é a antepenúltima.',
    dica:    'Sempre acentuada — a língua "recua" o peso.',
    exemplos: ['MÉ-di-co', 'PÁS-sa-ro', 'LÂM-pa-da', 'TRÁ-fe-go', 'Ó-cu-los'],
    tip:     'Se você puder contar três sílabas após a tônica, é proparoxítona.',
  },
];

/* ================================================================
   BANCO: EXERCÍCIOS
   ================================================================ */

const EXERCICIOS = [
  {
    id:       'p01',
    tipo:     'classificacao',
    enunciado: 'Classifique a palavra "saúde" quanto ao encontro vocálico.',
    opcoes:   ['Ditongo', 'Tritongo', 'Hiato', 'Dígrafo'],
    correct:  2,
    exp:      '"sa-ú-de" — as vogais A e Ú estão em sílabas separadas (sa|ú|de). Isso é hiato.',
  },
  {
    id:       'p02',
    tipo:     'tonicidade',
    enunciado: 'Classifique "médico" quanto à posição da sílaba tônica.',
    opcoes:   ['Oxítona', 'Paroxítona', 'Proparoxítona'],
    correct:  2,
    exp:      'MÉ-di-co — a tônica é a antepenúltima sílaba. Proparoxítona — e por isso sempre acentuada.',
  },
  {
    id:       'p03',
    tipo:     'acentuacao',
    enunciado: 'Por que "café" é acentuado?',
    opcoes:   [
      'É paroxítona em terminação incomum',
      'É oxítona terminada em -e',
      'É proparoxítona',
      'Tem hiato tônico',
    ],
    correct:  1,
    exp:      '"ca-FÉ" é oxítona (tônica na última sílaba) terminada em -e. Oxítonas em -a, -e, -o, -em, -ens são acentuadas.',
  },
  {
    id:       'p04',
    tipo:     'classificacao',
    enunciado: 'Em "pai", qual encontro vocálico ocorre?',
    opcoes:   ['Hiato', 'Ditongo decrescente', 'Ditongo crescente', 'Tritongo'],
    correct:  1,
    exp:      '"pai" — vogal A seguida de semivogal I na mesma sílaba. Ditongo decrescente: a intensidade decresce do A para o I.',
  },
  {
    id:       'p05',
    tipo:     'acentuacao',
    enunciado: 'A palavra "virus" (sem acento) está correta?',
    opcoes:   [
      'Sim — paroxítona em terminação comum',
      'Não — deveria ser "vírus" (paroxítona em -us)',
      'Sim — oxítona não acentuada',
      'Não — deveria ser "virús" (oxítona)',
    ],
    correct:  1,
    exp:      '"vírus" é paroxítona terminada em -us, terminação incomum → acento obrigatório. A forma sem acento está errada.',
  },
  {
    id:       'p06',
    tipo:     'tonicidade',
    enunciado: 'Classifique "também" quanto à tonicidade.',
    opcoes:   ['Oxítona', 'Paroxítona', 'Proparoxítona'],
    correct:  0,
    exp:      '"tam-BÉM" — tônica na última sílaba. Oxítona terminada em -em → acentuada.',
  },
  {
    id:       'p07',
    tipo:     'acentuacao',
    enunciado: 'Após o Acordo de 1990, qual par de acentos diferenciais foi abolido?',
    opcoes:   [
      'pôr/por e pôde/pode — mantidos',
      'para/pára e pelo/pêlo — abolidos',
      'Apenas o trema foi abolido',
      'Proparoxítonas perderam o acento',
    ],
    correct:  1,
    exp:      'O Acordo aboliu acentos como pára, pêlo, pólo, vôo. Sobreviveram apenas pôr (verbo vs. preposição) e pôde (passado vs. presente).',
  },
  {
    id:       'p08',
    tipo:     'classificacao',
    enunciado: 'Em "guerra", o grupo "gu" é:',
    opcoes:   ['Ditongo', 'Dígrafo consonantal', 'Hiato', 'Encontro consonantal'],
    correct:  1,
    exp:      '"gu" antes de e/i é dígrafo: duas letras representam o fonema /g/. O U não é pronunciado.',
  },
  {
    id:       'p09',
    tipo:     'tonicidade',
    enunciado: 'Em qual das opções a sílaba tônica está indicada corretamente?',
    opcoes:   ['ca-SA-co', 'CA-sa-co', 'ca-sa-CO'],
    correct:  0,
    exp:      '"ca-SA-co" é paroxítona (tônica na penúltima sílaba). "casaco" termina em -o → classe padrão = paroxítona.',
  },
  {
    id:       'p10',
    tipo:     'classificacao',
    enunciado: 'Em "Uruguai", qual encontro vocálico está na última sílaba?',
    opcoes:   ['Ditongo decrescente', 'Hiato', 'Tritongo', 'Ditongo crescente'],
    correct:  2,
    exp:      '"U-ru-GUAI" — última sílaba: U (semivogal) + A (vogal) + I (semivogal) = tritongo oral.',
  },
  {
    id:       'p11',
    tipo:     'acentuacao',
    enunciado: 'Por que "jóquei" perdeu o acento após o Acordo Ortográfico de 2009?',
    opcoes:   ['Tornou-se paroxítona', 'O ditongo "ei" em paroxítonas não é mais acentuado', 'É agora monossílabo tônico', 'Passou a ser proparoxítona'],
    correct:  1,
    exp:      'O Acordo de 2009 eliminou o acento diferencial em paroxítonas com ditongos abertos "ei" e "oi" (exceto em hiatos). "Jóquei", "Corréia", "idéia" perderam o acento — são paroxítonas com ditongo, e a acentuação nesse caso tornou-se opcional e depois foi suprimida.',
  },
  {
    id:       'p12',
    tipo:     'divisao',
    enunciado: 'Como se divide "transatlântico" em sílabas?',
    opcoes:   ['tran-sa-tlân-ti-co', 'trans-at-lân-ti-co', 'tran-sat-lân-ti-co', 'trans-a-tlân-ti-co'],
    correct:  1,
    exp:      'trans-at-lân-ti-co. O dígrafo "ns" divide-se: "n" fecha a sílaba anterior ("trans"), "at" forma nova sílaba. O encontro consonantal "tl" inicia sílaba. Regra: prefixo "trans" mantém o "s" na mesma sílaba; a consoante que inicia a próxima sílaba segue a divisão do encontro consonantal.',
  },
  {
    id:       'p13',
    tipo:     'tonicidade',
    enunciado: 'Por que "difícil" recebe acento gráfico?',
    opcoes:   [
      'É oxítona terminada em -l',
      'É paroxítona terminada em -l, que exige acento',
      'É proparoxítona sempre acentuada',
      'Tem hiato tônico',
    ],
    correct:  1,
    exp:      'di-FÍ-cil — tônica na penúltima sílaba = paroxítona. Paroxítonas terminadas em -l, -r, -x, -n, -um, -uns, -ão, -ã, -i(s), -u(s) são acentuadas. "Fácil", "difícil", "álcool" seguem essa regra.',
  },
  {
    id:       'p14',
    tipo:     'encontro',
    enunciado: 'Em "cruel", "ue" é ditongo ou hiato?',
    opcoes:   ['Ditongo crescente — semivogal U + vogal E', 'Hiato — duas vogais em sílabas distintas', 'Ditongo decrescente — vogal E + semivogal U', 'Dígrafo'],
    correct:  0,
    exp:      '"cru-EL" — o U funciona como semivogal (mais breve, menos proeminente) e o E é a vogal tônica. Ditongo crescente: a vogal plena vem depois. Compara: "sa-ú-de" (hiato) — o U é tônico e está em sílaba separada.',
  },
  {
    id:       'p15',
    tipo:     'acentuacao',
    enunciado: 'Qual palavra está corretamente acentuada segundo o Acordo de 2009?',
    opcoes:   ['pára (verbo parar)', 'idéia', 'herói', 'vôo'],
    correct:  2,
    exp:      '"Herói" mantém o acento porque é oxítona com ditongo aberto "ói" — regra que permaneceu após 2009. "Pára" perdeu o acento diferencial (não havia mais ambiguidade relevante). "Idéia" perdeu (paroxítona com ditongo "ei"). "Vôo" perdeu (vogal dupla em paroxítona).',
  },
  {
    id:       'p16',
    tipo:     'tonicidade',
    enunciado: 'Qual das palavras é proparoxítona?',
    opcoes:   ['Saudade', 'Comprador', 'Número', 'Papel'],
    correct:  2,
    exp:      'NÚ-me-ro — tônica na antepenúltima sílaba. Toda proparoxítona é obrigatoriamente acentuada. "Saudade" = paroxítona, "comprador" = oxítona, "papel" = oxítona.',
  },
  {
    id:       'p17',
    tipo:     'encontro',
    enunciado: 'Em "saudade", a sequência "au" é:',
    opcoes:   ['Hiato', 'Ditongo oral decrescente', 'Ditongo nasal', 'Tritongo'],
    correct:  1,
    exp:      '"sau-DA-de" — "au" está na mesma sílaba: A (vogal) + U (semivogal). Ditongo oral decrescente — a vogal plena vem antes da semivogal. Não é hiato porque A e U estão na mesma sílaba.',
  },
  {
    id:       'p18',
    tipo:     'acentuacao',
    enunciado: 'Por que "pé" (substantivo) recebe acento mas "pe" não existe com essa grafia?',
    opcoes:   [
      'Monossílabos tônicos terminados em -e acentuado com acento para indicar abertura',
      'Todo monossílabo terminar em vogal é acentuado',
      'É oxítona terminada em vogal e por isso acentuada',
      '"Pé" é paroxítona excepcional',
    ],
    correct:  0,
    exp:      '"Pé" é monossílabo tônico com vogal aberta (é). O acento agudo em monossílabos terminados em -a, -e, -o indica que são tônicos e, quando necessário, distingue a vogal aberta. Monossílabos tônicos em -a(s), -e(s), -o(s) são acentuados.',
  },
];

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

export function renderProsodia() {
  const page = document.createElement('div');

  const TABS = [
    { id: 'silabas',    label: 'Sílabas e Encontros' },
    { id: 'acento',     label: 'Acentuação'           },
    { id: 'tonicidade', label: 'Tonicidade'            },
    { id: 'exercicios', label: 'Exercícios'            },
  ];

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Prosódia</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        O estudo dos sons e do ritmo da língua: como as sílabas se organizam,
        onde o peso da voz recai e quais letras marcam esse peso por escrito.
        Base para ortografia, leitura em voz alta e análise de poesia.
      </p>
    </div>

    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);flex-wrap:wrap" role="tablist">
      ${TABS.map((t, i) => `
        <button type="button" role="tab" class="pros-tab" data-tab="${i}"
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
      <div id="pros-panel-${i}" class="pros-panel" style="${i > 0 ? 'display:none' : ''}"></div>
    `).join('')}
  `;

  const renderers = [renderSilabas, renderAcento, renderTonicidade, renderExercicios];
  TABS.forEach((_, i) => renderers[i](page.querySelector(`#pros-panel-${i}`)));

  const tabs   = page.querySelectorAll('.pros-tab');
  const panels = page.querySelectorAll('.pros-panel');
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
   ABA 1 — SÍLABAS E ENCONTROS
   ================================================================ */

function renderSilabas(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width);display:flex;flex-direction:column;gap:var(--space-6)';

  // Regras gerais de separação
  const intro = document.createElement('div');
  intro.style.cssText = 'padding:var(--space-5) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:4px solid var(--color-accent)';
  intro.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-3)">Princípio geral da divisão silábica</p>
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-3)">
      Toda sílaba tem obrigatoriamente uma vogal. A divisão segue a pronúncia natural — separamos onde a voz faz pausa ao falar devagar.
    </p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
      ${[
        ['Dígrafos ficam juntos', 'ca-<strong>rr</strong>o, fi-<strong>lh</strong>o, ba-<strong>nh</strong>o'],
        ['Encontros consonantais: separa', 'ap-<strong>to</strong>, rit-<strong>mo</strong>, ad-<strong>mi</strong>-rar'],
        ['Encontros inseparáveis: ficam juntos', '<strong>br</strong>a-ço, <strong>cr</strong>i-se, <strong>pl</strong>a-no'],
        ['Prefixos: separam-se da raiz', 'sub-a-qui-á-ti-co, trans-a-tlân-ti-co'],
      ].map(([r, e]) => `
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper);border-radius:var(--radius);border:1px solid var(--color-paper-border)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:600;color:var(--color-ink);margin-bottom:4px">${r}</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${e}</p>
        </div>
      `).join('')}
    </div>
  `;
  wrap.appendChild(intro);

  // Cards de encontros
  ENCONTROS.forEach(enc => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-5) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <div style="flex:1">
        <p style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink)">${enc.tipo}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);font-style:italic">${enc.sub}</p>
      </div>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';
    body.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-4)">
        ${enc.grupos.map(g => `
          <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:2px solid var(--color-gold)">
            <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink);margin-bottom:4px">${g.nome}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6;margin-bottom:var(--space-2)">${g.def}</p>
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${g.exemplos.join(' · ')}</p>
          </div>
        `).join('')}
      </div>
      <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-accent);margin-bottom:4px">Atenção</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${enc.atencao}</p>
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
   ABA 2 — ACENTUAÇÃO
   ================================================================ */

function renderAcento(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width);display:flex;flex-direction:column;gap:var(--space-5)';

  ACENTUACAO.forEach(regra => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-6) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <p style="flex:1;font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-ink)">${regra.titulo}</p>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';

    body.innerHTML = `
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-5)">${regra.regra}</p>

      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplos acentuados</p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-5)">
        ${regra.exemplos.map(ex => `
          <div style="padding:var(--space-2) var(--space-4);background:var(--color-paper-dark);border-radius:var(--radius);border:1px solid var(--color-paper-border)">
            <span style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--color-accent)">${ex.palavra}</span>
            <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-left:var(--space-2)">${ex.motivo}</span>
          </div>
        `).join('')}
      </div>

      ${regra.nao_acentua.length > 0 ? `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Não acentua</p>
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:2px solid var(--color-green)">
          ${regra.nao_acentua.map(n => `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${n}</p>`).join('')}
        </div>
      ` : ''}
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
   ABA 3 — TONICIDADE
   ================================================================ */

function renderTonicidade(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-5);margin-bottom:var(--space-8)';

  TONICIDADE.forEach((cls, ci) => {
    const COLORS = ['var(--color-accent)', 'var(--color-gold)', 'var(--color-green)'];
    const card = document.createElement('div');
    card.style.cssText = `border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;border-top:4px solid ${COLORS[ci]}`;
    card.innerHTML = `
      <div style="padding:var(--space-5) var(--space-5) var(--space-4)">
        <p style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:${COLORS[ci]};margin-bottom:var(--space-2)">${cls.classe}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.65;margin-bottom:var(--space-3)">${cls.def}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-mid);margin-bottom:var(--space-4)">${cls.dica}</p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-1);margin-bottom:var(--space-4)">
          ${cls.exemplos.map(e => `
            <span style="font-family:var(--font-ui);font-size:var(--text-sm);
              background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
              border-radius:var(--radius);padding:2px 10px;color:var(--color-ink)">${e}</span>
          `).join('')}
        </div>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);line-height:1.55;border-top:1px solid var(--color-paper-border);padding-top:var(--space-3)">${cls.tip}</p>
      </div>
    `;
    grid.appendChild(card);
  });
  wrap.appendChild(grid);

  // Tabela de identificação rápida
  const tableWrap = document.createElement('div');
  tableWrap.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)">Como identificar</p>
    <div style="border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
      ${[
        ['Passo', 'Ação', 'Exemplo'],
        ['1', 'Separe as sílabas', 'ca-sa-co → 3 sílabas'],
        ['2', 'Fale em voz alta devagar', 'ca-SA-co — o SA é mais forte'],
        ['3', 'Conte a partir do fim', 'SA = penúltima → paroxítona'],
        ['4', 'Verifique se tem acento', 'casaco termina em -o → não acentua (padrão)'],
      ].map((row, ri) => `
        <div style="display:grid;grid-template-columns:60px 1fr 1fr;
          background:${ri === 0 ? 'var(--color-paper-dark)' : ri % 2 === 0 ? 'var(--color-paper)' : 'transparent'};
          border-bottom:${ri < 4 ? '1px solid var(--color-paper-border)' : 'none'}">
          ${row.map((cell, ci) => `
            <div style="padding:var(--space-3) var(--space-4);
              font-family:${ri === 0 || ci === 0 ? 'var(--font-ui)' : 'var(--font-body)'};
              font-size:var(--text-sm);
              font-weight:${ri === 0 ? '600' : '400'};
              color:${ri === 0 ? 'var(--color-ink-ghost)' : 'var(--color-ink-mid)'};
              ${ci > 0 ? 'border-left:1px solid var(--color-paper-border)' : ''}">
              ${cell}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
  wrap.appendChild(tableWrap);
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
    const TIPO_LABEL = { classificacao: 'Classificação', tonicidade: 'Tonicidade', acentuacao: 'Acentuação' };

    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper)';

    card.innerHTML = `
      <div style="padding:var(--space-5) var(--space-6)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;
          letter-spacing:0.06em;color:var(--color-accent);margin-bottom:var(--space-3)">${TIPO_LABEL[q.tipo] ?? q.tipo}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-4)">${q.enunciado}</p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)" id="opts-pr-${q.id}"></div>
        <div id="fb-pr-${q.id}" style="margin-top:var(--space-4);display:none"></div>
      </div>
    `;

    const optsWrap = card.querySelector(`#opts-pr-${q.id}`);
    const fbEl     = card.querySelector(`#fb-pr-${q.id}`);
    let answered   = false;

    q.opcoes.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);font-weight:500;
        padding:var(--space-2) var(--space-4);border-radius:var(--radius);
        border:1.5px solid var(--color-paper-border);
        background:var(--color-paper-dark);color:var(--color-ink);
        cursor:pointer;transition:all var(--transition-fast);
      `;
      btn.textContent = opt;
      btn.addEventListener('mouseenter', () => { if (!answered) btn.style.borderColor = 'var(--color-accent)'; });
      btn.addEventListener('mouseleave', () => { if (!answered) btn.style.borderColor = 'var(--color-paper-border)'; });
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        score.total++;
        const correct = idx === q.correct;
        if (correct) score.correct++;

        optsWrap.querySelectorAll('button').forEach((b, i) => {
          b.style.cursor = 'default';
          if (i === q.correct) {
            b.style.background   = '#e8f5e9';
            b.style.borderColor  = 'var(--color-green)';
            b.style.color        = 'var(--color-green)';
          } else if (i === idx && !correct) {
            b.style.background   = '#fce8e8';
            b.style.borderColor  = 'var(--color-accent)';
            b.style.color        = 'var(--color-accent)';
          }
        });

        fbEl.style.display = 'block';
        fbEl.innerHTML = `
          <div style="border-left:3px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'};padding-left:var(--space-4)">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
              text-transform:uppercase;letter-spacing:0.06em;
              color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};
              margin-bottom:var(--space-1)">
              ${correct ? 'Correto' : `Incorreto — resposta: ${q.opcoes[q.correct]}`}
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
