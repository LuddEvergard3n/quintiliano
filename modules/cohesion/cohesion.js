/**
 * cohesion.js — Módulo 14: Coesão e Coerência
 *
 * Estrutura em 4 tabs:
 *   1. Coesão          — mecanismos de ligação entre frases e parágrafos
 *   2. Conectivos      — classificação por função com exemplos de uso e erro
 *   3. Coerência       — progressão temática, contradição, relevância
 *   4. Exercícios      — reescrita e identificação de problemas
 *
 * Dados declarados neste módulo. Sem dependências externas.
 */

/* ================================================================
   BANCO: MECANISMOS DE COESÃO
   ================================================================ */

const MECANISMOS = [
  {
    nome:    'Referência',
    def:     'Um elemento retoma ou antecipa outro elemento do texto. O texto não precisa repetir a palavra — usa pronomes, numerais ou expressões equivalentes.',
    tipos:   [
      {
        sub:   'Anáfora (retomada)',
        desc:  'O elemento coesivo aponta para algo já dito.',
        ex:    '"João chegou tarde. Ele estava exausto." — "Ele" retoma "João".',
      },
      {
        sub:   'Catáfora (antecipação)',
        desc:  'O elemento coesivo aponta para algo que ainda será dito.',
        ex:    '"Digo o seguinte: o projeto foi cancelado." — "o seguinte" antecipa o conteúdo.',
      },
      {
        sub:   'Referência exofórica',
        desc:  'O elemento aponta para fora do texto, para o contexto situacional.',
        ex:    '"Aqui não se fuma." — "Aqui" refere-se ao lugar físico, não ao texto.',
      },
    ],
  },
  {
    nome:    'Substituição',
    def:     'Um elemento é substituído por outro de mesmo valor semântico para evitar repetição.',
    tipos:   [
      {
        sub:   'Substituição nominal',
        desc:  'Substitui um nome por outro equivalente.',
        ex:    '"O cachorro latia. O animal acordou todos." — "animal" substitui "cachorro".',
      },
      {
        sub:   'Substituição verbal',
        desc:  'Substitui um verbo ou predicado.',
        ex:    '"— Você vai embora? — Vou sim." — "Vou" substitui "vou embora".',
      },
      {
        sub:   'Substituição por "fazer"',
        desc:  'O verbo "fazer" substitui outro verbo já mencionado.',
        ex:    '"Ela canta muito bem. O filho faz o mesmo." — "faz o mesmo" = canta.',
      },
    ],
  },
  {
    nome:    'Elipse',
    def:     'Omissão de um elemento recuperável pelo contexto. Evita repetição e produz fluidez — mas a omissão tem de ser clara.',
    tipos:   [
      {
        sub:   'Elipse nominal',
        desc:  'O substantivo é omitido.',
        ex:    '"Compramos pão e [compramos] leite." — o verbo é omitido na segunda oração.',
      },
      {
        sub:   'Elipse do sujeito',
        desc:  'O sujeito é omitido quando a pessoa verbal já o indica.',
        ex:    '"Cheguei, vi, venci." — sujeito "eu" elíptico nas três orações.',
      },
    ],
  },
  {
    nome:    'Conjunção (Conectivos)',
    def:     'Elementos que estabelecem relações lógicas entre orações e parágrafos: adição, oposição, causa, consequência, concessão, condição, etc.',
    tipos:   [
      {
        sub:   'Conectivos aditivos',
        desc:  'Adicionam informações: e, nem, também, além disso, não só… mas também.',
        ex:    '"O projeto é viável e rentável."',
      },
      {
        sub:   'Conectivos adversativos',
        desc:  'Opõem ideias: mas, porém, contudo, entretanto, no entanto, todavia.',
        ex:    '"Ele estudou muito; contudo, não passou."',
      },
      {
        sub:   'Conectivos causais/conclusivos',
        desc:  'Expressam causa ou conclusão: porque, pois, portanto, logo, assim.',
        ex:    '"Choveu muito; portanto, o evento foi cancelado."',
      },
    ],
  },
  {
    nome:    'Coesão Lexical',
    def:     'Manutenção da unidade temática por meio de relações de sentido entre palavras: reiteração, sinonímia, hiperonímia, antonímia.',
    tipos:   [
      {
        sub:   'Reiteração',
        desc:  'Repetição da mesma palavra com efeito estilístico intencional.',
        ex:    '"Guerra, guerra, guerra — era só o que se ouvia."',
      },
      {
        sub:   'Sinonímia / Hiponímia',
        desc:  'Palavras de sentido próximo ou de classe mais geral retomam o termo.',
        ex:    '"O leão rugiu. O felino avançou." — "felino" = hiperônimo de leão.',
      },
      {
        sub:   'Antonímia',
        desc:  'Opostos que mantêm o tema pelo contraste.',
        ex:    '"A riqueza dos poucos é a pobreza de muitos."',
      },
    ],
  },
];

