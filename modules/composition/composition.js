/**
 * composition.js — Módulo 11: Redação
 *
 * Organizado em três abas:
 *   1. Tipos Textuais — estrutura e critérios de cada gênero
 *   2. Construtor — formulário estruturado por seção com checklist em tempo real
 *   3. Exemplos Comentados — textos modelo com anotações marginais
 *
 * Dados declarados neste módulo. Sem dependência de arquivos externos.
 */

/* ================================================================
   BANCO DE TIPOS TEXTUAIS
   ================================================================ */

const TIPOS = [
  {
    id:       'dissertacao',
    nome:     'Dissertação-Argumentativa',
    contexto: 'Redação do ENEM, vestibulares, concursos públicos.',
    objetivo: 'Defender uma tese sobre um tema controverso com argumentos sustentados e proposta de intervenção.',
    estrutura: [
      {
        parte:  'Introdução',
        funcao: 'Contextualizar o tema e apresentar a tese — a posição que será defendida.',
        tamanho: '2–3 frases',
        dicas:  ['Comece com dado, citação ou pergunta retórica — não com "Desde os primórdios..."', 'A tese deve aparecer no último período da introdução', 'Evite perguntas diretas ao leitor'],
      },
      {
        parte:  'Desenvolvimento — 1º parágrafo',
        funcao: 'Apresentar e desenvolver o primeiro argumento. Estrutura: tópico frasal → desenvolvimento → exemplificação.',
        tamanho: '5–7 frases',
        dicas:  ['A primeira frase deve conter a ideia central do parágrafo (tópico frasal)', 'Todo argumento precisa de evidência: dado, exemplo, citação ou raciocínio', 'Conecte ao parágrafo anterior e à tese'],
      },
      {
        parte:  'Desenvolvimento — 2º parágrafo',
        funcao: 'Apresentar e desenvolver o segundo argumento, de perspectiva diferente do primeiro.',
        tamanho: '5–7 frases',
        dicas:  ['Aborde um aspecto diferente do 1º argumento (econômico, social, histórico, filosófico...)', 'Use conectivos de adição ou contraste para encadear com o parágrafo anterior', 'Evite repetir exemplos já usados'],
      },
      {
        parte:  'Conclusão — Proposta de intervenção',
        funcao: 'Retomar a tese e apresentar proposta de intervenção detalhada.',
        tamanho: '4–5 frases',
        dicas:  ['Retome a tese sem copiá-la', 'A proposta precisa ter: agente + ação + meio + finalidade + detalhamento', 'Não apresente apenas o problema — proponha solução concreta'],
      },
    ],
    criterios: [
      { label: 'Domínio da norma culta',      desc: 'Gramática, ortografia, pontuação e sintaxe corretas.' },
      { label: 'Compreensão do tema',          desc: 'Não fuga ao tema; abordagem pertinente da proposta.' },
      { label: 'Seleção de argumentos',        desc: 'Argumentos consistentes, com evidências reais e pertinentes.' },
      { label: 'Coesão e coerência',           desc: 'Encadeamento lógico entre partes; uso correto de conectivos.' },
      { label: 'Proposta de intervenção',      desc: 'Detalhada, viável, respeitosa aos direitos humanos, ligada ao tema.' },
    ],
  },
  {
    id:       'carta',
    nome:     'Carta Argumentativa',
    contexto: 'Cartas abertas, cartas ao editor, requerimentos formais com justificativa.',
    objetivo: 'Dirigir-se a um destinatário específico para defender uma posição ou solicitar uma mudança de atitude/política.',
    estrutura: [
      {
        parte:  'Cabeçalho',
        funcao: 'Identificar local, data e destinatário.',
        tamanho: '3–4 linhas',
        dicas:  ['Use tratamento adequado: "Senhor(a)", "Prezado(a)"', 'O cargo ou função do destinatário deve estar correto'],
      },
      {
        parte:  'Introdução — identificação e propósito',
        funcao: 'Identificar o remetente e apresentar o motivo da carta.',
        tamanho: '2–3 frases',
        dicas:  ['Apresente-se brevemente se necessário', 'Deixe claro o propósito logo no início'],
      },
      {
        parte:  'Desenvolvimento — argumentação',
        funcao: 'Apresentar os argumentos que justificam o pedido ou posição.',
        tamanho: '2–3 parágrafos',
        dicas:  ['Argumente com dados e fatos, não apenas opiniões', 'Mantenha tom respeitoso mesmo ao criticar', 'Um argumento por parágrafo'],
      },
      {
        parte:  'Conclusão — pedido ou proposta',
        funcao: 'Formular o pedido explícito ou sintetizar a posição defendida.',
        tamanho: '2–3 frases',
        dicas:  ['Seja específico no que está pedindo', 'Manifeste expectativa de resposta ou mudança'],
      },
      {
        parte:  'Fecho e assinatura',
        funcao: 'Encerrar formalmente.',
        tamanho: '2 linhas',
        dicas:  ['Fecho formal: "Atenciosamente", "Respeitosamente"', 'Nome completo e função/identificação do remetente'],
      },
    ],
    criterios: [
      { label: 'Adequação ao gênero',         desc: 'Elementos da carta presentes: cabeçalho, fecho, destinatário claro.' },
      { label: 'Clareza do propósito',         desc: 'O leitor entende imediatamente o que está sendo solicitado.' },
      { label: 'Sustentação argumentativa',    desc: 'A posição é justificada com argumentos, não apenas declarada.' },
      { label: 'Tom e formalidade',            desc: 'Linguagem adequada ao destinatário — formal sem ser empolada.' },
      { label: 'Coesão',                       desc: 'Partes conectadas logicamente; sem contradições internas.' },
    ],
  },
  {
    id:       'resenha',
    nome:     'Resenha Crítica',
    contexto: 'Trabalhos escolares e acadêmicos, jornalismo cultural, blogs especializados.',
    objetivo: 'Descrever, resumir e avaliar criticamente uma obra (livro, filme, exposição, peça etc.).',
    estrutura: [
      {
        parte:  'Apresentação da obra',
        funcao: 'Identificar a obra e situar o leitor.',
        tamanho: '3–5 frases',
        dicas:  ['Título, autor/diretor, ano, editora/distribuidora', 'Contexto de produção quando relevante', 'Não narre o enredo — apenas situe'],
      },
      {
        parte:  'Resumo analítico',
        funcao: 'Apresentar os pontos centrais da obra sem revelar o desfecho (se narrativa).',
        tamanho: '1–2 parágrafos',
        dicas:  ['Foque em temas e estrutura, não em sequência de eventos', 'O resumo serve para que o leitor entenda de que trata a obra'],
      },
      {
        parte:  'Análise e avaliação',
        funcao: 'Avaliar os pontos fortes e fracos com critérios explícitos.',
        tamanho: '2–3 parágrafos',
        dicas:  ['Critique com base em critérios: estilo, coerência, relevância, originalidade', 'Opinião pessoal deve ser distinguida de análise factual', 'Compare com outras obras quando pertinente'],
      },
      {
        parte:  'Conclusão — recomendação',
        funcao: 'Sintetizar o julgamento e indicar o público-alvo da obra.',
        tamanho: '2–3 frases',
        dicas:  ['Para quem a obra é recomendada?', 'A recomendação deve decorrer dos argumentos apresentados'],
      },
    ],
    criterios: [
      { label: 'Identificação completa',       desc: 'Dados da obra presentes e corretos.' },
      { label: 'Distinção resumo/avaliação',   desc: 'O leitor sabe quando o resenhista descreve e quando avalia.' },
      { label: 'Critérios de avaliação',       desc: 'A opinião é fundamentada — não apenas "gostei" ou "não gostei".' },
      { label: 'Equilíbrio',                   desc: 'Pontos positivos e negativos considerados com fairness.' },
      { label: 'Domínio do gênero',            desc: 'Linguagem analítica; não confundir com sinopse ou propaganda.' },
    ],
  },
];

