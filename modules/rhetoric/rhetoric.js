/**
 * rhetoric.js — Módulo 12: Retórica
 *
 * A arte de persuadir segundo Aristóteles e a tradição clássica.
 *
 * Estrutura em 5 tabs:
 *   1. Ethos, Pathos, Logos — os três modos de persuasão aristotélicos
 *   2. Partes do Discurso   — exórdio, narração, argumentação, peroração
 *   3. Figuras Retóricas    — anáfora, quiasmo, antítese, gradação, etc.
 *   4. Discursos Clássicos  — análise estrutural de discursos históricos
 *   5. Treino               — identifica o modo de persuasão e as figuras
 *
 * Dados declarados neste módulo. Sem dependências externas.
 */

/* ================================================================
   BANCO: ETHOS / PATHOS / LOGOS
   ================================================================ */

const MODOS = [
  {
    id:      'ethos',
    nome:    'Ethos',
    sub:     'Persuasão pelo caráter',
    cor:     'var(--color-accent)',
    origem:  'Do grego ἦθος — caráter, disposição moral.',
    def:     'Ethos é a persuasão que decorre do caráter do orador. O discurso convence porque quem fala é percebido como competente, honesto e bem-intencionado. Não é a reputação prévia — é o que o próprio discurso projeta de si.',
    como:    [
      'Demonstrar conhecimento técnico do tema (competência)',
      'Admitir limitações ou pontos controversos (honestidade)',
      'Mostrar que os interesses do orador coincidem com os do público (benevolência)',
      'Usar linguagem adequada ao contexto e ao auditório',
      'Citar fontes e autoridades — mas sem substituí-las pelo argumento próprio',
    ],
    exemplos: [
      {
        trecho:  '"Como médica e pesquisadora há vinte anos nessa área, afirmo que os dados mostram o contrário."',
        analise: 'Ethos de competência: a qualificação profissional é invocada para fundamentar a credibilidade da afirmação.',
      },
      {
        trecho:  '"Posso estar errado sobre os números — mas o princípio central continua sólido."',
        analise: 'Ethos de honestidade: admitir possível falha factual reforça a confiança na integridade do raciocínio.',
      },
    ],
    atencao: 'Ethos pode ser manipulado: o orador que projeta autoridade sem tê-la está cometendo a falácia do apelo à autoridade (argumentum ad verecundiam). O ethos legítimo é construído pelo argumento, não apenas declarado.',
  },
  {
    id:      'pathos',
    nome:    'Pathos',
    sub:     'Persuasão pela emoção',
    cor:     'var(--color-gold)',
    origem:  'Do grego πάθος — sofrimento, emoção, experiência vivida.',
    def:     'Pathos é a persuasão que age sobre as emoções do auditório — medo, esperança, compaixão, indignação, orgulho. Não é desonesto por natureza: emoções são respostas racionais a situações reais. O problema surge quando o pathos substitui o argumento em vez de acompanhá-lo.',
    como:    [
      'Narrativas concretas com personagens específicos (não "milhões sofrem" — "Maria, 7 anos, não...")',
      'Imagens vívidas que tornam abstrato em concreto',
      'Perguntas retóricas que fazem o público sentir o problema antes de analisá-lo',
      'Tom adequado ao momento — sobriedade ou urgência conforme o contexto',
      'Apelo ao que o público já valoriza: família, justiça, segurança, liberdade',
    ],
    exemplos: [
      {
        trecho:  '"Imaginem que o filho de vocês acorda às 5h para tomar três ônibus e chega à escola com fome. Esse é o aluno que precisamos alcançar."',
        analise: 'Pathos de empatia: o cenário concreto e o pronome de segunda pessoa ("vocês") convocam a identificação emocional antes do argumento pedagógico.',
      },
      {
        trecho:  '"Não falamos de estatísticas. Falamos de pessoas que construíram este país com as próprias mãos."',
        analise: 'Pathos de dignidade: a rejeição explícita do abstrato ("estatísticas") em favor do concreto ("pessoas") convoca sentimento de justiça.',
      },
    ],
    atencao: 'Pathos se torna manipulação quando as emoções evocadas são desproporcionais aos fatos, quando substitui evidências ou quando explora medos irracionais. O demagogia é pathos sem logos.',
  },
  {
    id:      'logos',
    nome:    'Logos',
    sub:     'Persuasão pela razão',
    cor:     'var(--color-green)',
    origem:  'Do grego λόγος — palavra, razão, discurso, argumento.',
    def:     'Logos é a persuasão pelo argumento racional: dados, evidências, inferências lógicas, exemplos verificáveis. É a espinha dorsal do discurso — sem logos, ethos e pathos não sustentam nada a longo prazo.',
    como:    [
      'Dados quantitativos com fonte explicitada',
      'Exemplos concretos e verificáveis',
      'Raciocínio dedutivo: premissa geral → caso específico → conclusão',
      'Raciocínio indutivo: vários casos específicos → generalização',
      'Analogias estruturais entre domínios conhecidos e o tema em discussão',
      'Antecipação e refutação de objeções previsíveis',
    ],
    exemplos: [
      {
        trecho:  '"Segundo o IBGE (2023), a taxa de conclusão do ensino médio em escolas públicas é de 67% — 21 pontos abaixo da rede privada. Essa diferença não é acidental: ela correlaciona com infraestrutura, formação docente e carga horária efetiva."',
        analise: 'Logos quantitativo: dado com fonte + interpretação causal com variáveis explícitas.',
      },
      {
        trecho:  '"Se toda linguagem é convenção social, e convenções podem ser revistas, então a gramática normativa também pode ser revisada — como o Acordo de 1990 demonstrou."',
        analise: 'Logos dedutivo: premissa maior (linguagem é convenção) → premissa menor (convenções são revisáveis) → conclusão → exemplo histórico que confirma.',
      },
    ],
    atencao: 'Logos não é infalivelmente honesto: dados podem ser selecionados tendenciosamente, correlação pode ser confundida com causalidade, e analogias podem ser estruturalmente falsas. Logos exige que o argumento seja não apenas válido (forma correta) mas sólido (premissas verdadeiras).',
  },
];

/* ================================================================
   BANCO: PARTES DO DISCURSO
   ================================================================ */

