/**
 * orthography.js — Módulo 10: Ortografia
 *
 * Organizado em três abas:
 *   1. Dúvidas Frequentes — 6 tópicos com regras, exemplos e macetes
 *   2. Exercícios — lacunas interativas (escolha a grafia correta)
 *   3. Referência Rápida — tabela compacta consultável
 *
 * Dados declarados neste módulo. Sem dependência de arquivos externos.
 * O motor de exercícios de lacuna é implementado localmente — não altera
 * exercise-engine.js, que opera sobre o fluxo de texts.json.
 */

/* ================================================================
   BANCO DE TÓPICOS
   ================================================================ */

const TOPICS = [
  {
    id:    'hifen',
    title: 'Hífen',
    icon:  '—',
    rules: [
      {
        rule:    'Prefixo terminado em vogal + palavra iniciada com a mesma vogal',
        use:     true,
        examples: ['anti-inflamatório', 'micro-ondas', 'semi-inconsciente'],
        tip:     'Duas vogais iguais em contato → hífen.',
      },
      {
        rule:    'Prefixo terminado em vogal + palavra iniciada com vogal diferente',
        use:     false,
        examples: ['autoescola', 'aeroespacial', 'semiaberto'],
        tip:     'Vogais diferentes em contato → sem hífen.',
      },
      {
        rule:    'Prefixo terminado em consoante + palavra iniciada com a mesma consoante',
        use:     true,
        examples: ['inter-regional', 'hiper-requintado', 'sub-bibliotecário'],
        tip:     'Duas consoantes iguais → hífen.',
      },
      {
        rule:    'Prefixo terminado em consoante + palavra iniciada com consoante diferente',
        use:     false,
        examples: ['interbrasileiro', 'supradentário', 'subdelegado'],
        tip:     'Consoantes diferentes → sem hífen.',
      },
      {
        rule:    'Prefixo + palavra iniciada por H',
        use:     true,
        examples: ['anti-herói', 'super-homem', 'pré-história', 'sub-humano'],
        tip:     'Palavra seguinte começa com H → sempre hífen.',
      },
      {
        rule:    'Prefixos ex-, vice-, recém-, sem-, além-, aquém-',
        use:     true,
        examples: ['ex-presidente', 'vice-diretor', 'recém-nascido', 'sem-teto'],
        tip:     'Esses prefixos sempre pedem hífen.',
      },
    ],
    note: 'Atenção: as regras acima seguem o Acordo Ortográfico de 1990, em vigor no Brasil desde 2009. Algumas grafias anteriores ao acordo diferem.',
  },
  {
    id:    'xch',
    title: 'X e CH',
    icon:  'X',
    rules: [
      {
        rule:    'Usa-se X após ditongo (vogal + i ou u)',
        use:     true,
        examples: ['caixa', 'frouxo', 'feixe', 'peixe', 'baixo', 'ameixa'],
        tip:     'Ditongo antes → X.',
      },
      {
        rule:    'Usa-se X após sílaba inicial EN-',
        use:     true,
        examples: ['enxada', 'enxame', 'enxaqueca', 'enxerto', 'enxoval'],
        tip:     'Exceção: "enchente", "encher", "enchumaçar" usam CH (vêm do latim).',
      },
      {
        rule:    'Usa-se X em palavras de origem indígena ou africana',
        use:     true,
        examples: ['xará', 'xique-xique', 'abacaxi', 'caxambu'],
        tip:     'Origem tupi ou africana → geralmente X.',
      },
      {
        rule:    'Usa-se CH em palavras de origem greco-latina',
        use:     true,
        examples: ['chave', 'cheque', 'técnica', 'psicologia (ch→k)', 'charlatão'],
        tip:     'Em palavras eruditas de origem grega, CH soa /k/: química, caráter.',
      },
      {
        rule:    'Palavras que só se aprendem pelo uso (memória lexical)',
        use:     null,
        examples: ['X: mexer, enxergar, relaxar, xícara', 'CH: china, chuva, cheiro, cheio, chimarrão'],
        tip:     'Para estas, o recurso é a leitura e o dicionário. Não há regra que cubra todos os casos.',
      },
    ],
  },
  {
    id:    'sz',
    title: 'S e Z',
    icon:  'S',
    rules: [
      {
        rule:    'Sufixo -ês / -esa (gentílicos e adjetivos de origem)',
        use:     true,
        examples: ['português', 'francesa', 'inglês', 'japonesa'],
        tip:     'Gentílicos formados com -ês / -esa → S.',
      },
      {
        rule:    'Sufixo -oso / -osa (adjetivos de qualidade)',
        use:     true,
        examples: ['famoso', 'perigosa', 'carinhoso', 'gostoso'],
        tip:     'Adjetivos em -oso → S.',
      },
      {
        rule:    'Verbos derivados de palavras com Z na raiz',
        use:     true,
        examples: ['analisar (análise)', 'pesquisar (pesquisa)', 'avisar (aviso)'],
        tip:     'Verbo gerado por substantivo/adjetivo com S → mantém S.',
      },
      {
        rule:    'Sufixo -izar em verbos formados sobre adjetivos ou substantivos sem S',
        use:     true,
        examples: ['modernizar', 'realizar', 'harmonizar', 'civilizar'],
        tip:     'Substantivo/adjetivo sem S na raiz + -izar → Z.',
      },
      {
        rule:    'Sufixo -ção vs. -são',
        use:     null,
        examples: [
          '-ção (derivados de verbos em -ar): amar → amação; criar → criação',
          '-são (derivados de verbos em -nder, -ndir, -tir, -dir): compreender → compreensão; dividir → divisão',
        ],
        tip:     'O verbo de origem dita o sufixo. Exceções existem — use dicionário.',
      },
    ],
  },
  {
    id:    'gj',
    title: 'G e J',
    icon:  'G',
    rules: [
      {
        rule:    'Usa-se G nas terminações -gem, -agem, -igem, -ugem',
        use:     true,
        examples: ['viagem', 'mensagem', 'garagem', 'fuligem', 'ferrugem'],
        tip:     'Exceção notável: "pajem" (escudeiro).',
      },
      {
        rule:    'Usa-se G antes de E e I em palavras de origem latina ou grega',
        use:     true,
        examples: ['geral', 'gênio', 'girar', 'região', 'agente', 'fugir'],
        tip:     'Antes de A, O, U o som /g/ sempre usa G. Antes de E e I, verifique a origem.',
      },
      {
        rule:    'Usa-se J em palavras de origem árabe, africana ou indígena',
        use:     true,
        examples: ['hoje', 'jeito', 'jiboia', 'jenipapo', 'majestade (via árabe)'],
        tip:     'Origem não-latina tende a J.',
      },
      {
        rule:    'Verbos terminados em -jar',
        use:     true,
        examples: ['viajar', 'manjar', 'ajeitar', 'enjeitar'],
        tip:     'Formas conjugadas mantêm J: viaje, viajes, viajemos.',
      },
    ],
  },
  {
    id:    'porques',
    title: 'Os quatro porquês',
    icon:  '?',
    rules: [
      {
        rule:    'PORQUE — conjunção causal ou explicativa (responde à pergunta)',
        use:     null,
        examples: [
          'Não fui porque estava doente. (causa)',
          'Deve estar em casa, porque a luz está acesa. (explicação)',
        ],
        tip:     'Substitua por "pois" ou "uma vez que": se funcionar, é PORQUE.',
      },
      {
        rule:    'POR QUE — pronome interrogativo ou relativo (dois vocábulos, sem acento)',
        use:     null,
        examples: [
          'Por que você chegou tarde? (interrogação direta)',
          'Não sei por que ele saiu. (interrogação indireta)',
          'O motivo por que saí era justo. (pronome relativo)',
        ],
        tip:     'Se a pergunta "por qual razão?" encaixa, use POR QUE.',
      },
      {
        rule:    'POR QUÊ — no final de frase ou isolado (dois vocábulos, com acento)',
        use:     null,
        examples: [
          'Não fui ao trabalho. — Por quê?',
          'Você sabe por quê.',
        ],
        tip:     'Sempre no final de oração ou antes de ponto. O acento é obrigatório.',
      },
      {
        rule:    'PORQUÊ — substantivo (o motivo, a razão)',
        use:     null,
        examples: [
          'Quero entender o porquê da decisão.',
          'Há um porquê por trás de cada escolha.',
        ],
        tip:     'Pode ser precedido de artigo (o porquê, um porquê). É um substantivo.',
      },
    ],
  },
  {
    id:    'maumau',
    title: 'Mal, mau / mas, mais',
    icon:  '±',
    rules: [
      {
        rule:    'MAL — advérbio (oposto de bem) ou substantivo (o mal, algo ruim)',
        use:     null,
        examples: [
          'Ele se saiu mal na prova. (advérbio = não bem)',
          'O mal existe no mundo. (substantivo)',
          'Mal chegou, já quis sair. (conjunção temporal = assim que)',
        ],
        tip:     'Substitua por "bem": se criar sentido oposto, é MAL.',
      },
      {
        rule:    'MAU — adjetivo (oposto de bom)',
        use:     null,
        examples: [
          'Foi um mau negócio. (adjetivo = não bom)',
          'Um mau exemplo. (qualifica substantivo)',
        ],
        tip:     'Substitua por "bom": se criar sentido oposto, é MAU.',
      },
      {
        rule:    'MAS — conjunção adversativa (porém, contudo)',
        use:     null,
        examples: [
          'Tentei, mas não consegui.',
          'É caro, mas vale a pena.',
        ],
        tip:     'Substitua por "porém": se funcionar, é MAS.',
      },
      {
        rule:    'MAIS — advérbio de intensidade ou quantidade',
        use:     null,
        examples: [
          'Quero mais café.',
          'Ela é mais alta que eu.',
          'Não há mais nada a dizer.',
        ],
        tip:     'Substitua por "menos": se criar sentido oposto, é MAIS.',
      },
    ],
  },
  {
    id:    'porques',
    title: 'Por que / Por quê / Porque / Porquê',
    icon:  '?',
    rules: [
      {
        rule:    'Por que (separado, sem acento)',
        detail:  'Usado em perguntas diretas ou indiretas, e quando equivale a "pelo qual / pela qual".',
        examples: [
          'Por que você chegou tarde? (pergunta direta)',
          'Não sei por que ele foi embora. (pergunta indireta)',
          'A razão por que estudamos. (equivale a "pela qual")',
        ],
        tip: 'Substitua por "pelo qual" — se fizer sentido, é "por que".',
      },
      {
        rule:    'Por quê (separado, com acento)',
        detail:  'Usado no final de frase, antes de ponto ou dois-pontos.',
        examples: [
          'Você foi embora, mas não disse por quê.',
          'Ele partiu sem explicar por quê.',
        ],
        tip: 'Está no final da frase? Use acento.',
      },
      {
        rule:    'Porque (junto, sem acento)',
        detail:  'Conjunção causal ou explicativa — equivale a "pois", "uma vez que".',
        examples: [
          'Fiquei em casa porque choveu.',
          'Estude, porque a prova é amanhã.',
        ],
        tip: 'Substitua por "pois" — se funcionar, é "porque" junto.',
      },
      {
        rule:    'Porquê (junto, com acento)',
        detail:  'Substantivo — equivale a "motivo", "razão". Sempre acompanhado de artigo ou pronome.',
        examples: [
          'Quero entender o porquê da decisão.',
          'Há muitos porquês sem resposta.',
        ],
        tip: 'É o "motivo"? Precedido de "o", "um", "meu"? Use "porquê" junto com acento.',
      },
    ],
  },
  {
    id:    'maumal',
    title: 'Mal / Mau',
    icon:  '±',
    rules: [
      {
        rule:    'Mal',
        detail:  'Advérbio (modifica verbo ou adjetivo) ou substantivo ("o mal"). Oposto de "bem".',
        examples: [
          'Ele se saiu mal na prova. (advérbio)',
          'Ela estava mal de saúde. (advérbio)',
          'O mal existe no mundo. (substantivo)',
          'Mal chegou, já quis ir embora. (= assim que chegou)',
        ],
        tip: 'Substitua por "bem" — se criar sentido oposto, é MAL.',
      },
      {
        rule:    'Mau',
        detail:  'Adjetivo — qualifica substantivo. Oposto de "bom".',
        examples: [
          'Foi um mau resultado.',
          'Ele é um mau aluno.',
          'Tivemos maus momentos.',
        ],
        tip: 'Substitua por "bom" — se criar sentido oposto, é MAU.',
      },
    ],
  },
  {
    id:    'ondeondeonde',
    title: 'Onde / Aonde / Em que',
    icon:  '→',
    rules: [
      {
        rule:    'Onde',
        detail:  'Indica lugar em que algo está ou acontece (posição estática). Verbos de estado: estar, ficar, morar.',
        examples: [
          'Onde você mora?',
          'A cidade onde nasci.',
          'Fica onde você está.',
        ],
        tip: 'Verbos de permanência (estar, ficar, morar, viver) → onde.',
      },
      {
        rule:    'Aonde',
        detail:  'Indica lugar a que alguém se dirige (movimento com destino). Verbos de movimento: ir, chegar, voltar.',
        examples: [
          'Aonde você vai?',
          'Não sei aonde ele foi.',
          'A escola aonde vou fica longe.',
        ],
        tip: 'Verbos de movimento (ir, chegar, voltar, levar) → aonde.',
      },
      {
        rule:    'Em que / No qual',
        detail:  'Quando não se trata de lugar físico, usa-se pronome relativo "em que" ou "no qual".',
        examples: [
          'A situação em que nos encontramos.',
          'O contexto no qual a obra foi escrita.',
        ],
        tip: 'Se o referente não é lugar geográfico, evite "onde" e use "em que".',
      },
    ],
  },
];

