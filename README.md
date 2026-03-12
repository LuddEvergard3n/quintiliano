# Quintiliano — Sistema Educacional de Língua Portuguesa e Literatura

## Visão geral

Quintiliano é um ambiente interativo de língua portuguesa e literatura. O objetivo central não é ensinar regras gramaticais, mas ensinar como textos funcionam: como ler com profundidade, como identificar estrutura sintática, como entender o funcionamento de palavras e como a literatura se situa historicamente.

**v0.21.0** — 21 rotas, 69 testes, 16 módulos temáticos + ABL + Grandes Nomes + Prêmios Literários + Sobre + Guia do Professor + Plano de Aula + página inicial. Zero dependências externas.

Faz parte de um ecossistema educacional composto por:
- **Heródoto** — [visualização histórica](https://luddevergard3n.github.io/Herodoto/) (tempo, espaço, contexto)
- **Euclides** — [raciocínio matemático](https://luddevergard3n.github.io/euclides/) manipulável
- **Quintiliano** — [interpretação e estrutura textual](https://luddevergard3n.github.io/quintiliano/)
- **Lavoisier** — [laboratório virtual de química](https://luddevergard3n.github.io/lavoisier/)
- **Humboldt** — [visualização geográfica](https://luddevergard3n.github.io/humboldt/)
- **Archimedes** — [simulações de física](https://luddevergard3n.github.io/archimedes/)
- **Johnson** — [língua inglesa](https://luddevergard3n.github.io/johnson-english/)


## Documentação

O diretório `docs/` contém toda a documentação do projeto:

- `CHANGELOG.md` — Histórico completo de versões (v0.1.0 → atual)
- `ARCHITECTURE.md` — Decisões de design, fluxo de dados e convenções de código
- `DATA.md` — Esquema e guia de edição dos arquivos JSON
- `MODULES.md` — Referência técnica de todos os módulos: contrato de render, dados internos, como adicionar conteúdo
- `CONTENT.md` — Guia editorial: esquemas JSON, regras de validação, critérios de seleção
- `ROADMAP.md` — Melhorias planejadas priorizadas

---

## Arquitetura

### Princípios de design

- **Zero dependências externas**: sem frameworks, sem bundlers, sem transpilers
- **ES Modules nativos**: cada arquivo JS é um módulo com `import`/`export` explícitos
- **Carregamento lazy**: módulos são importados dinamicamente apenas quando a rota é acessada
- **Offline-first**: todos os dados são JSON locais; sem chamadas a APIs externas
- **Análise heurística**: sem NLP pesado; toda análise é baseada em dados declarativos e heurísticas determinísticas

### Estrutura de arquivos

```
/quintiliano
│
├── index.html                   # Ponto de entrada único
│
├── /css
│   ├── theme.css                # Variáveis CSS (cores, tipografia, espaçamento)
│   └── style.css                # Estilos completos da aplicação
│
├── /js
│   ├── main.js                  # Bootstrap: carrega dados, registra rotas, inicia roteador
│   ├── router.js                # Roteador hash-based com suporte a parâmetros de rota
│   ├── state.js                 # Gerenciamento de estado com pub/sub e persistência localStorage
│   ├── api.js                   # Utilitários de carregamento de dados JSON
│   └── wordnet.js               # Interface com OpenWordNet-PT (sinônimos e antônimos)
│
├── /modules
│   ├── home.js                  # Página inicial com grid de módulos
│   ├── /reading
│   │   └── reading.js           # Módulo 01: Leitura Estrutural
│   ├── /interpretation
│   │   └── interpretation.js    # Módulo 02: Interpretação de Texto
│   ├── /syntax
│   │   └── syntax.js            # Módulo 03: Sintaxe e Construção de Frases
│   ├── /etymology
│   │   └── etymology.js         # Módulo 04: Etimologia
│   ├── /literature
│   │   └── literature.js        # Módulo 05: Literatura
│   ├── /writing
│   │   └── writing.js           # Módulo 06: Escrita e Análise Estrutural
│   ├── /poetry
│   │   └── poetry.js            # Módulo 07: Poesia
│   ├── /argumentation
│   │   └── argumentation.js     # Módulo 08: Argumentação
│   ├── /sobre
│   │   └── sobre.js                 # Sobre o Quintiliano (nome, filosofia, ecossistema)
│   ├── /guia
│   │   └── guia.js                  # Guia do Professor (atividades, BNCC, limitações)
│   ├── /plano-aula
│   │   └── plano-aula.js            # Gerador de Plano de Aula (BNCC, presets, impressão)
│   ├── /grandes-nomes
│   │   └── grandes-nomes.js     # Módulo 16: Grandes Nomes da Língua Portuguesa
│   └── /abl
│       └── abl.js               # Academia Brasileira de Letras
│
├── /components
│   ├── text-viewer.js           # Componente de texto interativo (tokenizer + highlight)
│   └── exercise-engine.js       # Motor de exercícios (múltipla escolha, estrutural, fato/opinião)
│
└── /data
    ├── texts.json               # Textos literários com exercícios declarados (~34 textos, ~71 exercícios)
    ├── authors.json             # Perfis de 15 autores brasileiros e portugueses
    ├── etymology.json           # Dados etimológicos de palavras
    ├── etymology.json           # Dados etimológicos (45 entradas: latim, grego, árabe, tupi, quimbundo)
    └── wordnet.json             # Subconjunto do OpenWordNet-PT (sinônimos, antônimos, definições)
```

---

## Módulos

### 01. Leitura Estrutural (`/modulo/leitura`)

Seleciona um texto do banco e permite clicar em palavras para classificá-las morfossintaticamente: sujeito, verbo, objeto, adjunto. A categoria ativa é selecionada na legenda. O sistema verifica a análise por exercícios declarados em `texts.json`.

**Componentes**: `text-viewer.js`, `exercise-engine.js`  
**Tipo de exercício**: `estrutura`

### 02. Interpretação (`/modulo/interpretacao`)

Exibe trechos literários e propõe questões de múltipla escolha sobre ideia principal, tom do autor, fato vs. opinião e inferência. O botão "Dica" destaca palavras relevantes no texto sem revelar a resposta.

**Tipos de exercício**: `interpretacao`, `tom`, `fato_opiniao`, `inferencia`

### 03. Sintaxe e Construção (`/modulo/sintaxe`)

O usuário reorganiza tokens embaralhados de frases para reconstruir a ordem correta. Navegação uma frase por vez com filtros por nível e conceito. Banco de 25 frases distribuídas em três níveis.

| Nível | Frases | Conceitos |
|---|---|---|
| Básico | 8 | Ordem SVO, OD/OI, predicativo, verbo de ligação, negação, pronome clítico, locução verbal, interrogativa |
| Intermediário | 10 | Adjunto deslocado, sujeito oracional, voz passiva, aposto, vocativo, relativa, coordenação, gerúndio, discurso indireto, ênfase |
| Avançado | 7 | Indeterminação, hipérbato, causal anteposta, sujeito infinitivo, próclise, anacoluto, inversão poética |

**Dados**: declarados diretamente no módulo (`SENTENCES[]`)  
**Interface**: drag-and-drop HTML5 com fallback por clique

### 04. Etimologia (`/modulo/etimologia`)

Exibe origem, evolução e família de palavras do português. Busca em tempo real filtra por palavra, raiz ou língua de origem. Cognatos em outras línguas são exibidos por idioma. Palavras da família navegáveis por clique.

**Dados**: `etymology.json`

### 05. Literatura (`/modulo/literatura`)

Grid de autores com cards resumidos. Ao clicar, navega para o perfil completo: biografia, estilo, contexto histórico e lista de obras com links para o Projeto Gutenberg. A rota `/autor/:id` resolve o perfil dinamicamente.

**Dados**: `authors.json` (15 autores)

### 06. Escrita (`/modulo/escrita`)

O usuário cola ou escreve um texto — ou carrega um exemplo pré-definido do banco de textos (um por gênero). O sistema realiza análise estrutural determinística:

- Contagem de palavras, frases e parágrafos
- Média de palavras por frase
- Detecção de frases com mais de 40 palavras
- Detecção de palavras de conteúdo repetidas 3+ vezes (exclui stop words)
- Cálculo de diversidade lexical (Type-Token Ratio)
- Sinônimos e antônimos via OpenWordNet-PT para palavras redundantes

**Sem IA generativa.** Toda análise é baseada em heurísticas explícitas.

### 07. Poesia (`/modulo/poesia`)

| Tab | Conteúdo |
|---|---|
| Poemas | Visor com análise estrutural automática dos 9 poemas do banco |
| Versificação | Tipos de estrofe do monóstico ao soneto com quiz |
| Rima | Esquemas ABAB, ABBA, AAAA com exemplos literários e quiz |
| Figuras Sonoras | Aliteração, assonância, onomatopeia, anáfora, paronomásia, eufonia |
| Metro | Metros canônicos e contador interativo de sílabas poéticas |

**Dados**: textos com `genre === 'poesia'` de `texts.json` (9 poemas: Camões, Pessoa, Drummond, Bandeira, Adélia Prado)

### 08. Argumentação (`/modulo/argumentacao`)

| Tab | Conteúdo |
|---|---|
| Disputatio | Método medieval: Quaestio → Objectio → Determinatio → Responsio. Builder interativo |
| Argumento | Premissas, conclusão, validade, solidez, silogismo, dedução/indução/abdução |
| Falácias Formais | 6 falácias de estrutura lógica com accordion |
| Falácias Informais | ~20 falácias em 5 categorias com busca em tempo real |
| Como Rebater | 6 técnicas: Reductio ad Absurdum, Distinguo, Contrapelo, Dilemma, Socrática, Exceptio |
| Treino | 10 argumentos com falácia oculta, múltipla escolha, feedback e placar |

**Dados**: declarados diretamente no módulo. Sem dependência de `texts.json`.


### 09. Regras da Língua Portuguesa (`/modulo/regras`)

23 regras organizadas em quatro níveis de progressão curricular (BNCC). Cada regra exibe definição técnica, função gramatical, exemplos práticos e subtipos em grid quando aplicável. Interface em accordion por regra, navegada por tabs de nível.

| Tab | Regras | Conceitos centrais |
|---|---|---|
| Fund. I | 7 | Alfabeto, sílabas, maiúsculas, pontuação básica, plural, gênero, tempos verbais |
| Fund. II | 5 | 10 classes de palavras, concordância nominal e verbal, acentuação, divisão silábica |
| Ensino Médio | 7 | Regência, crase, colocação pronominal, período composto, subordinadas, figuras |
| Superior | 4 | Coesão, coerência, norma culta, variação linguística |

**Dados**: declarados diretamente no módulo. Sem dependência de arquivos externos.

---

## Sistema de exercícios

### Ciclo pedagógico

1. Instrução curta e clara
2. Interação direta com o texto
3. Verificação imediata
4. Feedback com explicação (não apenas "certo/errado")
5. Dica disponível (destaque visual, sem revelar resposta)

### Tipos de exercício

| Tipo | Descrição |
|---|---|
| `estrutura` | Clique em tokens do texto para selecionar elementos sintáticos |
| `interpretacao` | Múltipla escolha sobre sentido e argumento |
| `tom` | Múltipla escolha sobre voz e tom do autor |
| `fato_opiniao` | Classificar itens como fato ou opinião do narrador |
| `inferencia` | Múltipla escolha sobre inferências implícitas |
| `figuras` | Identificação de figuras de linguagem no texto |

### Campo `hint_highlight`

Opcional em todos os tipos. Quando presente e não vazio, habilita o botão "Dica" que destaca palavras no texto. Nos tipos `estrutura` e `figuras`, se ausente, o sistema usa os `targets` do exercício como fallback. Arrays vazios e valores inválidos são filtrados antes de qualquer chamada ao viewer.

### Adicionando exercícios

Edite `data/texts.json`. Estrutura de múltipla escolha:

```json
{
  "type": "interpretacao",
  "instruction": "Qual é a função narrativa desta frase?",
  "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
  "correct": 1,
  "hint_highlight": ["palavras", "relevantes"],
  "explanation": "Explicação pedagógica que aparece após a resposta."
}
```

---

## Navegação

### Desktop

Barra horizontal fixa no topo com os 9 links (Início + 8 módulos). O link ativo recebe a classe `.active`. O subtítulo do logo usa `white-space: nowrap` e o container tem `flex-shrink: 0` para não quebrar linha independentemente do número de itens no nav.

### Mobile (≤ 768px)

O nav é substituído por um botão hambúrguer (três barras → X via CSS puro, sem JS extra). Ao abrir, os links são exibidos em coluna posicionada abaixo do header. Fecha automaticamente ao navegar ou clicar fora. O nome do módulo ativo é exibido no header ao lado do logo quando o menu está fechado.

---

## Roteamento

Hash-based routing via `window.location.hash`. Funciona offline sem configuração de servidor.

Rotas disponíveis:
- `#/` — Página inicial
- `#/modulo/leitura` — Leitura Estrutural
- `#/modulo/interpretacao` — Interpretação
- `#/modulo/sintaxe` — Sintaxe e Construção
- `#/modulo/etimologia` — Etimologia
- `#/modulo/literatura` — Literatura
- `#/modulo/escrita` — Escrita
- `#/modulo/poesia` — Poesia
- `#/modulo/argumentacao` — Argumentação
- `#/autor/:id` — Perfil de autor (ex: `#/autor/machado`)
- `#/modulo/grandes-nomes` — Grandes Nomes da Língua Portuguesa
- `#/abl` — Academia Brasileira de Letras
- `#/sobre` — Sobre o Quintiliano
- `#/guia` — Guia do Professor
- `#/plano-aula` — Gerador de Plano de Aula

---

## Deploy no GitHub Pages

O projeto inclui workflow CI/CD em `.github/workflows/test.yml` que:
1. Roda os 66 testes a cada push.
2. Se os testes passarem, faz deploy automático no GitHub Pages.

### Configuração inicial (uma vez)

1. No repositório GitHub: **Settings → Pages → Source → GitHub Actions**
2. Fazer push para `main` ou `master`
3. O workflow roda automaticamente — deploy em ~1 min após testes passarem

O arquivo `.nojekyll` na raiz é obrigatório — já está incluído. Sem ele, o GitHub Pages tenta processar o projeto como Jekyll e falha com ES Modules.

### URL do site

```
https://<seu-usuario>.github.io/<nome-do-repositorio>/
```

Todos os caminhos de `import` e `fetch` são relativos (`./data/`, `../modules/`) — funcionam independente do subpath do repositório.

---

## Como executar

**Não abre diretamente como `file://`** — ES Modules têm restrições de CORS para caminhos locais.

### Python (recomendado)

```bash
cd verbum
python3 -m http.server 8080
# Acessar: http://localhost:8080
```

### Node.js

```bash
npx serve verbum
```

### VS Code Live Server

Instale a extensão "Live Server" e clique em "Open with Live Server" no `index.html`.

---

## Adicionando conteúdo

### Novo texto

```json
{
  "id": "id_unico",
  "title": "Título",
  "author": "Nome do autor",
  "year": 1900,
  "level": "basico",
  "genre": "conto",
  "content": "Texto completo.",
  "exercises": []
}
```

### Nova frase (sintaxe)

Edite `SENTENCES[]` em `modules/syntax/syntax.js`:

```js
{
  id: 'x01',
  level: 'basico',           // 'basico' | 'intermediario' | 'avancado'
  concept: 'Nome do conceito',
  original: 'A frase completa.',
  explanation: 'Explicação sintática exibida após a verificação.',
}
```

### Novo módulo

1. Crie `modules/novo/novo.js` exportando `renderNovo()`
2. Registre em `js/main.js`: `router.register('/modulo/novo', async () => { ... })`
3. Adicione botão em `index.html` (nav) e card em `modules/home.js`

---

## Páginas institucionais

### Sobre (`/sobre`)

Coluna única (860px). Apresenta a origem do nome Quintiliano, filosofia do projeto em quatro princípios, métricas atuais e o ecossistema educacional completo com links para todos os sete projetos.

### Guia do Professor (`/guia`)

Sidebar 220px sticky + conteúdo longo. Cinco atividades práticas com nível, duração e variantes; tabela de módulos com nível BNCC; alinhamento de habilidades por módulo; limitações explícitas.

### Plano de Aula (`/plano-aula`)

Dois painéis: formulário (470px) + preview em tempo real. Habilidades BNCC por ano/série (EF 6–9 e EM 1–3), presets de objetivos/metodologia/recursos/avaliação, carga horária calculada automaticamente. `window.print()` com `@media print` robusto — produz PDF sem dependências.

---

## Compatibilidade

Chrome 80+, Firefox 75+, Edge 80+, Safari 14+.

Requer: ES Modules nativos, `async/await`, `fetch`, HTML5 Drag and Drop API.

---

## Acessibilidade

- Todos os elementos interativos são focáveis com Tab e ativáveis com Enter/Espaço
- Tokens clicáveis têm `role="button"` e `aria-label`
- Live region no `<main>` com `aria-live="polite"` anuncia trocas de rota
- Hambúrguer com `aria-expanded` e `aria-controls` corretos
- Suporte a alto contraste via `@media (prefers-contrast: high)`

---

## Melhorias planejadas

1. **Progresso do aluno** — `state.js` já tem infraestrutura completa (pub/sub + localStorage); falta ativar `updateProgress()` nos módulos e criar a rota `/progresso`
2. **Literatura → exercícios** — perfil do autor deveria linkar para os textos dele no banco
3. **Textos básicos estruturais** — Leitura Estrutural começa direto em Machado e Clarice; faltam textos de nível básico com exercício `estrutura`