const PARTES = [
  {
    num:    'I',
    nome:   'Exórdio',
    lat:    'exordium — o início, o fio que se começa a tecer',
    funcao: 'Conquistar a benevolência, a atenção e a abertura do auditório. O exórdio não argumenta — prepara o terreno para que os argumentos sejam recebidos.',
    tecnicas: [
      { nome: 'Captatio benevolentiae', desc: 'Reconhecer o auditório, agradecer a presença, demonstrar respeito. Cria disposição favorável antes de qualquer conteúdo.' },
      { nome: 'Propositio', desc: 'Anunciar brevemente o tema e o propósito. O auditório sabe o que virá — e presta mais atenção quando antecipa a estrutura.' },
      { nome: 'Partitio', desc: 'Dividir o discurso em partes anunciadas. Cria expectativa e facilita o acompanhamento.' },
    ],
    erros:  ['Exórdio longo demais — o auditório perde a paciência antes do argumento', 'Começar com desculpas ou autodepreciação excessiva — compromete o ethos', 'Começar abruptamente com o argumento central — sem preparar o terreno emocional'],
    exemplo: 'Cidadãos, vim aqui não para acusar, mas para esclarecer. Há três pontos que preciso examinar com vocês — e peço apenas que ouçam com a mesma seriedade com que me dispus a preparar esta fala.',
    nota_exemplo: 'Captatio (pede escuta justa), propositio implícita (esclarecer), partitio explícita (três pontos).',
  },
  {
    num:    'II',
    nome:   'Narração',
    lat:    'narratio — o relato dos fatos',
    funcao: 'Apresentar os fatos relevantes da causa de forma clara, breve e verossímil. A narração não é neutra — é a seleção e enquadramento dos fatos que favorece a posição do orador.',
    tecnicas: [
      { nome: 'Brevidade', desc: 'Incluir apenas o que é necessário à causa. Detalhes irrelevantes diluem o foco e entediam.' },
      { nome: 'Clareza', desc: 'Ordenação temporal ou causal que permite ao auditório acompanhar sem esforço excessivo.' },
      { nome: 'Verossimilhança', desc: 'Os fatos devem parecer coerentes entre si e com o que o auditório já sabe. Inconsistências destroem a credibilidade.' },
    ],
    erros:  ['Narração excessivamente longa — vira relatório, não discurso', 'Incluir fatos que prejudicam a própria causa sem estratégia para revertê-los', 'Narrar de forma tão simplificada que parece evasão'],
    exemplo: 'Na noite de 12 de março, o contrato já havia sido assinado. Dois dias depois, o réu transferiu os fundos para uma conta no exterior. Na semana seguinte, a empresa declarou falência.',
    nota_exemplo: 'Sequência temporal precisa, fatos selecionados para criar nexo causal implícito entre as ações do réu e o resultado.',
  },
  {
    num:    'III',
    nome:   'Argumentação',
    lat:    'argumentatio — confirmação e refutação',
    funcao: 'O núcleo do discurso: apresentar as provas que confirmam a tese (confirmatio) e destruir as provas da parte contrária (refutatio). É aqui que ethos, pathos e logos se articulam.',
    tecnicas: [
      { nome: 'Confirmatio', desc: 'Apresentação dos argumentos próprios. Ordem recomendada por Cícero: começar com argumentos fortes, colocar os fracos no meio, terminar com o mais forte.' },
      { nome: 'Refutatio', desc: 'Antecipar e responder às objeções. Refutar antes que o adversário levante o argumento demonstra domínio e desativa ataques futuros.' },
      { nome: 'Digressio', desc: 'Momento de alívio ou aprofundamento lateral. Usado para introduzir pathos no meio de logos, ou para ampliar o contexto.' },
    ],
    erros:  ['Enumerar argumentos fracos em excesso — quantidade não compensa qualidade', 'Ignorar as objeções mais sérias — o auditório as percebe', 'Começar e terminar com argumentos fracos — efeito de primazia e recência trabalham contra você'],
    exemplo: 'Três razões sustentam nossa posição. Primeira, os dados do contrato são inequívocos. Segunda — e aqui reconheço a dificuldade —, a intenção é difícil de provar. Mas a terceira razão é definitiva: o padrão de comportamento documentado ao longo de dois anos não deixa dúvida razoável.',
    nota_exemplo: 'Ordem forte-fraco-forte. A admissão da dificuldade (ethos de honestidade) fortalece o argumento final.',
  },
  {
    num:    'IV',
    nome:   'Peroração',
    lat:    'peroratio — o fechamento, a conclusão',
    funcao: 'Recapitular os argumentos centrais, amplificar o apelo emocional e deixar o auditório com a disposição correta para agir ou decidir. A peroração não introduz argumentos novos — consolida o que foi construído.',
    tecnicas: [
      { nome: 'Enumeratio', desc: 'Resumo dos argumentos principais em forma compacta. Reforça pela repetição seletiva.' },
      { nome: 'Amplificatio', desc: 'Intensificação do apelo emocional — o momento de maior pathos. O auditório deve sair movido, não apenas informado.' },
      { nome: 'Indignatio / Conquestio', desc: 'Indignação moral ou apelo à compaixão, conforme o tipo de causa. Fecha o discurso com a emoção que leva à ação.' },
    ],
    erros:  ['Introduzir argumento novo — confunde e enfraquece', 'Peroração mais longa que a narração — desequilíbrio estrutural', 'Terminar sem gesto de encerramento claro — o auditório não sabe que acabou', 'Terminar com apologia excessiva — "desculpem o tempo de vocês"'],
    exemplo: 'Resumindo: os fatos provam a negligência, os dados quantificam o dano, e a lei é clara. Mas além da lei, há uma questão de princípio: se permitirmos isso, nenhum contrato terá valor. A decisão de vocês não é apenas sobre este caso — é sobre que sociedade queremos ser.',
    nota_exemplo: 'Enumeratio (fatos, dados, lei), amplificatio (generalização do caso para princípio), conquestio implícita (apelo à responsabilidade coletiva).',
  },
];

/* ================================================================
   BANCO: FIGURAS RETÓRICAS
   ================================================================ */