/* ================================================================
   BANCO DE EXEMPLOS COMENTADOS
   ================================================================ */

const EXEMPLOS = [
  {
    tipo:   'dissertacao',
    titulo: 'Exemplo: dissertação-argumentativa',
    tema:   'A invisibilidade da população em situação de rua no Brasil',
    texto: [
      {
        parte:  'Introdução',
        texto:  'Segundo o IPEA, o Brasil contava com mais de 220 mil pessoas em situação de rua em 2022 — número que cresceu mais de 38% na última década. Esse dado revela uma contradição central do desenvolvimento nacional: enquanto o PIB avança, a desigualdade aprofunda a exclusão de parcelas crescentes da população. A invisibilidade social, estrutural e institucional da população em situação de rua é, portanto, um problema que demanda enfrentamento urgente e articulado.',
        notas:  ['Dado estatístico concreto abre o texto — evita generalização', 'Contradição (PIB vs. desigualdade) cria tensão que justifica a discussão', 'Tese clara no último período: invisibilidade + urgência + articulação'],
      },
      {
        parte:  '1º argumento',
        texto:  'Do ponto de vista social, a invisibilidade se manifesta no desconhecimento cotidiano: passantes evitam contato visual, comerciantes relatam afastamento e pesquisas de vitimização indicam que pessoas em situação de rua têm 2,5 vezes mais chance de sofrer violência sem registrar ocorrência. Esse ciclo — invisibilidade gera vulnerabilidade, que reforça a invisibilidade — é alimentado pela ausência de políticas de acolhimento sistemático nos municípios brasileiros.',
        notas:  ['Tópico frasal: "invisibilidade se manifesta no desconhecimento cotidiano"', 'Dado (2,5x mais chance) sustenta o argumento', 'Ciclo causal fecha o parágrafo com síntese explicativa'],
      },
      {
        parte:  '2º argumento',
        texto:  'Sob a perspectiva institucional, a fragmentação das políticas públicas agrava o problema. A maioria dos municípios brasileiros opera Centros Pop (Centros de Referência Especializada) subfinanciados, sem integração com saúde mental, dependência química e habitação. Pesquisa da FGV Social (2023) aponta que apenas 14% das pessoas em situação de rua recebem acompanhamento psicossocial contínuo — evidência de que a rede de proteção, quando existe, não opera de forma integrada.',
        notas:  ['Perspectiva diferente do 1º argumento: institucional vs. social', 'Dado da FGV reforça credibilidade', 'Problema nomeado com precisão: fragmentação da política'],
      },
      {
        parte:  'Conclusão',
        texto:  'A visibilidade plena da população em situação de rua exige mais do que compaixão individual — requer política pública estruturada. Para isso, o Ministério do Desenvolvimento Social, em parceria com municípios, deve implementar cadastro nacional unificado de pessoas em situação de rua, com atualização semestral, integrando dados de saúde, assistência e habitação, com o objetivo de planejar intervenções territorializadas e mensurar resultados. Apenas com visibilidade institucional o Brasil poderá reduzir estruturalmente essa forma de exclusão.',
        notas:  ['Retoma a tese sem copiá-la (visibilidade → política estruturada)', 'Proposta com: agente (Ministério + municípios) + ação (cadastro) + meio (parceria) + finalidade (planejar e mensurar)', 'Sem soluções vagas como "conscientização" ou "mais investimento"'],
      },
    ],
  },
  {
    tipo:   'resenha',
    titulo: 'Exemplo: resenha crítica',
    tema:   'Vidas Secas, de Graciliano Ramos (1938)',
    texto: [
      {
        parte:  'Apresentação',
        texto:  'Vidas Secas, publicado em 1938 por Graciliano Ramos, é o último romance do autor alagoano e um dos textos mais influentes do Regionalismo brasileiro. Composto por treze capítulos independentes, o livro narra o ciclo de migrações forçadas de uma família sertaneja — Fabiano, Sinhá Vitória e os dois filhos — em fuga da seca nordestina.',
        notas:  ['Dados completos: título, autor, ano, posição na obra', 'Estrutura da obra mencionada (capítulos independentes)', 'Sem enredo completo — apenas enquadramento'],
      },
      {
        parte:  'Resumo analítico',
        texto:  'O livro não tem enredo convencional: não há conflito que se resolve, apenas o ciclo que se repete — seca, fuga, assentamento precário, nova seca. Os personagens são tratados quase como animais, aproximados de fato à cadela Baleia, o único ser que parece entender os outros. A linguagem mimetiza o silêncio dos personagens: frases curtas, vocabulário restrito, pensamentos incompletos.',
        notas:  ['Temática central identificada: ciclo, não enredo linear', 'Técnica narrativa descrita: estilo como tradução da realidade dos personagens', 'Elemento simbólico (Baleia) integrado à análise'],
      },
      {
        parte:  'Avaliação',
        texto:  'A força de Vidas Secas está na coerência entre forma e conteúdo: Graciliano escreve como Fabiano pensa — em fragmentos duros, sem ornamento. Essa escolha estética é ao mesmo tempo representação social e posição política. O livro falha, se há falha, em oferecer alguma saída: a circularidade narrativa pode ser lida como fatalismo, embora defensores da obra a interpretem como denúncia estrutural. Para leitores contemporâneos, o texto permanece perturbador — talvez mais do que em 1938, dado que as condições que descreve não foram eliminadas.',
        notas:  ['Critério explícito: coerência forma-conteúdo', 'Ponto fraco apontado (fatalismo) com contraponto imediato — equilíbrio', 'Relevância contemporânea justificada sem anacronismo'],
      },
      {
        parte:  'Recomendação',
        texto:  'Recomendado a leitores dispostos a suportar o desconforto deliberado da prosa. Não é leitura de entretenimento — é leitura de formação. Indispensável para quem estuda literatura brasileira ou quiser entender a relação entre estilo e compromisso ético na ficção.',
        notas:  ['Público especificado com critério', 'Distinção explícita entre tipos de leitura', 'Conclusão decorre dos argumentos anteriores'],
      },
    ],
  },
  {
    id:      'carta-ex',
    titulo:  'Exemplo: carta argumentativa',
    tipo:    'Carta Argumentativa',
    secoes: [
      {
        titulo: 'Cabeçalho',
        texto:  'Rio de Janeiro, 14 de março de 2024.\nAo Senhor Secretário de Educação do Estado do Rio de Janeiro',
        notas:  ['Local e data no formato completo', 'Destinatário identificado pelo cargo'],
      },
      {
        titulo: 'Introdução',
        texto:  'Sou estudante do 3º ano do Ensino Médio da Escola Estadual Professor Antônio Firmino, em São Gonçalo. Escrevo esta carta para solicitar a revisão da política de distribuição de materiais didáticos nas escolas estaduais, que tem causado prejuízos concretos ao aprendizado de milhares de alunos.',
        notas:  ['Remetente identificado com contexto', 'Propósito declarado na introdução', 'Tom respeitoso mas direto'],
      },
      {
        titulo: 'Argumento 1',
        texto:  'Segundo dados da própria Secretaria de Educação, apenas 43% das escolas estaduais receberam o material completo no início do ano letivo de 2023. Sem livros didáticos, professores precisam reproduzir conteúdo manualmente, o que sobrecarrega o tempo de aula e reduz a qualidade do ensino.',
        notas:  ['Dado oficial como evidência', 'Consequência concreta do problema'],
      },
      {
        titulo: 'Argumento 2',
        texto:  'A situação é agravada pela concentração de recursos nas escolas das regiões central e sul do estado. Enquanto colégios da Zona Sul do Rio recebem materiais complementares, escolas da Baixada Fluminense e do Norte Fluminense chegam ao 2º bimestre sem os livros básicos. Essa disparidade aprofunda a desigualdade educacional já documentada pelo IDEB estadual.',
        notas:  ['Segundo argumento com ângulo diferente (inequidade regional)', 'Conecta ao dado externo (IDEB)'],
      },
      {
        titulo: 'Pedido e proposta',
        texto:  'Solicito, portanto, que Vossa Excelência determine: (1) auditoria no processo de distribuição; (2) cronograma público com prazo para regularização das escolas deficitárias; (3) canal direto para que diretores relatem irregularidades sem burocracia. Essas medidas são viáveis dentro do orçamento atual e gerariam impacto imediato.',
        notas:  ['Pedido específico e numerado', 'Agente + ação + meio', 'Argumento de viabilidade'],
      },
      {
        titulo: 'Encerramento',
        texto:  'Certo de que Vossa Excelência compartilha o compromisso com a educação pública de qualidade, aguardo retorno.\n\nAtenciosamente,\nLucas Menezes, estudante',
        notas:  ['Tom cordial mas assertivo', 'Identificação do remetente'],
      },
    ],
  },
];