/* ================================================================
   BANCO: CONECTIVOS POR FUNÇÃO
   ================================================================ */

const CONECTIVOS = [
  {
    funcao:    'Adição',
    cor:       'var(--color-green)',
    lista:     ['e', 'nem', 'também', 'além disso', 'ademais', 'não só… mas também', 'tanto… quanto'],
    uso:       'Acrescenta informações de mesmo valor lógico.',
    erro:      'Evitar encadeamento excessivo com "e": "Fui e comprei e voltei e guardei…" — usar pontuação ou outros conectivos.',
    exemplo:   'O texto é claro, além de ser bem estruturado.',
  },
  {
    funcao:    'Oposição / Adversidade',
    cor:       'var(--color-accent)',
    lista:     ['mas', 'porém', 'contudo', 'entretanto', 'no entanto', 'todavia', 'ao passo que'],
    uso:       'Estabelece contraste ou restrição entre duas ideias.',
    erro:      '"Mas" no início de parágrafo é aceito em português brasileiro formal e informal — não é erro.',
    exemplo:   'O argumento é sólido; contudo, faltam evidências empíricas.',
  },
  {
    funcao:    'Causa',
    cor:       'var(--color-gold)',
    lista:     ['porque', 'pois', 'já que', 'uma vez que', 'visto que', 'porquanto', 'como'],
    uso:       'Indica a razão de algo ter ocorrido.',
    erro:      '"Pois" no início de resposta indica causa. No meio de oração pode indicar explicação — não confundir com o "pois" conclusivo (arcaico).',
    exemplo:   'Ele falhou, pois não se preparou adequadamente.',
  },
  {
    funcao:    'Consequência',
    cor:       'var(--color-gold)',
    lista:     ['portanto', 'logo', 'assim', 'por isso', 'de modo que', 'de forma que', 'consequentemente'],
    uso:       'Indica o resultado de uma causa anterior.',
    erro:      '"Logo" pode ser temporal ("logo depois") ou conclusivo — o contexto define.',
    exemplo:   'Estudou consistentemente; por isso, domina o conteúdo.',
  },
  {
    funcao:    'Concessão',
    cor:       'var(--color-ink-mid)',
    lista:     ['embora', 'ainda que', 'mesmo que', 'apesar de', 'por mais que', 'se bem que'],
    uso:       'Admite uma objeção sem invalidar a proposição principal.',
    erro:      'Concessão ≠ oposição. "Embora chova, saio" (concessão: aceito o fato, mas ajo assim). "Chove, mas saio" (oposição mais direta).',
    exemplo:   'Embora o prazo seja curto, o projeto é realizável.',
  },
  {
    funcao:    'Condição',
    cor:       'var(--color-ink-mid)',
    lista:     ['se', 'caso', 'desde que', 'contanto que', 'a menos que', 'salvo se', 'dado que'],
    uso:       'Estabelece uma condição para que algo ocorra.',
    erro:      '"Desde que" é condicional, não temporal. "Desde que chegou" (temporal) ≠ "desde que cumpra as regras" (condicional).',
    exemplo:   'O contrato é válido, desde que ambas as partes assinem.',
  },
  {
    funcao:    'Finalidade',
    cor:       'var(--color-green)',
    lista:     ['para', 'para que', 'a fim de', 'a fim de que', 'com o intuito de', 'com vistas a'],
    uso:       'Indica o objetivo de uma ação.',
    erro:      '"Para" + infinitivo (mesmo sujeito). "Para que" + subjuntivo (sujeitos diferentes).',
    exemplo:   'Treinou exaustivamente a fim de alcançar o recorde.',
  },
  {
    funcao:    'Explicação / Reformulação',
    cor:       'var(--color-paper-border)',
    lista:     ['ou seja', 'isto é', 'a saber', 'quer dizer', 'em outras palavras', 'vale dizer'],
    uso:       'Reapresenta ou esclarece o que foi dito.',
    erro:      'Usar com parcimônia — reformulações em excesso sinalizam falta de confiança na clareza do texto.',
    exemplo:   'O projeto foi aprovado por unanimidade, ou seja, nenhum membro votou contra.',
  },
];

