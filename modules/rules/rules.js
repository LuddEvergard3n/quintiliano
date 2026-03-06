/**
 * rules.js — Módulo: Regras da Língua Portuguesa
 *
 * Organiza as 23 regras da língua portuguesa em quatro níveis de progressão
 * curricular, seguindo a BNCC: EFI, EFII, Ensino Médio, Ensino Superior.
 *
 * Estrutura: 4 tabs com cards accordion.
 * Cada regra declara: número, nome, definição, função, exemplos e
 * (opcionalmente) subtipos com suas próprias definições e exemplos.
 *
 * Dados declarados neste módulo. Sem dependência de arquivos externos.
 */

/* ================================================================
   BANCO DE REGRAS
   ================================================================ */

const LEVELS = [
  {
    id:    'efi',
    label: 'Fund. I',
    title: 'Ensino Fundamental I',
    sub:   '1º ao 5º ano — Alfabetização e bases da língua',
    rules: [
      {
        num:  '01',
        name: 'Alfabeto',
        def:  'Conjunto ordenado das 26 letras da língua portuguesa, divididas em vogais (a, e, i, o, u) e consoantes.',
        func: 'Representa os sons da fala na forma escrita, sendo a base de todo sistema de leitura e escrita.',
        examples: [
          'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z',
          'Vogais: a, e, i, o, u',
          'Consoantes: b, c, d, f, g, h, j, k, l, m, n, p, q, r, s, t, v, w, x, y, z',
        ],
      },
      {
        num:  '02',
        name: 'Formação de sílabas',
        def:  'Divisão das palavras em partes sonoras mínimas pronunciadas em um único impulso de voz.',
        func: 'Facilita a leitura, a escrita e a pronúncia correta. Base para a compreensão da divisão silábica.',
        examples: [
          'ca·sa (CV·CV)',
          'bo·la (CV·CV)',
          'li·vro (CV·CCV)',
          'trans·por·te (CVC·CVC·CV)',
        ],
        subtypes: [
          { name: 'Sílaba simples (CV)', def: 'Consoante + Vogal.', ex: 'ma, pe, li' },
          { name: 'Sílaba complexa (CVC)', def: 'Consoante + Vogal + Consoante.', ex: 'sal, mar, por' },
          { name: 'Ditongo', def: 'Duas vogais na mesma sílaba.', ex: 'cai·xa, mau, rei' },
        ],
      },
      {
        num:  '03',
        name: 'Uso de letras maiúsculas',
        def:  'Emprego da forma maiúscula das letras em contextos específicos definidos pela norma.',
        func: 'Marca o início de frases e individualiza nomes próprios, distinguindo-os de nomes comuns.',
        examples: [
          'Início de frase: "O dia amanheceu."',
          'Nome de pessoa: "Maria foi ao mercado."',
          'Nome de cidade ou país: "Ela mora em Curitiba, no Brasil."',
          'Nome de rio, montanha: "O Rio Amazonas nasce no Peru."',
        ],
      },
      {
        num:  '04',
        name: 'Pontuação básica',
        def:  'Sinais gráficos que organizam a frase, indicam pausas e o tipo de enunciado.',
        func: 'Orienta a leitura, organiza o raciocínio e distingue frases declarativas, interrogativas e exclamativas.',
        examples: [
          'Ponto final: "O sol está muito forte."',
          'Vírgula em enumeração: "Comprei banana, maçã, uva e pera."',
          'Ponto de interrogação: "Onde você guardou o livro?"',
          'Ponto de exclamação: "Que dia maravilhoso!"',
        ],
        subtypes: [
          { name: 'Ponto final (.)', def: 'Encerra frases declarativas e imperativas.', ex: '"A aula começou cedo."' },
          { name: 'Vírgula (,)', def: 'Separa elementos de enumeração ou termos intercalados.', ex: '"Fui à feira e comprei banana, maçã e uva."' },
          { name: 'Ponto de interrogação (?)', def: 'Encerra perguntas diretas.', ex: '"Você gosta de chocolate?"' },
          { name: 'Ponto de exclamação (!)', def: 'Expressa surpresa, ordem ou emoção intensa.', ex: '"Cuidado! Que perigo!"' },
        ],
      },
      {
        num:  '05',
        name: 'Singular e plural',
        def:  'Variação das palavras para indicar um único ser (singular) ou mais de um (plural).',
        func: 'Diferencia quantidade e garante a concordância entre os termos da frase.',
        examples: [
          'casa → casas',
          'livro → livros',
          'pão → pães',
          'lápis → lápis (invariável)',
        ],
      },
      {
        num:  '06',
        name: 'Gênero das palavras',
        def:  'Classificação gramatical das palavras em masculino ou feminino.',
        func: 'Estabelece a concordância entre substantivos, artigos e adjetivos dentro do grupo nominal.',
        examples: [
          'menino / menina',
          'o aluno / a aluna',
          'o ator / a atriz',
          'o homem / a mulher (gênero heterônimo)',
        ],
      },
      {
        num:  '07',
        name: 'Tempos verbais básicos',
        def:  'Variação do verbo para indicar quando a ação ocorre: passado, presente ou futuro.',
        func: 'Situa a ação no tempo, permitindo ao leitor compreender a sequência e a relação entre eventos.',
        examples: [
          'Presente: "Eu canto todos os dias."',
          'Passado (pretérito perfeito): "Eu cantei ontem."',
          'Futuro: "Eu cantarei amanhã."',
          'Passado imperfeito (ação contínua): "Eu cantava quando criança."',
        ],
      },
    ],
  },

  {
    id:    'efii',
    label: 'Fund. II',
    title: 'Ensino Fundamental II',
    sub:   '6º ao 9º ano — Estrutura da gramática',
    rules: [
      {
        num:  '08',
        name: 'Classes de palavras',
        def:  'Classificação das palavras do português em dez categorias conforme sua função e características morfológicas.',
        func: 'Permite identificar o papel de cada palavra na frase e compreender as relações que estabelecem entre si.',
        examples: [
          '"A felicidade é o nosso objetivo." (substantivo + artigo + verbo de ligação + pronome + substantivo)',
        ],
        subtypes: [
          { name: 'Substantivo', def: 'Nomeia seres, objetos, lugares, sentimentos e ações. Núcleo do grupo nominal.', ex: 'casa, alegria, João, coragem' },
          { name: 'Adjetivo', def: 'Caracteriza o substantivo, atribuindo qualidade, estado ou aspecto. Concorda em gênero e número.', ex: 'casa grande, aluno dedicado' },
          { name: 'Verbo', def: 'Indica ação, estado, mudança de estado ou fenômeno da natureza. Núcleo do predicado.', ex: 'correr, ser, chover, ficar' },
          { name: 'Pronome', def: 'Substitui ou acompanha o substantivo, referindo-se às pessoas do discurso.', ex: 'ele chegou, me disseram, meu livro' },
          { name: 'Artigo', def: 'Precede o substantivo para determiná-lo (definido) ou generalizá-lo (indefinido).', ex: 'o livro, a mesa, um dia, uma casa' },
          { name: 'Numeral', def: 'Indica quantidade exata, ordem ou fração de seres.', ex: 'dois alunos, primeiro lugar, metade' },
          { name: 'Advérbio', def: 'Modifica verbo, adjetivo ou outro advérbio. Palavra invariável.', ex: 'chegou cedo, muito bonito, tão rapidamente' },
          { name: 'Preposição', def: 'Liga palavras estabelecendo relação de subordinação entre elas. Invariável.', ex: 'livro de matemática, saí com amigos, casa em Curitiba' },
          { name: 'Conjunção', def: 'Conecta orações ou termos de mesma função, indicando relação lógica.', ex: 'estudei porque precisava, e, mas, portanto' },
          { name: 'Interjeição', def: 'Expressa sentimentos súbitos ou estados emocionais de forma independente.', ex: 'Nossa!, Bravo!, Ai!, Ufa!' },
        ],
      },
      {
        num:  '09',
        name: 'Concordância nominal',
        def:  'Ajuste de gênero e número entre o substantivo e as palavras que o acompanham: artigos, adjetivos, pronomes e numerais.',
        func: 'Mantém a harmonia gramatical dentro do grupo nominal e garante a legibilidade da frase.',
        examples: [
          'as crianças pequenas (feminino plural → tudo no feminino plural)',
          'os alunos dedicados',
          'uma casa bonita e limpa',
          '❌ os aluno bonito | ✔ os alunos bonitos',
        ],
      },
      {
        num:  '10',
        name: 'Concordância verbal',
        def:  'Ajuste do verbo ao sujeito em número (singular/plural) e pessoa (1ª, 2ª, 3ª).',
        func: 'Garante que o verbo reflita corretamente quem realiza a ação, determinando também o tom e o estilo do texto.',
        examples: [
          'O aluno chegou. (singular)',
          'Os alunos chegaram. (plural)',
          'Eu fui. / Nós fomos.',
          '❌ Os meninos foi ao parque. | ✔ Os meninos foram ao parque.',
        ],
      },
      {
        num:  '11',
        name: 'Acentuação gráfica',
        def:  'Sistema de sinais gráficos (acento agudo, circunflexo, til) que indicam a sílaba tônica e a qualidade da vogal.',
        func: 'Orienta a pronúncia correta e distingue palavras que, sem acento, seriam grafadas identicamente.',
        examples: [
          'Oxítona acentuada: café, cipó, parabéns',
          'Paroxítona acentuada: lápis, tórax, fácil',
          'Proparoxítona (sempre acentuada): médico, lâmpada, ônibus',
          'Diferenciação: por (preposição) / pôr (verbo)',
        ],
        subtypes: [
          { name: 'Oxítona', def: 'Sílaba tônica na última sílaba. Acentuada quando termina em a, e, o, em, ens.', ex: 'café, cipó, também' },
          { name: 'Paroxítona', def: 'Sílaba tônica na penúltima sílaba. Acentuada quando termina em consoante (exceto s), ditongo, l, n, r, x.', ex: 'lápis, fácil, tórax' },
          { name: 'Proparoxítona', def: 'Sílaba tônica na antepenúltima sílaba. Sempre acentuada.', ex: 'médico, ônibus, lâmpada' },
        ],
      },
      {
        num:  '12',
        name: 'Divisão silábica',
        def:  'Separação gráfica das sílabas de uma palavra, usada na escrita para indicar a quebra ao final de uma linha.',
        func: 'Padroniza a representação escrita e facilita a identificação da estrutura fonológica das palavras.',
        examples: [
          'trans·por·te',
          'cons·tru·ção',
          'bi·ci·cle·ta',
          'ex·tra·or·di·ná·rio',
        ],
      },
    ],
  },

  {
    id:    'em',
    label: 'Ensino Médio',
    title: 'Ensino Médio',
    sub:   'Gramática avançada e norma-padrão',
    rules: [
      {
        num:  '13',
        name: 'Regência verbal',
        def:  'Relação de dependência entre o verbo e seu complemento, determinando a preposição correta (ou sua ausência) para cada verbo.',
        func: 'Elimina ambiguidades de sentido e garante a correção na construção de complementos verbais.',
        examples: [
          'gostar de: "Eu gosto de música." (não: "gosto música")',
          'assistir a (ver): "Assisti ao filme." / assistir (ajudar): "O médico assistiu o paciente."',
          'visar a (objetivar): "Ele visa ao cargo." / visar (mirar): "O atirador visou o alvo."',
          'esquecer (sem prep.): "Esqueci o documento." / lembrar-se de: "Lembrei-me do compromisso."',
        ],
      },
      {
        num:  '14',
        name: 'Regência nominal',
        def:  'Relação de dependência entre um nome (substantivo, adjetivo ou advérbio) e seu complemento, com a preposição correta.',
        func: 'Garante a correção na ligação entre o nome e seu complemento nominal, evitando preposições inadequadas.',
        examples: [
          'amor a / por: "amor à pátria", "amor pelos filhos"',
          'contente com: "Estou contente com o resultado."',
          'favorável a: "Sou favorável à proposta."',
          'apto a / para: "apto ao cargo", "apto para a função"',
        ],
      },
      {
        num:  '15',
        name: 'Crase',
        def:  'Fusão da preposição "a" com o artigo definido feminino "a" (ou com pronomes demonstrativos "aquele/a/es/as"), indicada pelo acento grave (à).',
        func: 'Sinaliza precisão sintática: indica que a preposição exigida pela regência e o artigo que acompanha o feminino se fundiram.',
        examples: [
          '✔ Vou à escola. (ir + a = preposição; escola = artigo a → à)',
          '✔ Saímos à noite.',
          '✔ Refiro-me àquela proposta.',
          '❌ Crase antes de verbo: "Começou a chover." (não: "à chover")',
          '❌ Crase antes de masculino: "Voltou a pé." (não: "à pé")',
        ],
      },
      {
        num:  '16',
        name: 'Colocação pronominal',
        def:  'Posição dos pronomes oblíquos átonos em relação ao verbo: antes (próclise), no meio (mesóclise) ou depois (ênclise).',
        func: 'Obedece à harmonia rítmica e às regras de atração da norma-padrão escrita, variando conforme o contexto.',
        examples: [
          'Próclise: "Não me diga mentiras." (palavra negativa atrai o pronome)',
          'Próclise: "Jamais me disseram a verdade."',
          'Ênclise: "Diga-me a verdade." (início de frase, sem palavra atrativa)',
          'Mesóclise: "Dir-me-ás amanhã?" (futuro do indicativo, norma culta escrita)',
        ],
        subtypes: [
          { name: 'Próclise', def: 'Pronome antes do verbo. Obrigatória após palavras negativas, advérbios, pronomes relativos e conjunções.', ex: '"Não me diga isso.", "Que me contaram..."' },
          { name: 'Ênclise', def: 'Pronome após o verbo. Padrão quando não há palavra atrativa, especialmente no início de frase.', ex: '"Diga-me.", "Encontrei-o ontem."' },
          { name: 'Mesóclise', def: 'Pronome no interior das formas do futuro do indicativo e do pretérito futuro. Restrita à língua escrita formal.', ex: '"Dar-te-ei uma resposta.", "Far-me-ia um favor."' },
        ],
      },
      {
        num:  '17',
        name: 'Período simples e composto',
        def:  'O período simples contém uma única oração (um verbo). O período composto contém duas ou mais orações.',
        func: 'A distinção é fundamental para a análise sintática e para a construção de textos com diferentes graus de complexidade.',
        examples: [
          'Simples: "O aluno estudou."',
          'Composto por coordenação: "O aluno estudou e passou na prova."',
          'Composto por subordinação: "O aluno que estudou passou na prova."',
        ],
        subtypes: [
          { name: 'Coordenação', def: 'Orações independentes ligadas por conjunções coordenativas.', ex: '"Estudei muito, mas não fui aprovado."' },
          { name: 'Subordinação', def: 'Uma oração depende sintaticamente de outra.', ex: '"Quero que você estude."' },
        ],
      },
      {
        num:  '18',
        name: 'Orações subordinadas',
        def:  'Orações que dependem sintaticamente de outra (a principal), exercendo uma função gramatical dentro dela.',
        func: 'Permite construir argumentos complexos e encadear ideias com precisão lógica e estilística.',
        examples: [
          'Substantiva: "Quero que você estude." (objeto direto)',
          'Adjetiva restritiva: "Os alunos que estudam passam na prova."',
          'Adjetiva explicativa: "Os alunos, que são esforçados, passam na prova."',
          'Adverbial causal: "Faltei à aula porque estava doente."',
          'Adverbial concessiva: "Embora estivesse chovendo, fomos ao parque."',
        ],
        subtypes: [
          { name: 'Substantiva', def: 'Exerce função de substantivo (sujeito, OD, OI, etc.) na oração principal.', ex: '"É necessário que você compareça." (sujeito)' },
          { name: 'Adjetiva', def: 'Exerce função de adjetivo, modificando um substantivo da oração principal via pronome relativo.', ex: '"O livro que você me deu é ótimo."' },
          { name: 'Adverbial', def: 'Exerce função de advérbio, indicando circunstância (causa, tempo, condição, concessão, etc.).', ex: '"Se você estudar, passará." (condicional)' },
        ],
      },
      {
        num:  '19',
        name: 'Figuras de linguagem',
        def:  'Recursos estilísticos que desviam do uso literal das palavras para criar efeitos expressivos, poéticos ou persuasivos.',
        func: 'Enriquecem o texto com força expressiva, ambiguidade produtiva e capacidade de sugestão além do sentido denotativo.',
        examples: [
          'Metáfora: "A vida é uma viagem."',
          'Hipérbole: "Estou morrendo de fome."',
          'Ironia: "Que trabalho maravilhoso!" (dito de algo ruim)',
          'Personificação: "O vento sussurrava segredos."',
          'Eufemismo: "Ele nos deixou." (morreu)',
        ],
        subtypes: [
          { name: 'Metáfora', def: 'Comparação implícita entre dois elementos com base em semelhança.', ex: '"Você é um leão na discussão."' },
          { name: 'Comparação / Símile', def: 'Comparação explícita usando "como", "tal qual", "assim como".', ex: '"Ele é forte como um touro."' },
          { name: 'Hipérbole', def: 'Exagero intencional para enfatizar.', ex: '"Já te disse isso mil vezes."' },
          { name: 'Ironia', def: 'Dizer o contrário do que se quer comunicar.', ex: '"Que pontualidade!" (para quem chegou atrasado)' },
          { name: 'Personificação / Prosopopeia', def: 'Atribuir características humanas a seres inanimados ou animais.', ex: '"A pedra dormia no meio do caminho."' },
          { name: 'Eufemismo', def: 'Suavizar uma expressão de sentido desagradável.', ex: '"Ele partiu desta para melhor." (morreu)' },
          { name: 'Antítese', def: 'Aproximação de ideias contrárias para criar contraste.', ex: '"Era o melhor dos tempos, era o pior dos tempos."' },
        ],
      },
    ],
  },

  {
    id:    'es',
    label: 'Superior',
    title: 'Ensino Superior',
    sub:   'Linguagem acadêmica e discurso científico',
    rules: [
      {
        num:  '20',
        name: 'Coesão textual',
        def:  'Conjunto de mecanismos linguísticos que ligam as partes do texto, criando continuidade e fluidez entre frases, parágrafos e seções.',
        func: 'Garante que o texto seja lido como uma unidade coerente, não como uma sequência de frases soltas.',
        examples: [
          'Conectivo aditivo: "Além disso, o estudo mostra…"',
          'Conectivo conclusivo: "Portanto, conclui-se que…"',
          'Referência anafórica: "A escola é fundamental. Essa instituição deve ser valorizada."',
          'Substituição por hiperônimo: "O cão latia. O animal estava nervoso."',
        ],
        subtypes: [
          { name: 'Coesão referencial', def: 'Uso de pronomes e sinônimos para retomar termos já mencionados sem repetição.', ex: '"João saiu. Ele foi ao mercado."' },
          { name: 'Coesão sequencial', def: 'Uso de conectivos para encadear e relacionar logicamente as ideias.', ex: '"Estudei muito; no entanto, não fui aprovado."' },
          { name: 'Coesão lexical', def: 'Repetição controlada, sinonímia ou hiponímia para manter unidade temática.', ex: '"A pesquisa… O estudo… A investigação…" (mesmo referente)' },
        ],
      },
      {
        num:  '21',
        name: 'Coerência textual',
        def:  'Propriedade do texto que garante a unidade de sentido: as ideias devem ser logicamente consistentes entre si e com o mundo ao qual se referem.',
        func: 'Torna o texto interpretável. Sem coerência, mesmo um texto gramaticalmente correto pode ser semanticamente incoerente.',
        examples: [
          '✔ Incoerente: "O Rio de Janeiro é uma cidade fria. Por isso, seus habitantes usam fantasias no carnaval sob o sol."',
          '✔ Coerente: as informações do texto não se contradizem e seguem uma progressão lógica de ideias.',
          'Princípio de não-contradição: duas afirmações no mesmo texto não podem ser mutuamente excludentes.',
          'Progressão temática: cada parágrafo avança o argumento, não o repete.',
        ],
      },
      {
        num:  '22',
        name: 'Norma culta',
        def:  'Variedade padrão da língua portuguesa usada em contextos formais, caracterizada pela observância das regras gramaticais prescritas.',
        func: 'Assegura clareza, precisão e prestígio em contextos institucionais, legais, acadêmicos e jornalísticos.',
        examples: [
          '❌ "para mim fazer" | ✔ "para eu fazer" (pronome reto como sujeito de infinitivo)',
          '❌ "a gente fomos" | ✔ "a gente foi" (concordância com 3ª pessoa)',
          '❌ "eu vi ele" | ✔ "eu o vi" (pronome oblíquo como objeto direto)',
          '❌ "onde que você foi?" | ✔ "onde você foi?" (ausência de dupla marcação)',
        ],
      },
      {
        num:  '23',
        name: 'Variação linguística',
        def:  'Diferenças sistemáticas na língua conforme fatores geográficos, sociais, históricos e situacionais.',
        func: 'Compreender a variação permite adequar o registro ao contexto e evitar preconceito linguístico, reconhecendo que toda variedade é gramaticalmente válida.',
        examples: [
          'Regional: "tu vais" (Norte/Sul) / "você vai" (Brasil central)',
          'Social: "oxente" (Nordeste) / "nossa" (Sudeste)',
          'Geracional: "bacana" / "legal" / "top"',
          'Situacional (registro): "o sujeito faleceu" (formal) / "o cara morreu" (informal)',
        ],
        subtypes: [
          { name: 'Variação diatópica (regional)', def: 'Diferenças linguísticas conforme a região geográfica.', ex: '"mandioca" / "aipim" / "macaxeira"' },
          { name: 'Variação diastrática (social)', def: 'Diferenças conforme o grupo social, nível de escolaridade e faixa etária.', ex: 'Gírias de grupos específicos; vocabulário técnico de profissões' },
          { name: 'Variação diafásica (situacional)', def: 'Diferenças conforme o contexto de comunicação: formal ou informal.', ex: '"Prezado senhor," (formal) / "Oi!" (informal)' },
        ],
      },
      {
        num:  '24',
        name: 'Intertextualidade',
        def:  'Relação entre textos: um texto dialoga explícita ou implicitamente com outro, citando, referenciando, parodiando ou subvertendo.',
        func: 'Amplia o sentido de um texto ao ativar outros textos no repertório do leitor. Leitores com mais repertório extraem mais camadas de sentido.',
        examples: [
          'Citação explícita: usar aspas e indicar a fonte.',
          'Alusão: mencionar sem citar formalmente — "A culpa é das estrelas, não de nós mesmos" (Shakespeare).',
          'Paródia: reescrever um texto original com intenção humorística ou crítica.',
          'Pastiche: imitar o estilo de outro autor sem intenção crítica.',
          'Epígrafe: citar outro texto como abertura e moldura interpretativa.',
        ],
        subtypes: [
          { name: 'Intertextualidade explícita', def: 'O texto fonte é citado ou nomeado.', ex: 'Citações com aspas, notas de rodapé, "segundo Machado de Assis"' },
          { name: 'Intertextualidade implícita', def: 'O texto fonte é ativado sem ser nomeado — o leitor deve reconhecê-lo.', ex: 'Alusões, paráfrases sem aspas, títulos que evocam outros títulos' },
          { name: 'Paródia', def: 'Reescritura crítica ou humorística de um texto original.', ex: 'Drummond parodiando o lirismo romântico em "No meio do caminho"' },
          { name: 'Interdiscursividade', def: 'Diálogo entre discursos (não apenas textos): o texto literário incorpora discurso científico, jurídico, etc.', ex: 'Graciliano Ramos incorporando o discurso burocrático em "Vidas Secas"' },
        ],
      },
      {
        num:  '25',
        name: 'Semântica e polissemia',
        def:  'A semântica estuda o significado das palavras e enunciados. Polissemia é a propriedade de uma palavra ter múltiplos sentidos relacionados.',
        func: 'Compreender a polissemia permite distinguir o sentido contextualizado de uma palavra e reconhecer ambiguidades exploradas literária e retoricamente.',
        examples: [
          '"Banco": instituição financeira / móvel para sentar / banco de dados / banco de areia.',
          '"Manga": fruta / parte do vestuário / instrumento técnico.',
          '"Pena": punição / sentimento de compaixão / pena de escrever / pena de ave.',
          'Em "Minha vida deu uma virada", "virada" ativa sentido positivo por contexto.',
        ],
        subtypes: [
          { name: 'Polissemia', def: 'Um significante com múltiplos sentidos relacionados historicamente.', ex: '"Cabeça": parte do corpo / líder de grupo / cabeça de lista / cabeça de alho' },
          { name: 'Homonímia', def: 'Palavras com a mesma forma mas origens e sentidos não relacionados.', ex: '"São" (santo) / "são" (saudável) / "são" (forma de ser)' },
          { name: 'Sinonímia', def: 'Palavras com sentido similar — mas nunca idêntico. Todo sinônimo tem nuance.', ex: '"Morrer", "falecer", "sucumbir", "perecer" — mesmo campo semântico, registros e conotações diferentes' },
          { name: 'Antonímia', def: 'Palavras de sentido oposto — relação não é sempre simétrica.', ex: '"Quente" e "frio" são antônimos, mas "morno" complexifica a oposição' },
          { name: 'Denotação e conotação', def: 'Denotação = sentido literal; conotação = sentido contextual, afetivo, cultural.', ex: '"Raposa" denota o animal; connota esperteza / traição' },
        ],
      },
      {
        num:  '26',
        name: 'Estilística e escolha lexical',
        def:  'Estilística é o estudo dos efeitos produzidos pelas escolhas linguísticas do autor — vocabulário, sintaxe, ritmo, nível de língua.',
        func: 'Permite analisar como o "como se diz" constrói o sentido e o efeito do texto. Toda escolha lexical é também uma escolha ideológica e estética.',
        examples: [
          '"O homem saiu" / "O sujeito escapou" / "O indivíduo se retirou": mesma ação, efeitos radicalmente diferentes.',
          'Machado de Assis usa ironia como estilo — a distância entre o que diz e o que significa é o texto.',
          'Clarice Lispector usa sintaxe fragmentada para replicar a experiência da consciência.',
          'Guimarães Rosa inventa palavras: não é erro — é sistema.',
        ],
        subtypes: [
          { name: 'Registro', def: 'Nível de formalidade da língua escolhido conforme o contexto.', ex: 'Formal, informal, técnico, literário, popular' },
          { name: 'Tom', def: 'Atitude do enunciador em relação ao tema: irônico, sério, compassivo, combativo.', ex: 'O mesmo fato pode ser narrado em tom neutro, trágico ou irônico' },
          { name: 'Ritmo', def: 'Cadência da prosa ou do verso, determinada por comprimento de frases, escolha de palavras e pontuação.', ex: 'Frases curtas criam urgência; frases longas e subordinadas criam lentidão contemplativa' },
          { name: 'Ambiguidade calculada', def: 'Ambiguidade intencional como recurso estético ou retórico.', ex: 'Títulos que admitem dupla leitura; finais abertos; poesia que recusa interpretação única' },
        ],
      },
    ],
  },
];

