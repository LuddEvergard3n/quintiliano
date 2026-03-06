# Quintiliano — Guia de Dados

Documentação dos quatro arquivos JSON em `data/`. Para cada um: estrutura, campos obrigatórios e opcionais, regras de validação e exemplos de adição de conteúdo.

---

## `texts.json`

Banco central de textos literários e didáticos com exercícios associados.

**Estado atual:** 40 textos, 87 exercícios.

### Estrutura raiz

```json
{
  "texts": [ ...array de objetos Text ]
}
```

### Objeto `Text`

| Campo       | Tipo     | Obrigatório | Valores aceitos |
|-------------|----------|-------------|-----------------|
| `id`        | string   | sim         | snake_case único — ex: `machado_capitu` |
| `title`     | string   | sim         | Título do trecho |
| `author`    | string   | sim         | Nome completo do autor |
| `year`      | number   | sim         | Ano de publicação da obra original |
| `level`     | string   | sim         | `"basico"` \| `"intermediario"` \| `"avancado"` |
| `genre`     | string   | sim         | Ver tabela de gêneros abaixo |
| `content`   | string   | sim         | Texto completo do trecho. Aceita `\n` para quebras de linha em poesia |
| `exercises` | array    | sim         | Array de objetos Exercise (pode ser vazio `[]`) |

### Gêneros em uso

`romance`, `conto`, `poesia`, `crônica`, `diário`, `narrativa`, `dissertação`, `artigo de opinião`, `prosa não-ficcional`, `texto científico`, `texto instrucional`

### Objeto `Exercise` — campos comuns

| Campo           | Tipo   | Obrigatório | Descrição |
|-----------------|--------|-------------|-----------|
| `type`          | string | sim         | Tipo do exercício (ver tabela abaixo) |
| `instruction`   | string | sim         | Enunciado exibido ao aluno |
| `hint_highlight`| array  | não         | Palavras a destacar no texto quando o botão "Dica" é acionado. Arrays vazios são ignorados. |
| `explanation`   | string | sim         | Feedback pedagógico exibido após a resposta |

### Tipos de exercício

#### `estrutura`
Aluno clica em tokens do texto para identificar elementos sintáticos.

```json
{
  "type": "estrutura",
  "instruction": "Identifique o sujeito da frase: 'A tia chamava-o de anjo.'",
  "targets": ["tia"],
  "category": "sujeito",
  "hint_highlight": ["tia", "chamava"],
  "explanation": "..."
}
```

| Campo      | Tipo   | Descrição |
|------------|--------|-----------|
| `targets`  | array  | Palavras que o aluno deve selecionar |
| `category` | string | `"sujeito"` \| `"verbo"` \| `"objeto"` \| `"predicado"` \| `"adjunto"` |

#### `interpretacao`, `tom`, `inferencia`
Múltipla escolha. A diferença está na habilidade avaliada, não na estrutura.

```json
{
  "type": "interpretacao",
  "instruction": "Qual é a ideia central do trecho?",
  "options": ["Opção A", "Opção B", "Opção C", "Opção D"],
  "correct": 1,
  "hint_highlight": ["palavra-chave"],
  "explanation": "..."
}
```

| Campo     | Tipo   | Descrição |
|-----------|--------|-----------|
| `options` | array  | Exatamente 4 opções |
| `correct` | number | Índice (0-3) da opção correta |

#### `fato_opiniao`
Múltipla escolha binária.

```json
{
  "type": "fato_opiniao",
  "instruction": "Classifique: 'O sol nasce no leste.' — fato ou opinião?",
  "options": ["Fato", "Opinião"],
  "correct": 0,
  "hint_highlight": [],
  "explanation": "..."
}
```

#### `figuras`
Identificação de figuras de linguagem por clique em tokens.

```json
{
  "type": "figuras",
  "instruction": "Identifique a figura em: 'Estou morrendo de fome.'",
  "targets": ["morrendo"],
  "category": "hipérbole",
  "hint_highlight": ["morrendo", "fome"],
  "explanation": "..."
}
```

| Campo      | Tipo   | Descrição |
|------------|--------|-----------|
| `targets`  | array  | Tokens que identificam a figura |
| `category` | string | Nome da figura: `"metáfora"` \| `"hipérbole"` \| `"ironia"` \| `"anáfora"` \| `"personificação"` \| `"eufemismo"` \| `"antítese"` \| `"comparação"` |

### Regras de validação

- `id` deve ser único em todo o array.
- `correct` deve ser um índice válido do array `options`.
- `targets` deve conter palavras que aparecem literalmente em `content` (o tokenizador faz busca exata).
- `hint_highlight` com array vazio `[]` desabilita o botão "Dica" — não use arrays com strings vazias.
- Textos com `level: "basico"` devem ter ao menos um exercício `estrutura` para aparecer no módulo Leitura Estrutural.

---

## `authors.json`

Perfis de autores exibidos no módulo Literatura.

**Estado atual:** 15 autores.

### Estrutura raiz

```json
{
  "authors": [ ...array de objetos Author ]
}
```

### Objeto `Author`