/* ================================================================
   BANCO: PROBLEMAS DE COERÊNCIA
   ================================================================ */

const PROBLEMAS = [
  {
    tipo:     'Contradição',
    def:      'O texto afirma e nega a mesma coisa sem justificativa para a inversão.',
    ruim:     '"O governo investiu fortemente na saúde. O sistema de saúde está completamente abandonado."',
    nota_ruim:'As duas afirmações não se excluem necessariamente, mas sem mediação (dado, época, contexto) criam contradição aparente que destrói a coerência.',
    bom:      '"O governo investiu em hospitais, mas as unidades básicas de saúde permaneceram abandonadas."',
    nota_bom: 'A conjunção adversativa reconhece a tensão e a torna coerente.',
  },
  {
    tipo:     'Tautologia',
    def:      'Repetição disfarçada da mesma ideia sem acréscimo de informação.',
    ruim:     '"A crise econômica é provocada por fatores de ordem econômica e financeira que afetam a economia."',
    nota_ruim:'"Econômica" e "financeira" não acrescentam nada diferente de "economia". A frase diz que a crise econômica é econômica.',
    bom:      '"A crise foi provocada pela alta de juros e pela queda do consumo interno."',
    nota_bom: 'Causa específica e verificável.',
  },
  {
    tipo:     'Não-sequência',
    def:      'A progressão temática quebra — o parágrafo seguinte não decorre do anterior.',
    ruim:     '"A fotossíntese é o processo pelo qual as plantas produzem energia. A clorofila é uma proteína. Portanto, devemos preservar as florestas."',
    nota_ruim:'A conclusão ("portanto") não decorre logicamente das duas premissas. Falta a cadeia causal.',
    bom:      '"A fotossíntese depende da clorofila para converter luz em energia. Sem florestas, perdemos os principais produtores de oxigênio. Por isso, sua preservação é urgente."',
    nota_bom: 'Cada frase decorre da anterior. A conclusão é alcançada por passos.',
  },
  {
    tipo:     'Ambiguidade',
    def:      'Uma frase admite duas leituras diferentes, criando incerteza sobre o que foi dito.',
    ruim:     '"O diretor elogiou o funcionário com entusiasmo."',
    nota_ruim:'Quem estava entusiasmado — o diretor ou o funcionário? O adjunto "com entusiasmo" pode modificar qualquer dos dois.',
    bom:      '"O diretor, com entusiasmo, elogiou o funcionário." / "O diretor elogiou o funcionário entusiasmado."',
    nota_bom: 'A posição do adjunto ou um adjetivo concordando com o referente elimina a ambiguidade.',
  },
  {
    tipo:     'Referência obscura',
    def:      'Um pronome ou expressão coesiva não tem antecedente claro.',
    ruim:     '"O gerente disse ao assistente que ele precisava melhorar."',
    nota_ruim:'"ele" — quem precisa melhorar? O gerente ou o assistente? Referência ambígua.',
    bom:      '"O gerente disse ao assistente: \'Você precisa melhorar.\'"',
    nota_bom: 'O discurso direto elimina a ambiguidade pronominal.',
  },
];

/* ================================================================
   BANCO: EXERCÍCIOS
   ================================================================ */