const FIGURAS = [
  {
    nome:     'Anáfora',
    grupo:    'Repetição',
    def:      'Repetição de uma palavra ou expressão no início de versos, frases ou orações sucessivas.',
    efeito:   'Cria ritmo, ênfase e coesão. A repetição martela a ideia na memória do auditório.',
    exemplo:  '"Lutamos pela paz. Lutamos pela justiça. Lutamos pelo direito de viver sem medo."',
    analise:  'A repetição de "Lutamos" no início de cada oração cria aceleração rítmica e faz a enumeração parecer uma lista de conquistas já decididas, não de desejos.',
    uso:      'Discursos políticos, sermões, manifestos, perorações. Alta eficácia emocional.',
  },
  {
    nome:     'Epístrofe',
    grupo:    'Repetição',
    def:      'Repetição de uma palavra ou expressão no final de frases ou orações sucessivas. Inverso da anáfora.',
    efeito:   'Cria eco e fechamento. A ideia repetida ao fim fica como última impressão de cada frase.',
    exemplo:  '"Pelo povo, para o povo, do povo."',
    analise:  'A palavra "povo" fecha cada fragmento — a causa política fica como ressonância final de cada declaração.',
    uso:      'Discursos cívicos, slogans políticos, manifestos.',
  },
  {
    nome:     'Quiasmo',
    grupo:    'Inversão',
    def:      'Inversão da ordem dos elementos em duas frases paralelas. Estrutura: A-B / B-A.',
    efeito:   'Cria simetria memorável. A inversão surpreende e fixa a frase na memória.',
    exemplo:  '"Não pergunte o que o seu país pode fazer por você — pergunte o que você pode fazer pelo seu país." (Kennedy)',
    analise:  'País→você / você→país. A inversão espelha a inversão de perspectiva que Kennedy exige do cidadão.',
    uso:      'Aforismos, slogans, fechamentos de discurso. Alta memorabilidade.',
  },
  {
    nome:     'Antítese',
    grupo:    'Contraste',
    def:      'Aproximação de ideias ou palavras de sentido oposto na mesma estrutura sintática.',
    efeito:   'O contraste ilumina os dois termos mutuamente. Cria tensão dramática.',
    exemplo:  '"É uma era de sabedoria, é uma era de insensatez." (Dickens)',
    analise:  'Sabedoria/insensatez no mesmo molde sintático: a contradição é apresentada como fato simultâneo, não como paradoxo a resolver.',
    uso:      'Definições, caracterizações de épocas ou situações complexas, exórdios.',
  },
  {
    nome:     'Gradação (Clímax)',
    grupo:    'Intensidade',
    def:      'Encadeamento de termos ou ideias em ordem crescente de intensidade.',
    efeito:   'Cria aceleração e culminância. O auditório é conduzido para um pico de intensidade.',
    exemplo:  '"Vim, vi, venci." (César) / "Não apenas uma falha — um engano — uma traição."',
    analise:  'No exemplo de César: brevidade crescente, ação crescente, conquista crescente. No segundo: cada substantivo amplifica o anterior em gravidade moral.',
    uso:      'Perorações, acusações, descrições dramáticas.',
  },
  {
    nome:     'Anticlímax',
    grupo:    'Intensidade',
    def:      'Encadeamento em ordem decrescente de intensidade, ou quebra inesperada do clímax com elemento menor.',
    efeito:   'Pode criar humor, bathos ou denúncia da desproporcionalidade.',
    exemplo:  '"Perdemos a batalha, perdemos o exército, perdemos o comandante — e perdemos a caneta do secretário."',
    analise:  'A quebra do padrão grave com "caneta do secretário" é bathos — efeito cômico ou crítico que denuncia prioridades invertidas.',
    uso:      'Sátira política, discurso irônico, crítica às pequenas obsessões.',
  },
  {
    nome:     'Epanadiplose',
    grupo:    'Repetição',
    def:      'Figura em que a frase começa e termina com a mesma palavra ou expressão.',
    efeito:   'Cria circularidade e totalidade. A ideia encerra a si mesma.',
    exemplo:  '"O rei está morto. Longa vida ao rei." / "Sangue chama sangue."',
    analise:  '"Rei" abre e fecha a expressão — a monarquia se perpetua apesar da morte. "Sangue" no início e no fim: a violência gera violência em ciclo fechado.',
    uso:      'Máximas, fórmulas solenes, sentenças com força de lei.',
  },
  {
    nome:     'Prosopopeia (Personificação retórica)',
    grupo:    'Amplificação',
    def:      'Dar voz a seres ausentes, mortos ou abstratos. Na retórica, vai além da figura de linguagem: o orador fala em nome de entidades que não podem falar.',
    efeito:   'Amplia moralmente o alcance do argumento. O orador torna-se porta-voz de forças maiores.',
    exemplo:  '"Se esta cidade pudesse falar, diria: basta." / "Os mortos desta guerra nos cobram uma resposta."',
    analise:  'A cidade e os mortos são convocados como testemunhas. O orador não fala por si — fala por forças que o auditório não pode contestar facilmente.',
    uso:      'Discursos políticos, sermões fúnebres, perorações.',
  },
  {
    nome:     'Enumeratio',
    grupo:    'Amplificação',
    def:      'Listagem de partes ou aspectos de um todo para amplificar o efeito do argumento.',
    efeito:   'A acumulação cria peso e completude. O que é listado parece exaustivo e irrefutável.',
    exemplo:  '"Há fome, há analfabetismo, há violência, há corrupção, há descaso — e ainda perguntam por que o povo desconfia."',
    analise:  'Cada item da lista adiciona evidência. A pergunta retórica final usa a enumeratio como premissa implícita para a conclusão.',
    uso:      'Confirmatio, peroração, construção de indignação moral.',
  },
  {
    nome:     'Hipofora',
    grupo:    'Estrutura',
    def:      'O orador formula uma questão e imediatamente a responde — antes que o adversário ou o auditório o faça.',
    efeito:   'Controla a agenda do debate. Antecipar e responder à pergunta mais difícil demonstra domínio e desativa ataques.',
    exemplo:  '"Dirão que somos ingênuos. E eu digo: não somos ingênuos — somos obstinados. Há diferença."',
    analise:  'A objeção é convocada pelo próprio orador, que a reformula e a distingue da sua posição real. A definição final ("obstinados") substitui a acusação.',
    uso:      'Refutatio, resposta a críticas antecipadas, momentos de alta tensão no debate.',
  },
  {
    nome:     'Correctio',
    grupo:    'Estrutura',
    def:      'O orador corrige ou substitui uma palavra ou expressão que acabou de usar, geralmente para intensificar.',
    efeito:   'Cria impressão de precisão e espontaneidade. A correção parece busca por maior exatidão — e a palavra final fica com mais força.',
    exemplo:  '"Isso foi um erro — não, foi uma traição." / "Ele mentiu — aliás, enganou sistematicamente."',
    analise:  'A primeira palavra é descartada em favor de uma mais grave. O descarte implica que o orador está sendo rigoroso consigo mesmo.',
    uso:      'Acusações, caracterizações de caráter, momentos de escalada dramática.',
  },
  {
    nome:     'Paralelismo',
    grupo:    'Simetria',
    def:      'Repetição de estrutura sintática em frases ou orações sucessivas, com conteúdo diferente.',
    efeito:   'Cria equilíbrio, clareza e ritmo. Ideias paralelas parecem igualmente ponderadas e inevitáveis.',
    exemplo:  '"A educação liberta o indivíduo. A ciência avança a civilização. A arte humaniza a experiência."',
    analise:  'Sujeito + verbo + objeto em três frases: a simetria sintática sugere que as três proposições têm o mesmo peso e mesma evidência.',
    uso:      'Definições, séries de argumentos, exórdios e perorações.',
  },
  {
    nome:     'Eufemismo',
    grupo:    'Substituição',
    def:      'Substituição de expressão considerada rude, chocante ou inconveniente por outra mais suave.',
    efeito:   'Atenua o impacto emocional ou social de algo negativo. Pode ser cortesia legítima ou, em contexto retórico, mecanismo de ocultamento.',
    exemplo:  '"Ele nos deixou" (em vez de "morreu"). "Funcionário dispensado" (em vez de "demitido"). "Efeitos colaterais" (em vez de "danos").',
    analise:  'Em debates públicos, o eufemismo pode tornar políticas impopulares mais palatáveis. Identificar o eufemismo permite recuperar o que foi dito sem ser dito.',
    uso:      'Diplomacia, comunicação corporativa, necrológios, comunicados governamentais.',
  },
  {
    nome:     'Perífrase',
    grupo:    'Substituição',
    def:      'Substituição de uma palavra ou nome por uma expressão descritiva que o identifica indiretamente.',
    efeito:   'Evita repetição, cria efeito poético ou enfatiza uma característica específica do referente.',
    exemplo:  '"A cidade maravilhosa" (Rio de Janeiro). "O Poeta dos Escravos" (Castro Alves). "A rainha dos esportes" (atletismo).',
    analise:  'A perífrase escolhida não é neutra — ela seleciona e amplifica um aspecto. "Cidade maravilhosa" omite a violência; "Poeta dos Escravos" define Castro Alves pela causa, não pela forma.',
    uso:      'Jornalismo esportivo, elogio retórico, poesia épica.',
  },
  {
    nome:     'Antonomásia',
    grupo:    'Substituição',
    def:      'Uso de um nome próprio para designar uma qualidade, ou de uma qualidade para substituir um nome próprio.',
    efeito:   'Condensa julgamento e identidade em uma palavra. Cria tipos e arquétipos.',
    exemplo:  '"Um Einstein" (pessoa muito inteligente). "O Pelé do tênis" (melhor jogador). "O Judas da equipe" (traidor).',
    analise:  'A antonomásia é um atalho retórico poderoso: ao invocar um nome, transfere todo o peso simbólico associado a ele. Também pode ser instrumento de demonização ou santificação.',
    uso:      'Comparações laudatórias, crítica política, jornalismo.',
  },
  {
    nome:     'Metonímia',
    grupo:    'Substituição',
    def:      'Substituição de uma palavra por outra com a qual tem relação de contiguidade real (não de semelhança).',
    efeito:   'Cria condensação e permite invocar totalidades por suas partes mais salientes.',
    exemplo:  '"Ler Machado" (= ler a obra de Machado). "Beber um cálice" (= beber o conteúdo do cálice). "O Planalto anunciou" (= o governo federal).',
    analise:  'Diferente da metáfora (baseada em semelhança), a metonímia opera por contato: obra→ autor, continente→ conteúdo, lugar→ instituição. Identificar a relação real é a chave da análise.',
    uso:      'Jornalismo ("Wall Street reagiu"), crítica literária, linguagem cotidiana.',
  },
  {
    nome:     'Paradoxo',
    grupo:    'Tensão',
    def:      'Afirmação aparentemente contraditória que, ao ser examinada, revela uma verdade mais profunda.',
    efeito:   'Força o leitor a abandonar o raciocínio binário e considerar uma realidade mais complexa.',
    exemplo:  '"Morro porque não morro" (Santa Teresa de Ávila). "O silêncio gritava." "Menos é mais."',
    analise:  'O paradoxo não é erro lógico — é uma compressão de tensão real. Em retórica, serve para capturar experiências que resistem à linguagem direta e para provocar reflexão.',
    uso:      'Poesia mística, aforismos filosóficos, publicidade conceitual.',
  },
  {
    nome:     'Oxímoro',
    grupo:    'Tensão',
    def:      'União sintática imediata de dois termos contraditórios que se qualificam mutuamente.',
    efeito:   'Cria tensão expressiva concentrada. Difere do paradoxo por ser uma construção de dois termos imediatos.',
    exemplo:  '"Silêncio ensurdecedor". "Escuridão luminosa". "Doce amargura". "Paz armada".',
    analise:  'O oxímoro é o paradoxo na sua forma mais comprimida. Enquanto o paradoxo pode ser uma proposição inteira, o oxímoro é sempre uma construção binária direta.',
    uso:      'Poesia, título de obras, slogans políticos, crítica literária.',
  },
  {
    nome:     'Zeugma',
    grupo:    'Elipse',
    def:      'Omissão de um elemento já mencionado, que fica subentendido nas construções seguintes.',
    efeito:   'Cria ritmo acelerado e elegância sintática. A lacuna não obscurece — ela dinamiza.',
    exemplo:  '"Ele trouxe flores; ela, livros; eu, saudade." (verbo "trouxe" omitido nas duas últimas). "Alguns gostam de cinema, outros de teatro."',
    analise:  'O zeugma é uma elipse de retomada — o leitor preenche o elemento omitido sem esforço. O efeito é um paralelo dinâmico: os elementos comparados ganham equivalência pela mesma estrutura.',
    uso:      'Poesia, prosa literária, síntese jornalística.',
  },
  {
    nome:     'Catacrese',
    grupo:    'Substituição',
    def:      'Uso de uma palavra fora de seu sentido original por necessidade ou por desgaste do significado metafórico.',
    efeito:   'Revela como a linguagem comum é construída sobre metáforas mortas que já não sentimos como tais.',
    exemplo:  '"Pé da mesa", "braço da poltrona", "asa da xícara", "cabeça de alho", "folha de papel".',
    analise:  'A catacrese é a metáfora que foi tão usada que perdeu a consciência de ser metáfora. Em retórica, identificá-la revela que a linguagem "literal" já é sempre uma camada de figuras sedimentadas.',
    uso:      'Análise de linguagem, semântica, poesia que reativa metáforas desgastadas.',
  },
];

