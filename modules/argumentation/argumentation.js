/**
 * argumentation.js — Módulo de Argumentação
 *
 * Ensina a arte de argumentar segundo a tradição da disputatio escolástica,
 * com cobertura completa de falácias formais e informais, técnicas de refutação
 * e treino prático de identificação.
 *
 * Estrutura em 6 tabs:
 *   1. Disputatio       — o método medieval de debate estruturado
 *   2. Argumento        — premissas, conclusão, validade, solidez, silogismo
 *   3. Falácias Formais — erros na estrutura lógica
 *   4. Falácias Informais — erros no conteúdo (~25 falácias)
 *   5. Como Rebater     — técnicas de refutação
 *   6. Treino           — identificação de falácias em argumentos reais
 *
 * Sem dependências externas. Funciona offline.
 */

/* ================================================================
   ENTRADA PRINCIPAL
   ================================================================ */

export function renderArgumentacao() {
  const page = document.createElement('div');

  const TABS = [
    { id: 'disputatio',  label: 'Disputatio'        },
    { id: 'argumento',   label: 'Argumento'          },
    { id: 'formais',     label: 'Falácias Formais'   },
    { id: 'informais',   label: 'Falácias Informais' },
    { id: 'rebater',     label: 'Como Rebater'       },
    { id: 'treino',      label: 'Treino'             },
  ];

  page.innerHTML = `
    <div style="margin-bottom:var(--space-8)">
      <a href="#/" class="btn btn-ghost" style="margin-bottom:var(--space-4)">← Voltar</a>
      <h1 class="section-title">Argumentação</h1>
      <p style="max-width:var(--content-width);color:var(--color-ink-mid)">
        A arte de argumentar como os doutores medievais: estrutura, lógica, falácias
        e técnicas de refutação. Quem conhece as regras do debate não pode ser enganado
        — e convence com razão, não com truques.
      </p>
    </div>

    <div style="display:flex;gap:0;border-bottom:2px solid var(--color-paper-border);margin-bottom:var(--space-8);flex-wrap:wrap" role="tablist">
      ${TABS.map((t, i) => `
        <button type="button" role="tab" class="arg-tab" data-tab="${i}"
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
      <div id="arg-panel-${i}" class="arg-panel" style="${i > 0 ? 'display:none' : ''}"></div>
    `).join('')}
  `;

  // Renderiza cada tab
  const renderers = [
    renderDisputatio,
    renderArgumento,
    renderFormais,
    renderInformais,
    renderRebater,
    renderTreino,
  ];

  TABS.forEach((_, i) => {
    renderers[i](page.querySelector(`#arg-panel-${i}`));
  });

  // Troca de tabs
  const tabs   = page.querySelectorAll('.arg-tab');
  const panels = page.querySelectorAll('.arg-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.tab, 10);
      tabs.forEach((t, i) => {
        const active = i === idx;
        t.style.color        = active ? 'var(--color-accent)' : 'var(--color-ink-ghost)';
        t.style.borderBottom = active ? '2px solid var(--color-accent)' : '2px solid transparent';
        t.setAttribute('aria-selected', active);
        panels[i].style.display = active ? '' : 'none';
      });
    });
  });

  return page;
}

/* ================================================================
   TAB 1 — DISPUTATIO
   ================================================================ */

