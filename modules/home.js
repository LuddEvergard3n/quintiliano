/**
 * home.js — Módulo da página inicial
 *
 * Apresenta o sistema e oferece acesso direto a todos os módulos.
 */

/**
 * @returns {HTMLElement}
 */
export function renderHome() {
  const page = document.createElement('div');

  page.innerHTML = `
    <section class="home-hero">
      <h1 class="hero-title">Quintiliano</h1>
      <p class="hero-subtitle">
        Não apenas leia textos.<br>Opere com eles.
      </p>
      <p style="font-family:var(--font-body);color:var(--color-ink-light);max-width:480px;margin:0 auto;line-height:1.7;">
        Um ambiente de interpretação e estrutura textual para quem quer entender
        como a língua portuguesa funciona — não decorar suas regras.
      </p>
    </section>

    <div class="divider"></div>

    <section style="margin-bottom:var(--space-16)">
      <h2 class="section-title">Módulos</h2>
      <div class="modules-grid" id="modules-grid"></div>
    </section>

    <section style="max-width:var(--content-width);margin:0 auto">
      <div class="panel panel-info">
        <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-mid)">
          <strong>Para professores:</strong> cada módulo pode ser projetado em sala.
          Use o modo de exercício guiado para acompanhar a turma coletivamente.
          Todos os materiais funcionam sem conexão com a internet.
        </p>
      </div>
    </section>
  `;

  const modules = [
    {
      number: '01',
      title:  'Leitura Estrutural',
      desc:   'Identifique sujeito, verbo, objeto e modificadores clicando nas palavras do texto. Torne visível o que a gramática esconde.',
      path:   '/modulo/leitura',
    },
    {
      number: '02',
      title:  'Interpretação',
      desc:   'Treine ideia principal, argumento, evidência, inferência, ironia e tom do autor com textos reais da literatura brasileira.',
      path:   '/modulo/interpretacao',
    },
    {
      number: '03',
      title:  'Sintaxe e Construção',
      desc:   'Reorganize frases embaralhadas. Entenda por que a ordem das palavras importa para o sentido da frase.',
      path:   '/modulo/sintaxe',
    },
    {
      number: '04',
      title:  'Etimologia',
      desc:   'Descubra a origem das palavras do português — do latim, grego, árabe, tupi e outras línguas. Entenda a história escondida em cada termo.',
      path:   '/modulo/etimologia',
    },
    {
      number: '05',
      title:  'Literatura',
      desc:   'Conheça autores brasileiros e portugueses pelo seu estilo, contexto histórico e influência — sem a pressão de ler obras completas agora.',
      path:   '/modulo/literatura',
    },
    {
      number: '06',
      title:  'Escrita',
      desc:   'Analise e melhore suas frases. Identifique redundâncias, reorganize ideias e fortaleça argumentos com análise estrutural.',
      path:   '/modulo/escrita',
    },
    {
      number: '07',
      title:  'Poesia',
      desc:   'Verso, estrofe, rima, metro e figuras sonoras. Leia poemas e aprenda como o som e o sentido se constroem juntos.',
      path:   '/modulo/poesia',
    },
    {
      number: '08',
      title:  'Argumentação',
      desc:   'A arte do debate como os doutores medievais: disputatio, estrutura do argumento, falácias formais e informais, técnicas de refutação.',
      path:   '/modulo/argumentacao',
    },
    {
      number: '09',
      title:  'Regras da Língua',
      desc:   '23 regras da língua portuguesa organizadas por nível: do alfabeto e pontuação básica até coesão, coerência e norma culta acadêmica.',
      path:   '/modulo/regras',
    },
    {
      number: '10',
      title:  'Ortografia',
      desc:   'Hífen, X/CH, S/Z, G/J, os quatro porquês, mal/mau e mas/mais. Regras com macetes, exercícios de lacuna e tabela de referência rápida.',
      path:   '/modulo/ortografia',
    },
    {
      number: '11',
      title:  'Redação',
      desc:   'Estrutura da dissertação-argumentativa (ENEM), carta argumentativa e resenha crítica. Construtor guiado por seção com checklist de critérios.',
      path:   '/modulo/redacao',
    },
    {
      number: '12',
      title:  'Retórica',
      desc:   'Ethos, pathos e logos — os três modos aristotélicos de persuasão. Partes do discurso clássico, figuras retóricas e análise de discursos históricos.',
      path:   '/modulo/retorica',
    },
    {
      number: '13',
      title:  'Prosódia',
      desc:   'Sílabas, encontros vocálicos e consonantais, tonicidade e regras de acentuação. A base sonora da língua — do ditongo ao acento diferencial.',
      path:   '/modulo/prosodia',
    },
    {
      number: '14',
      title:  'Coesão e Coerência',
      desc:   'Os fios que costuram o texto: referência, substituição, elipse, conectivos. E a lógica que o sustenta: progressão temática, contradição, ambiguidade.',
      path:   '/modulo/coesao',
    },
    {
      number: '15',
      title:  'Variação Linguística',
      desc:   'Diatópica, diastrática, diafásica e diacrônica. Registros formal, informal e técnico. Norma culta vs. padrão e o que é — e o que não é — preconceito linguístico.',
      path:   '/modulo/variacao',
    },
    {
      number: 'PRL',
      title:  'Prêmios Literários',
      desc:   'Camões, Jabuti e Nobel — os três prêmios que definem o reconhecimento da literatura em língua portuguesa. Vencedores notáveis, ausências reveladoras e o que cada premiação diz sobre o cânone que constrói.',
      path:   '/modulo/premios',
    },
    {
      number: 'GN',
      title:  'Grandes Nomes da Língua Portuguesa',
      desc:   'Dez escritores canônicos com perfil, estilo e três obras imprescindíveis cada. Machado de Assis em primeiro, por consenso crítico e fundação da ABL. Drummond, Camões, Pessoa, Clarice e mais cinco.',
      path:   '/modulo/grandes-nomes',
    },
    {
      number: 'ABL',
      title:  'Academia Brasileira de Letras',
      desc:   '40 cadeiras permanentes desde 1897. Patronos, ocupantes notáveis, recusas históricas e o que a consagração — e a rejeição — dizem sobre a literatura brasileira.',
      path:   '/abl',
    },
  ];

  const grid = page.querySelector('#modules-grid');

  modules.forEach(mod => {
    const card = document.createElement('a');
    card.className = 'module-card';
    card.href = `#${mod.path}`;
    card.setAttribute('aria-label', `Acessar módulo: ${mod.title}`);
    card.innerHTML = `
      <div class="module-number" aria-hidden="true">${mod.number}</div>
      <h3 class="module-title">${mod.title}</h3>
      <p class="module-description">${mod.desc}</p>
    `;
    grid.appendChild(card);
  });

  return page;
}
