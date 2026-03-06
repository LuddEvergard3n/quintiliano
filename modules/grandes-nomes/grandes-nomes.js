/**
 * grandes-nomes.js — Grandes Nomes da Língua Portuguesa
 *
 * Dez figuras canônicas da literatura e da língua portuguesa,
 * com perfil, estilo e três obras recomendadas por pessoa.
 *
 * Machado de Assis ocupa a primeira posição — por consenso crítico
 * e por ser o fundador da ABL e o renovador da prosa brasileira.
 *
 * Dados declarados neste módulo. Sem dependências externas.
 * Estilos de escopo declarados via CSS injetado no render.
 */

/* ================================================================
   DADOS — DEZ GRANDES NOMES
   ================================================================ */

const NOMES = [
  {
    id:          'machado',
    nome:        'Machado de Assis',
    vida:        '1839 – 1908',
    pais:        'Brasil',
    movimento:   'Realismo',
    tag:         'O fundador',
    bio:         'Filho de um mulato e uma portuguesa das Ilhas, nascido no Morro do Livramento, no Rio de Janeiro. Autodidata, epiléptico, gago. Começou como tipógrafo e aprendiz de jornalista. Tornou-se o escritor que mais radicalmente transformou a prosa em língua portuguesa — e o fundador da Academia Brasileira de Letras, que presidiu até a morte.',
    estilo:      'Narrador não confiável, ironia de superfície serena e fundo corrosivo. A partir de "Memórias Póstumas de Brás Cubas" (1881), inventa um narrador que fala diretamente ao leitor, mente para ele e o interpela com desfaçatez. Frases curtas intercaladas com longos períodos reflexivos. Foco nas convenções sociais, na hipocrisia da classe média e na natureza humana.',
    frase:       '"Cada um sabe a dor e a alegria que tem. Ninguém sabe o que se passa no coração alheio."',
    obras: [
      {
        titulo: 'Memórias Póstumas de Brás Cubas',
        ano:    1881,
        genero: 'Romance',
        nota:   'Narrado por um defunto autor. Capítulos de uma linha, metalinguagem, interpolações filosóficas. O livro que encerrou o Romantismo e inventou o Realismo brasileiro num único gesto. Ler os três primeiros capítulos é suficiente para entender por que este livro mudou tudo.',
      },
      {
        titulo: 'Dom Casmurro',
        ano:    1899,
        genero: 'Romance',
        nota:   'Bentinho narra a própria história e acusa Capitu de traição. O leitor nunca consegue provar ou refutar — e esse é o ponto. A ambiguidade não é um defeito do romance, é seu mecanismo central. Um dos mais discutidos da literatura de língua portuguesa.',
      },
      {
        titulo: 'O Alienista',
        ano:    1882,
        genero: 'Novela',
        nota:   'Simão Bacamarte, médico de Itaguaí, cria um hospício e interna progressivamente quase toda a população da cidade — inclusive a si mesmo. Sátira à razão científica, ao poder médico e à loucura da normalidade. Leitura de duas horas com ressonância para toda a vida.',
      },
    ],
  },
  {
    id:          'drummond',
    nome:        'Carlos Drummond de Andrade',
    vida:        '1902 – 1987',
    pais:        'Brasil',
    movimento:   'Modernismo',
    tag:         'O gauche',
    bio:         'Nasceu em Itabira, Minas Gerais — cidade de ferro e tradição que nunca deixou. Funcionário público, jornalista, cronista. Recusou a cadeira da Academia Brasileira de Letras em 1945 por considerá-la incompatível com seu temperamento. É hoje o poeta mais estudado e antologizado do Brasil.',
    estilo:      'Ironia melancólica, autocomiseração que se transforma em consciência crítica. O "eu gauche" que não se encaixa é o eixo de sua poesia. Alterna o íntimo e o histórico, o mineiro e o universal, o verso coloquial e o verso difícil. Nas crônicas, a mesma precisão em prosa leve.',
    frase:       '"No meio do caminho tinha uma pedra / tinha uma pedra no meio do caminho."',
    obras: [
      {
        titulo: 'Alguma Poesia',
        ano:    1930,
        genero: 'Poesia',
        nota:   'Primeiro livro. Contém "Poema de Sete Faces" ("Quando nasci, um anjo torto...") e "No Meio do Caminho". Drummond já está inteiro aqui: o gauche, a ironia, o verso que parece fácil e não é.',
      },
      {
        titulo: 'A Rosa do Povo',
        ano:    1945,
        genero: 'Poesia',
        nota:   'O livro mais político e ao mesmo tempo mais lírico. Escrito durante o Estado Novo e a Segunda Guerra. "Mãos Dadas", "Carta a Stalingrado", "José". A pergunta "E agora, José?" virou linguagem da desorientação coletiva brasileira.',
      },
      {
        titulo: 'Claro Enigma',
        ano:    1951,
        genero: 'Poesia',
        nota:   'Drummond mais hermético e filosófico. Menos engajamento direto, mais meditação sobre o tempo, a morte e a memória. "Legado", "Dissolução" e o soneto "A Ingaia Ciência" mostram outro Drummond — o que duvida da própria voz.',
      },
    ],
  },
  {
    id:          'camoes',
    nome:        'Luís de Camões',
    vida:        'c. 1524 – 1580',
    pais:        'Portugal',
    movimento:   'Renascimento / Classicismo',
    tag:         'O épico',
    bio:         'Nasceu provavelmente em Lisboa ou Coimbra. Soldado, preso, exilado em Ceuta e depois no Oriente por 17 anos. Perdeu um olho em batalha. Escreveu Os Lusíadas na Índia e em Moçambique. Morreu pobre em Lisboa, no mesmo ano em que Portugal perdia a independência para a Espanha. A língua portuguesa o declarou imortal em troca.',
    estilo:      'Domínio absoluto da forma: soneto petrarquiano, oitava rima épica, redondilha popular. Nos sonetos, a tensão entre o ideal platônico e a experiência sensível. Na épica, a grandeza nacional atravessada por melancolia. "Amor é fogo que arde sem se ver" é o paradoxo que resume sua lírica.',
    frase:       '"Mudam-se os tempos, mudam-se as vontades, / muda-se o ser, muda-se a confiança."',
    obras: [
      {
        titulo: 'Os Lusíadas',
        ano:    1572,
        genero: 'Poema épico',
        nota:   '10 cantos, 1102 oitavas, decassílabos. Narra a viagem de Vasco da Gama à Índia como metáfora da grandeza e do destino de Portugal. O livro fundador da literatura de língua portuguesa. Obrigatório ler pelo menos o Canto I e o episódio de Inês de Castro (Canto III).',
      },
      {
        titulo: 'Rimas',
        ano:    1595,
        genero: 'Poesia lírica',
        nota:   'Publicado postumamente. Contém os grandes sonetos: "Amor é fogo que arde sem se ver", "Mudam-se os tempos", "Erros meus, má fortuna, amor ardente". A lírica de Camões é tão grande quanto a épica — e menos lida.',
      },
      {
        titulo: 'Autos',
        ano:    '—',
        genero: 'Teatro',
        nota:   'Atribuição parcialmente disputada. "El-Rei Seleuco" e "Filodemo" mostram Camões dramaturgo — menos épico, mais cômico e humano. Leitura que surpreende quem só conhece Os Lusíadas.',
      },
    ],
  },
  {
    id:          'pessoa',
    nome:        'Fernando Pessoa',
    vida:        '1888 – 1935',
    pais:        'Portugal',
    movimento:   'Modernismo',
    tag:         'Os múltiplos',
    bio:         'Nasceu em Lisboa, cresceu em Durban (África do Sul) em inglês e afrikaans, voltou para Lisboa aos 17 anos. Trabalhou como correspondente comercial em inglês e francês. Publicou pouquíssimo em vida. Deixou uma mala com mais de 27 mil documentos — o espólio literário mais rico da língua portuguesa. Inventou heterônimos com biografias, estilos e visões de mundo próprios.',
    estilo:      'Quatro grandes vozes: Pessoa ortônimo (a angústia da consciência), Alberto Caeiro (o paganismo sensacionista, a pura sensação), Ricardo Reis (o estoicismo horaciano, odes clássicas), Álvaro de Campos (o futurismo excessivo, a modernidade dolorosa). Cada um é um sistema filosófico e poético autônomo.',
    frase:       '"Não sou nada. / Nunca serei nada. / Não posso querer ser nada. / À parte isso, tenho em mim todos os sonhos do mundo."',
    obras: [
      {
        titulo: 'Mensagem',
        ano:    1934,
        genero: 'Poesia',
        nota:   'Único livro publicado em vida, em português. Poesia simbólica e esotérica sobre Portugal e o sebastianismo. Difícil e recompensador. Começa com "As Quinas" e termina com "Nevoeiro" — a névoa como destino e espera.',
      },
      {
        titulo: 'Livro do Desassossego',
        ano:    1982,
        genero: 'Prosa poética',
        nota:   'Publicado postumamente, atribuído ao semi-heterônimo Bernardo Soares. Diário fragmentário, meditativo, sem enredo. A prosa mais singular da língua portuguesa. Pode ser lido em qualquer ordem a partir de qualquer página.',
      },
      {
        titulo: 'Poemas de Álvaro de Campos',
        ano:    '—',
        genero: 'Poesia',
        nota:   '"Ode Triunfal", "Ode Marítima", "Tabacaria" — o heterônimo mais moderno e excessivo. Campos abraça a industrialização, o futurismo e depois o desencanto. "Não sou nada" é de Campos. Leitura altíssima, obrigatória.',
      },
    ],
  },
  {
    id:          'clarice',
    nome:        'Clarice Lispector',
    vida:        '1920 – 1977',
    pais:        'Brasil',
    movimento:   'Modernismo tardio',
    tag:         'A epifania',
    bio:         'Nasceu na Ucrânia e chegou ao Brasil com dois meses. Cresceu no Recife, estudou Direito no Rio de Janeiro. Jornalista, diplomata por casamento, viveu na Europa e nos Estados Unidos. Voltou ao Brasil em 1959 e nunca mais saiu. Sua prosa é radicalmente original — não tem precedente e não tem sucessor direto.',
    estilo:      'Sintaxe fragmentada que imita o fluxo da consciência. Personagens em crise existencial diante de objetos banais que de repente revelam o real. Ausência de enredo linear. A linguagem não descreve a experiência — ela é a experiência. Influência de Virginia Woolf e Dostoiévski, mas assimilada até se tornar algo completamente diferente.',
    frase:       '"Felicidade? Nunca vi falar. Existe?"',
    obras: [
      {
        titulo: 'A Paixão Segundo G.H.',
        ano:    1964,
        genero: 'Romance',
        nota:   'Uma mulher rica entra no quarto de uma empregada que partiu e encontra uma barata. O que acontece nos próximos 200 páginas é o confronto com o insuportável da existência. O livro mais difícil e o mais recompensador de Clarice.',
      },
      {
        titulo: 'Laços de Família',
        ano:    1960,
        genero: 'Contos',
        nota:   'A coleção de contos mais acessível de Clarice. "Amor", "A Imitação da Rosa", "O Crime do Professor de Matemática". Cada conto parte de uma situação cotidiana e chega a um abismo. Porta de entrada ideal para sua obra.',
      },
      {
        titulo: 'A Hora da Estrela',
        ano:    1977,
        genero: 'Romance',
        nota:   'Último romance publicado em vida. Macabéa, nordestina pobre no Rio de Janeiro, narrada por um escritor que não a entende e a julga. O livro mais político de Clarice — e o mais humano. Escrito quando já estava gravemente doente.',
      },
    ],
  },
  {
    id:          'guimaraes',
    nome:        'João Guimarães Rosa',
    vida:        '1908 – 1967',
    pais:        'Brasil',
    movimento:   'Modernismo tardio / Regionalismo transcendente',
    tag:         'O inventário',
    bio:         'Médico, diplomata, poliglota (falava mais de oito línguas). Nasceu em Cordisburgo, Minas Gerais, e percorreu o sertão como médico em 1930. Esse contato com a linguagem oral sertaneja alimentou toda a sua obra. Morreu três dias após ser empossado na Academia Brasileira de Letras — tinha adiado a posse por anos, por medo supersticiosa de morrer.',
    estilo:      'Neologismos, arcaísmos, onomatopeias, palavras inventadas por derivação e composição. A sintaxe do sertão mineiro como base de uma língua literária nova. O sertão é o mundo — a travessia do sertão é a travessia da existência. Funde regionalismo e metafísica de modo que nenhum outro escritor conseguiu replicar.',
    frase:       '"O sertão é do tamanho do mundo."',
    obras: [
      {
        titulo: 'Grande Sertão: Veredas',
        ano:    1956,
        genero: 'Romance',
        nota:   'Riobaldo narra sua vida como jagunço numa longa confissão ao leitor. Existe o diabo? Ele fez um pacto? Diadorim é quem? Um dos cinco maiores romances em língua portuguesa. Exige esforço nas primeiras 50 páginas — depois é impossível parar.',
      },
      {
        titulo: 'Sagarana',
        ano:    1946,
        genero: 'Contos',
        nota:   'Primeiro livro, nove contos do sertão mineiro. "A Hora e Vez de Augusto Matraga" é dos melhores contos da literatura brasileira. Porta de entrada menos intimidante para a linguagem rosiana antes de enfrentar Grande Sertão.',
      },
      {
        titulo: 'Primeiras Estórias',
        ano:    1962,
        genero: 'Contos',
        nota:   '21 estórias curtas, várias sobre crianças e loucos — vozes que veem o mundo sem os filtros dos adultos. "A Terceira Margem do Rio" e "As Margens da Alegria" são leituras de dez minutos que ficam para sempre.',
      },
    ],
  },
  {
    id:          'eca',
    nome:        'Eça de Queirós',
    vida:        '1845 – 1900',
    pais:        'Portugal',
    movimento:   'Realismo / Naturalismo',
    tag:         'A ironia portuguesa',
    bio:         'Filho ilegítimo, criado pelos avós. Formou-se em Direito em Coimbra, onde participou da Questão Coimbrã — a polêmica que inaugurou o Realismo em Portugal. Cônsul em várias cidades europeias e americanas. Viveu mais no estrangeiro do que em Portugal, o que tornou seu olhar sobre o país ao mesmo tempo íntimo e distanciado.',
    estilo:      'Ironia fina e sistemática dirigida à burguesia provinciana, ao clero hipócrita e às convenções da família patriarcal portuguesa. Prosa rica, sensorial, muito influenciada por Flaubert. Cada personagem é uma crítica social encarnada — mas tão bem construída que funciona como pessoa, não como símbolo.',
    frase:       '"A civilização são os homens tornando-se mais humanos; e não as máquinas tornando os homens dispensáveis."',
    obras: [
      {
        titulo: 'O Crime do Padre Amaro',
        ano:    1875,
        genero: 'Romance',
        nota:   'Primeiro grande romance realista português. Padre Amaro seduz Amélia, com consequências trágicas. Crítica feroz ao celibato clerical e à hipocrisia da Igreja na vida provinciana. Escandalizou Portugal em 1875 — ainda incomoda.',
      },
      {
        titulo: 'O Primo Basílio',
        ano:    1878,
        genero: 'Romance',
        nota:   'Luísa, casada com Jorge, tem um caso com o primo Basílio. Juliana, a criada, encontra as cartas e chantageia. Análise da banalidade do adultério burguês e da opressão doméstica. Machado de Assis escreveu uma crítica famosa e severa a este livro — e Eça respondeu indiretamente.',
      },
      {
        titulo: 'A Cidade e as Serras',
        ano:    1901,
        genero: 'Romance',
        nota:   'Publicado postumamente. Jacinto, rico cosmopolita em Paris rodeado de tecnologia, descobre que a felicidade está nas serras de Portugal. Mais leve que os romances anteriores, quase um conto filosófico. Eça revisando e temperando o próprio pessimismo.',
      },
    ],
  },
  {
    id:          'bandeira',
    nome:        'Manuel Bandeira',
    vida:        '1886 – 1968',
    pais:        'Brasil',
    movimento:   'Modernismo',
    tag:         'O cotidiano',
    bio:         'Nasceu no Recife. Estudou arquitetura em São Paulo, mas foi diagnosticado com tuberculose aos 18 anos e passou anos em sanatórios. A doença, a morte sempre iminente, o cotidiano mínimo — tudo isso entrou na poesia. Viveu no Rio de Janeiro por décadas, em apartamentos modestos, e fez do ordinário o mais belo material lírico do Modernismo brasileiro.',
    estilo:      'Lirismo do cotidiano: o trem, a rua, o peixe no aquário, a voz que chama no corredor. Brevidade absoluta — alguns de seus melhores poemas têm cinco linhas. Linguagem coloquial elevada sem esforço aparente. A morte como presença constante que torna cada coisa mais viva.',
    frase:       '"Estou farto do lirismo comedido / Do lirismo bem comportado / Do lirismo funcionário público."',
    obras: [
      {
        titulo: 'Libertinagem',
        ano:    1930,
        genero: 'Poesia',
        nota:   'O livro mais moderno e livre de Bandeira. "Vou-me embora pra Pasárgada", "O Bicho", "Pneumotórax" — tosse, tosse, tosse. A liberdade formal e a leveza que escondem profundidade. O título é uma declaração de independência dos estilos anteriores.',
      },
      {
        titulo: 'Estrela da Manhã',
        ano:    1936,
        genero: 'Poesia',
        nota:   'Consolidação da maturidade. "Poema do Beco", "Consoada", "Testamento". Bandeira meditando sobre a morte sem melo-drama, com a leveza de quem já se despediu muitas vezes. "Consoada" é dos mais belos poemas em língua portuguesa.',
      },
      {
        titulo: 'Itinerário de Pasárgada',
        ano:    1954,
        genero: 'Memórias',
        nota:   'Não é poesia, mas prosa memorialística sobre sua vida e sua formação de poeta. Fundamental para entender de onde vem a leveza e a precisão de seus versos. Leitura breve, reveladora e muito bem escrita.',
      },
    ],
  },
  {
    id:          'grace_aranha',
    nome:        'Graciliano Ramos',
    vida:        '1892 – 1953',
    pais:        'Brasil',
    movimento:   'Modernismo / Regionalismo',
    tag:         'A secura',
    bio:         'Nasceu em Quebrangulo, Alagoas. Prefeito de Palmeira dos Índios, funcionário público, preso político pelo Estado Novo em 1936 sem acusação formal. Passou quase um ano preso — a experiência virou "Memórias do Cárcere". Prosa seca, sem ornamento, sem compaixão fácil. O escritor que mais economizou palavras na literatura brasileira.',
    estilo:      'Prosa de máxima contenção. Cada palavra que sobra é uma falha. Personagens presos em condições materiais que não escolheram, incapazes de articular o que sentem porque carecem da linguagem para isso. O narrador não os julga nem os salva — apenas registra com precisão clínica o que a seca, a miséria e o poder fazem com seres humanos.',
    frase:       '"As palavras são difíceis. Se ao menos houvesse palavras para dizer o que é necessário dizer."',
    obras: [
      {
        titulo: 'Vidas Secas',
        ano:    1938,
        genero: 'Romance',
        nota:   'Fabiano, Sinhá Vitória, os dois filhos e a cachorra Baleia fogem da seca. Cada capítulo pode ser lido separado. O capítulo "Baleia" é um dos momentos mais emocionantes da literatura brasileira — narrado do ponto de vista da cachorra morrendo. Romance sobre a impossibilidade de ser humano quando a vida não permite.',
      },
      {
        titulo: 'São Bernardo',
        ano:    1934,
        genero: 'Romance',
        nota:   'Paulo Honório, narrador brutal e ambicioso, constrói uma fazenda e destrói a mulher que amou. Confissão de um homem que só sabe acumular e dominar. A pergunta que fica: Paulo Honório sabe que errou ou apenas acha que poderia ter calculado melhor?',
      },
      {
        titulo: 'Memórias do Cárcere',
        ano:    1953,
        genero: 'Memórias',
        nota:   'Publicado postumamente. Relato da prisão política de 1936. Sem heroísmo, sem vitimismo — apenas o observador preciso documentando o funcionamento do poder e da humilhação. Um dos grandes livros de testemunho da literatura brasileira.',
      },
    ],
  },
  {
    id:          'carolina',
    nome:        'Carolina Maria de Jesus',
    vida:        '1914 – 1977',
    pais:        'Brasil',
    movimento:   'Literatura de testemunho',
    tag:         'A voz da favela',
    bio:         'Nasceu em Sacramento, Minas Gerais. Filha de trabalhadores rurais, teve acesso irregular à escola e aprendeu a ler e escrever sozinha. Migrou para São Paulo, foi catadora de papel na favela do Canindé. Escrevia em cadernos que catava do lixo. O jornalista Audálio Dantas a descobriu em 1958 — "Quarto de Despejo" foi publicado em 1960 e vendeu mais de 100 mil exemplares no primeiro ano.',
    estilo:      'Português com marcas da oralidade e da escolarização precária usados como traços, não como falhas. Registro direto do cotidiano da miséria: o que comeu, o que não comeu, o que viu, o que sentiu. Ironia amarga e autopreservação pelo humor. Uma voz que existia antes da academia e apesar dela.',
    frase:       '"Quando estou na favela, sinto que sou um objeto fora do seu lugar."',
    obras: [
      {
        titulo: 'Quarto de Despejo: Diário de uma Favelada',
        ano:    1960,
        genero: 'Diário / Testemunho',
        nota:   'Diário escrito entre 1955 e 1960 na favela do Canindé, São Paulo. Registro brutal e cotidiano da fome, do frio e da violência. O mais importante documento literário sobre a pobreza urbana brasileira do século XX. Traduzido para mais de 40 línguas.',
      },
      {
        titulo: 'Casa de Alvenaria',
        ano:    1961,
        genero: 'Diário',
        nota:   'Continuação do diário, desta vez da casa que comprou com o dinheiro do sucesso de "Quarto de Despejo". A outra face da história: o que acontece quando a pessoa pobre finalmente tem o que queria? A solidão do sucesso e o afastamento da comunidade de origem.',
      },
      {
        titulo: 'Pedaços da Fome',
        ano:    1963,
        genero: 'Romance',
        nota:   'Único romance de Carolina. Menos estudado que os diários, mas revela a ambição literária além do testemunho. A autora tentando o romance — com seus recursos e seus limites, que são parte do significado da obra.',
      },
    ],
  },
];