/* ================================================================
   BANCO DE EXERCÍCIOS DE LACUNA
   ================================================================ */

const EXERCISES = [
  // --- Hífen ---
  {
    id: 'h01',
    topic: 'hifen',
    sentence: 'O governo anunciou um programa ___antiinflamatório___ para distribuição nas farmácias populares.',
    blank: 'anti-inflamatório',
    options: ['antiinflamatório', 'anti-inflamatório', 'antiInflamatório'],
    correct: 1,
    explanation: 'Prefixo "anti-" terminado em vogal + palavra iniciada com a mesma vogal (i) → hífen obrigatório: anti-inflamatório.',
  },
  {
    id: 'h02',
    topic: 'hifen',
    sentence: 'A escola oferece curso de ___autoescola___ integrado ao ensino médio.',
    blank: 'autoescola',
    options: ['auto-escola', 'autoescola', 'Auto-Escola'],
    correct: 1,
    explanation: 'Prefixo "auto-" terminado em vogal O + palavra iniciada com vogal E (diferente) → sem hífen: autoescola.',
  },
  {
    id: 'h03',
    topic: 'hifen',
    sentence: 'Ele é um ___ex-presidente___ que ainda influencia a política.',
    blank: 'ex-presidente',
    options: ['expresidente', 'ex-presidente', 'ex presidente'],
    correct: 1,
    explanation: 'O prefixo "ex-" sempre exige hífen, independentemente da letra inicial da palavra seguinte.',
  },
  {
    id: 'h04',
    topic: 'hifen',
    sentence: 'O bebê é ___recém-nascido___ e ainda está na maternidade.',
    blank: 'recém-nascido',
    options: ['recémnascido', 'recém nascido', 'recém-nascido'],
    correct: 2,
    explanation: '"Recém-" sempre usa hífen: recém-nascido, recém-chegado, recém-formado.',
  },
  // --- X e CH ---
  {
    id: 'x01',
    topic: 'xch',
    sentence: 'Comprei uma ___xícara___ de porcelana antiga na feira.',
    blank: 'xícara',
    options: ['chícara', 'xícara', 'shícara'],
    correct: 1,
    explanation: '"Xícara" vem do tupi e se escreve com X. Não há CH nessa palavra.',
  },
  {
    id: 'x02',
    topic: 'xch',
    sentence: 'O ___enxame___ de abelhas sobrevoou o jardim.',
    blank: 'enxame',
    options: ['enchame', 'enjame', 'enxame'],
    correct: 2,
    explanation: 'Após a sílaba inicial "en-", usa-se X: enxame, enxada, enxerto. Exceções: enchente, encher (de origem latina).',
  },
  {
    id: 'x03',
    topic: 'xch',
    sentence: 'O ___cheque___ foi devolvido por falta de fundos.',
    blank: 'cheque',
    options: ['xeque', 'cheque', 'sheque'],
    correct: 1,
    explanation: '"Cheque" vem do inglês "check" via francês. Palavras de origem europeia ocidental geralmente usam CH nesse contexto.',
  },
  {
    id: 'x04',
    topic: 'xch',
    sentence: 'Preciso ___enxergar___ melhor — vou ao oftalmologista.',
    blank: 'enxergar',
    options: ['enchergar', 'enxergar', 'enjergar'],
    correct: 1,
    explanation: '"Enxergar" segue a regra do EN- inicial: usa X.',
  },
  // --- S e Z ---
  {
    id: 's01',
    topic: 'sz',
    sentence: 'O ___português___ é falado em mais de 200 milhões de pessoas.',
    blank: 'português',
    options: ['portuguez', 'portugues', 'português'],
    correct: 2,
    explanation: 'Gentílicos terminados em -ês são grafados com S: português, francês, inglês.',
  },
  {
    id: 's02',
    topic: 'sz',
    sentence: 'É necessário ___modernizar___ os métodos de ensino.',
    blank: 'modernizar',
    options: ['modernisar', 'modernizar', 'modernisar'],
    correct: 1,
    explanation: '"Modernizar" vem de "moderno" (sem S) + sufixo -izar → Z. Verbos -izar derivados de raízes sem S usam Z.',
  },
  {
    id: 's03',
    topic: 'sz',
    sentence: 'A ___análise___ dos dados revelou resultados inesperados.',
    blank: 'análise',
    options: ['analize', 'análise', 'analyze'],
    correct: 1,
    explanation: '"Análise" se escreve com S. O verbo derivado "analisar" também usa S, pois vem de "análise".',
  },
  {
    id: 's04',
    topic: 'sz',
    sentence: 'Ela tem uma vida muito ___perigosa___ como repórter de guerra.',
    blank: 'perigosa',
    options: ['perigoza', 'perigosa', 'perigósa'],
    correct: 1,
    explanation: 'Adjetivos em -oso/-osa sempre usam S: perigoso, famoso, carinhoso.',
  },
  // --- G e J ---
  {
    id: 'g01',
    topic: 'gj',
    sentence: 'A ___viagem___ de trem durou quase dez horas.',
    blank: 'viagem',
    options: ['viajém', 'viajem', 'viagem'],
    correct: 2,
    explanation: 'Substantivos terminados em -agem usam G: viagem, mensagem, garagem. "Viajem" (com J) é a forma verbal: "que eles viajem".',
  },
  {
    id: 'g02',
    topic: 'gj',
    sentence: 'O ___jeito___ como ele fala revela sua origem nordestina.',
    blank: 'jeito',
    options: ['geito', 'jeito', 'jéito'],
    correct: 1,
    explanation: '"Jeito" tem origem no latim vulgar e se escreve com J — a forma com G não existe.',
  },
  {
    id: 'g03',
    topic: 'gj',
    sentence: 'A ___região___ sul do país tem clima subtropical.',
    blank: 'região',
    options: ['rejião', 'região', 'regiao'],
    correct: 1,
    explanation: '"Região" vem do latim "regio" — mantém G. Antes de vogais, palavras de origem latina tendem a usar G.',
  },
  // --- Porquês ---
  {
    id: 'p01',
    topic: 'porques',
    sentence: 'Não fui à reunião ___porque___ estava com febre.',
    blank: 'porque',
    options: ['porque', 'por que', 'porquê', 'por quê'],
    correct: 0,
    explanation: '"Porque" (junto, sem acento) é conjunção causal: indica a causa. Substitua por "pois" — funciona? Então é PORQUE.',
  },
  {
    id: 'p02',
    topic: 'porques',
    sentence: '___Por que___ você não avisou antes de sair?',
    blank: 'Por que',
    options: ['Porque', 'Por que', 'Porquê', 'Por quê'],
    correct: 1,
    explanation: '"Por que" (separado, sem acento) em pergunta direta: equivale a "por qual razão".',
  },
  {
    id: 'p03',
    topic: 'porques',
    sentence: 'Quero entender o ___porquê___ da sua decisão.',
    blank: 'porquê',
    options: ['porque', 'por que', 'porquê', 'por quê'],
    correct: 2,
    explanation: '"Porquê" (junto, com acento) é substantivo — o motivo, a razão. Precedido de artigo: "o porquê", "um porquê".',
  },
  {
    id: 'p04',
    topic: 'porques',
    sentence: 'Ele saiu sem explicar ___por quê___.',
    blank: 'por quê',
    options: ['porque', 'por que', 'porquê', 'por quê'],
    correct: 3,
    explanation: '"Por quê" (separado, com acento) ocorre no final de oração ou antes de ponto. O acento diferencia do pronome relativo.',
  },
  // --- Mal/mau, mas/mais ---
  {
    id: 'm01',
    topic: 'maumau',
    sentence: 'Foi um ___mau___ negócio desde o início.',
    blank: 'mau',
    options: ['mal', 'mau'],
    correct: 1,
    explanation: '"Mau" é adjetivo (oposto de bom): qualifica "negócio". Substitua por "bom" — se criar oposto, é MAU.',
  },
  {
    id: 'm02',
    topic: 'maumau',
    sentence: 'Ela se saiu ___mal___ na apresentação oral.',
    blank: 'mal',
    options: ['mal', 'mau'],
    correct: 0,
    explanation: '"Mal" é advérbio (oposto de bem): modifica o verbo "saiu". Substitua por "bem" — se criar oposto, é MAL.',
  },
  {
    id: 'm03',
    topic: 'maumau',
    sentence: 'É caro, ___mas___ vale a pena investir.',
    blank: 'mas',
    options: ['mas', 'mais'],
    correct: 0,
    explanation: '"Mas" é conjunção adversativa (= porém, contudo). Substitua por "porém" — se funcionar, é MAS.',
  },
  {
    id: 'm04',
    topic: 'maumau',
    sentence: 'Preciso de ___mais___ tempo para terminar o projeto.',
    blank: 'mais',
    options: ['mas', 'mais'],
    correct: 1,
    explanation: '"Mais" é advérbio de quantidade. Substitua por "menos" — se criar oposto, é MAIS.',
  },
  // --- Por que / Porque / Porquê / Por quê ---
  {
    id: 'pq01',
    topic: 'porques',
    sentence: 'Não entendo ___por que___ você ficou com raiva.',
    blank: 'por que',
    options: ['porque', 'por que', 'por quê', 'porquê'],
    correct: 1,
    explanation: 'Pergunta indireta embutida ("não entendo o motivo pelo qual"). "Por que" separado, sem acento.',
  },
  {
    id: 'pq02',
    topic: 'porques',
    sentence: 'Ela partiu sem dizer ___por quê___.',
    blank: 'por quê',
    options: ['porque', 'por que', 'por quê', 'porquê'],
    correct: 2,
    explanation: 'Final de frase (antes do ponto). Acento obrigatório: "por quê".',
  },
  {
    id: 'pq03',
    topic: 'porques',
    sentence: 'Fui ao médico ___porque___ estava me sentindo mal.',
    blank: 'porque',
    options: ['porque', 'por que', 'por quê', 'porquê'],
    correct: 0,
    explanation: 'Conjunção causal — equivale a "pois". "Porque" junto, sem acento.',
  },
  {
    id: 'pq04',
    topic: 'porques',
    sentence: 'Quero entender o ___porquê___ da sua decisão.',
    blank: 'porquê',
    options: ['porque', 'por que', 'por quê', 'porquê'],
    correct: 3,
    explanation: 'Substantivo precedido de artigo "o" — equivale a "motivo". "Porquê" junto, com acento.',
  },
  {
    id: 'pq05',
    topic: 'porques',
    sentence: '___Por que___ você não veio ontem à aula?',
    blank: 'Por que',
    options: ['Porque', 'Por que', 'Por quê', 'Porquê'],
    correct: 1,
    explanation: 'Pergunta direta. "Por que" separado, sem acento.',
  },
  // --- Mal / Mau ---
  {
    id: 'mm01',
    topic: 'maumal',
    sentence: 'O projeto deu ___mal___.',
    blank: 'mal',
    options: ['mal', 'mau'],
    correct: 0,
    explanation: '"Deu mal" — advérbio modifica o verbo "deu". Substitua por "bem": "deu bem" faz sentido oposto → MAL.',
  },
  {
    id: 'mm02',
    topic: 'maumal',
    sentence: 'Foi um ___mau___ negócio do início ao fim.',
    blank: 'mau',
    options: ['mal', 'mau'],
    correct: 1,
    explanation: '"Mau negócio" — adjetivo qualifica o substantivo "negócio". Substitua por "bom": "bom negócio" faz sentido oposto → MAU.',
  },
  {
    id: 'mm03',
    topic: 'maumal',
    sentence: 'Ele se sente ___mal___ há três dias.',
    blank: 'mal',
    options: ['mal', 'mau'],
    correct: 0,
    explanation: '"Sente-se mal" — advérbio modifica o verbo. Oposto de "bem".',
  },
  {
    id: 'mm04',
    topic: 'maumal',
    sentence: 'Tivemos ___maus___ resultados neste trimestre.',
    blank: 'maus',
    options: ['mais', 'maus', 'mais', 'mals'],
    correct: 1,
    explanation: '"Maus resultados" — adjetivo no plural qualificando "resultados". Oposto de "bons".',
  },
  // --- Onde / Aonde ---
  {
    id: 'oo01',
    topic: 'ondeondeonde',
    sentence: '___Aonde___ você vai tão cedo?',
    blank: 'Aonde',
    options: ['Onde', 'Aonde'],
    correct: 1,
    explanation: 'Verbo "ir" indica movimento com destino. Regência: "ir aonde". Use "aonde".',
  },
  {
    id: 'oo02',
    topic: 'ondeondeonde',
    sentence: 'A cidade ___onde___ nasci fica no interior.',
    blank: 'onde',
    options: ['onde', 'aonde'],
    correct: 0,
    explanation: 'Localização estática — "nasci" não implica movimento a um destino. Use "onde".',
  },
  {
    id: 'oo03',
    topic: 'ondeondeonde',
    sentence: 'Não sei ___aonde___ ele foi depois da reunião.',
    blank: 'aonde',
    options: ['onde', 'aonde'],
    correct: 1,
    explanation: '"Foi" é verbo de movimento com destino implícito. Use "aonde".',
  },
  {
    id: 'oo04',
    topic: 'ondeondeonde',
    sentence: '___Onde___ você estava ontem à noite?',
    blank: 'Onde',
    options: ['Onde', 'Aonde'],
    correct: 0,
    explanation: '"Estava" é verbo de estado — indica posição, não movimento. Use "onde".',
  },
  {
    id: 'oo05',
    topic: 'ondeondeonde',
    sentence: 'O hospital ___aonde___ ela foi fica na Zona Norte.',
    blank: 'aonde',
    options: ['onde', 'aonde'],
    correct: 1,
    explanation: '"Foi" indica movimento a um destino. Verbo que rege "a": "foi ao hospital" → "aonde ela foi".',
  },
];