/* ================================================================
   BANCO: DISCURSOS CLÁSSICOS PARA ANÁLISE
   ================================================================ */

const DISCURSOS = [
  {
    titulo:  'Gettysburg Address — Lincoln (1863)',
    contexto: 'Dedicação do cemitério de Gettysburg, quatro meses após a batalha mais sangrenta da Guerra Civil. Lincoln tinha dois minutos. O orador principal discursou por duas horas.',
    texto:   '"Há oitenta e sete anos, nossos pais trouxeram a este continente uma nova nação, concebida na liberdade e dedicada à proposição de que todos os homens são criados iguais. Agora estamos engajados em uma grande guerra civil, testando se essa nação, ou qualquer nação assim concebida e assim dedicada, pode durar. (...) O mundo não notará, nem lembrará por muito tempo, o que dissermos aqui, mas nunca poderá esquecer o que eles fizeram aqui."',
    analise: [
      {
        figura:  'Ethos',
        trecho:  '"Nossos pais trouxeram..."',
        nota:    'Lincoln alinha-se aos fundadores — ethos de herança. Não é ele que fala, é a nação que se reconhece em seus princípios.',
      },
      {
        figura:  'Logos',
        trecho:  '"testando se essa nação... pode durar"',
        nota:    'A guerra é redefinida como experimento histórico com resultado em aberto — logos estrutural que transforma a batalha em questão de princípio.',
      },
      {
        figura:  'Antítese + Pathos',
        trecho:  '"O mundo não notará... mas nunca poderá esquecer o que eles fizeram"',
        nota:    'Antítese palavras/ações: o que os mortos fizeram supera o que qualquer discurso pode dizer. Pathos de reverência que torna o silêncio do orador em homenagem.',
      },
      {
        figura:  'Quiasmo implícito',
        trecho:  '"concebida na liberdade e dedicada à proposição de igualdade"',
        nota:    'Liberdade (individual) + igualdade (social): os dois princípios fundadores em tensão histórica são apresentados como unidade.',
      },
    ],
  },
  {
    titulo:  'Quousque tandem — Cícero (63 a.C.)',
    contexto: 'Primeira Catilinária: Cícero abre o Senado romano com Catilina presente, acusando-o de conspiração contra a república. A abertura é um dos exórdios mais estudados da história.',
    texto:   '"Até quando, Catilina, abusarás da nossa paciência? Por quanto tempo ainda essa loucura tua nos zombará? A que ponto se há de estender essa tua ousadia desenfreada? (...) Percebe, enfim, que tuas deliberações são reveladas, que o Senado as conhece. Qual é tua situação? Que noite, que quadrilha, que casa, que voz, que carta escreveste, que plano concebeste que nos seja desconhecido?"',
    analise: [
      {
        figura:  'Anáfora + Pathos',
        trecho:  '"Até quando... Por quanto tempo... A que ponto..."',
        nota:    'Três perguntas retóricas em sequência crescente. A anáfora da estrutura interrogativa cria indignação acumulada — o auditório responde internamente: "já passou da hora".',
      },
      {
        figura:  'Ethos de onisciência',
        trecho:  '"tuas deliberações são reveladas, que o Senado as conhece"',
        nota:    'Cícero projeta que sabe tudo. O inimigo está exposto antes de qualquer prova concreta. O ethos de inteligência política é a maior arma aqui.',
      },
      {
        figura:  'Enumeratio + Logos',
        trecho:  '"Que noite, que quadrilha, que casa, que voz, que carta..."',
        nota:    'A enumeração implica evidência em cada categoria. O logos é sugerido pela abundância de detalhes, mesmo sem apresentar os documentos.',
      },
      {
        figura:  'Hipofora invertida',
        trecho:  'O próprio Catilina está presente — Cícero não faz perguntas que esperam resposta. As perguntas são acusações.',
        nota:    'As interrogações retóricas funcionam como afirmações com força emocional amplificada. Catilina não pode responder sem se incriminar.',
      },
    ],
  },
  {
    titulo:  '"I Have a Dream" — King (1963)',
    contexto: 'Marcha sobre Washington, agosto de 1963. King improvisa parte do discurso — a seção mais famosa não estava no texto preparado.',
    texto:   '"Tenho um sonho de que meus quatro filhos pequenos viverão um dia numa nação onde não serão julgados pela cor de sua pele, mas pelo conteúdo de seu caráter. Tenho um sonho hoje! (...) E quando isso acontecer, quando deixarmos a liberdade repicar, quando a deixarmos repicar de cada aldeia e cada lugarejo, de cada estado e cada cidade, seremos capazes de acelerar aquele dia em que todos os filhos de Deus — negros e brancos, judeus e gentios, protestantes e católicos — poderão juntar as mãos e cantar nas palavras do velho espiritual negro: Livres afinal, livres afinal, graças a Deus Todo-Poderoso, somos livres afinal."',
    analise: [
      {
        figura:  'Anáfora central',
        trecho:  '"Tenho um sonho" (repetido 8 vezes no discurso)',
        nota:    'A anáfora mais famosa do século XX. Cada repetição introduz uma visão específica — a acumulação transforma o sonho pessoal em visão coletiva.',
      },
      {
        figura:  'Antítese + Inclusão',
        trecho:  '"negros e brancos, judeus e gentios, protestantes e católicos"',
        nota:    'Antíteses que se dissolvem: cada par de opostos é reunido pelo "e". A sintaxe encena a reconciliação que o discurso pede.',
      },
      {
        figura:  'Pathos + Intertextualidade',
        trecho:  '"Livres afinal" (do espiritual negro)',
        nota:    'A citação do espiritual ativa a memória coletiva do sofrimento. Pathos de herança: a liberdade pedida não é nova — é a que foi prometida e negada.',
      },
      {
        figura:  'Epanadiplose',
        trecho:  '"Livres afinal, livres afinal... somos livres afinal."',
        nota:    'A expressão abre e fecha o trecho final — circularidade que soa como realização já acontecida, não como promessa futura.',
      },
    ],
  },
];

