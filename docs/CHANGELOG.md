# Changelog — Quintiliano

Todas as mudanças relevantes do projeto são registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

---

## [0.21.0] — 2026-03-11

### Adicionado

#### Página: Sobre (`/sobre`)

Apresentação do projeto em coluna única (860px). Origem do nome Quintiliano (Marco Fábio Quintiliano, c. 35–100 d.C.), filosofia em quatro princípios, métricas atuais e ecossistema educacional completo com links para os 7 projetos: Heródoto, Euclides, Quintiliano, Lavoisier, Humboldt, Archimedes, Johnson.

#### Página: Guia do Professor (`/guia`)

Material pedagógico com sidebar 220px sticky + conteúdo longo. Cinco atividades práticas (análise de parágrafo, desmontando frases, etimologia, identificação de falácias, perfil literário), cada uma com nível, duração, meta e variante. Tabela de módulos com nível BNCC, tabela de alinhamento de habilidades por módulo e seção explícita de limitações.

#### Ferramenta: Gerador de Plano de Aula (`/plano-aula`)

Dois painéis: formulário (470px) + preview em tempo real. Habilidades BNCC embutidas por ano/série (EF 6–9, EM 1–3, com aliases EM2/EM3 → EM1 conforme padrão CHS). Presets de objetivos, metodologias, recursos e avaliação selecionáveis por checkbox. Carga horária calculada automaticamente. Impressão via `window.print()` com `@media print` robusto (`print-color-adjust:exact`).

#### Footer com ecossistema

Rodapé atualizado com links para todos os 7 projetos do ecossistema educacional.

### Alterado

- `index.html`: 3 novos links no nav secundário (Plano de Aula, Guia do Professor, Sobre) e footer com links do ecossistema
- `modules/home.js`: 3 novos cards na grade (Plano de Aula, Guia do Professor, Sobre)
- `js/main.js`: 3 novas rotas registradas (`/sobre`, `/guia`, `/plano-aula`)
- `package.json`: versão 0.21.0, descrição atualizada

### Infraestrutura

- 3 novos módulos JS: `modules/sobre/sobre.js`, `modules/guia/guia.js`, `modules/plano-aula/plano-aula.js`
- 3 novos testes: `renderSobre`, `renderGuia`, `renderPlanoAula`
- Total: 21 rotas, 69 testes

---

## [0.20.0] — 2026-03-06

### Adicionado

#### Módulo 16: Grandes Nomes da Língua Portuguesa (`/modulo/grandes-nomes`)

Novo módulo com 10 escritores canônicos da língua portuguesa, cada um com:

- Perfil completo: vida, país, movimento literário, tag curta
- Citação representativa verificada
- Biografia objetiva (quem foi, contexto social e histórico)
- Análise do estilo (como escreve, recursos formais, singularidade)
- Três obras imprescindíveis com nota de leitura direta (não elogiosa)

**Seleção (em ordem de exibição)**:

1. **Machado de Assis** — primeiro por consenso crítico e fundação da ABL
2. **Carlos Drummond de Andrade** — o poeta mais antologizado do Brasil
3. **Luís de Camões** — fundador da épica e lírica em língua portuguesa
4. **Fernando Pessoa** — heterônimos e o Livro do Desassossego
5. **Clarice Lispector** — epifania, fluxo de consciência, prosa radical
6. **João Guimarães Rosa** — neologismos, sertão e metafísica
7. **Eça de Queirós** — Realismo português, ironia e crítica social
8. **Manuel Bandeira** — lirismo do cotidiano, brevidade, modernismo
9. **Graciliano Ramos** — prosa de contenção máxima, testemunho político
10. **Carolina Maria de Jesus** — voz da favela, diário como literatura

**Arquivos novos**:
- `modules/grandes-nomes/grandes-nomes.js` — dados e render completos
- Rota registrada em `js/main.js`: `/modulo/grandes-nomes`
- Link na navegação secundária em `index.html`
- Card na grade da página inicial (`modules/home.js`)
- Teste de smoke adicionado em `tests/test-modules.js` (65 testes total)

#### ABL — Seção dedicada a Machado de Assis (cadeira 3)

A cadeira 3 ganhou um bloco visual expandido (`destaque`) exibido antes do accordion padrão, com:

- Cabeçalho com número da cadeira em círculo dourado, nome e subtítulo
- Citação em destaque com borda dourada
- Grid biográfico: "Quem foi" e "Como escreve" lado a lado
- Papel e legado institucional na ABL
- Três obras essenciais com nota de leitura (Memórias Póstumas, Dom Casmurro, O Alienista)
- Curiosidade histórica sobre a vacância da cadeira após sua morte