/* ================================================================
   CSS DE ESCOPO
   ================================================================ */

const CSS = `
  .gn-page {
    max-width: var(--content-width);
  }
  .gn-intro {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-ink-mid);
    line-height: 1.8;
    margin-bottom: var(--space-10);
  }
  .gn-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  /* Card fechado */
  .gn-card {
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .gn-card:first-child {
    border-color: var(--color-gold);
    border-width: 2px;
  }
  .gn-hdr {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    width: 100%;
    padding: var(--space-5) var(--space-6);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background var(--transition-fast);
  }
  .gn-hdr:hover { background: var(--color-paper-dark); }
  .gn-hdr:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: -2px;
  }
  .gn-rank {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-paper-dark);
    border: 1.5px solid var(--color-paper-border);
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-ink-ghost);
    flex-shrink: 0;
  }
  .gn-card:first-child .gn-rank {
    background: var(--color-gold);
    border-color: var(--color-gold);
    color: var(--color-paper);
  }
  .gn-hdr-meta { flex: 1; }
  .gn-nome {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: 2px;
  }
  .gn-sub {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
  }
  .gn-vida {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
  }
  .gn-movimento {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-accent);
  }
  .gn-tag {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    padding: 2px var(--space-2);
    background: var(--color-paper-dark);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius-sm);
    color: var(--color-ink-ghost);
  }
  .gn-chev {
    font-size: 10px;
    color: var(--color-ink-ghost);
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  /* Card aberto */
  .gn-body {
    border-top: 1px solid var(--color-paper-border);
    padding: var(--space-6);
    background: var(--color-paper-dark);
  }
  .gn-frase {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-style: italic;
    color: var(--color-ink-mid);
    border-left: 3px solid var(--color-gold);
    padding-left: var(--space-5);
    margin-bottom: var(--space-6);
    line-height: 1.75;
  }
  .gn-section-label {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-ink-ghost);
    margin-bottom: var(--space-3);
  }
  .gn-bio {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
    margin-bottom: var(--space-6);
  }
  .gn-estilo {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.75;
    padding: var(--space-4) var(--space-5);
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-radius: var(--radius);
    margin-bottom: var(--space-6);
  }
  .gn-obras {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  .gn-obra {
    padding: var(--space-4) var(--space-5);
    background: var(--color-paper);
    border: 1px solid var(--color-paper-border);
    border-left: 3px solid var(--color-accent);
    border-radius: var(--radius);
  }
  .gn-card:first-child .gn-obra {
    border-left-color: var(--color-gold);
  }
  .gn-obra-titulo {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--color-ink);
    margin-bottom: var(--space-1);
  }
  .gn-obra-meta {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }
  .gn-obra-ano, .gn-obra-genero {
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-ink-ghost);
  }
  .gn-obra-genero {
    color: var(--color-accent);
  }
  .gn-obra-nota {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--color-ink-mid);
    line-height: 1.65;
  }

  @media (max-width: 768px) {
    .gn-hdr { padding: var(--space-4) var(--space-4); gap: var(--space-3); }
    .gn-body { padding: var(--space-4); }
    .gn-nome { font-size: var(--text-base); }
  }
`;

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