| Campo              | Tipo         | Obrigatório | Descrição |
|--------------------|--------------|-------------|-----------|
| `id`               | string       | sim         | slug único — ex: `machado`, `conceicao` |
| `name`             | string       | sim         | Nome completo |
| `nationality`      | string       | sim         | Nacionalidade |
| `birth`            | number       | sim         | Ano de nascimento |
| `death`            | number\|null | sim         | Ano de morte ou `null` se vivo |
| `movement`         | string       | sim         | Movimento literário principal |
| `short_bio`        | string       | sim         | Biografia em 3-5 frases |
| `style`            | string       | sim         | Características estilísticas em 2-4 frases |
| `context`          | string       | sim         | Contexto histórico relevante |
| `signature_quote`  | string       | sim         | Frase ou verso representativo |
| `key_works`        | array        | sim         | Obras principais (ver abaixo) |
| `gutenberg_works`  | array        | sim         | Obras no Projeto Gutenberg (pode ser `[]`) |

### Objeto `key_work`

```json
{
  "title": "Dom Casmurro",
  "year": 1899,
  "genre": "Romance",
  "gutenberg_id": 55752,
  "gutenberg_url": "https://www.gutenberg.org/cache/epub/55752/pg55752.txt"
}
```

`gutenberg_id` e `gutenberg_url` são opcionais — só incluir quando a obra estiver disponível no Projeto Gutenberg.

### Autores cadastrados

| id          | Nome                        | Movimento                |
|-------------|-----------------------------|-----------------------------|
| `machado`   | Machado de Assis            | Realismo |
| `clarice`   | Clarice Lispector           | Modernismo tardio |
| `lima`      | Lima Barreto                | Pré-modernismo |
| `alencar`   | José de Alencar             | Romantismo |
| `camoes`    | Luís de Camões              | Classicismo / Renascimento |
| `pessoa`    | Fernando Pessoa             | Modernismo |
| `drummond`  | Carlos Drummond de Andrade  | Modernismo |
| `graciliano`| Graciliano Ramos            | Modernismo / Regionalismo |
| `rosa`      | João Guimarães Rosa         | Modernismo tardio |
| `eca`       | Eça de Queirós              | Realismo / Naturalismo |
| `bandeira`  | Manuel Bandeira             | Modernismo |
| `adelia`    | Adélia Prado                | Poesia contemporânea |
| `verissimo` | Érico Veríssimo             | Modernismo / Regionalismo gaúcho |
| `carolina`  | Carolina Maria de Jesus     | Literatura de testemunho |
| `conceicao` | Conceição Evaristo          | Literatura afro-brasileira |

---

## `etymology.json`

Entradas etimológicas para o módulo Etimologia.

**Estado atual:** 45 entradas.

### Estrutura raiz

```json
{
  "words": [ ...array de objetos Word ]
}
```

### Objeto `Word`

| Campo                       | Tipo   | Obrigatório | Descrição |
|-----------------------------|--------|-------------|-----------|
| `word`                      | string | sim         | A palavra em português |
| `root`                      | string | sim         | Raiz ou forma original |
| `language_origin`           | string | sim         | Língua de origem (ver abaixo) |
| `meaning_origin`            | string | sim         | Significado na língua de origem |
| `evolution`                 | array  | sim         | Cadeia de evolução da palavra, cada etapa como string `"língua: forma"` |
| `family`                    | array  | sim         | Palavras da mesma família em português |
| `cognates_other_languages`  | object | sim         | `{ "língua": "cognato" }` — pode ser `{}` |
| `curiosity`                 | string | sim         | Fato curioso sobre a origem ou uso |

### Valores de `language_origin`

`"latim"`, `"grego"`, `"árabe"`, `"tupi"`, `"quimbundo"`, `"germânico"`, `"francês"`, `"inglês"`, `"italiano"`, `"espanhol"`, `"hebraico"`, `"persa"`

### Distribuição atual por origem

| Língua     | Entradas |
|------------|----------|
| latim      | 21       |
| grego      | 13       |
| árabe      | 4        |
| quimbundo  | 2        |
| tupi       | 2        |
| germânico  | 2        |
| francês    | 1        |

---

## `wordnet.json`

Subconjunto do OpenWordNet-PT usado pelo módulo Escrita para sugerir sinônimos e antônimos de palavras redundantes.

**Estado atual:** subconjunto com vocabulário comum.

### Estrutura

```json
{
  "entries": {
    "palavra": {
      "synonyms": ["sinônimo1", "sinônimo2"],
      "antonyms": ["antônimo1"],
      "definition": "definição breve"
    }
  }
}
```

O módulo Escrita consulta este arquivo via `wordnet.js`. Palavras não encontradas no arquivo simplesmente não exibem sugestões — não geram erro.

---

## Adicionando conteúdo

### Novo texto

1. Escolha um `id` único em snake_case: `autor_titulo_distinguidor`
2. Defina `level` baseado na complexidade sintática e vocabulário, não no prestígio do autor
3. Use `level: "basico"` para frases curtas, vocabulário simples, estrutura SVO clara
4. Inclua ao menos 2 exercícios por texto
5. Para textos básicos com `estrutura`, garanta que `targets` são palavras que aparecem literalmente no `content`

### Novo autor

1. Use `id` em slug: sem acentos, sem espaços, minúsculas
2. `death: null` para autores vivos
3. `gutenberg_works: []` se não houver obras no Projeto Gutenberg
4. `short_bio` deve ser factual e conciso — 3 a 5 frases
5. `signature_quote` deve ser uma frase representativa do autor, não uma síntese crítica

### Nova entrada etimológica

1. `language_origin` deve seguir os valores listados acima
2. `evolution` deve mostrar a cadeia completa: língua de origem → intermediários → português
3. `family` deve listar palavras portuguesas que o aluno reconhece — não termos eruditos obscuros
4. `curiosity` é o campo mais pedagógico: deve revelar algo inesperado ou conectar a palavra a outras conhecidas