O campo `destaque` é opcional no esquema de `CADEIRAS[]` — ausente nas demais cadeiras, sem custo. Quando presente, o módulo renderiza o bloco expandido antes do accordion padrão da cadeira.

#### Correção sistêmica — `--space-5` e `--space-10` indefinidos (84 ocorrências)

Os tokens `--space-5` e `--space-10` eram usados em 10 módulos mas não estavam declarados em `css/theme.css`. Variáveis CSS indefinidas resolvem para valor nulo silenciosamente — causando padding e espaçamento zerado em todo o site (o problema reportado como "texto muito próximo das bordas").

- Adicionado `--space-5: 1.25rem` ao `css/theme.css`
- Adicionado `--space-10: 2.5rem` ao `css/theme.css`
- 84 ocorrências corrigidas em 10 arquivos sem nenhuma alteração nos módulos

#### Correção sistêmica — accordion não abria no primeiro clique (15 ocorrências)

O handler de click checava `body.style.display === 'none'` para determinar se o accordion estava fechado. Mas o `display:none` inicial vinha do CSS, não do atributo inline — então `body.style.display` era `''` (vazio) no primeiro clique, e a condição retornava `false`. O accordion não abria.

- Corrigido em 15 ocorrências em 9 módulos: substituído por `!== 'block'`
- No módulo ABL (que usa `aria-expanded` em vez de `style.display`): adicionado `body.style.display = 'none'` inline na criação do elemento, garantindo estado inicial consistente

### Adicionado — Documentação

- **`docs/MODULES.md`** — referência técnica completa de todos os módulos: contrato de render, estrutura de dados internos, campos obrigatórios e opcionais, como adicionar exercícios e conteúdo a cada módulo
- **`docs/CONTENT.md`** — guia editorial para adicionar e editar conteúdo: esquemas JSON detalhados com exemplos, regras de validação, critérios de seleção, notas sobre qualidade editorial
- **`.gitignore`** — node_modules, dist, .env, .DS_Store, *.zip e temporários

### Modificado

- `docs/README.md` — atualizado: 17 rotas, 65 testes, novos módulos, novos docs
- `docs/CHANGELOG.md` — esta entrada
- `package.json` — versão `0.15.0` → `0.20.0`

---

## [0.13.0] — 2026-03-04

### Expandido — Banco de dados

#### `data/authors.json` — 5 → 15 autores

Adicionados 10 perfis completos (todos os campos: id, name, nationality, birth,
death, movement, short_bio, style, context, signature_quote, key_works,
gutenberg_works):

- **Fernando Pessoa** — Modernismo português; heterônimos Caeiro, Campos, Reis
- **Carlos Drummond de Andrade** — Modernismo; gauche, pedra, engajamento
- **Graciliano Ramos** — Regionalismo nordestino; prosa seca, Estado Novo
- **João Guimarães Rosa** — Modernismo tardio; Grande Sertão, neologismos
- **Eça de Queirós** — Realismo português; ironia, crítica à burguesia católica
- **Manuel Bandeira** — Modernismo; lirismo cotidiano, brevidade, tuberculose
- **Adélia Prado** — Poesia contemporânea; sagrado e doméstico, escrevivência
- **Érico Veríssimo** — Regionalismo gaúcho; O Tempo e o Vento, humanismo
- **Carolina Maria de Jesus** — Literatura de testemunho; Quarto de Despejo
- **Conceição Evaristo** — Literatura afro-brasileira; escrevivência

Os 5 autores originais (Machado, Clarice, Lima, Alencar, Camões) foram mantidos
sem alteração de conteúdo.

#### `data/etymology.json` — 9 → 45 entradas

Campo `language_origin` corrigido em todas as entradas originais (estava `"?"`).
Adicionadas 36 entradas novas com cobertura em 7 línguas de origem:

| Língua    | Total |
|-----------|-------|
| latim     | 21    |
| grego     | 13    |
| árabe     | 4     |
| quimbundo | 2     |
| tupi      | 2     |
| germânico | 2     |
| francês   | 1     |

Todas as entradas têm: `word`, `root`, `language_origin`, `meaning_origin`,
`evolution` (cadeia completa), `family`, `cognates_other_languages`, `curiosity`.

Seleção com critério pedagógico: palavras de alto impacto no vocabulário
escolar, raízes com muitas descendentes, e palavras que revelam conexões
inesperadas (texto/têxtil, escola/lazer, símbolo/reunião, assassino/haxixe).