/* ================================================================
   BANCO: EXERCÍCIOS DE TREINO
   ================================================================ */

const TREINO = [
  {
    id:      't01',
    texto:   '"Como engenheiro com trinta anos de experiência em pontes, afirmo que este projeto é tecnicamente inviável."',
    pergunta: 'Qual modo de persuasão predomina?',
    opcoes:  ['Ethos', 'Pathos', 'Logos'],
    correct: 0,
    explicacao: 'Ethos de competência: a credibilidade é construída pela qualificação profissional ("engenheiro", "trinta anos"). O argumento técnico é apresentado, mas a força persuasiva está na autoridade do locutor.',
  },
  {
    id:      't02',
    texto:   '"Imaginem uma criança que acorda às 4h, caminha cinco quilômetros na escuridão e chega à escola sem ter comido. Esse é o aluno que estamos abandonando."',
    pergunta: 'Qual modo de persuasão predomina?',
    opcoes:  ['Ethos', 'Pathos', 'Logos'],
    correct: 1,
    explicacao: 'Pathos: a narrativa concreta e sensorial (hora, distância, escuridão, fome) convoca empatia e indignação antes de qualquer dado. "Imaginem" é a convocação explícita à emoção.',
  },
  {
    id:      't03',
    texto:   '"Países que investiram mais de 6% do PIB em educação por pelo menos duas décadas apresentam, sem exceção, melhores índices de desenvolvimento humano. Os dados são do Banco Mundial."',
    pergunta: 'Qual modo de persuasão predomina?',
    opcoes:  ['Ethos', 'Pathos', 'Logos'],
    correct: 2,
    explicacao: 'Logos: evidência quantitativa com fonte explícita, universalidade implícita ("sem exceção"), raciocínio indutivo (vários países → generalização).',
  },
  {
    id:      't04',
    texto:   '"Lutamos ontem. Lutamos hoje. Lutaremos amanhã."',
    pergunta: 'Qual figura retórica está presente?',
    opcoes:  ['Quiasmo', 'Anáfora', 'Antítese', 'Gradação'],
    correct: 1,
    explicacao: '"Lutamos" repete no início de cada oração — anáfora. A progressão temporal (ontem/hoje/amanhã) cria também gradação, mas a figura estrutural dominante é a anáfora.',
  },
  {
    id:      't05',
    texto:   '"Não pergunte o que a empresa pode fazer por você. Pergunte o que você pode fazer pela empresa."',
    pergunta: 'Qual figura retórica está presente?',
    opcoes:  ['Anáfora', 'Epístrofe', 'Quiasmo', 'Paralelismo'],
    correct: 2,
    explicacao: 'Quiasmo: empresa→você / você→empresa. A inversão espelha a inversão de perspectiva exigida. A estrutura A-B / B-A é a marca do quiasmo.',
  },
  {
    id:      't06',
    texto:   '"Era o melhor dos tempos, era o pior dos tempos." (Dickens)',
    pergunta: 'Qual figura retórica está presente?',
    opcoes:  ['Gradação', 'Antítese', 'Anáfora', 'Quiasmo'],
    correct: 1,
    explicacao: 'Antítese: "melhor" e "pior" são opostos apresentados na mesma estrutura sintática. A repetição de "era o... dos tempos" é paralelismo — mas a figura central é a antítese pelo contraste de sentido.',
  },
  {
    id:      't07',
    texto:   '"Dirão que esta proposta é utópica. E eu digo: toda mudança real começou sendo chamada de utópica."',
    pergunta: 'Qual técnica retórica está sendo usada?',
    opcoes:  ['Captatio benevolentiae', 'Hipofora', 'Enumeratio', 'Epístrofe'],
    correct: 1,
    explicacao: 'Hipofora: o orador formula a objeção adversária ("dirão que é utópica") e imediatamente a responde, controlando como a crítica é recebida e invertendo seu valor.',
  },
  {
    id:      't08',
    texto:   '"Não foi um erro — foi uma falha — foi uma negligência criminosa."',
    pergunta: 'Qual figura retórica está presente?',
    opcoes:  ['Gradação (clímax)', 'Anticlímax', 'Correctio', 'Paralelismo'],
    correct: 2,
    explicacao: 'Correctio: o orador substitui sucessivamente a palavra anterior por uma mais grave. "Erro" → "falha" → "negligência criminosa". A correção progressiva intensifica a acusação e simula rigor semântico.',
  },
  {
    id:      't09',
    texto:   '"Se esta terra pudesse falar, ela diria: chega."',
    pergunta: 'Qual figura retórica está presente?',
    opcoes:  ['Antítese', 'Gradação', 'Prosopopeia', 'Quiasmo'],
    correct: 2,
    explicacao: 'Prosopopeia: a terra (abstrata/inanimada) recebe voz. O orador torna-se porta-voz de uma entidade que o auditório não pode facilmente contestar.',
  },
  {
    id:      't10',
    texto:   '"Trouxemos paz — não, trouxemos a promessa de paz." "Vencemos — não, resistimos."',
    pergunta: 'Qual figura retórica está sendo usada?',
    opcoes:  ['Antítese', 'Correctio', 'Hipofora', 'Epanadiplose'],
    correct: 1,
    explicacao: 'Correctio dupla: em cada caso, a primeira palavra é substituída por uma mais precisa (ou mais modesta). A autocorreção projeta honestidade e rigor — ethos pela forma.',
  },
];

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

