# Quintiliano — Arquitetura do Sistema

## Princípios fundamentais

**Zero dependências externas.** Sem npm, sem bundlers, sem frameworks. O sistema roda diretamente no navegador com ES Modules nativos. Qualquer desenvolvedor com um servidor HTTP estático pode executar e modificar o projeto.

**Offline-first.** Todos os dados são arquivos JSON locais. Sem chamadas a APIs externas em nenhum módulo. O sistema funciona em rede local, sem internet.

**Análise heurística declarativa.** Não há NLP pesado nem modelos de linguagem. Toda análise de texto é feita com dados declarados nos JSONs e heurísticas determinísticas em JavaScript puro. O que o sistema pode verificar é exatamente o que foi declarado — sem mais, sem menos.

**Lazy loading por rota.** Cada módulo é um ES Module importado dinamicamente apenas quando sua rota é acessada. O carregamento inicial é mínimo — apenas `main.js`, `router.js`, `state.js` e os dados JSON globais.

---

## Estrutura de arquivos

```
quintiliano/
│
├── index.html                   # Ponto de entrada único (SPA)
│
├── css/
│   ├── theme.css                # Variáveis CSS: cores, tipografia, espaçamento, raios
│   └── style.css                # Estilos completos da aplicação
│
├── js/
│   ├── main.js                  # Bootstrap: carrega dados, registra rotas, inicia roteador
│   ├── router.js                # Roteador hash-based com suporte a parâmetros (:id)
│   ├── state.js                 # Estado global com pub/sub e persistência localStorage
│   ├── api.js                   # Fetch de JSON com cache em memória
│   └── wordnet.js               # Interface com OpenWordNet-PT
│
├── modules/
│   ├── home.js                  # Página inicial
│   ├── reading/reading.js       # Módulo 01: Leitura Estrutural
│   ├── interpretation/          # Módulo 02: Interpretação
│   ├── syntax/                  # Módulo 03: Sintaxe
│   ├── etymology/               # Módulo 04: Etimologia
│   ├── literature/              # Módulo 05: Literatura
│   ├── writing/                 # Módulo 06: Escrita
│   ├── poetry/                  # Módulo 07: Poesia
│   ├── argumentation/           # Módulo 08: Argumentação
│   └── rules/                   # Módulo 09: Regras
│
├── components/
│   ├── text-viewer.js           # Tokenizador + highlight interativo
│   └── exercise-engine.js       # Motor de exercícios
│
├── data/
│   ├── texts.json               # Textos literários com exercícios
│   ├── authors.json             # Perfis de autores
│   ├── etymology.json           # Entradas etimológicas
│   └── wordnet.json             # Sinônimos e antônimos
│
└── docs/                        # Documentação do projeto
    ├── ARCHITECTURE.md          # Este arquivo
    ├── CHANGELOG.md             # Histórico de versões
    ├── DATA.md                  # Esquema dos JSONs
    └── ROADMAP.md               # Melhorias planejadas
```

---

## Fluxo de inicialização

```
index.html carrega
    └── main.js (módulo ES)
          ├── api.js: carrega texts.json, authors.json, etymology.json, wordnet.json
          ├── state.js: inicializa estado (lê localStorage se houver)
          ├── router.js: instancia Router com <main> como outlet
          ├── registra rotas (router.register)
          └── router.start(): lê window.location.hash e resolve rota inicial
```

Quando uma rota é acessada:

```
router.resolve(path)
    └── handler da rota (async)
          └── import() dinâmico do módulo
                └── renderXxx(data) → HTMLElement
                      └── router injeta no <main id="app-outlet">
```

---

## Roteador (`router.js`)

Hash-based routing: escuta `hashchange` e `load`. Suporta parâmetros dinâmicos via `:param`.

```js
router.register('/autor/:id', async ({ id }) => {
    const { renderAutorPerfil } = await import('../modules/literature/literature.js');
    return renderAutorPerfil(authorsData.authors, id, router);
});
```

Rotas registradas em `main.js`. A ordem de registro não importa — o roteador usa matching exato antes de matching com parâmetros.

---

## Estado (`state.js`)

Singleton com pub/sub. Usado para progresso do aluno (infraestrutura preparada, não ativada nos módulos).

```js
import { getState, setState, subscribe } from './state.js';

// Leitura
const prog = getState('progress');

// Escrita (dispara todos os subscribers)
setState('progress', { ...prog, leitura: { completados: 3 } });

// Subscription
const unsub = subscribe('progress', (val) => { /* atualiza UI */ });
unsub(); // cancela
```