#### `data/texts.json` — 34 → 40 textos, 71 → 87 exercícios

Adicionados 6 textos:

| id                         | Autor                   | Nível         | Tipo principal |
|----------------------------|-------------------------|---------------|----------------|
| `machado_conto_basico`     | Machado de Assis        | básico        | estrutura      |
| `estrutura_basico_clareza` | Monteiro Lobato         | básico        | estrutura      |
| `carolina_quarto`          | Carolina Maria de Jesus | intermediário | interpretação  |
| `graciliano_fabiano`       | Graciliano Ramos        | básico        | estrutura      |
| `conceicao_escrevivencia`  | Conceição Evaristo      | intermediário | figuras        |
| `pessoa_mensagem_basico`   | Fernando Pessoa         | básico        | interpretação  |

Exercícios `estrutura` básicos: +5 (total: 26). Agora todos os níveis têm
cobertura adequada para o módulo Leitura Estrutural.

### Adicionado — Documentação (`docs/`)

- `docs/ARCHITECTURE.md` — princípios de design, fluxo de inicialização,
  contrato dos módulos, sistema de design, convenções de código, compatibilidade
- `docs/DATA.md` — esquema completo dos 4 arquivos JSON com tabelas de campos,
  valores aceitos, regras de validação e guias de adição de conteúdo
- `docs/ROADMAP.md` — melhorias planejadas em três níveis de prioridade:
  progresso do aluno, Literatura→textos, Ortografia (módulo 10), Redação
  (módulo 11), Retórica (módulo 12); seção "Descartado" com justificativas
- `README.md` — referências atualizadas com novas contagens e links para docs/

## [0.12.0] — 2026-03-04

### Renomeado — Verbum → Quintiliano

O sistema passa a se chamar **Quintiliano**, em homenagem a Marcus Fabius
Quintilianus (c. 35–100 d.C.), o maior teórico do ensino da linguagem na
Antiguidade. Autor da *Institutio Oratoria*, Quintiliano formalizou a progressão
pedagógica da leitura à escrita ao discurso — exatamente o arco que o sistema
percorre dos seus 9 módulos.

**Arquivos alterados:**
- `index.html` — `<title>`, `<meta description>`, `aria-label` do logo, texto do
  logo (`.site-logo-word`) e rodapé
- `css/style.css` — comentário de cabeçalho
- `css/theme.css` — comentário de cabeçalho
- `js/main.js` — comentário de cabeçalho
- `js/api.js` — chave de cache `verbum_cache_v1_` → `quintiliano_cache_v1_`
- `js/state.js` — chave de storage `verbum_state_v1` → `quintiliano_state_v1`
- `modules/home.js` — título hero
- `README.md` — título, descrição e caminhos

**Estrutura:**
- Pasta `docs/` criada contendo toda a documentação (`CHANGELOG.md`)
- `README.md` permanece na raiz com referência à pasta `docs/`

## [0.11.0] — 2026-03-04

### Corrigido — Scroll horizontal no header

- `css/style.css` — `overflow-x: hidden` adicionado em `html` e `body`.
  Com 10 itens de navegação, o header ultrapassava o `max-width` de 1100px em
  viewports próximas desse limite, causando scroll lateral.
  Adicionalmente: `padding` lateral do `.header-inner` reduzido de `space-8`
  para `space-6`; `gap` reduzido de `space-8` para `space-4`; `font-size` dos
  `.nav-link` reduzido de `text-sm` para `text-xs`; `padding` horizontal dos
  links de `space-3` para `space-2`. O `#site-header` recebeu `overflow: hidden`
  como barreira extra.

### Corrigido — Espaçamento do módulo de Argumentação

Mesmas correções aplicadas ao módulo de Regras (v0.10.1) agora aplicadas
às três seções com accordions no módulo de Argumentação:

**Falácias Formais e Falácias Informais:**
- Cabeçalho de cada falácia: padding `space-4/space-5` → `space-5/space-6`;
  título de `text-base` para `text-lg`; `flex-shrink:0` no ícone toggle.
- Corpo: substituídos blocos com `margin-bottom:space-4` por divisores
  horizontais de 1px (`margin:space-5 space-6`), criando ritmo claro entre
  Forma Lógica / Exemplo / Por que falha / Como rebater.
- Todo o padding do corpo agora é explicitamente `space-6` nas laterais,
  em vez de `space-5` aplicado ao container todo.
- Textos de conteúdo: font-size `text-sm` → `text-base`; `line-height` 1.6–1.75
  em todos os parágrafos de leitura.