/* ================================================================
   RENDER PRINCIPAL
   ================================================================ */

/**
 * Renderiza o módulo completo de Ortografia.
 * @returns {HTMLElement}
 */
export function renderOrtografia() {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Ortografia</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        Grafia correta não é capricho — é precisão. Este módulo cobre as dúvidas
        mais frequentes do português escrito: hífen, X/CH, S/Z, G/J, os quatro
        porquês e os pares mal/mau, mas/mais. Regras, macetes e exercícios práticos.
      </p>
    </div>

    <div style="border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);display:flex;gap:0;flex-wrap:wrap" role="tablist" id="ortho-tabs"></div>

    <div id="ortho-panel"></div>
  `;

  const tabsEl  = page.querySelector('#ortho-tabs');
  const panelEl = page.querySelector('#ortho-panel');

  const TABS = [
    { id: 'rules',    label: 'Dúvidas Frequentes' },
    { id: 'exercises', label: 'Exercícios' },
    { id: 'reference', label: 'Referência Rápida' },
  ];

  let activeTab = 'rules';

  function renderTabs() {
    tabsEl.innerHTML = '';
    TABS.forEach(tab => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.role = 'tab';
      btn.setAttribute('aria-selected', tab.id === activeTab ? 'true' : 'false');
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);
        padding:var(--space-3) var(--space-6);
        border:none;border-bottom:3px solid transparent;
        background:none;cursor:pointer;
        color:${tab.id === activeTab ? 'var(--color-ink)' : 'var(--color-ink-ghost)'};
        border-bottom-color:${tab.id === activeTab ? 'var(--color-accent)' : 'transparent'};
        font-weight:${tab.id === activeTab ? '600' : '400'};
        transition:color var(--transition-fast),border-color var(--transition-fast);
        white-space:nowrap;margin-right:var(--space-1);
      `;
      btn.textContent = tab.label;
      btn.addEventListener('click', () => {
        activeTab = tab.id;
        renderTabs();
        renderPanel();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderPanel() {
    panelEl.innerHTML = '';
    if (activeTab === 'rules')     panelEl.appendChild(renderRulesTab());
    if (activeTab === 'exercises') panelEl.appendChild(renderExercisesTab());
    if (activeTab === 'reference') panelEl.appendChild(renderReferenceTab());
  }

  renderTabs();
  renderPanel();
  return page;
}

/* ================================================================
   ABA 1 — DÚVIDAS FREQUENTES
   ================================================================ */

function renderRulesTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4);max-width:var(--content-width)';

  TOPICS.forEach(topic => {
    const card = document.createElement('div');
    card.style.cssText = `
      border:1px solid var(--color-paper-border);
      border-radius:var(--radius);
      overflow:hidden;
      background:var(--color-paper);
    `;

    // Cabeçalho accordion
    const header = document.createElement('button');
    header.type = 'button';
    header.setAttribute('aria-expanded', 'false');
    header.style.cssText = `
      display:flex;align-items:center;gap:var(--space-4);
      width:100%;padding:var(--space-5) var(--space-6);
      background:none;border:none;cursor:pointer;text-align:left;
      transition:background var(--transition-fast);
    `;
    header.innerHTML = `
      <span style="
        font-family:var(--font-ui);font-size:var(--text-base);font-weight:700;
        color:var(--color-paper);background:var(--color-accent);
        padding:var(--space-1) var(--space-3);border-radius:var(--radius);
        flex-shrink:0;min-width:2rem;text-align:center;
      ">${topic.icon}</span>
      <span style="
        font-family:var(--font-display);font-size:var(--text-xl);
        color:var(--color-ink);font-weight:600;flex:1;
      ">${topic.title}</span>
      <span class="chevron" aria-hidden="true" style="
        font-size:10px;color:var(--color-ink-ghost);flex-shrink:0;
        transition:transform 0.2s ease;
      ">▼</span>
    `;
    header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
    header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

    // Corpo
    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border)';
    body.appendChild(buildTopicBody(topic));

    header.addEventListener('click', () => {
      const open = body.style.display !== 'block';
      body.style.display = open ? 'block' : 'none';
      header.setAttribute('aria-expanded', open ? 'true' : 'false');
      header.querySelector('.chevron').style.transform = open ? 'rotate(180deg)' : '';
    });

    card.appendChild(header);
    card.appendChild(body);
    wrap.appendChild(card);
  });

  return wrap;
}