/**
 * Renderiza o módulo Grandes Nomes da Língua Portuguesa.
 * @returns {HTMLElement}
 */
export function renderGrandesNomes() {
  const page = document.createElement('div');
  page.className = 'gn-page';

  const style = document.createElement('style');
  style.textContent = CSS;
  page.appendChild(style);

  page.innerHTML += `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Grandes Nomes da Língua Portuguesa</h1>
      <p class="gn-intro">
        Dez escritores que definiram o que a língua portuguesa pode fazer na prosa e no verso.
        Machado de Assis ocupa a primeira posição — por consenso crítico e por ser o fundador
        da ABL e o renovador radical da prosa brasileira. Para cada nome: quem foi, como escreve
        e três obras imprescindíveis com nota de leitura.
      </p>
    </div>
    <div class="gn-list" id="gn-list"></div>
  `;

  // Reapontar referência após innerHTML (que recria o DOM)
  const list = page.querySelector('#gn-list');

  NOMES.forEach((n, idx) => {
    const card = document.createElement('div');
    card.className = 'gn-card';

    const hdr = document.createElement('button');
    hdr.type = 'button';
    hdr.className = 'gn-hdr';
    hdr.setAttribute('aria-expanded', 'false');
    hdr.setAttribute('aria-controls', `gn-body-${n.id}`);
    hdr.innerHTML = `
      <div class="gn-rank">${idx + 1}</div>
      <div class="gn-hdr-meta">
        <p class="gn-nome">${n.nome}</p>
        <div class="gn-sub">
          <span class="gn-vida">${n.vida} · ${n.pais}</span>
          <span class="gn-movimento">${n.movimento}</span>
          <span class="gn-tag">${n.tag}</span>
        </div>
      </div>
      <div class="gn-chev" aria-hidden="true">▼</div>
    `;

    const body = document.createElement('div');
    body.className = 'gn-body';
    body.id = `gn-body-${n.id}`;
    body.style.display = 'none';
    body.innerHTML = `
      <blockquote class="gn-frase">${n.frase}</blockquote>

      <p class="gn-section-label">Quem foi</p>
      <p class="gn-bio">${n.bio}</p>

      <p class="gn-section-label">Como escreve</p>
      <div class="gn-estilo">${n.estilo}</div>

      <p class="gn-section-label" style="margin-bottom:var(--space-3)">Três obras imprescindíveis</p>
      <div class="gn-obras">
        ${n.obras.map(ob => `
          <div class="gn-obra">
            <p class="gn-obra-titulo">${ob.titulo}</p>
            <div class="gn-obra-meta">
              <span class="gn-obra-ano">${ob.ano}</span>
              <span class="gn-obra-genero">${ob.genero}</span>
            </div>
            <p class="gn-obra-nota">${ob.nota}</p>
          </div>
        `).join('')}
      </div>
    `;

    hdr.addEventListener('click', () => {
      const open = body.style.display !== 'block';
      body.style.display = open ? 'block' : 'none';
      hdr.setAttribute('aria-expanded', String(open));
      hdr.querySelector('.gn-chev').style.transform = open ? 'rotate(180deg)' : '';
    });

    card.appendChild(hdr);
    card.appendChild(body);
    list.appendChild(card);
  });

  return page;
}