const EXERCICIOS = [
  {
    id:   'c01',
    inst: 'Identifique o mecanismo de coesão em: "Maria foi ao mercado. Ela comprou frutas."',
    opts: ['Substituição', 'Referência anafórica', 'Elipse', 'Conjunção'],
    ok:   1,
    exp:  '"Ela" retoma "Maria" já mencionada — referência anafórica. O pronome aponta para trás no texto.',
  },
  {
    id:   'c02',
    inst: 'Qual conectivo completa melhor: "Estudou muito ___ não obteve a nota esperada."',
    opts: ['porque', 'portanto', 'porém', 'além disso'],
    ok:   2,
    exp:  'Há oposição entre esforço (estudou muito) e resultado (nota abaixo do esperado). Conectivo adversativo: "porém", "mas", "contudo".',
  },
  {
    id:   'c03',
    inst: 'Identifique o problema de coerência: "O país cresceu economicamente. O país é pobre."',
    opts: ['Tautologia', 'Contradição aparente sem mediação', 'Ambiguidade', 'Referência obscura'],
    ok:   1,
    exp:  'As afirmações não se excluem (crescimento ≠ fim da pobreza), mas sem dado ou período temporal que as conecte, criam contradição aparente. Falta mediação.',
  },
  {
    id:   'c04',
    inst: '"Saiu cedo para chegar antes do rush." O conectivo "para" indica:',
    opts: ['Causa', 'Concessão', 'Finalidade', 'Consequência'],
    ok:   2,
    exp:  '"Para" + infinitivo indica finalidade — o objetivo que motivou a ação anterior.',
  },
  {
    id:   'c05',
    inst: 'Em "Comprou o carro. O veículo era importado." — qual mecanismo de coesão opera?',
    opts: ['Referência catafórica', 'Coesão lexical por hiperonímia', 'Elipse do sujeito', 'Conjunção adversativa'],
    ok:   1,
    exp:  '"Veículo" é hiperônimo de "carro" — categoria mais geral que retoma o termo específico. Coesão lexical por hiperonímia.',
  },
  {
    id:   'c06',
    inst: '"Embora o candidato fosse experiente, não foi aprovado." O conectivo indica:',
    opts: ['Causa', 'Condição', 'Concessão', 'Consequência'],
    ok:   2,
    exp:  '"Embora" é conectivo de concessão: admite o fato (era experiente) sem que ele invalide o resultado (não foi aprovado). A ressalva não anula a proposição principal.',
  },
  {
    id:   'c07',
    inst: 'Identifique o problema: "O relatório foi bem recebido. O relatório foi rejeitado."',
    opts: ['Ambiguidade', 'Contradição', 'Tautologia', 'Referência obscura'],
    ok:   1,
    exp:  'As duas afirmações se contradizem diretamente sem mediação. Sem explicação ("bem recebido formalmente, mas rejeitado no mérito"), o texto é incoerente.',
  },
  {
    id:   'c08',
    inst: '"Cheguei, vi, venci." — qual mecanismo de coesão une as três orações?',
    opts: ['Conjunção aditiva', 'Elipse do sujeito', 'Substituição verbal', 'Referência anafórica'],
    ok:   1,
    exp:  'O sujeito "eu" está elíptico nas três orações — recuperável pela desinência verbal. Elipse do sujeito.',
  },
  {
    id:   'c09',
    inst: '"Embora fosse tarde, ele continuou trabalhando." O conectivo "embora" indica:',
    opts: ['Causa', 'Condição', 'Concessão', 'Conclusão'],
    ok:   2,
    exp:  '"Embora" é conjunção concessiva: introduz uma circunstância que não impede a ação principal. "Apesar de", "ainda que", "mesmo que" são sinônimos funcionais.',
  },
  {
    id:   'c10',
    inst: 'Qual das opções apresenta um problema de ambiguidade que compromete a coerência?',
    opts: [
      '"A professora disse que a aluna errou."',
      '"Ele visitou o amigo que morava longe."',
      '"Vi o homem com o binóculo." (quem tinha o binóculo?)',
      '"O livro que comprei está na mesa."',
    ],
    ok:   2,
    exp:  '"Vi o homem com o binóculo" é estruturalmente ambíguo: o binóculo pode ser meu (instrumento de visão) ou do homem (posse). Esse tipo de ambiguidade sintática compromete a coerência porque o leitor não consegue determinar o sentido pretendido.',
  },
  {
    id:   'c11',
    inst: 'Em "Os estudantes foram aprovados. Os alunos comemoraram." — que recurso coesivo une as orações?',
    opts: ['Referência por pronome', 'Coesão lexical por sinonímia', 'Elipse do verbo', 'Conjunção explicativa'],
    ok:   1,
    exp:  '"Alunos" retoma "estudantes" por sinonímia — dois termos diferentes com sentido equivalente. Coesão lexical por sinonímia evita a repetição sem usar pronome.',
  },
  {
    id:   'c12',
    inst: '"Ele estudou. Resultado: passou no vestibular." O dois-pontos funciona como:',
    opts: ['Conectivo de concessão', 'Conectivo de conclusão/consequência', 'Referência catafórica', 'Elipse do sujeito'],
    ok:   1,
    exp:  'Os dois-pontos aqui substituem um conectivo de consequência ("portanto", "por isso"). São um recurso de coesão não-verbal que encadeia logicamente as duas orações.',
  },
  {
    id:   'c13',
    inst: '"Fui ao mercado. ___ não havia pão." Qual conectivo indica a melhor relação lógica?',
    opts: ['Portanto', 'Além disso', 'No entanto', 'Visto que'],
    ok:   2,
    exp:  'Há uma frustração implícita: ir ao mercado pressupõe encontrar o produto, mas não havia pão. "No entanto" (adversativo) expressa essa oposição entre expectativa e resultado.',
  },
  {
    id:   'c14',
    inst: 'Identifique a tautologia: qual frase repete o mesmo conceito com palavras diferentes?',
    opts: [
      '"O sol nasce no leste."',
      '"O réu confessou voluntariamente e por sua própria vontade."',
      '"O texto é ambíguo e admite mais de uma leitura."',
      '"A proposta é viável e pode ser executada."',
    ],
    ok:   1,
    exp:  '"Voluntariamente" e "por sua própria vontade" dizem o mesmo. É tautologia — repetição semântica desnecessária que ocupa espaço sem acrescentar informação.',
  },
  {
    id:   'c15',
    inst: '"___ ele soubesse a resposta, não teria errado." Qual conectivo completa corretamente?',
    opts: ['Porque', 'Se', 'Embora', 'Portanto'],
    ok:   1,
    exp:  '"Se" introduz condição hipotética no passado (período hipotético do irrealismo). A estrutura "se + imperfeito do subjuntivo" pressupõe que a condição não foi satisfeita — ele não sabia a resposta.',
  },
];

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