function renderDisputatio(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">

      <div class="panel panel-info" style="margin-bottom:var(--space-8)">
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-gold);margin-bottom:var(--space-2)">Contexto histórico</p>
        <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8">
          A <em>disputatio</em> era o método central das universidades medievais (séc. XII–XV).
          Em Paris, Bologna e Oxford, doutores e estudantes debatiam publicamente qualquer
          questão filosófica ou teológica segundo um ritual rigoroso. Tomás de Aquino,
          Duns Scotus e Guilherme de Ockham foram seus maiores praticantes.
          O método exigia que o debatedor apresentasse e depois refutasse os melhores
          argumentos do adversário — antes de defender a sua própria posição.
        </p>
      </div>

      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">As quatro partes da Disputatio</h2>

      <div style="display:flex;flex-direction:column;gap:0;margin-bottom:var(--space-10);position:relative">
        <div style="position:absolute;left:23px;top:48px;bottom:48px;width:2px;background:var(--color-paper-border)"></div>
        ${[
          {
            num: 'I',
            nome: 'Quaestio',
            lat: 'A questão',
            cor: 'var(--color-accent)',
            desc: 'O moderador (ou o próprio disputante) formula a questão de forma precisa e limitada. Uma boa quaestio é específica, não retórica, e admite resposta sim/não.',
            ex: '"A vontade é mais nobre que o intelecto?" — Questão disputada por Tomás de Aquino',
          },
          {
            num: 'II',
            nome: 'Objectio',
            lat: 'A objeção',
            cor: 'var(--color-ink-light)',
            desc: 'O oponente apresenta argumentos contra a tese que será defendida. A regra de ouro: o oponente deve formular as melhores objeções possíveis — não as mais fáceis de rebater. Isso exige honestidade intelectual e conhecimento profundo do tema.',
            ex: '"Obj. 1: O que move é mais nobre que o que é movido. O intelecto move a vontade. Logo, o intelecto é mais nobre."',
          },
          {
            num: 'III',
            nome: 'Determinatio',
            lat: 'A determinação',
            cor: 'var(--color-gold)',
            desc: 'O respondente (magister) expõe sua posição com fundamentos. Não é suficiente afirmar — é preciso distinguir, provar e articular. A determinatio é o coração do método.',
            ex: '"Resp.: Deve-se dizer que a vontade é, em certo sentido, mais nobre — pois seu objeto é o bem em si, enquanto o intelecto apreende apenas a forma do bem."',
          },
          {
            num: 'IV',
            nome: 'Responsio ad Objectiones',
            lat: 'Resposta às objeções',
            cor: 'var(--color-green)',
            desc: 'O respondente retorna a cada objeção apresentada e a refuta individualmente. Não basta negar — é preciso mostrar onde o raciocínio do oponente falha, sem distorcê-lo. Esta parte separa o debatedor honesto do sofista.',
            ex: '"Ad 1: Deve-se dizer que o intelecto move a vontade apresentando-lhe o objeto — mas isso é mover por finalidade, não por superioridade. O pai move o filho ao bem sem ser necessariamente mais nobre."',
          },
        ].map(p => `
          <div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-4);position:relative">
            <div style="width:48px;height:48px;border-radius:50%;background:${p.cor};display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1">
              <span style="font-family:var(--font-display);font-size:var(--text-sm);font-weight:700;color:#fff">${p.num}</span>
            </div>
            <div style="flex:1;background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
              <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--color-ink);margin-bottom:2px">${p.nome}</p>
              <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:var(--space-3)">${p.lat}</p>
              <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-3)">${p.desc}</p>
              <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-light);background:var(--color-paper);padding:var(--space-6);border-radius:var(--radius)">${p.ex}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Princípios do debatedor honesto</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-8)">
        ${[
          ['Princípio da caridade', 'Interprete o argumento adversário na sua versão mais forte, não na mais fraca. Rebater um argumento fraco não prova nada.'],
          ['Princípio da distinção', 'Antes de contradizer, pergunte: a palavra tem mais de um sentido aqui? Muitos debates são conflitos de definição disfarçados de conflitos de fato.'],
          ['Princípio da carga da prova', 'Quem afirma deve provar. Quem nega uma afirmação extraordinária pode exigir evidência extraordinária.'],
          ['Princípio da relevância', 'Todo argumento deve ser relevante para a questão. Verdades irrelevantes não avançam o debate.'],
          ['Princípio da consistência', 'Você não pode afirmar X e Y se X e Y são contraditórios. A consistência interna é obrigatória.'],
          ['Princípio da boa-fé', 'Nunca atribua ao adversário posição que ele não sustenta. Pergunte antes de presumir.'],
        ].map(([nome, desc]) => `
          <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
            <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;color:var(--color-ink);margin-bottom:var(--space-1)">${nome}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.7">${desc}</p>
          </div>
        `).join('')}
      </div>

      <h2 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Pratique: construa uma Disputatio</h2>
      <div id="disputatio-builder"></div>
    </div>
  `;

  buildDisputatioBuilder(container.querySelector('#disputatio-builder'));
}

function buildDisputatioBuilder(container) {
  const questoes = [
    'O fim justifica os meios?',
    'A liberdade de expressão tem limites?',
    'A inteligência artificial pode ser criativa?',
    'O Estado deve regular redes sociais?',
  ];

  const questao = questoes[Math.floor(Math.random() * questoes.length)];

  container.innerHTML = `
    <div class="card">
      <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-2)">Quaestio desta sessão</p>
      <p style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-ink);margin-bottom:var(--space-6)">${questao}</p>

      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        <div>
          <label style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-2)">
            Objectio — Formule a melhor objeção possível à tese que afirma "sim"
          </label>
          <textarea id="obj-input" rows="3" placeholder="Se alguém defendesse 'sim', qual seria o argumento mais forte contra essa posição?"
            style="width:100%;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-3);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);resize:vertical;outline:none"></textarea>
        </div>
        <div>
          <label style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-2)">
            Determinatio — Sua posição e fundamentos
          </label>
          <textarea id="det-input" rows="3" placeholder="Qual é sua posição? Apresente ao menos dois fundamentos distintos."
            style="width:100%;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-3);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);resize:vertical;outline:none"></textarea>
        </div>
        <div>
          <label style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);display:block;margin-bottom:var(--space-2)">
            Responsio — Responda à objeção que você mesmo formulou
          </label>
          <textarea id="resp-input" rows="3" placeholder="Onde o argumento da objeção falha? Seja específico."
            style="width:100%;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-3);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);resize:vertical;outline:none"></textarea>
        </div>
      </div>

      <button type="button" class="btn btn-primary" id="disputatio-check" style="margin-top:var(--space-4)">Verificar estrutura</button>
      <div id="disputatio-feedback" style="margin-top:var(--space-4)"></div>
    </div>
  `;

  container.querySelector('#disputatio-check').addEventListener('click', () => {
    const obj  = container.querySelector('#obj-input').value.trim();
    const det  = container.querySelector('#det-input').value.trim();
    const resp = container.querySelector('#resp-input').value.trim();
    const fb   = container.querySelector('#disputatio-feedback');

    const checks = [
      { ok: obj.length > 30,  msg: 'Objectio muito curta — uma objeção sólida precisa de fundamento, não apenas negação.' },
      { ok: det.length > 30,  msg: 'Determinatio muito curta — apresente sua posição com argumentos distintos.' },
      { ok: resp.length > 30, msg: 'Responsio muito curta — a refutação deve ser específica, apontando onde a objeção falha.' },
      { ok: !resp.toLowerCase().includes(obj.toLowerCase().slice(0, 15)), msg: null }, // não é só repetição
    ];

    const falhas = checks.filter(c => !c.ok && c.msg).map(c => c.msg);

    if (falhas.length === 0) {
      fb.innerHTML = `
        <div class="panel" style="border-left:3px solid var(--color-green)">
          <p style="font-family:var(--font-ui);font-weight:700;color:var(--color-green);margin-bottom:var(--space-2)">Estrutura válida</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">
            Sua disputatio tem as quatro partes preenchidas com substância. O próximo passo é verificar
            se sua responsio realmente aborda a objectio — ou se apenas a ignora com uma afirmação diferente.
          </p>
        </div>`;
    } else {
      fb.innerHTML = `
        <div class="panel">
          <p style="font-family:var(--font-ui);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2)">Pontos a desenvolver</p>
          <ul style="padding-left:var(--space-4);display:flex;flex-direction:column;gap:var(--space-2)">
            ${falhas.map(f => `<li style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${f}</li>`).join('')}
          </ul>
        </div>`;
    }
  });
}

/* ================================================================
   TAB 2 — ESTRUTURA DO ARGUMENTO
   ================================================================ */

function renderArgumento(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Estrutura do Argumento</h2>

      <!-- Anatomia -->
      <div style="margin-bottom:var(--space-8)">
        <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-6)">
          Todo argumento é uma estrutura com partes identificáveis. Reconhecer essas partes
          é o primeiro passo para avaliá-lo — e para construir argumentos sólidos.
        </p>

        <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6);margin-bottom:var(--space-6);font-family:var(--font-body)">
          <div style="display:flex;gap:var(--space-3);align-items:flex-start;margin-bottom:var(--space-3)">
            <span style="background:var(--color-accent);color:#fff;font-family:var(--font-ui);font-size:var(--text-xs);padding:2px 8px;border-radius:var(--radius);flex-shrink:0;margin-top:2px">P1</span>
            <p style="color:var(--color-ink-mid)">Todo ser humano é mortal.</p>
          </div>
          <div style="display:flex;gap:var(--space-3);align-items:flex-start;margin-bottom:var(--space-3)">
            <span style="background:var(--color-accent);color:#fff;font-family:var(--font-ui);font-size:var(--text-xs);padding:2px 8px;border-radius:var(--radius);flex-shrink:0;margin-top:2px">P2</span>
            <p style="color:var(--color-ink-mid)">Sócrates é um ser humano.</p>
          </div>
          <div style="border-top:1px solid var(--color-paper-border);padding-top:var(--space-3);display:flex;gap:var(--space-3);align-items:flex-start">
            <span style="background:var(--color-gold);color:#fff;font-family:var(--font-ui);font-size:var(--text-xs);padding:2px 8px;border-radius:var(--radius);flex-shrink:0;margin-top:2px">∴</span>
            <p style="color:var(--color-ink);font-weight:700">Logo, Sócrates é mortal.</p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">
          ${[
            ['Premissa', 'Afirmação aceita como ponto de partida. Pode ser um fato, definição ou axioma. Premissas falsas geram conclusões falsas mesmo com raciocínio válido.'],
            ['Conclusão', 'A afirmação que o argumento tenta provar. Identificada por conectivos: "logo", "portanto", "então", "daí que", "conclui-se que".'],
            ['Inferência', 'A passagem das premissas à conclusão. Pode ser dedutiva (necessária) ou indutiva (provável). A qualidade da inferência determina a validade.'],
          ].map(([nome, desc]) => `
            <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
              <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;margin-bottom:var(--space-2)">${nome}</p>
              <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.7">${desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Validade vs Solidez -->
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Validade e Solidez</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-8)">
        <div style="border:2px solid var(--color-green);border-radius:var(--radius);padding:var(--space-5)">
          <p style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--color-green);margin-bottom:var(--space-2)">Argumento Válido</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-3)">Se as premissas forem verdadeiras, a conclusão necessariamente também o será. A validade é sobre a <em>forma</em>, não o conteúdo.</p>
          <div style="background:var(--color-paper-dark);padding:var(--space-6);border-radius:var(--radius);font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-light)">
            Todos os polvos são mamíferos. (falso)<br>
            Calamares são polvos. (falso)<br>
            ∴ Calamares são mamíferos. (falso)<br><br>
            <span style="font-style:normal;color:var(--color-green)">Válido</span> — a forma está correta. As premissas é que são falsas.
          </div>
        </div>
        <div style="border:2px solid var(--color-gold);border-radius:var(--radius);padding:var(--space-5)">
          <p style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--color-gold);margin-bottom:var(--space-2)">Argumento Sólido</p>
          <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-3)">Válido <em>e</em> com premissas verdadeiras. Apenas argumentos sólidos provam algo. A solidez é o padrão máximo.</p>
          <div style="background:var(--color-paper-dark);padding:var(--space-6);border-radius:var(--radius);font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-light)">
            Todo ser humano é mortal. (verdadeiro)<br>
            Sócrates é humano. (verdadeiro)<br>
            ∴ Sócrates é mortal. (verdadeiro)<br><br>
            <span style="font-style:normal;color:var(--color-gold)">Sólido</span> — válido e com premissas verdadeiras.
          </div>
        </div>
      </div>

      <!-- Silogismo -->
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">O Silogismo Categórico</h3>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-4)">
        Aristóteles formalizou o silogismo: dois juízos (premissas) ligados por um
        <strong>termo médio</strong> geram uma conclusão necessária. O termo médio aparece
        nas duas premissas mas não na conclusão — é ele que faz a ponte.
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-8)">
        ${[
          ['Modus Ponens', 'Se P então Q.<br>P é verdadeiro.<br>∴ Q é verdadeiro.', 'Se chove, a rua molha. Choveu. ∴ A rua está molhada.'],
          ['Modus Tollens', 'Se P então Q.<br>Q é falso.<br>∴ P é falso.', 'Se chove, a rua molha. A rua não está molhada. ∴ Não choveu.'],
          ['Silogismo Hipotético', 'Se P então Q.<br>Se Q então R.<br>∴ Se P então R.', 'Se estudo, passo. Se passo, me formo. ∴ Se estudo, me formo.'],
          ['Silogismo Disjuntivo', 'P ou Q.<br>Não-P.<br>∴ Q.', 'É dia ou noite. Não é dia. ∴ É noite.'],
        ].map(([nome, forma, ex]) => `
          <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6)">
            <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;margin-bottom:var(--space-3)">${nome}</p>
            <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);line-height:1.8;margin-bottom:var(--space-3)">${forma}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-ghost)">${ex}</p>
          </div>
        `).join('')}
      </div>

      <!-- Dedução vs Indução -->
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Dedução, Indução e Abdução</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">
        ${[
          ['Dedução', 'Do geral ao particular. A conclusão é necessária se as premissas são verdadeiras. Nenhuma informação nova é produzida — apenas explicitada.', '"Todo metal conduz eletricidade. O ferro é metal. ∴ O ferro conduz eletricidade."'],
          ['Indução', 'Do particular ao geral. A conclusão é provável, não necessária. A ciência empírica funciona por indução.', '"O sol nasceu todos os dias observados. ∴ O sol nasce todo dia." (provável, mas não necessário)'],
          ['Abdução', 'A melhor explicação disponível. Escolhe a hipótese mais simples e coerente para um conjunto de fatos. Usada em diagnósticos e investigações.', '"A calçada está molhada. Choveu recentemente é a melhor explicação." (pode haver outra)'],
        ].map(([nome, desc, ex]) => `
          <div style="border-left:3px solid var(--color-accent);padding-left:var(--space-4)">
            <p style="font-family:var(--font-display);font-size:var(--text-base);font-weight:700;margin-bottom:var(--space-2)">${nome}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);line-height:1.7;margin-bottom:var(--space-2)">${desc}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);font-style:italic;color:var(--color-ink-light)">${ex}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ================================================================
   TAB 3 — FALÁCIAS FORMAIS
   ================================================================ */