/* ================================================================
   EXERCÍCIOS DE IDENTIFICAÇÃO
   ================================================================ */

const EXERCICIOS = [
  {
    id:   'r01',
    inst: 'Qual das alternativas representa uma tese — e não apenas um tema?',
    opts: [
      'A violência urbana no Brasil',
      'A violência urbana no Brasil é agravada pela desigualdade social e pela ausência de políticas públicas eficazes',
      'Como reduzir a violência no Brasil?',
      'O Brasil é violento',
    ],
    ok:   1,
    exp:  'Tese é uma afirmação que pode ser defendida com argumentos — não um tema neutro nem uma pergunta. "A violência é agravada pela desigualdade" é uma posição argumentável. Os outros são: tema (a), pergunta retórica (c), afirmação vaga sem tese (d).',
  },
  {
    id:   'r02',
    inst: 'Em uma dissertação-argumentativa, qual é a função do tópico frasal?',
    opts: [
      'Introduzir o tema geral do texto',
      'Apresentar a ideia central do parágrafo em desenvolvimento',
      'Encerrar o parágrafo com conclusão',
      'Conectar o parágrafo à proposta de intervenção',
    ],
    ok:   1,
    exp:  'O tópico frasal é a primeira frase do parágrafo de desenvolvimento — contém a ideia central que será desenvolvida no restante do parágrafo. Funciona como uma minítese do parágrafo. As demais frases devem expandir, exemplificar ou justificar o tópico frasal.',
  },
  {
    id:   'r03',
    inst: 'Qual proposta de intervenção está mais bem estruturada?',
    opts: [
      'O governo deve investir mais em educação para resolver o problema.',
      'É necessário conscientizar a população sobre a importância da leitura.',
      'O Ministério da Educação deve ampliar o Programa Nacional do Livro Didático, por meio de parceria com editoras regionais, garantindo acesso a materiais culturalmente relevantes a escolas do interior — o que contribuiria para reduzir o analfabetismo funcional.',
      'Políticas públicas poderiam resolver esse problema se o governo tivesse vontade política.',
    ],
    ok:   2,
    exp:  'A proposta completa tem: agente (Ministério da Educação) + ação (ampliar o PNLD) + meio (parceria com editoras regionais) + detalhamento (materiais culturalmente relevantes) + finalidade (reduzir analfabetismo funcional). As outras são vagas, sem agente específico ou ação concreta.',
  },
  {
    id:   'r04',
    inst: '"Desde os primórdios da civilização, o ser humano busca a felicidade." Qual o problema com esse início de introdução?',
    opts: [
      'A frase é muito longa',
      'Não apresenta dados — é abertura vaga e genérica que não acrescenta ao tema',
      'O registro é informal demais',
      'Falta pontuação adequada',
    ],
    ok:   1,
    exp:  '"Desde os primórdios" é uma das aberturas mais evitadas em redações porque é vaga, inútil e ocupa o espaço onde deveria estar a contextualização real do tema. Boas aberturas partem de dado, citação, pergunta retórica ou fato concreto ligado ao tema — não de generalidades históricas.',
  },
  {
    id:   'r05',
    inst: 'Qual trecho exemplifica argumento com evidência?',
    opts: [
      'A tecnologia é prejudicial à saúde mental dos jovens.',
      'É evidente que o excesso de telas faz mal.',
      'Pesquisa da Universidade de Harvard (2023) associou uso diário de redes sociais por mais de 3 horas a aumento de 40% nos índices de ansiedade em adolescentes.',
      'Todo mundo sabe que ficar no celular o dia todo faz mal.',
    ],
    ok:   2,
    exp:  'Argumento com evidência = afirmação + dado verificável. A opção C apresenta fonte, dado quantitativo e relação causal específica. As outras são opiniões não sustentadas ou apelos ao senso comum — válidos retoricamente, mas insuficientes como argumentos em texto dissertativo.',
  },
  {
    id:   'r06',
    inst: 'Em uma resenha crítica, qual é o papel da avaliação?',
    opts: [
      'Resumir o conteúdo da obra para o leitor',
      'Descrever a biografia do autor',
      'Emitir juízo fundamentado sobre qualidade, relevância e limitações da obra',
      'Listar os capítulos e seus assuntos',
    ],
    ok:   2,
    exp:  'A resenha vai além do resumo — ela avalia. O resenhista precisa emitir juízo crítico fundamentado: o que a obra faz bem, onde falha, para que público serve, qual sua contribuição ao campo. Sem avaliação, é só resumo. Sem fundamentação, é só opinião.',
  },
  {
    id:   'r07',
    inst: 'Qual conectivo NÃO é adequado para introduzir a conclusão de uma dissertação-argumentativa?',
    opts: [
      'Portanto',
      'Dessa forma',
      'Conclui-se que',
      'Além disso',
    ],
    ok:   3,
    exp:  '"Além disso" é conectivo aditivo — acrescenta informação nova. A conclusão retoma e sintetiza o que foi argumentado, usando conectivos conclusivos ("portanto", "logo", "dessa forma", "conclui-se que"). Usar "além disso" na conclusão cria expectativa de mais argumentos — o que não é adequado no encerramento.',
  },
  {
    id:   'r08',
    inst: 'Qual das estratégias de abertura é mais eficaz para uma dissertação sobre desigualdade educacional?',
    opts: [
      '"Desde que o mundo é mundo, sempre houve desigualdade entre as pessoas."',
      '"Segundo o IBGE, o Brasil tem o 9º maior índice de desigualdade de aprendizagem do mundo — disparidade que se aprofunda conforme a renda familiar diminui."',
      '"A desigualdade educacional é um problema muito sério que precisa ser resolvido urgentemente."',
      '"Você já pensou em como seria difícil estudar sem material didático?"',
    ],
    ok:   1,
    exp:  'A abertura com dado estatístico de fonte reconhecida contextualiza imediatamente o problema com precisão e credibilidade. As outras falham por: generalidade vaga (a), repetição óbvia do tema sem acréscimo (c), pergunta retórica direta ao leitor (d — evitada no ENEM).',
  },
  {
    id:   'r09',
    inst: 'Qual é a diferença fundamental entre uma carta argumentativa e uma dissertação-argumentativa?',
    opts: [
      'A carta tem tese; a dissertação não',
      'A carta tem destinatário específico e usa tom de interlocução direta; a dissertação é impessoal',
      'A carta não usa argumentos; a dissertação sim',
      'A carta é sempre informal; a dissertação sempre formal',
    ],
    ok:   1,
    exp:  'A carta argumentativa e a dissertação compartilham estrutura argumentativa, mas diferem no destinatário. A carta se dirige a alguém específico (autoridade, redação de jornal, empresa) e usa vocativo e tratamento adequados. A dissertação do ENEM é impessoal, sem destinatário nomeado. Ambas usam argumentos e norma culta.',
  },
  {
    id:   'r10',
    inst: 'Em uma carta argumentativa a uma autoridade pública, qual tratamento é adequado?',
    opts: [
      '"Você", pois é mais direto e moderno',
      '"Vossa Excelência" para cargos eletivos e magistrados; "Vossa Senhoria" para outros cargos públicos',
      '"Senhor" é suficiente em qualquer contexto',
      'Não é necessário tratamento — começa-se direto no assunto',
    ],
    ok:   1,
    exp:  'O protocolo oficial brasileiro usa "Vossa Excelência" (Vossa Excelência, V.Exa.) para presidentes, governadores, prefeitos, ministros, parlamentares e magistrados. "Vossa Senhoria" (V.Sa.) para demais autoridades. O tratamento correto é parte da etiqueta retórica — demonstra que o remetente conhece e respeita as convenções da interlocução formal.',
  },
  {
    id:   'r11',
    inst: 'Numa resenha crítica, qual é o erro mais comum ao descrever o conteúdo da obra?',
    opts: [
      'Citar o título da obra',
      'Reproduzir o conteúdo em detalhe sem emitir julgamento — transformando a resenha em mero resumo',
      'Mencionar o autor',
      'Indicar o gênero da obra',
    ],
    ok:   1,
    exp:  'O erro mais frequente é a resenha que resume sem avaliar. Resumo é pré-condição, não objetivo. A resenha deve: (1) contextualizar a obra, (2) descrever brevemente o conteúdo, (3) emitir juízo fundamentado sobre qualidade, relevância e limitações. Sem avaliação crítica, é apenas um resumo. Sem fundamentação, é apenas opinião.',
  },
  {
    id:   'r12',
    inst: 'Qual elemento é indispensável numa resenha crítica mas ausente num resumo?',
    opts: [
      'Título e autor da obra',
      'Número de páginas',
      'Avaliação fundamentada: o que funciona, o que falha, para quem serve',
      'Citação de outra obra do mesmo autor',
    ],
    ok:   2,
    exp:  'A avaliação fundamentada é o elemento definidor da resenha. O resenhista deve julgar: a qualidade dos argumentos, a relevância para o campo, o público adequado, os pontos de força e fragilidade. Este julgamento deve ser sustentado por evidências do próprio texto — não apenas pela impressão do resenhista.',
  },
  {
    id:   'r13',
    inst: 'Uma carta argumentativa tem como propósito solicitar mudança numa política da universidade. Qual estrutura está mais bem ordenada?',
    opts: [
      'Pedido → Argumentos → Cabeçalho → Encerramento',
      'Cabeçalho → Identificação e propósito → Argumentos → Pedido concreto → Encerramento cordial',
      'Argumentos → Cabeçalho → Pedido → Agradecimento',
      'Cabeçalho → Pedido → Argumentos → Encerramento',
    ],
    ok:   1,
    exp:  'A estrutura clássica da carta argumentativa: (1) Cabeçalho com data e destinatário; (2) Parágrafo de identificação e propósito — quem escreve e por quê; (3) Desenvolvimento dos argumentos — um por parágrafo, com evidências; (4) Pedido concreto e específico; (5) Encerramento cordial com saudação. A ordem importa: o destinatário precisa entender o contexto antes de receber o pedido.',
  },
  {
    id:   'r14',
    inst: 'Ao resenhar um romance, o resenhista escreve: "O livro é muito bom e eu recomendo." O que está errado?',
    opts: [
      'Nada — a recomendação é o objetivo da resenha',
      'A avaliação é subjetiva e não-fundamentada — falta especificar o que é bom, para quem e por quê',
      'Resenhas não fazem recomendações',
      'O tom é informal demais',
    ],
    ok:   1,
    exp:  '"Muito bom" é julgamento sem critério. Uma avaliação crítica precisa especificar: o que funciona (construção dos personagens? ritmo narrativo? uso da linguagem?), para qual leitor (quem tolerará a lentidão da prosa? quem se beneficiará do contexto histórico?), e por quê o livro merece atenção no cenário atual. Crítica sem argumento é preferência disfarçada de análise.',
  },
];
export function renderRedacao() {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Redação</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid);font-family:var(--font-body);font-size:var(--text-base);line-height:1.75">
        Escrever bem é escrever com intenção. Este módulo ensina três gêneros
        argumentativos com alta demanda escolar e profissional: a dissertação,
        a carta argumentativa e a resenha. Para cada um: estrutura, critérios
        de avaliação, construtor guiado e exemplos comentados.
      </p>
    </div>

    <div style="border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);display:flex;gap:0;flex-wrap:wrap" role="tablist" id="comp-tabs"></div>

    <div id="comp-panel"></div>
  `;

  const tabsEl  = page.querySelector('#comp-tabs');
  const panelEl = page.querySelector('#comp-panel');

  const TABS = [
    { id: 'tipos',      label: 'Tipos Textuais' },
    { id: 'builder',    label: 'Construtor' },
    { id: 'examples',   label: 'Exemplos Comentados' },
    { id: 'exercicios', label: 'Exercícios' },
  ];

  let activeTab = 'tipos';

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
    if (activeTab === 'tipos')      panelEl.appendChild(renderTiposTab());
    if (activeTab === 'builder')    panelEl.appendChild(renderBuilderTab());
    if (activeTab === 'examples')   panelEl.appendChild(renderExamplesTab());
    if (activeTab === 'exercicios') panelEl.appendChild(renderExerciciosTab());
  }

  renderTabs();
  renderPanel();
  return page;
}

/* ================================================================
   ABA 1 — TIPOS TEXTUAIS
   ================================================================ */

function renderTiposTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-6);max-width:var(--content-width)';

  TIPOS.forEach(tipo => {
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
      <div style="flex:1">
        <p style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-ink);font-weight:600;margin-bottom:var(--space-1)">${tipo.nome}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${tipo.contexto}</p>
      </div>
      <span class="chevron" aria-hidden="true" style="font-size:10px;color:var(--color-ink-ghost);flex-shrink:0;transition:transform 0.2s ease">▼</span>
    `;
    header.addEventListener('mouseenter', () => { header.style.background = 'var(--color-paper-dark)'; });
    header.addEventListener('mouseleave', () => { header.style.background = 'none'; });

    const body = document.createElement('div');
    body.style.cssText = 'display:none;border-top:1px solid var(--color-paper-border)';
    body.appendChild(buildTipoBody(tipo));

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
 * @param {object} tipo
 * @returns {HTMLElement}
 */
