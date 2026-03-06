/**
 * syntax.js — Módulo de Sintaxe e Construção de Frases
 *
 * O usuário reorganiza tokens embaralhados para reconstruir frases corretas.
 * Usa drag-and-drop nativo (HTML5 Drag API) com fallback por clique.
 *
 * Banco: 25 frases distribuídas em três níveis.
 * Navegação: uma frase por vez com filtros por nível e conceito.
 *
 * Conceitos cobertos:
 *   Básico (8):        ordem SVO, OD/OI, predicativo, verbo de ligação,
 *                      negação, pronome clítico, locução verbal, interrogativa
 *   Intermediário (10): adjunto deslocado, sujeito oracional, voz passiva,
 *                       aposto, vocativo, oração relativa, coordenação adversativa,
 *                       gerúndio, discurso indireto, ordem enfática
 *   Avançado (7):      indeterminação, hipérbato, subordinação causal,
 *                      sujeito oracional infinitivo, próclise, anacoluto,
 *                      inversão poética + oração consecutiva
 */

/* ================================================================
   BANCO DE FRASES
   ================================================================ */

const SENTENCES = [

  /* ── BÁSICO ─────────────────────────────────────────────────── */

  {
    id: 'b01',
    level: 'basico',
    concept: 'Ordem básica: Sujeito + Verbo + Adjunto',
    original: 'O menino correu pela rua escura.',
    explanation:
      'A ordem mais natural em português é Sujeito → Verbo → Complementos. '
      + '"O menino" é o sujeito (quem agiu). "correu" é o verbo. '
      + '"pela rua escura" é o adjunto adverbial de lugar.',
  },

  {
    id: 'b02',
    level: 'basico',
    concept: 'Objeto direto e indireto',
    original: 'A professora leu um poema para a turma.',
    explanation:
      '"um poema" é o objeto direto — responde "leu o quê?". '
      + '"para a turma" é o objeto indireto — responde "leu para quem?". '
      + 'O sujeito agente é "a professora".',
  },

  {
    id: 'b03',
    level: 'basico',
    concept: 'Predicativo do sujeito com verbo de ligação',
    original: 'O céu ficou vermelho depois da tempestade.',
    explanation:
      '"ficou" é verbo de ligação: conecta sujeito e predicativo sem exprimir ação. '
      + '"vermelho" é o predicativo — descreve o estado em que o céu ficou. '
      + '"depois da tempestade" é adjunto adverbial de tempo.',
  },

  {
    id: 'b04',
    level: 'basico',
    concept: 'Negação com advérbio antes do verbo',
    original: 'Ela não respondeu nenhuma das perguntas.',
    explanation:
      '"não" é advérbio de negação — posicionado imediatamente antes do verbo. '
      + '"nenhuma das perguntas" é objeto direto com determinante negativo. '
      + 'Em português, dupla negação é gramatical e reforça a negação.',
  },

  {
    id: 'b05',
    level: 'basico',
    concept: 'Pronome oblíquo como objeto direto',
    original: 'O diretor o chamou três vezes.',
    explanation:
      '"o" é pronome oblíquo átono funcionando como objeto direto — '
      + 'substitui a pessoa chamada. "três vezes" é adjunto adverbial de frequência. '
      + 'A posição antes do verbo (próclise) é o padrão no português brasileiro.',
  },

  {
    id: 'b06',
    level: 'basico',
    concept: 'Locução verbal com auxiliar + gerúndio',
    original: 'As crianças estavam brincando no jardim.',
    explanation:
      '"estavam brincando" é locução verbal: "estavam" é o auxiliar '
      + '(situa no tempo) e "brincando" é o gerúndio (exprime a ação). '
      + 'Juntos formam o pretérito imperfeito do progressivo.',
  },

  {
    id: 'b07',
    level: 'basico',
    concept: 'Verbo ser + predicativo nominal',
    original: 'A maior riqueza de um país é a sua educação.',
    explanation:
      '"é" é verbo de ligação. O sujeito é "a maior riqueza de um país". '
      + '"a sua educação" é o predicativo do sujeito. '
      + 'A ordem pode ser invertida sem perda de sentido: '
      + '"A sua educação é a maior riqueza de um país."',
  },

  {
    id: 'b08',
    level: 'basico',
    concept: 'Frase interrogativa direta',
    original: 'Por que você não veio ontem à aula?',
    explanation:
      '"Por que" é o pronome/advérbio interrogativo que inicia a pergunta. '
      + '"você" é o sujeito. "não veio" é o predicado negado. '
      + '"ontem" e "à aula" são adjuntos adverbiais de tempo e lugar.',
  },

  /* ── INTERMEDIÁRIO ───────────────────────────────────────────── */

  {
    id: 'i01',
    level: 'intermediario',
    concept: 'Adjunto adverbial deslocado para ênfase',
    original: 'Aos poucos, a cidade foi esquecendo o nome do poeta.',
    explanation:
      '"Aos poucos" está deslocado para o início — a posição neutra seria ao final. '
      + 'O deslocamento cria gradualidade antes mesmo de o sujeito aparecer. '
      + '"foi esquecendo" é locução verbal no imperfeito progressivo.',
  },

  {
    id: 'i02',
    level: 'intermediario',
    concept: 'Oração subordinada como sujeito',
    original: 'Que os homens são falhos, ninguém duvida.',
    explanation:
      '"Que os homens são falhos" é oração subordinada substantiva subjetiva — '
      + 'funciona como o sujeito do verbo "duvida". '
      + 'O verbo principal fica no singular porque o sujeito oracional é um bloco unitário.',
  },

  {
    id: 'i03',
    level: 'intermediario',
    concept: 'Voz passiva analítica',
    original: 'O livro foi escrito por um autor desconhecido.',
    explanation:
      'Na voz passiva, o objeto da voz ativa torna-se sujeito. '
      + '"O livro" era o objeto direto da ativa ("alguém escreveu o livro"). '
      + '"por um autor desconhecido" é o agente da passiva.',
  },

  {
    id: 'i04',
    level: 'intermediario',
    concept: 'Aposto explicativo entre vírgulas',
    original: 'Machado de Assis, o maior escritor brasileiro, nasceu em 1839.',
    explanation:
      '"o maior escritor brasileiro" é o aposto — explica ou identifica o '
      + 'termo anterior. Apostos são separados por vírgulas e podem ser '
      + 'removidos sem destruir a estrutura da frase.',
  },

  {
    id: 'i05',
    level: 'intermediario',
    concept: 'Vocativo isolado por vírgulas',
    original: 'Você sabe, meu amigo, que isso não é verdade.',
    explanation:
      '"meu amigo" é vocativo — interpela o interlocutor sem ser sujeito nem objeto. '
      + 'É sempre isolado por vírgulas e pode aparecer no início, meio ou fim da frase.',
  },

  {
    id: 'i06',
    level: 'intermediario',
    concept: 'Oração relativa restritiva',
    original: 'O homem que lê muito conhece muitos mundos.',
    explanation:
      '"que lê muito" é oração adjetiva restritiva — restringe "o homem" '
      + 'a um tipo específico. O pronome relativo "que" retoma "o homem" '
      + 'e funciona como sujeito dentro da oração relativa.',
  },

  {
    id: 'i07',
    level: 'intermediario',
    concept: 'Coordenação adversativa com mas',
    original: 'Ele tentou muitas vezes, mas nunca conseguiu terminar o livro.',
    explanation:
      '"mas" é conjunção coordenativa adversativa — indica oposição ou contraste. '
      + 'As duas orações são sintaticamente independentes entre si. '
      + 'A vírgula antes de "mas" é facultativa mas recomendada em orações longas.',
  },

  {
    id: 'i08',
    level: 'intermediario',
    concept: 'Gerúndio como adjunto adverbial de modo',
    original: 'Ela entrou na sala sorrindo para todos.',
    explanation:
      '"sorrindo para todos" é oração reduzida de gerúndio — funciona como '
      + 'adjunto adverbial de modo respondendo "como ela entrou?". '
      + 'Orações reduzidas não têm conjunção e o verbo está em forma nominal.',
  },

  {
    id: 'i09',
    level: 'intermediario',
    concept: 'Discurso indireto com oração completiva',
    original: 'Ele disse que não voltaria mais para aquela cidade.',
    explanation:
      '"que não voltaria mais para aquela cidade" é oração subordinada '
      + 'substantiva objetiva direta — completa o sentido de "disse". '
      + 'No discurso indireto, os tempos verbais recuam: "voltar" → "voltaria".',
  },

  {
    id: 'i10',
    level: 'intermediario',
    concept: 'Predicativo antecipado para ênfase',
    original: 'Muito cruel foi a resposta que ele deu.',
    explanation:
      'A ordem neutra seria "A resposta que ele deu foi muito cruel." '
      + 'Antecipar "Muito cruel" enfatiza o predicativo antes do sujeito. '
      + 'Recurso frequente em literatura e retórica para impacto dramático.',
  },

  /* ── AVANÇADO ────────────────────────────────────────────────── */

  {
    id: 'a01',
    level: 'avancado',
    concept: 'Indeterminação do sujeito com se',
    original: 'Nunca se soube ao certo por que razão ele partiu sem despedida.',
    explanation:
      '"se" após "soube" é o índice de indeterminação do sujeito — a ação '
      + 'aconteceu mas não sabemos quem não soube. '
      + '"por que razão ele partiu sem despedida" é oração subordinada '
      + 'substantiva objetiva direta: o conteúdo do que não se soube.',
  },

  {
    id: 'a02',
    level: 'avancado',
    concept: 'Hipérbato: inversão da ordem canônica',
    original: 'Das flores o perfume suave encheu o quarto.',
    explanation:
      'Hipérbato é a inversão da ordem natural dos termos para efeito estilístico. '
      + 'A ordem neutra seria: "O perfume suave das flores encheu o quarto." '
      + 'A inversão desloca "das flores" para o início, dando-lhe proeminência.',
  },

  {
    id: 'a03',
    level: 'avancado',
    concept: 'Subordinação adverbial causal anteposta',
    original: 'Porque chegou tarde, perdeu os primeiros minutos da peça.',
    explanation:
      '"Porque chegou tarde" é oração subordinada adverbial causal. '
      + 'Anteposta ao efeito, ela cria expectativa antes da consequência. '
      + 'A ordem inversa ("Perdeu... porque chegou tarde") é mais neutra e explicativa.',
  },

  {
    id: 'a04',
    level: 'avancado',
    concept: 'Oração reduzida de infinitivo como sujeito',
    original: 'Escrever todos os dias é a única forma de melhorar.',
    explanation:
      '"Escrever todos os dias" é oração reduzida de infinitivo funcionando como sujeito. '
      + 'O verbo "é" fica no singular porque o sujeito oracional é tratado '
      + 'como bloco unitário. Equivale a: "O ato de escrever todos os dias..."',
  },

  {
    id: 'a05',
    level: 'avancado',
    concept: 'Próclise obrigatória com palavra atrativa',
    original: 'Jamais me disseram a verdade sobre o que aconteceu.',
    explanation:
      '"Jamais" é palavra atrativa que força a próclise: o pronome "me" '
      + 'vem antes do verbo. Em contexto formal, advérbios e palavras negativas '
      + '("nunca", "jamais", "não") tornam a próclise obrigatória.',
  },

  {
    id: 'a06',
    level: 'avancado',
    concept: 'Anacoluto: sujeito anunciado e abandonado',
    original: 'Essa história, eu não acredito que seja verdade.',
    explanation:
      'Anacoluto: "Essa história" é anunciado como tema mas a frase muda de '
      + 'construção e o termo fica sem função sintática definida — solto. '
      + 'Imita a fala natural e cria informalidade ou ênfase emocional.',
  },

  {
    id: 'a07',
    level: 'avancado',
    concept: 'Inversão poética + oração consecutiva',
    original: 'Tão grande era o silêncio que ninguém ousou falar.',
    explanation:
      'A ordem neutra seria: "O silêncio era tão grande que ninguém ousou falar." '
      + 'A inversão antecipa o predicativo "tão grande" para intensificar o impacto. '
      + '"que ninguém ousou falar" é oração consecutiva: exprime a consequência do grau.',
  },

  /* ── NOVOS — INTERMEDIÁRIO ──────────────────────────────────── */

  {
    id: 'i11',
    level: 'intermediario',
    concept: 'Oração subordinada adverbial temporal',
    original: 'Quando a chuva parou, as crianças saíram para brincar.',
    explanation:
      '"Quando a chuva parou" é oração subordinada adverbial temporal — indica o momento '
      + 'em que a ação da oração principal ocorreu. '
      + '"as crianças saíram para brincar" é a oração principal. '
      + 'A temporal pode ser posposta: "As crianças saíram para brincar quando a chuva parou."',
  },

  {
    id: 'i12',
    level: 'intermediario',
    concept: 'Predicado verbal com locução verbal passiva',
    original: 'O manuscrito foi encontrado por um arqueólogo.',
    explanation:
      'Voz passiva com agente da passiva: "O manuscrito" é sujeito paciente. '
      + '"foi encontrado" é locução verbal passiva (verbo ser + particípio). '
      + '"por um arqueólogo" é agente da passiva — quem praticou a ação. '
      + 'Voz ativa equivalente: "Um arqueólogo encontrou o manuscrito."',
  },

  {
    id: 'i13',
    level: 'intermediario',
    concept: 'Oração coordenada aditiva com sujeito elíptico',
    original: 'Ela estudou durante horas e conseguiu a aprovação.',
    explanation:
      '"Ela estudou durante horas" é a primeira oração coordenada. '
      + '"conseguiu a aprovação" é a segunda — coordenada aditiva por "e". '
      + 'O sujeito da segunda oração é elíptico: "ela" está subentendido pela desinência de "conseguiu". '
      + 'Coordenação não cria hierarquia entre as orações — ambas têm o mesmo nível sintático.',
  },

  {
    id: 'i14',
    level: 'intermediario',
    concept: 'Objeto direto preposicionado',
    original: 'Todos amavam a Beatriz.',
    explanation:
      '"Amavam" é verbo transitivo direto — não exige preposição. '
      + 'O objeto direto é "a Beatriz" — a preposição "a" antes de pronome pessoal oblíquo ou nome próprio '
      + 'não transforma o OD em OI: é objeto direto preposicionado, recurso para evitar ambiguidade '
      + '("Deus amava os homens" vs "Deus amava a Beatriz").',
  },

  {
    id: 'i15',
    level: 'intermediario',
    concept: 'Oração relativa explicativa com vírgulas',
    original: 'Camões, que viveu no século XVI, é o maior poeta da língua portuguesa.',
    explanation:
      '"que viveu no século XVI" é oração relativa explicativa — separada por vírgulas, '
      + 'acrescenta informação sobre Camões sem restringir o referente. '
      + 'Diferença: restritiva (sem vírgulas) limita o conjunto; '
      + 'explicativa (com vírgulas) comenta o referente já determinado.',
  },

  /* ── NOVOS — AVANÇADO ───────────────────────────────────────── */

  {
    id: 'a08',
    level: 'avancado',
    concept: 'Sujeito oracional com verbo no infinitivo impessoal',
    original: 'Estudar língua portuguesa é dominar o próprio pensamento.',
    explanation:
      '"Estudar língua portuguesa" é o sujeito — uma oração reduzida de infinitivo. '
      + '"é" é verbo de ligação. '
      + '"dominar o próprio pensamento" é predicativo do sujeito — também oração reduzida de infinitivo. '
      + 'Quando um infinitivo funciona como sujeito, não varia em pessoa: "estudar" (e não "estudares").',
  },

  {
    id: 'a09',
    level: 'avancado',
    concept: 'Tmese: separação do prefixo para ênfase',
    original: 'Ele tem umas ideias assim meio esquisitas.',
    explanation:
      'Tmese coloquial: "meio esquisitas" usa "meio" como advérbio modificando o adjetivo, '
      + 'mas a intercalação de "assim" cria uma pausa que amplia o efeito oral. '
      + 'A ordem neutra seria "umas ideias meio esquisitas assim". '
      + 'A reordenação distribui a ênfase e imita o ritmo da fala natural.',
  },

  {
    id: 'a10',
    level: 'avancado',
    concept: 'Período com oração condicional no irrealismo',
    original: 'Se ele tivesse estudado, teria passado na prova.',
    explanation:
      '"Se ele tivesse estudado" é oração subordinada adverbial condicional no imperfeito do subjuntivo — '
      + 'exprime condição que não se realizou (irrealismo). '
      + '"teria passado" é a apódose com futuro do pretérito — consequência hipotética. '
      + 'O período hipotético do irrealismo sempre usa: "se + imperfeito do subjuntivo" + "futuro do pretérito".',
  },

  {
    id: 'a11',
    level: 'avancado',
    concept: 'Gerúndio composto indicando ação anterior',
    original: 'Tendo terminado o trabalho, ele foi dormir.',
    explanation:
      '"Tendo terminado o trabalho" é oração reduzida de gerúndio composto — '
      + 'indica que a ação ocorreu antes da ação da oração principal. '
      + 'O gerúndio composto (tendo + particípio) marca anterioridade: '
      + 'primeiro terminou, depois foi dormir. '
      + 'Equivalente à subordinada temporal: "Depois que terminou o trabalho, ele foi dormir."',
  },

  {
    id: 'a12',
    level: 'avancado',
    concept: 'Pleonasmo de objeto — pronome e substantivo',
    original: 'Esse livro eu não li ele.',
    explanation:
      'Pleonasmo de objeto: "esse livro" (OD deslocado para ênfase) e "ele" (pronome anafórico) '
      + 'retomam o mesmo referente — construção característica do português popular. '
      + 'Na norma padrão: "Esse livro eu não li" ou "Não li esse livro". '
      + 'O pleonasmo, embora rejeitado no texto formal, é sistemático na fala e tem função de topicalização.',
  },

];