export function renderCoesao() {
  const page = document.createElement('div');

  const TABS = [
    { id: 'coesao',      label: 'Coesão'      },
    { id: 'conectivos',  label: 'Conectivos'   },
    { id: 'coerencia',   label: 'Coerência'    },
    { id: 'exercicios',  label: 'Exercícios'   },
  ];

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Coesão e Coerência</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        Coesão é a costura visível do texto — os fios que ligam frases e parágrafos.
        Coerência é a lógica invisível — a razão pela qual o texto faz sentido como um todo.
        Dominar os dois é a diferença entre um texto que se lê com esforço e um que se lê com clareza.
      </p>
    </div>

    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);flex-wrap:wrap" role="tablist">
      ${TABS.map((t, i) => `
        <button type="button" role="tab" class="coh-tab" data-tab="${i}"
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
      <div id="coh-panel-${i}" class="coh-panel" style="${i > 0 ? 'display:none' : ''}"></div>
    `).join('')}
  `;

  const renderers = [renderCoesaoTab, renderConectivos, renderCoerencia, renderExercicios];
  TABS.forEach((_, i) => renderers[i](page.querySelector(`#coh-panel-${i}`)));

  const tabs   = page.querySelectorAll('.coh-tab');
  const panels = page.querySelectorAll('.coh-panel');
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
   ABA 1 — MECANISMOS DE COESÃO
   ================================================================ */