- Bloco "Como rebater": `padding-left:space-3` → `space-5`.
- Variantes (Falácias Informais): label com uppercase/letter-spacing; chips
  com padding `2px 8px` → `space-1 space-3` e cor `ink-ghost` → `ink-light`.

**Como Rebater:**
- Cabeçalho de cada técnica: padding `space-4/space-5` → `space-5/space-6`.
- Grid interno: gap `space-6` → `space-8`; padding `space-5` → `space-6`.
- Descrição: `line-height:1.8` explícito; font-size `text-base` mantido.
- Passos: gap entre `<li>` de `space-2` → `space-3`; font-size `text-sm` → `text-base`.
- Box "Exemplo em uso": padding `space-4` → `space-5`; label com `space-3` → `space-4`
  de margem inferior.

## [0.10.1] — 2026-03-04

### Corrigido — Espaçamento do módulo Regras da Língua Portuguesa

- `modules/rules/rules.js` — Ajustes de espaçamento e ritmo visual:

  Tabs: adicionado `margin-right:var(--space-1)` e aumentado padding horizontal
  de `space-5` para `space-6`, separando visualmente os botões de nível.
  Indicador ativo trocado de 2px para 3px de espessura.

  Cabeçalho do card: alinhamento vertical trocado de `baseline` para `center`;
  padding aumentado de `space-4/space-5` para `space-5/space-6`; número da
  regra trocado para `font-ui` com `letter-spacing` em vez de `font-display`,
  deixando a hierarquia mais clara; título com `line-height:1.2`.

  Corpo do card: padding unificado em `space-6/space-8` (antes dividido entre
  body container e wrap interno com `paddingTop` separado).

  Seções internas: substituídas margens `space-4/space-1` por separadores
  horizontais (`makeSectionDivider`, 1px, `space-5` acima e abaixo), criando
  ritmo claro entre "O que é", "Função gramatical", "Exemplos" e "Subdivisões".
  Label das seções ganhou `margin-bottom:space-2` (antes `space-1`).
  Texto das seções: `line-height:1.75` (antes 1.7).

  Exemplos: gap entre items de `space-2` para `space-3`; padding interno de
  `space-2/space-3` para `space-3/space-4`; font-size de `text-sm` para
  `text-base`; `line-height:1.65`.

  Subtipos: padding dos chips de `space-3/space-4` para `space-4/space-5`;
  gap do grid de `space-3` para `space-4`; min-width de 260px para 280px;
  margens internas aumentadas: nome→def `space-1→space-2`, def→ex `space-2→space-3`;
  `line-height` adicionado em def (1.6) e ex (1.5).

  `makeSection` simplificado: removido parâmetro `color` (sempre `ink-mid`);
  removida `marginTop` (agora gerenciada pelos divisores).

## [0.10.0] — 2026-03-04

### Adicionado — Módulo Regras da Língua Portuguesa

**`modules/rules/rules.js`** — 4 tabs, 23 regras, cards accordion.

Organiza as regras da língua portuguesa em quatro níveis de progressão curricular
seguindo a BNCC, de acordo com o documento "Arquitetura Normativa da Língua
Portuguesa: Uma Análise Sistêmica da Progressão Curricular".

**Estrutura de cada regra**: número de ordem, nome, definição técnica,
função gramatical, exemplos práticos com marcação ✔/❌ onde relevante,
e subtipos em grid quando a regra comporta subdivisões (ex.: tipos de colocação
pronominal, tipos de orações subordinadas, tipos de variação linguística).

**Tab 1 — Ensino Fundamental I (7 regras)**: alfabeto, formação de sílabas
(com subtipos: CV, CVC, ditongo), uso de maiúsculas, pontuação básica (com
subtipos: ponto, vírgula, interrogação, exclamação), singular e plural, gênero
das palavras, tempos verbais básicos.

**Tab 2 — Ensino Fundamental II (5 regras)**: classes de palavras (10 subtipos
detalhados), concordância nominal, concordância verbal, acentuação gráfica (com
subtipos: oxítona, paroxítona, proparoxítona), divisão silábica.

**Tab 3 — Ensino Médio (7 regras)**: regência verbal, regência nominal, crase,
colocação pronominal (com subtipos: próclise, ênclise, mesóclise), período
simples e composto (com subtipos: coordenação, subordinação), orações
subordinadas (com subtipos: substantiva, adjetiva, adverbial), figuras de
linguagem (7 subtipos: metáfora, comparação, hipérbole, ironia, personificação,
eufemismo, antítese).

**Tab 4 — Ensino Superior (4 regras)**: coesão textual (com subtipos:
referencial, sequencial, lexical), coerência textual, norma culta, variação
linguística (com subtipos: diatópica, diastrática, diafásica).

