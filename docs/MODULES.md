# Quintiliano — Referência de Módulos

Documentação técnica de cada módulo: função de entrada, parâmetros, dados consumidos, estrutura interna e notas de manutenção.

---

## Convenções gerais

Todo módulo segue o mesmo contrato:

```js
// Assinatura mínima
export function renderNomeDoModulo(/* dados opcionais */) {
  const page = document.createElement('div');
  // ... constrói o DOM
  return page;  // HTMLElement
}
```

- A função retorna sempre um `HTMLElement` (nunca `null`).
- Estilos de escopo são declarados como string CSS injetada via `<style>` ao início do render — jamais como classes globais em `style.css`.
- Nenhum módulo faz chamadas `fetch` diretas — dados são passados como parâmetro ou declarados internamente.
- Nenhum módulo acessa `window.location` ou `document.querySelector` no corpo do módulo — apenas dentro de event listeners.

---

## Registro em `main.js`

Cada módulo tem uma rota registrada em `js/main.js` via `router.register(path, handler)`. O handler importa o módulo dinamicamente:

```js
router.register('/modulo/nome', async () => {
  const { renderNome } = await import('../modules/nome/nome.js');
  return renderNome();
});
```

Para módulos que precisam de dados JSON:

```js
router.register('/modulo/nome', async () => {
  await ensureDataLoaded();  // carrega textsData, authorsData, etymData
  const { renderNome } = await import('../modules/nome/nome.js');
  return renderNome(textsData);
});
```

---

## Índice de módulos

| # | Rota | Módulo | Função | Dados |
|---|------|--------|--------|-------|
| 01 | `/modulo/leitura` | `reading/reading.js` | `renderLeituraEstrutura(textsData)` | `texts.json` |
| 02 | `/modulo/interpretacao` | `interpretation/interpretation.js` | `renderInterpretacao(textsData)` | `texts.json` |
| 03 | `/modulo/sintaxe` | `syntax/syntax.js` | `renderSintaxe()` | interno |
| 04 | `/modulo/etimologia` | `etymology/etymology.js` | `renderEtimologia(etymData)` | `etymology.json` |
| 05 | `/modulo/literatura` | `literature/literature.js` | `renderLiteratura(authorsData, router)` | `authors.json` |
| 05b | `/autor/:id` | `literature/literature.js` | `renderAutorPerfil(authors, id, textsData, router)` | `authors.json`, `texts.json` |
| 06 | `/modulo/escrita` | `writing/writing.js` | `renderEscrita(textsData)` | `texts.json` |
| 07 | `/modulo/poesia` | `poetry/poetry.js` | `renderPoesia(textsData)` | `texts.json` |
| 08 | `/modulo/argumentacao` | `argumentation/argumentation.js` | `renderArgumentacao()` | interno |
| 09 | `/modulo/regras` | `rules/rules.js` | `renderRegras()` | interno |
| 10 | `/modulo/ortografia` | `orthography/orthography.js` | `renderOrtografia()` | interno |
| 11 | `/modulo/redacao` | `composition/composition.js` | `renderRedacao()` | interno |
| 12 | `/modulo/retorica` | `rhetoric/rhetoric.js` | `renderRetorica()` | interno |
| 13 | `/modulo/prosodia` | `prosody/prosody.js` | `renderProsodia()` | interno |
| 14 | `/modulo/coesao` | `cohesion/cohesion.js` | `renderCoesao()` | interno |
| 15 | `/modulo/variacao` | `variation/variation.js` | `renderVariacao()` | interno |
| 16 | `/modulo/grandes-nomes` | `grandes-nomes/grandes-nomes.js` | `renderGrandesNomes()` | interno |
| — | `/abl` | `abl/abl.js` | `renderABL()` | interno |
| — | `/` | `home.js` | `renderHome()` | interno |

---

## Módulos com dados declarados internamente

### Sintaxe (`syntax/syntax.js`)

**Estrutura de dados**: `SENTENCES[]` — array de objetos com campos:

```js
{
  id:          'b01',                    // string única por frase
  level:       'basico',                 // 'basico' | 'intermediario' | 'avancado'
  concept:     'Ordem básica SVO',       // rótulo exibido no card
  original:    'O menino correu.',       // frase a reconstituir
  explanation: 'Explicação sintática.', // exibida após verificação
}
```

**Banco atual**: 35 frases (8 básico, 15 intermediário, 12 avançado).

**Mecânica**: tokens embaralhados com drag-and-drop (HTML5 Drag API) e fallback por clique. A verificação compara a ordem dos tokens com a frase original normalizada.

**Como adicionar frases**: editar `SENTENCES[]` diretamente no módulo seguindo o padrão acima. O nível `'avancado'` deve conter construções marcadas: hipérbato, anacoluto, próclise obrigatória, períodos longos.

---

### Argumentação (`argumentation/argumentation.js`)

**Seis abas**: Disputatio, Argumento, Falácias Formais, Falácias Informais, Como Rebater, Treino.

**`TREINO_CASOS[]`**: 15 casos com falácia oculta, múltipla escolha, feedback e placar. Campos:

```js
{
  texto:    'Argumento completo apresentado ao usuário.',
  falacias: ['Nome da falácia principal'],
  opcoes:   ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
  correta:  1,   // índice base 0
  exp:      'Explicação por que é falácia e por que as outras opções estão erradas.',
}
```

**Como adicionar casos**: editar `TREINO_CASOS[]`. Manter equilíbrio entre os tipos: ad hominem, apelo à emoção, falsa dicotomia, espantalho, post hoc, generalização apressada.

---

### Ortografia (`orthography/orthography.js`)

**`TOPICS[]`**: 10 tópicos de referência com regras, exemplos e dica mnemônica. Campos:

```js
{
  id:    'hifen',          // identificador interno
  title: 'Hífen',         // título exibido
  icon:  '-',              // caractere decorativo
  rules: [
    {
      rule:     'Regra principal',
      detail:   'Explicação detalhada.',
      examples: ['Exemplo 1', 'Exemplo 2'],
      tip:      'Dica mnemônica.',
    },
  ],
}
```

**`EXERCISES[]`**: 41 exercícios de lacuna. Campos:

```js
{
  id:          'h01',
  topic:       'hifen',           // deve coincidir com um id de TOPICS
  sentence:    'Frase com ___lacuna___.',
  blank:       'palavra',         // resposta correta
  options:     ['op1', 'op2'],    // 2–4 opções
  correct:     0,                 // índice da opção correta (base 0)
  explanation: 'Por que esta é a forma correta.',
}
```

**Tópicos ativos**: `hifen`, `xch`, `sz`, `gj`, `porques`, `maumal`, `ondeondeonde`, `maismas`, `maumau` + 1 extra.

---

### Regras (`rules/rules.js`)

**`LEVELS[]`**: 4 níveis (efi, efii, em, es). Cada nível tem `rules[]` com campos:

```js
{
  num:      '01',           // número sequencial (string)
  name:     'Alfabeto',     // nome da regra
  def:      'Definição técnica.',
  func:     'Função gramatical.',
  examples: ['ex1', 'ex2', 'ex3'],
  subtypes: [               // opcional
    { name: 'Subtipo', def: 'Definição.', ex: 'Exemplo.' },
  ],
}
```

**Banco atual**: 26 regras (EFI: 7, EFII: 5, EM: 7, ES: 7).

---

### Retórica (`rhetoric/rhetoric.js`)

**`FIGURAS[]`**: 20 figuras retóricas. Campos obrigatórios:

```js
{
  nome:    'Anáfora',
  grupo:   'Repetição',         // agrupa figuras similares visualmente
  def:     'Definição formal.',
  efeito:  'Efeito retórico.',
  exemplo: '"Citação exemplar."',
  analise: 'Análise do exemplo — o que a figura faz neste contexto específico.',
  uso:     'Contextos típicos de uso.',
}
```

**`TREINO[]`**: 12 casos de treino — trechos literários com figura oculta. Campos:

```js
{
  texto:   'Trecho literário.',
  autor:   'Autor, Obra',
  figura:  'Nome da figura',
  analise: 'Análise do uso da figura neste trecho.',
  opcoes:  ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
  correta: 0,
}
```