/**
 * Constrói o corpo de um tópico com suas regras.
 * @param {object} topic
 * @returns {HTMLElement}
 */
function buildTopicBody(topic) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:var(--space-6)';

  topic.rules.forEach((rule, idx) => {
    if (idx > 0) {
      const div = document.createElement('div');
      div.style.cssText = 'height:1px;background:var(--color-paper-border);margin:var(--space-5) 0';
      wrap.appendChild(div);
    }

    const block = document.createElement('div');

    // Badge usa/não usa
    let badge = '';
    if (rule.use === true) {
      badge = `<span style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-green);background:#e8f5e9;padding:2px 8px;border-radius:var(--radius);margin-left:var(--space-2)">COM HÍFEN / USA</span>`;
    } else if (rule.use === false) {
      badge = `<span style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:var(--color-accent);background:#fce8e8;padding:2px 8px;border-radius:var(--radius);margin-left:var(--space-2)">SEM HÍFEN / NÃO USA</span>`;
    }

    block.innerHTML = `
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);font-weight:600;line-height:1.5;margin-bottom:var(--space-3)">
        ${rule.rule}${badge}
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-3)">
        ${rule.examples.map(ex => `
          <span style="
            font-family:var(--font-body);font-size:var(--text-sm);
            background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
            border-radius:var(--radius);padding:var(--space-1) var(--space-3);
            color:var(--color-ink);font-style:italic;
          ">${ex}</span>
        `).join('')}
      </div>
      <div style="border-left:3px solid var(--color-gold);padding-left:var(--space-4)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-gold);margin-bottom:var(--space-1)">Macete</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">${rule.tip}</p>
      </div>
    `;
    wrap.appendChild(block);
  });

  if (topic.note) {
    const note = document.createElement('div');
    note.style.cssText = 'margin-top:var(--space-5);padding:var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-ink-ghost)';
    note.innerHTML = `<p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-ghost);line-height:1.6">${topic.note}</p>`;
    wrap.appendChild(note);
  }

  return wrap;
}