**Integrações:**
- `index.html` — botão "Regras" adicionado à navegação (módulo 09)
- `js/main.js` — rota `/modulo/regras` registrada (sem dependência de dados externos)
- `modules/home.js` — card do módulo 09 adicionado

## [0.9.1] — 2026-03-04

### Corrigido — SyntaxError no módulo de Argumentação

- `modules/argumentation/argumentation.js` — Duas strings JS delimitadas por
  aspas simples continham aspas simples literais no interior, causando
  `SyntaxError: missing } after property list` ao carregar o módulo.
  Linhas 784 e 802 (campo `ex:` das técnicas Distinguo e Interrogatio Socrática)
  tiveram seus delimitadores externos trocados de `'...'` para `` `...` ``
  (template literal), resolvendo o conflito sem alterar o conteúdo.

## [0.9.0] — 2026-03-04

### Corrigido — Logo do header quebrava em múltiplas linhas

- `css/style.css` — `.site-logo` alterado de `align-items: baseline` para
  `align-items: center` e adicionado `flex-shrink: 0` para impedir que o
  container do logo encolha quando o nav pressiona o espaço disponível.
  `.site-logo-word` e `.site-logo-sub` receberam `white-space: nowrap`,
  garantindo que "Verbum" e "Língua Portuguesa & Literatura" permaneçam
  em linha única em qualquer largura de viewport.

### Atualizado — README

- Reescrito para refletir o estado atual do projeto (v0.8.0 → v0.9.0):
  módulos 07 (Poesia) e 08 (Argumentação) documentados com tabelas de
  conteúdo por tab; módulo 03 (Sintaxe) atualizado com tabela dos 25
  conceitos por nível; módulo 06 (Escrita) atualizado com nota sobre
  exemplos pré-carregados; seção de Navegação documenta o comportamento
  do hambúrguer em mobile; campo `hint_highlight` documentado com
  comportamento de fallback; tabela de rotas completa; seção
  "Melhorias planejadas" substituiu "Expansão futura" com os três
  itens concretos identificados na auditoria.

## [0.8.0] — 2026-03-04

### Corrigido

**Problema 3 — Navegação em telas pequenas**

- `css/style.css` — Botão hambúrguer (`#nav-toggle`) adicionado com animação de
  abertura/fechamento (três barras → X via CSS). Em mobile (≤768px), o nav deixa de
  ser uma barra horizontal e vira dropdown posicionado absolutamente abaixo do header.
  A `.nav-link` ganha `white-space:nowrap` no desktop para evitar quebra de linha
  com 9 itens.

- `css/style.css` — `#nav-active-label` adicionado: elemento oculto no desktop que
  em mobile exibe o nome do módulo ativo ao lado do logo (cor dourada, uppercase).
  Elimina a necessidade de abrir o menu só para saber onde se está.

- `index.html` — Botão `#nav-toggle` (três `<span>`) e `#nav-active-label` inseridos
  no `.header-inner` entre o logo e o nav.

- `js/main.js` — `updateNavActive` atualiza `#nav-active-label` com o label do módulo
  ativo e fecha o dropdown ao navegar. Lógica de toggle e fechamento ao clicar fora
  adicionada em `init()`.

**Problema 4 — `hint_highlight` ausente em exercícios**

- `components/exercise-engine.js` — Linha 257: substituído
  `highlightWords(textViewer, exercise.hint_highlight ?? targets, false)` por
  construção explícita com `filter` que: (1) prefere `hint_highlight` se presente e
  não vazio, (2) cai em `targets` como fallback, (3) filtra strings vazias ou
  inválidas, (4) só chama `highlightWords` se o array resultante tiver ao menos um
  elemento. Elimina chamadas silenciosas com array vazio ou `undefined`.

**Problema 5 — Módulo de Escrita sem ponto de entrada**

- `modules/writing/writing.js` — `renderEscrita` passa a aceitar `textsData`
  (parâmetro opcional). Se fornecido, renderiza chips de exemplos pré-carregados
  acima do textarea: um texto por gênero (preferência: intermediário → básico →
  avançado), máximo 6, mostrando gênero e sobrenome do autor. Clicar no chip carrega
  o texto no textarea e marca o chip como ativo. Retrocompatível: sem argumento,
  o módulo funciona exatamente como antes.

- `js/main.js` — Rota `/modulo/escrita` passa a chamar `ensureDataLoaded()` antes
  de importar o módulo, e repassa `textsData` para `renderEscrita`.