export function renderRetorica() {
  const page = document.createElement('div');

  const TABS = [
    { id: 'modos',      label: 'Ethos · Pathos · Logos' },
    { id: 'partes',     label: 'Partes do Discurso'      },
    { id: 'figuras',    label: 'Figuras Retóricas'        },
    { id: 'discursos',  label: 'Discursos Clássicos'      },
    { id: 'treino',     label: 'Treino'                   },
  ];

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Retórica</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        A arte de persuadir com integridade. Aristóteles identificou três modos
        de persuasão — ethos, pathos, logos — que continuam sendo os instrumentos
        fundamentais de qualquer discurso eficaz. Este módulo ensina a reconhecê-los,
        combiná-los e identificar as figuras que os potencializam.
      </p>
    </div>

    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);flex-wrap:wrap" role="tablist">
      ${TABS.map((t, i) => `
        <button type="button" role="tab" class="rhet-tab" data-tab="${i}"
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
      <div id="rhet-panel-${i}" class="rhet-panel" style="${i > 0 ? 'display:none' : ''}"></div>
    `).join('')}
  `;

  // Renderiza cada painel
  const renderers = [
    renderModos,
    renderPartes,
    renderFiguras,
    renderDiscursos,
    renderTreino,
  ];
  TABS.forEach((_, i) => renderers[i](page.querySelector(`#rhet-panel-${i}`)));

  // Troca de tabs
  const tabs   = page.querySelectorAll('.rhet-tab');
  const panels = page.querySelectorAll('.rhet-panel');
  tabs.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      tabs.forEach((b, j) => {
        const active = j === i;
        b.style.color       = active ? 'var(--color-accent)' : 'var(--color-ink-ghost)';
        b.style.borderBottom= active ? '2px solid var(--color-accent)' : '2px solid transparent';
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach((p, j) => { p.style.display = j === i ? '' : 'none'; });
    });
  });

  return page;
}

/* ================================================================
   ABA 1 — ETHOS · PATHOS · LOGOS
   ================================================================ */