/* ================================================================
   ABA 2 — EXERCÍCIOS
   ================================================================ */

function renderExercisesTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  // Filtro por tópico
  const filterWrap = document.createElement('div');
  filterWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-6)';
  filterWrap.innerHTML = `<p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);width:100%;margin-bottom:var(--space-1)">Filtrar por tópico</p>`;

  const filters = [{ id: 'all', label: 'Todos' }, ...TOPICS.map(t => ({ id: t.id, label: t.title }))];
  let activeFilter = 'all';
  let score = { total: 0, correct: 0 };

  const listEl = document.createElement('div');
  listEl.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-4)';

  function buildFilterBtns() {
    filterWrap.querySelectorAll('.filter-btn').forEach(b => b.remove());
    filters.forEach(f => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-xs);
        padding:var(--space-1) var(--space-3);
        border-radius:var(--radius);border:1px solid var(--color-paper-border);
        cursor:pointer;
        background:${f.id === activeFilter ? 'var(--color-accent)' : 'var(--color-paper-dark)'};
        color:${f.id === activeFilter ? 'var(--color-paper)' : 'var(--color-ink-mid)'};
        transition:all var(--transition-fast);
      `;
      btn.textContent = f.label;
      btn.addEventListener('click', () => {
        activeFilter = f.id;
        buildFilterBtns();
        buildExerciseList();
      });
      filterWrap.appendChild(btn);
    });
  }

  // Placar
  const scoreEl = document.createElement('div');
  scoreEl.style.cssText = 'margin-bottom:var(--space-4)';

  function updateScore() {
    if (score.total === 0) {
      scoreEl.innerHTML = '';
      return;
    }
    scoreEl.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">
        Respondidas: <strong style="color:var(--color-ink)">${score.total}</strong> &nbsp;|&nbsp;
        Acertos: <strong style="color:var(--color-green)">${score.correct}</strong> &nbsp;|&nbsp;
        Erros: <strong style="color:var(--color-accent)">${score.total - score.correct}</strong>
      </p>
    `;
  }

  function buildExerciseList() {
    listEl.innerHTML = '';
    const filtered = activeFilter === 'all'
      ? EXERCISES
      : EXERCISES.filter(e => e.topic === activeFilter);

    filtered.forEach(ex => {
      listEl.appendChild(createExerciseCard(ex, score, updateScore));
    });
  }

  buildFilterBtns();
  buildExerciseList();

  wrap.appendChild(filterWrap);
  wrap.appendChild(scoreEl);
  wrap.appendChild(listEl);
  return wrap;
}