- `modules/writing/writing.js` — Constante `GENRE_LABEL` adicionada para exibir
  labels legíveis (ex.: "artigo de opinião" → "Opinião").

## [0.7.0] — 2026-03-04

### Modificado — Expansão do módulo de Sintaxe

**`modules/syntax/syntax.js`** — Reescrito. 649 linhas.

**Banco de frases:** expandido de 5 para 25 frases distribuídas em três níveis.

Conceitos adicionados por nível:

Básico (8 frases): ordem SVO básica, objeto direto e indireto, predicativo com
verbo de ligação, negação com advérbio, pronome oblíquo como objeto direto, locução
verbal com auxiliar + gerúndio, verbo ser + predicativo nominal, interrogativa direta.

Intermediário (10 frases): adjunto adverbial deslocado para ênfase, oração
subordinada como sujeito, voz passiva analítica, aposto explicativo entre vírgulas,
vocativo isolado por vírgulas, oração relativa restritiva, coordenação adversativa
com mas, gerúndio como adjunto adverbial de modo, discurso indireto com oração
completiva, predicativo antecipado para ênfase.

Avançado (7 frases): indeterminação do sujeito com se, hipérbato, subordinação
adverbial causal anteposta, oração reduzida de infinitivo como sujeito, próclise
obrigatória com palavra atrativa, anacoluto, inversão poética com oração consecutiva.

**Navegação:** substituída de scroll contínuo para uma frase por vez, com dois
filtros (nível e conceito), indicador "N de 25", pontos de navegação clicáveis
com tooltip do conceito, botões Anterior/Próxima e scroll automático ao navegar.

**Refatoração interna:** funções auxiliares `makePoolLabel`, `makePool` e `makeBtn`
extraídas para eliminar duplicação. Lógica de exercício individual (`createSentenceExercise`)
preservada sem alteração de interface.

## [0.6.0] — 2026-03-04

### Corrigido

- **`modules/literature/literature.js`** — Pluralização do badge de obras corrigida.
  "3 obra disponível" → "3 obras disponíveis". A lógica agora cobre singular e plural
  de "obra/obras" e "disponível/disponíveis" independentemente.

### Adicionado — Módulo de Poesia

**`modules/poetry/poetry.js`** — 5 tabs, integrado com os 9 poemas do banco de textos.

**Tab 1 — Poemas**: Lista filtrável por autor e nível de todos os textos com
`genre === 'poesia'`. Visor individual com texto preservando quebras de verso,
análise estrutural automática (contagem de versos e estrofes, tipo de estrofe,
esquema rimático detectado, figuras sonoras heurísticas) e exercícios do banco.

**Tab 2 — Versificação**: Tabela de tipos de estrofe do monóstico ao soneto com
definição e contexto histórico. Quiz interativo de identificação com 3 poemas reais
(Drummond, Pessoa, Camões).

**Tab 3 — Rima**: Tipos de rima (perfeita, toante, interpolada, verso branco/livre,
rica) com visualização interativa dos esquemas ABAB, ABBA e AAAA com exemplos
literários. Quiz de identificação de esquema rimático.

**Tab 4 — Figuras Sonoras**: Aliteração, assonância, onomatopeia, anáfora,
paronomásia, eufonia — com definição, exemplo e efeito estético. Quiz com trechos
de Bandeira, Pessoa e Alencar.

**Tab 5 — Metro**: Tabela de metros canônicos (redondilha menor/maior, decassílabo,
alexandrino, verso livre). Contador interativo de sílabas poéticas com detecção de
regras básicas de elisão.

**Análise automática (heurísticas, sem NLP)**: número de versos/estrofes, tipo de
estrofe pelo nome canônico, esquema rimático por comparação de terminações, figuras
sonoras por anáfora (repetição de primeiras palavras), aliteração (consoantes) e
onomatopeia (lista léxica).

**Integrações:**
- `index.html` — botão "Poesia" adicionado à navegação
- `js/main.js` — rota `/modulo/poesia` registrada
- `modules/home.js` — card do módulo 07 adicionado

---

## [0.5.0] — 2026-03-04

### Adicionado — Módulo de Argumentação

**`modules/argumentation/argumentation.js`** — 1049 linhas, 6 tabs.

**Tab 1 — Disputatio**
O método medieval de debate estruturado (séc. XII–XV, universidades de Paris, Bologna e Oxford).
As quatro partes: Quaestio (a questão), Objectio (a objeção), Determinatio (a posição fundamentada),
Responsio ad Objectiones (resposta individual a cada objeção). Os seis princípios do debatedor honesto:
caridade, distinção, carga da prova, relevância, consistência, boa-fé. Builder interativo onde o aluno
pratica uma disputatio completa com questão gerada aleatoriamente e validação de substância.