/* ================================================================
   RENDERIZAÇÃO PRINCIPAL
   ================================================================ */

/**
 * @returns {HTMLElement}
 */
export function renderSintaxe() {
  const page = document.createElement('div');

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Sintaxe e Construção</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        A ordem das palavras em português não é arbitrária — cada escolha afeta
        o sentido, o ritmo e a ênfase. Reorganize os fragmentos para reconstruir
        as frases e entenda a estrutura por trás de cada uma.
      </p>
    </div>

    <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:flex-end;margin-bottom:var(--space-6);max-width:var(--content-width)">
      <div>
        <label style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-1)">Nível</label>
        <select id="syn-nivel" style="font-family:var(--font-ui);font-size:var(--text-sm);padding:var(--space-2) var(--space-3);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink)">
          <option value="">Todos</option>
          <option value="basico">Básico</option>
          <option value="intermediario">Intermediário</option>
          <option value="avancado">Avançado</option>
        </select>
      </div>
      <div>
        <label style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-1)">Conceito</label>
        <select id="syn-concept" style="font-family:var(--font-ui);font-size:var(--text-sm);padding:var(--space-2) var(--space-3);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);max-width:300px">
          <option value="">Todos</option>
        </select>
      </div>
      <div style="margin-left:auto;font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);align-self:center" id="syn-counter"></div>
    </div>

    <div style="max-width:var(--content-width)">
      <div id="syn-area"></div>
      <div id="syn-nav" style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-6);padding-top:var(--space-4);border-top:1px solid var(--color-paper-border)"></div>
    </div>
  `;

  const selNivel   = page.querySelector('#syn-nivel');
  const selConcept = page.querySelector('#syn-concept');
  const counter    = page.querySelector('#syn-counter');
  const area       = page.querySelector('#syn-area');
  const navEl      = page.querySelector('#syn-nav');

  // Preenche filtro de conceitos
  SENTENCES.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.concept;
    opt.textContent = s.concept;
    selConcept.appendChild(opt);
  });

  let filtered = [...SENTENCES];
  let index    = 0;

  const getFiltered = () => SENTENCES.filter(s =>
    (!selNivel.value   || s.level   === selNivel.value) &&
    (!selConcept.value || s.concept === selConcept.value)
  );

  const render = () => {
    area.innerHTML  = '';
    navEl.innerHTML = '';

    if (!filtered.length) {
      area.innerHTML = `<p style="font-family:var(--font-body);color:var(--color-ink-ghost)">Nenhuma frase encontrada com esses filtros.</p>`;
      counter.textContent = '';
      return;
    }

    index = Math.max(0, Math.min(index, filtered.length - 1));
    counter.textContent = `${index + 1} de ${filtered.length}`;
    area.appendChild(createSentenceExercise(filtered[index]));

    // Botão anterior
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'btn btn-secondary';
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = index === 0;
    prevBtn.addEventListener('click', () => { index--; render(); area.scrollIntoView({ behavior: 'smooth', block: 'start' }); });

    // Indicador de posição (pontos clicáveis)
    const dots = document.createElement('div');
    dots.style.cssText = 'display:flex;gap:var(--space-2);align-items:center;flex-wrap:wrap;justify-content:center;max-width:240px';
    filtered.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.title = filtered[i].concept;
      dot.style.cssText = `
        width:8px;height:8px;border-radius:50%;cursor:pointer;
        background:${i === index ? 'var(--color-accent)' : 'var(--color-paper-border)'};
        transition:background var(--transition-fast);
        flex-shrink:0;
      `;
      dot.addEventListener('click', () => { index = i; render(); });
      dots.appendChild(dot);
    });

    // Botão próxima
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = index === filtered.length - 1 ? 'Fim' : 'Próxima →';
    nextBtn.disabled = index === filtered.length - 1;
    nextBtn.addEventListener('click', () => { index++; render(); area.scrollIntoView({ behavior: 'smooth', block: 'start' }); });

    navEl.appendChild(prevBtn);
    navEl.appendChild(dots);
    navEl.appendChild(nextBtn);
  };

  selNivel.addEventListener('change',   () => { filtered = getFiltered(); index = 0; render(); });
  selConcept.addEventListener('change', () => { filtered = getFiltered(); index = 0; render(); });

  render();
  return page;
}

/* ================================================================
   EXERCÍCIO INDIVIDUAL
   ================================================================ */

/**
 * Cria o widget de reorganização de tokens para uma frase.
 * @param {object} sentence
 * @returns {HTMLElement}
 */
function createSentenceExercise(sentence) {
  const section = document.createElement('section');

  // Badges de nível e conceito
  const tagRow = document.createElement('div');
  tagRow.style.cssText = 'display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-4)';
  tagRow.innerHTML = `
    <span style="font-family:var(--font-ui);font-size:var(--text-xs);padding:2px 10px;border-radius:var(--radius);background:var(--color-paper-border);color:var(--color-ink-ghost)">${nivelLabel(sentence.level)}</span>
    <span class="tag">${sentence.concept}</span>
  `;
  section.appendChild(tagRow);

  // Instrução
  const instr = document.createElement('div');
  instr.className = 'exercise-instruction';
  instr.innerHTML = '<strong>Reorganize os fragmentos</strong> para formar a frase correta. Arraste ou clique para mover.';
  instr.style.marginBottom = 'var(--space-4)';
  section.appendChild(instr);

  const tokens = shuffleTokens(sentence.original);

  // Área de origem
  section.appendChild(makePoolLabel('Fragmentos disponíveis'));
  const sourcePool = makePool(`source-${sentence.id}`, 'Fragmentos para arrastar');
  section.appendChild(sourcePool);

  // Área de destino
  section.appendChild(makePoolLabel('Sua frase'));
  const targetPool = makePool(`target-${sentence.id}`, 'Área para construção da frase');
  section.appendChild(targetPool);

  let draggedToken = null;

  /**
   * Cria um token arrastável.
   * @param {string} text
   * @returns {HTMLElement}
   */
  function makeToken(text) {
    const el = document.createElement('div');
    el.className = 'draggable-token';
    el.textContent = text;
    el.draggable = true;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Fragmento: ${text}`);

    el.addEventListener('dragstart', () => {
      draggedToken = el;
      setTimeout(() => el.classList.add('dragging'), 0);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      draggedToken = null;
    });
    el.addEventListener('click', () => {
      (el.parentElement === sourcePool ? targetPool : sourcePool).appendChild(el);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        (el.parentElement === sourcePool ? targetPool : sourcePool).appendChild(el);
      }
    });

    return el;
  }

  // Configura drop nas duas áreas
  [sourcePool, targetPool].forEach(pool => {
    pool.addEventListener('dragover',  e => { e.preventDefault(); pool.classList.add('drag-over'); });
    pool.addEventListener('dragleave', ()  => pool.classList.remove('drag-over'));
    pool.addEventListener('drop',      e  => {
      e.preventDefault();
      pool.classList.remove('drag-over');
      if (draggedToken) pool.appendChild(draggedToken);
    });
  });

  tokens.forEach(text => sourcePool.appendChild(makeToken(text)));

  // Feedback
  const feedback = document.createElement('div');
  feedback.className = 'exercise-feedback';
  feedback.innerHTML = '<p class="feedback-title"></p><p class="feedback-explanation"></p>';
  section.appendChild(feedback);

  // Botões
  const controls  = document.createElement('div');
  controls.className = 'exercise-controls';
  controls.style.marginTop = 'var(--space-4)';

  const checkBtn = makeBtn('btn btn-primary',  'Verificar');
  const resetBtn = makeBtn('btn btn-secondary', 'Reiniciar');
  const showBtn  = document.createElement('button');
  showBtn.type = 'button';
  showBtn.className = 'btn-ghost';
  showBtn.style.cssText = 'font-size:var(--text-xs);margin-left:auto';
  showBtn.textContent = 'Ver resposta';

  checkBtn.addEventListener('click', () => {
    const built     = Array.from(targetPool.children).map(el => el.textContent).join(' ');
    const normalize = s => s.replace(/\s+([.,;!?])/g, '$1').replace(/\s+/g, ' ').trim();
    const correct   = normalize(built) === normalize(sentence.original);

    feedback.classList.add('visible');
    feedback.classList.remove('success', 'error');
    feedback.classList.add(correct ? 'success' : 'error');
    feedback.querySelector('.feedback-title').textContent       = correct ? 'Correto' : 'Ainda não está certo';
    feedback.querySelector('.feedback-explanation').textContent = correct
      ? sentence.explanation
      : `A ordem que você montou foi: "${built}". Tente novamente ou clique em "Ver resposta".`;
  });

  resetBtn.addEventListener('click', () => {
    Array.from(targetPool.children).forEach(t => sourcePool.appendChild(t));
    feedback.classList.remove('visible', 'success', 'error');
  });

  showBtn.addEventListener('click', () => {
    const all = [
      ...Array.from(sourcePool.children),
      ...Array.from(targetPool.children),
    ];
    targetPool.innerHTML = '';
    sourcePool.innerHTML = '';
    tokenizeSentence(sentence.original).forEach(text => {
      targetPool.appendChild(all.find(t => t.textContent === text) ?? makeToken(text));
    });
    feedback.classList.add('visible', 'success');
    feedback.classList.remove('error');
    feedback.querySelector('.feedback-title').textContent       = 'Resposta';
    feedback.querySelector('.feedback-explanation').textContent = sentence.explanation;
  });

  const leftBtns = document.createElement('div');
  leftBtns.className = 'exercise-controls-left';
  leftBtns.appendChild(checkBtn);
  leftBtns.appendChild(resetBtn);
  controls.appendChild(leftBtns);
  controls.appendChild(showBtn);
  section.appendChild(controls);

  return section;
}