---

### Prosódia (`prosody/prosody.js`)

**`EXERCICIOS[]`**: 18 exercícios de múltipla escolha. Campos:

```js
{
  id:   'p01',
  inst: 'Enunciado do exercício.',
  opts: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
  ok:   0,     // índice da opção correta
  exp:  'Explicação pedagógica.',
}
```

---

### Coesão e Coerência (`cohesion/cohesion.js`)

Quatro abas: Coesão, Conectivos, Coerência, Exercícios.

**`MECANISMOS[]`**: 5 mecanismos com exemplos e notas.  
**`CONECTIVOS[]`**: 8 tipos de conectivos com lista de termos, exemplo de uso e alerta.  
**`PROBLEMAS[]`**: 5 problemas de coerência com versão problemática e versão corrigida.  
**`EXERCICIOS[]`**: 15 exercícios de múltipla escolha — mesmo padrão de Prosódia.

---

### Variação Linguística (`variation/variation.js`)

Quatro abas: Tipos, Registros, Norma, Exercícios.

**`TIPOS[]`**: 4 tipos de variação (diatópica, diastrática, diafásica, diacrônica).  
**`REGISTROS[]`**: 4 registros (formal, informal, técnico, literário) com exemplos contrastivos.  
**`NORMA[]`**: 4 tópicos sobre norma culta e preconceito linguístico.  
**`EXERCICIOS[]`**: 14 exercícios de múltipla escolha — mesmo padrão de Prosódia.

---

### Redação (`composition/composition.js`)

Quatro abas: Tipos, Exemplos, Estrutura, Exercícios.

**`TIPOS[]`**: 3 tipos de redação (dissertação-argumentativa, carta argumentativa, resenha crítica).  
**`EXEMPLOS[]`**: 3 exemplos anotados com análise por seção.  
**`EXERCICIOS[]`**: 14 exercícios de múltipla escolha — mesmo padrão de Prosódia.

---

### ABL (`abl/abl.js`)

Duas abas: Contexto, Cadeiras.

**`CONTEXTO[]`**: 4 blocos de contexto histórico (fundação, estrutura, mulheres, recusas).  
**`CADEIRAS[]`**: 10 cadeiras selecionadas. Campos obrigatórios:

```js
{
  numero:       3,
  patrono:      'Artur de Oliveira',
  patrono_nota: 'Nota biográfica do patrono.',
  ocupantes: [
    { nome: 'Nome', periodo: '1897–1908', nota: 'Nota.' },
  ],
  // Opcional — ativa bloco de destaque expandido:
  destaque: {
    nome:        'Machado de Assis',
    subtitulo:   'Subtítulo descritivo.',
    bio:         'Biografia curta.',
    estilo:      'Estilo literário.',
    legado_abl:  'Relação com a ABL.',
    citacao:     '"Citação."',
    curiosidade: 'Curiosidade histórica.',
    obras: [
      { titulo: 'Título', ano: 1881, nota: 'Nota de leitura.' },
    ],
  },
}
```

**Campo `destaque`**: quando presente, renderiza um bloco visual expandido antes do accordion da cadeira. Atualmente usado apenas na cadeira 3 (Machado de Assis).

---

### Grandes Nomes (`grandes-nomes/grandes-nomes.js`)

**`NOMES[]`**: 10 escritores canônicos. Campos:

```js
{
  id:        'machado',
  nome:      'Machado de Assis',
  vida:      '1839 – 1908',
  pais:      'Brasil',
  movimento: 'Realismo',
  tag:       'O fundador',    // rótulo curto no card fechado
  bio:       'Biografia.',
  estilo:    'Descrição do estilo.',
  frase:     '"Citação representativa."',
  obras: [
    {
      titulo: 'Título da obra',
      ano:    1881,           // número ou string '—'
      genero: 'Romance',
      nota:   'Nota de leitura de 2–3 frases.',
    },
  ],
}
```

**Ordem**: Machado de Assis é sempre o primeiro (`NOMES[0]`). Os demais não têm ordem canônica obrigatória.