function renderCoesaoTab(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width);display:flex;flex-direction:column;gap:var(--space-5)';

  MECANISMOS.forEach(mec => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-5) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <p style="flex:1;font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink)">${mec.nome}</p>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';
    body.innerHTML = `
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-5)">${mec.def}</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${mec.tipos.map(t => `
          <div style="border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
            <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-left:3px solid var(--color-gold)">
              <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink)">${t.sub}</p>
            </div>
            <div style="padding:var(--space-3) var(--space-4)">
              <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6;margin-bottom:var(--space-2)">${t.desc}</p>
              <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink)">${t.ex}</p>
            </div>
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
    wrap.appendChild(card);
  });

  el.appendChild(wrap);
}

/* ================================================================
   ABA 2 — CONECTIVOS
   ================================================================ */

function renderConectivos(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const grid = document.createElement('div');
  grid.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  CONECTIVOS.forEach(c => {
    const card = document.createElement('div');
    card.style.cssText = `border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;border-left:4px solid ${c.cor}`;

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.style.cssText = 'display:flex;align-items:center;gap:var(--space-4);width:100%;padding:var(--space-6) var(--space-6);background:none;border:none;cursor:pointer;text-align:left;transition:background var(--transition-fast)';
    hdr.innerHTML = `
      <p style="flex:1;font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-ink)">${c.funcao}</p>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);transition:transform 0.2s">▼</span>
    `;
    hdr.addEventListener('mouseenter', () => { hdr.style.background = 'var(--color-paper-dark)'; });
    hdr.addEventListener('mouseleave', () => { hdr.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-4) var(--space-5)';
    body.innerHTML = `
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65;margin-bottom:var(--space-3)">${c.uso}</p>

      <div style="display:flex;flex-wrap:wrap;gap:var(--space-1);margin-bottom:var(--space-4)">
        ${c.lista.map(w => `
          <span style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;
            background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
            border-radius:var(--radius);padding:2px 10px;color:var(--color-ink)">${w}</span>
        `).join('')}
      </div>

      <div style="border-left:3px solid var(--color-ink);padding:var(--space-6) var(--space-6);
        background:var(--color-paper-dark);border-radius:0 var(--radius) var(--radius) 0;
        font-family:var(--font-body);font-size:var(--text-base);font-style:italic;
        color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-3)">
        "${c.exemplo}"
      </div>

      <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-accent);margin-bottom:4px">Cuidado</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${c.erro}</p>
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
   ABA 3 — COERÊNCIA
   ================================================================ */

function renderCoerencia(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const intro = document.createElement('div');
  intro.style.cssText = 'padding:var(--space-5);background:var(--color-paper-dark);border-radius:var(--radius);margin-bottom:var(--space-6);border-left:4px solid var(--color-accent)';
  intro.innerHTML = `
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75">
      Um texto é coerente quando suas partes formam um todo com sentido — as ideias não se contradizem,
      progridem em direção a uma conclusão e são relevantes ao tema. A coerência não está nas palavras,
      mas nas relações entre as proposições.
    </p>
  `;
  wrap.appendChild(intro);

  const label = document.createElement('p');
  label.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)';
  label.textContent = 'Problemas de coerência — antes e depois';
  wrap.appendChild(label);

  const list = document.createElement('div');
  list.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-5)';

  PROBLEMAS.forEach(p => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';
    card.innerHTML = `
      <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-bottom:1px solid var(--color-paper-border)">
        <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:700;color:var(--color-accent)">${p.tipo}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55">${p.def}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
        <div style="padding:var(--space-4) var(--space-5);border-right:1px solid var(--color-paper-border)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:600;color:var(--color-accent);margin-bottom:var(--space-2)">Problemático</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-2)">${p.ruim}</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);line-height:1.55">${p.nota_ruim}</p>
        </div>
        <div style="padding:var(--space-4) var(--space-5)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:600;color:var(--color-green);margin-bottom:var(--space-2)">Corrigido</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-2)">${p.bom}</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);line-height:1.55">${p.nota_bom}</p>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  wrap.appendChild(list);
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
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)" id="opts-co-${q.id}"></div>
        <div id="fb-co-${q.id}" style="margin-top:var(--space-4);display:none"></div>
      </div>
    `;

    const optsWrap = card.querySelector(`#opts-co-${q.id}`);
    const fbEl     = card.querySelector(`#fb-co-${q.id}`);
    let answered   = false;

    q.opts.forEach((opt, idx) => {
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