function buildTipoBody(tipo) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:var(--space-6)';

  // Objetivo
  const obj = document.createElement('div');
  obj.style.cssText = 'margin-bottom:var(--space-5);padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-radius:var(--radius);border-left:3px solid var(--color-accent)';
  obj.innerHTML = `
    <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-1)">Objetivo</p>
    <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.65">${tipo.objetivo}</p>
  `;
  wrap.appendChild(obj);

  // Estrutura
  const structTitle = document.createElement('p');
  structTitle.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)';
  structTitle.textContent = 'Estrutura';
  wrap.appendChild(structTitle);

  tipo.estrutura.forEach((parte, idx) => {
    if (idx > 0) {
      const div = document.createElement('div');
      div.style.cssText = 'height:1px;background:var(--color-paper-border);margin:var(--space-4) 0';
      wrap.appendChild(div);
    }

    const block = document.createElement('div');
    block.innerHTML = `
      <div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-2)">
        <span style="
          font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
          background:var(--color-ink);color:var(--color-paper);
          padding:2px 8px;border-radius:var(--radius);flex-shrink:0;
        ">${idx + 1}</span>
        <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;color:var(--color-ink)">${parte.parte}</p>
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-left:auto">${parte.tamanho}</p>
      </div>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.65;margin-bottom:var(--space-3)">${parte.funcao}</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-2)">
        ${parte.dicas.map(d => `
          <li style="
            font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);
            padding:var(--space-2) var(--space-3);
            background:var(--color-paper-dark);border-radius:var(--radius);
            border-left:2px solid var(--color-gold);line-height:1.55;
          ">
            <span style="color:var(--color-gold);font-weight:700;margin-right:var(--space-2)">→</span>${d}
          </li>
        `).join('')}
      </ul>
    `;
    wrap.appendChild(block);
  });

  // Critérios
  const div = document.createElement('div');
  div.style.cssText = 'height:1px;background:var(--color-paper-border);margin:var(--space-6) 0';
  wrap.appendChild(div);

  const critTitle = document.createElement('p');
  critTitle.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)';
  critTitle.textContent = 'Critérios de avaliação';
  wrap.appendChild(critTitle);

  const critGrid = document.createElement('div');
  critGrid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-3)';

  tipo.criterios.forEach(crit => {
    const chip = document.createElement('div');
    chip.style.cssText = `
      background:var(--color-paper-dark);border:1px solid var(--color-paper-border);
      border-radius:var(--radius);padding:var(--space-6) var(--space-6);
    `;
    chip.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:var(--color-ink);margin-bottom:var(--space-2)">${crit.label}</p>
      <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.6">${crit.desc}</p>
    `;
    critGrid.appendChild(chip);
  });

  wrap.appendChild(critGrid);
  return wrap;
}

/* ================================================================
   ABA 2 — CONSTRUTOR
   ================================================================ */

function renderBuilderTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'max-width:var(--content-width)';

  // Seletor de tipo
  let selectedTipo = TIPOS[0];
  let checklistState = {};

  const selectorWrap = document.createElement('div');
  selectorWrap.style.cssText = 'display:flex;gap:var(--space-2);margin-bottom:var(--space-6);flex-wrap:wrap';

  const builderBody = document.createElement('div');

  function buildSelector() {
    selectorWrap.innerHTML = '';
    const label = document.createElement('p');
    label.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);width:100%;margin-bottom:var(--space-1)';
    label.textContent = 'Escolha o tipo textual';
    selectorWrap.appendChild(label);

    TIPOS.forEach(tipo => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        font-family:var(--font-ui);font-size:var(--text-sm);
        padding:var(--space-2) var(--space-5);border-radius:var(--radius);
        border:1.5px solid ${tipo.id === selectedTipo.id ? 'var(--color-accent)' : 'var(--color-paper-border)'};
        background:${tipo.id === selectedTipo.id ? 'var(--color-accent)' : 'var(--color-paper-dark)'};
        color:${tipo.id === selectedTipo.id ? 'var(--color-paper)' : 'var(--color-ink-mid)'};
        cursor:pointer;transition:all var(--transition-fast);
      `;
      btn.textContent = tipo.nome;
      btn.addEventListener('click', () => {
        selectedTipo = tipo;
        checklistState = {};
        buildSelector();
        buildBuilderBody();
      });
      selectorWrap.appendChild(btn);
    });
  }

  function buildBuilderBody() {
    builderBody.innerHTML = '';

    // Campos por seção
    const fieldsWrap = document.createElement('div');
    fieldsWrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-5);margin-bottom:var(--space-8)';

    selectedTipo.estrutura.forEach((parte, idx) => {
      const fieldBlock = document.createElement('div');
      fieldBlock.style.cssText = `
        border:1px solid var(--color-paper-border);
        border-radius:var(--radius);
        overflow:hidden;
        background:var(--color-paper);
      `;
      fieldBlock.innerHTML = `
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-bottom:1px solid var(--color-paper-border);display:flex;align-items:center;gap:var(--space-3)">
          <span style="
            font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;
            background:var(--color-ink);color:var(--color-paper);
            padding:2px 8px;border-radius:var(--radius);
          ">${idx + 1}</span>
          <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:600;color:var(--color-ink);flex:1">${parte.parte}</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">${parte.tamanho}</p>
        </div>
        <div style="padding:var(--space-4) var(--space-5)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-bottom:var(--space-3)">${parte.funcao}</p>
          <textarea
            id="field-${idx}"
            placeholder="Escreva aqui o ${parte.parte.toLowerCase()}..."
            style="
              width:100%;box-sizing:border-box;
              font-family:var(--font-body);font-size:var(--text-base);
              color:var(--color-ink);background:var(--color-paper-dark);
              border:1.5px solid var(--color-paper-border);border-radius:var(--radius);
              padding:var(--space-3) var(--space-4);resize:vertical;
              outline:none;line-height:1.7;min-height:100px;
              transition:border-color var(--transition-fast);
            "
          ></textarea>
          <p id="wc-${idx}" style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-1);text-align:right">0 palavras</p>
        </div>
      `;
      fieldsWrap.appendChild(fieldBlock);

      // Contador de palavras por campo
      const textarea = fieldBlock.querySelector(`#field-${idx}`);
      const wcEl     = fieldBlock.querySelector(`#wc-${idx}`);
      textarea.addEventListener('input', () => {
        const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
        wcEl.textContent = `${words} palavra${words !== 1 ? 's' : ''}`;
        updateChecklist();
      });
      textarea.addEventListener('focus', () => { textarea.style.borderColor = 'var(--color-accent)'; });
      textarea.addEventListener('blur',  () => { textarea.style.borderColor = 'var(--color-paper-border)'; });
    });

    builderBody.appendChild(fieldsWrap);

    // Checklist de critérios (atualiza em tempo real)
    const checkWrap = document.createElement('div');
    checkWrap.id = 'builder-checklist';
    checkWrap.style.cssText = `
      border:1px solid var(--color-paper-border);
      border-radius:var(--radius);
      overflow:hidden;
      background:var(--color-paper);
    `;

    function updateChecklist() {
      const allFields = selectedTipo.estrutura.map((_, i) => {
        const ta = builderBody.querySelector(`#field-${i}`);
        return ta ? ta.value.trim() : '';
      });
      const filled     = allFields.filter(v => v.length > 30).length;
      const total      = selectedTipo.estrutura.length;
      const percent    = Math.round((filled / total) * 100);

      checkWrap.innerHTML = `
        <div style="padding:var(--space-6) var(--space-6);background:var(--color-paper-dark);border-bottom:1px solid var(--color-paper-border)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Progresso</p>
          <div style="height:6px;background:var(--color-paper-border);border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${percent}%;background:${percent === 100 ? 'var(--color-green)' : 'var(--color-accent)'};border-radius:3px;transition:width 0.3s ease"></div>
          </div>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-1)">${filled} de ${total} seções preenchidas</p>
        </div>
        <div style="padding:var(--space-4) var(--space-5);display:flex;flex-direction:column;gap:var(--space-3)">
          ${selectedTipo.criterios.map(crit => {
            // Critério ativado se ao menos metade dos campos têm conteúdo
            const active = filled >= Math.ceil(total / 2);
            return `
              <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
                <span style="
                  flex-shrink:0;width:18px;height:18px;
                  border-radius:50%;margin-top:2px;
                  background:${active ? 'var(--color-green)' : 'var(--color-paper-border)'};
                  display:flex;align-items:center;justify-content:center;
                  font-size:10px;color:var(--color-paper);font-weight:700;
                ">${active ? '✓' : ''}</span>
                <div>
                  <p style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:600;color:${active ? 'var(--color-ink)' : 'var(--color-ink-ghost)'};margin-bottom:2px">${crit.label}</p>
                  <p style="font-family:var(--font-body);font-size:var(--text-xs);color:var(--color-ink-ghost);line-height:1.5">${crit.desc}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    updateChecklist();
    builderBody.appendChild(checkWrap);
  }

  buildSelector();
  buildBuilderBody();

  wrap.appendChild(selectorWrap);
  wrap.appendChild(builderBody);
  return wrap;
}