function renderFormais(container) {
  const falacías = [
    {
      nome: 'Afirmação do Consequente',
      latin: 'Affirming the Consequent',
      forma: 'Se P então Q. Q é verdadeiro. ∴ P é verdadeiro.',
      ex: '"Se é vampiro, não tem reflexo. Ele não tem reflexo. ∴ É vampiro."',
      porque: 'Q pode ser verdadeiro por outras razões além de P. O espelho pode estar quebrado.',
      como_rebater: 'Apresente outra causa para Q que não seja P. A conclusão deixa de ser necessária.',
    },
    {
      nome: 'Negação do Antecedente',
      latin: 'Denying the Antecedent',
      forma: 'Se P então Q. P é falso. ∴ Q é falso.',
      ex: '"Se chove, a rua molha. Não choveu. ∴ A rua não está molhada."',
      porque: 'Q pode ocorrer por outras causas. O caminhão-pipa pode ter passado.',
      como_rebater: 'Mostre que Q pode ser verdadeiro mesmo sem P — o condicional não é bicondicional.',
    },
    {
      nome: 'Falácia do Meio Não-Distribuído',
      latin: 'Undistributed Middle',
      forma: 'Todo A é C. Todo B é C. ∴ Todo A é B.',
      ex: '"Todo criminoso mente. João mente. ∴ João é criminoso."',
      porque: 'C pode ser verdadeiro de A e de B sem que A e B se relacionem entre si.',
      como_rebater: 'Demonstre que o termo médio não cobre todos os membros de ambas as classes.',
    },
    {
      nome: 'Quatro Termos',
      latin: 'Quaternio Terminorum',
      forma: 'Silogismo com aparência de três termos, mas com quatro sentidos distintos.',
      ex: '"Nenhum mal é bom. Algum sofrimento é bom (faz crescer). ∴ Algum sofrimento não é mal." — "bom" é usado em sentidos diferentes.',
      porque: 'O silogismo exige que o termo médio tenha o mesmo sentido nas duas premissas.',
      como_rebater: 'Identifique o termo ambíguo e exija que o adversário escolha um único sentido.',
    },
    {
      nome: 'Conclusão Indevida',
      latin: 'Non Sequitur',
      forma: 'A conclusão não decorre logicamente das premissas apresentadas.',
      ex: '"Ele estudou medicina. ∴ Devemos confiar em sua opinião sobre política econômica."',
      porque: 'A relação entre premissas e conclusão é inexistente ou não demonstrada.',
      como_rebater: 'Peça explicitamente qual é a inferência que conecta as premissas à conclusão.',
    },
    {
      nome: 'Petição de Princípio',
      latin: 'Petitio Principii / Begging the Question',
      forma: 'A conclusão é pressuposta nas premissas — o argumento é circular.',
      ex: '"A Bíblia é verdadeira porque é a palavra de Deus, e sabemos que é a palavra de Deus porque a Bíblia diz isso."',
      porque: 'Não há progresso epistêmico — o argumento apenas reformula o que já assumia.',
      como_rebater: 'Demonstre que a "prova" já contém a conclusão. Peça uma premissa independente.',
    },
  ];

  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-4)">Falácias Formais</h2>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-8)">
        Falácias formais são erros na <strong>estrutura lógica</strong> do argumento — independentemente
        de o conteúdo ser verdadeiro ou falso. O argumento parece válido mas viola as regras
        da inferência. São identificáveis pela forma, sem precisar avaliar o conteúdo.
      </p>
      <div style="display:flex;flex-direction:column;gap:var(--space-4)">
        ${falacías.map((f, i) => `
          <div class="falacia-card" data-idx="${i}" style="border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
            <button type="button" class="falacia-toggle" data-idx="${i}"
              style="width:100%;text-align:left;background:var(--color-paper-dark);border:none;padding:var(--space-5) var(--space-6);cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)">
              <div>
                <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:700;color:var(--color-ink);margin-bottom:var(--space-1)">${f.nome}</p>
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);letter-spacing:0.04em">${f.latin}</p>
              </div>
              <span class="toggle-icon" style="font-size:var(--text-lg);color:var(--color-ink-ghost);transition:transform var(--transition-fast);flex-shrink:0">+</span>
            </button>
            <div class="falacia-body" style="display:none;background:var(--color-paper)">
              <div style="padding:var(--space-6) var(--space-6) 0">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Forma lógica</p>
                <p style="font-family:var(--font-ui);font-size:var(--text-base);color:var(--color-ink-mid);font-style:italic;line-height:1.6">${f.forma}</p>
              </div>
              <div style="height:1px;background:var(--color-paper-border);margin:var(--space-5) var(--space-6)"></div>
              <div style="padding:0 var(--space-6)">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Exemplo</p>
                <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);background:var(--color-paper-dark);padding:var(--space-6);border-radius:var(--radius);line-height:1.7;border-left:2px solid var(--color-paper-border)">${f.ex}</p>
              </div>
              <div style="height:1px;background:var(--color-paper-border);margin:var(--space-5) var(--space-6)"></div>
              <div style="padding:0 var(--space-6)">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-accent);margin-bottom:var(--space-2)">Por que falha</p>
                <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7">${f.porque}</p>
              </div>
              <div style="margin:var(--space-5) var(--space-6) var(--space-6);border-left:3px solid var(--color-green);padding-left:var(--space-5)">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-green);margin-bottom:var(--space-2)">Como rebater</p>
                <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7">${f.como_rebater}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.falacia-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.falacia-card');
      const body = card.querySelector('.falacia-body');
      const icon = btn.querySelector('.toggle-icon');
      const open = body.style.display !== 'block';
      body.style.display = open ? '' : 'none';
      icon.textContent   = open ? '−' : '+';
      icon.style.transform = open ? 'rotate(0deg)' : '';
    });
  });
}

/* ================================================================
   TAB 4 — FALÁCIAS INFORMAIS
   ================================================================ */

const FALACÍAS_INFORMAIS = [
  {
    grupo: 'Relevância',
    itens: [
      {
        nome: 'Ad Hominem',
        desc: 'Atacar a pessoa em vez do argumento. O caráter ou a situação do falante não afeta a validade lógica do que diz.',
        ex: '"Você não pode falar sobre saúde pública — você fuma."',
        rebater: 'Separe explicitamente a pessoa do argumento: "Isso pode ser verdade, mas não afeta a validade do raciocínio. Qual é o erro específico no argumento?"',
        variantes: ['Circunstancial — "você diria isso, dado seu interesse"', 'Tu Quoque — "mas você também faz"'],
      },
      {
        nome: 'Ad Hominem Circunstancial',
        desc: 'Rejeitar o argumento porque o falante se beneficiaria se for verdadeiro.',
        ex: '"Claro que o médico diz para tomar o remédio — ele recebe comissão da farmácia."',
        rebater: 'O interesse não invalida o argumento. Avalie a evidência clínica independentemente da motivação do falante.',
        variantes: [],
      },
      {
        nome: 'Apelo à Autoridade (Ad Verecundiam)',
        desc: 'Usar a autoridade de alguém como substituto de evidência — especialmente quando a autoridade está fora de sua área.',
        ex: '"Einstein acreditava em Deus, então Deus existe."',
        rebater: 'Verifique se a autoridade é competente na área específica em questão. Autoridade em física não é autoridade em teologia.',
        variantes: ['Autoridade anônima — "especialistas dizem"', 'Autoridade desatualizada'],
      },
      {
        nome: 'Apelo às Massas (Ad Populum)',
        desc: 'Argumentar que algo é verdadeiro porque muitos acreditam nisso.',
        ex: '"Bilhões de pessoas acreditam nessa religião — não pode estar errada."',
        rebater: 'A maioria já acreditou que a Terra era plana. Popularidade não é critério de verdade.',
        variantes: ['Apelo à tradição — "sempre foi assim"', 'Apelo à novidade — "é mais moderno, logo melhor"'],
      },
      {
        nome: 'Apelo à Emoção (Ad Passiones)',
        desc: 'Usar emoção (medo, culpa, piedade) como substituto de argumento.',
        ex: '"Pense nas crianças! Como você pode votar contra essa lei?"',
        rebater: 'Reconheça a emoção sem deixá-la substituir a análise. Pergunte: o que os fatos dizem sobre os efeitos reais da lei?',
        variantes: ['Ad Metum (medo)', 'Ad Misericordiam (piedade)', 'Ad Superbiam (vaidade)'],
      },
      {
        nome: 'Apelo à Ignorância (Ad Ignorantiam)',
        desc: 'Concluir que algo é verdadeiro porque não foi provado falso, ou vice-versa.',
        ex: '"Ninguém provou que fantasmas não existem — logo, podem existir."',
        rebater: 'A ausência de evidência contra não é evidência a favor. A carga da prova está em quem afirma, não em quem questiona.',
        variantes: [],
      },
    ],
  },
  {
    grupo: 'Pressuposição',
    itens: [
      {
        nome: 'Falsa Dicotomia (Ou-Ou)',
        desc: 'Apresentar apenas duas opções quando existem mais.',
        ex: '"Ou você é patriota, ou é contra o país."',
        rebater: 'Identifique explicitamente a terceira (ou décima) opção ignorada. "Há uma terceira possibilidade: criticar certas políticas por amor ao país."',
        variantes: ['Dilema falso', 'Raciocínio preto-e-branco'],
      },
      {
        nome: 'Pergunta Capciosa (Complex Question)',
        desc: 'Formular uma pergunta que pressupõe algo não estabelecido.',
        ex: '"Quando você parou de bater na sua esposa?"',
        rebater: 'Recuse a pergunta e explicite a pressuposição: "Sua pergunta assume X, que não está estabelecido. Vamos tratar dessa premissa primeiro."',
        variantes: [],
      },
      {
        nome: 'Equívoco',
        desc: 'Usar a mesma palavra em dois sentidos diferentes no mesmo argumento.',
        ex: '"A lei da gravidade é uma lei. Leis são feitas por legisladores. ∴ A lei da gravidade foi feita por legisladores."',
        rebater: 'Identifique a palavra ambígua e exija que o adversário escolha um sentido e o mantenha.',
        variantes: ['Anfibologia — ambiguidade gramatical'],
      },
      {
        nome: 'Composição e Divisão',
        desc: 'Assumir que o que é verdadeiro das partes é verdadeiro do todo, ou vice-versa.',
        ex: '"Cada jogador do time é excelente. ∴ O time é excelente." (Composição) / "O sal é perigoso. O sódio é parte do sal. ∴ O sódio puro é perigoso para comer." (Divisão — mas o contexto muda tudo)',
        rebater: 'Mostre que as propriedades das partes não se transferem necessariamente ao todo e vice-versa.',
        variantes: [],
      },
    ],
  },
  {
    grupo: 'Causalidade',
    itens: [
      {
        nome: 'Post Hoc Ergo Propter Hoc',
        desc: 'Confundir sequência temporal com causalidade. "Depois de X, logo por causa de X."',
        ex: '"Instalei o antivírus e o computador ficou lento. ∴ O antivírus causou a lentidão."',
        rebater: 'Correlação não é causalidade. Exija mecanismo causal plausível e descarte causas alternativas.',
        variantes: ['Correlação espúria — duas variáveis correlacionadas por causa de uma terceira'],
      },
      {
        nome: 'Inclinação Escorregadia (Slippery Slope)',
        desc: 'Assumir que um passo pequeno inevitavelmente leva a consequências extremas, sem demonstrar o mecanismo.',
        ex: '"Se legalizarmos a maconha, logo todo mundo vai usar heroína."',
        rebater: 'Exija que o adversário demonstre o mecanismo causal em cada etapa. O deslize não é inevitável sem essa cadeia.',
        variantes: ['Versão válida: quando o mecanismo é demonstrado, a inclinação é um argumento legítimo'],
      },
      {
        nome: 'Causa Única (Oversimplification)',
        desc: 'Atribuir um fenômeno complexo a uma única causa.',
        ex: '"A criminalidade existe por causa da pobreza."',
        rebater: 'Apresente a complexidade causal: pobreza pode ser um fator sem ser a causa única ou suficiente.',
        variantes: [],
      },
    ],
  },
  {
    grupo: 'Distorção',
    itens: [
      {
        nome: 'Espantalho (Straw Man)',
        desc: 'Distorcer ou exagerar o argumento adversário para atacar uma versão mais fácil de rebater.',
        ex: '"Ele disse que devemos reduzir os gastos militares." → "Então você quer deixar o país indefeso?"',
        rebater: 'Nomeie a distorção: "Isso não é o que eu disse. Minha posição é X. Você pode responder ao que eu realmente defendo?"',
        variantes: ['É considerada a falácia mais usada em debates políticos'],
      },
      {
        nome: 'Declive Íngreme (Caricatura)',
        desc: 'Versão extrema do espantalho: leva a posição do adversário ao absurdo sem argumento.',
        ex: '"Se você defende taxar os ricos, no fundo quer o comunismo."',
        rebater: 'Recuse a caricatura e requeira que o adversário enfrente a posição real.',
        variantes: [],
      },
      {
        nome: 'Falsa Equivalência',
        desc: 'Tratar duas coisas como equivalentes quando não são.',
        ex: '"Os dois lados fazem isso" — quando a escala ou a natureza são radicalmente diferentes.',
        rebater: 'Exija a demonstração de que os casos são comparáveis em grau e em natureza.',
        variantes: ['Tanto-faz-um-como-o-outro (whataboutism)'],
      },
    ],
  },
  {
    grupo: 'Indução Fraca',
    itens: [
      {
        nome: 'Generalização Apressada',
        desc: 'Concluir algo geral a partir de amostra pequena, não representativa ou enviesada.',
        ex: '"Meu vizinho fumou até os 90 anos. ∴ Fumar não faz mal."',
        rebater: 'Exija a amostra: tamanho, representatividade, método de seleção. Um caso não prova a regra.',
        variantes: ['Viés de confirmação — buscar apenas casos que confirmam a tese'],
      },
      {
        nome: 'Apelo à Natureza',
        desc: 'Assumir que o que é "natural" é bom e o que é "artificial" é ruim.',
        ex: '"Produtos naturais não têm efeitos colaterais."',
        rebater: 'O arsênico é natural. A penicilina é processada. Natural não é sinônimo de seguro ou de bom.',
        variantes: [],
      },
      {
        nome: 'Apelo à Tradição (Ad Antiquitatem)',
        desc: 'Argumentar que algo é correto porque sempre foi feito assim.',
        ex: '"Sempre casamos assim. Por que mudar?"',
        rebater: 'A longevidade de uma prática não a justifica moralmente. Muitas práticas antigas foram abolidas por boas razões.',
        variantes: ['Apelo à novidade — a versão inversa: "é mais novo, logo é melhor"'],
      },
    ],
  },
];

function renderInformais(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-4)">Falácias Informais</h2>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-6)">
        Falácias informais são erros no <strong>conteúdo</strong> — na relevância, na pressuposição,
        na causalidade ou na indução. Ao contrário das formais, a estrutura pode estar correta
        mas o argumento falha por usar evidência irrelevante, distorcer a realidade ou
        explorar vieses cognitivos.
      </p>

      <!-- Barra de busca -->
      <div style="margin-bottom:var(--space-6)">
        <input type="search" id="falacia-search" placeholder="Buscar falácia…"
          style="width:100%;max-width:400px;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-2) var(--space-4);border:1.5px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);outline:none">
      </div>

      <div id="informais-lista"></div>
    </div>
  `;

  const lista   = container.querySelector('#informais-lista');
  const search  = container.querySelector('#falacia-search');

  const render = (filtro = '') => {
    lista.innerHTML = '';
    FALACÍAS_INFORMAIS.forEach(grupo => {
      const itens = grupo.itens.filter(f =>
        !filtro || f.nome.toLowerCase().includes(filtro) || f.desc.toLowerCase().includes(filtro)
      );
      if (!itens.length) return;

      const section = document.createElement('div');
      section.style.marginBottom = 'var(--space-8)';
      section.innerHTML = `
        <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.1em;color:var(--color-accent);margin-bottom:var(--space-4)">${grupo.grupo}</p>
        <div class="grupo-itens" style="display:flex;flex-direction:column;gap:var(--space-3)"></div>
      `;

      const grupoEl = section.querySelector('.grupo-itens');

      itens.forEach(f => {
        const card = document.createElement('div');
        card.style.cssText = 'border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden';
        card.innerHTML = `
          <button type="button" class="f-toggle"
            style="width:100%;text-align:left;background:var(--color-paper-dark);border:none;padding:var(--space-5) var(--space-6);cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:var(--space-4)">
            <p style="font-family:var(--font-display);font-size:var(--text-lg);color:var(--color-ink)">${f.nome}</p>
            <span class="f-icon" style="color:var(--color-ink-ghost);font-size:var(--text-lg);flex-shrink:0">+</span>
          </button>
          <div class="f-body" style="display:none;background:var(--color-paper)">
            <div style="padding:var(--space-6) var(--space-6) 0">
              <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75">${f.desc}</p>
            </div>
            <div style="height:1px;background:var(--color-paper-border);margin:var(--space-5) var(--space-6)"></div>
            <div style="padding:0 var(--space-6)">
              <div style="background:var(--color-paper-dark);padding:var(--space-6) var(--space-6);border-radius:var(--radius)">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-2)">Exemplo</p>
                <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);line-height:1.65">${f.ex}</p>
              </div>
            </div>
            <div style="margin:var(--space-5) var(--space-6) ${f.variantes.length ? '0' : 'var(--space-6)'};border-left:3px solid var(--color-green);padding-left:var(--space-5)">
              <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-green);margin-bottom:var(--space-2)">Como rebater</p>
              <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.7">${f.rebater}</p>
            </div>
            ${f.variantes.length ? `
              <div style="padding:var(--space-4) var(--space-6) var(--space-6)">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Variantes</p>
                <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
                  ${f.variantes.map(v => `<span style="font-family:var(--font-ui);font-size:var(--text-xs);background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-1) var(--space-3);color:var(--color-ink-light)">${v}</span>`).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;

        const toggle = card.querySelector('.f-toggle');
        const body   = card.querySelector('.f-body');
        const icon   = card.querySelector('.f-icon');
        // começa fechado
        body.style.display = 'none';

        toggle.addEventListener('click', () => {
          const open = body.style.display !== 'block';
          body.style.display = open ? 'flex' : 'none';
          icon.textContent = open ? '−' : '+';
        });

        grupoEl.appendChild(card);
      });

      lista.appendChild(section);
    });
  };

  render();
  search.addEventListener('input', () => render(search.value.toLowerCase().trim()));
}

/* ================================================================
   TAB 5 — COMO REBATER
   ================================================================ */

function renderRebater(container) {
  container.innerHTML = `
    <div style="max-width:var(--content-width)">
      <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Como Rebater</h2>
      <p style="font-family:var(--font-body);color:var(--color-ink-mid);line-height:1.8;margin-bottom:var(--space-8)">
        Rebater não é vencer uma discussão — é avançar em direção à verdade. As técnicas
        abaixo são ferramentas de refutação honesta, usadas desde Aristóteles e formalizadas
        pelos escolásticos medievais.
      </p>

      <!-- Técnicas principais -->
      <div style="display:flex;flex-direction:column;gap:var(--space-6);margin-bottom:var(--space-10)">
        ${[
          {
            nome: 'Reductio ad Absurdum',
            desc: 'Aceite temporariamente a premissa do adversário e demonstre que ela leva a uma conclusão absurda ou contraditória. É a refutação mais elegante da filosofia.',
            passos: ['Aceite a premissa como hipótese', 'Deduza consequências rigorosamente', 'Mostre que a consequência é absurda, falsa ou contradiz outra coisa que o adversário aceita', 'Conclua que a premissa original deve ser falsa'],
            ex: '"Se tudo tem uma causa, então Deus também tem uma causa — o que contradiz a definição de Deus como ser incausado."',
          },
          {
            nome: 'Distinguo (A Distinção)',
            desc: 'A arma favorita dos escolásticos. Quando uma premissa é verdadeira em um sentido e falsa em outro, faça a distinção explicitamente antes de responder.',
            passos: ['Identifique o termo ou premissa ambígua', '"Distingo: se X significa A, concedo. Se X significa B, nego."', 'Reformule a premissa no sentido preciso', 'Agora responda ao sentido preciso'],
            ex: `"Distinguo: se 'liberdade' significa ausência de coerção externa, concedo que todos devem tê-la. Se significa ausência de consequências para qualquer ação, nego — isso seria impossível em sociedade."`,
          },
          {
            nome: 'Reductio contra Rem (Contrapelo)',
            desc: 'Vire o argumento do adversário contra ele mesmo. Mostre que, aplicando a mesma lógica a outro caso que o adversário aceita, chegamos a conclusão que ele rejeitaria.',
            passos: ['Identifique o princípio geral no argumento adversário', 'Encontre outro caso onde o mesmo princípio se aplica', 'Mostre que o adversário não aceitaria o resultado nesse caso', 'Conclua que o princípio tem um problema'],
            ex: '"Você diz que o Estado não deve regular o que as pessoas põem no próprio corpo. Aplico o mesmo princípio às drogas altamente viciantes — você aceita essa conclusão?"',
          },
          {
            nome: 'Dilemma',
            desc: 'Apresente ao adversário duas alternativas, ambas prejudiciais à sua tese. Se ele aceitar qualquer uma, perde; se negar ambas, precisa de uma terceira — que você já preparou.',
            passos: ['Formule o dilema: "Ou A ou B"', 'Mostre que A implica C (ruim para o adversário)', 'Mostre que B implica D (também ruim)', 'Ofereça a saída — geralmente negando a dicotomia — apenas se ele tentar usar uma'],
            ex: '"Ou as leis de um país são justas, ou não são. Se são justas, o cidadão deve segui-las sem questionar — e perde autonomia moral. Se não são, o Estado não merece obediência. Em ambos os casos, a obediência cega é indefensável."',
          },
          {
            nome: 'Interrogatio Socrática',
            desc: 'Em vez de refutar diretamente, faça perguntas que levem o adversário a contradizer-se ou a revelar as premissas ocultas do próprio argumento. Sócrates nunca afirmava — perguntava.',
            passos: ['Peça definição dos termos centrais', 'Peça exemplos concretos da afirmação geral', 'Apresente contraexemplos nas formas de pergunta', 'Deixe o adversário descobrir a contradição por si'],
            ex: `"O que você quer dizer exatamente com 'natural'? O relâmpago é natural — ele é sempre bom? E a tuberculose?"`,
          },
          {
            nome: 'Exceptio (A Exceção)',
            desc: 'Aceite a regra geral mas apresente um contraexemplo genuíno que a invalida. Uma exceção real é suficiente para refutar uma afirmação universal.',
            passos: ['Identifique se a afirmação é universal ("todo", "sempre", "nunca")', 'Encontre um caso que a contradiz', 'Demonstre que o caso é genuíno, não distorcido', 'Conclua que a afirmação universal deve ser revisada'],
            ex: '"Você diz que toda ação humana é motivada por interesse próprio. Mas o soldado que joga-se sobre a granada para salvar os companheiros morre sem benefício possível — como o interesse próprio explica isso?"',
          },
        ].map(t => `
          <div style="border:1px solid var(--color-paper-border);border-radius:var(--radius);overflow:hidden">
            <div style="background:var(--color-ink);padding:var(--space-5) var(--space-6)">
              <p style="font-family:var(--font-display);font-size:var(--text-xl);color:var(--color-paper)">${t.nome}</p>
            </div>
            <div style="padding:var(--space-6);background:var(--color-paper);display:grid;grid-template-columns:1fr 1fr;gap:var(--space-8)">
              <div>
                <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.75;margin-bottom:var(--space-5)">${t.desc}</p>
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Passos</p>
                <ol style="padding-left:var(--space-5);display:flex;flex-direction:column;gap:var(--space-3)">
                  ${t.passos.map(p => `<li style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.6">${p}</li>`).join('')}
                </ol>
              </div>
              <div style="background:var(--color-paper-dark);border-radius:var(--radius);padding:var(--space-5);align-self:start">
                <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.08em;color:var(--color-ink-ghost);margin-bottom:var(--space-4)">Exemplo em uso</p>
                <p style="font-family:var(--font-body);font-size:var(--text-base);font-style:italic;color:var(--color-ink-mid);line-height:1.75">${t.ex}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Regras de ouro -->
      <h3 style="font-family:var(--font-display);font-size:var(--text-xl);margin-bottom:var(--space-4)">Regras de ouro do rebatedor honesto</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
        ${[
          ['Rebata o argumento, não a pessoa', 'Ad hominem é a arma de quem não tem argumento melhor.'],
          ['Nunca distorça antes de rebater', 'Rebater uma versão fraca do argumento não prova nada sobre a versão forte.'],
          ['Conceda o que é correto', 'Se parte do argumento adversário é sólida, admita. Isso fortalece, não enfraquece, sua posição.'],
          ['Distingua antes de contradizer', 'Muitas contradições aparentes são disputas de definição. Distinguo salva tempo.'],
          ['Pergunte a carga da prova', 'Quem afirma algo deve provar. Você não precisa refutar o que não foi demonstrado.'],
          ['Aceite a derrota quando ela ocorre', 'Mudar de posição diante de bom argumento é virtude intelectual, não fraqueza.'],
        ].map(([nome, desc]) => `
          <div style="background:var(--color-paper-dark);border:1px solid var(--color-paper-border);border-radius:var(--radius);padding:var(--space-6) var(--space-6)">
            <p style="font-family:var(--font-display);font-size:var(--text-sm);font-weight:700;margin-bottom:var(--space-1)">${nome}</p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid)">${desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ================================================================
   TAB 6 — TREINO
   ================================================================ */

const TREINO_CASOS = [
  {
    argumento: 'Cientistas recebem verbas do governo para pesquisar mudanças climáticas. É óbvio que vão confirmar o que o financiador quer ouvir. Por isso, não devemos confiar nos dados sobre aquecimento global.',
    falacia: 'Ad Hominem Circunstancial',
    explicacao: 'O argumento ataca a motivação dos cientistas, não os dados ou a metodologia. Mesmo que houvesse conflito de interesse, isso não invalida os resultados — que precisam ser rebatidos com evidência científica.',
    dica: 'Quem está sendo atacado: o argumento ou os argumentadores?',
  },
  {
    argumento: 'Meu avô fumou dois maços por dia durante 60 anos e morreu aos 94 anos, de causas naturais. Portanto, fumar não causa câncer.',
    falacia: 'Generalização Apressada',
    explicacao: 'Um caso individual não invalida estudos com milhões de participantes. A falácia ignora a escala e a representatividade da evidência. Casos excepcionais existem em qualquer distribuição.',
    dica: 'Quantas pessoas compõem a amostra deste argumento?',
  },
  {
    argumento: 'Se permitirmos que professores ensinem teorias da evolução, logo estarão ensinando que humanos não têm valor moral. Em seguida, virá a eugenia. Portanto, devemos proibir o ensino da evolução.',
    falacia: 'Inclinação Escorregadia',
    explicacao: 'O argumento assume uma cadeia causal de evolução → niilismo moral → eugenia sem demonstrar o mecanismo de cada etapa. Milhões de países ensinam evolução sem que isso ocorra.',
    dica: 'O argumento demonstra o mecanismo de cada "passo" na cadeia?',
  },
  {
    argumento: 'Você diz que devemos reduzir os gastos militares, mas você mesmo não serve no exército. Sua opinião é inválida.',
    falacia: 'Ad Hominem',
    explicacao: 'A ausência de serviço militar não invalida um argumento sobre política de defesa. Economistas que nunca trabalharam numa fábrica podem ter opiniões válidas sobre política industrial.',
    dica: 'A crítica é sobre o argumento ou sobre a pessoa?',
  },
  {
    argumento: 'Pesquisas mostram que países com maior consumo de chocolate têm mais ganhadores do Nobel per capita. Logo, comer chocolate aumenta a inteligência.',
    falacia: 'Post Hoc Ergo Propter Hoc',
    explicacao: 'Correlação não é causalidade. Países ricos consomem mais chocolate E têm mais acesso a educação de qualidade. A riqueza é a causa comum de ambos — não o chocolate.',
    dica: 'Pode haver uma terceira variável explicando a correlação?',
  },
  {
    argumento: 'Ou você apoia completamente nossa proposta de política econômica, ou você quer que o país entre em colapso.',
    falacia: 'Falsa Dicotomia',
    explicacao: 'Há muitas posições entre apoio total e colapso. Pode-se apoiar parcialmente, propor modificações, ou preferir uma política completamente diferente que também não leva ao colapso.',
    dica: 'Quantas opções o argumento apresenta? Quantas existem de fato?',
  },
  {
    argumento: 'Você argumenta que deveríamos aumentar o salário mínimo. Mas você só defende isso porque é sindicalista — tem interesse pessoal na questão.',
    falacia: 'Ad Hominem Circunstancial',
    explicacao: 'O interesse pessoal pode ser motivo para ceticismo adicional, mas não invalida logicamente o argumento. Os dados econômicos sobre efeitos do salário mínimo são independentes da motivação do falante.',
    dica: 'O interesse pessoal refuta o argumento ou apenas questiona a motivação?',
  },
  {
    argumento: 'A homeopatia deve funcionar — é usada há mais de 200 anos e milhões de pessoas relatam melhora.',
    falacia: 'Apelo à Tradição + Apelo às Massas',
    explicacao: 'Longevidade não é validação científica. Sangrias e trepanações também foram praticadas por séculos. O relato subjetivo de melhora pode ser explicado por efeito placebo, regressão à média ou remissão natural.',
    dica: 'Dois argumentos combinados: "é antigo" e "muitos acreditam". Ambos justificam eficácia?',
  },
  {
    argumento: 'Nenhum estudo científico jamais provou que Deus não existe. Logo, é razoável acreditar na existência de Deus.',
    falacia: 'Apelo à Ignorância',
    explicacao: 'A ausência de prova contra não é prova a favor. Pelo mesmo raciocínio, teapots orbitando Saturno são razoáveis de acreditar porque nenhum estudo provou que não existem. A carga da prova está em quem afirma.',
    dica: 'Qual é a direção da carga da prova aqui?',
  },
  {
    argumento: 'Produtos naturais são sempre mais seguros que produtos sintéticos. Por isso, prefira sempre o remédio fitoterápico ao farmacêutico.',
    falacia: 'Apelo à Natureza',
    explicacao: 'Natural não é sinônimo de seguro: cianeto, arsênico e botulinum são naturais. Muitos medicamentos sintéticos são derivados de compostos naturais, apenas purificados. O critério de segurança é a evidência clínica, não a origem.',
    dica: '"Natural" é necessariamente seguro? Pense em exemplos contrários.',
  },
  {
    argumento: 'Você critica a corrupção no governo, mas já vi você passar um sinal vermelho. Quem é você para falar?',
    falacia: 'Tu Quoque',
    explicacao: 'Tu Quoque ("você também"): invalida o argumento do interlocutor apontando inconsistência pessoal. O sinal vermelho não torna a corrupção aceitável. Um argumento é avaliado pela sua lógica e evidências, não pela conduta de quem o apresenta.',
    dica: 'A validade de um argumento depende do comportamento de quem o defende?',
  },
  {
    argumento: 'Não precisamos fazer nada pelo meio ambiente agora. Afinal, o ser humano sempre se adaptou — vai se adaptar desta vez também.',
    falacia: 'Apelo à Tradição',
    explicacao: 'O fato de termos nos adaptado no passado não garante adaptação em condições qualitativamente diferentes (velocidade, escala, complexidade das mudanças climáticas são inéditas). É também um argumento derrotista que ignora evidências científicas sobre os limites da adaptação humana.',
    dica: 'O que funcionou no passado garante funcionamento em condições radicalmente diferentes?',
  },
  {
    argumento: '"O economista fulano disse que a reforma vai funcionar" — logo, vai funcionar.',
    falacia: 'Apelo à Autoridade (Ad Verecundiam)',
    explicacao: 'Autoridade não substitui argumento. Economistas discordam entre si; a posição de um especialista é dado, não prova. O apelo é legítimo quando: (1) a autoridade é reconhecida na área específica; (2) há consenso entre especialistas; (3) o argumento não contradiz evidências disponíveis. Aqui, falta contexto para validar qualquer dessas condições.',
    dica: 'Toda afirmação de especialista é necessariamente verdadeira?',
  },
  {
    argumento: 'A reforma tributária vai acabar com a livre iniciativa, destruir empregos, aumentar a pobreza e levar o país ao socialismo.',
    falacia: 'Inclinação Escorregadia',
    explicacao: 'Apresenta uma cadeia de consequências catastróficas sem justificar os elos causais. Cada passo ("vai acabar com X" → "vai destruir Y") precisaria de evidência independente. A falácia consiste em assumir que qualquer mudança desencadeia inevitavelmente os piores cenários possíveis.',
    dica: 'As consequências listadas são inevitáveis? Cada passo da cadeia foi justificado?',
  },
  {
    argumento: 'Não há provas de que este produto cause efeitos colaterais graves. Portanto, pode ser consumido com segurança.',
    falacia: 'Apelo à Ignorância',
    explicacao: 'Ausência de evidência não é evidência de ausência. A falta de estudos pode indicar que o produto não foi estudado, não que seja seguro. O ônus da prova para alimentos e medicamentos é demonstrar segurança — não a ausência de provas de dano.',
    dica: '"Não foi provado que é prejudicial" equivale a "é seguro"?',
  },
];

function renderTreino(container) {
  let indice  = 0;
  let acertos = 0;
  let total   = 0;

  // Embaralha os casos
  const casos = [...TREINO_CASOS].sort(() => Math.random() - 0.5);

  // Todas as falácias disponíveis para as opções
  const todasFalacias = [
    'Ad Hominem', 'Ad Hominem Circunstancial', 'Apelo à Autoridade',
    'Apelo às Massas', 'Apelo à Emoção', 'Apelo à Ignorância',
    'Falsa Dicotomia', 'Petição de Princípio', 'Equívoco',
    'Espantalho', 'Post Hoc Ergo Propter Hoc', 'Inclinação Escorregadia',
    'Generalização Apressada', 'Apelo à Natureza', 'Apelo à Tradição + Apelo às Massas',
    'Correlação Espúria', 'Causa Única',
  ];

  const renderCaso = () => {
    if (indice >= casos.length) {
      container.innerHTML = `
        <div style="max-width:var(--content-width)">
          <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-6)">Treino concluído</h2>
          <div class="card" style="text-align:center;padding:var(--space-10)">
            <p style="font-family:var(--font-display);font-size:var(--text-4xl);color:var(--color-ink);margin-bottom:var(--space-2)">${acertos}/${total}</p>
            <p style="font-family:var(--font-ui);color:var(--color-ink-ghost);margin-bottom:var(--space-6)">falácias identificadas corretamente</p>
            <p style="font-family:var(--font-body);color:var(--color-ink-mid);margin-bottom:var(--space-6)">
              ${acertos === total ? 'Perfeito. Você não seria enganado nem na Sorbonne do século XIII.' :
                acertos >= total * 0.7 ? 'Bom desempenho. Revise as falácias que errou na aba "Falácias Informais".' :
                'Continue praticando. Cada falácia tem uma estrutura — reconheça o padrão, não apenas o exemplo.'}
            </p>
            <button type="button" class="btn btn-primary" id="treino-restart">Reiniciar treino</button>
          </div>
        </div>
      `;
      container.querySelector('#treino-restart').addEventListener('click', () => {
        indice = 0; acertos = 0; total = 0;
        renderCaso();
      });
      return;
    }

    const caso = casos[indice];

    // Gera opções: a correta + 3 aleatórias
    const incorretas = todasFalacias
      .filter(f => f !== caso.falacia)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opcoes = [caso.falacia, ...incorretas].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div style="max-width:var(--content-width)">
        <h2 style="font-family:var(--font-display);font-size:var(--text-2xl);margin-bottom:var(--space-2)">Treino de Identificação</h2>
        <p style="font-family:var(--font-body);color:var(--color-ink-mid);margin-bottom:var(--space-6)">
          Leia o argumento e identifique a falácia.
        </p>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">Caso ${indice + 1} de ${casos.length}</span>
          <span style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost)">Acertos: ${acertos}</span>
        </div>

        <!-- Barra de progresso -->
        <div style="height:3px;background:var(--color-paper-border);border-radius:2px;margin-bottom:var(--space-6)">
          <div style="height:100%;background:var(--color-accent);border-radius:2px;width:${(indice / casos.length) * 100}%;transition:width var(--transition-slow)"></div>
        </div>

        <div class="card" style="margin-bottom:var(--space-4)">
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);text-transform:uppercase;letter-spacing:0.06em;color:var(--color-ink-ghost);margin-bottom:var(--space-3)">Argumento</p>
          <p style="font-family:var(--font-body);font-size:var(--text-base);color:var(--color-ink-mid);line-height:1.8;font-style:italic">"${caso.argumento}"</p>
          <p style="font-family:var(--font-ui);font-size:var(--text-xs);color:var(--color-ink-ghost);margin-top:var(--space-3)">Dica: ${caso.dica}</p>
        </div>

        <p style="font-family:var(--font-ui);font-size:var(--text-sm);color:var(--color-ink-light);margin-bottom:var(--space-3)">Qual falácia está sendo cometida?</p>
        <div id="treino-opcoes" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2);margin-bottom:var(--space-4)">
          ${opcoes.map(op => `
            <button type="button" class="treino-opt" data-val="${op}"
              style="text-align:left;font-family:var(--font-body);font-size:var(--text-sm);padding:var(--space-6);border:1px solid var(--color-paper-border);border-radius:var(--radius);background:var(--color-paper);color:var(--color-ink);cursor:pointer;transition:all var(--transition-fast)">
              ${op}
            </button>
          `).join('')}
        </div>
        <div id="treino-feedback"></div>
      </div>
    `;

    container.querySelectorAll('.treino-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        total++;
        container.querySelectorAll('.treino-opt').forEach(b => b.disabled = true);
        const correct = btn.dataset.val === caso.falacia;
        if (correct) acertos++;

        btn.style.background  = correct ? 'rgba(74,124,89,0.15)' : 'rgba(139,26,26,0.1)';
        btn.style.borderColor = correct ? 'var(--color-green)' : 'var(--color-accent)';

        if (!correct) {
          container.querySelectorAll('.treino-opt').forEach(b => {
            if (b.dataset.val === caso.falacia) {
              b.style.background  = 'rgba(74,124,89,0.15)';
              b.style.borderColor = 'var(--color-green)';
            }
          });
        }

        const fb = container.querySelector('#treino-feedback');
        fb.innerHTML = `
          <div class="panel" style="border-left:3px solid ${correct ? 'var(--color-green)' : 'var(--color-accent)'}">
            <p style="font-family:var(--font-ui);font-size:var(--text-xs);font-weight:700;color:${correct ? 'var(--color-green)' : 'var(--color-accent)'};margin-bottom:var(--space-2)">
              ${correct ? 'Correto' : `A falácia é: ${caso.falacia}`}
            </p>
            <p style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--color-ink-mid);margin-bottom:var(--space-3)">${caso.explicacao}</p>
            <button type="button" class="btn btn-secondary" id="treino-prox">
              ${indice + 1 < casos.length ? 'Próximo caso →' : 'Ver resultado'}
            </button>
          </div>
        `;

        fb.querySelector('#treino-prox').addEventListener('click', () => {
          indice++;
          renderCaso();
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });
  };

  renderCaso();
}