**Tab 2 — Estrutura do Argumento**
Anatomia do argumento: premissa, conclusão, inferência, com exemplo visual do silogismo de Sócrates.
Validade vs. solidez com exemplos de cada. Quatro formas silogísticas: Modus Ponens, Modus Tollens,
Silogismo Hipotético, Silogismo Disjuntivo. Dedução, indução e abdução com definição e exemplo.

**Tab 3 — Falácias Formais**
Seis falácias de estrutura lógica com accordion expandível: Afirmação do Consequente, Negação do
Antecedente, Falácia do Meio Não-Distribuído, Quatro Termos, Non Sequitur, Petição de Princípio.
Cada uma com: forma lógica, exemplo, por que falha, como rebater.

**Tab 4 — Falácias Informais**
Catálogo de ~20 falácias organizadas por categoria com busca em tempo real:
- Relevância: Ad Hominem (+ circunstancial), Apelo à Autoridade, Apelo às Massas, Apelo à Emoção, Apelo à Ignorância
- Pressuposição: Falsa Dicotomia, Pergunta Capciosa, Equívoco, Composição e Divisão
- Causalidade: Post Hoc, Inclinação Escorregadia, Causa Única
- Distorção: Espantalho, Caricatura, Falsa Equivalência
- Indução Fraca: Generalização Apressada, Apelo à Natureza, Apelo à Tradição
Cada falácia: definição, exemplo, como rebater, variantes.

**Tab 5 — Como Rebater**
Seis técnicas de refutação com passos e exemplo em uso:
Reductio ad Absurdum, Distinguo (A Distinção), Reductio contra Rem (Contrapelo),
Dilemma, Interrogatio Socrática, Exceptio (A Exceção). Seis regras de ouro do rebatedor honesto.

**Tab 6 — Treino**
10 argumentos reais com falácias ocultas. Múltipla escolha com 4 opções (1 correta + 3 aleatórias
sorteadas do catálogo completo). Feedback com explicação detalhada após cada resposta. Barra de
progresso, placar de acertos, mensagem final calibrada por desempenho. Casos embaralhados a cada sessão.

**Integrações:**
- `index.html` — botão "Argumentação" adicionado à navegação
- `js/main.js` — rota `/modulo/argumentacao` registrada (sem dependência de dados externos)
- `modules/home.js` — card do módulo 08 adicionado

---

## [0.4.0] — 2026-03-04

### Corrigido

- **`modules/literature/literature.js`** — Pluralização do badge de obras corrigida:
  "3 obra disponível" → "3 obras disponíveis" (lógica agora cobre singular/plural de 'obra' e 'disponível/disponíveis')

### Adicionado

- **`modules/poetry/poetry.js`** — Módulo de Poesia completo, com 5 seções em tabs:

  **Tab 1 — Poemas**: Lista filtrável (por autor e nível) de todos os textos com `genre === 'poesia'`
  do banco. Visor individual com texto preservando quebras de verso, análise estrutural automática
  (versos, estrofes, tipo, esquema rimático, figuras detectadas) e exercícios do banco de textos.

  **Tab 2 — Versificação**: Tabela de tipos de estrofe (monóstico ao soneto) com definição e
  contexto histórico. Quiz interativo de identificação de estrofe com 3 poemas reais.

  **Tab 3 — Rima**: Tipos de rima (perfeita, toante, interpolada, verso branco/livre, rica) com
  visualização de esquemas ABAB, ABBA e AAAA com exemplos literários reais. Quiz de identificação
  de esquema rimático.

  **Tab 4 — Figuras Sonoras**: Aliteração, assonância, onomatopeia, anáfora, paronomásia, eufonia —
  com definição, exemplo e efeito estético. Quiz com trechos de Bandeira, Pessoa e Alencar.

  **Tab 5 — Metro**: Tabela de metros canônicos (redondilha menor/maior, decassílabo, alexandrino).
  Contador interativo de sílabas poéticas com aplicação de regras de elisão.

- **`modules/home.js`** — Card do módulo Poesia adicionado (módulo 07)
- **`index.html`** — Link "Poesia" adicionado à navegação principal
- **`js/main.js`** — Rota `/modulo/poesia` registrada

### Análise automática de poemas

O módulo detecta automaticamente (heurísticas, sem NLP):
- Número de versos e estrofes
- Tipo de estrofe pelo nome canônico
- Esquema rimático por comparação de terminações
- Figuras sonoras (anáfora por repetição de primeiras palavras, aliteração por consoantes, onomatopeia por lista léxica)