/* ================================================================
   ABA 3 — EXEMPLOS COMENTADOS
   ================================================================ */

function renderExamplesTab() {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-8);max-width:var(--content-width)';

  EXEMPLOS.forEach((ex, ei) => {
    if (ei > 0) {
      const div = document.createElement('div');
      div.style.cssText = 'height:1px;background:var(--color-paper-border)';
      wrap.appendChild(div);
    }

    const block = document.createElement('div');

    const tipoInfo = TIPOS.find(t => t.id === ex.tipo);

    block.innerHTML = `
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-1)">${tipoInfo ? tipoInfo.nome : ex.tipo}</p>
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);color:var(--color-ink);margin-bottom:var(--space-1)">${ex.titulo}</h2>
      <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-ghost);margin-bottom:var(--space-6)">Tema: ${ex.tema}</p>
    `;

    ex.texto.forEach((section, si) => {
      const sBlock = document.createElement('div');
      sBlock.style.cssText = `margin-bottom:var(--space-5)`;

      sBlock.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">${section.parte}</p>
        <div style="display:grid;grid-template-columns:1fr 300px;gap:var(--space-5);align-items:start" class="example-row">
          <div style="
            background:var(--color-paper-dark);
            border:1px solid var(--color-paper-border);
            border-left:3px solid var(--color-ink);
            border-radius:var(--radius);
            padding:var(--space-5);
          ">
            <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink);line-height:1.8">${section.texto}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${section.notas.map(nota => `
              <div style="
                background:var(--color-paper-dark);
                border:1px solid var(--color-paper-border);
                border-left:3px solid var(--color-gold);
                border-radius:var(--radius);
                padding:var(--space-3) var(--space-4);
              ">
                <p style="font-family:var(--font-body);font-size:var(--text-xs);color:var(--color-ink-mid);line-height:1.55">${nota}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      block.appendChild(sBlock);
    });

    wrap.appendChild(block);
  });

  // Nota sobre o layout em telas pequenas
  const note = document.createElement('p');
  note.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-2)';
  note.textContent = 'Nota: em telas estreitas, o texto e as anotações aparecem em coluna.';
  wrap.appendChild(note);

  return wrap;
}