/**
 * Cria o card de um exercício de lacuna.
 * @param {object} ex
 * @param {object} score — objeto mutável para acumular pontuação
 * @param {Function} onScore — callback após resposta
 * @returns {HTMLElement}
 */
function createExerciseCard(ex, score, onScore) {
  const card = document.createElement('div');
  card.style.cssText = `
    border:1px solid var(--color-paper-border);
    border-radius:var(--radius);
    overflow:hidden;
    background:var(--color-paper);
  `;

  // Formata sentença com a lacuna destacada como [___]
  const sentenceDisplay = ex.sentence.replace(/___[^_]+___/, `<span style="
    display:inline-block;
    font-family:var(--font-ui);font-size:var(--text-sm);
    background:var(--color-paper-dark);border-bottom:2px solid var(--color-accent);
    padding:0 var(--space-2);border-radius:2px;
    color:var(--color-accent);font-weight:600;
  " id="gap-${ex.id}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`);

  card.innerHTML = `
    <div style="padding:var(--space-5) var(--space-6)">
      <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.75;margin-bottom:var(--space-4)">${sentenceDisplay}</p>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)" id="opts-${ex.id}"></div>
      <div id="feedback-${ex.id}" style="margin-top:var(--space-4);display:none"></div>
    </div>
  `;

  const optsWrap    = card.querySelector(`#opts-${ex.id}`);
  const feedbackEl  = card.querySelector(`#feedback-${ex.id}`);
  const gapEl       = card.querySelector(`#gap-${ex.id}`);
  let answered      = false;

  ex.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = `
      font-family:var(--font-body);font-size:var(--text-base);font-style:italic;
      padding:var(--space-2) var(--space-4);
      border:1.5px solid var(--color-paper-border);
      border-radius:var(--radius);
      background:var(--color-paper-dark);
      color:var(--color-ink);cursor:pointer;
      transition:all var(--transition-fast);
    `;
    btn.textContent = opt;
    btn.addEventListener('mouseenter', () => { if (!answered) btn.style.borderColor = 'var(--color-accent)'; });
    btn.addEventListener('mouseleave', () => { if (!answered) btn.style.borderColor = 'var(--color-paper-border)'; });

    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      score.total++;

      const correct = idx === ex.correct;
      if (correct) score.correct++;

      // Atualiza a lacuna com a resposta
      gapEl.textContent = opt;
      gapEl.style.borderBottomColor = correct ? 'var(--color-green)' : 'var(--color-accent)';
      gapEl.style.color = correct ? 'var(--color-green)' : 'var(--color-accent)';

      // Marca opções
      optsWrap.querySelectorAll('button').forEach((b, i) => {
        b.style.cursor = 'default';
        if (i === ex.correct) {
          b.style.background = '#e8f5e9';
          b.style.borderColor = 'var(--color-green)';
          b.style.color = 'var(--color-green)';
        } else if (i === idx && !correct) {
          b.style.background = '#fce8e8';
          b.style.borderColor = 'var(--color-accent)';
          b.style.color = 'var(--color-accent)';
        }
      });

      // Feedback
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="
          border-left:3px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'};
          padding-left:var(--space-4);
        ">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
            color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};
            text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--space-1)">
            ${correct ? 'Correto' : `Incorreto — a forma correta é "${ex.blank}"`}
          </p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65">
            ${ex.explanation}
          </p>
        </div>
      `;

      onScore();
    });

    optsWrap.appendChild(btn);
  });

  return card;
}

/* ================================================================
   ABA 3 — REFERÊNCIA RÁPIDA
   ================================================================ */

function renderReferenceTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  const sections = [
    {
      title: 'Hífen — resumo',
      rows: [
        ['Situação', 'Resultado', 'Exemplo'],
        ['Prefixo + mesma vogal', 'COM hífen', 'anti-inflamatório'],
        ['Prefixo + vogal diferente', 'SEM hífen', 'autoescola'],
        ['Prefixo + mesma consoante', 'COM hífen', 'inter-regional'],
        ['Prefixo + consoante diferente', 'SEM hífen', 'interbrasileiro'],
        ['Prefixo + H', 'COM hífen', 'pré-histórico'],
        ['ex-, vice-, recém-, sem-', 'Sempre COM hífen', 'ex-presidente'],
      ],
      header: true,
    },
    {
      title: 'Os quatro porquês',
      rows: [
        ['Forma', 'Classe', 'Contexto'],
        ['porque', 'Conjunção', 'Causa/explicação (substitua por "pois")'],
        ['por que', 'Pron. interrogativo', 'Perguntas; pronome relativo ("por qual razão")'],
        ['porquê', 'Substantivo', 'Precedido de artigo: "o porquê", "um porquê"'],
        ['por quê', 'Pron. interrogativo', 'Final de oração ou antes de ponto'],
      ],
      header: true,
    },
    {
      title: 'Pares confusos',
      rows: [
        ['Forma', 'Classe', 'Teste'],
        ['mal', 'Advérbio / substantivo', 'Oposto de bem; ou "o mal"'],
        ['mau', 'Adjetivo', 'Oposto de bom; qualifica substantivo'],
        ['mas', 'Conjunção adversativa', 'Substitua por "porém"'],
        ['mais', 'Advérbio de quantidade', 'Oposto de menos'],
      ],
      header: true,
    },
  ];

  sections.forEach((sec, si) => {
    if (si > 0) {
      const div = document.createElement('div');
      div.style.cssText = 'height:1px;background:var(--color-paper-border);margin:var(--space-8) 0';
      wrap.appendChild(div);
    }

    const title = document.createElement('h3');
    title.style.cssText = 'font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-ink);margin-bottom:var(--space-4)';
    title.textContent = sec.title;
    wrap.appendChild(title);

    const tableWrap = document.createElement('div');
    tableWrap.style.cssText = 'overflow-x:auto';

    const table = document.createElement('table');
    table.style.cssText = `
      width:100%;border-collapse:collapse;
      font-family:var(--font-body);font-size:var(--text-sm);
    `;

    sec.rows.forEach((row, ri) => {
      const tr = document.createElement('tr');
      tr.style.cssText = `
        border-bottom:1px solid var(--color-paper-border);
        background:${ri === 0 ? 'var(--color-paper-dark)' : (ri % 2 === 0 ? 'var(--color-paper)' : 'transparent')};
      `;
      row.forEach((cell, ci) => {
        const el = document.createElement(ri === 0 ? 'th' : 'td');
        el.style.cssText = `
          padding:var(--space-3) var(--space-4);text-align:left;
          font-weight:${ri === 0 ? '600' : '400'};
          color:${ri === 0 ? 'var(--color-ink-ghost)' : 'var(--color-ink)'};
          font-size:${ri === 0 ? 'var(--text-xs)' : 'var(--text-sm)'};
          text-transform:${ri === 0 ? 'uppercase' : 'none'};
          letter-spacing:${ri === 0 ? '0.06em' : '0'};
          ${ci === 0 && ri > 0 ? 'font-style:italic;font-weight:600;' : ''}
        `;
        el.textContent = cell;
        tr.appendChild(el);
      });
      table.appendChild(tr);
    });

    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);
  });

  return wrap;
}