/* ================================================================
   UTILITÁRIOS
   ================================================================ */

function makePoolLabel(text) {
  const p = document.createElement('p');
  p.className = 'token-pool-label';
  p.textContent = text;
  return p;
}

function makePool(id, ariaLabel) {
  const el = document.createElement('div');
  el.className = 'token-pool';
  el.id = id;
  el.setAttribute('aria-label', ariaLabel);
  return el;
}

function makeBtn(cls, text) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = cls;
  btn.textContent = text;
  return btn;
}

/**
 * Embaralha tokens com Fisher-Yates, garantindo resultado diferente do original.
 * @param {string} sentence
 * @returns {string[]}
 */
function shuffleTokens(sentence) {
  const tokens = tokenizeSentence(sentence);
  for (let i = tokens.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tokens[i], tokens[j]] = [tokens[j], tokens[i]];
  }
  if (tokens.join(' ') === sentence && tokens.length >= 2) {
    [tokens[0], tokens[1]] = [tokens[1], tokens[0]];
  }
  return tokens;
}

/**
 * Divide a frase em tokens por espaço.
 * A pontuação fica colada à palavra que a precede, como na frase original.
 * @param {string} sentence
 * @returns {string[]}
 */
function tokenizeSentence(sentence) {
  return sentence.split(/\s+/).filter(Boolean);
}

/** @param {string} level @returns {string} */
function nivelLabel(level) {
  return { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado' }[level] ?? level;
}