/* ================================================================
   ABA 4 — EXERCÍCIOS
   ================================================================ */

function renderExerciciosTab() {
  const wrap = document.createElement('div');
  wrap.style.maxWidth = 'var(--content-width)';

  let idx     = 0;
  let acertos = 0;
  const total = EXERCICIOS.length;

  function renderQ() {
    wrap.innerHTML = '';

    if (idx >= total) {
      wrap.innerHTML = `
        <div style="text-align:center;padding:var(--space-12) 0">
          <p style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:700;color:var(--color-ink);margin-bottom:var(--space-4)">${acertos}/${total}</p>
          <p style="font-family:var(--font-body);font-size:var(--text-lg);color:var(--color-ink-mid);margin-bottom:var(--space-8)">
            ${acertos === total ? 'Excelente domínio dos conceitos de redação.' :
              acertos >= total * 0.7 ? 'Bom resultado — revise os pontos em que errou.' :
              'Revise os tipos textuais e os critérios de cada gênero.'}
          </p>
          <button type="button" class="btn btn-primary" id="comp-restart">Refazer</button>
        </div>
      `;
      wrap.querySelector('#comp-restart').addEventListener('click', () => {
        idx = 0; acertos = 0; renderQ();
      });
      return;
    }

    const q = EXERCICIOS[idx];

    // Progresso
    const prog = document.createElement('div');
    prog.style.cssText = 'display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-6);font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)';
    prog.innerHTML = `
      <span>${idx + 1} / ${total}</span>
      <div style="flex:1;height:2px;background:var(--color-paper-border);border-radius:1px">
        <div style="height:100%;width:${((idx)/total)*100}%;background:var(--color-accent);border-radius:1px;transition:width 0.3s"></div>
      </div>
      <span>${acertos} corretas</span>
    `;
    wrap.appendChild(prog);

    // Enunciado
    const enun = document.createElement('div');
    enun.style.cssText = 'font-family:var(--font-ui);font-size:var(--text-base);color:var(--color-ink);background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6);margin-bottom:var(--space-6);line-height:1.6';
    enun.textContent = q.inst;
    wrap.appendChild(enun);

    // Opções
    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6)';

    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = 'text-align:left;font-family:var(--font-body);font-size:var(--text-base);padding:var(--space-4) var(--space-6);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);cursor:pointer;transition:all var(--transition-fast);display:flex;align-items:flex-start;gap:var(--space-3)';
      btn.innerHTML = `
        <span style="font-family:var(--font-ui);font-size:var(--text-sm);font-weight:700;width:1.4rem;height:1.4rem;border:1.5px solid currentColor;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">${String.fromCharCode(65+i)}</span>
        <span>${opt}</span>
      `;
      btn.addEventListener('mouseover', () => { btn.style.background = 'var(--color-paper-dark)'; });
      btn.addEventListener('mouseout',  () => { btn.style.background = 'var(--color-paper)'; });
      btn.addEventListener('click', () => {
        const correct = i === q.ok;
        if (correct) acertos++;

        // Feedback visual em todas as opções
        list.querySelectorAll('button').forEach((b, j) => {
          b.disabled = true;
          b.style.cursor = 'default';
          if (j === q.ok) {
            b.style.borderColor = 'var(--color-green)';
            b.style.background  = 'rgba(42,92,42,0.06)';
            b.style.color       = 'var(--color-green)';
          } else if (j === i && !correct) {
            b.style.borderColor = 'var(--color-accent)';
            b.style.background  = 'rgba(139,26,26,0.06)';
            b.style.color       = 'var(--color-accent)';
          }
        });

        // Explicação
        const fb = document.createElement('div');
        fb.style.cssText = `border-radius:var(--radius);padding:var(--space-6);margin-bottom:var(--space-6);border:1px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'};background:${correct ? 'rgba(42,92,42,0.06)' : 'rgba(139,26,26,0.06)'}`;
        fb.innerHTML = `
          <p style="font-family:var(--font-ui);font-weight:700;font-size:var(--text-sm);text-transform:uppercase;letter-spacing:0.08em;color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};margin-bottom:var(--space-2)">${correct ? 'Correto' : 'Incorreto'}</p>
          <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7">${q.exp}</p>
        `;
        wrap.appendChild(fb);

        // Botão avançar
        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'btn btn-primary';
        next.textContent = idx + 1 < total ? 'Próxima →' : 'Ver resultado';
        next.addEventListener('click', () => { idx++; renderQ(); });
        wrap.appendChild(next);
      });
      list.appendChild(btn);
    });

    wrap.appendChild(list);
  }

  renderQ();
  return wrap;
}