function renderModos(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-6);max-width:var(--content-width)';

  // Triângulo visual de referência
  const triangle = document.createElement('div');
  triangle.style.cssText = `
    display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);
    margin-bottom:var(--space-4);
  `;
  MODOS.forEach(m => {
    const chip = document.createElement('div');
    chip.style.cssText = `
      padding:var(--space-5);border-radius:var(--radius);text-align:center;
      border:1px solid var(--color-paper-border);
      background:var(--color-paper-dark);
    `;
    chip.innerHTML = `
      <p style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:${m.cor};margin-bottom:var(--space-1)">${m.nome}</p>
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${m.sub}</p>
    `;
    triangle.appendChild(chip);
  });
  wrap.appendChild(triangle);

  // Cards accordion por modo
  MODOS.forEach(modo => {
    const card = document.createElement('div');
    card.style.cssText = `border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper);border-left:4px solid ${modo.cor}`;

    const header = document.createElement('button');
    header.type = 'button';
    header.setAttribute('aria-expanded', 'false');
    header.style.cssText = `
      display:flex;align-items:center;gap:var(--space-4);width:100%;
      padding:var(--space-5) var(--space-6);background:none;border:none;
      cursor:pointer;text-align:left;transition:background var(--transition-fast);
    `;
    header.innerHTML = `
      <span style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:700;color:${modo.cor};flex-shrink:0;width:90px">${modo.nome}</span>
      <span style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);flex:1;font-style:italic">${modo.sub}</span>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);flex-shrink:0;transition:transform 0.2s">▼</span>
    `;
    header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
    header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-6)';
    body.appendChild(buildModoBody(modo));

    header.addEventListener('click', () => {
      const open = body.style.display !== 'block';
      body.style.display = open ? 'block' : 'none';
      header.setAttribute('aria-expanded', String(open));
      header.querySelector('.chev').style.transform = open ? 'rotate(180deg)' : '';
    });

    card.appendChild(header);
    card.appendChild(body);
    wrap.appendChild(card);
  });

  el.appendChild(wrap);
}

function buildModoBody(modo) {
  const wrap = document.createElement('div');

  // Origem
  wrap.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-1)">Origem</p>
    <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);font-style:italic;margin-bottom:var(--space-4)">${modo.origem}</p>

    <div style="height:1px;background:var(--color-paper-border);margin-bottom:var(--space-4)"></div>

    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-5)">${modo.def}</p>

    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Como usar</p>
    <ul style="list-style:none;padding:0;margin:0 0 var(--space-5);display:flex;flex-direction:column;gap:var(--space-2)">
      ${modo.como.map(c => `
        <li style="padding:var(--space-2) var(--space-4);background:var(--color-paper-dark);border-radius:var(--radius);
          font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6;
          border-left:2px solid var(--color-gold)">
          <span style="color:var(--color-gold);font-weight:700;margin-right:var(--space-2)">→</span>${c}
        </li>
      `).join('')}
    </ul>

    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplos comentados</p>
    <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-5)">
      ${modo.exemplos.map(ex => `
        <div style="border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
          <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);
            border-left:3px solid var(--color-ink);
            font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);
            font-style:italic;line-height:1.7">${ex.trecho}</div>
          <div style="padding:var(--space-3) var(--space-5);
            font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${ex.analise}</div>
        </div>
      `).join('')}
    </div>

    <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-1)">Atenção</p>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${modo.atencao}</p>
    </div>
  `;
  return wrap;
}

/* ================================================================
   ABA 2 — PARTES DO DISCURSO
   ================================================================ */

function renderPartes(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  // Timeline visual
  const timeline = document.createElement('div');
  timeline.style.cssText = 'display:flex;gap:0;margin-bottom:var(--space-8);border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';
  PARTES.forEach((p, i) => {
    const seg = document.createElement('div');
    seg.style.cssText = `
      flex:1;padding:var(--space-3) var(--space-2);text-align:center;
      background:${i % 2 === 0 ? 'var(--color-paper-dark)' : 'var(--color-paper)'};
      border-right:${i < PARTES.length - 1 ? '1px solid var(--color-paper-border)' : 'none'};
    `;
    seg.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-accent);font-weight:700">${p.num}</p>
      <p style="font-family:var(--font-display);font-size:var(--text-sm);color:var(--color-ink);font-weight:600">${p.nome}</p>
    `;
    timeline.appendChild(seg);
  });
  wrap.appendChild(timeline);

  // Cards accordion
  const cards = document.createElement('div');
  cards.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  PARTES.forEach(parte => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper)';

    const header = document.createElement('button');
    header.type = 'button';
    header.setAttribute('aria-expanded', 'false');
    header.style.cssText = `
      display:flex;align-items:center;gap:var(--space-4);width:100%;
      padding:var(--space-5) var(--space-6);background:none;border:none;
      cursor:pointer;text-align:left;transition:background var(--transition-fast);
    `;
    header.innerHTML = `
      <span style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:700;
        color:var(--color-paper);background:var(--color-accent);
        padding:2px 10px;border-radius:var(--radius);flex-shrink:0">${parte.num}</span>
      <div style="flex:1">
        <p style="font-family:var(--font-display);font-size:var(--text-xl);font-weight:600;color:var(--color-ink)">${parte.nome}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);font-style:italic">${parte.lat}</p>
      </div>
      <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);flex-shrink:0;transition:transform 0.2s">▼</span>
    `;
    header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
    header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-6)';
    body.appendChild(buildParteBody(parte));

    header.addEventListener('click', () => {
      const open = body.style.display !== 'block';
      body.style.display = open ? 'block' : 'none';
      header.setAttribute('aria-expanded', String(open));
      header.querySelector('.chev').style.transform = open ? 'rotate(180deg)' : '';
    });

    card.appendChild(header);
    card.appendChild(body);
    cards.appendChild(card);
  });

  wrap.appendChild(cards);
  el.appendChild(wrap);
}