---

## Módulos com dados externos (JSON)

### Leitura Estrutural (`reading/reading.js`)

**Parâmetro**: `textsData` — objeto `{ texts: Text[] }` de `texts.json`.

**Filtragem**: exibe apenas textos com pelo menos um exercício `type: 'estrutura'`. O componente `text-viewer.js` tokeniza o texto e permite clicar em tokens para classificá-los por função sintática.

---

### Interpretação (`interpretation/interpretation.js`)

**Parâmetro**: `textsData`.

**Filtragem**: textos com exercícios `type: 'interpretacao' | 'tom' | 'fato_opiniao' | 'inferencia'`. O exercício exibe o texto, a instrução e 4 opções. O botão "Dica" destaca `hint_highlight[]` no texto sem revelar a resposta.

---

### Etimologia (`etymology/etymology.js`)

**Parâmetro**: `etymData` — objeto `{ words: Word[] }` de `etymology.json`.

**Funcionalidades**: busca em tempo real por palavra, raiz ou língua de origem. Família de palavras navegável por clique. Cognatos exibidos por idioma.

---

### Literatura (`literature/literature.js`)

**Parâmetros**: `authorsData` (objeto `{ authors: Author[] }`), `router` (stub do roteador).

**Duas exportações**:
- `renderLiteratura(authorsData, router)` — grade de cards de autores.
- `renderAutorPerfil(authors, authorId, textsData, router)` — perfil completo de um autor. Retorna elemento de erro (não lança) se `authorId` não existe.

**Integração Gutenberg**: obras com `gutenberg_url` exibem botão de carregamento de trecho. A chamada é feita via `js/api.js` com cache em `localStorage`.

---

### Poesia (`poetry/poetry.js`)

**Parâmetro**: `textsData`.

**Filtragem**: textos com `genre: 'poesia'`. Exibe 10 poemas.

**Cinco abas**: Poemas, Versificação, Rima, Figuras Sonoras, Metro e Ritmo.

**Quizzes interativos**:
- `buildVersifQuiz`: 7 questões de identificação de tipo de estrofe.
- `buildRimaQuiz`: 6 questões de identificação de esquema rimático.
- `buildFigurasQuiz`: 7 questões de identificação de figura sonora.
- `buildMetroQuiz`: 5 questões de identificação de metro (criada em v0.19.x).

---

### Escrita (`writing/writing.js`)

**Parâmetro**: `textsData`.

**Análise heurística** (sem IA):
- Contagem de palavras, frases, parágrafos.
- Frases longas (> 40 palavras).
- Palavras repetidas (3+ ocorrências, excluindo stop words).
- TTR — Type-Token Ratio (diversidade lexical).
- Sinônimos via `wordnet.js`.

---

## Componentes compartilhados

### `components/text-viewer.js`

Tokeniza um texto em spans clicáveis. Cada span tem `role="button"`, `aria-label` e classe dinâmica quando selecionado. Usado pelos módulos Leitura e Escrita.

### `components/exercise-engine.js`

Motor de exercícios. Recebe `exercise`, `textViewer` e `onAnswer`. Suporta tipos: `estrutura`, `interpretacao`, `tom`, `fato_opiniao`, `inferencia`, `figuras`.

---

## Como adicionar um módulo novo

1. Criar `modules/novo-modulo/novo-modulo.js` exportando `renderNovoModulo()`.
2. Registrar rota em `js/main.js`:
   ```js
   router.register('/modulo/novo', async () => {
     const { renderNovoModulo } = await import('../modules/novo-modulo/novo-modulo.js');
     return renderNovoModulo();
   });
   ```
3. Adicionar link no `<nav>` de `index.html`:
   ```html
   <button class="nav-link" data-route="/modulo/novo"
     onclick="window.location.hash='/modulo/novo'"
     aria-label="Módulo Novo">Novo</button>
   ```
4. Adicionar card em `modules/home.js` no array `modules[]`.
5. Adicionar teste de smoke em `tests/test-modules.js`.
6. Atualizar `docs/CHANGELOG.md` e `docs/MODULES.md`.