/* ================================================================
   RENDERIZAÇÃO PRINCIPAL
   ================================================================ */

/**
 * @returns {HTMLElement}
 */
export function renderRegras() {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Regras da Língua Portuguesa</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        Da alfabetização ao discurso acadêmico: 23 regras organizadas pelos quatro
        níveis de progressão curricular da BNCC. Cada regra traz definição, função
        gramatical e exemplos práticos.
      </p>
    </div>

    <!-- Tabs de nível -->
    <div style="border-bottom:1px solid var(--color-paper-border);margin-bottom:var(--space-8)" id="rules-tabs" role="tablist" aria-label="Níveis de ensino"></div>

    <!-- Painel ativo -->
    <div id="rules-panel"></div>
  `;

  const tabsEl  = page.querySelector('#rules-tabs');
  const panelEl = page.querySelector('#rules-panel');

  let activeId = LEVELS[0].id;

  function renderTabs() {
    tabsEl.innerHTML = '';
    LEVELS.forEach(level => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.role = 'tab';
      btn.setAttribute('aria-selected', level.id === activeId ? 'true' : 'false');
      btn.setAttribute('aria-controls', `panel-${level.id}`);
      btn.id = `tab-${level.id}`;
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);
        padding:var(--space-3) var(--space-6);
        border:none;border-bottom:3px solid transparent;
        background:none;cursor:pointer;
        color:${level.id === activeId ? 'var(--color-ink)' : 'var(--color-ink-ghost)'};
        border-bottom-color:${level.id === activeId ? 'var(--color-accent)' : 'transparent'};
        font-weight:${level.id === activeId ? '600' : '400'};
        transition:color var(--transition-fast),border-color var(--transition-fast);
        white-space:nowrap;
        margin-right:var(--space-1);
      `;
      btn.textContent = level.label;
      btn.addEventListener('click', () => {
        activeId = level.id;
        renderTabs();
        renderPanel();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderPanel() {
    panelEl.innerHTML = '';
    const level = LEVELS.find(l => l.id === activeId);
    if (!level) return;

    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom:var(--space-8)';
    header.innerHTML = `
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-1)">${level.title}</h2>
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost)">${level.sub}</p>
    `;
    panelEl.appendChild(header);

    level.rules.forEach(rule => {
      panelEl.appendChild(createRuleCard(rule));
    });
  }

  renderTabs();
  renderPanel();
  return page;
}

/* ================================================================
   CARD DE REGRA (ACCORDION)
   ================================================================ */

/**
 * Cria um card accordion para uma regra.
 * @param {object} rule
 * @returns {HTMLElement}
 */
function createRuleCard(rule) {
  const card = document.createElement('div');
  card.style.cssText = `
    border:1px solid var(--color-paper-border);
    border-radius:var(--radius);
    margin-bottom:var(--space-4);
    background:var(--color-paper);
    overflow:hidden;
    max-width:var(--content-width);
  `;

  // Cabeçalho clicável
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
      font-family:var(--font-ui);font-size:var(--text-xs);
      color:var(--color-accent);font-weight:700;flex-shrink:0;
      min-width:2rem;letter-spacing:0.04em;
    ">${rule.num}</span>
    <span style="
      font-family:var(--font-display);font-size:var(--text-xl);
      color:var(--color-ink);font-weight:600;flex:1;line-height:1.2;
    ">${rule.name}</span>
    <span class="accordion-chevron" aria-hidden="true" style="
      font-size:10px;color:var(--color-ink-ghost);
      flex-shrink:0;transition:transform 0.2s ease;
    ">▼</span>
  `;

  header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
  header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

  // Corpo (inicialmente oculto)
  const body = document.createElement('div');
  body.style.cssText = 'display:none;padding:var(--space-6) var(--space-6) var(--space-8);border-top:1px solid var(--color-paper-border)';
  body.appendChild(buildRuleBody(rule));

  // Toggle
  header.addEventListener('click', () => {
    const open = body.style.display !== 'block';
    body.style.display   = open ? 'block' : 'none';
    header.setAttribute('aria-expanded', open ? 'true' : 'false');
    header.querySelector('.accordion-chevron').style.transform = open ? 'rotate(180deg)' : '';
  });

  card.appendChild(header);
  card.appendChild(body);
  return card;
}

/**
 * Constrói o conteúdo interno de uma regra.
 * @param {object} rule
 * @returns {HTMLElement}
 */
function buildRuleBody(rule) {
  const wrap = document.createElement('div');
  // padding vem do body container — wrap apenas organiza os blocos internos

  // Definição
  wrap.appendChild(makeSection('O que é', rule.def));

  // Divisor leve entre seções
  wrap.appendChild(makeSectionDivider());

  // Função
  wrap.appendChild(makeSection('Função gramatical', rule.func));

  // Divisor
  wrap.appendChild(makeSectionDivider());

  // Exemplos
  const exList = document.createElement('div');
  exList.innerHTML = `<p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplos</p>`;
  const ul = document.createElement('ul');
  ul.style.cssText = 'list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-3)';
  rule.examples.forEach(ex => {
    const li = document.createElement('li');
    li.style.cssText = `
      font-family:var(--font-body);font-size:var(--text-base);
      color:var(--color-ink);line-height:1.65;
      padding:var(--space-3) var(--space-4);
      background:var(--color-paper-dark);
      border-radius:var(--radius);
      border-left:2px solid var(--color-accent);
    `;
    li.textContent = ex;
    ul.appendChild(li);
  });
  exList.appendChild(ul);
  wrap.appendChild(exList);

  // Subtipos (se existirem)
  if (rule.subtypes?.length) {
    wrap.appendChild(makeSectionDivider());

    const subSection = document.createElement('div');
    subSection.innerHTML = `<p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)">Tipos / Subdivisões</p>`;

    const grid = document.createElement('div');
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-4)';

    rule.subtypes.forEach(sub => {
      const chip = document.createElement('div');
      chip.style.cssText = `
        background:var(--color-paper-dark);
        border:1px solid var(--color-paper-border);
        border-radius:var(--radius);
        padding:var(--space-4) var(--space-5);
      `;
      chip.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2)">${sub.name}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-3);line-height:1.6">${sub.def}</p>
        <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-accent);font-style:italic;line-height:1.5">${sub.ex}</p>
      `;
      grid.appendChild(chip);
    });

    subSection.appendChild(grid);
    wrap.appendChild(subSection);
  }

  return wrap;
}

/* ================================================================
   UTILITÁRIOS
   ================================================================ */

/**
 * Cria um bloco de seção rotulada.
 * @param {string} label
 * @param {string} text
 * @returns {HTMLElement}
 */
function makeSection(label, text) {
  const el = document.createElement('div');
  el.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">${label}</p>
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75">${text}</p>
  `;
  return el;
}

/**
 * Separador leve entre seções do corpo do card.
 * @returns {HTMLElement}
 */
function makeSectionDivider() {
  const el = document.createElement('div');
  el.style.cssText = 'height:1px;background:var(--color-paper-border);margin:var(--space-5) 0';
  return el;
}