A chave de persistência no localStorage é `quintiliano_state_v1`.

---

## Cache de dados (`api.js`)

```js
import { loadJSON } from './api.js';

const data = await loadJSON('/data/texts.json');
```

O cache é em memória (Map) com prefixo de chave `quintiliano_cache_v1_`. Uma vez carregado, o JSON não é buscado novamente na sessão. Sem invalidação — os dados são estáticos.

---

## Componentes reutilizáveis

### `text-viewer.js`

Tokeniza o conteúdo de um texto em spans clicáveis. Suporta:
- Classificação morfossintática por clique (modo `estrutura`)
- Highlight de palavras específicas (modo dica)
- Marcação de figuras de linguagem (modo `figuras`)

```js
import { createTextViewer, classifyToken, clearClassifications } from '../../components/text-viewer.js';

const viewer = createTextViewer(text.content, {
    mode: 'estrutura',
    onTokenClick: (token, el) => { /* ... */ }
});
```

### `exercise-engine.js`

Renderiza e verifica exercícios declarados em `texts.json`. Recebe um array de exercícios e o viewer associado. Gerencia o ciclo: instrução → interação → verificação → feedback → próximo.

---

## Módulos: padrão de implementação

Todo módulo exporta uma função `render*()` que:

1. Recebe dados como parâmetro (nunca faz fetch internamente)
2. Cria e retorna um `HTMLElement`
3. Registra event listeners no elemento retornado (não no document)
4. Não guarda estado fora do componente (exceto via `state.js`)

```js
// modules/meu-modulo/meu-modulo.js

/**
 * @param {object} data — dados do texts.json ou similar
 * @returns {HTMLElement}
 */
export function renderMeuModulo(data) {
    const page = document.createElement('div');
    page.innerHTML = `...`;
    // event listeners
    return page;
}
```

Módulos com dados próprios (Sintaxe, Argumentação, Regras) declaram seus dados como constantes no topo do arquivo, sem dependência de JSON externo.

---

## Sistema de design (theme.css)

Todas as medidas, cores e tipografias são variáveis CSS. Nunca use valores hardcoded de cor ou espaçamento fora de `theme.css`.

### Espaçamento

Escala de 8 unidades: `--space-1` (4px) a `--space-16` (128px).

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-16: 128px;
```

### Tipografia

```css
--font-display: 'Playfair Display', Georgia, serif;  /* títulos */
--font-body:    'EB Garamond', Georgia, serif;        /* corpo de texto */
--font-ui:      'Inter', system-ui, sans-serif;       /* labels, botões */
```

### Cores principais

```css
--color-ink:          #1a1008;   /* texto principal */
--color-ink-mid:      #3d2b1a;   /* texto secundário */
--color-ink-ghost:    #8b7355;   /* labels, placeholders */
--color-paper:        #f5f0e8;   /* fundo */
--color-paper-dark:   #ece6d8;   /* fundo de cards */
--color-accent:       #8b1a1a;   /* vermelho escuro (destaque) */
--color-gold:         #b8860b;   /* dourado (alertas, citações) */
--color-green:        #2d5a27;   /* verde (acerto, confirmação) */
```

---

## Convenções de código

- **Nenhum `var`** — use `const` por padrão, `let` quando necessário.
- **Sem classes** — funções puras e módulos ES. Composição explícita.
- **Sem abstrações especulativas** — só crie uma abstração quando ela for usada em três lugares distintos.
- **Inline styles para layout de componente** — use variáveis CSS. Classes CSS para padrões repetidos do design system.
- **Comentários explicam o porquê**, não o quê. Código legível não precisa de comentário que repete o que está escrito.
- **Dados de conteúdo fora do código** — qualquer lista de textos, falácias, regras, autores pertence a um JSON ou a uma constante declarada no topo do módulo, não espalhada pelo código de renderização.

---

## Como executar

ES Modules requerem um servidor HTTP (restrição de CORS do navegador para `file://`).

```bash
# Python 3 (recomendado)
cd quintiliano
python3 -m http.server 5500
# http://localhost:5500

# Node.js
npx serve quintiliano

# VS Code
# Extensão "Live Server" → botão "Go Live" no canto inferior direito
```

---

## Compatibilidade

| Browser    | Versão mínima |
|------------|---------------|
| Chrome     | 80+           |
| Firefox    | 75+           |
| Edge       | 80+           |
| Safari     | 14+           |

Requerimentos: ES Modules nativos, `async/await`, `fetch`, HTML5 Drag and Drop API, `localStorage`.