---

## [0.3.0] — 2026-03-04

### Adicionado — Expansão do banco de textos

**`data/texts.json`** expandido de 4 para 34 textos, com 71 exercícios no total.

**Cobertura por nível:**
- Básico: 7 textos
- Intermediário: 14 textos
- Avançado: 13 textos

**Cobertura por gênero:**
- Romance: 13 · Poesia: 9 · Conto: 5
- Textos não-ficcionais e didáticos: 7 (artigo de opinião, crônica, dissertação, narrativa, texto científico, texto instrucional, prosa não-ficcional)

**Autores literários adicionados (novos em relação à v0.2.0):**
- Fernando Pessoa (Álvaro de Campos e Alberto Caeiro)
- Graciliano Ramos
- Carlos Drummond de Andrade
- João Guimarães Rosa
- Eça de Queirós
- Érico Veríssimo
- Manuel Bandeira
- Adélia Prado
- Euclides da Cunha

**Autores com cobertura expandida:**
- Machado de Assis: 1 → 4 textos (Dom Casmurro, O Espelho, Memórias Póstumas, Missa do Galo)
- Clarice Lispector: 1 → 4 textos (Amor, A Hora da Estrela, Laços de Família, Felicidade Clandestina)
- Lima Barreto: 1 → 2 textos
- José de Alencar: 1 → 2 textos
- Luís de Camões: 1 → 2 textos (Os Lusíadas e soneto)

**Tipos de exercício distribuídos nos novos textos:**
- `estrutura` — identificação de sujeito, verbo, adjunto, figuras sintáticas
- `interpretacao` — múltipla escolha sobre sentido e argumento
- `tom` — identificação do tom/atitude do narrador
- `fato_opiniao` — classificação de afirmações
- `inferencia` — conclusões implícitas no texto
- `figuras` — identificação de recursos estilísticos (metáfora, anáfora, quiasmo, perífrase, sinestesia, paradoxo, gradação, símile)

**Recursos estilísticos cobertos pelos exercícios:**
Anáfora, antítese, epanortose, gradação, hipérbole, ironia, metáfora, paradoxo, perífrase, quiasmo, símile, sinestesia, discurso indireto livre, intertextualidade (Drummond × Adélia Prado, Camões × Virgílio).

---

## [0.2.0] — 2026-03-04

### Adicionado

- **`js/api.js`** — Camada de serviço para APIs externas:
  - `fetchEtymology(word)` — busca etimologia no Wiktionary PT via MediaWiki API
  - `fetchDefinition(word)` — busca definição e classe gramatical no Wiktionary PT
  - `fetchGutenbergExcerpt(id, charLimit)` — carrega trecho de obra do Project Gutenberg
  - Cache automático em `localStorage` com TTL de 7 dias

- **`js/wordnet.js`** — Serviço de léxico (OpenWordNet-PT):
  - Carrega `data/wordnet.json` bundlado — sem chamada externa
  - Expõe `lookupWord`, `getSynonyms`, `getAntonyms`, `getDefinition`, `getHypernym`, `listAllWords`

- **`data/wordnet.json`** — Subconjunto pedagógico do OpenWordNet-PT (20 entradas, CC-BY-SA)

### Modificado

- **`modules/etymology/etymology.js`** — Reescrito com integração Wiktionary
- **`modules/literature/literature.js`** — Integração com Project Gutenberg
- **`modules/writing/writing.js`** — Integração com WordNet para sugestão de sinônimos
- **`data/authors.json`** — Campos `gutenberg_works[]` adicionados por autor

---

## [0.1.0] — 2026-03-04

### Adicionado

- Arquitetura completa com ES Modules nativos
- `js/router.js` — roteador hash-based com suporte a parâmetros
- `js/state.js` — gerenciamento de estado com pub/sub e localStorage
- `components/text-viewer.js` — tokenizador e componente interativo de texto
- `components/exercise-engine.js` — motor de exercícios com 5 tipos suportados
- 6 módulos: Leitura Estrutural, Interpretação, Sintaxe, Etimologia, Literatura, Escrita
- `data/texts.json` — 4 textos literários com exercícios declarativos
- `data/authors.json` — 5 autores com metadados completos
- `data/etymology.json` — 9 palavras com etimologia pedagógica enriquecida
- Estética editorial tipográfica com Playfair Display + Crimson Text
- Suporte a alto contraste, navegação por teclado, aria-labels
- Funciona completamente offline (dados locais)

---

---

---

---

---

---

---

---

---