function buildParteBody(parte) {
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-5)">${parte.funcao}</p>

    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Técnicas</p>
    <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-5)">
      ${parte.tecnicas.map(t => `
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:2px solid var(--color-gold)">
          <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-1)">${t.nome}</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${t.desc}</p>
        </div>
      `).join('')}
    </div>

    <div style="height:1px;background:var(--color-paper-border);margin-bottom:var(--space-4)"></div>

    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplo</p>
    <div style="margin-bottom:var(--space-4);padding:var(--space-4) var(--space-5);
      background:var(--color-paper-dark);border-left:3px solid var(--color-ink);border-radius:var(--radius);
      font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);font-style:italic;line-height:1.75">
      "${parte.exemplo}"
    </div>
    <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65;margin-bottom:var(--space-5)">${parte.nota_exemplo}</p>

    <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-2)">Erros frequentes</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2)">
        ${parte.erros.map(e => `
          <li style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55;
            padding-left:var(--space-3);border-left:2px solid var(--color-accent)">
            ${e}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  return wrap;
}

/* ================================================================
   ABA 3 — FIGURAS RETÓRICAS
   ================================================================ */

function renderFiguras(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  // Filtro por grupo
  const grupos = [...new Set(FIGURAS.map(f => f.grupo))];
  let filtroAtivo = 'todos';

  const filterWrap = document.createElement('div');
  filterWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-6)';

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  function buildFilter() {
    filterWrap.innerHTML = '';
    const label = document.createElement('p');
    label.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);width:100%;margin-bottom:var(--space-1)';
    label.textContent = 'Grupo';
    filterWrap.appendChild(label);

    ['todos', ...grupos].forEach(g => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-xs);
        padding:var(--space-1) var(--space-3);border-radius:var(--radius);
        border:1px solid var(--color-paper-border);cursor:pointer;
        background:${g === filtroAtivo ? 'var(--color-accent)' : 'var(--color-paper-dark)'};
        color:${g === filtroAtivo ? 'var(--color-paper)' : 'var(--color-ink-mid)'};
        transition:all var(--transition-fast);
      `;
      btn.textContent = g.charAt(0).toUpperCase() + g.slice(1);
      btn.addEventListener('click', () => {
        filtroAtivo = g;
        buildFilter();
        buildList();
      });
      filterWrap.appendChild(btn);
    });
  }

  function buildList() {
    listWrap.innerHTML = '';
    const filtered = filtroAtivo === 'todos' ? FIGURAS : FIGURAS.filter(f => f.grupo === filtroAtivo);

    filtered.forEach(fig => {
      const card = document.createElement('div');
      card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper)';

      const header = document.createElement('button');
      header.type = 'button';
      header.setAttribute('aria-expanded', 'false');
      header.style.cssText = `
        display:flex;align-items:center;gap:var(--space-4);width:100%;
        padding:var(--space-6) var(--space-6);background:none;border:none;
        cursor:pointer;text-align:left;transition:background var(--transition-fast);
      `;
      header.innerHTML = `
        <div style="flex:1;display:flex;align-items:center;gap:var(--space-3)">
          <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:600;color:var(--color-ink)">${fig.nome}</p>
          <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);
            background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
            padding:1px 8px;border-radius:var(--radius)">${fig.grupo}</span>
        </div>
        <span class="chev" style="font-size:10px;color:var(--color-ink-ghost);flex-shrink:0;transition:transform 0.2s">▼</span>
      `;
      header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
      header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

      const body = document.createElement('div');
      body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border);padding:var(--space-5) var(--space-6)';
      body.innerHTML = `
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.7;margin-bottom:var(--space-4)">${fig.def}</p>

        <div style="height:1px;background:var(--color-paper-border);margin-bottom:var(--space-4)"></div>

        <div style="border-left:3px solid var(--color-ink);padding:var(--space-6) var(--space-6);
          background:var(--color-paper-dark);border-radius:0 var(--radius) var(--radius) 0;margin-bottom:var(--space-3);
          font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink);line-height:1.75">
          "${fig.exemplo}"
        </div>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65;margin-bottom:var(--space-4)">${fig.analise}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
          <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:2px solid var(--color-gold)">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-gold);margin-bottom:var(--space-1)">Efeito</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55">${fig.efeito}</p>
          </div>
          <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:2px solid var(--color-accent)">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-1)">Uso típico</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.55">${fig.uso}</p>
          </div>
        </div>
      `;

      header.addEventListener('click', () => {
        const open = body.style.display !== 'block';
        body.style.display = open ? 'block' : 'none';
        header.setAttribute('aria-expanded', String(open));
        header.querySelector('.chev').style.transform = open ? 'rotate(180deg)' : '';
      });

      card.appendChild(header);
      card.appendChild(body);
      listWrap.appendChild(card);
    });
  }

  buildFilter();
  buildList();

  wrap.appendChild(filterWrap);
  wrap.appendChild(listWrap);
  el.appendChild(wrap);
}

/* ================================================================
   ABA 4 — DISCURSOS CLÁSSICOS
   ================================================================ */

function renderDiscursos(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-8);max-width:var(--content-width)';

  DISCURSOS.forEach((disc, di) => {
    if (di > 0) {
      const div = document.createElement('div');
      div.style.cssText = 'height:1px;background:var(--color-paper-border)';
      wrap.appendChild(div);
    }

    const block = document.createElement('div');

    block.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:var(--color-ink);margin-bottom:var(--space-2)">${disc.titulo}</h2>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65;margin-bottom:var(--space-5);font-style:italic">${disc.contexto}</p>

      <div style="margin-bottom:var(--space-6);padding:var(--space-5) var(--space-6);
        background:var(--color-paper-dark);border-left:4px solid var(--color-ink);
        border-radius:0 var(--radius) var(--radius) 0;">
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.85;font-style:italic">"${disc.texto}"</p>
      </div>

      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Análise retórica</p>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${disc.analise.map(a => `
          <div style="display:grid;grid-template-columns:120px 1fr;gap:var(--space-4);
            border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
            <div style="padding:var(--space-6);background:var(--color-paper-dark);
              display:flex;align-items:center;justify-content:center;text-align:center;">
              <span style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
                color:var(--color-accent);text-transform:uppercase;letter-spacing:0.06em">${a.figura}</span>
            </div>
            <div style="padding:var(--space-4)">
              <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink);margin-bottom:var(--space-2)">"${a.trecho}"</p>
              <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${a.nota}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    wrap.appendChild(block);
  });

  el.appendChild(wrap);
}

/* ================================================================
   ABA 5 — TREINO
   ================================================================ */

function renderTreino(el) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const intro = document.createElement('p');
  intro.style.cssText = 'font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75;margin-bottom:var(--space-6)';
  intro.textContent = 'Identifique o modo de persuasão (ethos, pathos, logos) ou a figura retórica em cada passagem. As primeiras questões focam nos modos; as seguintes, nas figuras.';
  wrap.appendChild(intro);

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

  TREINO.forEach(q => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden;background:var(--color-paper)';

    card.innerHTML = `
      <div style="padding:var(--space-5) var(--space-6)">
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);
          border-left:3px solid var(--color-ink);border-radius:0 var(--radius) var(--radius) 0;
          font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);
          font-style:italic;line-height:1.75;margin-bottom:var(--space-4)">
          "${q.texto}"
        </div>
        <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-3)">${q.pergunta}</p>
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)" id="opts-rh-${q.id}"></div>
        <div id="fb-rh-${q.id}" style="margin-top:var(--space-4);display:none"></div>
      </div>
    `;

    const optsWrap = card.querySelector(`#opts-rh-${q.id}`);
    const fbEl     = card.querySelector(`#fb-rh-${q.id}`);
    let answered   = false;

    q.opcoes.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;
        padding:var(--space-2) var(--space-5);border-radius:var(--radius);
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
            b.style.background = '#e8f5e9';
            b.style.borderColor = 'var(--color-green)';
            b.style.color = 'var(--color-green)';
          } else if (i === idx && !correct) {
            b.style.background = '#fce8e8';
            b.style.borderColor = 'var(--color-accent)';
            b.style.color = 'var(--color-accent)';
          }
        });

        fbEl.style.display = 'block';
        fbEl.innerHTML = `
          <div style="border-left:3px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'};padding-left:var(--space-4)">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
              color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};
              text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--space-1)">
              ${correct ? 'Correto' : `Incorreto — resposta: ${q.opcoes[q.correct]}`}
            </p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${q.explicacao}</p>
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
